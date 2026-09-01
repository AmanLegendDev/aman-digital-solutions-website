import type { Metadata } from "next";

import { connectDB } from "@/lib/db/connect";
import Service from "@/models/Service";

import {
  getCollectionPageSchema,
  getItemListSchema,
} from "@/lib/seo/schema";

import ServicesPageClient from "@/components/services/ServicesPageClient";
import Navbar from "@/components/agency/navbar/Navbar";
import Footer from "@/components/agency/footer/Footer";

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ||
  "https://www.amandigitalsolutions.com";

export const metadata: Metadata = {
  title:
    "Web Development & Digital Solutions Services | Aman Digital Solutions",

  description:
    "Explore website development, e-commerce, web applications, SEO, digital marketing, business automation and ongoing digital support services for businesses worldwide.",

  alternates: {
    canonical: "/services",
  },

  openGraph: {
    title:
      "Web Development & Digital Solutions Services | Aman Digital Solutions",

    description:
      "Explore modern web development, e-commerce, SEO, digital marketing and business solutions from Aman Digital Solutions.",

    url: "/services",

    type: "website",
  },

  twitter: {
    card: "summary_large_image",

    title:
      "Web Development & Digital Solutions Services | Aman Digital Solutions",

    description:
      "Modern websites, web applications, e-commerce, SEO and business solutions for businesses worldwide.",
  },

  robots: {
    index: true,
    follow: true,
  },
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

  const mapService = (
    service: (typeof services)[number]
  ) => ({
    id: String(service._id),

    title: service.title,

    slug: service.slug,

    heroEyebrow:
      service.heroEyebrow,

    shortDescription:
      service.shortDescription,

    category:
      service.category,

    image: service.image
      ? {
          url: service.image.url,
          alt: service.image.alt,
        }
      : undefined,

    startingPrice:
      service.startingPrice,

    priceLabel:
      service.priceLabel,

    ctaLabel:
      service.ctaLabel,

    features:
      service.features.map(
        (feature) => ({
          title:
            feature.title,

          description:
            feature.description,

          icon:
            feature.icon,
        })
      ),
  });

  const featuredServices =
    services
      .filter(
        (service) =>
          service.featured
      )
      .map(mapService);

  const allServices =
    services
      .filter(
        (service) =>
          !service.featured
      )
      .map(mapService);


      const servicesUrl = `${SITE_URL}/services`;

const serviceItems = services.map((service) => ({
  name: service.title,
  url: `${servicesUrl}/${service.slug}`,
  ...(service.image?.url
    ? {
        image: service.image.url,
      }
    : {}),
  description: service.shortDescription,
}));

const servicesItemList = getItemListSchema({
  id: `${servicesUrl}#itemlist`,
  name: "Aman Digital Solutions Services",
  url: servicesUrl,
  items: serviceItems,
});

const servicesCollection = getCollectionPageSchema({
  url: servicesUrl,
  name:
    "Web Development & Digital Solutions Services | Aman Digital Solutions",
  description:
    "Explore website development, e-commerce, web applications, SEO, digital marketing and business automation services.",
  itemListId: `${servicesUrl}#itemlist`,
});

  return (
    <>
      <Navbar />

      <script
  type="application/ld+json"
  dangerouslySetInnerHTML={{
    __html: JSON.stringify({
      "@context": "https://schema.org",
      "@graph": [
        servicesCollection,
        servicesItemList,
      ],
    }),
  }}
/>

      <main>
        <ServicesPageClient
          servicesCount={
            services.length
          }
          featuredServices={
            featuredServices
          }
          allServices={
            allServices
          }
        />
      </main>

      <Footer />
    </>
  );
}