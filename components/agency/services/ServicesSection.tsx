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
    .select(
      "title slug shortDescription description icon image startingPrice priceLabel ctaLabel ctaLink featured displayOrder"
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
    ctaLink: service.ctaLink ?? `/services/${service.slug}`,
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
  className="relative scroll-mt-28 overflow-hidden border-t border-[#1A1A1A] bg-[#050505] py-24 sm:py-28 lg:py-32"
>
      {/* Ambient background */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-40 top-1/4 h-[420px] w-[420px] rounded-full bg-[#FFC400]/[0.025] blur-[140px]"
      />

      <div className="relative mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
        <div className="grid gap-14 lg:grid-cols-[0.7fr_1.3fr] lg:gap-20">
          {/* INTRO */}
          <div className="lg:sticky lg:top-32 lg:self-start">
            <ServicesIntro />
          </div>

          {/* SERVICES */}
          <div className="border-t border-[#202020]">
            {services.map((service, index) => (
              <ServiceCard
                key={service.id}
                service={service}
                index={index}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}