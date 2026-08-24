import Image from "next/image";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowUpRight,
  ExternalLink,
  Github,
  Sparkles,
} from "lucide-react";

export type ProjectDetailHeroData = {
  title: string;
  slug: string;

  client?: string;
  industry?: string;

  shortDescription: string;

  technologies: string[];

  coverImage?: {
    url: string;
    alt?: string;
  };

  liveUrl?: string;
  githubUrl?: string;

  featured: boolean;
};

type ProjectDetailHeroProps = {
  project: ProjectDetailHeroData;
};

export default function ProjectDetailHero({
  project,
}: ProjectDetailHeroProps) {
  return (
    <section
      aria-labelledby="project-detail-title"
      className="relative overflow-hidden bg-[#050505] pt-28 sm:pt-32 lg:pt-36"
    >
      {/* =====================================================
          BACKGROUND
      ===================================================== */}

      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-0 h-[520px] w-[800px] -translate-x-1/2 rounded-full bg-[#FFC400]/[0.025] blur-[130px]"
      />

      <div className="relative mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
        {/* ===================================================
            BREADCRUMB
        =================================================== */}

        <nav
          aria-label="Breadcrumb"
          className="flex flex-wrap items-center gap-2 text-[10px] font-medium"
        >
          <Link
            href="/"
            className="text-neutral-700 transition-colors hover:text-neutral-300"
          >
            Home
          </Link>

          <span
            aria-hidden="true"
            className="text-neutral-800"
          >
            /
          </span>

          <Link
            href="/projects"
            className="text-neutral-700 transition-colors hover:text-neutral-300"
          >
            Projects
          </Link>

          <span
            aria-hidden="true"
            className="text-neutral-800"
          >
            /
          </span>

          <span className="max-w-[220px] truncate text-neutral-500">
            {project.title}
          </span>
        </nav>

        {/* ===================================================
            BACK LINK
        =================================================== */}

        <Link
          href="/projects"
          className="group mt-7 inline-flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.16em] text-neutral-600 transition-colors hover:text-[#FFC400]"
        >
          <ArrowLeft
            size={13}
            className="transition-transform duration-200 group-hover:-translate-x-1"
          />

          Back to projects
        </Link>

        {/* ===================================================
            HERO CONTENT
        =================================================== */}

        <div className="mt-10 grid gap-10 lg:grid-cols-[1fr_0.85fr] lg:items-end lg:gap-16">
          {/* LEFT */}

          <div>
            <div className="flex flex-wrap items-center gap-2">
              {project.featured && (
                <span className="inline-flex items-center gap-1.5 rounded-full border border-[#FFC400]/20 bg-[#FFC400]/[0.05] px-3 py-1.5 text-[8px] font-semibold uppercase tracking-[0.15em] text-[#FFC400]">
                  <Sparkles size={10} />
                  Featured project
                </span>
              )}

              {project.industry && (
                <span className="rounded-full border border-white/[0.07] bg-white/[0.02] px-3 py-1.5 text-[8px] font-semibold uppercase tracking-[0.15em] text-neutral-600">
                  {project.industry}
                </span>
              )}
            </div>

            <h1
              id="project-detail-title"
              className="mt-6 max-w-4xl text-4xl font-semibold leading-[0.98] tracking-[-0.055em] text-white sm:text-5xl lg:text-[4.8rem]"
            >
              {project.title}
            </h1>

            <p className="mt-6 max-w-2xl text-base leading-7 text-neutral-500 sm:text-lg sm:leading-8">
              {project.shortDescription}
            </p>

            {/* CLIENT */}

            {project.client && (
              <div className="mt-7 flex items-center gap-3">
                <span className="h-px w-6 bg-[#FFC400]/40" />

                <span className="text-[9px] font-semibold uppercase tracking-[0.18em] text-neutral-700">
                  Built for
                </span>

                <span className="text-xs font-medium text-neutral-400">
                  {project.client}
                </span>
              </div>
            )}

            {/* ACTIONS */}

            {(project.liveUrl || project.githubUrl) && (
              <div className="mt-8 flex flex-wrap gap-2.5">
                {project.liveUrl && (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group inline-flex items-center gap-2 rounded-full bg-[#FFC400] px-5 py-3 text-xs font-semibold text-black transition-all duration-200 hover:bg-[#FFD43B] hover:shadow-[0_0_30px_rgba(255,196,0,0.14)]"
                  >
                    View live project

                    <ArrowUpRight
                      size={14}
                      className="transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                    />
                  </a>
                )}

                {project.githubUrl && (
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-full border border-white/[0.09] bg-white/[0.02] px-5 py-3 text-xs font-medium text-neutral-400 transition-all duration-200 hover:border-white/[0.16] hover:text-white"
                  >
                    <Github size={14} />

                    Source code
                  </a>
                )}
              </div>
            )}
          </div>

          {/* RIGHT — PROJECT META */}

          <div className="lg:justify-self-end lg:w-full lg:max-w-sm">
            <div className="rounded-[24px] border border-white/[0.07] bg-[#090909] p-5 sm:p-6">
              <div className="flex items-center justify-between border-b border-white/[0.06] pb-4">
                <span className="text-[9px] font-semibold uppercase tracking-[0.18em] text-neutral-700">
                  Project details
                </span>

                <ExternalLink
                  size={13}
                  className="text-neutral-800"
                />
              </div>

              <div className="divide-y divide-white/[0.05]">
                {project.client && (
                  <MetaRow
                    label="Client"
                    value={project.client}
                  />
                )}

                {project.industry && (
                  <MetaRow
                    label="Industry"
                    value={project.industry}
                  />
                )}

                <div className="py-4">
                  <p className="text-[9px] font-semibold uppercase tracking-[0.15em] text-neutral-700">
                    Technologies
                  </p>

                  {project.technologies.length > 0 ? (
                    <div className="mt-3 flex flex-wrap gap-1.5">
                      {project.technologies.map(
                        (technology) => (
                          <span
                            key={technology}
                            className="rounded-lg border border-white/[0.06] bg-white/[0.015] px-2.5 py-1.5 text-[9px] font-medium text-neutral-500"
                          >
                            {technology}
                          </span>
                        )
                      )}
                    </div>
                  ) : (
                    <p className="mt-2 text-xs text-neutral-700">
                      Not specified
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ===================================================
            COVER IMAGE
        =================================================== */}

        <div className="mt-12 sm:mt-14 lg:mt-16">
          <div className="relative overflow-hidden rounded-[28px] border border-white/[0.07] bg-[#090909] shadow-[0_35px_100px_rgba(0,0,0,0.3)] sm:rounded-[32px]">
            <div className="relative aspect-[16/8] min-h-[240px]">
              {project.coverImage?.url ? (
                <Image
                  src={project.coverImage.url}
                  alt={
                    project.coverImage.alt ||
                    project.title
                  }
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 1200px"
                  className="object-cover"
                />
              ) : (
                <div className="flex h-full items-center justify-center">
                  <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-neutral-800">
                    Project preview unavailable
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* ===================================================
            SCROLL CUE
        =================================================== */}

        <div className="flex items-center justify-center py-10">
          <div className="flex items-center gap-3 text-[9px] font-semibold uppercase tracking-[0.18em] text-neutral-800">
            <span className="h-px w-8 bg-white/[0.06]" />

            Explore the case study

            <span className="h-px w-8 bg-white/[0.06]" />
          </div>
        </div>
      </div>
    </section>
  );
}

/* ============================================================
   META ROW
============================================================ */

function MetaRow({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-center justify-between gap-5 py-4">
      <span className="text-[9px] font-semibold uppercase tracking-[0.15em] text-neutral-700">
        {label}
      </span>

      <span className="text-right text-xs font-medium text-neutral-400">
        {value}
      </span>
    </div>
  );
}