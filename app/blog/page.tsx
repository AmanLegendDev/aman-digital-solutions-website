import type { Metadata } from "next";
import Link from "next/link";

export const dynamic = "force-dynamic";

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
} from "@/lib/seo/schema";

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ||
  "https://www.amandigitalsolutions.com";

const BLOG_URL = `${SITE_URL}/blog`;

/* =========================================================
   METADATA
========================================================= */

export const metadata: Metadata = {
  title:
    "Blog | Web Development, SEO & Digital Growth",

  description:
    "Read practical insights on web development, SEO, digital marketing, business systems and digital growth from Aman Digital Solutions, serving businesses in Shimla, Himachal Pradesh, across India and beyond.",

  alternates: {
    canonical: BLOG_URL,
  },

  openGraph: {
    title:
      "Blog | Web Development, SEO & Digital Growth",

    description:
      "Practical insights on web development, SEO, technology and digital growth for businesses in Shimla, Himachal Pradesh, across India and beyond.",

    url: BLOG_URL,

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
      "Blog | Web Development, SEO & Digital Growth",

    description:
      "Practical insights on web development, SEO, technology and digital growth for businesses in Shimla, Himachal Pradesh, across India and beyond.",
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
   FETCH PUBLISHED BLOGS
========================================================= */

async function getPublishedBlogs(): Promise<BlogCardData[]> {
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

    displayOrder:
      blog.displayOrder,
  }));
}

/* =========================================================
   PAGE
========================================================= */

export default async function BlogPage() {
  const blogs = await getPublishedBlogs();

  /* =======================================================
     BLOG ITEM LIST
  ======================================================== */

  const blogItems = blogs.map((blog) => ({
    name: blog.title,

    url:
      `${BLOG_URL}/${blog.slug}`,

    ...(blog.coverImage?.url
      ? {
          image:
            blog.coverImage.url,
        }
      : {}),

    description:
      blog.excerpt,
  }));

  const blogItemList =
    getItemListSchema({
      id:
        `${BLOG_URL}#itemlist`,

      name:
        "Aman Digital Solutions Blog Articles",

      url:
        BLOG_URL,

      items:
        blogItems,
    });

  /* =======================================================
     BLOG COLLECTION SCHEMA
  ======================================================== */

  const blogCollectionSchema =
    getBlogSchema({
      url:
        BLOG_URL,

      name:
        "Blog | Web Development, SEO & Digital Growth",

      description:
        "Practical insights on web development, SEO, digital marketing, technology and digital growth for businesses in Shimla, Himachal Pradesh, across India and beyond.",

      itemListId:
        `${BLOG_URL}#itemlist`,
    });

  /* =======================================================
     RENDER
  ======================================================== */

  return (
    <>
      <Navbar />

      {/* =====================================================
          STRUCTURED DATA
      ===================================================== */}

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",

            "@graph": [
              blogCollectionSchema,
              blogItemList,
            ],
          }),
        }}
      />

      <main>
        {/* ===================================================
            SEMANTIC BREADCRUMB
        =================================================== */}

        <nav
          aria-label="Breadcrumb"
          className="sr-only"
        >
          <ol>
            <li>
              <Link href="/">
                Home
              </Link>
            </li>

            <li aria-current="page">
              Blog
            </li>
          </ol>
        </nav>

        <BlogPageClient
          blogs={blogs}
        />
      </main>

      <Footer />
    </>
  );
}