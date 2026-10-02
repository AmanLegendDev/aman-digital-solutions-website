import Link from "next/link";

const faqs = [
  {
    question: "What personal information does Aman Digital Solutions collect?",
    answer:
      "Depending on how you interact with our website and services, we may collect information such as your name, email address, phone number, project details, business information, and other information you voluntarily provide through forms or direct communication.",
  },
  {
    question: "How does Aman Digital Solutions use my information?",
    answer:
      "Information may be used to respond to enquiries, understand project requirements, provide requested services, communicate about projects, improve our website and services, and maintain appropriate business records.",
  },
  {
    question: "Does Aman Digital Solutions share personal information?",
    answer:
      "Personal information is not shared simply for unrelated purposes. Information may be disclosed when necessary to provide a requested service, work with relevant service providers, comply with legal obligations, or protect the rights and security of the business and its users.",
  },
  {
    question: "How is my personal information protected?",
    answer:
      "Aman Digital Solutions takes reasonable measures to protect personal information against unauthorized access, misuse, alteration, disclosure, or loss. However, no internet-based system can be guaranteed to be completely secure.",
  },
  {
    question: "Does the website use cookies?",
    answer:
      "The website may use cookies or similar technologies where necessary for functionality, analytics, performance, security, or other legitimate website purposes. The applicable cookie practices are described in the Privacy Policy.",
  },
  {
    question: "Can I request information about my personal data?",
    answer:
      "Depending on applicable laws and circumstances, you may contact Aman Digital Solutions to ask about personal information associated with your interactions with us or to raise a privacy-related request.",
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

export default function PrivacyFAQSection() {
  return (
    <section
      aria-labelledby="privacy-faq-heading"
      className="border-t border-white/[0.06] bg-[#070707] px-5 py-20 sm:px-8 lg:px-12"
    >
      <div className="mx-auto max-w-4xl">
        <div className="mb-10 text-center">
          <p className="text-[10px] font-semibold uppercase tracking-[0.25em] text-[#FFC400]">
            Privacy FAQ
          </p>

          <h2
            id="privacy-faq-heading"
            className="mt-3 text-3xl font-semibold tracking-tight text-white sm:text-4xl"
          >
            Common privacy questions
          </h2>

          <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-neutral-500">
            Find quick answers about the information we collect, how it is
            used, data protection, cookies, and privacy-related requests.
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
            Have a privacy question? Contact us
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