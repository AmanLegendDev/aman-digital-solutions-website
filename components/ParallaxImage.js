"use client";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";

export default function ParallaxImage({ src, alt, speed = 0.3, className = "" }) {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 1000], [0, -100 * speed]);
  return (
    <motion.div style={{ y }} className={`will-change-transform ${className}`}>
      <Image src={src} alt={alt} width={800} height={600} className="rounded-2xl" />
    </motion.div>
  );
}
