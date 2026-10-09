"use client";

import Link from "next/link";
import { ArrowRight, CheckCircle2, Layers3 } from "lucide-react";
import type { AMIServiceBlock } from "@/lib/ami/types";

type AMIServiceCardProps = {
  block: AMIServiceBlock;
};

export default function AMIServiceCard({ block }: AMIServiceCardProps) {
  const slug = block.slug?.trim();

  const serviceHref =
    typeof block.href === "string" &&
    /^\/services\/[a-z0-9]+(?:-[a-z0-9]+)*\/?$/i.test(block.href)
      ? block.href
      : slug
        ? `/services/${encodeURIComponent(slug)}`
        : "/services";

  const price =
    typeof block.startingPrice === "number"
      ? `From ₹${block.startingPrice.toLocaleString("en-IN")}`
      : block.priceLabel || "Custom pricing";

  return (
    <article className="group relative mt-4 overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-[#151515] via-[#0b0b0b] to-[#080808] transition duration-300 hover:border-[#FFD400]/40">
      <div className="pointer-events-none absolute -right-10 -top-10 h-36 w-36 rounded-full bg-[#FFD400]/[0.05] blur-3xl transition group-hover:bg-[#FFD400]/[0.10]" />

      <div className="relative p-5 sm:p-6">
        <div className="flex items-start justify-between gap-3">
          <div className="flex min-w-0 items-start gap-3">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border border-[#FFD400]/20 bg-[#FFD400]/10 text-[#FFD400]">
              <Layers3 size={21} />
            </div>

            <div className="min-w-0">
              <p className="text-[10px] font-bold uppercase tracking-[0.17em] text-[#FFD400]">
                Our service
              </p>

              <h3 className="mt-1 text-lg font-bold leading-snug text-white sm:text-xl">
                {block.title}
              </h3>
            </div>
          </div>
        </div>

        <div className="mt-4 inline-flex max-w-full items-center gap-2 rounded-xl border border-[#FFD400]/20 bg-[#FFD400]/[0.07] px-3 py-2 text-xs font-semibold text-[#FFD400]">
          <CheckCircle2 size={14} className="shrink-0" />
          <span>{price}</span>
        </div>

        {block.description && (
          <p className="mt-4 text-sm leading-6 text-white/60">
            {block.description}
          </p>
        )}

        <div className="mt-5 flex flex-col gap-2 sm:flex-row">
          <Link
            href={serviceHref}
            className="inline-flex min-h-11 flex-1 items-center justify-center gap-2 rounded-xl bg-[#FFD400] px-4 py-3 text-sm font-bold text-black transition hover:bg-[#ffe14d] focus:outline-none focus:ring-2 focus:ring-[#FFD400]/60"
          >
            Explore service
            <ArrowRight size={16} />
          </Link>

          <Link
            href="/start-a-project"
            className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3 text-sm font-semibold text-white transition hover:border-[#FFD400]/30 hover:bg-[#FFD400]/[0.06] hover:text-[#FFD400]"
          >
            Get started
            <ArrowRight size={14} />
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