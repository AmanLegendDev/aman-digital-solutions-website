import { connectDB } from "@/lib/db/connect";
import Project from "@/models/Project";

import ProjectsIntro from "./ProjectsIntro";
import ProjectCard from "./ProjectCard";

async function getProjects() {
  await connectDB();

  const projects = await Project.find({
    published: true,
  })
    .sort({
      featured: -1,
      displayOrder: 1,
      createdAt: -1,
    })
    .select(
      [
        "title",
        "slug",
        "client",
        "industry",
        "shortDescription",
        "technologies",
        "coverImage",
        "liveUrl",
        "featured",
      ].join(" ")
    )
    .lean();

  return projects.map((project) => ({
    id: project._id.toString(),

    title: project.title,

    slug: project.slug,

    // Model mein optional hai,
    // UI card ko stable string chahiye.
    client: project.client ?? "",

    industry: project.industry ?? "",

    shortDescription: project.shortDescription,

    technologies: Array.isArray(project.technologies)
      ? project.technologies
      : [],

    coverImage: project.coverImage
      ? {
          url: project.coverImage.url,
          publicId:
            project.coverImage.publicId ?? null,
        }
      : null,

    liveUrl: project.liveUrl ?? null,

    featured: project.featured,
  }));
}

export default async function ProjectsSection() {
  const projects = await getProjects();

  if (projects.length === 0) {
    return null;
  }

  return (
    <section
      id="work"
      aria-labelledby="projects-heading"
      className="relative w-full max-w-full scroll-mt-28 overflow-x-clip border-t border-[#1A1A1A] bg-[#050505] py-24 sm:py-28 lg:py-32"
    >
      {/* Ambient glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-48 top-1/3 h-[480px] w-[480px] rounded-full bg-[#FFC400]/[0.02] blur-[150px]"
      />

      <div className="relative mx-auto w-full max-w-7xl min-w-0 px-5 sm:px-8 lg:px-10">
        <div className="grid min-w-0 gap-14 lg:grid-cols-[0.7fr_1.3fr] lg:gap-20">
          {/* INTRO */}
          <div className="min-w-0 lg:sticky lg:top-32 lg:self-start">
            <ProjectsIntro />
          </div>

          {/* PROJECTS */}
          <div className="min-w-0 space-y-5">
            {projects.map((project, index) => (
              <ProjectCard
                key={project.id}
                project={project}
                index={index}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}