import Link from "next/link";
import {
  ArrowLeft,
  ArrowUpRight,
  Flame,
  TicketX,
} from "lucide-react";

import OfferDetailStatus from "./OfferDetailStatus";
import OfferDetailPrice from "./OfferDetailPrice";
import OfferDetailCoupon from "./OfferDetailCoupon";

import type { OfferLifecycleStatus } from "@/lib/offers/status";

type OfferDetailHeroProps = {
  offer: {
    title: string;
    badge: string | null;
    shortDescription: string;

    heroImage: {
      url: string;
      alt: string;
    } | null;

    offerPrice: number | null;
    originalPrice: number | null;

    discountType:
      | "percentage"
      | "fixed"
      | "none";

    discountValue: number | null;
    discountLabel: string | null;

    couponCode: string | null;

    ctaLabel: string;

    secondaryCtaLabel: string | null;
    secondaryCtaLink: string | null;

    startDate: string;
    endDate: string;

    termsAndConditions: string | null;

    lifecycleStatus: OfferLifecycleStatus;
    claimUrl: string;

    isClaimLimitEnabled: boolean;
    claimLimit: number | null;
    claimedCount: number;
  };
};

function formatDate(value: string) {
  return new Intl.DateTimeFormat("en-IN", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "Asia/Kolkata",
  }).format(new Date(value));
}

