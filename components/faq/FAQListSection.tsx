"use client";

import { useState } from "react";
import {
  ChevronDown,
  Filter,
} from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

import type { FAQData } from "./FAQPageClient";

/* =========================================================
   PROPS
========================================================= */

type FAQListSectionProps = {
  faqs: FAQData[];

  categories: string[];

  activeCategory: string;

  onCategoryChange: (
    category: string
  ) => void;
};

/* =========================================================
   COMPONENT
========================================================= */

export default function FAQListSection({
  faqs,
  categories,
  activeCategory,
  onCategoryChange,
}: FAQListSectionProps) {
  /*
   * IMPORTANT:
   * Only one FAQ can be open at a time.
   * null = all closed.
   */
  const [openId, setOpenId] = useState<
    string | null
  >(null);

  /* =======================================================
     TOGGLE
  ======================================================= */

  function handleToggle(id: string) {
    setOpenId((current) =>
      current === id ? null : id
    );
  }

  return (
    <section
      id="faq-list"
      className="relative bg-[#050505] py-16 sm:py-20 lg:py-24"
    >
      <div className="mx-auto max-w-5xl px-5 sm:px-8">
        {/* =================================================
            SECTION HEADER
        ================================================= */}

        <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-[9px] font-semibold uppercase tracking-[0.2em] text-[#FFC400]">
              Find your answer
            </p>

            <h2 className="mt-3 text-3xl font-semibold tracking-[-0.04em] text-white sm:text-4xl">
              Frequently asked.
            </h2>
          </div>

          <div className="flex items-center gap-2 text-[8px] font-medium uppercase tracking-[0.14em] text-neutral-800">
            <Filter size={11} />

            <span>
              {faqs.length}{" "}
              {faqs.length === 1
                ? "question"
                : "questions"}
            </span>
          </div>
        </div>

        {/* =================================================
            CATEGORY FILTER
        ================================================= */}

        {categories.length > 1 && (
          <div className="mt-8 flex gap-2 overflow-x-auto pb-2 scrollbar-none">
            {categories.map((category) => {
              const isActive =
                activeCategory === category;

              return (
                <button
                  key={category}
                  type="button"
                  onClick={() => {
                    onCategoryChange(category);
                    setOpenId(null);
                  }}
                  className={[
                    "shrink-0 rounded-full border px-4 py-2.5 text-[8px] font-semibold uppercase tracking-[0.13em] transition-all duration-300",
                    isActive
                      ? "border-[#FFC400]/25 bg-[#FFC400]/[0.07] text-[#FFC400]"
                      : "border-white/[0.07] bg-white/[0.015] text-neutral-700 hover:border-white/[0.13] hover:text-neutral-400",
                  ].join(" ")}
                >
                  {category}
                </button>
              );
            })}
          </div>
        )}

        {/* =================================================
            FAQ LIST
        ================================================= */}

        <div className="mt-10">
          {faqs.length > 0 ? (
            <div className="overflow-hidden rounded-[1.75rem] border border-white/[0.07] bg-[#080808]">
              {faqs.map((faq, index) => {
                const isOpen =
                  openId === faq._id;

                return (
                  <div
                    key={faq._id}
                    className={
                      index !==
                      faqs.length - 1
                        ? "border-b border-white/[0.06]"
                        : ""
                    }
                  >
                    {/* =================================================
                        QUESTION
                    ================================================= */}

                    <button
                      type="button"
                      onClick={() =>
                        handleToggle(
                          faq._id
                        )
                      }
                      aria-expanded={isOpen}
                      aria-controls={`faq-answer-${faq._id}`}
                      className="group flex w-full items-center justify-between gap-5 px-5 py-5 text-left transition-colors duration-300 hover:bg-white/[0.015] sm:px-7 sm:py-6"
                    >
                      <div className="flex min-w-0 items-start gap-4">
                        {/* NUMBER */}

                        <span
                          className={[
                            "mt-0.5 hidden shrink-0 text-[8px] font-semibold tabular-nums tracking-[0.1em] sm:block",
                            isOpen
                              ? "text-[#FFC400]"
                              : "text-neutral-800",
                          ].join(" ")}
                        >
                          {String(
                            index + 1
                          ).padStart(2, "0")}
                        </span>

                        {/* QUESTION */}

                        <span
                          className={[
                            "text-sm font-medium leading-6 transition-colors duration-300 sm:text-base",
                            isOpen
                              ? "text-white"
                              : "text-white/70 group-hover:text-white",
                          ].join(" ")}
                        >
                          {faq.question}
                        </span>
                      </div>

                      {/* ICON */}

                      <span
                        className={[
                          "flex h-8 w-8 shrink-0 items-center justify-center rounded-full border transition-all duration-300",
                          isOpen
                            ? "border-[#FFC400]/25 bg-[#FFC400]/[0.06] text-[#FFC400]"
                            : "border-white/[0.07] text-neutral-700 group-hover:border-white/[0.14] group-hover:text-neutral-400",
                        ].join(" ")}
                      >
                        <ChevronDown
                          size={14}
                          className={
                            isOpen
                              ? "rotate-180 transition-transform duration-300"
                              : "transition-transform duration-300"
                          }
                        />
                      </span>
                    </button>

                    {/* =================================================
                        ANSWER
                    ================================================= */}

                    <AnimatePresence
                      initial={false}
                    >
                      {isOpen && (
                        <motion.div
                          id={`faq-answer-${faq._id}`}
                          role="region"
                          aria-labelledby={`faq-question-${faq._id}`}
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
                              ease: [
                                0.22,
                                1,
                                0.36,
                                1,
                              ],
                            },
                            opacity: {
                              duration: 0.2,
                            },
                          }}
                          className="overflow-hidden"
                        >
                          <div className="px-5 pb-6 sm:px-7 sm:pb-7">
                            <div className="ml-0 border-l border-[#FFC400]/20 pl-5 sm:ml-8">
                              <p className="max-w-3xl text-sm leading-7 text-neutral-500 sm:text-[15px] sm:leading-8">
                                {faq.answer}
                              </p>

                              {/* CATEGORY */}

                              {faq.category && (
                                <div className="mt-5">
                                  <span className="rounded-full border border-white/[0.06] bg-white/[0.015] px-2.5 py-1.5 text-[7px] font-semibold uppercase tracking-[0.12em] text-neutral-800">
                                    {faq.category}
                                  </span>
                                </div>
                              )}
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </div>
          ) : (
            /* =================================================
               EMPTY STATE
            ================================================= */

            <div className="flex min-h-[260px] items-center justify-center rounded-[1.75rem] border border-dashed border-white/[0.08] bg-[#080808] px-6 text-center">
              <div>
                <p className="text-sm font-medium text-white/70">
                  No questions found.
                </p>

                <p className="mt-2 text-xs leading-6 text-neutral-700">
                  Try another category or contact us
                  directly for help.
                </p>
              </div>
            </div>
          )}
        </div>

        {/* =================================================
            BOTTOM NOTE
        ================================================= */}

        {faqs.length > 0 && (
          <p className="mt-6 text-center text-[8px] font-medium uppercase tracking-[0.14em] text-neutral-800">
            Click any question to reveal the answer
          </p>
        )}
      </div>
    </section>
  );
}