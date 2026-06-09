"use client";

import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

const projects = [
{
title: "Hans Jewellers",
image: "/projects/hans.webp",
},
{
title: "Veloura Bakery",
image: "/projects/veloura.webp",
},
{
title: "OneBite QR Ordering",
image: "/projects/onebite.webp",
},
];

export default function Hero() {
const [current, setCurrent] = useState(0);

useEffect(() => {
const interval = setInterval(() => {
setCurrent((prev) => (prev + 1) % projects.length);
}, 4000);


return () => clearInterval(interval);


}, []);

return ( <section className="relative overflow-hidden bg-[#0A0A0A] min-h-[85vh] flex items-center mt-6">


  {/* Background Glow */}

  <div className="absolute top-10 left-0 h-[250px] w-[250px] rounded-full bg-yellow-500/10 blur-[120px]" />

  <div className="absolute bottom-0 right-0 h-[300px] w-[300px] rounded-full bg-yellow-400/10 blur-[150px]" />

  <div className="max-w-7xl mx-auto px-6 py-12 md:py-20 grid lg:grid-cols-2 gap-10 lg:gap-14 items-center">

    {/* LEFT */}

    <motion.div
      initial={{ opacity: 0, y: 25 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7 }}
      className="space-y-6"
    >
      <div className="inline-flex items-center rounded-full border border-yellow-500/20 bg-yellow-500/5 px-4 py-2 text-xs font-medium text-yellow-400">
        ✨ Udyam Registered Business
      </div>

      <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-[0.95] tracking-tight text-white">
        Websites &
        <span className="block text-yellow-400">
          Digital Solutions
        </span>
        For Local Businesses
      </h1>

      <p className="max-w-lg text-neutral-400 text-base sm:text-lg">
        Helping local businesses build a stronger online presence through
        modern websites and digital solutions.
      </p>

      <div className="flex flex-wrap gap-3">

        <a
  href="#portfolio"
  className="bg-yellow-400 text-black px-6 py-3 rounded-xl font-semibold hover:scale-105 transition"
>
  View Portfolio
</a>
        

        <a
  href="#contact"
  className="border border-white/10 px-6 py-3 rounded-xl text-white hover:border-yellow-400 transition"
>
  Book Consultation
</a>
      </div>

      <div className="flex flex-wrap gap-4 text-sm text-neutral-500">
        <span>📍 Shimla</span>
        <span>💬 WhatsApp Support</span>
        <span>⚡ Fast Delivery</span>
      </div>
    </motion.div>

    {/* RIGHT */}

    <motion.div
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.8 }}
      className="relative"
    >
      <div className="relative rounded-[24px] border border-white/10 bg-[#111111] p-3 shadow-[0_0_80px_rgba(250,204,21,0.08)]">

        {/* Floating Label */}

        <div className="absolute top-5 right-5 z-20">
          <span className="rounded-full bg-black/70 backdrop-blur-md border border-white/10 px-4 py-2 text-xs text-yellow-400">
            {projects[current].title}
          </span>
        </div>

        {/* Browser Top */}

        <div className="flex gap-2 mb-3">
          <div className="h-3 w-3 rounded-full bg-red-500" />
          <div className="h-3 w-3 rounded-full bg-yellow-500" />
          <div className="h-3 w-3 rounded-full bg-green-500" />
        </div>

        <div className="overflow-hidden rounded-xl">

          <AnimatePresence mode="wait">

            <motion.div
              key={projects[current].image}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Image
                src={projects[current].image}
                alt={projects[current].title}
                width={1200}
                height={800}
                priority
                className="w-full h-auto rounded-xl object-cover"
              />
            </motion.div>

          </AnimatePresence>

        </div>

        {/* Indicators */}

        <div className="mt-4 flex justify-center gap-2">
          {projects.map((_, index) => (
            <div
              key={index}
              className={`h-2 rounded-full transition-all duration-300 ${
                current === index
                  ? "w-8 bg-yellow-400"
                  : "w-2 bg-neutral-600"
              }`}
            />
          ))}
        </div>

      </div>
    </motion.div>

  </div>
</section>


);
}
