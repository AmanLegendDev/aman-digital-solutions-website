"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import {
  Check,
  ChevronLeft,
  Plus,
  Trash2,
} from "lucide-react";

import { useForm } from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";

import {
  pricingSchema,
} from "@/schemas/pricing.schema";

import type { z } from "zod";

import {
  createPricingPlan,
} from "@/actions/pricing.actions";

type FormValues = z.input<typeof pricingSchema>;

type ServiceOption = {
  _id: string;
  title: string;
};

type PricingCreateFormProps = {
  services?: ServiceOption[];
};

const inputClass =
  "w-full rounded-xl border border-[#292929] bg-[#0D0D0D] px-4 py-3 text-sm text-[#F5F5F5] outline-none transition placeholder:text-[#666] focus:border-[#FFC400]/60";

const textareaClass =
  "w-full rounded-xl border border-[#292929] bg-[#0D0D0D] px-4 py-3 text-sm leading-6 text-[#F5F5F5] outline-none transition placeholder:text-[#666] focus:border-[#FFC400]/60";

const selectClass =
  "w-full rounded-xl border border-[#292929] bg-[#0D0D0D] px-4 py-3 text-sm text-[#F5F5F5] outline-none transition focus:border-[#FFC400]/60";

const labelClass =
  "mb-2 block text-sm font-medium text-[#E5E5E5]";

