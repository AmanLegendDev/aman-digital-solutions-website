import { connectDB } from "@/lib/db/connect";
import PricingPlan from "@/models/PricingPlan";

import PricingIntro from "./PricingIntro";
import PricingCard from "./PricingCard";

async function getPricingPlans() {
  await connectDB();

  const plans = await PricingPlan.find({
    isPublished: true,
  })
    .sort({
      isFeatured: -1,
      displayOrder: 1,
      createdAt: -1,
    })
    .select(
      [
        "name",
        "slug",
        "shortDescription",
        "price",
        "currency",
        "pricePrefix",
        "priceSuffix",
        "pricingType",
        "billingPeriod",
        "features",
        "serviceId",
        "ctaText",
        "ctaLink",
        "isFeatured",
        "featuredLabel",
        "displayOrder",
      ].join(" ")
    )
    .lean();

  return plans.map((plan) => ({
    id: plan._id.toString(),
    name: plan.name,
    slug: plan.slug,
    shortDescription: plan.shortDescription,
    price: plan.price ?? null,
    currency: plan.currency,
    pricePrefix: plan.pricePrefix ?? null,
    priceSuffix: plan.priceSuffix ?? null,
    pricingType: plan.pricingType,
    billingPeriod: plan.billingPeriod,
    features: Array.isArray(plan.features)
      ? plan.features
      : [],
    serviceId: plan.serviceId
      ? plan.serviceId.toString()
      : null,
    ctaText: plan.ctaText,
    ctaLink: plan.ctaLink,
    isFeatured: plan.isFeatured,
    featuredLabel: plan.featuredLabel ?? null,
  }));
}

export default async function PricingSection() {
  const plans = await getPricingPlans();

  if (plans.length === 0) {
    return null;
  }

  return (
    <section
      id="pricing"
      aria-labelledby="pricing-heading"
      className="relative w-full max-w-full scroll-mt-28 overflow-x-clip border-t border-[#1A1A1A] bg-[#080808] py-24 sm:py-28 lg:py-32"
    >
      {/* Ambient glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-20 h-[420px] w-[420px] -translate-x-1/2 rounded-full bg-[#FFC400]/[0.025] blur-[150px]"
      />

      <div className="relative mx-auto w-full max-w-7xl min-w-0 px-5 sm:px-8 lg:px-10">
        {/* INTRO */}
        <div className="mx-auto max-w-3xl text-center">
          <PricingIntro />
        </div>

        {/* PLANS */}
        <div
          className={[
            "mx-auto mt-14 grid w-full min-w-0 gap-4",
            plans.length === 1
              ? "max-w-xl"
              : plans.length === 2
                ? "max-w-4xl md:grid-cols-2"
                : "max-w-6xl md:grid-cols-2 xl:grid-cols-3",
          ].join(" ")}
        >
          {plans.map((plan, index) => (
            <PricingCard
              key={plan.id}
              plan={plan}
              index={index}
            />
          ))}
        </div>

        {/* BOTTOM NOTE */}
        <div className="mx-auto mt-8 flex max-w-6xl items-center justify-center gap-2 text-center">
          <span
            aria-hidden="true"
            className="h-1.5 w-1.5 shrink-0 rounded-full bg-[#FFC400]"
          />

          <p className="text-[10px] uppercase tracking-[0.16em] text-[#555]">
            Need something more specific? Let's build around
            your requirements.
          </p>
        </div>
      </div>
    </section>
  );
}