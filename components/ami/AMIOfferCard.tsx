"use client";

import Link from "next/link";
import { ArrowRight, Copy, Tag } from "lucide-react";
import type { AMIOfferBlock } from "@/lib/ami/types";

type AMIOfferCardProps = {
  block: AMIOfferBlock;
};

export default function AMIOfferCard({
  block,
}: AMIOfferCardProps) {
  const href = block.slug
    ? `/offers/${encodeURIComponent(block.slug)}`
    : "/offers";

  return (
    <div className="mt-4 overflow-hidden rounded-2xl border border-[#FFD400]/25 bg-gradient-to-br from-[#FFD400]/10 via-white/[0.035] to-transparent">
      <div className="p-5">
        <div className="flex items-start justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-[#FFD400]/20 bg-[#FFD400]/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.12em] text-[#FFD400]">
              <Tag size={12} />
              {block.badge || "Special Offer"}
            </div>

            <h3 className="mt-3 text-base font-semibold text-white sm:text-lg">
              {block.title}
            </h3>
          </div>

          {block.discountLabel && (
            <div className="shrink-0 text-right">
              <p className="text-xl font-black text-[#FFD400] sm:text-2xl">
                {block.discountLabel}
              </p>
            </div>
          )}
        </div>

        {(typeof block.originalPrice === "number" ||
          typeof block.offerPrice === "number") && (
          <div className="mt-4 flex items-end gap-3">
            {typeof block.originalPrice === "number" && (
              <span className="text-sm text-white/35 line-through">
                ₹{block.originalPrice.toLocaleString("en-IN")}
              </span>
            )}

            {typeof block.offerPrice === "number" && (
              <span className="text-2xl font-bold text-white">
                ₹{block.offerPrice.toLocaleString("en-IN")}
              </span>
            )}
          </div>
        )}

        {block.couponCode && (
          <div className="mt-4 inline-flex items-center gap-2 rounded-xl border border-dashed border-[#FFD400]/30 bg-black/20 px-3 py-2">
            <Copy
              size={14}
              className="text-[#FFD400]"
            />

            <span className="text-xs text-white/50">
              Coupon
            </span>

            <span className="font-mono text-sm font-semibold tracking-wide text-[#FFD400]">
              {block.couponCode}
            </span>
          </div>
        )}

        <div className="mt-5 flex flex-wrap gap-2">
          <Link
            href={href}
            className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/[0.05] px-4 py-2.5 text-sm font-medium text-white transition hover:border-[#FFD400]/30 hover:bg-[#FFD400]/10 hover:text-[#FFD400]"
          >
            View Offer
            <ArrowRight size={15} />
          </Link>

          <Link
            href={
              block.slug
                ? `/start-a-project?offer=${encodeURIComponent(
                    block.slug
                  )}`
                : "/start-a-project"
            }
            className="inline-flex items-center gap-2 rounded-xl bg-[#FFD400] px-4 py-2.5 text-sm font-semibold text-black transition hover:bg-[#ffe14d] focus:outline-none focus:ring-2 focus:ring-[#FFD400]/50"
          >
            Claim Offer
            <ArrowRight size={15} />
          </Link>
        </div>
      </div>
    </div>
  );
}