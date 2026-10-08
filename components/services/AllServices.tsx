"use client";

import Image from "next/image";
import Link from "next/link";
import {
  ArrowUpRight,
  Check,
  Layers3,
} from "lucide-react";

import type { ServiceCategory } from "./ServiceCategoryFilter";

export type ServiceCardData = {
  id: string;
  title: string;
  slug: string;
  heroEyebrow?: string;
  shortDescription: string;
  category:
    | "websites"
    | "business-systems"
    | "growth"
    | "support";
  image?: {
    url: string;
    alt?: string;
  };
  startingPrice?: number;
  priceLabel?: string;
  ctaLabel?: string;
  features: {
    title: string;
    description: string;
    icon?: string;
  }[];
};

type AllServicesProps = {
  services: ServiceCardData[];
  activeCategory?: ServiceCategory;
};

const categoryLabels: Record<
  Exclude<ServiceCategory, "all">,
  string
> = {
  websites: "Websites",
  "business-systems": "Business Systems",
  growth: "Growth",
  support: "Support",
};

const categoryDescriptions: Record<
  Exclude<ServiceCategory, "all">,
  string
> = {
  websites:
    "Websites and digital experiences built for credibility, performance and conversion.",
  "business-systems":
    "Custom digital systems designed to simplify operations and improve how your business works.",
  growth:
    "Digital strategies and solutions focused on visibility, leads and sustainable growth.",
  support:
    "Ongoing technical support and improvements that keep your digital presence reliable.",
};

