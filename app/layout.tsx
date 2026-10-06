import type { Metadata } from "next";

import "./globals.css";

import GlobalStructuredData from "@/components/seo/GlobalStructuredData";

/* =========================================================
   SITE CONFIG
========================================================= */

const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL ||
  "https://www.amandigitalsolutions.com"
).replace(/\/$/, "");

const SITE_NAME =
  "Aman Digital Solutions";

const DEFAULT_TITLE =
  "Aman Digital Solutions | Web Development & Digital Solutions";

const DEFAULT_DESCRIPTION =
  "Aman Digital Solutions is a Shimla-based web development and digital solutions studio offering professional websites, e-commerce, custom web applications, SEO and digital solutions for businesses in Himachal Pradesh, across India and beyond.";

/* =========================================================
   METADATA
========================================================= */

export const metadata: Metadata = {
  /*
   * IMPORTANT:
   * Keep this as a plain string.
   *
   * Individual pages already define their complete SEO titles.
   * No global "| Aman Digital Solutions" template is applied.
   */
  title:
    DEFAULT_TITLE,

  description:
    DEFAULT_DESCRIPTION,

  applicationName:
    SITE_NAME,

  metadataBase:
    new URL(SITE_URL),

  authors: [
    {
      name:
        SITE_NAME,
      url:
        SITE_URL,
    },
  ],

  creator:
    SITE_NAME,

  publisher:
    SITE_NAME,

  category:
    "technology",

  alternates: {
    canonical:
      SITE_URL,
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

  icons: {
    icon:
      "/icon.png",

    apple:
      "/apple-icon.png",
  },

  openGraph: {
    title:
      DEFAULT_TITLE,

    description:
      DEFAULT_DESCRIPTION,

    url:
      SITE_URL,

    siteName:
      SITE_NAME,

    type:
      "website",

    locale:
      "en_IN",

    images: [
      {
        url:
          "/og-image.png",

        width:
          1200,

        height:
          630,

        alt:
          "Aman Digital Solutions | Web Development & Digital Solutions",
      },
    ],
  },

  twitter: {
    card:
      "summary_large_image",

    title:
      DEFAULT_TITLE,

    description:
      DEFAULT_DESCRIPTION,

    images: [
      "/og-image.png",
    ],
  },

  formatDetection: {
    telephone:
      true,

    email:
      true,

    address:
      true,
  },

  referrer:
    "strict-origin-when-cross-origin",
};

/* =========================================================
   VIEWPORT
========================================================= */

export const viewport = {
  width:
    "device-width",

  initialScale:
    1,

  themeColor:
    "#050505",

  colorScheme:
    "dark",
};

/* =========================================================
   ROOT LAYOUT
========================================================= */

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        {/* =================================================
            GLOBAL STRUCTURED DATA
        ================================================= */}

        <GlobalStructuredData />

        {/* =================================================
            APPLICATION
        ================================================= */}

        {children}
      </body>
    </html>
  );
}