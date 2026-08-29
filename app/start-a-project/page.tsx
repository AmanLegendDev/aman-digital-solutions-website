import type { Metadata } from "next";

import { connectDB } from "@/lib/db/connect";
import Service from "@/models/Service";

import Navbar from "@/components/agency/navbar/Navbar";
import Footer from "@/components/agency/footer/Footer";

import StartProjectClient from "@/components/start-project/StartProjectClient";

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ||
  "https://www.amandigitalsolutions.com";

export const metadata: Metadata = {
  title: "Start a Project | Aman Digital Solutions",

  description:
    "Tell Aman Digital Solutions about your project and get a clear next step for your website, web application, e-commerce store or digital business solution.",

  alternates: {
    canonical: `${SITE_URL}/start-a-project`,
  },

  openGraph: {
    title: "Start a Project | Aman Digital Solutions",

    description:
      "Tell us what you're building and let's discuss the right digital solution for your business.",

    url: `${SITE_URL}/start-a-project`,

    type: "website",

    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Start a Project — Aman Digital Solutions",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",

    title: "Start a Project | Aman Digital Solutions",

    description:
      "Tell us what you're building and let's discuss the right digital solution for your business.",

    images: ["/og-image.png"],
  },

  robots: {
    index: true,
    follow: true,
  },
};

export default async function StartProjectPage() {
  await connectDB();

  const services = await Service.find({
    published: true,
  })
    .select("_id title shortDescription")
    .sort({
      displayOrder: 1,
      title: 1,
    })
    .lean();

  const serviceOptions = services.map((service) => ({
    _id: String(service._id),
    title: service.title,
    shortDescription: service.shortDescription,
  }));

  return (
    <>
      <Navbar />

      <main
        id="main-content"
        className="min-h-screen bg-[#050505] text-white mt-16"
      >
        <StartProjectClient
          services={serviceOptions}
        />
      </main>

      <Footer />
    </>
  );
}