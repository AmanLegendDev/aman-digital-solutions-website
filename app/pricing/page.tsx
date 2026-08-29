import type { Metadata } from "next";

import { connectDB } from "@/lib/db/connect";
import PricingPlan from "@/models/PricingPlan";

import PricingPageClient from "@/components/pricing/PricingPageClient";
import type { PricingPlanCardData } from "@/components/pricing/PricingPlanCard";

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
    "Website Development Pricing | Aman Digital Solutions",

  description:
    "Explore transparent pricing for professional websites, e-commerce stores, business systems and digital solutions from Aman Digital Solutions.",

  alternates: {
    canonical:
      `${SITE_URL}/pricing`,
  },

  openGraph: {
    title:
      "Website Development Pricing | Aman Digital Solutions",

    description:
      "Explore transparent pricing for websites, e-commerce, business systems and digital solutions.",

    url:
      `${SITE_URL}/pricing`,

    type: "website",

    siteName:
      "Aman Digital Solutions",

    locale:
      "en_IN",
  },

  twitter: {
    card:
      "summary_large_image",

    title:
      "Pricing | Aman Digital Solutions",

    description:
      "Transparent pricing for professional websites and digital solutions.",
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
   FETCH PRICING PLANS
========================================================= */

async function getPricingPlans(): Promise<
  PricingPlanCardData[]
> {
  await connectDB();

  const plans = await PricingPlan.find({
    isPublished: true,
  })
    .select(
      "_id name slug shortDescription price currency pricePrefix priceSuffix pricingType billingPeriod features ctaText ctaLink isFeatured featuredLabel displayOrder"
    )
    .sort({
      isFeatured: -1,
      displayOrder: 1,
      createdAt: 1,
    })
    .lean();

  return plans.map((plan) => ({
    _id:
      String(plan._id),

    name:
      plan.name,

    slug:
      plan.slug,

    shortDescription:
      plan.shortDescription,

    price:
      plan.price !== undefined
        ? plan.price
        : undefined,

    currency:
      plan.currency,

    pricePrefix:
      plan.pricePrefix ||
      undefined,

    priceSuffix:
      plan.priceSuffix ||
      undefined,

    pricingType:
      plan.pricingType,

    billingPeriod:
      plan.billingPeriod,

    features:
      Array.isArray(plan.features)
        ? plan.features
        : [],

    ctaText:
      plan.ctaText,

    ctaLink:
      plan.ctaLink,

    isFeatured:
      plan.isFeatured,

    featuredLabel:
      plan.featuredLabel ||
      undefined,

    displayOrder:
      plan.displayOrder,
  }));
}

/* =========================================================
   WEB PAGE STRUCTURED DATA
========================================================= */

function createWebPageSchema() {
  return {
    "@context":
      "https://schema.org",

    "@type":
      "WebPage",

    "@id":
      `${SITE_URL}/pricing#webpage`,

    url:
      `${SITE_URL}/pricing`,

    name:
      "Website Development Pricing | Aman Digital Solutions",

    description:
      "Transparent pricing for professional websites, e-commerce stores, business systems and digital solutions.",

    isPartOf: {
      "@id":
        `${SITE_URL}/#website`,
    },

    breadcrumb: {
      "@id":
        `${SITE_URL}/pricing#breadcrumb`,
    },
  };
}

/* =========================================================
   BREADCRUMB STRUCTURED DATA
========================================================= */

function createBreadcrumbSchema() {
  return {
    "@context":
      "https://schema.org",

    "@type":
      "BreadcrumbList",

    "@id":
      `${SITE_URL}/pricing#breadcrumb`,

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
          "Pricing",

        item:
          `${SITE_URL}/pricing`,
      },
    ],
  };
}

/* =========================================================
   PAGE
========================================================= */

export default async function PricingPage() {
  const plans =
    await getPricingPlans();

  /* =======================================================
     STRUCTURED DATA
  ======================================================= */

  const webPageSchema =
    createWebPageSchema();

  const breadcrumbSchema =
    createBreadcrumbSchema();

  return (
    <>
      {/* =================================================
          NAVBAR
      ================================================= */}

      <Navbar />

      {/* =================================================
          WEBPAGE SCHEMA
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

      {/* =================================================
          BREADCRUMB SCHEMA
      ================================================= */}

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

          <li aria-current="page">
            Pricing
          </li>
        </ol>
      </nav>

      {/* =================================================
          MAIN CONTENT
      ================================================= */}

      <main>
        <PricingPageClient
          plans={plans}
        />
      </main>

      {/* =================================================
          FOOTER
      ================================================= */}

      <Footer />
    </>
  );
}