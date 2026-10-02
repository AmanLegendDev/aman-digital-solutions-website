import Link from "next/link";

const faqs = [
  {
    question: "What do the Terms of Service cover?",
    answer:
      "These Terms of Service explain the general terms that apply to projects and services provided by Aman Digital Solutions, including project responsibilities, payments, intellectual property, communication, and other legal matters.",
  },
  {
    question: "What responsibilities does the client have?",
    answer:
      "Clients are responsible for providing accurate project information, required content, assets, approvals, access credentials where necessary, and timely feedback needed to complete the agreed project work.",
  },
  {
    question: "How are project payments handled?",
    answer:
      "Payment terms, project pricing, milestones, deposits, and any applicable balances are agreed upon before or during the project engagement. The applicable project agreement or quotation should be reviewed for the specific payment terms.",
  },
  {
    question: "Who owns the website and project work?",
    answer:
      "Ownership and usage rights depend on the agreed project terms, payment status, third-party assets, licenses, and any specific intellectual property arrangements made between Aman Digital Solutions and the client.",
  },
  {
    question: "Can project requirements change after development starts?",
    answer:
      "Project requirements can change, but additional features, revisions, integrations, or scope changes may require additional time or cost depending on the agreed project scope.",
  },
  {
    question: "What happens if there is a disagreement about a project?",
    answer:
      "Aman Digital Solutions aims to resolve project concerns through clear communication and discussion. The applicable Terms of Service and any specific project agreement should be referred to when resolving contractual or legal matters.",
  },
];

const faqSchema = {
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

export default function TermsFAQSection() {
  return (
    <section
      aria-labelledby="terms-faq-heading"
      className="border-t border-white/[0.06] bg-[#070707] px-5 py-20 sm:px-8 lg:px-12"
    >
      <div className="mx-auto max-w-4xl">
        <div className="mb-10 text-center">
          <p className="text-[10px] font-semibold uppercase tracking-[0.25em] text-[#FFC400]">
            Terms FAQ
          </p>

          <h2
            id="terms-faq-heading"
            className="mt-3 text-3xl font-semibold tracking-tight text-white sm:text-4xl"
          >
            Common questions about our terms
          </h2>

          <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-neutral-500">
            Find quick answers about project responsibilities, payments,
            intellectual property, scope changes, and the terms that apply to
            working with Aman Digital Solutions.
          </p>
        </div>

        <div className="space-y-3">
          {faqs.map((faq) => (
            <details
              key={faq.question}
              className="group rounded-2xl border border-white/[0.08] bg-white/[0.02] px-5 py-4"
            >
              <summary className="cursor-pointer list-none text-sm font-medium text-white marker:hidden">
                <div className="flex items-center justify-between gap-6">
                  <span>{faq.question}</span>

                  <span className="shrink-0 text-xl font-light text-neutral-500 transition-transform group-open:rotate-45">
                    +
                  </span>
                </div>
              </summary>

              <p className="mt-4 max-w-3xl text-sm leading-7 text-neutral-500">
                {faq.answer}
              </p>
            </details>
          ))}
        </div>

        <div className="mt-10 text-center">
          <Link
            href="/contact"
            className="inline-flex items-center rounded-xl border border-white/10 px-5 py-3 text-xs font-semibold text-neutral-300 transition hover:border-white/20 hover:text-white"
          >
            Have a question? Contact us
          </Link>
        </div>
      </div>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(faqSchema),
        }}
      />
    </section>
  );
}