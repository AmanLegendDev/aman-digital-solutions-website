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
import FAQ from "@/models/FAQ";
import { connectDB } from "@/lib/db/connect";

/* =========================================================
   HOMEPAGE SEO CONFIG
========================================================= */

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ||
  "https://www.amandigitalsolutions.com";

const HOME_TITLE =
  "Web Development Company in Shimla | Aman Digital Solutions";

const HOME_DESCRIPTION =
  "Aman Digital Solutions is a web development company in Shimla building business websites, e-commerce stores and custom web applications for businesses in Himachal Pradesh, India and beyond.";


  async function getHomepageFAQs() {
  await connectDB();

  const faqs = await FAQ.find({
    published: true,
  })
    .sort({
      featured: -1,
      displayOrder: 1,
      createdAt: -1,
    })
    .limit(7)
    .select("question answer")
    .lean();

  return faqs;
}

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

export default async function HomePage() {
  const webPageSchema = getWebPageSchema({
    url: SITE_URL,
    name: HOME_TITLE,
    description: HOME_DESCRIPTION,
  });

  const faqs = await getHomepageFAQs();

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((faq) => ({
    "@type": "Question",
    name: faq.question,
    acceptedAnswer: {
      "@type": "Answer",
      text: faq.answer,
    },
  })),
};

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


{faqs.length > 0 && (
  <script
    type="application/ld+json"
    dangerouslySetInnerHTML={{
      __html: JSON.stringify(faqSchema),
    }}
  />
)}
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