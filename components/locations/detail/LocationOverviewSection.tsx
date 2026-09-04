import {
  ArrowUpRight,
  Building2,
  MapPinned,
} from "lucide-react";

type LocationOverviewSectionProps = {
  name: string;
  description: string;
  city: string;
  state?: string;
  country: string;
  address?: string;
};

export default function LocationOverviewSection({
  name,
  description,
  city,
  state,
  country,
  address,
}: LocationOverviewSectionProps) {
  return (
    <section
      id="location-overview"
      aria-labelledby="location-overview-heading"
      className="relative border-b border-white/[0.06] bg-[#050505] py-20 sm:py-24 lg:py-28"
    >
      <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
        <div className="grid gap-12 lg:grid-cols-[0.7fr_1.3fr] lg:gap-20">
          {/* =================================================
              LABEL / SIDE CONTENT
          ================================================= */}

          <div>
            <div className="flex items-center gap-3">
              <span
                aria-hidden="true"
                className="flex h-9 w-9 items-center justify-center rounded-xl border border-white/[0.08] bg-white/[0.02] text-neutral-500"
              >
                <Building2 size={15} />
              </span>

              <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#FFC400]">
                About this location
              </span>
            </div>

            <h2
              id="location-overview-heading"
              className="mt-6 text-3xl font-semibold leading-[1.05] tracking-[-0.04em] text-white sm:text-4xl"
            >
              Built around
              <br />
              <span className="text-neutral-500">
                your local market.
              </span>
            </h2>

            <p className="mt-5 max-w-sm text-sm leading-6 text-neutral-600">
              Learn more about our presence in{" "}
              {city}
              {state ? `, ${state}` : ""} and the
              businesses we work with from this
              location.
            </p>
          </div>

          {/* =================================================
              MAIN CONTENT
          ================================================= */}

          <div>
            <div className="relative overflow-hidden rounded-[2rem] border border-white/[0.07] bg-[#090909] p-6 sm:p-8 lg:p-10">
              {/* TOP ACCENT */}

              <div
                aria-hidden="true"
                className="absolute left-8 right-8 top-0 h-px bg-gradient-to-r from-[#FFC400]/40 via-[#FFC400]/10 to-transparent"
              />

              {/* INTRO */}

              <div className="flex items-start gap-4">
                <span
                  aria-hidden="true"
                  className="mt-1 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-[#FFC400]/15 bg-[#FFC400]/[0.04] text-[#FFC400]"
                >
                  <MapPinned size={16} />
                </span>

                <div>
                  <p className="text-[9px] font-semibold uppercase tracking-[0.18em] text-neutral-700">
                    {country}
                  </p>

                  <h3 className="mt-2 text-xl font-semibold tracking-[-0.025em] text-white sm:text-2xl">
                    Aman Digital Solutions in{" "}
                    {name}
                  </h3>
                </div>
              </div>

              {/* DESCRIPTION */}

              <div className="mt-8 max-w-3xl">
                <p className="whitespace-pre-line text-sm leading-7 text-neutral-500 sm:text-base sm:leading-8">
                  {description}
                </p>
              </div>

              {/* LOCATION DETAILS */}

              <div className="mt-9 grid gap-3 sm:grid-cols-2">
                <div className="rounded-2xl border border-white/[0.06] bg-[#0C0C0C] p-4">
                  <p className="text-[8px] font-semibold uppercase tracking-[0.17em] text-neutral-700">
                    City
                  </p>

                  <p className="mt-2 text-sm font-medium text-white/75">
                    {city}
                  </p>
                </div>

                <div className="rounded-2xl border border-white/[0.06] bg-[#0C0C0C] p-4">
                  <p className="text-[8px] font-semibold uppercase tracking-[0.17em] text-neutral-700">
                    Country
                  </p>

                  <p className="mt-2 text-sm font-medium text-white/75">
                    {country}
                  </p>
                </div>

                {state && (
                  <div className="rounded-2xl border border-white/[0.06] bg-[#0C0C0C] p-4">
                    <p className="text-[8px] font-semibold uppercase tracking-[0.17em] text-neutral-700">
                      State / Region
                    </p>

                    <p className="mt-2 text-sm font-medium text-white/75">
                      {state}
                    </p>
                  </div>
                )}

                {address && (
                  <div className="rounded-2xl border border-white/[0.06] bg-[#0C0C0C] p-4 sm:col-span-2">
                    <p className="text-[8px] font-semibold uppercase tracking-[0.17em] text-neutral-700">
                      Address
                    </p>

                    <p className="mt-2 text-sm font-medium leading-6 text-white/75">
                      {address}
                    </p>
                  </div>
                )}
              </div>

              {/* INTERNAL SECTION LINK */}

              <div className="mt-8 border-t border-white/[0.06] pt-6">
                <a
                  href="#location-services"
                  aria-label="Explore services available in this location"
                  className="group inline-flex items-center gap-2 text-[9px] font-semibold uppercase tracking-[0.17em] text-neutral-600 transition-colors hover:text-[#FFC400] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FFC400] focus-visible:ring-offset-2 focus-visible:ring-offset-[#090909]"
                >
                  Explore services available here

                  <ArrowUpRight
                    aria-hidden="true"
                    size={13}
                    className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}