import { z } from "zod";

const imageSchema = z.object({
  url: z.string().trim().url(),
  publicId: z.string().trim().optional(),
  alt: z.string().trim().max(160).optional(),
});

const mediaSchema = z.object({
  type: z.enum(["image", "video"]),

  url: z.string().trim().url(),

  publicId: z.string().trim().optional(),

  thumbnailUrl: z
    .string()
    .trim()
    .url()
    .optional(),

  thumbnailPublicId: z
    .string()
    .trim()
    .optional(),

  alt: z
    .string()
    .trim()
    .max(160)
    .optional(),

  caption: z
    .string()
    .trim()
    .max(300)
    .optional(),

  displayOrder: z
    .number()
    .int()
    .min(0),
});

export const gallerySchema = z.object({
  title: z
    .string()
    .trim()
    .min(2)
    .max(150),

  slug: z
    .string()
    .trim()
    .min(2)
    .max(120)
    .regex(
      /^[a-z0-9]+(?:-[a-z0-9]+)*$/,
      "Slug must contain lowercase letters, numbers and hyphens only"
    ),

  shortDescription: z
    .string()
    .trim()
    .max(300)
    .optional(),

  description: z
    .string()
    .trim()
    .optional(),

  coverImage: imageSchema.optional(),

  media: z
    .array(mediaSchema)
    .default([]),

  project: z
    .string()
    .trim()
    .min(1)
    .optional(),

  category: z
    .string()
    .trim()
    .max(100)
    .optional(),

  featured: z
    .boolean()
    .default(false),

  published: z
    .boolean()
    .default(false),

  displayOrder: z
    .number()
    .int()
    .min(0)
    .default(0),

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

  canonicalUrl: z
    .string()
    .trim()
    .url()
    .max(500)
    .optional(),

  ogTitle: z
    .string()
    .trim()
    .max(120)
    .optional(),

  ogDescription: z
    .string()
    .trim()
    .max(200)
    .optional(),

  ogImage: imageSchema.optional(),
});

export type CreateGalleryInput =
  z.infer<typeof gallerySchema>;