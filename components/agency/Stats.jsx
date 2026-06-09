"use client";

import { motion } from "framer-motion";

const stats = [
{
value: "20+",
label: "Projects Delivered",
},
{
value: "100%",
label: "Mobile Responsive",
},
{
value: "24/7",
label: "Support Available",
},
{
value: "Fast",
label: "Performance Optimized",
},
];

export default function Stats() {
return ( <section className="py-12 md:py-16 bg-[#0A0A0A]"> <div className="max-w-7xl mx-auto px-6">


    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      className="text-center mb-10"
    >
      <h2 className="text-3xl md:text-4xl font-bold text-white">
        Trusted By Local Businesses
      </h2>

      <p className="text-neutral-400 mt-3 max-w-2xl mx-auto">
        Professional websites and digital solutions built
        with performance, design and business growth in mind.
      </p>
    </motion.div>

    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">

      {stats.map((item, index) => (
        <motion.div
          key={item.label}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{
            duration: 0.5,
            delay: index * 0.08,
          }}
          className="rounded-2xl border border-white/10 bg-[#111111] p-6 md:p-8"
        >
          <h3 className="text-4xl md:text-5xl font-bold text-yellow-400">
            {item.value}
          </h3>

          <p className="mt-3 text-neutral-400 text-sm md:text-base">
            {item.label}
          </p>
        </motion.div>
      ))}

    </div>

  </div>
</section>


);
}
