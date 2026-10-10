
"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";

type Props = {
  onClick: () => void;
};

export default function AMIButton({ onClick }: Props) {
  return (
    <motion.button
      type="button"
      onClick={onClick}
      aria-label="Open AMI AI assistant — Ask anything"
      whileHover={{ scale: 1.035 }}
      whileTap={{ scale: 0.96 }}
      className="
        fixed bottom-5 right-4 z-[80]
        flex flex-col items-center justify-center gap-1.5
        rounded-[28px] border border-white/10
        bg-[#090909]/95 p-3
        text-white
        shadow-[0_12px_45px_rgba(0,0,0,0.45)]
        backdrop-blur-xl
        transition-colors duration-300
        hover:border-[#FFC400]/50
        hover:shadow-[0_12px_45px_rgba(255,196,0,0.12)]
        focus-visible:outline-none
        focus-visible:ring-2
        focus-visible:ring-[#FFC400]
        sm:bottom-7 sm:right-7
        sm:flex-row sm:gap-3.5
        sm:rounded-full sm:py-2 sm:pl-2 sm:pr-5
      "
    >
      {/* AMI avatar */}
      <span className="relative block h-12 w-12 shrink-0">
        <span className="absolute inset-0 rounded-full bg-[#FFC400]/20 blur-md" />

        <span className="relative block h-12 w-12 overflow-hidden rounded-full border border-[#FFC400]/50 bg-[#15110A]">
          <Image
            src="/ami.png"
            alt="AMI AI assistant"
            fill
            sizes="48px"
            className="object-cover"
            priority
          />
        </span>

        {/* Online indicator */}
        <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-[#090909] bg-emerald-400" />
      </span>

      {/* AMI name and greeting */}
      <span className="flex flex-col items-center gap-0.5 sm:items-start">
        <span className="flex items-center gap-1">
          <span className="text-sm font-semibold tracking-tight sm:text-[15px]">
            AMI
          </span>

          <Sparkles
            size={13}
            strokeWidth={2.2}
            className="text-[#FFC400]"
          />
        </span>

     
      </span>

      {/* Desktop divider */}
      <span className="hidden h-8 w-px bg-white/10 sm:block" />

      {/* Ask anything */}
      <span className="flex flex-col items-center gap-0.5 sm:items-start">
        <span className="text-[11px] font-medium text-white/85 sm:text-xs">
          Ask anything
        </span>

        <span className="hidden text-[10px] text-white/40 sm:block">
          How can I help?
        </span>
      </span>
    </motion.button>
  );
}
