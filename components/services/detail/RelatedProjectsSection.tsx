import Image from "next/image";
import Link from "next/link";
import {
  ArrowUpRight,
  ExternalLink,
  FolderKanban,
} from "lucide-react";

export type RelatedProjectData = {
  id: string;
  title: string;
  slug: string;
  shortDescription: string;
  industry?: string;
  coverImage?: {
    url: string;
    alt?: string;
  };
};

type RelatedProjectsSectionProps = {
  projects: RelatedProjectData[];
};

export default function RelatedProjectsSection({
  projects,
}: RelatedProjectsSectionProps) {
  if (!projects.length) {
    return null;
  }

  return (
    <section
      id="related-projects"
      aria-labelledby="related-projects-heading"
      className="relative border-t border-white/[0.06] bg-[#050505] py-20 sm:py-24 lg:py-28"
    >
      <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
        {/* HEADER */}
        <div className="mb-10 flex flex-col gap-5 sm:mb-12 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl">
            <div className="flex items-center gap-3">
              <span className="flex h-9 w-9 items-center justify-center rounded-xl border border-[#FFC400]/15 bg-[#FFC400]/[0.04] text-[#FFC400]">
                <FolderKanban size={15} />
              </span>

              <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#FFC400]">
                Selected work
              </span>
            </div>

            <h2
              id="related-projects-heading"
              className="mt-5 text-3xl font-semibold tracking-[-0.04em] text-white sm:text-4xl"
            >
              Work that brings this
              <span className="text-neutral-500">
                {" "}
                service to life.
              </span>
            </h2>

            <p className="mt-4 max-w-xl text-sm leading-7 text-neutral-500">
              Explore selected projects where we used this
              service to solve real business problems and
              create useful digital experiences.
            </p>
          </div>

          <Link
            href="/projects"
            className="group inline-flex w-fit items-center gap-2 text-xs font-medium text-neutral-500 transition-colors hover:text-white"
          >
            View all work

            <ArrowUpRight
              size={14}
              className="transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
            />
          </Link>
        </div>

        {/* PROJECT GRID */}
        <div className="grid gap-5 md:grid-cols-2">
          {projects.map((project, index) => (
            <Link
              key={project.id}
              href={`/projects/${project.slug}`}
              className="group block overflow-hidden rounded-[28px] border border-white/[0.07] bg-[#090909] transition-all duration-500 hover:-translate-y-1 hover:border-[#FFC400]/20 hover:shadow-[0_25px_70px_rgba(0,0,0,0.35)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FFC400]"
            >
              {/* IMAGE */}
              <div className="relative aspect-[16/9] overflow-hidden bg-[#0D0D0D]">
                {project.coverImage?.url ? (
                  <Image
                    src={project.coverImage.url}
                    alt={
                      project.coverImage.alt ||
                      `${project.title} project`
                    }
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                  />
                ) : (
                  <div className="flex h-full items-center justify-center">
                    <FolderKanban
                      size={32}
                      className="text-neutral-800"
                    />
                  </div>
                )}

                {/* IMAGE OVERLAY */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent opacity-70 transition-opacity duration-500 group-hover:opacity-90" />

                {/* NUMBER */}
                <div className="absolute left-5 top-5 flex h-8 w-8 items-center justify-center rounded-full border border-white/10 bg-black/40 text-[9px] font-medium tabular-nums text-neutral-400 backdrop-blur-md">
                  {String(index + 1).padStart(2, "0")}
                </div>

                {/* TOP RIGHT ACTION */}
                <div className="absolute right-5 top-5 flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-black/40 text-neutral-300 backdrop-blur-md transition-all duration-300 group-hover:border-[#FFC400]/30 group-hover:bg-[#FFC400] group-hover:text-black">
                  <ExternalLink size={14} />
                </div>
              </div>

              {/* CONTENT */}
              <div className="p-6 sm:p-7">
                <div className="flex items-center justify-between gap-4">
                  {project.industry ? (
                    <span className="text-[9px] font-semibold uppercase tracking-[0.16em] text-[#FFC400]">
                      {project.industry}
                    </span>
                  ) : (
                    <span />
                  )}

                  <span className="text-[9px] tabular-nums text-neutral-700">
                    View case study
                  </span>
                </div>

                <h3 className="mt-4 text-xl font-semibold tracking-[-0.025em] text-white transition-colors duration-300 group-hover:text-[#FFC400]">
                  {project.title}
                </h3>

                <p className="mt-3 line-clamp-2 text-xs leading-6 text-neutral-500">
                  {project.shortDescription}
                </p>

                {/* FOOTER */}
                <div className="mt-6 flex items-center justify-between border-t border-white/[0.06] pt-5">
                  <span className="text-[10px] text-neutral-600">
                    Explore project
                  </span>

                  <span className="flex h-8 w-8 items-center justify-center rounded-full border border-white/[0.07] text-neutral-500 transition-all duration-300 group-hover:border-[#FFC400]/20 group-hover:bg-[#FFC400]/10 group-hover:text-[#FFC400]">
                    <ArrowUpRight size={14} />
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}