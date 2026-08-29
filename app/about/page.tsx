import type { Metadata } from "next";

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

/* =========================================================
   SITE CONFIG
========================================================= */

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ||
  "https://www.amandigitalsolutions.com";

const ABOUT_URL =
  `${SITE_URL}/about`;

/* =========================================================
   METADATA
========================================================= */

export const metadata: Metadata = {
  title:
    "About Aman Digital Solutions | Founder-Led Digital Agency",

  description:
    "Learn about Aman Digital Solutions, a founder-led digital agency building modern websites, web applications, business systems and digital experiences for ambitious businesses worldwide.",

  alternates: {
    canonical:
      ABOUT_URL,
  },

  openGraph: {
    title:
      "About Aman Digital Solutions | Founder-Led Digital Agency",

    description:
      "Discover the story, approach, capabilities and vision behind Aman Digital Solutions.",

    url:
      ABOUT_URL,

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
      "About Aman Digital Solutions | Founder-Led Digital Agency",

    description:
      "Discover the story, approach and vision behind Aman Digital Solutions.",
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
   ABOUT PAGE STRUCTURED DATA
========================================================= */

const aboutPageSchema = {
  "@context":
    "https://schema.org",

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
    "@type":
      "Organization",

    name:
      "Aman Digital Solutions",

    url:
      SITE_URL,
  },

  breadcrumb: {
    "@id":
      `${ABOUT_URL}#breadcrumb`,
  },
};

/* =========================================================
   BREADCRUMB STRUCTURED DATA
========================================================= */

const breadcrumbSchema = {
  "@context":
    "https://schema.org",

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
              aboutPageSchema
            ),
        }}
      />

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
            <a href="/">
              Home
            </a>
          </li>

          <li aria-current="page">
            About
          </li>
        </ol>
      </nav>

      {/* =================================================
          ABOUT PAGE
      ================================================= */}

      <main className="min-h-screen bg-[#080808] text-white">
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

        {/* 10 — FINAL CTA */}
        <AboutCTA />
      </main>

      {/* =================================================
          FOOTER
      ================================================= */}

      <Footer />
    </>
  );
}