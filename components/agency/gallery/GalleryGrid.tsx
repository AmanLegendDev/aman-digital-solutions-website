"use client";

import Link from "next/link";
import { ArrowUpRight, Play } from "lucide-react";
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
  featuredGallery: GalleryData;
  galleries: GalleryData[];
};

function MediaPreview({
  media,
  featured = false,
}: {
  media: GalleryMedia;
  featured?: boolean;
}) {
  const imageSource =
    media.type === "video"
      ? media.thumbnailUrl || media.url
      : media.url;

  if (media.type === "video") {
    return (
      <div className="relative h-full w-full">
        <img
          src={imageSource}
          alt={media.alt}
          loading={featured ? "eager" : "lazy"}
          className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.035]"
        />

        <div className="absolute inset-0 bg-black/20 transition-colors duration-300 group-hover:bg-black/10" />

        <span className="absolute left-1/2 top-1/2 flex h-12 w-12 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-black/45 text-white backdrop-blur-md transition-transform duration-300 group-hover:scale-105">
          <Play
            size={17}
            fill="currentColor"
            className="ml-0.5"
          />
        </span>
      </div>
    );
  }

  return (
    <img
      src={imageSource}
      alt={media.alt}
      loading={featured ? "eager" : "lazy"}
      className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.035]"
    />
  );
}

