import { z } from "zod";

/* ---------------------------------------------
   CONSTANTS
--------------------------------------------- */

const serviceCategories = [
  "websites",
  "business-systems",
  "growth",
  "support",
] as const;

const objectIdRegex = /^[a-f\d]{24}$/i;

/* ---------------------------------------------
   IMAGE
--------------------------------------------- */

const imageSchema = z.object({
  url: z
    .string()
    .trim()
    .url("Invalid image URL."),

  publicId: z
    .string()
    .trim()
    .max(300, "Public ID is too long.")
    .optional(),

  alt: z
    .string()
    .trim()
    .max(160, "Alt text is too long.")
    .optional(),
});

/* ---------------------------------------------
   BENEFIT
--------------------------------------------- */

const benefitSchema = z.object({
  title: z
    .string()
    .trim()
    .min(1, "Benefit title is required.")
    .max(120, "Benefit title is too long."),

  description: z
    .string()
    .trim()
    .min(1, "Benefit description is required.")
    .max(
      500,
      "Benefit description is too long."
    ),

  icon: z
    .string()
    .trim()
    .max(100, "Benefit icon is too long.")
    .optional(),
});

/* ---------------------------------------------
   FEATURE
--------------------------------------------- */

const featureSchema = z.object({
  title: z
    .string()
    .trim()
    .min(1, "Feature title is required.")
    .max(120, "Feature title is too long."),

  description: z
    .string()
    .trim()
    .min(1, "Feature description is required.")
    .max(
      500,
      "Feature description is too long."
    ),

  icon: z
    .string()
    .trim()
    .max(100, "Feature icon is too long.")
    .optional(),
});

/* ---------------------------------------------
   PROCESS STEP
--------------------------------------------- */

const processStepSchema = z.object({
  order: z
    .number()
    .int("Process order must be a whole number.")
    .min(1, "Process order must start from 1."),

  title: z
    .string()
    .trim()
    .min(1, "Process step title is required.")
    .max(
      120,
      "Process step title is too long."
    ),

  description: z
    .string()
    .trim()
    .min(1, "Process step description is required.")
    .max(
      500,
      "Process step description is too long."
    ),
});

/* ---------------------------------------------
   CTA LINK
--------------------------------------------- */

const ctaLinkSchema = z
  .string()
  .trim()
  .min(1, "CTA link is required.")
  .max(500, "CTA link is too long.")
  .refine(
    (value) => {
      if (value.startsWith("/")) {
        return true;
      }

      try {
        const url = new URL(value);

        return (
          url.protocol === "https:" ||
          url.protocol === "http:"
        );
      } catch {
        return false;
      }
    },
    {
      message:
        "Enter a valid internal or external URL.",
    }
  );

/* ---------------------------------------------
   OBJECT ID
--------------------------------------------- */

const objectIdSchema = z
  .string()
  .trim()
  .regex(
    objectIdRegex,
    "Invalid reference ID."
  );

/* ---------------------------------------------
   SERVICE
--------------------------------------------- */

export const serviceSchema = z.object({
  /* -------------------------------------------
     BASIC INFORMATION
  ------------------------------------------- */

  title: z
    .string()
    .trim()
    .min(2, "Service title is required.")
    .max(
      120,
      "Service title is too long."
    ),

  slug: z
    .string()
    .trim()
    .min(2, "Slug is required.")
    .max(120, "Slug is too long.")
    .regex(
      /^[a-z0-9]+(?:-[a-z0-9]+)*$/,
      "Slug must contain lowercase letters, numbers and hyphens only."
    ),

  heroEyebrow: z
    .string()
    .trim()
    .max(
      80,
      "Hero eyebrow is too long."
    )
    .optional(),

  shortDescription: z
    .string()
    .trim()
    .min(
      10,
      "Short description is required."
    )
    .max(
      300,
      "Short description is too long."
    ),

  description: z
    .string()
    .trim()
    .min(
      20,
      "Description is required."
    ),

  category: z.enum(serviceCategories),

  /* -------------------------------------------
     VISUALS
  ------------------------------------------- */

  icon: z
    .string()
    .trim()
    .max(100, "Icon name is too long.")
    .optional(),

  image: imageSchema.optional(),

  /* -------------------------------------------
     CONTENT
  ------------------------------------------- */

  benefits: z
    .array(benefitSchema)
    .default([]),

  features: z
    .array(featureSchema)
    .default([]),

  process: z
    .array(processStepSchema)
    .default([]),

  /* -------------------------------------------
     PRICING
  ------------------------------------------- */

  startingPrice: z
    .number()
    .finite("Starting price must be a valid number.")
    .min(
      0,
      "Starting price cannot be negative."
    )
    .optional(),

  priceLabel: z
    .string()
    .trim()
    .max(
      80,
      "Price label is too long."
    )
    .optional(),

  /* -------------------------------------------
     CTA
  ------------------------------------------- */

  ctaLabel: z
    .string()
    .trim()
    .min(
      2,
      "CTA label is required."
    )
    .max(
      80,
      "CTA label is too long."
    )
    .optional(),

  ctaLink: ctaLinkSchema.optional(),

  /* -------------------------------------------
     RELATIONSHIPS
  ------------------------------------------- */

  faqIds: z
    .array(objectIdSchema)
    .default([]),

  projectIds: z
    .array(objectIdSchema)
    .default([]),

  /* -------------------------------------------
     SEO / CONTENT PLANNING
  ------------------------------------------- */

  keywords: z
    .array(
      z
        .string()
        .trim()
        .min(
          1,
          "Keyword cannot be empty."
        )
        .max(
          100,
          "Keyword is too long."
        )
    )
    .default([]),

  seoTitle: z
    .string()
    .trim()
    .max(
      70,
      "SEO title is too long."
    )
    .optional(),

  seoDescription: z
    .string()
    .trim()
    .max(
      160,
      "SEO description is too long."
    )
    .optional(),

 canonicalUrl: z.preprocess(
  (value) => {
    if (
      typeof value === "string" &&
      value.trim() === ""
    ) {
      return undefined;
    }

    return value;
  },
  z
    .string()
    .trim()
    .url("Invalid canonical URL.")
    .max(
      500,
      "Canonical URL is too long."
    )
    .optional()
),

  ogTitle: z
    .string()
    .trim()
    .max(
      120,
      "OG title is too long."
    )
    .optional(),

  ogDescription: z
    .string()
    .trim()
    .max(
      200,
      "OG description is too long."
    )
    .optional(),

  ogImage: imageSchema.optional(),

  /* -------------------------------------------
     PUBLISHING
  ------------------------------------------- */

  featured: z
    .boolean()
    .default(false),

  published: z
    .boolean()
    .default(false),

  displayOrder: z
    .number()
    .int(
      "Display order must be a whole number."
    )
    .min(
      0,
      "Display order cannot be negative."
    )
    .max(
      100000,
      "Display order is too large."
    )
    .default(0),
});

export type CreateServiceInput =
  z.infer<typeof serviceSchema>;

export type ServiceInput =
  z.infer<typeof serviceSchema>;