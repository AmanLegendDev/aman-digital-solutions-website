import type { Metadata } from "next";

import { connectDB } from "@/lib/db/connect";
import FAQ from "@/models/FAQ";

import FAQPageClient, {
  type FAQData,
} from "@/components/faq/FAQPageClient";

/* =========================================================
   METADATA
========================================================= */

export const metadata: Metadata = {
  title: "Frequently Asked Questions | Aman Digital Solutions",

  description:
    "Find answers to common questions about Aman Digital Solutions, our services, projects, pricing, process and working together.",

  alternates: {
    canonical:
      "https://www.amandigitalsolutions.in/faq",
  },

  openGraph: {
    title:
      "Frequently Asked Questions | Aman Digital Solutions",

    description:
      "Find clear answers about our services, projects, pricing and process.",

    url:
      "https://www.amandigitalsolutions.in/faq",

    type: "website",
  },

  twitter: {
    card: "summary_large_image",

    title:
      "Frequently Asked Questions | Aman Digital Solutions",

    description:
      "Find clear answers about our services, projects, pricing and process.",
  },
};

/* =========================================================
   FETCH FAQS
========================================================= */

async function getPublishedFAQs(): Promise<
  FAQData[]
> {
  await connectDB();

  const faqs = await FAQ.find({
    published: true,
  })
    .sort({
      featured: -1,
      displayOrder: 1,
      createdAt: -1,
    })
    .lean();

  return faqs.map((faq) => ({
    _id: String(faq._id),

    question: faq.question,

    slug: faq.slug,

    answer: faq.answer,

    category:
      faq.category?.trim() || undefined,

    relatedService:
      faq.relatedService
        ? String(faq.relatedService)
        : undefined,

    relatedProject:
      faq.relatedProject
        ? String(faq.relatedProject)
        : undefined,

    featured: faq.featured,

    displayOrder: faq.displayOrder,
  }));
}

/* =========================================================
   PAGE
========================================================= */

export default async function FAQPage() {
  const faqs = await getPublishedFAQs();

  return (
    <FAQPageClient
      faqs={faqs}
    />
  );
}