function MediaTile({
  media,
  index,
  large = false,
}: {
  media: GalleryMedia;
  index: number;
  large?: boolean;
}) {
  return (
    <motion.div
      initial={{
        opacity: 0,
        y: 18,
      }}
      whileInView={{
        opacity: 1,
        y: 0,
      }}
      viewport={{
        once: true,
        amount: 0.1,
      }}
      transition={{
        duration: 0.5,
        delay: Math.min(index * 0.06, 0.18),
        ease: [0.22, 1, 0.36, 1],
      }}
      className={[
        "group relative min-w-0 overflow-hidden rounded-[22px] border border-[#202020] bg-[#0D0D0D]",
        large
          ? "aspect-[16/10]"
          : "aspect-[4/3]",
      ].join(" ")}
    >
      <MediaPreview
        media={media}
        featured={large}
      />

      {/* GRADIENT */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-80"
      />

      {/* CAPTION */}
      {media.caption && (
        <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-5">
          <p className="max-w-[85%] text-xs leading-5 text-white/75">
            {media.caption}
          </p>
        </div>
      )}

      {/* INDEX */}
      <span className="absolute right-4 top-4 rounded-full border border-white/10 bg-black/35 px-2.5 py-1 text-[9px] tabular-nums text-white/55 backdrop-blur-md">
        {String(index + 1).padStart(2, "0")}
      </span>
    </motion.div>
  );
}

export default function GalleryGrid({
  featuredGallery,
  galleries,
}: GalleryGridProps) {
  const featuredMedia = [
    ...(featuredGallery.media ?? []),
  ].sort(
    (a, b) => a.displayOrder - b.displayOrder
  );

  const primaryMedia =
    featuredMedia[0] ??
    (featuredGallery.coverImage
      ? {
          id: `${featuredGallery.id}-cover`,
          type: "image" as const,
          url: featuredGallery.coverImage.url,
          publicId:
            featuredGallery.coverImage.publicId,
          thumbnailUrl: null,
          thumbnailPublicId: null,
          alt: featuredGallery.coverImage.alt,
          caption: null,
          displayOrder: 0,
        }
      : null);

  const secondaryMedia = featuredMedia.slice(1, 5);

  return (
    <div className="w-full min-w-0">
      {/* FEATURED GALLERY */}
      <div className="grid min-w-0 gap-4 lg:grid-cols-[1.35fr_0.65fr]">
        {/* PRIMARY */}
        {primaryMedia && (
          <Link
            href={`/gallery/${featuredGallery.slug}`}
            aria-label={`View ${featuredGallery.title}`}
            className="block min-w-0"
          >
            <motion.div
              initial={{
                opacity: 0,
                scale: 0.985,
              }}
              whileInView={{
                opacity: 1,
                scale: 1,
              }}
              viewport={{
                once: true,
                amount: 0.15,
              }}
              transition={{
                duration: 0.65,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="group relative aspect-[16/10] min-w-0 overflow-hidden rounded-[26px] border border-[#252525] bg-[#0D0D0D]"
            >
              <MediaPreview
                media={primaryMedia}
                featured
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" />

              {/* TOP META */}
              <div className="absolute left-5 right-5 top-5 flex items-start justify-between gap-4">
                {featuredGallery.category && (
                  <span className="rounded-full border border-white/10 bg-black/40 px-3 py-1.5 text-[9px] font-medium uppercase tracking-[0.15em] text-white/65 backdrop-blur-md">
                    {featuredGallery.category}
                  </span>
                )}

                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-white/10 bg-black/40 text-white/70 opacity-0 backdrop-blur-md transition-all duration-300 group-hover:opacity-100">
                  <ArrowUpRight size={15} />
                </span>
              </div>

              {/* BOTTOM CONTENT */}
              <div className="absolute bottom-0 left-0 right-0 p-5 sm:p-7">
                <p className="text-[9px] font-medium uppercase tracking-[0.17em] text-[#FFC400]">
                  Featured work
                </p>

                <h3 className="mt-2 text-2xl font-semibold tracking-[-0.035em] text-white sm:text-3xl">
                  {featuredGallery.title}
                </h3>

                {featuredGallery.shortDescription && (
                  <p className="mt-2 max-w-xl text-sm leading-6 text-white/55">
                    {featuredGallery.shortDescription}
                  </p>
                )}
              </div>
            </motion.div>
          </Link>
        )}

        {/* SECONDARY MEDIA */}
        {secondaryMedia.length > 0 && (
          <div className="grid min-w-0 grid-cols-2 gap-4 lg:grid-cols-1">
            {secondaryMedia.slice(0, 2).map(
              (media, index) => (
                <MediaTile
                  key={media.id}
                  media={media}
                  index={index}
                />
              )
            )}
          </div>
        )}
      </div>

      {/* EXTRA FEATURED MEDIA */}
      {secondaryMedia.length > 2 && (
        <div className="mt-4 grid min-w-0 grid-cols-2 gap-4 sm:grid-cols-2">
          {secondaryMedia.slice(2, 4).map(
            (media, index) => (
              <MediaTile
                key={media.id}
                media={media}
                index={index + 2}
              />
            )
          )}
        </div>
      )}

      {/* OTHER GALLERIES */}
      {galleries.length > 0 && (
        <div className="mt-10 grid min-w-0 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {galleries.slice(0, 3).map(
            (gallery, index) => {
              const media =
                gallery.media?.[0] ??
                (gallery.coverImage
                  ? {
                      id: `${gallery.id}-cover`,
                      type: "image" as const,
                      url: gallery.coverImage.url,
                      publicId:
                        gallery.coverImage.publicId ??
                        null,
                      thumbnailUrl: null,
                      thumbnailPublicId: null,
                      alt:
                        gallery.coverImage.alt ??
                        gallery.title,
                      caption: null,
                      displayOrder: 0,
                    }
                  : null);

              if (!media) {
                return null;
              }

              return (
                <Link
                  key={gallery.id}
                  href={`/gallery/${gallery.slug}`}
                  className="block min-w-0"
                >
                  <motion.article
                    initial={{
                      opacity: 0,
                      y: 18,
                    }}
                    whileInView={{
                      opacity: 1,
                      y: 0,
                    }}
                    viewport={{
                      once: true,
                      amount: 0.1,
                    }}
                    transition={{
                      duration: 0.45,
                      delay: Math.min(
                        index * 0.07,
                        0.18
                      ),
                    }}
                    className="group relative min-w-0 overflow-hidden rounded-[22px] border border-[#202020] bg-[#0A0A0A]"
                  >
                    <div className="relative aspect-[16/10] overflow-hidden">
                      <MediaPreview media={media} />

                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />

                      <div className="absolute bottom-0 left-0 right-0 p-5">
                        {gallery.category && (
                          <p className="text-[9px] uppercase tracking-[0.15em] text-[#FFC400]">
                            {gallery.category}
                          </p>
                        )}

                        <h3 className="mt-1 truncate text-lg font-semibold tracking-[-0.025em] text-white">
                          {gallery.title}
                        </h3>
                      </div>

                      <span className="absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-full border border-white/10 bg-black/40 text-white/70 opacity-0 backdrop-blur-md transition-all duration-300 group-hover:opacity-100">
                        <ArrowUpRight size={14} />
                      </span>
                    </div>
                  </motion.article>
                </Link>
              );
            }
          )}
        </div>
      )}
    </div>
  );
}