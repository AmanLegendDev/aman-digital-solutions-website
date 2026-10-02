const projectFAQs = [
  {
    question: "What types of websites does Aman Digital Solutions build?",
    answer:
      "Aman Digital Solutions builds business websites, e-commerce stores, custom web applications and digital platforms tailored to specific business requirements.",
  },
  {
    question: "Can you build an e-commerce website for my business?",
    answer:
      "Yes. We build e-commerce websites with product listings, categories, shopping experiences and other features required to support online sales.",
  },
  {
    question: "Do you build custom web applications?",
    answer:
      "Yes. Custom web applications can be developed around specific business workflows, requirements and operational needs.",
  },
  {
    question: "What technologies do you use for web development?",
    answer:
      "Depending on the project, Aman Digital Solutions works with technologies such as Next.js, React, TypeScript, Tailwind CSS, MongoDB and other modern web development tools.",
  },
  {
    question: "Do you work with businesses outside Shimla?",
    answer:
      "Yes. Aman Digital Solutions works with businesses in Shimla, across Himachal Pradesh, throughout India and on remote projects beyond India.",
  },
  {
    question: "Can you maintain and improve a website after launch?",
    answer:
      "Yes. Website maintenance, content updates, improvements and ongoing digital support can be provided according to the project's requirements.",
  },
];

export const projectsFAQSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: projectFAQs.map((faq) => ({
    "@type": "Question",
    name: faq.question,
    acceptedAnswer: {
      "@type": "Answer",
      text: faq.answer,
    },
  })),
};

export default function ProjectsFAQSection() {
  return (
    <section
      aria-labelledby="projects-faq-heading"
      className="border-t border-white/[0.06] bg-[#050505] px-5 py-20 sm:px-8 sm:py-24 lg:px-10 lg:py-28"
    >
      <div className="mx-auto max-w-4xl">
        {/* HEADER */}

        <div className="max-w-2xl">
          <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[#FFC400]">
            Frequently asked questions
          </p>

          <h2
            id="projects-faq-heading"
            className="mt-4 text-3xl font-semibold leading-[1.05] tracking-[-0.045em] text-white sm:text-4xl lg:text-5xl"
          >
            Questions about our projects.
          </h2>

          <p className="mt-5 text-sm leading-6 text-neutral-500 sm:text-base">
            Learn more about the websites, e-commerce stores and custom web
            applications we build for businesses.
          </p>
        </div>

        {/* FAQ LIST */}

        <div className="mt-10 divide-y divide-white/[0.06] border-y border-white/[0.06]">
          {projectFAQs.map((faq) => (
            <details
              key={faq.question}
              className="group py-6"
            >
              <summary className="cursor-pointer list-none pr-8 text-base font-medium leading-6 text-white marker:hidden sm:text-lg">
                {faq.question}
              </summary>

              <p className="mt-4 max-w-3xl text-sm leading-7 text-neutral-500">
                {faq.answer}
              </p>
            </details>
          ))}
        </div>
      </div>

      {/* FAQ STRUCTURED DATA */}

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(projectsFAQSchema),
        }}
      />
    </section>
  );
}