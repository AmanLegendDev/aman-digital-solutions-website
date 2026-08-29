import type { Metadata } from "next";

import { connectDB } from "@/lib/db/connect";
import FAQ from "@/models/FAQ";

import FAQPageClient, {
  type FAQData,
} from "@/components/faq/FAQPageClient";

import Navbar from "@/components/agency/navbar/Navbar";
import Footer from "@/components/agency/footer/Footer";

/* =========================================================
   SITE CONFIG
========================================================= */

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ||
  "https://www.amandigitalsolutions.com";

/* =========================================================
   METADATA
========================================================= */

export const metadata: Metadata = {
  title:
    "FAQ | Web Development, Pricing & Services | Aman Digital Solutions",

  description:
    "Find answers to common questions about Aman Digital Solutions, including website development, e-commerce, business systems, pricing, SEO, process and ongoing support.",

  alternates: {
    canonical: `${SITE_URL}/faq`,
  },

  openGraph: {
    title:
      "Frequently Asked Questions | Aman Digital Solutions",

    description:
      "Find clear answers about our services, website development, pricing, process and digital solutions.",

    url:
      `${SITE_URL}/faq`,

    type: "website",

    siteName:
      "Aman Digital Solutions",

    locale:
      "en_IN",
  },

  twitter: {
    card:
      "summary_large_image",

    title:
      "FAQ | Aman Digital Solutions",

    description:
      "Answers about our services, pricing, process and digital solutions.",
  },

  robots: {
    index: true,
    follow: true,

    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
};

/* =========================================================
   FETCH PUBLISHED FAQS
========================================================= */

async function getPublishedFAQs(): Promise<FAQData[]> {
  await connectDB();

  const faqs = await FAQ.find({
    published: true,
  })
    .select(
      "_id question slug answer category relatedService relatedProject featured displayOrder"
    )
    .sort({
      featured: -1,
      displayOrder: 1,
      createdAt: -1,
    })
    .lean();

  return faqs.map((faq) => ({
    _id: String(faq._id),

    question:
      faq.question,

    slug:
      faq.slug,

    answer:
      faq.answer,

    category:
      faq.category?.trim() ||
      undefined,

    relatedService:
      faq.relatedService
        ? String(faq.relatedService)
        : undefined,

    relatedProject:
      faq.relatedProject
        ? String(faq.relatedProject)
        : undefined,

    featured:
      faq.featured,

    displayOrder:
      faq.displayOrder,
  }));
}

/* =========================================================
   FAQ STRUCTURED DATA
========================================================= */

function createFAQSchema(
  faqs: FAQData[]
) {
  const mainEntity = faqs
    .filter(
      (faq) =>
        faq.question.trim() &&
        faq.answer.trim()
    )
    .map((faq) => ({
      "@type":
        "Question",

      name:
        faq.question,

      acceptedAnswer: {
        "@type":
          "Answer",

        text:
          faq.answer,
      },
    }));

  return {
    "@context":
      "https://schema.org",

    "@type":
      "FAQPage",

    "@id":
      `${SITE_URL}/faq#faqpage`,

    url:
      `${SITE_URL}/faq`,

    name:
      "Frequently Asked Questions | Aman Digital Solutions",

    description:
      "Answers to common questions about Aman Digital Solutions, its services, pricing and working process.",

    mainEntity,
  };
}

/* =========================================================
   WEB PAGE STRUCTURED DATA
========================================================= */

function createWebPageSchema() {
  return {
    "@context":
      "https://schema.org",

    "@type":
      "WebPage",

    "@id":
      `${SITE_URL}/faq#webpage`,

    url:
      `${SITE_URL}/faq`,

    name:
      "Frequently Asked Questions | Aman Digital Solutions",

    description:
      "Find answers about website development, digital solutions, pricing, process and support.",

    isPartOf: {
      "@id":
        `${SITE_URL}/#website`,
    },

    breadcrumb: {
      "@id":
        `${SITE_URL}/faq#breadcrumb`,
    },
  };
}

/* =========================================================
   BREADCRUMB STRUCTURED DATA
========================================================= */

function createBreadcrumbSchema() {
  return {
    "@context":
      "https://schema.org",

    "@type":
      "BreadcrumbList",

    "@id":
      `${SITE_URL}/faq#breadcrumb`,

    itemListElement: [
      {
        "@type":
          "ListItem",

        position:
          1,

        name:
          "Home",

        item:
          SITE_URL,
      },

      {
        "@type":
          "ListItem",

        position:
          2,

        name:
          "FAQ",

        item:
          `${SITE_URL}/faq`,
      },
    ],
  };
}

/* =========================================================
   PAGE
========================================================= */

export default async function FAQPage() {
  const faqs =
    await getPublishedFAQs();

  /* =======================================================
     STRUCTURED DATA
  ======================================================= */

  const faqSchema =
    createFAQSchema(faqs);

  const webPageSchema =
    createWebPageSchema();

  const breadcrumbSchema =
    createBreadcrumbSchema();

  return (
    <>
      <Navbar />

      {/* =================================================
          FAQ STRUCTURED DATA
      ================================================= */}

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html:
            JSON.stringify(
              faqSchema
            ),
        }}
      />

      {/* =================================================
          WEBPAGE STRUCTURED DATA
      ================================================= */}

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html:
            JSON.stringify(
              webPageSchema
            ),
        }}
      />

      {/* =================================================
          BREADCRUMB STRUCTURED DATA
      ================================================= */}

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html:
            JSON.stringify(
              breadcrumbSchema
            ),
        }}
      />

      {/* =================================================
          SEMANTIC BREADCRUMB
      ================================================= */}

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

          <li aria-current="page">
            FAQ
          </li>
        </ol>
      </nav>

      {/* =================================================
          MAIN CONTENT
      ================================================= */}

      <main>
        <FAQPageClient
          faqs={faqs}
        />
      </main>

      <Footer />
    </>
  );
}