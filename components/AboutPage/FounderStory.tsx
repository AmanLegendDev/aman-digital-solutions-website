import {
  ArrowUpRight,
  BriefcaseBusiness,
  Code2,
  Globe2,
  Rocket,
} from "lucide-react";

const JOURNEY = [
  {
    year: "2025",
    title: "Built on web development",
    description:
      "Aman Digital Solutions began with a focus on learning modern web development and understanding how websites, applications and digital products can solve practical business problems.",
    icon: Code2,
  },
  {
    year: "2025 → 2026",
    title: "From learning to real projects",
    description:
      "The focus moved from learning individual technologies to building complete digital experiences — websites, e-commerce platforms, custom web applications, business systems and SEO-ready solutions.",
    icon: BriefcaseBusiness,
  },
  {
    year: "INDIA & AUSTRALIA",
    title: "Working across markets",
    description:
      "Projects have expanded beyond the local market, with more than 20 projects completed across different business needs and work delivered for businesses in India and Australia.",
    icon: Globe2,
  },
];

export default function FounderStory() {
  return (
    <section
      id="story"
      className="relative overflow-hidden bg-[#080808] py-20 sm:py-24 lg:py-32"
      aria-labelledby="story-heading"
    >
      <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-[0.72fr_1.28fr] lg:gap-24">
          {/* INTRO */}
          <div className="lg:sticky lg:top-32 lg:self-start">
            <span className="text-xs font-semibold uppercase tracking-[0.17em] text-[#FFC400]">
              The journey
            </span>

            <h2
              id="story-heading"
              className="mt-4 text-3xl font-semibold leading-tight tracking-[-0.04em] text-white sm:text-4xl lg:text-5xl"
            >
              From learning
              <span className="block text-neutral-500">
                to building for business.
              </span>
            </h2>

            <p className="mt-6 max-w-md text-sm leading-7 text-neutral-500 sm:text-base">
              Aman Digital Solutions has grown through continuous
              learning, real-world projects and a deeper understanding
              of what businesses actually need from technology.
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
                aria-hidden="true"
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
                        <Icon
                          size={17}
                          strokeWidth={1.7}
                          aria-hidden="true"
                        />
                      </div>
                    </div>

                    <p className="mt-4 max-w-2xl text-sm leading-7 text-neutral-500 sm:text-[15px]">
                      {item.description}
                    </p>
                  </article>
                );
              })}
            </div>

            {/* Current position */}
            <div className="mt-5 rounded-3xl border border-[#FFC400]/15 bg-[#FFC400]/[0.035] p-6 sm:p-8">
              <div className="flex items-center gap-2">
                <Rocket
                  size={15}
                  className="text-[#FFC400]"
                  aria-hidden="true"
                />

                <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#FFC400]">
                  Today
                </p>
              </div>

              <h3 className="mt-3 text-2xl font-semibold tracking-[-0.035em] text-white">
                Building digital solutions for the long term.
              </h3>

              <p className="mt-4 max-w-2xl text-sm leading-7 text-neutral-400 sm:text-[15px]">
                With 20+ projects completed across India and Australia,
                Aman Digital Solutions continues to grow around one
                principle: build useful digital products that help
                businesses operate, compete and grow online.
              </p>

              <div className="mt-6 flex flex-wrap gap-2">
                <span className="rounded-full border border-white/[0.08] bg-white/[0.025] px-3 py-1.5 text-[10px] font-medium text-neutral-400">
                  20+ Projects
                </span>

                <span className="rounded-full border border-white/[0.08] bg-white/[0.025] px-3 py-1.5 text-[10px] font-medium text-neutral-400">
                  India
                </span>

                <span className="rounded-full border border-white/[0.08] bg-white/[0.025] px-3 py-1.5 text-[10px] font-medium text-neutral-400">
                  Australia
                </span>

                <span className="rounded-full border border-white/[0.08] bg-white/[0.025] px-3 py-1.5 text-[10px] font-medium text-neutral-400">
                  Digital Solutions
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}