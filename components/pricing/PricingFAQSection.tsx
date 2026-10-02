"use client";

import Link from "next/link";
import { useState } from "react";
import {
  ArrowRight,
  ChevronDown,
  CircleHelp,
} from "lucide-react";

/* =========================================================
   FAQ DATA
========================================================= */

const pricingFAQs = [
  {
    question: "How much does a website cost?",
    answer:
      "Website development pricing depends on the project's scope, design, features and functionality. Aman Digital Solutions offers solutions for business websites, e-commerce stores and custom digital systems, with pricing based on the requirements of each project.",
  },
  {
    question: "What is included in a website development plan?",
    answer:
      "Each plan includes the features and deliverables specified for that package. The exact scope can vary depending on the type of website, required functionality, content, integrations and design requirements. Project requirements are confirmed before development begins.",
  },
  {
    question: "Do you build e-commerce websites?",
    answer:
      "Yes. We build e-commerce websites with product catalogues, categories, shopping experiences and other business features required for selling online. The final functionality depends on the project's requirements and selected scope.",
  },
  {
    question: "Can you build a custom website for my business?",
    answer:
      "Yes. Custom websites can be designed and developed around your business goals, brand identity, content, functionality and customer experience instead of relying on a one-size-fits-all layout.",
  },
  {
    question: "How long does website development take?",
    answer:
      "The development timeline depends on the project's size, number of pages, features, content availability and revision requirements. A clear timeline can be discussed once the project scope has been defined.",
  },
  {
    question: "Can you redesign or improve my existing website?",
    answer:
      "Yes. Existing websites can be redesigned or improved to address visual design, user experience, mobile responsiveness, performance, content structure and other business requirements.",
  },
  {
    question: "Can you maintain my website after launch?",
    answer:
      "Yes. Website maintenance, content updates, improvements, technical changes and ongoing support can be provided according to your requirements after the website is launched.",
  },
  {
    question: "Do you work with businesses outside Shimla?",
    answer:
      "Yes. Aman Digital Solutions works with businesses across Himachal Pradesh, throughout India and with remote clients beyond India.",
  },
];

export const pricingFAQSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: pricingFAQs.map((faq) => ({
    "@type": "Question",
    name: faq.question,
    acceptedAnswer: {
      "@type": "Answer",
      text: faq.answer,
    },
  })),
};

/* =========================================================
   COMPONENT
========================================================= */

export default function PricingFAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section
      aria-labelledby="pricing-faq-heading"
      className="relative overflow-hidden border-t border-white/[0.06] bg-[#050505] px-5 py-20 sm:px-8 sm:py-24 lg:px-10 lg:py-28"
    >
      {/* =====================================================
          SUBTLE BACKGROUND
      ===================================================== */}

      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-[-180px] h-[420px] w-[720px] -translate-x-1/2 rounded-full bg-[#FFC400]/[0.025] blur-[140px]"
      />

      <div className="relative mx-auto max-w-5xl">
        {/* =====================================================
            HEADER
        ===================================================== */}

        <div className="mx-auto max-w-2xl text-center">
          <div className="mx-auto flex h-11 w-11 items-center justify-center rounded-2xl border border-[#FFC400]/15 bg-[#FFC400]/[0.04] text-[#FFC400]">
            <CircleHelp
              size={19}
              strokeWidth={1.5}
              aria-hidden="true"
            />
          </div>

          <div className="mt-6 flex items-center justify-center gap-3">
            <span
              aria-hidden="true"
              className="h-px w-8 bg-[#FFC400]/30"
            />

            <p className="text-[9px] font-semibold uppercase tracking-[0.22em] text-[#FFC400]">
              Pricing FAQ
            </p>

            <span
              aria-hidden="true"
              className="h-px w-8 bg-[#FFC400]/30"
            />
          </div>

          <h2
            id="pricing-faq-heading"
            className="mt-5 text-3xl font-semibold leading-[1.05] tracking-[-0.045em] text-white sm:text-4xl lg:text-5xl"
          >
            Before you build,
            <br />
            <span className="text-neutral-500">
              know what to expect.
            </span>
          </h2>

          <p className="mx-auto mt-5 max-w-xl text-sm leading-7 text-neutral-500 sm:text-base sm:leading-8">
            Clear answers about website pricing, project scope,
            development timelines and ongoing support from Aman
            Digital Solutions.
          </p>
        </div>

        {/* =====================================================
            FAQ ACCORDION
        ===================================================== */}

        <div className="mx-auto mt-12 max-w-4xl overflow-hidden rounded-[28px] border border-white/[0.07] bg-[#080808]">
          {pricingFAQs.map((faq, index) => {
            const isOpen = openIndex === index;

            return (
              <div
                key={faq.question}
                className="border-b border-white/[0.06] last:border-b-0"
              >
                <button
                  type="button"
                  aria-expanded={isOpen}
                  aria-controls={`pricing-faq-answer-${index}`}
                  onClick={() =>
                    setOpenIndex(
                      isOpen ? null : index
                    )
                  }
                  className="flex w-full items-center justify-between gap-6 px-5 py-5 text-left transition-colors duration-200 hover:bg-white/[0.015] sm:px-7 sm:py-6"
                >
                  <span
                    className={[
                      "text-sm font-medium leading-6 transition-colors duration-200 sm:text-base",
                      isOpen
                        ? "text-white"
                        : "text-neutral-300",
                    ].join(" ")}
                  >
                    {faq.question}
                  </span>

                  <span
                    className={[
                      "flex h-8 w-8 shrink-0 items-center justify-center rounded-full border transition-all duration-300",
                      isOpen
                        ? "border-[#FFC400]/25 bg-[#FFC400]/[0.06] text-[#FFC400]"
                        : "border-white/[0.07] text-neutral-600",
                    ].join(" ")}
                  >
                    <ChevronDown
                      size={15}
                      className={[
                        "transition-transform duration-300",
                        isOpen
                          ? "rotate-180"
                          : "rotate-0",
                      ].join(" ")}
                    />
                  </span>
                </button>

                <div
                  id={`pricing-faq-answer-${index}`}
                  hidden={!isOpen}
                >
                  <div className="px-5 pb-6 sm:px-7 sm:pb-7">
                    <p className="max-w-3xl text-sm leading-7 text-neutral-500">
                      {faq.answer}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* =====================================================
            ALL FAQ CTA
        ===================================================== */}

        <div className="mt-10 flex flex-col items-center justify-center gap-4 text-center">
          <p className="text-xs leading-6 text-neutral-600">
            Have another question about your project?
          </p>

          <Link
            href="/faq"
            className="group inline-flex items-center gap-2.5 rounded-full border border-white/[0.08] bg-white/[0.025] px-5 py-3 text-[9px] font-semibold uppercase tracking-[0.16em] text-neutral-400 transition-all duration-300 hover:border-[#FFC400]/25 hover:bg-[#FFC400]/[0.05] hover:text-[#FFC400]"
          >
            View all FAQs

            <ArrowRight
              size={13}
              className="transition-transform duration-300 group-hover:translate-x-0.5"
            />
          </Link>
        </div>
      </div>

      {/* =====================================================
          FAQ STRUCTURED DATA
      ===================================================== */}

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            pricingFAQSchema
          ),
        }}
      />
    </section>
  );
}