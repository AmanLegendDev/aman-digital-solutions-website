import {
  ArrowDown,
  ArrowUpRight,
  Layers3,
  Sparkles,
} from "lucide-react";
import Link from "next/link";

type ProjectsHeroProps = {
  totalProjects: number;
  featuredProjects: number;
};

export default function ProjectsHero({
  totalProjects,
  featuredProjects,
}: ProjectsHeroProps) {
  return (
    <section
      aria-labelledby="projects-hero-heading"
      className="relative overflow-hidden border-b border-white/[0.06] bg-[#050505]"
    >
      {/* =====================================================
          AMBIENT LIGHT
      ===================================================== */}

      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-[-180px] h-[500px] w-[900px] -translate-x-1/2 rounded-full bg-[#FFC400]/[0.035] blur-[150px]"
      />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute right-[-120px] top-[35%] h-[300px] w-[300px] rounded-full bg-white/[0.015] blur-[100px]"
      />

      {/* =====================================================
          GRID TEXTURE
      ===================================================== */}

      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.025]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.12) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.12) 1px, transparent 1px)",
          backgroundSize: "80px 80px",
        }}
      />

      <div className="relative mx-auto max-w-7xl px-5 pb-20 pt-28 sm:px-8 sm:pb-24 sm:pt-32 lg:px-10 lg:pb-28 lg:pt-36">
        {/* =====================================================
            BREADCRUMB
        ===================================================== */}

        <nav
          aria-label="Breadcrumb"
          className="mb-12 flex items-center gap-2 text-[10px] font-medium uppercase tracking-[0.16em]"
        >
          <Link
            href="/"
            className="text-neutral-600 transition-colors hover:text-white"
          >
            Home
          </Link>

          <span
            aria-hidden="true"
            className="text-neutral-800"
          >
            /
          </span>

          <span className="text-neutral-400">
            Our Work
          </span>
        </nav>

        {/* =====================================================
            HERO GRID
        ===================================================== */}

        <div className="grid gap-14 lg:grid-cols-[1fr_360px] lg:items-end lg:gap-20">
          {/* =================================================
              MAIN COPY
          ================================================= */}

          <div>
            <div className="flex items-center gap-3">
              <span
                aria-hidden="true"
                className="flex h-8 w-8 items-center justify-center rounded-xl border border-[#FFC400]/20 bg-[#FFC400]/[0.05] text-[#FFC400]"
              >
                <Sparkles size={14} />
              </span>

              <span className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[#FFC400]">
                Selected work
              </span>
            </div>

            <h1
              id="projects-hero-heading"
              className="mt-7 max-w-5xl text-5xl font-semibold leading-[0.98] tracking-[-0.055em] text-white sm:text-6xl lg:text-[5.5rem]"
            >
              Digital work
              <br />
              <span className="text-neutral-500">
                built with purpose.
              </span>
            </h1>

            <p className="mt-7 max-w-2xl text-sm leading-7 text-neutral-500 sm:text-base sm:leading-8">
              We don&apos;t build websites just to fill
              screens. We build digital experiences,
              business systems and products designed to
              solve real problems and move businesses
              forward.
            </p>

            {/* =================================================
                ACTIONS
            ================================================= */}

            <div className="mt-9 flex flex-wrap items-center gap-3">
              <Link
                href="/contact"
                className="group inline-flex items-center gap-2 rounded-full bg-[#FFC400] px-5 py-3 text-xs font-semibold text-black transition-all duration-200 hover:bg-[#FFD43B] hover:shadow-[0_0_30px_rgba(255,196,0,0.14)]"
              >
                Start a project

                <ArrowUpRight
                  size={15}
                  className="transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                />
              </Link>

              <a
                href="#all-projects"
                className="group inline-flex items-center gap-2 rounded-full border border-white/[0.09] bg-white/[0.02] px-5 py-3 text-xs font-medium text-neutral-400 transition-all duration-200 hover:border-white/[0.16] hover:bg-white/[0.04] hover:text-white"
              >
                Explore work

                <ArrowDown
                  size={14}
                  className="transition-transform duration-200 group-hover:translate-y-0.5"
                />
              </a>
            </div>
          </div>

          {/* =================================================
              SIDE STAT PANEL
          ================================================= */}

          <div className="lg:pb-1">
            <div className="overflow-hidden rounded-3xl border border-white/[0.07] bg-[#090909]">
              {/* TOP */}
              <div className="border-b border-white/[0.06] p-5 sm:p-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="flex h-9 w-9 items-center justify-center rounded-xl border border-white/[0.07] bg-white/[0.02] text-neutral-500">
                      <Layers3 size={15} />
                    </span>

                    <div>
                      <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-neutral-600">
                        Portfolio
                      </p>

                      <p className="mt-1 text-xs text-neutral-400">
                        What we&apos;ve built
                      </p>
                    </div>
                  </div>

                  <span className="h-2 w-2 rounded-full bg-[#FFC400] shadow-[0_0_12px_rgba(255,196,0,0.5)]" />
                </div>
              </div>

              {/* STATS */}
              <div className="grid grid-cols-2 divide-x divide-white/[0.06]">
                <div className="p-5 sm:p-6">
                  <p className="text-3xl font-semibold tracking-[-0.04em] text-white">
                    {String(totalProjects).padStart(
                      2,
                      "0"
                    )}
                  </p>

                  <p className="mt-2 text-[9px] font-medium uppercase tracking-[0.16em] text-neutral-700">
                    Projects
                  </p>
                </div>

                <div className="p-5 sm:p-6">
                  <p className="text-3xl font-semibold tracking-[-0.04em] text-white">
                    {String(
                      featuredProjects
                    ).padStart(2, "0")}
                  </p>

                  <p className="mt-2 text-[9px] font-medium uppercase tracking-[0.16em] text-neutral-700">
                    Featured
                  </p>
                </div>
              </div>

              {/* FOOTER */}
              <div className="border-t border-white/[0.06] px-5 py-4 sm:px-6">
                <p className="text-[10px] leading-5 text-neutral-700">
                  Websites · Business systems · Digital
                  experiences
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* =====================================================
            BOTTOM SCROLL CUE
        ===================================================== */}

        <div className="mt-16 flex items-center gap-3 sm:mt-20">
          <span className="h-px w-10 bg-[#FFC400]/40" />

          <span className="text-[9px] font-semibold uppercase tracking-[0.2em] text-neutral-700">
            Explore selected work
          </span>
        </div>
      </div>
    </section>
  );
}