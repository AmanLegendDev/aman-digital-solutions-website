import ProjectDetailHero from "./ProjectDetailHero";
import ProjectOverviewSection from "./ProjectOverviewSection";
import ProjectFeaturesSection from "./ProjectFeaturesSection";
import ProjectResultsSection from "./ProjectResultsSection";
import ProjectTechnologiesSection from "./ProjectTechnologiesSection";
import ProjectGallerySection from "./ProjectGallerySection";
import ProjectRelatedServicesSection from "./ProjectRelatedServicesSection";
import ProjectFinalCtaSection from "./ProjectFinalCtaSection";

/* =========================================================
   TYPES
========================================================= */

export type ProjectDetailData = {
  title: string;
  slug: string;

  client?: string;
  industry?: string;

  shortDescription: string;
  overview: string;

  challenge?: string;
  solution?: string;

  features: {
    title: string;
    description: string;
    icon?: string;
  }[];

  technologies: string[];

  coverImage?: {
    url: string;
    publicId?: string;
    alt?: string;
  };

  gallery: {
    type: "image" | "video";
    url: string;
    publicId?: string;
    title: string;
  }[];

  liveUrl?: string;
  githubUrl?: string;

  featured: boolean;

  services: {
    _id: string;
    title: string;
    slug: string;
    shortDescription?: string;
    category?: string;
  }[];

  results: {
    label: string;
    value: string;
    description?: string;
  }[];
};

type ProjectDetailPageProps = {
  project: ProjectDetailData;
};

/* =========================================================
   PAGE
========================================================= */

export default function ProjectDetailPage({
  project,
}: ProjectDetailPageProps) {
  return (
    <main className="min-h-screen bg-[#050505] text-white">

      {/* ===================================================
          HERO
      ==================================================== */}

      <ProjectDetailHero
        project={project}
      />

      {/* ===================================================
          OVERVIEW
      ==================================================== */}

      <ProjectOverviewSection
        project={project}
      />

      {/* ===================================================
          FEATURES
      ==================================================== */}

      <ProjectFeaturesSection
        features={project.features}
      />

      {/* ===================================================
          RESULTS
      ==================================================== */}

      <ProjectResultsSection
        results={project.results}
      />

      {/* ===================================================
          TECHNOLOGIES
      ==================================================== */}

      <ProjectTechnologiesSection
        technologies={project.technologies}
      />

      {/* ===================================================
          GALLERY
      ==================================================== */}

      <ProjectGallerySection
        gallery={project.gallery}
      />

      {/* ===================================================
          RELATED SERVICES
      ==================================================== */}

      <ProjectRelatedServicesSection
        services={project.services}
      />

      {/* ===================================================
          FINAL CTA
      ==================================================== */}

      <ProjectFinalCtaSection
        projectTitle={project.title}
      />

    </main>
  );
}