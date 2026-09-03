"use client";

import Link from "next/link";
import {
  ArrowUpRight,
  CircleHelp,
} from "lucide-react";
import { motion } from "framer-motion";

export default function FAQIntro() {
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
          className="flex h-7 w-7 items-center justify-center rounded-full border border-[#292929] bg-[#0D0D0D] text-[#FFC400]"
        >
          <CircleHelp size={13} />
        </span>

        <span className="text-[10px] font-medium uppercase tracking-[0.2em] text-[#FFC400]">
          Frequently asked questions
        </span>
      </div>

      {/* HEADING */}
      <h2
        id="faq-heading"
        className="mt-6 text-[clamp(2.5rem,5vw,4.7rem)] font-semibold leading-[0.94] tracking-[-0.055em] text-[#F5F5F5]"
      >
        Questions about
        <span className="block text-[#FFC400]">
          working with us.
        </span>
      </h2>

      {/* DESCRIPTION */}
      <p className="mt-6 max-w-md text-sm leading-7 text-[#858585] sm:text-base sm:leading-7">
        From pricing and timelines to our development process,
        explore answers to common questions businesses have
        before starting a website or digital project.
      </p>

      {/* TRUST SIGNAL */}
      <div className="mt-9 border-y border-[#202020] py-4">
        <div className="flex items-center gap-3">
          <span
            aria-hidden="true"
            className="h-1.5 w-1.5 shrink-0 rounded-full bg-[#FFC400] shadow-[0_0_12px_rgba(255,196,0,0.45)]"
          />

          <p className="text-[10px] uppercase tracking-[0.15em] text-[#555]">
            Still have a question? We are happy to talk.
          </p>
        </div>
      </div>

      {/* CTA */}
      <Link
        href="/start-a-project"
        className="
          group
          mt-7
          inline-flex
          min-h-11
          items-center
          gap-2
          rounded-sm
          text-sm
          font-medium
          text-[#D8D8D8]
          transition-colors
          duration-200
          hover:text-[#FFC400]
          focus-visible:outline-none
          focus-visible:ring-2
          focus-visible:ring-[#FFC400]
        "
      >
        Start a conversation

        <span
          aria-hidden="true"
          className="
            flex
            h-7
            w-7
            items-center
            justify-center
            rounded-full
            border
            border-[#292929]
            transition-all
            duration-200
            group-hover:border-[#FFC400]/40
            group-hover:bg-[#FFC400]/10
          "
        >
          <ArrowUpRight
            size={14}
            className="
              transition-transform
              duration-200
              group-hover:-translate-y-0.5
              group-hover:translate-x-0.5
            "
          />
        </span>
      </Link>
    </motion.div>
  );
}