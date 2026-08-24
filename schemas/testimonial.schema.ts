import { z } from "zod";

const imageSchema = z.object({
  url: z.string().trim().url(),
  publicId: z.string().trim().optional(),
  alt: z.string().trim().max(160).optional(),
});

export const testimonialSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2)
    .max(120),

  slug: z
    .string()
    .trim()
    .min(2)
    .max(120)
    .regex(
      /^[a-z0-9]+(?:-[a-z0-9]+)*$/,
      "Slug must contain lowercase letters, numbers and hyphens only"
    ),

  role: z
    .string()
    .trim()
    .max(120)
    .optional(),

  company: z
    .string()
    .trim()
    .max(150)
    .optional(),

  location: z
    .string()
    .trim()
    .max(120)
    .optional(),

  quote: z
    .string()
    .trim()
    .min(10)
    .max(1000),

  image: imageSchema.optional(),

  rating: z
    .number()
    .min(1)
    .max(5)
    .optional(),

  project: z
    .string()
    .trim()
    .max(150)
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

export type CreateTestimonialInput =
  z.infer<typeof testimonialSchema>;