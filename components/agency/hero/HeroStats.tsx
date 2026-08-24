"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

const STATS = [
  {
    value: "01",
    label: "Digital Partner",
  },
  {
    value: "100%",
    label: "Business Focused",
  },
  {
    value: "24/7",
    label: "Digital Presence",
  },
];

export default function HeroStats() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.5,
        delay: 0.5,
        ease: "easeOut",
      }}
      className="grid border-y border-[#202020] sm:grid-cols-3"
    >
      {STATS.map((stat, index) => (
        <div
          key={stat.label}
          className={[
            "group flex items-center justify-between gap-4 py-4",
            "sm:px-6 sm:py-5",
            index !== 0
              ? "border-t border-[#202020] sm:border-l sm:border-t-0"
              : "",
          ].join(" ")}
        >
          <div>
            <p className="text-lg font-semibold tracking-tight text-[#F5F5F5] sm:text-xl">
              {stat.value}
            </p>

            <p className="mt-0.5 text-[11px] uppercase tracking-[0.14em] text-[#666]">
              {stat.label}
            </p>
          </div>

          <ArrowUpRight
            size={16}
            className="text-[#444] transition-all duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-[#FFC400]"
          />
        </div>
      ))}
    </motion.div>
  );
}