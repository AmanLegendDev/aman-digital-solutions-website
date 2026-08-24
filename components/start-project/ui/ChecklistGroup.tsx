"use client";

import { Check, ChevronDown } from "lucide-react";
import { useState } from "react";

type Props = {
  title: string;
  items: readonly string[];
  selected: string[];
  onToggle: (value: string) => void;
};

export default function ChecklistGroup({
  title,
  items,
  selected,
  onToggle,
}: Props) {
  const [open, setOpen] = useState(false);

  return (
    <section className="mt-7 overflow-hidden rounded-2xl border border-white/[0.07] bg-[#0A0A0A]">
      {/* HEADER */}
      <button
        type="button"
        onClick={() => setOpen((current) => !current)}
        aria-expanded={open}
        className="group flex w-full items-center justify-between gap-4 px-4 py-4 text-left transition hover:bg-white/[0.015] sm:px-5"
      >
        <div className="min-w-0">
          <div className="flex items-center gap-2.5">
            <span className="text-sm font-medium text-white">
              {title}
            </span>

            {selected.length > 0 && (
              <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-[#FFC400] px-1.5 text-[10px] font-bold text-black">
                {selected.length}
              </span>
            )}
          </div>

          <p className="mt-1 text-xs text-neutral-600">
            {selected.length > 0
              ? `${selected.length} selected`
              : "Optional — select everything you need"}
          </p>
        </div>

        <ChevronDown
          size={17}
          className={[
            "shrink-0 text-neutral-600 transition-transform duration-200",
            open ? "rotate-180 text-[#FFC400]" : "",
          ].join(" ")}
        />
      </button>

      {/* CONTENT */}
      {open && (
        <div className="border-t border-white/[0.06] px-4 pb-4 pt-3 sm:px-5">
          <div className="grid gap-2 sm:grid-cols-2">
            {items.map((item) => {
              const active = selected.includes(item);

              return (
                <button
                  key={item}
                  type="button"
                  onClick={() => onToggle(item)}
                  aria-pressed={active}
                  className={[
                    "group flex min-h-[50px] items-center gap-3",
                    "rounded-xl border px-3.5 text-left",
                    "transition-all duration-200",
                    "focus:outline-none focus:ring-2",
                    "focus:ring-[#FFC400]/20",

                    active
                      ? [
                          "border-[#FFC400]/50",
                          "bg-[#FFC400]/[0.06]",
                        ].join(" ")
                      : [
                          "border-white/[0.06]",
                          "bg-[#0D0D0D]",
                          "hover:border-white/[0.14]",
                          "hover:bg-[#111111]",
                        ].join(" "),
                  ].join(" ")}
                >
                  {/* CHECKBOX */}
                  <span
                    className={[
                      "flex h-4 w-4 shrink-0 items-center justify-center",
                      "rounded-[5px] border transition-all duration-150",
                      active
                        ? "border-[#FFC400] bg-[#FFC400] text-black"
                        : "border-white/[0.15] bg-transparent group-hover:border-white/30",
                    ].join(" ")}
                  >
                    {active && (
                      <Check
                        size={10}
                        strokeWidth={3}
                      />
                    )}
                  </span>

                  {/* ITEM */}
                  <span
                    className={[
                      "text-xs leading-5 transition-colors",
                      active
                        ? "font-medium text-white"
                        : "text-neutral-500 group-hover:text-neutral-300",
                    ].join(" ")}
                  >
                    {item}
                  </span>
                </button>
              );
            })}
          </div>

          {/* SELECTED SUMMARY */}
          {selected.length > 0 && (
            <div className="mt-3 flex items-center justify-between border-t border-white/[0.05] pt-3">
              <span className="text-[10px] uppercase tracking-[0.14em] text-neutral-600">
                Selected
              </span>

              <span className="text-xs font-medium text-[#FFC400]">
                {selected.length} item
                {selected.length !== 1 ? "s" : ""}
              </span>
            </div>
          )}
        </div>
      )}
    </section>
  );
}