"use client";

import Link from "next/link";
import { ArrowUpRight, BookOpen } from "lucide-react";
import { motion } from "framer-motion";

export default function BlogIntro() {
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
      className="mx-auto max-w-3xl"
    >
      {/* EYEBROW */}
      <div className="inline-flex items-center gap-2 rounded-full border border-[#292929] bg-[#0D0D0D] px-3.5 py-2">
        <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[#FFC400]/10 text-[#FFC400]">
          <BookOpen size={12} />
        </span>

        <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-[#858585] sm:text-[11px]">
          Ideas &amp; insights
        </span>
      </div>

      {/* HEADING */}
      <h2
        id="blog-heading"
        className="mt-6 text-[clamp(2.5rem,6vw,5rem)] font-semibold leading-[0.94] tracking-[-0.055em] text-[#F5F5F5]"
      >
        Thoughts that
        <span className="block text-[#FFC400]">
          move businesses forward.
        </span>
      </h2>

      {/* DESCRIPTION */}
      <p className="mx-auto mt-6 max-w-2xl text-sm leading-7 text-[#858585] sm:text-base sm:leading-7">
        Practical ideas on websites, technology, digital
        strategy and building a stronger presence online —
        without the unnecessary noise.
      </p>

      {/* CTA */}
      <Link
        href="/blog"
        className="group mt-8 inline-flex items-center gap-2 text-sm font-medium text-[#D8D8D8] transition-colors duration-200 hover:text-[#FFC400] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FFC400]"
      >
        Explore all insights

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