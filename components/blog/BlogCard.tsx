import Link from "next/link";
import {
  ArrowUpRight,
  CalendarDays,
  Clock3,
} from "lucide-react";

import type { BlogCardData } from "./BlogPageClient";

/* =========================================================
   PROPS
========================================================= */

type BlogCardProps = {
  blog: BlogCardData;
};

/* =========================================================
   DATE FORMATTER
========================================================= */

function formatDate(date?: string) {
  if (!date) return null;

  const parsed = new Date(date);

  if (Number.isNaN(parsed.getTime())) {
    return null;
  }

  return new Intl.DateTimeFormat("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(parsed);
}

/* =========================================================
   CARD
========================================================= */

export default function BlogCard({
  blog,
}: BlogCardProps) {
  const publishedDate = formatDate(
    blog.publishedAt
  );

  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-[1.75rem] border border-white/[0.07] bg-[#090909] transition-all duration-400 hover:-translate-y-1 hover:border-[#FFC400]/15 hover:bg-[#0A0A0A]">
      {/* =====================================================
          IMAGE
      ===================================================== */}

      <Link
        href={`/blog/${blog.slug}`}
        aria-label={`Read ${blog.title}`}
        className="block overflow-hidden"
      >
        <div className="relative aspect-[16/10] overflow-hidden bg-[#0A0A0A]">
          {blog.coverImage?.url ? (
            <img
              src={blog.coverImage.url}
              alt={
                blog.coverImage.alt ||
                blog.title
              }
              className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.035]"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center">
              <span className="text-[9px] font-semibold uppercase tracking-[0.18em] text-neutral-800">
                No cover image
              </span>
            </div>
          )}

          {/* IMAGE EDGE */}

          <div
            aria-hidden="true"
            className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-black/20 to-transparent"
          />
        </div>
      </Link>

      {/* =====================================================
          CONTENT
      ===================================================== */}

      <div className="flex flex-1 flex-col p-5 sm:p-6">
        {/* META */}

        <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
          <span className="rounded-full border border-[#FFC400]/15 bg-[#FFC400]/[0.04] px-2.5 py-1.5 text-[8px] font-semibold uppercase tracking-[0.14em] text-[#FFC400]">
            {blog.category}
          </span>

          {blog.readingTime && (
            <span className="flex items-center gap-1.5 text-[8px] font-medium uppercase tracking-[0.12em] text-neutral-700">
              <Clock3 size={11} />

              {blog.readingTime} min
            </span>
          )}
        </div>

        {/* TITLE */}

        <Link
          href={`/blog/${blog.slug}`}
          className="mt-5 block"
        >
          <h3 className="line-clamp-2 text-xl font-semibold leading-[1.08] tracking-[-0.035em] text-white transition-colors duration-300 group-hover:text-[#FFC400] sm:text-2xl">
            {blog.title}
          </h3>
        </Link>

        {/* EXCERPT */}

        <p className="mt-4 line-clamp-3 text-xs leading-6 text-neutral-600 sm:text-sm">
          {blog.excerpt}
        </p>

        {/* TAGS */}

        {blog.tags.length > 0 && (
          <div className="mt-5 flex flex-wrap gap-1.5">
            {blog.tags
              .slice(0, 3)
              .map((tag) => (
                <span
                  key={tag}
                  className="text-[8px] font-medium uppercase tracking-[0.1em] text-neutral-800"
                >
                  #{tag}
                </span>
              ))}
          </div>
        )}

        {/* =================================================
            FOOTER
        ================================================= */}

        <div className="mt-auto pt-6">
          <div className="border-t border-white/[0.06] pt-4">
            <div className="flex items-center justify-between gap-4">
              {/* AUTHOR / DATE */}

              <div className="min-w-0">
                <p className="truncate text-[9px] font-semibold uppercase tracking-[0.12em] text-neutral-600">
                  {blog.author}
                </p>

                {publishedDate && (
                  <div className="mt-1.5 flex items-center gap-1.5 text-[8px] font-medium uppercase tracking-[0.1em] text-neutral-800">
                    <CalendarDays size={10} />

                    {publishedDate}
                  </div>
                )}
              </div>

              {/* ARROW */}

              <Link
                href={`/blog/${blog.slug}`}
                aria-label={`Open ${blog.title}`}
                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-white/[0.08] text-neutral-600 transition-all duration-300 group-hover:border-[#FFC400]/25 group-hover:bg-[#FFC400]/[0.05] group-hover:text-[#FFC400]"
              >
                <ArrowUpRight
                  size={14}
                  className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}