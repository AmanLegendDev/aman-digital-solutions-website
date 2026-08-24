"use client";

import { CheckCircle2 } from "lucide-react";

type Props = {
  requestId: string;
};

export default function SuccessScreen({
  requestId,
}: Props) {
  return (
    <main className="flex min-h-screen items-center justify-center bg-[#050505] px-5 py-10 text-white">
      <div className="w-full max-w-2xl text-center">
        <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full border border-[#FFC400]/20 bg-[#FFC400]/10">
          <CheckCircle2
            size={38}
            className="text-[#FFC400]"
          />
        </div>

        <p className="mt-8 text-[10px] font-semibold uppercase tracking-[0.25em] text-[#FFC400]">
          Request received
        </p>

        <h1 className="mt-3 text-3xl font-semibold tracking-tight sm:text-5xl">
          We’ve got it.
        </h1>

        <p className="mx-auto mt-4 max-w-lg text-sm leading-6 text-neutral-500">
          Thanks for telling us about your
          project. Your request has been safely
          submitted and our team will review it.
        </p>

        <div className="mx-auto mt-8 max-w-sm rounded-2xl border border-white/[0.08] bg-[#0B0B0B] p-5">
          <p className="text-[10px] uppercase tracking-[0.18em] text-neutral-600">
            Your request ID
          </p>

          <p className="mt-2 font-mono text-lg font-semibold tracking-wider text-[#FFC400]">
            {requestId}
          </p>

          <p className="mt-2 text-[11px] text-neutral-600">
            Keep this reference for future
            communication.
          </p>
        </div>

        <div className="mt-8 grid gap-3 text-left sm:grid-cols-3">
          {[
            [
              "01",
              "We review",
              "We’ll go through your requirements and understand the scope.",
            ],
            [
              "02",
              "We contact you",
              "We’ll reach out using your preferred contact method.",
            ],
            [
              "03",
              "We plan",
              "We’ll discuss the approach, timeline and next steps.",
            ],
          ].map(
            ([
              number,
              title,
              description,
            ]) => (
              <div
                key={number}
                className="rounded-2xl border border-white/[0.07] bg-[#090909] p-5"
              >
                <span className="text-[10px] font-semibold text-[#FFC400]">
                  {number}
                </span>

                <h3 className="mt-3 text-sm font-semibold">
                  {title}
                </h3>

                <p className="mt-2 text-xs leading-5 text-neutral-600">
                  {description}
                </p>
              </div>
            ),
          )}
        </div>

        <p className="mt-8 text-xs text-neutral-600">
          We’ll get back to you as soon as
          possible during business hours.
        </p>

        <div className="mt-7 flex flex-col justify-center gap-3 sm:flex-row">
          <a
            href="/"
            className="rounded-xl border border-white/10 px-6 py-3 text-xs font-semibold text-neutral-300 transition hover:border-white/20 hover:text-white"
          >
            Back to Home
          </a>

          <a
            href="/services"
            className="rounded-xl bg-[#FFC400] px-6 py-3 text-xs font-semibold text-black transition hover:bg-[#FFD43D]"
          >
            View Services
          </a>
        </div>
      </div>
    </main>
  );
}