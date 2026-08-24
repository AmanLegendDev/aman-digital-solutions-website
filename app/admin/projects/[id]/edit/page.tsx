import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getServerSession } from "next-auth";

import { authOptions } from "@/lib/auth/auth";
import { connectDB } from "@/lib/db/connect";

import Project from "@/models/Project";

import ProjectForm from "@/components/admin/projects/form/ProjectCreateForm";

type Props = {
  params: Promise<{
    id: string;
  }>;
};

export const metadata: Metadata = {
  title: "Edit Project | Admin",
};

export default async function EditProjectPage({
  params,
}: Props) {
  const session =
    await getServerSession(authOptions);

  if (
    !session?.user ||
    session.user.role !== "admin"
  ) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#050505] text-white">
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

  const { id } = await params;

  await connectDB();

  const project =
    await Project.findById(id).lean();

  if (!project) {
    notFound();
  }

  const initialData = {
    title: project.title,
    slug: project.slug,

    client:
      project.client ?? "",

    industry:
      project.industry ?? "",

    shortDescription:
      project.shortDescription,

    overview:
      project.overview,

    challenge:
      project.challenge ?? "",

    solution:
      project.solution ?? "",

    features:
      project.features.map(
        (feature) => ({
          title: feature.title,
          description:
            feature.description,
          icon: feature.icon ?? "",
        }),
      ),

    technologies:
      project.technologies,

    coverImage:
      project.coverImage
        ? {
            url:
              project.coverImage.url,
            publicId:
              project.coverImage.publicId,
            alt:
              project.coverImage.alt,
          }
        : undefined,

    gallery:
      project.gallery.map(
        (media) => ({
          type: media.type,
          url: media.url,
          publicId:
            media.publicId,
          title: media.title,
        }),
      ),

    liveUrl:
      project.liveUrl ?? "",

    githubUrl:
      project.githubUrl ?? "",

    services:
      project.services.map(
        (service) =>
          String(service),
      ),

    results:
      project.results.map(
        (result) => ({
          label: result.label,
          value: result.value,
          description:
            result.description ?? "",
        }),
      ),

    featured:
      project.featured,

    published:
      project.published,

    displayOrder:
      project.displayOrder,

    seoTitle:
      project.seoTitle ?? "",

    seoDescription:
      project.seoDescription ?? "",

    canonicalUrl:
      project.canonicalUrl ?? "",

    ogTitle:
      project.ogTitle ?? "",

    ogDescription:
      project.ogDescription ?? "",

    ogImage:
      project.ogImage
        ? {
            url:
              project.ogImage.url,
            publicId:
              project.ogImage.publicId,
            alt:
              project.ogImage.alt,
          }
        : undefined,
  };

  return (
    <main className="min-h-screen bg-[#050505] px-4 py-8 text-white sm:px-6 lg:px-10">
      <div className="mx-auto max-w-5xl">

        <div className="mb-8">
          <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#FFC400]">
            Portfolio CMS
          </p>

          <h1 className="mt-2 text-3xl font-semibold tracking-tight">
            Edit Project
          </h1>

          <p className="mt-2 text-sm text-white/40">
            Update every part of this project.
          </p>
        </div>

        <ProjectForm
          mode="edit"
          projectId={id}
          initialData={initialData}
        />

      </div>
    </main>
  );
}