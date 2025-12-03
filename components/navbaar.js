"use client";

import Link from "next/link";
import { useState } from "react";
import Image from "next/image";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <nav className="w-full border-b border-neutral-200 bg-white sticky top-0 z-50 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">

        {/* Logo + Brand */}
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
          <Link href="/features" className="hover:text-green-600 transition">Features</Link>
          <Link href="/demo" className="hover:text-green-600 transition">Demo</Link>
          <Link href="/pricing" className="hover:text-green-600 transition">Pricing</Link>
          <Link href="/about" className="hover:text-green-600 transition">About</Link>
          <Link href="/contact" className="hover:text-green-600 transition">Contact</Link>

          <Link
            href="/demo"
            className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition shadow-sm"
          >
            View Demo
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setOpen(true)}
          className="md:hidden text-black text-3xl focus:outline-none"
        >
          ☰
        </button>
      </div>

      {/* 🔥 Mobile Slide Menu (Right Side Drawer) */}
      <div
        className={`fixed inset-0 bg-black/40 backdrop-blur-sm transition-opacity duration-300 ${
          open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setOpen(false)}
      ></div>

      <div
        className={`fixed top-0 right-0 h-full w-72 bg-white shadow-xl p-6 z-50 transform transition-transform duration-300 ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Close Button */}
        <button
          onClick={() => setOpen(false)}
          className="text-black text-2xl mb-6"
        >
          ✕
        </button>

        <div className="flex flex-col gap-4 text-black font-medium">

          <Link href="/features" className="hover:text-green-600 transition" onClick={() => setOpen(false)}>
            Features
          </Link>

          <Link href="/demo" className="hover:text-green-600 transition" onClick={() => setOpen(false)}>
            Demo
          </Link>

          <Link href="/pricing" className="hover:text-green-600 transition" onClick={() => setOpen(false)}>
            Pricing
          </Link>

          <Link href="/about" className="hover:text-green-600 transition" onClick={() => setOpen(false)}>
            About
          </Link>

          <Link href="/contact" className="hover:text-green-600 transition" onClick={() => setOpen(false)}>
            Contact
          </Link>

          <Link
            href="/demo"
            className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition shadow-sm w-fit"
            onClick={() => setOpen(false)}
          >
            View Demo
          </Link>
        </div>
      </div>
    </nav>
  );
}
