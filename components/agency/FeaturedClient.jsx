"use client";

import Image from "next/image";
import { motion } from "framer-motion";

export default function FeaturedClient() {
return ( <section className="relative py-12 md:py-16 bg-[#0A0A0A]"> <div className="max-w-7xl mx-auto px-6">


    {/* Heading */}

    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="text-center mb-14"
    >
      <div className="inline-flex px-4 py-2 rounded-full border border-yellow-500/20 bg-yellow-500/5 text-yellow-400 text-sm mb-5">
        Featured Client Work
      </div>

      <h2 className="text-3xl md:text-5xl font-bold text-white">
        Aarav Gift Gallery
      </h2>

      <p className="text-neutral-400 mt-4 max-w-2xl mx-auto">
        A modern product showcase website built for a real business,
        helping customers discover products and connect instantly.
      </p>
    </motion.div>

    {/* Main Card */}

    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7 }}
      className="grid lg:grid-cols-2 gap-10 items-center rounded-[32px] border border-white/10 bg-[#111111] p-6 md:p-10"
    >

      {/* Image */}

      <div className="overflow-hidden rounded-2xl border border-white/10">
        <Image
          src="/projects/aarav.webp"
          alt="Aarav Gift Gallery"
          width={1200}
          height={900}
          className="w-full h-auto object-cover"
        />
      </div>

      {/* Content */}

      <div>

        <div className="inline-flex px-3 py-2 rounded-full bg-green-500/10 text-green-400 text-sm mb-5">
          ● Real Client Project
        </div>

        <h3 className="text-3xl font-bold text-white">
          Premium Product Showcase Website
        </h3>

        <p className="text-neutral-400 mt-5 leading-relaxed">
          Designed and developed for Aarav Gift Gallery with a focus
          on premium product presentation, mobile responsiveness,
          WhatsApp integration and a smooth customer experience.
        </p>

        {/* Features */}

        <div className="grid grid-cols-2 gap-4 mt-8">

          <div className="rounded-xl border border-white/10 p-4">
            <h4 className="font-semibold text-white">
              Responsive Design
            </h4>
          </div>

          <div className="rounded-xl border border-white/10 p-4">
            <h4 className="font-semibold text-white">
              Product Showcase
            </h4>
          </div>

          <div className="rounded-xl border border-white/10 p-4">
            <h4 className="font-semibold text-white">
              WhatsApp Integration
            </h4>
          </div>

          <div className="rounded-xl border border-white/10 p-4">
            <h4 className="font-semibold text-white">
              Fast Performance
            </h4>
          </div>

        </div>

        {/* Buttons */}

        <div className="flex flex-wrap gap-4 mt-8">

          <a
            href="https://aaravgiftgallery.com"
            target="_blank"
            className="bg-yellow-400 text-black px-6 py-3 rounded-xl font-semibold hover:scale-105 transition"
          >
            Visit Website
          </a>

          <button className="border border-white/10 px-6 py-3 rounded-xl text-white hover:border-yellow-400 transition">
            View More Work
          </button>

        </div>

      </div>

    </motion.div>
  </div>
</section>


);
}
