import type { Metadata } from "next";

export const revalidate = 3600;

import { connectDB } from "@/lib/db/connect";
import Project from "@/models/Project";

import ProjectsPageClient from "@/components/projects/ProjectsPageClient";
import Navbar from "@/components/agency/navbar/Navbar";
import Footer from "@/components/agency/footer/Footer";
import Link from "next/link";

import {
  getCollectionPageSchema,
  getItemListSchema,
} from "@/lib/seo/schema";

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ||
  "https://www.amandigitalsolutions.com";

const PROJECTS_URL = `${SITE_URL}/projects`;

export const metadata: Metadata = {
  title: "Web Development Projects | Aman Digital Solutions",

  description:
    "Explore web development projects, e-commerce websites and custom web applications built by Aman Digital Solutions for businesses in Shimla, Himachal Pradesh, India and beyond.",

  alternates: {
    canonical: PROJECTS_URL,
  },

  openGraph: {
    title: "Web Development Projects | Aman Digital Solutions",

    description:
      "Explore web development projects, e-commerce websites and custom web applications built by Aman Digital Solutions for businesses in Shimla, Himachal Pradesh, India and beyond.",

    url: PROJECTS_URL,

    type: "website",

    siteName: "Aman Digital Solutions",

    locale: "en_IN",
  },

  twitter: {
    card: "summary_large_image",

    title: "Web Development Projects | Aman Digital Solutions",

    description:
      "Explore web development projects, e-commerce websites and custom web applications built by Aman Digital Solutions.",
  },

  robots: {
    index: true,
    follow: true,

    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
};

export default async function ProjectsPage() {
  await connectDB();

  const projects = await Project.find({
    published: true,
  })
    .sort({
      featured: -1,
      displayOrder: 1,
      createdAt: -1,
    })
    .lean();

  const serializedProjects = projects.map((project) => ({
    id: String(project._id),

    title: project.title,

    slug: project.slug,

    client: project.client,

    industry: project.industry,

    shortDescription: project.shortDescription,

    technologies: project.technologies ?? [],

    coverImage: project.coverImage
      ? {
          url: project.coverImage.url,

          alt:
            project.coverImage.alt ||
            project.title,
        }
      : undefined,

    featured: project.featured,
  }));

  const featuredProjects =
    serializedProjects.filter(
      (project) => project.featured
    );

  const allProjects =
    serializedProjects.filter(
      (project) => !project.featured
    );

  /*
   * --------------------------------------------------------------------------
   * SEO — Project ItemList
   * --------------------------------------------------------------------------
   */

  const projectItems = serializedProjects.map(
    (project) => ({
      name: project.title,

      url: `${PROJECTS_URL}/${project.slug}`,

      ...(project.coverImage?.url
        ? {
            image:
              project.coverImage.url,
          }
        : {}),

      description:
        project.shortDescription,
    })
  );

  const projectsItemList =
    getItemListSchema({
      id: `${PROJECTS_URL}#itemlist`,

      name:
        "Web Development Projects | Aman Digital Solutions",

      url: PROJECTS_URL,

      items: projectItems,
    });

  /*
   * --------------------------------------------------------------------------
   * SEO — CollectionPage
   * --------------------------------------------------------------------------
   */

  const projectsCollection =
    getCollectionPageSchema({
      url: PROJECTS_URL,

      name:
        "Web Development Projects | Aman Digital Solutions",

      description:
        "Explore web development projects, e-commerce websites and custom web applications built by Aman Digital Solutions for businesses in Shimla, Himachal Pradesh, India and beyond.",

      itemListId:
        `${PROJECTS_URL}#itemlist`,
    });

  /*
   * --------------------------------------------------------------------------
   * SEO — BreadcrumbList
   * --------------------------------------------------------------------------
   */

  const breadcrumbSchema = {
    "@context": "https://schema.org",

    "@type": "BreadcrumbList",

    itemListElement: [
      {
        "@type": "ListItem",

        position: 1,

        name: "Home",

        item: SITE_URL,
      },

      {
        "@type": "ListItem",

        position: 2,

        name: "Projects",

        item: PROJECTS_URL,
      },
    ],
  };

  /*
   * --------------------------------------------------------------------------
   * PAGE
   * --------------------------------------------------------------------------
   */

  return (
    <>
      <Navbar />

      {/* Accessible breadcrumb navigation */}
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

          <li aria-current="page">
            Projects
          </li>
        </ol>
      </nav>

      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",

            "@graph": [
              projectsCollection,

              projectsItemList,

              breadcrumbSchema,
            ],
          }),
        }}
      />

      <main>
        <ProjectsPageClient
          featuredProjects={
            featuredProjects
          }

          allProjects={
            allProjects
          }
        />
      </main>

      <Footer />
    </>
  );
}