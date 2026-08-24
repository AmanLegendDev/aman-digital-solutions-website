"use server";

import { getServerSession } from "next-auth";
import { revalidatePath } from "next/cache";

import { authOptions } from "@/lib/auth/auth";
import { connectDB } from "@/lib/db/connect";

import FAQ from "@/models/FAQ";
import Project from "@/models/Project";
import Service from "@/models/Service";

import {
  serviceSchema,
  type CreateServiceInput,
} from "@/schemas/service.schema";

/* =====================================================
   CREATE SERVICE RESULT
===================================================== */

export type CreateServiceResult =
  | {
      success: true;
      serviceId: string;
    }
  | {
      success: false;
      error: string;
      fieldErrors?: Record<
        string,
        string[]
      >;
    };

/* =====================================================
   RELATION OPTION TYPES
===================================================== */

export type ServiceRelationOption = {
  id: string;
  title: string;
};

export type ServiceRelationOptionsResult =
  | {
      success: true;
      faqs: ServiceRelationOption[];
      projects: ServiceRelationOption[];
    }
  | {
      success: false;
      error: string;
    };

/* =====================================================
   CREATE SERVICE
===================================================== */

export async function createService(
  input: CreateServiceInput
): Promise<CreateServiceResult> {
  /* ---------------------------------------------
     AUTHORIZATION
  --------------------------------------------- */

  const session =
    await getServerSession(authOptions);

  if (
    !session?.user ||
    session.user.role !== "admin"
  ) {
    return {
      success: false,
      error: "Unauthorized",
    };
  }

  /* ---------------------------------------------
     INPUT VALIDATION
  --------------------------------------------- */

  const parsed =
    serviceSchema.safeParse(input);

  if (!parsed.success) {
    return {
      success: false,
      error:
        "Please fix the validation errors.",
      fieldErrors:
        parsed.error.flatten().fieldErrors,
    };
  }

  const data = parsed.data;

  try {
    /* -------------------------------------------
       DATABASE
    ------------------------------------------- */

    await connectDB();

    /* -------------------------------------------
       SLUG NORMALIZATION
    ------------------------------------------- */

    const slug =
      data.slug.trim().toLowerCase();

    /* -------------------------------------------
       DUPLICATE SLUG CHECK
    ------------------------------------------- */

    const existingService =
      await Service.exists({
        slug,
      });

    if (existingService) {
      return {
        success: false,
        error:
          "A service with this slug already exists.",
        fieldErrors: {
          slug: [
            "This slug is already in use.",
          ],
        },
      };
    }

    /* -------------------------------------------
       CREATE SERVICE
    ------------------------------------------- */

    const service =
      await Service.create({
        ...data,

        slug,

        faqIds: data.faqIds ?? [],

        projectIds:
          data.projectIds ?? [],

        keywords:
          data.keywords ?? [],

        benefits:
          data.benefits ?? [],

        features:
          data.features ?? [],

        process:
          data.process ?? [],
      });

    /* -------------------------------------------
       CACHE REVALIDATION
    ------------------------------------------- */

    revalidatePath(
      "/admin/services"
    );

    revalidatePath(
      "/services"
    );

    revalidatePath(
      `/services/${service.slug}`
    );

    /* -------------------------------------------
       SUCCESS
    ------------------------------------------- */

    return {
      success: true,
      serviceId:
        String(service._id),
    };
  } catch (error: unknown) {
    console.error(
      "CREATE_SERVICE_ERROR:",
      error
    );

    /* -------------------------------------------
       DUPLICATE KEY RACE CONDITION
    ------------------------------------------- */

    if (
      typeof error === "object" &&
      error !== null &&
      "code" in error &&
      (error as { code?: number })
        .code === 11000
    ) {
      return {
        success: false,
        error:
          "A service with this slug already exists.",
        fieldErrors: {
          slug: [
            "This slug is already in use.",
          ],
        },
      };
    }

    /* -------------------------------------------
       SAFE ERROR
    ------------------------------------------- */

    return {
      success: false,
      error:
        "Unable to create service. Please try again.",
    };
  }
}

/* =====================================================
   GET FAQ + PROJECT OPTIONS
===================================================== */

export async function getServiceRelationOptions(): Promise<ServiceRelationOptionsResult> {
  /* ---------------------------------------------
     AUTHORIZATION
  --------------------------------------------- */

  const session =
    await getServerSession(authOptions);

  if (
    !session?.user ||
    session.user.role !== "admin"
  ) {
    return {
      success: false,
      error: "Unauthorized",
    };
  }

  try {
    /* -------------------------------------------
       DATABASE
    ------------------------------------------- */

    await connectDB();

    /* -------------------------------------------
       LOAD BOTH IN PARALLEL
    ------------------------------------------- */

    const [faqs, projects] =
      await Promise.all([
        FAQ.find({})
          .select("_id question")
          .sort({
            question: 1,
          })
          .lean(),

        Project.find({})
          .select("_id title")
          .sort({
            title: 1,
          })
          .lean(),
      ]);

    /* -------------------------------------------
       SERIALIZABLE RESPONSE
    ------------------------------------------- */

    return {
      success: true,

      faqs: faqs.map((faq) => ({
        id: String(faq._id),
        title: faq.question,
      })),

      projects: projects.map(
        (project) => ({
          id: String(project._id),
          title: project.title,
        })
      ),
    };
  } catch (error: unknown) {
    console.error(
      "GET_SERVICE_RELATION_OPTIONS_ERROR:",
      error
    );

    return {
      success: false,
      error:
        "Unable to load related FAQs and projects.",
    };
  }
}