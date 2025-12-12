// app/page.js
"use client";
import { motion } from "framer-motion";
import TiltCard from "@/components/TiltCard";
import ParallaxImage from "@/components/ParallaxImage";
import FloatingGlow from "@/components/FloatingGlow";
import SectionReveal from "@/components/SectionReveal";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <main className="max-w-7xl mx-auto px-6 py-20">
      {/* HERO */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        <div>
          <motion.h1 initial={{ opacity:0, y: 12 }} animate={{ opacity:1, y:0 }} transition={{ delay:0.08, duration:0.6 }} className="hero-title text-4xl md:text-6xl leading-tight font-extrabold">
            Modern QR Digital Menu for Restaurants & Hotels — <span className="text-yellow-300">Fast, Local & Premium</span>
          </motion.h1>

          <motion.p initial={{ opacity:0 }} animate={{ opacity:1 }} transition={{ delay: 0.15 }} className="hero-sub mt-5 max-w-xl text-neutral-300">
            Real-time editing, multi-menu support, table-wise order tracking and on-ground setup in Himachal. Built for speed — designed for elegance.
          </motion.p>

          <div className="mt-8 flex gap-4">
            <Link href="/demo" className="inline-block">
              <button className="px-6 py-3 rounded-xl bg-yellow-400 text-black font-semibold shadow-lg">View Live Demo</button>
            </Link>
            <Link href="/pricing" className="inline-block">
              <button className="px-6 py-3 rounded-xl border border-yellow-300 text-yellow-300">Pricing</button>
            </Link>
          </div>

          <div className="mt-4 text-sm text-neutral-400">
            Govt Reg: <span className="text-yellow-300 font-semibold">UDYAM-HP-09-0033862</span>
          </div>
        </div>

        {/* Right: layered parallax mockup */}
        <div className="relative">
          <FloatingGlow className="absolute -left-12 -top-12 w-64 h-64 rounded-full bg-gradient-to-tr from-yellow-300/10 to-transparent blur-3xl" />
          <div className="relative z-10">
            <ParallaxImage src="/images/mockup.png" alt="product mockup" speed={0.35} className="shadow-2xl rounded-3xl overflow-hidden" />
          </div>
        </div>
      </section>

      {/* WHY + TILT CARDS */}
      <SectionReveal>
        <div className="mt-20 text-center">
          <h2 className="text-3xl font-bold">Why Aman Digital Solutions?</h2>
          <p className="text-neutral-400 mt-2 max-w-2xl mx-auto">We deliver premium UX, fast deployment and reliable local support — built specifically for Himachal restaurants and hotels.</p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
            <TiltCard title="Instant Updates" desc="Change items, prices and availability in seconds." emoji="⚡" />
            <TiltCard title="Multi-Menu (Hotels)" desc="Breakfast • Lunch • Dinner • Room Service — separate control." emoji="🏨" />
            <TiltCard title="On-ground Support" desc="I’ll come to Shimla/Dhalli for setup & training." emoji="🤝" />
          </div>
        </div>
      </SectionReveal>

      {/* Features preview */}
      <SectionReveal>
        <div className="mt-20">
          <h3 className="text-2xl font-bold text-center">Powerful features</h3>
          <div className="grid md:grid-cols-3 gap-6 mt-8">
            <div className="card p-6 rounded-2xl">Real-time editing & pricing</div>
            <div className="card p-6 rounded-2xl">Cloud image delivery (Cloudinary)</div>
            <div className="card p-6 rounded-2xl">Order tracking & analytics</div>
          </div>
        </div>
      </SectionReveal>
    </main>
  );
}
