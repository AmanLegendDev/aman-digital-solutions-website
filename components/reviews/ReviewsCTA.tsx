import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

export default function ReviewsCTA() {
  return (
    <section
      aria-labelledby="reviews-cta-heading"
      className="relative overflow-hidden border-t border-white/[0.06] bg-[#050505] py-24 sm:py-28 lg:py-32"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-1/2 h-[420px] w-[700px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#FFD400]/[0.025] blur-[140px]"
      />

      <div className="relative mx-auto w-full max-w-4xl px-5 text-center sm:px-8">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#FFD400]">
          Your project
        </p>

        <h2
          id="reviews-cta-heading"
          className="mt-4 text-3xl font-semibold tracking-[-0.04em] text-white sm:text-5xl lg:text-6xl"
        >
          Thinking about your own project?
        </h2>

        <p className="mx-auto mt-6 max-w-2xl text-sm leading-7 text-white/45 sm:text-base">
          Tell us what you&apos;re trying to build, improve or grow. We&apos;ll
          help you figure out the right digital approach for your business.
        </p>

        <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Link
            href="/start-a-project"
            className="group inline-flex items-center justify-center gap-2 rounded-full bg-[#FFD400] px-6 py-3.5 text-sm font-semibold text-black transition-transform duration-300 hover:-translate-y-0.5"
          >
            Start a project

            <ArrowUpRight
              size={17}
              className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            />
          </Link>

          <Link
            href="/contact"
            className="inline-flex items-center justify-center rounded-full border border-white/10 px-6 py-3.5 text-sm font-semibold text-white/75 transition-colors hover:border-white/20 hover:text-white"
          >
            Talk to us
          </Link>
        </div>

        <div className="mt-10 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-xs text-white/25">
          <span>Strategy</span>
          <span>·</span>
          <span>Design</span>
          <span>·</span>
          <span>Development</span>
          <span>·</span>
          <span>Growth</span>
        </div>
      </div>
    </section>
  );
}