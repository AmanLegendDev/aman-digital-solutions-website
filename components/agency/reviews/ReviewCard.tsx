"use client";

import Image from "next/image";
import {
  CheckCircle2,
  MapPin,
  Star,
} from "lucide-react";
import { motion } from "framer-motion";

type ReviewImage = {
  url: string;
  publicId: string | null;
  alt: string;
};

type ReviewData = {
  id: string;
  name: string;
  slug: string;

  role: string | null;
  company: string | null;
  location: string | null;

  quote: string;

  image: ReviewImage | null;

  rating: number;

  project: string | null;

  featured: boolean;
  published: boolean;

  displayOrder: number;
};

type ReviewCardProps = {
  review: ReviewData;
  index?: number;
};

export default function ReviewCard({
  review,
  index = 0,
}: ReviewCardProps) {
  const rating = Math.min(
    5,
    Math.max(1, review.rating || 5)
  );

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
        amount: 0.15,
      }}
      transition={{
        duration: 0.5,
        delay: Math.min(index * 0.07, 0.18),
        ease: [0.22, 1, 0.36, 1],
      }}
      className="group relative w-full min-w-0 overflow-hidden rounded-[26px] border border-[#202020] bg-[#0B0B0B] p-6 transition-all duration-300 hover:border-[#333] hover:bg-[#0D0D0D] sm:p-7 lg:p-8"
    >
      {/* =====================================================
          TOP META
      ===================================================== */}

      <div className="flex min-w-0 items-center justify-between gap-4">
        {/* RATING */}

        <div
          className="flex items-center gap-1"
          aria-label={`${rating} out of 5 stars`}
        >
          {Array.from({
            length: 5,
          }).map((_, starIndex) => (
            <Star
              key={starIndex}
              aria-hidden="true"
              size={14}
              strokeWidth={1.8}
              className={
                starIndex < rating
                  ? "fill-[#FFC400] text-[#FFC400]"
                  : "text-[#333]"
              }
            />
          ))}
        </div>

        {/* GOOGLE REVIEW */}

        <span className="inline-flex shrink-0 items-center gap-1.5 rounded-full border border-[#252525] bg-[#101010] px-3 py-1.5 text-[9px] font-medium uppercase tracking-[0.13em] text-[#666]">
          <CheckCircle2
            aria-hidden="true"
            size={11}
            className="text-[#FFC400]"
          />

          Google Review
        </span>
      </div>

      {/* =====================================================
          QUOTE
      ===================================================== */}

      <blockquote className="mt-7 max-w-3xl text-base leading-7 tracking-[-0.01em] text-[#CFCFCF] sm:text-[17px] sm:leading-8">
        “{review.quote}”
      </blockquote>

      {/* =====================================================
          DIVIDER
      ===================================================== */}

      <div className="my-7 h-px w-full bg-[#202020]" />

      {/* =====================================================
          REVIEWER
      ===================================================== */}

      <div className="flex min-w-0 items-center gap-4">
        {/* AVATAR */}

        {review.image?.url ? (
          <div className="relative h-11 w-11 shrink-0 overflow-hidden rounded-full border border-[#292929] bg-[#151515]">
            <Image
              src={review.image.url}
              alt={
                review.image.alt ||
                `${review.name} review`
              }
              fill
              sizes="44px"
              className="object-cover"
            />
          </div>
        ) : (
          <div
            aria-hidden="true"
            className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-[#292929] bg-[#111] text-sm font-semibold text-[#FFC400]"
          >
            {review.name
              .trim()
              .charAt(0)
              .toUpperCase()}
          </div>
        )}

        {/* DETAILS */}

        <div className="min-w-0">
          <p className="truncate text-sm font-semibold text-[#E8E8E8]">
            {review.name}
          </p>

          {(review.role ||
            review.company) && (
            <p className="mt-1 truncate text-xs text-[#666]">
              {[review.role, review.company]
                .filter(Boolean)
                .join(" · ")}
            </p>
          )}

          {review.location && (
            <div className="mt-1 flex min-w-0 items-center gap-1 text-[10px] text-[#4F4F4F]">
              <MapPin
                aria-hidden="true"
                size={10}
              />

              <span className="truncate">
                {review.location}
              </span>
            </div>
          )}
        </div>

        {/* PROJECT */}

        {review.project && (
          <div className="ml-auto hidden max-w-[180px] text-right sm:block">
            <p className="text-[9px] uppercase tracking-[0.15em] text-[#414141]">
              Project
            </p>

            <p className="mt-1 truncate text-xs text-[#666]">
              {review.project}
            </p>
          </div>
        )}
      </div>

      {/* =====================================================
          HOVER ACCENT
      ===================================================== */}

      <div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-0 left-8 right-8 h-px bg-[#FFC400]/0 transition-colors duration-300 group-hover:bg-[#FFC400]/30"
      />
    </motion.article>
  );
}