export default function OfferDetailHero({
  offer,
}: OfferDetailHeroProps) {
  const isActive =
    offer.lifecycleStatus === "active";

  const isScheduled =
    offer.lifecycleStatus === "scheduled";

  const isExpired =
    offer.lifecycleStatus === "expired";

  const isFullyClaimed =
    offer.isClaimLimitEnabled &&
    offer.claimLimit !== null &&
    offer.claimedCount >= offer.claimLimit;

  const slotsRemaining =
    offer.isClaimLimitEnabled &&
    offer.claimLimit !== null
      ? Math.max(
          offer.claimLimit -
            offer.claimedCount,
          0,
        )
      : null;

  return (
    <section className="relative overflow-hidden border-b border-[#1A1A1A] bg-[#050505]">
      {/* Ambient light */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 overflow-hidden"
      >
        <div
          className={[
            "absolute left-[-8rem] top-32 h-96 w-96 rounded-full blur-[140px]",
            isActive && !isFullyClaimed
              ? "bg-[#FFD400]/[0.06]"
              : isScheduled
                ? "bg-[#FFD400]/[0.035]"
                : "bg-white/[0.018]",
          ].join(" ")}
        />

        <div
          className={[
            "absolute right-[-6rem] top-10 h-[30rem] w-[30rem] rounded-full blur-[150px]",
            isActive && !isFullyClaimed
              ? "bg-[#FFD400]/[0.035]"
              : "bg-white/[0.012]",
          ].join(" ")}
        />
      </div>

      <div className="relative mx-auto max-w-7xl px-5 pb-20 pt-28 sm:px-8 sm:pb-24 sm:pt-36 lg:px-10 lg:pb-32">
        {/* Back */}
        <Link
          href="/offers"
          className="group inline-flex items-center gap-2 text-sm font-medium text-[#71717A] transition hover:text-[#F8FAFC]"
        >
          <ArrowLeft className="h-4 w-4 transition-transform duration-300 group-hover:-translate-x-0.5" />
          All offers
        </Link>

        <div className="mt-9 grid gap-12 lg:grid-cols-[0.92fr_1.08fr] lg:items-center lg:gap-16">
          {/* COPY */}
          <div className="min-w-0">
            {/* Badge + status */}
            <div className="flex flex-wrap items-center gap-2.5">
              {offer.badge && (
                <span className="rounded-full border border-[#FFD400]/20 bg-[#FFD400]/[0.045] px-3.5 py-2 text-xs font-semibold tracking-wide text-[#FFD400]">
                  {offer.badge}
                </span>
              )}

              <OfferDetailStatus
                status={offer.lifecycleStatus}
                startDate={offer.startDate}
                endDate={offer.endDate}
                isFullyClaimed={isFullyClaimed}
                claimedCount={offer.claimedCount}
                claimLimit={offer.claimLimit}
              />
            </div>

            {/* State label */}
            <div className="mt-7">
              <p
                className={[
                  "text-xs font-semibold tracking-[0.18em] uppercase",
                  isActive && !isFullyClaimed
                    ? "text-[#FFD400]"
                    : "text-[#71717A]",
                ].join(" ")}
              >
                {isActive && !isFullyClaimed
                  ? "Limited-time offer"
                  : isActive && isFullyClaimed
                    ? "Offer fully claimed"
                    : isScheduled
                      ? "Available soon"
                      : "Promotional offer ended"}
              </p>
            </div>

            {/* H1 */}
            <h1 className="mt-4 max-w-3xl text-balance text-4xl font-semibold leading-[1.03] tracking-[-0.05em] text-[#F8FAFC] sm:text-5xl lg:text-6xl">
              {offer.title}
            </h1>

            <p className="mt-6 max-w-2xl text-base leading-8 text-[#A1A1AA] sm:text-lg">
              {offer.shortDescription}
            </p>

            {/* Price */}
            <div className="mt-8">
              <OfferDetailPrice
                offerPrice={offer.offerPrice}
                originalPrice={offer.originalPrice}
                discountType={offer.discountType}
                discountValue={offer.discountValue}
                discountLabel={offer.discountLabel}
                expired={isExpired || isFullyClaimed}
              />
            </div>

            {/* Availability */}
            {offer.isClaimLimitEnabled &&
              offer.claimLimit !== null && (
                <div className="mt-7 max-w-md rounded-2xl border border-[#1A1A1A] bg-[#0A0A0A] p-4">
                  <div className="flex items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <span
                        className={[
                          "flex h-10 w-10 items-center justify-center rounded-xl",
                          isFullyClaimed
                            ? "bg-[#111111] text-[#52525B]"
                            : slotsRemaining === 1
                              ? "bg-red-500/10 text-red-400"
                              : "bg-[#FFD400]/10 text-[#FFD400]",
                        ].join(" ")}
                      >
                        {isFullyClaimed ? (
                          <TicketX className="h-4 w-4" />
                        ) : (
                          <Flame className="h-4 w-4" />
                        )}
                      </span>

                      <div>
                        <p className="text-xs font-semibold text-[#F8FAFC]">
                          {isFullyClaimed
                            ? "All slots claimed"
                            : slotsRemaining === 1
                              ? "Last slot available"
                              : "Limited claim slots"}
                        </p>

                        <p className="mt-1 text-[11px] text-[#52525B]">
                          {offer.claimedCount}/
                          {offer.claimLimit} claimed
                        </p>
                      </div>
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
                        "h-full rounded-full",
                        isFullyClaimed
                          ? "bg-[#52525B]"
                          : slotsRemaining === 1
                            ? "bg-red-400"
                            : "bg-[#FFD400]",
                      ].join(" ")}
                      style={{
                        width: `${Math.min(
                          (offer.claimedCount /
                            offer.claimLimit) *
                            100,
                          100,
                        )}%`,
                      }}
                    />
                  </div>
                </div>
              )}

            {/* Coupon */}
            {offer.couponCode && (
              <div className="mt-7">
                <OfferDetailCoupon
                  couponCode={offer.couponCode}
                  discountLabel={
                    offer.discountLabel
                  }
                  offerPrice={offer.offerPrice}
                  endDate={offer.endDate}
                  disabled={
                    isExpired ||
                    isFullyClaimed
                  }
                />
              </div>
            )}

            {/* State message */}
            <div className="mt-7">
              {isScheduled && (
                <div className="rounded-2xl border border-[#FFD400]/15 bg-[#FFD400]/[0.025] px-4 py-3.5 text-sm text-[#A1A1AA]">
                  This offer starts on{" "}
                  <strong className="font-semibold text-[#FFD400]">
                    {formatDate(
                      offer.startDate,
                    )}
                  </strong>
                  .
                </div>
              )}

              {isFullyClaimed && (
                <div className="rounded-2xl border border-[#27272A] bg-[#0A0A0A] px-4 py-3.5 text-sm text-[#71717A]">
                  All available claims have
                  been used. The promotional
                  price is no longer available
                  for new claims.
                </div>
              )}

              {isExpired && (
                <div className="rounded-2xl border border-[#27272A] bg-[#0A0A0A] px-4 py-3.5 text-sm text-[#71717A]">
                  This promotional offer ended
                  on{" "}
                  <strong className="font-medium text-[#A1A1AA]">
                    {formatDate(
                      offer.endDate,
                    )}
                  </strong>
                  . The promotional price is
                  no longer available.
                </div>
              )}
            </div>

            {/* CTA */}
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              {isActive && !isFullyClaimed ? (
                <Link
                  href={offer.claimUrl}
                  className="group inline-flex items-center justify-center gap-2 rounded-full bg-[#FFD400] px-6 py-3.5 text-sm font-semibold text-black transition-all duration-300 hover:bg-[#F5C800]"
                >
                  {offer.ctaLabel ||
                    "Claim Offer"}

                  <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </Link>
              ) : isScheduled ? (
                <span className="inline-flex cursor-not-allowed items-center justify-center rounded-full border border-[#27272A] bg-[#111111] px-6 py-3.5 text-sm font-semibold text-[#52525B]">
                  Available Soon
                </span>
              ) : isFullyClaimed ? (
                <span className="inline-flex cursor-not-allowed items-center justify-center rounded-full border border-[#27272A] bg-[#111111] px-6 py-3.5 text-sm font-semibold text-[#52525B]">
                  Offer Fully Claimed
                </span>
              ) : (
                <Link
                  href="/start-a-project"
                  className="group inline-flex items-center justify-center gap-2 rounded-full bg-[#FFD400] px-6 py-3.5 text-sm font-semibold text-black transition-all duration-300 hover:bg-[#F5C800]"
                >
                  Start a Project
                  <ArrowUpRight className="h-4 w-4" />
                </Link>
              )}

              {offer.secondaryCtaLabel &&
                offer.secondaryCtaLink && (
                  <Link
                    href={
                      offer.secondaryCtaLink
                    }
                    className="inline-flex items-center justify-center rounded-full border border-[#27272A] bg-[#0A0A0A] px-6 py-3.5 text-sm font-medium text-[#A1A1AA] transition hover:border-[#3F3F46] hover:bg-[#111111] hover:text-[#F8FAFC]"
                  >
                    {offer.secondaryCtaLabel}
                  </Link>
                )}
            </div>
          </div>

          {/* HERO IMAGE */}
          <div className="min-w-0">
            <div
              className={[
                "relative overflow-hidden rounded-[2rem] border bg-[#0A0A0A]",
                isActive && !isFullyClaimed
                  ? "border-[#FFD400]/20 shadow-[0_30px_100px_-50px_rgba(255,212,0,0.25)]"
                  : "border-[#1A1A1A]",
              ].join(" ")}
            >
              <div
                aria-hidden="true"
                className={[
                  "absolute inset-x-0 top-0 z-10 h-px",
                  isActive && !isFullyClaimed
                    ? "bg-gradient-to-r from-transparent via-[#FFD400]/70 to-transparent"
                    : "bg-gradient-to-r from-transparent via-white/15 to-transparent",
                ].join(" ")}
              />

              {offer.heroImage?.url ? (
                <img
                  src={offer.heroImage.url}
                  alt={offer.heroImage.alt}
                  className={[
                    "block h-auto w-full object-contain transition duration-700",
                    isExpired ||
                    isFullyClaimed
                      ? "grayscale opacity-55"
                      : "opacity-100",
                  ].join(" ")}
                />
              ) : (
                <div className="flex aspect-[4/3] items-center justify-center bg-[#0D0D0D]">
                  <span className="text-xs font-medium tracking-[0.16em] text-[#52525B] uppercase">
                    Aman Digital Solutions
                  </span>
                </div>
              )}

              {(isExpired ||
                isFullyClaimed) && (
                <div className="absolute inset-0 flex items-center justify-center bg-black/25">
                  <div className="rounded-full border border-white/15 bg-black/70 px-5 py-2.5 text-xs font-bold tracking-[0.16em] text-[#A1A1AA] uppercase backdrop-blur-md">
                    {isFullyClaimed
                      ? "All Slots Claimed"
                      : "Offer Expired"}
                  </div>
                </div>
              )}
            </div>

            <p className="mt-3 text-right text-[11px] text-[#52525B]">
              Aman Digital Solutions · Special Offer
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}