import type { Metadata } from "next";

export const dynamic = "force-dynamic";

import { connectDB } from "@/lib/db/connect";
import Location from "@/models/Location";

import LocationsHero from "@/components/locations/LocationsHero";
import LocationsPageClient from "@/components/locations/LocationsPageClient";

import Navbar from "@/components/agency/navbar/Navbar";
import Footer from "@/components/agency/footer/Footer";

import {
  getCollectionPageSchema,
  getItemListSchema,
} from "@/lib/seo/schema";

import BreadcrumbSchema from "@/components/seo/BreadcrumbSchema";

/* =========================================================
   SITE CONFIG
========================================================= */

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ||
  "https://www.amandigitalsolutions.com";

const LOCATIONS_URL =
  `${SITE_URL}/locations`;

/* =========================================================
   METADATA
========================================================= */

export const metadata: Metadata = {
  title:
    "Locations | Aman Digital Solutions",

  description:
    "Explore the locations where Aman Digital Solutions provides web development, digital solutions and business-focused websites, serving businesses in Shimla, Himachal Pradesh, across India and beyond.",

  alternates: {
    canonical:
      LOCATIONS_URL,
  },

  openGraph: {
    title:
      "Locations | Aman Digital Solutions",

    description:
      "Explore the locations served by Aman Digital Solutions for web development, digital solutions and business-focused websites.",

    url:
      LOCATIONS_URL,

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
      "Explore the locations served by Aman Digital Solutions for web development and digital solutions.",
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

  /* =======================================================
     LOCATION ITEM LIST
  ======================================================== */

  const locationItems =
    locations.map((location) => ({
      name:
        location.name,

      url:
        `${LOCATIONS_URL}/${location.slug}`,

      ...(location.image?.url
        ? {
            image:
              location.image.url,
          }
        : {}),

      description:
        location.shortDescription,
    }));

  const locationsItemList =
    getItemListSchema({
      id:
        `${LOCATIONS_URL}#itemlist`,

      name:
        "Aman Digital Solutions Locations",

      url:
        LOCATIONS_URL,

      items:
        locationItems,
    });

  /* =======================================================
     COLLECTION PAGE SCHEMA
  ======================================================== */

  const locationsCollection =
    getCollectionPageSchema({
      url:
        LOCATIONS_URL,

      name:
        "Locations | Aman Digital Solutions",

      description:
        "Explore the locations where Aman Digital Solutions provides web development, digital solutions and business-focused websites, serving businesses in Shimla, Himachal Pradesh, across India and beyond.",

      itemListId:
        `${LOCATIONS_URL}#itemlist`,
    });

  /* =======================================================
     STRUCTURED DATA
  ======================================================== */

  const structuredData = {
    "@context":
      "https://schema.org",

    "@graph": [
      locationsCollection,
      locationsItemList,
    ],
  };

  /* =======================================================
     RENDER
  ======================================================== */

  return (
    <>
      <Navbar />

      {/* ===================================================
          STRUCTURED DATA
      =================================================== */}

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html:
            JSON.stringify(
              structuredData
            ),
        }}
      />

      {/* ===================================================
          BREADCRUMB SCHEMA
      =================================================== */}

      <BreadcrumbSchema
        items={[
          {
            name:
              "Home",

            url:
              "/",
          },

          {
            name:
              "Locations",

            url:
              "/locations",
          },
        ]}
      />

      {/* ===================================================
          PAGE CONTENT
      =================================================== */}

      <main>
        <LocationsHero
          locationCount={
            locations.length
          }
        />

        <LocationsPageClient
          featuredLocations={
            featuredLocations
          }

          locations={
            locations
          }
        />
      </main>

      <Footer />
    </>
  );
}