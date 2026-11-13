"use client";

/* eslint-disable @next/next/no-img-element */

import Link from "next/link";
import { ArrowRight, Clock } from "lucide-react";
import type { AMIBlogBlock } from "@/lib/ami/types";

export default function AMIBlogCard({ block }: { block: AMIBlogBlock }) {
  const href =
    typeof block.href === "string" &&
    /^\/blog\/[a-z0-9]+(?:-[a-z0-9]+)*\/?$/i.test(block.href)
      ? block.href
      : "/blog";

  return (
    <article className="group relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-[#151515] via-[#0c0c0c] to-[#080808] transition duration-300 hover:border-[#FFD400]/35">
      {block.imageUrl && (
        <div className="relative aspect-[16/8] w-full overflow-hidden border-b border-white/[0.07]">
          <img
            src={block.imageUrl}
            alt={block.title}
            loading="lazy"
            className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.03]"
          />
        </div>
      )}

      <div className="p-5">
        <div className="flex flex-wrap items-center gap-3 text-[10px] font-bold uppercase tracking-[0.15em] text-[#FFD400]">
          {block.category && <span>{block.category}</span>}

          {typeof block.readingTime === "number" && (
            <span className="inline-flex items-center gap-1 font-medium normal-case tracking-normal text-white/40">
              <Clock size={12} />
              {block.readingTime} min read
            </span>
          )}
        </div>

        <h3 className="mt-2 text-base font-bold leading-snug text-white">{block.title}</h3>

        {block.excerpt && (
          <p className="mt-2 line-clamp-3 text-sm leading-6 text-white/55">{block.excerpt}</p>
        )}

        <Link
          href={href}
          className="mt-4 inline-flex min-h-10 items-center gap-2 rounded-xl border border-[#FFD400]/25 bg-[#FFD400]/[0.07] px-4 py-2 text-sm font-semibold text-[#FFD400] transition hover:bg-[#FFD400]/[0.14]"
        >
          Read article
          <ArrowRight size={15} />
        </Link>
      </div>
    </article>
  );
}