import type { Metadata } from "next";

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
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
};

/* =========================================================
   PRIVACY PAGE
========================================================= */

export default function PrivacyPage() {
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
            Privacy Policy
          </li>
        </ol>
      </nav>

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

      <Footer />
    </>
  );
}