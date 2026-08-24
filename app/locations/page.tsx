import type { Metadata } from "next";
import { connectDB } from "@/lib/db/connect";
import Location from "@/models/Location";

import LocationsHero from "@/components/locations/LocationsHero";
import LocationsPageClient from "@/components/locations/LocationsPageClient";

export const metadata: Metadata = {
  title: "Locations | Aman Digital Solutions",
  description:
    "Explore the locations where Aman Digital Solutions helps businesses build stronger digital experiences, websites and business systems.",
  alternates: {
    canonical:
      "https://www.amandigitalsolutions.in/locations",
  },
  openGraph: {
    title: "Locations | Aman Digital Solutions",
    description:
      "Explore the locations where Aman Digital Solutions helps businesses build stronger digital experiences, websites and business systems.",
    url: "https://www.amandigitalsolutions.in/locations",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Locations | Aman Digital Solutions",
    description:
      "Explore the locations where Aman Digital Solutions helps businesses build stronger digital experiences, websites and business systems.",
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
    .sort({
      displayOrder: 1,
      createdAt: -1,
    })
    .lean();

  return locations.map((location) => ({
    _id: String(location._id),

    name: location.name,
    slug: location.slug,

    shortDescription: location.shortDescription,
    description: location.description,

    image: location.image
      ? {
          url: location.image.url,
          publicId:
            location.image.publicId || undefined,
          alt: location.image.alt || undefined,
        }
      : undefined,

    address: location.address || undefined,

    city: location.city,
    state: location.state || undefined,
    country: location.country,

    postalCode:
      location.postalCode || undefined,

    latitude:
      location.latitude ?? undefined,

    longitude:
      location.longitude ?? undefined,

    phone: location.phone || undefined,

    email: location.email || undefined,

    mapUrl: location.mapUrl || undefined,

    featured: Boolean(location.featured),
    published: Boolean(location.published),

    displayOrder: location.displayOrder,
  }));
}

/* =========================================================
   PAGE
========================================================= */

export default async function LocationsPage() {
  const locations = await getLocations();

  const featuredLocations = locations.filter(
    (location) => location.featured
  );

  return (
    <>
      {/* =====================================================
          HERO
      ===================================================== */}

      <LocationsHero
        locationCount={locations.length}
      />

      {/* =====================================================
          CONTENT
      ===================================================== */}

      <LocationsPageClient
        featuredLocations={featuredLocations}
        locations={locations}
      />
    </>
  );
}