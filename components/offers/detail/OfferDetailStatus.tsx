import {
  Clock3,
  Flame,
  XCircle,
} from "lucide-react";

import type { OfferLifecycleStatus } from "@/lib/offers/status";

type OfferDetailStatusProps = {
  status: OfferLifecycleStatus;
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

export default function OfferDetailStatus({
  status,
  startDate,
  endDate,
}: OfferDetailStatusProps) {
  const isActive = status === "active";
  const isScheduled = status === "scheduled";
  const isExpired = status === "expired";

  if (isActive) {
    return (
      <div className="inline-flex items-center gap-2 rounded-full border border-[#FFD400]/30 bg-[#FFD400]/[0.07] px-3.5 py-2 text-xs font-bold tracking-[0.08em] text-[#FFD400]">
        <span className="relative flex h-2 w-2">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#FFD400] opacity-60" />

          <span className="relative inline-flex h-2 w-2 rounded-full bg-[#FFD400]" />
        </span>

        <Flame
          aria-hidden="true"
          className="h-3.5 w-3.5"
        />

        LIVE NOW

        <span className="hidden font-normal tracking-normal text-[#71717A] sm:inline">
          · Ends {formatDate(endDate)}
        </span>
      </div>
    );
  }

  if (isScheduled) {
    return (
      <div className="inline-flex items-center gap-2 rounded-full border border-[#FFD400]/20 bg-[#FFD400]/[0.035] px-3.5 py-2 text-xs font-bold tracking-[0.08em] text-[#FFD400]">
        <Clock3
          aria-hidden="true"
          className="h-3.5 w-3.5"
        />

        COMING SOON

        <span className="hidden font-normal tracking-normal text-[#71717A] sm:inline">
          · Starts {formatDate(startDate)}
        </span>
      </div>
    );
  }

  if (isExpired) {
    return (
      <div className="inline-flex items-center gap-2 rounded-full border border-[#27272A] bg-[#0A0A0A] px-3.5 py-2 text-xs font-bold tracking-[0.08em] text-[#71717A]">
        <XCircle
          aria-hidden="true"
          className="h-3.5 w-3.5"
        />

        OFFER EXPIRED

        <span className="hidden font-normal tracking-normal text-[#52525B] sm:inline">
          · Ended {formatDate(endDate)}
        </span>
      </div>
    );
  }

  /*
   * Drafts should never normally reach this public page
   * because the database query filters published=true.
   * This fallback keeps the component type-safe.
   */
  return (
    <div className="inline-flex items-center gap-2 rounded-full border border-[#27272A] bg-[#0A0A0A] px-3.5 py-2 text-xs font-bold tracking-[0.08em] text-[#52525B]">
      <XCircle
        aria-hidden="true"
        className="h-3.5 w-3.5"
      />

      UNAVAILABLE
    </div>
  );
}