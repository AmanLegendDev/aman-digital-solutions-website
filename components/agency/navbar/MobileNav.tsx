"use client";

import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowUpRight,
  MessageCircle,
  X,
} from "lucide-react";

import {
  NAV_CTA,
  NAV_ITEMS,
  NAV_START_PROJECT,
  NAV_WHATSAPP,
} from "./NavItems";

type MobileNavProps = {
  open: boolean;
  onClose: () => void;
};

const drawerVariants = {
  closed: {
    opacity: 0,
    y: -8,
  },
  open: {
    opacity: 1,
    y: 0,
  },
};

export default function MobileNav({
  open,
  onClose,
}: MobileNavProps) {
  return (
    <AnimatePresence>
      {open && (
        <>
          {/* BACKDROP */}
          <motion.button
            type="button"
            aria-label="Close navigation"
            onClick={onClose}
            className="
              fixed inset-0 z-[60]
              bg-black/70
              md:hidden
            "
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.12 }}
          />

          {/* DRAWER */}
          <motion.aside
            id="mobile-navigation"
            aria-label="Mobile navigation"
            initial="closed"
            animate="open"
            exit="closed"
            variants={drawerVariants}
            transition={{
              duration: 0.16,
              ease: "easeOut",
            }}
            className="
              fixed inset-x-2 top-2 bottom-2
              z-[70]
              overflow-hidden
              rounded-[26px]
              border border-[#252525]
              bg-[#080808]
              shadow-[0_25px_70px_rgba(0,0,0,0.65)]
              md:hidden
            "
          >
            <div className="flex h-full min-h-0 flex-col px-4 py-4">

              {/* TOP BAR */}
              <div className="flex shrink-0 items-center justify-between border-b border-[#202020] pb-4">

                <Link
                  href="/"
                  onClick={onClose}
                  aria-label="Aman Digital Solutions home"
                  className="
                    flex min-w-0 items-center
                    rounded-2xl
                    outline-none
                    focus-visible:ring-2
                    focus-visible:ring-[#FFC400]
                  "
                >
                  <Image
                    src="/logo.png"
                    alt="Aman Digital Solutions"
                    width={145}
                    height={42}
                    priority
                    className="h-9 w-auto shrink-0 object-contain"
                  />

                  <div className="ml-2.5 min-w-0">
                    <span className="block truncate text-[12px] font-semibold leading-tight tracking-[-0.015em] text-white">
                      Aman Digital Solutions
                    </span>

                    <span className="mt-1 block truncate text-[7px] font-medium leading-none tracking-[0.025em] text-neutral-500">
                      Digital solutions that mean business.
                    </span>
                  </div>
                </Link>

                {/* CLOSE */}
                <button
                  type="button"
                  onClick={onClose}
                  aria-label="Close navigation menu"
                  className="
                    flex h-10 w-10 shrink-0
                    items-center justify-center
                    rounded-full
                    border border-[#292929]
                    bg-[#111111]
                    text-[#A1A1A1]
                    transition-colors duration-150
                    hover:border-[#FFC400]/40
                    hover:text-[#FFC400]
                    focus-visible:outline-none
                    focus-visible:ring-2
                    focus-visible:ring-[#FFC400]
                  "
                >
                  <X size={18} />
                </button>
              </div>

              {/* NAVIGATION */}
              <nav
                aria-label="Mobile navigation"
                className="
                  min-h-0
                  flex-1
                  overflow-y-auto
                  py-4
                  overscroll-contain
                "
              >
                <div className="space-y-0.5">
                  {NAV_ITEMS.map((item, index) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={onClose}
                      className="
                        group flex
                        min-h-[48px]
                        items-center
                        justify-between
                        rounded-xl
                        px-3
                        py-2.5
                        transition-colors duration-150
                        hover:bg-[#111111]
                        focus-visible:outline-none
                        focus-visible:ring-2
                        focus-visible:ring-[#FFC400]
                      "
                    >
                      <div className="flex min-w-0 items-center gap-3.5">
                        <span
                          className="
                            w-5 shrink-0
                            text-[9px]
                            font-medium
                            tabular-nums
                            text-[#444]
                            transition-colors
                            group-hover:text-[#FFC400]
                          "
                        >
                          {String(index + 1).padStart(2, "0")}
                        </span>

                        <span
                          className="
                            truncate
                            text-[18px]
                            font-medium
                            tracking-[-0.02em]
                            text-[#D8D8D8]
                            transition-colors
                            group-hover:text-white
                          "
                        >
                          {item.label}
                        </span>
                      </div>

                      <ArrowUpRight
                        size={16}
                        className="
                          shrink-0
                          text-[#3F3F3F]
                          transition-colors duration-150
                          group-hover:text-[#FFC400]
                        "
                      />
                    </Link>
                  ))}
                </div>
              </nav>

              {/* BOTTOM ACTIONS */}
              <div className="shrink-0 border-t border-[#202020] pt-3">

                <div className="grid grid-cols-2 gap-2">

                  {/* WHATSAPP */}
                  <a
                    href={NAV_WHATSAPP}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={onClose}
                    className="
                      flex h-11 items-center
                      justify-center gap-2
                      rounded-xl
                      border border-[#292929]
                      bg-[#111111]
                      px-3
                      text-[11px] font-semibold
                      text-neutral-300
                      transition-colors duration-150
                      hover:border-[#FFC400]/40
                      hover:text-[#FFC400]
                    "
                  >
                    <MessageCircle size={15} />
                    WhatsApp
                  </a>

                  {/* START PROJECT */}
                  <Link
                    href={NAV_START_PROJECT.href}
                    onClick={onClose}
                    className="
                      flex h-11 items-center
                      justify-center gap-2
                      rounded-xl
                      bg-[#FFC400]
                      px-3
                      text-[11px] font-semibold
                      text-black
                      transition-colors duration-150
                      hover:bg-[#FFD43B]
                    "
                  >
                    {NAV_START_PROJECT.label}

                    <ArrowUpRight size={14} />
                  </Link>

                </div>

                {/* LET'S TALK */}
                <Link
                  href={NAV_CTA.href}
                  onClick={onClose}
                  className="
                    mt-2
                    flex h-12
                    items-center
                    justify-between
                    rounded-xl
                    bg-[#FFC400]
                    px-4
                    text-xs font-semibold
                    text-black
                    transition-colors duration-150
                    hover:bg-[#FFD43B]
                    focus-visible:outline-none
                    focus-visible:ring-2
                    focus-visible:ring-[#FFC400]
                  "
                >
                  <span>{NAV_CTA.label}</span>

                  <span className="flex h-8 w-8 items-center justify-center rounded-full bg-black/10">
                    <ArrowUpRight size={16} />
                  </span>
                </Link>
              </div>
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}