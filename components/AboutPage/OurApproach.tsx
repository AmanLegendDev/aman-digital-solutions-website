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
      "Before thinking about screens or code, we understand what the business does, who it serves and what the digital solution needs to accomplish.",
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
      "We focus on clean architecture, responsive experiences, maintainability and the technical foundations needed for reliable digital products.",
  },
  {
    number: "04",
    icon: Rocket,
    title: "Think beyond the launch",
    description:
      "A digital product should continue to support the business after launch. We build with future improvements, content, integrations and growth in mind.",
  },
];

export default function OurApproach() {
  return (
    <section
      className="relative overflow-hidden bg-[#080808] py-20 sm:py-24 lg:py-32"
      aria-labelledby="approach-heading"
    >
      <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-[0.7fr_1.3fr] lg:gap-24">
          {/* INTRO */}
          <div className="max-w-md">
            <span className="text-xs font-semibold uppercase tracking-[0.17em] text-[#FFC400]">
              Our approach
            </span>

            <h2
              id="approach-heading"
              className="mt-4 text-3xl font-semibold leading-tight tracking-[-0.045em] text-white sm:text-4xl lg:text-5xl"
            >
              Build with purpose.
              <span className="block text-neutral-500">
                Not just pixels.
              </span>
            </h2>

            <p className="mt-6 text-sm leading-7 text-neutral-500 sm:text-base">
              Good digital work starts with understanding the problem.
              Our approach brings business thinking, user experience and
              development together to create practical digital solutions
              around real requirements.
            </p>
          </div>

          {/* APPROACH */}
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
                      <Icon
                        size={17}
                        strokeWidth={1.7}
                        aria-hidden="true"
                      />
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