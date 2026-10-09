"use client";

import Link from "next/link";
import {
  ArrowRight,
  BadgePercent,
  Check,
  Copy,
  Sparkles,
  Tag,
} from "lucide-react";
import type { AMIOfferBlock } from "@/lib/ami/types";

type AMIOfferCardProps = {
  block: AMIOfferBlock;
};

export default function AMIOfferCard({ block }: AMIOfferCardProps) {
  const slug =
    typeof block.slug === "string" ? block.slug.trim() : "";

  const offerHref = slug
    ? `/offers/${encodeURIComponent(slug)}`
    : "/offers";

  const claimHref = slug
    ? `/start-a-project?offer=${encodeURIComponent(slug)}`
    : "/start-a-project";

  const hasPrice =
    typeof block.originalPrice === "number" ||
    typeof block.offerPrice === "number";

  return (
    <article className="group relative mt-4 overflow-hidden rounded-3xl border border-[#FFD400]/25 bg-[#0b0b0b] shadow-[0_12px_50px_rgba(255,212,0,0.06)] transition duration-300 hover:border-[#FFD400]/50">
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-[#FFD400]/[0.12] via-transparent to-transparent" />
      <div className="pointer-events-none absolute -right-12 -top-16 h-40 w-40 rounded-full bg-[#FFD400]/[0.08] blur-3xl" />

      <div className="relative p-5 sm:p-6">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <div className="inline-flex items-center gap-2 rounded-full border border-[#FFD400]/25 bg-[#FFD400]/10 px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.16em] text-[#FFD400]">
              <Sparkles size={13} />
              Exclusive offer
            </div>

            <h3 className="mt-4 text-lg font-bold leading-snug text-white sm:text-xl">
              {block.title}
            </h3>
          </div>

          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border border-[#FFD400]/20 bg-[#FFD400]/10 text-[#FFD400]">
            <BadgePercent size={22} />
          </div>
        </div>

        {block.shortDescription && (
          <p className="mt-3 text-sm leading-6 text-white/60">
            {block.shortDescription}
          </p>
        )}

        {hasPrice && (
          <div className="mt-5 flex flex-wrap items-end gap-3 rounded-2xl border border-white/[0.07] bg-white/[0.025] p-4">
            <div className="min-w-0 flex-1">
              <p className="text-[10px] font-semibold uppercase tracking-[0.15em] text-white/40">
                Offer price
              </p>

              {typeof block.offerPrice === "number" ? (
                <p className="mt-1 text-2xl font-black text-[#FFD400] sm:text-3xl">
                  ₹{block.offerPrice.toLocaleString("en-IN")}
                </p>
              ) : (
                <p className="mt-1 text-lg font-bold text-white">
                  Contact for price
                </p>
              )}
            </div>

            {typeof block.originalPrice === "number" && (
              <div className="text-right">
                <p className="text-xs text-white/35">
                  Original price
                </p>
                <p className="mt-1 text-sm text-white/45 line-through">
                  ₹{block.originalPrice.toLocaleString("en-IN")}
                </p>
              </div>
            )}
          </div>
        )}

        {block.discountLabel && (
          <div className="mt-3 inline-flex items-center gap-2 rounded-lg bg-[#FFD400]/10 px-3 py-2 text-sm font-semibold text-[#FFD400]">
            <Tag size={14} />
            {block.discountLabel}
          </div>
        )}

        {block.couponCode && (
          <div className="mt-4 flex flex-wrap items-center gap-3 rounded-xl border border-dashed border-[#FFD400]/30 bg-black/30 px-3 py-3">
            <Copy size={15} className="text-[#FFD400]" />
            <span className="text-xs text-white/50">
              Coupon code
            </span>
            <span className="font-mono text-sm font-bold tracking-wider text-[#FFD400]">
              {block.couponCode}
            </span>
          </div>
        )}

        <div className="mt-5 flex flex-col gap-2 sm:flex-row">
          <Link
            href={claimHref}
            className="inline-flex min-h-11 flex-1 items-center justify-center gap-2 rounded-xl bg-[#FFD400] px-4 py-3 text-sm font-bold text-black transition hover:bg-[#ffe14d] focus:outline-none focus:ring-2 focus:ring-[#FFD400]/60 focus:ring-offset-2 focus:ring-offset-black"
          >
            Claim this offer
            <ArrowRight size={16} />
          </Link>

          <Link
            href={offerHref}
            className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3 text-sm font-semibold text-white transition hover:border-[#FFD400]/30 hover:bg-[#FFD400]/[0.07] hover:text-[#FFD400] focus:outline-none focus:ring-2 focus:ring-[#FFD400]/50"
          >
            Offer details
            <ArrowRight size={15} />
          </Link>
        </div>

        <div className="mt-4 border-t border-white/[0.07] pt-3">
          <Link
            href="/#testimonials"
            className="inline-flex items-center gap-2 text-xs font-medium text-white/45 transition hover:text-[#FFD400]"
          >
            <Check size={14} />
            Read client reviews
            <ArrowRight size={13} />
          </Link>
        </div>
      </div>
    </article>
  );
}