"use client";

import Link from "next/link";
import { ArrowUpRight, ExternalLink } from "lucide-react";
import { motion } from "framer-motion";

type ProjectCardData = {
  id: string;
  title: string;
  slug: string;
  client: string;
  industry: string;
  shortDescription: string;
  technologies: string[];
  coverImage: {
    url: string;
    publicId: string | null;
  } | null;
  liveUrl: string | null;
  featured: boolean;
};

type ProjectCardProps = {
  project: ProjectCardData;
  index: number;
};

export default function ProjectCard({
  project,
  index,
}: ProjectCardProps) {
  return (
    <motion.article
      initial={{
        opacity: 0,
        y: 24,
      }}
      whileInView={{
        opacity: 1,
        y: 0,
      }}
      viewport={{
        once: true,
        amount: 0.15,
      }}
      transition={{
        duration: 0.55,
        delay: Math.min(index * 0.08, 0.24),
        ease: [0.22, 1, 0.36, 1],
      }}
      className="group relative overflow-hidden rounded-[24px] border border-[#202020] bg-[#0A0A0A] transition-colors duration-300 hover:border-[#303030]"
    >
      {/* IMAGE */}
      <Link
        href={`/projects/${project.slug}`}
        aria-label={`View ${project.title} project`}
        className="block"
      >
        <div className="relative aspect-[16/10] overflow-hidden bg-[#0D0D0D]">
          {project.coverImage ? (
            <img
              src={project.coverImage.url}
              alt={`${project.title} project`}
              loading={index === 0 ? "eager" : "lazy"}
              className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.035]"
            />
          ) : (
            <div className="flex h-full items-center justify-center bg-[#101010]">
              <span className="text-xs uppercase tracking-[0.18em] text-[#444]">
                Aman Digital Solutions
              </span>
            </div>
          )}

          {/* IMAGE OVERLAY */}
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/5 to-transparent"
          />

          {/* FEATURED */}
          {project.featured && (
            <span className="absolute left-4 top-4 inline-flex items-center rounded-full border border-[#FFC400]/25 bg-black/55 px-3 py-1.5 text-[9px] font-medium uppercase tracking-[0.16em] text-[#FFC400] backdrop-blur-md">
              Featured work
            </span>
          )}

          {/* VIEW BUTTON */}
          <span className="absolute bottom-4 right-4 flex h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-black/45 text-white opacity-0 backdrop-blur-md transition-all duration-300 group-hover:opacity-100">
            <ArrowUpRight size={17} />
          </span>
        </div>
      </Link>

      {/* CONTENT */}
      <div className="p-5 sm:p-6">
        {/* META */}
        <div className="flex flex-wrap items-center gap-x-3 gap-y-2 text-[10px] uppercase tracking-[0.14em] text-[#555]">
          <span>{project.industry}</span>

          <span
            aria-hidden="true"
            className="h-1 w-1 rounded-full bg-[#3A3A3A]"
          />

          <span>{project.client}</span>
        </div>

        {/* TITLE */}
        <div className="mt-3 flex items-start justify-between gap-5">
          <Link
            href={`/projects/${project.slug}`}
            className="group/title"
          >
            <h3 className="text-2xl font-semibold tracking-[-0.035em] text-[#F0F0F0] transition-colors duration-200 group-hover/title:text-[#FFC400] sm:text-3xl">
              {project.title}
            </h3>
          </Link>

          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Open ${project.title} live website`}
              className="mt-1 flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-[#292929] text-[#666] transition-all duration-200 hover:border-[#FFC400]/30 hover:bg-[#FFC400]/[0.06] hover:text-[#FFC400]"
            >
              <ExternalLink size={14} />
            </a>
          )}
        </div>

        {/* DESCRIPTION */}
        <p className="mt-3 max-w-2xl text-sm leading-6 text-[#777]">
          {project.shortDescription}
        </p>

        {/* TECHNOLOGIES */}
        {project.technologies.length > 0 && (
          <div className="mt-5 flex flex-wrap gap-2">
            {project.technologies.slice(0, 5).map((technology) => (
              <span
                key={technology}
                className="rounded-full border border-[#222] bg-[#0D0D0D] px-2.5 py-1 text-[10px] text-[#666]"
              >
                {technology}
              </span>
            ))}
          </div>
        )}

        {/* BOTTOM CTA */}
        <div className="mt-6 flex items-center justify-between border-t border-[#1D1D1D] pt-4">
          <span className="text-[10px] uppercase tracking-[0.16em] text-[#444]">
            Case study
          </span>

          <Link
            href={`/projects/${project.slug}`}
            className="group/cta inline-flex items-center gap-2 text-xs font-medium text-[#BDBDBD] transition-colors duration-200 hover:text-[#FFC400]"
          >
            View project

            <ArrowUpRight
              size={14}
              className="transition-transform duration-200 group-hover/cta:-translate-y-0.5 group-hover/cta:translate-x-0.5"
            />
          </Link>
        </div>
      </div>
    </motion.article>
  );
}