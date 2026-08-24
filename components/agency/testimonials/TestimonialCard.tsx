"use client";

import {
  ArrowUpRight,
  MapPin,
  Quote,
  Star,
} from "lucide-react";
import { motion } from "framer-motion";

type TestimonialData = {
  id: string;
  name: string;
  slug: string;
  role: string | null;
  company: string | null;
  location: string | null;
  quote: string;
  image: {
    url: string;
    publicId: string | null;
    alt: string;
  } | null;
  rating: number | null;
  project: string | null;
  featured: boolean;
};

type TestimonialCardProps = {
  testimonial: TestimonialData;
  featured?: boolean;
};

export default function TestimonialCard({
  testimonial,
  featured = false,
}: TestimonialCardProps) {
  const rating = Math.min(
    Math.max(testimonial.rating ?? 5, 0),
    5
  );

  return (
    <motion.article
      initial={{
        opacity: 0,
        y: 20,
      }}
      whileInView={{
        opacity: 1,
        y: 0,
      }}
      viewport={{
        once: true,
        amount: 0.15,
      }}
      transition={{
        duration: 0.5,
        ease: [0.22, 1, 0.36, 1],
      }}
      className={[
        "group relative min-w-0 w-full overflow-hidden rounded-[24px] border transition-colors duration-300",
        featured
          ? "border-[#2A2A2A] bg-[#0B0B0B]"
          : "border-[#202020] bg-[#080808] hover:border-[#303030]",
      ].join(" ")}
    >
      {/* FEATURED ACCENT */}
      {featured && (
        <div
          aria-hidden="true"
          className="pointer-events-none absolute left-0 top-0 h-full w-px bg-gradient-to-b from-[#FFC400] via-[#FFC400]/30 to-transparent"
        />
      )}

      <div
        className={[
          "min-w-0 w-full",
          featured
            ? "p-5 sm:p-8 lg:p-10"
            : "p-5 sm:p-6",
        ].join(" ")}
      >
        {/* TOP ROW */}
        <div className="flex min-w-0 items-start justify-between gap-4">
          {/* RATING */}
          <div
            className={[
              "flex shrink-0 items-center gap-1",
              featured
                ? "text-[#FFC400]"
                : "text-[#B89100]",
            ].join(" ")}
            aria-label={`${rating} out of 5 stars`}
          >
            {Array.from({ length: 5 }).map((_, index) => (
              <Star
                key={index}
                size={featured ? 15 : 13}
                strokeWidth={1.7}
                fill={
                  index < Math.round(rating)
                    ? "currentColor"
                    : "none"
                }
              />
            ))}
          </div>

          <Quote
            size={featured ? 22 : 18}
            strokeWidth={1.4}
            className="shrink-0 text-[#2F2F2F] transition-colors duration-300 group-hover:text-[#FFC400]/30"
          />
        </div>

        {/* QUOTE */}
        <blockquote
          className={[
            "min-w-0 max-w-full break-words text-[#E5E5E5]",
            "[overflow-wrap:anywhere]",
            "tracking-[-0.02em]",
            featured
              ? "mt-7 text-xl font-medium leading-8 sm:text-2xl sm:leading-9 lg:text-[1.7rem] lg:leading-10"
              : "mt-5 text-base leading-7",
          ].join(" ")}
        >
          “{testimonial.quote}”
        </blockquote>

        {/* DIVIDER */}
        <div className="my-6 h-px w-full bg-[#202020]" />

        {/* PERSON ROW */}
        <div className="flex min-w-0 items-center gap-3">
          {/* AVATAR */}
          {testimonial.image ? (
            <img
              src={testimonial.image.url}
              alt={testimonial.image.alt}
              loading="lazy"
              className={[
                "shrink-0 rounded-full border border-[#292929] object-cover",
                featured
                  ? "h-12 w-12"
                  : "h-10 w-10",
              ].join(" ")}
            />
          ) : (
            <div
              className={[
                "flex shrink-0 items-center justify-center rounded-full border border-[#292929] bg-[#121212] font-semibold text-[#FFC400]",
                featured
                  ? "h-12 w-12 text-sm"
                  : "h-10 w-10 text-xs",
              ].join(" ")}
            >
              {testimonial.name
                .charAt(0)
                .toUpperCase()}
            </div>
          )}

          {/* DETAILS */}
          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-semibold text-[#E5E5E5]">
              {testimonial.name}
            </p>

            <div className="mt-0.5 flex min-w-0 flex-wrap items-center gap-x-2 gap-y-1 text-[10px] text-[#666]">
              {testimonial.role && (
                <span className="max-w-full truncate">
                  {testimonial.role}
                </span>
              )}

              {testimonial.company && (
                <>
                  {testimonial.role && (
                    <span
                      aria-hidden="true"
                      className="shrink-0 text-[#333]"
                    >
                      •
                    </span>
                  )}

                  <span className="max-w-full truncate">
                    {testimonial.company}
                  </span>
                </>
              )}
            </div>
          </div>

          {/* PROJECT */}
          {testimonial.project && (
            <div className="ml-auto hidden min-w-0 max-w-[120px] shrink-0 text-right sm:block">
              <p className="text-[9px] uppercase tracking-[0.14em] text-[#444]">
                Project
              </p>

              <p className="mt-1 truncate text-[11px] text-[#777]">
                {testimonial.project}
              </p>
            </div>
          )}
        </div>

        {/* LOCATION */}
        {testimonial.location && (
          <div className="mt-4 flex min-w-0 items-center gap-1.5 text-[10px] text-[#555]">
            <MapPin
              size={11}
              className="shrink-0"
            />

            <span className="min-w-0 truncate">
              {testimonial.location}
            </span>
          </div>
        )}

        {/* FEATURED FOOTER */}
        {featured && (
          <div className="mt-7 flex min-w-0 items-center justify-between gap-4 border-t border-[#202020] pt-5">
            <span className="min-w-0 truncate text-[9px] font-medium uppercase tracking-[0.16em] text-[#444]">
              Client experience
            </span>

            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-[#292929] text-[#555] transition-all duration-200 group-hover:border-[#FFC400]/30 group-hover:bg-[#FFC400]/[0.06] group-hover:text-[#FFC400]">
              <ArrowUpRight size={14} />
            </span>
          </div>
        )}
      </div>
    </motion.article>
  );
}