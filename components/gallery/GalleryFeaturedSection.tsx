import Image from "next/image";
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

type GalleryFeaturedSectionProps = {
  galleries: GalleryCardData[];
};

/* =========================================================
   COMPONENT
========================================================= */

export default function GalleryFeaturedSection({
  galleries,
}: GalleryFeaturedSectionProps) {
  if (!galleries.length) {
    return null;
  }

  return (
    <section className="relative border-b border-white/[0.06] bg-[#050505] py-16 sm:py-20 lg:py-24">
      <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
        {/* =================================================
            HEADER
        ================================================= */}

        <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <div className="flex items-center gap-3">
              <span
                aria-hidden="true"
                className="h-px w-7 bg-[#FFC400]/40"
              />

              <span className="text-[9px] font-semibold uppercase tracking-[0.2em] text-[#FFC400]">
                Featured collections
              </span>
            </div>

            <h2 className="mt-4 text-3xl font-semibold tracking-[-0.045em] text-white sm:text-4xl">
              A closer look.
            </h2>

            <p className="mt-3 max-w-xl text-sm leading-6 text-neutral-400">
              Selected visual collections from our work,
              projects and digital experiences.
            </p>
          </div>

          <div className="hidden items-center gap-2 text-[8px] font-medium uppercase tracking-[0.14em] text-neutral-500 sm:flex">
            <Images
              size={11}
              aria-hidden="true"
            />

            Featured
          </div>
        </div>

        {/* =================================================
            FEATURED GRID
        ================================================= */}

        <div className="mt-10 grid w-full min-w-0 max-w-full gap-5 md:grid-cols-2 lg:gap-6">
          {galleries.map((gallery) => {
            const cover =
              gallery.coverImage?.url ||
              gallery.media[0]?.thumbnailUrl ||
              gallery.media[0]?.url;

            const imageAlt =
              gallery.coverImage?.alt ||
              gallery.media[0]?.alt ||
              `${gallery.title} gallery`;

            const videoCount =
              gallery.media.filter(
                (media) =>
                  media.type === "video"
              ).length;

            return (
              <Link
                key={gallery._id}
                href={`/gallery/${gallery.slug}`}
                aria-label={`View ${gallery.title} gallery`}
                className="group block w-full min-w-0 max-w-full rounded-[1.75rem] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FFC400]/70 focus-visible:ring-offset-2 focus-visible:ring-offset-[#050505]"
              >
                {/* =================================================
                    CARD
                ================================================= */}

                <div className="w-full min-w-0 max-w-full overflow-hidden rounded-[1.75rem] border border-white/[0.07] bg-[#080808] transition-colors duration-300 group-hover:border-white/[0.12]">
                  {/* =================================================
                      IMAGE
                  ================================================= */}

                  <div className="relative aspect-[16/10] w-full min-w-0 overflow-hidden bg-[#080808]">
                    {cover ? (
                      <Image
                        src={cover}
                        alt={imageAlt}
                        fill
                        sizes="(max-width: 767px) 100vw, (max-width: 1279px) 50vw, 600px"
                        className="object-cover object-top transition-transform duration-700 ease-out group-hover:scale-[1.025]"
                      />
                    ) : (
                      <div className="flex h-full w-full items-center justify-center bg-[#090909]">
                        <Images
                          size={38}
                          strokeWidth={1}
                          aria-hidden="true"
                          className="text-neutral-700"
                        />
                      </div>
                    )}

                    <div
                      aria-hidden="true"
                      className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-transparent"
                    />
                  </div>

                  {/* =================================================
                      CARD CONTENT
                  ================================================= */}

                  <div className="border-t border-white/[0.06] px-5 py-5 sm:px-6 sm:py-6">
                    <div className="flex items-start justify-between gap-5">
                      <div className="min-w-0">
                        {/* CATEGORY */}

                        {gallery.category && (
                          <p className="text-[8px] font-semibold uppercase tracking-[0.18em] text-[#FFC400]">
                            {gallery.category}
                          </p>
                        )}

                        {/* TITLE */}

                        <h3 className="mt-2 truncate text-lg font-semibold tracking-[-0.025em] text-white transition-colors duration-300 group-hover:text-[#FFC400] sm:text-xl">
                          {gallery.title}
                        </h3>

                        {/* DESCRIPTION */}

                        {gallery.shortDescription && (
                          <p className="mt-2 line-clamp-2 max-w-xl text-xs leading-6 text-neutral-400">
                            {gallery.shortDescription}
                          </p>
                        )}
                      </div>

                      {/* ARROW */}

                      <span
                        aria-hidden="true"
                        className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white/[0.07] text-neutral-500 transition-all duration-300 group-hover:border-[#FFC400]/25 group-hover:bg-[#FFC400]/[0.05] group-hover:text-[#FFC400]"
                      >
                        <ArrowRight
                          size={15}
                          className="transition-transform duration-300 group-hover:translate-x-0.5"
                        />
                      </span>
                    </div>

                    {/* =================================================
                        MEDIA META
                    ================================================= */}

                    <div className="mt-5 flex items-center gap-4">
                      <div className="flex items-center gap-2">
                        <Images
                          size={11}
                          aria-hidden="true"
                          className="text-neutral-600"
                        />

                        <span className="text-[8px] font-medium uppercase tracking-[0.12em] text-neutral-500">
                          {gallery.media.length}{" "}
                          {gallery.media.length === 1
                            ? "item"
                            : "items"}
                        </span>
                      </div>

                      {videoCount > 0 && (
                        <>
                          <span
                            aria-hidden="true"
                            className="h-1 w-1 rounded-full bg-neutral-700"
                          />

                          <div className="flex items-center gap-2">
                            <Play
                              size={9}
                              fill="currentColor"
                              aria-hidden="true"
                              className="text-neutral-600"
                            />

                            <span className="text-[8px] font-medium uppercase tracking-[0.12em] text-neutral-500">
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
      </div>
    </section>
  );
}