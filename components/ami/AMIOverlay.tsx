"use client";
import Image from "next/image";
import {
  AnimatePresence,
  motion,
} from "framer-motion";
import { X } from "lucide-react";
import {
  useEffect,
  useRef,
} from "react";

import AMIChat from "./AMIChat";

type Props = {
  open: boolean;
  onClose: () => void;
};

export default function AMIOverlay({
  open,
  onClose,
}: Props) {
  const closeButtonRef =
    useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;

    const previousOverflow =
      document.body.style.overflow;

    document.body.style.overflow = "hidden";

    const handleKeyDown = (
      event: KeyboardEvent,
    ) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener(
      "keydown",
      handleKeyDown,
    );

    requestAnimationFrame(() => {
      closeButtonRef.current?.focus();
    });

    return () => {
      document.body.style.overflow =
        previousOverflow;

      document.removeEventListener(
        "keydown",
        handleKeyDown,
      );
    };
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          key="ami-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{
            duration: 0.18,
          }}
          className="
            fixed
            inset-0
            z-[100]
            flex
            min-h-[100dvh]
            flex-col
            bg-[#050505]
            text-white
          "
          role="dialog"
          aria-modal="true"
          aria-label="AMI assistant"
        >
          {/* BACKDROP / TOP BAR */}

          <div
            className="
              flex
              h-16
              shrink-0
              items-center
              justify-between
              border-b
              border-white/[0.08]
              px-4
              sm:px-6
            "
          >
            <div className="flex items-center gap-3">
             <div className="relative h-9 w-9 shrink-0 overflow-hidden rounded-full border border-[#FFC400]/50 bg-[#15110A]">
  <Image
    src="/ami.png"
    alt="AMI AI Assistant"
    fill
    sizes="36px"
    className="object-cover"
  />
</div>

              <div>
                <div className="text-sm font-semibold">
                  AMI
                </div>

                <div className="text-[11px] text-white/40">
                  Aman Digital Solutions
                </div>
              </div>
            </div>

            <button
              ref={closeButtonRef}
              type="button"
              onClick={onClose}
              aria-label="Close AMI"
              className="
                flex
                h-10
                w-10
                items-center
                justify-center
                rounded-full
                border
                border-white/10
                text-white/60
                transition
                hover:border-white/20
                hover:bg-white/[0.06]
                hover:text-white
                focus:outline-none
                focus:ring-2
                focus:ring-[#FFC400]/60
              "
            >
              <X size={19} />
            </button>
          </div>

          {/* CHAT */}

          <div className="min-h-0 flex-1">
            <AMIChat />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}