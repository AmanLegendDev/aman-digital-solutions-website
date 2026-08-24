"use client";

import Link from "next/link";
import { ArrowUpRight, Quote } from "lucide-react";
import { motion } from "framer-motion";

export default function TestimonialsIntro() {
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
          Client perspective
        </span>
      </div>

      {/* HEADING */}
      <h2
        id="testimonials-heading"
        className="mt-6 text-[clamp(2.5rem,5vw,4.7rem)] font-semibold leading-[0.94] tracking-[-0.055em] text-[#F5F5F5]"
      >
        Don't take our
        <span className="block text-[#FFC400]">
          word for it.
        </span>
      </h2>

      {/* DESCRIPTION */}
      <p className="mt-6 max-w-md text-sm leading-7 text-[#858585] sm:text-base sm:leading-7">
        The work matters, but so does the experience of
        building it. Here is what people have to say about
        working with Aman Digital Solutions.
      </p>

      {/* QUOTE MARK */}
      <div className="mt-9 flex h-11 w-11 items-center justify-center rounded-full border border-[#292929] bg-[#0D0D0D]">
        <Quote
          size={17}
          strokeWidth={1.6}
          className="text-[#FFC400]"
        />
      </div>

      {/* CTA */}
      <Link
        href="#contact"
        className="group mt-7 inline-flex items-center gap-2 text-sm font-medium text-[#D8D8D8] transition-colors duration-200 hover:text-[#FFC400] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FFC400]"
      >
        Start your project

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