import type { Metadata } from "next";
import { notFound } from "next/navigation";

import Navbar from "@/components/agency/navbar/Navbar";
import Footer from "@/components/agency/footer/Footer";

import { connectDB } from "@/lib/db/connect";
import Offer from "@/models/Offer";
import { getOfferLifecycleStatus } from "@/lib/offers/status";

import OfferDetailHero from "@/components/offers/detail/OfferDetailHero";
import OfferDetailHighlights from "@/components/offers/detail/OfferDetailHighlights";
import OfferDetailFeatures from "@/components/offers/detail/OfferDetailFeatures";
import OfferDetailTerms from "@/components/offers/detail/OfferDetailTerms";
import OfferDetailCTA from "@/components/offers/detail/OfferDetailCTA";

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ||
  "https://www.amandigitalsolutions.com";

export const revalidate = 300;

type PageProps = {
  params: Promise<{
    slug: string;
  }>;
};

async function getOffer(slug: string) {
  await connectDB();

  return Offer.findOne({
    slug,
    published: true,
  }).lean();
}

function toISOStringSafe(value: Date | string) {
  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    throw new Error(
      `Invalid offer date: ${String(value)}`,
    );
  }

  return date.toISOString();
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;

  const offer = await getOffer(slug);

  if (!offer) {
    return {
      title:
        "Offer Not Found | Aman Digital Solutions",
      robots: {
        index: false,
        follow: false,
      },
    };
  }

  const canonicalUrl =
    `${SITE_URL}/offers/${offer.slug}`;

  const title =
    offer.seoTitle ||
    `${offer.title} | Aman Digital Solutions`;

  const description =
    offer.seoDescription ||
    offer.shortDescription;

  const ogImage =
    offer.ogImage?.url ||
    offer.heroImage?.url ||
    `${SITE_URL}/og-image.png`;

  return {
    title,
    description,

    alternates: {
      canonical: canonicalUrl,
    },

    robots: {
      index: true,
      follow: true,
    },

    openGraph: {
      title:
        offer.ogTitle || title,
      description:
        offer.ogDescription ||
        description,
      url: canonicalUrl,
      siteName:
        "Aman Digital Solutions",
      type: "website",
      images: [
        {
          url: ogImage,
          alt:
            offer.ogImage?.alt ||
            offer.heroImage?.alt ||
            offer.title,
        },
      ],
    },

    twitter: {
      card: "summary_large_image",
      title:
        offer.ogTitle || title,
      description:
        offer.ogDescription ||
        description,
      images: [ogImage],
    },
  };
}

