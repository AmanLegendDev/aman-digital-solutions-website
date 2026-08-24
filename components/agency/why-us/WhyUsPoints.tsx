"use client";

import {
  ArrowDown,
  Gauge,
  Layers3,
  Search,
  Target,
} from "lucide-react";
import { motion } from "framer-motion";

const WHY_US_POINTS = [
  {
    number: "01",
    icon: Target,
    title: "Business before decoration",
    description:
      "We start with what the website needs to achieve for the business, then shape the design and technology around that goal.",
  },
  {
    number: "02",
    icon: Layers3,
    title: "Built around your brand",
    description:
      "No cookie-cutter layouts. The visual system, content structure and experience are shaped around how your business should be perceived.",
  },
  {
    number: "03",
    icon: Gauge,
    title: "Performance is part of the design",
    description:
      "Fast loading, responsive interactions and clean implementation are treated as core product requirements — not afterthoughts.",
  },
  {
    number: "04",
    icon: Search,
    title: "Ready to be discovered",
    description:
      "We build with SEO-friendly structure, meaningful content and technical foundations that give your business a stronger starting point online.",
  },
] as const;

export default function WhyUsPoints() {
  return (
    <div className="border-t border-[#202020]">
      {WHY_US_POINTS.map((point, index) => {
        const Icon = point.icon;

        return (
          <motion.article
            key={point.number}
            initial={{
              opacity: 0,
              x: 18,
            }}
            whileInView={{
              opacity: 1,
              x: 0,
            }}
            viewport={{
              once: true,
              amount: 0.2,
            }}
            transition={{
              duration: 0.5,
              delay: Math.min(index * 0.07, 0.2),
              ease: [0.22, 1, 0.36, 1],
            }}
            className="group grid grid-cols-[36px_1fr] gap-4 border-b border-[#202020] py-7 sm:grid-cols-[48px_1fr_auto] sm:gap-6 sm:py-8"
          >
            {/* NUMBER */}
            <span className="pt-1 text-[10px] font-medium tabular-nums tracking-[0.14em] text-[#555] transition-colors duration-200 group-hover:text-[#FFC400]">
              {point.number}
            </span>

            {/* CONTENT */}
            <div>
              <div className="flex items-center gap-3">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-[#252525] bg-[#0D0D0D] text-[#FFC400] transition-all duration-300 group-hover:border-[#FFC400]/25 group-hover:bg-[#FFC400]/[0.06]">
                  <Icon
                    size={16}
                    strokeWidth={1.7}
                  />
                </span>

                <h3 className="text-base font-semibold tracking-tight text-[#E8E8E8] transition-colors duration-200 group-hover:text-white sm:text-lg">
                  {point.title}
                </h3>
              </div>

              <p className="mt-3 max-w-xl text-sm leading-6 text-[#777]">
                {point.description}
              </p>
            </div>

            {/* DESKTOP ARROW */}
            <span className="hidden self-center text-sm text-[#333] transition-all duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-[#FFC400] sm:block">
              ↗
            </span>
          </motion.article>
        );
      })}

      {/* BOTTOM STATEMENT */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{
          once: true,
        }}
        transition={{
          duration: 0.5,
          delay: 0.25,
        }}
        className="flex items-center gap-3 pt-7"
      >
        <span className="h-1.5 w-1.5 rounded-full bg-[#FFC400] shadow-[0_0_12px_rgba(255,196,0,0.55)]" />

        <span className="text-[10px] uppercase tracking-[0.18em] text-[#555]">
          Built for the long term
        </span>

        <ArrowDown
          size={13}
          className="text-[#444]"
        />
      </motion.div>
    </div>
  );
}