export default function AllServices({
  services,
  activeCategory = "all",
}: AllServicesProps) {
  const filteredServices =
    activeCategory === "all"
      ? services
      : services.filter(
          (service) => service.category === activeCategory
        );

  return (
    <section
      id="all-services"
      aria-labelledby="all-services-heading"
      className="relative overflow-hidden bg-[#050505] py-24 sm:py-32"
    >
      <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">

        {/* SECTION HEADER */}
        <div className="mb-12 border-b border-white/[0.07] pb-8 sm:mb-14 sm:flex sm:items-end sm:justify-between sm:gap-10">
          <div>
            <div className="mb-4 flex items-center gap-2">
              <span className="flex h-7 w-7 items-center justify-center rounded-lg border border-white/[0.08] bg-white/[0.025]">
                <Layers3
                  size={13}
                  className="text-[#FFC400]"
                />
              </span>

              <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-neutral-500">
                Our capabilities
              </span>
            </div>

            <h2
              id="all-services-heading"
              className="text-3xl font-semibold tracking-[-0.04em] text-white sm:text-4xl"
            >
              Everything your business needs
              <br className="hidden sm:block" />{" "}
              <span className="text-neutral-600">
                to build its digital edge.
              </span>
            </h2>
          </div>

          <div className="mt-5 max-w-sm sm:mt-0">
            {activeCategory !== "all" ? (
              <p className="text-sm leading-6 text-neutral-500">
                {categoryDescriptions[activeCategory]}
              </p>
            ) : (
              <p className="text-sm leading-6 text-neutral-500">
                Explore our complete range of digital services,
                each designed around a specific business
                outcome.
              </p>
            )}
          </div>
        </div>

        {/* RESULT META */}
        <div className="mb-7 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="text-[10px] font-medium uppercase tracking-[0.16em] text-neutral-600">
              {activeCategory === "all"
                ? "All solutions"
                : categoryLabels[activeCategory]}
            </span>

            <span className="h-px w-6 bg-white/[0.1]" />

            <span className="text-[10px] tabular-nums text-neutral-700">
              {String(filteredServices.length).padStart(2, "0")}{" "}
              {filteredServices.length === 1
                ? "service"
                : "services"}
            </span>
          </div>
        </div>

        {/* EMPTY STATE */}
        {filteredServices.length === 0 && (
          <div className="rounded-[28px] border border-dashed border-white/[0.09] bg-[#090909] px-6 py-20 text-center">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl border border-white/[0.08] bg-white/[0.02]">
              <Layers3
                size={18}
                className="text-neutral-600"
              />
            </div>

            <h3 className="mt-5 text-lg font-semibold text-white">
              More solutions are on the way.
            </h3>

            <p className="mx-auto mt-2 max-w-sm text-sm leading-6 text-neutral-600">
              We are expanding this category with new
              business-focused digital solutions.
            </p>
          </div>
        )}

        {/* SERVICE GRID */}
        {filteredServices.length > 0 && (
          <div className="grid gap-5 md:grid-cols-2">
            {filteredServices.map((service, index) => {
              const visibleFeatures =
                service.features.slice(0, 3);

              const quoteHref = `/start-a-project?service=${encodeURIComponent(
                service.slug
              )}`;

              return (
                <article
                  key={service.id}
                  className="group relative flex min-h-[570px] flex-col overflow-hidden rounded-[26px] border border-white/[0.07] bg-[#0A0A0A] transition-all duration-500 hover:-translate-y-1 hover:border-[#FFC400]/20 hover:shadow-[0_25px_80px_rgba(0,0,0,0.35)]"
                >
                  {/* IMAGE */}
                  <div className="relative h-[240px] shrink-0 overflow-hidden">
                    {service.image?.url ? (
                      <Image
                        src={service.image.url}
                        alt={
                          service.image.alt ||
                          `${service.title} service`
                        }
                        fill
                        sizes="(max-width: 768px) 100vw, 50vw"
                        className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.045]"
                      />
                    ) : (
                      <div className="flex h-full items-center justify-center bg-[#101010]">
                        <Layers3
                          size={25}
                          className="text-neutral-700"
                        />
                      </div>
                    )}

                    {/* IMAGE OVERLAY */}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-transparent to-black/10" />

                    {/* CATEGORY */}
                    <div className="absolute left-5 top-5">
                      <span className="rounded-full border border-white/10 bg-black/45 px-3 py-1.5 text-[9px] font-semibold uppercase tracking-[0.15em] text-white/75 backdrop-blur-xl">
                        {categoryLabels[service.category]}
                      </span>
                    </div>

                    {/* NUMBER */}
                    <div className="absolute right-5 top-5">
                      <span className="text-[9px] font-medium tabular-nums tracking-[0.16em] text-white/40">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                    </div>
                  </div>

                  {/* CONTENT */}
                  <div className="flex flex-1 flex-col p-6 sm:p-7">
                    <div>
                      {service.heroEyebrow && (
                        <p className="mb-3 line-clamp-1 text-[9px] font-semibold uppercase tracking-[0.14em] text-[#FFC400]/70">
                          {service.heroEyebrow}
                        </p>
                      )}

                      <h3 className="text-2xl font-semibold tracking-[-0.035em] text-white transition-colors duration-300 group-hover:text-[#FFC400]">
                        {service.title}
                      </h3>

                      <p className="mt-3 line-clamp-3 text-sm leading-6 text-neutral-500">
                        {service.shortDescription}
                      </p>

                      {/* FEATURES */}
                      {visibleFeatures.length > 0 && (
                        <div className="mt-6 space-y-2.5">
                          {visibleFeatures.map(
                            (feature) => (
                              <div
                                key={feature.title}
                                className="flex items-center gap-2.5"
                              >
                                <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-white/[0.04]">
                                  <Check
                                    size={10}
                                    className="text-[#FFC400]"
                                    strokeWidth={2.5}
                                  />
                                </span>

                                <span className="line-clamp-1 text-xs text-neutral-400">
                                  {feature.title}
                                </span>
                              </div>
                            )
                          )}
                        </div>
                      )}
                    </div>

                    {/* CARD FOOTER */}
                    <div className="mt-auto pt-7">
                      <div className="mb-5 h-px bg-white/[0.06]" />

                      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
                        {/* PRICE */}
                        <div>
                          <p className="text-[9px] font-medium uppercase tracking-[0.15em] text-neutral-700">
                            {service.priceLabel ?? "Pricing"}
                          </p>

                          <p className="mt-1 text-base font-semibold text-white">
                            {service.startingPrice !== undefined
                              ? `₹${service.startingPrice.toLocaleString(
                                  "en-IN"
                                )}`
                              : "Custom quote"}
                          </p>
                        </div>

                        {/* ACTIONS */}
                        <div className="flex items-center gap-2.5">
                          {/* VIEW DETAILS */}
                          <Link
                            href={`/services/${service.slug}`}
                            className="group/details inline-flex h-10 items-center gap-1.5 rounded-full border border-white/[0.1] bg-white/[0.025] px-3.5 text-[10px] font-medium uppercase tracking-[0.08em] text-neutral-300 transition-all duration-300 hover:border-white/[0.2] hover:bg-white/[0.06] hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FFC400] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0A0A0A]"
                            aria-label={`View details for ${service.title}`}
                          >
                            Details

                            <ArrowUpRight
                              size={13}
                              className="transition-transform duration-300 group-hover/details:-translate-y-0.5 group-hover/details:translate-x-0.5"
                            />
                          </Link>

                          {/* GET A FREE QUOTE */}
                          <Link
                            href={quoteHref}
                            className="group/quote inline-flex h-10 items-center gap-1.5 rounded-full bg-[#FFC400] px-4 text-[10px] font-semibold uppercase tracking-[0.08em] text-black transition-all duration-300 hover:bg-[#FFD43B] hover:shadow-[0_0_30px_rgba(255,196,0,0.14)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FFC400] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0A0A0A]"
                            aria-label={`Get a free quote for ${service.title}`}
                          >
                            Get a Free Quote

                            <ArrowUpRight
                              size={13}
                              className="transition-transform duration-300 group-hover/quote:-translate-y-0.5 group-hover/quote:translate-x-0.5"
                            />
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        )}

        {/* BOTTOM NOTE */}
        {filteredServices.length > 0 && (
          <div className="mt-10 flex items-center justify-center">
            <p className="text-center text-[10px] uppercase tracking-[0.15em] text-neutral-700">
              Every project is scoped around your actual
              business requirements
            </p>
          </div>
        )}
      </div>
    </section>
  );
}