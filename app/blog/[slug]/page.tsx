import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { connectDB } from "@/lib/db/connect";
import Blog from "@/models/Blog";

import BlogDetailPage, {
  type BlogDetailData,
} from "@/components/blog/detail/BlogDetailPage";

import Navbar from "@/components/agency/navbar/Navbar";
import Footer from "@/components/agency/footer/Footer";

import BreadcrumbSchema from "@/components/seo/BreadcrumbSchema";
import { getWebPageSchema } from "@/lib/seo/schema";

/* =========================================================
   SITE CONFIG
========================================================= */

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ||
  "https://www.amandigitalsolutions.com";

const SITE_NAME = "Aman Digital Solutions";

/* =========================================================
   PARAMS
========================================================= */

type BlogPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

/* =========================================================
   FETCH BLOG
========================================================= */

async function getBlogBySlug(
  slug: string
) {
  await connectDB();

  return Blog.findOne({
    slug: slug.toLowerCase(),
    published: true,
  }).lean();
}

/* =========================================================
   METADATA
========================================================= */

export async function generateMetadata({
  params,
}: BlogPageProps): Promise<Metadata> {
  const { slug } = await params;

  const blog = await getBlogBySlug(slug);

  /* -------------------------------------------------------
     NOT FOUND
  ------------------------------------------------------- */

  if (!blog) {
    return {
      title:
        "Article Not Found | Aman Digital Solutions",

      description:
        "The requested article could not be found.",

      robots: {
        index: false,
        follow: false,
      },
    };
  }

  /* -------------------------------------------------------
     SEO TITLE
  ------------------------------------------------------- */

  const title =
  blog.seoTitle?.trim() ||
  blog.title;

  /* -------------------------------------------------------
     SEO DESCRIPTION
  ------------------------------------------------------- */

  const description =
    blog.seoDescription?.trim() ||
    blog.excerpt;

  /* -------------------------------------------------------
     CANONICAL
  ------------------------------------------------------- */

  const canonical =
  `${SITE_URL}/blog/${blog.slug}`;

  /* -------------------------------------------------------
     OPEN GRAPH
  ------------------------------------------------------- */

  const ogTitle =
    blog.ogTitle?.trim() ||
    title;

  const ogDescription =
    blog.ogDescription?.trim() ||
    description;

  const ogImage =
    blog.ogImage?.url ||
    blog.coverImage?.url;

  const ogImageAlt =
    blog.ogImage?.alt ||
    blog.coverImage?.alt ||
    blog.title;

  /* -------------------------------------------------------
     FINAL METADATA
  ------------------------------------------------------- */

  return {
    title,

    description,

    alternates: {
      canonical,
    },

    openGraph: {
      type: "article",

      locale: "en_IN",

      siteName: SITE_NAME,

      url: canonical,

      title: ogTitle,

      description: ogDescription,

      ...(blog.publishedAt
        ? {
            publishedTime:
              blog.publishedAt.toISOString(),
          }
        : {}),

      ...(blog.updatedAt
        ? {
            modifiedTime:
              blog.updatedAt.toISOString(),
          }
        : {}),

      ...(blog.author
        ? {
            authors: [blog.author],
          }
        : {}),

      ...(blog.category
        ? {
            section: blog.category,
          }
        : {}),

      ...(Array.isArray(blog.tags) &&
      blog.tags.length
        ? {
            tags: blog.tags,
          }
        : {}),

      ...(ogImage
        ? {
            images: [
              {
                url: ogImage,
                alt: ogImageAlt,
              },
            ],
          }
        : {}),
    },

    twitter: {
      card: "summary_large_image",

      title: ogTitle,

      description: ogDescription,

      ...(ogImage
        ? {
            images: [ogImage],
          }
        : {}),
    },

    robots: {
      index: true,
      follow: true,

      googleBot: {
        index: true,
        follow: true,

        "max-image-preview":
          "large",

        "max-snippet": -1,

        "max-video-preview": -1,
      },
    },
  };
}

/* =========================================================
   PAGE
========================================================= */

