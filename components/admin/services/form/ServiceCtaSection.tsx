"use client";

import { ExternalLink, MousePointer2 } from "lucide-react";
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

export default function ServiceCtaSection({
  form,
  errors,
}: Props) {
  const {
    register,
    watch,
  } = form;

  const ctaLabel = watch("ctaLabel");
  const ctaLink = watch("ctaLink");

  return (
    <ServiceFormSection
      number="07"
      title="Call to action"
      description="Choose the action you want visitors to take after understanding this service."
    >
      <div className="space-y-6">
        {/* CTA LABEL */}

        <div>
          <label
            htmlFor="cta-label"
            className="mb-2 block text-xs font-medium text-neutral-300"
          >
            Button text
          </label>

          <input
            id="cta-label"
            {...register("ctaLabel")}
            maxLength={80}
            placeholder="Start a project"
            className={inputClass}
          />

          <div className="mt-2 flex justify-between gap-3">
            <p className="text-[11px] text-neutral-700">
              Keep it short and action-oriented.
            </p>

            <span className="text-[10px] text-neutral-700">
              {(ctaLabel?.length ?? 0)}/80
            </span>
          </div>

          {errors.ctaLabel && (
            <p className="mt-2 text-xs text-red-400">
              {errors.ctaLabel.message}
            </p>
          )}
        </div>

        {/* CTA LINK */}

        <div>
          <label
            htmlFor="cta-link"
            className="mb-2 block text-xs font-medium text-neutral-300"
          >
            Button link
          </label>

          <div className="relative">
            <ExternalLink
              size={15}
              className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-neutral-600"
            />

            <input
              id="cta-link"
              {...register("ctaLink")}
              maxLength={500}
              placeholder="/contact"
              className={`${inputClass} pl-11`}
            />
          </div>

          <p className="mt-2 text-[11px] leading-5 text-neutral-700">
            Use an internal route such as{" "}
            <span className="text-neutral-500">
              /contact
            </span>{" "}
            or a complete HTTP/HTTPS URL.
          </p>

          {errors.ctaLink && (
            <p className="mt-2 text-xs text-red-400">
              {errors.ctaLink.message}
            </p>
          )}
        </div>

        {/* PREVIEW */}

        <div className="rounded-2xl border border-[#222222] bg-[#0A0A0A] p-5">
          <div className="mb-4 flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl border border-[#FFC400]/20 bg-[#FFC400]/[0.06] text-[#FFC400]">
              <MousePointer2 size={15} />
            </div>

            <div>
              <p className="text-xs font-medium text-neutral-300">
                CTA preview
              </p>

              <p className="mt-0.5 text-[10px] text-neutral-700">
                Example of the service action
              </p>
            </div>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div className="min-w-0">
              <p className="text-sm font-medium text-white">
                {ctaLabel?.trim() ||
                  "Start a project"}
              </p>

              <p className="mt-1 truncate text-[11px] text-neutral-600">
                {ctaLink?.trim() || "/contact"}
              </p>
            </div>

            <div className="inline-flex shrink-0 items-center justify-center gap-2 rounded-full bg-[#FFC400] px-5 py-2.5 text-xs font-semibold text-black">
              {ctaLabel?.trim() ||
                "Start a project"}

              <ExternalLink size={13} />
            </div>
          </div>
        </div>
      </div>
    </ServiceFormSection>
  );
}