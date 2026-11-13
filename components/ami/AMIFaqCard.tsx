"use client";

import Link from "next/link";
import { ArrowRight, HelpCircle } from "lucide-react";
import type { AMIFaqBlock } from "@/lib/ami/types";

export default function AMIFaqCard({ block }: { block: AMIFaqBlock }) {
  return (
    <article className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-[#151515] via-[#0c0c0c] to-[#080808] p-5 transition duration-300 hover:border-[#FFD400]/35 sm:p-6">
      <div className="flex items-start gap-3">
        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-[#FFD400]/20 bg-[#FFD400]/10 text-[#FFD400]">
          <HelpCircle size={17} />
        </span>

        <h3 className="text-base font-bold leading-snug text-white">{block.question}</h3>
      </div>

      <p className="mt-3 whitespace-pre-wrap text-sm leading-7 text-white/65">{block.answer}</p>

      <Link
        href="/faq"
        className="mt-4 inline-flex items-center gap-2 text-xs font-medium text-white/45 transition hover:text-[#FFD400]"
      >
        More FAQs
        <ArrowRight size={13} />
      </Link>
    </article>
  );
}