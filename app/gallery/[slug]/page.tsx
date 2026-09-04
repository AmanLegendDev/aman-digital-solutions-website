import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { connectDB } from "@/lib/db/connect";
import Gallery from "@/models/Gallery";

import Navbar from "@/components/agency/navbar/Navbar";
import Footer from "@/components/agency/footer/Footer";

import GalleryDetailPage, {
  type GalleryDetailData,
} from "@/components/gallery/detail/GalleryDetailPage";

import BreadcrumbSchema from "@/components/seo/BreadcrumbSchema";

/* =========================================================
   SITE
========================================================= */

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ||
  "https://www.amandigitalsolutions.com";

export const dynamic = "force-dynamic";

/* =========================================================
   PARAMS
========================================================= */

type GalleryPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

/* =========================================================
   PROJECT TYPE
========================================================= */

type PopulatedGalleryProject = {
  _id: unknown;
  title: string;
  slug: string;
};

/* =========================================================
   GALLERY TYPE
========================================================= */

type PopulatedGallery = {
  _id: unknown;

  title: string;
  slug: string;

  shortDescription?: string;
  description?: string;

  coverImage?: {
    url: string;
    publicId?: string;
    alt?: string;
  };

  media?: {
    _id: unknown;

    type: "image" | "video";

    url: string;
    publicId?: string;

    thumbnailUrl?: string;
    thumbnailPublicId?: string;

    alt?: string;
    caption?: string;

    displayOrder: number;
  }[];

  project?: PopulatedGalleryProject | null;

  category?: string;

  featured: boolean;
  published: boolean;
  displayOrder: number;

  seoTitle?: string;
  seoDescription?: string;
  canonicalUrl?: string;

  ogTitle?: string;
  ogDescription?: string;

  ogImage?: {
    url: string;
    publicId?: string;
    alt?: string;
  };
};

/* =========================================================
   FETCH GALLERY
========================================================= */

async function getGalleryBySlug(
  slug: string
): Promise<PopulatedGallery | null> {
  await connectDB();

  const gallery = await Gallery.findOne({
    slug: slug.toLowerCase(),
    published: true,
  }).lean();

  if (!gallery) {
    return null;
  }

  return gallery as unknown as PopulatedGallery;
}

/* =========================================================
   METADATA
========================================================= */

