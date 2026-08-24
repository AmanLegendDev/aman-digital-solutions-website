"use client";

import { Edit3 } from "lucide-react";
import type { ReactNode } from "react";

type Props = {
  number: string;
  title: string;
  onEdit: () => void;
  children: ReactNode;
};

export default function ReviewSection({
  number,
  title,
  onEdit,
  children,
}: Props) {
  return (
    <section className="rounded-2xl border border-white/[0.08] bg-[#0D0D0D] p-5 sm:p-6">
      {/* HEADER */}
      <div className="mb-5 flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-[#FFC400]/10 text-[10px] font-semibold text-[#FFC400]">
            {number}
          </span>

          <h3 className="text-sm font-semibold text-white">
            {title}
          </h3>
        </div>

        <button
          type="button"
          onClick={onEdit}
          className="inline-flex items-center gap-1.5 rounded-lg border border-white/[0.07] px-3 py-2 text-xs font-medium text-neutral-500 transition hover:border-[#FFC400]/30 hover:text-[#FFC400]"
        >
          <Edit3 size={13} />
          Edit
        </button>
      </div>

      {/* CONTENT */}
      <div className="space-y-3">
        {children}
      </div>
    </section>
  );
}