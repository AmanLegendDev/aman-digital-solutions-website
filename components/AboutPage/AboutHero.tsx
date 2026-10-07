"use client";

import Link from "next/link";
import {
  ArrowUpRight,
  Layers3,
  MapPin,
  Sparkles,
} from "lucide-react";

export default function AboutHero() {
  return (
    <section className="relative overflow-hidden bg-[#080808] pt-32 sm:pt-36 lg:pt-40">
      {/* Ambient background */}
      <div
        aria-hidden="true"
        className="
          pointer-events-none absolute
          left-1/2 top-0
          h-[520px] w-[720px]
          -translate-x-1/2
          rounded-full
          bg-[#FFC400]/[0.045]
          blur-[140px]
        "
      />

      <div
        aria-hidden="true"
        className="
          pointer-events-none absolute inset-0
          opacity-[0.025]
          [background-image:linear-gradient(rgba(255,255,255,1)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,1)_1px,transparent_1px)]
          [background-size:72px_72px]
        "
      />

      <div className="relative mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:gap-20">
          {/* CONTENT */}
          <div className="max-w-3xl">
            {/* Eyebrow */}
            <div className="inline-flex items-center gap-2 rounded-full border border-white/[0.08] bg-white/[0.025] px-3.5 py-2">
              <span className="h-1.5 w-1.5 rounded-full bg-[#FFC400]" />

              <span className="text-[10px] font-semibold uppercase tracking-[0.18em] text-neutral-400 sm:text-xs">
                About Aman Digital Solutions
              </span>
            </div>

            {/* Heading */}
            <h1
              className="
                mt-6
                text-[clamp(2.7rem,6vw,5.7rem)]
                font-semibold
                leading-[0.96]
                tracking-[-0.055em]
                text-white
              "
            >
              Digital solutions
              <span className="block text-[#FFC400]">
                built for business.
              </span>
            </h1>

            {/* Primary description */}
            <p className="mt-7 max-w-2xl text-base leading-7 text-neutral-400 sm:text-lg sm:leading-8">
              Aman Digital Solutions is a web development and digital
              solutions studio based in Shimla, building professional
              websites, e-commerce experiences, custom web applications
              and practical digital systems for growing businesses.
            </p>

            {/* Secondary description */}
            <p className="mt-4 max-w-2xl text-sm leading-6 text-neutral-500 sm:text-base sm:leading-7">
              We combine strategy, design, modern development and
              SEO-ready technology to create digital experiences that
              are useful, credible, scalable and built around real
              business requirements.
            </p>

            {/* LOCATION / POSITIONING */}
            <div className="mt-7 flex flex-wrap gap-2.5">
              <div className="inline-flex items-center gap-2 rounded-full border border-white/[0.08] bg-white/[0.025] px-3.5 py-2.5">
                <MapPin
                  size={14}
                  className="text-[#FFC400]"
                  aria-hidden="true"
                />

                <span className="text-xs font-medium text-neutral-300">
                  Shimla, Himachal Pradesh
                </span>
              </div>

              <div className="inline-flex items-center gap-2 rounded-full border border-white/[0.08] bg-white/[0.025] px-3.5 py-2.5">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />

                <span className="text-xs font-medium text-neutral-300">
                  Web Development &amp; Digital Solutions
                </span>
              </div>
            </div>

            {/* ACTIONS */}
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/start-a-project"
                className="
                  group inline-flex items-center
                  justify-center gap-2
                  rounded-full
                  bg-[#FFC400]
                  px-6 py-3.5
                  text-sm font-semibold text-black
                  transition-all duration-200
                  hover:bg-[#FFD43B]
                  hover:shadow-[0_0_35px_rgba(255,196,0,0.16)]
                  focus-visible:outline-none
                  focus-visible:ring-2
                  focus-visible:ring-[#FFC400]
                  focus-visible:ring-offset-2
                  focus-visible:ring-offset-[#080808]
                "
              >
                Start a Project

                <ArrowUpRight
                  size={16}
                  aria-hidden="true"
                  className="
                    transition-transform duration-200
                    group-hover:-translate-y-0.5
                    group-hover:translate-x-0.5
                  "
                />
              </Link>

              <Link
                href="/projects"
                className="
                  inline-flex items-center
                  justify-center gap-2
                  rounded-full
                  border border-white/[0.1]
                  bg-white/[0.025]
                  px-6 py-3.5
                  text-sm font-medium text-neutral-200
                  transition-all duration-200
                  hover:border-white/[0.18]
                  hover:bg-white/[0.05]
                  focus-visible:outline-none
                  focus-visible:ring-2
                  focus-visible:ring-[#FFC400]
                "
              >
                Explore Our Work

                <ArrowUpRight
                  size={15}
                  aria-hidden="true"
                />
              </Link>
            </div>
          </div>

          {/* DIGITAL STUDIO VISUAL */}
          <div className="relative mx-auto w-full max-w-[560px] lg:mx-0">
            <div
              aria-hidden="true"
              className="
                absolute -inset-3
                rounded-[2rem]
                border border-[#FFC400]/10
              "
            />

            <div className="relative overflow-hidden rounded-[1.75rem] border border-white/[0.08] bg-[#0D0D0D] p-5 sm:p-7">
              {/* Header */}
              <div className="flex items-center justify-between border-b border-white/[0.07] pb-5">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-[#FFC400]/15 bg-[#FFC400]/[0.06] text-[#FFC400]">
                    <Sparkles
                      size={17}
                      aria-hidden="true"
                    />
                  </div>

                  <div>
                    <p className="text-sm font-semibold text-white">
                      Aman Digital Solutions
                    </p>

                    <p className="mt-1 text-xs text-neutral-500">
                      Digital studio · Shimla
                    </p>
                  </div>
                </div>

                <span className="flex items-center gap-2 text-[9px] font-semibold uppercase tracking-[0.16em] text-neutral-600">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                  Digital
                </span>
              </div>

              {/* Capability visual */}
              <div className="mt-5 rounded-2xl border border-white/[0.06] bg-[#080808] p-5">
                <div className="flex items-center gap-2 text-xs font-medium text-neutral-400">
                  <Layers3
                    size={15}
                    className="text-[#FFC400]"
                    aria-hidden="true"
                  />

                  <span>
                    Digital capabilities
                  </span>
                </div>

                <div className="mt-5 space-y-3">
                  {[
                    "Website Development",
                    "E-commerce",
                    "Custom Web Applications",
                    "SEO & Search Growth",
                  ].map((item, index) => (
                    <div
                      key={item}
                      className="flex items-center justify-between rounded-xl border border-white/[0.06] bg-white/[0.02] px-4 py-3"
                    >
                      <div className="flex items-center gap-3">
                        <span className="text-[9px] font-semibold text-[#FFC400]/60">
                          0{index + 1}
                        </span>

                        <span className="text-xs font-medium text-neutral-300">
                          {item}
                        </span>
                      </div>

                      <ArrowUpRight
                        size={13}
                        className="text-neutral-700"
                        aria-hidden="true"
                      />
                    </div>
                  ))}
                </div>
              </div>

              {/* Bottom statement */}
              <div className="mt-5 grid grid-cols-2 gap-3">
                <div className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-4">
                  <p className="text-[9px] font-semibold uppercase tracking-[0.16em] text-neutral-600">
                    Based in
                  </p>

                  <p className="mt-2 text-sm font-medium text-neutral-300">
                    Shimla
                  </p>
                </div>

                <div className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-4">
                  <p className="text-[9px] font-semibold uppercase tracking-[0.16em] text-neutral-600">
                    Working across
                  </p>

                  <p className="mt-2 text-sm font-medium text-neutral-300">
                    India &amp; beyond
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom capability line */}
        <div className="mt-20 border-t border-white/[0.07] py-6 sm:mt-28">
          <p className="text-xs font-medium uppercase tracking-[0.16em] text-neutral-600">
            Strategy · Design · Development · SEO · Digital Solutions
          </p>
        </div>
      </div>
    </section>
  );
}