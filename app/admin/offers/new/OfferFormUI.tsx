"use client";

import type { ReactNode } from "react";
import type {
  FieldErrors,
  UseFormRegister,
  UseFormSetValue,
} from "react-hook-form";

import type { FormValues, ImageValue } from "./OfferForm.types";

export const inputClass =
  "w-full rounded-xl border border-[#292929] bg-[#0D0D0D] px-4 py-3 text-sm text-white outline-none transition placeholder:text-white/25 focus:border-[#FFC400]/60 focus:ring-2 focus:ring-[#FFC400]/10";

export const textareaClass =
  "w-full resize-y rounded-xl border border-[#292929] bg-[#0D0D0D] px-4 py-3 text-sm leading-6 text-white outline-none transition placeholder:text-white/25 focus:border-[#FFC400]/60 focus:ring-2 focus:ring-[#FFC400]/10";

export const selectClass =
  "w-full rounded-xl border border-[#292929] bg-[#0D0D0D] px-4 py-3 text-sm text-white outline-none transition focus:border-[#FFC400]/60 focus:ring-2 focus:ring-[#FFC400]/10";

export const labelClass =
  "mb-2 block text-sm font-medium text-white/80";

export function Section({
  number,
  title,
  description,
  children,
}: {
  number: string;
  title: string;
  description: string;
  children: ReactNode;
}) {
  return (
    <section className="rounded-2xl border border-[#252525] bg-[#0B0B0B] p-5 sm:p-7">
      <div className="mb-7 flex gap-4">
        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[#FFC400] text-xs font-bold text-black">
          {number}
        </div>

        <div>
          <h2 className="text-lg font-semibold text-white">
            {title}
          </h2>

          <p className="mt-1 max-w-2xl text-sm leading-5 text-white/40">
            {description}
          </p>
        </div>
      </div>

      {children}
    </section>
  );
}

export function FieldError({
  message,
}: {
  message?: string;
}) {
  if (!message) return null;

  return (
    <p className="mt-1.5 text-xs text-red-400">
      {message}
    </p>
  );
}

export function ImageAltField({
  value,
  onChange,
  error,
}: {
  value?: string | null;
  onChange: (value: string) => void;
  error?: string;
}) {
  return (
    <div className="mt-5">
      <label className={labelClass}>
        Image alt text
      </label>

      <input
        value={value ?? ""}
        onChange={(event) =>
          onChange(event.target.value)
        }
        placeholder="Describe the offer image"
        className={inputClass}
      />

      <FieldError message={error} />
    </div>
  );
}

export type CommonSectionProps = {
  register: UseFormRegister<FormValues>;
  errors: FieldErrors<FormValues>;
  setValue: UseFormSetValue<FormValues>;
};