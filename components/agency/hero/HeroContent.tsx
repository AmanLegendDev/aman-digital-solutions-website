"use client";

import Link from "next/link";
import { ArrowDown, ArrowUpRight, Sparkles } from "lucide-react";
import { motion } from "framer-motion";

export default function HeroContent() {
  return (
    <div className="max-w-2xl">
      {/* EYEBROW */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          duration: 0.45,
          ease: "easeOut",
        }}
        className="mb-5 inline-flex items-center gap-2 rounded-full border border-[#252525] bg-[#0D0D0D]/80 px-3.5 py-2 backdrop-blur-sm sm:mb-6"
      >
        <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[#FFC400]/10 text-[#FFC400]">
          <Sparkles size={12} />
        </span>

        <span className="text-[10px] font-medium uppercase tracking-[0.16em] text-[#A1A1A1] sm:text-[11px]">
          Digital solutions for ambitious businesses
        </span>
      </motion.div>

      {/* HEADLINE */}
      <motion.h1
        id="hero-heading"
        initial={{ opacity: 0, y: 22 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          duration: 0.65,
          delay: 0.08,
          ease: [0.22, 1, 0.36, 1],
        }}
        className="max-w-[680px] text-[clamp(2.8rem,7vw,6.4rem)] font-semibold leading-[0.94] tracking-[-0.055em] text-[#F5F5F5] lg:max-w-[600px] lg:text-[4.55rem] lg:leading-[0.9] xl:max-w-[640px] xl:text-[4.9rem]"
      >
        We build
        <span className="block text-[#FFC400]">
          digital experiences
        </span>
        that move
        <span className="block">
          businesses forward.
        </span>
      </motion.h1>

      {/* DESCRIPTION */}
      <motion.p
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          duration: 0.55,
          delay: 0.18,
          ease: "easeOut",
        }}
        className="mt-6 max-w-xl text-sm leading-7 text-[#A1A1A1] sm:mt-7 sm:text-base lg:mt-5 lg:max-w-[500px] lg:leading-6"
      >
        Aman Digital Solutions creates fast, modern and
        business-focused websites that help brands look
        credible, connect with customers and grow online.
      </motion.p>

      {/* ACTIONS */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          duration: 0.5,
          delay: 0.26,
          ease: "easeOut",
        }}
        className="mt-7 flex flex-col gap-3 sm:mt-8 sm:flex-row lg:mt-6"
      >
        <Link
          href="#contact"
          className="group inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-[#FFC400] px-6 text-sm font-semibold text-black transition-all duration-200 hover:bg-[#FFD43B] hover:shadow-[0_0_32px_rgba(255,196,0,0.16)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FFC400] focus-visible:ring-offset-2 focus-visible:ring-offset-[#050505]"
        >
          Start a project

          <ArrowUpRight
            size={17}
            className="transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
          />
        </Link>

        <Link
          href="#work"
          className="group inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-[#292929] bg-[#0D0D0D]/70 px-6 text-sm font-medium text-[#E5E5E5] backdrop-blur-sm transition-all duration-200 hover:border-[#FFC400]/30 hover:bg-[#111111] hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FFC400]"
        >
          Explore our work

          <ArrowDown
            size={16}
            className="transition-transform duration-200 group-hover:translate-y-0.5"
          />
        </Link>
      </motion.div>

      {/* MICRO TRUST LINE */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{
          duration: 0.5,
          delay: 0.38,
        }}
        className="mt-6 flex flex-wrap items-center gap-x-4 gap-y-2 text-[10px] text-[#666] sm:mt-7 sm:text-[11px] lg:mt-5"
      >
        <span>Web Development</span>

        <span
          aria-hidden="true"
          className="h-1 w-1 rounded-full bg-[#444]"
        />

        <span>Performance</span>

        <span
          aria-hidden="true"
          className="h-1 w-1 rounded-full bg-[#444]"
        />

        <span>SEO</span>

        <span
          aria-hidden="true"
          className="h-1 w-1 rounded-full bg-[#444]"
        />

        <span>Business Growth</span>
       
      </motion.div>
    </div>
  );
}