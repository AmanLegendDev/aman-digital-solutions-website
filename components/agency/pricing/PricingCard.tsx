"use client";

import {
  ArrowUpRight,
  Check,
  Sparkles,
} from "lucide-react";
import { motion } from "framer-motion";

type PricingType =
  | "FIXED"
  | "STARTING_FROM"
  | "CUSTOM";

type BillingPeriod =
  | "ONE_TIME"
  | "MONTHLY"
  | "YEARLY"
  | "CUSTOM"
  | "NONE";

type PricingPlanData = {
  id: string;
  name: string;
  slug: string;
  shortDescription: string;
  price: number | null;
  currency: string;
  pricePrefix: string | null;
  priceSuffix: string | null;
  pricingType: PricingType;
  billingPeriod: BillingPeriod;
  features: string[];
  serviceId: string | null;
  ctaText: string;
  ctaLink: string;
  isFeatured: boolean;
  featuredLabel: string | null;
};

type PricingCardProps = {
  plan: PricingPlanData;
  index: number;
};

function formatPrice(price: number) {
  return new Intl.NumberFormat("en-IN", {
    maximumFractionDigits: 0,
  }).format(price);
}

function getBillingLabel(
  billingPeriod: BillingPeriod
) {
  switch (billingPeriod) {
    case "MONTHLY":
      return "/ month";

    case "YEARLY":
      return "/ year";

    case "ONE_TIME":
      return "one-time";

    case "CUSTOM":
      return "custom";

    case "NONE":
    default:
      return "";
  }
}

function getPriceContent(plan: PricingPlanData) {
  if (plan.pricingType === "CUSTOM") {
    return {
      prefix: "",
      price: "Custom",
      suffix: "",
    };
  }

  if (plan.price === null) {
    return {
      prefix: "",
      price: "Let's talk",
      suffix: "",
    };
  }

  return {
    prefix:
      plan.pricePrefix ??
      (plan.pricingType === "STARTING_FROM"
        ? "From"
        : ""),
    price: `${plan.currency}${formatPrice(plan.price)}`,
    suffix:
      plan.priceSuffix ??
      getBillingLabel(plan.billingPeriod),
  };
}

