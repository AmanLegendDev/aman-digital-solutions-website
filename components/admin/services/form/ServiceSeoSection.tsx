"use client";

import {
  Search,
  Share2,
  X,
  Plus,
} from "lucide-react";
import { useEffect, useState } from "react";
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

function getSiteUrl(): string {
  const siteUrl =
    process.env.NEXT_PUBLIC_SITE_URL?.trim();

  if (!siteUrl) {
    return "";
  }

  return siteUrl.replace(/\/+$/, "");
}

export default function ServiceSeoSection({
  form,
  errors,
}: Props) {
  const {
    register,
    watch,
    setValue,
  } = form;

  const slug = watch("slug") ?? "";

  const seoTitle = watch("seoTitle") ?? "";

  const seoDescription =
    watch("seoDescription") ?? "";

  const canonical =
    watch("canonicalUrl") ?? "";

  const ogTitle = watch("ogTitle") ?? "";

  const ogDescription =
    watch("ogDescription") ?? "";

  const keywords = watch("keywords") ?? [];

  const [keywordInput, setKeywordInput] =
    useState("");

  /*
   * --------------------------------------------------
   * AUTO-GENERATE CANONICAL URL
   * --------------------------------------------------
   *
   * Canonical URL is always derived from the
   * current service slug.
   */

  useEffect(() => {
    if (!slug) {
      setValue("canonicalUrl", "", {
        shouldDirty: false,
        shouldValidate: false,
      });

      return;
    }

    /*
     * Use the configured production URL when available.
     * Fall back to the current browser origin during
     * local development.
     */

    const configuredSiteUrl = getSiteUrl();

    const origin =
      configuredSiteUrl ||
      window.location.origin;

    const generatedCanonical =
      `${origin}/services/${slug}`;

    setValue(
      "canonicalUrl",
      generatedCanonical,
      {
        shouldDirty: true,
        shouldValidate: true,
      }
    );
  }, [slug, setValue]);

  /*
   * --------------------------------------------------
   * KEYWORDS
   * --------------------------------------------------
   */

  const addKeyword = () => {
    const keyword = keywordInput.trim();

    if (!keyword) {
      return;
    }

    if (keyword.length > 100) {
      return;
    }

    const alreadyExists = keywords.some(
      (item) =>
        item.toLowerCase() ===
        keyword.toLowerCase()
    );

    if (alreadyExists) {
      setKeywordInput("");
      return;
    }

    setValue(
      "keywords",
      [...keywords, keyword],
      {
        shouldDirty: true,
        shouldValidate: true,
      }
    );

    setKeywordInput("");
  };

  const removeKeyword = (
    keywordToRemove: string
  ) => {
    setValue(
      "keywords",
      keywords.filter(
        (keyword) =>
          keyword !== keywordToRemove
      ),
      {
        shouldDirty: true,
        shouldValidate: true,
      }
    );
  };

  const handleKeywordKeyDown = (
    event: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (
      event.key === "Enter" ||
      event.key === ","
    ) {
      event.preventDefault();
      addKeyword();
    }

    if (
      event.key === "Backspace" &&
      keywordInput === "" &&
      keywords.length > 0
    ) {
      removeKeyword(
        keywords[keywords.length - 1]
      );
    }
  };

  return (
    <ServiceFormSection
      number="09"
      title="SEO & social metadata"
      description="Optimize how this service appears in search engines, shared links and social previews."
    >
      <div className="space-y-8">
        {/* SEARCH ENGINE */}

        <div>
          <div className="mb-5 flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl border border-[#FFC400]/20 bg-[#FFC400]/[0.06] text-[#FFC400]">
              <Search size={16} />
            </div>

            <div>
              <h3 className="text-sm font-medium text-white">
                Search engine metadata
              </h3>

              <p className="mt-0.5 text-[11px] text-neutral-600">
                Control the title, description and
                keywords search engines can associate
                with this service.
              </p>
            </div>
          </div>

          {/* SEO TITLE */}

          <div>
            <label
              htmlFor="seo-title"
              className="mb-2 block text-xs font-medium text-neutral-300"
            >
              SEO title
            </label>

            <input
              id="seo-title"
              {...register("seoTitle")}
              maxLength={70}
              placeholder="Professional Website Development Services"
              className={inputClass}
            />

            <div className="mt-2 flex justify-between gap-3">
              <p className="text-[11px] text-neutral-700">
                Keep it concise and relevant to the
                actual service.
              </p>

              <span className="shrink-0 text-[10px] text-neutral-700">
                {seoTitle.length}/70
              </span>
            </div>

            {errors.seoTitle && (
              <p className="mt-2 text-xs text-red-400">
                {errors.seoTitle.message}
              </p>
            )}
          </div>

          {/* SEO DESCRIPTION */}

          <div className="mt-5">
            <label
              htmlFor="seo-description"
              className="mb-2 block text-xs font-medium text-neutral-300"
            >
              SEO description
            </label>

            <textarea
              id="seo-description"
              {...register("seoDescription")}
              rows={4}
              maxLength={160}
              placeholder="Get fast, modern and SEO-ready websites designed to help your business build credibility and generate more customers."
              className={`${inputClass} resize-y leading-6`}
            />

            <div className="mt-2 flex justify-between gap-3">
              <p className="text-[11px] text-neutral-700">
                Write for humans first. Avoid keyword
                stuffing.
              </p>

              <span className="shrink-0 text-[10px] text-neutral-700">
                {seoDescription.length}/160
              </span>
            </div>

            {errors.seoDescription && (
              <p className="mt-2 text-xs text-red-400">
                {errors.seoDescription.message}
              </p>
            )}
          </div>

          {/* KEYWORDS */}

          <div className="mt-5">
            <label
              htmlFor="service-keywords"
              className="mb-2 block text-xs font-medium text-neutral-300"
            >
              Target keywords
              <span className="ml-1 text-neutral-700">
                optional
              </span>
            </label>

            <div className="rounded-xl border border-[#262626] bg-[#090909] p-3 focus-within:border-[#FFC400]/50 focus-within:ring-1 focus-within:ring-[#FFC400]/20">
              {keywords.length > 0 && (
                <div className="mb-3 flex flex-wrap gap-2">
                  {keywords.map((keyword) => (
                    <span
                      key={keyword}
                      className="inline-flex items-center gap-1.5 rounded-lg border border-[#333333] bg-[#111111] px-2.5 py-1.5 text-[11px] text-neutral-300"
                    >
                      {keyword}

                      <button
                        type="button"
                        onClick={() =>
                          removeKeyword(keyword)
                        }
                        className="text-neutral-600 transition hover:text-red-400"
                        aria-label={`Remove keyword ${keyword}`}
                      >
                        <X size={12} />
                      </button>
                    </span>
                  ))}
                </div>
              )}

              <div className="flex items-center gap-2">
                <input
                  id="service-keywords"
                  value={keywordInput}
                  onChange={(event) =>
                    setKeywordInput(
                      event.target.value
                    )
                  }
                  onKeyDown={
                    handleKeywordKeyDown
                  }
                  placeholder="e.g. website development"
                  maxLength={100}
                  className="min-w-0 flex-1 bg-transparent px-1 py-2 text-sm text-white outline-none placeholder:text-neutral-700"
                />

                <button
                  type="button"
                  onClick={addKeyword}
                  disabled={
                    !keywordInput.trim()
                  }
                  className="flex shrink-0 items-center gap-1.5 rounded-lg border border-[#292929] bg-[#111111] px-3 py-2 text-[11px] font-medium text-neutral-400 transition hover:border-[#3A3A3A] hover:text-white disabled:cursor-not-allowed disabled:opacity-40"
                >
                  <Plus size={13} />
                  Add
                </button>
              </div>
            </div>

            <p className="mt-2 text-[11px] leading-5 text-neutral-700">
              Press Enter or comma to add a keyword.
              Use specific phrases that match the service
              and your target customers.
            </p>

            {errors.keywords && (
              <p className="mt-2 text-xs text-red-400">
                {typeof errors.keywords.message ===
                "string"
                  ? errors.keywords.message
                  : "Please check your keywords."}
              </p>
            )}
          </div>

          {/* CANONICAL */}

          <div className="mt-5">
            <label
              htmlFor="canonical-url"
              className="mb-2 block text-xs font-medium text-neutral-300"
            >
              Canonical URL

              <span className="ml-2 rounded-md border border-[#262626] bg-[#0D0D0D] px-2 py-0.5 text-[9px] uppercase tracking-wide text-neutral-600">
                Auto
              </span>
            </label>

            <input
              id="canonical-url"
              type="url"
              {...register("canonicalUrl")}
              readOnly
              maxLength={500}
              placeholder="Generated automatically from the service slug"
              className={`${inputClass} cursor-not-allowed text-neutral-400`}
            />

            <p className="mt-2 text-[11px] leading-5 text-neutral-700">
              Automatically generated from the service
              slug. This keeps the canonical URL consistent
              with the public service page.
            </p>

            {errors.canonicalUrl && (
              <p className="mt-2 text-xs text-red-400">
                {errors.canonicalUrl.message}
              </p>
            )}
          </div>
        </div>

        {/* DIVIDER */}

        <div className="h-px bg-[#1D1D1D]" />

        {/* SOCIAL */}

        <div>
          <div className="mb-5 flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl border border-[#242424] bg-[#0D0D0D] text-neutral-500">
              <Share2 size={15} />
            </div>

            <div>
              <h3 className="text-sm font-medium text-white">
                Social sharing metadata
              </h3>

              <p className="mt-0.5 text-[11px] text-neutral-600">
                Customize the title and description shown
                when this service is shared.
              </p>
            </div>
          </div>

          {/* OG TITLE */}

          <div>
            <label
              htmlFor="og-title"
              className="mb-2 block text-xs font-medium text-neutral-300"
            >
              Social title
            </label>

            <input
              id="og-title"
              {...register("ogTitle")}
              maxLength={120}
              placeholder="Aman Digital Solutions — Website Development"
              className={inputClass}
            />

            <div className="mt-2 text-right text-[10px] text-neutral-700">
              {ogTitle.length}/120
            </div>

            {errors.ogTitle && (
              <p className="mt-2 text-xs text-red-400">
                {errors.ogTitle.message}
              </p>
            )}
          </div>

          {/* OG DESCRIPTION */}

          <div className="mt-5">
            <label
              htmlFor="og-description"
              className="mb-2 block text-xs font-medium text-neutral-300"
            >
              Social description
            </label>

            <textarea
              id="og-description"
              {...register("ogDescription")}
              rows={4}
              maxLength={200}
              placeholder="Modern, high-performance websites built around your business goals."
              className={`${inputClass} resize-y leading-6`}
            />

            <div className="mt-2 text-right text-[10px] text-neutral-700">
              {ogDescription.length}/200
            </div>

            {errors.ogDescription && (
              <p className="mt-2 text-xs text-red-400">
                {errors.ogDescription.message}
              </p>
            )}
          </div>
        </div>

        {/* PREVIEW */}

        <div className="rounded-2xl border border-[#222222] bg-[#090909] p-5">
          <p className="mb-4 text-[9px] font-medium uppercase tracking-[0.16em] text-neutral-600">
            Search preview
          </p>

          <div className="max-w-2xl">
            <p className="truncate text-base font-medium text-[#4FA3FF]">
              {seoTitle ||
                "Your service SEO title will appear here"}
            </p>

            <p className="truncate text-[11px] text-[#55A55A]">
              {canonical ||
                "https://yourdomain.com/services/service-name"}
            </p>

            <p className="mt-2 line-clamp-2 text-xs leading-5 text-neutral-500">
              {seoDescription ||
                "Your service SEO description will appear here."}
            </p>
          </div>
        </div>
      </div>
    </ServiceFormSection>
  );
}