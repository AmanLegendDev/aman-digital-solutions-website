import Link from "next/link";
import {
  ArrowRight,
  CalendarDays,
  Hash,
  UserRound,
} from "lucide-react";

/* =========================================================
   TYPES
========================================================= */

type BlogArticleTagsSectionProps = {
  tags: string[];
  author: string;
  publishedAt?: string;
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
    month: "long",
    year: "numeric",
  }).format(parsed);
}

/* =========================================================
   COMPONENT
========================================================= */

export default function BlogArticleTagsSection({
  tags,
  author,
  publishedAt,
}: BlogArticleTagsSectionProps) {
  const formattedDate = formatDate(
    publishedAt
  );

  return (
    <section className="border-t border-white/[0.06] bg-[#050505] py-10 sm:py-12">
      <div className="mx-auto max-w-5xl px-5 sm:px-8">
        <div className="flex flex-col gap-8 rounded-[1.75rem] border border-white/[0.06] bg-[#080808] p-5 sm:p-6 lg:flex-row lg:items-center lg:justify-between lg:p-7">
          {/* =================================================
              ARTICLE META
          ================================================= */}

          <div className="flex flex-wrap items-center gap-x-5 gap-y-3">
            <div className="flex items-center gap-2">
              <UserRound
                size={13}
                className="text-[#FFC400]"
              />

              <span className="text-[9px] font-semibold uppercase tracking-[0.13em] text-neutral-500">
                {author}
              </span>
            </div>

            {formattedDate && (
              <>
                <span
                  aria-hidden="true"
                  className="h-1 w-1 rounded-full bg-neutral-800"
                />

                <div className="flex items-center gap-2">
                  <CalendarDays
                    size={13}
                    className="text-neutral-700"
                  />

                  <span className="text-[9px] font-medium uppercase tracking-[0.12em] text-neutral-700">
                    {formattedDate}
                  </span>
                </div>
              </>
            )}
          </div>

          {/* =================================================
              TAGS
          ================================================= */}

          {tags.length > 0 && (
            <div className="flex flex-wrap items-center gap-2">
              <Hash
                size={13}
                className="mr-1 text-neutral-800"
              />

              {tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full border border-white/[0.07] bg-white/[0.015] px-2.5 py-1.5 text-[8px] font-medium uppercase tracking-[0.1em] text-neutral-600 transition-colors hover:border-[#FFC400]/15 hover:text-neutral-400"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>

        {/* =================================================
            BACK TO BLOG
        ================================================= */}

        <div className="mt-8 flex justify-center">
          <Link
            href="/blog"
            className="group inline-flex items-center gap-2 text-[9px] font-semibold uppercase tracking-[0.16em] text-neutral-700 transition-colors hover:text-[#FFC400]"
          >
            Back to all articles

            <ArrowRight
              size={12}
              className="transition-transform duration-300 group-hover:translate-x-1"
            />
          </Link>
        </div>
      </div>
    </section>
  );
}