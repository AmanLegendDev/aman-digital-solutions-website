"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, Plus } from "lucide-react";

type FAQData = {
  id: string;
  question: string;
  slug: string;
  answer: string;
  category: string | null;
  featured: boolean;
};

type FAQAccordionProps = {
  featuredFAQ: FAQData;
  faqs: FAQData[];
};

export default function FAQAccordion({
  featuredFAQ,
  faqs,
}: FAQAccordionProps) {
  const allFAQs = [featuredFAQ, ...faqs];

  const [openId, setOpenId] = useState<string | null>(
    featuredFAQ.id
  );

  const toggleFAQ = (id: string) => {
    setOpenId((current) =>
      current === id ? null : id
    );
  };

  return (
    <div className="w-full min-w-0">
      <div className="overflow-hidden rounded-[26px] border border-[#202020] bg-[#090909]">
        {allFAQs.map((faq, index) => {
          const isOpen = openId === faq.id;
          const answerId = `faq-answer-${faq.id}`;

          return (
            <div
              key={faq.id}
              className={[
                "min-w-0 border-[#202020]",
                index !== 0 ? "border-t" : "",
              ].join(" ")}
            >
              {/* QUESTION */}

              <button
                type="button"
                onClick={() => toggleFAQ(faq.id)}
                aria-expanded={isOpen}
                aria-controls={answerId}
                className={[
                  "group flex w-full min-w-0 items-center gap-4 px-5 py-5 text-left transition-colors duration-200 sm:px-7 sm:py-6",
                  isOpen
                    ? "bg-[#0D0D0D]"
                    : "hover:bg-[#0C0C0C]",
                ].join(" ")}
              >
                {/* NUMBER */}

                <span
                  aria-hidden="true"
                  className={[
                    "hidden shrink-0 text-[9px] font-medium tabular-nums tracking-[0.14em] sm:block",
                    isOpen
                      ? "text-[#FFC400]"
                      : "text-[#444]",
                  ].join(" ")}
                >
                  {String(index + 1).padStart(2, "0")}
                </span>

                {/* QUESTION */}

                <span
                  className={[
                    "min-w-0 flex-1 break-words pr-2 text-sm font-medium leading-6 transition-colors duration-200 sm:text-[15px]",
                    isOpen
                      ? "text-[#F0F0F0]"
                      : "text-[#A5A5A5] group-hover:text-[#E5E5E5]",
                  ].join(" ")}
                >
                  {faq.question}
                </span>

                {/* TOGGLE ICON */}

                <span
                  aria-hidden="true"
                  className={[
                    "flex h-8 w-8 shrink-0 items-center justify-center rounded-full border transition-all duration-300",
                    isOpen
                      ? "rotate-45 border-[#FFC400]/30 bg-[#FFC400]/10 text-[#FFC400]"
                      : "border-[#292929] bg-[#111111] text-[#555] group-hover:border-[#3A3A3A] group-hover:text-[#999]",
                  ].join(" ")}
                >
                  <Plus size={15} />
                </span>
              </button>

              {/* ANSWER */}

              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    id={answerId}
                    role="region"
                    aria-labelledby={`faq-question-${faq.id}`}
                    initial={{
                      height: 0,
                      opacity: 0,
                    }}
                    animate={{
                      height: "auto",
                      opacity: 1,
                    }}
                    exit={{
                      height: 0,
                      opacity: 0,
                    }}
                    transition={{
                      height: {
                        duration: 0.3,
                        ease: [0.22, 1, 0.36, 1],
                      },
                      opacity: {
                        duration: 0.2,
                      },
                    }}
                    className="overflow-hidden"
                  >
                    <div className="px-5 pb-6 sm:px-7 sm:pb-7">
                      <div className="flex gap-4">
                        {/* DECORATIVE LINE */}

                        <div
                          aria-hidden="true"
                          className="mt-1 h-auto w-px shrink-0 bg-gradient-to-b from-[#FFC400]/60 to-transparent"
                        />

                        <div className="min-w-0">
                          {faq.category && (
                            <p className="mb-3 text-[9px] font-medium uppercase tracking-[0.16em] text-[#FFC400]/70">
                              {faq.category}
                            </p>
                          )}

                          <p className="break-words text-sm leading-7 text-[#777] sm:max-w-2xl">
                            {faq.answer}
                          </p>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>

      {/* BOTTOM CTA */}

      <div className="mt-5 flex items-center justify-between gap-4 rounded-[20px] border border-[#1D1D1D] bg-[#090909] px-5 py-4 sm:px-6">
        <p className="min-w-0 text-[10px] uppercase tracking-[0.12em] text-[#4F4F4F]">
          Have a project in mind?
        </p>

        <a
          href="#contact"
          className="
            group
            inline-flex
            min-h-11
            shrink-0
            items-center
            gap-1.5
            rounded-sm
            text-xs
            font-medium
            text-[#999]
            transition-colors
            duration-200
            hover:text-[#FFC400]
            focus-visible:outline-none
            focus-visible:ring-2
            focus-visible:ring-[#FFC400]
          "
        >
          Let's talk

          <ArrowUpRight
            aria-hidden="true"
            size={13}
            className="
              transition-transform
              duration-200
              group-hover:-translate-y-0.5
              group-hover:translate-x-0.5
            "
          />
        </a>
      </div>
    </div>
  );
}