import {
  Clock3,
  Flame,
  XCircle,
} from "lucide-react";

import { getOfferLifecycleStatus } from "@/lib/offers/status";

type OfferStatusBadgeProps = {
  startDate: string;
  endDate: string;
};

export default function OfferStatusBadge({
  startDate,
  endDate,
}: OfferStatusBadgeProps) {
  const status = getOfferLifecycleStatus({
    published: true,
    startDate: new Date(startDate),
    endDate: new Date(endDate),
  });

  const isActive = status === "active";
  const isScheduled = status === "scheduled";

  return (
    <span
      className={[
        "inline-flex items-center gap-1.5",
        "rounded-full border px-3 py-1.5",
        "text-[11px] font-semibold tracking-wide",
        "backdrop-blur-md",
        isActive
          ? "border-[#FFD400]/30 bg-black/65 text-[#FFD400]"
          : isScheduled
            ? "border-white/10 bg-black/65 text-[#F8FAFC]"
            : "border-white/10 bg-black/65 text-[#71717A]",
      ].join(" ")}
    >
      {isActive ? (
        <Flame
          aria-hidden="true"
          className="h-3.5 w-3.5"
        />
      ) : isScheduled ? (
        <Clock3
          aria-hidden="true"
          className="h-3.5 w-3.5"
        />
      ) : (
        <XCircle
          aria-hidden="true"
          className="h-3.5 w-3.5"
        />
      )}

      {isActive
        ? "LIVE NOW"
        : isScheduled
          ? "COMING SOON"
          : "EXPIRED"}
    </span>
  );
}