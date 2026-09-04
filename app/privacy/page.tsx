import type { Metadata } from "next";
import Link from "next/link";

import Navbar from "@/components/agency/navbar/Navbar";
import Footer from "@/components/agency/footer/Footer";

import PrivacyHero from "@/components/PrivacyPage/PrivacyHero";
import PrivacyOverview from "@/components/PrivacyPage/PrivacyOverview";
import InformationWeCollect from "@/components/PrivacyPage/InformationWeCollect";
import HowWeUseInformation from "@/components/PrivacyPage/HowWeUseInformation";
import DataSharing from "@/components/PrivacyPage/DataSharing";
import SecurityAndRetention from "@/components/PrivacyPage/SecurityAndRetention";
import RightsAndCookies from "@/components/PrivacyPage/RightsAndCookies";
import PrivacyContact from "@/components/PrivacyPage/PrivacyContact";

/* =========================================================
   SITE CONFIG
========================================================= */

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ||
  "https://www.amandigitalsolutions.com";

const PRIVACY_URL =
  `${SITE_URL}/privacy`;

/* =========================================================
   METADATA
========================================================= */

export const metadata: Metadata = {
  title:
    "Privacy Policy | Aman Digital Solutions",

  description:
    "Read the Privacy Policy for Aman Digital Solutions and learn how we collect, use, protect and handle personal information.",

  alternates: {
    canonical:
      PRIVACY_URL,
  },

  openGraph: {
    title:
      "Privacy Policy | Aman Digital Solutions",

    description:
      "Learn how Aman Digital Solutions collects, uses and protects personal information.",

    url:
      PRIVACY_URL,

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
      "Privacy Policy | Aman Digital Solutions",

    description:
      "Learn how Aman Digital Solutions collects, uses and protects personal information.",
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
    `${PRIVACY_URL}#webpage`,

  url:
    PRIVACY_URL,

  name:
    "Privacy Policy | Aman Digital Solutions",

  description:
    "Privacy Policy explaining how Aman Digital Solutions collects, uses, protects and handles personal information.",

  isPartOf: {
    "@id":
      `${SITE_URL}/#website`,
  },

  breadcrumb: {
    "@id":
      `${PRIVACY_URL}#breadcrumb`,
  },
};

/* =========================================================
   BREADCRUMB STRUCTURED DATA
========================================================= */

const breadcrumbSchema = {
  "@type":
    "BreadcrumbList",

  "@id":
    `${PRIVACY_URL}#breadcrumb`,

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
        "Privacy Policy",

      item:
        PRIVACY_URL,
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
   PRIVACY PAGE
========================================================= */

export default function PrivacyPage() {
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
            Privacy Policy
          </li>
        </ol>
      </nav>

      {/* =================================================
          PRIVACY PAGE
      ================================================= */}

      <main className="min-h-screen bg-[#080808] text-white">
        <PrivacyHero />

        <PrivacyOverview />

        <InformationWeCollect />

        <HowWeUseInformation />

        <DataSharing />

        <SecurityAndRetention />

        <RightsAndCookies />

        <PrivacyContact />
      </main>

      {/* =================================================
          FOOTER
      ================================================= */}

      <Footer />
    </>
  );
}