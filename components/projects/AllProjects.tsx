"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import {
  ArrowUpRight,
  BriefcaseBusiness,
  Check,
  FolderOpen,
} from "lucide-react";

import type { ProjectCardData } from "./ProjectsPageClient";

type AllProjectsProps = {
  projects: ProjectCardData[];
};

type FilterValue = "all" | string;

export default function AllProjects({
  projects,
}: AllProjectsProps) {
  const [activeFilter, setActiveFilter] =
    useState<FilterValue>("all");

  const industries = Array.from(
    new Set(
      projects
        .map((project) => project.industry)
        .filter(
          (industry): industry is string =>
            Boolean(industry)
        )
    )
  );

  const filteredProjects =
    activeFilter === "all"
      ? projects
      : projects.filter(
          (project) =>
            project.industry === activeFilter
        );

  return (
    <section
      id="all-projects"
      aria-labelledby="all-projects-heading"
      className="relative bg-[#050505] py-20 sm:py-24 lg:py-28"
    >
      <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
        {/* =====================================================
            HEADER
        ===================================================== */}

        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <div className="flex items-center gap-3">
              <span
                aria-hidden="true"
                className="flex h-8 w-8 items-center justify-center rounded-xl border border-white/[0.08] bg-white/[0.02] text-neutral-500"
              >
                <FolderOpen size={14} />
              </span>

              <span className="text-[10px] font-semibold uppercase tracking-[0.22em] text-neutral-500">
                Our work
              </span>
            </div>

            <h2
              id="all-projects-heading"
              className="mt-5 text-3xl font-semibold leading-[1.05] tracking-[-0.045em] text-white sm:text-4xl lg:text-5xl"
            >
              More projects.
              <br />
              <span className="text-neutral-500">
                More proof.
              </span>
            </h2>
          </div>

          <div className="max-w-md lg:pb-1">
            <p className="text-sm leading-6 text-neutral-600">
              Explore the digital products, websites and
              business systems we&apos;ve built across
              different industries.
            </p>
          </div>
        </div>

        {/* =====================================================
            FILTERS
        ===================================================== */}

        {industries.length > 0 && (
          <div className="mt-10 overflow-x-auto pb-2 scrollbar-none">
            <div className="flex min-w-max items-center gap-2">
              <FilterButton
                active={activeFilter === "all"}
                onClick={() =>
                  setActiveFilter("all")
                }
              >
                All projects
              </FilterButton>

              {industries.map((industry) => (
                <FilterButton
                  key={industry}
                  active={activeFilter === industry}
                  onClick={() =>
                    setActiveFilter(industry)
                  }
                >
                  {industry}
                </FilterButton>
              ))}
            </div>
          </div>
        )}

        {/* =====================================================
            RESULT COUNT
        ===================================================== */}

        <div className="mt-8 flex items-center justify-between border-b border-white/[0.06] pb-4">
          <p className="text-[10px] font-medium uppercase tracking-[0.16em] text-neutral-700">
            {filteredProjects.length}{" "}
            {filteredProjects.length === 1
              ? "project"
              : "projects"}
          </p>

          {activeFilter !== "all" && (
            <button
              type="button"
              onClick={() =>
                setActiveFilter("all")
              }
              className="text-[10px] font-medium uppercase tracking-[0.14em] text-neutral-600 transition-colors hover:text-[#FFC400]"
            >
              Clear filter
            </button>
          )}
        </div>

        {/* =====================================================
            PROJECT GRID
        ===================================================== */}

        {filteredProjects.length > 0 ? (
          <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {filteredProjects.map((project) => (
              <ProjectCard
                key={project.id}
                project={project}
              />
            ))}
          </div>
        ) : (
          <EmptyState
            onReset={() =>
              setActiveFilter("all")
            }
          />
        )}
      </div>
    </section>
  );
}

/* =============================================================
   FILTER BUTTON
============================================================= */

function FilterButton({
  active,
  children,
  onClick,
}: {
  active: boolean;
  children: React.ReactNode;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={[
        "inline-flex items-center gap-2 rounded-full border px-4 py-2.5",
        "text-[10px] font-semibold uppercase tracking-[0.12em]",
        "transition-all duration-200",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FFC400]",
        active
          ? "border-[#FFC400]/25 bg-[#FFC400]/[0.07] text-[#FFC400]"
          : "border-white/[0.07] bg-[#090909] text-neutral-600 hover:border-white/[0.14] hover:text-neutral-300",
      ].join(" ")}
    >
      {active && <Check size={12} />}
      {children}
    </button>
  );
}

/* =============================================================
   PROJECT CARD
============================================================= */

