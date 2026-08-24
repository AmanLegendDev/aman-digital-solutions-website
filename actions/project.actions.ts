"use server";

import { getServerSession } from "next-auth";
import { revalidatePath } from "next/cache";
import { Types } from "mongoose";

import { authOptions } from "@/lib/auth/auth";
import { connectDB } from "@/lib/db/connect";
import Project from "@/models/Project";
import Service from "@/models/Service";

import {
  projectSchema,
  type CreateProjectInput,
} from "@/schemas/project.schema";

/* =====================================================
   RESULT
===================================================== */

type CreateProjectResult =
  | {
      success: true;
      projectId: string;
    }
  | {
      success: false;
      error: string;
      fieldErrors?: Record<string, string[]>;
    };

/* =====================================================
   CREATE PROJECT
===================================================== */

export async function createProject(
  input: CreateProjectInput
): Promise<CreateProjectResult> {
  /* ---------------------------------------------------
     ADMIN AUTHORIZATION
  --------------------------------------------------- */

  const session = await getServerSession(authOptions);

  if (
    !session?.user ||
    session.user.role !== "admin"
  ) {
    return {
      success: false,
      error: "Unauthorized",
    };
  }

  /* ---------------------------------------------------
     ZOD VALIDATION
  --------------------------------------------------- */

  const parsed = projectSchema.safeParse(input);

  if (!parsed.success) {
    return {
      success: false,
      error: "Please fix the validation errors.",
      fieldErrors:
        parsed.error.flatten().fieldErrors,
    };
  }

  try {
    /* -------------------------------------------------
       DATABASE
    ------------------------------------------------- */

    await connectDB();

    /* -------------------------------------------------
       DUPLICATE SLUG CHECK
    ------------------------------------------------- */

    const existingProject =
      await Project.findOne({
        slug: parsed.data.slug,
      })
        .select("_id")
        .lean();

    if (existingProject) {
      return {
        success: false,
        error:
          "A project with this slug already exists.",
        fieldErrors: {
          slug: [
            "This slug is already in use.",
          ],
        },
      };
    }

    /* -------------------------------------------------
       VALIDATE RELATED SERVICES
    ------------------------------------------------- */

    const serviceIds = parsed.data.services;

    if (serviceIds.length > 0) {
      /* -----------------------------------------------
         ObjectId FORMAT CHECK
      ----------------------------------------------- */

      const invalidServiceIds =
        serviceIds.filter(
          (id) => !Types.ObjectId.isValid(id)
        );

      if (invalidServiceIds.length > 0) {
        return {
          success: false,
          error:
            "One or more selected services are invalid.",
          fieldErrors: {
            services: [
              "One or more selected services are invalid.",
            ],
          },
        };
      }

      /* -----------------------------------------------
         REMOVE DUPLICATE SERVICE IDS
      ----------------------------------------------- */

      const uniqueServiceIds = [
        ...new Set(serviceIds),
      ];

      /* -----------------------------------------------
         CHECK SERVICES EXIST
      ----------------------------------------------- */

      const existingServices =
        await Service.find({
          _id: {
            $in: uniqueServiceIds,
          },
        })
          .select("_id")
          .lean();

      if (
        existingServices.length !==
        uniqueServiceIds.length
      ) {
        return {
          success: false,
          error:
            "One or more selected services no longer exist.",
          fieldErrors: {
            services: [
              "One or more selected services no longer exist.",
            ],
          },
        };
      }
    }

    /* -------------------------------------------------
       PREPARE SERVICE OBJECT IDS
    ------------------------------------------------- */

    const normalizedServiceIds =
      serviceIds.map(
        (id) => new Types.ObjectId(id)
      );

    /* -------------------------------------------------
       CREATE PROJECT
    ------------------------------------------------- */

    const project = await Project.create({
      ...parsed.data,

      services: normalizedServiceIds,
    });

    /* -------------------------------------------------
       REVALIDATE ADMIN + PUBLIC PAGES
    ------------------------------------------------- */

    revalidatePath("/admin/projects");
    revalidatePath("/projects");

    /* -------------------------------------------------
       SUCCESS
    ------------------------------------------------- */

    return {
      success: true,
      projectId: String(project._id),
    };
  } catch (error) {
    console.error(
      "CREATE_PROJECT_ERROR:",
      error
    );

    /* -----------------------------------------------
       MONGOOSE DUPLICATE KEY SAFETY
    ----------------------------------------------- */

    if (
      typeof error === "object" &&
      error !== null &&
      "code" in error &&
      (error as { code?: number }).code === 11000
    ) {
      return {
        success: false,
        error:
          "A project with this slug already exists.",
        fieldErrors: {
          slug: [
            "This slug is already in use.",
          ],
        },
      };
    }

    return {
      success: false,
      error:
        "Unable to create project. Please try again.",
    };
  }
}