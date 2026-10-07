import type { Metadata } from "next";
import Link from "next/link";

import Navbar from "@/components/agency/navbar/Navbar";
import Footer from "@/components/agency/footer/Footer";

import AboutHero from "@/components/AboutPage/AboutHero";
import FounderStory from "@/components/AboutPage/FounderStory";
import WhatWeBuild from "@/components/AboutPage/WhatWeBuild";
import OurApproach from "@/components/AboutPage/OurApproach";
import Capabilities from "@/components/AboutPage/Capabilities";
import ProofPortfolio from "@/components/AboutPage/ProofPortfolio";
import Values from "@/components/AboutPage/Values";
import WhyWorkWithUs from "@/components/AboutPage/WhyWorkWithUs";
import FutureVision from "@/components/AboutPage/FutureVision";
import AboutCTA from "@/components/AboutPage/AboutCTA";
import AboutFAQSection from "@/components/AboutPage/AboutFAQSection";

/* =========================================================
   SITE CONFIG
========================================================= */

const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL ||
  "https://www.amandigitalsolutions.com"
).replace(/\/$/, "");

const SITE_NAME =
  "Aman Digital Solutions";

const ABOUT_URL =
  `${SITE_URL}/about`;

/*
 * About content is relatively stable.
 * Revalidate periodically instead of forcing dynamic rendering.
 */
export const revalidate = 3600;

/* =========================================================
   METADATA
========================================================= */

export const metadata: Metadata = {
  title:
    "About Aman Digital Solutions",

  description:
  "Learn about Aman Digital Solutions, a web development and digital solutions studio based in Shimla, serving businesses across Himachal Pradesh, India and beyond.",

  alternates: {
    canonical:
      ABOUT_URL,
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
    "About Aman Digital Solutions | Web Development in Shimla",

  description:
    "Discover the approach, capabilities and vision behind Aman Digital Solutions, a Shimla-based web development and digital solutions studio.",

  url:
    ABOUT_URL,

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
    "About Aman Digital Solutions | Web Development in Shimla",

  description:
    "Discover the approach, capabilities and vision behind Aman Digital Solutions.",
},
};

/* =========================================================
   ABOUT PAGE STRUCTURED DATA
========================================================= */

const aboutPageSchema = {
  "@type":
    "AboutPage",

  "@id":
    `${ABOUT_URL}#aboutpage`,

  url:
    ABOUT_URL,

  name:
    "About Aman Digital Solutions",

  description:
    "Learn about Aman Digital Solutions, its approach, capabilities and vision for building modern digital experiences and business systems.",

  isPartOf: {
    "@id":
      `${SITE_URL}/#website`,
  },

  about: {
    "@id":
      `${SITE_URL}/#organization`,
  },

  breadcrumb: {
    "@id":
      `${ABOUT_URL}#breadcrumb`,
  },
};

/* =========================================================
   WEB PAGE STRUCTURED DATA
========================================================= */

const webPageSchema = {
  "@type":
    "WebPage",

  "@id":
    `${ABOUT_URL}#webpage`,

  url:
    ABOUT_URL,

  name:
    "About Aman Digital Solutions",

  description:
    "Learn about the story, capabilities, approach and vision behind Aman Digital Solutions.",

  isPartOf: {
    "@id":
      `${SITE_URL}/#website`,
  },

  about: {
    "@id":
      `${SITE_URL}/#organization`,
  },

  breadcrumb: {
    "@id":
      `${ABOUT_URL}#breadcrumb`,
  },

  mainEntity: {
    "@id":
      `${ABOUT_URL}#aboutpage`,
  },
};

/* =========================================================
   BREADCRUMB STRUCTURED DATA
========================================================= */

const breadcrumbSchema = {
  "@type":
    "BreadcrumbList",

  "@id":
    `${ABOUT_URL}#breadcrumb`,

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
        "About",

      item:
        ABOUT_URL,
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
    aboutPageSchema,
    webPageSchema,
    breadcrumbSchema,
  ],
};

/* =========================================================
   PAGE
========================================================= */

export default function AboutPage() {
  return (
    <>
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
          NAVBAR
      ================================================= */}

      <Navbar />

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
            About
          </li>
        </ol>
      </nav>

      {/* =================================================
          ABOUT PAGE
      ================================================= */}

      <main
        id="main-content"
        className="min-h-screen bg-[#080808] text-white"
      >
        {/* 01 — INTRODUCTION */}
        <AboutHero />

        {/* 02 — FOUNDER STORY */}
        <FounderStory />

        {/* 03 — WHAT WE BUILD */}
        <WhatWeBuild />

        {/* 04 — OUR APPROACH */}
        <OurApproach />

        {/* 05 — CAPABILITIES */}
        <Capabilities />

        {/* 06 — REAL WORK / PROOF */}
        <ProofPortfolio />

        {/* 07 — VALUES */}
        <Values />

        {/* 08 — WHY WORK WITH US */}
        <WhyWorkWithUs />

        {/* 09 — LONG-TERM VISION */}
        <FutureVision />

        {/* 10 — ABOUT FAQ */}
        <AboutFAQSection />

        {/* 11 — FINAL CTA */}
        <AboutCTA />
      </main>

      {/* =================================================
          FOOTER
      ================================================= */}

      <Footer />
    </>
  );
}