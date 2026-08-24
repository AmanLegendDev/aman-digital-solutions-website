import {
  ArrowUpRight,
  Blocks,
  Check,
} from "lucide-react";

export type ProjectFeature = {
  title: string;
  description: string;
  icon?: string;
};

type ProjectFeaturesSectionProps = {
  features: ProjectFeature[];
};

export default function ProjectFeaturesSection({
  features,
}: ProjectFeaturesSectionProps) {
  if (!features?.length) {
    return null;
  }

  return (
    <section
      id="project-features"
      aria-labelledby="project-features-heading"
      className="relative border-t border-white/[0.06] bg-[#050505] py-20 sm:py-24 lg:py-28"
    >
      <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
        {/* =================================================
            HEADER
        ================================================= */}

        <div className="grid gap-6 lg:grid-cols-[0.8fr_1.2fr] lg:items-end">
          <div>
            <div className="flex items-center gap-3">
              <span
                aria-hidden="true"
                className="flex h-8 w-8 items-center justify-center rounded-xl border border-[#FFC400]/20 bg-[#FFC400]/[0.05] text-[#FFC400]"
              >
                <Blocks size={14} />
              </span>

              <span className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[#FFC400]">
                What we built
              </span>
            </div>

            <h2
              id="project-features-heading"
              className="mt-5 text-3xl font-semibold leading-[1.05] tracking-[-0.045em] text-white sm:text-4xl lg:text-[3.2rem]"
            >
              Built around
              <br />
              <span className="text-neutral-500">
                what matters.
              </span>
            </h2>
          </div>

          <p className="max-w-xl text-sm leading-7 text-neutral-500 lg:justify-self-end">
            Every feature has a purpose. The final product
            is shaped around usability, performance and the
            goals this project needed to achieve.
          </p>
        </div>

        {/* =================================================
            FEATURE GRID
        ================================================= */}

        <div className="mt-14 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, index) => (
            <article
              key={`${feature.title}-${index}`}
              className="group relative overflow-hidden rounded-[26px] border border-white/[0.07] bg-[#090909] p-6 transition-all duration-300 hover:-translate-y-1 hover:border-[#FFC400]/20 hover:bg-[#0A0A0A] sm:p-7"
            >
              {/* HOVER GLOW */}

              <span
                aria-hidden="true"
                className="pointer-events-none absolute -right-10 -top-10 h-28 w-28 rounded-full bg-[#FFC400]/[0.025] blur-3xl transition-all duration-500 group-hover:bg-[#FFC400]/[0.07]"
              />

              <div className="relative">
                {/* TOP */}

                <div className="flex items-center justify-between">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-white/[0.07] bg-white/[0.02] text-neutral-500 transition-all duration-300 group-hover:border-[#FFC400]/20 group-hover:bg-[#FFC400]/[0.05] group-hover:text-[#FFC400]">
                    <Blocks size={17} />
                  </div>

                  <span className="text-[9px] font-semibold tabular-nums tracking-[0.18em] text-neutral-800 transition-colors duration-300 group-hover:text-[#FFC400]/50">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                </div>

                {/* CONTENT */}

                <div className="mt-8">
                  <h3 className="text-base font-semibold tracking-[-0.02em] text-white sm:text-lg">
                    {feature.title}
                  </h3>

                  <p className="mt-3 text-sm leading-6 text-neutral-500">
                    {feature.description}
                  </p>
                </div>

                {/* BOTTOM */}

                <div className="mt-8 flex items-center justify-between border-t border-white/[0.05] pt-4">
                  <div className="flex items-center gap-2">
                    <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[#FFC400]/[0.07] text-[#FFC400]">
                      <Check size={11} />
                    </span>

                    <span className="text-[9px] font-medium uppercase tracking-[0.15em] text-neutral-700">
                      Included
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
            FOOTER META
        ================================================= */}

        <div className="mt-5 flex flex-col gap-3 rounded-2xl border border-white/[0.05] bg-[#080808] px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-[10px] uppercase tracking-[0.16em] text-neutral-700">
            Purpose-built features
          </p>

          <p className="text-[10px] font-medium tabular-nums text-neutral-800">
            {features.length}{" "}
            {features.length === 1 ? "feature" : "features"}
          </p>
        </div>
      </div>
    </section>
  );
}