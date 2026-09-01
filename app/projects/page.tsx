import type { Metadata } from "next";

import { connectDB } from "@/lib/db/connect";
import Project from "@/models/Project";

import ProjectsPageClient from "@/components/projects/ProjectsPageClient";
import Navbar from "@/components/agency/navbar/Navbar";
import Footer from "@/components/agency/footer/Footer";

import {
  getCollectionPageSchema,
  getItemListSchema,
} from "@/lib/seo/schema";

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ||
  "https://www.amandigitalsolutions.com";

export const metadata: Metadata = {
  title:
    "Our Projects | Websites, E-commerce & Digital Solutions | Aman Digital Solutions",

  description:
    "Explore websites, e-commerce platforms, web applications and digital solutions built by Aman Digital Solutions for businesses and brands.",

  alternates: {
    canonical: "/projects",
  },

  openGraph: {
    title:
      "Our Projects | Aman Digital Solutions",

    description:
      "Explore websites, digital products and business solutions built by Aman Digital Solutions.",

    url: "/projects",

    type: "website",

    siteName:
      "Aman Digital Solutions",

    locale: "en_IN",
  },

  twitter: {
    card:
      "summary_large_image",

    title:
      "Our Projects | Aman Digital Solutions",

    description:
      "Explore real websites, e-commerce platforms and digital solutions built by Aman Digital Solutions.",
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

  const serializedProjects =
    projects.map((project) => ({
      id: String(project._id),

      title: project.title,

      slug: project.slug,

      client:
        project.client,

      industry:
        project.industry,

      shortDescription:
        project.shortDescription,

      technologies:
        project.technologies ?? [],

      coverImage:
        project.coverImage
          ? {
              url:
                project.coverImage.url,

              alt:
                project.coverImage.alt ||
                project.title,
            }
          : undefined,

      featured:
        project.featured,
    }));

  const featuredProjects =
    serializedProjects.filter(
      (project) =>
        project.featured
    );

  const allProjects =
    serializedProjects.filter(
      (project) =>
        !project.featured
    );

    const projectsUrl = `${SITE_URL}/projects`;

const projectItems = serializedProjects.map((project) => ({
  name: project.title,
  url: `${projectsUrl}/${project.slug}`,
  ...(project.coverImage?.url
    ? {
        image: project.coverImage.url,
      }
    : {}),
  description: project.shortDescription,
}));

const projectsItemList = getItemListSchema({
  id: `${projectsUrl}#itemlist`,
  name: "Aman Digital Solutions Projects",
  url: projectsUrl,
  items: projectItems,
});

const projectsCollection = getCollectionPageSchema({
  url: projectsUrl,
  name: "Our Projects | Aman Digital Solutions",
  description:
    "Explore websites, e-commerce platforms, web applications and digital solutions built by Aman Digital Solutions.",
  itemListId: `${projectsUrl}#itemlist`,
});

  return (
    <>
      <Navbar />

      <script
  type="application/ld+json"
  dangerouslySetInnerHTML={{
    __html: JSON.stringify({
      "@context": "https://schema.org",
      "@graph": [
        projectsCollection,
        projectsItemList,
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