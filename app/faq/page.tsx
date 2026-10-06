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

const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL ||
  "https://www.amandigitalsolutions.com"
).replace(/\/$/, "");

const SITE_NAME =
  "Aman Digital Solutions";

const FAQ_URL =
  `${SITE_URL}/faq`;

/*
 * FAQ content changes occasionally through the CMS.
 * Revalidate periodically instead of forcing the page
 * to render dynamically on every request.
 */
export const revalidate = 3600;

/* =========================================================
   METADATA
========================================================= */

export const metadata: Metadata = {
  title:
    "FAQ | Web Development & Digital Solutions",

  description:
    "Find answers to common questions about Aman Digital Solutions, including website development, e-commerce, business systems, pricing, SEO, process and ongoing support.",

  alternates: {
    canonical:
      FAQ_URL,
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

  openGraph: {
    title:
      "Frequently Asked Questions | Aman Digital Solutions",

    description:
      "Find clear answers about website development, pricing, process, SEO and digital solutions from Aman Digital Solutions.",

    url:
      FAQ_URL,

    type:
      "website",

    siteName:
      SITE_NAME,

    locale:
      "en_IN",
  },

  twitter: {
    card:
      "summary_large_image",

    title:
      "FAQ | Aman Digital Solutions",

    description:
      "Answers about website development, pricing, process, SEO and digital solutions.",
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

  return faqs
    .filter(
      (faq) =>
        typeof faq.question === "string" &&
        faq.question.trim() &&
        typeof faq.answer === "string" &&
        faq.answer.trim()
    )
    .map((faq) => ({
      _id:
        String(faq._id),

      question:
        faq.question.trim(),

      slug:
        faq.slug,

      answer:
        faq.answer.trim(),

      category:
        typeof faq.category === "string" &&
        faq.category.trim()
          ? faq.category.trim()
          : undefined,

      relatedService:
        faq.relatedService
          ? String(faq.relatedService)
          : undefined,

      relatedProject:
        faq.relatedProject
          ? String(faq.relatedProject)
          : undefined,

      featured:
        Boolean(faq.featured),

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
      "Answers to common questions about Aman Digital Solutions, including services, pricing, website development, SEO and support.",

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
      "Find answers about website development, e-commerce, custom web applications, pricing, SEO, digital solutions and ongoing support.",

    isPartOf: {
      "@id":
        `${SITE_URL}/#website`,
    },

    breadcrumb: {
      "@id":
        `${FAQ_URL}#breadcrumb`,
    },

    mainEntity: {
      "@id":
        `${FAQ_URL}#faqpage`,
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

      <main
        id="main-content"
        className="min-h-screen"
      >
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