import { z } from "zod";

/* =========================================================
   HELPERS
========================================================= */

const optionalText = (max: number) =>
  z.string().trim().max(max).optional().or(z.literal(""));

const optionalNumber = z.preprocess(
  (value) => {
    if (value === "" || value === null || value === undefined) {
      return undefined;
    }

    return value;
  },
  z.coerce.number().min(0).optional(),
);

const imageSchema = z
  .object({
    url: z
      .string()
      .trim()
      .url("Please provide a valid image URL."),

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
    title: z
      .string()
      .trim()
      .min(2, "Offer title is required.")
      .max(160),

    slug: z
      .string()
      .trim()
      .min(2, "Slug is required.")
      .max(180)
      .regex(
        /^[a-z0-9]+(?:-[a-z0-9]+)*$/,
        "Slug can only contain lowercase letters, numbers and hyphens.",
      ),

    badge: optionalText(80),

    shortDescription: z
      .string()
      .trim()
      .min(10, "Short description is required.")
      .max(320),

    description: z
      .string()
      .trim()
      .min(20, "Offer description is required.")
      .max(20000),

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

    heroImage: imageSchema,

    cardImage: imageSchema,

    highlights: z
      .array(
        z
          .string()
          .trim()
          .min(1)
          .max(240),
      )
      .max(12)
      .default([]),

    includedFeatures: z
      .array(
        z
          .string()
          .trim()
          .min(1)
          .max(240),
      )
      .max(20)
      .default([]),

    ctaLabel: z
      .string()
      .trim()
      .min(2)
      .max(80),

    ctaLink: z
      .string()
      .trim()
      .min(1)
      .max(500),

    secondaryCtaLabel: optionalText(80),

    secondaryCtaLink: optionalText(500),

    termsAndConditions: optionalText(10000),

    startDate: z.coerce.date(),

    endDate: z.coerce.date(),

    published: z.boolean(),

    featured: z.boolean(),

    displayOrder: z
      .coerce
      .number()
      .int()
      .min(0)
      .max(9999),

    seoTitle: optionalText(70),

    seoDescription: optionalText(170),

    canonicalUrl: z
      .string()
      .trim()
      .max(500)
      .optional()
      .or(z.literal("")),

    ogTitle: optionalText(120),

    ogDescription: optionalText(200),

    ogImage: imageSchema,
  })
  .superRefine((data, ctx) => {
    /* DATE */

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

    /* PERCENTAGE */

    if (
      data.discountType === "percentage" &&
      data.discountValue !== undefined &&
      data.discountValue > 100
    ) {
      ctx.addIssue({
        code: "custom",
        path: ["discountValue"],
        message:
          "Percentage discount cannot exceed 100%.",
      });
    }

    /* PRICE */

    if (
      data.originalPrice !== undefined &&
      data.offerPrice !== undefined &&
      data.offerPrice > data.originalPrice
    ) {
      ctx.addIssue({
        code: "custom",
        path: ["offerPrice"],
        message:
          "Offer price cannot be greater than the original price.",
      });
    }

    /* LINKS */

    const validateLink = (
      value: string | undefined,
      path:
        | "ctaLink"
        | "secondaryCtaLink",
    ) => {
      if (!value) return;

      if (value.startsWith("/")) return;

      try {
        const parsed = new URL(value);

        if (
          ![
            "http:",
            "https:",
            "mailto:",
            "tel:",
          ].includes(parsed.protocol)
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

    validateLink(data.ctaLink, "ctaLink");

    validateLink(
      data.secondaryCtaLink,
      "secondaryCtaLink",
    );

    /* CANONICAL */

    if (data.canonicalUrl) {
      try {
        const parsed = new URL(
          data.canonicalUrl,
        );

        if (
          !["http:", "https:"].includes(
            parsed.protocol,
          )
        ) {
          throw new Error();
        }
      } catch {
        ctx.addIssue({
          code: "custom",
          path: ["canonicalUrl"],
          message:
            "Canonical URL must be a valid HTTP or HTTPS URL.",
        });
      }
    }
  });

export type OfferInput = z.infer<
  typeof offerSchema
>;