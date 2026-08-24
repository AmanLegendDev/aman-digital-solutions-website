import {
  ArrowDown,
  Check,
  Clock3,
  Route,
} from "lucide-react";

type ServiceProcessStep = {
  order: number;
  title: string;
  description: string;
};

type ServiceProcessSectionProps = {
  process: ServiceProcessStep[];
};

export default function ServiceProcessSection({
  process,
}: ServiceProcessSectionProps) {
  if (!process.length) {
    return null;
  }

  const steps = [...process].sort(
    (a, b) => a.order - b.order
  );

  return (
    <section
      id="service-process"
      aria-labelledby="service-process-heading"
      className="relative border-t border-white/[0.06] bg-[#050505] py-20 sm:py-24 lg:py-28"
    >
      <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
        {/* HEADER */}
        <div className="grid gap-6 lg:grid-cols-[0.8fr_1.2fr] lg:items-end">
          <div>
            <div className="flex items-center gap-3">
              <span
                aria-hidden="true"
                className="flex h-8 w-8 items-center justify-center rounded-xl border border-[#FFC400]/20 bg-[#FFC400]/[0.05] text-[#FFC400]"
              >
                <Route size={14} />
              </span>

              <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#FFC400]">
                How it works
              </span>
            </div>

            <h2
              id="service-process-heading"
              className="mt-5 text-3xl font-semibold leading-[1.08] tracking-[-0.04em] text-white sm:text-4xl lg:text-[3.2rem]"
            >
              A clear path from
              <br />
              <span className="text-neutral-500">
                idea to launch.
              </span>
            </h2>
          </div>

          <p className="max-w-xl text-sm leading-7 text-neutral-500 lg:justify-self-end">
            No unnecessary complexity. Every project follows
            a structured process designed to keep the work
            focused, transparent and moving forward.
          </p>
        </div>

        {/* PROCESS TIMELINE */}
        <div className="relative mt-14">
          {/* DESKTOP CONNECTING LINE */}
          <div
            aria-hidden="true"
            className="absolute bottom-0 left-[27px] top-0 hidden w-px bg-gradient-to-b from-[#FFC400]/40 via-white/[0.08] to-transparent sm:block"
          />

          <div className="space-y-3 sm:space-y-4">
            {steps.map((step, index) => {
              const isLast =
                index === steps.length - 1;

              return (
                <article
                  key={`${step.order}-${step.title}`}
                  className="group relative"
                >
                  <div className="relative grid gap-5 rounded-3xl border border-white/[0.07] bg-[#090909] p-5 transition-all duration-300 hover:border-[#FFC400]/20 hover:bg-[#0A0A0A] sm:grid-cols-[56px_1fr_auto] sm:items-center sm:gap-7 sm:p-7">
                    {/* STEP MARKER */}
                    <div className="relative z-10 flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border border-white/[0.08] bg-[#0C0C0C] transition-all duration-300 group-hover:border-[#FFC400]/25 group-hover:bg-[#FFC400]/[0.05]">
                      <span className="text-xs font-semibold tabular-nums text-neutral-500 transition-colors duration-300 group-hover:text-[#FFC400]">
                        {String(step.order).padStart(
                          2,
                          "0"
                        )}
                      </span>
                    </div>

                    {/* CONTENT */}
                    <div className="min-w-0">
                      <div className="flex flex-wrap items-center gap-3">
                        <h3 className="text-base font-semibold tracking-[-0.015em] text-white sm:text-lg">
                          {step.title}
                        </h3>

                        {index === 0 && (
                          <span className="rounded-full border border-[#FFC400]/15 bg-[#FFC400]/[0.04] px-2.5 py-1 text-[8px] font-semibold uppercase tracking-[0.14em] text-[#FFC400]">
                            Start here
                          </span>
                        )}
                      </div>

                      <p className="mt-2 max-w-2xl text-sm leading-6 text-neutral-500">
                        {step.description}
                      </p>
                    </div>

                    {/* RIGHT META */}
                    <div className="flex items-center justify-between gap-4 sm:block sm:text-right">
                      <div className="flex items-center gap-2 text-neutral-700 sm:justify-end">
                        <Clock3 size={13} />

                        <span className="text-[9px] font-medium uppercase tracking-[0.15em]">
                          Step {step.order}
                        </span>
                      </div>

                      <div className="mt-2 hidden text-[9px] uppercase tracking-[0.15em] text-neutral-700 sm:block">
                        {isLast
                          ? "Ready to launch"
                          : "Next step"}
                      </div>
                    </div>

                    {/* HOVER ACCENT */}
                    <span
                      aria-hidden="true"
                      className="absolute bottom-0 left-8 h-px w-0 bg-gradient-to-r from-[#FFC400] to-transparent transition-all duration-500 group-hover:w-1/2"
                    />
                  </div>

                  {/* MOBILE / BETWEEN-STEP INDICATOR */}
                  {!isLast && (
                    <div
                      aria-hidden="true"
                      className="flex h-7 items-center justify-center sm:hidden"
                    >
                      <ArrowDown
                        size={13}
                        className="text-neutral-800"
                      />
                    </div>
                  )}
                </article>
              );
            })}
          </div>
        </div>

        {/* PROCESS FOOTER */}
        <div className="mt-5 flex flex-col gap-4 rounded-3xl border border-white/[0.06] bg-[#080808] p-5 sm:flex-row sm:items-center sm:justify-between sm:p-6">
          <div className="flex items-start gap-3">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-[#FFC400]/15 bg-[#FFC400]/[0.04] text-[#FFC400]">
              <Check size={15} />
            </div>

            <div>
              <p className="text-sm font-medium text-white">
                Clear process. No guesswork.
              </p>

              <p className="mt-1 text-xs leading-5 text-neutral-600">
                You always know what stage we're at and what
                happens next.
              </p>
            </div>
          </div>

          <span className="text-[9px] font-semibold uppercase tracking-[0.18em] text-neutral-700">
            {steps.length}{" "}
            {steps.length === 1
              ? "step"
              : "steps"}{" "}
            · structured delivery
          </span>
        </div>
      </div>
    </section>
  );
}