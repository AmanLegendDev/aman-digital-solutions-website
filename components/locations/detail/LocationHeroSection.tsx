import Image from "next/image";
import Link from "next/link";

import {
  ArrowRight,
  ChevronRight,
  MapPin,
  Navigation,
} from "lucide-react";

/* =========================================================
   TYPES
========================================================= */

export type LocationHeroData = {
  name: string;
  slug: string;

  shortDescription: string;

  image?: {
    url: string;
    publicId?: string;
    alt?: string;
  };

  city: string;
  state?: string;
  country: string;

  address?: string;
};

type LocationHeroSectionProps = {
  location: LocationHeroData;
};

/* =========================================================
   COMPONENT
========================================================= */

export default function LocationHeroSection({
  location,
}: LocationHeroSectionProps) {
  const imageAlt =
    location.image?.alt?.trim() ||
    `${location.name} - Aman Digital Solutions`;

  return (
    <section
      aria-labelledby="location-hero-heading"
      className="relative overflow-hidden border-b border-white/[0.06] bg-[#050505]"
    >
      {/* =====================================================
          BACKGROUND
      ===================================================== */}

      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-0 h-[500px] w-[800px] -translate-x-1/2 rounded-full bg-[#FFC400]/[0.025] blur-[130px]"
      />

      <div className="relative mx-auto max-w-7xl px-5 pb-16 pt-28 sm:px-8 sm:pb-20 sm:pt-32 lg:px-10 lg:pb-24 lg:pt-36">
        {/* =================================================
            BREADCRUMB
        ================================================= */}

        <nav
          aria-label="Breadcrumb"
          className="mb-10"
        >
          <ol className="flex flex-wrap items-center gap-2 text-[9px] font-medium uppercase tracking-[0.15em]">
            <li>
              <Link
                href="/"
                className="text-neutral-700 transition-colors hover:text-neutral-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FFC400]"
              >
                Home
              </Link>
            </li>

            <li
              aria-hidden="true"
              className="text-neutral-800"
            >
              <ChevronRight size={12} />
            </li>

            <li>
              <Link
                href="/locations"
                className="text-neutral-700 transition-colors hover:text-neutral-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FFC400]"
              >
                Locations
              </Link>
            </li>

            <li
              aria-hidden="true"
              className="text-neutral-800"
            >
              <ChevronRight size={12} />
            </li>

            <li
              aria-current="page"
              className="max-w-[220px] truncate text-[#FFC400]"
            >
              {location.name}
            </li>
          </ol>
        </nav>

        {/* =================================================
            HERO GRID
        ================================================= */}

        <div className="grid items-center gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
          {/* =================================================
              CONTENT
          ================================================= */}

          <div>
            {/* EYEBROW */}

            <div className="flex items-center gap-3">
              <span
                aria-hidden="true"
                className="flex h-9 w-9 items-center justify-center rounded-xl border border-[#FFC400]/20 bg-[#FFC400]/[0.05] text-[#FFC400]"
              >
                <MapPin size={15} />
              </span>

              <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#FFC400]">
                Our presence
              </span>
            </div>

            {/* LOCATION */}

            <div className="mt-7 flex items-center gap-2">
              <Navigation
                aria-hidden="true"
                size={13}
                className="text-neutral-600"
              />

              <span className="text-[10px] font-medium uppercase tracking-[0.16em] text-neutral-500">
                {location.city}
                {location.state
                  ? ` · ${location.state}`
                  : ""}
                {" · "}
                {location.country}
              </span>
            </div>

            {/* TITLE */}

            <h1
              id="location-hero-heading"
              className="mt-4 max-w-2xl text-4xl font-semibold leading-[0.98] tracking-[-0.05em] text-white sm:text-5xl lg:text-[4.5rem]"
            >
              {location.name}
            </h1>

            {/* DESCRIPTION */}

            <p className="mt-6 max-w-xl text-base leading-7 text-neutral-500 sm:text-lg sm:leading-8">
              {location.shortDescription}
            </p>

            {/* ADDRESS */}

            {location.address && (
              <div className="mt-7 flex max-w-md items-start gap-3">
                <MapPin
                  aria-hidden="true"
                  size={14}
                  className="mt-0.5 shrink-0 text-neutral-700"
                />

                <span className="text-xs leading-5 text-neutral-600">
                  {location.address}
                </span>
              </div>
            )}

            {/* ACTIONS */}

            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/start-a-project"
                aria-label={`Start a project with Aman Digital Solutions in ${location.name}`}
                className="group inline-flex items-center justify-center gap-3 rounded-xl bg-[#FFC400] px-5 py-3.5 text-xs font-semibold text-black transition-all duration-300 hover:bg-[#FFD23D] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FFC400] focus-visible:ring-offset-2 focus-visible:ring-offset-[#050505]"
              >
                Start a project

                <ArrowRight
                  aria-hidden="true"
                  size={15}
                  className="transition-transform duration-300 group-hover:translate-x-1"
                />
              </Link>

              <Link
                href="/locations"
                aria-label="Explore all locations served by Aman Digital Solutions"
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/[0.08] bg-white/[0.02] px-5 py-3.5 text-xs font-semibold text-white/70 transition-all duration-300 hover:border-white/[0.15] hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FFC400] focus-visible:ring-offset-2 focus-visible:ring-offset-[#050505]"
              >
                Explore locations
              </Link>
            </div>
          </div>

          {/* =================================================
              IMAGE
          ================================================= */}

          <div className="relative">
            <div className="overflow-hidden rounded-[2rem] border border-white/[0.08] bg-[#090909]">
              <div className="relative aspect-[16/11] overflow-hidden">
                {location.image?.url ? (
                  <Image
                    src={location.image.url}
                    alt={imageAlt}
                    fill
                    priority
                    sizes="(max-width: 1023px) 100vw, 55vw"
                    className="object-cover"
                  />
                ) : (
                  <div
                    aria-hidden="true"
                    className="flex h-full w-full items-center justify-center bg-[#0A0A0A]"
                  >
                    <MapPin
                      size={42}
                      strokeWidth={1}
                      className="text-neutral-700"
                    />
                  </div>
                )}

                <div
                  aria-hidden="true"
                  className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent"
                />
              </div>

              {/* IMAGE META */}

              <div className="flex items-center justify-between gap-4 border-t border-white/[0.06] bg-[#090909] px-5 py-4 sm:px-6">
                <div>
                  <p className="text-[8px] font-semibold uppercase tracking-[0.18em] text-[#FFC400]">
                    Location
                  </p>

                  <p className="mt-1 text-xs font-medium text-white/60">
                    {location.city}
                    {location.state
                      ? `, ${location.state}`
                      : ""}
                  </p>
                </div>

                <div
                  aria-hidden="true"
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-white/[0.08] text-neutral-600"
                >
                  <MapPin size={14} />
                </div>
              </div>
            </div>

            {/* DECORATIVE EDGE */}

            <div
              aria-hidden="true"
              className="absolute -bottom-3 -right-3 -z-10 h-32 w-32 rounded-full bg-[#FFC400]/[0.04] blur-3xl"
            />
          </div>
        </div>
      </div>
    </section>
  );
}