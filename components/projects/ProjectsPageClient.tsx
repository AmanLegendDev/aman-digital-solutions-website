"use client";

import FeaturedProjectsSection from "./FeaturedProjectsSection";
import AllProjects from "./AllProjects";

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
    <main className="min-h-screen bg-[#050505] text-white">
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
    </main>
  );
}