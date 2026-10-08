"use client";

import Link from "next/link";
import { CheckCircle2, Gift } from "lucide-react";

type OfferClaim = {
  title: string;
  price: number | null;
  discountLabel?: string | null;
  couponCode?: string | null;
};

type Props = {
  requestId: string;
  offerClaimed?: boolean;
  offer?: OfferClaim | null;
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
  offerClaimed = false,
  offer = null,
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
            OFFER CLAIMED
        ===================================================== */}

        {offerClaimed && offer && (
          <div className="mx-auto mt-7 max-w-xl overflow-hidden rounded-2xl border border-[#FFC400]/25 bg-[#FFC400]/[0.05] text-left">
            {/* Accent */}
            <div className="h-1 bg-[#FFC400]" />

            <div className="p-5 sm:p-6">
              <div className="flex items-start gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#FFC400]/10">
                  <Gift
                    size={19}
                    className="text-[#FFC400]"
                  />
                </div>

                <div className="min-w-0">
                  <p className="text-[9px] font-bold uppercase tracking-[0.2em] text-[#FFC400]">
                    Offer successfully claimed
                  </p>

                  <h2 className="mt-1 text-sm font-semibold text-white sm:text-base">
                    {offer.title}
                  </h2>

                  <p className="mt-1 text-xs leading-5 text-neutral-500">
                    Your special offer has been attached to this
                    project request and is now reserved for you.
                  </p>
                </div>
              </div>

              {/* Offer details */}
              <div className="mt-5 grid gap-3 sm:grid-cols-3">
                {offer.price !== null && (
                  <div className="rounded-xl border border-white/[0.07] bg-black/20 p-3">
                    <p className="text-[8px] font-medium uppercase tracking-wider text-neutral-600">
                      Offer Price
                    </p>

                    <p className="mt-1 text-base font-bold text-white">
                      ₹{offer.price.toLocaleString("en-IN")}
                    </p>
                  </div>
                )}

                {offer.discountLabel && (
                  <div className="rounded-xl border border-white/[0.07] bg-black/20 p-3">
                    <p className="text-[8px] font-medium uppercase tracking-wider text-neutral-600">
                      Discount
                    </p>

                    <p className="mt-1 text-sm font-bold text-[#FFC400]">
                      {offer.discountLabel}
                    </p>
                  </div>
                )}

                {offer.couponCode && (
                  <div className="rounded-xl border border-dashed border-[#FFC400]/25 bg-black/20 p-3">
                    <p className="text-[8px] font-medium uppercase tracking-wider text-neutral-600">
                      Coupon Code
                    </p>

                    <p className="mt-1 font-mono text-sm font-bold tracking-wider text-[#FFC400]">
                      {offer.couponCode}
                    </p>
                  </div>
                )}
              </div>

              <div className="mt-4 flex items-center gap-2 border-t border-white/[0.07] pt-4">
                <span className="h-1.5 w-1.5 rounded-full bg-[#FFC400]" />

                <p className="text-[10px] text-neutral-500">
                  Your offer has been recorded with Request ID{" "}
                  <span className="font-mono text-neutral-300">
                    {requestId}
                  </span>
                  .
                </p>
              </div>
            </div>
          </div>
        )}

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