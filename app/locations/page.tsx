import type { Metadata } from "next";

import { connectDB } from "@/lib/db/connect";
import Location from "@/models/Location";

import LocationsHero from "@/components/locations/LocationsHero";
import LocationsPageClient from "@/components/locations/LocationsPageClient";
import Navbar from "@/components/agency/navbar/Navbar";
import Footer from "@/components/agency/footer/Footer";

/* =========================================================
   SITE CONFIG
========================================================= */

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ||
  "https://www.amandigitalsolutions.com";

/* =========================================================
   METADATA
========================================================= */

export const metadata: Metadata = {
  title:
    "Locations | Aman Digital Solutions",

  description:
    "Explore the locations where Aman Digital Solutions provides professional website development, digital solutions and business-focused web services.",

  alternates: {
    canonical:
      `${SITE_URL}/locations`,
  },

  openGraph: {
    title:
      "Locations | Aman Digital Solutions",

    description:
      "Explore the locations where Aman Digital Solutions helps businesses build modern websites, digital experiences and business systems.",

    url:
      `${SITE_URL}/locations`,

    type:
      "website",

    siteName:
      "Aman Digital Solutions",

    locale:
      "en_IN",
  },

  twitter: {
    card:
      "summary_large_image",

    title:
      "Locations | Aman Digital Solutions",

    description:
      "Explore locations served by Aman Digital Solutions and discover our digital services for businesses.",
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
   LOCATION DATA TYPE
========================================================= */

type LocationImage = {
  url: string;
  publicId?: string;
  alt?: string;
};

type LocationData = {
  _id: string;

  name: string;
  slug: string;

  shortDescription: string;
  description: string;

  image?: LocationImage;

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

  featured: boolean;
  published: boolean;
  displayOrder: number;
};

/* =========================================================
   FETCH LOCATIONS
========================================================= */

async function getLocations(): Promise<LocationData[]> {
  await connectDB();

  const locations = await Location.find({
    published: true,
  })
    .select(
      "_id name slug shortDescription description image address city state country postalCode latitude longitude phone email mapUrl featured published displayOrder"
    )
    .sort({
      featured: -1,
      displayOrder: 1,
      createdAt: -1,
    })
    .lean();

  return locations.map((location) => ({
    _id:
      String(location._id),

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

    featured:
      Boolean(location.featured),

    published:
      Boolean(location.published),

    displayOrder:
      location.displayOrder,
  }));
}

/* =========================================================
   WEBPAGE SCHEMA
========================================================= */

function createWebPageSchema() {
  return {
    "@context":
      "https://schema.org",

    "@type":
      "CollectionPage",

    "@id":
      `${SITE_URL}/locations#webpage`,

    url:
      `${SITE_URL}/locations`,

    name:
      "Locations | Aman Digital Solutions",

    description:
      "Locations served by Aman Digital Solutions.",

    isPartOf: {
      "@id":
        `${SITE_URL}/#website`,
    },

    breadcrumb: {
      "@id":
        `${SITE_URL}/locations#breadcrumb`,
    },
  };
}

/* =========================================================
   BREADCRUMB SCHEMA
========================================================= */

function createBreadcrumbSchema() {
  return {
    "@context":
      "https://schema.org",

    "@type":
      "BreadcrumbList",

    "@id":
      `${SITE_URL}/locations#breadcrumb`,

    itemListElement: [
      {
        "@type":
          "ListItem",

        position:
          1,

        name:
          "Home",

        item:
          SITE_URL,
      },

      {
        "@type":
          "ListItem",

        position:
          2,

        name:
          "Locations",

        item:
          `${SITE_URL}/locations`,
      },
    ],
  };
}

/* =========================================================
   PAGE
========================================================= */

export default async function LocationsPage() {
  const locations =
    await getLocations();

  const featuredLocations =
    locations.filter(
      (location) =>
        location.featured
    );

  const webPageSchema =
    createWebPageSchema();

  const breadcrumbSchema =
    createBreadcrumbSchema();

  return (
    <>
    <Navbar/>
      {/* =================================================
          STRUCTURED DATA
      ================================================= */}

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html:
            JSON.stringify(
              webPageSchema
            ),
        }}
      />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html:
            JSON.stringify(
              breadcrumbSchema
            ),
        }}
      />

      {/* =================================================
          BREADCRUMB
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

          <li aria-current="page">
            Locations
          </li>
        </ol>
      </nav>

      {/* =================================================
          HERO
      ================================================= */}

      <LocationsHero
        locationCount={
          locations.length
        }
      />

      {/* =================================================
          CONTENT
      ================================================= */}

      <main>
        <LocationsPageClient
          featuredLocations={
            featuredLocations
          }
          locations={
            locations
          }
        />
      </main>
      <Footer/>
    </>
  );
}