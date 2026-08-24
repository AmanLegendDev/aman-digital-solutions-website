import Link from "next/link";
import {
  ArrowRight,
  ArrowUpRight,
  BriefcaseBusiness,
  ExternalLink,
} from "lucide-react";

export type RelatedProjectService = {
  _id: string;
  title: string;
  slug: string;
  shortDescription?: string;
  category?: string;
};

type ProjectRelatedServicesSectionProps = {
  services: RelatedProjectService[];
};

const categoryLabels: Record<string, string> = {
  websites: "Websites",
  "business-systems": "Business Systems",
  growth: "Growth",
  support: "Support",
};

export default function ProjectRelatedServicesSection({
  services,
}: ProjectRelatedServicesSectionProps) {
  if (!services?.length) {
    return null;
  }

  return (
    <section
      id="project-services"
      aria-labelledby="project-services-heading"
      className="relative border-t border-white/[0.06] bg-[#070707] py-20 sm:py-24 lg:py-28"
    >
      <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
        {/* =================================================
            HEADER
        ================================================= */}

        <div className="grid gap-6 lg:grid-cols-[0.8fr_1.2fr] lg:items-end">
          <div>
            <div className="flex items-center gap-3">
              <span
                aria-hidden="true"
                className="flex h-8 w-8 items-center justify-center rounded-xl border border-[#FFC400]/20 bg-[#FFC400]/[0.05] text-[#FFC400]"
              >
                <BriefcaseBusiness size={14} />
              </span>

              <span className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[#FFC400]">
                Related services
              </span>
            </div>

            <h2
              id="project-services-heading"
              className="mt-5 text-3xl font-semibold leading-[1.05] tracking-[-0.045em] text-white sm:text-4xl lg:text-[3.2rem]"
            >
              The services
              <br />
              <span className="text-neutral-500">
                behind the work.
              </span>
            </h2>
          </div>

          <p className="max-w-xl text-sm leading-7 text-neutral-500 lg:justify-self-end">
            Explore the capabilities used to bring this
            project together and see how we can apply the same
            thinking to your business.
          </p>
        </div>

        {/* =================================================
            SERVICE CARDS
        ================================================= */}

        <div
          className={[
            "mt-14 grid gap-3",
            services.length === 1
              ? "max-w-2xl"
              : "sm:grid-cols-2",
          ].join(" ")}
        >
          {services.map((service, index) => {
            const category =
              service.category &&
              categoryLabels[service.category]
                ? categoryLabels[service.category]
                : service.category;

            return (
              <Link
                key={service._id}
                href={`/services/${service.slug}`}
                className="group relative overflow-hidden rounded-[26px] border border-white/[0.07] bg-[#090909] p-6 transition-all duration-300 hover:-translate-y-1 hover:border-[#FFC400]/25 hover:bg-[#0A0A0A] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FFC400] sm:p-7"
              >
                {/* GLOW */}

                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute -right-10 -top-10 h-28 w-28 rounded-full bg-[#FFC400]/[0.025] blur-3xl transition-all duration-500 group-hover:bg-[#FFC400]/[0.07]"
                />

                <div className="relative">
                  {/* TOP */}

                  <div className="flex items-start justify-between gap-4">
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-white/[0.07] bg-white/[0.02] text-neutral-500 transition-all duration-300 group-hover:border-[#FFC400]/20 group-hover:bg-[#FFC400]/[0.05] group-hover:text-[#FFC400]">
                      <BriefcaseBusiness size={17} />
                    </div>

                    <span className="text-[9px] font-semibold tabular-nums tracking-[0.18em] text-neutral-800 transition-colors duration-300 group-hover:text-[#FFC400]/50">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                  </div>

                  {/* CONTENT */}

                  <div className="mt-8">
                    {category && (
                      <span className="inline-flex rounded-full border border-[#FFC400]/10 bg-[#FFC400]/[0.04] px-2.5 py-1 text-[8px] font-semibold uppercase tracking-[0.15em] text-[#FFC400]/70">
                        {category}
                      </span>
                    )}

                    <h3 className="mt-4 text-lg font-semibold tracking-[-0.025em] text-white transition-colors duration-300 group-hover:text-[#FFC400]">
                      {service.title}
                    </h3>

                    {service.shortDescription && (
                      <p className="mt-3 max-w-xl text-sm leading-6 text-neutral-500">
                        {service.shortDescription}
                      </p>
                    )}
                  </div>

                  {/* FOOTER */}

                  <div className="mt-8 flex items-center justify-between border-t border-white/[0.05] pt-4">
                    <span className="flex items-center gap-2 text-[9px] font-semibold uppercase tracking-[0.15em] text-neutral-700 transition-colors duration-300 group-hover:text-neutral-500">
                      Explore service
                      <ExternalLink size={11} />
                    </span>

                    <span className="flex h-8 w-8 items-center justify-center rounded-full border border-white/[0.06] bg-white/[0.02] text-neutral-700 transition-all duration-300 group-hover:border-[#FFC400]/20 group-hover:bg-[#FFC400]/[0.06] group-hover:text-[#FFC400]">
                      <ArrowUpRight
                        size={14}
                        className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                      />
                    </span>
                  </div>
                </div>

                {/* ACCENT */}

                <span
                  aria-hidden="true"
                  className="absolute bottom-0 left-7 h-px w-0 bg-gradient-to-r from-[#FFC400] to-transparent transition-all duration-500 group-hover:w-1/2"
                />
              </Link>
            );
          })}
        </div>

        {/* =================================================
            ALL SERVICES LINK
        ================================================= */}

        <div className="mt-6 flex justify-center">
          <Link
            href="/services"
            className="group inline-flex items-center gap-2 rounded-full border border-white/[0.07] bg-[#090909] px-5 py-3 text-[10px] font-semibold uppercase tracking-[0.16em] text-neutral-500 transition-all duration-300 hover:border-[#FFC400]/25 hover:bg-[#0A0A0A] hover:text-[#FFC400]"
          >
            View all services

            <ArrowRight
              size={13}
              className="transition-transform duration-300 group-hover:translate-x-1"
            />
          </Link>
        </div>
      </div>
    </section>
  );
}