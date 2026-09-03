"use client";

import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { motion } from "framer-motion";

export default function HeroVisual() {
  return (
    <div className="relative mx-auto w-full max-w-2xl">
      {/* Ambient glow */}
      <div
        aria-hidden="true"
        className="absolute -inset-8 rounded-[40px] bg-[#FFC400]/[0.035] blur-[70px]"
      />

      {/* Main visual */}
      <motion.div
        initial={{
          opacity: 0,
          scale: 0.96,
          y: 20,
        }}
        animate={{
          opacity: 1,
          scale: 1,
          y: 0,
        }}
        transition={{
          duration: 0.8,
          delay: 0.12,
          ease: [0.22, 1, 0.36, 1],
        }}
        className="relative overflow-hidden rounded-[28px] border border-[#252525] bg-[#0A0A0A] shadow-[0_30px_100px_rgba(0,0,0,0.45)] sm:rounded-[36px]"
      >
        {/* Image */}
        <div className="relative aspect-[4/5] overflow-hidden sm:aspect-[5/6] lg:aspect-[4/5]">
          <Image
            src="/hero.jpg"
            alt="Aman Digital Solutions web development and digital solutions for businesses in Shimla"
            fill
            priority
            sizes="(max-width: 1024px) 90vw, 52vw"
            className="object-cover object-center"
          />

          {/* Dark cinematic treatment */}
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-gradient-to-br from-black/35 via-black/5 to-black/55"
          />

          {/* Warm accent */}
          <div
            aria-hidden="true"
            className="absolute -right-24 -top-24 h-64 w-64 rounded-full bg-[#FFC400]/10 blur-[90px]"
          />

          {/* Bottom fade */}
          <div
            aria-hidden="true"
            className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/75 via-black/20 to-transparent"
          />
        </div>

        {/* Floating label */}
        <motion.div
          initial={{
            opacity: 0,
            y: 10,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: 0.45,
            delay: 0.7,
          }}
          className="absolute bottom-5 left-5 right-5 sm:bottom-6 sm:left-6 sm:right-6"
        >
          <div className="flex items-end justify-between gap-4 rounded-2xl border border-white/10 bg-black/45 p-4 backdrop-blur-xl sm:p-5">
            <div>
              <p className="text-[10px] font-medium uppercase tracking-[0.18em] text-[#FFC400]">
                Aman Digital Solutions · Shimla
              </p>

              <p className="mt-1.5 max-w-xs text-sm font-medium leading-5 text-white sm:text-base">
                Web development and digital solutions built for growing
                businesses.
              </p>
            </div>

            <span
              aria-hidden="true"
              className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-white/10 bg-white/[0.06] text-white"
            >
              <ArrowUpRight size={16} />
            </span>
          </div>
        </motion.div>
      </motion.div>

      {/* Decorative floating element */}
      <motion.div
        aria-hidden="true"
        initial={{
          opacity: 0,
          scale: 0.8,
        }}
        animate={{
          opacity: 1,
          scale: 1,
        }}
        transition={{
          duration: 0.5,
          delay: 0.85,
        }}
        className="absolute -bottom-3 -left-3 h-14 w-14 rounded-2xl border border-[#FFC400]/20 bg-[#0A0A0A] shadow-[0_15px_40px_rgba(0,0,0,0.4)] sm:-bottom-4 sm:-left-4 sm:h-16 sm:w-16"
      >
        <div className="flex h-full items-center justify-center">
          <span className="h-2 w-2 rounded-full bg-[#FFC400] shadow-[0_0_16px_rgba(255,196,0,0.7)]" />
        </div>
      </motion.div>

      {/* Top-right detail */}
      <motion.div
        aria-hidden="true"
        initial={{
          opacity: 0,
          x: 10,
        }}
        animate={{
          opacity: 1,
          x: 0,
        }}
        transition={{
          duration: 0.5,
          delay: 0.95,
        }}
        className="absolute -right-2 -top-2 hidden h-20 w-20 rounded-2xl border border-[#252525] bg-[#0A0A0A]/90 backdrop-blur-xl sm:block"
      >
        <div className="flex h-full flex-col justify-center px-4">
          <span className="text-[9px] uppercase tracking-[0.16em] text-[#666]">
            Digital
          </span>

          <span className="mt-1 text-sm font-semibold text-[#F5F5F5]">
            Built Better.
          </span>
        </div>
      </motion.div>
    </div>
  );
}