import type { Metadata } from "next";

import { connectDB } from "@/lib/db/connect";
import Blog from "@/models/Blog";

import BlogPageClient, {
  type BlogCardData,
} from "@/components/blog/BlogPageClient";

/* =========================================================
   METADATA
========================================================= */

export const metadata: Metadata = {
  title: "Blog | Aman Digital Solutions",

  description:
    "Practical insights on web development, technology, SEO, digital strategy and building better digital experiences.",

  alternates: {
    canonical:
      "https://www.amandigitalsolutions.in/blog",
  },

  openGraph: {
    title: "Blog | Aman Digital Solutions",

    description:
      "Practical insights on web development, technology, SEO and digital growth.",

    url:
      "https://www.amandigitalsolutions.in/blog",

    type: "website",
  },

  twitter: {
    card: "summary_large_image",

    title: "Blog | Aman Digital Solutions",

    description:
      "Practical insights on web development, technology, SEO and digital growth.",
  },
};

/* =========================================================
   FETCH BLOGS
========================================================= */

async function getPublishedBlogs(): Promise<
  BlogCardData[]
> {
  await connectDB();

  const blogs = await Blog.find({
    published: true,
  })
    .sort({
      featured: -1,
      displayOrder: 1,
      publishedAt: -1,
      createdAt: -1,
    })
    .lean();

  return blogs.map((blog) => ({
    _id: String(blog._id),

    title: blog.title,

    slug: blog.slug,

    excerpt: blog.excerpt,

    coverImage: blog.coverImage
      ? {
          url: blog.coverImage.url,
          publicId:
            blog.coverImage.publicId ||
            undefined,
          alt:
            blog.coverImage.alt ||
            undefined,
        }
      : undefined,

    author: blog.author,

    category: blog.category,

    tags: Array.isArray(blog.tags)
      ? blog.tags
      : [],

    readingTime:
      blog.readingTime !== undefined
        ? blog.readingTime
        : undefined,

    featured: blog.featured,

    publishedAt: blog.publishedAt
      ? blog.publishedAt.toISOString()
      : undefined,

    displayOrder: blog.displayOrder,
  }));
}

/* =========================================================
   PAGE
========================================================= */

export default async function BlogPage() {
  const blogs = await getPublishedBlogs();

  return (
    <BlogPageClient
      blogs={blogs}
    />
  );
}