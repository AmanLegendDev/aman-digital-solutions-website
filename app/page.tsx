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

/* =========================================================
   HOMEPAGE SEO CONFIG
========================================================= */

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ||
  "https://www.amandigitalsolutions.com";

const HOME_TITLE =
  "Web Development & Digital Solutions in Shimla | Aman Digital Solutions";

const HOME_DESCRIPTION =
  "Aman Digital Solutions is a Shimla-based web development and digital solutions company building modern business websites, e-commerce stores, custom web applications and SEO-ready digital experiences for businesses across Himachal Pradesh, India and beyond.";

/* =========================================================
   HOMEPAGE METADATA
========================================================= */

export const metadata: Metadata = {
  title: HOME_TITLE,

  description: HOME_DESCRIPTION,

  alternates: {
    canonical: SITE_URL,
  },

  robots: {
    index: true,
    follow: true,
  },

  openGraph: {
    title: HOME_TITLE,

    description:
      "Modern websites, e-commerce stores, custom web applications and digital solutions for businesses in Shimla, Himachal Pradesh, across India and beyond.",

    url: SITE_URL,

    type: "website",

    siteName: "Aman Digital Solutions",

    locale: "en_IN",

    images: [
      {
        url: `${SITE_URL}/og-image.png`,
        width: 1200,
        height: 630,
        alt: "Aman Digital Solutions - Web Development and Digital Solutions in Shimla",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",

    title: HOME_TITLE,

    description:
      "Web development and digital solutions for businesses in Shimla, Himachal Pradesh, across India and beyond.",

    images: [`${SITE_URL}/og-image.png`],
  },
};

/* =========================================================
   HOMEPAGE
========================================================= */

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

        <TestimonialsSection />

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