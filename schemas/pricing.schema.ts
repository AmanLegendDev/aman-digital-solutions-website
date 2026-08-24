import { z } from "zod";

const pricingTypes = [
  "FIXED",
  "STARTING_FROM",
  "CUSTOM",
] as const;

const billingPeriods = [
  "ONE_TIME",
  "MONTHLY",
  "YEARLY",
  "CUSTOM",
  "NONE",
] as const;

const objectIdRegex = /^[a-f\d]{24}$/i;

const ctaLinkSchema = z
  .string()
  .trim()
  .min(1, "CTA link is required.")
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
      message: "Enter a valid internal or external URL.",
    }
  );

export const pricingSchema = z
  .object({
    name: z
      .string()
      .trim()
      .min(2, "Plan name is required.")
      .max(100, "Plan name is too long."),

    slug: z
      .string()
      .trim()
      .min(2, "Slug is required.")
      .max(120, "Slug is too long.")
      .regex(
        /^[a-z0-9]+(?:-[a-z0-9]+)*$/,
        "Slug must contain only lowercase letters, numbers and hyphens."
      ),

    shortDescription: z
      .string()
      .trim()
      .min(10, "Short description is required.")
      .max(300, "Short description is too long."),

    price: z
      .number()
      .finite("Price must be a valid number.")
      .min(0, "Price cannot be negative.")
      .max(100000000, "Price is too large.")
      .optional(),

    currency: z
      .string()
      .trim()
      .min(1, "Currency is required.")
      .max(5, "Currency is too long."),

    pricePrefix: z
      .string()
      .trim()
      .max(30, "Price prefix is too long.")
      .optional(),

    priceSuffix: z
      .string()
      .trim()
      .max(50, "Price suffix is too long.")
      .optional(),

    pricingType: z.enum(pricingTypes),

    billingPeriod: z.enum(billingPeriods),

    features: z
      .array(
        z
          .string()
          .trim()
          .min(1, "Feature cannot be empty.")
          .max(200, "Feature is too long.")
      )
      .min(1, "Add at least one feature."),

    serviceId: z
      .string()
      .trim()
      .regex(objectIdRegex, "Invalid service.")
      .optional()
      .or(z.literal("")),

    ctaText: z
      .string()
      .trim()
      .min(2, "CTA text is required.")
      .max(60, "CTA text is too long."),

    ctaLink: ctaLinkSchema,

    isFeatured: z.boolean(),

    featuredLabel: z
      .string()
      .trim()
      .max(50, "Featured label is too long.")
      .optional(),

    isPublished: z.boolean(),

    displayOrder: z
      .number()
      .int("Display order must be a whole number.")
      .min(0, "Display order cannot be negative.")
      .max(100000, "Display order is too large."),
  })
  .superRefine((data, ctx) => {
    if (
      (data.pricingType === "FIXED" ||
        data.pricingType === "STARTING_FROM") &&
      data.price === undefined
    ) {
      ctx.addIssue({
        code: "custom",
        path: ["price"],
        message:
          data.pricingType === "STARTING_FROM"
            ? "Price is required for Starting From pricing."
            : "Price is required for fixed pricing.",
      });
    }

    if (
      !data.isFeatured &&
      data.featuredLabel &&
      data.featuredLabel.trim().length > 0
    ) {
      ctx.addIssue({
        code: "custom",
        path: ["featuredLabel"],
        message:
          "Featured label can only be used for a featured plan.",
      });
    }

    if (data.billingPeriod === "NONE") {
      return;
    }
  });

export type PricingInput = z.input<typeof pricingSchema>;
export type PricingOutput = z.output<typeof pricingSchema>;