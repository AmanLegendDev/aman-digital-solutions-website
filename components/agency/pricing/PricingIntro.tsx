"use client";

import { ArrowDown, Sparkles } from "lucide-react";
import { motion } from "framer-motion";

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
      className="mx-auto max-w-3xl"
    >
      {/* EYEBROW */}
      <div className="inline-flex items-center gap-2 rounded-full border border-[#292929] bg-[#0D0D0D] px-3.5 py-2">
        <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[#FFC400]/10 text-[#FFC400]">
          <Sparkles size={12} />
        </span>

        <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-[#8A8A8A] sm:text-[11px]">
          Simple, transparent options
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
        Choose a starting point that fits your business.
        Every project is shaped around your goals, audience
        and the experience your customers deserve.
      </p>

      {/* SCROLL HINT */}
      <div className="mt-8 flex items-center justify-center gap-2 text-[9px] font-medium uppercase tracking-[0.18em] text-[#4F4F4F]">
        <span>Explore plans</span>

        <span className="flex h-6 w-6 items-center justify-center rounded-full border border-[#252525]">
          <ArrowDown size={12} />
        </span>
      </div>
    </motion.div>
  );
}