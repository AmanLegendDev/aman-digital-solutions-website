import Image from "next/image";
import Link from "next/link";
import {
  CalendarDays,
  ChevronRight,
  Clock3,
  UserRound,
} from "lucide-react";

/* =========================================================
   TYPES
========================================================= */

export type BlogArticleHeroData = {
  title: string;
  slug: string;

  excerpt: string;

  coverImage?: {
    url: string;
    publicId?: string;
    alt?: string;
  };

  author: string;
  category: string;

  readingTime?: number;
  publishedAt?: string;
};

/* =========================================================
   PROPS
========================================================= */

type BlogArticleHeroSectionProps = {
  blog: BlogArticleHeroData;
};

/* =========================================================
   DATE
========================================================= */

function formatDate(date?: string) {
  if (!date) return null;

  const parsed = new Date(date);

  if (Number.isNaN(parsed.getTime())) {
    return null;
  }

  return new Intl.DateTimeFormat("en-IN", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  }).format(parsed);
}

/* =========================================================
   COMPONENT
========================================================= */

export default function BlogArticleHeroSection({
  blog,
}: BlogArticleHeroSectionProps) {
  const publishedDate = formatDate(
    blog.publishedAt
  );

  return (
    <section
      aria-labelledby="blog-article-title"
      className="relative overflow-hidden border-b border-white/[0.06] bg-[#050505]"
    >
      {/* =====================================================
          BACKGROUND GLOW
      ===================================================== */}

      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-[-180px] h-[520px] w-[900px] -translate-x-1/2 rounded-full bg-[#FFC400]/[0.025] blur-[140px]"
      />

      <div className="relative mx-auto max-w-7xl px-5 pb-16 pt-28 sm:px-8 sm:pb-20 sm:pt-32 lg:px-10 lg:pb-24 lg:pt-36">
        {/* =================================================
            BREADCRUMB
        ================================================= */}

        <nav
          aria-label="Breadcrumb"
          className="mb-12"
        >
          <ol className="flex flex-wrap items-center gap-2 text-[9px] font-medium uppercase tracking-[0.15em]">
            <li>
              <Link
                href="/"
                className="rounded-sm text-neutral-700 transition-colors hover:text-neutral-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FFC400]"
              >
                Home
              </Link>
            </li>

            <li
              aria-hidden="true"
              className="text-neutral-800"
            >
              <ChevronRight
                size={12}
                aria-hidden="true"
              />
            </li>

            <li>
              <Link
                href="/blog"
                className="rounded-sm text-neutral-700 transition-colors hover:text-neutral-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FFC400]"
              >
                Blog
              </Link>
            </li>

            <li
              aria-hidden="true"
              className="text-neutral-800"
            >
              <ChevronRight
                size={12}
                aria-hidden="true"
              />
            </li>

            <li
              aria-current="page"
              className="max-w-[240px] truncate text-[#FFC400]"
            >
              {blog.title}
            </li>
          </ol>
        </nav>

        {/* =================================================
            ARTICLE HEADER
        ================================================= */}

        <div className="mx-auto max-w-5xl text-center">
          {/* CATEGORY */}

          <div className="flex justify-center">
            <span className="rounded-full border border-[#FFC400]/15 bg-[#FFC400]/[0.04] px-3 py-1.5 text-[8px] font-semibold uppercase tracking-[0.17em] text-[#FFC400]">
              {blog.category}
            </span>
          </div>

          {/* TITLE */}

          <h1
            id="blog-article-title"
            className="mt-7 text-4xl font-semibold leading-[0.98] tracking-[-0.055em] text-white sm:text-5xl lg:text-[4.7rem]"
          >
            {blog.title}
          </h1>

          {/* EXCERPT */}

          <p className="mx-auto mt-7 max-w-3xl text-sm leading-7 text-neutral-500 sm:text-base sm:leading-8">
            {blog.excerpt}
          </p>

          {/* =================================================
              META
          ================================================= */}

          <div className="mt-8 flex flex-wrap items-center justify-center gap-x-5 gap-y-3">
            <div className="flex items-center gap-2 text-[9px] font-medium uppercase tracking-[0.12em] text-neutral-600">
              <UserRound
                size={12}
                aria-hidden="true"
              />

              <span>{blog.author}</span>
            </div>

            {publishedDate && (
              <>
                <span
                  aria-hidden="true"
                  className="h-1 w-1 rounded-full bg-neutral-800"
                />

                <div className="flex items-center gap-2 text-[9px] font-medium uppercase tracking-[0.12em] text-neutral-600">
                  <CalendarDays
                    size={12}
                    aria-hidden="true"
                  />

                  <time
                    dateTime={blog.publishedAt}
                  >
                    {publishedDate}
                  </time>
                </div>
              </>
            )}

            {blog.readingTime &&
              blog.readingTime > 0 && (
                <>
                  <span
                    aria-hidden="true"
                    className="h-1 w-1 rounded-full bg-neutral-800"
                  />

                  <div className="flex items-center gap-2 text-[9px] font-medium uppercase tracking-[0.12em] text-neutral-600">
                    <Clock3
                      size={12}
                      aria-hidden="true"
                    />

                    <span>
                      {blog.readingTime} min read
                    </span>
                  </div>
                </>
              )}
          </div>
        </div>

        {/* =================================================
            COVER IMAGE
        ================================================= */}

        <div className="mx-auto mt-14 max-w-6xl sm:mt-16">
          <div className="overflow-hidden rounded-[2rem] border border-white/[0.08] bg-[#090909] shadow-2xl shadow-black/30">
            <div className="relative aspect-[16/9] overflow-hidden bg-[#0A0A0A]">
              {blog.coverImage?.url ? (
                <Image
                  src={blog.coverImage.url}
                  alt={
                    blog.coverImage.alt?.trim() ||
                    blog.title
                  }
                  fill
                  priority
                  sizes="(max-width: 640px) 100vw, (max-width: 1280px) 92vw, 1152px"
                  className="object-cover"
                />
              ) : (
                <div className="flex h-full w-full items-center justify-center">
                  <span className="text-[9px] font-semibold uppercase tracking-[0.18em] text-neutral-800">
                    No cover image
                  </span>
                </div>
              )}

              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}