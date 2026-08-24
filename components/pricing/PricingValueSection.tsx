import {
  ArrowUpRight,
  Gauge,
  ShieldCheck,
  Sparkles,
  Target,
} from "lucide-react";

const VALUE_POINTS = [
  {
    icon: Target,
    number: "01",
    title: "Built around your goals",
    description:
      "We focus on what your business actually needs instead of adding unnecessary features or complexity.",
  },
  {
    icon: Sparkles,
    number: "02",
    title: "Premium by default",
    description:
      "Every solution is designed with a strong focus on quality, usability, performance and a polished digital presence.",
  },
  {
    icon: Gauge,
    number: "03",
    title: "Ready to grow",
    description:
      "Your digital foundation should not hold you back. We build with future improvements and scale in mind.",
  },
  {
    icon: ShieldCheck,
    number: "04",
    title: "Clear from day one",
    description:
      "You know what you are getting, what the investment is and what happens next before work begins.",
  },
];

export default function PricingValueSection() {
  return (
    <section className="relative overflow-hidden border-b border-white/[0.06] bg-[#050505] py-20 sm:py-24 lg:py-28">
      {/* =====================================================
          AMBIENT BACKGROUND
      ===================================================== */}

      <div
        aria-hidden="true"
        className="pointer-events-none absolute right-[-180px] top-1/2 h-[500px] w-[500px] -translate-y-1/2 rounded-full bg-[#FFC400]/[0.018] blur-[120px]"
      />

      <div className="relative mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
        {/* =================================================
            HEADER
        ================================================= */}

        <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
          <div>
            <div className="flex items-center gap-3">
              <span className="flex h-8 w-8 items-center justify-center rounded-xl border border-[#FFC400]/20 bg-[#FFC400]/[0.05] text-[#FFC400]">
                <Sparkles size={14} />
              </span>

              <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#FFC400]">
                More than a price
              </span>
            </div>

            <h2 className="mt-5 text-3xl font-semibold leading-[1.05] tracking-[-0.045em] text-white sm:text-4xl lg:text-[3.2rem]">
              An investment
              <br />
              <span className="text-neutral-500">
                in your next stage.
              </span>
            </h2>
          </div>

          <p className="max-w-xl text-sm leading-7 text-neutral-600 lg:justify-self-end">
            The right digital solution should create value
            long after launch. That means thoughtful
            decisions, reliable execution and a foundation
            you can continue building on.
          </p>
        </div>

        {/* =================================================
            VALUE GRID
        ================================================= */}

        <div className="mt-14 grid gap-px overflow-hidden rounded-[2rem] border border-white/[0.07] bg-white/[0.07] sm:grid-cols-2">
          {VALUE_POINTS.map((item) => {
            const Icon = item.icon;

            return (
              <article
                key={item.number}
                className="group relative bg-[#080808] p-7 transition-colors duration-300 hover:bg-[#0A0A0A] sm:p-9"
              >
                {/* TOP ROW */}

                <div className="flex items-center justify-between">
                  <span className="text-[9px] font-semibold tabular-nums tracking-[0.18em] text-neutral-800">
                    {item.number}
                  </span>

                  <span className="flex h-9 w-9 items-center justify-center rounded-xl border border-white/[0.07] bg-white/[0.015] text-neutral-700 transition-all duration-300 group-hover:border-[#FFC400]/20 group-hover:bg-[#FFC400]/[0.04] group-hover:text-[#FFC400]">
                    <Icon size={15} />
                  </span>
                </div>

                {/* TITLE */}

                <h3 className="mt-10 text-lg font-semibold tracking-[-0.02em] text-white sm:text-xl">
                  {item.title}
                </h3>

                {/* DESCRIPTION */}

                <p className="mt-3 max-w-md text-sm leading-6 text-neutral-600">
                  {item.description}
                </p>

                {/* ARROW */}

                <div className="mt-8 flex items-center gap-2 text-[8px] font-semibold uppercase tracking-[0.18em] text-neutral-800 transition-colors duration-300 group-hover:text-[#FFC400]/60">
                  Business first

                  <ArrowUpRight
                    size={11}
                    className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                  />
                </div>

                {/* HOVER ACCENT */}

                <span
                  aria-hidden="true"
                  className="absolute bottom-0 left-7 h-px w-0 bg-gradient-to-r from-[#FFC400] to-transparent transition-all duration-500 group-hover:w-1/2"
                />
              </article>
            );
          })}
        </div>

        {/* =================================================
            BOTTOM STATEMENT
        ================================================= */}

        <div className="mt-8 flex flex-col gap-4 rounded-3xl border border-white/[0.06] bg-[#080808] p-6 sm:flex-row sm:items-center sm:justify-between sm:p-7">
          <div>
            <p className="text-sm font-medium text-white/80">
              Need something outside these plans?
            </p>

            <p className="mt-1 text-xs leading-5 text-neutral-700">
              Custom requirements are welcome. We can shape
              the scope around your business.
            </p>
          </div>

          <span className="text-[9px] font-semibold uppercase tracking-[0.18em] text-neutral-800">
            Flexible by design
          </span>
        </div>
      </div>
    </section>
  );
}