"use client";

import { useEffect, useState } from "react";
import { Menu } from "lucide-react";

import DesktopNav from "./DesktopNav";
import MobileNav from "./MobileNav";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 24);
    };

    handleScroll();

    window.addEventListener("scroll", handleScroll, {
      passive: true,
    });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    if (!menuOpen) {
      document.body.style.overflow = "";
      return;
    }

    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  useEffect(() => {
    if (!menuOpen) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setMenuOpen(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [menuOpen]);

  return (
    <>
      <header
        className={[
          "fixed left-1/2 top-3 z-50 w-[calc(100%-1.5rem)]",
          "-translate-x-1/2 sm:top-4 sm:w-[calc(100%-2rem)]",
        ].join(" ")}
      >
        <DesktopNav scrolled={scrolled} />

        {/* MOBILE HEADER */}
        <div
          className={[
            "flex h-[58px] items-center justify-between",
            "rounded-full border px-3",
            "bg-[#0A0A0A]/90 backdrop-blur-xl",
            "transition-all duration-300 md:hidden",
            scrolled
              ? "border-[#FFC400]/15 shadow-[0_12px_40px_rgba(0,0,0,0.4)]"
              : "border-[#252525]",
          ].join(" ")}
        >
          {/* MOBILE LOGO */}
       {/* MOBILE BRAND */}
<a
  href="#home"
  onClick={() => setMenuOpen(false)}
  aria-label="Aman Digital Solutions home"
  className="group flex min-w-0 items-center rounded-2xl outline-none focus-visible:ring-2 focus-visible:ring-[#FFC400]"
>
  <img
    src="/logo.png"
    alt="Aman Digital Solutions"
    className="h-8 w-auto shrink-0 object-contain transition-transform duration-200 group-hover:scale-[1.02]"
  />

  <div className="ml-2.5 flex min-w-0 flex-col justify-center">
    <span className="truncate text-[11px] font-semibold leading-[1.1] tracking-[-0.01em] text-white">
      Aman Digital Solutions
    </span>

    <span className="mt-1 truncate text-[7px] font-medium leading-none tracking-[0.025em] text-neutral-500">
      Digital solutions that mean business.
    </span>
  </div>
</a>

          

          {/* HAMBURGER */}
          <button
            type="button"
            onClick={() => setMenuOpen(true)}
            aria-label="Open navigation menu"
            aria-expanded={menuOpen}
            aria-controls="mobile-navigation"
            className="flex h-10 w-10 items-center justify-center rounded-full border border-[#292929] bg-[#111111] text-[#F5F5F5] transition-all duration-200 hover:border-[#FFC400]/40 hover:text-[#FFC400] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FFC400]"
          >
            <Menu size={20} />
          </button>
        </div>
      </header>

      <MobileNav
        open={menuOpen}
        onClose={() => setMenuOpen(false)}
      />
    </>
  );
}