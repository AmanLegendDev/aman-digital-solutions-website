"use client";

import {
  FormEvent,
  useEffect,
  useRef,
  useState,
} from "react";

import {
  ArrowUpRight,
  CheckCircle2,
  Loader2,
  X,
  AlertCircle,
} from "lucide-react";

import { createContactEnquiry } from "@/actions/contact";

/* =========================================================
   OPTIONS
========================================================= */

const SERVICES = [
  "Website Development",
  "E-commerce Website Development",
  "Custom Web Application Development",
  "SEO & Search Growth",
  "Digital Marketing & Lead Generation",
  "Business Automation & Workflow Systems",
  "Website Maintenance & Support",
  "UI/UX Design & Conversion Optimization",
  "Web Hosting & Deployment Management",
];

const BUDGETS = [
  "Under ₹25,000",
  "₹25,000 – ₹50,000",
  "₹50,000 – ₹1,00,000",
  "₹1,00,000+",
  "Not sure yet",
];

/* =========================================================
   TOAST
========================================================= */

type ToastType = "success" | "error";

type ToastState = {
  type: ToastType;
  message: string;
};

/* =========================================================
   COMPONENT
========================================================= */

export default function ContactForm() {
  const formRef =
    useRef<HTMLFormElement | null>(null);

  const toastTimerRef =
    useRef<ReturnType<typeof setTimeout> | null>(
      null
    );

  const [loading, setLoading] =
    useState(false);

  const [toast, setToast] =
    useState<ToastState | null>(null);

  /* =======================================================
     CLEANUP TOAST TIMER
  ======================================================= */

  useEffect(() => {
    return () => {
      if (toastTimerRef.current) {
        clearTimeout(toastTimerRef.current);
      }
    };
  }, []);

  /* =======================================================
     SHOW TOAST
  ======================================================= */

  function showToast(
    type: ToastType,
    message: string
  ) {
    if (toastTimerRef.current) {
      clearTimeout(toastTimerRef.current);
    }

    setToast({
      type,
      message,
    });

    toastTimerRef.current =
      setTimeout(() => {
        setToast(null);
      }, 5000);
  }

  /* =======================================================
     CLOSE TOAST
  ======================================================= */

  function closeToast() {
    if (toastTimerRef.current) {
      clearTimeout(toastTimerRef.current);
    }

    setToast(null);
  }

  /* =======================================================
     SUBMIT
  ======================================================= */

  async function handleSubmit(
    event: FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();

    if (loading) {
      return;
    }

    const form = event.currentTarget;

    setLoading(true);

    try {
      const formData =
        new FormData(form);

      const result =
        await createContactEnquiry(
          formData
        );

      /* ===============================================
         ERROR
      =============================================== */

      if (!result.success) {
        showToast(
          "error",
          result.message
        );

        return;
      }

      /* ===============================================
         SUCCESS
      =============================================== */

      form.reset();

      showToast(
        "success",
        result.message
      );
    } catch (error) {
      console.error(
        "CONTACT_FORM_ERROR:",
        error
      );

      showToast(
        "error",
        "Something went wrong. Please try again."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      {/* =================================================
          SUCCESS / ERROR TOAST
      ================================================== */}

      <div
        aria-live="polite"
        aria-atomic="true"
        className="
          pointer-events-none
          fixed
          right-4
          top-4
          z-[9999]
          w-[calc(100%-2rem)]
          max-w-[390px]
          sm:right-6
          sm:top-6
        "
      >
        {toast && (
          <div
            role={
              toast.type === "error"
                ? "alert"
                : "status"
            }
            className="
              pointer-events-auto
              overflow-hidden
              rounded-2xl
              border
              bg-[#0B0B0B]/95
              shadow-[0_24px_80px_rgba(0,0,0,0.55)]
              backdrop-blur-xl
              animate-[toastIn_0.28s_ease-out]
            "
            style={{
              borderColor:
                toast.type === "success"
                  ? "rgba(255,196,0,0.18)"
                  : "rgba(239,68,68,0.20)",
            }}
          >
            <div className="flex items-start gap-3 px-4 py-4">
              {/* ICON */}

              <div
                className="
                  flex
                  h-9
                  w-9
                  shrink-0
                  items-center
                  justify-center
                  rounded-xl
                "
                style={{
                  background:
                    toast.type === "success"
                      ? "rgba(255,196,0,0.10)"
                      : "rgba(239,68,68,0.10)",
                  color:
                    toast.type === "success"
                      ? "#FFC400"
                      : "#F87171",
                }}
              >
                {toast.type === "success" ? (
                  <CheckCircle2
                    size={18}
                    strokeWidth={1.8}
                  />
                ) : (
                  <AlertCircle
                    size={18}
                    strokeWidth={1.8}
                  />
                )}
              </div>

              {/* MESSAGE */}

              <div className="min-w-0 flex-1 pt-0.5">
                <p
                  className="
                    text-[9px]
                    font-semibold
                    uppercase
                    tracking-[0.16em]
                  "
                  style={{
                    color:
                      toast.type === "success"
                        ? "#FFC400"
                        : "#F87171",
                  }}
                >
                  {toast.type === "success"
                    ? "Enquiry sent"
                    : "Something went wrong"}
                </p>

                <p className="mt-1 text-xs leading-5 text-neutral-400">
                  {toast.message}
                </p>
              </div>

              {/* CLOSE */}

              <button
                type="button"
                onClick={closeToast}
                aria-label="Close notification"
                className="
                  flex
                  h-7
                  w-7
                  shrink-0
                  items-center
                  justify-center
                  rounded-lg
                  text-neutral-700
                  transition
                  hover:bg-white/[0.05]
                  hover:text-neutral-300
                "
              >
                <X size={14} />
              </button>
            </div>

            {/* PROGRESS */}

            <div
              className="h-px w-full origin-left animate-[toastProgress_5s_linear]"
              style={{
                background:
                  toast.type === "success"
                    ? "#FFC400"
                    : "#F87171",
              }}
            />
          </div>
        )}
      </div>

      {/* =================================================
          CONTACT FORM
      ================================================== */}

      <section
        id="contact-form"
        className="
          relative
          overflow-hidden
          bg-[#080808]
          py-20
          sm:py-24
          lg:py-32
        "
      >
        {/* AMBIENT GLOW */}

        <div
          aria-hidden="true"
          className="
            pointer-events-none
            absolute
            -right-40
            top-1/3
            h-[420px]
            w-[420px]
            rounded-full
            bg-[#FFC400]/[0.025]
            blur-[140px]
          "
        />

        <div
          className="
            relative
            mx-auto
            max-w-7xl
            px-5
            sm:px-6
            lg:px-8
          "
        >
          <div
            className="
              grid
              gap-10
              lg:grid-cols-[0.65fr_1.35fr]
              lg:gap-20
            "
          >
            {/* =================================================
                LEFT
            ================================================== */}

            <div className="max-w-md">
              <span
                className="
                  text-xs
                  font-semibold
                  uppercase
                  tracking-[0.17em]
                  text-[#FFC400]
                "
              >
                Project enquiry
              </span>

              <h2
                className="
                  mt-4
                  text-3xl
                  font-semibold
                  leading-tight
                  tracking-[-0.045em]
                  text-white
                  sm:text-4xl
                  lg:text-5xl
                "
              >
                Tell us what
                <span className="block text-neutral-500">
                  you&apos;re building.
                </span>
              </h2>

              <p
                className="
                  mt-6
                  text-sm
                  leading-7
                  text-neutral-500
                  sm:text-base
                "
              >
                You don&apos;t need a perfectly
                prepared brief. Give us the
                context you have and we&apos;ll
                take it from there.
              </p>

              <div
                className="
                  mt-8
                  space-y-4
                  border-t
                  border-white/[0.08]
                  pt-7
                "
              >
                <div>
                  <p className="text-xs font-medium text-neutral-300">
                    Useful things to include
                  </p>

                  <p
                    className="
                      mt-2
                      text-xs
                      leading-5
                      text-neutral-600
                    "
                  >
                    What your business does,
                    what you want to build,
                    your current website if
                    you have one, important
                    features and your
                    approximate timeline.
                  </p>
                </div>

                <div>
                  <p className="text-xs font-medium text-neutral-300">
                    Not sure about the budget?
                  </p>

                  <p
                    className="
                      mt-2
                      text-xs
                      leading-5
                      text-neutral-600
                    "
                  >
                    That&apos;s completely fine.
                    Choose &quot;Not sure yet&quot;
                    and we can discuss the
                    scope first.
                  </p>
                </div>
              </div>
            </div>

            {/* =================================================
                FORM
            ================================================== */}

            <form
              ref={formRef}
              onSubmit={handleSubmit}
              className="
                rounded-[2rem]
                border
                border-white/[0.08]
                bg-white/[0.02]
                p-6
                sm:p-8
                lg:p-10
              "
            >
              <div className="grid gap-5 sm:grid-cols-2">
                <Field
                  label="Your name"
                  name="name"
                  placeholder="Aman Sharma"
                  required
                  disabled={loading}
                />

                <Field
                  label="Email address"
                  name="email"
                  type="email"
                  placeholder="you@example.com"
                  required
                  disabled={loading}
                />

                <Field
                  label="Phone / WhatsApp"
                  name="phone"
                  placeholder="+91 98765 43210"
                  disabled={loading}
                />

                <Field
                  label="Company / business"
                  name="company"
                  placeholder="Your business name"
                  disabled={loading}
                />

                <SelectField
                  label="What do you need?"
                  name="service"
                  options={SERVICES}
                  disabled={loading}
                />

                <SelectField
                  label="Approximate budget"
                  name="budget"
                  options={BUDGETS}
                  disabled={loading}
                />
              </div>

              {/* MESSAGE */}

              <div className="mt-5">
                <label
                  htmlFor="message"
                  className="
                    mb-2
                    block
                    text-xs
                    font-medium
                    text-neutral-400
                  "
                >
                  Tell us about the project

                  <span className="ml-1 text-[#FFC400]">
                    *
                  </span>
                </label>

                <textarea
                  id="message"
                  name="message"
                  required
                  disabled={loading}
                  rows={7}
                  placeholder="What are you looking to build or improve?"
                  className="
                    w-full
                    resize-y
                    rounded-2xl
                    border
                    border-white/[0.09]
                    bg-[#0B0B0B]
                    px-4
                    py-3.5
                    text-sm
                    text-white
                    outline-none
                    placeholder:text-neutral-700
                    transition
                    focus:border-[#FFC400]/40
                    focus:ring-1
                    focus:ring-[#FFC400]/20
                    disabled:cursor-not-allowed
                    disabled:opacity-60
                  "
                />
              </div>

              {/* SUBMIT */}

              <button
                type="submit"
                disabled={loading}
                className="
                  group
                  mt-6
                  inline-flex
                  w-full
                  items-center
                  justify-center
                  gap-2
                  rounded-full
                  bg-[#FFC400]
                  px-6
                  py-3.5
                  text-sm
                  font-semibold
                  text-black
                  transition-all
                  duration-200
                  hover:bg-[#FFD43B]
                  hover:shadow-[0_0_30px_rgba(255,196,0,0.18)]
                  disabled:cursor-not-allowed
                  disabled:opacity-60
                "
              >
                {loading ? (
                  <>
                    <Loader2
                      size={16}
                      className="animate-spin"
                    />

                    Sending...
                  </>
                ) : (
                  <>
                    Send Project Enquiry

                    <ArrowUpRight
                      size={16}
                      className="
                        transition-transform
                        duration-200
                        group-hover:-translate-y-0.5
                        group-hover:translate-x-0.5
                      "
                    />
                  </>
                )}
              </button>

              <p
                className="
                  mt-4
                  text-center
                  text-[10px]
                  leading-5
                  text-neutral-700
                "
              >
                By submitting this form, you agree
                to our privacy policy.
              </p>
            </form>
          </div>
        </div>
      </section>

      {/* =================================================
          TOAST ANIMATIONS
      ================================================== */}

      
    </>
  );
}

/* =========================================================
   FIELD
========================================================= */

type FieldProps = {
  label: string;
  name: string;
  placeholder: string;
  type?: string;
  required?: boolean;
  disabled?: boolean;
};

function Field({
  label,
  name,
  placeholder,
  type = "text",
  required = false,
  disabled = false,
}: FieldProps) {
  return (
    <div>
      <label
        htmlFor={name}
        className="
          mb-2
          block
          text-xs
          font-medium
          text-neutral-400
        "
      >
        {label}

        {required && (
          <span className="ml-1 text-[#FFC400]">
            *
          </span>
        )}
      </label>

      <input
        id={name}
        name={name}
        type={type}
        required={required}
        disabled={disabled}
        placeholder={placeholder}
        className="
          w-full
          rounded-2xl
          border
          border-white/[0.09]
          bg-[#0B0B0B]
          px-4
          py-3.5
          text-sm
          text-white
          outline-none
          placeholder:text-neutral-700
          transition
          focus:border-[#FFC400]/40
          focus:ring-1
          focus:ring-[#FFC400]/20
          disabled:cursor-not-allowed
          disabled:opacity-60
        "
      />
    </div>
  );
}

/* =========================================================
   SELECT
========================================================= */

type SelectFieldProps = {
  label: string;
  name: string;
  options: readonly string[];
  disabled?: boolean;
};

function SelectField({
  label,
  name,
  options,
  disabled = false,
}: SelectFieldProps) {
  return (
    <div>
      <label
        htmlFor={name}
        className="
          mb-2
          block
          text-xs
          font-medium
          text-neutral-400
        "
      >
        {label}
      </label>

      <select
        id={name}
        name={name}
        defaultValue=""
        disabled={disabled}
        className="
          w-full
          appearance-none
          rounded-2xl
          border
          border-white/[0.09]
          bg-[#0B0B0B]
          px-4
          py-3.5
          text-sm
          text-neutral-300
          outline-none
          transition
          focus:border-[#FFC400]/40
          focus:ring-1
          focus:ring-[#FFC400]/20
          disabled:cursor-not-allowed
          disabled:opacity-60
        "
      >
        <option value="" disabled>
          Select an option
        </option>

        {options.map((option) => (
          <option
            key={option}
            value={option}
            className="bg-[#0B0B0B]"
          >
            {option}
          </option>
        ))}
      </select>
    </div>
  );
}