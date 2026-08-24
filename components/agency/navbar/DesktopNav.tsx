"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

import { NAV_CTA, NAV_ITEMS } from "./NavItems";

type DesktopNavProps = {
  scrolled: boolean;
};

export default function DesktopNav({
  scrolled,
}: DesktopNavProps) {
  return (
    <div
      className={[
        "mx-auto hidden h-[72px] max-w-7xl items-center",
        "rounded-full border px-4 md:flex",
        "bg-[#0A0A0A]/85 backdrop-blur-xl",
        "transition-all duration-300",
        scrolled
          ? "border-[#FFC400]/15 shadow-[0_12px_40px_rgba(0,0,0,0.35)]"
          : "border-[#252525]",
      ].join(" ")}
    >
      {/* BRAND */}
      <Link
        href="#home"
        aria-label="Aman Digital Solutions home"
        className="group flex shrink-0 items-center rounded-2xl outline-none focus-visible:ring-2 focus-visible:ring-[#FFC400]"
      >
        {/* LOGO */}
        <Image
          src="/logo.png"
          alt="Aman Digital Solutions"
          width={150}
          height={42}
          priority
          className="h-9 w-auto shrink-0 object-contain transition-transform duration-200 group-hover:scale-[1.02]"
        />

        {/* BRAND TEXT */}
        <div className="ml-2.5 flex flex-col justify-center">
          <span className="text-[13px] font-semibold leading-[1.1] tracking-[-0.01em] text-white">
            Aman Digital Solutions
          </span>

          <span className="mt-1 text-[8px] font-medium leading-none tracking-[0.04em] text-neutral-500">
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
            className="group relative rounded-full px-3 py-2 text-[12px] font-medium text-[#A1A1A1] transition-colors duration-200 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FFC400]"
          >
            {item.label}

            <span
              className={[
                "absolute bottom-1 left-1/2 h-px w-0",
                "-translate-x-1/2 bg-[#FFC400]",
                "transition-all duration-200",
                "group-hover:w-3/5",
              ].join(" ")}
            />
          </Link>
        ))}
      </nav>

      {/* CTA */}
      <Link
        href={NAV_CTA.href}
        className="group inline-flex shrink-0 items-center gap-1.5 rounded-full bg-[#FFC400] px-4 py-2.5 text-xs font-semibold text-black transition-all duration-200 hover:bg-[#FFD43B] hover:shadow-[0_0_24px_rgba(255,196,0,0.18)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FFC400] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0A0A0A]"
      >
        {NAV_CTA.label}

        <ArrowUpRight
          size={14}
          className="transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
        />
      </Link>
    </div>
  );
}