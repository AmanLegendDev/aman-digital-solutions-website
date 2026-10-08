import { z } from "zod";

/* =========================================================
   HELPERS
========================================================= */

const optionalText = (max: number) =>
  z
    .string()
    .trim()
    .max(max)
    .optional()
    .or(z.literal(""));

const optionalNumber = z.preprocess(
  (value) => {
    if (
      value === "" ||
      value === null ||
      value === undefined
    ) {
      return undefined;
    }

    return value;
  },
  z.coerce
    .number()
    .min(0)
    .optional(),
);

const imageSchema = z
  .object({
    url: z
      .string()
      .trim()
      .url(
        "Please provide a valid image URL.",
      ),

    publicId: z
      .string()
      .trim()
      .max(300)
      .optional()
      .nullable(),

    alt: z
      .string()
      .trim()
      .max(180)
      .optional()
      .nullable(),
  })
  .optional()
  .nullable();

/* =========================================================
   OFFER SCHEMA
========================================================= */

export const offerSchema = z
  .object({
    /* -------------------------------------------------------
       IDENTITY
    ------------------------------------------------------- */

    title: z
      .string()
      .trim()
      .min(
        2,
        "Offer title is required.",
      )
      .max(160),

    slug: z
      .string()
      .trim()
      .min(
        2,
        "Slug is required.",
      )
      .max(180)
      .regex(
        /^[a-z0-9]+(?:-[a-z0-9]+)*$/,
        "Slug can only contain lowercase letters, numbers and hyphens.",
      ),

    badge: optionalText(80),

    shortDescription: z
      .string()
      .trim()
      .min(
        10,
        "Short description is required.",
      )
      .max(320),

    description: z
      .string()
      .trim()
      .min(
        20,
        "Offer description is required.",
      )
      .max(20000),

    /* -------------------------------------------------------
       OFFER TYPE / VALUE
    ------------------------------------------------------- */

    offerType: z.enum([
      "discount",
      "seasonal",
      "limited-time",
      "bundle",
      "custom",
    ]),

    discountType: z.enum([
      "percentage",
      "fixed",
      "none",
    ]),

    discountValue: optionalNumber,

    originalPrice: optionalNumber,

    offerPrice: optionalNumber,

    discountLabel: optionalText(100),

    couponCode: z
      .string()
      .trim()
      .toUpperCase()
      .max(60)
      .optional()
      .or(z.literal("")),

    /* -------------------------------------------------------
       SERVICE ASSOCIATION
    ------------------------------------------------------- */

    serviceId: z
      .string()
      .trim()
      .optional()
      .or(z.literal("")),

    /* -------------------------------------------------------
       VISUALS
    ------------------------------------------------------- */

    heroImage: imageSchema,

    cardImage: imageSchema,

    /* -------------------------------------------------------
       CONTENT
    ------------------------------------------------------- */

    highlights: z
      .array(
        z
          .string()
          .trim()
          .min(
            1,
            "Highlight cannot be empty.",
          )
          .max(240),
      )
      .max(12)
      .default([]),

    includedFeatures: z
      .array(
        z
          .string()
          .trim()
          .min(
            1,
            "Feature cannot be empty.",
          )
          .max(240),
      )
      .max(20)
      .default([]),

    /* -------------------------------------------------------
       CTA
    ------------------------------------------------------- */

    ctaLabel: z
      .string()
      .trim()
      .min(
        2,
        "CTA label is required.",
      )
      .max(80),

    ctaLink: z
      .string()
      .trim()
      .min(
        1,
        "CTA link is required.",
      )
      .max(500),

    secondaryCtaLabel:
      optionalText(80),

    secondaryCtaLink:
      optionalText(500),

    /* -------------------------------------------------------
       TERMS
    ------------------------------------------------------- */

    termsAndConditions:
      optionalText(10000),

    /* -------------------------------------------------------
       SCHEDULING
    ------------------------------------------------------- */

    startDate: z.coerce.date(),

    endDate: z.coerce.date(),

    /* -------------------------------------------------------
       CLAIM LIMIT
    ------------------------------------------------------- */

    isClaimLimitEnabled:
      z.boolean(),

    claimLimit:
      z.preprocess(
        (value) => {
          if (
            value === "" ||
            value === null ||
            value === undefined
          ) {
            return undefined;
          }

          return value;
        },
        z.coerce
          .number()
          .int(
            "Claim limit must be a whole number.",
          )
          .min(
            1,
            "Claim limit must be at least 1.",
          )
          .optional(),
      ),

    claimedCount:
      z.coerce
        .number()
        .int(
          "Claimed count must be a whole number.",
        )
        .min(
          0,
          "Claimed count cannot be negative.",
        )
        .default(0),

    /* -------------------------------------------------------
       PUBLISHING / DISPLAY
    ------------------------------------------------------- */

    published: z.boolean(),

    featured: z.boolean(),

    displayOrder: z
      .coerce
      .number()
      .int()
      .min(0)
      .max(9999),

    /* -------------------------------------------------------
       SEO
    ------------------------------------------------------- */

    seoTitle: optionalText(70),

    seoDescription:
      optionalText(170),

    canonicalUrl: z
      .string()
      .trim()
      .max(500)
      .optional()
      .or(z.literal("")),

    ogTitle: optionalText(120),

    ogDescription:
      optionalText(200),

    ogImage: imageSchema,
  })

  /* =========================================================
     CROSS-FIELD VALIDATION
  ========================================================= */

  .superRefine((data, ctx) => {
    /* -------------------------------------------------------
       DATE VALIDATION
    ------------------------------------------------------- */

    if (
      data.endDate.getTime() <=
      data.startDate.getTime()
    ) {
      ctx.addIssue({
        code: "custom",
        path: ["endDate"],
        message:
          "End date must be later than the start date.",
      });
    }

    /* -------------------------------------------------------
       DISCOUNT VALIDATION
    ------------------------------------------------------- */

    if (
      data.discountType ===
        "percentage" &&
      data.discountValue ===
        undefined
    ) {
      ctx.addIssue({
        code: "custom",
        path: ["discountValue"],
        message:
          "Percentage discount value is required.",
      });
    }

    if (
      data.discountType === "fixed" &&
      data.discountValue ===
        undefined
    ) {
      ctx.addIssue({
        code: "custom",
        path: ["discountValue"],
        message:
          "Fixed discount value is required.",
      });
    }

    if (
      data.discountType ===
        "percentage" &&
      data.discountValue !==
        undefined &&
      data.discountValue > 100
    ) {
      ctx.addIssue({
        code: "custom",
        path: ["discountValue"],
        message:
          "Percentage discount cannot exceed 100%.",
      });
    }

    if (
      data.discountType === "none" &&
      data.discountValue !==
        undefined
    ) {
      ctx.addIssue({
        code: "custom",
        path: ["discountValue"],
        message:
          "Discount value should be empty when discount type is none.",
      });
    }

    /* -------------------------------------------------------
       PRICE VALIDATION
    ------------------------------------------------------- */

    if (
      data.originalPrice !==
        undefined &&
      data.offerPrice !==
        undefined &&
      data.offerPrice >
        data.originalPrice
    ) {
      ctx.addIssue({
        code: "custom",
        path: ["offerPrice"],
        message:
          "Offer price cannot be greater than the original price.",
      });
    }

    if (
      data.discountType !== "none" &&
      data.originalPrice ===
        undefined
    ) {
      ctx.addIssue({
        code: "custom",
        path: ["originalPrice"],
        message:
          "Original price is required when an offer discount is used.",
      });
    }

    if (
      data.discountType !== "none" &&
      data.offerPrice ===
        undefined
    ) {
      ctx.addIssue({
        code: "custom",
        path: ["offerPrice"],
        message:
          "Offer price is required when an offer discount is used.",
      });
    }

    /* -------------------------------------------------------
       CLAIM LIMIT VALIDATION
    ------------------------------------------------------- */

    if (
      data.isClaimLimitEnabled
    ) {
      if (
        data.claimLimit ===
        undefined
      ) {
        ctx.addIssue({
          code: "custom",
          path: ["claimLimit"],
          message:
            "Claim limit is required when limited claims are enabled.",
        });
      }

      if (
        data.claimLimit !==
          undefined &&
        data.claimedCount >
          data.claimLimit
      ) {
        ctx.addIssue({
          code: "custom",
          path: ["claimedCount"],
          message:
            "Claimed count cannot exceed the claim limit.",
        });
      }
    }

    /*
     * If the limit is disabled, claimedCount is still allowed
     * because it represents historical successful claims.
     *
     * claimLimit itself is simply ignored by the application
     * while the limit is disabled.
     */

    /* -------------------------------------------------------
       LINK VALIDATION
    ------------------------------------------------------- */

    const validateLink = (
      value: string | undefined,
      path:
        | "ctaLink"
        | "secondaryCtaLink",
    ) => {
      if (!value) {
        return;
      }

      /*
       * Internal application route.
       */
      if (value.startsWith("/")) {
        return;
      }

      try {
        const parsed =
          new URL(value);

        if (
          ![
            "http:",
            "https:",
            "mailto:",
            "tel:",
          ].includes(
            parsed.protocol,
          )
        ) {
          throw new Error();
        }
      } catch {
        ctx.addIssue({
          code: "custom",
          path: [path],
          message:
            "Use a valid internal path or URL.",
        });
      }
    };

    validateLink(
      data.ctaLink,
      "ctaLink",
    );

    validateLink(
      data.secondaryCtaLink,
      "secondaryCtaLink",
    );

    /* -------------------------------------------------------
       CANONICAL VALIDATION
    ------------------------------------------------------- */

    if (data.canonicalUrl) {
      try {
        const parsed =
          new URL(
            data.canonicalUrl,
          );

        if (
          ![
            "http:",
            "https:",
          ].includes(
            parsed.protocol,
          )
        ) {
          throw new Error();
        }
      } catch {
        ctx.addIssue({
          code: "custom",
          path: [
            "canonicalUrl",
          ],
          message:
            "Canonical URL must be a valid HTTP or HTTPS URL.",
        });
      }
    }
  });

/* =========================================================
   TYPE
========================================================= */

export type OfferInput =
  z.infer<typeof offerSchema>;