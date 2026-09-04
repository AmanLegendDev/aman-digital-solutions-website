import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Types } from "mongoose";

import { connectDB } from "@/lib/db/connect";
import Project from "@/models/Project";
import Service from "@/models/Service";

import BreadcrumbSchema from "@/components/seo/BreadcrumbSchema";

import ProjectDetailPage, {
  type ProjectDetailData,
} from "@/components/projects/detail/ProjectDetailPage";

import Navbar from "@/components/agency/navbar/Navbar";
import Footer from "@/components/agency/footer/Footer";

import { getWebPageSchema } from "@/lib/seo/schema";

/* =========================================================
   SITE
========================================================= */

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ||
  "https://www.amandigitalsolutions.com";

export const dynamic = "force-dynamic";

/* =========================================================
   PARAMS
========================================================= */

type ProjectPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

/* =========================================================
   POPULATED SERVICE
========================================================= */

type PopulatedProjectService = {
  _id: Types.ObjectId;
  title: string;
  slug: string;
  shortDescription?: string;
  category?: string;
};

/* =========================================================
   PROJECT TYPE
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

  const project =
    await Project.findOne({
      slug: slug.toLowerCase(),
      published: true,
    })
      .populate({
        path: "services",
        model: Service,
        select:
          "_id title slug shortDescription category",
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

  const project =
    await getProjectBySlug(slug);

  /* -------------------------------------------------------
     NOT FOUND
  ------------------------------------------------------- */

  if (!project) {
    return {
      title:
        "Project Not Found | Aman Digital Solutions",

      description:
        "The requested project could not be found.",

      robots: {
        index: false,
        follow: false,
      },
    };
  }

  /* -------------------------------------------------------
     SEO TITLE
  ------------------------------------------------------- */

  const title =
    project.seoTitle?.trim() ||
    project.title;

  /* -------------------------------------------------------
     SEO DESCRIPTION
  ------------------------------------------------------- */

  const description =
    project.seoDescription?.trim() ||
    project.shortDescription;

  /* -------------------------------------------------------
     CANONICAL
  ------------------------------------------------------- */

  const canonical =
    `${SITE_URL}/projects/${project.slug}`;

  /* -------------------------------------------------------
     OPEN GRAPH
  ------------------------------------------------------- */

  const ogTitle =
    project.ogTitle?.trim() ||
    title;

  const ogDescription =
    project.ogDescription?.trim() ||
    description;

  const ogImage =
    project.ogImage?.url ||
    project.coverImage?.url;

  const ogImageAlt =
    project.ogImage?.alt ||
    project.coverImage?.alt ||
    project.title;

  /* -------------------------------------------------------
     FINAL METADATA
  ------------------------------------------------------- */

  return {
    title,

    description,

    alternates: {
      canonical,
    },

    openGraph: {
      type: "website",

      locale: "en_IN",

      siteName:
        "Aman Digital Solutions",

      title:
        ogTitle,

      description:
        ogDescription,

      url:
        canonical,

      ...(ogImage
        ? {
            images: [
              {
                url: ogImage,
                alt: ogImageAlt,
              },
            ],
          }
        : {}),
    },

    twitter: {
      card:
        "summary_large_image",

      title:
        ogTitle,

      description:
        ogDescription,

      ...(ogImage
        ? {
            images: [
              ogImage,
            ],
          }
        : {}),
    },

    robots: {
      index: true,
      follow: true,

      googleBot: {
        index: true,
        follow: true,

        "max-image-preview":
          "large",

        "max-snippet":
          -1,

        "max-video-preview":
          -1,
      },
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

  const project =
    await getProjectBySlug(slug);

  /* =======================================================
     NOT FOUND
  ======================================================== */

  if (!project) {
    notFound();
  }

  /* =======================================================
     URL + SEO VALUES
  ======================================================== */

  const projectUrl =
    `${SITE_URL}/projects/${project.slug}`;

  const seoTitle =
    project.seoTitle?.trim() ||
    project.title;

  const seoDescription =
    project.seoDescription?.trim() ||
    project.shortDescription;

  const image =
    project.ogImage?.url ||
    project.coverImage?.url;

  const imageAlt =
    project.ogImage?.alt ||
    project.coverImage?.alt ||
    project.title;

  /* =======================================================
     SERIALIZE PROJECT DATA
  ======================================================== */

  const projectData:
    ProjectDetailData = {
    title:
      project.title,

    slug:
      project.slug,

    client:
      project.client ||
      undefined,

    industry:
      project.industry ||
      undefined,

    shortDescription:
      project.shortDescription,

    overview:
      project.overview,

    challenge:
      project.challenge ||
      undefined,

    solution:
      project.solution ||
      undefined,

    features:
      (project.features || []).map(
        (feature) => ({
          title:
            feature.title,

          description:
            feature.description,

          icon:
            feature.icon ||
            undefined,
        })
      ),

    technologies:
      project.technologies ||
      [],

    coverImage:
      project.coverImage
        ? {
            url:
              project.coverImage.url,

            publicId:
              project.coverImage.publicId ||
              undefined,

            alt:
              project.coverImage.alt ||
              project.title,
          }
        : undefined,

    gallery:
      (project.gallery || []).map(
        (media) => ({
          type:
            media.type,

          url:
            media.url,

          publicId:
            media.publicId ||
            undefined,

          title:
            media.title,
        })
      ),

    liveUrl:
      project.liveUrl ||
      undefined,

    githubUrl:
      project.githubUrl ||
      undefined,

    featured:
      project.featured,

    services:
      (project.services || []).map(
        (service) => ({
          _id:
            String(service._id),

          title:
            service.title,

          slug:
            service.slug,

          shortDescription:
            service.shortDescription ||
            undefined,

          category:
            service.category ||
            undefined,
        })
      ),

    results:
      (project.results || []).map(
        (result) => ({
          label:
            result.label,

          value:
            result.value,

          description:
            result.description ||
            undefined,
        })
      ),
  };

  /* =======================================================
     PROJECT SCHEMA
  ======================================================== */

  const projectSchema = {
    "@context":
      "https://schema.org",

    "@type":
      "CreativeWork",

    "@id":
      `${projectUrl}#project`,

    name:
      project.title,

    headline:
      project.title,

    description:
      seoDescription,

    url:
      projectUrl,

    creator: {
      "@id":
        `${SITE_URL}/#organization`,
    },

    publisher: {
      "@id":
        `${SITE_URL}/#organization`,
    },

    ...(project.client
      ? {
          client: {
            "@type":
              "Organization",

            name:
              project.client,
          },
        }
      : {}),

    ...(project.industry
      ? {
          genre:
            project.industry,
        }
      : {}),

    ...(project.technologies?.length
      ? {
          keywords:
            project.technologies.join(
              ", "
            ),
        }
      : {}),

    ...(image
      ? {
          image: {
            "@type":
              "ImageObject",

            url:
              image,

            caption:
              imageAlt,
          },
        }
      : {}),
  };

  /* =======================================================
     WEBPAGE SCHEMA
  ======================================================== */

  const webPageSchema =
    getWebPageSchema({
      url:
        projectUrl,

      name:
        seoTitle,

      description:
        seoDescription,
    });

  /* =======================================================
     RENDER
  ======================================================== */

  return (
    <>
      {/* =================================================
          NAVBAR
      ================================================= */}

      <Navbar />

      {/* =================================================
          BREADCRUMB SCHEMA
      ================================================= */}

      <BreadcrumbSchema
        items={[
          {
            name:
              "Home",
            url:
              "/",
          },

          {
            name:
              "Projects",
            url:
              "/projects",
          },

          {
            name:
              project.title,

            url:
              `/projects/${project.slug}`,
          },
        ]}
      />

      {/* =================================================
          PROJECT SCHEMA
      ================================================= */}

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html:
            JSON.stringify(
              projectSchema
            ),
        }}
      />

      {/* =================================================
          WEBPAGE SCHEMA
      ================================================= */}

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html:
            JSON.stringify(
              webPageSchema
            ),
        }}
      />

      {/* =================================================
          SEMANTIC BREADCRUMB
      ================================================= */}

      <nav
        aria-label="Breadcrumb"
        className="sr-only"
      >
        <ol>
          <li>
            <Link href="/">
              Home
            </Link>
          </li>

          <li>
            <Link href="/projects">
              Projects
            </Link>
          </li>

          <li aria-current="page">
            {project.title}
          </li>
        </ol>
      </nav>

      {/* =================================================
          PROJECT DETAIL
      ================================================= */}

      <main>
        <ProjectDetailPage
          project={
            projectData
          }
        />
      </main>

      {/* =================================================
          FOOTER
      ================================================= */}

      <Footer />
    </>
  );
}