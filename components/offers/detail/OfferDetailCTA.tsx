import Link from "next/link";
import {
  ArrowUpRight,
  Clock3,
  Flame,
  MessageCircle,
  XCircle,
} from "lucide-react";

import type { OfferLifecycleStatus } from "@/lib/offers/status";

type OfferDetailCTAProps = {
  title: string;
  status: OfferLifecycleStatus;

  claimUrl: string;
  ctaLabel: string;

  secondaryCtaLabel: string;
  secondaryCtaLink: string;

  startDate: string;
  endDate: string;
};

function formatDate(value: string) {
  return new Intl.DateTimeFormat("en-IN", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "Asia/Kolkata",
  }).format(new Date(value));
}

export default function OfferDetailCTA({
  title,
  status,
  claimUrl,
  ctaLabel,
  secondaryCtaLabel,
  secondaryCtaLink,
  startDate,
  endDate,
}: OfferDetailCTAProps) {
  const isActive = status === "active";
  const isScheduled = status === "scheduled";
  const isExpired = status === "expired";

  return (
    <section
      aria-labelledby="offer-final-cta-heading"
      className="relative overflow-hidden bg-[#050505] px-5 py-20 sm:px-8 sm:py-24 lg:px-10 lg:py-28"
    >
      {/* Ambient glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 overflow-hidden"
      >
        <div
          className={[
            "absolute left-1/2 top-1/2 h-96 w-[42rem]",
            "-translate-x-1/2 -translate-y-1/2 rounded-full blur-[140px]",
            isActive
              ? "bg-[#FFD400]/[0.045]"
              : "bg-white/[0.018]",
          ].join(" ")}
        />
      </div>

      <div className="relative mx-auto max-w-7xl">
        <div
          className={[
            "relative overflow-hidden rounded-[2rem]",
            "border px-6 py-12 text-center sm:px-10 sm:py-16 lg:px-16 lg:py-20",
            isActive
              ? "border-[#FFD400]/20 bg-[#0A0A0A]"
              : "border-[#1A1A1A] bg-[#080808]",
          ].join(" ")}
        >
          {/* Top accent */}
          <div
            aria-hidden="true"
            className={[
              "absolute inset-x-0 top-0 h-px",
              isActive
                ? "bg-gradient-to-r from-transparent via-[#FFD400]/70 to-transparent"
                : "bg-gradient-to-r from-transparent via-white/15 to-transparent",
            ].join(" ")}
          />

          <div className="relative mx-auto max-w-3xl">
            {/* Status icon */}
            <div
              className={[
                "mx-auto flex h-12 w-12 items-center justify-center rounded-2xl border",
                isActive
                  ? "border-[#FFD400]/20 bg-[#FFD400]/[0.07] text-[#FFD400]"
                  : "border-[#1A1A1A] bg-[#0D0D0D] text-[#71717A]",
              ].join(" ")}
            >
              {isActive ? (
                <Flame
                  aria-hidden="true"
                  className="h-5 w-5"
                />
              ) : isScheduled ? (
                <Clock3
                  aria-hidden="true"
                  className="h-5 w-5"
                />
              ) : (
                <XCircle
                  aria-hidden="true"
                  className="h-5 w-5"
                />
              )}
            </div>

            {/* Eyebrow */}
            <p
              className={[
                "mt-6 text-xs font-semibold tracking-[0.18em] uppercase",
                isActive
                  ? "text-[#FFD400]"
                  : "text-[#71717A]",
              ].join(" ")}
            >
              {isActive
                ? "Ready to claim?"
                : isScheduled
                  ? "Coming soon"
                  : "Offer ended"}
            </p>

            {/* Heading */}
            <h2
              id="offer-final-cta-heading"
              className="mt-4 text-balance text-3xl font-semibold leading-tight tracking-[-0.045em] text-[#F8FAFC] sm:text-4xl lg:text-5xl"
            >
              {isActive
                ? "Make this offer your next digital move."
                : isScheduled
                  ? "This offer is almost here."
                  : "The promotion has ended, but your project can still start."}
            </h2>

            {/* Description */}
            <p className="mx-auto mt-5 max-w-2xl text-sm leading-7 text-[#71717A] sm:text-base sm:leading-8">
              {isActive
                ? `${title} is currently live. Claim the offer and tell us what you want to build.`
                : isScheduled
                  ? `This offer starts on ${formatDate(
                      startDate,
                    )}. You can review the details now and come back when it goes live.`
                  : `${title} ended on ${formatDate(
                      endDate,
                    )}. The promotional price is no longer available, but we can still discuss your project.`}
            </p>

            {/* Actions */}
            <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
              {isActive ? (
                <Link
                  href={claimUrl}
                  className="group inline-flex min-w-[210px] items-center justify-center gap-2 rounded-full bg-[#FFD400] px-6 py-3.5 text-sm font-semibold text-black transition-all duration-300 hover:bg-[#F5C800]"
                >
                  {ctaLabel || "Claim Offer"}

                  <ArrowUpRight
                    aria-hidden="true"
                    className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                  />
                </Link>
              ) : isScheduled ? (
                <span className="inline-flex min-w-[210px] cursor-not-allowed items-center justify-center gap-2 rounded-full border border-[#27272A] bg-[#111111] px-6 py-3.5 text-sm font-semibold text-[#52525B]">
                  <Clock3
                    aria-hidden="true"
                    className="h-4 w-4"
                  />

                  Available Soon
                </span>
              ) : (
                <Link
                  href="/start-a-project"
                  className="group inline-flex min-w-[210px] items-center justify-center gap-2 rounded-full bg-[#FFD400] px-6 py-3.5 text-sm font-semibold text-black transition-all duration-300 hover:bg-[#F5C800]"
                >
                  Start a Project

                  <ArrowUpRight
                    aria-hidden="true"
                    className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                  />
                </Link>
              )}

              <Link
                href={secondaryCtaLink}
                className="inline-flex min-w-[170px] items-center justify-center gap-2 rounded-full border border-[#27272A] bg-[#0A0A0A] px-6 py-3.5 text-sm font-medium text-[#A1A1AA] transition-all duration-300 hover:border-[#3F3F46] hover:bg-[#111111] hover:text-[#F8FAFC]"
              >
                <MessageCircle
                  aria-hidden="true"
                  className="h-4 w-4"
                />

                {secondaryCtaLabel}
              </Link>
            </div>

            {/* Status note */}
            <div className="mt-8 text-xs text-[#52525B]">
              {isActive
                ? `Offer currently active · Ends ${formatDate(endDate)}`
                : isScheduled
                  ? `Offer starts ${formatDate(startDate)}`
                  : `Offer ended ${formatDate(endDate)}`}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}