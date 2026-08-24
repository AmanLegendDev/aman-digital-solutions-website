import Link from "next/link";
import {
  ArrowRight,
  Check,
  Crown,
  Sparkles,
} from "lucide-react";

import type { PricingPlanCardData } from "./PricingPlanCard";

type FeaturedPricingSectionProps = {
  plan?: PricingPlanCardData;
};

export default function FeaturedPricingSection({
  plan,
}: FeaturedPricingSectionProps) {
  if (!plan) {
    return null;
  }

  const isCustom =
    plan.pricingType === "CUSTOM";

  const formattedPrice =
    plan.price !== undefined
      ? new Intl.NumberFormat("en-IN", {
          maximumFractionDigits: 0,
        }).format(plan.price)
      : null;

  const billingLabel =
    plan.billingPeriod === "MONTHLY"
      ? "/ month"
      : plan.billingPeriod === "YEARLY"
        ? "/ year"
        : plan.billingPeriod === "ONE_TIME"
          ? "one-time"
          : plan.billingPeriod === "CUSTOM"
            ? "custom billing"
            : "";

  return (
    <section className="relative overflow-hidden border-b border-white/[0.06] bg-[#050505] py-20 sm:py-24 lg:py-28">
      {/* =====================================================
          AMBIENT GLOW
      ===================================================== */}

      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-1/2 h-[500px] w-[900px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#FFC400]/[0.025] blur-[130px]"
      />

      <div className="relative mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
        {/* =================================================
            SECTION HEADER
        ================================================= */}

        <div className="mb-10 flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <div className="flex items-center gap-3">
              <span className="flex h-8 w-8 items-center justify-center rounded-xl border border-[#FFC400]/20 bg-[#FFC400]/[0.05] text-[#FFC400]">
                <Crown size={14} />
              </span>

              <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#FFC400]">
                Recommended
              </span>
            </div>

            <h2 className="mt-5 text-3xl font-semibold leading-[1.05] tracking-[-0.045em] text-white sm:text-4xl lg:text-[3.2rem]">
              One plan.
              <br />
              <span className="text-neutral-500">
                Built to move you forward.
              </span>
            </h2>
          </div>

          <p className="max-w-md text-sm leading-7 text-neutral-600 sm:text-right">
            A balanced option for businesses that want
            professional execution without unnecessary
            complexity.
          </p>
        </div>

        {/* =================================================
            FEATURED CARD
        ================================================= */}

        <div className="relative overflow-hidden rounded-[2rem] border border-[#FFC400]/20 bg-[#090909]">
          {/* TOP ACCENT */}

          <div
            aria-hidden="true"
            className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#FFC400] to-transparent"
          />

          <div className="grid lg:grid-cols-[1.1fr_0.9fr]">
            {/* =============================================
                LEFT CONTENT
            ============================================= */}

            <div className="p-7 sm:p-9 lg:p-12">
              {/* LABEL */}

              <div className="flex flex-wrap items-center gap-3">
                <span className="inline-flex items-center gap-2 rounded-full border border-[#FFC400]/20 bg-[#FFC400]/[0.06] px-3 py-1.5 text-[8px] font-semibold uppercase tracking-[0.16em] text-[#FFC400]">
                  <Sparkles size={10} />

                  {plan.featuredLabel ||
                    "Recommended"}
                </span>

                <span className="text-[8px] font-medium uppercase tracking-[0.16em] text-neutral-700">
                  Most popular
                </span>
              </div>

              {/* NAME */}

              <h3 className="mt-7 max-w-2xl text-3xl font-semibold tracking-[-0.045em] text-white sm:text-4xl lg:text-5xl">
                {plan.name}
              </h3>

              {/* DESCRIPTION */}

              <p className="mt-5 max-w-2xl text-sm leading-7 text-neutral-500 sm:text-base sm:leading-8">
                {plan.shortDescription}
              </p>

              {/* PRICE */}

              <div className="mt-9">
                {isCustom ? (
                  <>
                    <p className="text-[9px] font-semibold uppercase tracking-[0.18em] text-[#FFC400]">
                      Custom pricing
                    </p>

                    <p className="mt-3 text-4xl font-semibold tracking-[-0.05em] text-white sm:text-5xl">
                      Let&apos;s talk
                    </p>
                  </>
                ) : formattedPrice ? (
                  <div className="flex flex-wrap items-baseline gap-x-2 gap-y-2">
                    <span className="text-sm font-medium text-neutral-500">
                      {plan.currency}
                    </span>

                    <span className="text-5xl font-semibold tracking-[-0.055em] text-white sm:text-6xl">
                      {formattedPrice}
                    </span>

                    {billingLabel && (
                      <span className="text-[9px] font-medium uppercase tracking-[0.13em] text-neutral-700">
                        {billingLabel}
                      </span>
                    )}
                  </div>
                ) : (
                  <p className="text-4xl font-semibold tracking-[-0.05em] text-white">
                    Contact us
                  </p>
                )}
              </div>

              {/* CTA */}

              <div className="mt-9">
                <Link
                  href={plan.ctaLink}
                  className="group inline-flex items-center justify-center gap-3 rounded-xl bg-[#FFC400] px-6 py-3.5 text-xs font-semibold text-black transition-all duration-300 hover:bg-[#FFD23D] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FFC400]"
                >
                  {plan.ctaText}

                  <ArrowRight
                    size={15}
                    className="transition-transform duration-300 group-hover:translate-x-1"
                  />
                </Link>
              </div>
            </div>

            {/* =============================================
                RIGHT FEATURES
            ============================================= */}

            <div className="border-t border-white/[0.06] bg-white/[0.012] p-7 sm:p-9 lg:border-l lg:border-t-0 lg:p-12">
              <div>
                <p className="text-[9px] font-semibold uppercase tracking-[0.18em] text-neutral-700">
                  What&apos;s included
                </p>

                {plan.features.length > 0 ? (
                  <ul className="mt-6 space-y-4">
                    {plan.features.map(
                      (feature, index) => (
                        <li
                          key={`${plan._id}-featured-${index}`}
                          className="flex items-start gap-3"
                        >
                          <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border border-[#FFC400]/20 bg-[#FFC400]/[0.05] text-[#FFC400]">
                            <Check size={10} />
                          </span>

                          <span className="text-sm leading-6 text-neutral-500">
                            {feature}
                          </span>
                        </li>
                      )
                    )}
                  </ul>
                ) : (
                  <p className="mt-6 text-sm text-neutral-700">
                    Details available on request.
                  </p>
                )}
              </div>

              {/* BOTTOM NOTE */}

              <div className="mt-10 border-t border-white/[0.06] pt-6">
                <p className="text-[9px] font-medium uppercase tracking-[0.16em] text-neutral-800">
                  Built around your business
                </p>

                <p className="mt-2 max-w-sm text-xs leading-5 text-neutral-700">
                  Need something different? We can tailor
                  the scope around your exact requirements.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* BOTTOM ACCENT */}

        <div className="mt-5 flex items-center justify-between">
          <span className="h-px w-20 bg-gradient-to-r from-[#FFC400]/40 to-transparent" />

          <span className="text-[8px] font-semibold uppercase tracking-[0.2em] text-neutral-800">
            {plan.name}
          </span>

          <span className="h-px w-20 bg-gradient-to-l from-[#FFC400]/40 to-transparent" />
        </div>
      </div>
    </section>
  );
}