"use client";

import Image from "next/image";
import Link from "next/link";
import {
  ArrowDown,
  ArrowUpRight,
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
        <div className="grid items-center gap-12 lg:grid-cols-[0.92fr_1.08fr] lg:gap-20">
          {/* IMAGE */}
          <div className="relative mx-auto w-full max-w-[560px] lg:mx-0">
            <div
              aria-hidden="true"
              className="
                absolute -inset-3
                rounded-[2rem]
                border border-[#FFC400]/10
              "
            />

            <div className="relative overflow-hidden rounded-[1.75rem] border border-white/[0.08] bg-[#111111]">
              <Image
                src="/founder.png"
                alt="Aman Ansari, founder of Aman Digital Solutions"
                width={900}
                height={1100}
                priority
                className="
                  aspect-[4/5]
                  w-full
                  object-cover
                  object-top
                  grayscale-[8%]
                  transition-transform
                  duration-700
                  hover:scale-[1.015]
                "
              />

              {/* Image gradient */}
              <div
                aria-hidden="true"
                className="
                  pointer-events-none absolute inset-0
                  bg-gradient-to-t
                  from-black/60 via-transparent to-transparent
                "
              />

              {/* Founder label */}
              <div className="absolute bottom-5 left-5 right-5 flex items-end justify-between gap-4">
                <div>
                  <p className="text-sm font-semibold text-white">
                    Aman Ansari
                  </p>
                  <p className="mt-1 text-xs text-neutral-400">
                    Founder · Aman Digital Solutions
                  </p>
                </div>

                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white/10 bg-black/40 text-[#FFC400] backdrop-blur-md">
                  <Sparkles size={16} />
                </div>
              </div>
            </div>
          </div>

          {/* CONTENT */}
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/[0.08] bg-white/[0.025] px-3.5 py-2">
              <span className="h-1.5 w-1.5 rounded-full bg-[#FFC400]" />

              <span className="text-[10px] font-semibold uppercase tracking-[0.18em] text-neutral-400 sm:text-xs">
                The person behind the solutions
              </span>
            </div>

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
              Building the skills.
              <span className="block text-[#FFC400]">
                Building the company.
              </span>
            </h1>

            <p className="mt-7 max-w-xl text-base leading-7 text-neutral-400 sm:text-lg sm:leading-8">
              I&apos;m Aman Ansari, founder of Aman Digital Solutions.
              I started learning web development with a simple goal:
              build real digital products that businesses can actually
              use.
            </p>

            <p className="mt-4 max-w-xl text-sm leading-6 text-neutral-500 sm:text-base sm:leading-7">
              What started with learning HTML, CSS and basic WordPress
              development has grown into a full-stack development journey
              focused on modern websites, business systems, user
              experiences and practical digital solutions.
            </p>

            {/* LOCATION / STATUS */}
            <div className="mt-7 flex flex-wrap gap-2.5">
              <div className="inline-flex items-center gap-2 rounded-full border border-white/[0.08] bg-white/[0.025] px-3.5 py-2.5">
                <MapPin size={14} className="text-[#FFC400]" />
                <span className="text-xs font-medium text-neutral-300">
                  Dhalli, Shimla
                </span>
              </div>

              <div className="inline-flex items-center gap-2 rounded-full border border-white/[0.08] bg-white/[0.025] px-3.5 py-2.5">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                <span className="text-xs font-medium text-neutral-300">
                  Independent digital studio
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
                  className="
                    transition-transform duration-200
                    group-hover:-translate-y-0.5
                    group-hover:translate-x-0.5
                  "
                />
              </Link>

              <Link
                href="#story"
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
                My story

                <ArrowDown size={15} />
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom intro line */}
        <div className="mt-20 border-t border-white/[0.07] py-6 sm:mt-28">
          <p className="text-xs font-medium uppercase tracking-[0.16em] text-neutral-600">
            From learning the fundamentals to building for real businesses
          </p>
        </div>
      </div>
    </section>
  );
}