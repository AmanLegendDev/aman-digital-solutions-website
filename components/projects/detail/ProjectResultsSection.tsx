import {
  ArrowUpRight,
  BarChart3,
  CheckCircle2,
  TrendingUp,
} from "lucide-react";

export type ProjectResult = {
  label: string;
  value: string;
  description?: string;
};

type ProjectResultsSectionProps = {
  results: ProjectResult[];
};

export default function ProjectResultsSection({
  results,
}: ProjectResultsSectionProps) {
  if (!results?.length) {
    return null;
  }

  return (
    <section
      id="project-results"
      aria-labelledby="project-results-heading"
      className="relative overflow-hidden border-t border-white/[0.06] bg-[#070707] py-20 sm:py-24 lg:py-28"
    >
      {/* BACKGROUND ACCENT */}

      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-0 h-[320px] w-[700px] -translate-x-1/2 rounded-full bg-[#FFC400]/[0.025] blur-[120px]"
      />

      <div className="relative mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
        {/* =================================================
            HEADER
        ================================================= */}

        <div className="grid gap-6 lg:grid-cols-[0.85fr_1.15fr] lg:items-end">
          <div>
            <div className="flex items-center gap-3">
              <span
                aria-hidden="true"
                className="flex h-8 w-8 items-center justify-center rounded-xl border border-[#FFC400]/20 bg-[#FFC400]/[0.05] text-[#FFC400]"
              >
                <TrendingUp size={14} />
              </span>

              <span className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[#FFC400]">
                Project impact
              </span>
            </div>

            <h2
              id="project-results-heading"
              className="mt-5 text-3xl font-semibold leading-[1.05] tracking-[-0.045em] text-white sm:text-4xl lg:text-[3.2rem]"
            >
              Built to create
              <br />
              <span className="text-neutral-500">
                measurable value.
              </span>
            </h2>
          </div>

          <p className="max-w-xl text-sm leading-7 text-neutral-500 lg:justify-self-end">
            The work is not just about shipping a product.
            These are the outcomes and improvements this
            project was designed to deliver.
          </p>
        </div>

        {/* =================================================
            RESULTS GRID
        ================================================= */}

        <div
          className={[
            "mt-14 grid gap-3",
            results.length === 1
              ? "max-w-xl"
              : results.length === 2
                ? "sm:grid-cols-2"
                : "sm:grid-cols-2 lg:grid-cols-3",
          ].join(" ")}
        >
          {results.map((result, index) => (
            <article
              key={`${result.label}-${index}`}
              className="group relative overflow-hidden rounded-[26px] border border-white/[0.07] bg-[#090909] p-6 transition-all duration-300 hover:-translate-y-1 hover:border-[#FFC400]/20 hover:bg-[#0A0A0A] sm:p-7"
            >
              {/* CORNER GLOW */}

              <span
                aria-hidden="true"
                className="pointer-events-none absolute -right-10 -top-10 h-28 w-28 rounded-full bg-[#FFC400]/[0.025] blur-3xl transition-all duration-500 group-hover:bg-[#FFC400]/[0.07]"
              />

              <div className="relative">
                {/* TOP META */}

                <div className="flex items-center justify-between">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/[0.07] bg-white/[0.02] text-neutral-500 transition-all duration-300 group-hover:border-[#FFC400]/20 group-hover:bg-[#FFC400]/[0.05] group-hover:text-[#FFC400]">
                    <BarChart3 size={16} />
                  </div>

                  <span className="text-[9px] font-semibold tabular-nums tracking-[0.18em] text-neutral-800 transition-colors duration-300 group-hover:text-[#FFC400]/50">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                </div>

                {/* VALUE */}

                <div className="mt-8">
                  <p className="text-3xl font-semibold tracking-[-0.045em] text-white sm:text-4xl">
                    {result.value}
                  </p>

                  <p className="mt-3 text-sm font-semibold text-neutral-300">
                    {result.label}
                  </p>

                  {result.description && (
                    <p className="mt-2 text-sm leading-6 text-neutral-600">
                      {result.description}
                    </p>
                  )}
                </div>

                {/* FOOTER */}

                <div className="mt-8 flex items-center justify-between border-t border-white/[0.05] pt-4">
                  <div className="flex items-center gap-2">
                    <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[#FFC400]/[0.07] text-[#FFC400]">
                      <CheckCircle2 size={11} />
                    </span>

                    <span className="text-[9px] font-medium uppercase tracking-[0.15em] text-neutral-700">
                      Project outcome
                    </span>
                  </div>

                  <ArrowUpRight
                    size={14}
                    className="text-neutral-800 transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-[#FFC400]"
                  />
                </div>
              </div>

              {/* BOTTOM ACCENT */}

              <span
                aria-hidden="true"
                className="absolute bottom-0 left-7 h-px w-0 bg-gradient-to-r from-[#FFC400] to-transparent transition-all duration-500 group-hover:w-1/2"
              />
            </article>
          ))}
        </div>

        {/* =================================================
            FOOTER
        ================================================= */}

        <div className="mt-5 flex items-center gap-3 rounded-2xl border border-white/[0.05] bg-[#080808] px-5 py-4">
          <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-[#FFC400]" />

          <p className="text-[10px] leading-5 text-neutral-600">
            Results shown here represent the outcomes defined
            for this project.
          </p>
        </div>
      </div>
    </section>
  );
}