import type { Metadata } from "next";

import { connectDB } from "@/lib/db/connect";
import Service from "@/models/Service";
import Offer from "@/models/Offer";

import Navbar from "@/components/agency/navbar/Navbar";
import Footer from "@/components/agency/footer/Footer";

import StartProjectClient from "@/components/start-project/StartProjectClient";

/* =========================================================
   SITE CONFIG
========================================================= */

const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL ||
  "https://www.amandigitalsolutions.com"
).replace(/\/$/, "");

const PAGE_URL =
  `${SITE_URL}/start-a-project`;

export const revalidate = 3600;

/* =========================================================
   METADATA
========================================================= */

export const metadata: Metadata = {
  title:
    "Start a Project | Aman Digital Solutions",

  description:
    "Tell Aman Digital Solutions about your website or digital project and get a clear next step for web development, e-commerce, custom web applications and digital solutions.",

  alternates: {
    canonical: PAGE_URL,
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

  openGraph: {
    title:
      "Start a Project | Aman Digital Solutions",

    description:
      "Tell us what you're building and let's discuss the right digital solution for your business.",

    url: PAGE_URL,

    type: "website",

    siteName:
      "Aman Digital Solutions",

    locale:
      "en_IN",

    images: [
      {
        url:
          `${SITE_URL}/og-image.png`,

        width: 1200,

        height: 630,

        alt:
          "Start a Project - Aman Digital Solutions",
      },
    ],
  },

  twitter: {
    card:
      "summary_large_image",

    title:
      "Start a Project | Aman Digital Solutions",

    description:
      "Tell us what you're building and let's discuss the right digital solution for your business.",

    images: [
      `${SITE_URL}/og-image.png`,
    ],
  },
};

/* =========================================================
   TYPES
========================================================= */

type SearchParams = {
  offer?: string;
  service?: string;
};

/* =========================================================
   FETCH PROJECT SERVICES
========================================================= */

async function getProjectServices() {
  await connectDB();

  const services =
    await Service.find({
      published: true,
    })
      .select(
        "_id title slug shortDescription"
      )
      .sort({
        displayOrder: 1,
        title: 1,
      })
      .lean();

  return services
    .filter(
      (service) =>
        Boolean(
          service.title &&
          service.slug
        )
    )
    .map((service) => ({
      _id: String(service._id),
      title: service.title,
      slug: service.slug,
      shortDescription:
        service.shortDescription || "",
    }));
}

/* =========================================================
   FETCH OFFER CONTEXT
========================================================= */

async function getOfferContext(
  offerSlug?: string,
) {
  if (!offerSlug?.trim()) {
    return null;
  }

  await connectDB();

  const offer =
    await Offer.findOne({
      slug: offerSlug
        .trim()
        .toLowerCase(),
      published: true,
    })
      .select(
        [
          "_id",
          "title",
          "slug",
          "badge",
          "shortDescription",
          "discountLabel",
          "originalPrice",
          "offerPrice",
          "couponCode",
          "serviceId",
          "startDate",
          "endDate",
          "isClaimLimitEnabled",
          "claimLimit",
          "claimedCount",
        ].join(" "),
      )
      .lean();

  if (!offer) {
    return null;
  }

  return {
    _id: String(offer._id),

    title:
      offer.title,

    slug:
      offer.slug,

    badge:
      offer.badge || "",

    shortDescription:
      offer.shortDescription || "",

    discountLabel:
      offer.discountLabel || "",

    originalPrice:
      typeof offer.originalPrice === "number"
        ? offer.originalPrice
        : null,

    offerPrice:
      typeof offer.offerPrice === "number"
        ? offer.offerPrice
        : null,

    couponCode:
      offer.couponCode || "",

    serviceId:
      offer.serviceId
        ? String(offer.serviceId)
        : "",

    startDate:
      offer.startDate
        ? new Date(
            offer.startDate,
          ).toISOString()
        : null,

    endDate:
      offer.endDate
        ? new Date(
            offer.endDate,
          ).toISOString()
        : null,

    isClaimLimitEnabled:
      Boolean(
        offer.isClaimLimitEnabled,
      ),

    claimLimit:
      typeof offer.claimLimit === "number"
        ? offer.claimLimit
        : null,

    claimedCount:
      typeof offer.claimedCount === "number"
        ? offer.claimedCount
        : 0,
  };
}

/* =========================================================
   PAGE
========================================================= */

export default async function StartProjectPage({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
  const params =
    await searchParams;

  const [services, offer] =
    await Promise.all([
      getProjectServices(),
      getOfferContext(
        params.offer,
      ),
    ]);

  return (
    <>
      <Navbar />

      <main
        id="main-content"
        className="mt-16 min-h-screen bg-[#050505] text-white"
      >
        <StartProjectClient
          services={services}
          offer={offer}
        />
      </main>

      <Footer />
    </>
  );
}