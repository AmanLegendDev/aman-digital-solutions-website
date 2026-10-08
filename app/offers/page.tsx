import type { Metadata } from "next";

import { connectDB } from "@/lib/db/connect";
import Offer from "@/models/Offer";

import OffersHero from "@/components/offers/OffersHero";
import OffersGrid from "@/components/offers/OffersGrid";
import OffersCTA from "@/components/offers/OffersCTA";
import Navbar from "@/components/agency/navbar/Navbar";
import Footer from "@/components/agency/footer/Footer";

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ||
  "https://www.amandigitalsolutions.com";

export const revalidate = 300;

export const metadata: Metadata = {
  title: "Special Offers | Aman Digital Solutions",
  description:
    "Explore limited-time website development and digital solution offers from Aman Digital Solutions.",
  alternates: {
    canonical: `${SITE_URL}/offers`,
  },
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: "Special Offers | Aman Digital Solutions",
    description:
      "Explore limited-time website development and digital solution offers from Aman Digital Solutions.",
    url: `${SITE_URL}/offers`,
    siteName: "Aman Digital Solutions",
    type: "website",
    images: [
      {
        url: `${SITE_URL}/og-image.png`,
        alt: "Aman Digital Solutions special offers",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Special Offers | Aman Digital Solutions",
    description:
      "Explore limited-time website development and digital solution offers from Aman Digital Solutions.",
    images: [`${SITE_URL}/og-image.png`],
  },
};

async function getOffers() {
  await connectDB();

  const offers = await Offer.find({
    published: true,
  })
    .sort({
      featured: -1,
      displayOrder: 1,
      startDate: 1,
    })
    .lean();

  return offers.map((offer) => ({
    id: offer._id.toString(),

    title: offer.title,
    slug: offer.slug,

    badge: offer.badge ?? null,
    shortDescription: offer.shortDescription,

    offerType: offer.offerType,

    discountType: offer.discountType,
    discountValue: offer.discountValue ?? null,

    originalPrice: offer.originalPrice ?? null,
    offerPrice: offer.offerPrice ?? null,
    discountLabel: offer.discountLabel ?? null,

    couponCode: offer.couponCode ?? null,

    cardImage: offer.cardImage
      ? {
          url: offer.cardImage.url,
          publicId: offer.cardImage.publicId ?? null,
          alt:
            offer.cardImage.alt ??
            offer.title,
        }
      : null,

    highlights: offer.highlights ?? [],

    ctaLabel: offer.ctaLabel,

    startDate: new Date(
      offer.startDate,
    ).toISOString(),

    endDate: new Date(
      offer.endDate,
    ).toISOString(),

    isClaimLimitEnabled:
      Boolean(offer.isClaimLimitEnabled),

    claimLimit:
      typeof offer.claimLimit === "number"
        ? offer.claimLimit
        : null,

    claimedCount:
      typeof offer.claimedCount === "number"
        ? offer.claimedCount
        : 0,

    featured: Boolean(offer.featured),
    displayOrder:
      offer.displayOrder ?? 0,
  }));
}

export default async function OffersPage() {
  const offers = await getOffers();

  const collectionPageSchema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "@id": `${SITE_URL}/offers#webpage`,
    url: `${SITE_URL}/offers`,
    name: "Special Offers | Aman Digital Solutions",
    description:
      "Explore limited-time website development and digital solution offers from Aman Digital Solutions.",
    isPartOf: {
      "@type": "WebSite",
      "@id": `${SITE_URL}/#website`,
      url: SITE_URL,
      name: "Aman Digital Solutions",
    },
    mainEntity: {
      "@type": "ItemList",
      itemListElement: offers.map(
        (offer, index) => ({
          "@type": "ListItem",
          position: index + 1,
          name: offer.title,
          url: `${SITE_URL}/offers/${offer.slug}`,
        }),
      ),
    },
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: SITE_URL,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Offers",
        item: `${SITE_URL}/offers`,
      },
    ],
  };

  return (
    <>
      <Navbar />

      <main className="min-h-screen overflow-x-clip bg-[#050505] text-white">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html:
              JSON.stringify(
                collectionPageSchema,
              ),
          }}
        />

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html:
              JSON.stringify(
                breadcrumbSchema,
              ),
          }}
        />

        <OffersHero />

        <OffersGrid
          offers={offers}
        />

        <OffersCTA />
      </main>

      <Footer />
    </>
  );
}