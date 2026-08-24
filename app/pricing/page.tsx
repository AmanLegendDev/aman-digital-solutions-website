import type { Metadata } from "next";

import { connectDB } from "@/lib/db/connect";
import PricingPlan from "@/models/PricingPlan";

import PricingPageClient from "@/components/pricing/PricingPageClient";
import type { PricingPlanCardData } from "@/components/pricing/PricingPlanCard";

/* =========================================================
   METADATA
========================================================= */

export const metadata: Metadata = {
  title:
    "Pricing | Aman Digital Solutions",

  description:
    "Explore transparent pricing for premium websites, digital solutions and business-focused web development by Aman Digital Solutions.",

  alternates: {
    canonical:
      "https://www.amandigitalsolutions.in/pricing",
  },

  openGraph: {
    title:
      "Pricing | Aman Digital Solutions",

    description:
      "Simple, transparent pricing for high-quality digital solutions.",

    url:
      "https://www.amandigitalsolutions.in/pricing",

    type: "website",
  },

  twitter: {
    card: "summary_large_image",

    title:
      "Pricing | Aman Digital Solutions",

    description:
      "Simple, transparent pricing for high-quality digital solutions.",
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
    .sort({
      displayOrder: 1,
      createdAt: 1,
    })
    .lean();

  return plans.map((plan) => ({
    _id: String(plan._id),

    name: plan.name,

    slug: plan.slug,

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
   PAGE
========================================================= */

export default async function PricingPage() {
  const plans = await getPricingPlans();

  return (
    <PricingPageClient
      plans={plans}
    />
  );
}