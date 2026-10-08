import Link from "next/link";
import {
  ArrowUpRight,
  CheckCircle2,
  Clock3,
  Flame,
  MessageCircle,
  TicketX,
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

  isFullyClaimed?: boolean;
  claimedCount?: number;
  claimLimit?: number | null;
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
  isFullyClaimed = false,
  claimedCount = 0,
  claimLimit = null,
}: OfferDetailCTAProps) {
  const isActive = status === "active";
  const isScheduled = status === "scheduled";
  const isExpired = status === "expired";

  const hasLimitedSlots = claimLimit !== null;

  const slotsRemaining =
    claimLimit !== null
      ? Math.max(claimLimit - claimedCount, 0)
      : null;

  return (
    <section
      aria-labelledby="offer-final-cta-heading"
      className="relative overflow-hidden bg-[#050505] px-5 py-20 sm:px-8 sm:py-24 lg:px-10 lg:py-28"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 overflow-hidden"
      >
        <div
          className={[
            "absolute left-1/2 top-1/2 h-96 w-[42rem]",
            "-translate-x-1/2 -translate-y-1/2 rounded-full blur-[140px]",
            isActive && !isFullyClaimed
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
            isActive && !isFullyClaimed
              ? "border-[#FFD400]/20 bg-[#0A0A0A]"
              : "border-[#1A1A1A] bg-[#080808]",
          ].join(" ")}
        >
          <div
            aria-hidden="true"
            className={[
              "absolute inset-x-0 top-0 h-px",
              isActive && !isFullyClaimed
                ? "bg-gradient-to-r from-transparent via-[#FFD400]/70 to-transparent"
                : "bg-gradient-to-r from-transparent via-white/15 to-transparent",
            ].join(" ")}
          />

          <div className="relative mx-auto max-w-3xl">
            {/* Icon */}
            <div
              className={[
                "mx-auto flex h-12 w-12 items-center justify-center rounded-2xl border",
                isActive && !isFullyClaimed
                  ? "border-[#FFD400]/20 bg-[#FFD400]/[0.07] text-[#FFD400]"
                  : "border-[#1A1A1A] bg-[#0D0D0D] text-[#71717A]",
              ].join(" ")}
            >
              {isActive && !isFullyClaimed ? (
                <Flame className="h-5 w-5" />
              ) : isFullyClaimed ? (
                <TicketX className="h-5 w-5" />
              ) : isScheduled ? (
                <Clock3 className="h-5 w-5" />
              ) : (
                <XCircle className="h-5 w-5" />
              )}
            </div>

            {/* Eyebrow */}
            <p
              className={[
                "mt-6 text-xs font-semibold tracking-[0.18em] uppercase",
                isActive && !isFullyClaimed
                  ? "text-[#FFD400]"
                  : "text-[#71717A]",
              ].join(" ")}
            >
              {isActive && !isFullyClaimed
                ? "Limited availability"
                : isActive && isFullyClaimed
                  ? "Offer fully claimed"
                  : isScheduled
                    ? "Coming soon"
                    : "Offer ended"}
            </p>

            <h2
              id="offer-final-cta-heading"
              className="mt-4 text-balance text-3xl font-semibold leading-tight tracking-[-0.045em] text-[#F8FAFC] sm:text-4xl lg:text-5xl"
            >
              {isActive && !isFullyClaimed
                ? "Ready to claim this offer?"
                : isActive && isFullyClaimed
                  ? "This offer has reached its limit."
                  : isScheduled
                    ? "This offer is almost here."
                    : "The promotion has ended, but your project can still start."}
            </h2>

            <p className="mx-auto mt-5 max-w-2xl text-sm leading-7 text-[#71717A] sm:text-base sm:leading-8">
              {isActive && !isFullyClaimed
                ? `Claim ${title} and tell us what you want to build. Your offer context will be carried into the project form.`
                : isActive && isFullyClaimed
                  ? `All ${claimLimit} available claims have already been used. The promotional price is no longer available for new claims.`
                  : isScheduled
                    ? `This offer starts on ${formatDate(startDate)}. You can review everything now and return when it goes live.`
                    : `${title} ended on ${formatDate(endDate)}. The promotional price is no longer available, but we can still discuss your project.`}
            </p>

            {/* Availability */}
            {hasLimitedSlots && (
              <div className="mx-auto mt-7 max-w-md rounded-2xl border border-[#1A1A1A] bg-[#050505] p-4">
                <div className="flex items-center justify-between gap-4 text-left">
                  <div>
                    <p className="text-xs font-semibold text-[#F8FAFC]">
                      {isFullyClaimed
                        ? "All slots claimed"
                        : "Limited claim slots"}
                    </p>

                    <p className="mt-1 text-[11px] text-[#52525B]">
                      {claimedCount}/{claimLimit} claimed
                    </p>
                  </div>

                  <p
                    className={[
                      "text-sm font-bold",
                      isFullyClaimed
                        ? "text-[#71717A]"
                        : slotsRemaining === 1
                          ? "text-red-400"
                          : "text-[#FFD400]",
                    ].join(" ")}
                  >
                    {isFullyClaimed
                      ? "FULL"
                      : `${slotsRemaining} left`}
                  </p>
                </div>

                <div className="mt-4 h-1.5 overflow-hidden rounded-full bg-[#1A1A1A]">
                  <div
                    className={[
                      "h-full rounded-full transition-all duration-700",
                      isFullyClaimed
                        ? "bg-[#52525B]"
                        : slotsRemaining === 1
                          ? "bg-red-400"
                          : "bg-[#FFD400]",
                    ].join(" ")}
                    style={{
                      width: `${Math.min(
                        (claimedCount /
                          (claimLimit || 1)) *
                          100,
                        100,
                      )}%`,
                    }}
                  />
                </div>
              </div>
            )}

            {/* Actions */}
            <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
              {isActive && !isFullyClaimed ? (
                <Link
                  href={claimUrl}
                  className="group inline-flex min-w-[220px] items-center justify-center gap-2 rounded-full bg-[#FFD400] px-6 py-3.5 text-sm font-semibold text-black transition-all duration-300 hover:bg-[#F5C800]"
                >
                  {ctaLabel || "Claim Offer"}

                  <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </Link>
              ) : isActive && isFullyClaimed ? (
                <span className="inline-flex min-w-[220px] cursor-not-allowed items-center justify-center gap-2 rounded-full border border-[#27272A] bg-[#111111] px-6 py-3.5 text-sm font-semibold text-[#52525B]">
                  <CheckCircle2 className="h-4 w-4" />
                  Offer Fully Claimed
                </span>
              ) : isScheduled ? (
                <span className="inline-flex min-w-[220px] cursor-not-allowed items-center justify-center gap-2 rounded-full border border-[#27272A] bg-[#111111] px-6 py-3.5 text-sm font-semibold text-[#52525B]">
                  <Clock3 className="h-4 w-4" />
                  Available Soon
                </span>
              ) : (
                <Link
                  href="/start-a-project"
                  className="group inline-flex min-w-[220px] items-center justify-center gap-2 rounded-full bg-[#FFD400] px-6 py-3.5 text-sm font-semibold text-black transition-all duration-300 hover:bg-[#F5C800]"
                >
                  Start a Project
                  <ArrowUpRight className="h-4 w-4" />
                </Link>
              )}

              <Link
                href={secondaryCtaLink}
                className="inline-flex min-w-[170px] items-center justify-center gap-2 rounded-full border border-[#27272A] bg-[#0A0A0A] px-6 py-3.5 text-sm font-medium text-[#A1A1AA] transition-all duration-300 hover:border-[#3F3F46] hover:bg-[#111111] hover:text-[#F8FAFC]"
              >
                <MessageCircle className="h-4 w-4" />
                {secondaryCtaLabel}
              </Link>
            </div>

            <div className="mt-8 text-xs text-[#52525B]">
              {isActive && !isFullyClaimed
                ? `Offer currently active · Ends ${formatDate(endDate)}`
                : isActive && isFullyClaimed
                  ? `Offer fully claimed · ${claimedCount}/${claimLimit} used`
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