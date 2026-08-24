"use client";

import {
  useState,
} from "react";

import {
  ArrowUpRight,
  BriefcaseBusiness,
  CheckCircle2,
  Clock3,
  Code2,
  ExternalLink,
  Eye,
  FileText,
  Github,
  Image as ImageIcon,
  Link2,
  Pencil,
  ShieldCheck,
  Trash2,
  X,
} from "lucide-react";

import { useRouter } from "next/navigation";

/* =========================================================
   TYPES
========================================================= */

type ProjectImage = {
  url: string;
  publicId?: string;
  alt?: string;
};

type ProjectFeature = {
  title: string;
  description: string;
  icon?: string;
};

type ProjectGalleryMedia = {
  type: "image" | "video";
  url: string;
  publicId?: string;
  title: string;
};

type ProjectResult = {
  label: string;
  value: string;
  description?: string;
};

type ProjectService = {
  _id: string;
  title: string;
  slug: string;
};

export type AdminProjectData = {
  _id: string;

  title: string;
  slug: string;

  client?: string;
  industry?: string;

  shortDescription: string;
  overview: string;

  challenge?: string;
  solution?: string;

  features: ProjectFeature[];

  technologies: string[];

  coverImage?: ProjectImage;

  gallery: ProjectGalleryMedia[];

  liveUrl?: string;
  githubUrl?: string;

  services: ProjectService[];

  results: ProjectResult[];

  featured: boolean;
  published: boolean;
  displayOrder: number;

  seoTitle?: string;
  seoDescription?: string;
  canonicalUrl?: string;

  ogTitle?: string;
  ogDescription?: string;

  ogImage?: ProjectImage;

  createdAt: string;
  updatedAt: string;
};

type Props = {
  project: AdminProjectData;
};

/* =========================================================
   SMALL UI HELPERS
========================================================= */

function SectionTitle({
  icon: Icon,
  children,
}: {
  icon: typeof FileText;
  children: React.ReactNode;
}) {
  return (
    <div className="mb-4 flex items-center gap-2">
      <Icon
        size={14}
        className="text-[#FFC400]"
      />

      <h3 className="text-[10px] font-semibold uppercase tracking-[0.18em] text-neutral-500">
        {children}
      </h3>
    </div>
  );
}

function DataBox({
  label,
  value,
}: {
  label: string;
  value?: string;
}) {
  return (
    <div className="rounded-xl border border-white/[0.07] bg-[#0A0A0A] p-4">
      <p className="text-[9px] uppercase tracking-[0.15em] text-neutral-600">
        {label}
      </p>

      <p className="mt-2 break-words text-sm text-neutral-300">
        {value || "—"}
      </p>
    </div>
  );
}

/* =========================================================
   COMPONENT
========================================================= */

