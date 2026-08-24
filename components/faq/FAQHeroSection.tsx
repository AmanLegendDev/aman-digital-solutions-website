import Link from "next/link";
import {
  ArrowDown,
  ArrowRight,
  ChevronRight,
  CircleHelp,
} from "lucide-react";

/* =========================================================
   PROPS
========================================================= */

type FAQHeroSectionProps = {
  totalCount: number;
};

/* =========================================================
   COMPONENT
========================================================= */

export default function FAQHeroSection({
  totalCount,
}: FAQHeroSectionProps) {
  return (
    <section className="relative overflow-hidden border-b border-white/[0.06] bg-[#050505]">
      {/* =====================================================
          BACKGROUND
      ===================================================== */}

      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-[-220px] h-[520px] w-[850px] -translate-x-1/2 rounded-full bg-[#FFC400]/[0.025] blur-[140px]"
      />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute right-[-100px] top-1/2 h-[300px] w-[300px] -translate-y-1/2 rounded-full bg-white/[0.012] blur-[100px]"
      />

      <div className="relative mx-auto max-w-7xl px-5 pb-16 pt-28 sm:px-8 sm:pb-20 sm:pt-32 lg:px-10 lg:pb-24 lg:pt-36">
        {/* =================================================
            BREADCRUMB
        ================================================= */}

        <nav
          aria-label="Breadcrumb"
          className="mb-12"
        >
          <ol className="flex items-center gap-2 text-[9px] font-medium uppercase tracking-[0.15em]">
            <li>
              <Link
                href="/"
                className="text-neutral-700 transition-colors hover:text-neutral-400"
              >
                Home
              </Link>
            </li>

            <li
              aria-hidden="true"
              className="text-neutral-800"
            >
              <ChevronRight size={12} />
            </li>

            <li
              aria-current="page"
              className="text-[#FFC400]"
            >
              FAQ
            </li>
          </ol>
        </nav>

        {/* =================================================
            HERO CONTENT
        ================================================= */}

        <div className="mx-auto max-w-4xl text-center">
          {/* ICON */}

          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl border border-[#FFC400]/15 bg-[#FFC400]/[0.04] text-[#FFC400]">
            <CircleHelp
              size={20}
              strokeWidth={1.5}
            />
          </div>

          {/* EYEBROW */}

          <div className="mt-6 flex items-center justify-center gap-3">
            <span className="h-px w-7 bg-[#FFC400]/30" />

            <span className="text-[9px] font-semibold uppercase tracking-[0.2em] text-[#FFC400]">
              Frequently asked questions
            </span>

            <span className="h-px w-7 bg-[#FFC400]/30" />
          </div>

          {/* TITLE */}

          <h1 className="mt-6 text-4xl font-semibold leading-[0.98] tracking-[-0.055em] text-white sm:text-5xl lg:text-[5rem]">
            Questions?
            <br />
            <span className="text-neutral-500">
              Start here.
            </span>
          </h1>

          {/* DESCRIPTION */}

          <p className="mx-auto mt-7 max-w-2xl text-sm leading-7 text-neutral-600 sm:text-base sm:leading-8">
            Find clear answers about our services,
            projects, pricing, process and working
            together. If you still have questions,
            we&apos;re only a conversation away.
          </p>

          {/* =================================================
              QUICK INFO
          ================================================= */}

          <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/[0.07] bg-white/[0.015] px-3.5 py-2">
              <span className="h-1.5 w-1.5 rounded-full bg-[#FFC400]" />

              <span className="text-[8px] font-medium uppercase tracking-[0.13em] text-neutral-600">
                {totalCount}{" "}
                {totalCount === 1
                  ? "answer"
                  : "answers"}
              </span>
            </div>

            <Link
              href="/contact"
              className="group inline-flex items-center gap-2 rounded-full border border-white/[0.07] bg-white/[0.015] px-3.5 py-2 text-[8px] font-medium uppercase tracking-[0.13em] text-neutral-600 transition-all duration-300 hover:border-[#FFC400]/20 hover:text-white"
            >
              Ask us directly

              <ArrowRight
                size={11}
                className="transition-transform duration-300 group-hover:translate-x-0.5"
              />
            </Link>
          </div>
        </div>

        {/* =================================================
            SCROLL INDICATOR
        ================================================= */}

        <div className="mt-16 flex justify-center sm:mt-20">
          <a
            href="#faq-list"
            aria-label="Scroll to frequently asked questions"
            className="group flex flex-col items-center gap-3 text-neutral-800 transition-colors hover:text-neutral-500"
          >
            <span className="text-[8px] font-medium uppercase tracking-[0.18em]">
              Browse answers
            </span>

            <span className="flex h-9 w-9 items-center justify-center rounded-full border border-white/[0.06] transition-all duration-300 group-hover:border-[#FFC400]/20">
              <ArrowDown
                size={13}
                className="transition-transform duration-300 group-hover:translate-y-0.5"
              />
            </span>
          </a>
        </div>
      </div>
    </section>
  );
}