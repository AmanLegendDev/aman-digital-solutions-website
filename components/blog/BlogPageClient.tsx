"use client";

import BlogHeroSection from "./BlogHeroSection";
import FeaturedBlogSection from "./FeaturedBlogSection";
import BlogGridSection from "./BlogGridSection";
import BlogFinalCtaSection from "./BlogFinalCtaSection";

/* =========================================================
   TYPES
========================================================= */

export type BlogImageData = {
  url: string;
  publicId?: string;
  alt?: string;
};

export type BlogCardData = {
  _id: string;
  title: string;
  slug: string;

  excerpt: string;

  coverImage?: BlogImageData;

  author: string;
  category: string;
  tags: string[];

  readingTime?: number;

  featured: boolean;
  publishedAt?: string;

  displayOrder: number;
};

type BlogPageClientProps = {
  blogs: BlogCardData[];
};

/* =========================================================
   PAGE CLIENT
========================================================= */

export default function BlogPageClient({
  blogs,
}: BlogPageClientProps) {
  /* =======================================================
     SORT
  ======================================================= */

  const sortedBlogs = [...blogs].sort(
    (a, b) =>
      a.displayOrder - b.displayOrder
  );

  /* =======================================================
     FEATURED BLOG
  ======================================================= */

  const featuredBlog =
    sortedBlogs.find(
      (blog) => blog.featured
    ) || undefined;

  /* =======================================================
     NON-FEATURED BLOGS
  ======================================================= */

  const regularBlogs = sortedBlogs.filter(
    (blog) => blog._id !== featuredBlog?._id
  );

  return (
    <main className="min-h-screen bg-[#050505] text-white">
      {/* =====================================================
          HERO
      ===================================================== */}

      <BlogHeroSection />

      {/* =====================================================
          FEATURED ARTICLE
      ===================================================== */}

      <FeaturedBlogSection
        blog={featuredBlog}
      />

      {/* =====================================================
          BLOG GRID
      ===================================================== */}

      <BlogGridSection
        blogs={regularBlogs}
      />

      {/* =====================================================
          FINAL CTA
      ===================================================== */}

      <BlogFinalCtaSection />
    </main>
  );
}