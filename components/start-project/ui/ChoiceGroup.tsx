"use client";

import { Check, ChevronDown } from "lucide-react";

type Props = {
  label: string;
  options: readonly (readonly [string, string])[];
  value: string;
  onChange: (value: string) => void;
};

export default function ChoiceGroup({
  label,
  options,
  value,
  onChange,
}: Props) {
  return (
    <div className="mt-7">
      {/* LABEL */}
      <div className="mb-3 flex items-center justify-between">
        <label className="text-sm font-medium text-white">
          {label}
        </label>

        {value && (
          <span className="text-[10px] font-medium uppercase tracking-[0.14em] text-[#FFC400]">
            Selected
          </span>
        )}
      </div>

      {/* OPTIONS */}
      <div className="grid gap-2 sm:grid-cols-2">
        {options.map(([optionValue, text]) => {
          const selected = value === optionValue;

          return (
            <button
              key={optionValue}
              type="button"
              onClick={() => onChange(optionValue)}
              aria-pressed={selected}
              className={[
                "group relative flex min-h-[58px] items-center",
                "justify-between gap-4 rounded-xl border px-4",
                "text-left transition-all duration-200",
                "focus:outline-none focus:ring-2",
                "focus:ring-[#FFC400]/30",

                selected
                  ? [
                      "border-[#FFC400]/60",
                      "bg-[#FFC400]/[0.07]",
                      "shadow-[0_0_0_1px_rgba(255,196,0,0.08)]",
                    ].join(" ")
                  : [
                      "border-white/[0.07]",
                      "bg-[#0B0B0B]",
                      "hover:border-white/[0.16]",
                      "hover:bg-[#101010]",
                    ].join(" "),
              ].join(" ")}
            >
              {/* LEFT */}
              <div className="flex min-w-0 items-center gap-3">
                {/* INDICATOR */}
                <span
                  className={[
                    "flex h-5 w-5 shrink-0 items-center justify-center",
                    "rounded-full border transition-all duration-200",
                    selected
                      ? "border-[#FFC400] bg-[#FFC400] text-black"
                      : "border-white/[0.16] bg-transparent text-transparent group-hover:border-white/30",
                  ].join(" ")}
                >
                  {selected && <Check size={11} strokeWidth={3} />}
                </span>

                {/* TEXT */}
                <span
                  className={[
                    "truncate text-sm transition-colors",
                    selected
                      ? "font-medium text-white"
                      : "text-neutral-400 group-hover:text-neutral-200",
                  ].join(" ")}
                >
                  {text}
                </span>
              </div>

              {/* ARROW */}
              <ChevronDown
                size={14}
                className={[
                  "shrink-0 transition-all duration-200",
                  selected
                    ? "rotate-[-90deg] text-[#FFC400]"
                    : "text-neutral-700 group-hover:text-neutral-500",
                ].join(" ")}
              />
            </button>
          );
        })}
      </div>
    </div>
  );
}