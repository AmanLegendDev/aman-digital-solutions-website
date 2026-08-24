"use client";

import type { FieldErrors, UseFormReturn } from "react-hook-form";

import CloudinaryImageUploader from "@/components/admin/media/CloudinaryImageUploader";
import type { CreateServiceInput } from "@/schemas/service.schema";

type ServiceImageSectionProps = {
  form: UseFormReturn<CreateServiceInput>;
  errors: FieldErrors<CreateServiceInput>;
};

const inputClass =
  "w-full rounded-xl border border-[#292929] bg-[#0D0D0D] px-4 py-3 text-sm text-white outline-none transition placeholder:text-white/25 focus:border-[#FFC400]/60 focus:ring-2 focus:ring-[#FFC400]/10";

const labelClass =
  "mb-2 block text-sm font-medium text-white/80";

function FieldError({
  message,
}: {
  message?: string;
}) {
  if (!message) {
    return null;
  }

  return (
    <p className="mt-1.5 text-xs text-red-400">
      {message}
    </p>
  );
}

function SectionHeader({
  number,
  title,
  description,
}: {
  number: string;
  title: string;
  description: string;
}) {
  return (
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
  );
}

export default function ServiceImageSection({
  form,
  errors,
}: ServiceImageSectionProps) {
  const {
    watch,
    setValue,
    register,
  } = form;

  const image = watch("image");
  const ogImage = watch("ogImage");

  const imageError =
    errors.image?.message;

  const imageAltError =
    errors.image?.alt?.message;

  const ogImageError =
    errors.ogImage?.message;

  const ogImageAltError =
    errors.ogImage?.alt?.message;

  return (
    <section className="rounded-2xl border border-[#252525] bg-[#0B0B0B] p-5 sm:p-7">
      <SectionHeader
        number="02"
        title="Service images"
        description="Upload the primary service image and social sharing image through Cloudinary. Use meaningful alt text for accessibility and SEO."
      />

      <div className="space-y-8">
        {/* ------------------------------------------------ */}
        {/* PRIMARY SERVICE IMAGE */}
        {/* ------------------------------------------------ */}

        <div>
          <div className="mb-4">
            <h3 className="text-sm font-medium text-white">
              Primary service image
            </h3>

            <p className="mt-1 text-xs leading-5 text-white/35">
              This image can be used on the service page,
              service cards and other public service sections.
            </p>
          </div>

          <CloudinaryImageUploader
            label="Service image"
            description="JPG, PNG, WebP or AVIF · Maximum 5MB"
            value={image}
            onChange={(value) => {
              setValue("image", value, {
                shouldDirty: true,
                shouldValidate: true,
              });
            }}
          />

          <FieldError
            message={
              typeof imageError === "string"
                ? imageError
                : undefined
            }
          />

          {/* ALT TEXT */}

          <div className="mt-5">
            <label
              htmlFor="service-image-alt"
              className={labelClass}
            >
              Image alt text
            </label>

            <input
              id="service-image-alt"
              {...register("image.alt")}
              placeholder="Professional website development service"
              className={inputClass}
            />

            <p className="mt-1.5 text-xs leading-5 text-white/30">
              Describe what the image represents. Avoid
              filenames such as IMG_8372.
            </p>

            <FieldError
              message={
                typeof imageAltError === "string"
                  ? imageAltError
                  : undefined
              }
            />
          </div>
        </div>

        {/* ------------------------------------------------ */}
        {/* DIVIDER */}
        {/* ------------------------------------------------ */}

        <div className="border-t border-[#202020]" />

        {/* ------------------------------------------------ */}
        {/* OG IMAGE */}
        {/* ------------------------------------------------ */}

        <div>
          <div className="mb-4">
            <h3 className="text-sm font-medium text-white">
              Social sharing image
            </h3>

            <p className="mt-1 text-xs leading-5 text-white/35">
              Used when this service page is shared on
              social platforms and other link-preview surfaces.
            </p>
          </div>

          <CloudinaryImageUploader
            label="OG / social sharing image"
            description="JPG, PNG, WebP or AVIF · Maximum 5MB"
            value={ogImage}
            onChange={(value) => {
              setValue("ogImage", value, {
                shouldDirty: true,
                shouldValidate: true,
              });
            }}
          />

          <FieldError
            message={
              typeof ogImageError === "string"
                ? ogImageError
                : undefined
            }
          />

          {/* OG ALT TEXT */}

          <div className="mt-5">
            <label
              htmlFor="service-og-image-alt"
              className={labelClass}
            >
              Social image alt text
            </label>

            <input
              id="service-og-image-alt"
              {...register("ogImage.alt")}
              placeholder="Aman Digital Solutions service showcase"
              className={inputClass}
            />

            <p className="mt-1.5 text-xs leading-5 text-white/30">
              Keep this descriptive and relevant to the
              service being shared.
            </p>

            <FieldError
              message={
                typeof ogImageAltError === "string"
                  ? ogImageAltError
                  : undefined
              }
            />
          </div>
        </div>

        {/* ------------------------------------------------ */}
        {/* IMAGE GUIDELINES */}
        {/* ------------------------------------------------ */}

        <div className="rounded-xl border border-[#FFC400]/10 bg-[#FFC400]/[0.03] p-4">
          <p className="text-xs font-medium text-[#FFC400]">
            Image guidelines
          </p>

          <ul className="mt-2 space-y-1.5 text-xs leading-5 text-white/40">
            <li>
              • Use high-quality images that represent the
              service accurately.
            </li>

            <li>
              • Prefer WebP or AVIF when possible for better
              performance.
            </li>

            <li>
              • Keep individual uploads below 5MB.
            </li>

            <li>
              • Always add meaningful alt text when an image
              is uploaded.
            </li>

            <li>
              • Do not upload copyrighted assets without the
              required rights.
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
}