import type { Metadata } from "next";

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
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
};

/* =========================================================
   PAGE
========================================================= */

export default function TermsPage() {
  return (
    <>
      <Navbar />

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
            Terms of Service
          </li>
        </ol>
      </nav>

      <main className="min-h-screen bg-[#050505] text-white">
        <TermsHero />

        <TermsBasics />

        <TermsProject />

        <TermsLegal />

        <TermsContact />
      </main>

      <Footer />
    </>
  );
}