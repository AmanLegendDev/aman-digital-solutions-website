"use client";

import { useEffect } from "react";
import Link from "next/link";
import { Home, RefreshCw, ArrowLeft } from "lucide-react";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Global application error:", error);
  }, [error]);

  return (
    <html lang="en">
      <body className="bg-[#050505] text-white antialiased">
        <main className="flex min-h-screen items-center justify-center px-6">
          <section
            className="w-full max-w-2xl text-center"
            aria-labelledby="global-error-title"
          >
            <p className="mb-4 text-sm font-semibold uppercase tracking-[0.2em] text-[#FFC400]">
              Aman Digital Solutions
            </p>

            <h1
              id="global-error-title"
              className="text-5xl font-bold tracking-tight sm:text-7xl"
            >
              We hit a snag.
            </h1>

            <p className="mx-auto mt-6 max-w-xl text-base leading-7 text-white/60 sm:text-lg">
              Something unexpected happened while loading Aman Digital
              Solutions. Please try again or return to the homepage.
            </p>

            <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <button
                type="button"
                onClick={() => reset()}
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#FFC400] px-6 py-3.5 text-sm font-semibold text-black transition hover:bg-[#FFD23D] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FFC400] focus-visible:ring-offset-2 focus-visible:ring-offset-[#050505]"
              >
                <RefreshCw size={16} aria-hidden="true" />
                Try again
              </button>

              <Link
                href="/"
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/10 px-6 py-3.5 text-sm font-semibold text-white transition hover:border-white/20 hover:bg-white/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40"
              >
                <Home size={16} aria-hidden="true" />
                Go home
              </Link>
            </div>

            <Link
              href="/contact"
              className="mt-8 inline-flex items-center gap-2 text-sm text-white/50 transition hover:text-white"
            >
              <ArrowLeft size={15} aria-hidden="true" />
              Contact us
            </Link>
          </section>
        </main>
      </body>
    </html>
  );
}