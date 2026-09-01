import type { Metadata } from "next";

import { connectDB } from "@/lib/db/connect";
import Blog from "@/models/Blog";

import BlogPageClient, {
  type BlogCardData,
} from "@/components/blog/BlogPageClient";


import Navbar from "@/components/agency/navbar/Navbar";
import Footer from "@/components/agency/footer/Footer";

import {
  getBlogSchema,
  getItemListSchema,
  getCollectionPageSchema,
} from "@/lib/seo/schema";
import { blogSchema } from "@/schemas/blog.schema";

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ||
  "https://www.amandigitalsolutions.com";

/* =========================================================
   METADATA
========================================================= */

export const metadata: Metadata = {
  title:
    "Blog | Web Development, SEO & Digital Growth | Aman Digital Solutions",

  description:
    "Read practical insights on web development, SEO, digital marketing, business systems and building better digital experiences with Aman Digital Solutions.",

  alternates: {
    canonical: "/blog",
  },

  openGraph: {
    title:
      "Blog | Aman Digital Solutions",

    description:
      "Practical insights on web development, SEO, technology and digital growth.",

    url: "/blog",

    type: "website",

    siteName:
      "Aman Digital Solutions",

    locale:
      "en_IN",
  },

  twitter: {
    card:
      "summary_large_image",

    title:
      "Blog | Aman Digital Solutions",

    description:
      "Practical insights on web development, SEO, technology and digital growth.",
  },

  robots: {
    index: true,
    follow: true,

    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
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

  const blogUrl = `${SITE_URL}/blog`;

  const blogItems = blogs.map((blog) => ({
    name: blog.title,
    url: `${blogUrl}/${blog.slug}`,

    ...(blog.coverImage?.url
      ? {
          image: blog.coverImage.url,
        }
      : {}),

    description: blog.excerpt,
  }));

  const blogItemList = getItemListSchema({
    id: `${blogUrl}#itemlist`,
    name: "Aman Digital Solutions Blog Articles",
    url: blogUrl,
    items: blogItems,
  });

  const blogSchema = getBlogSchema({
    url: blogUrl,
    name:
      "Blog | Web Development, SEO & Digital Growth | Aman Digital Solutions",
    description:
      "Practical insights on web development, SEO, digital marketing, technology and digital growth.",
    itemListId: `${blogUrl}#itemlist`,
  });

  return (
    <>
      <Navbar />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@graph": [
              blogSchema,
              blogItemList,
            ],
          }),
        }}
      />

      <main>
        <BlogPageClient blogs={blogs} />
      </main>

      <Footer />
    </>
  );
}