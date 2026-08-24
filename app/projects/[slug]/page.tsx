import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Types } from "mongoose";

import { connectDB } from "@/lib/db/connect";
import Project from "@/models/Project";

import ProjectDetailPage, {
  type ProjectDetailData,
} from "@/components/projects/detail/ProjectDetailPage";

import Service from "@/models/Service";

/* =========================================================
   PARAMS
========================================================= */

type ProjectPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

/* =========================================================
   POPULATED SERVICE TYPE
========================================================= */

type PopulatedProjectService = {
  _id: Types.ObjectId;
  title: string;
  slug: string;
  shortDescription?: string;
  category?: string;
};

/* =========================================================
   POPULATED PROJECT TYPE
========================================================= */

type PopulatedProject = {
  title: string;
  slug: string;

  client?: string;
  industry?: string;

  shortDescription: string;
  overview: string;

  challenge?: string;
  solution?: string;

  features?: {
    title: string;
    description: string;
    icon?: string;
  }[];

  technologies?: string[];

  coverImage?: {
    url: string;
    publicId?: string;
    alt?: string;
  };

  gallery?: {
    type: "image" | "video";
    url: string;
    publicId?: string;
    title: string;
  }[];

  liveUrl?: string;
  githubUrl?: string;

  services?: PopulatedProjectService[];

  results?: {
    label: string;
    value: string;
    description?: string;
  }[];

  featured: boolean;
  published: boolean;
  displayOrder: number;

  seoTitle?: string;
  seoDescription?: string;
  canonicalUrl?: string;

  ogTitle?: string;
  ogDescription?: string;

  ogImage?: {
    url: string;
    publicId?: string;
    alt?: string;
  };
};

/* =========================================================
   FETCH PROJECT
========================================================= */

async function getProjectBySlug(
  slug: string
): Promise<PopulatedProject | null> {
  await connectDB();

  const project = await Project.findOne({
    slug: slug.toLowerCase(),
    published: true,
  })
    .populate({
      path: "services",
      model: Service,
      select: "_id title slug shortDescription category",
    })
    .lean();

  if (!project) {
    return null;
  }

  return project as unknown as PopulatedProject;
}

/* =========================================================
   METADATA
========================================================= */

export async function generateMetadata({
  params,
}: ProjectPageProps): Promise<Metadata> {
  const { slug } = await params;

  const project = await getProjectBySlug(slug);

  if (!project) {
    return {
      title:
        "Project Not Found | Aman Digital Solutions",
      description:
        "The requested project could not be found.",
    };
  }

  const title =
    project.seoTitle ||
    `${project.title} | Aman Digital Solutions`;

  const description =
    project.seoDescription ||
    project.shortDescription;

  const canonical =
    project.canonicalUrl ||
    `https://www.amandigitalsolutions.in/projects/${project.slug}`;

  const ogTitle =
    project.ogTitle ||
    project.seoTitle ||
    project.title;

  const ogDescription =
    project.ogDescription ||
    project.seoDescription ||
    project.shortDescription;

  const ogImage =
    project.ogImage?.url ||
    project.coverImage?.url;

  return {
    title,
    description,

    alternates: {
      canonical,
    },

    openGraph: {
      title: ogTitle,
      description: ogDescription,
      url: canonical,
      type: "article",

      ...(ogImage
        ? {
            images: [
              {
                url: ogImage,
                alt:
                  project.ogImage?.alt ||
                  project.coverImage?.alt ||
                  project.title,
              },
            ],
          }
        : {}),
    },

    twitter: {
      card: "summary_large_image",
      title: ogTitle,
      description: ogDescription,

      ...(ogImage
        ? {
            images: [ogImage],
          }
        : {}),
    },
  };
}

/* =========================================================
   PAGE
========================================================= */

export default async function ProjectPage({
  params,
}: ProjectPageProps) {
  const { slug } = await params;

  const project = await getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  /* =======================================================
     SERIALIZE PROJECT DATA
  ======================================================= */

  const projectData: ProjectDetailData = {
    title: project.title,
    slug: project.slug,

    client: project.client || undefined,
    industry: project.industry || undefined,

    shortDescription:
      project.shortDescription,

    overview: project.overview,

    challenge:
      project.challenge || undefined,

    solution:
      project.solution || undefined,

    /* =====================================================
       FEATURES
    ===================================================== */

    features: (project.features || []).map(
      (feature) => ({
        title: feature.title,
        description: feature.description,
        icon: feature.icon || undefined,
      })
    ),

    /* =====================================================
       TECHNOLOGIES
    ===================================================== */

    technologies:
      project.technologies || [],

    /* =====================================================
       COVER IMAGE
    ===================================================== */

    coverImage: project.coverImage
      ? {
          url: project.coverImage.url,
          publicId:
            project.coverImage.publicId ||
            undefined,
          alt:
            project.coverImage.alt ||
            undefined,
        }
      : undefined,

    /* =====================================================
       GALLERY
    ===================================================== */

    gallery: (project.gallery || []).map(
      (media) => ({
        type: media.type,
        url: media.url,
        publicId:
          media.publicId || undefined,
        title: media.title,
      })
    ),

    /* =====================================================
       LINKS
    ===================================================== */

    liveUrl:
      project.liveUrl || undefined,

    githubUrl:
      project.githubUrl || undefined,

    /* =====================================================
       RELATED SERVICES
    ===================================================== */

    services: (project.services || []).map(
      (service) => ({
        _id: String(service._id),

        title: service.title,

        slug: service.slug,

        shortDescription:
          service.shortDescription ||
          undefined,

        category:
          service.category ||
          undefined,
      })
    ),

    /* =====================================================
       RESULTS
    ===================================================== */

    results: (project.results || []).map(
      (result) => ({
        label: result.label,

        value: result.value,

        description:
          result.description ||
          undefined,
      })
    ),
  };

  /* =======================================================
     RENDER
  ======================================================= */

  return (
    <>
      {/* =================================================
          BREADCRUMB
      ================================================= */}

      <nav
        aria-label="Breadcrumb"
        className="sr-only"
      >
        <ol>
          <li>
            <a href="/">Home</a>
          </li>

          <li>
            <a href="/projects">
              Projects
            </a>
          </li>

          <li aria-current="page">
            {project.title}
          </li>
        </ol>
      </nav>

      {/* =================================================
          PROJECT DETAIL
      ================================================= */}

      <ProjectDetailPage
        project={projectData}
      />
    </>
  );
}