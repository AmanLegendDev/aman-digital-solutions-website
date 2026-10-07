import Link from "next/link";
import {
  ArrowRight,
  ChevronDown,
  CircleHelp,
} from "lucide-react";

import { getSiteSettings } from "@/lib/site-settings/getSiteSettings";

const contactFAQs = [
  {
    question: "How can I contact Aman Digital Solutions?",
    answer:
      "You can contact Aman Digital Solutions to discuss your website, e-commerce store, web application or other digital project. Share your requirements, goals and preferred features so the project scope can be understood clearly.",
  },
  {
    question: "What information should I provide about my project?",
    answer:
      "It is helpful to share information about your business, the type of website or digital solution you need, required features, existing website if any, and your project goals. This helps us understand the scope before development begins.",
  },
  {
    question: "Do you work with businesses outside Shimla?",
    answer:
      "Yes. Aman Digital Solutions is based in Shimla, Himachal Pradesh and works with businesses across Himachal Pradesh, throughout India and with remote clients beyond the region.",
  },
  {
    question: "Can I discuss my project before deciding to proceed?",
    answer:
      "Yes. You can discuss your requirements and project goals before development begins. The scope, features, approach and next steps can be clarified before moving forward.",
  },
  {
    question: "Can you build a website based on my existing design or idea?",
    answer:
      "Yes. A website can be developed from an existing design, reference, brand identity or initial idea. The final approach can be tailored to your business requirements and desired user experience.",
  },
  {
    question: "Do you provide website support after launch?",
    answer:
      "Yes. Website maintenance, content updates, improvements, technical changes and ongoing support can be provided after launch according to the project's requirements.",
  },
];

export default async function ContactFAQSection() {
  const settings = await getSiteSettings();

  const siteName =
    settings?.siteName?.trim() ||
    "Aman Digital Solutions";

  const city =
    settings?.contact?.city?.trim() ||
    "Shimla";

  const state =
    settings?.contact?.state?.trim() ||
    "Himachal Pradesh";

  const country =
    settings?.contact?.country?.trim() ||
    "India";

  const faqs = contactFAQs.map((faq) => ({
    ...faq,
    question: faq.question.replace(
      "Aman Digital Solutions",
      siteName
    ),
    answer: faq.answer
      .replaceAll("Aman Digital Solutions", siteName)
      .replaceAll(
        "Shimla, Himachal Pradesh",
        `${city}, ${state}`
      )
      .replaceAll(
        "throughout India",
        `throughout ${country}`
      ),
  }));

  const contactFAQSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };

  return (
    <section
      id="contact-faq"
      aria-labelledby="contact-faq-heading"
      className="relative overflow-hidden border-t border-white/[0.06] bg-[#050505] px-5 py-20 sm:px-8 sm:py-24 lg:px-10 lg:py-28"
    >
      {/* Ambient glow */}
      <div
        aria-hidden="true"
        className="
          pointer-events-none absolute
          left-1/2 top-[-180px]
          h-[420px] w-[720px]
          -translate-x-1/2
          rounded-full
          bg-[#FFC400]/[0.025]
          blur-[140px]
        "
      />

      <div className="relative mx-auto max-w-5xl">
        {/* HEADER */}
        <div className="mx-auto max-w-2xl text-center">
          <div
            className="
              mx-auto flex h-11 w-11
              items-center justify-center
              rounded-2xl
              border border-[#FFC400]/15
              bg-[#FFC400]/[0.04]
              text-[#FFC400]
            "
          >
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
              Contact FAQ
            </p>

            <span
              aria-hidden="true"
              className="h-px w-8 bg-[#FFC400]/30"
            />
          </div>

          <h2
            id="contact-faq-heading"
            className="
              mt-5
              text-3xl font-semibold
              leading-[1.05]
              tracking-[-0.045em]
              text-white
              sm:text-4xl
              lg:text-5xl
            "
          >
            Before you reach out,
            <br />
            <span className="text-neutral-500">
              here are the answers.
            </span>
          </h2>

          <p className="mx-auto mt-5 max-w-xl text-sm leading-7 text-neutral-500 sm:text-base sm:leading-8">
            Find answers about starting a project, sharing your
            requirements, working remotely and getting support
            from {siteName}.
          </p>
        </div>

        {/* FAQ LIST */}
        <div className="mx-auto mt-12 max-w-4xl overflow-hidden rounded-[28px] border border-white/[0.07] bg-[#080808]">
          {faqs.map((faq) => (
            <details
              key={faq.question}
              className="group border-b border-white/[0.06] last:border-b-0"
            >
              <summary
                className="
                  flex cursor-pointer list-none
                  items-center justify-between
                  gap-6
                  px-5 py-5
                  text-left
                  sm:px-7 sm:py-6
                "
              >
                <span className="text-sm font-medium leading-6 text-neutral-300 transition-colors duration-200 group-open:text-white sm:text-base">
                  {faq.question}
                </span>

                <span
                  className="
                    flex h-8 w-8 shrink-0
                    items-center justify-center
                    rounded-full
                    border border-white/[0.07]
                    text-neutral-600
                    transition-all duration-300
                    group-open:border-[#FFC400]/25
                    group-open:bg-[#FFC400]/[0.06]
                    group-open:text-[#FFC400]
                  "
                >
                  <ChevronDown
                    size={15}
                    strokeWidth={1.7}
                    aria-hidden="true"
                    className="transition-transform duration-300 group-open:rotate-180"
                  />
                </span>
              </summary>

              <div className="px-5 pb-6 sm:px-7 sm:pb-7">
                <div className="border-l border-[#FFC400]/20 pl-5 sm:pl-6">
                  <p className="max-w-3xl text-sm leading-7 text-neutral-500 sm:text-[15px] sm:leading-8">
                    {faq.answer}
                  </p>
                </div>
              </div>
            </details>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-10 flex flex-col items-center justify-center gap-4 text-center">
          <p className="text-xs leading-6 text-neutral-600">
            Have more questions before starting your project?
          </p>

          <Link
            href="/faq"
            className="
              group inline-flex items-center gap-2.5
              rounded-full
              border border-white/[0.08]
              bg-white/[0.025]
              px-5 py-3
              text-[9px]
              font-semibold
              uppercase
              tracking-[0.16em]
              text-neutral-400
              transition-all duration-300
              hover:border-[#FFC400]/25
              hover:bg-[#FFC400]/[0.05]
              hover:text-[#FFC400]
            "
          >
            View all FAQs

            <ArrowRight
              size={13}
              strokeWidth={1.7}
              aria-hidden="true"
              className="
                transition-transform duration-300
                group-hover:translate-x-0.5
              "
            />
          </Link>
        </div>
      </div>

      {/* FAQ STRUCTURED DATA */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(contactFAQSchema),
        }}
      />
    </section>
  );
}