import { ArrowDown, Sparkles } from "lucide-react";

export default function OffersHero() {
  return (
    <section
      aria-labelledby="offers-heading"
      className="relative overflow-hidden border-b border-[#1A1A1A] bg-[#050505] px-5 pb-20 pt-28 sm:px-8 sm:pb-24 sm:pt-36 lg:px-10 lg:pb-28"
    >
      {/* Ambient yellow glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 overflow-hidden"
      >
        <div className="absolute left-[8%] top-16 h-72 w-72 rounded-full bg-[#FFD400]/[0.045] blur-[120px]" />

        <div className="absolute right-[5%] top-0 h-96 w-96 rounded-full bg-[#FFD400]/[0.025] blur-[140px]" />

        <div className="absolute bottom-[-8rem] left-1/2 h-72 w-[34rem] -translate-x-1/2 rounded-full bg-[#FFD400]/[0.02] blur-[120px]" />
      </div>

      <div className="relative mx-auto max-w-7xl">
        <div className="max-w-4xl">
          {/* Eyebrow */}
          <div className="inline-flex items-center gap-2 rounded-full border border-[#FFD400]/20 bg-[#FFD400]/[0.045] px-3.5 py-2 text-xs font-semibold tracking-[0.18em] text-[#FFD400] uppercase">
            <Sparkles
              aria-hidden="true"
              className="h-3.5 w-3.5"
            />

            Special offers
          </div>

          {/* H1 */}
          <h1
            id="offers-heading"
            className="mt-6 max-w-4xl text-balance text-4xl font-semibold leading-[1.04] tracking-[-0.05em] text-[#F8FAFC] sm:text-5xl lg:text-7xl"
          >
            Offers built for businesses ready to make their next move.
          </h1>

          {/* Description */}
          <p className="mt-7 max-w-2xl text-base leading-8 text-[#A1A1AA] sm:text-lg">
            Limited-time opportunities for businesses ready to build, improve
            or grow their digital presence with Aman Digital Solutions.
          </p>

          {/* Supporting signals */}
          <div className="mt-9 flex flex-wrap items-center gap-x-6 gap-y-3 text-xs font-medium tracking-wide text-[#71717A]">
            <span className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-[#FFD400]" />
              Website Development
            </span>

            <span className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-[#FFD400]" />
              Digital Solutions
            </span>

            <span className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-[#FFD400]" />
              Limited-Time Pricing
            </span>
          </div>

          {/* Scroll cue */}
          <div className="mt-12 hidden items-center gap-3 text-xs font-medium tracking-[0.16em] text-[#52525B] uppercase sm:flex">
            <span className="flex h-9 w-9 items-center justify-center rounded-full border border-[#27272A]">
              <ArrowDown
                aria-hidden="true"
                className="h-3.5 w-3.5 text-[#FFD400]"
              />
            </span>

            Explore offers
          </div>
        </div>
      </div>
    </section>
  );
}