"use server";

import { revalidatePath } from "next/cache";
import { getServerSession } from "next-auth";

import { authOptions } from "@/lib/auth/auth";
import { connectDB } from "@/lib/db/connect";
import Offer from "@/models/Offer";
import {
  offerSchema,
  type OfferInput,
} from "@/schemas/offer.schema";
import { getOfferLifecycleStatus } from "@/lib/offers/status";

/* =========================================================
   RESULT TYPES
========================================================= */

type CreateOfferResult =
  | {
      success: true;
      id: string;
      slug: string;
      lifecycleStatus:
        | "draft"
        | "scheduled"
        | "active"
        | "expired";
    }
  | {
      success: false;
      error: string;
      fieldErrors?: Record<string, string[]>;
    };

/* =========================================================
   CREATE OFFER
========================================================= */

export async function createOffer(
  input: OfferInput,
): Promise<CreateOfferResult> {
  try {
    /* =====================================================
       01. AUTHENTICATION
    ===================================================== */

    const session = await getServerSession(
      authOptions,
    );

    if (
      !session?.user ||
      session.user.role !== "admin"
    ) {
      return {
        success: false,
        error: "Unauthorized.",
      };
    }

    /* =====================================================
       02. VALIDATION
    ===================================================== */

    const parsed =
      offerSchema.safeParse(input);

    if (!parsed.success) {
      const fieldErrors: Record<
        string,
        string[]
      > = {};

      parsed.error.issues.forEach(
        (issue) => {
          const field =
            issue.path.join(".") || "form";

          if (!fieldErrors[field]) {
            fieldErrors[field] = [];
          }

          fieldErrors[field].push(
            issue.message,
          );
        },
      );

      return {
        success: false,
        error:
          "Please fix the highlighted fields.",
        fieldErrors,
      };
    }

    const values = parsed.data;

    const slug = values.slug
      .trim()
      .toLowerCase();

    /* =====================================================
       03. DATABASE CONNECTION
    ===================================================== */

    await connectDB();

    /* =====================================================
       04. DUPLICATE SLUG CHECK
    ===================================================== */

    const existingOffer =
      await Offer.exists({ slug });

    if (existingOffer) {
      return {
        success: false,
        error:
          "An offer with this slug already exists.",
        fieldErrors: {
          slug: [
            "This slug is already in use.",
          ],
        },
      };
    }

    /* =====================================================
       05. CREATE OFFER
    ===================================================== */

    const offer =
      await Offer.create({
        ...values,
        slug,
      });

    /* =====================================================
       06. DERIVE LIFECYCLE
       
       IMPORTANT:
       No lifecycle status is stored in MongoDB.

       Status is always calculated from:

       published
       startDate
       endDate

       Possible states:

       draft
       scheduled
       active
       expired
    ===================================================== */

    const lifecycleStatus =
      getOfferLifecycleStatus(
        {
          published:
            values.published,

          startDate:
            values.startDate,

          endDate:
            values.endDate,
        },
        new Date(),
      );

    /* =====================================================
       07. CACHE REVALIDATION
    ===================================================== */

    revalidatePath("/offers");

    revalidatePath(
      `/offers/${slug}`,
    );

    revalidatePath(
      "/sitemap.xml",
    );

    /* =====================================================
       08. SUCCESS
    ===================================================== */

    return {
      success: true,
      id: offer._id.toString(),
      slug,
      lifecycleStatus,
    };
  } catch (error: unknown) {
    /* =====================================================
       09. DUPLICATE KEY SAFETY
       
       MongoDB can still throw E11000 if two requests
       attempt to create the same slug simultaneously.
    ===================================================== */

    if (
      typeof error === "object" &&
      error !== null &&
      "code" in error &&
      (error as { code?: number }).code ===
        11000
    ) {
      return {
        success: false,
        error:
          "An offer with this slug already exists.",
        fieldErrors: {
          slug: [
            "This slug is already in use.",
          ],
        },
      };
    }

    /* =====================================================
       10. UNKNOWN ERROR
    ===================================================== */

    console.error(
      "createOffer error:",
      error,
    );

    return {
      success: false,
      error:
        "Something went wrong while creating the offer.",
    };
  }
}