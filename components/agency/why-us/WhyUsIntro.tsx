"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { motion } from "framer-motion";

export default function WhyUsIntro() {
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
        <span
          aria-hidden="true"
          className="h-px w-8 bg-[#FFC400]"
        />

        <span className="text-[10px] font-medium uppercase tracking-[0.2em] text-[#FFC400]">
          Why Aman Digital Solutions
        </span>
      </div>

      {/* HEADING */}
      <h2
        id="why-us-heading"
        className="mt-6 text-[clamp(2.5rem,5vw,4.7rem)] font-semibold leading-[0.94] tracking-[-0.055em] text-[#F5F5F5]"
      >
        We don't just build
        <span className="block text-[#FFC400]">
          websites.
        </span>
        We build digital assets.
      </h2>

      {/* DESCRIPTION */}
      <p className="mt-6 max-w-md text-sm leading-7 text-[#858585] sm:text-base sm:leading-7">
        Your website is often the first interaction someone has with your
        business. We treat it as a real business asset — combining thoughtful
        design, modern web development and SEO-ready structure to create a
        clear, credible and useful digital presence.
      </p>

      {/* CTA */}
      <Link
        href="#contact"
        className="group mt-8 inline-flex items-center gap-2 text-sm font-medium text-[#D8D8D8] transition-colors duration-200 hover:text-[#FFC400] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FFC400]"
      >
        Let's build something useful

        <span className="flex h-7 w-7 items-center justify-center rounded-full border border-[#292929] transition-all duration-200 group-hover:border-[#FFC400]/40 group-hover:bg-[#FFC400]/10">
          <ArrowUpRight
            aria-hidden="true"
            size={14}
            className="transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
          />
        </span>
      </Link>

      {/* SMALL SIGNAL */}
      <div className="mt-10 hidden border-l border-[#FFC400]/25 pl-4 lg:block">
        <p className="text-xs leading-5 text-[#555]">
          Strategy
          <span className="mx-2 text-[#333]">/</span>
          Design
          <span className="mx-2 text-[#333]">/</span>
          Development
          <span className="mx-2 text-[#333]">/</span>
          SEO
        </p>
      </div>
    </motion.div>
  );
}