import type { Metadata } from "next";

import "./globals.css";

import GlobalStructuredData from "@/components/seo/GlobalStructuredData";
import { getSiteSettings } from "@/lib/site-settings/getSiteSettings";
import SiteAnalytics from "@/components/analytics/SiteAnalytics";
import CookieBannerWrapper from "@/components/cookies/CookieBannerWrapper";
import AMI from "@/components/ami/AMI";

/* =========================================================
   SITE CONFIG
========================================================= */

const FALLBACK_SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL ||
  "https://www.amandigitalsolutions.com"
).replace(/\/$/, "");

const FALLBACK_SITE_NAME =
  "Aman Digital Solutions";

const FALLBACK_TITLE =
  "Aman Digital Solutions | Web Development & Digital Solutions";

const FALLBACK_DESCRIPTION =
  "Aman Digital Solutions is a Shimla-based web development and digital solutions studio offering professional websites, e-commerce, custom web applications, SEO and digital solutions for businesses in Himachal Pradesh, across India and beyond.";

const FALLBACK_OG_IMAGE =
  "/og-image.png";

/* =========================================================
   METADATA
========================================================= */

export async function generateMetadata(): Promise<Metadata> {
  const settings =
    await getSiteSettings();

  const siteUrl =
    (
      settings?.defaultCanonicalBaseUrl ||
      FALLBACK_SITE_URL
    ).replace(/\/$/, "");

  const siteName =
    settings?.siteName ||
    FALLBACK_SITE_NAME;

  const title =
    settings?.seoTitle ||
    FALLBACK_TITLE;

  const description =
    settings?.seoDescription ||
    FALLBACK_DESCRIPTION;

  const ogImage =
    settings?.defaultOgImage?.url ||
    FALLBACK_OG_IMAGE;

  const logo =
    settings?.favicon?.url ||
    "/icon.png";

  return {
    /*
     * IMPORTANT:
     * Keep this as a plain string.
     *
     * Individual pages already define their complete SEO titles.
     * No global title template is applied.
     */
    title,

    description,

    applicationName:
      siteName,

    metadataBase:
      new URL(siteUrl),

    authors: [
      {
        name: siteName,
        url: siteUrl,
      },
    ],

    creator: siteName,

    publisher: siteName,

    category: "technology",

    alternates: {
      canonical: siteUrl,
    },

    robots: {
      index: true,
      follow: true,

      googleBot: {
        index: true,
        follow: true,

        "max-image-preview":
          "large",

        "max-snippet": -1,

        "max-video-preview":
          -1,
      },
    },

    icons: {
      icon: logo,

      apple:
        "/apple-icon.png",
    },

    openGraph: {
      title,

      description,

      url: siteUrl,

      siteName,

      type: "website",

      locale: "en_IN",

      images: [
        {
          url: ogImage,

          width: 1200,

          height: 630,

          alt: title,
        },
      ],
    },

    twitter: {
      card:
        "summary_large_image",

      title,

      description,

      images: [ogImage],
    },

    formatDetection: {
      telephone: true,

      email: true,

      address: true,
    },

    referrer:
      "strict-origin-when-cross-origin",
  };
}

/* =========================================================
   VIEWPORT
========================================================= */

export const viewport = {
  width: "device-width",

  initialScale: 1,

  themeColor: "#050505",

  colorScheme: "dark",
};

/* =========================================================
   ROOT LAYOUT
========================================================= */

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const settings = await getSiteSettings();

  return (
    <html lang="en">
      <body>
        {/* =================================================
            GLOBAL STRUCTURED DATA
        ================================================= */}

        <GlobalStructuredData />

        {/* =================================================
            ANALYTICS & TRACKING
        ================================================= */}

        <SiteAnalytics
          googleAnalyticsId={
            settings?.googleAnalyticsId
          }
          googleTagManagerId={
            settings?.googleTagManagerId
          }
          facebookPixelId={
            settings?.facebookPixelId
          }
        />
<CookieBannerWrapper />
        {/* =================================================
            APPLICATION
        ================================================= */}

        {children}

        <AMI />
      </body>
    </html>
  );
}