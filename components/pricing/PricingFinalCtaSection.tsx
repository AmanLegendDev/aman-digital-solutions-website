import Link from "next/link";
import {
  ArrowRight,
  Check,
  MessageCircle,
} from "lucide-react";

export default function PricingFinalCtaSection() {
  return (
    <section className="relative overflow-hidden bg-[#050505] py-20 sm:py-24 lg:py-28">
      {/* =====================================================
          BACKGROUND
      ===================================================== */}

      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-1/2 h-[500px] w-[800px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#FFC400]/[0.025] blur-[140px]"
      />

      <div className="relative mx-auto max-w-5xl px-5 text-center sm:px-8">
        {/* EYEBROW */}

        <div className="inline-flex items-center gap-2 rounded-full border border-[#FFC400]/15 bg-[#FFC400]/[0.04] px-3.5 py-2">
          <span className="h-1.5 w-1.5 rounded-full bg-[#FFC400]" />

          <span className="text-[8px] font-semibold uppercase tracking-[0.18em] text-[#FFC400]">
            Ready when you are
          </span>
        </div>

        {/* HEADING */}

        <h2 className="mx-auto mt-7 max-w-4xl text-4xl font-semibold leading-[0.98] tracking-[-0.05em] text-white sm:text-5xl lg:text-[4.5rem]">
          Let&apos;s build something
          <br />
          <span className="text-neutral-500">
            worth investing in.
          </span>
        </h2>

        {/* DESCRIPTION */}

        <p className="mx-auto mt-7 max-w-2xl text-sm leading-7 text-neutral-600 sm:text-base sm:leading-8">
          Not sure which plan fits your business? Tell us
          what you are trying to achieve and we&apos;ll help
          you figure out the right direction.
        </p>

        {/* ACTIONS */}

        <div className="mt-9 flex flex-col items-stretch justify-center gap-3 sm:flex-row sm:items-center">
          <Link
            href="/contact"
            className="group inline-flex items-center justify-center gap-3 rounded-xl bg-[#FFC400] px-6 py-3.5 text-xs font-semibold text-black transition-all duration-300 hover:bg-[#FFD23D] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FFC400]"
          >
            Start a conversation

            <ArrowRight
              size={15}
              className="transition-transform duration-300 group-hover:translate-x-1"
            />
          </Link>

          <Link
            href="/services"
            className="inline-flex items-center justify-center gap-3 rounded-xl border border-white/[0.08] bg-white/[0.02] px-6 py-3.5 text-xs font-semibold text-white/70 transition-all duration-300 hover:border-white/[0.15] hover:text-white"
          >
            Explore services

            <MessageCircle size={14} />
          </Link>
        </div>

        {/* TRUST POINTS */}

        <div className="mt-10 flex flex-wrap items-center justify-center gap-x-6 gap-y-3">
          <div className="flex items-center gap-2">
            <Check
              size={12}
              className="text-[#FFC400]"
            />

            <span className="text-[9px] font-medium uppercase tracking-[0.14em] text-neutral-700">
              No pressure
            </span>
          </div>

          <div className="flex items-center gap-2">
            <Check
              size={12}
              className="text-[#FFC400]"
            />

            <span className="text-[9px] font-medium uppercase tracking-[0.14em] text-neutral-700">
              Clear scope
            </span>
          </div>

          <div className="flex items-center gap-2">
            <Check
              size={12}
              className="text-[#FFC400]"
            />

            <span className="text-[9px] font-medium uppercase tracking-[0.14em] text-neutral-700">
              Honest guidance
            </span>
          </div>
        </div>

        {/* BOTTOM LINE */}

        <div className="mx-auto mt-16 h-px max-w-xl bg-gradient-to-r from-transparent via-white/[0.08] to-transparent" />
      </div>
    </section>
  );
}