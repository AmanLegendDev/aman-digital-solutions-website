"use client";
import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 20);
    }
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.nav
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.45 }}
      className={`fixed w-full z-50 ${
        scrolled
          ? "bg-black/90 border-b border-neutral-800"
          : "bg-black/40"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        
        {/* LOGO */}
        <Link href="/" className="flex items-center gap-3">
          <Image src="/logo.png" width={44} height={44} alt="logo" />
          <span className="text-lg font-bold text-yellow-300">Aman Digital Solutions</span>
        </Link>

        {/* DESKTOP MENU */}
        <div className="hidden md:flex items-center gap-8 text-neutral-200">
          <Link href="/features" className="hover:text-yellow-300">Features</Link>
          <Link href="/demo" className="hover:text-yellow-300">Demo</Link>
          <Link href="/pricing" className="hover:text-yellow-300">Pricing</Link>
          <Link href="/about" className="hover:text-yellow-300">About</Link>
          <Link href="/contact" className="hover:text-yellow-300">Contact</Link>

          <Link
            href="/demo"
            className="bg-yellow-400 text-black px-4 py-2 rounded-lg shadow hover:bg-yellow-300 transition"
          >
            View Demo
          </Link>
        </div>

        {/* MOBILE ICON */}
        <button
          onClick={() => setOpen(true)}
          className="md:hidden text-yellow-300 text-2xl"
        >
          ☰
        </button>
      </div>

      {/* MOBILE SIDEBAR */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/70 z-50"
          >
            <motion.div
              initial={{ x: 260 }}
              animate={{ x: 0 }}
              exit={{ x: 260 }}
              transition={{ type: "tween", duration: 0.3 }}
              className="absolute right-0 w-72 h-full bg-[#0e0e0e] p-6 shadow-xl"
            >
              <button
                onClick={() => setOpen(false)}
                className="text-white text-2xl mb-6"
              >
                ✕
              </button>

              <div className="flex flex-col gap-5 text-neutral-200 text-lg">
                <Link href="/features" onClick={() => setOpen(false)} className="hover:text-yellow-300">Features</Link>
                <Link href="/demo" onClick={() => setOpen(false)} className="hover:text-yellow-300">Demo</Link>
                <Link href="/pricing" onClick={() => setOpen(false)} className="hover:text-yellow-300">Pricing</Link>
                <Link href="/about" onClick={() => setOpen(false)} className="hover:text-yellow-300">About</Link>
                <Link href="/contact" onClick={() => setOpen(false)} className="hover:text-yellow-300">Contact</Link>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
