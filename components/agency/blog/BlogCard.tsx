"use client";

import Link from "next/link";
import {
  ArrowUpRight,
  Clock3,
  Tag,
} from "lucide-react";
import { motion } from "framer-motion";

type BlogPostData = {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  coverImage: {
    url: string;
    publicId: string | null;
    alt: string;
  } | null;
  author: string;
  category: string;
  tags: string[];
  readingTime: number | null;
  featured: boolean;
  publishedAt: string | null;
};

type BlogCardProps = {
  post: BlogPostData;
  featured?: boolean;
  index?: number;
};

function formatDate(date: string | null) {
  if (!date) return "";

  return new Intl.DateTimeFormat("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(new Date(date));
}

export default function BlogCard({
  post,
  featured = false,
  index = 0,
}: BlogCardProps) {
  return (
    <motion.article
      initial={{
        opacity: 0,
        y: 22,
      }}
      whileInView={{
        opacity: 1,
        y: 0,
      }}
      viewport={{
        once: true,
        amount: 0.12,
      }}
      transition={{
        duration: 0.5,
        delay: Math.min(index * 0.07, 0.18),
        ease: [0.22, 1, 0.36, 1],
      }}
      className={[
        "group relative min-w-0 w-full max-w-full overflow-hidden rounded-[26px] border transition-all duration-300",
        featured
          ? "border-[#292929] bg-[#0C0C0C] hover:border-[#383838]"
          : "border-[#202020] bg-[#0A0A0A] hover:border-[#303030]",
      ].join(" ")}
    >
      {/* IMAGE */}
      <Link
        href={`/blog/${post.slug}`}
        aria-label={`Read ${post.title}`}
        className="block"
      >
        <div
          className={[
            "relative w-full overflow-hidden bg-[#101010]",
            featured
              ? "aspect-[16/7] sm:aspect-[16/6]"
              : "aspect-[16/9]",
          ].join(" ")}
        >
          {post.coverImage ? (
            <img
              src={post.coverImage.url}
              alt={post.coverImage.alt}
              loading={featured ? "eager" : "lazy"}
              className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.035]"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center">
              <span className="text-xs uppercase tracking-[0.18em] text-[#333]">
                Aman Digital Solutions
              </span>
            </div>
          )}

          {/* IMAGE OVERLAY */}
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/10 to-transparent"
          />

          {/* CATEGORY */}
          <span className="absolute left-5 top-5 inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-black/45 px-3 py-1.5 text-[9px] font-medium uppercase tracking-[0.15em] text-white/75 backdrop-blur-md">
            <Tag
              size={10}
              className="text-[#FFC400]"
            />

            {post.category}
          </span>

          {/* FEATURED */}
          {featured && (
            <span className="absolute right-5 top-5 rounded-full border border-[#FFC400]/25 bg-[#FFC400]/10 px-3 py-1.5 text-[9px] font-semibold uppercase tracking-[0.15em] text-[#FFC400] backdrop-blur-md">
              Featured
            </span>
          )}

          {/* IMAGE BOTTOM META */}
          <div className="absolute bottom-5 left-5 right-5 flex min-w-0 items-end justify-between gap-4">
            <div className="min-w-0">
              {post.publishedAt && (
                <p className="text-[10px] text-white/50">
                  {formatDate(post.publishedAt)}
                </p>
              )}

              {post.readingTime && (
                <div className="mt-1 flex items-center gap-1.5 text-[10px] text-white/55">
                  <Clock3 size={11} />

                  <span>
                    {post.readingTime} min read
                  </span>
                </div>
              )}
            </div>

            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white/15 bg-black/45 text-white opacity-0 backdrop-blur-md transition-all duration-300 group-hover:opacity-100">
              <ArrowUpRight
                size={16}
                className="transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
              />
            </span>
          </div>
        </div>
      </Link>

      {/* CONTENT */}
      <div
        className={
          featured
            ? "min-w-0 p-6 sm:p-8 lg:p-9"
            : "min-w-0 p-5 sm:p-6"
        }
      >
        {/* TITLE */}
        <Link
          href={`/blog/${post.slug}`}
          className="block"
        >
          <h3
            className={[
              "min-w-0 break-words font-semibold tracking-[-0.035em] text-[#EAEAEA] transition-colors duration-200 group-hover:text-white",
              featured
                ? "max-w-4xl text-2xl leading-tight sm:text-3xl lg:text-[2.25rem] lg:leading-[1.08]"
                : "text-xl leading-tight",
            ].join(" ")}
          >
            {post.title}
          </h3>
        </Link>

        {/* EXCERPT */}
        <p
          className={[
            "min-w-0 max-w-3xl break-words text-[#777]",
            featured
              ? "mt-4 text-sm leading-7 sm:text-base"
              : "mt-3 text-sm leading-6",
          ].join(" ")}
        >
          {post.excerpt}
        </p>

        {/* FOOTER */}
        <div className="mt-6 flex min-w-0 items-center justify-between gap-4 border-t border-[#202020] pt-5">
          {/* AUTHOR */}
          <div className="min-w-0">
            <p className="text-[9px] uppercase tracking-[0.16em] text-[#444]">
              Written by
            </p>

            <p className="mt-1 truncate text-xs font-medium text-[#8A8A8A]">
              {post.author}
            </p>
          </div>

          {/* TAGS */}
          {post.tags.length > 0 && (
            <div className="hidden min-w-0 max-w-[55%] flex-wrap justify-end gap-1.5 sm:flex">
              {post.tags.slice(0, 2).map((tag) => (
                <span
                  key={tag}
                  className="max-w-[130px] truncate rounded-full border border-[#222] bg-[#0E0E0E] px-2.5 py-1 text-[9px] text-[#555]"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}

          {/* READ */}
          <Link
            href={`/blog/${post.slug}`}
            className="group/read ml-auto inline-flex shrink-0 items-center gap-2 text-xs font-medium text-[#999] transition-colors duration-200 hover:text-[#FFC400]"
          >
            Read

            <ArrowUpRight
              size={14}
              className="transition-transform duration-200 group-hover/read:-translate-y-0.5 group-hover/read:translate-x-0.5"
            />
          </Link>
        </div>
      </div>
    </motion.article>
  );
}