export default async function OfferDetailPage({
  params,
}: PageProps) {
  const { slug } = await params;

  const offer = await getOffer(slug);

  if (!offer) {
    notFound();
  }

  const now = new Date();

  const lifecycleStatus =
    getOfferLifecycleStatus(
      {
        published: offer.published,
        startDate: offer.startDate,
        endDate: offer.endDate,
      },
      now,
    );

  const claimedCount =
    typeof offer.claimedCount ===
    "number"
      ? Math.max(
          0,
          offer.claimedCount,
        )
      : 0;

  const claimLimit =
    offer.isClaimLimitEnabled &&
    typeof offer.claimLimit ===
      "number"
      ? offer.claimLimit
      : null;

  const isFullyClaimed =
    claimLimit !== null &&
    claimedCount >= claimLimit;

  const canClaim =
    lifecycleStatus === "active" &&
    !isFullyClaimed;

  const canonicalUrl =
    `${SITE_URL}/offers/${offer.slug}`;

  const claimUrl =
    `/start-a-project?offer=${encodeURIComponent(
      offer.slug,
    )}`;

  const collectionUrl =
    `${SITE_URL}/offers`;

  const webpageSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": `${canonicalUrl}#webpage`,
    url: canonicalUrl,
    name:
      offer.seoTitle ||
      `${offer.title} | Aman Digital Solutions`,
    description:
      offer.seoDescription ||
      offer.shortDescription,

    isPartOf: {
      "@type": "WebSite",
      "@id": `${SITE_URL}/#website`,
      url: SITE_URL,
      name: "Aman Digital Solutions",
    },

    breadcrumb: {
      "@id": `${canonicalUrl}#breadcrumb`,
    },
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "@id": `${canonicalUrl}#breadcrumb`,
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
        item: collectionUrl,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: offer.title,
        item: canonicalUrl,
      },
    ],
  };

  const offerSchema = {
    "@context": "https://schema.org",
    "@type": "Offer",
    url: canonicalUrl,
    name: offer.title,
    description:
      offer.shortDescription,
    priceCurrency: "INR",

    ...(offer.offerPrice !==
      undefined &&
    offer.offerPrice !== null
      ? {
          price:
            offer.offerPrice,
        }
      : {}),

    ...(offer.originalPrice !==
      undefined &&
    offer.originalPrice !== null
      ? {
          priceSpecification: {
            "@type":
              "PriceSpecification",
            price:
              offer.offerPrice ??
              offer.originalPrice,
            priceCurrency:
              "INR",
          },
        }
      : {}),

    priceValidUntil:
      toISOStringSafe(
        offer.endDate,
      ).split("T")[0],

    availability:
      canClaim
        ? "https://schema.org/InStock"
        : "https://schema.org/OutOfStock",

    validFrom:
      toISOStringSafe(
        offer.startDate,
      ),

    seller: {
      "@type": "Organization",
      name:
        "Aman Digital Solutions",
      url: SITE_URL,
    },
  };

  return (
    <>
      <Navbar />

      <main className="min-h-screen overflow-x-clip bg-[#050505] text-[#F8FAFC]">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html:
              JSON.stringify(
                webpageSchema,
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

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html:
              JSON.stringify(
                offerSchema,
              ),
          }}
        />

        <OfferDetailHero
          offer={{
            title: offer.title,
            badge:
              offer.badge ?? null,

            shortDescription:
              offer.shortDescription,

            heroImage:
              offer.heroImage
                ? {
                    url:
                      offer.heroImage
                        .url,
                    alt:
                      offer.heroImage
                        .alt ||
                      offer.title,
                  }
                : null,

            offerPrice:
              offer.offerPrice ??
              null,

            originalPrice:
              offer.originalPrice ??
              null,

            discountType:
              offer.discountType,

            discountValue:
              offer.discountValue ??
              null,

            discountLabel:
              offer.discountLabel ??
              null,

            couponCode:
              offer.couponCode ??
              null,

            ctaLabel:
              offer.ctaLabel,

            secondaryCtaLabel:
              offer.secondaryCtaLabel ??
              null,

            secondaryCtaLink:
              offer.secondaryCtaLink ??
              null,

            startDate:
              toISOStringSafe(
                offer.startDate,
              ),

            endDate:
              toISOStringSafe(
                offer.endDate,
              ),

            termsAndConditions:
              offer.termsAndConditions ??
              null,

            lifecycleStatus,
            claimUrl,

            isClaimLimitEnabled:
              Boolean(
                offer.isClaimLimitEnabled,
              ),

            claimLimit,
            claimedCount,
          }}
        />

        <OfferDetailHighlights
          highlights={
            offer.highlights ?? []
          }
          description={
            offer.description
          }
        />

        <OfferDetailFeatures
          features={
            offer.includedFeatures ??
            []
          }
        />

        <OfferDetailTerms
          terms={
            offer.termsAndConditions ??
            ""
          }
        />

        <OfferDetailCTA
          title={offer.title}
          status={lifecycleStatus}
          claimUrl={claimUrl}
          ctaLabel={offer.ctaLabel}
          secondaryCtaLabel={
            offer.secondaryCtaLabel ??
            "Talk to us"
          }
          secondaryCtaLink={
            offer.secondaryCtaLink ??
            "/contact"
          }
          startDate={toISOStringSafe(
            offer.startDate,
          )}
          endDate={toISOStringSafe(
            offer.endDate,
          )}
          isFullyClaimed={
            isFullyClaimed
          }
          claimedCount={
            claimedCount
          }
          claimLimit={
            claimLimit
          }
        />
      </main>

      <Footer />
    </>
  );
}