"use server";

import { getServerSession } from "next-auth";
import { revalidatePath } from "next/cache";

import { authOptions } from "@/lib/auth/auth";
import { connectDB } from "@/lib/db/connect";

import Testimonial from "@/models/Testimonial";

import {
  testimonialSchema,
  type CreateTestimonialInput,
} from "@/schemas/testimonial.schema";

type CreateTestimonialResult =
  | {
      success: true;
      testimonialId: string;
    }
  | {
      success: false;
      error: string;
      fieldErrors?: Record<string, string[]>;
    };

export async function createTestimonial(
  input: CreateTestimonialInput
): Promise<CreateTestimonialResult> {
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

  const parsed =
    testimonialSchema.safeParse(input);

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
      await Testimonial.findOne({
        slug: parsed.data.slug,
      })
        .select("_id")
        .lean();

    if (existing) {
      return {
        success: false,
        error:
          "A testimonial with this slug already exists.",
        fieldErrors: {
          slug: [
            "This slug is already in use.",
          ],
        },
      };
    }

    const testimonial =
      await Testimonial.create(parsed.data);

    revalidatePath("/admin/testimonials");

   return {
  success: true,
  testimonialId: String(testimonial._id),
};
  } catch (error) {
    console.error(
      "CREATE_TESTIMONIAL_ERROR:",
      error
    );

    return {
      success: false,
      error:
        "Unable to create testimonial. Please try again.",
    };
  }
}