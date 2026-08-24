import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Types } from "mongoose";

import { connectDB } from "@/lib/db/connect";
import Location from "@/models/Location";
import "@/models/Service";

import LocationDetailPage, {
  type LocationDetailData,
} from "@/components/locations/detail/LocationDetailPage";

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
    select: "_id title slug shortDescription category",
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

  const location = await getLocationBySlug(slug);

  if (!location) {
    return {
      title:
        "Location Not Found | Aman Digital Solutions",
      description:
        "The requested location could not be found.",
    };
  }

  const title =
    location.seoTitle ||
    `${location.name} | Aman Digital Solutions`;

  const description =
    location.seoDescription ||
    location.shortDescription;

  const canonical =
    location.canonicalUrl ||
    `https://www.amandigitalsolutions.in/locations/${location.slug}`;

  const ogTitle =
    location.ogTitle ||
    location.seoTitle ||
    location.name;

  const ogDescription =
    location.ogDescription ||
    location.seoDescription ||
    location.shortDescription;

  const ogImage =
    location.ogImage?.url ||
    location.image?.url;

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

      ...(ogImage
        ? {
            images: [
              {
                url: ogImage,
                alt:
                  location.ogImage?.alt ||
                  location.image?.alt ||
                  location.name,
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

export default async function LocationPage({
  params,
}: LocationPageProps) {
  const { slug } = await params;

  const location = await getLocationBySlug(slug);

  if (!location) {
    notFound();
  }

  /* =======================================================
     SERIALIZE DATA
  ======================================================= */

  const locationData: LocationDetailData = {
    name: location.name,
    slug: location.slug,

    shortDescription:
      location.shortDescription,

    description:
      location.description,

    /* =====================================================
       IMAGE
    ===================================================== */

    image: location.image
      ? {
          url: location.image.url,
          publicId:
            location.image.publicId ||
            undefined,
          alt:
            location.image.alt ||
            undefined,
        }
      : undefined,

    /* =====================================================
       ADDRESS
    ===================================================== */

    address:
      location.address || undefined,

    city: location.city,

    state:
      location.state || undefined,

    country: location.country,

    postalCode:
      location.postalCode || undefined,

    /* =====================================================
       COORDINATES
    ===================================================== */

    latitude:
      location.latitude !== undefined
        ? location.latitude
        : undefined,

    longitude:
      location.longitude !== undefined
        ? location.longitude
        : undefined,

    /* =====================================================
       CONTACT
    ===================================================== */

    phone:
      location.phone || undefined,

    email:
      location.email || undefined,

    mapUrl:
      location.mapUrl || undefined,

    /* =====================================================
       RELATED SERVICES
    ===================================================== */

    services: (
      location.services || []
    ).map((service) => ({
      _id: String(service._id),

      title: service.title,

      slug: service.slug,

      shortDescription:
        service.shortDescription ||
        undefined,

      category:
        service.category ||
        undefined,
    })),
  };

  return (
    <>
      {/* =================================================
          BREADCRUMB
      ================================================= */}

      <nav
        aria-label="Breadcrumb"
        className="sr-only"
      >
        <ol>
          <li>
            <a href="/">Home</a>
          </li>

          <li>
            <a href="/locations">
              Locations
            </a>
          </li>

          <li aria-current="page">
            {location.name}
          </li>
        </ol>
      </nav>

      {/* =================================================
          LOCATION DETAIL
      ================================================= */}

      <LocationDetailPage
        location={locationData}
      />
    </>
  );
}