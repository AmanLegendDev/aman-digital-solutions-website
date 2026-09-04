import type { Metadata } from "next";
import Link from "next/link";

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

const FAQ_URL =
  `${SITE_URL}/faq`;

/* =========================================================
   METADATA
========================================================= */

export const metadata: Metadata = {
  title:
    "FAQ | Web Development & Digital Solutions | Aman Digital Solutions",

  description:
    "Find answers to common questions about Aman Digital Solutions, including website development, e-commerce, business systems, pricing, SEO, process and ongoing support.",

  alternates: {
    canonical:
      FAQ_URL,
  },

  openGraph: {
    title:
      "Frequently Asked Questions | Aman Digital Solutions",

    description:
      "Find clear answers about our services, website development, pricing, process and digital solutions.",

    url:
      FAQ_URL,

    type:
      "website",

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
      "max-image-preview":
        "large",
      "max-snippet":
        -1,
      "max-video-preview":
        -1,
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
    "@type":
      "FAQPage",

    "@id":
      `${FAQ_URL}#faqpage`,

    url:
      FAQ_URL,

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
    "@type":
      "WebPage",

    "@id":
      `${FAQ_URL}#webpage`,

    url:
      FAQ_URL,

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
        `${FAQ_URL}#breadcrumb`,
    },
  };
}

/* =========================================================
   BREADCRUMB STRUCTURED DATA
========================================================= */

function createBreadcrumbSchema() {
  return {
    "@type":
      "BreadcrumbList",

    "@id":
      `${FAQ_URL}#breadcrumb`,

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
          FAQ_URL,
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

  const structuredData = {
    "@context":
      "https://schema.org",

    "@graph": [
      createFAQSchema(faqs),
      createWebPageSchema(),
      createBreadcrumbSchema(),
    ],
  };

  return (
    <>
      {/* =================================================
          NAVBAR
      ================================================= */}

      <Navbar />

      {/* =================================================
          STRUCTURED DATA
      ================================================= */}

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html:
            JSON.stringify(
              structuredData
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
            <Link href="/">
              Home
            </Link>
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

      {/* =================================================
          FOOTER
      ================================================= */}

      <Footer />
    </>
  );
}