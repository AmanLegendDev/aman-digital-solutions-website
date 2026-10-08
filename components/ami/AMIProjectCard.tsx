"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { AMIProjectBlock } from "@/lib/ami/types";

type AMIProjectCardProps = {
  block: AMIProjectBlock;
};

export default function AMIProjectCard({
  block,
}: AMIProjectCardProps) {
  const projectHref = block.slug
    ? `/projects/${encodeURIComponent(block.slug)}`
    : "/projects";

  return (
    <div className="mt-4 overflow-hidden rounded-2xl border border-white/10 bg-white/[0.035]">
      <div className="p-5">
        <p className="mb-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-[#FFD400]">
          Project
        </p>

        <h3 className="text-base font-semibold text-white sm:text-lg">
          {block.title}
        </h3>

        {block.description && (
          <p className="mt-3 text-sm leading-6 text-white/65">
            {block.description}
          </p>
        )}

        <div className="mt-5">
          <Link
            href={projectHref}
            className="inline-flex items-center gap-2 rounded-xl bg-[#FFD400] px-4 py-2.5 text-sm font-semibold text-black transition hover:bg-[#ffe14d] focus:outline-none focus:ring-2 focus:ring-[#FFD400]/50"
          >
            View Project
            <ArrowRight size={15} />
          </Link>
        </div>
      </div>
    </div>
  );
}