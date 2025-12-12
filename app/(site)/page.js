"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import TiltCard from "@/components/TiltCard";
import Navbar from "@/components/navbaar";
import Footer from "@/components/footer";

const heroVariant = {
  hidden: {},
  show: { transition: { staggerChildren: 0.09 } }
};
const charVariant = {
  hidden: { opacity: 0, y: 18, scale: 0.97 },
  show: { opacity: 1, y: 0, scale: 1, transition: { duration: .45, ease: [0.22,0.9,0.24,1] } }
};

export default function Home() {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 400], [0, -30]);

  return (
    <>
      

      <motion.main className="min-h-[80vh] max-w-7xl mx-auto px-6 py-20" initial="hidden" animate="show" variants={heroVariant}>
        <section className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
          <div>
            <motion.h1 className="hero-title text-4xl md:text-6xl leading-tight" variants={charVariant}>
              Transform your business with a <span className="text-yellow-400">premium QR Digital Menu</span>
            </motion.h1>

            <motion.p className="hero-sub mt-5 max-w-xl" variants={charVariant}>
              Elegant, lightning fast, and built for real restaurants & hotels in Shimla. Instant updates, cloud images and professional support.
            </motion.p>

            <motion.div className="mt-8 flex gap-4" variants={charVariant}>
              <a href="/demo" className="hero-cta inline-block bg-yellow-400 text-black px-6 py-3 rounded-xl font-semibold shadow-md">
                View Live Demo
              </a>
              <a href="/pricing" className="inline-block border border-yellow-300 text-yellow-300 px-6 py-3 rounded-xl">
                Pricing
              </a>
            </motion.div>

            <motion.div className="mt-6 flex gap-3" variants={charVariant}>
              <div className="text-sm text-neutral-300">Govt Reg: <span className="text-yellow-300 font-semibold">UDYAM-HP-09-0033862</span></div>
            </motion.div>
          </div>

          <motion.div style={{ y }} className="flex justify-center">
            <div className="hero-mock card p-6 rounded-3xl tilt" >
              <Image src="/menu.png" alt="menu" width={420} height={420} className="rounded-2xl" priority />
            </div>
          </motion.div>
        </section>

        {/* Why choose */}
        <section className="mt-20 text-center">
          <motion.h2 className="text-3xl font-bold">Why Choose Us?</motion.h2>
          <motion.p className="max-w-2xl mx-auto mt-3 text-neutral-400">Premium UI, quick setup and on-ground support in Shimla.</motion.p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
            <TiltCard title="Instant Updates" desc="Edit items & prices in seconds." emoji="⚡" />
            <TiltCard title="Beautiful Interface" desc="Clean, premium UI for customers." emoji="🎨" />
            <TiltCard title="Local Support" desc="On-ground help in Shimla & Dhalli." emoji="🤝" />
          </div>
        </section>

        {/* Features */}
        <section className="mt-24">
          <motion.h3 className="text-2xl font-bold text-center">Powerful Features</motion.h3>
          <div className="grid md:grid-cols-3 gap-6 mt-8">
            <motion.div className="card p-6 rounded-2xl card-glow">
              <h4 className="text-lg font-semibold">Real-Time Editing</h4>
              <p className="mt-2 text-neutral-300">Update menu without reload.</p>
            </motion.div>
            <motion.div className="card p-6 rounded-2xl card-glow">
              <h4 className="text-lg font-semibold">Cloud Images</h4>
              <p className="mt-2 text-neutral-300">Optimized Cloudinary delivery.</p>
            </motion.div>
            <motion.div className="card p-6 rounded-2xl card-glow">
              <h4 className="text-lg font-semibold">Order Tracking</h4>
              <p className="mt-2 text-neutral-300">Table wise order flow & KOTs.</p>
            </motion.div>
          </div>
        </section>
      </motion.main>

      
    </>
  );
}
