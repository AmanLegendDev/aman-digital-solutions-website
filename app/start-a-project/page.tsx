import type { Metadata } from "next";

import { connectDB } from "@/lib/db/connect";
import Service from "@/models/Service";

import Navbar from "@/components/agency/navbar/Navbar";
import Footer from "@/components/agency/footer/Footer";

import StartProjectClient from "@/components/start-project/StartProjectClient";

/* =========================================================
   SITE CONFIG
========================================================= */

const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL ||
  "https://www.amandigitalsolutions.com"
).replace(/\/$/, "");

const PAGE_URL =
  `${SITE_URL}/start-a-project`;

/*
 * Services used by the project form do not change frequently.
 * Revalidate the generated page every hour.
 */
export const revalidate = 3600;

/* =========================================================
   METADATA
========================================================= */

export const metadata: Metadata = {
  title:
    "Start a Project | Aman Digital Solutions",

  description:
    "Tell Aman Digital Solutions about your website or digital project and get a clear next step for web development, e-commerce, custom web applications and digital solutions.",

  alternates: {
    canonical:
      PAGE_URL,
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

  openGraph: {
    title:
      "Start a Project | Aman Digital Solutions",

    description:
      "Tell us what you're building and let's discuss the right digital solution for your business.",

    url:
      PAGE_URL,

    type: "website",

    siteName:
      "Aman Digital Solutions",

    locale:
      "en_IN",

    images: [
      {
        url:
          `${SITE_URL}/og-image.png`,

        width: 1200,

        height: 630,

        alt:
          "Start a Project - Aman Digital Solutions",
      },
    ],
  },

  twitter: {
    card:
      "summary_large_image",

    title:
      "Start a Project | Aman Digital Solutions",

    description:
      "Tell us what you're building and let's discuss the right digital solution for your business.",

    images: [
      `${SITE_URL}/og-image.png`,
    ],
  },
};

/* =========================================================
   FETCH PROJECT SERVICES
========================================================= */

async function getProjectServices() {
  await connectDB();

  const services =
    await Service.find({
      published: true,
    })
      .select(
        "_id title shortDescription"
      )
      .sort({
        displayOrder: 1,
        title: 1,
      })
      .lean();

  return services
    .filter(
      (service) =>
        Boolean(service.title)
    )
    .map((service) => ({
      _id:
        String(service._id),

      title:
        service.title,

      shortDescription:
        service.shortDescription ||
        "",
    }));
}

/* =========================================================
   PAGE
========================================================= */

export default async function StartProjectPage() {
  const services =
    await getProjectServices();

  return (
    <>
      <Navbar />

      <main
        id="main-content"
        className="mt-16 min-h-screen bg-[#050505] text-white"
      >
        <StartProjectClient
          services={
            services
          }
        />
      </main>

      <Footer />
    </>
  );
}