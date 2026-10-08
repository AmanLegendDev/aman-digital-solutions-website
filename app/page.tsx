import type { Metadata } from "next";

import { getWebPageSchema } from "@/lib/seo/schema";

import Navbar from "@/components/agency/navbar/Navbar";
import Hero from "@/components/agency/hero/Hero";
import TrustSection from "@/components/agency/trust/TrustSection";
import ServicesSection from "@/components/agency/services/ServicesSection";
import ProjectsSection from "@/components/agency/projects/ProjectsSection";
import WhyUsSection from "@/components/agency/why-us/WhyUsSection";
import PricingSection from "@/components/agency/pricing/PricingSection";
import LocationsSection from "@/components/agency/locations/LocationsSection";
import GallerySection from "@/components/agency/gallery/GallerySection";
import BlogSection from "@/components/agency/blog/BlogSection";
import FAQSection from "@/components/agency/faq/FAQSection";
import FinalCTA from "@/components/agency/cta/FinalCTA";
import Footer from "@/components/agency/footer/Footer";
import ReviewsSection from "@/components/agency/reviews/ReviewsSection";

import FAQ from "@/models/FAQ";
import { connectDB } from "@/lib/db/connect";
import AMI from "@/components/ami/AMI";

/* =========================================================
   SITE CONFIG
========================================================= */

const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL ||
  "https://www.amandigitalsolutions.com"
).replace(/\/$/, "");

const SITE_NAME =
  "Aman Digital Solutions";

const HOME_TITLE =
  "Web Development Company in Shimla | Aman Digital Solutions";

const HOME_DESCRIPTION =
  "Aman Digital Solutions is a web development company in Shimla building business websites, e-commerce stores and custom web applications for businesses in Himachal Pradesh, India and beyond.";

/*
 * Homepage content is managed through the CMS.
 * Hourly revalidation keeps the page fresh without
 * forcing a database request on every page view.
 */
export const revalidate = 3600;

/* =========================================================
   HOMEPAGE FAQS
========================================================= */

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
    .select(
      "question answer featured displayOrder"
    )
    .lean();

  return faqs.filter(
    (faq) =>
      typeof faq.question === "string" &&
      faq.question.trim().length > 0 &&
      typeof faq.answer === "string" &&
      faq.answer.trim().length > 0
  );
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

    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },

  openGraph: {
    title: HOME_TITLE,

    description:
      "Modern websites, e-commerce stores, custom web applications and digital solutions for businesses in Shimla, Himachal Pradesh, across India and beyond.",

    url: SITE_URL,

    type: "website",

    siteName: SITE_NAME,

    locale: "en_IN",

    images: [
      {
        url:
          `${SITE_URL}/og-image.png`,

        width: 1200,

        height: 630,

        alt:
          "Aman Digital Solutions - Web Development and Digital Solutions in Shimla",
      },
    ],
  },

  twitter: {
    card:
      "summary_large_image",

    title:
      HOME_TITLE,

    description:
      "Web development and digital solutions for businesses in Shimla, Himachal Pradesh, across India and beyond.",

    images: [
      `${SITE_URL}/og-image.png`,
    ],
  },
};

/* =========================================================
   HOMEPAGE
========================================================= */

export default async function HomePage() {
  /* =======================================================
     WEBPAGE SCHEMA
  ======================================================== */

  const webPageSchema =
    getWebPageSchema({
      url: SITE_URL,

      name:
        HOME_TITLE,

      description:
        HOME_DESCRIPTION,
    });

  /* =======================================================
     HOMEPAGE FAQS
  ======================================================== */

  const faqs =
    await getHomepageFAQs();

  /* =======================================================
     FAQ SCHEMA
  ======================================================== */

  const faqSchema =
    faqs.length > 0
      ? {
          "@context":
            "https://schema.org",

          "@type":
            "FAQPage",

          mainEntity:
            faqs.map((faq) => ({
              "@type":
                "Question",

              name:
                faq.question.trim(),

              acceptedAnswer: {
                "@type":
                  "Answer",

                text:
                  faq.answer.trim(),
              },
            })),
        }
      : null;

  /* =======================================================
     RENDER
  ======================================================== */

  return (
    <>
      {/* ===================================================
          HOMEPAGE WEBPAGE SCHEMA
      =================================================== */}

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html:
            JSON.stringify(
              webPageSchema
            ),
        }}
      />

      {/* ===================================================
          HOMEPAGE FAQ SCHEMA

          Only rendered when actual published FAQs
          are available from the CMS.
      =================================================== */}

      {faqSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html:
              JSON.stringify(
                faqSchema
              ),
          }}
        />
      )}

      {/* ===================================================
          NAVIGATION
      =================================================== */}

      <Navbar />

      {/* ===================================================
          MAIN CONTENT
      =================================================== */}

      <main id="main-content">
        <Hero />

        <TrustSection />

        <ServicesSection />

        <ProjectsSection />

        <ReviewsSection />

        <WhyUsSection />

        <PricingSection />

        <LocationsSection />

        <GallerySection />

        <BlogSection />

        <FAQSection />

        <FinalCTA />
      </main>

      {/* ===================================================
          FOOTER
      =================================================== */}
      <AMI />

      <Footer />
    </>
  );
}