import { z } from "zod";

export const faqSchema = z.object({
  question: z
    .string()
    .trim()
    .min(5)
    .max(300),

  slug: z
    .string()
    .trim()
    .min(2)
    .max(120)
    .regex(
      /^[a-z0-9]+(?:-[a-z0-9]+)*$/,
      "Slug must contain lowercase letters, numbers and hyphens only"
    ),

  answer: z
    .string()
    .trim()
    .min(10),

  category: z
    .string()
    .trim()
    .max(100)
    .optional(),

  relatedService: z
    .string()
    .trim()
    .optional(),

  relatedProject: z
    .string()
    .trim()
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
});

export type CreateFAQInput =
  z.infer<typeof faqSchema>;