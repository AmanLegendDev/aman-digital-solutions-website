import type { Metadata } from "next";
import { getServerSession } from "next-auth";

import { authOptions } from "@/lib/auth/auth";
import { connectDB } from "@/lib/db/connect";

import Project from "@/models/Project";
import Service from "@/models/Service";

import ProjectAdminCard, {
  type AdminProjectData,
} from "@/components/admin/projects/ProjectAdminCard";

/* =========================================================
   METADATA
========================================================= */

export const metadata: Metadata = {
  title: "Projects | Admin",
  description:
    "Manage portfolio projects for Aman Digital Solutions.",
};

/* =========================================================
   PAGE
========================================================= */

export default async function AdminProjectsPage() {
  const session =
    await getServerSession(authOptions);

  if (
    !session?.user ||
    session.user.role !== "admin"
  ) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#050505] px-5 text-white">
        <div className="rounded-2xl border border-white/[0.08] bg-[#0A0A0A] px-8 py-10 text-center">
          <p className="text-xs uppercase tracking-[0.2em] text-red-400">
            Unauthorized
          </p>

          <h1 className="mt-3 text-xl font-semibold">
            Admin access required
          </h1>
        </div>
      </main>
    );
  }

  await connectDB();

  /*
 * Ensure the Service model is registered before
 * Project.services is populated.
 */
void Service;

  /* =======================================================
     FETCH PROJECTS
  ======================================================= */

const projects =
  await Project.find({})
    .populate<{
      services: Array<{
        _id: string;
        title: string;
        slug: string;
      }>;
    }>({
      path: "services",
      select: "_id title slug",
    })
    .sort({
      featured: -1,
      displayOrder: 1,
      createdAt: -1,
    })
    .lean();

  /* =======================================================
     SERIALIZE
  ======================================================= */

  const projectData: AdminProjectData[] =
    projects.map((project) => ({
      _id: String(project._id),

      title: project.title,

      slug: project.slug,

      client:
        project.client || undefined,

      industry:
        project.industry || undefined,

      shortDescription:
        project.shortDescription,

      overview:
        project.overview,

      challenge:
        project.challenge || undefined,

      solution:
        project.solution || undefined,

      features:
        (project.features || []).map(
          (feature) => ({
            title: feature.title,
            description:
              feature.description,
            icon:
              feature.icon || undefined,
          }),
        ),

      technologies:
        project.technologies || [],

      coverImage:
        project.coverImage
          ? {
              url:
                project.coverImage.url,

              publicId:
                project.coverImage
                  .publicId ||
                undefined,

              alt:
                project.coverImage.alt ||
                undefined,
            }
          : undefined,

      gallery:
        (project.gallery || []).map(
          (media) => ({
            type: media.type,

            url: media.url,

            publicId:
              media.publicId ||
              undefined,

            title: media.title,
          }),
        ),

      liveUrl:
        project.liveUrl || undefined,

      githubUrl:
        project.githubUrl ||
        undefined,

      services:
        (project.services || []).map(
          (service) => ({
            _id: String(
              service._id,
            ),

            title:
              service.title,

            slug:
              service.slug,
          }),
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
          }),
        ),

      featured:
        project.featured,

      published:
        project.published,

      displayOrder:
        project.displayOrder,

      seoTitle:
        project.seoTitle ||
        undefined,

      seoDescription:
        project.seoDescription ||
        undefined,

      canonicalUrl:
        project.canonicalUrl ||
        undefined,

      ogTitle:
        project.ogTitle ||
        undefined,

      ogDescription:
        project.ogDescription ||
        undefined,

      ogImage:
        project.ogImage
          ? {
              url:
                project.ogImage.url,

              publicId:
                project.ogImage
                  .publicId ||
                undefined,

              alt:
                project.ogImage.alt ||
                undefined,
            }
          : undefined,

  createdAt:
  project.createdAt
    ? new Date(project.createdAt).toISOString()
    : "",

updatedAt:
  project.updatedAt
    ? new Date(project.updatedAt).toISOString()
    : "",
    }));

  /* =======================================================
     UI
  ======================================================= */

  return (
    <main className="min-h-screen bg-[#050505] px-5 py-10 text-[#F5F5F5] sm:px-8 lg:px-10">
      <div className="mx-auto max-w-7xl">

        {/* =================================================
            HEADER
        ================================================= */}

        <header className="border-b border-white/[0.07] pb-8">
          <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#FFC400]">
            Portfolio CMS
          </p>

          <div className="mt-3 flex flex-col justify-between gap-5 md:flex-row md:items-end">
            <div>
              <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
                Projects
              </h1>

              <p className="mt-2 max-w-2xl text-sm leading-6 text-neutral-500">
                Manage completed projects, case studies,
                media, technologies, results and SEO.
              </p>
            </div>

            <div className="flex items-center gap-3">
              <div className="rounded-full border border-white/[0.08] bg-[#0B0B0B] px-4 py-2 text-xs text-neutral-400">
                {projectData.length}{" "}
                {projectData.length === 1
                  ? "Project"
                  : "Projects"}
              </div>

              <a
                href="/admin/projects/new"
                className="rounded-xl bg-[#FFC400] px-4 py-2.5 text-xs font-semibold text-black transition hover:bg-[#FFD43D]"
              >
                + New Project
              </a>
            </div>
          </div>
        </header>

        {/* =================================================
            PROJECT GRID
        ================================================= */}

        <section className="pt-8">
          {projectData.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-white/[0.1] bg-[#080808] px-6 py-16 text-center">
              <p className="text-sm font-medium text-white">
                No projects yet
              </p>

              <p className="mt-2 text-xs text-neutral-500">
                Create your first portfolio project.
              </p>

              <a
                href="/admin/projects/new"
                className="mt-6 inline-flex rounded-xl bg-[#FFC400] px-5 py-3 text-xs font-semibold text-black"
              >
                Create project
              </a>
            </div>
          ) : (
            <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
              {projectData.map(
                (project) => (
                  <ProjectAdminCard
                    key={project._id}
                    project={project}
                  />
                ),
              )}
            </div>
          )}
        </section>
      </div>
    </main>
  );
}