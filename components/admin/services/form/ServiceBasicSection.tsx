"use client";

import { useEffect, useRef } from "react";
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

function slugify(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
}

export default function ServiceBasicSection({
  form,
  errors,
}: Props) {
  const {
    register,
    watch,
    setValue,
  } = form;

  const title = watch("title");
  const slug = watch("slug");

  const slugManuallyEdited = useRef(false);

  useEffect(() => {
    if (slugManuallyEdited.current) {
      return;
    }

    const generatedSlug = slugify(title ?? "");

    setValue("slug", generatedSlug, {
      shouldDirty: true,
      shouldValidate: true,
    });
  }, [title, setValue]);

  return (
    <ServiceFormSection
      number="01"
      title="Basic information"
      description="Define the core information, positioning and classification for this service. The title automatically generates a clean SEO-friendly slug."
    >
      <div className="space-y-6">
        {/* TITLE */}

        <div>
          <label
            htmlFor="service-title"
            className="mb-2 block text-xs font-medium text-neutral-300"
          >
            Service title
          </label>

          <input
            id="service-title"
            {...register("title")}
            placeholder="Professional Website Development"
            className={inputClass}
          />

          {errors.title?.message && (
            <p className="mt-2 text-xs text-red-400">
              {errors.title.message}
            </p>
          )}
        </div>

        {/* HERO EYEBROW */}

        <div>
          <label
            htmlFor="service-hero-eyebrow"
            className="mb-2 block text-xs font-medium text-neutral-300"
          >
            Hero eyebrow
            <span className="ml-1 text-neutral-700">
              optional
            </span>
          </label>

          <input
            id="service-hero-eyebrow"
            {...register("heroEyebrow")}
            maxLength={80}
            placeholder="Web Development"
            className={inputClass}
          />

          <div className="mt-2 flex items-center justify-between gap-3">
            <p className="text-[11px] leading-5 text-neutral-700">
              Small positioning text shown above the main
              service heading.
            </p>

            <span className="shrink-0 text-[10px] text-neutral-700">
              {(watch("heroEyebrow") ?? "").length}/80
            </span>
          </div>

          {errors.heroEyebrow?.message && (
            <p className="mt-2 text-xs text-red-400">
              {errors.heroEyebrow.message}
            </p>
          )}
        </div>

        {/* SLUG */}

        <div>
          <label
            htmlFor="service-slug"
            className="mb-2 block text-xs font-medium text-neutral-300"
          >
            URL slug
          </label>

          <input
            id="service-slug"
            {...register("slug", {
              onChange: () => {
                slugManuallyEdited.current = true;
              },
            })}
            placeholder="professional-website-development"
            className={inputClass}
          />

          <p className="mt-2 text-[11px] leading-5 text-neutral-700">
            Automatically generated from the service title.
            You can edit it manually if needed.
          </p>

          {slug && (
            <p className="mt-2 text-[11px] text-neutral-500">
              URL preview:
              <span className="ml-1 text-neutral-400">
                /services/{slug}
              </span>
            </p>
          )}

          {errors.slug?.message && (
            <p className="mt-2 text-xs text-red-400">
              {errors.slug.message}
            </p>
          )}
        </div>

        {/* CATEGORY */}

        <div>
          <label
            htmlFor="service-category"
            className="mb-2 block text-xs font-medium text-neutral-300"
          >
            Service category
          </label>

          <select
            id="service-category"
            {...register("category")}
            className={selectClass}
          >
            <option value="websites">
              Websites
            </option>

            <option value="business-systems">
              Business Systems
            </option>

            <option value="growth">
              Growth
            </option>

            <option value="support">
              Support
            </option>
          </select>

          <p className="mt-2 text-[11px] leading-5 text-neutral-700">
            Used to organize services across the website
            and service listings.
          </p>

          {errors.category?.message && (
            <p className="mt-2 text-xs text-red-400">
              {errors.category.message}
            </p>
          )}
        </div>

        {/* SHORT DESCRIPTION */}

        <div>
          <label
            htmlFor="service-short-description"
            className="mb-2 block text-xs font-medium text-neutral-300"
          >
            Short description
          </label>

          <textarea
            id="service-short-description"
            {...register("shortDescription")}
            rows={3}
            placeholder="High-performance websites designed to build trust, generate leads and grow your business."
            className={`${inputClass} resize-y`}
          />

          {errors.shortDescription?.message && (
            <p className="mt-2 text-xs text-red-400">
              {errors.shortDescription.message}
            </p>
          )}
        </div>

        {/* DESCRIPTION */}

        <div>
          <label
            htmlFor="service-description"
            className="mb-2 block text-xs font-medium text-neutral-300"
          >
            Full description
          </label>

          <textarea
            id="service-description"
            {...register("description")}
            rows={7}
            placeholder="Describe the service, who it is for, the problems it solves and the value it provides."
            className={`${inputClass} resize-y`}
          />

          {errors.description?.message && (
            <p className="mt-2 text-xs text-red-400">
              {errors.description.message}
            </p>
          )}
        </div>
      </div>
    </ServiceFormSection>
  );
}