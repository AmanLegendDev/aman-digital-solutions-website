"use client";

import Image from "next/image";
import Link from "next/link";
import {
  ArrowUpRight,
  ExternalLink,
  Layers3,
} from "lucide-react";

import type { ProjectCardData } from "./ProjectsPageClient";

type FeaturedProjectsSectionProps = {
  projects: ProjectCardData[];
};

export default function FeaturedProjectsSection({
  projects,
}: FeaturedProjectsSectionProps) {
 if (!projects?.length) {
    return null;
  }

  return (
    <section
      id="featured-projects"
      aria-labelledby="featured-projects-heading"
      className="relative border-b border-white/[0.06] bg-[#050505] py-20 sm:py-24 lg:py-28"
    >
      <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
        {/* =====================================================
            SECTION HEADER
        ===================================================== */}

        <div className="mb-10 flex flex-col gap-5 sm:mb-12 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <div className="flex items-center gap-3">
              <span
                aria-hidden="true"
                className="flex h-8 w-8 items-center justify-center rounded-xl border border-[#FFC400]/20 bg-[#FFC400]/[0.05] text-[#FFC400]"
              >
                <Layers3 size={14} />
              </span>

              <span className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[#FFC400]">
                Featured work
              </span>
            </div>

            <h2
              id="featured-projects-heading"
              className="mt-5 max-w-2xl text-3xl font-semibold leading-[1.05] tracking-[-0.045em] text-white sm:text-4xl lg:text-5xl"
            >
              A few projects
              <br />
              <span className="text-neutral-500">
                we&apos;re proud of.
              </span>
            </h2>
          </div>

          <p className="max-w-md text-sm leading-6 text-neutral-600 lg:pb-1">
            Selected digital experiences built around
            real business goals, thoughtful design and
            solid technology.
          </p>
        </div>

        {/* =====================================================
            FEATURED PROJECTS
        ===================================================== */}

        <div className="grid gap-6 lg:grid-cols-2">
          {projects.map((project, index) => (
            <article
              key={project.id}
              className="group relative"
            >
              <Link
                href={`/projects/${project.slug}`}
                aria-label={`View ${project.title} project`}
                className="block rounded-[28px] outline-none focus-visible:ring-2 focus-visible:ring-[#FFC400] focus-visible:ring-offset-4 focus-visible:ring-offset-[#050505]"
              >
                <div className="overflow-hidden rounded-[28px] border border-white/[0.07] bg-[#090909] transition-all duration-500 group-hover:border-[#FFC400]/20 group-hover:bg-[#0A0A0A] group-hover:shadow-[0_25px_80px_rgba(0,0,0,0.35)]">
                  {/* =================================================
                      IMAGE
                      NO TEXT OVER IMAGE
                  ================================================= */}

                  <div className="relative aspect-[16/10] overflow-hidden bg-[#0D0D0D]">
                    {project.coverImage?.url ? (
                      <Image
                        src={project.coverImage.url}
                        alt={
                          project.coverImage.alt ||
                          project.title
                        }
                        fill
                        sizes="(max-width: 1024px) 100vw, 50vw"
                        className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.035]"
                      />
                    ) : (
                      <div className="flex h-full w-full items-center justify-center">
                        <Layers3
                          size={32}
                          className="text-neutral-800"
                        />
                      </div>
                    )}

                    {/* IMAGE EDGE / VIGNETTE ONLY */}
                    <div
                      aria-hidden="true"
                      className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-transparent"
                    />

                    {/* IMAGE CORNER ACTION */}
                    <span
                      aria-hidden="true"
                      className="absolute right-5 top-5 flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-black/45 text-white/70 backdrop-blur-md transition-all duration-300 group-hover:border-[#FFC400]/30 group-hover:bg-[#FFC400] group-hover:text-black"
                    >
                      <ArrowUpRight
                        size={17}
                        className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                      />
                    </span>
                  </div>

                  {/* =================================================
                      PROJECT INFO
                  ================================================= */}

                  <div className="p-5 sm:p-6 lg:p-7">
                    {/* TOP META */}

                    <div className="flex flex-wrap items-center gap-2">
                      <span className="rounded-full border border-[#FFC400]/15 bg-[#FFC400]/[0.05] px-3 py-1.5 text-[9px] font-semibold uppercase tracking-[0.16em] text-[#FFC400]">
                        Featured
                      </span>

                      {project.industry && (
                        <>
                          <span
                            aria-hidden="true"
                            className="text-neutral-800"
                          >
                            /
                          </span>

                          <span className="text-[9px] font-medium uppercase tracking-[0.15em] text-neutral-600">
                            {project.industry}
                          </span>
                        </>
                      )}
                    </div>

                    {/* TITLE */}

                    <div className="mt-5 flex items-start justify-between gap-5">
                      <div className="min-w-0">
                        <h3 className="text-xl font-semibold tracking-[-0.03em] text-white transition-colors duration-300 group-hover:text-[#FFC400] sm:text-2xl">
                          {project.title}
                        </h3>

                        {project.client && (
                          <p className="mt-1.5 text-[10px] font-medium uppercase tracking-[0.14em] text-neutral-700">
                            {project.client}
                          </p>
                        )}
                      </div>

                      <span
                        aria-hidden="true"
                        className="mt-1 shrink-0 text-neutral-700 transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-[#FFC400]"
                      >
                        <ArrowUpRight size={19} />
                      </span>
                    </div>

                    {/* DESCRIPTION */}

                    <p className="mt-4 max-w-xl text-sm leading-6 text-neutral-500">
                      {project.shortDescription}
                    </p>

                    {/* TECHNOLOGIES */}

                    {project.technologies.length > 0 && (
                      <div className="mt-6 flex flex-wrap gap-2">
                        {project.technologies
                          .slice(0, 5)
                          .map((technology) => (
                            <span
                              key={technology}
                              className="rounded-lg border border-white/[0.06] bg-white/[0.02] px-2.5 py-1.5 text-[9px] font-medium text-neutral-600 transition-colors duration-300 group-hover:border-white/[0.09] group-hover:text-neutral-500"
                            >
                              {technology}
                            </span>
                          ))}

                        {project.technologies.length >
                          5 && (
                          <span className="rounded-lg border border-white/[0.06] bg-white/[0.02] px-2.5 py-1.5 text-[9px] font-medium text-neutral-700">
                            +
                            {project.technologies.length -
                              5}
                          </span>
                        )}
                      </div>
                    )}

                    {/* BOTTOM ROW */}

                    <div className="mt-7 flex items-center justify-between border-t border-white/[0.06] pt-5">
                      <span className="text-[9px] font-semibold uppercase tracking-[0.18em] text-neutral-700 transition-colors duration-300 group-hover:text-neutral-500">
                        View case study
                      </span>

                      {project.client && (
                        <span className="flex items-center gap-1.5 text-[9px] font-medium uppercase tracking-[0.14em] text-neutral-700">
                          <ExternalLink size={11} />
                          Project
                        </span>
                      )}
                    </div>
                  </div>

                  {/* =================================================
                      BOTTOM HOVER ACCENT
                  ================================================= */}

                  <span
                    aria-hidden="true"
                    className="absolute bottom-0 left-8 h-px w-0 bg-gradient-to-r from-[#FFC400] to-transparent transition-all duration-700 group-hover:w-1/2"
                  />
                </div>
              </Link>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}