function slugify(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

export default function PricingCreateForm({
  services = [],
}: PricingCreateFormProps) {
  const router = useRouter();

  const [saving, setSaving] = useState(false);
  const [serverError, setServerError] =
    useState("");

 const {
  register,
  control,
  watch,
  setValue,
  handleSubmit,
  formState: { errors },
} = useForm<FormValues>({
    resolver: zodResolver(pricingSchema),

    defaultValues: {
      name: "",
      slug: "",
      shortDescription: "",

      price: undefined,
      currency: "₹",
      pricePrefix: "",
      priceSuffix: "",

      pricingType: "FIXED",
      billingPeriod: "ONE_TIME",

      features: [
        {
          value: "",
        },
      ] as unknown as string[],

      serviceId: "",

      ctaText: "Get Started",
      ctaLink: "/contact",

      isFeatured: false,
      featuredLabel: "",

      isPublished: false,
      displayOrder: 0,
    },
  });

  const [featureInputs, setFeatureInputs] =
    useState<string[]>([""]);

  const syncFeatures = (next: string[]) => {
    setFeatureInputs(next);
    setValue("features", next, {
      shouldDirty: true,
      shouldValidate: true,
    });
  };

  const addFeature = () => {
    syncFeatures([...featureInputs, ""]);
  };

  const updateFeature = (index: number, value: string) => {
    const next = [...featureInputs];
    next[index] = value;
    syncFeatures(next);
  };

  const removeFeature = (index: number) => {
    const next = featureInputs.filter(
      (_, itemIndex) => itemIndex !== index
    );

    syncFeatures(next.length > 0 ? next : [""]);
  };


  const pricingType = watch("pricingType");
  const isFeatured = watch("isFeatured");

  const name = watch("name");

  useEffect(() => {
    const currentSlug = watch("slug");

    if (!currentSlug || currentSlug === slugify(name)) {
      setValue("slug", slugify(name), {
        shouldDirty: true,
      });
    }
  }, [name, setValue, watch]);

  const submit = async (values: FormValues) => {
    setSaving(true);
    setServerError("");

    const finalValues: FormValues = {
      ...values,
      features: featureInputs,
    };

    const result = await createPricingPlan(finalValues);

    if (!result.success) {
      setServerError(
        result.error ??
          "Unable to create pricing plan."
      );

      setSaving(false);
      return;
    }

    router.push("/admin/dashboard");
    router.refresh();
  };

  return (
    <form
      onSubmit={handleSubmit(submit)}
      className="space-y-6 pb-12"
    >
      {/* BACK */}
      <button
        type="button"
        onClick={() => router.back()}
        className="inline-flex items-center gap-2 text-sm text-[#A1A1A1] transition hover:text-white"
      >
        <ChevronLeft size={16} />
        Back
      </button>

      {/* BASIC INFORMATION */}
      <section className="rounded-2xl border border-[#252525] bg-[#0D0D0D] p-5 sm:p-7">
        <div className="mb-6">
          <p className="text-xs uppercase tracking-[0.18em] text-[#FFC400]">
            01
          </p>

          <h2 className="mt-2 text-xl font-semibold">
            Plan information
          </h2>

          <p className="mt-1 text-sm text-[#777]">
            Define the public identity of this pricing plan.
          </p>
        </div>

        <div className="grid gap-5 md:grid-cols-2">
          <div>
            <label className={labelClass}>
              Plan name
            </label>

            <input
              {...register("name")}
              placeholder="e.g. Business Website"
              className={inputClass}
            />

            {errors.name && (
              <p className="mt-2 text-xs text-red-400">
                {errors.name.message}
              </p>
            )}
          </div>

          <div>
            <label className={labelClass}>
              Slug
            </label>

            <input
              {...register("slug")}
              placeholder="business-website"
              className={inputClass}
            />

            {errors.slug && (
              <p className="mt-2 text-xs text-red-400">
                {errors.slug.message}
              </p>
            )}
          </div>

          <div className="md:col-span-2">
            <label className={labelClass}>
              Short description
            </label>

            <textarea
              {...register("shortDescription")}
              rows={3}
              placeholder="A concise explanation of what this plan is designed for."
              className={textareaClass}
            />

            {errors.shortDescription && (
              <p className="mt-2 text-xs text-red-400">
                {errors.shortDescription.message}
              </p>
            )}
          </div>
        </div>
      </section>

      {/* PRICING */}
      <section className="rounded-2xl border border-[#252525] bg-[#0D0D0D] p-5 sm:p-7">
        <div className="mb-6">
          <p className="text-xs uppercase tracking-[0.18em] text-[#FFC400]">
            02
          </p>

          <h2 className="mt-2 text-xl font-semibold">
            Pricing
          </h2>

          <p className="mt-1 text-sm text-[#777]">
            Configure how this plan should display its price.
          </p>
        </div>

        <div className="grid gap-5 md:grid-cols-2">
          <div>
            <label className={labelClass}>
              Pricing type
            </label>

            <select
              {...register("pricingType")}
              className={selectClass}
            >
              <option value="FIXED">
                Fixed Price
              </option>

              <option value="STARTING_FROM">
                Starting From
              </option>

              <option value="CUSTOM">
                Custom Quote
              </option>
            </select>
          </div>

          <div>
            <label className={labelClass}>
              Billing period
            </label>

            <select
              {...register("billingPeriod")}
              className={selectClass}
            >
              <option value="ONE_TIME">
                One Time
              </option>

              <option value="MONTHLY">
                Monthly
              </option>

              <option value="YEARLY">
                Yearly
              </option>

              <option value="CUSTOM">
                Custom
              </option>

              <option value="NONE">
                None
              </option>
            </select>
          </div>

          {pricingType !== "CUSTOM" && (
            <div>
              <label className={labelClass}>
                Price
              </label>

              <input
                type="number"
                min="0"
                step="1"
                {...register("price", {
                  setValueAs: (value) =>
                    value === ""
                      ? undefined
                      : Number(value),
                })}
                placeholder="e.g. 25000"
                className={inputClass}
              />

              {errors.price && (
                <p className="mt-2 text-xs text-red-400">
                  {errors.price.message}
                </p>
              )}
            </div>
          )}

          <div>
            <label className={labelClass}>
              Currency
            </label>

            <input
              {...register("currency")}
              placeholder="₹"
              className={inputClass}
            />
          </div>

          <div>
            <label className={labelClass}>
              Price prefix
            </label>

            <input
              {...register("pricePrefix")}
              placeholder="e.g. From"
              className={inputClass}
            />
          </div>

          <div>
            <label className={labelClass}>
              Price suffix
            </label>

            <input
              {...register("priceSuffix")}
              placeholder="e.g. + GST"
              className={inputClass}
            />
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section className="rounded-2xl border border-[#252525] bg-[#0D0D0D] p-5 sm:p-7">
        <div className="mb-6 flex items-start justify-between gap-4">
          <div>
            <p className="text-xs uppercase tracking-[0.18em] text-[#FFC400]">
              03
            </p>

            <h2 className="mt-2 text-xl font-semibold">
              Features
            </h2>

            <p className="mt-1 text-sm text-[#777]">
              Add the benefits included in this pricing plan.
            </p>
          </div>

          <button
            type="button"
            onClick={addFeature}
            className="inline-flex shrink-0 items-center gap-2 rounded-xl border border-[#333] px-4 py-2.5 text-sm text-white transition hover:border-[#FFC400]/50 hover:text-[#FFC400]"
          >
            <Plus size={16} />
            Add feature
          </button>
        </div>

        <div className="space-y-3">
          {featureInputs.map((feature, index) => (
            <div
              key={`feature-${index}`}
              className="flex gap-3"
            >
              <div className="flex flex-1 items-center rounded-xl border border-[#292929] bg-[#101010] px-4">
                <Check
                  size={16}
                  className="mr-3 shrink-0 text-[#FFC400]"
                />

                <input
                  value={feature}
                  onChange={(event) =>
                    updateFeature(index, event.target.value)
                  }
                  placeholder={`Feature ${index + 1}`}
                  className="w-full bg-transparent py-3 text-sm text-white outline-none placeholder:text-[#666]"
                />
              </div>

              {featureInputs.length > 1 && (
                <button
                  type="button"
                  onClick={() => removeFeature(index)}
                  className="rounded-xl border border-[#292929] px-3 text-[#777] transition hover:border-red-500/40 hover:text-red-400"
                  aria-label="Remove feature"
                >
                  <Trash2 size={16} />
                </button>
              )}
            </div>
          ))}
        </div>

        {errors.features && (
          <p className="mt-3 text-xs text-red-400">
            {typeof errors.features.message === "string"
              ? errors.features.message
              : "Please add valid features."}
          </p>
        )}
      </section>

      {/* SERVICE */}
      <section className="rounded-2xl border border-[#252525] bg-[#0D0D0D] p-5 sm:p-7">
        <div className="mb-6">
          <p className="text-xs uppercase tracking-[0.18em] text-[#FFC400]">
            04
          </p>

          <h2 className="mt-2 text-xl font-semibold">
            Related service
          </h2>

          <p className="mt-1 text-sm text-[#777]">
            Optionally connect this pricing plan to an existing service.
          </p>
        </div>

        <div>
          <label className={labelClass}>
            Service
          </label>

          <select
            {...register("serviceId")}
            className={selectClass}
          >
            <option value="">
              No related service
            </option>

            {services.map((service) => (
              <option
                key={service._id}
                value={service._id}
              >
                {service.title}
              </option>
            ))}
          </select>

          {errors.serviceId && (
            <p className="mt-2 text-xs text-red-400">
              {errors.serviceId.message}
            </p>
          )}
        </div>
      </section>

      {/* CTA */}
      <section className="rounded-2xl border border-[#252525] bg-[#0D0D0D] p-5 sm:p-7">
        <div className="mb-6">
          <p className="text-xs uppercase tracking-[0.18em] text-[#FFC400]">
            05
          </p>

          <h2 className="mt-2 text-xl font-semibold">
            Call to action
          </h2>

          <p className="mt-1 text-sm text-[#777]">
            Define what visitors should do after viewing this plan.
          </p>
        </div>

        <div className="grid gap-5 md:grid-cols-2">
          <div>
            <label className={labelClass}>
              CTA text
            </label>

            <input
              {...register("ctaText")}
              placeholder="Get Started"
              className={inputClass}
            />

            {errors.ctaText && (
              <p className="mt-2 text-xs text-red-400">
                {errors.ctaText.message}
              </p>
            )}
          </div>

          <div>
            <label className={labelClass}>
              CTA link
            </label>

            <input
              {...register("ctaLink")}
              placeholder="/contact"
              className={inputClass}
            />

            {errors.ctaLink && (
              <p className="mt-2 text-xs text-red-400">
                {errors.ctaLink.message}
              </p>
            )}
          </div>
        </div>
      </section>

      {/* VISIBILITY */}
      <section className="rounded-2xl border border-[#252525] bg-[#0D0D0D] p-5 sm:p-7">
        <div className="mb-6">
          <p className="text-xs uppercase tracking-[0.18em] text-[#FFC400]">
            06
          </p>

          <h2 className="mt-2 text-xl font-semibold">
            Visibility & ordering
          </h2>

          <p className="mt-1 text-sm text-[#777]">
            Control how this plan behaves in the CMS.
          </p>
        </div>

        <div className="grid gap-5 md:grid-cols-2">
          <div>
            <label className={labelClass}>
              Display order
            </label>

            <input
              type="number"
              min="0"
              step="1"
              {...register("displayOrder", {
                setValueAs: (value) =>
                  value === ""
                    ? 0
                    : Number(value),
              })}
              className={inputClass}
            />

            {errors.displayOrder && (
              <p className="mt-2 text-xs text-red-400">
                {errors.displayOrder.message}
              </p>
            )}
          </div>

          <div className="flex flex-col justify-end gap-3">
            <label className="flex cursor-pointer items-center gap-3 rounded-xl border border-[#292929] bg-[#101010] p-4">
              <input
                type="checkbox"
                {...register("isFeatured")}
                className="h-4 w-4 accent-[#FFC400]"
              />

              <span>
                <span className="block text-sm font-medium">
                  Featured plan
                </span>

                <span className="mt-1 block text-xs text-[#777]">
                  Highlight this plan on the pricing section.
                </span>
              </span>
            </label>

            <label className="flex cursor-pointer items-center gap-3 rounded-xl border border-[#292929] bg-[#101010] p-4">
              <input
                type="checkbox"
                {...register("isPublished")}
                className="h-4 w-4 accent-[#FFC400]"
              />

              <span>
                <span className="block text-sm font-medium">
                  Publish immediately
                </span>

                <span className="mt-1 block text-xs text-[#777]">
                  Make this plan available to the public website.
                </span>
              </span>
            </label>
          </div>

          {isFeatured && (
            <div className="md:col-span-2">
              <label className={labelClass}>
                Featured label
              </label>

              <input
                {...register("featuredLabel")}
                placeholder="Most Popular"
                className={inputClass}
              />

              {errors.featuredLabel && (
                <p className="mt-2 text-xs text-red-400">
                  {errors.featuredLabel.message}
                </p>
              )}
            </div>
          )}
        </div>
      </section>

      {/* SERVER ERROR */}
      {serverError && (
        <div className="rounded-xl border border-red-500/20 bg-red-500/5 px-4 py-3 text-sm text-red-400">
          {serverError}
        </div>
      )}

      {/* ACTIONS */}
      <div className="flex flex-col-reverse gap-3 border-t border-[#252525] pt-6 sm:flex-row sm:justify-end">
        <button
          type="button"
          onClick={() => router.back()}
          disabled={saving}
          className="rounded-xl border border-[#292929] px-5 py-3 text-sm font-medium text-[#A1A1A1] transition hover:border-[#444] hover:text-white disabled:cursor-not-allowed disabled:opacity-50"
        >
          Cancel
        </button>

        <button
          type="submit"
          disabled={saving}
          className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#FFC400] px-6 py-3 text-sm font-semibold text-black transition hover:bg-[#FFD43B] disabled:cursor-not-allowed disabled:opacity-50"
        >
          {saving ? (
            "Creating..."
          ) : (
            <>
              <Check size={17} />
              Create pricing plan
            </>
          )}
        </button>
      </div>
    </form>
  );
}