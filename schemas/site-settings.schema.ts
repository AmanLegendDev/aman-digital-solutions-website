import { z } from "zod";

const imageSchema = z.object({
  url: z.string().trim().url(),
  publicId: z.string().trim().optional(),
  alt: z.string().trim().max(160).optional(),
});

const businessHourSchema = z.object({
  day: z.string().trim().min(1),
  isOpen: z.boolean(),
  openTime: z.string().trim().optional(),
  closeTime: z.string().trim().optional(),
});

const socialLinksSchema = z.object({
  instagram: z.string().trim().url().optional(),
  facebook: z.string().trim().url().optional(),
  linkedin: z.string().trim().url().optional(),
  youtube: z.string().trim().url().optional(),
  twitter: z.string().trim().url().optional(),
  github: z.string().trim().url().optional(),
});

const contactSchema = z.object({
  email: z.string().trim().email().optional(),
  phone: z.string().trim().optional(),
  whatsapp: z.string().trim().optional(),
  address: z.string().trim().optional(),
  city: z.string().trim().optional(),
  state: z.string().trim().optional(),
  country: z.string().trim().optional(),
  postalCode: z.string().trim().optional(),
});

export const siteSettingsSchema =
  z.object({
    siteName: z
      .string()
      .trim()
      .min(2)
      .max(150),

    tagline: z
      .string()
      .trim()
      .max(250)
      .optional(),

    description: z
      .string()
      .trim()
      .max(1000)
      .optional(),

    logo: imageSchema.optional(),

    favicon: imageSchema.optional(),

    contact: contactSchema,

    socialLinks: socialLinksSchema,

    businessHours: z
      .array(businessHourSchema)
      .default([]),

    primaryEmail: z
      .string()
      .trim()
      .email()
      .optional(),

    primaryPhone: z
      .string()
      .trim()
      .optional(),

    whatsappNumber: z
      .string()
      .trim()
      .optional(),

    defaultOgImage:
      imageSchema.optional(),

    footerText: z
      .string()
      .trim()
      .max(500)
      .optional(),

    copyrightText: z
      .string()
      .trim()
      .max(250)
      .optional(),

    googleMapsUrl: z
      .string()
      .trim()
      .url()
      .optional(),

    googleAnalyticsId: z
      .string()
      .trim()
      .optional(),

    googleTagManagerId: z
      .string()
      .trim()
      .optional(),

    facebookPixelId: z
      .string()
      .trim()
      .optional(),

    maintenanceMode:
      z.boolean().default(false),

    maintenanceTitle: z
      .string()
      .trim()
      .max(150)
      .optional(),

    maintenanceMessage: z
      .string()
      .trim()
      .max(500)
      .optional(),

    showCookieBanner:
      z.boolean().default(false),

    cookieMessage: z
      .string()
      .trim()
      .max(500)
      .optional(),

    seoTitle: z
      .string()
      .trim()
      .max(70)
      .optional(),

    seoDescription: z
      .string()
      .trim()
      .max(160)
      .optional(),

    defaultCanonicalBaseUrl: z
      .string()
      .trim()
      .url(),
  });

export type SiteSettingsInput =
  z.infer<typeof siteSettingsSchema>;