function ProjectCard({
  project,
}: {
  project: ProjectCardData;
}) {
  return (
    <article className="group relative">
      <Link
        href={`/projects/${project.slug}`}
        aria-label={`View ${project.title} project`}
        className="block h-full rounded-[24px] outline-none focus-visible:ring-2 focus-visible:ring-[#FFC400] focus-visible:ring-offset-4 focus-visible:ring-offset-[#050505]"
      >
        <div className="relative h-full overflow-hidden rounded-[24px] border border-white/[0.07] bg-[#090909] transition-all duration-400 group-hover:border-white/[0.13] group-hover:bg-[#0A0A0A] group-hover:shadow-[0_25px_70px_rgba(0,0,0,0.3)]">
          {/* IMAGE */}

          <div className="relative aspect-[16/10] overflow-hidden bg-[#0D0D0D]">
            {project.coverImage?.url ? (
              <Image
                src={project.coverImage.url}
                alt={
                  project.coverImage.alt ||
                  project.title
                }
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center">
                <BriefcaseBusiness
                  size={28}
                  className="text-neutral-800"
                />
              </div>
            )}

            {/* ACTION */}

            <span
              aria-hidden="true"
              className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-black/45 text-white/60 backdrop-blur-md transition-all duration-300 group-hover:border-[#FFC400]/30 group-hover:bg-[#FFC400] group-hover:text-black"
            >
              <ArrowUpRight
                size={16}
                className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
              />
            </span>
          </div>

          {/* CONTENT */}

          <div className="p-5">
            {/* META */}

            <div className="flex items-center gap-2">
              {project.industry && (
                <span className="rounded-full border border-white/[0.06] bg-white/[0.02] px-2.5 py-1 text-[8px] font-semibold uppercase tracking-[0.14em] text-neutral-600">
                  {project.industry}
                </span>
              )}

              {project.featured && (
                <span className="rounded-full border border-[#FFC400]/15 bg-[#FFC400]/[0.04] px-2.5 py-1 text-[8px] font-semibold uppercase tracking-[0.14em] text-[#FFC400]">
                  Featured
                </span>
              )}
            </div>

            {/* TITLE */}

            <h3 className="mt-4 text-lg font-semibold tracking-[-0.025em] text-white transition-colors duration-300 group-hover:text-[#FFC400]">
              {project.title}
            </h3>

            {/* CLIENT */}

            {project.client && (
              <p className="mt-1 text-[9px] font-medium uppercase tracking-[0.14em] text-neutral-700">
                {project.client}
              </p>
            )}

            {/* DESCRIPTION */}

            <p className="mt-3 line-clamp-2 text-xs leading-5 text-neutral-600">
              {project.shortDescription}
            </p>

            {/* TECHNOLOGIES */}

            {project.technologies.length > 0 && (
              <div className="mt-5 flex flex-wrap gap-1.5">
                {project.technologies
                  .slice(0, 4)
                  .map((technology) => (
                    <span
                      key={technology}
                      className="rounded-md border border-white/[0.05] px-2 py-1 text-[8px] text-neutral-700"
                    >
                      {technology}
                    </span>
                  ))}

                {project.technologies.length >
                  4 && (
                  <span className="rounded-md border border-white/[0.05] px-2 py-1 text-[8px] text-neutral-800">
                    +
                    {project.technologies.length -
                      4}
                  </span>
                )}
              </div>
            )}

            {/* FOOTER */}

            <div className="mt-5 flex items-center justify-between border-t border-white/[0.05] pt-4">
              <span className="text-[9px] font-semibold uppercase tracking-[0.16em] text-neutral-700 transition-colors duration-300 group-hover:text-neutral-500">
                View project
              </span>

              <ArrowUpRight
                size={14}
                className="text-neutral-800 transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-[#FFC400]"
              />
            </div>
          </div>

          {/* BOTTOM ACCENT */}

          <span
            aria-hidden="true"
            className="absolute bottom-0 left-6 h-px w-0 bg-gradient-to-r from-[#FFC400] to-transparent transition-all duration-500 group-hover:w-2/5"
          />
        </div>
      </Link>
    </article>
  );
}

/* =============================================================
   EMPTY STATE
============================================================= */

function EmptyState({
  onReset,
}: {
  onReset: () => void;
}) {
  return (
    <div className="mt-8 flex min-h-[280px] flex-col items-center justify-center rounded-[24px] border border-dashed border-white/[0.08] bg-[#080808] px-6 text-center">
      <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-white/[0.07] bg-white/[0.02] text-neutral-700">
        <FolderOpen size={20} />
      </div>

      <h3 className="mt-5 text-base font-semibold text-white">
        No projects found
      </h3>

      <p className="mt-2 max-w-sm text-xs leading-5 text-neutral-600">
        There aren&apos;t any projects in this
        category yet. Try exploring all projects.
      </p>

      <button
        type="button"
        onClick={onReset}
        className="mt-5 rounded-full border border-white/[0.08] px-4 py-2.5 text-[9px] font-semibold uppercase tracking-[0.14em] text-neutral-500 transition-colors hover:border-[#FFC400]/25 hover:text-[#FFC400]"
      >
        View all projects
      </button>
    </div>
  );
}