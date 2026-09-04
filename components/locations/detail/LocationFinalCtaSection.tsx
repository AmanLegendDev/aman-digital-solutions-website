import Link from "next/link";

import {
  ArrowRight,
  MessageCircle,
  Sparkles,
} from "lucide-react";

type LocationFinalCtaSectionProps = {
  name: string;
  city: string;
};

export default function LocationFinalCtaSection({
  name,
  city,
}: LocationFinalCtaSectionProps) {
  return (
    <section
      aria-labelledby="location-final-cta-heading"
      className="relative overflow-hidden border-t border-white/[0.06] bg-[#050505] py-20 sm:py-24 lg:py-28"
    >
      {/* =====================================================
          BACKGROUND
      ===================================================== */}

      <div
        aria-hidden="true"
        className="absolute left-1/2 top-1/2 h-[420px] w-[420px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#FFC400]/[0.035] blur-[120px]"
      />

      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#FFC400]/20 to-transparent"
      />

      <div className="relative mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
        <div className="relative overflow-hidden rounded-[2rem] border border-white/[0.08] bg-[#090909] px-6 py-12 sm:px-10 sm:py-16 lg:px-16 lg:py-20">
          {/* =================================================
              DECORATIVE GRID
          ================================================= */}

          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 opacity-40"
            style={{
              backgroundImage:
                "linear-gradient(rgba(255,255,255,0.025) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.025) 1px, transparent 1px)",
              backgroundSize: "48px 48px",
            }}
          />

          {/* =================================================
              CONTENT
          ================================================= */}

          <div className="relative mx-auto max-w-4xl text-center">
            {/* EYEBROW */}

            <div className="inline-flex items-center gap-2 rounded-full border border-[#FFC400]/15 bg-[#FFC400]/[0.04] px-3 py-1.5">
              <Sparkles
                aria-hidden="true"
                size={12}
                className="text-[#FFC400]"
              />

              <span className="text-[9px] font-semibold uppercase tracking-[0.18em] text-[#FFC400]">
                Let&apos;s build something better
              </span>
            </div>

            {/* HEADING */}

            <h2
              id="location-final-cta-heading"
              className="mx-auto mt-7 max-w-3xl text-3xl font-semibold leading-[1.04] tracking-[-0.045em] text-white sm:text-5xl lg:text-[4.2rem]"
            >
              Your business deserves
              <br />
              <span className="text-neutral-500">
                a better digital presence.
              </span>
            </h2>

            {/* DESCRIPTION */}

            <p className="mx-auto mt-6 max-w-2xl text-sm leading-7 text-neutral-500 sm:text-base">
              From {city} to businesses beyond it, we
              create websites, digital systems and
              growth solutions designed around real
              business goals.
            </p>

            {/* =================================================
                ACTIONS
            ================================================= */}

            <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Link
                href="/start-a-project"
                aria-label={`Start a project with Aman Digital Solutions in ${name}`}
                className="group inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-[#FFC400] px-6 text-xs font-bold uppercase tracking-[0.12em] text-black transition-all duration-300 hover:bg-[#FFD43B] hover:shadow-[0_0_35px_rgba(255,196,0,0.12)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FFC400] focus-visible:ring-offset-2 focus-visible:ring-offset-[#090909]"
              >
                Start a project

                <ArrowRight
                  aria-hidden="true"
                  size={15}
                  className="transition-transform duration-300 group-hover:translate-x-1"
                />
              </Link>

              <Link
                href="/contact"
                aria-label="Contact Aman Digital Solutions"
                className="group inline-flex min-h-12 items-center justify-center gap-2 rounded-xl border border-white/[0.09] bg-white/[0.02] px-6 text-xs font-semibold uppercase tracking-[0.12em] text-white/60 transition-all duration-300 hover:border-white/[0.18] hover:bg-white/[0.04] hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FFC400] focus-visible:ring-offset-2 focus-visible:ring-offset-[#090909]"
              >
                <MessageCircle
                  aria-hidden="true"
                  size={14}
                  className="text-neutral-600 transition-colors group-hover:text-[#FFC400]"
                />

                Talk to us
              </Link>
            </div>

            {/* =================================================
                LOCATION MICRO NOTE
            ================================================= */}

            <div className="mt-8 flex items-center justify-center gap-2">
              <span
                aria-hidden="true"
                className="h-1.5 w-1.5 rounded-full bg-[#FFC400]"
              />

              <span className="text-[9px] font-medium uppercase tracking-[0.16em] text-neutral-700">
                Serving {name}
              </span>
            </div>
          </div>

          {/* =================================================
              BOTTOM ACCENT
          ================================================= */}

          <div
            aria-hidden="true"
            className="absolute bottom-0 left-1/2 h-px w-1/2 -translate-x-1/2 bg-gradient-to-r from-transparent via-[#FFC400]/30 to-transparent"
          />
        </div>
      </div>
    </section>
  );
}