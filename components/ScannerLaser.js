"use client";
import { motion } from "framer-motion";

export default function ScannerLaser() {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-xl">
      <motion.div
        initial={{ y: "-100%" }}
        animate={{ y: "100%" }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "linear"
        }}
        className="absolute left-0 w-full h-[4px] bg-gradient-to-r from-transparent via-yellow-400 to-transparent opacity-80"
      />
    </div>
  );
}
