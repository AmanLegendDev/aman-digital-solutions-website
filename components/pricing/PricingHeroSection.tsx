import {
  ArrowDown,
  Check,
  Sparkles,
} from "lucide-react";

export default function PricingHeroSection() {
  return (
    <section className="relative overflow-hidden border-b border-white/[0.06] bg-[#050505]">
      {/* =====================================================
          BACKGROUND
      ===================================================== */}

      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-[-180px] h-[620px] w-[900px] -translate-x-1/2 rounded-full bg-[#FFC400]/[0.035] blur-[140px]"
      />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-[-220px] left-[10%] h-[420px] w-[420px] rounded-full bg-white/[0.012] blur-[120px]"
      />

      {/* =====================================================
          CONTENT
      ===================================================== */}

      <div className="relative mx-auto max-w-7xl px-5 pb-20 pt-28 sm:px-8 sm:pb-24 sm:pt-32 lg:px-10 lg:pb-28 lg:pt-40">
        {/* EYEBROW */}

        <div className="flex items-center gap-3">
          <span
            aria-hidden="true"
            className="flex h-9 w-9 items-center justify-center rounded-xl border border-[#FFC400]/20 bg-[#FFC400]/[0.05] text-[#FFC400]"
          >
            <Sparkles size={15} />
          </span>

          <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#FFC400]">
            Simple, transparent pricing
          </span>
        </div>

        {/* HEADING */}

        <div className="mt-7 max-w-4xl">
          <h1 className="text-5xl font-semibold leading-[0.94] tracking-[-0.055em] text-white sm:text-6xl lg:text-[5.8rem]">
            Choose the right
            <br />
            <span className="text-neutral-500">
              way to grow.
            </span>
          </h1>

          <p className="mt-7 max-w-2xl text-base leading-7 text-neutral-500 sm:text-lg sm:leading-8">
            Clear pricing for high-quality digital solutions.
            Pick the plan that fits your business today and
            scale when you are ready.
          </p>
        </div>

        {/* TRUST STRIP */}

        <div className="mt-10 flex flex-wrap gap-x-7 gap-y-3">
          <div className="flex items-center gap-2">
            <Check
              size={13}
              className="text-[#FFC400]"
            />

            <span className="text-[9px] font-medium uppercase tracking-[0.15em] text-neutral-600">
              No hidden surprises
            </span>
          </div>

          <div className="flex items-center gap-2">
            <Check
              size={13}
              className="text-[#FFC400]"
            />

            <span className="text-[9px] font-medium uppercase tracking-[0.15em] text-neutral-600">
              Business-focused solutions
            </span>
          </div>

          <div className="flex items-center gap-2">
            <Check
              size={13}
              className="text-[#FFC400]"
            />

            <span className="text-[9px] font-medium uppercase tracking-[0.15em] text-neutral-600">
              Built to scale
            </span>
          </div>
        </div>

        {/* BOTTOM META */}

        <div className="mt-16 flex items-center justify-between border-t border-white/[0.06] pt-6">
          <div>
            <p className="text-[8px] font-semibold uppercase tracking-[0.18em] text-neutral-700">
              Investment
            </p>

            <p className="mt-2 text-xs text-neutral-500">
              Choose a plan based on your current needs.
            </p>
          </div>

          <div
            aria-hidden="true"
            className="hidden h-10 w-10 items-center justify-center rounded-full border border-white/[0.07] text-neutral-700 sm:flex"
          >
            <ArrowDown size={14} />
          </div>
        </div>
      </div>
    </section>
  );
}