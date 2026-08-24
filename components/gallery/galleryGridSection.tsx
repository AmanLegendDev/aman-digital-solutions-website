import Link from "next/link";
import {
  ArrowRight,
  Images,
  Play,
} from "lucide-react";

import type { GalleryCardData } from "./GalleryPageClient";

/* =========================================================
   PROPS
========================================================= */

type GalleryGridSectionProps = {
  galleries: GalleryCardData[];
  totalGalleries: number;
};

/* =========================================================
   COMPONENT
========================================================= */

export default function GalleryGridSection({
  galleries,
  totalGalleries,
}: GalleryGridSectionProps) {
  return (
    <section
      id="gallery-list"
      className="relative bg-[#050505] py-16 sm:py-20 lg:py-24"
    >
      <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
        {/* =================================================
            HEADER
        ================================================= */}

        <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <div className="flex items-center gap-3">
              <span className="h-px w-7 bg-white/[0.12]" />

              <span className="text-[9px] font-semibold uppercase tracking-[0.2em] text-neutral-600">
                All collections
              </span>
            </div>

            <h2 className="mt-4 text-3xl font-semibold tracking-[-0.045em] text-white sm:text-4xl">
              Explore the gallery.
            </h2>
          </div>

          <p className="max-w-sm text-xs leading-6 text-neutral-800 sm:text-right">
            Browse every available collection and open
            any one to explore its complete visual story.
          </p>
        </div>

        {/* =================================================
            GRID
        ================================================= */}

        {galleries.length > 0 ? (
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {galleries.map((gallery) => {
              const cover =
                gallery.coverImage?.url ||
                gallery.media[0]?.thumbnailUrl ||
                gallery.media[0]?.url;

              const alt =
                gallery.coverImage?.alt ||
                gallery.media[0]?.alt ||
                gallery.title;

              const videoCount =
                gallery.media.filter(
                  (media) =>
                    media.type === "video"
                ).length;

              return (
                <Link
                  key={gallery._id}
                  href={`/gallery/${gallery.slug}`}
                  className="group block"
                >
                  {/* =================================================
                      VISUAL
                  ================================================= */}

                  <div className="overflow-hidden rounded-[1.5rem] border border-white/[0.07] bg-[#080808]">
                    <div className="relative aspect-[4/3] overflow-hidden">
                      {cover ? (
                        <img
                          src={cover}
                          alt={alt}
                          loading="lazy"
                          className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                        />
                      ) : (
                        <div className="flex h-full w-full items-center justify-center bg-[#090909]">
                          <Images
                            size={34}
                            strokeWidth={1}
                            className="text-neutral-800"
                          />
                        </div>
                      )}

                      <div
                        aria-hidden="true"
                        className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent"
                      />
                    </div>

                    {/* =================================================
                        CONTENT
                    ================================================= */}

                    <div className="border-t border-white/[0.06] p-5">
                      <div className="flex items-start justify-between gap-4">
                        <div className="min-w-0">
                          {/* CATEGORY */}

                          {gallery.category && (
                            <p className="text-[8px] font-semibold uppercase tracking-[0.17em] text-[#FFC400]">
                              {gallery.category}
                            </p>
                          )}

                          {/* TITLE */}

                          <h3 className="mt-2 truncate text-base font-semibold tracking-[-0.025em] text-white transition-colors duration-300 group-hover:text-[#FFC400]">
                            {gallery.title}
                          </h3>
                        </div>

                        {/* ARROW */}

                        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-white/[0.07] text-neutral-700 transition-all duration-300 group-hover:border-[#FFC400]/25 group-hover:bg-[#FFC400]/[0.05] group-hover:text-[#FFC400]">
                          <ArrowRight
                            size={14}
                            className="transition-transform duration-300 group-hover:translate-x-0.5"
                          />
                        </span>
                      </div>

                      {/* DESCRIPTION */}

                      {gallery.shortDescription && (
                        <p className="mt-3 line-clamp-2 text-xs leading-6 text-neutral-700">
                          {gallery.shortDescription}
                        </p>
                      )}

                      {/* =================================================
                          META
                      ================================================= */}

                      <div className="mt-5 flex items-center gap-3">
                        <div className="flex items-center gap-1.5">
                          <Images
                            size={10}
                            className="text-neutral-800"
                          />

                          <span className="text-[8px] font-medium uppercase tracking-[0.11em] text-neutral-800">
                            {gallery.media.length}{" "}
                            {gallery.media.length === 1
                              ? "item"
                              : "items"}
                          </span>
                        </div>

                        {videoCount > 0 && (
                          <>
                            <span className="h-1 w-1 rounded-full bg-neutral-900" />

                            <div className="flex items-center gap-1.5">
                              <Play
                                size={8}
                                fill="currentColor"
                                className="text-neutral-800"
                              />

                              <span className="text-[8px] font-medium uppercase tracking-[0.11em] text-neutral-800">
                                {videoCount}{" "}
                                {videoCount === 1
                                  ? "video"
                                  : "videos"}
                              </span>
                            </div>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        ) : (
          /* =================================================
             EMPTY STATE
          ================================================= */

          <div className="mt-10 flex min-h-[280px] items-center justify-center rounded-[1.75rem] border border-dashed border-white/[0.08] bg-[#080808] px-6 text-center">
            <div>
              <Images
                size={30}
                strokeWidth={1}
                className="mx-auto text-neutral-800"
              />

              <p className="mt-5 text-sm font-medium text-white/60">
                No gallery collections yet.
              </p>

              <p className="mt-2 max-w-sm text-xs leading-6 text-neutral-800">
                New visual collections will appear here
                once they are published.
              </p>
            </div>
          </div>
        )}

        {/* =================================================
            BOTTOM COUNT
        ================================================= */}

        {galleries.length > 0 && (
          <div className="mt-8 flex items-center justify-center gap-3">
            <span className="h-px w-12 bg-white/[0.05]" />

            <span className="text-[8px] font-medium uppercase tracking-[0.16em] text-neutral-800">
              {totalGalleries}{" "}
              {totalGalleries === 1
                ? "collection"
                : "collections"}{" "}
              available
            </span>

            <span className="h-px w-12 bg-white/[0.05]" />
          </div>
        )}
      </div>
    </section>
  );
}