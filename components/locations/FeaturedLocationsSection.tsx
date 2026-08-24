"use client";

import Link from "next/link";
import {
  ArrowUpRight,
  MapPin,
  Navigation,
  Sparkles,
} from "lucide-react";

export type FeaturedLocationData = {
  _id: string;
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

  featured: boolean;
};

type FeaturedLocationsSectionProps = {
  locations: FeaturedLocationData[];
};

export default function FeaturedLocationsSection({
  locations,
}: FeaturedLocationsSectionProps) {
  if (!locations?.length) {
    return null;
  }

  return (
    <section
      aria-labelledby="featured-locations-heading"
      className="relative overflow-hidden border-b border-white/[0.06] bg-[#050505] py-20 sm:py-24 lg:py-28"
    >
      {/* =====================================================
          BACKGROUND
      ===================================================== */}

      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-0 h-[420px] w-[760px] -translate-x-1/2 rounded-full bg-[#FFC400]/[0.025] blur-[120px]"
      />

      <div className="relative mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
        {/* =================================================
            HEADER
        ================================================= */}

        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <div className="flex items-center gap-3">
              <span
                aria-hidden="true"
                className="flex h-8 w-8 items-center justify-center rounded-xl border border-[#FFC400]/20 bg-[#FFC400]/[0.05] text-[#FFC400]"
              >
                <Sparkles size={14} />
              </span>

              <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#FFC400]">
                Featured locations
              </span>
            </div>

            <h2
              id="featured-locations-heading"
              className="mt-5 text-3xl font-semibold leading-[1.05] tracking-[-0.04em] text-white sm:text-4xl lg:text-[3.2rem]"
            >
              Closer to the
              <br />
              <span className="text-neutral-500">
                businesses we serve.
              </span>
            </h2>
          </div>

          <p className="max-w-md text-sm leading-7 text-neutral-600">
            Explore selected locations and see how our digital
            solutions are built around local businesses and their
            customers.
          </p>
        </div>

        {/* =================================================
            FEATURED GRID
        ================================================= */}

        <div
          className={[
            "mt-14 grid gap-5",
            locations.length === 1
              ? "lg:grid-cols-1"
              : locations.length === 2
                ? "lg:grid-cols-2"
                : "lg:grid-cols-12",
          ].join(" ")}
        >
          {locations.map((location, index) => {
            const large =
              locations.length >= 3 && index === 0;

            return (
              <Link
                key={location._id}
                href={`/locations/${location.slug}`}
                className={[
                  "group relative block overflow-hidden rounded-[2rem] border border-white/[0.07] bg-[#090909]",
                  "transition-all duration-500",
                  "hover:border-[#FFC400]/20 hover:bg-[#0A0A0A]",
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FFC400]",
                  large
                    ? "lg:col-span-7"
                    : locations.length >= 3
                      ? "lg:col-span-5"
                      : "",
                ].join(" ")}
              >
                {/* =================================================
                    IMAGE
                    NO TEXT OVER IMAGE
                ================================================= */}

                <div
                  className={[
                    "relative overflow-hidden bg-[#0C0C0C]",
                    large
                      ? "aspect-[16/10]"
                      : "aspect-[16/10]",
                  ].join(" ")}
                >
                  {location.image?.url ? (
                    <img
                      src={location.image.url}
                      alt={
                        location.image.alt ||
                        `${location.name} location`
                      }
                      loading={index === 0 ? "eager" : "lazy"}
                      className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.035]"
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center bg-[#0A0A0A]">
                      <MapPin
                        size={34}
                        strokeWidth={1}
                        className="text-neutral-700"
                      />
                    </div>
                  )}

                  {/* IMAGE EDGE FADE — purely visual */}

                  <div
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-60"
                  />

                  {/* IMAGE NUMBER */}

                  <div className="absolute right-5 top-5 flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-black/35 backdrop-blur-md">
                    <span className="text-[9px] font-medium tabular-nums text-white/60">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                  </div>
                </div>

                {/* =================================================
                    CONTENT
                ================================================= */}

                <div className="p-6 sm:p-7">
                  <div className="flex items-start justify-between gap-5">
                    <div className="min-w-0">
                      {/* LOCATION */}

                      <div className="flex items-center gap-2">
                        <MapPin
                          size={13}
                          className="shrink-0 text-[#FFC400]"
                        />

                        <span className="truncate text-[9px] font-semibold uppercase tracking-[0.17em] text-[#FFC400]">
                          {location.city}
                          {location.state
                            ? ` · ${location.state}`
                            : ""}
                        </span>
                      </div>

                      {/* TITLE */}

                      <h3 className="mt-3 text-xl font-semibold tracking-[-0.025em] text-white transition-colors duration-300 group-hover:text-[#FFC400] sm:text-2xl">
                        {location.name}
                      </h3>
                    </div>

                    {/* ARROW */}

                    <span
                      aria-hidden="true"
                      className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white/[0.08] bg-white/[0.02] text-neutral-500 transition-all duration-300 group-hover:border-[#FFC400]/30 group-hover:bg-[#FFC400]/[0.06] group-hover:text-[#FFC400]"
                    >
                      <ArrowUpRight size={16} />
                    </span>
                  </div>

                  {/* DESCRIPTION */}

                  <p className="mt-4 max-w-2xl text-sm leading-6 text-neutral-500">
                    {location.shortDescription}
                  </p>

                  {/* META */}

                  <div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-3 border-t border-white/[0.06] pt-5">
                    <div className="flex items-center gap-2">
                      <Navigation
                        size={12}
                        className="text-neutral-700"
                      />

                      <span className="text-[9px] font-medium uppercase tracking-[0.14em] text-neutral-600">
                        {location.country}
                      </span>
                    </div>

                    {location.address && (
                      <>
                        <span
                          aria-hidden="true"
                          className="h-1 w-1 rounded-full bg-neutral-800"
                        />

                        <span className="max-w-[260px] truncate text-[9px] font-medium uppercase tracking-[0.12em] text-neutral-700">
                          {location.address}
                        </span>
                      </>
                    )}
                  </div>

                  {/* BOTTOM ACCENT */}

                  <div className="mt-6 flex items-center justify-between">
                    <span className="text-[9px] font-semibold uppercase tracking-[0.18em] text-neutral-700 transition-colors duration-300 group-hover:text-neutral-500">
                      Explore location
                    </span>

                    <span
                      aria-hidden="true"
                      className="h-px w-0 bg-gradient-to-r from-[#FFC400] to-transparent transition-all duration-500 group-hover:w-24"
                    />
                  </div>
                </div>
              </Link>
            );
          })}
        </div>

        {/* =================================================
            FOOTER NOTE
        ================================================= */}

        <div className="mt-8 flex items-center gap-4">
          <span className="h-px flex-1 bg-white/[0.06]" />

          <span className="text-[9px] font-medium uppercase tracking-[0.18em] text-neutral-700">
            Local presence · Digital expertise
          </span>

          <span className="h-px flex-1 bg-white/[0.06]" />
        </div>
      </div>
    </section>
  );
}