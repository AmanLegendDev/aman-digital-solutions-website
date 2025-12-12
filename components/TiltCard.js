"use client";
import { useRef } from "react";
import { motion } from "framer-motion";

export default function TiltCard({ title, desc, emoji }) {
  const ref = useRef();

  function handleMove(e){
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width;
    const py = (e.clientY - rect.top) / rect.height;

    const rx = (py - 0.5) * 8; // rotateX
    const ry = (px - 0.5) * -10; // rotateY
    el.style.transform = `perspective(900px) rotateX(${rx}deg) rotateY(${ry}deg) translateZ(8px)`;
  }
  function reset(){
    const el = ref.current;
    if (!el) return;
    el.style.transform = "perspective(900px) rotateX(0deg) rotateY(0deg) translateZ(0)";
  }

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={reset}
      className="card p-6 rounded-2xl tilt cursor-pointer"
      whileHover={{ scale: 1.02 }}
      transition={{ type: "spring", stiffness: 220, damping: 20 }}
    >
      <div className="text-3xl mb-3">{emoji}</div>
      <h4 className="text-xl font-semibold">{title}</h4>
      <p className="mt-2 text-neutral-300">{desc}</p>
    </motion.div>
  );
}
