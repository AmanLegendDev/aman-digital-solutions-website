"use client";
import { motion } from "framer-motion";

export default function SectionReveal({ children, delay = 0 }) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.6, delay }}
      className="fade-in"
    >
      {children}
    </motion.section>
  );
}
