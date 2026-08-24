import Link from "next/link";
import {
  ArrowRight,
  Check,
  Sparkles,
} from "lucide-react";

export type PricingPlanCardData = {
  _id: string;

  name: string;
  slug: string;
  shortDescription: string;

  price?: number;
  currency: string;
  pricePrefix?: string;
  priceSuffix?: string;

  pricingType:
    | "FIXED"
    | "STARTING_FROM"
    | "CUSTOM";

  billingPeriod:
    | "ONE_TIME"
    | "MONTHLY"
    | "YEARLY"
    | "CUSTOM"
    | "NONE";

  features: string[];

  ctaText: string;
  ctaLink: string;

  isFeatured: boolean;
  featuredLabel?: string;

  displayOrder: number;
};

type PricingPlanCardProps = {
  plan: PricingPlanCardData;
};

/* =========================================================
   HELPERS
========================================================= */

function formatPrice(price?: number) {
  if (price === undefined || price === null) {
    return null;
  }

  return new Intl.NumberFormat("en-IN", {
    maximumFractionDigits: 0,
  }).format(price);
}

function getBillingLabel(
  billingPeriod: PricingPlanCardData["billingPeriod"]
) {
  switch (billingPeriod) {
    case "MONTHLY":
      return "/ month";

    case "YEARLY":
      return "/ year";

    case "ONE_TIME":
      return "one-time";

    case "CUSTOM":
      return "custom billing";

    case "NONE":
    default:
      return "";
  }
}

function getPricingPrefix(
  pricingType: PricingPlanCardData["pricingType"]
) {
  switch (pricingType) {
    case "STARTING_FROM":
      return "Starting from";

    case "CUSTOM":
      return "Custom";

    case "FIXED":
    default:
      return "";
  }
}

/* =========================================================
   COMPONENT
========================================================= */

