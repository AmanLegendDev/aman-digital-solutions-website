import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

import { connectDB } from "@/lib/db/connect";
import FAQ from "@/models/FAQ";

import FAQIntro from "./FAQIntro";
import FAQAccordion from "./FAQAccordion";

async function getFAQs() {
  await connectDB();

  const faqs = await FAQ.find({
    published: true,
  })
    .sort({
      featured: -1,
      displayOrder: 1,
      createdAt: -1,
    })
    .limit(10)
    .select(
      [
        "question",
        "slug",
        "answer",
        "category",
        "featured",
      ].join(" ")
    )
    .lean();

  return faqs.map((faq) => ({
    id: faq._id.toString(),
    question: faq.question,
    slug: faq.slug,
    answer: faq.answer,
    category: faq.category ?? null,
    featured: faq.featured,
  }));
}

export default async function FAQSection() {
  const faqs = await getFAQs();

  if (faqs.length === 0) {
    return null;
  }

  const featuredFAQ =
    faqs.find((faq) => faq.featured) ?? faqs[0];

  const supportingFAQs = faqs.filter(
    (faq) => faq.id !== featuredFAQ.id
  );

  return (
    <section
      id="faq"
      aria-labelledby="faq-heading"
      className="relative w-full max-w-full scroll-mt-28 overflow-x-clip border-t border-[#1A1A1A] bg-[#050505] py-24 sm:py-28 lg:py-32"
    >
      {/* AMBIENT GLOW */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-40 top-1/3 h-[420px] w-[420px] rounded-full bg-[#FFC400]/[0.02] blur-[140px]"
      />

      <div className="relative mx-auto w-full max-w-7xl min-w-0 px-5 sm:px-8 lg:px-10">
        <div className="grid min-w-0 gap-14 lg:grid-cols-[0.72fr_1.28fr] lg:gap-20">
          {/* LEFT — STICKY INTRO */}
          <div className="min-w-0 lg:sticky lg:top-32 lg:self-start">
            <FAQIntro />
          </div>

          {/* RIGHT — FAQ */}
          <div className="min-w-0 w-full max-w-full">
            <FAQAccordion
              featuredFAQ={featuredFAQ}
              faqs={supportingFAQs}
            />

            {/* VIEW ALL FAQS */}
            <div className="mt-5 flex justify-end">
              <Link
                href="/faq"
                className="group inline-flex items-center gap-2 rounded-full border border-[#292929] bg-[#0A0A0A] px-5 py-3 text-xs font-medium text-[#BDBDBD] transition-all duration-200 hover:border-[#FFC400]/35 hover:bg-[#FFC400]/[0.06] hover:text-[#FFC400] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FFC400]"
              >
                View all FAQs

                <ArrowUpRight
                  size={14}
                  className="transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}