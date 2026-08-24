import Link from "next/link";
import {
  ArrowUpRight,
  BriefcaseBusiness,
  ChevronRight,
  Sparkles,
} from "lucide-react";

export type LocationServiceData = {
  _id: string;
  title: string;
  slug: string;
  shortDescription?: string;
  category?: string;
};

type LocationServicesSectionProps = {
  services: LocationServiceData[];
};

export default function LocationServicesSection({
  services,
}: LocationServicesSectionProps) {
  if (!services?.length) {
    return null;
  }

  return (
    <section
      id="location-services"
      aria-labelledby="location-services-heading"
      className="relative border-b border-white/[0.06] bg-[#050505] py-20 sm:py-24 lg:py-28"
    >
      <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
        {/* =====================================================
            HEADER
        ===================================================== */}

        <div className="grid gap-6 lg:grid-cols-[0.8fr_1.2fr] lg:items-end">
          <div>
            <div className="flex items-center gap-3">
              <span className="flex h-9 w-9 items-center justify-center rounded-xl border border-[#FFC400]/20 bg-[#FFC400]/[0.05] text-[#FFC400]">
                <BriefcaseBusiness size={15} />
              </span>

              <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#FFC400]">
                Services available
              </span>
            </div>

            <h2
              id="location-services-heading"
              className="mt-6 text-3xl font-semibold leading-[1.05] tracking-[-0.04em] text-white sm:text-4xl lg:text-[3.1rem]"
            >
              Digital solutions
              <br />
              <span className="text-neutral-500">
                for your business.
              </span>
            </h2>
          </div>

          <p className="max-w-xl text-sm leading-7 text-neutral-500 lg:justify-self-end">
            Explore the services available for businesses in this
            location. Each solution is designed around a specific
            business need and growth goal.
          </p>
        </div>

        {/* =====================================================
            SERVICES GRID
        ===================================================== */}

        <div className="mt-14 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service, index) => (
            <Link
              key={service._id}
              href={`/services/${service.slug}`}
              className="group relative overflow-hidden rounded-3xl border border-white/[0.07] bg-[#090909] p-5 transition-all duration-300 hover:border-[#FFC400]/20 hover:bg-[#0A0A0A] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FFC400] sm:p-6"
            >
              {/* =================================================
                  TOP
              ================================================= */}

              <div className="flex items-start justify-between gap-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/[0.07] bg-white/[0.02] text-neutral-600 transition-all duration-300 group-hover:border-[#FFC400]/20 group-hover:bg-[#FFC400]/[0.05] group-hover:text-[#FFC400]">
                  <Sparkles size={15} />
                </div>

                <span className="text-[9px] font-medium tabular-nums tracking-[0.16em] text-neutral-800 transition-colors group-hover:text-neutral-600">
                  {String(index + 1).padStart(2, "0")}
                </span>
              </div>

              {/* =================================================
                  CATEGORY
              ================================================= */}

              {service.category && (
                <p className="mt-7 text-[8px] font-semibold uppercase tracking-[0.18em] text-[#FFC400]/70">
                  {service.category.replace(
                    /-/g,
                    " "
                  )}
                </p>
              )}

              {/* =================================================
                  TITLE
              ================================================= */}

              <h3 className="mt-2 text-lg font-semibold tracking-[-0.025em] text-white transition-colors duration-300 group-hover:text-[#FFC400]">
                {service.title}
              </h3>

              {/* =================================================
                  DESCRIPTION
              ================================================= */}

              {service.shortDescription && (
                <p className="mt-3 line-clamp-3 text-sm leading-6 text-neutral-600">
                  {service.shortDescription}
                </p>
              )}

              {/* =================================================
                  FOOTER
              ================================================= */}

              <div className="mt-7 flex items-center justify-between border-t border-white/[0.06] pt-5">
                <span className="text-[9px] font-semibold uppercase tracking-[0.17em] text-neutral-700 transition-colors group-hover:text-neutral-500">
                  Explore service
                </span>

                <span className="flex h-8 w-8 items-center justify-center rounded-full border border-white/[0.07] text-neutral-700 transition-all duration-300 group-hover:border-[#FFC400]/25 group-hover:bg-[#FFC400]/[0.05] group-hover:text-[#FFC400]">
                  <ArrowUpRight size={14} />
                </span>
              </div>

              {/* =================================================
                  BOTTOM ACCENT
              ================================================= */}

              <span
                aria-hidden="true"
                className="absolute bottom-0 left-6 h-px w-0 bg-gradient-to-r from-[#FFC400] to-transparent transition-all duration-500 group-hover:w-1/2"
              />
            </Link>
          ))}
        </div>

        {/* =====================================================
            SERVICES DIRECTORY LINK
        ===================================================== */}

        <div className="mt-8 flex justify-center">
          <Link
            href="/services"
            className="group inline-flex items-center gap-2 text-[9px] font-semibold uppercase tracking-[0.18em] text-neutral-700 transition-colors hover:text-[#FFC400]"
          >
            View all services

            <ChevronRight
              size={13}
              className="transition-transform duration-300 group-hover:translate-x-1"
            />
          </Link>
        </div>
      </div>
    </section>
  );
}