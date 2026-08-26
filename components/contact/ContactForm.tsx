"use client";

import { FormEvent, useState } from "react";
import {
  ArrowUpRight,
  CheckCircle2,
  Loader2,
} from "lucide-react";

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

export default function ContactForm() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (
    event: FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    setLoading(true);

    /*
      Connect this form to your contact API / email service here.
      UI is intentionally ready for backend integration.
    */

    await new Promise((resolve) =>
      setTimeout(resolve, 700)
    );

    setLoading(false);
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <section
        id="contact-form"
        className="relative overflow-hidden bg-[#080808] py-20 sm:py-24 lg:py-32"
      >
        <div className="mx-auto max-w-3xl px-5 sm:px-6 lg:px-8">
          <div className="rounded-[2rem] border border-[#FFC400]/15 bg-[#FFC400]/[0.035] p-8 text-center sm:p-14">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full border border-[#FFC400]/20 bg-[#FFC400]/10 text-[#FFC400]">
              <CheckCircle2 size={26} />
            </div>

            <h2 className="mt-7 text-3xl font-semibold tracking-[-0.04em] text-white sm:text-4xl">
              Thanks for reaching out.
            </h2>

            <p className="mx-auto mt-4 max-w-xl text-sm leading-7 text-neutral-500 sm:text-base">
              Your project details have been received. We&apos;ll
              review the requirements and get back to you with the
              next steps.
            </p>

            <button
              type="button"
              onClick={() => setSubmitted(false)}
              className="
                mt-8 rounded-full
                border border-white/[0.1]
                px-5 py-3
                text-xs font-medium
                text-neutral-300
                transition
                hover:border-white/[0.2]
                hover:text-white
              "
            >
              Send another enquiry
            </button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section
      id="contact-form"
      className="relative overflow-hidden bg-[#080808] py-20 sm:py-24 lg:py-32"
    >
      <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-[0.65fr_1.35fr] lg:gap-20">
          {/* LEFT */}
          <div className="max-w-md">
            <span className="text-xs font-semibold uppercase tracking-[0.17em] text-[#FFC400]">
              Project enquiry
            </span>

            <h2 className="mt-4 text-3xl font-semibold leading-tight tracking-[-0.045em] text-white sm:text-4xl lg:text-5xl">
              Tell us what
              <span className="block text-neutral-500">
                you&apos;re building.
              </span>
            </h2>

            <p className="mt-6 text-sm leading-7 text-neutral-500 sm:text-base">
              You don&apos;t need a perfectly prepared brief. Give us
              the context you have and we&apos;ll take it from there.
            </p>

            <div className="mt-8 space-y-4 border-t border-white/[0.08] pt-7">
              <div>
                <p className="text-xs font-medium text-neutral-300">
                  Useful things to include
                </p>

                <p className="mt-2 text-xs leading-5 text-neutral-600">
                  What your business does, what you want to build,
                  your current website if you have one, important
                  features and your approximate timeline.
                </p>
              </div>

              <div>
                <p className="text-xs font-medium text-neutral-300">
                  Not sure about the budget?
                </p>

                <p className="mt-2 text-xs leading-5 text-neutral-600">
                  That&apos;s completely fine. Choose &quot;Not sure
                  yet&quot; and we can discuss the scope first.
                </p>
              </div>
            </div>
          </div>

          {/* FORM */}
          <form
            onSubmit={handleSubmit}
            className="
              rounded-[2rem]
              border border-white/[0.08]
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
              />

              <Field
                label="Email address"
                name="email"
                type="email"
                placeholder="you@example.com"
                required
              />

              <Field
                label="Phone / WhatsApp"
                name="phone"
                placeholder="+91 98765 43210"
              />

              <Field
                label="Company / business"
                name="company"
                placeholder="Your business name"
              />

              <SelectField
                label="What do you need?"
                name="service"
                options={SERVICES}
              />

              <SelectField
                label="Approximate budget"
                name="budget"
                options={BUDGETS}
              />
            </div>

            <div className="mt-5">
              <label
                htmlFor="message"
                className="mb-2 block text-xs font-medium text-neutral-400"
              >
                Tell us about the project
                <span className="ml-1 text-[#FFC400]">*</span>
              </label>

              <textarea
                id="message"
                name="message"
                required
                rows={7}
                placeholder="What are you looking to build or improve?"
                className="
                  w-full resize-y rounded-2xl
                  border border-white/[0.09]
                  bg-[#0B0B0B]
                  px-4 py-3.5
                  text-sm text-white
                  outline-none
                  placeholder:text-neutral-700
                  transition
                  focus:border-[#FFC400]/40
                  focus:ring-1
                  focus:ring-[#FFC400]/20
                "
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="
                group mt-6 inline-flex
                w-full items-center
                justify-center gap-2
                rounded-full
                bg-[#FFC400]
                px-6 py-3.5
                text-sm font-semibold
                text-black
                transition-all duration-200
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
                      transition-transform duration-200
                      group-hover:-translate-y-0.5
                      group-hover:translate-x-0.5
                    "
                  />
                </>
              )}
            </button>

            <p className="mt-4 text-center text-[10px] leading-5 text-neutral-700">
              By submitting this form, you agree to our privacy
              policy.
            </p>
          </form>
        </div>
      </div>
    </section>
  );
}

type FieldProps = {
  label: string;
  name: string;
  placeholder: string;
  type?: string;
  required?: boolean;
};

function Field({
  label,
  name,
  placeholder,
  type = "text",
  required = false,
}: FieldProps) {
  return (
    <div>
      <label
        htmlFor={name}
        className="mb-2 block text-xs font-medium text-neutral-400"
      >
        {label}
        {required && (
          <span className="ml-1 text-[#FFC400]">*</span>
        )}
      </label>

      <input
        id={name}
        name={name}
        type={type}
        required={required}
        placeholder={placeholder}
        className="
          w-full rounded-2xl
          border border-white/[0.09]
          bg-[#0B0B0B]
          px-4 py-3.5
          text-sm text-white
          outline-none
          placeholder:text-neutral-700
          transition
          focus:border-[#FFC400]/40
          focus:ring-1
          focus:ring-[#FFC400]/20
        "
      />
    </div>
  );
}

type SelectFieldProps = {
  label: string;
  name: string;
  options: readonly string[];
};

function SelectField({
  label,
  name,
  options,
}: SelectFieldProps) {
  return (
    <div>
      <label
        htmlFor={name}
        className="mb-2 block text-xs font-medium text-neutral-400"
      >
        {label}
      </label>

      <select
        id={name}
        name={name}
        defaultValue=""
        className="
          w-full appearance-none rounded-2xl
          border border-white/[0.09]
          bg-[#0B0B0B]
          px-4 py-3.5
          text-sm text-neutral-300
          outline-none
          transition
          focus:border-[#FFC400]/40
          focus:ring-1
          focus:ring-[#FFC400]/20
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