export async function generateMetadata({
  params,
}: GalleryPageProps): Promise<Metadata> {
  const { slug } = await params;

  const gallery = await getGalleryBySlug(slug);

  /* -------------------------------------------------------
     NOT FOUND
  ------------------------------------------------------- */

  if (!gallery) {
    return {
      title: "Gallery Not Found | Aman Digital Solutions",

      description:
        "The requested gallery collection could not be found.",

      robots: {
        index: false,
        follow: false,
      },
    };
  }

  /* -------------------------------------------------------
     TITLE
  ------------------------------------------------------- */

  const title =
    gallery.seoTitle ||
    `${gallery.title} | Gallery | Aman Digital Solutions`;

  /* -------------------------------------------------------
     DESCRIPTION
  ------------------------------------------------------- */

  const description =
    gallery.seoDescription ||
    gallery.shortDescription ||
    gallery.description ||
    `Explore the ${gallery.title} gallery by Aman Digital Solutions.`;

  /* -------------------------------------------------------
     CANONICAL
  ------------------------------------------------------- */

  const canonical =
    gallery.canonicalUrl &&
    !gallery.canonicalUrl.includes("localhost")
      ? gallery.canonicalUrl
      : `${SITE_URL}/gallery/${gallery.slug}`;

  /* -------------------------------------------------------
     OG
  ------------------------------------------------------- */

  const ogTitle =
    gallery.ogTitle || title;

  const ogDescription =
    gallery.ogDescription || description;

  const ogImage =
    gallery.ogImage?.url ||
    gallery.coverImage?.url ||
    gallery.media?.find(
      (media) =>
        media.type === "image"
    )?.url ||
    gallery.media?.[0]?.thumbnailUrl ||
    gallery.media?.[0]?.url;

  const ogImageAlt =
    gallery.ogImage?.alt ||
    gallery.coverImage?.alt ||
    gallery.media?.find(
      (media) =>
        media.type === "image"
    )?.alt ||
    gallery.title;

  /* -------------------------------------------------------
     RETURN
  ------------------------------------------------------- */

  return {
    title,
    description,

    alternates: {
      canonical,
    },

    openGraph: {
      title: ogTitle,
      description: ogDescription,

      url: canonical,

      type: "website",

      siteName:
        "Aman Digital Solutions",

      locale: "en_IN",

      ...(ogImage
        ? {
            images: [
              {
                url: ogImage,
                alt: ogImageAlt,
              },
            ],
          }
        : {}),
    },

    twitter: {
      card: "summary_large_image",

      title: ogTitle,
      description: ogDescription,

      ...(ogImage
        ? {
            images: [ogImage],
          }
        : {}),
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
}

/* =========================================================
   PAGE
========================================================= */

export default async function GallerySlugPage({
  params,
}: GalleryPageProps) {
  const { slug } = await params;

  const gallery =
    await getGalleryBySlug(slug);

  /* =======================================================
     NOT FOUND
  ======================================================== */

  if (!gallery) {
    notFound();
  }

  /* =======================================================
     URL
  ======================================================== */

  const galleryUrl =
    `${SITE_URL}/gallery/${gallery.slug}`;

  /* =======================================================
     SEO VALUES
  ======================================================== */

  const seoTitle =
    gallery.seoTitle ||
    `${gallery.title} | Gallery | Aman Digital Solutions`;

  const seoDescription =
    gallery.seoDescription ||
    gallery.shortDescription ||
    gallery.description ||
    `Explore the ${gallery.title} gallery by Aman Digital Solutions.`;

  /* =======================================================
     PRIMARY IMAGE
  ======================================================== */

  const primaryImage =
    gallery.ogImage?.url ||
    gallery.coverImage?.url ||
    gallery.media?.find(
      (media) =>
        media.type === "image"
    )?.url ||
    gallery.media?.[0]?.thumbnailUrl ||
    gallery.media?.[0]?.url;

  const primaryImageAlt =
    gallery.ogImage?.alt ||
    gallery.coverImage?.alt ||
    gallery.media?.find(
      (media) =>
        media.type === "image"
    )?.alt ||
    gallery.title;

  /* =======================================================
     MEDIA
  ======================================================== */

  const media = [
    ...(gallery.media || []),
  ]
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

  /* =======================================================
     RELATED PROJECT
  ======================================================== */

  const project =
    gallery.project
      ? {
          _id: String(
            gallery.project._id
          ),

          title:
            gallery.project.title,

          slug:
            gallery.project.slug,
        }
      : undefined;

  /* =======================================================
     GALLERY DATA
  ======================================================== */

  const galleryData:
    GalleryDetailData = {
    _id: String(
      gallery._id
    ),

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

    project,

    category:
      gallery.category?.trim() ||
      undefined,

    featured:
      gallery.featured,

    displayOrder:
      gallery.displayOrder,
  };

  /* =======================================================
     IMAGE GALLERY SCHEMA
  ======================================================== */

  const imageGallerySchema = {
    "@type": "ImageGallery",

    "@id":
      `${galleryUrl}#gallery`,

    name:
      gallery.title,

    description:
      seoDescription,

    url:
      galleryUrl,

    creator: {
      "@id":
        `${SITE_URL}/#organization`,
    },

    publisher: {
      "@id":
        `${SITE_URL}/#organization`,
    },

    ...(primaryImage
      ? {
          image:
            primaryImage,
        }
      : {}),

    associatedMedia: media
      .filter(
        (item) =>
          item.type === "image"
      )
      .map((item) => ({
        "@type": "ImageObject",

        contentUrl:
          item.url,

        url:
          item.url,

        name:
          item.caption ||
          item.alt ||
          gallery.title,

        ...(item.alt
          ? {
              caption:
                item.alt,
            }
          : {}),

        ...(item.caption
          ? {
              description:
                item.caption,
            }
          : {}),
      })),
  };

  /* =======================================================
     WEBPAGE SCHEMA
  ======================================================== */

  const webPageSchema = {
    "@type": "WebPage",

    "@id":
      `${galleryUrl}#webpage`,

    url:
      galleryUrl,

    name:
      seoTitle,

    description:
      seoDescription,

    isPartOf: {
      "@id":
        `${SITE_URL}/#website`,
    },

    about: {
      "@id":
        `${galleryUrl}#gallery`,
    },

    breadcrumb: {
      "@id":
        `${galleryUrl}#breadcrumb`,
    },

    ...(primaryImage
      ? {
          primaryImageOfPage: {
            "@type":
              "ImageObject",

            url:
              primaryImage,

            caption:
              primaryImageAlt,
          },
        }
      : {}),
  };

  /* =======================================================
     BREADCRUMB SCHEMA
  ======================================================== */

  const breadcrumbSchema = {
    "@type":
      "BreadcrumbList",

    "@id":
      `${galleryUrl}#breadcrumb`,

    itemListElement: [
      {
        "@type":
          "ListItem",

        position: 1,

        name:
          "Home",

        item:
          SITE_URL,
      },

      {
        "@type":
          "ListItem",

        position: 2,

        name:
          "Gallery",

        item:
          `${SITE_URL}/gallery`,
      },

      {
        "@type":
          "ListItem",

        position: 3,

        name:
          gallery.title,

        item:
          galleryUrl,
      },
    ],
  };

  /* =======================================================
     STRUCTURED DATA GRAPH
  ======================================================== */

  const structuredData = {
    "@context":
      "https://schema.org",

    "@graph": [
      imageGallerySchema,
      webPageSchema,
      breadcrumbSchema,
    ],
  };

  /* =======================================================
     RENDER
  ======================================================== */

  return (
    <>
      <Navbar />

      <BreadcrumbSchema
        items={[
          {
            name: "Home",
            url: "/",
          },
          {
            name: "Gallery",
            url: "/gallery",
          },
          {
            name: gallery.title,
            url:
              `/gallery/${gallery.slug}`,
          },
        ]}
      />

      {/* =================================================
          STRUCTURED DATA
      ================================================= */}

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html:
            JSON.stringify(
              structuredData
            ),
        }}
      />

      {/* =================================================
          SEMANTIC BREADCRUMB
      ================================================= */}

      <nav
        aria-label="Breadcrumb"
        className="sr-only"
      >
        <ol>
          <li>
            <Link href="/">
              Home
            </Link>
          </li>

          <li>
            <Link href="/gallery">
              Gallery
            </Link>
          </li>

          <li aria-current="page">
            {gallery.title}
          </li>
        </ol>
      </nav>

      {/* =================================================
          DETAIL PAGE
      ================================================= */}

      <main>
        <GalleryDetailPage
          gallery={
            galleryData
          }
        />
      </main>

      <Footer />
    </>
  );
}