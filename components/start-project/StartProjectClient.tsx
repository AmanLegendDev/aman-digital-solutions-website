"use client";

import {
  ArrowLeft,
  ArrowRight,
  Loader2,
  Send,
  Sparkles,
} from "lucide-react";

import { useEffect, useRef, useState } from "react";

import PersonalStep from "./steps/PersonalStep";
import ProjectStep from "./steps/ProjectStep";
import ReviewStep from "./steps/ReviewStep";

import SuccessScreen from "./ui/SuccessScreen";

import { INITIAL_DATA } from "./constants";

import type {
  FormData,
  FormErrors,
  FormStep,
  ServiceOption,
} from "./types";

type Props = {
  services: ServiceOption[];
};

export default function StartProjectClient({
  services,
}: Props) {
  const [step, setStep] =
    useState<FormStep>(1);

    const formTopRef = useRef<HTMLDivElement>(null);

  const [data, setData] =
    useState<FormData>({
      ...INITIAL_DATA,
      serviceIds: [],
      requiredPages: [],
      requiredFeatures: [],
    });

  const [errors, setErrors] =
    useState<FormErrors>({});

  const [submitting, setSubmitting] =
    useState(false);

  const [requestId, setRequestId] =
    useState("");

  const [submitError, setSubmitError] =
    useState("");

  function update<K extends keyof FormData>(
    key: K,
    value: FormData[K],
  ) {
    setData((current) => ({
      ...current,
      [key]: value,
    }));

    setErrors((current) => {
      const next = {
        ...current,
      };

      delete next[String(key)];

      return next;
    });
  }

  function toggleArray(
    key:
      | "requiredPages"
      | "requiredFeatures",
    value: string,
  ) {
    const current = data[key];

    const next = current.includes(value)
      ? current.filter(
          (item) => item !== value,
        )
      : [...current, value];

    update(key, next);
  }

  function validateStepOne() {
    const next: FormErrors = {};

    if (
      data.fullName.trim().length < 2
    ) {
      next.fullName =
        "Please enter your full name.";
    }

    if (
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(
        data.email,
      )
    ) {
      next.email =
        "Please enter a valid email.";
    }

    if (
      data.phone.trim().length < 7
    ) {
      next.phone =
        "Please enter a valid phone number.";
    }

    if (
      data.location.trim().length < 2
    ) {
      next.location =
        "Please enter your location.";
    }

    setErrors(next);

    return Object.keys(next).length === 0;
  }

  function validateStepTwo() {
    const next: FormErrors = {};

    if (data.serviceIds.length === 0) {
      next.serviceIds =
        "Select at least one service.";
    }

    if (
      data.projectDescription
        .trim()
        .length < 20
    ) {
      next.projectDescription =
        "Tell us a little more about your project.";
    }

    setErrors(next);

    return Object.keys(next).length === 0;
  }

  function handleNext() {
  if (step === 1) {
    if (!validateStepOne()) {
      return;
    }

    setStep(2);

    window.setTimeout(() => {
      formTopRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }, 50);

    return;
  }

  if (step === 2) {
    if (!validateStepTwo()) {
      return;
    }

    setStep(3);

    window.setTimeout(() => {
      formTopRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }, 50);
  }
}

  async function handleSubmit() {
    setSubmitError("");

    if (!data.privacyConsent) {
      setSubmitError(
        "Please accept the privacy policy before submitting.",
      );

      return;
    }

    try {
      setSubmitting(true);

      const response = await fetch(
        "/api/project-requests",
        {
          method: "POST",
          headers: {
            "Content-Type":
              "application/json",
          },
          body: JSON.stringify(data),
        },
      );

      const contentType =
        response.headers.get(
          "content-type",
        );

      const result =
        contentType?.includes(
          "application/json",
        )
          ? await response.json()
          : null;

      if (
        !response.ok ||
        !result?.success
      ) {
        throw new Error(
          result?.error ||
            "Unable to submit your project request.",
        );
      }

      setRequestId(
        result.requestId,
      );

      setStep(4);
    } catch (error) {
      setSubmitError(
        error instanceof Error
          ? error.message
          : "Something went wrong.",
      );
    } finally {
      setSubmitting(false);
    }
  }

  if (step === 4) {
    return (
      <SuccessScreen
        requestId={requestId}
      />
    );
  }

  return (
    <main className="min-h-screen bg-[#050505] px-4 py-10 text-white sm:px-6 lg:px-8">
      <div className="mx-auto max-w-4xl">
        {/* HEADER */}

        <div className="mb-10 text-center">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl border border-[#FFC400]/20 bg-[#FFC400]/10">
            <Sparkles
              size={20}
              className="text-[#FFC400]"
            />
          </div>

          <p className="mt-5 text-[10px] font-semibold uppercase tracking-[0.25em] text-[#FFC400]">
            Start a Project
          </p>

          <h1 className="mt-3 text-3xl font-semibold tracking-tight sm:text-5xl">
            Let’s build something
            <br />
            <span className="text-neutral-500">
              worth building.
            </span>
          </h1>

          <p className="mx-auto mt-4 max-w-xl text-sm leading-6 text-neutral-500">
            Tell us what you need. It takes
            only a few minutes and helps us
            understand your project before we
            speak.
          </p>
        </div>

        {/* STEPPER */}

        <div className="mb-8 flex items-center justify-center gap-2 sm:gap-4">
          {[
            [1, "Your Details"],
            [2, "Project"],
            [3, "Review"],
          ].map(
            ([number, label]) => {
              const current =
                Number(number);

              const active =
                step >= current;

              return (
                <div
                  key={number}
                  className="flex items-center gap-2"
                >
                  <div
                    className={[
                      "flex h-8 w-8 items-center justify-center rounded-full text-xs font-semibold",
                      active
                        ? "bg-[#FFC400] text-black"
                        : "border border-white/10 text-neutral-600",
                    ].join(" ")}
                  >
                    {step > current
                      ? "✓"
                      : number}
                  </div>

                  <span
                    className={[
                      "hidden text-xs sm:block",
                      active
                        ? "text-white"
                        : "text-neutral-600",
                    ].join(" ")}
                  >
                    {label}
                  </span>

                  {current < 3 && (
                    <div className="mx-1 h-px w-6 bg-white/10 sm:w-12" />
                  )}
                </div>
              );
            },
          )}
        </div>

        {/* FORM */}

        <div
  ref={formTopRef}
  className="overflow-hidden rounded-3xl border border-white/[0.08] bg-[#090909]"
>
          {step === 1 && (
            <PersonalStep
              data={data}
              errors={errors}
              update={update}
            />
          )}

          {step === 2 && (
            <ProjectStep
              data={data}
              errors={errors}
              services={services}
              update={update}
              toggleArray={toggleArray}
            />
          )}

          {step === 3 && (
            <ReviewStep
              data={data}
              services={services}
              onEdit={(targetStep) =>
                setStep(targetStep)
              }
            />
          )}

          {submitError && (
            <div className="mx-6 mb-6 rounded-xl border border-red-500/20 bg-red-500/5 px-4 py-3 text-sm text-red-300">
              {submitError}
            </div>
          )}

          {/* STEP 1 + 2 ACTIONS */}

          {step !== 3 && (
            <div className="flex items-center justify-between border-t border-white/[0.07] px-5 py-5 sm:px-8">
              {step === 1 ? (
                <a
                  href="/"
                  className="text-xs font-medium text-neutral-500 transition hover:text-white"
                >
                  Cancel
                </a>
              ) : (
                <button
                  type="button"
                  onClick={() =>
                    setStep(1)
                  }
                  className="inline-flex items-center gap-2 text-xs font-medium text-neutral-500 transition hover:text-white"
                >
                  <ArrowLeft size={15} />
                  Back
                </button>
              )}

              <button
                type="button"
                onClick={handleNext}
                className="inline-flex items-center gap-2 rounded-xl bg-[#FFC400] px-5 py-3 text-xs font-semibold text-black transition hover:bg-[#FFD43D]"
              >
                Continue
                <ArrowRight size={15} />
              </button>
            </div>
          )}

          {/* REVIEW ACTIONS */}

          {step === 3 && (
            <div className="border-t border-white/[0.07] px-5 py-5 sm:px-8">
              <label className="flex cursor-pointer gap-3">
                <input
                  type="checkbox"
                  checked={
                    data.privacyConsent
                  }
                  onChange={(event) =>
                    update(
                      "privacyConsent",
                      event.target.checked,
                    )
                  }
                  className="mt-1 h-4 w-4 accent-[#FFC400]"
                />

                <span className="text-xs leading-5 text-neutral-500">
                  I agree to the{" "}
                  <a
                    href="/privacy-policy"
                    className="text-white underline underline-offset-2"
                  >
                    privacy policy
                  </a>{" "}
                  and consent to Aman
                  Digital Solutions using
                  these details to contact me
                  regarding this project.
                </span>
              </label>

              <div className="mt-5 flex flex-col-reverse gap-3 sm:flex-row sm:items-center sm:justify-between">
                <button
                  type="button"
                  onClick={() =>
                    setStep(2)
                  }
                  className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/10 px-5 py-3 text-xs font-semibold text-neutral-300 transition hover:border-white/20 hover:text-white"
                >
                  <ArrowLeft size={15} />
                  Back
                </button>

                <button
                  type="button"
                  disabled={
                    submitting ||
                    !data.privacyConsent
                  }
                  onClick={
                    handleSubmit
                  }
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#FFC400] px-6 py-3 text-xs font-semibold text-black transition hover:bg-[#FFD43D] disabled:cursor-not-allowed disabled:opacity-40"
                >
                  {submitting ? (
                    <>
                      <Loader2
                        size={15}
                        className="animate-spin"
                      />
                      Submitting...
                    </>
                  ) : (
                    <>
                      Submit Project Request
                      <Send size={15} />
                    </>
                  )}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}