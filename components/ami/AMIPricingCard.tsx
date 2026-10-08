"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { AMIPricingBlock } from "@/lib/ami/types";

type AMIPricingCardProps = {
  block: AMIPricingBlock;
};

export default function AMIPricingCard({
  block,
}: AMIPricingCardProps) {
  const isCustom =
    block.price === null ||
    block.price === undefined ||
    block.priceLabel
      ?.toLowerCase()
      .includes("custom");

  return (
    <div className="mt-4 overflow-hidden rounded-2xl border border-[#FFD400]/20 bg-[#FFD400]/[0.045]">
      <div className="p-5">
        <p className="mb-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-[#FFD400]">
          Pricing
        </p>

        <h3 className="text-base font-semibold text-white sm:text-lg">
          {block.title}
        </h3>

        <div className="mt-3">
          {isCustom ? (
            <p className="text-xl font-bold text-[#FFD400]">
              Let&apos;s discuss
            </p>
          ) : (
            <p className="text-2xl font-bold text-[#FFD400]">
              ₹{Number(block.price).toLocaleString("en-IN")}
            </p>
          )}

          {block.priceLabel && (
            <p className="mt-1 text-xs text-white/50">
              {block.priceLabel}
            </p>
          )}
        </div>

        {block.description && (
          <p className="mt-3 text-sm leading-6 text-white/65">
            {block.description}
          </p>
        )}

        <div className="mt-5">
          <Link
            href="/start-a-project"
            className="inline-flex items-center gap-2 rounded-xl bg-[#FFD400] px-4 py-2.5 text-sm font-semibold text-black transition hover:bg-[#ffe14d] focus:outline-none focus:ring-2 focus:ring-[#FFD400]/50"
          >
            Discuss This
            <ArrowRight size={15} />
          </Link>
        </div>
      </div>
    </div>
  );
}