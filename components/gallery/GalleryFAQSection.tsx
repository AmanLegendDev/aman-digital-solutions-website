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

const galleryFAQs = [
  {
    question: "What type of digital work is shown in the gallery?",
    answer:
      "The gallery showcases selected website designs, digital experiences, e-commerce interfaces and custom web projects created by Aman Digital Solutions.",
  },
  {
    question: "Can you build a website similar to the projects shown here?",
    answer:
      "Yes. Aman Digital Solutions can create a custom website based on your business goals, brand identity, content requirements and desired user experience.",
  },
  {
    question: "Do you build e-commerce websites?",
    answer:
      "Yes. We build e-commerce websites with product catalogues, categories, shopping experiences and business features tailored to the project's requirements.",
  },
  {
    question: "Do you create custom web applications?",
    answer:
      "Yes. Custom web applications can be developed for specific business workflows, operational requirements and digital products.",
  },
  {
    question: "Can you redesign an existing website?",
    answer:
      "Yes. Existing websites can be redesigned to improve their visual design, user experience, mobile responsiveness, content structure and overall digital presence.",
  },
  {
    question: "Do you work with businesses outside Shimla?",
    answer:
      "Yes. Aman Digital Solutions works with businesses across Himachal Pradesh, throughout India and with remote clients beyond India.",
  },
  {
    question: "Can you maintain a website after it is launched?",
    answer:
      "Yes. Website maintenance, content updates, improvements and ongoing technical support can be provided according to the project's requirements.",
  },
  {
    question: "How can I start a project with Aman Digital Solutions?",
    answer:
      "You can get in touch with Aman Digital Solutions to discuss your business, project requirements, goals and preferred features. The scope and next steps can then be defined before development begins.",
  },
];

/* =========================================================
   FAQ SCHEMA
========================================================= */

export const galleryFAQSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: galleryFAQs.map((faq) => ({
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

export default function GalleryFAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section
      aria-labelledby="gallery-faq-heading"
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
              Gallery FAQ
            </p>

            <span
              aria-hidden="true"
              className="h-px w-8 bg-[#FFC400]/30"
            />
          </div>

          <h2
            id="gallery-faq-heading"
            className="mt-5 text-3xl font-semibold leading-[1.05] tracking-[-0.045em] text-white sm:text-4xl lg:text-5xl"
          >
            Curious about the work?
            <br />
            <span className="text-neutral-500">
              Start here.
            </span>
          </h2>

          <p className="mx-auto mt-5 max-w-xl text-sm leading-7 text-neutral-500 sm:text-base sm:leading-8">
            Find answers about our website designs, digital
            experiences, e-commerce projects and custom web
            development services.
          </p>
        </div>

        {/* =====================================================
            FAQ ACCORDION
        ===================================================== */}

        <div className="mx-auto mt-12 max-w-4xl overflow-hidden rounded-[28px] border border-white/[0.07] bg-[#080808]">
          {galleryFAQs.map((faq, index) => {
            const isOpen = openIndex === index;

            return (
              <div
                key={faq.question}
                className="border-b border-white/[0.06] last:border-b-0"
              >
                <button
                  type="button"
                  aria-expanded={isOpen}
                  aria-controls={`gallery-faq-answer-${index}`}
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
                  id={`gallery-faq-answer-${index}`}
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
            Looking for more answers about our services?
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
            galleryFAQSchema
          ),
        }}
      />
    </section>
  );
}