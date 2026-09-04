import type { Metadata } from "next";
import Link from "next/link";

import Navbar from "@/components/agency/navbar/Navbar";
import Footer from "@/components/agency/footer/Footer";

import TermsHero from "@/components/terms/TermsHero";
import TermsBasics from "@/components/terms/TermsBasics";
import TermsProject from "@/components/terms/TermsProject";
import TermsLegal from "@/components/terms/TermsLegal";
import TermsContact from "@/components/terms/TermsContact";

/* =========================================================
   SITE CONFIG
========================================================= */

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ||
  "https://www.amandigitalsolutions.com";

const TERMS_URL =
  `${SITE_URL}/terms`;

/* =========================================================
   METADATA
========================================================= */

export const metadata: Metadata = {
  title:
    "Terms of Service | Aman Digital Solutions",

  description:
    "Read the Terms of Service for Aman Digital Solutions covering projects, services, payments, intellectual property, responsibilities and legal terms.",

  alternates: {
    canonical:
      TERMS_URL,
  },

  openGraph: {
    title:
      "Terms of Service | Aman Digital Solutions",

    description:
      "Review the terms that govern projects, services, payments, responsibilities and use of Aman Digital Solutions services.",

    url:
      TERMS_URL,

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
      "Terms of Service | Aman Digital Solutions",

    description:
      "Review the Terms of Service for Aman Digital Solutions.",
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
   WEB PAGE STRUCTURED DATA
========================================================= */

const webPageSchema = {
  "@type":
    "WebPage",

  "@id":
    `${TERMS_URL}#webpage`,

  url:
    TERMS_URL,

  name:
    "Terms of Service | Aman Digital Solutions",

  description:
    "Terms of Service covering projects, services, payments, intellectual property, responsibilities and legal terms.",

  isPartOf: {
    "@id":
      `${SITE_URL}/#website`,
  },

  breadcrumb: {
    "@id":
      `${TERMS_URL}#breadcrumb`,
  },
};

/* =========================================================
   BREADCRUMB STRUCTURED DATA
========================================================= */

const breadcrumbSchema = {
  "@type":
    "BreadcrumbList",

  "@id":
    `${TERMS_URL}#breadcrumb`,

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
        "Terms of Service",

      item:
        TERMS_URL,
    },
  ],
};

/* =========================================================
   STRUCTURED DATA GRAPH
========================================================= */

const structuredData = {
  "@context":
    "https://schema.org",

  "@graph": [
    webPageSchema,
    breadcrumbSchema,
  ],
};

/* =========================================================
   PAGE
========================================================= */

export default function TermsPage() {
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
            Terms of Service
          </li>
        </ol>
      </nav>

      {/* =================================================
          TERMS CONTENT
      ================================================= */}

      <main className="min-h-screen bg-[#050505] text-white">
        <TermsHero />

        <TermsBasics />

        <TermsProject />

        <TermsLegal />

        <TermsContact />
      </main>

      {/* =================================================
          FOOTER
      ================================================= */}

      <Footer />
    </>
  );
}