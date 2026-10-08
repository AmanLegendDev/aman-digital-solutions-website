"use client";

import CloudinaryImageUploader from "@/components/admin/media/CloudinaryImageUploader";

import {
  FieldError,
  ImageAltField,
  Section,
  inputClass,
  labelClass,
  selectClass,
  textareaClass,
} from "./OfferFormUI";

import type { CommonSectionProps } from "./OfferFormUI";
import type {
  FormValues,
  ImageValue,
} from "./OfferForm.types";

/* =========================================================
   TYPES
========================================================= */

type ServiceOption = {
  _id: string;
  title: string;
  slug: string;
  shortDescription: string;
};

type Props = CommonSectionProps & {
  discountType: FormValues["discountType"];

  slug: string;

  setSlugManuallyEdited: (
    value: boolean,
  ) => void;

  services: ServiceOption[];

  heroImage?: ImageValue;
  cardImage?: ImageValue;
  ogImage?: ImageValue;

  updateHeroImage: (
    value: ImageValue | null | undefined,
  ) => void;

  updateCardImage: (
    value: ImageValue | null | undefined,
  ) => void;

  updateOgImage: (
    value: ImageValue | null | undefined,
  ) => void;
};

/* =========================================================
   COMPONENT
========================================================= */

export default function OfferDetailsSection(
  props: Props,
) {
  const {
    register,
    errors,
    discountType,
    slug,
    setSlugManuallyEdited,
    services,

    heroImage,
    cardImage,
    ogImage,

    updateHeroImage,
    updateCardImage,
    updateOgImage,
  } = props;

  return (
    <Section
      number="01"
      title="Offer & pricing"
      description="Define the offer, commercial value and visuals customers will see."
    >
      <div className="space-y-8">

        {/* =====================================================
            OFFER DETAILS
        ===================================================== */}

        <div className="space-y-5">
          <div>
            <h3 className="text-base font-semibold text-white">
              Offer details
            </h3>

            <p className="mt-1 text-sm text-white/35">
              Define the core identity and customer-facing
              content of the offer.
            </p>
          </div>

          <div className="grid gap-5">

            {/* TITLE */}

            <div>
              <label className={labelClass}>
                Offer title *
              </label>

              <input
                {...register("title")}
                placeholder="e.g. Diwali Website Launch Offer"
                className={inputClass}
              />

              <FieldError
                message={errors.title?.message}
              />
            </div>

            {/* SLUG */}

            <div>
              <label className={labelClass}>
                Slug *
              </label>

              <input
                {...register("slug", {
                  onChange: () =>
                    setSlugManuallyEdited(true),
                })}
                placeholder="diwali-website-launch-offer"
                className={inputClass}
              />

              {slug && (
                <p className="mt-2 text-xs text-[#FFC400]/70">
                  /offers/{slug}
                </p>
              )}

              <FieldError
                message={errors.slug?.message}
              />
            </div>

            {/* BADGE */}

            <div>
              <label className={labelClass}>
                Badge
              </label>

              <input
                {...register("badge")}
                placeholder="Limited Time"
                className={inputClass}
              />

              <FieldError
                message={errors.badge?.message}
              />
            </div>

            {/* SHORT DESCRIPTION */}

            <div>
              <label className={labelClass}>
                Short description *
              </label>

              <textarea
                {...register("shortDescription")}
                rows={3}
                placeholder="A concise description shown on cards and previews."
                className={textareaClass}
              />

              <FieldError
                message={
                  errors.shortDescription?.message
                }
              />
            </div>

            {/* DESCRIPTION */}

            <div>
              <label className={labelClass}>
                Full description *
              </label>

              <textarea
                {...register("description")}
                rows={10}
                placeholder="Explain the offer, who it is for, what is included and why it matters."
                className={textareaClass}
              />

              <FieldError
                message={
                  errors.description?.message
                }
              />
            </div>

            {/* TYPES */}

            <div className="grid gap-5 md:grid-cols-2">

              <div>
                <label className={labelClass}>
                  Offer type *
                </label>

                <select
                  {...register("offerType")}
                  className={selectClass}
                >
                  <option value="discount">
                    Discount
                  </option>

                  <option value="seasonal">
                    Seasonal
                  </option>

                  <option value="limited-time">
                    Limited Time
                  </option>

                  <option value="bundle">
                    Bundle
                  </option>

                  <option value="custom">
                    Custom
                  </option>
                </select>
              </div>

              <div>
                <label className={labelClass}>
                  Discount type *
                </label>

                <select
                  {...register("discountType")}
                  className={selectClass}
                >
                  <option value="none">
                    No discount
                  </option>

                  <option value="percentage">
                    Percentage
                  </option>

                  <option value="fixed">
                    Fixed amount
                  </option>
                </select>
              </div>

            </div>
          </div>
        </div>

        {/* =====================================================
            PRICING & DISCOUNT
        ===================================================== */}

        <div className="space-y-5 border-t border-[#252525] pt-8">
          <div>
            <h3 className="text-base font-semibold text-white">
              Pricing & discount
            </h3>

            <p className="mt-1 text-sm text-white/35">
              Add the commercial value customers should see
              when this offer is active.
            </p>
          </div>

          <div className="grid gap-5 md:grid-cols-2">

            {/* DISCOUNT VALUE */}

            {discountType !== "none" && (
              <div>
                <label className={labelClass}>
                  Discount value
                </label>

                <input
                  type="number"
                  min="0"
                  step="0.01"
                  {...register("discountValue")}
                  placeholder={
                    discountType === "percentage"
                      ? "e.g. 20"
                      : "e.g. 5000"
                  }
                  className={inputClass}
                />

                <FieldError
                  message={
                    errors.discountValue?.message
                  }
                />
              </div>
            )}

            {/* DISCOUNT LABEL */}

            <div>
              <label className={labelClass}>
                Discount label
              </label>

              <input
                {...register("discountLabel")}
                placeholder="e.g. 20% OFF"
                className={inputClass}
              />

              <FieldError
                message={
                  errors.discountLabel?.message
                }
              />
            </div>

            {/* ORIGINAL PRICE */}

            <div>
              <label className={labelClass}>
                Original price
              </label>

              <input
                type="number"
                min="0"
                step="0.01"
                {...register("originalPrice")}
                placeholder="e.g. 25000"
                className={inputClass}
              />

              <FieldError
                message={
                  errors.originalPrice?.message
                }
              />
            </div>

            {/* OFFER PRICE */}

            <div>
              <label className={labelClass}>
                Offer price
              </label>

              <input
                type="number"
                min="0"
                step="0.01"
                {...register("offerPrice")}
                placeholder="e.g. 19999"
                className={inputClass}
              />

              <FieldError
                message={
                  errors.offerPrice?.message
                }
              />
            </div>

            {/* COUPON CODE */}

            <div className="md:col-span-2">
              <label className={labelClass}>
                Coupon code
              </label>

              <input
                {...register("couponCode")}
                placeholder="e.g. DIWALI2026"
                className={inputClass}
              />

              <FieldError
                message={
                  errors.couponCode?.message
                }
              />
            </div>

            {/* =================================================
                RELATED SERVICE
            ================================================= */}

            <div className="md:col-span-2">
              <label className={labelClass}>
                Related service
              </label>

              <select
                {...register("serviceId")}
                className={selectClass}
              >
                <option value="">
                  No specific service
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

              <p className="mt-2 text-xs leading-5 text-white/30">
                Connect this offer to a service so the
                project enquiry can be prefilled with the
                correct service.
              </p>

              <FieldError
                message={
                  errors.serviceId?.message
                }
              />
            </div>

          </div>
        </div>

        {/* =====================================================
            OFFER VISUALS
        ===================================================== */}

        <div className="space-y-5 border-t border-[#252525] pt-8">
          <div>
            <h3 className="text-base font-semibold text-white">
              Offer visuals
            </h3>

            <p className="mt-1 text-sm text-white/35">
              Add the images used on the offer page, cards
              and social sharing.
            </p>
          </div>

          <div className="grid gap-8">

            {/* HERO */}

            <div>
              <CloudinaryImageUploader
                label="Hero image"
                description="Main image for the offer page · JPG, PNG, WebP or AVIF · Maximum 5MB"
                value={heroImage}
                onChange={updateHeroImage}
              />

              <ImageAltField
                value={heroImage?.alt}
                onChange={(value) => {
                  if (!heroImage) return;

                  updateHeroImage({
                    ...heroImage,
                    alt: value,
                  });
                }}
                error={
                  errors.heroImage?.alt?.message
                }
              />
            </div>

            {/* CARD */}

            <div>
              <CloudinaryImageUploader
                label="Card image"
                description="Image for offer cards and listings."
                value={cardImage}
                onChange={updateCardImage}
              />

              <ImageAltField
                value={cardImage?.alt}
                onChange={(value) => {
                  if (!cardImage) return;

                  updateCardImage({
                    ...cardImage,
                    alt: value,
                  });
                }}
                error={
                  errors.cardImage?.alt?.message
                }
              />
            </div>

            {/* OG */}

            <div>
              <CloudinaryImageUploader
                label="Open Graph image"
                description="Social sharing image for Facebook, WhatsApp, LinkedIn and other previews."
                value={ogImage}
                onChange={updateOgImage}
              />

              <ImageAltField
                value={ogImage?.alt}
                onChange={(value) => {
                  if (!ogImage) return;

                  updateOgImage({
                    ...ogImage,
                    alt: value,
                  });
                }}
                error={
                  errors.ogImage?.alt?.message
                }
              />
            </div>

          </div>
        </div>

      </div>
    </Section>
  );
}