"use client";

import { useEffect, useState } from "react";
import {
  ChevronLeft,
  ChevronRight,
  Expand,
  Image as ImageIcon,
  Play,
  X,
} from "lucide-react";

export type ProjectGalleryMedia = {
  type: "image" | "video";
  url: string;
  publicId?: string;
  title: string;
};

type ProjectGallerySectionProps = {
  gallery: ProjectGalleryMedia[];
};

export default function ProjectGallerySection({
  gallery,
}: ProjectGallerySectionProps) {
  const [activeIndex, setActiveIndex] = useState<number | null>(
    null
  );

  if (!gallery?.length) {
    return null;
  }

  const activeMedia =
    activeIndex !== null ? gallery[activeIndex] : null;

  const openPreview = (index: number) => {
    setActiveIndex(index);
  };

  const closePreview = () => {
    setActiveIndex(null);
  };

  const showPrevious = () => {
    setActiveIndex((current) => {
      if (current === null) return null;

      return current === 0
        ? gallery.length - 1
        : current - 1;
    });
  };

  const showNext = () => {
    setActiveIndex((current) => {
      if (current === null) return null;

      return current === gallery.length - 1
        ? 0
        : current + 1;
    });
  };

  return (
    <>
      <section
        id="project-gallery"
        aria-labelledby="project-gallery-heading"
        className="relative border-t border-white/[0.06] bg-[#050505] py-20 sm:py-24 lg:py-28"
      >
        <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
          {/* =================================================
              HEADER
          ================================================= */}

          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <div className="flex items-center gap-3">
                <span
                  aria-hidden="true"
                  className="flex h-8 w-8 items-center justify-center rounded-xl border border-[#FFC400]/20 bg-[#FFC400]/[0.05] text-[#FFC400]"
                >
                  <ImageIcon size={14} />
                </span>

                <span className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[#FFC400]">
                  Project gallery
                </span>
              </div>

              <h2
                id="project-gallery-heading"
                className="mt-5 text-3xl font-semibold leading-[1.05] tracking-[-0.045em] text-white sm:text-4xl lg:text-[3.2rem]"
              >
                See the work
                <br />
                <span className="text-neutral-500">
                  up close.
                </span>
              </h2>
            </div>

            <div className="flex max-w-xl items-end justify-between gap-6 lg:justify-end">
              <p className="hidden text-sm leading-7 text-neutral-500 sm:block">
                Explore the screens, interactions and visual
                details that came together to create this
                project.
              </p>

              <div className="shrink-0 rounded-full border border-white/[0.07] bg-[#090909] px-4 py-2">
                <span className="text-[9px] font-semibold uppercase tracking-[0.16em] text-neutral-600">
                  {gallery.length}{" "}
                  {gallery.length === 1
                    ? "item"
                    : "items"}
                </span>
              </div>
            </div>
          </div>

          {/* =================================================
              GALLERY GRID
          ================================================= */}

          <div className="mt-14 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {gallery.map((media, index) => (
              <button
                key={`${media.url}-${index}`}
                type="button"
                onClick={() => openPreview(index)}
                aria-label={`Preview ${media.title}`}
                className={[
                  "group relative overflow-hidden rounded-[26px]",
                  "border border-white/[0.07] bg-[#090909]",
                  "text-left transition-all duration-300",
                  "hover:-translate-y-1 hover:border-[#FFC400]/20",
                  "focus-visible:outline-none focus-visible:ring-2",
                  "focus-visible:ring-[#FFC400]",
                  index === 0
                    ? "sm:col-span-2 lg:col-span-2"
                    : "",
                ].join(" ")}
              >
                {/* MEDIA */}

                <div
                  className={[
                    "relative overflow-hidden",
                    index === 0
                      ? "aspect-[16/9]"
                      : "aspect-[16/10]",
                  ].join(" ")}
                >
                  {media.type === "image" ? (
                    <img
                      src={media.url}
                      alt={media.title}
                      loading={
                        index === 0 ? "eager" : "lazy"
                      }
                      className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.035]"
                    />
                  ) : (
                    <>
                      <video
                        src={media.url}
                        muted
                        playsInline
                        preload="metadata"
                        className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.035]"
                      />

                      {/* VIDEO OVERLAY */}

                      <div className="absolute inset-0 flex items-center justify-center bg-black/10 transition-colors duration-300 group-hover:bg-black/20">
                        <span className="flex h-14 w-14 items-center justify-center rounded-full border border-white/20 bg-black/50 text-white shadow-2xl backdrop-blur-md transition-all duration-300 group-hover:scale-110 group-hover:border-[#FFC400]/40 group-hover:bg-[#FFC400] group-hover:text-black">
                          <Play
                            size={18}
                            fill="currentColor"
                            className="ml-0.5"
                          />
                        </span>
                      </div>
                    </>
                  )}

                  {/* DARK GRADIENT */}

                  <div
                    aria-hidden="true"
                    className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-black/80 to-transparent opacity-70"
                  />

                  {/* TYPE BADGE */}

                  <div className="absolute left-4 top-4">
                    <span className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-black/50 px-3 py-1.5 text-[8px] font-semibold uppercase tracking-[0.16em] text-white/70 backdrop-blur-md">
                      {media.type === "video" ? (
                        <Play
                          size={9}
                          fill="currentColor"
                        />
                      ) : (
                        <ImageIcon size={9} />
                      )}

                      {media.type}
                    </span>
                  </div>

                  {/* EXPAND */}

                  <span className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-black/50 text-white/60 opacity-0 backdrop-blur-md transition-all duration-300 group-hover:opacity-100 group-hover:text-[#FFC400]">
                    <Expand size={14} />
                  </span>

                  {/* TITLE */}

                  <div className="absolute inset-x-0 bottom-0 p-5">
                    <p className="line-clamp-2 text-sm font-semibold text-white">
                      {media.title}
                    </p>

                    <p className="mt-1 text-[9px] uppercase tracking-[0.15em] text-white/40">
                      View {media.type}
                    </p>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* =====================================================
          LIGHTBOX / PREVIEW
      ===================================================== */}

      {activeMedia && activeIndex !== null && (
        <GalleryLightbox
          media={activeMedia}
          index={activeIndex}
          total={gallery.length}
          onClose={closePreview}
          onPrevious={showPrevious}
          onNext={showNext}
        />
      )}
    </>
  );
}

