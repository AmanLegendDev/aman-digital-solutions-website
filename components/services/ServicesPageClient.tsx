"use client";

import { useState } from "react";

import ServicesHero from "./ServicesHero";
import FeaturedServicesSection from "./FeaturedServicesSection";
import ServiceCategoryFilter, {
  type ServiceCategory,
} from "./ServiceCategoryFilter";
import AllServices from "./AllServices";
import ServicesBottomCta, {
} from "./ServicesBottomCta";

import type { FeaturedServiceCard } from "./FeaturedServicesSection";
import type { ServiceCardData } from "./AllServices";

type ServicesPageClientProps = {
  servicesCount: number;
  featuredServices: FeaturedServiceCard[];
  allServices: ServiceCardData[];
};

export default function ServicesPageClient({
  servicesCount,
  featuredServices,
  allServices,
}: ServicesPageClientProps) {
  const [activeCategory, setActiveCategory] =
    useState<ServiceCategory>("all");

  return (
    <main className="min-h-screen bg-[#050505] text-white">
      {/* 01 — HERO */}
      <ServicesHero servicesCount={servicesCount} />

      {/* 02 — FEATURED SERVICES */}
      <FeaturedServicesSection
        services={featuredServices}
      />

      {/* 03 — CATEGORY FILTER */}
      <ServiceCategoryFilter
        activeCategory={activeCategory}
        onCategoryChange={setActiveCategory}
      />

      {/* 04 — ALL NON-FEATURED SERVICES */}
      <AllServices
        services={allServices}
        activeCategory={activeCategory}
      />

      {/* 05 — FINAL CTA */}
      <ServicesBottomCta />
    </main>
  );
}