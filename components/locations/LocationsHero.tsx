"use client";

import { ArrowDown, MapPin, Sparkles } from "lucide-react";

type LocationsHeroProps = {
  locationCount?: number;
  featuredLocation?: string;
};

export default function LocationsHero({
  locationCount = 0,
  featuredLocation,
}: LocationsHeroProps) {
  return (
    <section
      aria-labelledby="locations-hero-heading"
      className="relative overflow-hidden border-b border-white/[0.06] bg-[#050505]"
    >
      {/* =====================================================
          BACKGROUND ATMOSPHERE
      ===================================================== */}

      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
      >
        <div className="absolute left-1/2 top-[-180px] h-[420px] w-[720px] -translate-x-1/2 rounded-full bg-[#FFC400]/[0.045] blur-[120px]" />

        <div className="absolute right-[-160px] top-[35%] h-[320px] w-[320px] rounded-full bg-white/[0.02] blur-[100px]" />

        <div
          className="absolute inset-0 opacity-[0.035]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)",
            backgroundSize: "72px 72px",
          }}
        />
      </div>

      {/* =====================================================
          CONTENT
      ===================================================== */}

      <div className="relative mx-auto max-w-7xl px-5 pb-16 pt-24 sm:px-8 sm:pb-20 sm:pt-28 lg:px-10 lg:pb-24 lg:pt-36">
        <div className="grid gap-12 lg:grid-cols-[1.15fr_0.85fr] lg:items-end">
          {/* =================================================
              LEFT
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

              <span className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[#FFC400]">
                Where we work
              </span>
            </div>

            {/* HEADING */}

            <h1
              id="locations-hero-heading"
              className="mt-7 max-w-4xl text-[2.7rem] font-semibold leading-[0.98] tracking-[-0.055em] text-white sm:text-5xl lg:text-[5.4rem]"
            >
              Digital solutions,
              <br />
              <span className="text-neutral-500">
                built for your market.
              </span>
            </h1>

            {/* DESCRIPTION */}

            <p className="mt-7 max-w-2xl text-sm leading-7 text-neutral-500 sm:text-base sm:leading-8">
              Explore the locations we serve and discover digital
              solutions designed around the businesses, customers
              and markets in each place.
            </p>

            {/* META */}

            <div className="mt-8 flex flex-wrap items-center gap-3">
              <div className="inline-flex items-center gap-2 rounded-full border border-white/[0.08] bg-white/[0.025] px-4 py-2.5">
                <span className="h-1.5 w-1.5 rounded-full bg-[#FFC400]" />

                <span className="text-[10px] font-medium uppercase tracking-[0.15em] text-neutral-400">
                  {locationCount > 0
                    ? `${locationCount} ${
                        locationCount === 1
                          ? "location"
                          : "locations"
                      }`
                    : "Growing network"}
                </span>
              </div>

              {featuredLocation && (
                <div className="inline-flex items-center gap-2 rounded-full border border-white/[0.06] bg-white/[0.02] px-4 py-2.5">
                  <Sparkles
                    size={12}
                    className="text-[#FFC400]"
                  />

                  <span className="text-[10px] font-medium uppercase tracking-[0.12em] text-neutral-500">
                    Featured · {featuredLocation}
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* =================================================
              RIGHT — LOCATION SIGNAL
          ================================================= */}

          <div className="lg:justify-self-end">
            <div className="relative max-w-md overflow-hidden rounded-[2rem] border border-white/[0.08] bg-[#090909] p-6 sm:p-7">
              {/* ACCENT */}

              <div
                aria-hidden="true"
                className="absolute right-[-40px] top-[-40px] h-32 w-32 rounded-full bg-[#FFC400]/[0.07] blur-3xl"
              />

              <div className="relative">
                <div className="flex items-center justify-between">
                  <span className="text-[9px] font-semibold uppercase tracking-[0.2em] text-neutral-600">
                    Local presence
                  </span>

                  <span
                    aria-hidden="true"
                    className="flex h-8 w-8 items-center justify-center rounded-full border border-white/[0.07] bg-white/[0.02]"
                  >
                    <MapPin
                      size={13}
                      className="text-[#FFC400]"
                    />
                  </span>
                </div>

                <div className="mt-10">
                  <div className="flex items-end gap-3">
                    <span className="text-5xl font-semibold tracking-[-0.05em] text-white sm:text-6xl">
                      {String(locationCount).padStart(2, "0")}
                    </span>

                    <span className="mb-2 text-xs uppercase tracking-[0.16em] text-neutral-600">
                      active
                      <br />
                      locations
                    </span>
                  </div>

                  <div className="mt-6 h-px bg-white/[0.07]" />

                  <p className="mt-5 text-xs leading-6 text-neutral-600">
                    From local businesses to growing brands,
                    we build digital experiences with the market
                    and customer in mind.
                  </p>
                </div>

                {/* SCROLL CUE */}

                <div className="mt-8 flex items-center gap-3">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full border border-white/[0.07] text-neutral-600">
                    <ArrowDown size={13} />
                  </div>

                  <span className="text-[9px] font-medium uppercase tracking-[0.18em] text-neutral-700">
                    Explore locations
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* =================================================
            BOTTOM LINE
        ================================================= */}

        <div className="mt-16 flex items-center gap-4 sm:mt-20">
          <span className="h-px flex-1 bg-white/[0.07]" />

          <span className="text-[9px] font-medium uppercase tracking-[0.2em] text-neutral-700">
            Aman Digital Solutions
          </span>

          <span className="h-px flex-1 bg-white/[0.07]" />
        </div>
      </div>
    </section>
  );
}