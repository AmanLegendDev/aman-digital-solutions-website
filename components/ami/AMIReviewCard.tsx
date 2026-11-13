"use client";

import { Quote, Star } from "lucide-react";
import type { AMIReviewBlock } from "@/lib/ami/types";

export default function AMIReviewCard({ block }: { block: AMIReviewBlock }) {
  const rating = typeof block.rating === "number" ? Math.round(block.rating) : 0;
  const byline = [block.role, block.company].filter(Boolean).join(" · ");

  return (
    <article className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-[#151515] via-[#0c0c0c] to-[#080808] p-5 transition duration-300 hover:border-[#FFD400]/35 sm:p-6">
      <div className="pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full bg-[#FFD400]/[0.05] blur-3xl" />

      <Quote size={22} className="relative text-[#FFD400]/60" />

      <p className="relative mt-3 text-sm leading-7 text-white/75">{block.quote}</p>

      {rating > 0 && (
        <div className="relative mt-4 flex gap-0.5" aria-label={`${rating} out of 5 stars`}>
          {Array.from({ length: 5 }).map((_, i) => (
            <Star
              key={i}
              size={14}
              className={i < rating ? "fill-[#FFD400] text-[#FFD400]" : "text-white/20"}
            />
          ))}
        </div>
      )}

      <div className="relative mt-3">
        <p className="text-sm font-semibold text-white">{block.name}</p>
        {(byline || block.location) && (
          <p className="text-xs text-white/45">
            {byline}
            {block.location ? `${byline ? " · " : ""}${block.location}` : ""}
          </p>
        )}
      </div>
    </article>
  );
}