import type { Metadata } from "next";
import Link from "next/link";

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

/* =========================================================
   SITE CONFIG
========================================================= */

const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL ||
  "https://www.amandigitalsolutions.com"
).replace(/\/$/, "");

const BLOG_URL =
  `${SITE_URL}/blog`;

const SITE_NAME =
  "Aman Digital Solutions";

/*
 * Blog content changes through CMS, but does not need to
 * invalidate on every request.
 */
export const revalidate = 3600;

/* =========================================================
   METADATA
========================================================= */

export const metadata: Metadata = {
  title:
    "Blog | Web Development, SEO & Digital Growth",

  description:
    "Read practical insights on web development, SEO, digital marketing, business systems and digital growth from Aman Digital Solutions, serving businesses in Shimla, Himachal Pradesh, across India and beyond.",

  alternates: {
    canonical:
      BLOG_URL,
  },

  robots: {
    index: true,
    follow: true,

    googleBot: {
      index: true,
      follow: true,
      "max-image-preview":
        "large",
      "max-snippet":
        -1,
      "max-video-preview":
        -1,
    },
  },

  openGraph: {
    title:
      "Blog | Web Development, SEO & Digital Growth",

    description:
      "Practical insights on web development, SEO, technology and digital growth for businesses in Shimla, Himachal Pradesh, across India and beyond.",

    url:
      BLOG_URL,

    siteName:
      SITE_NAME,

    type:
      "website",

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

  return blogs
    .filter(
      (blog) =>
        Boolean(blog.title) &&
        Boolean(blog.slug)
    )
    .map((blog) => ({
      _id:
        String(blog._id),

      title:
        blog.title,

      slug:
        blog.slug,

      excerpt:
        blog.excerpt || "",

      coverImage:
        blog.coverImage
          ? {
              url:
                blog.coverImage.url,

              publicId:
                blog.coverImage.publicId ||
                undefined,

              alt:
                blog.coverImage.alt ||
                undefined,
            }
          : undefined,

      author:
        blog.author,

      category:
        blog.category,

      tags:
        Array.isArray(blog.tags)
          ? blog.tags
          : [],

      readingTime:
        typeof blog.readingTime === "number"
          ? blog.readingTime
          : undefined,

      featured:
        Boolean(blog.featured),

      publishedAt:
        blog.publishedAt instanceof Date
          ? blog.publishedAt.toISOString()
          : undefined,

      /*
       * BlogCardData requires a number.
       * Older CMS records may not have displayOrder,
       * so use 0 as the safe fallback.
       */
      displayOrder:
        typeof blog.displayOrder === "number"
          ? blog.displayOrder
          : 0,
    }));
}

/* =========================================================
   PAGE
========================================================= */

export default async function BlogPage() {
  const blogs =
    await getPublishedBlogs();

  /* =======================================================
     BLOG ITEM LIST
  ======================================================== */

  const blogItems = blogs.map(
    (blog) => ({
      name:
        blog.title,

      url:
        `${BLOG_URL}/${blog.slug}`,

      ...(blog.coverImage?.url
        ? {
            image:
              blog.coverImage.url,
          }
        : {}),

      ...(blog.excerpt
        ? {
            description:
              blog.excerpt,
          }
        : {}),
    })
  );

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
     WEB PAGE SCHEMA
  ======================================================== */

  const webPageSchema = {
    "@type":
      "WebPage",

    "@id":
      `${BLOG_URL}#webpage`,

    url:
      BLOG_URL,

    name:
      "Blog | Web Development, SEO & Digital Growth",

    description:
      "Practical insights on web development, SEO, digital marketing, technology and digital growth for businesses in Shimla, Himachal Pradesh, across India and beyond.",

    isPartOf: {
      "@type":
        "WebSite",

      "@id":
        `${SITE_URL}/#website`,
    },

    mainEntity: {
      "@id":
        `${BLOG_URL}#blog`,
    },

    breadcrumb: {
      "@id":
        `${BLOG_URL}#breadcrumb`,
    },
  };

  /* =======================================================
     BREADCRUMB SCHEMA
  ======================================================== */

  const breadcrumbSchema = {
    "@type":
      "BreadcrumbList",

    "@id":
      `${BLOG_URL}#breadcrumb`,

    itemListElement: [
      {
        "@type":
          "ListItem",

        position:
          1,

        name:
          "Home",

        item:
          SITE_URL,
      },

      {
        "@type":
          "ListItem",

        position:
          2,

        name:
          "Blog",

        item:
          BLOG_URL,
      },
    ],
  };

  /* =======================================================
     STRUCTURED DATA
  ======================================================== */

  const structuredData = {
    "@context":
      "https://schema.org",

    "@graph": [
      {
        ...blogCollectionSchema,

        "@id":
          `${BLOG_URL}#blog`,
      },

      blogItemList,

      webPageSchema,

      breadcrumbSchema,
    ],
  };

  /* =======================================================
     RENDER
  ======================================================== */

  return (
    <>
      {/* =====================================================
          NAVBAR
      ===================================================== */}

      <Navbar />

      {/* =====================================================
          STRUCTURED DATA
      ===================================================== */}

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html:
            JSON.stringify(
              structuredData
            ),
        }}
      />

      {/* =====================================================
          MAIN CONTENT
      ===================================================== */}

      <main
        id="main-content"
        className="min-h-screen"
      >
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

            <li
              aria-current="page"
            >
              Blog
            </li>
          </ol>
        </nav>

        {/* ===================================================
            BLOG CONTENT
        =================================================== */}

        <BlogPageClient
          blogs={blogs}
        />
      </main>

      {/* =====================================================
          FOOTER
      ===================================================== */}

      <Footer />
    </>
  );
}