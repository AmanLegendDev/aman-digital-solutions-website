"use client";

import BlogArticleHeroSection from "./BlogArticleHeroSection";
import BlogArticleContentSection from "./BlogArticleContentSection";
import BlogArticleTagsSection from "./BlogArticleTagsSection";
import BlogArticleCtaSection from "./BlogArticleCtaSection";

/* =========================================================
   TYPES
========================================================= */

export type BlogDetailImage = {
  url: string;
  publicId?: string;
  alt?: string;
};

export type BlogDetailData = {
  title: string;
  slug: string;

  excerpt: string;
  content: string;

  coverImage?: BlogDetailImage;

  author: string;
  category: string;
  tags: string[];

  readingTime?: number;
  publishedAt?: string;
};

/* =========================================================
   PROPS
========================================================= */

type BlogDetailPageProps = {
  blog: BlogDetailData;
};

/* =========================================================
   PAGE
========================================================= */

export default function BlogDetailPage({
  blog,
}: BlogDetailPageProps) {
  return (
    <main className="min-h-screen bg-[#050505] text-white">
      {/* ===================================================
          ARTICLE HERO
      =================================================== */}

      <BlogArticleHeroSection
        blog={{
          title: blog.title,
          slug: blog.slug,
          excerpt: blog.excerpt,
          coverImage: blog.coverImage,
          author: blog.author,
          category: blog.category,
          readingTime: blog.readingTime,
          publishedAt: blog.publishedAt,
        }}
      />

      {/* ===================================================
          ARTICLE CONTENT
      =================================================== */}

      <BlogArticleContentSection
        content={blog.content}
      />

      {/* ===================================================
          TAGS + ARTICLE META
      =================================================== */}

      <BlogArticleTagsSection
        tags={blog.tags}
        author={blog.author}
        publishedAt={blog.publishedAt}
      />

      {/* ===================================================
          FINAL CTA
      =================================================== */}

      <BlogArticleCtaSection />
    </main>
  );
}