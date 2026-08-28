import Link from "next/link";
import {
  ArrowRight,
  MessageCircle,
  Sparkles,
} from "lucide-react";

/* =========================================================
   COMPONENT
========================================================= */

export default function GalleryFinalCtaSection() {
  return (
    <section className="relative overflow-hidden border-t border-white/[0.06] bg-[#050505] py-20 sm:py-24 lg:py-28">
      {/* =====================================================
          BACKGROUND
      ===================================================== */}

      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-1/2 h-[480px] w-[760px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#FFC400]/[0.025] blur-[140px]"
      />

      <div className="relative mx-auto max-w-4xl px-5 text-center sm:px-8">
        {/* =================================================
            EYEBROW
        ================================================= */}

        <div className="inline-flex items-center gap-2 rounded-full border border-[#FFC400]/15 bg-[#FFC400]/[0.04] px-3.5 py-2">
          <Sparkles
            size={11}
            className="text-[#FFC400]"
          />

          <span className="text-[8px] font-semibold uppercase tracking-[0.18em] text-[#FFC400]">
            Have something in mind?
          </span>
        </div>

        {/* =================================================
            TITLE
        ================================================= */}

        <h2 className="mx-auto mt-7 max-w-3xl text-4xl font-semibold leading-[0.98] tracking-[-0.05em] text-white sm:text-5xl lg:text-[4.25rem]">
          Your idea could be
          <br />
          <span className="text-neutral-500">
            the next thing we build.
          </span>
        </h2>

        {/* =================================================
            DESCRIPTION
        ================================================= */}

        <p className="mx-auto mt-7 max-w-2xl text-sm leading-7 text-neutral-600 sm:text-base sm:leading-8">
          From a first concept to a polished digital
          experience, let&apos;s turn your idea into
          something people can actually use.
        </p>

        {/* =================================================
            ACTIONS
        ================================================= */}

        <div className="mt-9 flex flex-col justify-center gap-3 sm:flex-row">
          <Link
            href="/start-a-project"
            className="group inline-flex items-center justify-center gap-3 rounded-xl bg-[#FFC400] px-6 py-3.5 text-xs font-semibold text-black transition-all duration-300 hover:bg-[#FFD23D] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FFC400]"
          >
            Start a conversation

            <ArrowRight
              size={15}
              className="transition-transform duration-300 group-hover:translate-x-1"
            />
          </Link>

          <Link
            href="/projects"
            className="inline-flex items-center justify-center gap-3 rounded-xl border border-white/[0.08] bg-white/[0.02] px-6 py-3.5 text-xs font-semibold text-white/70 transition-all duration-300 hover:border-white/[0.15] hover:text-white"
          >
            See our projects

            <MessageCircle size={14} />
          </Link>
        </div>

        {/* =================================================
            BOTTOM DETAIL
        ================================================= */}

        <div className="mx-auto mt-12 flex max-w-xl items-center justify-center gap-3">
          <span
            aria-hidden="true"
            className="h-px flex-1 bg-gradient-to-r from-transparent to-white/[0.07]"
          />

          <span className="shrink-0 text-[8px] font-medium uppercase tracking-[0.16em] text-neutral-800">
            Ideas into digital experiences
          </span>

          <span
            aria-hidden="true"
            className="h-px flex-1 bg-gradient-to-l from-transparent to-white/[0.07]"
          />
        </div>
      </div>
    </section>
  );
}