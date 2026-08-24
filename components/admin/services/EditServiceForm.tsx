"use client";

import { zodResolver } from "@hookform/resolvers/zod";

import {
  AlertCircle,
  Check,
  Loader2,
  Save,
} from "lucide-react";

import { useRouter } from "next/navigation";

import { useState } from "react";

import {
  type FieldErrors,
  type SubmitHandler,
  useForm,
} from "react-hook-form";

import {
  serviceSchema,
  type CreateServiceInput,
} from "@/schemas/service.schema";

import ServiceBasicSection from "./form/ServiceBasicSection";
import ServiceImageSection from "./form/ServiceImageSection";
import ServiceBenefitsSection from "./form/ServiceBenefitsSection";
import ServiceFeaturesSection from "./form/ServiceFeaturesSection";
import ServiceProcessSection from "./form/ServiceProcessSection";
import ServicePricingSection from "./form/ServicePricingSection";
import ServiceCtaSection from "./form/ServiceCtaSection";
import ServiceRelationsSection from "./form/ServiceRelationsSection";
import ServicePublishingSection from "./form/ServicePublishingSection";
import ServiceSeoSection from "./form/ServiceSeoSection";

/* =========================================================
   TYPES
========================================================= */

type RelationOption = {
  id: string;
  title: string;
};

type Props = {
  serviceId: string;

  initialData: CreateServiceInput;

  faqs: RelationOption[];

  projects: RelationOption[];
};

/* =========================================================
   SERVER ERRORS
========================================================= */

type ServerFieldErrors =
  Record<string, string[]>;

/* =========================================================
   COMPONENT
========================================================= */

