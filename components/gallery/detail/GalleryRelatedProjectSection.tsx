import Link from "next/link";
import {
  ArrowRight,
  ExternalLink,
  FolderKanban,
} from "lucide-react";

import type { GalleryDetailProject } from "./GalleryDetailPage";

/* =========================================================
   PROPS
========================================================= */

type GalleryRelatedProjectSectionProps = {
  project: GalleryDetailProject;
};

/* =========================================================
   COMPONENT
========================================================= */

export default function GalleryRelatedProjectSection({
  project,
}: GalleryRelatedProjectSectionProps) {
  return (
    <section className="relative overflow-hidden border-t border-white/[0.06] bg-[#050505] py-16 sm:py-20 lg:py-24">
      {/* =====================================================
          BACKGROUND
      ===================================================== */}

      <div
        aria-hidden="true"
        className="pointer-events-none absolute right-[-180px] top-1/2 h-[360px] w-[360px] -translate-y-1/2 rounded-full bg-[#FFC400]/[0.025] blur-[120px]"
      />

      <div className="relative mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
        <div className="overflow-hidden rounded-[2rem] border border-white/[0.07] bg-[#080808]">
          <div className="grid lg:grid-cols-[1fr_auto] lg:items-center">
            {/* =================================================
                CONTENT
            ================================================= */}

            <div className="p-7 sm:p-9 lg:p-12">
              {/* EYEBROW */}

              <div className="flex items-center gap-3">
                <span className="flex h-9 w-9 items-center justify-center rounded-xl border border-[#FFC400]/15 bg-[#FFC400]/[0.04] text-[#FFC400]">
                  <FolderKanban
                    size={15}
                    strokeWidth={1.5}
                  />
                </span>

                <span className="text-[9px] font-semibold uppercase tracking-[0.2em] text-[#FFC400]">
                  Related project
                </span>
              </div>

              {/* TITLE */}

              <h2 className="mt-6 max-w-2xl text-3xl font-semibold tracking-[-0.045em] text-white sm:text-4xl">
                {project.title}
              </h2>

              <p className="mt-3 max-w-xl text-sm leading-7 text-neutral-700">
                This gallery is part of the project
                above. Explore the complete case study,
                process and final digital experience.
              </p>
            </div>

            {/* =================================================
                ACTION
            ================================================= */}

            <div className="border-t border-white/[0.06] p-7 sm:p-9 lg:border-l lg:border-t-0 lg:p-12">
              <Link
                href={`/projects/${project.slug}`}
                className="group inline-flex w-full items-center justify-center gap-3 rounded-xl bg-[#FFC400] px-6 py-3.5 text-xs font-semibold text-black transition-all duration-300 hover:bg-[#FFD23D] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FFC400] lg:w-auto"
              >
                View project

                <ArrowRight
                  size={15}
                  className="transition-transform duration-300 group-hover:translate-x-1"
                />
              </Link>

              {/* SECONDARY DETAIL */}

              <div className="mt-4 flex items-center justify-center gap-2 text-[8px] font-medium uppercase tracking-[0.13em] text-neutral-800 lg:justify-end">
                <ExternalLink size={9} />

                Full case study
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}