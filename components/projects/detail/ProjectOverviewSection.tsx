import {
  ArrowRight,
  Lightbulb,
  Target,
} from "lucide-react";

export type ProjectOverviewData = {
  overview: string;
  challenge?: string;
  solution?: string;
};

type ProjectOverviewSectionProps = {
  project: ProjectOverviewData;
};

export default function ProjectOverviewSection({
  project,
}: ProjectOverviewSectionProps) {
  const hasChallenge = Boolean(
    project.challenge?.trim()
  );

  const hasSolution = Boolean(
    project.solution?.trim()
  );

  return (
    <section
      id="project-overview"
      aria-labelledby="project-overview-heading"
      className="relative border-t border-white/[0.06] bg-[#050505] py-20 sm:py-24 lg:py-28"
    >
      <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
        {/* ===================================================
            HEADER
        =================================================== */}

        <div className="grid gap-6 lg:grid-cols-[0.75fr_1.25fr] lg:items-end">
          <div>
            <div className="flex items-center gap-3">
              <span
                aria-hidden="true"
                className="flex h-8 w-8 items-center justify-center rounded-xl border border-[#FFC400]/20 bg-[#FFC400]/[0.05] text-[#FFC400]"
              >
                <Lightbulb size={14} />
              </span>

              <span className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[#FFC400]">
                The story
              </span>
            </div>

            <h2
              id="project-overview-heading"
              className="mt-5 text-3xl font-semibold leading-[1.05] tracking-[-0.045em] text-white sm:text-4xl lg:text-[3.2rem]"
            >
              Behind the
              <br />
              <span className="text-neutral-500">
                project.
              </span>
            </h2>
          </div>

          <div className="lg:justify-self-end lg:max-w-xl">
            <p className="text-sm leading-7 text-neutral-500">
              Every project starts with a real business
              need. Here&apos;s the thinking behind this
              build, the problem we addressed and the
              solution we created.
            </p>
          </div>
        </div>

        {/* ===================================================
            OVERVIEW
        =================================================== */}

        <div className="mt-12 rounded-[28px] border border-white/[0.07] bg-[#090909] p-6 sm:p-8 lg:p-10">
          <div className="grid gap-8 lg:grid-cols-[180px_1fr] lg:gap-12">
            {/* LABEL */}

            <div>
              <span className="text-[9px] font-semibold uppercase tracking-[0.18em] text-neutral-700">
                01 / Overview
              </span>
            </div>

            {/* CONTENT */}

            <div>
              <p className="max-w-4xl text-lg leading-8 tracking-[-0.015em] text-neutral-300 sm:text-xl sm:leading-9 lg:text-[1.45rem] lg:leading-9">
                {project.overview}
              </p>
            </div>
          </div>
        </div>

        {/* ===================================================
            CHALLENGE + SOLUTION
        =================================================== */}

        {(hasChallenge || hasSolution) && (
          <div className="mt-4 grid gap-4 lg:grid-cols-2">
            {/* =================================================
                CHALLENGE
            ================================================= */}

            {hasChallenge && (
              <article className="group relative overflow-hidden rounded-[28px] border border-white/[0.07] bg-[#090909] p-6 sm:p-8">
                {/* ACCENT */}

                <span
                  aria-hidden="true"
                  className="absolute right-0 top-0 h-32 w-32 rounded-full bg-white/[0.015] blur-3xl transition-colors duration-500 group-hover:bg-[#FFC400]/[0.035]"
                />

                <div className="relative">
                  <div className="flex items-center justify-between">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/[0.07] bg-white/[0.02] text-neutral-500 transition-colors duration-300 group-hover:border-[#FFC400]/20 group-hover:text-[#FFC400]">
                      <Target size={16} />
                    </div>

                    <span className="text-[9px] font-semibold uppercase tracking-[0.18em] text-neutral-800">
                      02
                    </span>
                  </div>

                  <p className="mt-7 text-[9px] font-semibold uppercase tracking-[0.18em] text-neutral-700">
                    The challenge
                  </p>

                  <h3 className="mt-2 text-xl font-semibold tracking-[-0.025em] text-white">
                    What needed to be solved.
                  </h3>

                  <p className="mt-4 text-sm leading-7 text-neutral-500">
                    {project.challenge}
                  </p>
                </div>

                <span
                  aria-hidden="true"
                  className="absolute bottom-0 left-7 h-px w-0 bg-gradient-to-r from-[#FFC400] to-transparent transition-all duration-500 group-hover:w-1/2"
                />
              </article>
            )}

            {/* =================================================
                SOLUTION
            ================================================= */}

            {hasSolution && (
              <article className="group relative overflow-hidden rounded-[28px] border border-white/[0.07] bg-[#090909] p-6 sm:p-8">
                {/* ACCENT */}

                <span
                  aria-hidden="true"
                  className="absolute right-0 top-0 h-32 w-32 rounded-full bg-[#FFC400]/[0.015] blur-3xl transition-colors duration-500 group-hover:bg-[#FFC400]/[0.05]"
                />

                <div className="relative">
                  <div className="flex items-center justify-between">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-[#FFC400]/15 bg-[#FFC400]/[0.04] text-[#FFC400]">
                      <Lightbulb size={16} />
                    </div>

                    <span className="text-[9px] font-semibold uppercase tracking-[0.18em] text-neutral-800">
                      03
                    </span>
                  </div>

                  <p className="mt-7 text-[9px] font-semibold uppercase tracking-[0.18em] text-neutral-700">
                    The solution
                  </p>

                  <h3 className="mt-2 text-xl font-semibold tracking-[-0.025em] text-white">
                    How we approached it.
                  </h3>

                  <p className="mt-4 text-sm leading-7 text-neutral-500">
                    {project.solution}
                  </p>
                </div>

                <span
                  aria-hidden="true"
                  className="absolute bottom-0 left-7 h-px w-0 bg-gradient-to-r from-[#FFC400] to-transparent transition-all duration-500 group-hover:w-1/2"
                />
              </article>
            )}
          </div>
        )}

        {/* ===================================================
            TRANSITION
        =================================================== */}

        {(hasChallenge || hasSolution) && (
          <div className="mt-10 flex items-center justify-center">
            <div className="flex items-center gap-3 text-[9px] font-semibold uppercase tracking-[0.18em] text-neutral-800">
              <span className="h-px w-10 bg-white/[0.06]" />

              From problem to product

              <ArrowRight size={12} />

              <span className="h-px w-10 bg-white/[0.06]" />
            </div>
          </div>
        )}
      </div>
    </section>
  );
}