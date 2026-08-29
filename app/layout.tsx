import type { Metadata, Viewport } from "next";
import "./globals.css";

import GlobalStructuredData from "@/components/seo/GlobalStructuredData";

/* =========================================================
   SITE CONFIG
========================================================= */

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ||
  "https://amandigitalsolutions.com";

/* =========================================================
   GLOBAL METADATA
========================================================= */

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),

  /* =======================================================
     TITLE
  ======================================================= */

  title: {
    default:
      "Aman Digital Solutions | Web Development & Digital Solutions",

    template:
      "%s | Aman Digital Solutions",
  },

  /* =======================================================
     DESCRIPTION
  ======================================================= */

  description:
    "Aman Digital Solutions builds fast, modern websites, web applications, e-commerce platforms, SEO solutions and business systems for businesses in Shimla, across India and worldwide.",

  /* =======================================================
     APPLICATION / BRAND
  ======================================================= */

  applicationName:
    "Aman Digital Solutions",

  authors: [
    {
      name:
        "Aman Digital Solutions",

      url:
        SITE_URL,
    },
  ],

  creator:
    "Aman Digital Solutions",

  publisher:
    "Aman Digital Solutions",

  category:
    "Technology",

  /* =======================================================
     KEYWORDS
  ======================================================= */

  keywords: [
    "Aman Digital Solutions",
    "web development",
    "website development",
    "web design",
    "web application development",
    "ecommerce website development",
    "business website development",
    "custom web development",
    "SEO services",
    "digital solutions",
    "business systems",
    "website developer Shimla",
    "web development Shimla",
    "web development India",
  ],

  /* =======================================================
     CANONICAL
  ======================================================= */

  alternates: {
    canonical:
      SITE_URL,
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

      "max-image-preview":
        "large",

      "max-snippet":
        -1,

      "max-video-preview":
        -1,
    },
  },

  /* =======================================================
     ICONS
  ======================================================= */

  icons: {
    icon: [
      {
        url:
          "/icon.png",

        type:
          "image/png",

        sizes:
          "512x512",
      },
    ],

    shortcut:
      "/icon.png",

    apple: [
      {
        url:
          "/apple-icon.png",

        sizes:
          "512x512",

        type:
          "image/png",
      },
    ],
  },

  /* =======================================================
     OPEN GRAPH
  ======================================================= */

  openGraph: {
    type:
      "website",

    locale:
      "en_IN",

    url:
      SITE_URL,

    siteName:
      "Aman Digital Solutions",

    title:
      "Aman Digital Solutions | Web Development & Digital Solutions",

    description:
      "Fast, modern websites, web applications, e-commerce platforms, SEO and business systems built for businesses in Shimla, India and worldwide.",

    images: [
      {
        url:
          "/og-image.png",

        width:
          1200,

        height:
          630,

        alt:
          "Aman Digital Solutions — Web Development & Digital Solutions",
      },
    ],
  },

  /* =======================================================
     TWITTER / X
  ======================================================= */

  twitter: {
    card:
      "summary_large_image",

    title:
      "Aman Digital Solutions | Web Development & Digital Solutions",

    description:
      "Modern websites, web applications, e-commerce, SEO and business systems for businesses in India and worldwide.",

    images: [
      "/og-image.png",
    ],
  },

  /* =======================================================
     FORMAT DETECTION
  ======================================================= */

  formatDetection: {
    telephone:
      true,

    email:
      true,

    address:
      true,
  },
};

/* =========================================================
   VIEWPORT
========================================================= */

export const viewport: Viewport = {
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
  children:
    React.ReactNode;
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