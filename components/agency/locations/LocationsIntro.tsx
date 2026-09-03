"use client";

import Link from "next/link";
import { ArrowUpRight, MapPin } from "lucide-react";
import { motion } from "framer-motion";

export default function LocationsIntro() {
  return (
    <motion.div
      initial={{
        opacity: 0,
        y: 20,
      }}
      whileInView={{
        opacity: 1,
        y: 0,
      }}
      viewport={{
        once: true,
        amount: 0.25,
      }}
      transition={{
        duration: 0.55,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="max-w-xl"
    >
      {/* EYEBROW */}
      <div className="flex items-center gap-3">
        <span
          aria-hidden="true"
          className="flex h-7 w-7 items-center justify-center rounded-full border border-[#292929] bg-[#0D0D0D] text-[#FFC400]"
        >
          <MapPin
            aria-hidden="true"
            size={13}
          />
        </span>

        <span className="text-[10px] font-medium uppercase tracking-[0.2em] text-[#FFC400]">
          Where we work
        </span>
      </div>

      {/* HEADING */}
      <h2
        id="locations-heading"
        className="mt-6 text-[clamp(2.5rem,5vw,4.7rem)] font-semibold leading-[0.94] tracking-[-0.055em] text-[#F5F5F5]"
      >
        Web development
        <span className="block text-[#FFC400]">
          from Shimla. Beyond.
        </span>
      </h2>

      {/* DESCRIPTION */}
      <p className="mt-6 max-w-md text-sm leading-7 text-[#858585] sm:text-base sm:leading-7">
        Aman Digital Solutions is based in Shimla, Himachal
        Pradesh, and works with businesses across the region,
        throughout India and remotely beyond. We build modern
        websites and digital solutions around where your
        business and customers are.
      </p>

      {/* LOCATION SIGNAL */}
      <div className="mt-9 border-y border-[#202020] py-4">
        <div className="flex items-center gap-3">
          <span
            aria-hidden="true"
            className="h-1.5 w-1.5 shrink-0 rounded-full bg-[#FFC400] shadow-[0_0_12px_rgba(255,196,0,0.5)]"
          />

          <p className="text-[10px] uppercase tracking-[0.16em] text-[#555]">
            Shimla · Himachal Pradesh · India · Remote
          </p>
        </div>
      </div>

      {/* CTA */}
      <Link
        href="/start-a-project"
        className="group mt-7 inline-flex items-center gap-2 text-sm font-medium text-[#D8D8D8] transition-colors duration-200 hover:text-[#FFC400] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FFC400]"
      >
        Start a project

        <span className="flex h-7 w-7 items-center justify-center rounded-full border border-[#292929] transition-all duration-200 group-hover:border-[#FFC400]/40 group-hover:bg-[#FFC400]/10">
          <ArrowUpRight
            aria-hidden="true"
            size={14}
            className="transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
          />
        </span>
      </Link>
    </motion.div>
  );
}