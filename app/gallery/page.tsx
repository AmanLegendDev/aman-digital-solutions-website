import type { Metadata } from "next";

import { connectDB } from "@/lib/db/connect";
import Gallery from "@/models/Gallery";

import Navbar from "@/components/agency/navbar/Navbar";
import Footer from "@/components/agency/footer/Footer";

import GalleryPageClient, {
  type GalleryCardData,
} from "@/components/gallery/GalleryPageClient";

import {
  getCollectionPageSchema,
  getItemListSchema,
} from "@/lib/seo/schema";

/* =========================================================
   CONFIG
========================================================= */

export const dynamic = "force-dynamic";

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ||
  "https://www.amandigitalsolutions.com";

const GALLERY_URL = `${SITE_URL}/gallery`;

/* =========================================================
   METADATA
========================================================= */

export const metadata: Metadata = {
  title:
    "Website Design & Digital Work Gallery | Aman Digital Solutions",

  description:
    "Explore website designs, digital experiences and creative work built by Aman Digital Solutions for businesses in Shimla, Himachal Pradesh, India and beyond.",

  alternates: {
    canonical: GALLERY_URL,
  },

  openGraph: {
    title:
      "Website Design & Digital Work Gallery | Aman Digital Solutions",

    description:
      "Explore website designs, digital experiences and creative work built by Aman Digital Solutions for businesses in Shimla, Himachal Pradesh, India and beyond.",

    url: GALLERY_URL,

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
      "Website Design & Digital Work Gallery | Aman Digital Solutions",

    description:
      "Explore website designs, digital experiences and creative work built by Aman Digital Solutions for businesses in Shimla, Himachal Pradesh, India and beyond.",
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

  return galleries.map((gallery) => {
    const media = [
      ...(gallery.media || []),
    ]
      .sort(
        (a, b) =>
          a.displayOrder -
          b.displayOrder
      )
      .map((item) => ({
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
      }));

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
  });
}

/* =========================================================
   PAGE
========================================================= */

export default async function GalleryPage() {
  const galleries =
    await getPublishedGalleries();

  /* =======================================================
     ITEM LIST SCHEMA
  ======================================================== */

  const galleryItems =
    galleries.map((gallery) => ({
      name:
        gallery.title,

      url:
        `${GALLERY_URL}/${gallery.slug}`,

      ...(gallery.coverImage?.url
        ? {
            image:
              gallery.coverImage.url,
          }
        : {}),

      description:
        gallery.shortDescription ||
        gallery.description,
    }));

  const galleryItemList =
    getItemListSchema({
      id:
        `${GALLERY_URL}#itemlist`,

      name:
        "Aman Digital Solutions Gallery",

      url:
        GALLERY_URL,

      items:
        galleryItems,
    });

  /* =======================================================
     COLLECTION PAGE SCHEMA
  ======================================================== */

  const galleryCollection =
    getCollectionPageSchema({
      url:
        GALLERY_URL,

      name:
        "Website Design & Digital Work Gallery | Aman Digital Solutions",

      description:
        "Explore website designs, digital experiences and creative work built by Aman Digital Solutions for businesses in Shimla, Himachal Pradesh, India and beyond.",

      itemListId:
        `${GALLERY_URL}#itemlist`,
    });

  /* =======================================================
     RENDER
  ======================================================== */

  return (
    <>
      <Navbar />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html:
            JSON.stringify({
              "@context":
                "https://schema.org",

              "@graph": [
                galleryCollection,
                galleryItemList,
              ],
            }),
        }}
      />

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