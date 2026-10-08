"use client";

import { Check } from "lucide-react";

import ChoiceGroup from "../ui/ChoiceGroup";
import ChecklistGroup from "../ui/ChecklistGroup";
import { ChevronDown } from "lucide-react";
import { useState } from "react";

import {
  BUDGETS,
  FEATURES,
  PAGES,
  PROJECT_TYPES,
  TIMELINES,
} from "../constants";

import type {
  FormData,
  FormErrors,
  ServiceOption,
  ToggleArray,
  UpdateForm,
} from "../types";

type OfferContext = {
  _id: string;
  title: string;
  slug: string;
  badge: string;
  shortDescription: string;
  discountLabel: string;
  originalPrice: number | null;
  offerPrice: number | null;
  couponCode: string;
  serviceId: string;
  startDate: string | null;
  endDate: string | null;
  isClaimLimitEnabled: boolean;
  claimLimit: number | null;
  claimedCount: number;
};

type Props = {
  data: FormData;
  errors: FormErrors;
  services: ServiceOption[];
  update: UpdateForm;
  toggleArray: ToggleArray;
  servicePrefilled?: boolean;
  offerApplied?: boolean;
  offer?: OfferContext | null;
};

export default function ProjectStep({
  data,
  errors,
  services,
  update,
  toggleArray,
  servicePrefilled = false,
  offerApplied = false,
  offer = null,
}: Props) {


  const [servicesOpen, setServicesOpen] = useState(false);
  return (
    <section className="p-5 sm:p-8">
      <div className="mb-8">
        <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#FFC400]">
          Step 02
        </p>

        <h2 className="mt-2 text-2xl font-semibold text-white">
          Tell us about the project
        </h2>

        <p className="mt-2 text-sm leading-6 text-neutral-500">
          A few details help us understand what
          you actually need.
        </p>
      </div>

      {/* SERVICES */}

 {/* SERVICES */}

<div className="overflow-hidden rounded-2xl border border-white/[0.07] bg-[#0A0A0A]">
  {/* HEADER */}
 <button
  type="button"
  onClick={() => {
    if (offerApplied) {
      return;
    }

    setServicesOpen(
      (current) => !current,
    );
  }}
  aria-expanded={
    offerApplied
      ? false
      : servicesOpen
  }
  aria-disabled={offerApplied}
    className="flex w-full items-center justify-between gap-4 px-4 py-4 text-left transition hover:bg-white/[0.02] sm:px-5"
  >
    <div className="min-w-0">
      <div className="flex items-center gap-2.5">
        <span className="text-sm font-medium text-white">
          What do you need?
        </span>

        {data.serviceIds.length > 0 && (
          <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-[#FFC400] px-1.5 text-[10px] font-bold text-black">
            {data.serviceIds.length}
          </span>
        )}
      </div>

   <p className="mt-1 text-xs text-neutral-600">
  {data.serviceIds.length > 0 ? (
    <>
      {data.serviceIds.length === 1
        ? (() => {
            const selectedService =
              services.find(
                (service) =>
                  service._id ===
                  data.serviceIds[0],
              );

            return selectedService
              ? selectedService.title
              : "1 service selected";
          })()
        : `${data.serviceIds.length} services selected`}
    </>
  ) : (
    "Choose one or more services"
  )}
</p>
    </div>

    <ChevronDown
      size={17}
      className={[
        "shrink-0 text-neutral-600 transition-transform duration-200",
        servicesOpen
          ? "rotate-180 text-[#FFC400]"
          : "",
      ].join(" ")}
    />
  </button>

  

   {/* AUTO-SELECTED SERVICE NOTICE */}
 {servicePrefilled &&
  data.serviceIds.length > 0 && (
    <div className="border-t border-white/[0.06] bg-[#FFC400]/[0.025] px-4 py-3 sm:px-5">
      <div className="flex items-start gap-3">
        <div className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#FFC400] text-black">
          <Check
            size={11}
            strokeWidth={3}
          />
        </div>

        <div className="min-w-0">
          <p className="text-xs font-medium text-[#EAEAEA]">
            {offerApplied
              ? "Offer service selected"
              : "Service selected for you"}
          </p>

          <p className="mt-0.5 text-[11px] leading-5 text-neutral-500">
            {offerApplied
              ? "This service is included with your selected offer and cannot be changed while the offer is applied."
              : "We selected this based on the service you were viewing. You can change it anytime."}
          </p>
        </div>
      </div>
    </div>
  )}

  {/* SERVICES LIST */}
  {servicesOpen &&
  !offerApplied && (
    <div className="border-t border-white/[0.06] px-4 pb-4 pt-3 sm:px-5">
      <div className="grid gap-2 sm:grid-cols-2">
        {services.map((service) => {
          const selected =
            data.serviceIds.includes(
              service._id,
            );

          return (
            <button
              key={service._id}
              type="button"
              onClick={() => {
                const next = selected
                  ? data.serviceIds.filter(
                      (id) =>
                        id !== service._id,
                    )
                  : [
                      ...data.serviceIds,
                      service._id,
                    ];

                update(
                  "serviceIds",
                  next,
                );
              }}
              aria-pressed={selected}
              className={[
                "group flex min-h-[64px] items-center",
                "justify-between gap-3 rounded-xl",
                "border px-4 text-left transition-all",
                selected
                  ? "border-[#FFC400]/50 bg-[#FFC400]/[0.06]"
                  : "border-white/[0.06] bg-[#0D0D0D] hover:border-white/[0.15]",
              ].join(" ")}
            >
              <div className="min-w-0">
                <p
                  className={[
                    "text-sm font-medium",
                    selected
                      ? "text-white"
                      : "text-neutral-300",
                  ].join(" ")}
                >
                  {service.title}
                </p>

                <p className="mt-1 line-clamp-1 text-xs text-neutral-600">
                  {service.shortDescription}
                </p>
              </div>

              <span
                className={[
                  "flex h-5 w-5 shrink-0 items-center",
                  "justify-center rounded-full border",
                  selected
                    ? "border-[#FFC400] bg-[#FFC400] text-black"
                    : "border-white/[0.15] text-transparent",
                ].join(" ")}
              >
                {selected && (
                  <Check
                    size={11}
                    strokeWidth={3}
                  />
                )}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  )}

  {/* ERROR */}
  {errors.serviceIds && (
    <div className="border-t border-red-500/10 px-4 py-3 sm:px-5">
      <p className="text-xs text-red-400">
        {errors.serviceIds}
      </p>
    </div>
  )}
</div>

{offerApplied && offer && (
  <div className="mt-5 overflow-hidden rounded-2xl border border-[#FFC400]/20 bg-[#FFC400]/[0.035]">
    <div className="border-b border-[#FFC400]/10 px-4 py-3 sm:px-5">
      <div className="flex items-center justify-between gap-3">
        <div>
          <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[#FFC400]">
            {offer.badge || "Special Offer"}
          </p>

          <p className="mt-1 text-sm font-semibold text-white">
            {offer.title}
          </p>
        </div>

        {offer.discountLabel && (
          <span className="shrink-0 rounded-full bg-[#FFC400] px-2.5 py-1 text-[10px] font-bold text-black">
            {offer.discountLabel}
          </span>
        )}
      </div>
    </div>

    <div className="px-4 py-4 sm:px-5">
      <div className="flex flex-wrap items-end gap-x-4 gap-y-2">
        {offer.originalPrice !== null && (
          <span className="text-sm text-neutral-600 line-through">
            ₹
            {offer.originalPrice.toLocaleString(
              "en-IN",
            )}
          </span>
        )}

        {offer.offerPrice !== null && (
          <span className="text-2xl font-semibold text-white">
            ₹
            {offer.offerPrice.toLocaleString(
              "en-IN",
            )}
          </span>
        )}

        {offer.couponCode && (
          <span className="rounded-lg border border-white/[0.08] bg-black/30 px-2.5 py-1 text-[10px] font-semibold tracking-[0.12em] text-neutral-300">
            {offer.couponCode}
          </span>
        )}
      </div>

      <p className="mt-3 text-xs leading-5 text-neutral-500">
        {offer.shortDescription}
      </p>

      {offer.isClaimLimitEnabled &&
        offer.claimLimit !== null && (
          <div className="mt-4 flex items-center justify-between border-t border-white/[0.06] pt-3">
            <span className="text-[11px] text-neutral-600">
              Limited offer
            </span>

            <span className="text-[11px] font-medium text-[#FFC400]">
              {offer.claimedCount} /{" "}
              {offer.claimLimit} claimed
            </span>
          </div>
        )}
    </div>
  </div>
)}

      {/* PROJECT TYPE */}

      <ChoiceGroup
        label="Project type"
        options={PROJECT_TYPES}
        value={data.projectType}
        onChange={(value) =>
          update(
            "projectType",
            value as FormData["projectType"],
          )
        }
      />

      {/* DESCRIPTION */}

      <div className="mt-7">
        <label className="mb-3 block text-sm font-medium text-white">
          Briefly describe your project
          <span className="ml-1 text-[#FFC400]">
            *
          </span>
        </label>

        <textarea
          value={data.projectDescription}
          onChange={(event) =>
            update(
              "projectDescription",
              event.target.value,
            )
          }
          rows={6}
          placeholder="What are you trying to build, improve or solve?"
          className={[
            "w-full resize-none rounded-xl border",
            "border-white/[0.08] bg-[#0D0D0D]",
            "px-4 py-3 text-sm text-white",
            "outline-none transition",
            "placeholder:text-neutral-700",
            "focus:border-[#FFC400]/50",
            errors.projectDescription
              ? "border-red-500/50"
              : "",
          ].join(" ")}
        />

        {errors.projectDescription && (
          <p className="mt-2 text-xs text-red-400">
            {errors.projectDescription}
          </p>
        )}
      </div>

      {/* PAGES */}

      <ChecklistGroup
        title="Pages you may need"
        items={PAGES}
        selected={data.requiredPages}
        onToggle={(value) =>
          toggleArray(
            "requiredPages",
            value,
          )
        }
      />

      {/* FEATURES */}

      <ChecklistGroup
        title="Features you may need"
        items={FEATURES}
        selected={data.requiredFeatures}
        onToggle={(value) =>
          toggleArray(
            "requiredFeatures",
            value,
          )
        }
      />

      {/* TIMELINE */}

      <ChoiceGroup
        label="Preferred timeline"
        options={TIMELINES}
        value={data.timeline}
        onChange={(value) =>
          update(
            "timeline",
            value as FormData["timeline"],
          )
        }
      />

      {/* BUDGET */}

      <ChoiceGroup
        label="Budget range"
        options={BUDGETS}
        value={data.budgetRange}
        onChange={(value) =>
          update(
            "budgetRange",
            value as FormData["budgetRange"],
          )
        }
      />
    </section>
  );
}