"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ArrowUpRight,
  ChevronDown,
  CircleHelp,
} from "lucide-react";

export type RelatedFaqData = {
  id: string;
  question: string;
  slug: string;
  answer: string;
};

type RelatedFaqsSectionProps = {
  faqs: RelatedFaqData[];
};

export default function RelatedFaqsSection({
  faqs,
}: RelatedFaqsSectionProps) {
  const [openId, setOpenId] = useState<string | null>(
    faqs[0]?.id ?? null
  );

  if (!faqs.length) {
    return null;
  }

  const toggleFaq = (id: string) => {
    setOpenId((current) =>
      current === id ? null : id
    );
  };

  return (
    <section
      id="related-faqs"
      aria-labelledby="related-faqs-heading"
      className="relative border-t border-white/[0.06] bg-[#050505] py-20 sm:py-24 lg:py-28"
    >
      <div className="mx-auto max-w-5xl px-5 sm:px-8">
        {/* HEADER */}
        <div className="mx-auto max-w-2xl text-center">
          <div className="flex items-center justify-center gap-3">
            <span className="flex h-9 w-9 items-center justify-center rounded-xl border border-[#FFC400]/15 bg-[#FFC400]/[0.04] text-[#FFC400]">
              <CircleHelp size={15} />
            </span>

            <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#FFC400]">
              Frequently asked
            </span>
          </div>

          <h2
            id="related-faqs-heading"
            className="mt-5 text-3xl font-semibold tracking-[-0.04em] text-white sm:text-4xl"
          >
            Questions you may
            <span className="text-neutral-500">
              {" "}
              have.
            </span>
          </h2>

          <p className="mt-4 text-sm leading-7 text-neutral-500">
            A few answers to the questions clients commonly
            ask before getting started.
          </p>
        </div>

        {/* FAQ LIST */}
        <div className="mt-10 space-y-3 sm:mt-12">
          {faqs.map((faq, index) => {
            const isOpen = openId === faq.id;

            return (
              <div
                key={faq.id}
                className={[
                  "overflow-hidden rounded-2xl border",
                  "transition-all duration-300",
                  isOpen
                    ? "border-[#FFC400]/20 bg-[#0A0A0A]"
                    : "border-white/[0.07] bg-[#080808] hover:border-white/[0.12]",
                ].join(" ")}
              >
                {/* QUESTION */}
                <button
                  type="button"
                  onClick={() =>
                    toggleFaq(faq.id)
                  }
                  aria-expanded={isOpen}
                  aria-controls={`faq-answer-${faq.id}`}
                  className="group flex w-full items-center gap-4 px-5 py-5 text-left sm:px-6"
                >
                  {/* NUMBER */}
                  <span
                    className={[
                      "hidden shrink-0 text-[9px] font-medium tabular-nums tracking-[0.12em] sm:block",
                      isOpen
                        ? "text-[#FFC400]"
                        : "text-neutral-700",
                    ].join(" ")}
                  >
                    {String(index + 1).padStart(2, "0")}
                  </span>

                  {/* QUESTION */}
                  <span
                    className={[
                      "flex-1 text-sm font-medium leading-6 transition-colors",
                      isOpen
                        ? "text-white"
                        : "text-neutral-300 group-hover:text-white",
                    ].join(" ")}
                  >
                    {faq.question}
                  </span>

                  {/* ICON */}
                  <span
                    className={[
                      "flex h-8 w-8 shrink-0 items-center justify-center rounded-full border transition-all duration-300",
                      isOpen
                        ? "rotate-180 border-[#FFC400]/20 bg-[#FFC400]/10 text-[#FFC400]"
                        : "border-white/[0.07] bg-white/[0.02] text-neutral-600 group-hover:text-neutral-300",
                    ].join(" ")}
                  >
                    <ChevronDown size={15} />
                  </span>
                </button>

                {/* ANSWER */}
                <div
                  id={`faq-answer-${faq.id}`}
                  className={[
                    "grid transition-[grid-template-rows,opacity] duration-300",
                    isOpen
                      ? "grid-rows-[1fr] opacity-100"
                      : "grid-rows-[0fr] opacity-0",
                  ].join(" ")}
                >
                  <div className="min-h-0 overflow-hidden">
                    <div className="border-t border-white/[0.06] px-5 pb-6 pt-5 sm:px-6">
                      <div className="sm:pl-8">
                        <p className="max-w-3xl text-xs leading-7 text-neutral-500">
                          {faq.answer}
                        </p>

                        {/* FAQ DETAIL LINK */}
                        <Link
                          href={`/faq/${faq.slug}`}
                          className="group mt-5 inline-flex items-center gap-2 text-[10px] font-medium text-neutral-500 transition-colors hover:text-[#FFC400]"
                        >
                          Read full answer

                          <ArrowUpRight
                            size={13}
                            className="transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                          />
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* BOTTOM CTA */}
        <div className="mt-8 flex justify-center">
          <Link
            href="/faq"
            className="group inline-flex items-center gap-2 rounded-full border border-white/[0.08] bg-[#090909] px-5 py-3 text-xs font-medium text-neutral-400 transition-all duration-300 hover:border-[#FFC400]/20 hover:bg-[#0C0C0C] hover:text-white"
          >
            Explore all FAQs

            <ArrowUpRight
              size={14}
              className="transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
            />
          </Link>
        </div>
      </div>
    </section>
  );
}