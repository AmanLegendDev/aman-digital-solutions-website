"use client";

import Link from "next/link";
import {
  ArrowRight,
  MapPin,
  MessageCircle,
  Sparkles,
} from "lucide-react";

export default function LocationsBottomCta() {
  return (
    <section
      aria-labelledby="locations-bottom-cta-heading"
      className="relative overflow-hidden bg-[#050505] py-20 sm:py-24 lg:py-28"
    >
      {/* =====================================================
          BACKGROUND GLOW
      ===================================================== */}

      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-1/2 h-[420px] w-[700px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#FFC400]/[0.035] blur-[130px]"
      />

      <div className="relative mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
        <div className="relative overflow-hidden rounded-[2rem] border border-white/[0.08] bg-[#090909]">
          {/* TOP ACCENT */}

          <div
            aria-hidden="true"
            className="absolute left-1/2 top-0 h-px w-1/2 -translate-x-1/2 bg-gradient-to-r from-transparent via-[#FFC400]/60 to-transparent"
          />

          <div className="grid lg:grid-cols-[1.15fr_0.85fr]">
            {/* =================================================
                LEFT
            ================================================= */}

            <div className="p-7 sm:p-10 lg:p-14">
              <div className="flex items-center gap-3">
                <span className="flex h-8 w-8 items-center justify-center rounded-xl border border-[#FFC400]/20 bg-[#FFC400]/[0.05] text-[#FFC400]">
                  <Sparkles size={14} />
                </span>

                <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#FFC400]">
                  Let&apos;s work together
                </span>
              </div>

              <h2
                id="locations-bottom-cta-heading"
                className="mt-6 max-w-2xl text-3xl font-semibold leading-[1.05] tracking-[-0.045em] text-white sm:text-4xl lg:text-[3.4rem]"
              >
                Your location is local.
                <br />
                <span className="text-neutral-500">
                  Your ambition doesn&apos;t have to be.
                </span>
              </h2>

              <p className="mt-6 max-w-xl text-sm leading-7 text-neutral-500 sm:text-base">
                Wherever your business is based, we can help you
                build a stronger digital presence, better customer
                experiences and systems designed to support growth.
              </p>

              {/* ACTIONS */}

              <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                <Link
                  href="/booking"
                  className="group inline-flex items-center justify-center gap-3 rounded-xl bg-[#FFC400] px-5 py-3.5 text-xs font-semibold text-black transition-all duration-300 hover:bg-[#FFD23D] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FFC400] focus-visible:ring-offset-2 focus-visible:ring-offset-[#090909]"
                >
                  Start a project

                  <ArrowRight
                    size={15}
                    className="transition-transform duration-300 group-hover:translate-x-1"
                  />
                </Link>

                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center gap-3 rounded-xl border border-white/[0.09] bg-white/[0.02] px-5 py-3.5 text-xs font-semibold text-white/75 transition-all duration-300 hover:border-white/[0.16] hover:bg-white/[0.04] hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FFC400]"
                >
                  <MessageCircle size={15} />

                  Talk to us
                </Link>
              </div>
            </div>

            {/* =================================================
                RIGHT — LOCATION VISUAL
            ================================================= */}

            <div className="relative min-h-[280px] border-t border-white/[0.06] lg:min-h-full lg:border-l lg:border-t-0">
              {/* GRID */}

              <div
                aria-hidden="true"
                className="absolute inset-0 opacity-40"
                style={{
                  backgroundImage:
                    "linear-gradient(rgba(255,255,255,0.035) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.035) 1px, transparent 1px)",
                  backgroundSize: "42px 42px",
                }}
              />

              {/* CENTER LOCATION */}

              <div className="absolute inset-0 flex items-center justify-center">
                <div className="relative">
                  {/* PULSE */}

                  <span
                    aria-hidden="true"
                    className="absolute left-1/2 top-1/2 h-28 w-28 -translate-x-1/2 -translate-y-1/2 animate-pulse rounded-full border border-[#FFC400]/10"
                  />

                  <span
                    aria-hidden="true"
                    className="absolute left-1/2 top-1/2 h-20 w-20 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#FFC400]/[0.04] blur-xl"
                  />

                  {/* PIN */}

                  <div className="relative flex h-16 w-16 items-center justify-center rounded-2xl border border-[#FFC400]/25 bg-[#0D0D0D] text-[#FFC400] shadow-[0_0_40px_rgba(255,196,0,0.08)]">
                    <MapPin size={24} />
                  </div>
                </div>
              </div>

              {/* LABEL */}

              <div className="absolute bottom-6 left-6 right-6 flex items-center justify-between rounded-xl border border-white/[0.07] bg-black/40 px-4 py-3 backdrop-blur-md">
                <div>
                  <p className="text-[8px] font-semibold uppercase tracking-[0.18em] text-[#FFC400]">
                    Serving businesses
                  </p>

                  <p className="mt-1 text-xs font-medium text-white/60">
                    Across locations
                  </p>
                </div>

                <ArrowRight
                  size={14}
                  className="text-neutral-700"
                />
              </div>
            </div>
          </div>
        </div>

        {/* =====================================================
            FOOTER MICRO COPY
        ===================================================== */}

        <div className="mt-7 flex flex-col gap-2 text-center sm:flex-row sm:items-center sm:justify-between sm:text-left">
          <p className="text-[9px] font-medium uppercase tracking-[0.16em] text-neutral-700">
            Strategy · Design · Development · Growth
          </p>

          <p className="text-[9px] font-medium uppercase tracking-[0.16em] text-neutral-800">
            Aman Digital Solutions
          </p>
        </div>
      </div>
    </section>
  );
}