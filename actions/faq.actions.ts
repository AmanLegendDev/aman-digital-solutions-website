"use server";

import { getServerSession } from "next-auth";
import { revalidatePath } from "next/cache";
import { Types } from "mongoose";

import { authOptions } from "@/lib/auth/auth";
import { connectDB } from "@/lib/db/connect";

import FAQ from "@/models/FAQ";
import Service from "@/models/Service";
import Project from "@/models/Project";

import {
  faqSchema,
  type CreateFAQInput,
} from "@/schemas/faq.schema";

type CreateFAQResult =
  | {
      success: true;
      faqId: string;
    }
  | {
      success: false;
      error: string;
      fieldErrors?: Record<
        string,
        string[]
      >;
    };

export async function createFAQ(
  input: CreateFAQInput
): Promise<CreateFAQResult> {
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

  const parsed =
    faqSchema.safeParse(input);

  if (!parsed.success) {
    return {
      success: false,
      error:
        "Please fix the validation errors.",
      fieldErrors:
        parsed.error.flatten().fieldErrors,
    };
  }

  try {
    await connectDB();

    const existing =
      await FAQ.findOne({
        slug: parsed.data.slug,
      })
        .select("_id")
        .lean();

    if (existing) {
      return {
        success: false,
        error:
          "An FAQ with this slug already exists.",
        fieldErrors: {
          slug: [
            "This slug is already in use.",
          ],
        },
      };
    }

    if (parsed.data.relatedService) {
      if (
        !Types.ObjectId.isValid(
          parsed.data.relatedService
        )
      ) {
        return {
          success: false,
          error:
            "Invalid related service.",
        };
      }

      const service =
        await Service.exists({
          _id: parsed.data.relatedService,
        });

      if (!service) {
        return {
          success: false,
          error:
            "The selected service does not exist.",
        };
      }
    }

    if (parsed.data.relatedProject) {
      if (
        !Types.ObjectId.isValid(
          parsed.data.relatedProject
        )
      ) {
        return {
          success: false,
          error:
            "Invalid related project.",
        };
      }

      const project =
        await Project.exists({
          _id: parsed.data.relatedProject,
        });

      if (!project) {
        return {
          success: false,
          error:
            "The selected project does not exist.",
        };
      }
    }

    const faq =
      await FAQ.create({
        ...parsed.data,

        relatedService:
          parsed.data.relatedService
            ? new Types.ObjectId(
                parsed.data.relatedService
              )
            : undefined,

        relatedProject:
          parsed.data.relatedProject
            ? new Types.ObjectId(
                parsed.data.relatedProject
              )
            : undefined,
      });

    revalidatePath("/admin/faq");

   return {
  success: true,
  faqId: String(faq._id),
};
  } catch (error) {
    console.error(
      "CREATE_FAQ_ERROR:",
      error
    );

    return {
      success: false,
      error:
        "Unable to create FAQ. Please try again.",
    };
  }
}