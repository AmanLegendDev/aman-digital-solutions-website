import { FileText } from "lucide-react";

import BlogCard from "./BlogCard";
import type { BlogCardData } from "./BlogPageClient";

/* =========================================================
   PROPS
========================================================= */

type BlogGridSectionProps = {
  blogs: BlogCardData[];
};

/* =========================================================
   COMPONENT
========================================================= */

export default function BlogGridSection({
  blogs,
}: BlogGridSectionProps) {
  return (
    <section
      id="articles"
      className="relative bg-[#050505] py-20 sm:py-24 lg:py-28"
    >
      <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
        {/* =================================================
            HEADER
        ================================================= */}

        <div className="flex flex-col gap-5 border-b border-white/[0.06] pb-8 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#FFC400]">
              Latest articles
            </p>

            <h2 className="mt-3 text-3xl font-semibold tracking-[-0.04em] text-white sm:text-4xl">
              More from the blog.
            </h2>
          </div>

          {blogs.length > 0 && (
            <p className="max-w-sm text-xs leading-6 text-neutral-700 sm:text-right">
              Practical ideas, lessons and perspectives
              from our work across digital and technology.
            </p>
          )}
        </div>

        {/* =================================================
            GRID
        ================================================= */}

        {blogs.length > 0 ? (
          <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3 lg:gap-6">
            {blogs.map((blog) => (
              <BlogCard
                key={blog._id}
                blog={blog}
              />
            ))}
          </div>
        ) : (
          /* =================================================
             EMPTY STATE
          ================================================= */

          <div className="mt-10 flex min-h-[300px] flex-col items-center justify-center rounded-[2rem] border border-dashed border-white/[0.08] bg-[#080808] px-6 text-center">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-white/[0.07] bg-[#0C0C0C] text-neutral-700">
              <FileText
                size={22}
                strokeWidth={1.5}
              />
            </div>

            <h3 className="mt-5 text-base font-semibold text-white/80">
              More articles are coming soon.
            </h3>

            <p className="mt-2 max-w-sm text-xs leading-6 text-neutral-700">
              We&apos;re working on useful insights around
              websites, technology, SEO and digital growth.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}