"use client";

import Link from "next/link";
import { ArrowUpRight, MoveUpRight } from "lucide-react";
import { motion } from "framer-motion";

export default function ProjectsIntro() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
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
        <span className="h-px w-8 bg-[#FFC400]" />

        <span className="text-[10px] font-medium uppercase tracking-[0.2em] text-[#FFC400]">
          Selected work
        </span>
      </div>

      {/* HEADING */}
      <h2
        id="projects-heading"
        className="mt-6 text-[clamp(2.5rem,5vw,4.7rem)] font-semibold leading-[0.94] tracking-[-0.055em] text-[#F5F5F5]"
      >
        Work that turns{" "}
        <span className="text-[#FFC400]">ideas</span>{" "}
        into something real.
      </h2>

      {/* DESCRIPTION */}
      <p className="mt-6 max-w-md text-sm leading-7 text-[#858585] sm:text-base sm:leading-7">
        A look at the digital products and experiences we
        have built for businesses, brands and ideas worth
        putting online.
      </p>

      {/* PROJECT COUNT / SIGNAL */}
      <div className="mt-9 flex items-center gap-4 border-y border-[#202020] py-4">
        <div className="flex h-9 w-9 items-center justify-center rounded-full border border-[#292929] bg-[#0D0D0D]">
          <MoveUpRight
            size={15}
            className="text-[#FFC400]"
          />
        </div>

        <div>
          <p className="text-[10px] uppercase tracking-[0.16em] text-[#555]">
            Portfolio
          </p>

          <p className="mt-0.5 text-xs text-[#888]">
            Selected digital work
          </p>
        </div>
      </div>

      {/* CTA */}
      <Link
        href="#contact"
        className="group mt-7 inline-flex items-center gap-2 text-sm font-medium text-[#D8D8D8] transition-colors duration-200 hover:text-[#FFC400] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FFC400]"
      >
        Have a project in mind?

        <span className="flex h-7 w-7 items-center justify-center rounded-full border border-[#292929] transition-all duration-200 group-hover:border-[#FFC400]/40 group-hover:bg-[#FFC400]/10">
          <ArrowUpRight
            size={14}
            className="transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
          />
        </span>
      </Link>
    </motion.div>
  );
}