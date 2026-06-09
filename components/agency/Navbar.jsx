"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { Menu, X, Phone, MapPin } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);

    return () =>
      window.removeEventListener(
        "scroll",
        handleScroll
      );
  }, []);

  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const navLinks = [
    {
      name: "Services",
      href: "#services",
    },
    {
      name: "Portfolio",
      href: "#portfolio",
    },
    {
      name: "About",
      href: "#about",
    },
    {
      name: "Contact",
      href: "#contact",
    },
  ];

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-black/80 backdrop-blur-xl border-b border-white/10"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6">
          <div className="h-20 flex items-center justify-between">

            {/* LOGO */}

            <a
              href="/"
              className="flex items-center gap-3"
            >
         <Image
  src="/logo.png"
  alt="ADS"
  width={64}
  height={64}
  className="object-contain w-14 h-14 md:w-16 md:h-16"
/>

              <div className="hidden sm:block">
                <h2 className="font-bold text-white">
                  Aman Digital Solutions
                </h2>

                <p className="text-xs text-neutral-400">
                  Websites & Digital Solutions
                </p>
              </div>
            </a>

            {/* DESKTOP */}

            <div className="hidden lg:flex items-center gap-8">

              {navLinks.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="text-neutral-300 hover:text-yellow-400 transition"
                >
                  {item.name}
                </a>
              ))}

            </div>

            {/* RIGHT */}

            <div className="flex items-center gap-3">

              <a
                href="#contact"
                className="hidden md:flex bg-yellow-400 text-black px-5 py-3 rounded-xl font-semibold hover:scale-105 transition"
              >
                Book Consultation
              </a>

              <button
                onClick={() =>
                  setOpen(!open)
                }
                className="h-11 w-11 rounded-xl border border-white/10 bg-[#111111] flex items-center justify-center text-white"
              >
                {open ? (
                  <X size={22} />
                ) : (
                  <Menu size={22} />
                )}
              </button>

            </div>
          </div>
        </div>
      </nav>

      {/* MOBILE MENU */}

      <AnimatePresence>

        {open && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() =>
                setOpen(false)
              }
              className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50"
            />

            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{
                type: "spring",
                damping: 24,
                stiffness: 260,
              }}
              className="fixed right-0 top-0 h-screen w-[85%] max-w-sm bg-[#0A0A0A] border-l border-white/10 z-[60]"
            >
              <div className="p-6">

                <div className="flex justify-between items-center">

                  <Image
                    src="/logo.png"
                    alt="ADS"
                    width={64}
                    height={64}
                  />

                  <div className="font-bold text-xl">Aman Digital Solutions</div>

                  <button
                    onClick={() =>
                      setOpen(false)
                    }
                    className="text-white"
                  >
                    <X />
                  </button>

                </div>

                <div className="mt-12 flex flex-col gap-5">

                  {navLinks.map((item) => (
                    <a
                      key={item.name}
                      href={item.href}
                      onClick={() =>
                        setOpen(false)
                      }
                      className="text-white text-lg border-b border-white/10 pb-4"
                    >
                      {item.name}
                    </a>
                  ))}

                </div>

                <div className="mt-12 space-y-4">

                  <div className="flex items-center gap-3 text-neutral-300">
                    <Phone size={18} />
                    8219174058
                  </div>

                  <div className="flex items-center gap-3 text-neutral-300">
                    <MapPin size={18} />
                    Dhalli, Shimla
                  </div>

                </div>

                <a
                  href="#contact"
                  onClick={() =>
                    setOpen(false)
                  }
                  className="mt-10 flex justify-center bg-yellow-400 text-black font-semibold py-4 rounded-xl"
                >
                  Book Consultation
                </a>

              </div>
            </motion.div>
          </>
        )}

      </AnimatePresence>
    </>
  );
}