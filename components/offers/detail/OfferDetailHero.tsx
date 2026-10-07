import Link from "next/link";
import {
  ArrowLeft,
  ArrowUpRight,
  TicketPercent,
} from "lucide-react";

import OfferDetailStatus from "./OfferDetailStatus";
import OfferDetailPrice from "./OfferDetailPrice";

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

  return (
    <section className="relative overflow-hidden border-b border-[#1A1A1A] bg-[#050505]">
      {/* Ambient ADS yellow light */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 overflow-hidden"
      >
        <div
          className={[
            "absolute left-[-8rem] top-32 h-96 w-96",
            "rounded-full blur-[140px]",
            isActive
              ? "bg-[#FFD400]/[0.06]"
              : isScheduled
                ? "bg-[#FFD400]/[0.035]"
                : "bg-white/[0.018]",
          ].join(" ")}
        />

        <div
          className={[
            "absolute right-[-6rem] top-10 h-[30rem] w-[30rem]",
            "rounded-full blur-[150px]",
            isActive
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
          <ArrowLeft
            aria-hidden="true"
            className="h-4 w-4 transition-transform duration-300 group-hover:-translate-x-0.5"
          />

          All offers
        </Link>

        {/* Main content */}
        <div className="mt-9 grid gap-12 lg:grid-cols-[0.92fr_1.08fr] lg:items-center lg:gap-16">
          {/* Copy */}
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
              />
            </div>

            {/* Status message */}
            <div className="mt-7">
              {isActive && (
                <p className="text-xs font-semibold tracking-[0.18em] text-[#FFD400] uppercase">
                  Limited-time offer
                </p>
              )}

              {isScheduled && (
                <p className="text-xs font-semibold tracking-[0.18em] text-[#FFD400] uppercase">
                  Available soon
                </p>
              )}

              {isExpired && (
                <p className="text-xs font-semibold tracking-[0.18em] text-[#71717A] uppercase">
                  Promotional offer ended
                </p>
              )}
            </div>

            {/* H1 */}
            <h1 className="mt-4 max-w-3xl text-balance text-4xl font-semibold leading-[1.03] tracking-[-0.05em] text-[#F8FAFC] sm:text-5xl lg:text-6xl">
              {offer.title}
            </h1>

            {/* Description */}
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
                expired={isExpired}
              />
            </div>

            {/* Coupon */}
            {offer.couponCode && (
              <div className="mt-7 max-w-md">
                <div
                  className={[
                    "rounded-2xl border border-dashed",
                    "px-4 py-3.5",
                    isExpired
                      ? "border-[#27272A] bg-[#0A0A0A] opacity-60"
                      : "border-[#FFD400]/30 bg-[#FFD400]/[0.045]",
                  ].join(" ")}
                >
                  <div className="flex items-center gap-3">
                    <span
                      className={[
                        "flex h-10 w-10 shrink-0 items-center",
                        "justify-center rounded-xl",
                        isExpired
                          ? "border border-[#27272A] bg-[#111111] text-[#52525B]"
                          : "border border-[#FFD400]/20 bg-[#FFD400]/10 text-[#FFD400]",
                      ].join(" ")}
                    >
                      <TicketPercent
                        aria-hidden="true"
                        className="h-4 w-4"
                      />
                    </span>

                    <div className="min-w-0">
                      <p className="text-[10px] font-semibold tracking-[0.18em] text-[#71717A] uppercase">
                        {isExpired
                          ? "Coupon expired"
                          : "Exclusive coupon code"}
                      </p>

                      <p
                        className={[
                          "mt-0.5 font-mono text-sm font-bold tracking-[0.14em]",
                          isExpired
                            ? "text-[#52525B] line-through"
                            : "text-[#FFD400]",
                        ].join(" ")}
                      >
                        {offer.couponCode}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Status-specific information */}
            <div className="mt-7">
              {isActive && (
                <div className="flex flex-wrap gap-x-6 gap-y-2 text-xs text-[#71717A]">
                  <span>
                    Offer ends{" "}
                    <strong className="font-medium text-[#A1A1AA]">
                      {formatDate(offer.endDate)}
                    </strong>
                  </span>

                  <span>
                    Limited availability
                  </span>
                </div>
              )}

              {isScheduled && (
                <div className="rounded-2xl border border-[#FFD400]/15 bg-[#FFD400]/[0.025] px-4 py-3.5 text-sm text-[#A1A1AA]">
                  This offer starts on{" "}
                  <strong className="font-semibold text-[#FFD400]">
                    {formatDate(offer.startDate)}
                  </strong>
                  .
                </div>
              )}

              {isExpired && (
                <div className="rounded-2xl border border-[#27272A] bg-[#0A0A0A] px-4 py-3.5 text-sm text-[#71717A]">
                  This promotional offer ended on{" "}
                  <strong className="font-medium text-[#A1A1AA]">
                    {formatDate(offer.endDate)}
                  </strong>
                  . The promotional price is no longer available.
                </div>
              )}
            </div>

            {/* CTA */}
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              {isActive ? (
                <Link
                  href={offer.claimUrl}
                  className="group inline-flex items-center justify-center gap-2 rounded-full bg-[#FFD400] px-6 py-3.5 text-sm font-semibold text-black transition-all duration-300 hover:bg-[#F5C800]"
                >
                  {offer.ctaLabel || "Claim Offer"}

                  <ArrowUpRight
                    aria-hidden="true"
                    className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                  />
                </Link>
              ) : isScheduled ? (
                <span className="inline-flex cursor-not-allowed items-center justify-center rounded-full border border-[#27272A] bg-[#111111] px-6 py-3.5 text-sm font-semibold text-[#52525B]">
                  Available Soon
                </span>
              ) : (
                <Link
                  href="/start-a-project"
                  className="group inline-flex items-center justify-center gap-2 rounded-full bg-[#FFD400] px-6 py-3.5 text-sm font-semibold text-black transition-all duration-300 hover:bg-[#F5C800]"
                >
                  Start a Project

                  <ArrowUpRight
                    aria-hidden="true"
                    className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                  />
                </Link>
              )}

              {offer.secondaryCtaLabel &&
                offer.secondaryCtaLink && (
                  <Link
                    href={offer.secondaryCtaLink}
                    className="inline-flex items-center justify-center rounded-full border border-[#27272A] bg-[#0A0A0A] px-6 py-3.5 text-sm font-medium text-[#A1A1AA] transition hover:border-[#3F3F46] hover:bg-[#111111] hover:text-[#F8FAFC]"
                  >
                    {offer.secondaryCtaLabel}
                  </Link>
                )}
            </div>
          </div>

          {/* Hero image */}
          <div className="min-w-0">
            <div
              className={[
                "relative overflow-hidden rounded-[2rem]",
                "border bg-[#0A0A0A]",
                isActive
                  ? "border-[#FFD400]/20 shadow-[0_30px_100px_-50px_rgba(255,212,0,0.25)]"
                  : "border-[#1A1A1A]",
              ].join(" ")}
            >
              {/* top accent */}
              <div
                aria-hidden="true"
                className={[
                  "absolute inset-x-0 top-0 z-10 h-px",
                  isActive
                    ? "bg-gradient-to-r from-transparent via-[#FFD400]/70 to-transparent"
                    : "bg-gradient-to-r from-transparent via-white/15 to-transparent",
                ].join(" ")}
              />

              {offer.heroImage?.url ? (
                <img
                  src={offer.heroImage.url}
                  alt={offer.heroImage.alt}
                  className={[
                    "block h-auto w-full",
                    "object-contain",
                    "transition duration-700",
                    isExpired
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

              {/* Expired overlay */}
              {isExpired && (
                <div className="absolute inset-0 flex items-center justify-center bg-black/20">
                  <div className="rounded-full border border-white/15 bg-black/70 px-5 py-2.5 text-xs font-bold tracking-[0.16em] text-[#A1A1AA] uppercase backdrop-blur-md">
                    Offer Expired
                  </div>
                </div>
              )}
            </div>

            {/* Image caption */}
            <p className="mt-3 text-right text-[11px] text-[#52525B]">
              Aman Digital Solutions · Special Offer
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}