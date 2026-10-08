"use client";

import { Check, Copy, TicketPercent } from "lucide-react";
import { useState } from "react";

type OfferDetailCouponProps = {
  couponCode: string;
  discountLabel: string | null;
  offerPrice: number | null;
  endDate: string;
  disabled?: boolean;
};

function formatDate(value: string) {
  return new Intl.DateTimeFormat("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
    timeZone: "Asia/Kolkata",
  }).format(new Date(value));
}

export default function OfferDetailCoupon({
  couponCode,
  discountLabel,
  offerPrice,
  endDate,
  disabled = false,
}: OfferDetailCouponProps) {
  const [copied, setCopied] = useState(false);

  async function handleCopy() {
    if (disabled) return;

    try {
      await navigator.clipboard.writeText(couponCode);
      setCopied(true);

      window.setTimeout(() => {
        setCopied(false);
      }, 1800);
    } catch {
      setCopied(false);
    }
  }

  return (
    <div
      className={[
        "relative max-w-md overflow-hidden rounded-[1.5rem]",
        "border bg-[#0A0A0A]",
        disabled
          ? "border-[#27272A] opacity-65"
          : "border-[#FFD400]/25 shadow-[0_20px_70px_-45px_rgba(255,212,0,0.35)]",
      ].join(" ")}
    >
      {/* Top accent */}
      <div
        aria-hidden="true"
        className={[
          "absolute inset-x-0 top-0 h-px",
          disabled
            ? "bg-white/10"
            : "bg-gradient-to-r from-transparent via-[#FFD400]/70 to-transparent",
        ].join(" ")}
      />

      {/* Perforation circles */}
      <span
        aria-hidden="true"
        className="absolute -left-2 top-1/2 h-4 w-4 -translate-y-1/2 rounded-full border border-[#1A1A1A] bg-[#050505]"
      />

      <span
        aria-hidden="true"
        className="absolute -right-2 top-1/2 h-4 w-4 -translate-y-1/2 rounded-full border border-[#1A1A1A] bg-[#050505]"
      />

      <div className="p-5 sm:p-6">
        {/* Header */}
        <div className="flex items-start justify-between gap-4">
          <div>
            <p
              className={[
                "text-[10px] font-bold tracking-[0.2em] uppercase",
                disabled
                  ? "text-[#52525B]"
                  : "text-[#FFD400]",
              ].join(" ")}
            >
              Exclusive coupon
            </p>

            <p className="mt-2 text-sm font-medium text-[#F8FAFC]">
              Use this offer code when submitting your project.
            </p>
          </div>

          <span
            className={[
              "flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border",
              disabled
                ? "border-[#27272A] bg-[#111111] text-[#52525B]"
                : "border-[#FFD400]/20 bg-[#FFD400]/10 text-[#FFD400]",
            ].join(" ")}
          >
            <TicketPercent
              aria-hidden="true"
              className="h-5 w-5"
            />
          </span>
        </div>

        {/* Divider */}
        <div className="my-5 border-t border-dashed border-[#27272A]" />

        {/* Code */}
        <div className="flex items-center justify-between gap-4">
          <div>
            <p className="text-[9px] font-semibold tracking-[0.18em] text-[#52525B] uppercase">
              Coupon code
            </p>

            <p
              className={[
                "mt-1 font-mono text-xl font-bold tracking-[0.16em]",
                disabled
                  ? "text-[#52525B] line-through"
                  : "text-[#FFD400]",
              ].join(" ")}
            >
              {couponCode}
            </p>
          </div>

          <button
            type="button"
            onClick={handleCopy}
            disabled={disabled}
            className={[
              "inline-flex shrink-0 items-center gap-2 rounded-full",
              "border px-3.5 py-2 text-xs font-semibold",
              "transition-all duration-300",
              disabled
                ? "cursor-not-allowed border-[#27272A] bg-[#111111] text-[#52525B]"
                : copied
                  ? "border-[#FFD400]/25 bg-[#FFD400]/10 text-[#FFD400]"
                  : "border-[#27272A] bg-[#111111] text-[#A1A1AA] hover:border-[#FFD400]/25 hover:text-[#F8FAFC]",
            ].join(" ")}
          >
            {copied ? (
              <Check
                aria-hidden="true"
                className="h-3.5 w-3.5"
              />
            ) : (
              <Copy
                aria-hidden="true"
                className="h-3.5 w-3.5"
              />
            )}

            {copied ? "Copied" : "Copy code"}
          </button>
        </div>

        {/* Bottom details */}
        <div className="mt-5 flex flex-wrap items-center justify-between gap-3 border-t border-[#1A1A1A] pt-4">
          <span className="text-xs text-[#71717A]">
            {discountLabel || "Special offer"}
          </span>

          <span className="text-xs text-[#52525B]">
            {offerPrice !== null
              ? `Offer price ₹${offerPrice.toLocaleString("en-IN")}`
              : `Valid till ${formatDate(endDate)}`}
          </span>
        </div>
      </div>
    </div>
  );
}