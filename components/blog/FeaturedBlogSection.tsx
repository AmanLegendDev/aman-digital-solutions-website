import Link from "next/link";
import {
  ArrowRight,
  CalendarDays,
  Clock3,
  Sparkles,
} from "lucide-react";

import type { BlogCardData } from "./BlogPageClient";

/* =========================================================
   PROPS
========================================================= */

type FeaturedBlogSectionProps = {
  blog?: BlogCardData;
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
   COMPONENT
========================================================= */

export default function FeaturedBlogSection({
  blog,
}: FeaturedBlogSectionProps) {
  if (!blog) {
    return null;
  }

  const publishedDate = formatDate(
    blog.publishedAt
  );

  return (
    <section className="relative overflow-hidden border-b border-white/[0.06] bg-[#050505] py-20 sm:py-24 lg:py-28">
      <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
        {/* =================================================
            SECTION HEADER
        ================================================= */}

        <div className="mb-10 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <div className="flex items-center gap-3">
              <span
                aria-hidden="true"
                className="flex h-8 w-8 items-center justify-center rounded-xl border border-[#FFC400]/20 bg-[#FFC400]/[0.05] text-[#FFC400]"
              >
                <Sparkles size={14} />
              </span>

              <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#FFC400]">
                Featured article
              </span>
            </div>

            <h2 className="mt-5 text-3xl font-semibold tracking-[-0.04em] text-white sm:text-4xl">
              Worth reading.
            </h2>
          </div>

          <p className="max-w-sm text-xs leading-6 text-neutral-600 sm:text-right">
            One article we think is especially useful
            right now.
          </p>
        </div>

        {/* =================================================
            FEATURED CARD
        ================================================= */}

        <article className="group overflow-hidden rounded-[2rem] border border-white/[0.07] bg-[#090909] transition-all duration-500 hover:border-[#FFC400]/15">
          <div className="grid lg:grid-cols-[1.15fr_0.85fr]">
            {/* =================================================
                IMAGE
            ================================================= */}

            <Link
              href={`/blog/${blog.slug}`}
              aria-label={`Read ${blog.title}`}
              className="relative block overflow-hidden bg-[#0A0A0A]"
            >
              <div className="relative aspect-[16/10] overflow-hidden lg:aspect-auto lg:h-full lg:min-h-[500px]">
                {blog.coverImage?.url ? (
                  <img
                    src={blog.coverImage.url}
                    alt={
                      blog.coverImage.alt ||
                      blog.title
                    }
                    className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.025]"
                  />
                ) : (
                  <div className="flex h-full min-h-[320px] items-center justify-center bg-[#0A0A0A]">
                    <span className="text-[9px] font-semibold uppercase tracking-[0.18em] text-neutral-800">
                      No cover image
                    </span>
                  </div>
                )}

                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-transparent"
                />
              </div>
            </Link>

            {/* =================================================
                CONTENT
            ================================================= */}

            <div className="flex flex-col justify-between p-6 sm:p-8 lg:p-10">
              <div>
                {/* META */}

                <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
                  <span className="rounded-full border border-[#FFC400]/15 bg-[#FFC400]/[0.04] px-3 py-1.5 text-[8px] font-semibold uppercase tracking-[0.15em] text-[#FFC400]">
                    {blog.category}
                  </span>

                  {blog.readingTime && (
                    <span className="flex items-center gap-1.5 text-[9px] font-medium uppercase tracking-[0.12em] text-neutral-700">
                      <Clock3 size={12} />

                      {blog.readingTime} min read
                    </span>
                  )}
                </div>

                {/* TITLE */}

                <Link
                  href={`/blog/${blog.slug}`}
                  className="block"
                >
                  <h3 className="mt-7 text-3xl font-semibold leading-[1.02] tracking-[-0.045em] text-white transition-colors duration-300 group-hover:text-white sm:text-4xl lg:text-[3rem]">
                    {blog.title}
                  </h3>
                </Link>

                {/* EXCERPT */}

                <p className="mt-6 max-w-xl text-sm leading-7 text-neutral-500">
                  {blog.excerpt}
                </p>

                {/* TAGS */}

                {blog.tags.length > 0 && (
                  <div className="mt-7 flex flex-wrap gap-2">
                    {blog.tags
                      .slice(0, 4)
                      .map((tag) => (
                        <span
                          key={tag}
                          className="rounded-full border border-white/[0.06] bg-white/[0.015] px-2.5 py-1.5 text-[8px] font-medium uppercase tracking-[0.12em] text-neutral-700"
                        >
                          {tag}
                        </span>
                      ))}
                  </div>
                )}
              </div>

              {/* =================================================
                  FOOTER
              ================================================= */}

              <div className="mt-10 border-t border-white/[0.06] pt-5">
                <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
                  {/* AUTHOR / DATE */}

                  <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
                    <span className="text-[9px] font-semibold uppercase tracking-[0.14em] text-neutral-500">
                      {blog.author}
                    </span>

                    {publishedDate && (
                      <>
                        <span
                          aria-hidden="true"
                          className="h-1 w-1 rounded-full bg-neutral-800"
                        />

                        <span className="flex items-center gap-1.5 text-[9px] font-medium uppercase tracking-[0.12em] text-neutral-700">
                          <CalendarDays size={11} />

                          {publishedDate}
                        </span>
                      </>
                    )}
                  </div>

                  {/* CTA */}

                  <Link
                    href={`/blog/${blog.slug}`}
                    className="group/link inline-flex items-center gap-2 text-[9px] font-semibold uppercase tracking-[0.16em] text-white/60 transition-colors hover:text-[#FFC400]"
                  >
                    Read article

                    <span className="flex h-8 w-8 items-center justify-center rounded-full border border-white/[0.08] transition-all duration-300 group-hover/link:border-[#FFC400]/25 group-hover/link:bg-[#FFC400]/[0.04]"
                    >
                      <ArrowRight
                        size={13}
                        className="transition-transform duration-300 group-hover/link:translate-x-0.5"
                      />
                    </span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </article>
      </div>
    </section>
  );
}