export default function ProjectAdminCard({
  project,
}: Props) {
  const router = useRouter();

  const [open, setOpen] =
    useState(false);

  const [deleting, setDeleting] =
    useState(false);

  /* =======================================================
     DELETE
  ======================================================= */

  async function handleDelete() {
    const confirmed =
      window.confirm(
        `Delete "${project.title}"?\n\nThis action cannot be undone.`,
      );

    if (!confirmed) {
      return;
    }

    setDeleting(true);

    try {
      const response =
        await fetch(
          `/api/admin/projects/${project._id}`,
          {
            method: "DELETE",
          },
        );

      const result =
        await response.json();

      if (
        !response.ok ||
        !result.success
      ) {
        window.alert(
          result.error ||
            "Unable to delete project.",
        );

        return;
      }

      setOpen(false);

      router.refresh();
    } catch {
      window.alert(
        "Something went wrong while deleting the project.",
      );
    } finally {
      setDeleting(false);
    }
  }

  return (
    <>
      {/* ===================================================
          CARD
      =================================================== */}

      <article className="group overflow-hidden rounded-2xl border border-white/[0.08] bg-[#080808] transition hover:border-white/[0.13]">

        {/* COVER */}

        <div className="relative aspect-[16/9] overflow-hidden bg-[#0D0D0D]">
          {project.coverImage?.url ? (
            <img
              src={project.coverImage.url}
              alt={
                project.coverImage.alt ||
                project.title
              }
              className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.03]"
            />
          ) : (
            <div className="flex h-full items-center justify-center">
              <BriefcaseBusiness
                size={34}
                strokeWidth={1}
                className="text-neutral-700"
              />
            </div>
          )}

          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />

          {/* STATUS */}

          <div className="absolute left-4 top-4 flex flex-wrap gap-2">
            <span
              className={`rounded-full border px-2.5 py-1 text-[9px] font-semibold uppercase tracking-[0.12em] ${
                project.published
                  ? "border-emerald-400/20 bg-emerald-400/10 text-emerald-400"
                  : "border-white/[0.1] bg-black/50 text-neutral-500"
              }`}
            >
              {project.published
                ? "Published"
                : "Draft"}
            </span>

            {project.featured && (
              <span className="rounded-full border border-[#FFC400]/20 bg-[#FFC400]/10 px-2.5 py-1 text-[9px] font-semibold uppercase tracking-[0.12em] text-[#FFC400]">
                Featured
              </span>
            )}
          </div>
        </div>

        {/* CARD CONTENT */}

        <div className="p-5">

          <div className="flex items-start justify-between gap-4">
            <div className="min-w-0">
              <h2 className="truncate text-lg font-semibold text-white">
                {project.title}
              </h2>

              <p className="mt-1 truncate text-xs text-neutral-600">
                /{project.slug}
              </p>
            </div>

            <span className="shrink-0 rounded-lg border border-white/[0.07] px-2 py-1 text-[9px] text-neutral-600">
              #{project.displayOrder}
            </span>
          </div>

          <p className="mt-4 line-clamp-2 text-sm leading-6 text-neutral-500">
            {project.shortDescription}
          </p>

          {/* META */}

          <div className="mt-5 grid grid-cols-2 gap-2">
            <DataBox
              label="Client"
              value={project.client}
            />

            <DataBox
              label="Industry"
              value={project.industry}
            />
          </div>

          {/* TECH */}

          {project.technologies.length >
            0 && (
            <div className="mt-4 flex flex-wrap gap-1.5">
              {project.technologies
                .slice(0, 4)
                .map((tech) => (
                  <span
                    key={tech}
                    className="rounded-md border border-white/[0.06] bg-white/[0.02] px-2 py-1 text-[9px] text-neutral-500"
                  >
                    {tech}
                  </span>
                ))}

              {project.technologies.length >
                4 && (
                <span className="rounded-md px-2 py-1 text-[9px] text-neutral-700">
                  +
                  {project.technologies.length -
                    4}
                </span>
              )}
            </div>
          )}

          {/* ACTIONS */}

          <div className="mt-5 flex gap-2 border-t border-white/[0.06] pt-4">

            <button
              type="button"
              onClick={() =>
                setOpen(true)
              }
              className="flex flex-1 items-center justify-center gap-2 rounded-xl border border-white/[0.08] bg-white/[0.02] px-3 py-3 text-xs font-medium text-neutral-300 transition hover:border-white/[0.15] hover:text-white"
            >
              <Eye size={14} />

              View details
            </button>

            <a
              href={`/admin/projects/${project._id}/edit`}
              className="flex items-center justify-center gap-2 rounded-xl bg-[#FFC400] px-4 py-3 text-xs font-semibold text-black transition hover:bg-[#FFD43D]"
            >
              <Pencil size={14} />

              Edit
            </a>
          </div>
        </div>
      </article>

      {/* ===================================================
          DETAIL MODAL
      =================================================== */}

      {open && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 p-3 backdrop-blur-sm sm:p-6"
          role="dialog"
          aria-modal="true"
          aria-label={`Project details: ${project.title}`}
        >
          <div className="relative flex max-h-[94vh] w-full max-w-5xl flex-col overflow-hidden rounded-2xl border border-white/[0.1] bg-[#070707] shadow-2xl">

            {/* =================================================
                MODAL HEADER
            ================================================= */}

            <header className="flex shrink-0 items-center justify-between gap-5 border-b border-white/[0.07] px-5 py-5 sm:px-7">
              <div className="min-w-0">
                <p className="text-[9px] font-semibold uppercase tracking-[0.2em] text-[#FFC400]">
                  Project details
                </p>

                <h2 className="mt-2 truncate text-xl font-semibold text-white sm:text-2xl">
                  {project.title}
                </h2>

                <p className="mt-1 truncate text-xs text-neutral-600">
                  /{project.slug}
                </p>
              </div>

              <button
                type="button"
                onClick={() =>
                  setOpen(false)
                }
                aria-label="Close project details"
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white/[0.09] text-neutral-500 transition hover:border-white/[0.18] hover:text-white"
              >
                <X size={17} />
              </button>
            </header>

            {/* =================================================
                MODAL BODY
            ================================================= */}

            <div className="min-h-0 flex-1 overflow-y-auto">

              {/* HERO IMAGE */}

              {project.coverImage?.url && (
                <div className="border-b border-white/[0.06]">
                  <div className="relative aspect-[21/8] min-h-[180px] overflow-hidden bg-[#0A0A0A]">
                    <img
                      src={
                        project.coverImage.url
                      }
                      alt={
                        project.coverImage.alt ||
                        project.title
                      }
                      className="h-full w-full object-cover"
                    />

                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />

                    <div className="absolute bottom-5 left-5 flex flex-wrap gap-2 sm:left-7">
                      <span
                        className={`rounded-full border px-3 py-1.5 text-[9px] font-semibold uppercase tracking-[0.12em] ${
                          project.published
                            ? "border-emerald-400/20 bg-black/50 text-emerald-400"
                            : "border-white/[0.1] bg-black/50 text-neutral-500"
                        }`}
                      >
                        {project.published
                          ? "Published"
                          : "Draft"}
                      </span>

                      {project.featured && (
                        <span className="rounded-full border border-[#FFC400]/20 bg-black/50 px-3 py-1.5 text-[9px] font-semibold uppercase tracking-[0.12em] text-[#FFC400]">
                          Featured
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              )}

              <div className="space-y-10 p-5 sm:p-7">

                {/* =================================================
                    BASIC
                ================================================= */}

                <section>
                  <SectionTitle icon={FileText}>
                    Basic information
                  </SectionTitle>

                  <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                    <DataBox
                      label="Client"
                      value={
                        project.client
                      }
                    />

                    <DataBox
                      label="Industry"
                      value={
                        project.industry
                      }
                    />

                    <DataBox
                      label="Slug"
                      value={
                        project.slug
                      }
                    />

                    <DataBox
                      label="Display order"
                      value={String(
                        project.displayOrder,
                      )}
                    />
                  </div>

                  <div className="mt-3 rounded-xl border border-white/[0.07] bg-[#0A0A0A] p-5">
                    <p className="text-[9px] uppercase tracking-[0.15em] text-neutral-600">
                      Short description
                    </p>

                    <p className="mt-3 text-sm leading-7 text-neutral-400">
                      {
                        project.shortDescription
                      }
                    </p>
                  </div>
                </section>

                {/* =================================================
                    OVERVIEW
                ================================================= */}

                <section>
                  <SectionTitle icon={FileText}>
                    Project overview
                  </SectionTitle>

                  <div className="space-y-4">
                    <div className="rounded-xl border border-white/[0.07] bg-[#0A0A0A] p-5">
                      <p className="text-[9px] uppercase tracking-[0.15em] text-neutral-600">
                        Overview
                      </p>

                      <p className="mt-3 whitespace-pre-wrap text-sm leading-7 text-neutral-400">
                        {project.overview}
                      </p>
                    </div>

                    {project.challenge && (
                      <div className="rounded-xl border border-white/[0.07] bg-[#0A0A0A] p-5">
                        <p className="text-[9px] uppercase tracking-[0.15em] text-neutral-600">
                          Challenge
                        </p>

                        <p className="mt-3 whitespace-pre-wrap text-sm leading-7 text-neutral-400">
                          {
                            project.challenge
                          }
                        </p>
                      </div>
                    )}

                    {project.solution && (
                      <div className="rounded-xl border border-white/[0.07] bg-[#0A0A0A] p-5">
                        <p className="text-[9px] uppercase tracking-[0.15em] text-neutral-600">
                          Solution
                        </p>

                        <p className="mt-3 whitespace-pre-wrap text-sm leading-7 text-neutral-400">
                          {
                            project.solution
                          }
                        </p>
                      </div>
                    )}
                  </div>
                </section>

                {/* =================================================
                    FEATURES
                ================================================= */}

                {project.features.length >
                  0 && (
                  <section>
                    <SectionTitle icon={CheckCircle2}>
                      Features
                    </SectionTitle>

                    <div className="grid gap-3 md:grid-cols-2">
                      {project.features.map(
                        (
                          feature,
                          index,
                        ) => (
                          <div
                            key={`${feature.title}-${index}`}
                            className="rounded-xl border border-white/[0.07] bg-[#0A0A0A] p-5"
                          >
                            <div className="flex items-start justify-between gap-3">
                              <h4 className="text-sm font-semibold text-white">
                                {
                                  feature.title
                                }
                              </h4>

                              {feature.icon && (
                                <span className="text-[8px] uppercase tracking-[0.12em] text-neutral-700">
                                  {
                                    feature.icon
                                  }
                                </span>
                              )}
                            </div>

                            <p className="mt-2 text-xs leading-6 text-neutral-500">
                              {
                                feature.description
                              }
                            </p>
                          </div>
                        ),
                      )}
                    </div>
                  </section>
                )}

                {/* =================================================
                    TECHNOLOGIES
                ================================================= */}

                {project.technologies.length >
                  0 && (
                  <section>
                    <SectionTitle icon={Code2}>
                      Technologies
                    </SectionTitle>

                    <div className="flex flex-wrap gap-2">
                      {project.technologies.map(
                        (tech) => (
                          <span
                            key={tech}
                            className="rounded-lg border border-white/[0.08] bg-[#0A0A0A] px-3 py-2 text-xs text-neutral-400"
                          >
                            {tech}
                          </span>
                        ),
                      )}
                    </div>
                  </section>
                )}

                {/* =================================================
                    RESULTS
                ================================================= */}

                {project.results.length >
                  0 && (
                  <section>
                    <SectionTitle icon={ArrowUpRight}>
                      Results
                    </SectionTitle>

                    <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                      {project.results.map(
                        (
                          result,
                          index,
                        ) => (
                          <div
                            key={`${result.label}-${index}`}
                            className="rounded-xl border border-white/[0.07] bg-[#0A0A0A] p-5"
                          >
                            <p className="text-[9px] uppercase tracking-[0.15em] text-neutral-600">
                              {
                                result.label
                              }
                            </p>

                            <p className="mt-2 text-2xl font-semibold text-[#FFC400]">
                              {
                                result.value
                              }
                            </p>

                            {result.description && (
                              <p className="mt-2 text-xs leading-5 text-neutral-500">
                                {
                                  result.description
                                }
                              </p>
                            )}
                          </div>
                        ),
                      )}
                    </div>
                  </section>
                )}

                {/* =================================================
                    SERVICES
                ================================================= */}

                {project.services.length >
                  0 && (
                  <section>
                    <SectionTitle icon={BriefcaseBusiness}>
                      Related services
                    </SectionTitle>

                    <div className="flex flex-wrap gap-2">
                      {project.services.map(
                        (service) => (
                          <span
                            key={
                              service._id
                            }
                            className="rounded-lg border border-white/[0.08] bg-[#0A0A0A] px-3 py-2 text-xs text-neutral-400"
                          >
                            {
                              service.title
                            }
                          </span>
                        ),
                      )}
                    </div>
                  </section>
                )}

                {/* =================================================
                    LINKS
                ================================================= */}

                {(project.liveUrl ||
                  project.githubUrl) && (
                  <section>
                    <SectionTitle icon={Link2}>
                      Project links
                    </SectionTitle>

                    <div className="grid gap-3 sm:grid-cols-2">
                      {project.liveUrl && (
                        <a
                          href={
                            project.liveUrl
                          }
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center justify-between rounded-xl border border-white/[0.07] bg-[#0A0A0A] p-4 text-sm text-neutral-300 transition hover:border-[#FFC400]/30 hover:text-[#FFC400]"
                        >
                          <span className="flex items-center gap-2">
                            <ExternalLink
                              size={14}
                            />
                            Live website
                          </span>

                          <ArrowUpRight
                            size={14}
                          />
                        </a>
                      )}

                      {project.githubUrl && (
                        <a
                          href={
                            project.githubUrl
                          }
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center justify-between rounded-xl border border-white/[0.07] bg-[#0A0A0A] p-4 text-sm text-neutral-300 transition hover:border-[#FFC400]/30 hover:text-[#FFC400]"
                        >
                          <span className="flex items-center gap-2">
                            <Github
                              size={14}
                            />
                            GitHub
                          </span>

                          <ArrowUpRight
                            size={14}
                          />
                        </a>
                      )}
                    </div>
                  </section>
                )}

                {/* =================================================
                    GALLERY
                ================================================= */}

                {project.gallery.length >
                  0 && (
                  <section>
                    <SectionTitle icon={ImageIcon}>
                      Project gallery
                    </SectionTitle>

                    <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                      {project.gallery.map(
                        (
                          media,
                          index,
                        ) => (
                          <div
                            key={`${media.url}-${index}`}
                            className="overflow-hidden rounded-xl border border-white/[0.07] bg-[#0A0A0A]"
                          >
                            <div className="relative aspect-[16/10] bg-black">
                              {media.type ===
                                "video" ? (
                                <video
                                  src={
                                    media.url
                                  }
                                  controls
                                  preload="metadata"
                                  className="h-full w-full object-cover"
                                />
                              ) : (
                                <img
                                  src={
                                    media.url
                                  }
                                  alt={
                                    media.title
                                  }
                                  className="h-full w-full object-cover"
                                />
                              )}
                            </div>

                            <div className="p-3">
                              <p className="text-xs font-medium text-neutral-300">
                                {
                                  media.title
                                }
                              </p>

                              <p className="mt-1 text-[9px] uppercase tracking-[0.12em] text-neutral-700">
                                {
                                  media.type
                                }
                              </p>
                            </div>
                          </div>
                        ),
                      )}
                    </div>
                  </section>
                )}

                {/* =================================================
                    SEO
                ================================================= */}

                <section>
                  <SectionTitle icon={ShieldCheck}>
                    SEO & social
                  </SectionTitle>

                  <div className="grid gap-3 sm:grid-cols-2">
                    <DataBox
                      label="SEO title"
                      value={
                        project.seoTitle
                      }
                    />

                    <DataBox
                      label="Canonical URL"
                      value={
                        project.canonicalUrl
                      }
                    />

                    <DataBox
                      label="OG title"
                      value={
                        project.ogTitle
                      }
                    />

                    <DataBox
                      label="OG image"
                      value={
                        project.ogImage?.url
                      }
                    />
                  </div>

                  {project.seoDescription && (
                    <div className="mt-3 rounded-xl border border-white/[0.07] bg-[#0A0A0A] p-5">
                      <p className="text-[9px] uppercase tracking-[0.15em] text-neutral-600">
                        SEO description
                      </p>

                      <p className="mt-3 text-sm leading-6 text-neutral-400">
                        {
                          project.seoDescription
                        }
                      </p>
                    </div>
                  )}

                  {project.ogDescription && (
                    <div className="mt-3 rounded-xl border border-white/[0.07] bg-[#0A0A0A] p-5">
                      <p className="text-[9px] uppercase tracking-[0.15em] text-neutral-600">
                        OG description
                      </p>

                      <p className="mt-3 text-sm leading-6 text-neutral-400">
                        {
                          project.ogDescription
                        }
                      </p>
                    </div>
                  )}
                </section>

                {/* =================================================
                    SYSTEM META
                ================================================= */}

                <section>
                  <SectionTitle icon={Clock3}>
                    System information
                  </SectionTitle>

                  <div className="grid gap-3 sm:grid-cols-2">
                    <DataBox
                      label="Created"
                      value={new Date(
                        project.createdAt,
                      ).toLocaleString(
                        "en-IN",
                      )}
                    />

                    <DataBox
                      label="Last updated"
                      value={new Date(
                        project.updatedAt,
                      ).toLocaleString(
                        "en-IN",
                      )}
                    />
                  </div>
                </section>

              </div>
            </div>

            {/* =================================================
                FIXED MODAL ACTION BAR
            ================================================= */}

            <footer className="shrink-0 border-t border-white/[0.08] bg-[#080808]/95 p-4 backdrop-blur-xl sm:px-6">
              <div className="flex flex-col gap-2 sm:flex-row sm:justify-end">

                <button
                  type="button"
                  onClick={() =>
                    setOpen(false)
                  }
                  className="order-3 rounded-xl border border-white/[0.08] px-5 py-3 text-xs font-medium text-neutral-400 transition hover:text-white sm:order-1"
                >
                  Close
                </button>

                <button
                  type="button"
                  disabled={deleting}
                  onClick={
                    handleDelete
                  }
                  className="order-2 flex items-center justify-center gap-2 rounded-xl border border-red-500/20 bg-red-500/[0.06] px-5 py-3 text-xs font-medium text-red-400 transition hover:bg-red-500/[0.1] disabled:cursor-not-allowed disabled:opacity-50 sm:order-2"
                >
                  <Trash2 size={14} />

                  {deleting
                    ? "Deleting..."
                    : "Delete"}
                </button>

                <a
                  href={`/admin/projects/${project._id}/edit`}
                  className="order-1 flex items-center justify-center gap-2 rounded-xl bg-[#FFC400] px-6 py-3 text-xs font-semibold text-black transition hover:bg-[#FFD43D] sm:order-3"
                >
                  <Pencil size={14} />

                  Edit project
                </a>
              </div>
            </footer>
          </div>
        </div>
      )}
    </>
  );
}