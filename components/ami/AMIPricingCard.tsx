"use client";

import Link from "next/link";
import { ArrowRight, Check, CheckCircle2, MessageCircle } from "lucide-react";
import type { AMIPricingBlock } from "@/lib/ami/types";

type Props = { block: AMIPricingBlock };

export default function AMIPricingCard({ block }: Props) {
  const formattedPrice =
    typeof block.price === "number" && Number.isFinite(block.price) && block.price >= 0
      ? block.price.toLocaleString("en-IN")
      : null;

  const isCustom =
    formattedPrice === null || block.priceLabel?.toLowerCase().includes("custom quote") === true;

  return (
    <article className="group relative overflow-hidden rounded-3xl border border-[#FFD400]/20 bg-gradient-to-br from-[#15140c] via-[#0b0b0b] to-[#090909] shadow-[0_12px_40px_rgba(255,212,0,0.04)] transition duration-300 hover:border-[#FFD400]/45">
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

        <div className="mt-3">
          {isCustom ? (
            <p className="text-2xl font-black text-[#FFD400] sm:text-3xl">Let&apos;s discuss</p>
          ) : (
            <p className="text-3xl font-black tracking-tight text-[#FFD400] sm:text-4xl">
              ₹{formattedPrice}
            </p>
          )}

          {block.priceLabel && (
            <p className="mt-1.5 text-xs leading-5 text-white/45">{block.priceLabel}</p>
          )}
        </div>

        {block.description && (
          <p className="mt-3 text-sm leading-6 text-white/60">{block.description}</p>
        )}

        {block.features && block.features.length > 0 && (
          <ul className="mt-4 space-y-2">
            {block.features.map((feature) => (
              <li key={feature} className="flex items-start gap-2 text-sm text-white/70">
                <Check size={15} className="mt-0.5 shrink-0 text-[#FFD400]" />
                <span>{feature}</span>
              </li>
            ))}
          </ul>
        )}

        <div className="mt-5 flex flex-col gap-2 sm:flex-row">
          <Link
            href="/start-a-project"
            className="inline-flex min-h-11 flex-1 items-center justify-center gap-2 rounded-xl bg-[#FFD400] px-4 py-3 text-sm font-bold text-black transition hover:bg-[#ffe14d] focus:outline-none focus:ring-2 focus:ring-[#FFD400]/60"
          >
            Discuss your project
            <ArrowRight size={16} />
          </Link>

          <Link
            href="/contact"
            className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3 text-sm font-semibold text-white transition hover:border-[#FFD400]/30 hover:text-[#FFD400]"
          >
            <MessageCircle size={15} />
            Contact us
          </Link>
        </div>
      </div>
    </article>
  );
}