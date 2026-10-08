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

      for (const issue of parsed.error.issues) {
        const field =
          issue.path.join(".") || "form";

        if (!fieldErrors[field]) {
          fieldErrors[field] = [];
        }

        fieldErrors[field].push(
          issue.message,
        );
      }

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
       05. NORMALIZE CLAIM LIMIT DATA
       
       If claim limit is disabled:
       - claimLimit is removed
       - claimedCount is preserved as historical count

       If claim limit is enabled:
       - claimLimit must already be valid
       - claimedCount is preserved
    ===================================================== */

    const offerData: OfferInput = {
      ...values,
      slug,

      claimLimit:
        values.isClaimLimitEnabled
          ? values.claimLimit
          : undefined,

      claimedCount:
        values.claimedCount ?? 0,
    };

    /* =====================================================
       06. CREATE OFFER
    ===================================================== */

    const offer =
      await Offer.create(
        offerData,
      );

    /* =====================================================
       07. DERIVE LIFECYCLE
       
       IMPORTANT:
       Lifecycle status is NOT stored in MongoDB.

       It is always calculated from:

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
       08. CACHE REVALIDATION
    ===================================================== */

    revalidatePath("/offers");

    revalidatePath(
      `/offers/${slug}`,
    );

    revalidatePath(
      "/sitemap.xml",
    );

    /*
     * Homepage may later contain active featured offers.
     * Revalidating it now is safe and future-proof.
     */
    revalidatePath("/");

    /* =====================================================
       09. SUCCESS
    ===================================================== */

    return {
      success: true,
      id: offer._id.toString(),
      slug,
      lifecycleStatus,
    };
  } catch (error: unknown) {
    /* =====================================================
       10. DUPLICATE KEY SAFETY
       
       MongoDB unique index is the final protection
       against simultaneous duplicate slug creation.
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
       11. UNKNOWN ERROR
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