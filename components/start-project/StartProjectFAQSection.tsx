import Link from "next/link";
import {
  ArrowRight,
  ChevronDown,
  CircleHelp,
} from "lucide-react";

const startProjectFAQs = [
  {
    question: "What information do I need to start a project?",
    answer:
      "You can start by sharing your name, contact details, location, the type of digital solution you need and a brief description of your project. More specific requirements can be discussed after the initial enquiry.",
  },
  {
    question: "What types of projects can I submit an enquiry for?",
    answer:
      "You can enquire about business websites, e-commerce stores, custom web applications, admin systems and other digital solutions based on your business requirements.",
  },
  {
    question: "Do I need to have everything planned before contacting you?",
    answer:
      "No. You do not need to have every detail finalized before starting an enquiry. Sharing your business goals, basic requirements and the problem you want to solve is enough to begin the discussion.",
  },
  {
    question: "Do you work with businesses outside Shimla?",
    answer:
      "Yes. Aman Digital Solutions is based in Shimla, Himachal Pradesh and works with businesses across Himachal Pradesh, throughout India and with remote clients beyond the region.",
  },
  {
    question: "How does the project process work after submitting an enquiry?",
    answer:
      "After receiving your enquiry, the project requirements can be reviewed and discussed. The scope, features, approach, timeline and other relevant details can then be clarified before development begins.",
  },
  {
    question: "Can I discuss my project before committing to development?",
    answer:
      "Yes. You can discuss your project requirements, goals and preferred features before development begins so that the scope and next steps are clear.",
  },
];

export const startProjectFAQSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: startProjectFAQs.map((faq) => ({
    "@type": "Question",
    name: faq.question,
    acceptedAnswer: {
      "@type": "Answer",
      text: faq.answer,
    },
  })),
};

export default function StartProjectFAQSection() {
  return (
    <section
      id="start-project-faq"
      aria-labelledby="start-project-faq-heading"
      className="relative overflow-hidden border-t border-white/[0.06] bg-[#050505] px-5 py-20 sm:px-8 sm:py-24 lg:px-10 lg:py-28"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-[-180px] h-[420px] w-[720px] -translate-x-1/2 rounded-full bg-[#FFC400]/[0.025] blur-[140px]"
      />

      <div className="relative mx-auto max-w-5xl">
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
              Start a Project FAQ
            </p>

            <span
              aria-hidden="true"
              className="h-px w-8 bg-[#FFC400]/30"
            />
          </div>

          <h2
            id="start-project-faq-heading"
            className="mt-5 text-3xl font-semibold leading-[1.05] tracking-[-0.045em] text-white sm:text-4xl lg:text-5xl"
          >
            Before you start,
            <br />
            <span className="text-neutral-500">
              know what to expect.
            </span>
          </h2>

          <p className="mx-auto mt-5 max-w-xl text-sm leading-7 text-neutral-500 sm:text-base sm:leading-8">
            A few common answers about project enquiries,
            requirements, process and working with Aman Digital
            Solutions.
          </p>
        </div>

        <div className="mx-auto mt-12 max-w-4xl overflow-hidden rounded-[28px] border border-white/[0.07] bg-[#080808]">
          {startProjectFAQs.map((faq) => (
            <details
              key={faq.question}
              className="group border-b border-white/[0.06] last:border-b-0"
            >
              <summary className="flex cursor-pointer list-none items-center justify-between gap-6 px-5 py-5 text-left sm:px-7 sm:py-6">
                <span className="text-sm font-medium leading-6 text-neutral-300 transition-colors duration-200 group-open:text-white sm:text-base">
                  {faq.question}
                </span>

                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-white/[0.07] text-neutral-600 transition-all duration-300 group-open:border-[#FFC400]/25 group-open:bg-[#FFC400]/[0.06] group-open:text-[#FFC400]">
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

        <div className="mt-10 flex flex-col items-center justify-center gap-4 text-center">
          <p className="text-xs leading-6 text-neutral-600">
            Have more questions about your project?
          </p>

          <Link
            href="/faq"
            className="group inline-flex items-center gap-2.5 rounded-full border border-white/[0.08] bg-white/[0.025] px-5 py-3 text-[9px] font-semibold uppercase tracking-[0.16em] text-neutral-400 transition-all duration-300 hover:border-[#FFC400]/25 hover:bg-[#FFC400]/[0.05] hover:text-[#FFC400]"
          >
            View all FAQs

            <ArrowRight
              size={13}
              strokeWidth={1.7}
              aria-hidden="true"
              className="transition-transform duration-300 group-hover:translate-x-0.5"
            />
          </Link>
        </div>
      </div>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(startProjectFAQSchema),
        }}
      />
    </section>
  );
}