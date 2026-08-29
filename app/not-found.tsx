import type { Metadata } from "next";

import Navbar from "@/components/agency/navbar/Navbar";
import Footer from "@/components/agency/footer/Footer";

export const metadata: Metadata = {
  title: "Page Not Found | Aman Digital Solutions",
  description:
    "The page you're looking for could not be found. Explore Aman Digital Solutions for websites, web applications, SEO and digital solutions.",
  robots: {
    index: false,
    follow: true,
  },
};

export default function NotFound() {
  return (
    <>
      <Navbar />

      <main
        id="main-content"
        className="relative flex min-h-[calc(100vh-80px)] items-center justify-center overflow-hidden bg-[#050505] px-6 py-24 text-white"
      >
        {/* Background atmosphere */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0"
        >
          <div className="absolute left-1/2 top-1/4 h-72 w-72 -translate-x-1/2 rounded-full bg-[#FFC400]/[0.07] blur-[120px]" />

          <div className="absolute bottom-0 left-0 h-64 w-64 rounded-full bg-white/[0.025] blur-[100px]" />

          <div className="absolute right-0 top-0 h-64 w-64 rounded-full bg-[#FFC400]/[0.035] blur-[100px]" />
        </div>

        {/* Subtle grid */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 opacity-[0.025]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.8) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.8) 1px, transparent 1px)",
            backgroundSize: "48px 48px",
          }}
        />

        <section
          aria-labelledby="not-found-title"
          className="relative z-10 mx-auto w-full max-w-3xl text-center"
        >
          {/* Status */}
          <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-white/[0.08] bg-white/[0.025] px-4 py-2 text-xs font-medium tracking-[0.18em] text-neutral-500 uppercase">
            <span
              aria-hidden="true"
              className="h-1.5 w-1.5 rounded-full bg-[#FFC400]"
            />

            Error 404
          </div>

          {/* 404 */}
          <div
            aria-hidden="true"
            className="select-none text-[clamp(7rem,24vw,15rem)] font-black leading-[0.75] tracking-[-0.08em] text-white/[0.045]"
          >
            404
          </div>

          {/* Content */}
          <div className="relative -mt-10 sm:-mt-16">
            <h1
              id="not-found-title"
              className="text-3xl font-semibold tracking-tight text-white sm:text-5xl"
            >
              This page doesn&apos;t exist.
            </h1>

            <p className="mx-auto mt-5 max-w-xl text-sm leading-7 text-neutral-500 sm:text-base">
              Looks like you&apos;ve taken a wrong turn. The page you&apos;re
              looking for may have moved, been removed, or never existed in
              the first place.
            </p>

            {/* Actions */}
            <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <a
                href="/"
                className="inline-flex min-w-[160px] items-center justify-center rounded-xl bg-[#FFC400] px-6 py-3.5 text-sm font-semibold text-black transition-all duration-300 hover:bg-[#FFD23D] hover:shadow-[0_0_35px_rgba(255,196,0,0.12)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FFC400] focus-visible:ring-offset-2 focus-visible:ring-offset-[#050505]"
              >
                Back to Home
              </a>

              <a
                href="/services"
                className="inline-flex min-w-[160px] items-center justify-center rounded-xl border border-white/[0.1] bg-white/[0.025] px-6 py-3.5 text-sm font-medium text-neutral-300 transition-all duration-300 hover:border-white/[0.18] hover:bg-white/[0.05] hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/30 focus-visible:ring-offset-2 focus-visible:ring-offset-[#050505]"
              >
                Explore Services
              </a>

              <a
                href="/projects"
                className="inline-flex min-w-[160px] items-center justify-center rounded-xl border border-white/[0.08] px-6 py-3.5 text-sm font-medium text-neutral-500 transition-all duration-300 hover:border-white/[0.15] hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/30 focus-visible:ring-offset-2 focus-visible:ring-offset-[#050505]"
              >
                View Projects
              </a>
            </div>

            {/* Recovery links */}
            <div className="mt-12 border-t border-white/[0.06] pt-7">
              <p className="text-xs text-neutral-600">
                Looking for something specific?
              </p>

              <div className="mt-3 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-xs">
                <a
                  href="/about"
                  className="text-neutral-500 transition-colors hover:text-[#FFC400]"
                >
                  About
                </a>

                <a
                  href="/pricing"
                  className="text-neutral-500 transition-colors hover:text-[#FFC400]"
                >
                  Pricing
                </a>

                <a
                  href="/blog"
                  className="text-neutral-500 transition-colors hover:text-[#FFC400]"
                >
                  Blog
                </a>

                <a
                  href="/contact"
                  className="text-neutral-500 transition-colors hover:text-[#FFC400]"
                >
                  Contact
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}