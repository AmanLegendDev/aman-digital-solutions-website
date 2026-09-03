"use client";

import { ArrowUpRight, Sparkles } from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";

export default function PricingIntro() {
  return (
    <motion.div
      initial={{
        opacity: 0,
        y: 18,
      }}
      whileInView={{
        opacity: 1,
        y: 0,
      }}
      viewport={{
        once: true,
        amount: 0.25,
      }}
      transition={{
        duration: 0.55,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="mx-auto max-w-3xl text-center"
    >
      {/* EYEBROW */}
      <div className="inline-flex items-center gap-2 rounded-full border border-[#292929] bg-[#0D0D0D] px-3.5 py-2">
        <span
          aria-hidden="true"
          className="flex h-5 w-5 items-center justify-center rounded-full bg-[#FFC400]/10 text-[#FFC400]"
        >
          <Sparkles
            aria-hidden="true"
            size={12}
          />
        </span>

        <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-[#8A8A8A] sm:text-[11px]">
          Clear starting points
        </span>
      </div>

      {/* HEADING */}
      <h2
        id="pricing-heading"
        className="mt-6 text-[clamp(2.5rem,6vw,5.2rem)] font-semibold leading-[0.94] tracking-[-0.055em] text-[#F5F5F5]"
      >
        Invest in your
        <span className="block text-[#FFC400]">
          digital presence.
        </span>
      </h2>

      {/* DESCRIPTION */}
      <p className="mx-auto mt-6 max-w-2xl text-sm leading-7 text-[#858585] sm:text-base sm:leading-7">
        Clear starting points for businesses at different
        stages. Choose an approach that fits your current
        needs, then scale when your business is ready.
      </p>

      {/* QUICK ACTIONS */}
      <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
        <Link
          href="/pricing"
          className="group inline-flex items-center gap-2 text-xs font-medium text-[#D8D8D8] transition-colors duration-200 hover:text-[#FFC400] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FFC400]"
        >
          Explore pricing

          <span className="flex h-7 w-7 items-center justify-center rounded-full border border-[#292929] transition-all duration-200 group-hover:border-[#FFC400]/40 group-hover:bg-[#FFC400]/10">
            <ArrowUpRight
              aria-hidden="true"
              size={13}
              className="transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
            />
          </span>
        </Link>

        <span
          aria-hidden="true"
          className="hidden h-4 w-px bg-[#252525] sm:block"
        />

        <Link
          href="/start-a-project"
          className="text-xs font-medium text-[#666] transition-colors duration-200 hover:text-[#FFC400] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FFC400]"
        >
          Talk about your project
        </Link>
      </div>
    </motion.div>
  );
}