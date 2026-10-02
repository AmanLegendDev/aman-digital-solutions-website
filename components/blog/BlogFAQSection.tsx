import Link from "next/link";
import {
  ArrowRight,
  ChevronDown,
  CircleHelp,
} from "lucide-react";

const blogFAQs = [
  {
    question: "What topics does the Aman Digital Solutions blog cover?",
    answer:
      "The blog covers practical topics related to web development, SEO, digital marketing, business systems, technology and digital growth for businesses.",
  },
  {
    question: "Is the blog useful for small business owners?",
    answer:
      "Yes. The articles cover practical website, SEO and digital growth topics that can help small businesses understand their online presence, attract potential customers and improve their digital systems.",
  },
  {
    question: "Do you publish articles about SEO and website performance?",
    answer:
      "Yes. The blog includes insights related to SEO, website structure, technical considerations, performance and other factors that can contribute to a stronger online presence.",
  },
  {
    question: "Can I learn about web development from the blog?",
    answer:
      "Yes. The blog covers web development concepts, website technologies, digital solutions and practical considerations involved in building and improving modern websites.",
  },
  {
    question: "How often are new articles published?",
    answer:
      "New articles are published as practical topics, projects and useful insights are developed. The focus is on providing relevant and useful information rather than publishing content simply for volume.",
  },
  {
    question: "Can I request a topic for a future article?",
    answer:
      "Yes. If there is a web development, SEO, digital marketing or business technology topic you would like to understand, you can get in touch with Aman Digital Solutions.",
  },
];

export const blogFAQSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: blogFAQs.map((faq) => ({
    "@type": "Question",
    name: faq.question,
    acceptedAnswer: {
      "@type": "Answer",
      text: faq.answer,
    },
  })),
};

export default function BlogFAQSection() {
  return (
    <section
      id="blog-faq"
      aria-labelledby="blog-faq-heading"
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
              Blog FAQ
            </p>

            <span
              aria-hidden="true"
              className="h-px w-8 bg-[#FFC400]/30"
            />
          </div>

          <h2
            id="blog-faq-heading"
            className="mt-5 text-3xl font-semibold leading-[1.05] tracking-[-0.045em] text-white sm:text-4xl lg:text-5xl"
          >
            Questions about
            <br />
            <span className="text-neutral-500">
              our blog?
            </span>
          </h2>

          <p className="mx-auto mt-5 max-w-xl text-sm leading-7 text-neutral-500 sm:text-base sm:leading-8">
            Find answers about our articles, topics, SEO insights,
            web development content and digital growth resources.
          </p>
        </div>

        {/* FAQ list */}
        <div className="mx-auto mt-12 max-w-4xl overflow-hidden rounded-[28px] border border-white/[0.07] bg-[#080808]">
          {blogFAQs.map((faq) => (
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
            Looking for answers beyond our blog?
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

      {/* FAQ structured data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(blogFAQSchema),
        }}
      />
    </section>
  );
}