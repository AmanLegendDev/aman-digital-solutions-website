import Link from "next/link";
import {
  ArrowRight,
  ChevronDown,
  CircleHelp,
} from "lucide-react";

const aboutFAQs = [
  {
    question: "What is Aman Digital Solutions?",
    answer:
      "Aman Digital Solutions is a founder-led web development and digital solutions company based in Shimla, Himachal Pradesh. The company builds websites, e-commerce stores, custom web applications and other digital solutions for businesses.",
  },
  {
    question: "Where is Aman Digital Solutions based?",
    answer:
      "Aman Digital Solutions is based in Shimla, Himachal Pradesh, India and works with businesses across Himachal Pradesh, throughout India and with remote clients beyond the region.",
  },
  {
    question: "What does Aman Digital Solutions build?",
    answer:
      "Aman Digital Solutions builds modern business websites, e-commerce stores, custom web applications, admin systems and other digital experiences based on the requirements of each project.",
  },
  {
    question: "Who does Aman Digital Solutions work with?",
    answer:
      "Aman Digital Solutions works with businesses and organizations that need a professional website, e-commerce solution, custom web application or other digital system to support their goals.",
  },
  {
    question: "What makes Aman Digital Solutions different?",
    answer:
      "Projects are approached around the client's business goals, user experience, functionality and long-term requirements rather than using a one-size-fits-all approach. The focus is on building practical digital solutions that are designed for the specific project.",
  },
  {
    question: "Can Aman Digital Solutions work with clients remotely?",
    answer:
      "Yes. Although Aman Digital Solutions is based in Shimla, projects can be handled remotely with businesses across India and with clients beyond India.",
  },
  {
    question: "Can I see examples of work completed by Aman Digital Solutions?",
    answer:
      "Yes. The Projects and Gallery sections showcase selected websites, digital experiences and other work created by Aman Digital Solutions.",
  },
  {
    question: "How can I start a project with Aman Digital Solutions?",
    answer:
      "You can contact Aman Digital Solutions to discuss your business, project requirements, goals and preferred features. The scope and next steps can then be defined before development begins.",
  },
];

export const aboutFAQSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: aboutFAQs.map((faq) => ({
    "@type": "Question",
    name: faq.question,
    acceptedAnswer: {
      "@type": "Answer",
      text: faq.answer,
    },
  })),
};

export default function AboutFAQSection() {
  return (
    <section
      id="about-faq"
      aria-labelledby="about-faq-heading"
      className="relative overflow-hidden border-t border-white/[0.06] bg-[#050505] px-5 py-20 sm:px-8 sm:py-24 lg:px-10 lg:py-28"
    >
      {/* Ambient glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-[-180px] h-[420px] w-[720px] -translate-x-1/2 rounded-full bg-[#FFC400]/[0.025] blur-[140px]"
      />

      <div className="relative mx-auto max-w-5xl">
        {/* Header */}
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
              About FAQ
            </p>

            <span
              aria-hidden="true"
              className="h-px w-8 bg-[#FFC400]/30"
            />
          </div>

          <h2
            id="about-faq-heading"
            className="mt-5 text-3xl font-semibold leading-[1.05] tracking-[-0.045em] text-white sm:text-4xl lg:text-5xl"
          >
            Want to know
            <br />
            <span className="text-neutral-500">
              more about us?
            </span>
          </h2>

          <p className="mx-auto mt-5 max-w-xl text-sm leading-7 text-neutral-500 sm:text-base sm:leading-8">
            Find clear answers about Aman Digital Solutions, our
            work, approach, capabilities and how we work with
            businesses.
          </p>
        </div>

        {/* FAQ */}
        <div className="mx-auto mt-12 max-w-4xl overflow-hidden rounded-[28px] border border-white/[0.07] bg-[#080808]">
          {aboutFAQs.map((faq) => (
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

        {/* CTA */}
        <div className="mt-10 flex flex-col items-center justify-center gap-4 text-center">
          <p className="text-xs leading-6 text-neutral-600">
            Want to explore our work or discuss a project?
          </p>

          <div className="flex flex-col items-center gap-3 sm:flex-row">
            <Link
              href="/projects"
              className="group inline-flex items-center gap-2.5 rounded-full border border-white/[0.08] bg-white/[0.025] px-5 py-3 text-[9px] font-semibold uppercase tracking-[0.16em] text-neutral-400 transition-all duration-300 hover:border-[#FFC400]/25 hover:bg-[#FFC400]/[0.05] hover:text-[#FFC400]"
            >
              Explore projects

              <ArrowRight
                size={13}
                strokeWidth={1.7}
                aria-hidden="true"
                className="transition-transform duration-300 group-hover:translate-x-0.5"
              />
            </Link>

            <Link
              href="/contact"
              className="group inline-flex items-center gap-2.5 rounded-full bg-[#FFC400] px-5 py-3 text-[9px] font-semibold uppercase tracking-[0.16em] text-black transition-all duration-300 hover:bg-[#FFD84D]"
            >
              Start a project

              <ArrowRight
                size={13}
                strokeWidth={1.7}
                aria-hidden="true"
                className="transition-transform duration-300 group-hover:translate-x-0.5"
              />
            </Link>
          </div>
        </div>
      </div>

      {/* FAQ structured data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(aboutFAQSchema),
        }}
      />
    </section>
  );
}