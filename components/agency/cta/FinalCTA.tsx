"use client";

import Link from "next/link";
import {
  ArrowUpRight,
  MessageCircle,
  Sparkles,
} from "lucide-react";
import { motion } from "framer-motion";

export default function FinalCTA() {
  return (
    <section
      id="contact"
      aria-labelledby="final-cta-heading"
      className="relative w-full max-w-full scroll-mt-28 overflow-hidden border-t border-[#1A1A1A] bg-[#050505] py-24 sm:py-28 lg:py-36"
    >
      {/* BACKGROUND GLOW */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-1/2 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#FFC400]/[0.045] blur-[150px]"
      />

      {/* SUBTLE GRID */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.035]"
        style={{
          backgroundImage:
            "linear-gradient(#FFC400 1px, transparent 1px), linear-gradient(90deg, #FFC400 1px, transparent 1px)",
          backgroundSize: "80px 80px",
          maskImage:
            "radial-gradient(circle at center, black, transparent 72%)",
          WebkitMaskImage:
            "radial-gradient(circle at center, black, transparent 72%)",
        }}
      />

      <div className="relative mx-auto w-full max-w-5xl px-5 text-center sm:px-8 lg:px-10">
        <motion.div
          initial={{
            opacity: 0,
            y: 24,
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
            duration: 0.6,
            ease: [0.22, 1, 0.36, 1],
          }}
        >
          {/* EYEBROW */}
          <div className="inline-flex items-center gap-2 rounded-full border border-[#292929] bg-[#0D0D0D]/80 px-3.5 py-2 backdrop-blur-sm">
            <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[#FFC400]/10 text-[#FFC400]">
              <Sparkles size={12} />
            </span>

            <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-[#858585] sm:text-[11px]">
              Let&apos;s build something meaningful
            </span>
          </div>

          {/* HEADING */}
          <h2
            id="final-cta-heading"
            className="mx-auto mt-7 max-w-4xl text-[clamp(3rem,8vw,7rem)] font-semibold leading-[0.9] tracking-[-0.065em] text-[#F5F5F5]"
          >
            Your next move
            <span className="block text-[#FFC400]">
              starts here.
            </span>
          </h2>

          {/* DESCRIPTION */}
          <p className="mx-auto mt-7 max-w-2xl text-sm leading-7 text-[#777] sm:text-base sm:leading-7">
            Whether you need a new website, a stronger digital
            presence, or a better way to turn visitors into
            customers, let&apos;s talk about what you&apos;re building.
          </p>

          {/* ACTIONS */}
          <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
            {/* PRIMARY */}
            <Link
              href="/start-a-project"
              className="group inline-flex min-h-13 w-full items-center justify-center gap-2 rounded-full bg-[#FFC400] px-7 text-sm font-semibold text-black transition-all duration-200 hover:bg-[#FFD43B] hover:shadow-[0_0_40px_rgba(255,196,0,0.16)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FFC400] focus-visible:ring-offset-2 focus-visible:ring-offset-[#050505] sm:w-auto"
            >
              Start a project

              <ArrowUpRight
                size={17}
                className="transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
              />
            </Link>

            {/* SECONDARY */}
            <a
              href="mailto:hello@amandigitalsolutions.com"
              className="group inline-flex min-h-13 w-full items-center justify-center gap-2 rounded-full border border-[#292929] bg-[#0C0C0C]/80 px-7 text-sm font-medium text-[#D5D5D5] backdrop-blur-sm transition-all duration-200 hover:border-[#FFC400]/30 hover:bg-[#111111] hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FFC400] sm:w-auto"
            >
              <MessageCircle
                size={16}
                className="text-[#777] transition-colors group-hover:text-[#FFC400]"
              />

              Talk to us
            </a>
          </div>

          {/* MICRO TRUST */}
          <div className="mt-9 flex flex-wrap items-center justify-center gap-x-4 gap-y-2 text-[9px] uppercase tracking-[0.14em] text-[#444] sm:text-[10px]">
            <span>Strategy</span>

            <span
              aria-hidden="true"
              className="h-1 w-1 rounded-full bg-[#333]"
            />

            <span>Design</span>

            <span
              aria-hidden="true"
              className="h-1 w-1 rounded-full bg-[#333]"
            />

            <span>Development</span>

            <span
              aria-hidden="true"
              className="h-1 w-1 rounded-full bg-[#333]"
            />

            <span>Growth</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}