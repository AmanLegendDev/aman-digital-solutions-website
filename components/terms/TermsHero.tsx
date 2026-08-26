import { ArrowDown, FileText } from "lucide-react";

export default function TermsHero() {
  return (
    <section className="relative overflow-hidden border-b border-[#1A1A1A] bg-[#050505]">
      {/* Ambient glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-[-180px] h-[420px] w-[420px] -translate-x-1/2 rounded-full bg-[#FFC400]/[0.035] blur-[150px]"
      />

      <div className="relative mx-auto w-full max-w-5xl px-5 py-24 text-center sm:px-8 sm:py-28 lg:py-36">
        {/* EYEBROW */}
        <div className="inline-flex items-center gap-2 rounded-full border border-[#292929] bg-[#0D0D0D] px-3.5 py-2">
          <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[#FFC400]/10 text-[#FFC400]">
            <FileText size={12} />
          </span>

          <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-[#858585] sm:text-[11px]">
            Legal information
          </span>
        </div>

        {/* HEADING */}
        <h1 className="mx-auto mt-7 max-w-4xl text-[clamp(3rem,8vw,6.8rem)] font-semibold leading-[0.9] tracking-[-0.065em] text-[#F5F5F5]">
          Terms &
          <span className="block text-[#FFC400]">
            Conditions.
          </span>
        </h1>

        {/* DESCRIPTION */}
        <p className="mx-auto mt-7 max-w-2xl text-sm leading-7 text-[#777] sm:text-base">
          Clear terms for working together — covering projects,
          payments, revisions, delivery, ownership and our
          responsibilities to each other.
        </p>

        {/* META */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-x-3 gap-y-2 text-[9px] font-medium uppercase tracking-[0.18em] text-[#444]">
          <span>Last updated</span>

          <span className="text-[#666]">
            August 2026
          </span>

          <span
            aria-hidden="true"
            className="h-1 w-1 rounded-full bg-[#333]"
          />

          <ArrowDown size={12} />
        </div>
      </div>
    </section>
  );
}