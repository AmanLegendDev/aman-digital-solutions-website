import Link from "next/link";
import {
  ArrowRight,
  ArrowUpRight,
  CheckCircle2,
  MessageCircle,
} from "lucide-react";

type ProjectFinalCtaSectionProps = {
  projectTitle: string;
};

export default function ProjectFinalCtaSection({
  projectTitle,
}: ProjectFinalCtaSectionProps) {
  return (
    <section
      id="project-final-cta"
      aria-labelledby="project-final-cta-heading"
      className="relative overflow-hidden border-t border-white/[0.06] bg-[#050505] py-20 sm:py-24 lg:py-32"
    >
      {/* =================================================
          BACKGROUND
      ================================================= */}

      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-1/2 h-[420px] w-[720px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#FFC400]/[0.035] blur-[130px]"
      />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,196,0,0.035),transparent_55%)]"
      />

      <div className="relative mx-auto max-w-5xl px-5 text-center sm:px-8">
        {/* =================================================
            EYEBROW
        ================================================= */}

        <div className="inline-flex items-center gap-2 rounded-full border border-[#FFC400]/15 bg-[#FFC400]/[0.04] px-3 py-1.5">
          <span className="h-1.5 w-1.5 rounded-full bg-[#FFC400]" />

          <span className="text-[9px] font-semibold uppercase tracking-[0.2em] text-[#FFC400]">
            Have a similar idea?
          </span>
        </div>

        {/* =================================================
            HEADING
        ================================================= */}

        <h2
          id="project-final-cta-heading"
          className="mx-auto mt-7 max-w-4xl text-4xl font-semibold leading-[0.98] tracking-[-0.055em] text-white sm:text-5xl lg:text-[4.8rem]"
        >
          Your next project
          <br />
          <span className="text-neutral-500">
            could be next.
          </span>
        </h2>

        <p className="mx-auto mt-6 max-w-2xl text-sm leading-7 text-neutral-500 sm:text-base">
          Like what you see in{" "}
          <span className="text-neutral-300">
            {projectTitle}
          </span>
          ? Tell us what you're building and we'll help
          turn the idea into a polished digital experience.
        </p>

        {/* =================================================
            CTA BUTTONS
        ================================================= */}

        <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Link
            href="/booking"
            className="group inline-flex w-full items-center justify-center gap-2 rounded-full bg-[#FFC400] px-6 py-3.5 text-sm font-semibold text-black transition-all duration-300 hover:bg-[#FFD43B] hover:shadow-[0_0_40px_rgba(255,196,0,0.16)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FFC400] focus-visible:ring-offset-2 focus-visible:ring-offset-[#050505] sm:w-auto"
          >
            Start a conversation

            <ArrowUpRight
              size={16}
              className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
            />
          </Link>

          <Link
            href="/projects"
            className="group inline-flex w-full items-center justify-center gap-2 rounded-full border border-white/[0.09] bg-white/[0.02] px-6 py-3.5 text-sm font-medium text-neutral-400 transition-all duration-300 hover:border-white/[0.16] hover:bg-white/[0.04] hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FFC400] sm:w-auto"
          >
            Explore more work

            <ArrowRight
              size={15}
              className="transition-transform duration-300 group-hover:translate-x-1"
            />
          </Link>
        </div>

        {/* =================================================
            TRUST POINTS
        ================================================= */}

        <div className="mx-auto mt-12 flex max-w-2xl flex-wrap items-center justify-center gap-x-6 gap-y-3">
          <TrustPoint text="Clear communication" />
          <TrustPoint text="Business-first thinking" />
          <TrustPoint text="Built to scale" />
        </div>

        {/* =================================================
            LOWER CONTACT STRIP
        ================================================= */}

        <div className="mx-auto mt-12 max-w-3xl rounded-[24px] border border-white/[0.06] bg-[#080808] px-5 py-4 sm:px-6">
          <div className="flex flex-col items-center justify-between gap-4 sm:flex-row sm:text-left">
            <div className="flex items-center gap-3">
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-white/[0.07] bg-white/[0.02] text-neutral-500">
                <MessageCircle size={15} />
              </span>

              <div>
                <p className="text-xs font-medium text-white">
                  Have questions before starting?
                </p>

                <p className="mt-1 text-[10px] text-neutral-600">
                  Let's figure out the right direction together.
                </p>
              </div>
            </div>

            <Link
              href="/booking"
              className="group inline-flex shrink-0 items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.15em] text-neutral-500 transition-colors hover:text-[#FFC400]"
            >
              Let's talk

              <ArrowUpRight
                size={12}
                className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
              />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ===========================================================
   TRUST POINT
=========================================================== */

function TrustPoint({ text }: { text: string }) {
  return (
    <span className="inline-flex items-center gap-2 text-[9px] font-medium uppercase tracking-[0.14em] text-neutral-700">
      <CheckCircle2
        size={12}
        className="text-[#FFC400]/50"
      />

      {text}
    </span>
  );
}