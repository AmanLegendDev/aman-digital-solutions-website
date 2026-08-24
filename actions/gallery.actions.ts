"use server";

import { getServerSession } from "next-auth";
import { revalidatePath } from "next/cache";
import { Types } from "mongoose";

import { authOptions } from "@/lib/auth/auth";
import { connectDB } from "@/lib/db/connect";

import Gallery from "@/models/Gallery";
import Project from "@/models/Project";

import {
  gallerySchema,
  type CreateGalleryInput,
} from "@/schemas/gallery.schema";

type CreateGalleryResult =
  | {
      success: true;
      galleryId: string;
    }
  | {
      success: false;
      error: string;
      fieldErrors?: Record<string, string[]>;
    };

export async function createGallery(
  input: CreateGalleryInput
): Promise<CreateGalleryResult> {
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
    gallerySchema.safeParse(input);

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
      await Gallery.findOne({
        slug: parsed.data.slug,
      })
        .select("_id")
        .lean();

    if (existing) {
      return {
        success: false,
        error:
          "A gallery with this slug already exists.",
        fieldErrors: {
          slug: [
            "This slug is already in use.",
          ],
        },
      };
    }

    if (parsed.data.project) {
      if (
        !Types.ObjectId.isValid(
          parsed.data.project
        )
      ) {
        return {
          success: false,
          error:
            "The selected project is invalid.",
        };
      }

      const project =
        await Project.exists({
          _id: parsed.data.project,
        });

      if (!project) {
        return {
          success: false,
          error:
            "The selected project no longer exists.",
        };
      }
    }

    const gallery =
      await Gallery.create({
        ...parsed.data,

        project: parsed.data.project
          ? new Types.ObjectId(
              parsed.data.project
            )
          : undefined,
      });

    revalidatePath("/admin/gallery");

   return {
  success: true,
  galleryId: String(gallery._id),
};
  } catch (error) {
    console.error(
      "CREATE_GALLERY_ERROR:",
      error
    );

    return {
      success: false,
      error:
        "Unable to create gallery. Please try again.",
    };
  }
}