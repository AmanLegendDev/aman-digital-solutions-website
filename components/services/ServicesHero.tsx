"use client";

import { ArrowDownRight, ArrowUpRight, Sparkles } from "lucide-react";
import Link from "next/link";

type ServicesHeroProps = {
  servicesCount: number;
};

export default function ServicesHero({
  servicesCount,
}: ServicesHeroProps) {
  return (
    <section
      id="services"
      className="relative overflow-hidden border-b border-[#171717] pt-36 sm:pt-40 lg:pt-44"
    >
      {/* AMBIENT LIGHT */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-20 h-[420px] w-[420px] -translate-x-1/2 rounded-full bg-[#FFC400]/[0.035] blur-[120px]"
      />

      <div className="relative mx-auto max-w-7xl px-5 pb-24 sm:px-8 sm:pb-28 lg:px-10 lg:pb-32">
        {/* EYEBROW */}
        <div className="inline-flex items-center gap-2 rounded-full border border-[#242424] bg-[#0A0A0A] px-3 py-2">
          <Sparkles
            size={13}
            className="text-[#FFC400]"
          />

          <span className="text-[9px] font-semibold uppercase tracking-[0.16em] text-neutral-400">
            {servicesCount} digital capabilities
          </span>
        </div>

        {/* HEADING */}
        <div className="mt-8 max-w-5xl">
          <h1 className="text-[clamp(3rem,8vw,7.5rem)] font-semibold leading-[0.9] tracking-[-0.065em] text-white">
            Digital services
            <br />

            <span className="text-neutral-600">
              built to move
            </span>{" "}

            <span className="text-[#FFC400]">
              business.
            </span>
          </h1>
        </div>

        {/* LOWER CONTENT */}
        <div className="mt-12 grid gap-10 lg:grid-cols-[1fr_auto] lg:items-end">
          <div className="max-w-xl">
            <p className="text-base leading-7 text-neutral-400 sm:text-lg sm:leading-8">
              From high-performance websites to custom
              business systems, we design and build digital
              experiences around what your business actually
              needs.
            </p>
          </div>

          <Link
            href="#all-services"
            className="group inline-flex w-fit items-center gap-3 rounded-full border border-[#292929] bg-[#0A0A0A] px-5 py-3 text-xs font-medium text-white transition-all duration-200 hover:border-[#FFC400]/40 hover:bg-[#101010]"
          >
            Explore services

            <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[#FFC400] text-black transition-transform duration-200 group-hover:translate-x-0.5 group-hover:translate-y-0.5">
              <ArrowDownRight size={14} />
            </span>
          </Link>
        </div>

        {/* BOTTOM STATEMENT */}
        <div className="mt-20 flex flex-col gap-5 border-t border-[#1B1B1B] pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="max-w-lg text-[11px] leading-5 text-neutral-600">
            Strategy, design, development and ongoing digital
            support — connected under one system.
          </p>

          <Link
            href="#contact"
            className="group inline-flex items-center gap-2 text-xs font-medium text-neutral-400 transition-colors hover:text-white"
          >
            Start a conversation

            <ArrowUpRight
              size={14}
              className="text-[#FFC400] transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
            />
          </Link>
        </div>
      </div>
    </section>
  );
}