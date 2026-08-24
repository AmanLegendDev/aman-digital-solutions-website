"use client";

import { ArrowUpRight } from "lucide-react";
import { motion } from "framer-motion";

export default function TrustIntro() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
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
          Built with purpose
        </span>
      </div>

      {/* HEADING */}
      <h2
        id="trust-heading"
        className="mt-6 text-[clamp(2.3rem,5vw,4.5rem)] font-semibold leading-[0.96] tracking-[-0.05em] text-[#F5F5F5]"
      >
        Your website should do{" "}
        <span className="text-[#FFC400]">more</span>{" "}
        than look good.
      </h2>

      {/* DESCRIPTION */}
      <p className="mt-6 max-w-lg text-sm leading-7 text-[#888] sm:text-base">
        It should make your business easier to discover, easier
        to trust and easier to choose. We combine thoughtful
        design, modern technology and business strategy to build
        digital experiences with a purpose.
      </p>

      {/* SMALL LINK */}
      <a
        href="#services"
        className="group mt-7 inline-flex items-center gap-2 text-sm font-medium text-[#D8D8D8] transition-colors duration-200 hover:text-[#FFC400]"
      >
        See what we build

        <span className="flex h-7 w-7 items-center justify-center rounded-full border border-[#292929] transition-all duration-200 group-hover:border-[#FFC400]/40 group-hover:bg-[#FFC400]/10">
          <ArrowUpRight
            size={14}
            className="transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
          />
        </span>
      </a>
    </motion.div>
  );
}