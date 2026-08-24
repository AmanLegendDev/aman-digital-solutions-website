import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { connectDB } from "@/lib/db/connect";

import FAQ from "@/models/FAQ";
import Project from "@/models/Project";
import Service from "@/models/Service";

import ServiceDetailPage from "@/components/services/detail/ServiceDetailPage";

type PageProps = {
  params: Promise<{
    slug: string;
  }>;
};

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ||
  "http://localhost:3000";

/* =========================================================
   METADATA
========================================================= */

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;

  await connectDB();

  const service = await Service.findOne({
    slug,
    published: true,
  })
    .select(
      "title seoTitle seoDescription canonicalUrl ogTitle ogDescription ogImage image shortDescription"
    )
    .lean();

  if (!service) {
    return {
      title: "Service Not Found | Aman Digital Solutions",
      description:
        "The requested service could not be found.",
    };
  }

  const title =
    service.seoTitle ||
    `${service.title} | Aman Digital Solutions`;

  const description =
    service.seoDescription ||
    service.shortDescription;

  const canonical =
    service.canonicalUrl &&
    !service.canonicalUrl.includes(
      "localhost:3000"
    )
      ? service.canonicalUrl
      : `${SITE_URL}/services/${service.slug}`;

  const ogImage =
    service.ogImage?.url ||
    service.image?.url;

  return {
    title,
    description,

    alternates: {
      canonical,
    },

    openGraph: {
      title:
        service.ogTitle || title,

      description:
        service.ogDescription ||
        description,

      url: canonical,

      type: "website",

      siteName:
        "Aman Digital Solutions",

      ...(ogImage
        ? {
            images: [
              {
                url: ogImage,
                alt:
                  service.title,
              },
            ],
          }
        : {}),
    },

    twitter: {
      card: "summary_large_image",

      title:
        service.ogTitle || title,

      description:
        service.ogDescription ||
        description,

      ...(ogImage
        ? {
            images: [ogImage],
          }
        : {}),
    },

    robots: {
      index: true,
      follow: true,
    },
  };
}

/* =========================================================
   PAGE
========================================================= */

export default async function ServicePage({
  params,
}: PageProps) {
  const { slug } = await params;

  await connectDB();

  const service =
    await Service.findOne({
      slug,
      published: true,
    }).lean();

  if (!service) {
    notFound();
  }

  /* =======================================================
     RELATED FAQS
  ======================================================== */

  const faqIds =
    service.faqIds ?? [];

  const projectIds =
    service.projectIds ?? [];

  const [
    faqDocuments,
    projectDocuments,
  ] = await Promise.all([
    faqIds.length
      ? FAQ.find({
          _id: {
            $in: faqIds,
          },
          published: true,
        })
          .select(
            "_id question slug answer displayOrder"
          )
          .sort({
            displayOrder: 1,
          })
          .lean()
      : [],

    projectIds.length
      ? Project.find({
          _id: {
            $in: projectIds,
          },
          published: true,
        })
          .select(
            "_id title slug shortDescription industry coverImage displayOrder"
          )
          .sort({
            displayOrder: 1,
          })
          .lean()
      : [],
  ]);

  /* =======================================================
     MAP FAQ DATA
  ======================================================== */

  const relatedFaqs =
    faqDocuments.map((faq) => ({
      id: String(faq._id),

      question: faq.question,

      slug: faq.slug,

      answer: faq.answer,
    }));

  /* =======================================================
     MAP PROJECT DATA
  ======================================================== */

  const relatedProjects =
    projectDocuments.map(
      (project) => ({
        id: String(project._id),

        title: project.title,

        slug: project.slug,

        shortDescription:
          project.shortDescription,

        industry:
          project.industry,

        coverImage:
          project.coverImage
            ? {
                url:
                  project.coverImage
                    .url,

                alt:
                  project.coverImage
                    .alt,
              }
            : undefined,
      })
    );

  /* =======================================================
     STRUCTURED DATA
  ======================================================== */

  const serviceUrl =
    `${SITE_URL}/services/${service.slug}`;

  const jsonLd = {
    "@context":
      "https://schema.org",

    "@type":
      "Service",

    name:
      service.title,

    description:
      service.seoDescription ||
      service.shortDescription,

    url:
      serviceUrl,

    provider: {
      "@type":
        "Organization",

      name:
        "Aman Digital Solutions",

      url:
        SITE_URL,
    },

    areaServed: [
      {
        "@type":
          "Place",

        name:
          "Shimla",
      },

      {
        "@type":
          "AdministrativeArea",

        name:
          "Himachal Pradesh",
      },
    ],

    ...(typeof service.startingPrice ===
      "number"
      ? {
          offers: {
            "@type":
              "Offer",

            price:
              service.startingPrice,

            priceCurrency:
              "INR",

            url:
              serviceUrl,
          },
        }
      : {}),
  };

  return (
    <>
      {/* ===================================================
          SERVICE STRUCTURED DATA
      ==================================================== */}

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            jsonLd
          ),
        }}
      />

      {/* ===================================================
          PAGE
      ==================================================== */}

      <ServiceDetailPage
        service={service}
        relatedProjects={
          relatedProjects
        }
        relatedFaqs={
          relatedFaqs
        }
      />
    </>
  );
}