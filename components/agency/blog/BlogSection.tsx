import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

import { connectDB } from "@/lib/db/connect";
import Blog from "@/models/Blog";

import BlogIntro from "./BlogIntro";
import BlogCard from "./BlogCard";

async function getBlogPosts() {
  await connectDB();

  const posts = await Blog.find({
    published: true,
    publishedAt: {
      $lte: new Date(),
    },
  })
    .sort({
      featured: -1,
      publishedAt: -1,
      displayOrder: 1,
      createdAt: -1,
    })
    .limit(3)
    .select(
      [
        "title",
        "slug",
        "excerpt",
        "coverImage",
        "author",
        "category",
        "tags",
        "readingTime",
        "featured",
        "publishedAt",
      ].join(" ")
    )
    .lean();

  return posts.map((post) => ({
    id: post._id.toString(),

    title: post.title,

    slug: post.slug,

    excerpt: post.excerpt,

    coverImage: post.coverImage
      ? {
          url: post.coverImage.url,
          publicId:
            post.coverImage.publicId ?? null,
          alt:
            post.coverImage.alt ??
            post.title,
        }
      : null,

    author: post.author,

    category: post.category,

    tags: Array.isArray(post.tags)
      ? post.tags
      : [],

    readingTime:
      post.readingTime ?? null,

    featured: post.featured,

    publishedAt: post.publishedAt
      ? post.publishedAt.toISOString()
      : null,
  }));
}

export default async function BlogSection() {
  const posts = await getBlogPosts();

  if (posts.length === 0) {
    return null;
  }

  return (
    <section
      id="blog"
      aria-labelledby="blog-heading"
      className="relative w-full max-w-full scroll-mt-28 overflow-x-clip border-t border-[#1A1A1A] bg-[#080808] py-24 sm:py-28 lg:py-32"
    >
      {/* AMBIENT GLOW */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-40 top-1/3 h-[420px] w-[420px] rounded-full bg-[#FFC400]/[0.02] blur-[140px]"
      />

      <div className="relative mx-auto w-full max-w-7xl min-w-0 px-5 sm:px-8 lg:px-10">
        <div className="grid min-w-0 gap-14 lg:grid-cols-[0.7fr_1.3fr] lg:gap-20">
          
          {/* LEFT — STICKY INTRO */}
          <aside className="min-w-0 lg:sticky lg:top-32 lg:h-fit lg:self-start">
            <BlogIntro />
          </aside>

          {/* RIGHT — ARTICLES */}
          <div className="min-w-0">
            <div className="border-t border-[#202020]">
              {posts.map((post, index) => (
                <BlogCard
                  key={post.id}
                  post={post}
                  index={index}
                  featured={post.featured}
                />
              ))}
            </div>

            {/* VIEW ALL */}
            <div className="flex justify-start pt-8 sm:justify-end">
              <Link
                href="/blog"
                className="group inline-flex items-center gap-2 rounded-full border border-[#2A2A2A] bg-[#0A0A0A] px-5 py-3 text-xs font-medium tracking-wide text-[#CFCFCF] transition-all duration-300 hover:border-[#FFC400]/40 hover:bg-[#FFC400]/[0.06] hover:text-[#FFC400] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FFC400]/70"
              >
                View all insights

                <ArrowUpRight
                  size={14}
                  className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}