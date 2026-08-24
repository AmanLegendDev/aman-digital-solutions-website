import {
  Code2,
  Layers3,
  ArrowUpRight,
} from "lucide-react";

export type ProjectTechnology = string;

type ProjectTechnologiesSectionProps = {
  technologies: ProjectTechnology[];
};

export default function ProjectTechnologiesSection({
  technologies,
}: ProjectTechnologiesSectionProps) {
  if (!technologies?.length) {
    return null;
  }

  return (
    <section
      id="project-technologies"
      aria-labelledby="project-technologies-heading"
      className="relative border-t border-white/[0.06] bg-[#050505] py-20 sm:py-24 lg:py-28"
    >
      <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
        {/* =================================================
            HEADER
        ================================================= */}

        <div className="grid gap-6 lg:grid-cols-[0.75fr_1.25fr] lg:items-end">
          <div>
            <div className="flex items-center gap-3">
              <span
                aria-hidden="true"
                className="flex h-8 w-8 items-center justify-center rounded-xl border border-[#FFC400]/20 bg-[#FFC400]/[0.05] text-[#FFC400]"
              >
                <Code2 size={14} />
              </span>

              <span className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[#FFC400]">
                Technology
              </span>
            </div>

            <h2
              id="project-technologies-heading"
              className="mt-5 text-3xl font-semibold leading-[1.05] tracking-[-0.045em] text-white sm:text-4xl lg:text-[3.2rem]"
            >
              The stack behind
              <br />
              <span className="text-neutral-500">
                the experience.
              </span>
            </h2>
          </div>

          <p className="max-w-xl text-sm leading-7 text-neutral-500 lg:justify-self-end">
            A carefully selected technology stack gives the
            project the foundation it needs to stay fast,
            reliable, maintainable and ready to grow.
          </p>
        </div>

        {/* =================================================
            TECHNOLOGY GRID
        ================================================= */}

        <div className="mt-14 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {technologies.map((technology, index) => (
            <article
              key={`${technology}-${index}`}
              className="group relative overflow-hidden rounded-[24px] border border-white/[0.07] bg-[#090909] p-5 transition-all duration-300 hover:-translate-y-1 hover:border-[#FFC400]/20 hover:bg-[#0A0A0A] sm:p-6"
            >
              {/* SUBTLE GLOW */}

              <span
                aria-hidden="true"
                className="pointer-events-none absolute -right-8 -top-8 h-24 w-24 rounded-full bg-[#FFC400]/[0.025] blur-3xl transition-all duration-500 group-hover:bg-[#FFC400]/[0.07]"
              />

              <div className="relative flex items-center gap-4">
                {/* ICON */}

                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-white/[0.07] bg-white/[0.02] text-neutral-500 transition-all duration-300 group-hover:border-[#FFC400]/20 group-hover:bg-[#FFC400]/[0.05] group-hover:text-[#FFC400]">
                  <Layers3 size={17} />
                </div>

                {/* NAME */}

                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-semibold tracking-[-0.01em] text-white">
                    {technology}
                  </p>

                  <p className="mt-1 text-[9px] uppercase tracking-[0.16em] text-neutral-700">
                    Core technology
                  </p>
                </div>

                {/* NUMBER */}

                <span className="self-start text-[9px] font-semibold tabular-nums tracking-[0.18em] text-neutral-800 transition-colors duration-300 group-hover:text-[#FFC400]/50">
                  {String(index + 1).padStart(2, "0")}
                </span>
              </div>

              {/* ARROW */}

              <div className="relative mt-5 flex justify-end">
                <ArrowUpRight
                  size={14}
                  className="text-neutral-800 transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-[#FFC400]"
                />
              </div>

              {/* BOTTOM ACCENT */}

              <span
                aria-hidden="true"
                className="absolute bottom-0 left-6 h-px w-0 bg-gradient-to-r from-[#FFC400] to-transparent transition-all duration-500 group-hover:w-1/2"
              />
            </article>
          ))}
        </div>

        {/* =================================================
            STACK META
        ================================================= */}

        <div className="mt-5 flex flex-col gap-3 rounded-2xl border border-white/[0.05] bg-[#080808] px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-3">
            <span className="h-1.5 w-1.5 rounded-full bg-[#FFC400]" />

            <p className="text-[10px] uppercase tracking-[0.16em] text-neutral-700">
              Production-ready stack
            </p>
          </div>

          <p className="text-[10px] font-medium tabular-nums text-neutral-800">
            {technologies.length}{" "}
            {technologies.length === 1
              ? "technology"
              : "technologies"}
          </p>
        </div>
      </div>
    </section>
  );
}