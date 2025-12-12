"use client";
import { motion } from "framer-motion";
import SectionReveal from "@/components/SectionReveal";
import Image from "next/image";

export default function AboutPage() {
  return (
    <main className="max-w-5xl mx-auto px-6 py-24">

      {/* HERO SECTION */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center"
      >
        <h1 className="text-4xl md:text-5xl font-bold">
          About <span className="text-yellow-300">Aman Digital Solutions</span>
        </h1>

        <p className="text-neutral-400 mt-4 max-w-2xl mx-auto">
         <span className="text-yellow-300"></span>we build
          fast, clean and modern digital tools for restaurants & hotels who want to
          upgrade their customer experience — without complexity.
        </p>
      </motion.div>

      {/* IMAGE BANNER */}
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        whileInView={{ scale: 1, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="mt-12 rounded-2xl overflow-hidden shadow-xl"
      >
        
      </motion.div>

      {/* MISSION */}
      <SectionReveal>
        <div className="mt-16 bg-black/20 border border-neutral-800 p-8 rounded-2xl backdrop-blur">
          <h2 className="text-2xl font-bold text-yellow-300">Our Mission</h2>
          <p className="text-neutral-300 mt-3 leading-relaxed">
            To empower Himachal's local businesses with technology that is fast,
            reliable and beautifully simple.  
            We believe even small cafés and family restaurants deserve world-class tools.
          </p>
        </div>
      </SectionReveal>

      {/* VALUES */}
      <SectionReveal>
        <div className="mt-14">
          <h2 className="text-2xl font-bold mb-4">Our Values</h2>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-[#0d0d0d] p-6 rounded-xl border border-neutral-800 hover:border-yellow-300 transition">
              <h3 className="font-semibold text-yellow-300">Clean Design</h3>
              <p className="text-neutral-300 mt-2">User experience comes first — always.</p>
            </div>

            <div className="bg-[#0d0d0d] p-6 rounded-xl border border-neutral-800 hover:border-yellow-300 transition">
              <h3 className="font-semibold text-yellow-300">Fast Performance</h3>
              <p className="text-neutral-300 mt-2">Everything we build is optimized and reliable.</p>
            </div>

            <div className="bg-[#0d0d0d] p-6 rounded-xl border border-neutral-800 hover:border-yellow-300 transition">
              <h3 className="font-semibold text-yellow-300">Real Local Support</h3>
              <p className="text-neutral-300 mt-2">Shimla, Dhalli, Kufri — we are always available.</p>
            </div>

            <div className="bg-[#0d0d0d] p-6 rounded-xl border border-neutral-800 hover:border-yellow-300 transition">
              <h3 className="font-semibold text-yellow-300">Honest Pricing</h3>
              <p className="text-neutral-300 mt-2">Transparent. No hidden fees. No surprises.</p>
            </div>
          </div>
        </div>
      </SectionReveal>

      {/* FOUNDER NOTE */}
      <SectionReveal>
        <div className="mt-16 bg-black/20 p-8 rounded-2xl border border-neutral-800 backdrop-blur">
          <h2 className="text-2xl font-bold text-yellow-300">Founder’s Note</h2>
          <p className="text-neutral-300 mt-3 leading-relaxed">
            I’m Aman, a developer from Shimla who believes technology should be simple,
            fast and beautiful.  
            This project started with a small idea —  
            <span className="text-yellow-300">“Why don’t local businesses get premium tools?”</span>  
            Today, Aman Digital Solutions is helping restaurants modernize their entire workflow.
          </p>
        </div>
      </SectionReveal>

      {/* REGISTRATION */}
      <SectionReveal>
        <div className="mt-14 bg-black/20 border border-neutral-800 p-6 rounded-xl text-center">
          <p className="text-neutral-300">
            Govt Registered <span className="text-yellow-300 font-semibold">UDYAM-HP-09-0033862</span>
          </p>
        </div>
      </SectionReveal>

    </main>
  );
}
