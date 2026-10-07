import Link from "next/link";

import {
  ArrowUpRight,
  MessageCircle,
  Sparkles,
} from "lucide-react";

export default function OffersCTA() {
  return (
    <section
      aria-labelledby="offers-cta-heading"
      className="relative overflow-hidden border-t border-[#1A1A1A] bg-[#050505] px-5 py-20 sm:px-8 sm:py-24 lg:px-10 lg:py-28"
    >
      {/* Ambient yellow light */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 overflow-hidden"
      >
        <div className="absolute left-1/2 top-1/2 h-80 w-[38rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#FFD400]/[0.035] blur-[120px]" />

        <div className="absolute right-[-5rem] top-[-5rem] h-72 w-72 rounded-full bg-[#FFD400]/[0.025] blur-[100px]" />
      </div>

      <div className="relative mx-auto max-w-7xl">
        <div className="relative overflow-hidden rounded-[2rem] border border-[#1A1A1A] bg-[#0A0A0A] px-6 py-12 sm:px-10 sm:py-16 lg:px-16 lg:py-20">
          {/* Yellow top accent */}
          <div
            aria-hidden="true"
            className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#FFD400]/70 to-transparent"
          />

          <div
            aria-hidden="true"
            className="pointer-events-none absolute -right-20 -top-20 h-72 w-72 rounded-full bg-[#FFD400]/[0.035] blur-[100px]"
          />

          <div className="relative grid items-end gap-10 lg:grid-cols-[1fr_auto] lg:gap-16">
            {/* Content */}
            <div className="max-w-2xl">
              <div className="inline-flex items-center gap-2 text-xs font-semibold tracking-[0.18em] text-[#FFD400] uppercase">
                <Sparkles
                  aria-hidden="true"
                  className="h-3.5 w-3.5"
                />

                Beyond the offers
              </div>

              <h2
                id="offers-cta-heading"
                className="mt-5 text-balance text-3xl font-semibold leading-tight tracking-[-0.045em] text-[#F8FAFC] sm:text-4xl lg:text-5xl"
              >
                Have something bigger in mind?
              </h2>

              <p className="mt-6 max-w-xl text-sm leading-7 text-[#71717A] sm:text-base sm:leading-8">
                Every business has different goals. If an offer does not fit
                your requirements, tell us what you are building. We&apos;ll
                help you find the right digital approach.
              </p>

              <div className="mt-7 flex flex-wrap gap-x-5 gap-y-2 text-xs font-medium text-[#52525B]">
                <span>Web Development</span>
                <span>Custom Web Applications</span>
                <span>Digital Solutions</span>
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-col gap-3 sm:flex-row lg:flex-col">
              <Link
                href="/start-a-project"
                className="group inline-flex min-w-[190px] items-center justify-center gap-2 rounded-full bg-[#FFD400] px-6 py-3.5 text-sm font-semibold text-black transition-all duration-300 hover:bg-[#F5C800]"
              >
                Start a project

                <ArrowUpRight
                  aria-hidden="true"
                  className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                />
              </Link>

              <Link
                href="/contact"
                className="group inline-flex min-w-[190px] items-center justify-center gap-2 rounded-full border border-[#27272A] bg-[#111111] px-6 py-3.5 text-sm font-medium text-[#A1A1AA] transition-all duration-300 hover:border-[#3F3F46] hover:bg-[#151515] hover:text-[#F8FAFC]"
              >
                <MessageCircle
                  aria-hidden="true"
                  className="h-4 w-4 transition-colors group-hover:text-[#FFD400]"
                />

                Talk to us
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}