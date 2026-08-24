import Link from "next/link";
import {
  ArrowLeft,
  Plus,
  Wrench,
} from "lucide-react";

import { connectDB } from "@/lib/db/connect";
import Service from "@/models/Service";

import ServiceAdminCard from "@/components/admin/services/ServiceAdminCard";

/* =========================================================
   TYPES
========================================================= */

export type AdminServiceData = {
  _id: string;

  title: string;
  slug: string;

  heroEyebrow?: string;

  shortDescription: string;
  description: string;

  icon?: string;

  image?: {
    url: string;
    publicId?: string;
    alt?: string;
  };

  benefits: {
    title: string;
    description: string;
    icon?: string;
  }[];

  features: {
    title: string;
    description: string;
    icon?: string;
  }[];

  process: {
    order: number;
    title: string;
    description: string;
  }[];

  startingPrice?: number;
  priceLabel?: string;

  ctaLabel?: string;
  ctaLink?: string;

  category:
    | "websites"
    | "business-systems"
    | "growth"
    | "support";

  keywords: string[];

  featured: boolean;
  published: boolean;
  displayOrder: number;
};

/* =========================================================
   FETCH SERVICES
========================================================= */

async function getServices(): Promise<
  AdminServiceData[]
> {
  await connectDB();

  const services = await Service.find({})
    .sort({
      displayOrder: 1,
      createdAt: -1,
    })
    .lean();

  return services.map((service) => ({
    _id: String(service._id),

    title: service.title,

    slug: service.slug,

    heroEyebrow:
      service.heroEyebrow ||
      undefined,

    shortDescription:
      service.shortDescription,

    description:
      service.description,

    icon:
      service.icon ||
      undefined,

    image: service.image
      ? {
          url: service.image.url,
          publicId:
            service.image.publicId ||
            undefined,
          alt:
            service.image.alt ||
            undefined,
        }
      : undefined,

    benefits: Array.isArray(
      service.benefits
    )
      ? service.benefits.map(
          (benefit) => ({
            title: benefit.title,
            description:
              benefit.description,
            icon:
              benefit.icon ||
              undefined,
          })
        )
      : [],

    features: Array.isArray(
      service.features
    )
      ? service.features.map(
          (feature) => ({
            title: feature.title,
            description:
              feature.description,
            icon:
              feature.icon ||
              undefined,
          })
        )
      : [],

    process: Array.isArray(
      service.process
    )
      ? service.process
          .sort(
            (a, b) =>
              a.order - b.order
          )
          .map((step) => ({
            order: step.order,
            title: step.title,
            description:
              step.description,
          }))
      : [],

    startingPrice:
      service.startingPrice ??
      undefined,

    priceLabel:
      service.priceLabel ||
      undefined,

    ctaLabel:
      service.ctaLabel ||
      undefined,

    ctaLink:
      service.ctaLink ||
      undefined,

    category:
      service.category,

    keywords:
      Array.isArray(service.keywords)
        ? service.keywords
        : [],

    featured:
      service.featured,

    published:
      service.published,

    displayOrder:
      service.displayOrder,
  }));
}

/* =========================================================
   PAGE
========================================================= */

