"use client";

import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";

type Props = {
  stage?: string;
};

export default function AMIThinking({
  stage = "Understanding your requirement",
}: Props) {
  return (
    <motion.div
      initial={{
        opacity: 0,
        y: 6,
      }}
      animate={{
        opacity: 1,
        y: 0,
      }}
      className="
        flex
        items-center
        gap-3
        text-xs
        text-white/45
      "
      aria-live="polite"
      aria-label="AMI is working"
    >
      <span
        className="
          flex
          h-7
          w-7
          items-center
          justify-center
          rounded-full
          border
          border-[#FFC400]/20
          bg-[#FFC400]/[0.06]
        "
      >
        <Sparkles
          size={13}
          className="text-[#FFC400]"
        />
      </span>

      <span>{stage}</span>

      <span className="flex gap-1">
        <motion.span
          animate={{ opacity: [0.25, 1, 0.25] }}
          transition={{
            duration: 1,
            repeat: Infinity,
          }}
        >
          ·
        </motion.span>

        <motion.span
          animate={{ opacity: [0.25, 1, 0.25] }}
          transition={{
            duration: 1,
            repeat: Infinity,
            delay: 0.15,
          }}
        >
          ·
        </motion.span>

        <motion.span
          animate={{ opacity: [0.25, 1, 0.25] }}
          transition={{
            duration: 1,
            repeat: Infinity,
            delay: 0.3,
          }}
        >
          ·
        </motion.span>
      </span>
    </motion.div>
  );
}