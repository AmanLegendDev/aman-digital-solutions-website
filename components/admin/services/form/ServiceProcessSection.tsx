"use client";

import { Plus, Trash2, Workflow } from "lucide-react";
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

export default function ServiceProcessSection({
  form,
  errors,
}: Props) {
  const { control, register } = form;

  const { fields, append, remove } = useFieldArray({
    control,
    name: "process",
  });

  return (
    <ServiceFormSection
      number="05"
      title="Delivery process"
      description="Show potential clients exactly how the service moves from the first conversation to final delivery."
    >
      <div className="space-y-4">
        {fields.length === 0 && (
          <div className="rounded-2xl border border-dashed border-[#292929] bg-[#090909] px-5 py-8 text-center">
            <Workflow
              size={20}
              className="mx-auto mb-3 text-[#FFC400]/50"
            />

            <p className="text-sm font-medium text-neutral-300">
              No process steps added
            </p>

            <p className="mt-1 text-xs text-neutral-600">
              Add the steps clients can expect when
              working with you.
            </p>
          </div>
        )}

        {fields.map((field, index) => {
          const processError =
            errors.process?.[index];

          return (
            <div
              key={field.id}
              className="relative rounded-2xl border border-[#222222] bg-[#090909] p-4 sm:p-5"
            >
              <div className="mb-5 flex items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#FFC400]/[0.07] text-xs font-semibold text-[#FFC400]">
                    {String(index + 1).padStart(
                      2,
                      "0"
                    )}
                  </span>

                  <div>
                    <p className="text-xs font-medium text-neutral-300">
                      Step {index + 1}
                    </p>

                    <p className="mt-0.5 text-[10px] text-neutral-700">
                      Client journey stage
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => remove(index)}
                  className="flex h-8 w-8 items-center justify-center rounded-lg border border-[#252525] text-neutral-600 transition-colors hover:border-red-500/30 hover:bg-red-500/[0.05] hover:text-red-400"
                  aria-label={`Remove process step ${
                    index + 1
                  }`}
                >
                  <Trash2 size={14} />
                </button>
              </div>

              <div className="grid gap-4 sm:grid-cols-[90px_1fr]">
                {/* ORDER */}

                <div>
                  <label
                    htmlFor={`process.${index}.order`}
                    className="mb-2 block text-xs font-medium text-neutral-300"
                  >
                    Order
                  </label>

                  <input
                    id={`process.${index}.order`}
                    type="number"
                    min={1}
                    {...register(
                      `process.${index}.order`,
                      {
                        valueAsNumber: true,
                      }
                    )}
                    className={inputClass}
                  />

                  {processError?.order && (
                    <p className="mt-2 text-xs text-red-400">
                      {processError.order.message}
                    </p>
                  )}
                </div>

                {/* TITLE */}

                <div>
                  <label
                    htmlFor={`process.${index}.title`}
                    className="mb-2 block text-xs font-medium text-neutral-300"
                  >
                    Step title
                  </label>

                  <input
                    id={`process.${index}.title`}
                    {...register(
                      `process.${index}.title`
                    )}
                    maxLength={120}
                    placeholder="Discovery & strategy"
                    className={inputClass}
                  />

                  {processError?.title && (
                    <p className="mt-2 text-xs text-red-400">
                      {processError.title.message}
                    </p>
                  )}
                </div>
              </div>

              {/* DESCRIPTION */}

              <div className="mt-4">
                <label
                  htmlFor={`process.${index}.description`}
                  className="mb-2 block text-xs font-medium text-neutral-300"
                >
                  Description
                </label>

                <textarea
                  id={`process.${index}.description`}
                  {...register(
                    `process.${index}.description`
                  )}
                  rows={3}
                  maxLength={500}
                  placeholder="We understand your goals, audience and business requirements before planning the right solution."
                  className={`${inputClass} resize-y leading-6`}
                />

                {processError?.description && (
                  <p className="mt-2 text-xs text-red-400">
                    {
                      processError.description
                        .message
                    }
                  </p>
                )}
              </div>
            </div>
          );
        })}

        <button
          type="button"
          onClick={() =>
            append({
              order: fields.length + 1,
              title: "",
              description: "",
            })
          }
          className="flex min-h-12 w-full items-center justify-center gap-2 rounded-xl border border-dashed border-[#303030] bg-[#080808] text-sm font-medium text-neutral-400 transition-all hover:border-[#FFC400]/30 hover:bg-[#FFC400]/[0.03] hover:text-[#FFC400]"
        >
          <Plus size={16} />
          Add process step
        </button>

        <p className="pt-1 text-[11px] leading-5 text-neutral-700">
          Keep the process simple. Usually 3–6 clear
          steps are enough.
        </p>
      </div>
    </ServiceFormSection>
  );
}