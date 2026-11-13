"use client";

/* eslint-disable @next/next/no-img-element */

import Link from "next/link";
import { ArrowRight, ExternalLink, FolderKanban, TrendingUp } from "lucide-react";
import type { AMIProjectBlock } from "@/lib/ami/types";

type Props = { block: AMIProjectBlock };

export default function AMIProjectCard({ block }: Props) {
  const slug = block.slug?.trim();

  const projectHref =
    typeof block.href === "string" &&
    /^\/projects\/[a-z0-9]+(?:-[a-z0-9]+)*\/?$/i.test(block.href)
      ? block.href
      : slug
        ? `/projects/${encodeURIComponent(slug)}`
        : "/projects";

  return (
    <article className="group relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-[#151515] via-[#0c0c0c] to-[#080808] transition duration-300 hover:border-[#FFD400]/35">
      {block.imageUrl && (
        <div className="relative aspect-[16/9] w-full overflow-hidden border-b border-white/[0.07]">
          <img
            src={block.imageUrl}
            alt={block.title}
            loading="lazy"
            className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.03]"
          />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#0c0c0c]/80 via-transparent to-transparent" />
        </div>
      )}

      <div className="relative p-5 sm:p-6">
        <div className="flex items-start gap-3">
          {!block.imageUrl && (
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border border-[#FFD400]/20 bg-[#FFD400]/10 text-[#FFD400]">
              <FolderKanban size={21} />
            </div>
          )}

          <div className="min-w-0">
            <p className="text-[10px] font-bold uppercase tracking-[0.17em] text-[#FFD400]">
              {block.industry || "Project"}
            </p>
            <h3 className="mt-1 text-lg font-bold leading-snug text-white sm:text-xl">
              {block.title}
            </h3>
          </div>
        </div>

        {block.description && (
          <p className="mt-3 text-sm leading-6 text-white/60">{block.description}</p>
        )}

        {block.results && block.results.length > 0 && (
          <div className="mt-4 flex flex-wrap gap-2">
            {block.results.map((result) => (
              <span
                key={result}
                className="inline-flex items-center gap-1.5 rounded-lg border border-emerald-400/20 bg-emerald-400/[0.07] px-2.5 py-1.5 text-xs font-semibold text-emerald-300"
              >
                <TrendingUp size={12} />
                {result}
              </span>
            ))}
          </div>
        )}

        {block.technologies && block.technologies.length > 0 && (
          <div className="mt-3 flex flex-wrap gap-1.5">
            {block.technologies.map((tech) => (
              <span
                key={tech}
                className="rounded-md border border-white/10 bg-white/[0.04] px-2 py-1 text-[11px] text-white/55"
              >
                {tech}
              </span>
            ))}
          </div>
        )}

        <div className="mt-5 flex flex-col gap-2 sm:flex-row">
          <Link
            href={projectHref}
            className="inline-flex min-h-11 flex-1 items-center justify-center gap-2 rounded-xl bg-[#FFD400] px-4 py-3 text-sm font-bold text-black transition hover:bg-[#ffe14d] focus:outline-none focus:ring-2 focus:ring-[#FFD400]/60"
          >
            View case study
            <ArrowRight size={16} />
          </Link>

          {block.liveUrl && (
            <a
              href={block.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3 text-sm font-semibold text-white transition hover:border-[#FFD400]/30 hover:text-[#FFD400]"
            >
              Live site
              <ExternalLink size={14} />
            </a>
          )}
        </div>
      </div>
    </article>
  );
}