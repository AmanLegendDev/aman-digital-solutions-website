import {
  Blocks,
  MessageSquareText,
  Sparkles,
  UserRound,
} from "lucide-react";

const REASONS = [
  {
    icon: UserRound,
    title: "Direct founder involvement",
    description:
      "As a solo founder, Aman remains directly involved in the work instead of passing the project through layers of account managers and teams.",
  },
  {
    icon: Blocks,
    title: "One connected system",
    description:
      "Design, frontend, backend, CMS, integrations and deployment are considered together so the final product feels like one coherent experience.",
  },
  {
    icon: MessageSquareText,
    title: "Clear communication",
    description:
      "Clients should understand what is being built, why it matters and what comes next. Communication stays practical and straightforward.",
  },
  {
    icon: Sparkles,
    title: "Built around the business",
    description:
      "There is no fixed template for every client. The structure, features and experience are shaped around the business and its customers.",
  },
];

export default function WhyWorkWithUs() {
  return (
    <section className="relative overflow-hidden bg-[#080808] py-20 sm:py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <span className="text-xs font-semibold uppercase tracking-[0.17em] text-[#FFC400]">
            Why work with us
          </span>

          <h2 className="mt-4 text-3xl font-semibold leading-tight tracking-[-0.045em] text-white sm:text-4xl lg:text-5xl">
            Small by design.
            <span className="block text-neutral-500">
              Serious about the work.
            </span>
          </h2>

          <p className="mt-6 text-sm leading-7 text-neutral-500 sm:text-base">
            Aman Digital Solutions is currently founder-led. That means
            clients work closely with the person responsible for the
            product, rather than becoming another project in a large
            production pipeline.
          </p>
        </div>

        <div className="mt-12 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {REASONS.map((item) => {
            const Icon = item.icon;

            return (
              <article
                key={item.title}
                className="
                  group rounded-3xl
                  border border-white/[0.08]
                  bg-white/[0.025]
                  p-6 sm:p-7
                  transition-all duration-300
                  hover:-translate-y-1
                  hover:border-[#FFC400]/20
                  hover:bg-white/[0.035]
                "
              >
                <div
                  className="
                    flex h-11 w-11 items-center justify-center
                    rounded-2xl
                    border border-white/[0.08]
                    bg-black/20
                    text-neutral-400
                    transition-all duration-300
                    group-hover:border-[#FFC400]/20
                    group-hover:text-[#FFC400]
                  "
                >
                  <Icon size={18} />
                </div>

                <h3 className="mt-7 text-lg font-semibold tracking-[-0.025em] text-white">
                  {item.title}
                </h3>

                <p className="mt-3 text-sm leading-6 text-neutral-500">
                  {item.description}
                </p>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}