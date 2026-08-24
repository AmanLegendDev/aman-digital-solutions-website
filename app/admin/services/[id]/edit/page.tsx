import { notFound } from "next/navigation";
import type { Metadata } from "next";

import { connectDB } from "@/lib/db/connect";
import Service from "@/models/Service";
import FAQ from "@/models/FAQ";
import Project from "@/models/Project";

import EditServiceForm from "@/components/admin/services/EditServiceForm";

type PageProps = {
  params: Promise<{
    id: string;
  }>;
};

/* =========================================================
   METADATA
========================================================= */

export const metadata: Metadata = {
  title: "Edit Service | Admin",
  description:
    "Edit and manage service content for Aman Digital Solutions.",
};

/* =========================================================
   PAGE
========================================================= */

export default async function EditServicePage({
  params,
}: PageProps) {
  const { id } = await params;

  await connectDB();

  /* =======================================================
     SERVICE
  ======================================================= */

  const service = await Service.findById(id).lean();

  if (!service) {
    notFound();
  }

  /* =======================================================
     RELATION OPTIONS
  ======================================================= */

  const [faqs, projects] = await Promise.all([
    FAQ.find({
      published: true,
    })
      .select("_id question")
      .sort({
        displayOrder: 1,
        createdAt: -1,
      })
      .lean(),

    Project.find({
      published: true,
    })
      .select("_id title")
      .sort({
        displayOrder: 1,
        createdAt: -1,
      })
      .lean(),
  ]);

  /* =======================================================
     SERIALIZE SERVICE
  ======================================================= */

  const initialData = {
    title: service.title,

    slug: service.slug,

    heroEyebrow:
      service.heroEyebrow ?? "",

    shortDescription:
      service.shortDescription,

    description:
      service.description,

    category:
      service.category,

    /* -------------------------------------------------------
       VISUALS
    ------------------------------------------------------- */

    icon:
      service.icon ?? "",

    image: service.image
      ? {
          url: service.image.url,

          publicId:
            service.image.publicId ??
            "",

          alt:
            service.image.alt ??
            "",
        }
      : undefined,

    /* -------------------------------------------------------
       BENEFITS
    ------------------------------------------------------- */

    benefits: (
      service.benefits ?? []
    ).map((benefit) => ({
      title: benefit.title,

      description:
        benefit.description,

      icon:
        benefit.icon ?? "",
    })),

    /* -------------------------------------------------------
       FEATURES
    ------------------------------------------------------- */

    features: (
      service.features ?? []
    ).map((feature) => ({
      title: feature.title,

      description:
        feature.description,

      icon:
        feature.icon ?? "",
    })),

    /* -------------------------------------------------------
       PROCESS
    ------------------------------------------------------- */

    process: (
      service.process ?? []
    )
      .sort(
        (a, b) =>
          a.order - b.order
      )
      .map((step) => ({
        order: step.order,

        title: step.title,

        description:
          step.description,
      })),

    /* -------------------------------------------------------
       RELATIONS
    ------------------------------------------------------- */

    faqIds: (
      service.faqIds ?? []
    ).map((id) => String(id)),

    projectIds: (
      service.projectIds ?? []
    ).map((id) => String(id)),

    /* -------------------------------------------------------
       KEYWORDS
    ------------------------------------------------------- */

    keywords:
      service.keywords ?? [],

    /* -------------------------------------------------------
       PRICING
    ------------------------------------------------------- */

    startingPrice:
      service.startingPrice,

    priceLabel:
      service.priceLabel ?? "",

    /* -------------------------------------------------------
       CTA
    ------------------------------------------------------- */

    ctaLabel:
      service.ctaLabel ?? "",

    ctaLink:
      service.ctaLink ?? "",

    /* -------------------------------------------------------
       PUBLISHING
    ------------------------------------------------------- */

    featured:
      service.featured,

    published:
      service.published,

    displayOrder:
      service.displayOrder,

    /* -------------------------------------------------------
       SEO
    ------------------------------------------------------- */

    seoTitle:
      service.seoTitle ?? "",

    seoDescription:
      service.seoDescription ?? "",

    canonicalUrl:
      service.canonicalUrl ?? "",

    ogTitle:
      service.ogTitle ?? "",

    ogDescription:
      service.ogDescription ?? "",

    ogImage: service.ogImage
      ? {
          url: service.ogImage.url,

          publicId:
            service.ogImage.publicId ??
            "",

          alt:
            service.ogImage.alt ??
            "",
        }
      : undefined,
  };

  /* =======================================================
     RELATION DATA
  ======================================================= */

  const faqOptions = faqs.map(
    (faq) => ({
      id: String(faq._id),

      title: faq.question,
    })
  );

  const projectOptions =
    projects.map((project) => ({
      id: String(project._id),

      title: project.title,
    }));

  /* =======================================================
     RENDER
  ======================================================= */

  return (
    <main className="min-h-screen bg-[#050505] px-5 py-10 text-[#F5F5F5] sm:px-8 lg:px-10">
      <EditServiceForm
        serviceId={String(service._id)}
        initialData={initialData}
        faqs={faqOptions}
        projects={projectOptions}
      />
    </main>
  );
}