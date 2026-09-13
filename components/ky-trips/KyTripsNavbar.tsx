
"use client";

import Image from "next/image";
import Link from "next/link";
import { Menu, ArrowUpRight } from "lucide-react";

const NAV_ITEMS = [
  { label: "Home", href: "#home" },
  { label: "Buy", href: "#buy" },
  { label: "Sell", href: "#sell" },
  { label: "Properties", href: "#properties" },
  { label: "Services", href: "#services" },
  { label: "About", href: "#about" },
  { label: "Contact", href: "#contact" },
];

export default function KyTripsNavbar() {
  return (
    <header className="absolute left-0 right-0 top-0 z-50 px-3 pt-3 sm:px-6 sm:pt-4 lg:px-8 lg:pt-6">
      <nav
        aria-label="Main navigation"
        className="
          mx-auto flex w-full max-w-7xl items-center justify-between
          rounded-full border border-white/15
          bg-[#071A33]/80
          px-3 py-2.5
          shadow-[0_18px_60px_rgba(0,0,0,0.22)]
          backdrop-blur-xl
          sm:px-5 sm:py-3.5
          lg:px-6
        "
      >
        {/* Brand */}
        <Link
          href="#home"
          aria-label="KY-TRIPS home"
          className="
            group flex min-w-0 items-center gap-2.5
            rounded-full
            outline-none
            focus-visible:ring-2
            focus-visible:ring-[#D6B36A]
            focus-visible:ring-offset-2
            focus-visible:ring-offset-[#071A33]
            sm:gap-3
          "
        >
          {/* Logo */}
          <div
            className="
              relative flex h-10 w-10 shrink-0 items-center justify-center
              overflow-hidden rounded-full
              border border-[#D6B36A]/50
              bg-white
              shadow-[0_0_24px_rgba(214,179,106,0.12)]
              sm:h-11 sm:w-11
            "
          >
            <Image
              src="/ky.png"
              alt="KY-TRIPS"
              fill
              sizes="44px"
              className="object-contain p-1"
              priority
            />
          </div>

          {/* Brand */}
          <div className="min-w-0">
            {/* Brand Name */}
            <p
              className="
                truncate
                font-serif
                text-[14px]
                font-semibold
                leading-none
                tracking-[-0.02em]
                text-white
                sm:text-[17px]
              "
            >
              KY-TRIPS
            </p>

            {/* Brand Tagline */}
            <p
              className="
                mt-1
                whitespace-nowrap
                text-[6.5px]
                font-medium
                uppercase
                leading-none
                tracking-[0.16em]
                text-white/45
                sm:text-[8px]
                sm:tracking-[0.22em]
              "
            >
              PROPERTY · INVESTMENT · ADVISORY
            </p>
          </div>

          <span className="sr-only">KY-TRIPS</span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden items-center lg:flex">
          <div className="flex items-center gap-1 rounded-full bg-white/[0.035] p-1">
            {NAV_ITEMS.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="
                  rounded-full px-4 py-2.5
                  text-[13px] font-medium
                  tracking-[-0.01em]
                  text-white/65
                  transition-all duration-300
                  hover:bg-white/[0.07]
                  hover:text-white
                  focus-visible:outline-none
                  focus-visible:ring-2
                  focus-visible:ring-[#D6B36A]
                "
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>

        {/* Desktop CTA */}
        <div className="hidden lg:block">
          <Link
            href="#contact"
            className="
              group inline-flex items-center gap-2
              rounded-full
              border border-[#D6B36A]/70
              bg-[#D6B36A]
              px-5 py-3
              text-[13px] font-semibold
              text-[#071A33]
              shadow-[0_8px_28px_rgba(214,179,106,0.18)]
              transition-all duration-300
              hover:-translate-y-0.5
              hover:bg-[#e3c47f]
              hover:shadow-[0_12px_34px_rgba(214,179,106,0.28)]
              focus-visible:outline-none
              focus-visible:ring-2
              focus-visible:ring-[#D6B36A]
              focus-visible:ring-offset-2
              focus-visible:ring-offset-[#071A33]
            "
          >
            Get in Touch

            <ArrowUpRight
              size={15}
              strokeWidth={2}
              className="
                transition-transform duration-300
                group-hover:translate-x-0.5
                group-hover:-translate-y-0.5
              "
            />
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          type="button"
          aria-label="Open navigation menu"
          aria-expanded="false"
          className="
            flex h-9 w-9 shrink-0 items-center justify-center
            rounded-full
            border border-white/15
            bg-white/[0.05]
            text-white
            transition-all duration-300
            hover:border-[#D6B36A]/60
            hover:bg-[#D6B36A]
            hover:text-[#071A33]
            focus-visible:outline-none
            focus-visible:ring-2
            focus-visible:ring-[#D6B36A]
            sm:h-10 sm:w-10
            lg:hidden
          "
        >
          <Menu size={19} strokeWidth={1.8} />
        </button>
      </nav>
    </header>
  );
}

