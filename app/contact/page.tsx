import type { Metadata } from "next";
import Link from "next/link";

import Navbar from "@/components/agency/navbar/Navbar";
import Footer from "@/components/agency/footer/Footer";

import ContactHero from "@/components/contact/ContactHero";
import ContactMethods from "@/components/contact/ContactMethods";
import ContactForm from "@/components/contact/ContactForm";
import ContactExpectations from "@/components/contact/ContactExpectations";
import ContactCTA from "@/components/contact/ContactCTA";

/* =========================================================
   SITE CONFIG
========================================================= */

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ||
  "https://www.amandigitalsolutions.com";

const CONTACT_URL =
  `${SITE_URL}/contact`;

/* =========================================================
   METADATA
========================================================= */

export const metadata: Metadata = {
  title:
    "Contact Aman Digital Solutions | Web Development in Shimla",

  description:
    "Contact Aman Digital Solutions to discuss a website, e-commerce store, web application or digital project for your business in Shimla, Himachal Pradesh, India or beyond.",

  alternates: {
    canonical:
      CONTACT_URL,
  },

  openGraph: {
    title:
      "Contact Aman Digital Solutions | Web Development in Shimla",

    description:
      "Start a conversation about your next website, web application, e-commerce store or digital project with Aman Digital Solutions.",

    url:
      CONTACT_URL,

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
      "Contact Aman Digital Solutions | Web Development in Shimla",

    description:
      "Start a conversation about your next website, web application, e-commerce or digital project.",
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
   CONTACT PAGE STRUCTURED DATA
========================================================= */

const contactPageSchema = {
  "@type":
    "ContactPage",

  "@id":
    `${CONTACT_URL}#contactpage`,

  url:
    CONTACT_URL,

  name:
    "Contact Aman Digital Solutions",

  description:
    "Contact Aman Digital Solutions to discuss websites, web applications, e-commerce stores, business systems and digital projects.",

  isPartOf: {
    "@id":
      `${SITE_URL}/#website`,
  },

  breadcrumb: {
    "@id":
      `${CONTACT_URL}#breadcrumb`,
  },

  mainEntity: {
    "@id":
      `${SITE_URL}/#organization`,
  },
};

/* =========================================================
   BREADCRUMB STRUCTURED DATA
========================================================= */

const breadcrumbSchema = {
  "@type":
    "BreadcrumbList",

  "@id":
    `${CONTACT_URL}#breadcrumb`,

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
        "Contact",

      item:
        CONTACT_URL,
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
    contactPageSchema,
    breadcrumbSchema,
  ],
};

/* =========================================================
   PAGE
========================================================= */

export default function ContactPage() {
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
            Contact
          </li>
        </ol>
      </nav>

      {/* =================================================
          CONTACT PAGE
      ================================================= */}

      <main className="min-h-screen bg-[#080808] text-white">
        {/* 01 — INTRO */}
        <ContactHero />

        {/* 02 — DIRECT CONTACT OPTIONS */}
        <ContactMethods />

        {/* 03 — PROJECT ENQUIRY */}
        <ContactForm />

        {/* 04 — WHAT HAPPENS NEXT */}
        <ContactExpectations />

        {/* 05 — DIRECT CONVERSATION */}
        <ContactCTA />
      </main>

      {/* =================================================
          FOOTER
      ================================================= */}

      <Footer />
    </>
  );
}