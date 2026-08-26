import {
  ArrowUpRight,
  Code2,
  Lightbulb,
  Rocket,
} from "lucide-react";

const JOURNEY = [
  {
    year: "16 JUN 2025",
    title: "The starting point",
    description:
      "I started learning web development through a web designing course, beginning with HTML, CSS and the fundamentals of WordPress.",
    icon: Code2,
  },
  {
    year: "SELF-LEARNING",
    title: "Going beyond the basics",
    description:
      "After the fundamentals, I continued learning independently through building projects, experimenting with modern technologies and solving real development problems.",
    icon: Lightbulb,
  },
  {
    year: "2025 → 2026",
    title: "From projects to business",
    description:
      "As the projects became more capable and the development skills grew, the goal shifted from simply getting a job to building something of my own.",
    icon: Rocket,
  },
];

export default function FounderStory() {
  return (
    <section
      id="story"
      className="relative overflow-hidden bg-[#080808] py-20 sm:py-24 lg:py-32"
    >
      <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-[0.72fr_1.28fr] lg:gap-24">
          {/* INTRO */}
          <div className="lg:sticky lg:top-32 lg:self-start">
            <span className="text-xs font-semibold uppercase tracking-[0.17em] text-[#FFC400]">
              The journey
            </span>

            <h2 className="mt-4 text-3xl font-semibold leading-tight tracking-[-0.04em] text-white sm:text-4xl lg:text-5xl">
              It started with a skill.
              <span className="block text-neutral-500">
                It became a vision.
              </span>
            </h2>

            <p className="mt-6 max-w-md text-sm leading-7 text-neutral-500 sm:text-base">
              Aman Digital Solutions wasn&apos;t created overnight.
              It grew from learning, building, making mistakes, solving
              problems and gradually understanding what businesses
              actually need from technology.
            </p>

            <a
              href="#capabilities"
              className="
                group mt-7 inline-flex items-center gap-2
                text-sm font-medium text-neutral-300
                transition-colors hover:text-white
              "
            >
              Explore what we build

              <ArrowUpRight
                size={15}
                className="
                  text-[#FFC400]
                  transition-transform duration-200
                  group-hover:-translate-y-0.5
                  group-hover:translate-x-0.5
                "
              />
            </a>
          </div>

          {/* JOURNEY */}
          <div className="relative">
            {/* Timeline */}
            <div
              aria-hidden="true"
              className="
                absolute bottom-5 left-[15px] top-5
                w-px bg-gradient-to-b
                from-[#FFC400]/40
                via-white/[0.08]
                to-transparent
                sm:left-[19px]
              "
            />

            <div className="space-y-5 sm:space-y-6">
              {JOURNEY.map((item) => {
                const Icon = item.icon;

                return (
                  <article
                    key={item.title}
                    className="
                      relative rounded-3xl
                      border border-white/[0.08]
                      bg-white/[0.025]
                      p-6 pl-12
                      transition-colors duration-300
                      hover:border-white/[0.13]
                      sm:p-8 sm:pl-16
                    "
                  >
                    {/* Timeline point */}
                    <div
                      className="
                        absolute left-[7px] top-7
                        flex h-[18px] w-[18px]
                        items-center justify-center
                        rounded-full
                        border border-[#FFC400]/40
                        bg-[#080808]
                        sm:left-[11px] sm:top-9
                        sm:h-[18px] sm:w-[18px]
                      "
                    >
                      <span className="h-1.5 w-1.5 rounded-full bg-[#FFC400]" />
                    </div>

                    <div className="flex items-start justify-between gap-5">
                      <div>
                        <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#FFC400]">
                          {item.year}
                        </p>

                        <h3 className="mt-3 text-xl font-semibold tracking-[-0.025em] text-white sm:text-2xl">
                          {item.title}
                        </h3>
                      </div>

                      <div className="hidden h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white/[0.08] bg-black/20 text-neutral-400 sm:flex">
                        <Icon size={17} />
                      </div>
                    </div>

                    <p className="mt-4 max-w-2xl text-sm leading-7 text-neutral-500 sm:text-[15px]">
                      {item.description}
                    </p>
                  </article>
                );
              })}
            </div>

            {/* Current vision */}
            <div className="mt-5 rounded-3xl border border-[#FFC400]/15 bg-[#FFC400]/[0.035] p-6 sm:p-8">
              <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#FFC400]">
                Today
              </p>

              <h3 className="mt-3 text-2xl font-semibold tracking-[-0.035em] text-white">
                Building Aman Digital Solutions for the long term.
              </h3>

              <p className="mt-4 max-w-2xl text-sm leading-7 text-neutral-400 sm:text-[15px]">
                The goal is bigger than delivering individual websites.
                The long-term vision is to build a company capable of
                delivering reliable digital solutions to businesses
                worldwide.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}