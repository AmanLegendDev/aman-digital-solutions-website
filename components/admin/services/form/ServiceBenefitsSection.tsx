"use client";

import { Plus, Trash2, Sparkles } from "lucide-react";
import {
  useFieldArray,
  type FieldErrors,
  type UseFormReturn,
} from "react-hook-form";

import type { CreateServiceInput } from "@/schemas/service.schema";

import ServiceFormSection from "./ServiceFormSection";

type Props = {
  form: UseFormReturn<CreateServiceInput>;
  errors: FieldErrors<CreateServiceInput>;
};

const inputClass =
  "w-full rounded-xl border border-[#262626] bg-[#090909] px-4 py-3 text-sm text-white outline-none transition-all placeholder:text-neutral-700 focus:border-[#FFC400]/50 focus:ring-1 focus:ring-[#FFC400]/20";

export default function ServiceBenefitsSection({
  form,
  errors,
}: Props) {
  const { control, register } = form;

  const { fields, append, remove } = useFieldArray({
    control,
    name: "benefits",
  });

  return (
    <ServiceFormSection
      number="03"
      title="Client benefits"
      description="Explain the business outcomes and advantages a client gets from choosing this service."
    >
      <div className="space-y-4">
        {fields.length === 0 && (
          <div className="rounded-2xl border border-dashed border-[#292929] bg-[#090909] px-5 py-8 text-center">
            <Sparkles
              size={20}
              className="mx-auto mb-3 text-[#FFC400]/50"
            />

            <p className="text-sm font-medium text-neutral-300">
              No benefits added yet
            </p>

            <p className="mt-1 text-xs text-neutral-600">
              Add the first benefit to explain why this
              service matters to the client.
            </p>
          </div>
        )}

        {fields.map((field, index) => {
          const benefitError =
            errors.benefits?.[index];

          return (
            <div
              key={field.id}
              className="relative rounded-2xl border border-[#222222] bg-[#090909] p-4 sm:p-5"
            >
              <div className="mb-5 flex items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#FFC400]/[0.07] text-[10px] font-semibold text-[#FFC400]">
                    {String(index + 1).padStart(
                      2,
                      "0"
                    )}
                  </span>

                  <div>
                    <p className="text-xs font-medium text-neutral-300">
                      Benefit {index + 1}
                    </p>

                    <p className="mt-0.5 text-[10px] text-neutral-700">
                      Client-facing value proposition
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => remove(index)}
                  className="flex h-8 w-8 items-center justify-center rounded-lg border border-[#252525] text-neutral-600 transition-colors hover:border-red-500/30 hover:bg-red-500/[0.05] hover:text-red-400"
                  aria-label={`Remove benefit ${index + 1}`}
                >
                  <Trash2 size={14} />
                </button>
              </div>

              <div className="grid gap-4 sm:grid-cols-[1fr_180px]">
                {/* TITLE */}
                <div>
                  <label
                    htmlFor={`benefits.${index}.title`}
                    className="mb-2 block text-xs font-medium text-neutral-300"
                  >
                    Benefit title
                  </label>

                  <input
                    id={`benefits.${index}.title`}
                    {...register(
                      `benefits.${index}.title`
                    )}
                    maxLength={120}
                    placeholder="More qualified leads"
                    className={inputClass}
                  />

                  {benefitError?.title && (
                    <p className="mt-2 text-xs text-red-400">
                      {benefitError.title.message}
                    </p>
                  )}
                </div>

                {/* ICON */}
                <div>
                  <label
                    htmlFor={`benefits.${index}.icon`}
                    className="mb-2 block text-xs font-medium text-neutral-300"
                  >
                    Icon
                    <span className="ml-1 text-neutral-700">
                      optional
                    </span>
                  </label>

                  <input
                    id={`benefits.${index}.icon`}
                    {...register(
                      `benefits.${index}.icon`
                    )}
                    maxLength={100}
                    placeholder="TrendingUp"
                    className={inputClass}
                  />

                  {benefitError?.icon && (
                    <p className="mt-2 text-xs text-red-400">
                      {benefitError.icon.message}
                    </p>
                  )}
                </div>
              </div>

              {/* DESCRIPTION */}
              <div className="mt-4">
                <label
                  htmlFor={`benefits.${index}.description`}
                  className="mb-2 block text-xs font-medium text-neutral-300"
                >
                  Description
                </label>

                <textarea
                  id={`benefits.${index}.description`}
                  {...register(
                    `benefits.${index}.description`
                  )}
                  rows={3}
                  maxLength={500}
                  placeholder="Turn your website into a reliable channel for attracting and converting customers."
                  className={`${inputClass} resize-y leading-6`}
                />

                {benefitError?.description && (
                  <p className="mt-2 text-xs text-red-400">
                    {benefitError.description.message}
                  </p>
                )}
              </div>
            </div>
          );
        })}

        {/* ADD */}
        <button
          type="button"
          onClick={() =>
            append({
              title: "",
              description: "",
              icon: "",
            })
          }
          className="flex min-h-12 w-full items-center justify-center gap-2 rounded-xl border border-dashed border-[#303030] bg-[#080808] text-sm font-medium text-neutral-400 transition-all hover:border-[#FFC400]/30 hover:bg-[#FFC400]/[0.03] hover:text-[#FFC400]"
        >
          <Plus size={16} />
          Add benefit
        </button>

        <p className="pt-1 text-[11px] leading-5 text-neutral-700">
          Keep benefits outcome-focused. Avoid simply
          repeating technical features.
        </p>
      </div>
    </ServiceFormSection>
  );
}