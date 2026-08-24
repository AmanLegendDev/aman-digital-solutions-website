import { z } from "zod";

const imageSchema = z.object({
  url: z.string().trim().url(),
  publicId: z.string().trim().optional(),
  alt: z.string().trim().max(160).optional(),
});

export const blogSchema = z.object({
  title: z
    .string()
    .trim()
    .min(3)
    .max(180),

  slug: z
    .string()
    .trim()
    .min(2)
    .max(120)
    .regex(
      /^[a-z0-9]+(?:-[a-z0-9]+)*$/,
      "Slug must contain lowercase letters, numbers and hyphens only"
    ),

  excerpt: z
    .string()
    .trim()
    .min(10)
    .max(320),

  content: z
    .string()
    .trim()
    .min(20),

  coverImage: imageSchema.optional(),

  author: z
    .string()
    .trim()
    .min(2)
    .max(120),

  category: z
    .string()
    .trim()
    .min(2)
    .max(100),

  tags: z
    .array(
      z
        .string()
        .trim()
        .min(1)
        .max(50)
    )
    .default([]),

  readingTime: z
    .number()
    .int()
    .min(1)
    .optional(),

  featured: z
    .boolean()
    .default(false),

  published: z
    .boolean()
    .default(false),

  publishedAt: z
    .coerce
    .date()
    .optional(),

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

export type CreateBlogInput =
  z.infer<typeof blogSchema>;