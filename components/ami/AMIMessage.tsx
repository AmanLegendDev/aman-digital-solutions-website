"use client";

import { motion } from "framer-motion";

type Props = {
  role: "user" | "assistant";
  content: string;
};

export default function AMIMessage({
  role,
  content,
}: Props) {
  const isUser = role === "user";

  return (
    <motion.div
      initial={{
        opacity: 0,
        y: 8,
      }}
      animate={{
        opacity: 1,
        y: 0,
      }}
      transition={{
        duration: 0.2,
      }}
      className={`
        flex
        w-full
        ${isUser ? "justify-end" : "justify-start"}
      `}
    >
      <div
        className={`
          max-w-[88%]
          rounded-2xl
          px-4
          py-3
          text-[14px]
          leading-7
          sm:max-w-[720px]
          ${
            isUser
              ? `
                rounded-br-md
                bg-[#FFC400]
                text-black
                `
              : `
                rounded-bl-md
                border
                border-white/[0.08]
                bg-white/[0.045]
                text-white/85
              `
          }
        `}
      >
        {content}
      </div>
    </motion.div>
  );
}