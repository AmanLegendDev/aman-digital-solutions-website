import type { Metadata } from "next";

import { getWebPageSchema } from "@/lib/seo/schema";

import Navbar from "@/components/agency/navbar/Navbar";
import Hero from "@/components/agency/hero/Hero";
import TrustSection from "@/components/agency/trust/TrustSection";
import ServicesSection from "@/components/agency/services/ServicesSection";
import ProjectsSection from "@/components/agency/projects/ProjectsSection";
import WhyUsSection from "@/components/agency/why-us/WhyUsSection";
import TestimonialsSection from "@/components/agency/testimonials/TestimonialsSection";
import PricingSection from "@/components/agency/pricing/PricingSection";
import LocationsSection from "@/components/agency/locations/LocationsSection";
import GallerySection from "@/components/agency/gallery/GallerySection";
import BlogSection from "@/components/agency/blog/BlogSection";
import FAQSection from "@/components/agency/faq/FAQSection";
import FinalCTA from "@/components/agency/cta/FinalCTA";
import Footer from "@/components/agency/footer/Footer";

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ||
  "https://www.amandigitalsolutions.com";

const HOME_TITLE =
  "Web Development & Digital Solutions for Businesses | Aman Digital Solutions";

const HOME_DESCRIPTION =
  "Aman Digital Solutions builds fast, modern websites, web applications, e-commerce platforms, SEO strategies and business systems for businesses across India and worldwide, from Shimla, Himachal Pradesh.";

export const metadata: Metadata = {
  title: HOME_TITLE,

  description: HOME_DESCRIPTION,

  alternates: {
    canonical: "/",
  },

  robots: {
    index: true,
    follow: true,
  },

  openGraph: {
    title: HOME_TITLE,

    description:
      "Modern websites, web applications, e-commerce platforms, SEO and business systems built for businesses across India and worldwide.",

    url: "/",

    type: "website",

    siteName: "Aman Digital Solutions",

    locale: "en_IN",
  },

  twitter: {
    card: "summary_large_image",

    title: HOME_TITLE,

    description:
      "Modern websites, web applications, e-commerce platforms, SEO and business systems built for businesses across India and worldwide.",
  },
};

export default function HomePage() {
  const webPageSchema = getWebPageSchema({
    url: SITE_URL,

    name: HOME_TITLE,

    description: HOME_DESCRIPTION,
  });

  return (
    <>
      {/* =====================================================
          HOMEPAGE STRUCTURED DATA
      ===================================================== */}

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(webPageSchema),
        }}
      />

      <Navbar />

      <main id="main-content">
        <Hero />

        <TrustSection />

        <ServicesSection />

        <ProjectsSection />

        <WhyUsSection />


        <PricingSection />

        <LocationsSection />

        <GallerySection />

        <BlogSection />

        <FAQSection />

        <FinalCTA />
      </main>

      <Footer />
    </>
  );
}