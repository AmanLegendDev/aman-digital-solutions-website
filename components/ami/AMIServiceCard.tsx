"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { AMIServiceBlock } from "@/lib/ami/types";

type AMIServiceCardProps = {
  block: AMIServiceBlock;
};

export default function AMIServiceCard({
  block,
}: AMIServiceCardProps) {
  const href = block.slug
    ? `/services/${encodeURIComponent(block.slug)}`
    : "/services";

  const price =
    typeof block.startingPrice === "number"
      ? `Starting from ₹${block.startingPrice.toLocaleString("en-IN")}`
      : block.priceLabel || "Custom pricing";

  return (
    <div className="mt-4 overflow-hidden rounded-2xl border border-white/10 bg-white/[0.035]">
      <div className="p-5">
        <div className="mb-4 flex items-start justify-between gap-4">
          <div>
            <p className="mb-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-[#FFD400]">
              Service
            </p>

            <h3 className="text-base font-semibold text-white sm:text-lg">
              {block.title}
            </h3>
          </div>

          <div className="shrink-0 rounded-full border border-[#FFD400]/20 bg-[#FFD400]/10 px-3 py-1 text-xs font-medium text-[#FFD400]">
            {price}
          </div>
        </div>

        {block.description && (
          <p className="text-sm leading-6 text-white/65">
            {block.description}
          </p>
        )}

        <div className="mt-5 flex flex-wrap gap-2">
          <Link
            href={href}
            className="inline-flex items-center gap-2 rounded-xl bg-[#FFD400] px-4 py-2.5 text-sm font-semibold text-black transition hover:bg-[#ffe14d] focus:outline-none focus:ring-2 focus:ring-[#FFD400]/50"
          >
            View Service
            <ArrowRight size={15} />
          </Link>

          <Link
            href="/start-a-project"
            className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/[0.04] px-4 py-2.5 text-sm font-medium text-white transition hover:border-white/20 hover:bg-white/[0.08]"
          >
            Start Project
          </Link>
        </div>
      </div>
    </div>
  );
}