/* ===========================================================
   LIGHTBOX
=========================================================== */

type GalleryLightboxProps = {
  media: ProjectGalleryMedia;
  index: number;
  total: number;
  onClose: () => void;
  onPrevious: () => void;
  onNext: () => void;
};

function GalleryLightbox({
  media,
  index,
  total,
  onClose,
  onPrevious,
  onNext,
}: GalleryLightboxProps) {
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }

      if (event.key === "ArrowLeft") {
        onPrevious();
      }

      if (event.key === "ArrowRight") {
        onNext();
      }
    };

    const previousOverflow =
      document.body.style.overflow;

    document.body.style.overflow = "hidden";

    window.addEventListener(
      "keydown",
      handleKeyDown
    );

    return () => {
      document.body.style.overflow =
        previousOverflow;

      window.removeEventListener(
        "keydown",
        handleKeyDown
      );
    };
  }, [onClose, onNext, onPrevious]);

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 p-3 backdrop-blur-xl sm:p-6"
      role="dialog"
      aria-modal="true"
      aria-label={`Preview ${media.title}`}
    >
      {/* BACKDROP */}

      <button
        type="button"
        aria-label="Close preview"
        onClick={onClose}
        className="absolute inset-0 cursor-default"
      />

      {/* CONTAINER */}

      <div className="relative z-10 flex h-full w-full max-w-7xl flex-col">
        {/* TOP BAR */}

        <div className="flex items-center justify-between py-2 sm:py-3">
          <div className="min-w-0">
            <p className="truncate text-sm font-semibold text-white">
              {media.title}
            </p>

            <p className="mt-1 text-[9px] uppercase tracking-[0.16em] text-neutral-600">
              {String(index + 1).padStart(2, "0")}{" "}
              / {String(total).padStart(2, "0")}
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close preview"
            className="ml-4 flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white/10 bg-white/[0.05] text-neutral-400 transition hover:border-[#FFC400]/30 hover:text-[#FFC400]"
          >
            <X size={18} />
          </button>
        </div>

        {/* MEDIA AREA */}

        <div className="relative flex min-h-0 flex-1 items-center justify-center py-4 sm:py-6">
          {/* PREVIOUS */}

          {total > 1 && (
            <button
              type="button"
              onClick={onPrevious}
              aria-label="Previous gallery item"
              className="absolute left-0 z-20 hidden h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-black/60 text-white/60 backdrop-blur-md transition hover:border-[#FFC400]/30 hover:text-[#FFC400] sm:flex"
            >
              <ChevronLeft size={20} />
            </button>
          )}

          {/* MEDIA */}

          <div className="flex h-full w-full items-center justify-center overflow-hidden rounded-2xl border border-white/[0.08] bg-[#070707] shadow-[0_30px_120px_rgba(0,0,0,0.6)] sm:rounded-3xl sm:px-14">
            {media.type === "image" ? (
              <img
                src={media.url}
                alt={media.title}
                className="max-h-full max-w-full object-contain"
              />
            ) : (
              <video
                key={media.url}
                src={media.url}
                controls
                autoPlay
                playsInline
                className="max-h-full max-w-full"
              />
            )}
          </div>

          {/* NEXT */}

          {total > 1 && (
            <button
              type="button"
              onClick={onNext}
              aria-label="Next gallery item"
              className="absolute right-0 z-20 hidden h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-black/60 text-white/60 backdrop-blur-md transition hover:border-[#FFC400]/30 hover:text-[#FFC400] sm:flex"
            >
              <ChevronRight size={20} />
            </button>
          )}
        </div>

        {/* MOBILE CONTROLS */}

        {total > 1 && (
          <div className="flex items-center justify-center gap-3 py-2 sm:hidden">
            <button
              type="button"
              onClick={onPrevious}
              aria-label="Previous gallery item"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/[0.04] text-neutral-400"
            >
              <ChevronLeft size={17} />
            </button>

            <span className="min-w-[70px] text-center text-[9px] font-semibold uppercase tracking-[0.16em] text-neutral-600">
              {index + 1} / {total}
            </span>

            <button
              type="button"
              onClick={onNext}
              aria-label="Next gallery item"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/[0.04] text-neutral-400"
            >
              <ChevronRight size={17} />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}