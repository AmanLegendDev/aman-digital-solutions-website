"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  offerSchema,
  type OfferInput,
} from "@/schemas/offer.schema";

import { createOffer } from "@/actions/offer.actions";



import type {
  FormValues,
  ImageValue,
} from "./OfferForm.types";

import OfferDetailsSection from "./OfferDetailsSection";
import OfferContentSection from "./OfferContentSection";
import OfferPublishingSection from "./OfferPublishingSection";

/* =========================================================
   CONSTANTS
========================================================= */

const SITE_URL =
  "https://www.amandigitalsolutions.com";

/* =========================================================
   HELPERS
========================================================= */

function slugify(value?: string | null) {
  const normalized = (value ?? "")
    .toString()
    .toLowerCase()
    .trim();

  return normalized
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

/* =========================================================
   COMPONENT
========================================================= */

type ServiceOption = {
  _id: string;
  title: string;
  slug: string;
  shortDescription: string;
};

export default function OfferCreateForm({
  services,
}: {
  services: ServiceOption[];
}) {
  const router = useRouter();

  /* =======================================================
     UI STATE
  ======================================================= */

  const [serverError, setServerError] =
    useState("");

  const [saving, setSaving] =
    useState(false);

  /* =======================================================
     SLUG STATE
  ======================================================= */

  const [
    slugManuallyEdited,
    setSlugManuallyEdited,
  ] = useState(false);

  /* =======================================================
     HIGHLIGHTS
  ======================================================= */

  const [
    highlights,
    setHighlights,
  ] = useState<string[]>([""]);

  /* =======================================================
     INCLUDED FEATURES
  ======================================================= */

  const [
    includedFeatures,
    setIncludedFeatures,
  ] = useState<string[]>([""]);

  /* =======================================================
     FORM
  ======================================================= */

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: {
      errors,
    },
  } = useForm<FormValues>({
    resolver:
      zodResolver(
        offerSchema,
      ) as never,

    defaultValues: {
      title: "",
      slug: "",
      badge: "",

      shortDescription: "",
      description: "",

      offerType: "limited-time",
      discountType: "none",

      discountValue: undefined,
      originalPrice: undefined,
      offerPrice: undefined,

      discountLabel: "",
      couponCode: "",
      serviceId: "",

      heroImage: undefined,
      cardImage: undefined,

      highlights: [],
      includedFeatures: [],

      ctaLabel: "Start a Project",
      ctaLink: "/start-a-project",

      secondaryCtaLabel: "",
      secondaryCtaLink: "",

      termsAndConditions: "",

  startDate: "",
endDate: "",

isClaimLimitEnabled: false,
claimLimit: undefined,
claimedCount: 0,

published: false,
featured: false,
displayOrder: 0,
      seoTitle: "",
      seoDescription: "",
      canonicalUrl: "",

      ogTitle: "",
      ogDescription: "",
      ogImage: undefined,
    },
  });

  

  /* =======================================================
     WATCH
  ======================================================= */

  const title = watch("title");

  const slug = watch("slug");

  const discountType =
    watch("discountType");

  const published =
    watch("published");

  const heroImage =
    watch("heroImage");

 const isClaimLimitEnabled =
  watch("isClaimLimitEnabled");

const claimedCount =
  watch("claimedCount") as number;

const claimLimit =
  watch("claimLimit") as
    | number
    | undefined;

  const cardImage =
    watch("cardImage");

  const ogImage =
    watch("ogImage");

  /* =======================================================
     AUTO SLUG
  ======================================================= */

  useEffect(() => {
    if (slugManuallyEdited) {
      return;
    }

    setValue(
      "slug",
      slugify(title),
      {
        shouldDirty: true,
        shouldValidate: true,
      },
    );
  }, [
    title,
    slugManuallyEdited,
    setValue,
  ]);

  /* =======================================================
     AUTO CANONICAL
  ======================================================= */

  useEffect(() => {
    if (!slug) {
      setValue(
        "canonicalUrl",
        "",
        {
          shouldValidate: true,
        },
      );

      return;
    }

    setValue(
      "canonicalUrl",
      `${SITE_URL}/offers/${slug}`,
      {
        shouldValidate: true,
      },
    );
  }, [
    slug,
    setValue,
  ]);

  /* =======================================================
     HIGHLIGHT HELPERS
  ======================================================= */

  function updateHighlight(
    index: number,
    value: string,
  ) {
    setHighlights((current) => {
      const next = [...current];

      next[index] = value;

      return next;
    });
  }

  function appendHighlight() {
    setHighlights((current) => [
      ...current,
      "",
    ]);
  }

  function removeHighlight(
    index: number,
  ) {
    setHighlights((current) => {
      if (current.length <= 1) {
        return [""];
      }

      return current.filter(
        (_, itemIndex) =>
          itemIndex !== index,
      );
    });
  }

  /* =======================================================
     FEATURE HELPERS
  ======================================================= */

  function updateFeature(
    index: number,
    value: string,
  ) {
    setIncludedFeatures((current) => {
      const next = [...current];

      next[index] = value;

      return next;
    });
  }

  function appendFeature() {
    setIncludedFeatures((current) => [
      ...current,
      "",
    ]);
  }

  function removeFeature(
    index: number,
  ) {
    setIncludedFeatures((current) => {
      if (current.length <= 1) {
        return [""];
      }

      return current.filter(
        (_, itemIndex) =>
          itemIndex !== index,
      );
    });
  }

  /* =======================================================
     IMAGE HELPERS
  ======================================================= */

  function normalizeImageValue(
    value:
      | {
          url: string;
          publicId?: string | null;
          alt?: string | null;
        }
      | null
      | undefined,
  ): ImageValue | undefined {
    if (!value) {
      return undefined;
    }

    return {
      url: value.url,
      ...(value.publicId != null
        ? { publicId: value.publicId }
        : {}),
      ...(value.alt != null
        ? { alt: value.alt }
        : {}),
    };
  }

  function updateHeroImage(
    value:
      | ImageValue
      | null
      | undefined,
  ) {
    setValue(
      "heroImage",
      value ?? undefined,
      {
        shouldDirty: true,
        shouldValidate: true,
      },
    );
  }

  function updateCardImage(
    value:
      | ImageValue
      | null
      | undefined,
  ) {
    setValue(
      "cardImage",
      value ?? undefined,
      {
        shouldDirty: true,
        shouldValidate: true,
      },
    );
  }

  function updateOgImage(
    value:
      | ImageValue
      | null
      | undefined,
  ) {
    setValue(
      "ogImage",
      value ?? undefined,
      {
        shouldDirty: true,
        shouldValidate: true,
      },
    );
  }

  /* =======================================================
     SUBMIT
  ======================================================= */

  const submit = async (
    values: FormValues,
  ) => {
    setSaving(true);
    setServerError("");

    try {
      /* ---------------------------------------------------
         BUILD FINAL FORM DATA
      --------------------------------------------------- */

      const rawValues = {
        ...values,

        highlights: highlights
          .map((item) =>
            item.trim(),
          )
          .filter(Boolean),

        includedFeatures:
          includedFeatures
            .map((item) =>
              item.trim(),
            )
            .filter(Boolean),
      };

      /* ---------------------------------------------------
         FINAL ZOD VALIDATION
      --------------------------------------------------- */

      const parsed =
        offerSchema.safeParse(
          rawValues,
        );

      if (!parsed.success) {
        const firstError =
          parsed.error.issues[0];

        setServerError(
          firstError?.message ??
            "Please fix the highlighted fields.",
        );

        setSaving(false);

        return;
      }

      /* ---------------------------------------------------
         CREATE OFFER
      --------------------------------------------------- */

      const result =
        await createOffer(
          parsed.data as OfferInput,
        );

      if (!result.success) {
        setServerError(
          result.error,
        );

        setSaving(false);

        return;
      }

      /* ---------------------------------------------------
         SUCCESS
      --------------------------------------------------- */

      router.push(
        "/admin/offers",
      );

      router.refresh();
    } catch (error) {
      console.error(
        "Offer form submit error:",
        error,
      );

      setServerError(
        "Something went wrong while creating the offer.",
      );

      setSaving(false);
    }
  };

  /* =======================================================
     RENDER
  ======================================================= */

  return (
    <form
      onSubmit={handleSubmit(submit)}
      className="space-y-5 pb-10"
    >
      {/* SERVER ERROR */}

      {serverError && (
        <div className="rounded-xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-300">
          {serverError}
        </div>
      )}

      {/* =================================================
          SECTION 01
      ================================================= */}

<OfferDetailsSection
  register={register}
  errors={errors}
  setValue={setValue}
  discountType={discountType}
  slug={slug}
  setSlugManuallyEdited={
    setSlugManuallyEdited
  }
  services={services}
  heroImage={normalizeImageValue(heroImage)}
  cardImage={normalizeImageValue(cardImage)}
  ogImage={normalizeImageValue(ogImage)}
  updateHeroImage={updateHeroImage}
  updateCardImage={updateCardImage}
  updateOgImage={updateOgImage}
/>

      {/* =================================================
          SECTION 02
      ================================================= */}

      <OfferContentSection
        register={register}
        errors={errors}
        setValue={setValue}

        highlights={highlights}
        includedFeatures={
          includedFeatures
        }

        updateHighlight={
          updateHighlight
        }

        appendHighlight={
          appendHighlight
        }

        removeHighlight={
          removeHighlight
        }

        updateFeature={
          updateFeature
        }

        appendFeature={
          appendFeature
        }

        removeFeature={
          removeFeature
        }
      />

      {/* =================================================
          SECTION 03
      ================================================= */}

   <OfferPublishingSection
  register={register}
  errors={errors}
  setValue={setValue}
  published={published}
  isClaimLimitEnabled={isClaimLimitEnabled}
  claimedCount={claimedCount}
  claimLimit={claimLimit}
/>

      {/* =================================================
          ACTIONS
      ================================================= */}

      <div className="flex flex-col gap-3 border-t border-[#252525] pt-6 sm:flex-row sm:items-center sm:justify-end">
        {/* CANCEL */}

        <button
          type="button"
          onClick={() =>
            router.push(
              "/admin/offers",
            )
          }
          disabled={saving}
          className="rounded-xl border border-[#333] px-5 py-3 text-sm font-medium text-white/70 transition hover:border-white/20 hover:text-white disabled:opacity-50"
        >
          Cancel
        </button>

        {/* CREATE */}

        <button
          type="submit"
          disabled={saving}
          className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#FFC400] px-6 py-3 text-sm font-semibold text-black transition hover:bg-[#FFD633] disabled:cursor-not-allowed disabled:opacity-60"
        >
          {saving ? (
            <>
              <span
                aria-hidden="true"
                className="h-4 w-4 animate-spin rounded-full border-2 border-black/25 border-t-black"
              />

              Creating Offer...
            </>
          ) : (
            <>
              Create Offer
            </>
          )}
        </button>
      </div>
    </form>
  );
}