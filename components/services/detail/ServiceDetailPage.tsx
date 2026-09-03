import Image from "next/image";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowUpRight,
  CheckCircle2,
  ChevronRight,
  Home,
} from "lucide-react";

import type {
  IService,
  IServiceBenefit,
  IServiceFeature,
  IServiceProcessStep,
  IServiceImage,
} from "@/models/Service";

import ServiceBenefitsSection from "./ServiceBenefitsSection";
import ServiceFeaturesSection from "./ServiceFeaturesSection";
import ServiceOverviewSection from "./ServiceOverviewSection";
import ServiceProcessSection from "./ServiceProcessSection";
import ServicePricingSection from "./ServicePricingSection";
import RelatedProjectsSection, {
  type RelatedProjectData,
} from "./RelatedProjectsSection";
import RelatedFaqsSection, {
  type RelatedFaqData,
} from "./RelatedFaqsSection";
import ServiceFinalCtaSection from "./ServiceFinalCtaSection";

import RelatedServicesSection, {
  type RelatedServiceData,
} from "./RelatedServicesSection";

type ServiceDetailPageProps = {
  service: IService;
  relatedServices?: RelatedServiceData[];
  relatedProjects?: RelatedProjectData[];
  relatedFaqs?: RelatedFaqData[];
};

function getCategoryLabel(
  category: IService["category"]
) {
  const labels: Record<
    IService["category"],
    string
  > = {
    websites: "Websites",
    "business-systems": "Business Systems",
    growth: "Growth",
    support: "Support",
  };

  return labels[category];
}

