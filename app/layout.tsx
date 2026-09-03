import type { Metadata, Viewport } from "next";
import "./globals.css";

import GlobalStructuredData from "@/components/seo/GlobalStructuredData";

/* =========================================================
   SITE CONFIG
========================================================= */

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ||
  "https://www.amandigitalsolutions.com";

const SITE_NAME = "Aman Digital Solutions";

const DEFAULT_TITLE =
  "Aman Digital Solutions | Web Development & Digital Solutions";

const DEFAULT_DESCRIPTION =
  "Aman Digital Solutions is a Shimla-based web development and digital solutions company building modern business websites, e-commerce stores, custom web applications and SEO-ready digital experiences for businesses across Himachal Pradesh, India and beyond.";

/* =========================================================
   GLOBAL METADATA
========================================================= */

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),

  /* =======================================================
     TITLE
  ======================================================= */

  title: {
    default: DEFAULT_TITLE,
    template: "%s | Aman Digital Solutions",
  },

  /* =======================================================
     DESCRIPTION
  ======================================================= */

  description: DEFAULT_DESCRIPTION,

  /* =======================================================
     APPLICATION / BRAND
  ======================================================= */

  applicationName: SITE_NAME,

  authors: [
    {
      name: SITE_NAME,
      url: SITE_URL,
    },
  ],

  creator: SITE_NAME,
  publisher: SITE_NAME,

  category: "technology",

  /* =======================================================
     CANONICAL
  ======================================================= */

  alternates: {
    canonical: SITE_URL,
  },

  /* =======================================================
     ROBOTS
  ======================================================= */

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

  /* =======================================================
     ICONS
  ======================================================= */

  icons: {
    icon: [
      {
        url: "/icon.png",
        type: "image/png",
        sizes: "512x512",
      },
    ],

    shortcut: "/icon.png",

    apple: [
      {
        url: "/apple-icon.png",
        type: "image/png",
        sizes: "512x512",
      },
    ],
  },

  /* =======================================================
     OPEN GRAPH
  ======================================================= */

  openGraph: {
    type: "website",
    locale: "en_IN",
    url: SITE_URL,
    siteName: SITE_NAME,

    title: DEFAULT_TITLE,

    description:
      "Modern websites, e-commerce stores, custom web applications and digital solutions for businesses in Shimla, across Himachal Pradesh, India and beyond.",

    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt:
          "Aman Digital Solutions — Web Development & Digital Solutions",
      },
    ],
  },

  /* =======================================================
     TWITTER / X
  ======================================================= */

  twitter: {
    card: "summary_large_image",

    title: DEFAULT_TITLE,

    description:
      "Modern websites, e-commerce stores, custom web applications and digital solutions for businesses in Shimla, Himachal Pradesh, India and beyond.",

    images: ["/og-image.png"],
  },

  /* =======================================================
     FORMAT DETECTION
  ======================================================= */

  formatDetection: {
    telephone: true,
    email: true,
    address: true,
  },

  /* =======================================================
     REFERRER
  ======================================================= */

  referrer: "strict-origin-when-cross-origin",
};

/* =========================================================
   VIEWPORT
========================================================= */

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,

  themeColor: "#050505",

  colorScheme: "dark",
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
        <GlobalStructuredData />

        {children}
      </body>
    </html>
  );
}