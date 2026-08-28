"use client";

import Link from "next/link";
import {
  ArrowUpRight,
  MessageCircle,
  Sparkles,
} from "lucide-react";

export default function ServicesBottomCta() {
  return (
    <section
      aria-labelledby="services-bottom-cta-heading"
      className="relative overflow-hidden bg-[#050505] pb-24 pt-8 sm:pb-32"
    >
      <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
        <div className="relative overflow-hidden rounded-[32px] border border-[#FFC400]/15 bg-[#0A0A0A]">
          {/* BACKGROUND GLOW */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -right-32 -top-32 h-80 w-80 rounded-full bg-[#FFC400]/[0.07] blur-[100px]"
          />

          <div
            aria-hidden="true"
            className="pointer-events-none absolute -bottom-40 -left-20 h-72 w-72 rounded-full bg-[#FFC400]/[0.035] blur-[90px]"
          />

          {/* GRID */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 opacity-[0.035]"
            style={{
              backgroundImage:
                "linear-gradient(rgba(255,255,255,0.8) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.8) 1px, transparent 1px)",
              backgroundSize: "48px 48px",
            }}
          />

          <div className="relative grid gap-10 px-6 py-10 sm:px-10 sm:py-14 lg:grid-cols-[1fr_auto] lg:items-center lg:px-14 lg:py-16">
            {/* LEFT */}
            <div className="max-w-2xl">
              <div className="mb-5 flex items-center gap-2">
                <span className="flex h-8 w-8 items-center justify-center rounded-xl border border-[#FFC400]/15 bg-[#FFC400]/[0.06]">
                  <Sparkles
                    size={14}
                    className="text-[#FFC400]"
                  />
                </span>

                <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#FFC400]/70">
                  Have a project in mind?
                </span>
              </div>

              <h2
                id="services-bottom-cta-heading"
                className="text-3xl font-semibold tracking-[-0.045em] text-white sm:text-4xl lg:text-5xl"
              >
                Let&apos;s build something
                <br className="hidden sm:block" />{" "}
                <span className="text-neutral-600">
                  that means business.
                </span>
              </h2>

              <p className="mt-5 max-w-xl text-sm leading-7 text-neutral-500 sm:text-base">
                Tell us what you&apos;re trying to build,
                improve or grow. We&apos;ll help you figure
                out the right digital solution for your
                business.
              </p>

              {/* TRUST POINTS */}
              <div className="mt-7 flex flex-wrap gap-x-6 gap-y-3">
                {[
                  "No-pressure conversation",
                  "Business-first approach",
                  "Custom solutions",
                ].map((item) => (
                  <div
                    key={item}
                    className="flex items-center gap-2"
                  >
                    <span className="h-1.5 w-1.5 rounded-full bg-[#FFC400]" />

                    <span className="text-[11px] text-neutral-500">
                      {item}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* RIGHT ACTIONS */}
            <div className="flex w-full flex-col gap-3 sm:w-auto">
              <Link
                href="/start-a-project"
                className="group inline-flex min-w-[190px] items-center justify-between gap-6 rounded-2xl bg-[#FFC400] px-5 py-4 text-sm font-semibold text-black transition-all duration-300 hover:bg-[#FFD43B] hover:shadow-[0_0_40px_rgba(255,196,0,0.14)]"
              >
                <span>Start a Conversation</span>

                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-black/10">
                  <ArrowUpRight
                    size={16}
                    className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                  />
                </span>
              </Link>

           <a
  href="https://wa.me/918219174058"
  target="_blank"
  rel="noopener noreferrer"
  className="group inline-flex min-w-[190px] items-center justify-between gap-6 rounded-2xl border border-white/[0.08] bg-white/[0.02] px-5 py-4 text-sm font-medium text-neutral-300 transition-all duration-300 hover:border-white/[0.15] hover:bg-white/[0.045] hover:text-white"
>
  <span>Tell Us About Your Project</span>

  <MessageCircle
    size={16}
    className="text-neutral-600 transition-colors duration-300 group-hover:text-[#FFC400]"
  />
</a>
            </div>
          </div>

          {/* BOTTOM BRAND LINE */}
          <div className="relative flex flex-col gap-2 border-t border-white/[0.06] px-6 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-10 lg:px-14">
            <p className="text-[9px] font-medium uppercase tracking-[0.18em] text-neutral-700">
              Aman Digital Solutions
            </p>

            <p className="text-[9px] uppercase tracking-[0.14em] text-neutral-700">
              Digital solutions that mean business.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}