export default function ServiceDetailPage({
  service,
  relatedServices = [],
  relatedProjects = [],
  relatedFaqs = [],
}: ServiceDetailPageProps) {
  const categoryLabel = getCategoryLabel(
    service.category
  );

  return (
   <div className="min-h-screen w-full max-w-full overflow-x-clip bg-[#050505] text-white">
      {/* =====================================================
          BREADCRUMB
      ====================================================== */}
      <div className="mx-auto max-w-7xl px-5 pt-28 sm:px-8 sm:pt-32 lg:px-10">
        <nav
          aria-label="Breadcrumb"
          className="flex items-center gap-2 overflow-x-auto whitespace-nowrap text-[10px] text-neutral-600"
        >
          <Link
            href="/"
            className="inline-flex shrink-0 items-center gap-1.5 transition-colors hover:text-white"
          >
            <Home size={12} />
            Home
          </Link>

          <ChevronRight
            size={12}
            className="shrink-0 text-neutral-800"
          />

          <Link
            href="/services"
            className="shrink-0 transition-colors hover:text-white"
          >
            Services
          </Link>

          <ChevronRight
            size={12}
            className="shrink-0 text-neutral-800"
          />

          <span className="shrink-0 text-neutral-400">
            {service.title}
          </span>
        </nav>
      </div>

      {/* =====================================================
          HERO
      ====================================================== */}
      <section className="relative overflow-hidden pb-20 pt-12 sm:pb-24 sm:pt-16 lg:pb-28">
        {/* ambient glow */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute left-[8%] top-[15%] h-[300px] w-[300px] rounded-full bg-[#FFC400]/[0.045] blur-[110px]"
        />

        <div
          aria-hidden="true"
          className="pointer-events-none absolute right-[8%] top-[20%] h-[260px] w-[260px] rounded-full bg-white/[0.015] blur-[100px]"
        />

        <div className="relative mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
          <div className="grid items-center gap-10 lg:grid-cols-[1.02fr_0.98fr] lg:gap-16">
            {/* HERO CONTENT */}
            <div>
              {/* EYEBROW */}
              <div className="inline-flex items-center gap-2 rounded-full border border-[#FFC400]/15 bg-[#FFC400]/[0.04] px-3.5 py-2">
                <span className="h-1.5 w-1.5 rounded-full bg-[#FFC400] shadow-[0_0_10px_rgba(255,196,0,0.65)]" />

                <span className="text-[9px] font-semibold uppercase tracking-[0.2em] text-[#FFC400]">
                  {service.heroEyebrow ||
                    categoryLabel}
                </span>
              </div>

              {/* TITLE */}
              <h1 className="mt-7 max-w-3xl text-4xl font-semibold leading-[1.02] tracking-[-0.045em] text-white sm:text-5xl lg:text-6xl xl:text-[4.4rem]">
                {service.title}
              </h1>

              {/* SHORT DESCRIPTION */}
              <p className="mt-6 max-w-2xl text-base leading-7 text-neutral-400 sm:text-lg sm:leading-8">
                {service.shortDescription}
              </p>

              {/* ACTIONS */}
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Link
                  href={
                    service.ctaLink ||
                    "/start/a-project"
                  }
                  className="group inline-flex items-center justify-center gap-3 rounded-full bg-[#FFC400] px-6 py-3.5 text-sm font-semibold text-black transition-all duration-300 hover:bg-[#FFD43B] hover:shadow-[0_14px_40px_rgba(255,196,0,0.14)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FFC400]"
                >
                  <span>
                    {service.ctaLabel ||
                      "Get Started"}
                  </span>

                  <span className="flex h-7 w-7 items-center justify-center rounded-full bg-black/10 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5">
                    <ArrowUpRight size={14} />
                  </span>
                </Link>

                <Link
                  href="/services"
                  className="group inline-flex items-center justify-center gap-2 rounded-full border border-white/[0.08] bg-[#090909] px-6 py-3.5 text-sm font-medium text-neutral-400 transition-all duration-300 hover:border-white/[0.15] hover:bg-[#0C0C0C] hover:text-white"
                >
                  <ArrowLeft
                    size={14}
                    className="transition-transform duration-200 group-hover:-translate-x-0.5"
                  />

                  All services
                </Link>
              </div>

              {/* TRUST META */}
              <div className="mt-9 flex flex-wrap gap-x-6 gap-y-3">
                <div className="flex items-center gap-2">
                  <CheckCircle2
                    size={14}
                    className="text-[#FFC400]"
                  />

                  <span className="text-[10px] text-neutral-600">
                    Business-first approach
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <CheckCircle2
                    size={14}
                    className="text-[#FFC400]"
                  />

                  <span className="text-[10px] text-neutral-600">
                    Performance-focused
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <CheckCircle2
                    size={14}
                    className="text-[#FFC400]"
                  />

                  <span className="text-[10px] text-neutral-600">
                    SEO-ready foundation
                  </span>
                </div>
              </div>
            </div>

            {/* HERO IMAGE */}
            <div className="relative">
              <div className="absolute -inset-3 rounded-[34px] bg-[#FFC400]/[0.035] blur-2xl" />

              <div className="relative overflow-hidden rounded-[30px] border border-white/[0.08] bg-[#090909] shadow-[0_30px_100px_rgba(0,0,0,0.45)]">
                <div className="relative aspect-[4/3]">
                  {service.image?.url ? (
                    <Image
                      src={service.image.url}
                      alt={
                        service.image.alt ||
                        service.title
                      }
                      fill
                      priority
                      sizes="(max-width: 1024px) 100vw, 50vw"
                      className="object-cover"
                    />
                  ) : (
                    <div className="flex h-full items-center justify-center bg-[#0A0A0A]">
                      <span className="text-xs text-neutral-700">
                        {service.title}
                      </span>
                    </div>
                  )}

                  <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-transparent" />

                  {/* IMAGE LABEL */}
                  <div className="absolute bottom-5 left-5 right-5 flex items-end justify-between gap-4">
                    <div>
                      <p className="text-[9px] font-semibold uppercase tracking-[0.18em] text-[#FFC400]">
                        Aman Digital Solutions
                      </p>

                      <p className="mt-1 text-xs text-white/80">
                        {categoryLabel}
                      </p>
                    </div>

                    <span className="rounded-full border border-white/10 bg-black/40 px-3 py-1.5 text-[9px] text-neutral-300 backdrop-blur-md">
                      {service.featured
                        ? "Featured service"
                        : "Digital service"}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================
          OVERVIEW
      ====================================================== */}
      <ServiceOverviewSection
        title={service.title}
        description={service.description}
      />

      {/* =====================================================
          BENEFITS
      ====================================================== */}
      <ServiceBenefitsSection
        benefits={
          service.benefits as IServiceBenefit[]
        }
      />

      {/* =====================================================
          FEATURES
      ====================================================== */}
      <ServiceFeaturesSection
        features={
          service.features as IServiceFeature[]
        }
      />

      {/* =====================================================
          PROCESS
      ====================================================== */}
     <ServiceProcessSection
  process={
    service.process as IServiceProcessStep[]
  }
/>

      {/* =====================================================
          PRICING
      ====================================================== */}
      <ServicePricingSection
        title={service.title}
        priceLabel={service.priceLabel}
        startingPrice={service.startingPrice}
        ctaLabel={service.ctaLabel}
        ctaLink={service.ctaLink}
      />


<RelatedServicesSection
  services={relatedServices}
/>

      {/* =====================================================
          RELATED PROJECTS
      ====================================================== */}
      <RelatedProjectsSection
        projects={relatedProjects}
      />

      {/* =====================================================
          RELATED FAQS
      ====================================================== */}
      <RelatedFaqsSection
        faqs={relatedFaqs}
      />

      {/* =====================================================
          FINAL CTA
      ====================================================== */}
      <ServiceFinalCtaSection
        title={service.title}
        ctaLabel={service.ctaLabel}
        ctaLink={service.ctaLink}
      />
    </div>
  );
}