export default function PricingCard({
  plan,
  index,
}: PricingCardProps) {
  const priceContent = getPriceContent(plan);

  const isExternalLink =
    /^https?:\/\//i.test(plan.ctaLink);

  return (
    <motion.article
      initial={{
        opacity: 0,
        y: 24,
      }}
      whileInView={{
        opacity: 1,
        y: 0,
      }}
      viewport={{
        once: true,
        amount: 0.15,
      }}
      transition={{
        duration: 0.55,
        delay: Math.min(index * 0.08, 0.2),
        ease: [0.22, 1, 0.36, 1],
      }}
      className={[
        "group relative flex min-w-0 w-full flex-col overflow-hidden rounded-[26px] border transition-all duration-300",
        plan.isFeatured
          ? "border-[#FFC400]/30 bg-[#0D0D0D] shadow-[0_0_60px_rgba(255,196,0,0.045)]"
          : "border-[#202020] bg-[#0A0A0A] hover:border-[#303030]",
      ].join(" ")}
    >
      {/* FEATURED GLOW */}
      {plan.isFeatured && (
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-24 -top-24 h-52 w-52 rounded-full bg-[#FFC400]/[0.07] blur-[70px]"
        />
      )}

      {/* FEATURED LABEL */}
      {plan.isFeatured && (
        <div className="relative border-b border-[#FFC400]/15 bg-[#FFC400]/[0.045] px-5 py-2.5">
          <div className="flex items-center justify-between gap-3">
            <div className="flex min-w-0 items-center gap-2">
              <Sparkles
                size={13}
                className="shrink-0 text-[#FFC400]"
              />

              <span className="truncate text-[9px] font-semibold uppercase tracking-[0.17em] text-[#FFC400]">
                {plan.featuredLabel ||
                  "Most popular"}
              </span>
            </div>

            <span className="text-[9px] uppercase tracking-[0.14em] text-[#5D5D5D]">
              Recommended
            </span>
          </div>
        </div>
      )}

      {/* MAIN CONTENT */}
      <div className="relative flex min-w-0 flex-1 flex-col p-6 sm:p-7">
        {/* PLAN NAME */}
        <div>
          <h3 className="text-xl font-semibold tracking-[-0.025em] text-[#F0F0F0]">
            {plan.name}
          </h3>

          <p className="mt-2 min-h-[48px] text-sm leading-6 text-[#777]">
            {plan.shortDescription}
          </p>
        </div>

        {/* PRICE */}
        <div className="mt-7 border-y border-[#202020] py-6">
          {priceContent.prefix && (
            <p className="mb-1 text-[10px] font-medium uppercase tracking-[0.14em] text-[#666]">
              {priceContent.prefix}
            </p>
          )}

          <div className="flex min-w-0 items-end gap-2">
            <span
              className={[
                "min-w-0 break-words font-semibold tracking-[-0.045em]",
                priceContent.price === "Custom" ||
                priceContent.price === "Let's talk"
                  ? "text-3xl text-[#F5F5F5]"
                  : "text-[2.15rem] text-[#F5F5F5] sm:text-[2.45rem]",
              ].join(" ")}
            >
              {priceContent.price}
            </span>

            {priceContent.suffix && (
              <span className="mb-1.5 shrink-0 text-[10px] text-[#555]">
                {priceContent.suffix}
              </span>
            )}
          </div>
        </div>

        {/* FEATURES */}
        <div className="mt-7 flex-1">
          <p className="mb-4 text-[9px] font-medium uppercase tracking-[0.17em] text-[#4F4F4F]">
            What's included
          </p>

          <ul className="space-y-3.5">
            {plan.features.map((feature, featureIndex) => (
              <li
                key={`${plan.id}-${featureIndex}`}
                className="flex min-w-0 items-start gap-3"
              >
                <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border border-[#2A2A2A] bg-[#111111] text-[#FFC400]">
                  <Check
                    size={11}
                    strokeWidth={2.2}
                  />
                </span>

                <span className="min-w-0 break-words text-sm leading-5 text-[#8A8A8A]">
                  {feature}
                </span>
              </li>
            ))}
          </ul>
        </div>

        {/* CTA */}
        <div className="mt-8">
          {isExternalLink ? (
            <a
              href={plan.ctaLink}
              target="_blank"
              rel="noopener noreferrer"
              className={[
                "group/cta flex min-h-12 w-full items-center justify-center gap-2 rounded-full px-5 text-sm font-semibold transition-all duration-200",
                plan.isFeatured
                  ? "bg-[#FFC400] text-black hover:bg-[#FFD43B] hover:shadow-[0_0_30px_rgba(255,196,0,0.14)]"
                  : "border border-[#292929] bg-[#111111] text-[#E5E5E5] hover:border-[#FFC400]/30 hover:bg-[#151515] hover:text-white",
              ].join(" ")}
            >
              <span>{plan.ctaText}</span>

              <ArrowUpRight
                size={16}
                className="transition-transform duration-200 group-hover/cta:-translate-y-0.5 group-hover/cta:translate-x-0.5"
              />
            </a>
          ) : (
            <a
              href={plan.ctaLink}
              className={[
                "group/cta flex min-h-12 w-full items-center justify-center gap-2 rounded-full px-5 text-sm font-semibold transition-all duration-200",
                plan.isFeatured
                  ? "bg-[#FFC400] text-black hover:bg-[#FFD43B] hover:shadow-[0_0_30px_rgba(255,196,0,0.14)]"
                  : "border border-[#292929] bg-[#111111] text-[#E5E5E5] hover:border-[#FFC400]/30 hover:bg-[#151515] hover:text-white",
              ].join(" ")}
            >
              <span>{plan.ctaText}</span>

              <ArrowUpRight
                size={16}
                className="transition-transform duration-200 group-hover/cta:-translate-y-0.5 group-hover/cta:translate-x-0.5"
              />
            </a>
          )}
        </div>
      </div>
    </motion.article>
  );
}