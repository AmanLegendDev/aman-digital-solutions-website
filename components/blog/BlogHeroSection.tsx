import Link from "next/link";
import {
  ArrowDown,
  ArrowRight,
  BookOpen,
} from "lucide-react";

export default function BlogHeroSection() {
  return (
    <section className="relative overflow-hidden border-b border-white/[0.06] bg-[#050505]">
      {/* =====================================================
          BACKGROUND
      ===================================================== */}

      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-[-180px] h-[520px] w-[900px] -translate-x-1/2 rounded-full bg-[#FFC400]/[0.025] blur-[140px]"
      />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-[-180px] right-[-120px] h-[360px] w-[360px] rounded-full bg-white/[0.012] blur-[100px]"
      />

      <div className="relative mx-auto max-w-7xl px-5 pb-20 pt-28 sm:px-8 sm:pb-24 sm:pt-32 lg:px-10 lg:pb-28 lg:pt-36">
        {/* =================================================
            BREADCRUMB
        ================================================= */}

        <nav
          aria-label="Breadcrumb"
          className="mb-14"
        >
          <ol className="flex items-center gap-2 text-[9px] font-medium uppercase tracking-[0.16em]">
            <li>
              <Link
                href="/"
                className="text-neutral-700 transition-colors hover:text-neutral-400"
              >
                Home
              </Link>
            </li>

            <li
              aria-hidden="true"
              className="text-neutral-800"
            >
              /
            </li>

            <li
              aria-current="page"
              className="text-[#FFC400]"
            >
              Blog
            </li>
          </ol>
        </nav>

        {/* =================================================
            HERO CONTENT
        ================================================= */}

        <div className="grid items-end gap-12 lg:grid-cols-[1.2fr_0.8fr] lg:gap-20">
          {/* LEFT */}

          <div>
            {/* EYEBROW */}

            <div className="flex items-center gap-3">
              <span className="flex h-9 w-9 items-center justify-center rounded-xl border border-[#FFC400]/20 bg-[#FFC400]/[0.05] text-[#FFC400]">
                <BookOpen size={15} />
              </span>

              <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#FFC400]">
                Insights & ideas
              </span>
            </div>

            {/* HEADING */}

            <h1 className="mt-7 max-w-4xl text-5xl font-semibold leading-[0.94] tracking-[-0.055em] text-white sm:text-6xl lg:text-[5.5rem]">
              Ideas that help
              <br />
              <span className="text-neutral-500">
                businesses move forward.
              </span>
            </h1>

            {/* DESCRIPTION */}

            <p className="mt-8 max-w-2xl text-base leading-8 text-neutral-500 sm:text-lg">
              Practical insights on websites, technology,
              digital strategy, SEO and building better
              experiences for modern businesses.
            </p>

            {/* CTA */}

            <div className="mt-9">
              <a
                href="#articles"
                className="group inline-flex items-center gap-3 text-xs font-semibold text-white transition-colors hover:text-[#FFC400]"
              >
                Explore articles

                <span className="flex h-8 w-8 items-center justify-center rounded-full border border-white/[0.1] transition-all duration-300 group-hover:border-[#FFC400]/30 group-hover:bg-[#FFC400]/[0.05]"
                >
                  <ArrowDown
                    size={13}
                    className="transition-transform duration-300 group-hover:translate-y-0.5"
                  />
                </span>
              </a>
            </div>
          </div>

          {/* RIGHT */}

          <div className="lg:justify-self-end">
            <div className="max-w-sm border-l border-white/[0.08] pl-6 sm:pl-8">
              <p className="text-[9px] font-semibold uppercase tracking-[0.18em] text-neutral-700">
                From the studio
              </p>

              <p className="mt-4 text-sm leading-7 text-neutral-500">
                No filler. No recycled buzzwords. Just
                useful thinking around digital products,
                websites and the systems behind them.
              </p>

              <Link
                href="/contact"
                className="group mt-7 inline-flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.15em] text-white/60 transition-colors hover:text-[#FFC400]"
              >
                Work with us

                <ArrowRight
                  size={13}
                  className="transition-transform duration-300 group-hover:translate-x-1"
                />
              </Link>
            </div>
          </div>
        </div>

        {/* =================================================
            BOTTOM META
        ================================================= */}

        <div className="mt-16 flex flex-wrap items-center gap-x-8 gap-y-3 border-t border-white/[0.06] pt-6">
          <span className="text-[9px] font-medium uppercase tracking-[0.16em] text-neutral-700">
            Web development
          </span>

          <span
            aria-hidden="true"
            className="h-1 w-1 rounded-full bg-neutral-800"
          />

          <span className="text-[9px] font-medium uppercase tracking-[0.16em] text-neutral-700">
            Digital strategy
          </span>

          <span
            aria-hidden="true"
            className="h-1 w-1 rounded-full bg-neutral-800"
          />

          <span className="text-[9px] font-medium uppercase tracking-[0.16em] text-neutral-700">
            SEO & growth
          </span>

          <span
            aria-hidden="true"
            className="h-1 w-1 rounded-full bg-neutral-800"
          />

          <span className="text-[9px] font-medium uppercase tracking-[0.16em] text-neutral-700">
            Technology
          </span>
        </div>
      </div>
    </section>
  );
}