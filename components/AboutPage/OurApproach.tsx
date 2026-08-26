import {
  Compass,
  Layers3,
  Rocket,
  ShieldCheck,
} from "lucide-react";

const APPROACH = [
  {
    number: "01",
    icon: Compass,
    title: "Understand the business first",
    description:
      "Before thinking about screens or code, we understand what the business does, who it serves and what the digital product actually needs to accomplish.",
  },
  {
    number: "02",
    icon: Layers3,
    title: "Design around the user",
    description:
      "The structure, content and interface are planned around how real users discover information, make decisions and take action.",
  },
  {
    number: "03",
    icon: ShieldCheck,
    title: "Build with a solid foundation",
    description:
      "We focus on clean architecture, responsive experiences, maintainability and the technical foundations required for the product to grow.",
  },
  {
    number: "04",
    icon: Rocket,
    title: "Think beyond the launch",
    description:
      "A website should not become obsolete after it goes live. We build with future improvements, content, integrations and business growth in mind.",
  },
];

export default function OurApproach() {
  return (
    <section className="relative overflow-hidden bg-[#080808] py-20 sm:py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-[0.7fr_1.3fr] lg:gap-24">
          <div className="max-w-md">
            <span className="text-xs font-semibold uppercase tracking-[0.17em] text-[#FFC400]">
              Our approach
            </span>

            <h2 className="mt-4 text-3xl font-semibold leading-tight tracking-[-0.045em] text-white sm:text-4xl lg:text-5xl">
              Build with purpose.
              <span className="block text-neutral-500">
                Not just pixels.
              </span>
            </h2>

            <p className="mt-6 text-sm leading-7 text-neutral-500 sm:text-base">
              Good digital work starts with understanding the problem.
              Our approach combines business thinking, user experience
              and development instead of treating them as separate
              pieces.
            </p>
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            {APPROACH.map((item) => {
              const Icon = item.icon;

              return (
                <article
                  key={item.number}
                  className="
                    group rounded-3xl
                    border border-white/[0.08]
                    bg-white/[0.025]
                    p-6 sm:p-7
                    transition-all duration-300
                    hover:border-white/[0.14]
                    hover:bg-white/[0.035]
                  "
                >
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold tracking-[0.18em] text-[#FFC400]">
                      {item.number}
                    </span>

                    <div
                      className="
                        flex h-10 w-10 items-center justify-center
                        rounded-full
                        border border-white/[0.08]
                        bg-black/20
                        text-neutral-400
                        transition-colors duration-300
                        group-hover:border-[#FFC400]/20
                        group-hover:text-[#FFC400]
                      "
                    >
                      <Icon size={17} />
                    </div>
                  </div>

                  <h3 className="mt-10 text-lg font-semibold tracking-[-0.025em] text-white sm:text-xl">
                    {item.title}
                  </h3>

                  <p className="mt-4 text-sm leading-6 text-neutral-500">
                    {item.description}
                  </p>
                </article>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}