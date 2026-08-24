"use client";

import {
  Eye,
  EyeOff,
  GripVertical,
  Star,
} from "lucide-react";
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

function Toggle({
  checked,
  onChange,
  label,
  description,
  icon,
}: {
  checked: boolean;
  onChange: (
    checked: boolean
  ) => void;
  label: string;
  description: string;
  icon: React.ReactNode;
}) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      onClick={() => onChange(!checked)}
      className={[
        "flex w-full items-center justify-between gap-5 rounded-2xl border p-4 text-left transition-all",
        checked
          ? "border-[#FFC400]/25 bg-[#FFC400]/[0.035]"
          : "border-[#242424] bg-[#090909] hover:border-[#303030]",
      ].join(" ")}
    >
      <div className="flex min-w-0 items-center gap-3">
        <div
          className={[
            "flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border",
            checked
              ? "border-[#FFC400]/20 bg-[#FFC400]/[0.08] text-[#FFC400]"
              : "border-[#242424] bg-[#0D0D0D] text-neutral-600",
          ].join(" ")}
        >
          {icon}
        </div>

        <div className="min-w-0">
          <p className="text-sm font-medium text-neutral-200">
            {label}
          </p>

          <p className="mt-1 text-[11px] leading-5 text-neutral-600">
            {description}
          </p>
        </div>
      </div>

      <span
        aria-hidden="true"
        className={[
          "relative h-6 w-11 shrink-0 rounded-full p-0.5 transition-colors",
          checked
            ? "bg-[#FFC400]"
            : "bg-[#292929]",
        ].join(" ")}
      >
        <span
          className={[
            "block h-5 w-5 rounded-full bg-white shadow-sm transition-transform",
            checked
              ? "translate-x-5"
              : "translate-x-0",
          ].join(" ")}
        />
      </span>
    </button>
  );
}

export default function ServicePublishingSection({
  form,
  errors,
}: Props) {
  const {
    register,
    watch,
    setValue,
  } = form;

  const featured =
    watch("featured") ?? false;

  const published =
    watch("published") ?? false;

  const displayOrder =
    watch("displayOrder") ?? 0;

  return (
    <ServiceFormSection
      number="08"
      title="Publishing & visibility"
      description="Control where and how this service appears across the website."
    >
      <div className="space-y-5">
        {/* PUBLISHED */}

        <Toggle
          checked={published}
          onChange={(value) =>
            setValue(
              "published",
              value,
              {
                shouldDirty: true,
                shouldValidate: true,
              }
            )
          }
          label="Publish service"
          description={
            published
              ? "This service is allowed to appear on public pages."
              : "This service remains hidden from public pages."
          }
          icon={
            published ? (
              <Eye size={16} />
            ) : (
              <EyeOff size={16} />
            )
          }
        />

        {/* FEATURED */}

        <Toggle
          checked={featured}
          onChange={(value) =>
            setValue(
              "featured",
              value,
              {
                shouldDirty: true,
                shouldValidate: true,
              }
            )
          }
          label="Featured service"
          description="Give this service priority in featured service sections and listings."
          icon={<Star size={16} />}
        />

        {/* DISPLAY ORDER */}

        <div className="rounded-2xl border border-[#242424] bg-[#090909] p-4">
          <div className="mb-4 flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl border border-[#242424] bg-[#0D0D0D] text-neutral-600">
              <GripVertical size={16} />
            </div>

            <div>
              <p className="text-sm font-medium text-neutral-300">
                Display order
              </p>

              <p className="mt-0.5 text-[10px] text-neutral-700">
                Lower numbers appear first.
              </p>
            </div>
          </div>

          <input
            id="display-order"
            type="number"
            min={0}
            {...register(
              "displayOrder",
              {
                valueAsNumber: true,
              }
            )}
            className={inputClass}
          />

          {errors.displayOrder && (
            <p className="mt-2 text-xs text-red-400">
              {errors.displayOrder.message}
            </p>
          )}

          <div className="mt-3 flex items-center justify-between">
            <span className="text-[10px] text-neutral-700">
              Current position
            </span>

            <span className="text-[10px] font-medium text-neutral-500">
              #{Number.isFinite(displayOrder)
                ? displayOrder
                : 0}
            </span>
          </div>
        </div>

        {/* STATUS SUMMARY */}

        <div className="grid gap-3 sm:grid-cols-2">
          <div className="rounded-xl border border-[#202020] bg-[#080808] px-4 py-3">
            <p className="text-[9px] font-medium uppercase tracking-[0.16em] text-neutral-700">
              Visibility
            </p>

            <p
              className={[
                "mt-1 text-sm font-medium",
                published
                  ? "text-emerald-400"
                  : "text-neutral-500",
              ].join(" ")}
            >
              {published
                ? "Published"
                : "Draft"}
            </p>
          </div>

          <div className="rounded-xl border border-[#202020] bg-[#080808] px-4 py-3">
            <p className="text-[9px] font-medium uppercase tracking-[0.16em] text-neutral-700">
              Homepage priority
            </p>

            <p
              className={[
                "mt-1 text-sm font-medium",
                featured
                  ? "text-[#FFC400]"
                  : "text-neutral-500",
              ].join(" ")}
            >
              {featured
                ? "Featured"
                : "Standard"}
            </p>
          </div>
        </div>
      </div>
    </ServiceFormSection>
  );
}