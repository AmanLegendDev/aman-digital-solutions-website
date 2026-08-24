"use client";

import GalleryHeroSection from "./GalleryHeroSection";
import GalleryFeaturedSection from "./GalleryFeaturedSection";
import GalleryGridSection from "./GalleryGridSection";
import GalleryFinalCtaSection from "./GalleryFinalCtaSection";

/* =========================================================
   TYPES
========================================================= */

export type GalleryMediaData = {
  _id: string;

  type: "image" | "video";

  url: string;
  publicId?: string;

  thumbnailUrl?: string;
  thumbnailPublicId?: string;

  alt?: string;
  caption?: string;

  displayOrder: number;
};

export type GalleryCardData = {
  _id: string;

  title: string;
  slug: string;

  shortDescription?: string;
  description?: string;

  coverImage?: {
    url: string;
    publicId?: string;
    alt?: string;
  };

  media: GalleryMediaData[];

  project?: {
    _id: string;
    title: string;
    slug: string;
  };

  category?: string;

  featured: boolean;
  displayOrder: number;
};

/* =========================================================
   PROPS
==================================================== */

type GalleryPageClientProps = {
  galleries: GalleryCardData[];
};

/* =========================================================
   PAGE
========================================================= */

export default function GalleryPageClient({
  galleries,
}: GalleryPageClientProps) {
  /*
   * Featured galleries are already ordered by the server,
   * but keeping this separation here makes the UI predictable.
   */

  const featuredGalleries =
    galleries.filter(
      (gallery) => gallery.featured
    );

  const regularGalleries =
    galleries.filter(
      (gallery) => !gallery.featured
    );

  return (
    <main className="min-h-screen bg-[#050505] text-white">
      {/* ===================================================
          HERO
      =================================================== */}

      <GalleryHeroSection
        totalGalleries={galleries.length}
      />

      {/* ===================================================
          FEATURED
      =================================================== */}

      {featuredGalleries.length > 0 && (
        <GalleryFeaturedSection
          galleries={featuredGalleries}
        />
      )}

      {/* ===================================================
          ALL GALLERIES
      =================================================== */}

      <GalleryGridSection
        galleries={regularGalleries}
        totalGalleries={galleries.length}
      />

      {/* ===================================================
          FINAL CTA
      =================================================== */}

      <GalleryFinalCtaSection />
    </main>
  );
}