export default async function BlogPage({
  params,
}: BlogPageProps) {
  const { slug } = await params;

  const blog =
    await getBlogBySlug(slug);

  /* =======================================================
     NOT FOUND
  ======================================================== */

  if (!blog) {
    notFound();
  }

  /* =======================================================
     URL
  ======================================================== */

  const blogUrl =
    `${SITE_URL}/blog/${blog.slug}`;

  /* =======================================================
     SEO VALUES
  ======================================================== */

  const seoTitle =
    blog.seoTitle?.trim() ||
    `${blog.title} | ${SITE_NAME}`;

  const seoDescription =
    blog.seoDescription?.trim() ||
    blog.excerpt;

  /* =======================================================
     PRIMARY IMAGE
  ======================================================== */

  const primaryImage =
    blog.ogImage?.url ||
    blog.coverImage?.url;

  const primaryImageAlt =
    blog.ogImage?.alt ||
    blog.coverImage?.alt ||
    blog.title;

  /* =======================================================
     BLOG ARTICLE SCHEMA
  ======================================================== */

  const articleSchema = {
    "@context":
      "https://schema.org",

    "@type":
      "BlogPosting",

    "@id":
      `${blogUrl}#article`,

    headline:
      blog.title,

    description:
      seoDescription,

    url:
      blogUrl,

    mainEntityOfPage: {
      "@type":
        "WebPage",

      "@id":
        `${blogUrl}#webpage`,
    },

    author: {
      "@type":
        "Person",

      name:
        blog.author,
    },

    publisher: {
      "@type":
        "Organization",

      "@id":
        `${SITE_URL}/#organization`,

      name:
        SITE_NAME,

      url:
        SITE_URL,

      logo: {
        "@type":
          "ImageObject",

        url:
          `${SITE_URL}/icon.png`,
      },
    },

    ...(blog.publishedAt
      ? {
          datePublished:
            blog.publishedAt.toISOString(),
        }
      : {}),

    ...(blog.updatedAt
      ? {
          dateModified:
            blog.updatedAt.toISOString(),
        }
      : {}),

    ...(primaryImage
      ? {
          image: {
            "@type":
              "ImageObject",

            url:
              primaryImage,

            caption:
              primaryImageAlt,
          },
        }
      : {}),

    ...(blog.category
      ? {
          articleSection:
            blog.category,
        }
      : {}),

    ...(Array.isArray(blog.tags) &&
    blog.tags.length
      ? {
          keywords:
            blog.tags.join(", "),
        }
      : {}),
  };

  /* =======================================================
     WEBPAGE SCHEMA
  ======================================================== */

  const webPageSchema =
    getWebPageSchema({
      url:
        blogUrl,

      name:
        seoTitle,

      description:
        seoDescription,
    });

  /* =======================================================
     RENDER
  ======================================================== */

  return (
    <>
      <Navbar />

      {/* ===================================================
          BREADCRUMB SCHEMA
      =================================================== */}

      <BreadcrumbSchema
        items={[
          {
            name: "Home",
            url: "/",
          },

          {
            name: "Blog",
            url: "/blog",
          },

          {
            name: blog.title,
            url:
              `/blog/${blog.slug}`,
          },
        ]}
      />

      {/* ===================================================
          ARTICLE SCHEMA
      =================================================== */}

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html:
            JSON.stringify(
              articleSchema
            ),
        }}
      />

      {/* ===================================================
          WEBPAGE SCHEMA
      =================================================== */}

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html:
            JSON.stringify(
              webPageSchema
            ),
        }}
      />

      {/* ===================================================
          SEMANTIC BREADCRUMB
      =================================================== */}

      <nav
        aria-label="Breadcrumb"
        className="sr-only"
      >
        <ol>
          <li>
            <a href="/">
              Home
            </a>
          </li>

          <li>
            <a href="/blog">
              Blog
            </a>
          </li>

          <li aria-current="page">
            {blog.title}
          </li>
        </ol>
      </nav>

      {/* ===================================================
          BLOG ARTICLE
      =================================================== */}

      <main>
        <BlogDetailPage
          blog={{
            title:
              blog.title,

            slug:
              blog.slug,

            excerpt:
              blog.excerpt,

            content:
              blog.content,

            coverImage:
              blog.coverImage
                ? {
                    url:
                      blog.coverImage.url,

                    publicId:
                      blog.coverImage
                        .publicId ||
                      undefined,

                    alt:
                      blog.coverImage.alt ||
                      blog.title,
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
              blog.readingTime !==
              undefined
                ? blog.readingTime
                : undefined,

            publishedAt:
              blog.publishedAt
                ? blog.publishedAt.toISOString()
                : undefined,
          }}
        />
      </main>

      <Footer />
    </>
  );
}