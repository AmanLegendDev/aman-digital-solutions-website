import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Types } from "mongoose";

import { connectDB } from "@/lib/db/connect";
import Location from "@/models/Location";
import "@/models/Service";

import LocationDetailPage, {
  type LocationDetailData,
} from "@/components/locations/detail/LocationDetailPage";

import Navbar from "@/components/agency/navbar/Navbar";
import Footer from "@/components/agency/footer/Footer";

import BreadcrumbSchema from "@/components/seo/BreadcrumbSchema";

/* =========================================================
   SITE CONFIG
========================================================= */

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ||
  "https://www.amandigitalsolutions.com";

/* =========================================================
   PARAMS
========================================================= */

type LocationPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

/* =========================================================
   POPULATED SERVICE TYPE
========================================================= */

type PopulatedLocationService = {
  _id: Types.ObjectId;

  title: string;
  slug: string;

  shortDescription?: string;
  category?: string;
};

/* =========================================================
   LOCATION TYPE
========================================================= */

type PopulatedLocation = {
  name: string;
  slug: string;

  shortDescription: string;
  description: string;

  image?: {
    url: string;
    publicId?: string;
    alt?: string;
  };

  address?: string;

  city: string;
  state?: string;
  country: string;
  postalCode?: string;

  latitude?: number;
  longitude?: number;

  phone?: string;
  email?: string;
  mapUrl?: string;

  services?: PopulatedLocationService[];

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
   FETCH LOCATION
========================================================= */

async function getLocationBySlug(
  slug: string
): Promise<PopulatedLocation | null> {
  await connectDB();

  const location = await Location.findOne({
    slug: slug.toLowerCase(),
    published: true,
  })
    .populate({
      path: "services",
      select:
        "_id title slug shortDescription category",
    })
    .lean();

  if (!location) {
    return null;
  }

  return location as unknown as PopulatedLocation;
}

/* =========================================================
   METADATA
========================================================= */

export async function generateMetadata({
  params,
}: LocationPageProps): Promise<Metadata> {
  const { slug } = await params;

  const location =
    await getLocationBySlug(slug);

  /* -------------------------------------------------------
     NOT FOUND
  ------------------------------------------------------- */

  if (!location) {
    return {
      title:
        "Location Not Found | Aman Digital Solutions",

      description:
        "The requested location could not be found.",

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
    location.seoTitle?.trim() ||
    location.name;

  /* -------------------------------------------------------
     DESCRIPTION
  ------------------------------------------------------- */

  const description =
    location.seoDescription?.trim() ||
    location.shortDescription;

  /* -------------------------------------------------------
     CANONICAL
  ------------------------------------------------------- */

  const canonical =
    location.canonicalUrl?.trim() ||
    `${SITE_URL}/locations/${location.slug}`;

  /* -------------------------------------------------------
     OG
  ------------------------------------------------------- */

  const ogTitle =
    location.ogTitle?.trim() ||
    location.seoTitle?.trim() ||
    location.name;

  const ogDescription =
    location.ogDescription?.trim() ||
    location.seoDescription?.trim() ||
    location.shortDescription;

  const ogImage =
    location.ogImage?.url ||
    location.image?.url;

  const ogImageAlt =
    location.ogImage?.alt ||
    location.image?.alt ||
    location.name;

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
      card:
        "summary_large_image",

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

export const dynamic = "force-dynamic";

export default async function LocationPage({
  params,
}: LocationPageProps) {
  const { slug } = await params;

  const location =
    await getLocationBySlug(slug);

  /* =======================================================
     NOT FOUND
  ======================================================== */

  if (!location) {
    notFound();
  }

  /* =======================================================
     URL
  ======================================================== */

  const locationUrl =
    `${SITE_URL}/locations/${location.slug}`;

  /* =======================================================
     SEO VALUES
  ======================================================== */

  const seoTitle =
    location.seoTitle?.trim() ||
    location.name;

  const seoDescription =
    location.seoDescription?.trim() ||
    location.shortDescription;

  const primaryImage =
    location.ogImage?.url ||
    location.image?.url;

  const primaryImageAlt =
    location.ogImage?.alt ||
    location.image?.alt ||
    location.name;

  /* =======================================================
     LOCATION STRUCTURED DATA
  ======================================================== */

  const locationSchema = {
    "@type": "Place",

    "@id":
      `${locationUrl}#place`,

    name:
      location.name,

    description:
      location.description ||
      location.shortDescription,

    url:
      locationUrl,

    ...(location.address ||
    location.city ||
    location.state ||
    location.country
      ? {
          address: {
            "@type":
              "PostalAddress",

            ...(location.address
              ? {
                  streetAddress:
                    location.address,
                }
              : {}),

            ...(location.city
              ? {
                  addressLocality:
                    location.city,
                }
              : {}),

            ...(location.state
              ? {
                  addressRegion:
                    location.state,
                }
              : {}),

            ...(location.postalCode
              ? {
                  postalCode:
                    location.postalCode,
                }
              : {}),

            ...(location.country
              ? {
                  addressCountry:
                    location.country,
                }
              : {}),
          },
        }
      : {}),

    ...(typeof location.latitude ===
        "number" &&
    typeof location.longitude ===
        "number"
      ? {
          geo: {
            "@type":
              "GeoCoordinates",

            latitude:
              location.latitude,

            longitude:
              location.longitude,
          },
        }
      : {}),

    ...(location.phone
      ? {
          telephone:
            location.phone,
        }
      : {}),

    ...(location.email
      ? {
          email:
            location.email,
        }
      : {}),

    ...(primaryImage
      ? {
          image: {
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
     WEBPAGE SCHEMA
  ======================================================== */

  const webPageSchema = {
    "@type": "WebPage",

    "@id":
      `${locationUrl}#webpage`,

    url:
      locationUrl,

    name:
      seoTitle,

    description:
      seoDescription,

    isPartOf: {
      "@id":
        `${SITE_URL}/#website`,
    },

    mainEntity: {
      "@id":
        `${locationUrl}#place`,
    },

    breadcrumb: {
      "@id":
        `${locationUrl}#breadcrumb`,
    },
  };

  /* =======================================================
     BREADCRUMB SCHEMA
  ======================================================== */

  const breadcrumbSchema = {
    "@type":
      "BreadcrumbList",

    "@id":
      `${locationUrl}#breadcrumb`,

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
          "Locations",

        item:
          `${SITE_URL}/locations`,
      },

      {
        "@type":
          "ListItem",

        position: 3,

        name:
          location.name,

        item:
          locationUrl,
      },
    ],
  };

  /* =======================================================
     COMBINED STRUCTURED DATA
  ======================================================== */

  const structuredData = {
    "@context":
      "https://schema.org",

    "@graph": [
      locationSchema,
      webPageSchema,
      breadcrumbSchema,
    ],
  };

  /* =======================================================
     SERIALIZE DATA
  ======================================================== */

  const locationData:
    LocationDetailData = {
    name:
      location.name,

    slug:
      location.slug,

    shortDescription:
      location.shortDescription,

    description:
      location.description,

    image:
      location.image
        ? {
            url:
              location.image.url,

            publicId:
              location.image.publicId ||
              undefined,

            alt:
              location.image.alt ||
              location.name,
          }
        : undefined,

    address:
      location.address ||
      undefined,

    city:
      location.city,

    state:
      location.state ||
      undefined,

    country:
      location.country,

    postalCode:
      location.postalCode ||
      undefined,

    latitude:
      location.latitude ??
      undefined,

    longitude:
      location.longitude ??
      undefined,

    phone:
      location.phone ||
      undefined,

    email:
      location.email ||
      undefined,

    mapUrl:
      location.mapUrl ||
      undefined,

    services:
      (
        location.services ||
        []
      ).map((service) => ({
        _id:
          String(service._id),

        title:
          service.title,

        slug:
          service.slug,

        shortDescription:
          service.shortDescription ||
          undefined,

        category:
          service.category ||
          undefined,
      })),
  };

  /* =======================================================
     RENDER
  ======================================================== */

  return (
    <>
      <Navbar />

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
          BREADCRUMB SCHEMA
      ================================================= */}

      <BreadcrumbSchema
        items={[
          {
            name: "Home",
            url: "/",
          },
          {
            name: "Locations",
            url: "/locations",
          },
          {
            name: location.name,
            url:
              `/locations/${location.slug}`,
          },
        ]}
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
            <Link href="/locations">
              Locations
            </Link>
          </li>

          <li aria-current="page">
            {location.name}
          </li>
        </ol>
      </nav>

      {/* =================================================
          LOCATION DETAIL
      ================================================= */}

      <main>
        <LocationDetailPage
          location={locationData}
        />
      </main>

      <Footer />
    </>
  );
}