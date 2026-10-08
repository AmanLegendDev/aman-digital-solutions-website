import Link from "next/link";
import {
  ArrowUpRight,
  CheckCircle2,
  Clock3,
  Flame,
  TicketPercent,
} from "lucide-react";

import { getOfferLifecycleStatus } from "@/lib/offers/status";

import OfferStatusBadge from "./OfferStatusBadge";
import OfferPrice from "./OfferPrice";
import OfferHighlights from "./OfferHighlights";

import type { OfferCardData } from "./OffersGrid";

function formatDate(value: string) {
  return new Intl.DateTimeFormat("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
    timeZone: "Asia/Kolkata",
  }).format(new Date(value));
}

export default function OfferCard({
  offer,
}: {
  offer: OfferCardData;
}) {
  const status = getOfferLifecycleStatus({
    published: true,
    startDate: new Date(offer.startDate),
    endDate: new Date(offer.endDate),
  });

  const isActive = status === "active";
  const isScheduled = status === "scheduled";
  const isExpired = status === "expired";

  const claimLimit =
    offer.isClaimLimitEnabled &&
    typeof offer.claimLimit === "number"
      ? offer.claimLimit
      : null;

  const claimedCount = Math.max(
    0,
    offer.claimedCount ?? 0,
  );

  const slotsRemaining =
    claimLimit !== null
      ? Math.max(claimLimit - claimedCount, 0)
      : null;

  const isFullyClaimed =
    claimLimit !== null &&
    claimedCount >= claimLimit;

  const hasLimitedSlots =
    claimLimit !== null;

  const isLastSlot =
    isActive &&
    slotsRemaining !== null &&
    slotsRemaining === 1;

  return (
    <article
      className={[
        "group relative overflow-hidden rounded-[2rem]",
        "border bg-[#0A0A0A]",
        "transition-all duration-500",
        isActive && !isFullyClaimed
          ? "border-[#FFD400]/20 shadow-[0_25px_90px_-45px_rgba(255,212,0,0.28)] hover:border-[#FFD400]/35"
          : isScheduled
            ? "border-[#FFD400]/10 hover:border-[#FFD400]/20"
            : "border-[#1A1A1A] opacity-80 hover:opacity-100",
      ].join(" ")}
    >
      {/* Premium top line */}
      <div
        aria-hidden="true"
        className={[
          "absolute inset-x-0 top-0 z-20 h-px",
          isActive
            ? "bg-gradient-to-r from-transparent via-[#FFD400]/80 to-transparent"
            : "bg-gradient-to-r from-transparent via-white/10 to-transparent",
        ].join(" ")}
      />

      {/* IMAGE */}
      <div className="relative overflow-hidden bg-[#0D0D0D]">
        {offer.cardImage?.url ? (
          <img
            src={offer.cardImage.url}
            alt={offer.cardImage.alt}
            loading="lazy"
            className={[
              "block h-auto w-full object-contain",
              "transition-transform duration-700",
              isExpired || isFullyClaimed
                ? "grayscale-[0.35]"
                : "group-hover:scale-[1.015]",
            ].join(" ")}
          />
        ) : (
          <div
            aria-hidden="true"
            className="flex aspect-[16/8] w-full items-center justify-center bg-[#0D0D0D]"
          >
            <span className="text-xs font-medium tracking-[0.16em] text-[#52525B] uppercase">
              Aman Digital Solutions
            </span>
          </div>
        )}

        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/[0.04] via-transparent to-black/[0.2]"
        />

        {/* Status + badge */}
        <div className="absolute left-5 top-5 flex flex-wrap gap-2">
          {offer.badge && (
            <span className="rounded-full border border-white/15 bg-black/65 px-3 py-1.5 text-[11px] font-semibold tracking-wide text-white backdrop-blur-md">
              {offer.badge}
            </span>
          )}

          <OfferStatusBadge
            startDate={offer.startDate}
            endDate={offer.endDate}
          />
        </div>

        {/* Discount */}
        {offer.discountLabel && (
          <div className="absolute bottom-5 right-5 rounded-full border border-[#FFD400]/30 bg-[#FFD400] px-3.5 py-2 text-xs font-bold tracking-wide text-black shadow-[0_8px_30px_rgba(0,0,0,0.3)]">
            {offer.discountLabel}
          </div>
        )}

        {/* Fully claimed image state */}
        {isActive && isFullyClaimed && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/45 backdrop-blur-[1px]">
            <div className="rounded-full border border-white/15 bg-black/75 px-5 py-3 text-xs font-bold tracking-[0.16em] text-white uppercase backdrop-blur-md">
              All slots claimed
            </div>
          </div>
        )}
      </div>

      {/* CONTENT */}
      <div className="p-6 sm:p-8">
        <h3 className="max-w-xl text-2xl font-semibold leading-tight tracking-[-0.035em] text-[#F8FAFC] sm:text-3xl">
          {offer.title}
        </h3>

        <p className="mt-4 max-w-2xl text-sm leading-7 text-[#8A8A91]">
          {offer.shortDescription}
        </p>

        {/* Price */}
        <div className="mt-7">
          <OfferPrice
            offerPrice={offer.offerPrice}
            originalPrice={offer.originalPrice}
            discountType={offer.discountType}
            discountValue={offer.discountValue}
          />
        </div>

        {/* Coupon */}
        {offer.couponCode && (
          <div className="mt-6">
            <div className="flex items-center justify-between gap-4 rounded-2xl border border-dashed border-[#FFD400]/30 bg-[#FFD400]/[0.045] px-4 py-3.5">
              <div className="flex min-w-0 items-center gap-3">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-[#FFD400]/20 bg-[#FFD400]/10 text-[#FFD400]">
                  <TicketPercent
                    aria-hidden="true"
                    className="h-4 w-4"
                  />
                </span>

                <div className="min-w-0">
                  <p className="text-[10px] font-semibold tracking-[0.16em] text-[#8A8A91] uppercase">
                    Coupon code
                  </p>

                  <p className="mt-0.5 truncate font-mono text-sm font-bold tracking-[0.12em] text-[#FFD400]">
                    {offer.couponCode}
                  </p>
                </div>
              </div>

              <span className="hidden shrink-0 text-[10px] font-semibold tracking-[0.12em] text-[#52525B] uppercase sm:block">
                {isActive
                  ? "Use at checkout"
                  : isScheduled
                    ? "Available soon"
                    : "Expired"}
              </span>
            </div>
          </div>
        )}

        {/* Highlights */}
        <div className="mt-7">
          <OfferHighlights
            highlights={offer.highlights}
          />
        </div>

        {/* Availability */}
        {hasLimitedSlots && (
          <div className="mt-7 rounded-2xl border border-[#1F1F22] bg-[#0D0D0D] p-4">
            <div className="flex items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <span
                  className={[
                    "flex h-9 w-9 items-center justify-center rounded-xl",
                    isFullyClaimed
                      ? "bg-[#27272A] text-[#71717A]"
                      : isLastSlot
                        ? "bg-red-500/10 text-red-400"
                        : "bg-[#FFD400]/10 text-[#FFD400]",
                  ].join(" ")}
                >
                  {isFullyClaimed ? (
                    <CheckCircle2 className="h-4 w-4" />
                  ) : isScheduled ? (
                    <Clock3 className="h-4 w-4" />
                  ) : (
                    <Flame className="h-4 w-4" />
                  )}
                </span>

                <div>
                  <p className="text-xs font-semibold text-[#F8FAFC]">
                    {isFullyClaimed
                      ? "All slots claimed"
                      : isScheduled
                        ? "Limited availability"
                        : isLastSlot
                          ? "Last slot available"
                          : "Limited slots"}
                  </p>

                  <p className="mt-0.5 text-[11px] text-[#71717A]">
                    {isFullyClaimed
                      ? `${claimLimit}/${claimLimit} claimed`
                      : `${claimedCount}/${claimLimit} claimed`}
                  </p>
                </div>
              </div>

              <div className="text-right">
                <p
                  className={[
                    "text-sm font-bold",
                    isFullyClaimed
                      ? "text-[#71717A]"
                      : isLastSlot
                        ? "text-red-400"
                        : "text-[#FFD400]",
                  ].join(" ")}
                >
                  {isFullyClaimed
                    ? "FULL"
                    : `${slotsRemaining} left`}
                </p>
              </div>
            </div>

            {/* Progress */}
            <div className="mt-4 h-1.5 overflow-hidden rounded-full bg-[#1A1A1A]">
              <div
                className={[
                  "h-full rounded-full transition-all duration-700",
                  isFullyClaimed
                    ? "bg-[#52525B]"
                    : isLastSlot
                      ? "bg-red-400"
                      : "bg-[#FFD400]",
                ].join(" ")}
                style={{
                  width: `${Math.min(
                    (claimedCount / (claimLimit || 1)) * 100,
                    100,
                  )}%`,
                }}
              />
            </div>
          </div>
        )}

        {/* Bottom */}
        <div className="mt-8 border-t border-[#1A1A1A] pt-6">
          <div className="mb-5 flex flex-wrap items-center justify-between gap-3 text-xs text-[#52525B]">
            <span>
              {isScheduled
                ? `Starts ${formatDate(offer.startDate)}`
                : isActive
                  ? `Ends ${formatDate(offer.endDate)}`
                  : `Ended ${formatDate(offer.endDate)}`}
            </span>

            {isExpired && (
              <span>
                Promotion unavailable
              </span>
            )}
          </div>

          <Link
            href={`/offers/${offer.slug}`}
            className={[
              "group/button inline-flex w-full items-center justify-center gap-2",
              "rounded-full px-6 py-3.5",
              "text-sm font-semibold",
              "transition-all duration-300",
              isActive && !isFullyClaimed
                ? "bg-[#FFD400] text-black hover:bg-[#F5C800]"
                : "border border-[#27272A] bg-[#111111] text-[#A1A1AA] hover:border-[#3F3F46] hover:bg-[#151515] hover:text-[#F8FAFC]",
            ].join(" ")}
          >
            {isActive && !isFullyClaimed
              ? "View & Claim Offer"
              : isFullyClaimed
                ? "View Offer"
                : isScheduled
                  ? "View Offer"
                  : "View Offer"}

            <ArrowUpRight
              aria-hidden="true"
              className="h-4 w-4 transition-transform duration-300 group-hover/button:-translate-y-0.5 group-hover/button:translate-x-0.5"
            />
          </Link>
        </div>
      </div>
    </article>
  );
}