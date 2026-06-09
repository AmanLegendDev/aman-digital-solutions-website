"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

const projects = [
{
title: "Hans Jewellers",
image: "/projects/hans.webp",
link: "https://hansjwellers.vercel.app/",
category: "Luxury Jewellery Website",
description:
"Premium jewellery website concept designed with a luxury black and gold experience for modern jewellery brands.",
},
{
title: "Veloura Bakery",
image: "/projects/veloura.webp",
link: "https://velourabakery.vercel.app/",
category: "Premium Bakery Website",
description:
"Modern bakery website showcasing cakes, custom orders and premium product presentation.",
},
{
title: "OneBite QR",
image: "/projects/onebite.webp",
link: "https://onebite-menu.vercel.app/",
category: "Restaurant QR Ordering System",
description:
"Digital QR ordering system built for restaurants to simplify ordering and improve customer experience.",
},
];

export default function Portfolio() {
return ( <section id="portfolio" className="py-12 md:py-16 bg-[#0A0A0A]"> <div className="max-w-7xl mx-auto px-6">

    {/* Heading */}

    <div className="text-center mb-16">
      <div className="inline-flex px-4 py-2 rounded-full border border-yellow-500/20 bg-yellow-500/5 text-yellow-400 text-sm mb-5">
        Portfolio
      </div>

      <h2 className="text-3xl md:text-5xl font-bold text-white">
        Selected Projects &
        <span className="block text-yellow-400">
          Digital Solutions
        </span>
      </h2>

      <p className="text-neutral-400 mt-5 max-w-2xl mx-auto">
        A showcase of websites and digital products designed
        for local businesses across multiple industries.
      </p>
    </div>

    {/* Projects */}

    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">

      {projects.map((project, index) => (
        <motion.a
          key={project.title}
          href={project.link}
          target="_blank"
          rel="noopener noreferrer"
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{
            delay: index * 0.08,
          }}
          className="group rounded-[28px] border border-white/10 bg-[#111111] overflow-hidden hover:border-yellow-500/30 transition-all duration-300"
        >
          <div className="overflow-hidden">
            <Image
              src={project.image}
              alt={project.title}
              width={1200}
              height={900}
              className="w-full transition duration-700 group-hover:scale-105"
            />
          </div>

          <div className="p-6">

            <p className="text-yellow-400 text-sm">
              {project.category}
            </p>

            <h3 className="text-xl font-semibold text-white mt-2">
              {project.title}
            </h3>

            <p className="text-neutral-400 text-sm mt-3 leading-relaxed">
              {project.description}
            </p>

            <div className="mt-6 flex items-center gap-2 text-white font-medium">
              View Project

              <ArrowUpRight
                size={18}
                className="group-hover:translate-x-1 group-hover:-translate-y-1 transition"
              />
            </div>

          </div>
        </motion.a>
      ))}

    </div>

  </div>
</section>


);
}
