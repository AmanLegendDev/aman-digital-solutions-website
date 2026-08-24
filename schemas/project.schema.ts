import { z } from "zod";

/* =====================================================
   IMAGE
===================================================== */

const imageSchema = z.object({
  url: z.string().trim().url(),
  publicId: z.string().trim().optional(),
  alt: z.string().trim().max(160).optional(),
});

/* =====================================================
   GALLERY MEDIA
===================================================== */

const galleryMediaSchema = z.object({
  type: z.enum(["image", "video"]),

  url: z.string().trim().url(),

  publicId: z.string().trim().optional(),

  title: z
    .string()
    .trim()
    .min(1, "Media title is required")
    .max(160),
});

/* =====================================================
   FEATURE
===================================================== */

const featureSchema = z.object({
  title: z
    .string()
    .trim()
    .min(1)
    .max(120),

  description: z
    .string()
    .trim()
    .min(1)
    .max(500),

  icon: z
    .string()
    .trim()
    .max(100)
    .optional(),
});

/* =====================================================
   RESULT
===================================================== */

const resultSchema = z.object({
  label: z
    .string()
    .trim()
    .min(1)
    .max(100),

  value: z
    .string()
    .trim()
    .min(1)
    .max(120),

  description: z
    .string()
    .trim()
    .max(300)
    .optional(),
});

/* =====================================================
   PROJECT
===================================================== */

export const projectSchema = z.object({
  /* ---------------------------------------------
     BASIC INFORMATION
  --------------------------------------------- */

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

  client: z
    .string()
    .trim()
    .max(150)
    .optional(),

  industry: z
    .string()
    .trim()
    .max(100)
    .optional(),

  shortDescription: z
    .string()
    .trim()
    .min(10)
    .max(300),

  overview: z
    .string()
    .trim()
    .min(20),

  challenge: z
    .string()
    .trim()
    .optional(),

  solution: z
    .string()
    .trim()
    .optional(),

  /* ---------------------------------------------
     FEATURES
  --------------------------------------------- */

  features: z
    .array(featureSchema)
    .default([]),

  /* ---------------------------------------------
     TECHNOLOGIES
     Example:
     Next.js
     React
     TypeScript
     MongoDB
     Cloudinary
  --------------------------------------------- */

  technologies: z
    .array(
      z
        .string()
        .trim()
        .min(1)
        .max(80)
    )
    .default([]),

  /* ---------------------------------------------
     COVER IMAGE
  --------------------------------------------- */

  coverImage: imageSchema.optional(),

  /* ---------------------------------------------
     GALLERY
     Images + Videos
  --------------------------------------------- */

  gallery: z
    .array(galleryMediaSchema)
    .default([]),

  /* ---------------------------------------------
     LINKS
  --------------------------------------------- */

  liveUrl: z
    .string()
    .trim()
    .url()
    .max(500)
    .optional(),

  githubUrl: z
    .string()
    .trim()
    .url()
    .max(500)
    .optional(),

  /* ---------------------------------------------
     RELATED SERVICES
  --------------------------------------------- */

  services: z
    .array(
      z
        .string()
        .trim()
        .min(1)
    )
    .default([]),

  /* ---------------------------------------------
     RESULTS
  --------------------------------------------- */

  results: z
    .array(resultSchema)
    .default([]),

  /* ---------------------------------------------
     PUBLISHING
  --------------------------------------------- */

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

  /* ---------------------------------------------
     SEO
  --------------------------------------------- */

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

  /* ---------------------------------------------
     SOCIAL / OG
  --------------------------------------------- */

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

/* =====================================================
   TYPE
===================================================== */

export type CreateProjectInput =
  z.infer<typeof projectSchema>;