export default async function AdminServicesPage() {
  const services =
    await getServices();

  const publishedCount =
    services.filter(
      (service) =>
        service.published
    ).length;

  const draftCount =
    services.length -
    publishedCount;

  const featuredCount =
    services.filter(
      (service) =>
        service.featured
    ).length;

  return (
    <main className="min-h-screen bg-[#050505] px-5 py-8 text-[#F5F5F5] sm:px-8 lg:px-10 lg:py-10">
      <div className="mx-auto max-w-7xl">
        {/* =================================================
            HEADER
        ================================================= */}

        <header className="border-b border-[#252525] pb-8">
          <div className="flex items-center justify-between gap-4">
            <Link
              href="/admin"
              className="inline-flex items-center gap-2 text-[10px] font-medium uppercase tracking-[0.14em] text-[#666] transition-colors hover:text-white"
            >
              <ArrowLeft size={13} />

              Dashboard
            </Link>

            <Link
              href="/admin/services/new"
              className="inline-flex items-center gap-2 rounded-xl bg-[#FFC400] px-4 py-2.5 text-[10px] font-semibold uppercase tracking-[0.08em] text-black transition-colors hover:bg-[#FFD23D]"
            >
              <Plus size={13} />

              New service
            </Link>
          </div>

          <div className="mt-10">
            <div className="flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-xl border border-[#FFC400]/15 bg-[#FFC400]/[0.04] text-[#FFC400]">
                <Wrench
                  size={17}
                  strokeWidth={1.6}
                />
              </span>

              <div>
                <p className="text-[9px] font-semibold uppercase tracking-[0.2em] text-[#FFC400]">
                  Content management
                </p>

                <h1 className="mt-1 text-2xl font-semibold tracking-tight sm:text-3xl">
                  Services
                </h1>
              </div>
            </div>

            <p className="mt-5 max-w-2xl text-sm leading-6 text-[#737373]">
              Manage every service published
              through the Aman Digital Solutions
              website.
            </p>
          </div>

          {/* =================================================
              STATS
          ================================================= */}

          <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-4">
            <div className="rounded-xl border border-[#252525] bg-[#0A0A0A] px-4 py-3">
              <p className="text-[8px] font-medium uppercase tracking-[0.14em] text-[#444]">
                Total
              </p>

              <p className="mt-1 text-lg font-semibold text-white">
                {services.length}
              </p>
            </div>

            <div className="rounded-xl border border-emerald-500/10 bg-emerald-500/[0.025] px-4 py-3">
              <p className="text-[8px] font-medium uppercase tracking-[0.14em] text-emerald-600">
                Published
              </p>

              <p className="mt-1 text-lg font-semibold text-emerald-500">
                {publishedCount}
              </p>
            </div>

            <div className="rounded-xl border border-red-500/10 bg-red-500/[0.025] px-4 py-3">
              <p className="text-[8px] font-medium uppercase tracking-[0.14em] text-red-600">
                Drafts
              </p>

              <p className="mt-1 text-lg font-semibold text-red-500">
                {draftCount}
              </p>
            </div>

            <div className="rounded-xl border border-[#FFC400]/10 bg-[#FFC400]/[0.02] px-4 py-3">
              <p className="text-[8px] font-medium uppercase tracking-[0.14em] text-[#8A7300]">
                Featured
              </p>

              <p className="mt-1 text-lg font-semibold text-[#FFC400]">
                {featuredCount}
              </p>
            </div>
          </div>
        </header>

        {/* =================================================
            SERVICE LIST
        ================================================= */}

        <section className="pt-9">
          {services.length === 0 ? (
            <div className="flex min-h-[360px] items-center justify-center rounded-2xl border border-dashed border-[#252525] bg-[#090909]">
              <div className="max-w-sm px-6 text-center">
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl border border-[#252525] bg-[#0D0D0D] text-[#555]">
                  <Wrench size={19} />
                </div>

                <h2 className="mt-5 text-base font-semibold text-white">
                  No services yet
                </h2>

                <p className="mt-2 text-xs leading-6 text-[#666]">
                  Create your first service to
                  start building the services
                  section of your website.
                </p>

                <Link
                  href="/admin/services/new"
                  className="mt-6 inline-flex items-center gap-2 rounded-xl bg-[#FFC400] px-5 py-3 text-xs font-semibold text-black transition-colors hover:bg-[#FFD23D]"
                >
                  <Plus size={14} />

                  Create service
                </Link>
              </div>
            </div>
          ) : (
            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
              {services.map(
                (service) => (
                  <ServiceAdminCard
                    key={service._id}
                    service={service}
                  />
                )
              )}
            </div>
          )}
        </section>
      </div>
    </main>
  );
}