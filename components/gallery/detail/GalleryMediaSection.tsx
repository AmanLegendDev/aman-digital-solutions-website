"use client";

import {
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";

import {
  ChevronLeft,
  ChevronRight,
  Images,
  Maximize2,
  Play,
  X,
} from "lucide-react";

import { AnimatePresence, motion } from "framer-motion";

import type { GalleryDetailMedia } from "./GalleryDetailPage";

/* =========================================================
   PROPS
========================================================= */

type GalleryMediaSectionProps = {
  media: GalleryDetailMedia[];
  title: string;
};

/* =========================================================
   COMPONENT
========================================================= */

export default function GalleryMediaSection({
  media,
  title,
}: GalleryMediaSectionProps) {
  const [activeIndex, setActiveIndex] =
    useState<number | null>(null);

  /* =======================================================
     SORT MEDIA
  ======================================================= */

  const sortedMedia = useMemo(() => {
    return [...media].sort(
      (a, b) =>
        a.displayOrder -
        b.displayOrder
    );
  }, [media]);

  /* =======================================================
     ACTIVE MEDIA
  ======================================================= */

  const activeMedia =
    activeIndex !== null
      ? sortedMedia[activeIndex]
      : null;

  /* =======================================================
     OPEN
  ======================================================= */

  const openMedia = useCallback(
    (index: number) => {
      setActiveIndex(index);
    },
    []
  );

  /* =======================================================
     CLOSE
  ======================================================= */

  const closeMedia = useCallback(() => {
    setActiveIndex(null);
  }, []);

  /* =======================================================
     PREVIOUS
  ======================================================= */

  const showPrevious = useCallback(() => {
    setActiveIndex((current) => {
      if (current === null) {
        return null;
      }

      return current === 0
        ? sortedMedia.length - 1
        : current - 1;
    });
  }, [sortedMedia.length]);

  /* =======================================================
     NEXT
  ======================================================= */

  const showNext = useCallback(() => {
    setActiveIndex((current) => {
      if (current === null) {
        return null;
      }

      return current ===
        sortedMedia.length - 1
        ? 0
        : current + 1;
    });
  }, [sortedMedia.length]);

  /* =======================================================
     KEYBOARD CONTROLS
  ======================================================= */

  useEffect(() => {
    if (activeIndex === null) {
      return;
    }

    function handleKeyDown(
      event: KeyboardEvent
    ) {
      if (event.key === "Escape") {
        closeMedia();
      }

      if (event.key === "ArrowLeft") {
        showPrevious();
      }

      if (event.key === "ArrowRight") {
        showNext();
      }
    }

    window.addEventListener(
      "keydown",
      handleKeyDown
    );

    return () => {
      window.removeEventListener(
        "keydown",
        handleKeyDown
      );
    };
  }, [
    activeIndex,
    closeMedia,
    showPrevious,
    showNext,
  ]);

  /* =======================================================
     BODY SCROLL LOCK
  ======================================================= */

  useEffect(() => {
    if (activeIndex === null) {
      return;
    }

    const previousOverflow =
      document.body.style.overflow;

    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow =
        previousOverflow;
    };
  }, [activeIndex]);

  /* =======================================================
     EMPTY
  ======================================================= */

  if (!sortedMedia.length) {
    return (
      <section
        id="gallery-media"
        className="bg-[#050505] py-20 sm:py-24"
      >
        <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
          <div className="flex min-h-[300px] items-center justify-center rounded-[2rem] border border-dashed border-white/[0.08] bg-[#080808]">
            <div className="text-center">
              <Images
                size={34}
                strokeWidth={1}
                className="mx-auto text-neutral-800"
              />

              <p className="mt-5 text-sm text-white/60">
                No media available yet.
              </p>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <>
      {/* =====================================================
          MEDIA SECTION
      ===================================================== */}

      <section
        id="gallery-media"
        className="relative bg-[#050505] py-16 sm:py-20 lg:py-24"
      >
        <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
          {/* =================================================
              HEADER
          ================================================= */}

          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <div className="flex items-center gap-3">
                <span className="h-px w-7 bg-[#FFC400]/40" />

                <span className="text-[9px] font-semibold uppercase tracking-[0.2em] text-[#FFC400]">
                  Media collection
                </span>
              </div>

              <h2 className="mt-4 text-3xl font-semibold tracking-[-0.045em] text-white sm:text-4xl">
                Explore the collection.
              </h2>
            </div>

            <div className="flex items-center gap-2 text-[8px] font-medium uppercase tracking-[0.14em] text-neutral-800">
              <Images size={11} />

              {sortedMedia.length}{" "}
              {sortedMedia.length === 1
                ? "item"
                : "items"}
            </div>
          </div>

          {/* =================================================
              MEDIA GRID
          ================================================= */}

          <div className="mt-10 grid auto-rows-[180px] grid-cols-2 gap-3 sm:auto-rows-[220px] sm:gap-4 lg:auto-rows-[250px] lg:grid-cols-4">
            {sortedMedia.map(
              (item, index) => {
                const isVideo =
                  item.type === "video";

                const thumbnail =
                  isVideo
                    ? item.thumbnailUrl ||
                      item.url
                    : item.url;

                const alt =
                  item.alt ||
                  item.caption ||
                  `${title} media ${index + 1}`;

                /*
                 * Every 7th item gets a wider visual
                 * on larger screens for a more editorial
                 * gallery layout.
                 */

                const isWide =
                  index % 7 === 0 ||
                  index % 7 === 4;

                return (
                  <button
                    key={item._id}
                    type="button"
                    onClick={() =>
                      openMedia(index)
                    }
                    aria-label={`Open ${
                      isVideo
                        ? "video"
                        : "image"
                    } ${index + 1}`}
                    className={[
                      "group relative overflow-hidden rounded-2xl border border-white/[0.07] bg-[#090909] text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FFC400]",
                      isWide
                        ? "col-span-2"
                        : "col-span-1",
                    ].join(" ")}
                  >
                    {/* =================================================
                        IMAGE / VIDEO THUMBNAIL
                    ================================================= */}

                    {thumbnail ? (
                      isVideo ? (
                        <video
                          src={item.url}
                          poster={
                            item.thumbnailUrl
                          }
                          preload="metadata"
                          muted
                          playsInline
                          className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                        />
                      ) : (
                        <img
                          src={thumbnail}
                          alt={alt}
                          loading="lazy"
                          className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                        />
                      )
                    ) : (
                      <div className="flex h-full w-full items-center justify-center">
                        <Images
                          size={30}
                          strokeWidth={1}
                          className="text-neutral-800"
                        />
                      </div>
                    )}

                    {/* =================================================
                        HOVER LAYER
                    ================================================= */}

                    <div
                      aria-hidden="true"
                      className="absolute inset-0 bg-black/0 transition-colors duration-300 group-hover:bg-black/20"
                    />

                    {/* =================================================
                        VIDEO ICON
                    ================================================= */}

                    {isVideo && (
                      <span className="absolute left-4 top-4 flex h-9 w-9 items-center justify-center rounded-full border border-white/15 bg-black/50 text-white backdrop-blur-sm">
                        <Play
                          size={12}
                          fill="currentColor"
                        />
                      </span>
                    )}

                    {/* =================================================
                        OPEN ICON
                    ================================================= */}

                    <span className="absolute bottom-4 right-4 flex h-9 w-9 translate-y-2 items-center justify-center rounded-full border border-white/10 bg-black/50 text-white opacity-0 backdrop-blur-sm transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                      <Maximize2
                        size={13}
                      />
                    </span>

                    {/* =================================================
                        CAPTION
                    ================================================= */}

                    {item.caption && (
                      <div className="absolute bottom-0 left-0 right-0 translate-y-full bg-gradient-to-t from-black/80 to-transparent px-4 pb-4 pt-10 transition-transform duration-300 group-hover:translate-y-0">
                        <p className="line-clamp-2 text-[10px] leading-5 text-white/80">
                          {item.caption}
                        </p>
                      </div>
                    )}
                  </button>
                );
              }
            )}
          </div>
        </div>
      </section>

      {/* =====================================================
          FULLSCREEN LIGHTBOX
      ===================================================== */}

      <AnimatePresence>
        {activeMedia && activeIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{
              duration: 0.2,
            }}
            className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-md"
            role="dialog"
            aria-modal="true"
            aria-label={`${title} media viewer`}
          >
            {/* =================================================
                TOP BAR
            ================================================= */}

            <div className="absolute left-0 right-0 top-0 z-20 flex items-center justify-between px-4 py-4 sm:px-7 sm:py-6">
              <div>
                <p className="text-[8px] font-semibold uppercase tracking-[0.16em] text-[#FFC400]">
                  {title}
                </p>

                <p className="mt-1 text-[9px] text-neutral-600">
                  {activeIndex + 1} /{" "}
                  {sortedMedia.length}
                </p>
              </div>

              <button
                type="button"
                onClick={closeMedia}
                aria-label="Close media viewer"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/[0.04] text-white/70 transition-colors hover:border-white/20 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FFC400]"
              >
                <X size={17} />
              </button>
            </div>

            {/* =================================================
                PREVIOUS
            ================================================= */}

            {sortedMedia.length > 1 && (
              <button
                type="button"
                onClick={showPrevious}
                aria-label="Previous media"
                className="absolute left-3 top-1/2 z-20 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/10 bg-black/50 text-white/70 backdrop-blur-sm transition-all hover:border-white/20 hover:bg-black/70 hover:text-white sm:left-6 sm:h-12 sm:w-12"
              >
                <ChevronLeft size={20} />
              </button>
            )}

            {/* =================================================
                NEXT
            ================================================= */}

            {sortedMedia.length > 1 && (
              <button
                type="button"
                onClick={showNext}
                aria-label="Next media"
                className="absolute right-3 top-1/2 z-20 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/10 bg-black/50 text-white/70 backdrop-blur-sm transition-all hover:border-white/20 hover:bg-black/70 hover:text-white sm:right-6 sm:h-12 sm:w-12"
              >
                <ChevronRight size={20} />
              </button>
            )}

            {/* =================================================
                MEDIA VIEWER
            ================================================= */}

            <div className="flex h-full w-full items-center justify-center px-14 pb-28 pt-20 sm:px-20 sm:pb-32">
              <motion.div
                key={activeMedia._id}
                initial={{
                  opacity: 0,
                  scale: 0.98,
                }}
                animate={{
                  opacity: 1,
                  scale: 1,
                }}
                transition={{
                  duration: 0.2,
                }}
                className="flex max-h-full max-w-6xl items-center justify-center"
              >
                {activeMedia.type ===
                "video" ? (
                  <video
                    key={activeMedia.url}
                    src={activeMedia.url}
                    poster={
                      activeMedia.thumbnailUrl
                    }
                    controls
                    autoPlay
                    playsInline
                    className="max-h-[72vh] max-w-full rounded-xl object-contain shadow-2xl"
                  />
                ) : (
                  <img
                    src={activeMedia.url}
                    alt={
                      activeMedia.alt ||
                      activeMedia.caption ||
                      `${title} media ${
                        activeIndex + 1
                      }`
                    }
                    className="max-h-[72vh] max-w-full rounded-xl object-contain shadow-2xl"
                  />
                )}
              </motion.div>
            </div>

            {/* =================================================
                BOTTOM INFO
            ================================================= */}

            <div className="absolute bottom-0 left-0 right-0 z-20 bg-gradient-to-t from-black via-black/80 to-transparent px-5 pb-6 pt-16 sm:px-8 sm:pb-8">
              <div className="mx-auto flex max-w-4xl items-end justify-center gap-4 text-center">
                <div className="min-w-0">
                  {activeMedia.caption && (
                    <p className="text-xs leading-6 text-white/70 sm:text-sm">
                      {activeMedia.caption}
                    </p>
                  )}

                  <p className="mt-2 text-[8px] font-medium uppercase tracking-[0.16em] text-neutral-700">
                    {activeMedia.type ===
                    "video"
                      ? "Video"
                      : "Image"}{" "}
                    · {activeIndex + 1} /{" "}
                    {sortedMedia.length}
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}