import { z } from "zod";

const imageSchema = z.object({
  url: z.string().trim().url(),
  publicId: z.string().trim().optional(),
  alt: z.string().trim().max(160).optional(),
});

export const locationSchema = z.object({
  name: z.string().trim().min(2).max(120),

  slug: z
    .string()
    .trim()
    .min(2)
    .max(120)
    .regex(
      /^[a-z0-9]+(?:-[a-z0-9]+)*$/,
      "Slug must contain lowercase letters, numbers and hyphens only"
    ),

  shortDescription: z.string().trim().min(10).max(300),

  description: z.string().trim().min(20),

  image: imageSchema.optional(),

  address: z.string().trim().max(300).optional(),

  city: z.string().trim().min(2).max(100),

  state: z.string().trim().max(100).optional(),

  country: z.string().trim().min(2).max(100),

  postalCode: z.string().trim().max(20).optional(),

  latitude: z
    .number()
    .min(-90)
    .max(90)
    .optional(),

  longitude: z
    .number()
    .min(-180)
    .max(180)
    .optional(),

  phone: z.string().trim().max(30).optional(),

  email: z
    .string()
    .trim()
    .email()
    .max(150)
    .optional()
    .or(z.literal("")),

  mapUrl: z
    .string()
    .trim()
    .url()
    .max(500)
    .optional()
    .or(z.literal("")),

  services: z.array(
    z.string().trim().min(1)
  ).default([]),

  featured: z.boolean().default(false),

  published: z.boolean().default(false),

  displayOrder: z.number().int().min(0).default(0),

  seoTitle: z.string().trim().max(70).optional(),

  seoDescription: z.string().trim().max(160).optional(),

  canonicalUrl: z
    .string()
    .trim()
    .url()
    .max(500)
    .optional(),

  ogTitle: z.string().trim().max(120).optional(),

  ogDescription: z.string().trim().max(200).optional(),

  ogImage: imageSchema.optional(),
});

export type CreateLocationInput =
  z.infer<typeof locationSchema>;