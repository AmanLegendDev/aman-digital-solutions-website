import Image from "next/image";
import Link from "next/link";
import {
  ArrowUpRight,
  Layers3,
  Sparkles,
} from "lucide-react";

export type RelatedServiceData = {
  id: string;
  title: string;
  slug: string;
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
};

type RelatedServicesSectionProps = {
  services: RelatedServiceData[];
};

const categoryLabels: Record<
  RelatedServiceData["category"],
  string
> = {
  websites: "Websites",
  "business-systems": "Business Systems",
  growth: "Growth",
  support: "Support",
};

export default function RelatedServicesSection({
  services,
}: RelatedServicesSectionProps) {
  if (!services.length) {
    return null;
  }

  return (
    <section
      id="related-services"
      aria-labelledby="related-services-heading"
      className="relative overflow-hidden border-t border-white/[0.06] bg-[#070707] py-20 sm:py-24 lg:py-28"
    >
      {/* AMBIENT BACKGROUND */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
      >
        <div className="absolute left-1/2 top-[-180px] h-[500px] w-[760px] -translate-x-1/2 rounded-full bg-[#FFC400]/[0.025] blur-[140px]" />

        <div className="absolute bottom-[-180px] right-[-120px] h-[400px] w-[400px] rounded-full bg-white/[0.015] blur-[120px]" />
      </div>

      {/* SUBTLE GRID */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.8) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.8) 1px, transparent 1px)",
          backgroundSize: "52px 52px",
        }}
      />

      <div className="relative mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
        {/* HEADER */}
        <div className="mb-10 flex flex-col gap-6 sm:mb-12 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-3xl">
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-[#FFC400]/15 bg-[#FFC400]/[0.04] px-3 py-1.5">
              <Sparkles
                size={13}
                className="text-[#FFC400]"
              />

              <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#FFC400]">
                Explore further
              </span>
            </div>

            <h2
              id="related-services-heading"
              className="text-3xl font-semibold tracking-[-0.045em] text-white sm:text-4xl lg:text-5xl"
            >
              More ways we can
              <span className="text-neutral-500">
                {" "}
                help your business.
              </span>
            </h2>

            <p className="mt-4 max-w-2xl text-sm leading-7 text-neutral-500 sm:text-base">
              Explore related digital solutions that can
              complement this service and support the next
              stage of your business.
            </p>
          </div>

          <Link
            href="/services"
            className="group inline-flex w-fit shrink-0 items-center gap-2 text-xs font-medium text-neutral-500 transition-colors hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FFC400] focus-visible:ring-offset-4 focus-visible:ring-offset-[#070707]"
          >
            View all services

            <ArrowUpRight
              size={14}
              className="transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
            />
          </Link>
        </div>

        {/* SERVICE GRID */}
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {services.map((service, index) => (
            <Link
              key={service.id}
              href={`/services/${service.slug}`}
              aria-label={`Explore ${service.title}`}
              className="group relative flex h-full flex-col overflow-hidden rounded-[26px] border border-white/[0.07] bg-[#0A0A0A] transition-all duration-500 hover:-translate-y-1 hover:border-[#FFC400]/20 hover:shadow-[0_25px_80px_rgba(0,0,0,0.35)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FFC400] focus-visible:ring-offset-4 focus-visible:ring-offset-[#070707]"
            >
              {/* IMAGE */}
              <div className="relative aspect-[16/10] overflow-hidden bg-[#101010]">
                {service.image?.url ? (
                  <Image
                    src={service.image.url}
                    alt={
                      service.image.alt ||
                      `${service.title} service`
                    }
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1280px) 33vw, 400px"
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.045]"
                  />
                ) : (
                  <div className="flex h-full items-center justify-center">
                    <Layers3
                      size={28}
                      className="text-neutral-800"
                    />
                  </div>
                )}

                <div
                  aria-hidden="true"
                  className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent"
                />

                {/* NUMBER */}
                <div className="absolute left-5 top-5 flex h-8 w-8 items-center justify-center rounded-full border border-white/10 bg-black/40 text-[9px] font-medium tabular-nums text-neutral-400 backdrop-blur-md">
                  {String(index + 1).padStart(2, "0")}
                </div>

                {/* CATEGORY */}
                <div className="absolute bottom-5 left-5">
                  <span className="rounded-full border border-white/10 bg-black/45 px-3 py-1.5 text-[9px] font-semibold uppercase tracking-[0.15em] text-white/75 backdrop-blur-xl">
                    {categoryLabels[service.category]}
                  </span>
                </div>

                {/* ARROW */}
                <div className="absolute right-5 top-5 flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-black/40 text-neutral-300 backdrop-blur-md transition-all duration-300 group-hover:border-[#FFC400]/30 group-hover:bg-[#FFC400] group-hover:text-black">
                  <ArrowUpRight
                    size={14}
                    className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                  />
                </div>
              </div>

              {/* CONTENT */}
              <div className="flex flex-1 flex-col p-6 sm:p-7">
                <div className="flex-1">
                  <p className="text-[9px] font-semibold uppercase tracking-[0.16em] text-[#FFC400]/70">
                    {categoryLabels[service.category]}
                  </p>

                  <h3 className="mt-3 text-xl font-semibold tracking-[-0.03em] text-white transition-colors duration-300 group-hover:text-[#FFC400]">
                    {service.title}
                  </h3>

                  <p className="mt-3 line-clamp-3 text-sm leading-6 text-neutral-500">
                    {service.shortDescription}
                  </p>
                </div>

                {/* FOOTER */}
                <div className="mt-7 flex items-center justify-between border-t border-white/[0.06] pt-5">
                  <span className="text-[10px] uppercase tracking-[0.12em] text-neutral-700">
                    Explore service
                  </span>

                  <span className="flex h-8 w-8 items-center justify-center rounded-full border border-white/[0.07] text-neutral-500 transition-all duration-300 group-hover:border-[#FFC400]/20 group-hover:bg-[#FFC400]/10 group-hover:text-[#FFC400]">
                    <ArrowUpRight size={14} />
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* BOTTOM NOTE */}
        <div className="mt-8 flex justify-center">
          <p className="text-center text-[10px] uppercase tracking-[0.15em] text-neutral-700">
            Digital solutions designed to work together
          </p>
        </div>
      </div>
    </section>
  );
}