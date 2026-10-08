import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

import OfferCard from "./OfferCard";

export type OfferCardData = {
  id: string;

  title: string;
  slug: string;

  badge: string | null;
  shortDescription: string;

  offerType:
    | "discount"
    | "seasonal"
    | "limited-time"
    | "bundle"
    | "custom";

  discountType: "percentage" | "fixed" | "none";
  discountValue: number | null;

  originalPrice: number | null;
  offerPrice: number | null;
  discountLabel: string | null;

  couponCode: string | null;

  cardImage: {
    url: string;
    publicId: string | null;
    alt: string;
  } | null;

  highlights: string[];

  ctaLabel: string;

  startDate: string;
  endDate: string;

  isClaimLimitEnabled: boolean;
  claimLimit: number | null;
  claimedCount: number;

  featured: boolean;
  displayOrder: number;
};

type OffersGridProps = {
  offers: OfferCardData[];
};

export default function OffersGrid({
  offers,
}: OffersGridProps) {
  return (
    <section
      id="offers-list"
      aria-labelledby="offers-list-heading"
      className="bg-[#050505] px-5 py-20 sm:px-8 sm:py-24 lg:px-10 lg:py-28"
    >
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-10 flex flex-col gap-5 border-b border-[#1A1A1A] pb-8 sm:mb-12 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-xs font-semibold tracking-[0.18em] text-[#FFD400] uppercase">
              Current opportunities
            </p>

            <h2
              id="offers-list-heading"
              className="mt-3 text-3xl font-semibold tracking-[-0.035em] text-[#F8FAFC] sm:text-4xl"
            >
              Choose an offer that fits.
            </h2>
          </div>

          <Link
            href="/start-a-project"
            className="group inline-flex w-fit items-center gap-2 text-sm font-medium text-[#A1A1AA] transition hover:text-[#F8FAFC]"
          >
            Need something custom?

            <ArrowUpRight
              aria-hidden="true"
              className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
            />
          </Link>
        </div>

        {/* Offers */}
        {offers.length > 0 ? (
          <div className="grid gap-7 lg:grid-cols-2">
            {offers.map((offer) => (
              <OfferCard
                key={offer.id}
                offer={offer}
              />
            ))}
          </div>
        ) : (
          <div className="rounded-[2rem] border border-[#1A1A1A] bg-[#0A0A0A] px-6 py-16 text-center">
            <p className="text-xs font-semibold tracking-[0.18em] text-[#FFD400] uppercase">
              No current promotions
            </p>

            <h3 className="mt-4 text-2xl font-semibold tracking-[-0.03em] text-[#F8FAFC]">
              There are no public offers right now.
            </h3>

            <p className="mx-auto mt-4 max-w-xl text-sm leading-7 text-[#71717A]">
              If you already have a project in mind, tell us what you are
              building and we&apos;ll help you find the right digital
              approach.
            </p>

            <Link
              href="/start-a-project"
              className="mt-8 inline-flex items-center gap-2 rounded-full bg-[#FFD400] px-6 py-3.5 text-sm font-semibold text-black transition hover:bg-[#F5C800]"
            >
              Start a project

              <ArrowUpRight
                aria-hidden="true"
                className="h-4 w-4"
              />
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}