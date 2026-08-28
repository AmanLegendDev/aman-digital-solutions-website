import { connectDB } from "@/lib/db/connect";
import Project from "@/models/Project";

import ProjectsPageClient from "@/components/projects/ProjectsPageClient";
import Navbar from "@/components/agency/navbar/Navbar";
import Footer from "@/components/agency/footer/Footer";

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
          alt: project.coverImage.alt,
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

 return (
  <>
    <Navbar />

    <main>
      <ProjectsPageClient
        featuredProjects={featuredProjects}
        allProjects={allProjects}
      />
    </main>

    <Footer />
  </>
);
}