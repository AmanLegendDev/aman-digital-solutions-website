"use client";

import Link from "next/link";
import { CheckCircle2 } from "lucide-react";

type Props = {
  requestId: string;
};

const STEPS = [
  {
    number: "01",
    title: "We review",
    description:
      "We’ll go through your requirements and understand the scope.",
  },
  {
    number: "02",
    title: "We contact you",
    description:
      "We’ll reach out using your preferred contact method.",
  },
  {
    number: "03",
    title: "We plan",
    description:
      "We’ll discuss the approach, timeline and next steps.",
  },
];

export default function SuccessScreen({
  requestId,
}: Props) {
  return (
    <main className="flex min-h-screen items-center justify-center bg-[#050505] px-5 py-10 text-white">
      <div className="w-full max-w-2xl text-center">

        {/* =====================================================
            SUCCESS ICON
        ===================================================== */}

        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full border border-[#FFC400]/20 bg-[#FFC400]/10">
          <CheckCircle2
            size={32}
            strokeWidth={1.8}
            className="text-[#FFC400]"
          />
        </div>

        {/* =====================================================
            EYEBROW
        ===================================================== */}

        <p className="mt-7 text-[9px] font-semibold uppercase tracking-[0.24em] text-[#FFC400]">
          Request received
        </p>

        {/* =====================================================
            TITLE
        ===================================================== */}

        <h1 className="mt-3 text-3xl font-semibold tracking-[-0.04em] sm:text-5xl">
          We’ve got it.
        </h1>

        {/* =====================================================
            DESCRIPTION
        ===================================================== */}

        <p className="mx-auto mt-4 max-w-lg text-sm leading-6 text-neutral-500">
          Thanks for telling us about your project.
          Your request has been safely submitted and
          our team will review it.
        </p>

        {/* =====================================================
            REQUEST ID
        ===================================================== */}

        <div className="mx-auto mt-7 max-w-xs rounded-2xl border border-white/[0.08] bg-[#0A0A0A] px-5 py-4">
          <p className="text-[9px] font-medium uppercase tracking-[0.18em] text-neutral-600">
            Request ID
          </p>

          <p className="mt-2 font-mono text-xl font-semibold tracking-wide text-[#FFC400]">
            {requestId}
          </p>

          <p className="mt-2 text-[10px] text-neutral-600">
            Keep this reference for future communication.
          </p>
        </div>

        {/* =====================================================
            PROCESS
        ===================================================== */}

        <div className="mt-8 grid gap-3 text-left sm:grid-cols-3">
          {STEPS.map((step) => (
            <div
              key={step.number}
              className="rounded-2xl border border-white/[0.07] bg-[#090909] p-4"
            >
              <span className="text-[9px] font-semibold text-[#FFC400]">
                {step.number}
              </span>

              <h3 className="mt-3 text-sm font-semibold text-white">
                {step.title}
              </h3>

              <p className="mt-2 text-[11px] leading-5 text-neutral-600">
                {step.description}
              </p>
            </div>
          ))}
        </div>

        {/* =====================================================
            FOOTNOTE
        ===================================================== */}

        <p className="mt-7 text-[11px] text-neutral-600">
          We’ll get back to you as soon as possible during
          business hours.
        </p>

        {/* =====================================================
            ACTIONS
        ===================================================== */}

        <div className="mt-6 flex flex-col justify-center gap-3 sm:flex-row">
          <Link
            href="/"
            className="rounded-xl border border-white/10 px-6 py-3 text-xs font-semibold text-neutral-300 transition hover:border-white/20 hover:text-white"
          >
            Back to Home
          </Link>

          <Link
            href="/services"
            className="rounded-xl bg-[#FFC400] px-6 py-3 text-xs font-semibold text-black transition hover:bg-[#FFD43D]"
          >
            View Services
          </Link>
        </div>
      </div>
    </main>
  );
}