"use client";

import Link from "next/link";
import { ArrowUpRight, MapPin } from "lucide-react";

export type LocationCardData = {
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
};

type AllLocationsSectionProps = {
  locations: LocationCardData[];
};

export default function AllLocationsSection({
  locations,
}: AllLocationsSectionProps) {
  if (!locations?.length) {
    return (
      <section className="border-b border-white/[0.06] bg-[#050505] py-20 sm:py-24">
        <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
          <div className="rounded-3xl border border-white/[0.06] bg-[#090909] px-6 py-16 text-center">
            <MapPin
              size={28}
              strokeWidth={1.2}
              className="mx-auto text-neutral-700"
            />

            <h2 className="mt-5 text-xl font-semibold text-white">
              No locations available yet.
            </h2>

            <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-neutral-600">
              We are currently expanding our local presence.
              Check back soon for more locations.
            </p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section
      aria-labelledby="all-locations-heading"
      className="relative border-b border-white/[0.06] bg-[#050505] py-20 sm:py-24 lg:py-28"
    >
      <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
        {/* =====================================================
            HEADER
        ===================================================== */}

        <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#FFC400]">
              Our locations
            </p>

            <h2
              id="all-locations-heading"
              className="mt-3 text-3xl font-semibold tracking-[-0.04em] text-white sm:text-4xl"
            >
              Find us where
              <span className="text-neutral-500">
                {" "}
                your business is.
              </span>
            </h2>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-2xl font-semibold tracking-[-0.03em] text-white">
              {String(locations.length).padStart(2, "0")}
            </span>

            <span className="text-[9px] font-medium uppercase tracking-[0.16em] text-neutral-700">
              {locations.length === 1
                ? "Location"
                : "Locations"}
            </span>
          </div>
        </div>

        {/* =====================================================
            LOCATION GRID
        ===================================================== */}

        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {locations.map((location, index) => (
            <Link
              key={location._id}
              href={`/locations/${location.slug}`}
              className="group relative overflow-hidden rounded-3xl border border-white/[0.07] bg-[#090909] transition-all duration-300 hover:border-[#FFC400]/20 hover:bg-[#0A0A0A] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FFC400]"
            >
              {/* =================================================
                  IMAGE
              ================================================= */}

              <div className="relative aspect-[16/10] overflow-hidden bg-[#0C0C0C]">
                {location.image?.url ? (
                  <img
                    src={location.image.url}
                    alt={
                      location.image.alt ||
                      `${location.name} location`
                    }
                    loading={index < 3 ? "eager" : "lazy"}
                    className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center">
                    <MapPin
                      size={30}
                      strokeWidth={1.2}
                      className="text-neutral-700"
                    />
                  </div>
                )}

                <div
                  aria-hidden="true"
                  className="absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-transparent"
                />

                {/* NUMBER */}

                <div className="absolute left-4 top-4 flex h-8 w-8 items-center justify-center rounded-full border border-white/10 bg-black/35 backdrop-blur-md">
                  <span className="text-[8px] font-semibold tabular-nums text-white/50">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                </div>
              </div>

              {/* =================================================
                  CONTENT
              ================================================= */}

              <div className="p-5 sm:p-6">
                {/* LOCATION META */}

                <div className="flex items-center gap-2">
                  <MapPin
                    size={12}
                    className="shrink-0 text-[#FFC400]"
                  />

                  <span className="text-[9px] font-semibold uppercase tracking-[0.16em] text-[#FFC400]">
                    {location.city}
                    {location.state
                      ? ` · ${location.state}`
                      : ""}
                  </span>
                </div>

                {/* TITLE + ARROW */}

                <div className="mt-3 flex items-start justify-between gap-4">
                  <h3 className="text-lg font-semibold tracking-[-0.025em] text-white transition-colors duration-300 group-hover:text-[#FFC400]">
                    {location.name}
                  </h3>

                  <span
                    aria-hidden="true"
                    className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-white/[0.08] bg-white/[0.02] text-neutral-600 transition-all duration-300 group-hover:border-[#FFC400]/30 group-hover:bg-[#FFC400]/[0.05] group-hover:text-[#FFC400]"
                  >
                    <ArrowUpRight size={15} />
                  </span>
                </div>

                {/* DESCRIPTION */}

                <p className="mt-3 line-clamp-2 text-sm leading-6 text-neutral-600">
                  {location.shortDescription}
                </p>

                {/* ADDRESS */}

                <div className="mt-5 border-t border-white/[0.06] pt-4">
                  <p className="truncate text-[9px] font-medium uppercase tracking-[0.12em] text-neutral-700">
                    {location.address ||
                      `${location.city}${
                        location.state
                          ? `, ${location.state}`
                          : ""
                      }, ${location.country}`}
                  </p>
                </div>

                {/* BOTTOM LINK */}

                <div className="mt-5 flex items-center justify-between">
                  <span className="text-[9px] font-semibold uppercase tracking-[0.17em] text-neutral-700 transition-colors group-hover:text-neutral-500">
                    View location
                  </span>

                  <span
                    aria-hidden="true"
                    className="h-px w-0 bg-[#FFC400] transition-all duration-500 group-hover:w-10"
                  />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}