"use client";

import { useEffect } from "react";
import Link from "next/link";

type ErrorPageProps = {
  error: Error & {
    digest?: string;
  };
  reset: () => void;
};

export default function ErrorPage({
  error,
  reset,
}: ErrorPageProps) {
  useEffect(() => {
    // Keep detailed error information out of the UI.
    // Connect a monitoring service here later if required.
    console.error("Application error:", error);
  }, [error]);

  return (
    <main
      id="main-content"
      className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#050505] px-6 py-24 text-white"
    >
      {/* =====================================================
          BACKGROUND ATMOSPHERE
      ===================================================== */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 overflow-hidden"
      >
        <div className="absolute left-1/2 top-1/4 h-72 w-72 -translate-x-1/2 rounded-full bg-[#FFC400]/[0.06] blur-[120px]" />

        <div className="absolute bottom-0 right-0 h-72 w-72 rounded-full bg-white/[0.025] blur-[120px]" />
      </div>

      {/* =====================================================
          SUBTLE GRID
      ===================================================== */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.025]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.8) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.8) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
        }}
      />

      {/* =====================================================
          CONTENT
      ===================================================== */}
      <section
        aria-labelledby="error-title"
        className="relative z-10 mx-auto w-full max-w-2xl text-center"
      >
        {/* Brand */}
        <p className="mb-8 text-sm font-semibold tracking-wide text-white">
          Aman Digital Solutions
        </p>

        {/* Status */}
        <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-white/[0.08] bg-white/[0.025] px-4 py-2 text-xs font-medium uppercase tracking-[0.18em] text-neutral-500">
          <span
            aria-hidden="true"
            className="h-1.5 w-1.5 rounded-full bg-[#FFC400]"
          />

          Something went wrong
        </div>

        {/* Error number */}
        <div
          aria-hidden="true"
          className="select-none text-[clamp(6rem,20vw,12rem)] font-black leading-[0.75] tracking-[-0.08em] text-white/[0.045]"
        >
          500
        </div>

        {/* Main content */}
        <div className="relative -mt-8 sm:-mt-14">
          <h1
            id="error-title"
            className="text-3xl font-semibold tracking-tight text-white sm:text-5xl"
          >
            Something went wrong.
          </h1>

          <p className="mx-auto mt-5 max-w-xl text-sm leading-7 text-neutral-500 sm:text-base">
            We hit an unexpected problem while loading this page.
            Please try again. If the problem continues, return to
            the homepage or contact us directly.
          </p>

          {/* Actions */}
          <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <button
              type="button"
              onClick={() => reset()}
              className="inline-flex min-w-[160px] items-center justify-center rounded-xl bg-[#FFC400] px-6 py-3.5 text-sm font-semibold text-black transition-all duration-300 hover:bg-[#FFD23D] hover:shadow-[0_0_35px_rgba(255,196,0,0.12)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FFC400] focus-visible:ring-offset-2 focus-visible:ring-offset-[#050505]"
            >
              Try Again
            </button>

            <Link
              href="/"
              className="inline-flex min-w-[160px] items-center justify-center rounded-xl border border-white/[0.1] bg-white/[0.025] px-6 py-3.5 text-sm font-medium text-neutral-300 transition-all duration-300 hover:border-white/[0.18] hover:bg-white/[0.05] hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/30 focus-visible:ring-offset-2 focus-visible:ring-offset-[#050505]"
            >
              Back to Home
            </Link>

            <Link
              href="/contact"
              className="inline-flex min-w-[160px] items-center justify-center rounded-xl border border-white/[0.08] px-6 py-3.5 text-sm font-medium text-neutral-500 transition-all duration-300 hover:border-white/[0.15] hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/30 focus-visible:ring-offset-2 focus-visible:ring-offset-[#050505]"
            >
              Contact Us
            </Link>
          </div>

          {/* Helpful navigation */}
          <div className="mt-12 border-t border-white/[0.06] pt-7">
            <p className="text-xs text-neutral-600">
              You can also explore
            </p>

            <nav
              aria-label="Error page navigation"
              className="mt-3 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-xs"
            >
              <Link
                href="/services"
                className="text-neutral-500 transition-colors hover:text-[#FFC400]"
              >
                Services
              </Link>

              <Link
                href="/projects"
                className="text-neutral-500 transition-colors hover:text-[#FFC400]"
              >
                Projects
              </Link>

              <Link
                href="/pricing"
                className="text-neutral-500 transition-colors hover:text-[#FFC400]"
              >
                Pricing
              </Link>

              <Link
                href="/blog"
                className="text-neutral-500 transition-colors hover:text-[#FFC400]"
              >
                Blog
              </Link>

              <Link
                href="/about"
                className="text-neutral-500 transition-colors hover:text-[#FFC400]"
              >
                About
              </Link>
            </nav>
          </div>
        </div>
      </section>
    </main>
  );
}