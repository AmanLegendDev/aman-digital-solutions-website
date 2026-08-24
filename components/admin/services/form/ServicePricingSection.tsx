"use client";

import { IndianRupee, Tag } from "lucide-react";
import type {
  FieldErrors,
  UseFormReturn,
} from "react-hook-form";

import type { CreateServiceInput } from "@/schemas/service.schema";

import ServiceFormSection from "./ServiceFormSection";

type Props = {
  form: UseFormReturn<CreateServiceInput>;
  errors: FieldErrors<CreateServiceInput>;
};

const inputClass =
  "w-full rounded-xl border border-[#262626] bg-[#090909] px-4 py-3 text-sm text-white outline-none transition-all placeholder:text-neutral-700 focus:border-[#FFC400]/50 focus:ring-1 focus:ring-[#FFC400]/20";

const selectClass =
  "w-full appearance-none rounded-xl border border-[#262626] bg-[#090909] px-4 py-3 text-sm text-white outline-none transition-all focus:border-[#FFC400]/50 focus:ring-1 focus:ring-[#FFC400]/20";

export default function ServicePricingSection({
  form,
  errors,
}: Props) {
  const {
    register,
    watch,
  } = form;

  const startingPrice =
    watch("startingPrice");

  return (
    <ServiceFormSection
      number="06"
      title="Pricing"
      description="Set the public pricing information for this service. Keep it flexible when the final quote depends on project scope."
    >
      <div className="space-y-6">
        {/* PRICE MODE */}

        <div>
          <label
            htmlFor="pricing-display"
            className="mb-2 block text-xs font-medium text-neutral-300"
          >
            Pricing display
          </label>

          <select
            id="pricing-display"
            {...register("priceLabel")}
            className={selectClass}
          >
            <option value="">
              No pricing label
            </option>

            <option value="Starting from">
              Starting from
            </option>

            <option value="From">
              From
            </option>

            <option value="Custom quote">
              Custom quote
            </option>

            <option value="Let's discuss">
              Let's discuss
            </option>
          </select>

          <p className="mt-2 text-[11px] text-neutral-700">
            This controls the label shown alongside
            the price.
          </p>
        </div>

        {/* PRICE */}

        <div>
          <label
            htmlFor="starting-price"
            className="mb-2 block text-xs font-medium text-neutral-300"
          >
            Starting price
          </label>

          <div className="relative">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex w-11 items-center justify-center border-r border-[#222222] text-neutral-600">
              <IndianRupee size={14} />
            </div>

            <input
              id="starting-price"
              type="number"
              min={0}
              step="1"
              {...register(
                "startingPrice",
                {
                  valueAsNumber: true,
                }
              )}
              placeholder="25000"
              className={`${inputClass} pl-14`}
            />
          </div>

          {errors.startingPrice && (
            <p className="mt-2 text-xs text-red-400">
              {errors.startingPrice.message}
            </p>
          )}

          <p className="mt-2 text-[11px] text-neutral-700">
            Leave empty when the service requires a
            custom quotation.
          </p>
        </div>

        {/* PREVIEW */}

        <div className="rounded-2xl border border-[#222222] bg-[#0A0A0A] p-5">
          <div className="mb-4 flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl border border-[#242424] bg-[#0D0D0D] text-[#FFC400]">
              <Tag size={15} />
            </div>

            <div>
              <p className="text-xs font-medium text-neutral-300">
                Pricing preview
              </p>

              <p className="mt-0.5 text-[10px] text-neutral-700">
                How the pricing information can appear
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-baseline gap-2">
            {startingPrice !==
              undefined &&
            startingPrice !== null &&
            !Number.isNaN(startingPrice) ? (
              <>
                <span className="text-xs text-neutral-600">
                  {watch("priceLabel") ||
                    "Starting from"}
                </span>

                <span className="text-2xl font-semibold tracking-tight text-white">
                  ₹
                  {Number(
                    startingPrice
                  ).toLocaleString("en-IN")}
                </span>
              </>
            ) : (
              <span className="text-lg font-semibold text-white">
                Custom quote
              </span>
            )}
          </div>
        </div>

        {/* GUIDANCE */}

        <div className="rounded-xl border border-[#202020] bg-[#080808] px-4 py-3">
          <p className="text-[11px] leading-5 text-neutral-600">
            <span className="text-neutral-400">
              Pro tip:
            </span>{" "}
            Don't underprice complex work just to look
            affordable. Use a starting price when scope
            varies, then qualify the project before giving
            the final quote.
          </p>
        </div>
      </div>
    </ServiceFormSection>
  );
}