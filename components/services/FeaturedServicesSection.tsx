"use client";

import Image from "next/image";
import Link from "next/link";
import {
  ArrowUpRight,
  Check,
  Sparkles,
} from "lucide-react";

export type FeaturedServiceCard = {
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

type FeaturedServicesProps = {
  services: FeaturedServiceCard[];
};

const categoryLabels: Record<
  FeaturedServiceCard["category"],
  string
> = {
  websites: "Websites",
  "business-systems": "Business Systems",
  growth: "Growth",
  support: "Support",
};

export default function FeaturedServices({
  services,
}: FeaturedServicesProps) {
  if (!services.length) {
    return null;
  }

  return (
    <section
      id="featured-services"
      aria-labelledby="featured-services-heading"
      className="relative overflow-hidden border-y border-white/[0.06] bg-[#070707] py-24 sm:py-32"
    >
      {/* BACKGROUND */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
      >
        <div className="absolute left-1/2 top-[-180px] h-[500px] w-[800px] -translate-x-1/2 rounded-full bg-[#FFC400]/[0.035] blur-[140px]" />

        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_20%,rgba(255,196,0,0.035),transparent_32%)]" />
      </div>

      <div className="relative mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
        {/* HEADER */}
        <div className="mb-12 flex flex-col gap-6 lg:mb-16 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-3xl">
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-[#FFC400]/15 bg-[#FFC400]/[0.04] px-3 py-1.5">
              <Sparkles
                size={13}
                className="text-[#FFC400]"
              />

              <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#FFC400]">
                Featured
              </span>
            </div>

            <h2
              id="featured-services-heading"
              className="text-3xl font-semibold tracking-[-0.04em] text-white sm:text-4xl lg:text-5xl"
            >
              Services designed to create{" "}
              <span className="text-neutral-500">
                measurable value.
              </span>
            </h2>
          </div>

          <p className="max-w-md text-sm leading-7 text-neutral-500">
            Our featured solutions combine strategy, design and
            technology to solve real business problems — not just
            add another website to the internet.
          </p>
        </div>

        {/* FEATURED CARDS */}
        <div className="space-y-8">
          {services.map((service, index) => {
            const featureList = service.features.slice(0, 4);

            const openService = () => {
              window.location.href = `/services/${service.slug}`;
            };

            const handleCardKeyDown = (
              event: React.KeyboardEvent<HTMLElement>
            ) => {
              if (
                event.key === "Enter" ||
                event.key === " "
              ) {
                event.preventDefault();
                openService();
              }
            };

            return (
              <article
                key={service.id}
                role="link"
                tabIndex={0}
                onClick={openService}
                onKeyDown={handleCardKeyDown}
                aria-label={`View ${service.title} service`}
                className="group relative cursor-pointer overflow-hidden rounded-[30px] border border-white/[0.08] bg-[#0B0B0B] transition-all duration-500 hover:border-[#FFC400]/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FFC400]/60"
              >
                {/* CARD GLOW */}
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute -right-40 -top-40 h-[420px] w-[420px] rounded-full bg-[#FFC400]/[0.025] blur-[110px] transition-all duration-700 group-hover:bg-[#FFC400]/[0.05]"
                />

                <div className="grid lg:grid-cols-[1fr_0.95fr]">
                  {/* CONTENT */}
                  <div className="relative flex flex-col justify-between p-7 sm:p-10 lg:p-12 xl:p-14">
                    <div>
                      {/* TOP META */}
                      <div className="mb-8 flex items-center gap-3">
                        <span className="text-[10px] font-medium tabular-nums tracking-[0.18em] text-neutral-600">
                          {String(index + 1).padStart(2, "0")}
                        </span>

                        <span className="h-px w-8 bg-[#FFC400]/30" />

                        <span className="text-[10px] font-semibold uppercase tracking-[0.16em] text-[#FFC400]">
                          {categoryLabels[service.category]}
                        </span>
                      </div>

                      {/* EYEBROW */}
                      {service.heroEyebrow && (
                        <p className="mb-4 max-w-lg text-xs font-medium uppercase tracking-[0.13em] text-neutral-500">
                          {service.heroEyebrow}
                        </p>
                      )}

                      {/* TITLE */}
                      <h3 className="max-w-xl text-3xl font-semibold leading-[1.08] tracking-[-0.045em] text-white sm:text-4xl lg:text-[44px]">
                        {service.title}
                      </h3>

                      {/* DESCRIPTION */}
                      <p className="mt-6 max-w-xl text-sm leading-7 text-neutral-400 sm:text-base sm:leading-8">
                        {service.shortDescription}
                      </p>

                      {/* FEATURES */}
                      {featureList.length > 0 && (
                        <div className="mt-9 grid gap-3 sm:grid-cols-2">
                          {featureList.map((feature) => (
                            <div
                              key={feature.title}
                              className="flex items-start gap-3"
                            >
                              <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#FFC400]/10">
                                <Check
                                  size={11}
                                  strokeWidth={2.5}
                                  className="text-[#FFC400]"
                                />
                              </span>

                              <span className="text-xs leading-5 text-neutral-400">
                                {feature.title}
                              </span>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>

                    {/* FOOTER */}
                    <div className="mt-10 flex flex-col gap-6 border-t border-white/[0.06] pt-7 sm:flex-row sm:items-center sm:justify-between">
                      {/* PRICE */}
                      <div>
                        <p className="text-[10px] font-medium uppercase tracking-[0.14em] text-neutral-600">
                          {service.priceLabel ??
                            "Pricing"}
                        </p>

                        <p className="mt-1 text-lg font-semibold tracking-tight text-white">
                          {service.startingPrice !==
                          undefined
                            ? `₹${service.startingPrice.toLocaleString(
                                "en-IN"
                              )}`
                            : "Custom quote"}
                        </p>
                      </div>

                      {/* ACTIONS */}
                      <div className="flex flex-wrap items-center gap-3">
                        {/* SERVICE DETAIL */}
                        <Link
                          href={`/services/${service.slug}`}
                          onClick={(event) =>
                            event.stopPropagation()
                          }
                          className="group/link inline-flex w-fit items-center gap-2 rounded-full border border-[#FFC400]/30 bg-[#FFC400]/[0.06] px-5 py-3 text-xs font-semibold text-[#FFC400] transition-all duration-300 hover:border-[#FFC400]/50 hover:bg-[#FFC400]/10"
                        >
                          View Service

                          <ArrowUpRight
                            size={15}
                            className="transition-transform duration-300 group-hover/link:-translate-y-0.5 group-hover/link:translate-x-0.5"
                          />
                        </Link>

                        {/* BOOKING */}
                        <Link
                          href="/start-a-project"
                          onClick={(event) =>
                            event.stopPropagation()
                          }
                          className="group/quote inline-flex w-fit items-center gap-2 rounded-full bg-[#FFC400] px-5 py-3 text-xs font-semibold text-black transition-all duration-300 hover:bg-[#FFD43B] hover:shadow-[0_0_30px_rgba(255,196,0,0.14)]"
                        >
                          Get a Free Quote

                          <ArrowUpRight
                            size={15}
                            className="transition-transform duration-300 group-hover/quote:-translate-y-0.5 group-hover/quote:translate-x-0.5"
                          />
                        </Link>
                      </div>
                    </div>
                  </div>

                  {/* IMAGE */}
                  <div className="relative min-h-[330px] overflow-hidden border-t border-white/[0.06] lg:min-h-[580px] lg:border-l lg:border-t-0">
                    {service.image?.url ? (
                      <Image
                        src={service.image.url}
                        alt={
                          service.image.alt ||
                          `${service.title} service`
                        }
                        fill
                        priority={index === 0}
                        sizes="(max-width: 1024px) 100vw, 50vw"
                        className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                      />
                    ) : (
                      <div className="flex h-full min-h-[330px] items-center justify-center bg-[#101010]">
                        <Sparkles
                          size={28}
                          className="text-[#FFC400]/40"
                        />
                      </div>
                    )}

                    {/* IMAGE GRADIENT */}
                    <div
                      aria-hidden="true"
                      className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/5 to-transparent"
                    />

                    {/* IMAGE LABEL */}
                    <div className="absolute bottom-6 left-6">
                      <div className="rounded-full border border-white/10 bg-black/40 px-3 py-1.5 backdrop-blur-xl">
                        <span className="text-[9px] font-medium uppercase tracking-[0.18em] text-white/70">
                          Aman Digital Solutions
                        </span>
                      </div>
                    </div>

                    {/* NUMBER */}
                    <div className="absolute right-6 top-6">
                      <span className="text-[10px] font-medium tabular-nums tracking-[0.18em] text-white/40">
                        FEATURED /{" "}
                        {String(index + 1).padStart(
                          2,
                          "0"
                        )}
                      </span>
                    </div>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}