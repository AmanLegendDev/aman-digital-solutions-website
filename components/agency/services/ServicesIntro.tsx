"use client";

import Link from "next/link";
import {
  ArrowUpRight,
  MoveUpRight,
} from "lucide-react";
import { motion } from "framer-motion";

export default function ServicesIntro() {
  return (
    <motion.div
      initial={{
        opacity: 0,
        y: 20,
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
      className="max-w-xl"
    >
      {/* EYEBROW */}
      <div className="flex items-center gap-3">
        <span
          aria-hidden="true"
          className="h-px w-8 bg-[#FFC400]"
        />

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
        <span className="text-[#FFC400]">
          reason.
        </span>
      </h2>

      {/* DESCRIPTION */}
      <p className="mt-6 max-w-md text-sm leading-7 text-[#858585] sm:text-base sm:leading-7">
        From high-performance websites to custom digital
        experiences, we build what your business actually
        needs — with clarity, purpose and room to grow.
      </p>

      {/* SIGNAL */}
      <div className="mt-9 flex items-center gap-4 border-y border-[#202020] py-4">
        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-[#292929] bg-[#0D0D0D]">
          <MoveUpRight
            size={15}
            className="text-[#FFC400]"
          />
        </div>

        <div>
          <p className="text-[10px] uppercase tracking-[0.16em] text-[#555]">
            Our capabilities
          </p>

          <p className="mt-0.5 text-xs text-[#888]">
            Strategy, design, development & growth
          </p>
        </div>
      </div>

      {/* CTA */}
      <div className="mt-7 flex flex-wrap items-center gap-5">
        <Link
          href="/services"
          className="group inline-flex items-center gap-2 text-sm font-medium text-[#D8D8D8] transition-colors duration-200 hover:text-[#FFC400] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FFC400]"
        >
          Explore all services

          <span className="flex h-7 w-7 items-center justify-center rounded-full border border-[#292929] transition-all duration-200 group-hover:border-[#FFC400]/40 group-hover:bg-[#FFC400]/10">
            <ArrowUpRight
              size={14}
              className="transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
            />
          </span>
        </Link>

        <Link
          href="#contact"
          className="text-xs font-medium text-[#555] transition-colors duration-200 hover:text-[#FFC400] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FFC400]"
        >
          Start a conversation
        </Link>
      </div>
    </motion.div>
  );
}