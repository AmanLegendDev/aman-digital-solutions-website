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
    y: -12,
    scale: 0.97,
  },

  open: {
    opacity: 1,
    y: 0,
    scale: 1,
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
              cursor-default
              bg-black/75
              backdrop-blur-sm
              md:hidden
            "
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
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
              duration: 0.22,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="
              fixed inset-x-3 bottom-3 top-3
              z-[70]
              overflow-hidden
              rounded-[30px]
              border border-[#252525]
              bg-[#080808]
              shadow-[0_30px_100px_rgba(0,0,0,0.7)]
              md:hidden
            "
          >
            <div className="flex h-full min-h-0 flex-col px-5 py-5 sm:px-6 sm:py-6">
              {/* TOP BAR */}
              <div className="flex shrink-0 items-center justify-between border-b border-[#202020] pb-5">
                {/* BRAND */}
                <Link
                  href="/"
                  onClick={onClose}
                  aria-label="Aman Digital Solutions home"
                  className="
                    group flex min-w-0
                    items-center rounded-2xl
                    outline-none
                    focus-visible:ring-2
                    focus-visible:ring-[#FFC400]
                  "
                >
                  <Image
                    src="/logo.png"
                    alt="Aman Digital Solutions"
                    width={165}
                    height={46}
                    priority
                    className="
                      h-10 w-auto shrink-0
                      object-contain
                      transition-transform
                      duration-200
                      group-hover:scale-[1.02]
                    "
                  />

                <div className="ml-3 flex min-w-0 flex-col justify-center">
  <span className="truncate text-[14px] font-semibold leading-[1.1] tracking-[-0.015em] text-white">
    Aman Digital Solutions
  </span>

  <span className="mt-1.5 truncate text-[10px] font-medium leading-none tracking-[0.035em] text-neutral-500">
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
                    flex h-10 w-10
                    shrink-0 items-center
                    justify-center
                    rounded-full
                    border border-[#292929]
                    bg-[#111111]
                    text-[#A1A1A1]
                    transition duration-200
                    hover:border-[#FFC400]/40
                    hover:text-[#FFC400]
                    focus-visible:outline-none
                    focus-visible:ring-2
                    focus-visible:ring-[#FFC400]
                  "
                >
                  <X size={19} />
                </button>
              </div>

              {/* SCROLLABLE NAV */}
              <nav
                aria-label="Mobile navigation"
                className="
                  min-h-0
                  flex-1
                  overflow-y-auto
                  py-7
                  pr-1
                  scrollbar-thin
                "
              >
                <div className="space-y-1">
                  {NAV_ITEMS.map((item, index) => (
                    <motion.div
                      key={item.href}
                      initial={{
                        opacity: 0,
                        x: -16,
                      }}
                      animate={{
                        opacity: 1,
                        x: 0,
                      }}
                      exit={{
                        opacity: 0,
                        x: -8,
                      }}
                      transition={{
                        delay: 0.035 * index,
                        duration: 0.2,
                        ease: "easeOut",
                      }}
                    >
                      <Link
                        href={item.href}
                        onClick={onClose}
                        className="
                          group flex
                          items-center
                          justify-between
                          rounded-2xl
                          px-3 py-3.5
                          transition-colors
                          duration-200
                          hover:bg-[#111111]
                          focus-visible:outline-none
                          focus-visible:ring-2
                          focus-visible:ring-[#FFC400]
                        "
                      >
                        <div className="flex items-center gap-4">
                          <span className="
                            w-5
                            text-[10px]
                            font-medium
                            tabular-nums
                            text-[#555]
                            transition-colors
                            group-hover:text-[#FFC400]
                          ">
                            {String(index + 1).padStart(2, "0")}
                          </span>

                          <span className="
                            text-[21px]
                            font-medium
                            tracking-[-0.025em]
                            text-[#D8D8D8]
                            transition-colors
                            group-hover:text-white
                          ">
                            {item.label}
                          </span>
                        </div>

                        <ArrowUpRight
                          size={18}
                          className="
                            text-[#444]
                            transition-all
                            duration-200
                            group-hover:-translate-y-0.5
                            group-hover:translate-x-0.5
                            group-hover:text-[#FFC400]
                          "
                        />
                      </Link>
                    </motion.div>
                  ))}
                </div>
              </nav>

              {/* BOTTOM ACTIONS */}
              <div className="shrink-0 border-t border-[#202020] pt-4">
                <div className="grid grid-cols-2 gap-2">
                  {/* WHATSAPP */}
                  <a
                    href={NAV_WHATSAPP}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={onClose}
                    className="
                      flex items-center
                      justify-center gap-2
                      rounded-2xl
                      border border-[#292929]
                      bg-[#111111]
                      px-4 py-3.5
                      text-xs font-semibold
                      text-neutral-300
                      transition
                      hover:border-[#FFC400]/40
                      hover:text-[#FFC400]
                    "
                  >
                    <MessageCircle size={16} />
                    WhatsApp
                  </a>

                  {/* START PROJECT */}
                  <Link
                    href={NAV_START_PROJECT.href}
                    onClick={onClose}
                    className="
                      group flex
                      items-center
                      justify-center
                      gap-2
                      rounded-2xl
                      bg-[#FFC400]
                      px-4 py-3.5
                      text-xs font-semibold
                      text-black
                      transition-all
                      hover:bg-[#FFD43B]
                    "
                  >
                    {NAV_START_PROJECT.label}

                    <ArrowUpRight
                      size={15}
                      className="
                        transition-transform
                        group-hover:-translate-y-0.5
                        group-hover:translate-x-0.5
                      "
                    />
                  </Link>
                </div>

                {/* LET'S TALK */}
                <Link
                  href={NAV_CTA.href}
                  onClick={onClose}
                  className="
                    group mt-2
                    flex items-center
                    justify-between
                    rounded-2xl
                    bg-[#FFC400]
                    px-5 py-4
                    text-sm font-semibold
                    text-black
                    transition-all
                    hover:bg-[#FFD43B]
                    focus-visible:outline-none
                    focus-visible:ring-2
                    focus-visible:ring-[#FFC400]
                  "
                >
                  <span>{NAV_CTA.label}</span>

                  <span className="
                    flex h-9 w-9
                    items-center
                    justify-center
                    rounded-full
                    bg-black/10
                    transition-transform
                    group-hover:translate-x-0.5
                  ">
                    <ArrowUpRight size={17} />
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