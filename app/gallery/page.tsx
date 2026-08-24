import type { Metadata } from "next";

import { connectDB } from "@/lib/db/connect";
import Gallery from "@/models/Gallery";

import GalleryPageClient, {
  type GalleryCardData,
} from "@/components/gallery/GalleryPageClient";
import Project from "@/models/Project";

/* =========================================================
   POPULATED PROJECT TYPE
========================================================= */

type PopulatedGalleryProject = {
  _id: string;
  title: string;
  slug: string;
};

/* =========================================================
   METADATA
========================================================= */

export const metadata: Metadata = {
  title: "Gallery | Aman Digital Solutions",

  description:
    "Explore selected visuals, project moments and digital experiences from Aman Digital Solutions.",

  alternates: {
    canonical:
      "https://www.amandigitalsolutions.in/gallery",
  },

  openGraph: {
    title: "Gallery | Aman Digital Solutions",

    description:
      "Explore selected visuals, project moments and digital experiences from Aman Digital Solutions.",

    url:
      "https://www.amandigitalsolutions.in/gallery",

    type: "website",
  },

  twitter: {
    card: "summary_large_image",

    title: "Gallery | Aman Digital Solutions",

    description:
      "Explore selected visuals, project moments and digital experiences from Aman Digital Solutions.",
  },
};

/* =========================================================
   FETCH PUBLISHED GALLERIES
========================================================= */

async function getPublishedGalleries(): Promise<
  GalleryCardData[]
> {
  await connectDB();

  const galleries = await Gallery.find({
    published: true,
  })
    .sort({
      featured: -1,
      displayOrder: 1,
      createdAt: -1,
    })
    .lean();

  return galleries.map((gallery) => {
    /* =====================================================
       SORT MEDIA
    ===================================================== */

    const media = [...(gallery.media || [])]
      .sort(
        (a, b) =>
          a.displayOrder -
          b.displayOrder
      )
      .map((item) => ({
        _id: String(item._id),

        type: item.type,

        url: item.url,

        publicId:
          item.publicId || undefined,

        thumbnailUrl:
          item.thumbnailUrl || undefined,

        thumbnailPublicId:
          item.thumbnailPublicId ||
          undefined,

        alt:
          item.alt || undefined,

        caption:
          item.caption || undefined,

        displayOrder:
          item.displayOrder,
      }));

    return {
      /* ===================================================
         BASIC
      =================================================== */

      _id: String(gallery._id),

      title: gallery.title,

      slug: gallery.slug,

      shortDescription:
        gallery.shortDescription ||
        undefined,

      description:
        gallery.description ||
        undefined,

      /* ===================================================
         COVER IMAGE
      =================================================== */

      coverImage: gallery.coverImage
        ? {
            url: gallery.coverImage.url,

            publicId:
              gallery.coverImage.publicId ||
              undefined,

            alt:
              gallery.coverImage.alt ||
              undefined,
          }
        : undefined,

      /* ===================================================
         MEDIA
      =================================================== */

      media,

      /* ===================================================
         PROJECT
         
         Intentionally not populated on listing page.
         Project relation will be resolved on detail page.
      =================================================== */

      project: undefined,

      /* ===================================================
         CATEGORY
      =================================================== */

      category:
        gallery.category?.trim() ||
        undefined,

      /* ===================================================
         PUBLISHING
      =================================================== */

      featured:
        gallery.featured,

      displayOrder:
        gallery.displayOrder,
    };
  });
}

/* =========================================================
   PAGE
========================================================= */

export default async function GalleryPage() {
  const galleries =
    await getPublishedGalleries();

  return (
    <GalleryPageClient
      galleries={galleries}
    />
  );
}