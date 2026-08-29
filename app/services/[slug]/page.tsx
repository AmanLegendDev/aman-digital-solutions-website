import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { connectDB } from "@/lib/db/connect";
import type { IService } from "@/models/Service";

import FAQ from "@/models/FAQ";
import Project from "@/models/Project";
import Service from "@/models/Service";

import ServiceDetailPage from "@/components/services/detail/ServiceDetailPage";
import BreadcrumbSchema from "@/components/seo/BreadcrumbSchema";

import Navbar from "@/components/agency/navbar/Navbar";
import Footer from "@/components/agency/footer/Footer";

import {
  getWebPageSchema,
} from "@/lib/seo/schema";

/* =========================================================
   SITE
========================================================= */

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ||
  "https://www.amandigitalsolutions.com";

/* =========================================================
   PARAMS
========================================================= */

type PageProps = {
  params: Promise<{
    slug: string;
  }>;
};

/* =========================================================
   GET SERVICE
========================================================= */

async function getServiceBySlug(
  slug: string
): Promise<IService | null> {
  await connectDB();

  const service = await Service.findOne({
    slug: slug.toLowerCase(),
    published: true,
  }).lean<IService>();

  return service;
}

/* =========================================================
   METADATA
========================================================= */

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;

  const service = await getServiceBySlug(slug);

  /* -------------------------------------------------------
     NOT FOUND
  ------------------------------------------------------- */

  if (!service) {
    return {
      title:
        "Service Not Found | Aman Digital Solutions",

      description:
        "The requested service could not be found.",

      robots: {
        index: false,
        follow: false,
      },
    };
  }

  /* -------------------------------------------------------
     SEO TITLE
  ------------------------------------------------------- */

  const title =
    service.seoTitle?.trim() ||
    `${service.title} | Aman Digital Solutions`;

  /* -------------------------------------------------------
     SEO DESCRIPTION
  ------------------------------------------------------- */

  const description =
    service.seoDescription?.trim() ||
    service.shortDescription;

  /* -------------------------------------------------------
     CANONICAL
  ------------------------------------------------------- */

  const databaseCanonical =
    service.canonicalUrl?.trim();

  const canonical =
    databaseCanonical &&
    !databaseCanonical.includes("localhost")
      ? databaseCanonical
      : `${SITE_URL}/services/${service.slug}`;

  /* -------------------------------------------------------
     OPEN GRAPH
  ------------------------------------------------------- */

  const ogTitle =
    service.ogTitle?.trim() ||
    title;

  const ogDescription =
    service.ogDescription?.trim() ||
    description;

  const ogImage =
    service.ogImage?.url ||
    service.image?.url;

  /* -------------------------------------------------------
     METADATA
  ------------------------------------------------------- */

  return {
    title,

    description,

    alternates: {
      canonical,
    },

    openGraph: {
      type: "website",

      locale: "en_IN",

      siteName:
        "Aman Digital Solutions",

      title: ogTitle,

      description: ogDescription,

      url: canonical,

      ...(ogImage
        ? {
            images: [
              {
                url: ogImage,

                alt:
                  service.ogImage?.alt ||
                  service.image?.alt ||
                  service.title,
              },
            ],
          }
        : {}),
    },

    twitter: {
      card: "summary_large_image",

      title: ogTitle,

      description: ogDescription,

      ...(ogImage
        ? {
            images: [ogImage],
          }
        : {}),
    },

    robots: {
      index: true,
      follow: true,

      googleBot: {
        index: true,
        follow: true,

        "max-image-preview":
          "large",

        "max-snippet": -1,

        "max-video-preview": -1,
      },
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

  const service =
    await getServiceBySlug(slug);

  /* -------------------------------------------------------
     NOT FOUND
  ------------------------------------------------------- */

  if (!service) {
    notFound();
  }

  /* =======================================================
     RELATED CONTENT
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
     RELATED FAQS
  ======================================================== */

  const relatedFaqs =
    faqDocuments.map((faq) => ({
      id: String(faq._id),

      question: faq.question,

      slug: faq.slug,

      answer: faq.answer,
    }));

  /* =======================================================
     RELATED PROJECTS
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
                  project.coverImage.url,

                alt:
                  project.coverImage.alt,
              }
            : undefined,
      })
    );

  /* =======================================================
     SEO URL
  ======================================================== */

  const serviceUrl =
    `${SITE_URL}/services/${service.slug}`;

  const serviceTitle =
    service.seoTitle?.trim() ||
    `${service.title} | Aman Digital Solutions`;

  const serviceDescription =
    service.seoDescription?.trim() ||
    service.shortDescription;

  /* =======================================================
     SERVICE SCHEMA
  ======================================================== */

  const serviceSchema: Record<
    string,
    unknown
  > = {
    "@context":
      "https://schema.org",

    "@type":
      "Service",

    "@id":
      `${serviceUrl}#service`,

    name:
      service.title,

    description:
      serviceDescription,

    url:
      serviceUrl,

    provider: {
      "@type":
        "Organization",

      "@id":
        `${SITE_URL}/#organization`,

      name:
        "Aman Digital Solutions",

      url:
        SITE_URL,
    },

    areaServed: {
      "@type":
        "Place",

      name:
        "Worldwide",
    },

    ...(service.category
      ? {
          serviceType:
            service.category,
        }
      : {}),

    ...(service.image?.url
      ? {
          image:
            service.image.url,
        }
      : {}),

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

  /* =======================================================
     WEBPAGE SCHEMA
  ======================================================== */

  const webPageSchema =
    getWebPageSchema({
      url:
        serviceUrl,

      name:
        serviceTitle,

      description:
        serviceDescription,

      image:
        service.ogImage?.url ||
        service.image?.url,
    });

  /* =======================================================
     RENDER
  ======================================================== */

  return (
    <>
      <Navbar />

      {/* ===================================================
          BREADCRUMB STRUCTURED DATA
      =================================================== */}

      <BreadcrumbSchema
        items={[
          {
            name: "Home",
            url: "/",
          },

          {
            name: "Services",
            url: "/services",
          },

          {
            name: service.title,
            url:
              `/services/${service.slug}`,
          },
        ]}
      />

      {/* ===================================================
          SERVICE SCHEMA
      =================================================== */}

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html:
            JSON.stringify(
              serviceSchema
            ),
        }}
      />

      {/* ===================================================
          WEBPAGE SCHEMA
      =================================================== */}

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html:
            JSON.stringify(
              webPageSchema
            ),
        }}
      />

      {/* ===================================================
          SEMANTIC BREADCRUMB
      =================================================== */}

      <nav
        aria-label="Breadcrumb"
        className="sr-only"
      >
        <ol>
          <li>
            <a href="/">
              Home
            </a>
          </li>

          <li>
            <a href="/services">
              Services
            </a>
          </li>

          <li aria-current="page">
            {service.title}
          </li>
        </ol>
      </nav>

      {/* ===================================================
          MAIN CONTENT
      =================================================== */}
<main className="w-full max-w-full overflow-x-clip">
        <ServiceDetailPage
          service={service}
          relatedProjects={
            relatedProjects
          }
          relatedFaqs={
            relatedFaqs
          }
        />
      </main>

      <Footer />
    </>
  );
}