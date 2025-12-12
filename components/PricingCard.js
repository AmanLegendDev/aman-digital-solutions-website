"use client";
import { motion } from "framer-motion";

export default function PricingCard({ plan, highlight }) {
  return (
    <motion.div whileHover={{ y: -8 }} className={`bg-gradient-to-b from-[rgba(255,255,255,0.02)] to-transparent border border-neutral-800 rounded-3xl p-8 shadow-xl ${highlight ? "scale-102 ring-2 ring-yellow-400/20" : ""}`}>
      <div className="flex items-start justify-between">
        <div>
          <h3 className="text-xl font-bold">{plan.title}</h3>
          <p className="text-sm text-neutral-400 mt-1">{plan.note}</p>
        </div>
        {plan.tag && <div className="text-sm px-3 py-1 bg-yellow-400 text-black rounded-xl">{plan.tag}</div>}
      </div>

      <div className="mt-6">
        <div className="text-3xl font-bold">{plan.price}</div>
        <div className="text-sm text-neutral-400 mt-1">{plan.setup}</div>
      </div>

      <ul className="mt-6 space-y-3">
        {plan.features.map((f, i) => (
          <li key={i} className="flex items-start gap-3">
            <div className="mt-1 text-green-400">✔</div>
            <div className="text-neutral-200">{f}</div>
          </li>
        ))}
      </ul>

      <a href="/contact" className="block mt-6">
        <button className={`w-full py-3 rounded-xl ${plan.ctaClass ?? "bg-yellow-400 text-black"}`}>Get Started</button>
      </a>
    </motion.div>
  );
}
