"use client";

import Image from "next/image";
import Link from "next/link";
import {
  ArrowUpRight,
  Play,
} from "lucide-react";
import { motion } from "framer-motion";

type GalleryMedia = {
  id: string;
  type: "image" | "video";
  url: string;
  publicId: string | null;
  thumbnailUrl: string | null;
  thumbnailPublicId: string | null;
  alt: string;
  caption: string | null;
  displayOrder: number;
};

type GalleryData = {
  id: string;
  title: string;
  slug: string;
  shortDescription: string | null;

  coverImage: {
    url: string;
    publicId: string | null;
    alt: string;
  } | null;

  category: string | null;
  featured: boolean;

  media: GalleryMedia[];
};

type GalleryGridProps = {
  galleries: GalleryData[];
};

function getGalleryPreview(gallery: GalleryData) {
  const firstMedia = gallery.media?.[0];

  if (firstMedia) {
    return {
      type: firstMedia.type,
      url:
        firstMedia.type === "video"
          ? firstMedia.thumbnailUrl || firstMedia.url
          : firstMedia.url,
      alt:
        firstMedia.alt ||
        gallery.coverImage?.alt ||
        gallery.title,
    };
  }

  if (gallery.coverImage) {
    return {
      type: "image" as const,
      url: gallery.coverImage.url,
      alt:
        gallery.coverImage.alt ||
        gallery.title,
    };
  }

  return null;
}

export default function GalleryGrid({
  galleries,
}: GalleryGridProps) {
  return (
    <div className="min-w-0">
      {galleries.map((gallery, index) => {
        const preview = getGalleryPreview(gallery);
        const galleryHref = `/gallery/${gallery.slug}`;

        return (
          <Link
            key={gallery.id}
            href={galleryHref}
            aria-label={`View ${gallery.title} gallery`}
            className="block rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[#FFC400]"
          >
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
                delay: Math.min(
                  index * 0.07,
                  0.2
                ),
                ease: [
                  0.22,
                  1,
                  0.36,
                  1,
                ],
              }}
              className="group relative overflow-hidden border-b border-[#202020] py-7 first:pt-7 sm:py-8 lg:py-9"
            >
              <div className="grid gap-6 sm:grid-cols-[auto_1fr_auto] sm:items-start sm:gap-7">
                {/* NUMBER */}
                <div className="flex items-center gap-3 sm:block">
                  <span
                    aria-hidden="true"
                    className="text-[10px] font-medium tabular-nums tracking-[0.14em] text-[#555] transition-colors duration-200 group-hover:text-[#FFC400]"
                  >
                    {String(index + 1).padStart(
                      2,
                      "0"
                    )}
                  </span>

                  {gallery.featured && (
                    <span className="inline-flex items-center gap-1.5 rounded-full border border-[#FFC400]/20 bg-[#FFC400]/[0.06] px-2.5 py-1 text-[9px] font-medium uppercase tracking-[0.14em] text-[#FFC400] sm:mt-4 sm:flex">
                      <span
                        aria-hidden="true"
                        className="h-1.5 w-1.5 rounded-full bg-[#FFC400]"
                      />
                      Featured
                    </span>
                  )}
                </div>

                {/* CONTENT */}
                <div className="min-w-0">
                  <div className="flex items-start gap-3">
                    <div className="min-w-0">
                      {gallery.category && (
                        <p className="text-[9px] font-medium uppercase tracking-[0.16em] text-[#FFC400]">
                          {gallery.category}
                        </p>
                      )}

                      <div className="mt-1 flex min-w-0 items-center gap-2">
                        <h3 className="min-w-0 text-xl font-semibold tracking-[-0.03em] text-[#EAEAEA] transition-colors duration-200 group-hover:text-[#FFC400] sm:text-2xl">
                          {gallery.title}
                        </h3>

                        <ArrowUpRight
                          aria-hidden="true"
                          size={16}
                          className="shrink-0 text-[#444] opacity-0 transition-all duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-[#FFC400] group-hover:opacity-100"
                        />
                      </div>

                      {gallery.shortDescription && (
                        <p className="mt-2 max-w-xl text-sm leading-6 text-[#777]">
                          {
                            gallery.shortDescription
                          }
                        </p>
                      )}
                    </div>
                  </div>

                  {/* PREVIEW IMAGE */}
                  {preview && (
                    <div className="mt-5 overflow-hidden rounded-[20px] border border-[#202020] bg-[#0D0D0D]">
                      <div className="relative aspect-[16/7] overflow-hidden">
                        <Image
                          src={preview.url}
                          alt={preview.alt}
                          fill
                          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 75vw, 55vw"
                          loading="lazy"
                          className="object-cover transition duration-700 ease-out group-hover:scale-[1.025]"
                        />

                        <div
                          aria-hidden="true"
                          className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-70"
                        />

                        {preview.type ===
                          "video" && (
                          <span
                            aria-hidden="true"
                            className="absolute left-4 top-4 flex h-9 w-9 items-center justify-center rounded-full border border-white/15 bg-black/45 text-white backdrop-blur-md"
                          >
                            <Play
                              aria-hidden="true"
                              size={14}
                              fill="currentColor"
                              className="ml-0.5"
                            />
                          </span>
                        )}

                        <span
                          aria-hidden="true"
                          className="absolute bottom-4 right-4 flex h-9 w-9 items-center justify-center rounded-full border border-white/15 bg-black/45 text-white opacity-0 backdrop-blur-md transition-all duration-300 group-hover:opacity-100"
                        >
                          <ArrowUpRight
                            aria-hidden="true"
                            size={15}
                          />
                        </span>
                      </div>
                    </div>
                  )}
                </div>

                {/* RIGHT SIGNAL */}
                <div
                  aria-hidden="true"
                  className="hidden items-end self-stretch sm:flex"
                >
                  <span className="text-[9px] font-medium uppercase tracking-[0.16em] text-[#444] transition-colors duration-200 group-hover:text-[#FFC400]">
                    View gallery
                  </span>
                </div>
              </div>
            </motion.article>
          </Link>
        );
      })}
    </div>
  );
}