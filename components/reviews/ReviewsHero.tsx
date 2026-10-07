import Link from "next/link";
import { ArrowDown, ArrowUpRight, Star } from "lucide-react";

export default function ReviewsHero() {
  return (
    <section
      aria-labelledby="reviews-page-heading"
      className="relative overflow-hidden bg-[#050505]"
    >
      {/* Ambient glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-[-280px] h-[560px] w-[820px] -translate-x-1/2 rounded-full bg-[#FFD400]/[0.035] blur-[150px]"
      />

      <div className="relative mx-auto w-full max-w-7xl px-5 pb-20 pt-28 sm:px-8 sm:pb-24 sm:pt-32 lg:px-10 lg:pb-28 lg:pt-40">
        {/* Breadcrumb */}
        <div className="mb-10 flex items-center gap-2 text-xs text-white/35">
          <Link href="/" className="transition-colors hover:text-white">
            Home
          </Link>

          <span>/</span>

          <span className="text-white/70">Reviews</span>
        </div>

        <div className="max-w-4xl">
          <div className="mb-6 flex items-center gap-3">
            <span className="h-px w-8 bg-[#FFD400]" />

            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#FFD400]">
              Client feedback
            </p>
          </div>

          <h1
            id="reviews-page-heading"
            className="max-w-4xl text-4xl font-semibold leading-[1.04] tracking-[-0.045em] text-white sm:text-5xl lg:text-7xl"
          >
            What businesses say about working with us.
          </h1>

          <p className="mt-7 max-w-2xl text-base leading-8 text-white/55 sm:text-lg">
            Genuine feedback from businesses we&apos;ve worked with across
            website development, digital solutions and ongoing website
            support.
          </p>

          <div className="mt-9 flex flex-wrap gap-3">
            <Link
              href="/start-a-project"
              className="group inline-flex items-center gap-2 rounded-full bg-[#FFD400] px-5 py-3 text-sm font-semibold text-black transition-transform duration-300 hover:-translate-y-0.5"
            >
              Start a project

              <ArrowUpRight
                size={16}
                className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              />
            </Link>

            <Link
              href="/projects"
              className="inline-flex items-center gap-2 rounded-full border border-white/10 px-5 py-3 text-sm font-semibold text-white/75 transition-colors hover:border-white/20 hover:text-white"
            >
              Explore our work
            </Link>
          </div>
        </div>

        {/* Trust strip */}
        <div className="mt-16 grid border-y border-white/[0.07] sm:grid-cols-3">
          <div className="flex items-center gap-3 border-b border-white/[0.07] py-5 sm:border-b-0 sm:border-r sm:px-6 sm:first:pl-0">
            <div className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/[0.025]">
              <Star
                size={15}
                className="fill-[#FFD400] text-[#FFD400]"
              />
            </div>

            <div>
              <p className="text-sm font-medium text-white">
                Google Reviews
              </p>

              <p className="mt-0.5 text-xs text-white/35">
                Genuine client feedback
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 border-b border-white/[0.07] py-5 sm:border-b-0 sm:border-r sm:px-6">
            <div className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/[0.025]">
              <span className="text-sm text-[#FFD400]">✓</span>
            </div>

            <div>
              <p className="text-sm font-medium text-white">
                Real experiences
              </p>

              <p className="mt-0.5 text-xs text-white/35">
                Genuine client feedback
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 py-5 sm:px-6 sm:last:pr-0">
            <div className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/[0.025]">
              <span className="text-sm text-[#FFD400]">↗</span>
            </div>

            <div>
              <p className="text-sm font-medium text-white">
                Built for business
              </p>

              <p className="mt-0.5 text-xs text-white/35">
                Websites & digital solutions
              </p>
            </div>
          </div>
        </div>

        <div className="mt-8 flex items-center gap-2 text-xs text-white/25">
          <ArrowDown size={14} />
          <span>Read the experiences</span>
        </div>
      </div>
    </section>
  );
}