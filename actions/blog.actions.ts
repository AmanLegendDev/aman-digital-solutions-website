"use server";

import { getServerSession } from "next-auth";
import { revalidatePath } from "next/cache";

import { authOptions } from "@/lib/auth/auth";
import { connectDB } from "@/lib/db/connect";

import Blog from "@/models/Blog";

import {
  blogSchema,
  type CreateBlogInput,
} from "@/schemas/blog.schema";

type CreateBlogResult =
  | {
      success: true;
      blogId: string;
    }
  | {
      success: false;
      error: string;
      fieldErrors?: Record<string, string[]>;
    };

export async function createBlog(
  input: CreateBlogInput
): Promise<CreateBlogResult> {
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
    blogSchema.safeParse(input);

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
      await Blog.findOne({
        slug: parsed.data.slug,
      })
        .select("_id")
        .lean();

    if (existing) {
      return {
        success: false,
        error:
          "A blog with this slug already exists.",
        fieldErrors: {
          slug: [
            "This slug is already in use.",
          ],
        },
      };
    }

    const data = {
      ...parsed.data,

      publishedAt:
        parsed.data.published
          ? parsed.data.publishedAt ??
            new Date()
          : undefined,
    };

    const blog =
      await Blog.create(data);

    revalidatePath("/admin/blog");

  return {
  success: true,
  blogId: String(blog._id),
};
  } catch (error) {
    console.error(
      "CREATE_BLOG_ERROR:",
      error
    );

    return {
      success: false,
      error:
        "Unable to create blog. Please try again.",
    };
  }
}