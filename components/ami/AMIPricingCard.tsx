"use client";

import Link from "next/link";
import {
  ArrowRight,
  CheckCircle2,
  MessageCircle,
} from "lucide-react";
import type { AMIPricingBlock } from "@/lib/ami/types";

type AMIPricingCardProps = {
  block: AMIPricingBlock;
};

export default function AMIPricingCard({
  block,
}: AMIPricingCardProps) {
  const isCustom =
    block.price == null ||
    block.priceLabel?.toLowerCase().includes("custom") === true;

  const formattedPrice =
    typeof block.price === "number" &&
    Number.isFinite(block.price) &&
    block.price >= 0
      ? block.price.toLocaleString("en-IN")
      : null;

  return (
    <article className="group relative mt-4 overflow-hidden rounded-3xl border border-[#FFD400]/20 bg-gradient-to-br from-[#15140c] via-[#0b0b0b] to-[#090909] shadow-[0_12px_40px_rgba(255,212,0,0.04)] transition duration-300 hover:border-[#FFD400]/45">
      <div className="pointer-events-none absolute -right-12 -top-12 h-36 w-36 rounded-full bg-[#FFD400]/[0.07] blur-3xl" />

      <div className="relative p-5 sm:p-6">
        <div className="flex items-center gap-2 text-[#FFD400]">
          <span className="flex h-8 w-8 items-center justify-center rounded-xl border border-[#FFD400]/20 bg-[#FFD400]/10">
            <CheckCircle2 size={16} />
          </span>

          <span className="text-[10px] font-bold uppercase tracking-[0.17em]">
            Transparent pricing
          </span>
        </div>

        <h3 className="mt-4 text-lg font-bold leading-snug text-white sm:text-xl">
          {block.title}
        </h3>

        <div className="mt-4">
          {isCustom || formattedPrice === null ? (
            <p className="text-2xl font-black text-[#FFD400] sm:text-3xl">
              Let&apos;s discuss
            </p>
          ) : (
            <p className="text-3xl font-black tracking-tight text-[#FFD400] sm:text-4xl">
              ₹{formattedPrice}
            </p>
          )}

          {block.priceLabel && (
            <p className="mt-2 text-xs leading-5 text-white/45">
              {block.priceLabel}
            </p>
          )}
        </div>

        {block.description && (
          <p className="mt-4 text-sm leading-6 text-white/60">
            {block.description}
          </p>
        )}

        <div className="mt-5 flex flex-col gap-2 sm:flex-row">
          <Link
            href="/start-a-project"
            className="inline-flex min-h-11 flex-1 items-center justify-center gap-2 rounded-xl bg-[#FFD400] px-4 py-3 text-sm font-bold text-black transition hover:bg-[#ffe14d] focus:outline-none focus:ring-2 focus:ring-[#FFD400]/60 focus:ring-offset-2 focus:ring-offset-black"
          >
            Discuss your project
            <ArrowRight size={16} />
          </Link>

          <Link
            href="/contact"
            className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3 text-sm font-semibold text-white transition hover:border-[#FFD400]/30 hover:text-[#FFD400] focus:outline-none focus:ring-2 focus:ring-[#FFD400]/50"
          >
            <MessageCircle size={15} />
            Contact us
          </Link>
        </div>

        <div className="mt-4 border-t border-white/[0.07] pt-3">
          <Link
            href="/testimonials"
            className="inline-flex items-center gap-2 text-xs font-medium text-white/45 transition hover:text-[#FFD400]"
          >
            Read client reviews
            <ArrowRight size={13} />
          </Link>
        </div>
      </div>
    </article>
  );
}