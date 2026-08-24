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

type Props = {
  data: FormData;
  errors: FormErrors;
  services: ServiceOption[];
  update: UpdateForm;
  toggleArray: ToggleArray;
};

export default function ProjectStep({
  data,
  errors,
  services,
  update,
  toggleArray,
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
    onClick={() =>
      setServicesOpen((current) => !current)
    }
    aria-expanded={servicesOpen}
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
        {data.serviceIds.length > 0
          ? `${data.serviceIds.length} service${
              data.serviceIds.length !== 1
                ? "s"
                : ""
            } selected`
          : "Choose one or more services"}
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

  {/* SERVICES LIST */}
  {servicesOpen && (
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