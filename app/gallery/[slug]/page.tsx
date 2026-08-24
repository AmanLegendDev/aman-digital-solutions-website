import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { connectDB } from "@/lib/db/connect";
import Gallery from "@/models/Gallery";
import Project from "@/models/Project";

import GalleryDetailPage, {
  type GalleryDetailData,
} from "@/components/gallery/detail/GalleryDetailPage";

/* =========================================================
   PARAMS
========================================================= */

type GalleryPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

/* =========================================================
   POPULATED PROJECT TYPE
========================================================= */

type PopulatedGalleryProject = {
  _id: unknown;
  title: string;
  slug: string;
};

/* =========================================================
   POPULATED GALLERY TYPE
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

  const gallery =
    await Gallery.findOne({
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

  const gallery =
    await getGalleryBySlug(slug);

  if (!gallery) {
    return {
      title:
        "Gallery Not Found | Aman Digital Solutions",

      description:
        "The requested gallery collection could not be found.",
    };
  }

  /* =======================================================
     TITLE
  ======================================================= */

  const title =
    gallery.seoTitle ||
    `${gallery.title} | Gallery | Aman Digital Solutions`;

  /* =======================================================
     DESCRIPTION
  ======================================================= */

  const description =
    gallery.seoDescription ||
    gallery.shortDescription ||
    gallery.description ||
    `Explore the ${gallery.title} gallery by Aman Digital Solutions.`;

  /* =======================================================
     CANONICAL
  ======================================================= */

  const canonical =
    gallery.canonicalUrl ||
    `https://www.amandigitalsolutions.in/gallery/${gallery.slug}`;

  /* =======================================================
     OPEN GRAPH
  ======================================================= */

  const ogTitle =
    gallery.ogTitle ||
    gallery.seoTitle ||
    gallery.title;

  const ogDescription =
    gallery.ogDescription ||
    gallery.seoDescription ||
    gallery.shortDescription ||
    gallery.description ||
    description;

  const ogImage =
    gallery.ogImage?.url ||
    gallery.coverImage?.url ||
    gallery.media?.[0]?.thumbnailUrl ||
    gallery.media?.[0]?.url;

  /* =======================================================
     RETURN
  ======================================================= */

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

      type: "article",

      ...(ogImage
        ? {
            images: [
              {
                url: ogImage,

                alt:
                  gallery.ogImage?.alt ||
                  gallery.coverImage?.alt ||
                  gallery.media?.[0]?.alt ||
                  gallery.title,
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
  ======================================================= */

  if (!gallery) {
    notFound();
  }

  /* =======================================================
     SORT + SERIALIZE MEDIA
  ======================================================= */

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
        undefined,

      caption:
        item.caption ||
        undefined,

      displayOrder:
        item.displayOrder,
    }));

  /* =======================================================
     RELATED PROJECT
  ======================================================= */

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
     SERIALIZE GALLERY
  ======================================================= */

  const galleryData: GalleryDetailData = {
    _id: String(gallery._id),

    title: gallery.title,

    slug: gallery.slug,

    shortDescription:
      gallery.shortDescription ||
      undefined,

    description:
      gallery.description ||
      undefined,

    /* =====================================================
       COVER IMAGE
    ===================================================== */

    coverImage: gallery.coverImage
      ? {
          url:
            gallery.coverImage.url,

          publicId:
            gallery.coverImage
              .publicId ||
            undefined,

          alt:
            gallery.coverImage.alt ||
            undefined,
        }
      : undefined,

    /* =====================================================
       MEDIA
    ===================================================== */

    media,

    /* =====================================================
       PROJECT
    ===================================================== */

    project,

    /* =====================================================
       CATEGORY
    ===================================================== */

    category:
      gallery.category?.trim() ||
      undefined,

    /* =====================================================
       FLAGS
    ===================================================== */

    featured:
      gallery.featured,

    displayOrder:
      gallery.displayOrder,
  };

  /* =======================================================
     RENDER
  ======================================================= */

  return (
    <>
      {/* =================================================
          SEMANTIC BREADCRUMB
      ================================================= */}

      <nav
        aria-label="Breadcrumb"
        className="sr-only"
      >
        <ol>
          <li>
            <a href="/">
              Home
            </a>
          </li>

          <li>
            <a href="/gallery">
              Gallery
            </a>
          </li>

          <li aria-current="page">
            {gallery.title}
          </li>
        </ol>
      </nav>

      {/* =================================================
          DETAIL PAGE
      ================================================= */}

      <GalleryDetailPage
        gallery={galleryData}
      />
    </>
  );
}