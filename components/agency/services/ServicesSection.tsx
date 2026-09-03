import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

import { connectDB } from "@/lib/db/connect";
import Service from "@/models/Service";

import ServicesIntro from "./ServicesIntro";
import ServiceCard from "./ServiceCard";

async function getServices() {
  await connectDB();

  const services = await Service.find({
    published: true,
  })
    .sort({
      featured: -1,
      displayOrder: 1,
      createdAt: -1,
    })
    .limit(3)
    .select(
      [
        "title",
        "slug",
        "shortDescription",
        "description",
        "icon",
        "image",
        "startingPrice",
        "priceLabel",
        "ctaLabel",
        "ctaLink",
        "featured",
        "displayOrder",
      ].join(" ")
    )
    .lean();

  return services.map((service) => ({
    id: service._id.toString(),

    title: service.title,

    slug: service.slug,

    shortDescription: service.shortDescription,

    description: service.description,

    icon: service.icon ?? null,

    image: service.image
      ? {
          url: service.image.url,
          publicId: service.image.publicId ?? null,
          alt: service.image.alt ?? service.title,
        }
      : null,

    startingPrice: service.startingPrice ?? null,

    priceLabel: service.priceLabel ?? null,

    ctaLabel: service.ctaLabel ?? "Explore service",

    ctaLink:
      service.ctaLink ??
      `/services/${service.slug}`,

    featured: service.featured,
  }));
}

export default async function ServicesSection() {
  const services = await getServices();

  if (services.length === 0) {
    return null;
  }

  return (
    <section
      id="services"
      aria-labelledby="services-heading"
      className="relative w-full max-w-full scroll-mt-28 overflow-x-clip border-t border-[#1A1A1A] bg-[#050505] py-24 sm:py-28 lg:py-32"
    >
      {/* Ambient glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-40 top-1/4 h-[420px] w-[420px] rounded-full bg-[#FFC400]/[0.025] blur-[140px]"
      />

      <div className="relative mx-auto w-full max-w-7xl min-w-0 px-5 sm:px-8 lg:px-10">
        <div className="grid min-w-0 gap-14 lg:grid-cols-[0.7fr_1.3fr] lg:gap-20">
          {/* LEFT — STICKY INTRO */}
          <div className="min-w-0 lg:sticky lg:top-32 lg:self-start">
            <ServicesIntro />
          </div>

          {/* RIGHT — SERVICE LIST */}
          <div className="min-w-0 space-y-5">
            {services.map((service, index) => (
              <ServiceCard
                key={service.id}
                service={service}
                index={index}
              />
            ))}

            {/* VIEW ALL */}
            <div className="flex justify-start pt-3 sm:justify-end">
              <Link
                href="/services"
                className="group inline-flex items-center gap-2 rounded-full border border-[#292929] bg-[#0A0A0A] px-5 py-3 text-xs font-medium tracking-wide text-[#CFCFCF] transition-all duration-300 hover:border-[#FFC400]/40 hover:bg-[#FFC400]/[0.06] hover:text-[#FFC400] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FFC400]/70"
              >
                View all services

                <ArrowUpRight
                  aria-hidden="true"
                  size={14}
                  className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}