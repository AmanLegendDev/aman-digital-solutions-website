"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

import {
  NAV_CTA,
  NAV_ITEMS,
  NAV_START_PROJECT,
  NAV_WHATSAPP,
} from "./NavItems";

type DesktopNavProps = {
  scrolled: boolean;
};

export default function DesktopNav({
  scrolled,
}: DesktopNavProps) {
  return (
    <div
      className={[
        "mx-auto hidden h-[82px] max-w-7xl items-center",
        "rounded-full border px-5 md:flex",
        "bg-[#0A0A0A]/90 backdrop-blur-2xl",
        "transition-all duration-300",

        scrolled
          ? "border-[#FFC400]/20 shadow-[0_16px_50px_rgba(0,0,0,0.45)]"
          : "border-[#252525]",
      ].join(" ")}
    >
      {/* BRAND */}
      <Link
        href="/"
        aria-label="Aman Digital Solutions home"
        className="group flex shrink-0 items-center rounded-2xl outline-none focus-visible:ring-2 focus-visible:ring-[#FFC400]"
      >
        <Image
          src="/logo.png"
          alt="Aman Digital Solutions"
          width={170}
          height={48}
          priority
          className="h-11 w-auto shrink-0 object-contain transition-transform duration-200 group-hover:scale-[1.02]"
        />

        <div className="ml-3 flex flex-col justify-center">
          <span className="text-[14px] font-semibold leading-[1.1] tracking-[-0.015em] text-white">
            Aman Digital Solutions
          </span>

          <span className="mt-1.5 text-[8px] font-medium leading-none tracking-[0.045em] text-neutral-500">
            Digital solutions that mean business.
          </span>
        </div>
      </Link>

      {/* NAVIGATION */}
      <nav
        aria-label="Main navigation"
        className="mx-auto flex items-center gap-0.5"
      >
        {NAV_ITEMS.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="
              group relative rounded-full
              px-3.5 py-2.5
              text-[12px] font-medium
              text-[#A1A1A1]
              transition-colors duration-200
              hover:text-white
              focus-visible:outline-none
              focus-visible:ring-2
              focus-visible:ring-[#FFC400]
            "
          >
            {item.label}

            <span
              className="
                absolute bottom-1
                left-1/2 h-px w-0
                -translate-x-1/2
                bg-[#FFC400]
                transition-all duration-200
                group-hover:w-3/5
              "
            />
          </Link>
        ))}
      </nav>

      {/* RIGHT ACTIONS */}
      <div className="flex shrink-0 items-center gap-2">
        {/* WHATSAPP */}
        <a
          href={NAV_WHATSAPP}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Chat on WhatsApp"
          className="
            inline-flex h-10 w-10
            items-center justify-center
            rounded-full
            border border-[#292929]
            bg-[#111111]
            text-[#A1A1A1]
            transition-all duration-200
            hover:border-[#FFC400]/40
            hover:bg-[#151515]
            hover:text-[#FFC400]
            focus-visible:outline-none
            focus-visible:ring-2
            focus-visible:ring-[#FFC400]
          "
        >
          <span className="text-[12px] font-bold">
            WA
          </span>
        </a>

        {/* CTA */}
        <Link
          href={NAV_CTA.href}
          className="
            group inline-flex shrink-0
            items-center gap-1.5
            rounded-full
            bg-[#FFC400]
            px-5 py-3
            text-xs font-semibold
            text-black
            transition-all duration-200
            hover:bg-[#FFD43B]
            hover:shadow-[0_0_28px_rgba(255,196,0,0.2)]
            focus-visible:outline-none
            focus-visible:ring-2
            focus-visible:ring-[#FFC400]
            focus-visible:ring-offset-2
            focus-visible:ring-offset-[#0A0A0A]
          "
        >
          {NAV_CTA.label}

          <ArrowUpRight
            size={14}
            className="
              transition-transform duration-200
              group-hover:-translate-y-0.5
              group-hover:translate-x-0.5
            "
          />
        </Link>
      </div>
    </div>
  );
}