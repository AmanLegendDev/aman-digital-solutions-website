"use client";

import PricingHeroSection from "./PricingHeroSection";
import FeaturedPricingSection from "./FeaturedPricingSection";
import PricingPlansSection from "./PricingPlansSection";
import PricingValueSection from "./PricingValueSection";
import PricingFinalCtaSection from "./PricingFinalCtaSection";

import type { PricingPlanCardData } from "./PricingPlanCard";

/* =========================================================
   PROPS
========================================================= */

type PricingPageClientProps = {
  plans: PricingPlanCardData[];
};

/* =========================================================
   PAGE CLIENT
========================================================= */

export default function PricingPageClient({
  plans,
}: PricingPageClientProps) {
  /* =======================================================
     SORT PLANS
  ======================================================= */

  const sortedPlans = [...plans].sort(
    (a, b) =>
      a.displayOrder - b.displayOrder
  );

  /* =======================================================
     FEATURED PLAN
  ======================================================= */

  const featuredPlan =
    sortedPlans.find(
      (plan) => plan.isFeatured
    ) || undefined;

  return (
    <main className="min-h-screen bg-[#050505] text-white">
      {/* =====================================================
          HERO
      ===================================================== */}

      <PricingHeroSection />

      {/* =====================================================
          FEATURED PLAN
      ===================================================== */}

      <FeaturedPricingSection
        plan={featuredPlan}
      />

      {/* =====================================================
          ALL OTHER PLANS
      ===================================================== */}

      <PricingPlansSection
        plans={sortedPlans}
      />

      {/* =====================================================
          VALUE
      ===================================================== */}

      <PricingValueSection />

      {/* =====================================================
          FINAL CTA
      ===================================================== */}

      <PricingFinalCtaSection />
    </main>
  );
}