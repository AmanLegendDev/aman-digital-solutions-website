import { z } from "zod";

/* =========================================================
   ENUMS
========================================================= */

export const projectTypeSchema = z.enum([
  "NEW_WEBSITE",
  "REDESIGN",
  "WEB_APPLICATION",
  "ECOMMERCE",
  "BUSINESS_SYSTEM",
  "OTHER",
]);

export const timelineSchema = z.enum([
  "ASAP",
  "1_2_MONTHS",
  "2_3_MONTHS",
  "3_PLUS_MONTHS",
  "FLEXIBLE",
]);

export const budgetRangeSchema = z.enum([
  "UNDER_15000",
  "15000_30000",
  "30000_60000",
  "60000_100000",
  "100000_PLUS",
  "NOT_SURE",
]);

export const contactMethodSchema = z.enum([
  "WHATSAPP",
  "PHONE",
  "EMAIL",
]);

/* =========================================================
   OFFER CONTEXT
========================================================= */

/**
 * This is only the public offer context coming from the URL.
 *
 * IMPORTANT:
 * Do NOT accept offer price, discount, coupon, claimedCount,
 * serviceId, or any other offer-controlled value from the client.
 *
 * The server will resolve the actual offer from the database
 * using offerSlug.
 */
export const offerContextSchema = z.object({
  offerSlug: z
    .string()
    .trim()
    .min(
      1,
      "Invalid offer.",
    )
    .max(
      200,
      "Offer reference is too long.",
    )
    .optional()
    .or(z.literal("")),
});

/* =========================================================
   STEP 1 — CLIENT DETAILS
========================================================= */

export const clientDetailsSchema = z.object({
  fullName: z
    .string()
    .trim()
    .min(
      2,
      "Please enter your full name.",
    )
    .max(
      120,
      "Name is too long.",
    ),

  companyName: z
    .string()
    .trim()
    .max(
      150,
      "Business name is too long.",
    )
    .optional()
    .or(z.literal("")),

  email: z
    .string()
    .trim()
    .email(
      "Please enter a valid email address.",
    )
    .max(
      180,
      "Email address is too long.",
    ),

  phone: z
    .string()
    .trim()
    .min(
      7,
      "Please enter a valid phone number.",
    )
    .max(
      30,
      "Phone number is too long.",
    ),

  location: z
    .string()
    .trim()
    .min(
      2,
      "Please enter your business location.",
    )
    .max(
      150,
      "Location is too long.",
    ),

  currentWebsite: z
    .string()
    .trim()
    .max(
      500,
      "Website URL is too long.",
    )
    .optional()
    .or(z.literal("")),

  preferredContactMethod:
    contactMethodSchema,
});

/* =========================================================
   STEP 2 — PROJECT REQUIREMENTS
========================================================= */

export const projectRequirementsSchema =
  z.object({
    serviceIds: z
      .array(z.string().trim().min(1))
      .min(
        1,
        "Please select at least one service.",
      ),

    projectType:
      projectTypeSchema,

    projectDescription: z
      .string()
      .trim()
      .min(
        20,
        "Please tell us a little more about your project.",
      )
      .max(
        3000,
        "Project description is too long.",
      ),

    requiredPages: z
      .array(
        z
          .string()
          .trim()
          .min(1)
          .max(120),
      )
      .default([]),

    requiredFeatures: z
      .array(
        z
          .string()
          .trim()
          .min(1)
          .max(150),
      )
      .default([]),

    timeline:
      timelineSchema,

    budgetRange:
      budgetRangeSchema,
  });

/* =========================================================
   COMPLETE REQUEST
========================================================= */

export const projectRequestSchema =
  clientDetailsSchema
    .merge(projectRequirementsSchema)
    .merge(offerContextSchema)
    .extend({
      privacyConsent: z.literal(true, {
        error:
          "Please accept the privacy policy.",
      }),
    });

/* =========================================================
   TYPE
========================================================= */

export type ProjectRequestInput =
  z.infer<
    typeof projectRequestSchema
  >;