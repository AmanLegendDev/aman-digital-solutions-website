"use client";

import Image from "next/image";
import { motion } from "framer-motion";

const stats = [

];

export default function About() {
return ( <section id="about" className="py-12 md:py-16 bg-[#0A0A0A]"> <div className="max-w-7xl mx-auto px-6">


    <div className="grid lg:grid-cols-2 gap-10 md:gap-16 items-center">

      {/* LEFT IMAGE */}

<motion.div
  initial={{ opacity: 0, x: -30 }}
  whileInView={{ opacity: 1, x: 0 }}
  viewport={{ once: true }}
  className="relative flex justify-center items-end h-[320px] md:h-[500px]"
>
  <div className="absolute w-[220px] h-[220px] md:w-[380px] md:h-[380px] bg-yellow-500/10 blur-[120px] rounded-full" />

  <div className="relative w-full h-full rounded-3xl">
<Image
  src="/founder.png"
  alt="Aman Ansari"
  fill
  priority
  className="
    object-cover
    rounded-[32px]
    border border-white/10
    shadow-[0_0_40px_rgba(250,204,21,0.12)]
  "
/>
  </div>
</motion.div>

      {/* RIGHT CONTENT */}

      <motion.div
        initial={{ opacity: 0, x: 30 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        className="order-2"
      >
        <div className="inline-flex px-4 py-2 rounded-full border border-yellow-500/20 bg-yellow-500/5 text-yellow-400 text-sm mb-5">
          About The Founder
        </div>

        <h2 className="text-3xl md:text-5xl font-bold text-white leading-tight">
          Building Modern Digital
          <span className="block text-yellow-400">
            Solutions For Local Businesses
          </span>
        </h2>

        <p className="text-neutral-400 mt-5 leading-relaxed">
          Hi, I'm <span className="text-white font-medium">Aman Ansari</span>,
          founder of Aman Digital Solutions based in Dhalli, Shimla.
        </p>

        <p className="text-neutral-400 mt-4 leading-relaxed">
          My mission is simple — help small businesses compete with bigger
          brands online through modern websites, digital solutions and
          professional customer experiences.
        </p>

        <p className="text-neutral-400 mt-4 leading-relaxed">
          Founded in 2025, Aman Digital Solutions focuses on helping local
          businesses build trust, improve visibility and grow through
          professional digital experiences.
        </p>

        {/* BADGES */}

        <div className="flex flex-wrap gap-3 mt-7">

          <div className="px-4 py-2 rounded-full bg-white/5 border border-white/10 text-sm text-neutral-300">
            📍 Shimla, Himachal Pradesh
          </div>

          <div className="px-4 py-2 rounded-full bg-white/5 border border-white/10 text-sm text-neutral-300">
            ✅ Udyam Registered
          </div>

          <div className="px-4 py-2 rounded-full bg-white/5 border border-white/10 text-sm text-neutral-300">
            🏢 Founded 2025
          </div>

        </div>

        {/* STATS */}

        <div className="grid grid-cols-2 gap-4 mt-8">

          {stats.map((item) => (
            <div
              key={item.label}
              className="rounded-2xl border border-white/10 bg-[#111111] p-5"
            >
              <h3 className="text-2xl md:text-3xl font-bold text-yellow-400">
                {item.value}
              </h3>

              <p className="text-neutral-400 text-sm mt-2">
                {item.label}
              </p>
            </div>
          ))}

        </div>

        {/* CONTACT STRIP */}

        <div className="flex flex-wrap gap-4 mt-8 text-sm text-neutral-400">

          <span>
            📞 8219174058
          </span>

          <span>
            📍 Dhalli, Shimla
          </span>

          <span>
            UDYAM-HP-09-0033862
          </span>

        </div>

      </motion.div>

    </div>

  </div>
</section>


);
}
