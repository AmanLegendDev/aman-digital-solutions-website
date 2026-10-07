import type { IOffer } from "@/models/Offer";

export type OfferLifecycleStatus =
  | "draft"
  | "scheduled"
  | "active"
  | "expired";

export function getOfferLifecycleStatus(
  offer: Pick<
    IOffer,
    "published" | "startDate" | "endDate"
  >,
  now: Date = new Date(),
): OfferLifecycleStatus {
  if (!offer.published) {
    return "draft";
  }

  const currentTime =
    now.getTime();

  const startTime =
    new Date(
      offer.startDate,
    ).getTime();

  const endTime =
    new Date(
      offer.endDate,
    ).getTime();

  if (currentTime < startTime) {
    return "scheduled";
  }

  if (currentTime >= endTime) {
    return "expired";
  }

  return "active";
}

export function isOfferActive(
  offer: Pick<
    IOffer,
    "published" | "startDate" | "endDate"
  >,
  now: Date = new Date(),
) {
  return (
    getOfferLifecycleStatus(
      offer,
      now,
    ) === "active"
  );
}