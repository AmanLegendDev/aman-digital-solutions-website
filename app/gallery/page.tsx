import type { Metadata } from "next";

import { connectDB } from "@/lib/db/connect";
import Gallery from "@/models/Gallery";

import Navbar from "@/components/agency/navbar/Navbar";
import Footer from "@/components/agency/footer/Footer";

import GalleryPageClient, {
  type GalleryCardData,
} from "@/components/gallery/GalleryPageClient";

/* =========================================================
   METADATA
========================================================= */

export const metadata: Metadata = {
  title:
    "Gallery | Websites, Digital Experiences & Creative Work | Aman Digital Solutions",

  description:
    "Explore website designs, digital experiences, project visuals and creative work built by Aman Digital Solutions for businesses and brands.",

  alternates: {
    canonical: "/gallery",
  },

  openGraph: {
    title:
      "Gallery | Aman Digital Solutions",

    description:
      "Explore website designs, digital experiences and creative work built by Aman Digital Solutions.",

    url: "/gallery",

    type: "website",

    siteName:
      "Aman Digital Solutions",

    locale:
      "en_IN",
  },

  twitter: {
    card:
      "summary_large_image",

    title:
      "Gallery | Aman Digital Solutions",

    description:
      "Explore website designs, project visuals and digital experiences built by Aman Digital Solutions.",
  },

  robots: {
    index: true,
    follow: true,

    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
};

/* =========================================================
   FETCH PUBLISHED GALLERIES
========================================================= */

async function getPublishedGalleries(): Promise<
  GalleryCardData[]
> {
  await connectDB();

  const galleries =
    await Gallery.find({
      published: true,
    })
      .sort({
        featured: -1,
        displayOrder: 1,
        createdAt: -1,
      })
      .lean();

  return galleries.map(
    (gallery) => {
      const media = [
        ...(gallery.media || []),
      ]
        .sort(
          (a, b) =>
            a.displayOrder -
            b.displayOrder
        )
        .map(
          (item) => ({
            _id:
              String(item._id),

            type:
              item.type,

            url:
              item.url,

            publicId:
              item.publicId ||
              undefined,

            thumbnailUrl:
              item.thumbnailUrl ||
              undefined,

            thumbnailPublicId:
              item.thumbnailPublicId ||
              undefined,

            alt:
              item.alt ||
              gallery.title,

            caption:
              item.caption ||
              undefined,

            displayOrder:
              item.displayOrder,
          })
        );

      return {
        _id:
          String(gallery._id),

        title:
          gallery.title,

        slug:
          gallery.slug,

        shortDescription:
          gallery.shortDescription ||
          undefined,

        description:
          gallery.description ||
          undefined,

        coverImage:
          gallery.coverImage
            ? {
                url:
                  gallery.coverImage.url,

                publicId:
                  gallery.coverImage
                    .publicId ||
                  undefined,

                alt:
                  gallery.coverImage.alt ||
                  gallery.title,
              }
            : undefined,

        media,

        project:
          undefined,

        category:
          gallery.category?.trim() ||
          undefined,

        featured:
          gallery.featured,

        displayOrder:
          gallery.displayOrder,
      };
    }
  );
}

/* =========================================================
   PAGE
========================================================= */

export default async function GalleryPage() {
  const galleries =
    await getPublishedGalleries();

  return (
    <>
      <Navbar />

      <main>
        <GalleryPageClient
          galleries={
            galleries
          }
        />
      </main>

      <Footer />
    </>
  );
}