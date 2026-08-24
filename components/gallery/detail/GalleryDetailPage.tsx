import GalleryDetailHeroSection from "./GalleryDetailHeroSection";
import GalleryMediaSection from "./GalleryMediaSection";
import GalleryRelatedProjectSection from "./GalleryRelatedProjectSection";
import GalleryFinalCtaSection from "./GalleryFinalCtaSection";

/* =========================================================
   TYPES
========================================================= */

export type GalleryDetailMedia = {
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

export type GalleryDetailProject = {
  _id: string;
  title: string;
  slug: string;
};

export type GalleryDetailData = {
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

  media: GalleryDetailMedia[];

  project?: GalleryDetailProject;

  category?: string;

  featured: boolean;
  displayOrder: number;
};

/* =========================================================
   PROPS
========================================================= */

type GalleryDetailPageProps = {
  gallery: GalleryDetailData;
};

/* =========================================================
   PAGE
========================================================= */

export default function GalleryDetailPage({
  gallery,
}: GalleryDetailPageProps) {
  return (
    <main className="min-h-screen bg-[#050505] text-white">
      {/* =====================================================
          HERO
      ===================================================== */}

      <GalleryDetailHeroSection
        gallery={gallery}
      />

      {/* =====================================================
          MEDIA
      ===================================================== */}

      <GalleryMediaSection
        media={gallery.media}
        title={gallery.title}
      />

      {/* =====================================================
          RELATED PROJECT
      ===================================================== */}

      {gallery.project && (
        <GalleryRelatedProjectSection
          project={gallery.project}
        />
      )}

      {/* =====================================================
          FINAL CTA
      ===================================================== */}

      <GalleryFinalCtaSection
        title={gallery.title}
      />
    </main>
  );
}