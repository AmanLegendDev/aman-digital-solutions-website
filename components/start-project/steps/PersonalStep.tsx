"use client";

import {
  Check,
  Mail,
  MessageCircle,
  Phone,
} from "lucide-react";

import Field from "../ui/Field";

import type {
  FormData,
  FormErrors,
  UpdateForm,
} from "../types";

type Props = {
  data: FormData;
  errors: FormErrors;
  update: UpdateForm;
};

export default function PersonalStep({
  data,
  errors,
  update,
}: Props) {
  const contactMethods = [
    {
      value: "WHATSAPP",
      label: "WhatsApp",
      icon: MessageCircle,
    },
    {
      value: "PHONE",
      label: "Phone",
      icon: Phone,
    },
    {
      value: "EMAIL",
      label: "Email",
      icon: Mail,
    },
  ] as const;

  return (
    <section className="p-5 sm:p-8">
      <div className="mb-8">
        <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#FFC400]">
          Step 01
        </p>

        <h2 className="mt-2 text-2xl font-semibold text-white">
          Tell us about you
        </h2>

        <p className="mt-2 text-sm leading-6 text-neutral-500">
          Just the essentials. We’ll use these details
          to get back to you.
        </p>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <Field
          label="Full name"
          required
          value={data.fullName}
          error={errors.fullName}
          placeholder="Your full name"
          onChange={(value) =>
            update("fullName", value)
          }
        />

      <Field
  label="Business / company"
  value={data.companyName ?? ""}
  placeholder="Your business name"
  onChange={(value) =>
    update("companyName", value)
  }
/>

        <Field
          label="Email"
          required
          type="email"
          value={data.email}
          error={errors.email}
          placeholder="you@business.com"
          onChange={(value) =>
            update("email", value)
          }
        />

        <Field
          label="WhatsApp / phone"
          required
          value={data.phone}
          error={errors.phone}
          placeholder="+91 98765 43210"
          onChange={(value) =>
            update("phone", value)
          }
        />

        <Field
          label="Business location"
          required
          value={data.location}
          error={errors.location}
          placeholder="Shimla, Himachal Pradesh"
          onChange={(value) =>
            update("location", value)
          }
        />
<Field
  label="Current website"
  value={data.currentWebsite ?? ""}
  placeholder="https://example.com"
  onChange={(value) =>
    update("currentWebsite", value)
  }
/>
      </div>

      <div className="mt-7">
        <label className="mb-3 block text-sm font-medium text-white">
          Preferred way to contact you
        </label>

        <div className="grid gap-3 sm:grid-cols-3">
          {contactMethods.map(
            ({
              value,
              label,
              icon: Icon,
            }) => {
              const selected =
                data.preferredContactMethod ===
                value;

              return (
                <button
                  key={value}
                  type="button"
                  onClick={() =>
                    update(
                      "preferredContactMethod",
                      value,
                    )
                  }
                  className={[
                    "flex items-center gap-3 rounded-xl border p-4 text-left transition",
                    selected
                      ? "border-[#FFC400]/60 bg-[#FFC400]/5"
                      : "border-white/[0.08] hover:border-white/20",
                  ].join(" ")}
                >
                  <Icon
                    size={17}
                    className={
                      selected
                        ? "text-[#FFC400]"
                        : "text-neutral-500"
                    }
                  />

                  <span className="text-sm text-white">
                    {label}
                  </span>

                  {selected && (
                    <Check
                      size={15}
                      className="ml-auto text-[#FFC400]"
                    />
                  )}
                </button>
              );
            },
          )}
        </div>
      </div>
    </section>
  );
}