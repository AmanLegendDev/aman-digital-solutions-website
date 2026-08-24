"use client";

import Link from "next/link";
import { ArrowDown, ArrowUpRight } from "lucide-react";
import { motion } from "framer-motion";

export default function ServicesIntro() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{
        duration: 0.55,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="max-w-xl"
    >
      {/* EYEBROW */}
      <div className="flex items-center gap-3">
        <span className="h-px w-8 bg-[#FFC400]" />

        <span className="text-[10px] font-medium uppercase tracking-[0.2em] text-[#FFC400]">
          What we do
        </span>
      </div>

      {/* HEADING */}
      <h2
        id="services-heading"
        className="mt-6 text-[clamp(2.5rem,5vw,4.7rem)] font-semibold leading-[0.94] tracking-[-0.055em] text-[#F5F5F5]"
      >
        Digital work with a{" "}
        <span className="text-[#FFC400]">reason.</span>
      </h2>

      {/* DESCRIPTION */}
      <p className="mt-6 max-w-md text-sm leading-7 text-[#858585] sm:text-base sm:leading-7">
        From high-performance websites to custom digital
        experiences, we build what your business actually
        needs — with clarity, purpose and room to grow.
      </p>

      {/* MINI NAV */}
      <div className="mt-8 flex flex-wrap items-center gap-3">
        <Link
          href="#work"
          className="group inline-flex items-center gap-2 rounded-full border border-[#292929] bg-[#0D0D0D] px-4 py-2.5 text-xs font-medium text-[#D8D8D8] transition-all duration-200 hover:border-[#FFC400]/30 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FFC400]"
        >
          See our work

          <ArrowUpRight
            size={14}
            className="transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
          />
        </Link>

        <Link
          href="#contact"
          className="group inline-flex items-center gap-2 px-2 py-2.5 text-xs font-medium text-[#666] transition-colors duration-200 hover:text-[#FFC400] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FFC400]"
        >
          Start a conversation

          <ArrowDown
            size={14}
            className="transition-transform duration-200 group-hover:translate-y-0.5"
          />
        </Link>
      </div>

      {/* SMALL POSITIONING LINE */}
      <div className="mt-12 hidden border-l border-[#FFC400]/30 pl-4 lg:block">
        <p className="text-xs leading-5 text-[#555]">
          Strategy
          <span className="mx-2 text-[#333]">/</span>
          Design
          <span className="mx-2 text-[#333]">/</span>
          Development
          <span className="mx-2 text-[#333]">/</span>
          Growth
        </p>
      </div>
    </motion.div>
  );
}