"use client";

import type { ReactNode } from "react";

type Props = {
  number: string;
  title: string;
  description?: string;
  children: ReactNode;
  className?: string;
};

export default function ServiceFormSection({
  number,
  title,
  description,
  children,
  className = "",
}: Props) {
  return (
    <section
      className={[
        "relative overflow-hidden rounded-2xl border border-[#242424] bg-[#080808]",
        className,
      ].join(" ")}
    >
      {/* subtle top accent */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#FFC400]/30 to-transparent"
      />

      <div className="p-5 sm:p-7 lg:p-8">
        {/* HEADER */}
        <div className="mb-7 flex items-start gap-4">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-[#FFC400]/20 bg-[#FFC400]/[0.06] text-[11px] font-semibold text-[#FFC400]">
            {number}
          </div>

          <div className="min-w-0">
            <h2 className="text-base font-semibold tracking-[-0.01em] text-white sm:text-lg">
              {title}
            </h2>

            {description && (
              <p className="mt-1.5 max-w-3xl text-sm leading-6 text-neutral-500">
                {description}
              </p>
            )}
          </div>
        </div>

        {/* CONTENT */}
        <div className="min-w-0">{children}</div>
      </div>
    </section>
  );
}