export default function EditServiceForm({
  serviceId,
  initialData,
  faqs,
  projects,
}: Props) {
  const router = useRouter();

  const [serverError, setServerError] =
    useState<string | null>(null);

  const [successMessage, setSuccessMessage] =
    useState<string | null>(null);

  /* =======================================================
     FORM
  ======================================================= */

  const form =
    useForm<CreateServiceInput>({
      resolver: zodResolver(
        serviceSchema
      ) as never,

      defaultValues: initialData,

      mode: "onBlur",

      shouldFocusError: true,

      shouldUnregister: false,
    });

  const {
    handleSubmit,
    formState: {
      errors,
      isSubmitting,
      isDirty,
    },
    setError,
  } = form;

  /* =======================================================
     FIRST ERROR SCROLL
  ======================================================= */

  const scrollToFirstError =
    () => {
      const firstError =
        Object.keys(errors)[0];

      if (!firstError) {
        return;
      }

      const element =
        document.querySelector(
          `[name="${firstError}"]`
        );

      element?.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    };

  /* =======================================================
     SUBMIT
  ======================================================= */

  const onSubmit: SubmitHandler<
    CreateServiceInput
  > = async (values) => {
    setServerError(null);

    setSuccessMessage(null);

    /*
      NEXT STEP:
      updateService action
    */

    const response =
      await fetch(
        `/api/admin/services/${serviceId}`,
        {
          method: "PATCH",

          headers: {
            "Content-Type":
              "application/json",
          },

          body: JSON.stringify(values),
        }
      );

    const result =
      await response.json();

    /* =====================================================
       SERVER ERROR
    ===================================================== */

    if (!response.ok || !result.success) {
      setServerError(
        result.error ||
          "Unable to update service."
      );

      if (result.fieldErrors) {
        const fieldErrors =
          result.fieldErrors as ServerFieldErrors;

        Object.entries(
          fieldErrors
        ).forEach(
          ([field, messages]) => {
            if (
              !messages ||
              messages.length === 0
            ) {
              return;
            }

            setError(
              field as keyof CreateServiceInput,
              {
                type: "server",

                message:
                  messages[0],
              }
            );
          }
        );

        requestAnimationFrame(() => {
          scrollToFirstError();
        });
      }

      return;
    }

    /* =====================================================
       SUCCESS
    ===================================================== */

    setSuccessMessage(
      "Service updated successfully."
    );

    router.refresh();

    setTimeout(() => {
      router.push(
        "/admin/services"
      );
    }, 700);
  };

  /* =======================================================
     INVALID
  ======================================================= */

  const handleInvalid = (
    _fieldErrors:
      FieldErrors<CreateServiceInput>
  ) => {
    setServerError(
      "Please fix the highlighted fields before saving."
    );

    requestAnimationFrame(() => {
      scrollToFirstError();
    });
  };

  /* =======================================================
     UI
  ======================================================= */

  return (
    <form
      onSubmit={handleSubmit(
        onSubmit,
        handleInvalid
      )}
      noValidate
      className="w-full"
    >
      <div className="mx-auto w-full max-w-5xl">

        {/* =================================================
            HEADER
        ================================================= */}

        <div className="mb-8">
          <p className="text-[10px] font-medium uppercase tracking-[0.2em] text-[#FFC400]">
            Services
          </p>

          <h1 className="mt-2 text-2xl font-semibold tracking-tight text-white sm:text-3xl">
            Edit service
          </h1>

          <p className="mt-2 max-w-2xl text-sm leading-6 text-neutral-500">
            Update every part of this service,
            including content, visuals, pricing,
            relationships, publishing and SEO.
          </p>
        </div>

        {/* =================================================
            SERVER ERROR
        ================================================= */}

        {serverError && (
          <div
            role="alert"
            className="mb-6 flex items-start gap-3 rounded-2xl border border-red-500/20 bg-red-500/[0.06] p-4"
          >
            <AlertCircle
              size={18}
              className="mt-0.5 shrink-0 text-red-400"
            />

            <div className="min-w-0">
              <p className="text-sm font-medium text-red-300">
                Unable to update service
              </p>

              <p className="mt-1 text-xs leading-5 text-red-400/80">
                {serverError}
              </p>
            </div>
          </div>
        )}

        {/* =================================================
            SUCCESS
        ================================================= */}

        {successMessage && (
          <div
            role="status"
            className="mb-6 flex items-start gap-3 rounded-2xl border border-emerald-500/20 bg-emerald-500/[0.06] p-4"
          >
            <Check
              size={18}
              className="mt-0.5 shrink-0 text-emerald-400"
            />

            <p className="text-sm text-emerald-300">
              {successMessage}
            </p>
          </div>
        )}

        {/* =================================================
            SAME CREATE SECTIONS
        ================================================= */}

        <div className="space-y-5">

          {/* 01 — BASIC */}

          <ServiceBasicSection
            form={form}
            errors={errors}
          />

          {/* 02 — CLOUDINARY IMAGE */}

          <ServiceImageSection
            form={form}
            errors={errors}
          />

          {/* 03 — BENEFITS */}

          <ServiceBenefitsSection
            form={form}
            errors={errors}
          />

          {/* 04 — FEATURES */}

          <ServiceFeaturesSection
            form={form}
            errors={errors}
          />

          {/* 05 — PROCESS */}

          <ServiceProcessSection
            form={form}
            errors={errors}
          />

          {/* 06 — PRICING */}

          <ServicePricingSection
            form={form}
            errors={errors}
          />

          {/* 07 — CTA */}

          <ServiceCtaSection
            form={form}
            errors={errors}
          />

          {/* 08 — RELATIONS */}

          <ServiceRelationsSection
            form={form}
            errors={errors}
            faqs={faqs}
            projects={projects}
          />

          {/* 09 — PUBLISHING */}

          <ServicePublishingSection
            form={form}
            errors={errors}
          />

          {/* 10 — SEO */}

          <ServiceSeoSection
            form={form}
            errors={errors}
          />
        </div>

        {/* =================================================
            STICKY ACTION BAR
        ================================================= */}

        <div className="sticky bottom-4 z-30 mt-8">
          <div className="flex flex-col gap-4 rounded-2xl border border-[#242424] bg-[#0A0A0A]/95 p-4 shadow-2xl backdrop-blur-xl sm:flex-row sm:items-center sm:justify-between">

            <div className="min-w-0">
              <p className="text-xs font-medium text-neutral-300">
                {isDirty
                  ? "You have unsaved changes."
                  : "Service is up to date."}
              </p>

              <p className="mt-1 text-[10px] text-neutral-600">
                Review your changes before saving.
              </p>
            </div>

            <div className="flex w-full gap-3 sm:w-auto">

              {/* CANCEL */}

              <button
                type="button"
                disabled={isSubmitting}
                onClick={() =>
                  router.push(
                    "/admin/services"
                  )
                }
                className="flex-1 rounded-xl border border-[#292929] px-5 py-3 text-xs font-medium text-neutral-400 transition hover:border-[#3A3A3A] hover:text-white disabled:cursor-not-allowed disabled:opacity-50 sm:flex-none"
              >
                Cancel
              </button>

              {/* SAVE */}

              <button
                type="submit"
                disabled={isSubmitting}
                className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-[#FFC400] px-6 py-3 text-xs font-semibold text-black transition hover:bg-[#FFD43B] disabled:cursor-not-allowed disabled:opacity-60 sm:flex-none"
              >
                {isSubmitting ? (
                  <>
                    <Loader2
                      size={15}
                      className="animate-spin"
                    />

                    Saving...
                  </>
                ) : (
                  <>
                    <Save size={15} />

                    Save changes
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
}