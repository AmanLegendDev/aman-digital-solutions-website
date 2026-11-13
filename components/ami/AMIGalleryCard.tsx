"use client";

/* eslint-disable @next/next/no-img-element */

import Link from "next/link";
import { ArrowRight, Images } from "lucide-react";
import type { AMIGalleryBlock } from "@/lib/ami/types";

export default function AMIGalleryCard({ block }: { block: AMIGalleryBlock }) {
  const images = block.images.slice(0, 6);

  const projectHref =
    typeof block.href === "string" &&
    /^\/projects\/[a-z0-9]+(?:-[a-z0-9]+)*\/?$/i.test(block.href)
      ? block.href
      : null;

  return (
    <article className="group relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-[#151515] via-[#0c0c0c] to-[#080808] p-4 transition duration-300 hover:border-[#FFD400]/35 sm:p-5">
      <div className="flex items-center gap-2.5">
        <span className="flex h-9 w-9 items-center justify-center rounded-xl border border-[#FFD400]/20 bg-[#FFD400]/10 text-[#FFD400]">
          <Images size={17} />
        </span>

        <div className="min-w-0">
          <p className="text-[10px] font-bold uppercase tracking-[0.17em] text-[#FFD400]">
            Gallery
          </p>
          <h3 className="truncate text-base font-bold text-white">{block.title}</h3>
        </div>
      </div>

      <div className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-3">
        {images.map((image, index) => (
          <div
            key={`${image.url}-${index}`}
            className="relative aspect-[4/3] overflow-hidden rounded-xl border border-white/[0.07] bg-white/[0.03]"
          >
            <img
              src={image.url}
              alt={image.title || block.title}
              loading="lazy"
              className="h-full w-full object-cover transition duration-500 hover:scale-105"
            />
          </div>
        ))}
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        {projectHref && (
          <Link
            href={projectHref}
            className="inline-flex min-h-10 items-center gap-2 rounded-xl bg-[#FFD400] px-4 py-2 text-sm font-bold text-black transition hover:bg-[#ffe14d]"
          >
            View project
            <ArrowRight size={15} />
          </Link>
        )}

        <Link
          href="/gallery"
          className="inline-flex min-h-10 items-center gap-2 rounded-xl border border-white/10 bg-white/[0.04] px-4 py-2 text-sm font-semibold text-white transition hover:border-[#FFD400]/30 hover:text-[#FFD400]"
        >
          Open gallery
          <ArrowRight size={14} />
        </Link>
      </div>
    </article>
  );
}