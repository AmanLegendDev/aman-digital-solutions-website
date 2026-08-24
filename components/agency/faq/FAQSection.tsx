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
      {/* Ambient glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-40 top-1/3 h-[420px] w-[420px] rounded-full bg-[#FFC400]/[0.02] blur-[140px]"
      />

      <div className="relative mx-auto w-full max-w-7xl min-w-0 px-5 sm:px-8 lg:px-10">
        <div className="grid min-w-0 gap-14 lg:grid-cols-[0.72fr_1.28fr] lg:gap-20">
          {/* INTRO */}
          <div className="min-w-0 lg:sticky lg:top-32 lg:self-start">
            <FAQIntro />
          </div>

          {/* QUESTIONS */}
          <div className="min-w-0 w-full max-w-full">
            <FAQAccordion
              featuredFAQ={featuredFAQ}
              faqs={supportingFAQs}
            />
          </div>
        </div>
      </div>
    </section>
  );
}