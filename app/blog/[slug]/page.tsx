import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { connectDB } from "@/lib/db/connect";
import Blog from "@/models/Blog";

import BlogDetailPage, {
  type BlogDetailData,
} from "@/components/blog/detail/BlogDetailPage";

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

  const blog = await Blog.findOne({
    slug: slug.toLowerCase(),
    published: true,
  }).lean();

  return blog;
}

/* =========================================================
   METADATA
========================================================= */

export async function generateMetadata({
  params,
}: BlogPageProps): Promise<Metadata> {
  const { slug } = await params;

  const blog = await getBlogBySlug(slug);

  if (!blog) {
    return {
      title:
        "Article Not Found | Aman Digital Solutions",

      description:
        "The requested article could not be found.",
    };
  }

  const title =
    blog.seoTitle ||
    `${blog.title} | Aman Digital Solutions`;

  const description =
    blog.seoDescription ||
    blog.excerpt;

  const canonical =
    blog.canonicalUrl ||
    `https://www.amandigitalsolutions.in/blog/${blog.slug}`;

  const ogTitle =
    blog.ogTitle ||
    blog.seoTitle ||
    blog.title;

  const ogDescription =
    blog.ogDescription ||
    blog.seoDescription ||
    blog.excerpt;

  const ogImage =
    blog.ogImage?.url ||
    blog.coverImage?.url;

  return {
    title,
    description,

    alternates: {
      canonical,
    },

    openGraph: {
      title: ogTitle,
      description: ogDescription,
      url: canonical,
      type: "article",

      ...(blog.publishedAt
        ? {
            publishedTime:
              blog.publishedAt.toISOString(),
          }
        : {}),

      authors: [blog.author],

      ...(ogImage
        ? {
            images: [
              {
                url: ogImage,
                alt:
                  blog.ogImage?.alt ||
                  blog.coverImage?.alt ||
                  blog.title,
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
  };
}

/* =========================================================
   PAGE
========================================================= */

export default async function BlogPage({
  params,
}: BlogPageProps) {
  const { slug } = await params;

  const blog = await getBlogBySlug(slug);

  if (!blog) {
    notFound();
  }

  /* =======================================================
     SERIALIZE MONGOOSE DATA
  ======================================================= */

  const blogData: BlogDetailData = {
    title: blog.title,

    slug: blog.slug,

    excerpt: blog.excerpt,

    content: blog.content,

    /* =====================================================
       COVER IMAGE
    ===================================================== */

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

    /* =====================================================
       AUTHOR / CATEGORY
    ===================================================== */

    author: blog.author,

    category: blog.category,

    /* =====================================================
       TAGS
    ===================================================== */

    tags: Array.isArray(blog.tags)
      ? blog.tags
      : [],

    /* =====================================================
       READING TIME
    ===================================================== */

    readingTime:
      blog.readingTime !== undefined
        ? blog.readingTime
        : undefined,

    /* =====================================================
       DATE
    ===================================================== */

    publishedAt: blog.publishedAt
      ? blog.publishedAt.toISOString()
      : undefined,
  };

  return (
    <>
      {/* ===================================================
          SEMANTIC BREADCRUMB
      =================================================== */}

      <nav
        aria-label="Breadcrumb"
        className="sr-only"
      >
        <ol>
          <li>
            <a href="/">Home</a>
          </li>

          <li>
            <a href="/blog">Blog</a>
          </li>

          <li aria-current="page">
            {blog.title}
          </li>
        </ol>
      </nav>

      {/* ===================================================
          BLOG DETAIL
      =================================================== */}

      <BlogDetailPage blog={blogData} />
    </>
  );
}