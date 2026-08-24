import { connectDB } from "@/lib/db/connect";
import Service from "@/models/Service";

import ServicesPageClient from "@/components/services/ServicesPageClient";

export const metadata = {
  title: "Services | Aman Digital Solutions",
  description:
    "Explore website development, business systems, growth and ongoing digital support services from Aman Digital Solutions.",
};

export default async function ServicesPage() {
  await connectDB();

  const services = await Service.find({
    published: true,
  })
    .sort({
      featured: -1,
      displayOrder: 1,
      createdAt: -1,
    })
    .lean();

  const featuredServices = services
    .filter((service) => service.featured)
    .map((service) => ({
      id: String(service._id),
      title: service.title,
      slug: service.slug,
      heroEyebrow: service.heroEyebrow,
      shortDescription: service.shortDescription,
      category: service.category,
      image: service.image
        ? {
            url: service.image.url,
            alt: service.image.alt,
          }
        : undefined,
      startingPrice: service.startingPrice,
      priceLabel: service.priceLabel,
      ctaLabel: service.ctaLabel,
      features: service.features.map((feature) => ({
        title: feature.title,
        description: feature.description,
        icon: feature.icon,
      })),
    }));

  const allServices = services
    .filter((service) => !service.featured)
    .map((service) => ({
      id: String(service._id),
      title: service.title,
      slug: service.slug,
      heroEyebrow: service.heroEyebrow,
      shortDescription: service.shortDescription,
      category: service.category,
      image: service.image
        ? {
            url: service.image.url,
            alt: service.image.alt,
          }
        : undefined,
      startingPrice: service.startingPrice,
      priceLabel: service.priceLabel,
      ctaLabel: service.ctaLabel,
      features: service.features.map((feature) => ({
        title: feature.title,
        description: feature.description,
        icon: feature.icon,
      })),
    }));

  return (
    <ServicesPageClient
      servicesCount={services.length}
      featuredServices={featuredServices}
      allServices={allServices}
    />
  );
}