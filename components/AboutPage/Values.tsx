import {
  Handshake,
  ShieldCheck,
  Target,
  TrendingUp,
} from "lucide-react";

const VALUES = [
  {
    number: "01",
    icon: Target,
    title: "Quality over quantity",
    description:
      "We would rather build fewer products properly than fill a portfolio with work we cannot stand behind. Every project deserves attention to detail.",
  },
  {
    number: "02",
    icon: Handshake,
    title: "Business first",
    description:
      "A website is not the goal. The goal is helping a business communicate better, earn trust, generate opportunities or operate more effectively.",
  },
  {
    number: "03",
    icon: ShieldCheck,
    title: "Transparency",
    description:
      "Clear communication, realistic expectations and honest recommendations matter more than promising everything a client wants to hear.",
  },
  {
    number: "04",
    icon: TrendingUp,
    title: "Built for the long term",
    description:
      "We think beyond launch day. Digital products should have room to evolve as the business, its customers and its requirements change.",
  },
];

export default function Values() {
  return (
    <section className="relative overflow-hidden bg-[#080808] py-20 sm:py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-[0.65fr_1.35fr] lg:gap-24">
          <div className="max-w-md">
            <span className="text-xs font-semibold uppercase tracking-[0.17em] text-[#FFC400]">
              What we believe
            </span>

            <h2 className="mt-4 text-3xl font-semibold leading-tight tracking-[-0.045em] text-white sm:text-4xl lg:text-5xl">
              Principles that
              <span className="block text-neutral-500">
                shape the work.
              </span>
            </h2>

            <p className="mt-6 text-sm leading-7 text-neutral-500 sm:text-base">
              Technology changes quickly. The principles behind good
              work should not.
            </p>
          </div>

          <div className="divide-y divide-white/[0.08] rounded-3xl border border-white/[0.08] bg-white/[0.02]">
            {VALUES.map((item) => {
              const Icon = item.icon;

              return (
                <article
                  key={item.number}
                  className="
                    group grid gap-5 p-6
                    sm:grid-cols-[48px_1fr_auto]
                    sm:items-start
                    sm:p-7
                  "
                >
                  <span className="pt-1 text-[10px] font-bold tracking-[0.18em] text-[#FFC400]">
                    {item.number}
                  </span>

                  <div>
                    <h3 className="flex items-center gap-3 text-lg font-semibold tracking-[-0.025em] text-white">
                      <Icon
                        size={17}
                        className="
                          text-neutral-600
                          transition-colors duration-300
                          group-hover:text-[#FFC400]
                        "
                      />
                      {item.title}
                    </h3>

                    <p className="mt-3 max-w-2xl text-sm leading-6 text-neutral-500">
                      {item.description}
                    </p>
                  </div>

                  <div className="hidden h-8 w-8 items-center justify-center rounded-full border border-white/[0.07] text-neutral-700 sm:flex">
                    <span className="text-xs">+</span>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}