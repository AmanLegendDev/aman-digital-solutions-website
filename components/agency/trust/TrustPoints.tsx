"use client";

import {
  Gauge,
  Search,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import { motion } from "framer-motion";

const TRUST_POINTS = [
  {
    number: "01",
    icon: Sparkles,
    title: "Built around your business",
    description:
      "Every website starts with your business goals, audience and positioning — not a recycled template or one-size-fits-all approach.",
  },
  {
    number: "02",
    icon: Gauge,
    title: "Fast and performance-focused",
    description:
      "Clean architecture and modern web development help keep your website fast, responsive and reliable across devices.",
  },
  {
    number: "03",
    icon: Search,
    title: "Ready to be discovered",
    description:
      "SEO-friendly structure gives search engines a strong technical foundation while keeping your content useful and accessible to real people.",
  },
  {
    number: "04",
    icon: ShieldCheck,
    title: "Designed to build trust",
    description:
      "Clear information, polished interactions and a professional digital experience help visitors understand your business and take the next step.",
  },
] as const;

export default function TrustPoints() {
  return (
    <div className="grid border-t border-[#202020]">
      {TRUST_POINTS.map((point, index) => {
        const Icon = point.icon;

        return (
          <motion.article
            key={point.number}
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
              amount: 0.2,
            }}
            transition={{
              duration: 0.45,
              delay: index * 0.07,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="group grid grid-cols-[auto_1fr_auto] gap-4 border-b border-[#202020] py-6 sm:grid-cols-[48px_1fr_auto] sm:gap-6 sm:py-7"
          >
            {/* NUMBER */}
            <span className="pt-1 text-[10px] font-medium tabular-nums tracking-[0.12em] text-[#555] transition-colors duration-200 group-hover:text-[#FFC400]">
              {point.number}
            </span>

            {/* CONTENT */}
            <div>
              <div className="flex items-center gap-3">
                <span
                  aria-hidden="true"
                  className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-[#252525] bg-[#0D0D0D] text-[#FFC400] transition-all duration-300 group-hover:border-[#FFC400]/25 group-hover:bg-[#FFC400]/[0.06]"
                >
                  <Icon size={15} strokeWidth={1.8} />
                </span>

                <h3 className="text-base font-semibold tracking-tight text-[#E8E8E8] transition-colors duration-200 group-hover:text-white sm:text-lg">
                  {point.title}
                </h3>
              </div>

              <p className="mt-3 max-w-xl text-sm leading-6 text-[#777]">
                {point.description}
              </p>
            </div>

            {/* INDEX DETAIL */}
            <span
              aria-hidden="true"
              className="hidden self-center text-xs text-[#3F3F3F] transition-colors duration-200 group-hover:text-[#666] sm:block"
            >
              ↗
            </span>
          </motion.article>
        );
      })}
    </div>
  );
}