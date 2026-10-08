"use client";

import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";

type Props = {
  onClick: () => void;
};

export default function AMIButton({
  onClick,
}: Props) {
  return (
    <motion.button
      type="button"
      onClick={onClick}
      aria-label="Open AMI assistant"
      whileHover={{ scale: 1.04 }}
      whileTap={{ scale: 0.96 }}
      className="
        fixed
        bottom-6
        right-6
        z-[80]
        flex
        h-14
        items-center
        gap-2
        rounded-full
        border
        border-white/10
        bg-[#080808]
        px-5
        text-white
        shadow-[0_16px_50px_rgba(0,0,0,0.28)]
        transition
        hover:border-[#FFC400]/40
        hover:shadow-[0_18px_60px_rgba(0,0,0,0.38)]
        focus:outline-none
        focus:ring-2
        focus:ring-[#FFC400]/60
        focus:ring-offset-2
        focus:ring-offset-white
        sm:bottom-7
        sm:right-7
      "
    >
      <span
        className="
          flex
          h-8
          w-8
          items-center
          justify-center
          rounded-full
          bg-[#FFC400]
          text-black
        "
      >
        <Sparkles
          size={16}
          strokeWidth={2.2}
        />
      </span>

      <span className="text-sm font-semibold tracking-tight">
        AMI
      </span>

      <span
        className="
          hidden
          text-xs
          text-white/50
          sm:inline
        "
      >
        Ask anything
      </span>
    </motion.button>
  );
}