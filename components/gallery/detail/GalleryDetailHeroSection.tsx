import Link from "next/link";
import {
  ArrowDown,
  ChevronRight,
  Images,
  Play,
} from "lucide-react";

import type { GalleryDetailData } from "./GalleryDetailPage";

/* =========================================================
   PROPS
========================================================= */

type GalleryDetailHeroSectionProps = {
  gallery: GalleryDetailData;
};

/* =========================================================
   COMPONENT
========================================================= */

export default function GalleryDetailHeroSection({
  gallery,
}: GalleryDetailHeroSectionProps) {
  const imageCount = gallery.media.filter(
    (media) => media.type === "image"
  ).length;

  const videoCount = gallery.media.filter(
    (media) => media.type === "video"
  ).length;

  const cover =
    gallery.coverImage?.url ||
    gallery.media[0]?.thumbnailUrl ||
    gallery.media[0]?.url;

  const coverAlt =
    gallery.coverImage?.alt ||
    gallery.media[0]?.alt ||
    gallery.title;

  return (
    <section className="relative overflow-hidden border-b border-white/[0.06] bg-[#050505]">
      {/* =====================================================
          BACKGROUND
      ===================================================== */}

      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-[-240px] h-[600px] w-[1000px] -translate-x-1/2 rounded-full bg-[#FFC400]/[0.025] blur-[150px]"
      />

      <div className="relative mx-auto max-w-7xl px-5 pb-16 pt-28 sm:px-8 sm:pb-20 sm:pt-32 lg:px-10 lg:pb-24 lg:pt-36">
        {/* =================================================
            BREADCRUMB
        ================================================= */}

        <nav
          aria-label="Breadcrumb"
          className="mb-10"
        >
          <ol className="flex flex-wrap items-center gap-2 text-[9px] font-medium uppercase tracking-[0.15em]">
            <li>
              <Link
                href="/"
                className="text-neutral-700 transition-colors hover:text-neutral-400"
              >
                Home
              </Link>
            </li>

            <li
              aria-hidden="true"
              className="text-neutral-800"
            >
              <ChevronRight size={12} />
            </li>

            <li>
              <Link
                href="/gallery"
                className="text-neutral-700 transition-colors hover:text-neutral-400"
              >
                Gallery
              </Link>
            </li>

            <li
              aria-hidden="true"
              className="text-neutral-800"
            >
              <ChevronRight size={12} />
            </li>

            <li
              aria-current="page"
              className="max-w-[240px] truncate text-[#FFC400]"
            >
              {gallery.title}
            </li>
          </ol>
        </nav>

        {/* =================================================
            HERO GRID
        ================================================= */}

        <div className="grid items-center gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
          {/* =================================================
              CONTENT
          ================================================= */}

          <div>
            {/* CATEGORY */}

            <div className="flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-xl border border-[#FFC400]/15 bg-[#FFC400]/[0.04] text-[#FFC400]">
                <Images
                  size={16}
                  strokeWidth={1.5}
                />
              </span>

              <div>
                <p className="text-[9px] font-semibold uppercase tracking-[0.2em] text-[#FFC400]">
                  Gallery collection
                </p>

                {gallery.category && (
                  <p className="mt-1 text-[9px] uppercase tracking-[0.12em] text-neutral-700">
                    {gallery.category}
                  </p>
                )}
              </div>
            </div>

            {/* TITLE */}

            <h1 className="mt-7 max-w-2xl text-4xl font-semibold leading-[0.98] tracking-[-0.055em] text-white sm:text-5xl lg:text-[4.5rem]">
              {gallery.title}
            </h1>

            {/* DESCRIPTION */}

            {gallery.shortDescription && (
              <p className="mt-6 max-w-xl text-base leading-7 text-neutral-500 sm:text-lg sm:leading-8">
                {gallery.shortDescription}
              </p>
            )}

            {/* =================================================
                MEDIA STATS
            ================================================= */}

            <div className="mt-8 flex flex-wrap items-center gap-3">
              <div className="inline-flex items-center gap-2 rounded-full border border-white/[0.07] bg-white/[0.015] px-3.5 py-2">
                <Images
                  size={11}
                  className="text-[#FFC400]"
                />

                <span className="text-[8px] font-medium uppercase tracking-[0.13em] text-neutral-600">
                  {gallery.media.length}{" "}
                  {gallery.media.length === 1
                    ? "item"
                    : "items"}
                </span>
              </div>

              {imageCount > 0 && (
                <div className="inline-flex items-center gap-2 rounded-full border border-white/[0.07] bg-white/[0.015] px-3.5 py-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-neutral-600" />

                  <span className="text-[8px] font-medium uppercase tracking-[0.13em] text-neutral-700">
                    {imageCount}{" "}
                    {imageCount === 1
                      ? "image"
                      : "images"}
                  </span>
                </div>
              )}

              {videoCount > 0 && (
                <div className="inline-flex items-center gap-2 rounded-full border border-white/[0.07] bg-white/[0.015] px-3.5 py-2">
                  <Play
                    size={9}
                    fill="currentColor"
                    className="text-neutral-600"
                  />

                  <span className="text-[8px] font-medium uppercase tracking-[0.13em] text-neutral-700">
                    {videoCount}{" "}
                    {videoCount === 1
                      ? "video"
                      : "videos"}
                  </span>
                </div>
              )}
            </div>

            {/* =================================================
                BROWSE BUTTON
            ================================================= */}

            {gallery.media.length > 0 && (
              <a
                href="#gallery-media"
                className="group mt-9 inline-flex items-center gap-3 rounded-xl border border-white/[0.08] bg-white/[0.02] px-5 py-3.5 text-xs font-semibold text-white/70 transition-all duration-300 hover:border-[#FFC400]/20 hover:bg-[#FFC400]/[0.03] hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FFC400]"
              >
                Explore collection

                <ArrowDown
                  size={14}
                  className="transition-transform duration-300 group-hover:translate-y-0.5"
                />
              </a>
            )}
          </div>

          {/* =================================================
              COVER IMAGE
          ================================================= */}

          <div className="relative">
            <div className="overflow-hidden rounded-[2rem] border border-white/[0.08] bg-[#090909]">
              <div className="relative aspect-[16/11] overflow-hidden">
                {cover ? (
                  <img
                    src={cover}
                    alt={coverAlt}
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center">
                    <Images
                      size={44}
                      strokeWidth={1}
                      className="text-neutral-800"
                    />
                  </div>
                )}

                <div
                  aria-hidden="true"
                  className="absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-transparent"
                />
              </div>

              {/* =================================================
                  COVER META
              ================================================= */}

              <div className="flex items-center justify-between gap-4 border-t border-white/[0.06] bg-[#090909] px-5 py-4 sm:px-6">
                <div>
                  <p className="text-[8px] font-semibold uppercase tracking-[0.18em] text-[#FFC400]">
                    Collection
                  </p>

                  <p className="mt-1 text-xs font-medium text-white/60">
                    {gallery.media.length}{" "}
                    {gallery.media.length === 1
                      ? "media item"
                      : "media items"}
                  </p>
                </div>

                <span className="flex h-9 w-9 items-center justify-center rounded-full border border-white/[0.08] text-neutral-700">
                  <Images size={14} />
                </span>
              </div>
            </div>

            <div
              aria-hidden="true"
              className="absolute -bottom-3 -right-3 -z-10 h-32 w-32 rounded-full bg-[#FFC400]/[0.04] blur-3xl"
            />
          </div>
        </div>
      </div>
    </section>
  );
}