export default function PricingPlanCard({
  plan,
}: PricingPlanCardProps) {
  const formattedPrice = formatPrice(plan.price);

  const billingLabel = getBillingLabel(
    plan.billingPeriod
  );

  const pricingPrefix = getPricingPrefix(
    plan.pricingType
  );

  const isCustom = plan.pricingType === "CUSTOM";

  return (
    <article
      className={[
        "group relative flex h-full flex-col overflow-hidden rounded-[1.75rem] border bg-[#090909] transition-all duration-300",
        plan.isFeatured
          ? "border-[#FFC400]/30 shadow-[0_0_60px_rgba(255,196,0,0.045)]"
          : "border-white/[0.07] hover:border-white/[0.14]",
      ].join(" ")}
    >
      {/* =====================================================
          FEATURED ACCENT
      ===================================================== */}

      {plan.isFeatured && (
        <>
          <div
            aria-hidden="true"
            className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#FFC400] to-transparent"
          />

          <div className="absolute right-5 top-5 z-10">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-[#FFC400]/20 bg-[#FFC400]/[0.07] px-3 py-1.5 text-[8px] font-semibold uppercase tracking-[0.16em] text-[#FFC400]">
              <Sparkles size={10} />

              {plan.featuredLabel ||
                "Recommended"}
            </span>
          </div>
        </>
      )}

      {/* =====================================================
          CARD CONTENT
      ===================================================== */}

      <div className="flex flex-1 flex-col p-6 sm:p-7">
        {/* PLAN NUMBER */}

        <div className="flex items-center justify-between">
          <span className="text-[9px] font-medium tabular-nums tracking-[0.18em] text-neutral-800">
            {String(plan.displayOrder + 1).padStart(
              2,
              "0"
            )}
          </span>

          {plan.isFeatured && (
            <span className="text-[8px] font-semibold uppercase tracking-[0.18em] text-[#FFC400]/60">
              Featured
            </span>
          )}
        </div>

        {/* PLAN NAME */}

        <h2 className="mt-7 text-2xl font-semibold tracking-[-0.035em] text-white sm:text-[1.7rem]">
          {plan.name}
        </h2>

        {/* DESCRIPTION */}

        <p className="mt-3 min-h-[72px] text-sm leading-6 text-neutral-600">
          {plan.shortDescription}
        </p>

        {/* ===================================================
            PRICE
        =================================================== */}

        <div className="mt-8 min-h-[100px]">
          {isCustom ? (
            <>
              <p className="text-[9px] font-semibold uppercase tracking-[0.18em] text-[#FFC400]">
                Custom pricing
              </p>

              <p className="mt-3 text-3xl font-semibold tracking-[-0.04em] text-white">
                Let&apos;s talk
              </p>
            </>
          ) : (
            <>
              {pricingPrefix && (
                <p className="mb-2 text-[9px] font-semibold uppercase tracking-[0.17em] text-neutral-700">
                  {pricingPrefix}
                </p>
              )}

              {formattedPrice ? (
                <div className="flex flex-wrap items-baseline gap-x-2 gap-y-1">
                  <span className="text-sm font-medium text-neutral-500">
                    {plan.currency}
                  </span>

                  <span className="text-4xl font-semibold tracking-[-0.05em] text-white sm:text-[2.7rem]">
                    {formattedPrice}
                  </span>

                  {billingLabel && (
                    <span className="text-[9px] font-medium uppercase tracking-[0.12em] text-neutral-700">
                      {billingLabel}
                    </span>
                  )}
                </div>
              ) : (
                <p className="text-3xl font-semibold tracking-[-0.04em] text-white">
                  Contact us
                </p>
              )}
            </>
          )}
        </div>

        {/* ===================================================
            DIVIDER
        =================================================== */}

        <div className="my-7 h-px bg-white/[0.06]" />

        {/* ===================================================
            FEATURES
        =================================================== */}

        <div className="flex-1">
          <p className="text-[9px] font-semibold uppercase tracking-[0.18em] text-neutral-700">
            What&apos;s included
          </p>

          {plan.features.length > 0 ? (
            <ul className="mt-5 space-y-3.5">
              {plan.features.map(
                (feature, index) => (
                  <li
                    key={`${plan._id}-feature-${index}`}
                    className="flex items-start gap-3"
                  >
                    <span className="mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full border border-[#FFC400]/15 bg-[#FFC400]/[0.04] text-[#FFC400]">
                      <Check size={9} />
                    </span>

                    <span className="text-xs leading-5 text-neutral-500">
                      {feature}
                    </span>
                  </li>
                )
              )}
            </ul>
          ) : (
            <p className="mt-5 text-xs text-neutral-700">
              Details available on request.
            </p>
          )}
        </div>

        {/* ===================================================
            CTA
        =================================================== */}

        <div className="mt-8">
          <Link
            href={plan.ctaLink}
            className={[
              "group/cta flex w-full items-center justify-center gap-3 rounded-xl px-5 py-3.5 text-xs font-semibold transition-all duration-300",
              plan.isFeatured
                ? "bg-[#FFC400] text-black hover:bg-[#FFD23D]"
                : "border border-white/[0.09] bg-white/[0.02] text-white/75 hover:border-[#FFC400]/25 hover:bg-[#FFC400]/[0.04] hover:text-[#FFC400]",
            ].join(" ")}
          >
            {plan.ctaText}

            <ArrowRight
              size={14}
              className="transition-transform duration-300 group-hover/cta:translate-x-1"
            />
          </Link>
        </div>
      </div>

      {/* =====================================================
          HOVER ACCENT
      ===================================================== */}

      <span
        aria-hidden="true"
        className={[
          "absolute bottom-0 left-6 h-px bg-gradient-to-r from-[#FFC400] to-transparent transition-all duration-500",
          plan.isFeatured
            ? "w-1/2"
            : "w-0 group-hover:w-1/2",
        ].join(" ")}
      />
    </article>
  );
}