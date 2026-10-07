"use client";

import {
  CheckCircle2,
  ChevronDown,
  Gauge,
  MessageCircle,
  Sparkles,
} from "lucide-react";
import { useState } from "react";

const signals = [
  {
    icon: MessageCircle,
    title: "Clear communication",
    description:
      "Clients should always know what is happening, what comes next and why.",
  },
  {
    icon: Sparkles,
    title: "Thoughtful execution",
    description:
      "Design and development are shaped around the actual business requirement.",
  },
  {
    icon: Gauge,
    title: "Performance matters",
    description:
      "Speed, usability and technical quality are treated as part of the product.",
  },
  {
    icon: CheckCircle2,
    title: "Support after launch",
    description:
      "A website is not finished simply because it has gone live.",
  },
];

const faqs = [
  {
    question: "Are these genuine client reviews?",
    answer:
      "Yes. The reviews shown on this page are genuine feedback from clients and business owners who have worked with Aman Digital Solutions.",
  },
  {
    question: "What kind of projects do your clients hire you for?",
    answer:
      "Projects include business websites, e-commerce websites, custom web applications, digital solutions and ongoing website support.",
  },
  {
    question: "Do you work with businesses outside Shimla?",
    answer:
      "Yes. Aman Digital Solutions is based in Shimla, Himachal Pradesh, and works with businesses across India as well as remote international clients.",
  },
  {
    question: "Can you maintain a website after it launches?",
    answer:
      "Yes. Website maintenance and ongoing technical support are available for businesses that need continued updates, improvements and technical assistance after launch.",
  },
  {
    question: "How can I start a project with Aman Digital Solutions?",
    answer:
      "You can start by submitting the project enquiry form. Share what you are trying to build, improve or grow, and we can discuss the right approach for your business.",
  },
  {
    question: "Can I see more of your previous work?",
    answer:
      "Yes. Visit the projects and gallery sections to explore selected websites, digital products, e-commerce experiences and other web work.",
  },
];

export default function ReviewsProof() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <>
      {/* What matters */}
      <section
        aria-labelledby="reviews-proof-heading"
        className="border-t border-white/[0.06] bg-[#050505] py-20 sm:py-24 lg:py-28"
      >
        <div className="mx-auto w-full max-w-7xl px-5 sm:px-8 lg:px-10">
          <div className="max-w-2xl">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#FFD400]">
              What matters
            </p>

            <h2
              id="reviews-proof-heading"
              className="mt-3 text-3xl font-semibold tracking-[-0.035em] text-white sm:text-4xl"
            >
              Good feedback usually starts with good work.
            </h2>

            <p className="mt-5 text-sm leading-7 text-white/45 sm:text-base">
              Reviews are only one part of the picture. The experience behind
              them matters just as much — from the first conversation to the
              work after launch.
            </p>
          </div>

          <div className="mt-12 grid gap-px overflow-hidden rounded-3xl border border-white/[0.07] bg-white/[0.07] sm:grid-cols-2 lg:grid-cols-4">
            {signals.map((item) => {
              const Icon = item.icon;

              return (
                <div
                  key={item.title}
                  className="bg-[#090909] p-7 transition-colors duration-300 hover:bg-[#0D0D0D] sm:p-8"
                >
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/[0.025]">
                    <Icon size={17} className="text-[#FFD400]" />
                  </div>

                  <h3 className="mt-6 text-base font-semibold text-white">
                    {item.title}
                  </h3>

                  <p className="mt-3 text-sm leading-6 text-white/40">
                    {item.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section
        id="reviews-faq"
        aria-labelledby="reviews-faq-heading"
        className="border-t border-white/[0.06] bg-[#050505] py-20 sm:py-24 lg:py-28"
      >
        <div className="mx-auto w-full max-w-5xl px-5 sm:px-8 lg:px-10">
          <div className="max-w-2xl">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#FFD400]">
              Reviews FAQ
            </p>

            <h2
              id="reviews-faq-heading"
              className="mt-3 text-3xl font-semibold tracking-[-0.035em] text-white sm:text-4xl"
            >
              Questions about our reviews?
            </h2>

            <p className="mt-5 text-sm leading-7 text-white/45 sm:text-base">
              A few straightforward answers about client feedback, our work
              and what you can expect when working with Aman Digital Solutions.
            </p>
          </div>

          <div className="mt-10 border-t border-white/[0.08]">
            {faqs.map((faq, index) => {
              const isOpen = openIndex === index;

              return (
                <div
                  key={faq.question}
                  className="border-b border-white/[0.08]"
                >
                  <button
                    type="button"
                    onClick={() =>
                      setOpenIndex(isOpen ? null : index)
                    }
                    aria-expanded={isOpen}
                    className="flex w-full items-center justify-between gap-6 py-6 text-left"
                  >
                    <span className="text-base font-medium leading-7 text-white sm:text-lg">
                      {faq.question}
                    </span>

                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-white/10 bg-white/[0.025]">
                      <ChevronDown
                        size={16}
                        className={`text-[#FFD400] transition-transform duration-300 ${
                          isOpen ? "rotate-180" : ""
                        }`}
                      />
                    </span>
                  </button>

                  <div
                    className={`grid transition-[grid-template-rows,opacity] duration-300 ${
                      isOpen
                        ? "grid-rows-[1fr] opacity-100"
                        : "grid-rows-[0fr] opacity-0"
                    }`}
                  >
                    <div className="overflow-hidden">
                      <p className="max-w-3xl pb-6 pr-12 text-sm leading-7 text-white/45 sm:text-base">
                        {faq.answer}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}