"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Menu } from "lucide-react";

import DesktopNav from "./DesktopNav";
import MobileNav from "./MobileNav";

export default function Navbar() {
  const [scrolled, setScrolled] =
    useState(false);

  const [menuOpen, setMenuOpen] =
    useState(false);

  /* =========================================================
     SCROLL STATE
  ========================================================= */

 useEffect(() => {
  let ticking = false;

  const handleScroll = () => {
    if (ticking) return;

    ticking = true;

    window.requestAnimationFrame(() => {
      setScrolled(window.scrollY > 24);
      ticking = false;
    });
  };

  handleScroll();

  window.addEventListener("scroll", handleScroll, {
    passive: true,
  });

  return () => {
    window.removeEventListener("scroll", handleScroll);
  };
}, []);

  /* =========================================================
     LOCK BODY WHEN MOBILE MENU IS OPEN
  ========================================================= */

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

  /* =========================================================
     ESCAPE TO CLOSE
  ========================================================= */

  useEffect(() => {
    if (!menuOpen) return;

    const handleKeyDown = (
      event: KeyboardEvent
    ) => {
      if (event.key === "Escape") {
        setMenuOpen(false);
      }
    };

    window.addEventListener(
      "keydown",
      handleKeyDown
    );

    return () => {
      window.removeEventListener(
        "keydown",
        handleKeyDown
      );
    };
  }, [menuOpen]);

  return (
    <>
      {/* =====================================================
          HEADER
      ===================================================== */}

      <header
        className="
          fixed
          left-1/2
          top-3
          z-50
          w-[calc(100%-1.5rem)]
          -translate-x-1/2
          sm:top-4
          sm:w-[calc(100%-2rem)]
        "
      >
        {/* ===================================================
            DESKTOP NAV
        =================================================== */}

        <DesktopNav
          scrolled={scrolled}
        />

        {/* ===================================================
            MOBILE HEADER
        =================================================== */}

        <div
          className={[
            "flex h-[62px] items-center",
            "justify-between",
            "rounded-full border px-3",
            "bg-[#0A0A0A]/90",
            "backdrop-blur-2xl",
            "transition-all duration-300",
            "md:hidden",

            scrolled
              ? "border-[#FFC400]/20 shadow-[0_14px_45px_rgba(0,0,0,0.45)]"
              : "border-[#252525]",
          ].join(" ")}
        >
          {/* =================================================
              MOBILE BRAND
          ================================================= */}

          <Link
            href="/"
            onClick={() =>
              setMenuOpen(false)
            }
            aria-label="Aman Digital Solutions home"
            className="
              group
              flex
              min-w-0
              items-center
              rounded-2xl
              outline-none
              focus-visible:ring-2
              focus-visible:ring-[#FFC400]
            "
          >
            {/* LOGO */}

            <img
              src="/logo.png"
              alt="Aman Digital Solutions"
              className="
                h-9
                w-auto
                shrink-0
                object-contain
                transition-transform
                duration-200
                group-hover:scale-[1.02]
              "
            />

            {/* BRAND TEXT hai bht jyadad */}

           <div
  className="
    ml-3
    flex
    min-w-0
    flex-col
    justify-center
  "
>
  <span
    className="
      truncate
      text-[13px]
      font-semibold
      leading-[1.1]
      tracking-[-0.015em]
      text-white
    "
  >
    Aman Digital Solutions
  </span>

  <span
    className="
      mt-1.5
      truncate
      text-[8px]
      font-medium
      leading-none
      tracking-[0.03em]
      text-neutral-500
    "
  >
    Digital solutions that mean business.
  </span>
</div>
          </Link>

          {/* =================================================
              HAMBURGER
          ================================================= */}

          <button
            type="button"
            onClick={() =>
              setMenuOpen(true)
            }
            aria-label="Open navigation menu"
            aria-expanded={menuOpen}
            aria-controls="mobile-navigation"
            className="
              flex
              h-10
              w-10
              shrink-0
              items-center
              justify-center
              rounded-full
              border
              border-[#292929]
              bg-[#111111]
              text-[#F5F5F5]
              transition-all
              duration-200
              hover:border-[#FFC400]/40
              hover:bg-[#151515]
              hover:text-[#FFC400]
              focus-visible:outline-none
              focus-visible:ring-2
              focus-visible:ring-[#FFC400]
            "
          >
            <Menu
              size={20}
              strokeWidth={2}
            />
          </button>
        </div>
      </header>

      {/* =====================================================
          MOBILE DRAWER
      ===================================================== */}

      <MobileNav
        open={menuOpen}
        onClose={() =>
          setMenuOpen(false)
        }
      />
    </>
  );
}