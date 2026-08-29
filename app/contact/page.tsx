import type { Metadata } from "next";

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
    "Contact Aman Digital Solutions | Start Your Project",

  description:
    "Have a website, e-commerce store, web application or digital project in mind? Contact Aman Digital Solutions to discuss your requirements and start your project.",

  alternates: {
    canonical:
      CONTACT_URL,
  },

  openGraph: {
    title:
      "Contact Aman Digital Solutions | Start Your Project",

    description:
      "Tell Aman Digital Solutions what you are building, improving or growing and discuss the right digital solution for your business.",

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
      "Contact Aman Digital Solutions | Start Your Project",

    description:
      "Start a conversation about your next website, web application, e-commerce or digital project.",
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
   STRUCTURED DATA — CONTACT PAGE
========================================================= */

const contactPageSchema = {
  "@context":
    "https://schema.org",

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
    "@type":
      "Organization",

    name:
      "Aman Digital Solutions",

    url:
      SITE_URL,
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
              contactPageSchema
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