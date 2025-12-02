"use client";

import Link from "next/link";
import { useState } from "react";
import Image from "next/image";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <nav className="w-full border-b border-neutral-200 bg-white sticky top-0 z-50 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">

        {/* Logo + Brand Name */}
        <Link href="/" className="flex items-center gap-3">
          <Image
            src="/logo.png"
            alt="ADS Logo"
            width={48}
            height={48}
            className="opacity-90"
            priority
          />
          <span className="text-xl font-semibold text-green-600 tracking-wide">
            Aman Digital Solutions
          </span>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-8 text-black font-medium">

          <Link href="/features" className="hover:text-green-600 transition">
            Features
          </Link>

          <Link href="/demo" className="hover:text-green-600 transition">
            Demo
          </Link>

          <Link href="/pricing" className="hover:text-green-600 transition">
            Pricing
          </Link>

          <Link href="/about" className="hover:text-green-600 transition">
            About
          </Link>

          <Link href="/contact" className="hover:text-green-600 transition">
            Contact
          </Link>

          <Link
            href="/demo"
            className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition shadow-sm"
          >
            View Demo
          </Link>
        </div>

        {/* Mobile Menu Toggle */}
        <button
          onClick={() => setOpen(!open)}
          className="md:hidden text-black text-3xl focus:outline-none"
        >
          {open ? "✕" : "☰"}
        </button>
      </div>

      {/* Mobile Menu */}
      {open && (
        <div className="md:hidden bg-white shadow-md px-6 pb-6 space-y-3 text-black font-medium">

          <Link href="/features" className="block hover:text-green-600 transition">
            Features
          </Link>

          <Link href="/demo" className="block hover:text-green-600 transition">
            Demo
          </Link>

          <Link href="/pricing" className="block hover:text-green-600 transition">
            Pricing
          </Link>

          <Link href="/about" className="block hover:text-green-600 transition">
            About
          </Link>

          <Link href="/contact" className="block hover:text-green-600 transition">
            Contact
          </Link>

          <Link
            href="/demo"
            className="block bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition w-fit mt-2"
          >
            View Demo
          </Link>
        </div>
      )}
    </nav>
  );
}
