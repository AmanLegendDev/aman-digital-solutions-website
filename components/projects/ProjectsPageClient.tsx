"use client";

import FeaturedProjectsSection from "./FeaturedProjectsSection";
import AllProjects from "./AllProjects";
import ProjectsFAQSection from "./ProjectsFAQSection";

/* ============================================================
   PROJECT CARD DATA
============================================================ */

export type ProjectCardData = {
  id: string;
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

  featured: boolean;
};

/* ============================================================
   PROPS
============================================================ */

type ProjectsPageClientProps = {
  featuredProjects: ProjectCardData[];
  allProjects: ProjectCardData[];
};

/* ============================================================
   PAGE CLIENT
============================================================ */

export default function ProjectsPageClient({
  featuredProjects,
  allProjects,
}: ProjectsPageClientProps) {
  return (
    <div className="min-h-screen bg-[#050505] text-white">

      {/* ======================================================
          PAGE INTRO / H1
      ====================================================== */}

      <section
        aria-labelledby="projects-page-heading"
        className="border-b border-white/[0.06] bg-[#050505] px-5 py-16 sm:px-8 sm:py-20 lg:px-10 mt-7"
      >
        <div className="mx-auto max-w-7xl">
          <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[#FFC400]">
            Our portfolio
          </p>

          <h1
            id="projects-page-heading"
            className="mt-4 max-w-4xl text-4xl font-semibold leading-[1.05] tracking-[-0.045em] text-white sm:text-5xl lg:text-6xl"
          >
            Web Development Projects
          </h1>

          <p className="mt-5 max-w-2xl text-sm leading-6 text-neutral-500 sm:text-base">
            Explore websites, e-commerce stores and custom web applications
            built by Aman Digital Solutions for businesses in Shimla,
            Himachal Pradesh, India and beyond.
          </p>
        </div>
      </section>

      {/* ======================================================
          FEATURED PROJECTS
      ====================================================== */}

      {featuredProjects.length > 0 && (
        <FeaturedProjectsSection
          projects={featuredProjects}
        />
      )}

      {/* ======================================================
          ALL PROJECTS

          IMPORTANT:
          featured projects should already be removed
          from this array on the server.
      ====================================================== */}

      <AllProjects
        projects={allProjects}
      />
      <ProjectsFAQSection />
    </div>
  );
}