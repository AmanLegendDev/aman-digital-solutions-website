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
    title: "Made for your business",
    description:
      "Every experience starts with your business goals, audience and positioning — not a recycled template.",
  },
  {
    number: "02",
    icon: Gauge,
    title: "Fast by design",
    description:
      "Clean architecture and performance-focused development keep your website responsive and enjoyable to use.",
  },
  {
    number: "03",
    icon: Search,
    title: "Built to be discovered",
    description:
      "SEO-friendly structure gives search engines a solid foundation while keeping the experience useful for real people.",
  },
  {
    number: "04",
    icon: ShieldCheck,
    title: "Built for trust",
    description:
      "Clear information, polished interactions and reliable experiences help turn first-time visitors into confident customers.",
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
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-[#252525] bg-[#0D0D0D] text-[#FFC400] transition-all duration-300 group-hover:border-[#FFC400]/25 group-hover:bg-[#FFC400]/[0.06]">
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
            <span className="hidden self-center text-xs text-[#3F3F3F] transition-colors duration-200 group-hover:text-[#666] sm:block">
              ↗
            </span>
          </motion.article>
        );
      })}
    </div>
  );
}