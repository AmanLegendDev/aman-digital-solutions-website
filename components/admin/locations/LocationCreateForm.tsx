"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  Check,
  ExternalLink,
  MapPin,
} from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { locationSchema } from "@/schemas/location.schema";
import type { z } from "zod";

import { createLocation } from "@/actions/location.actions";

import CloudinaryImageUploader from "@/components/admin/media/CloudinaryImageUploader";

type FormValues = z.input<typeof locationSchema>;

const SITE_URL = "https://www.amandigitalsolutions.com";

const inputClass =
  "w-full rounded-xl border border-[#292929] bg-[#0D0D0D] px-4 py-3 text-sm text-white outline-none transition placeholder:text-white/25 focus:border-[#FFC400]/60 focus:ring-2 focus:ring-[#FFC400]/10";

const textareaClass =
  "w-full resize-y rounded-xl border border-[#292929] bg-[#0D0D0D] px-4 py-3 text-sm leading-6 text-white outline-none transition placeholder:text-white/25 focus:border-[#FFC400]/60 focus:ring-2 focus:ring-[#FFC400]/10";

const labelClass =
  "mb-2 block text-sm font-medium text-white/80";

function slugify(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

function Section({
  number,
  title,
  description,
  children,
}: {
  number: string;
  title: string;
  description: string;
  children: React.ReactNode;
}) {
  return (
    <section className="rounded-2xl border border-[#252525] bg-[#0B0B0B] p-5 sm:p-7">
      <div className="mb-7 flex gap-4">
        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[#FFC400] text-xs font-bold text-black">
          {number}
        </div>

        <div>
          <h2 className="text-lg font-semibold">
            {title}
          </h2>

          <p className="mt-1 max-w-2xl text-sm leading-5 text-white/40">
            {description}
          </p>
        </div>
      </div>

      {children}
    </section>
  );
}

function FieldError({
  message,
}: {
  message?: string;
}) {
  if (!message) return null;

  return (
    <p className="mt-1.5 text-xs text-red-400">
      {message}
    </p>
  );
}

export default function LocationCreateForm() {
  const router = useRouter();

  const [serverError, setServerError] = useState("");
  const [saving, setSaving] = useState(false);
  const [slugManuallyEdited, setSlugManuallyEdited] =
    useState(false);

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<
  z.input<typeof locationSchema>,
  unknown,
  z.output<typeof locationSchema>
>({
  resolver: zodResolver(locationSchema),

  defaultValues: {
      name: "",
      slug: "",

      shortDescription: "",
      description: "",

      address: "",
      city: "",
      state: "",
      country: "India",
      postalCode: "",

      latitude: undefined,
      longitude: undefined,

      phone: "",
      email: "",
      mapUrl: "",

      services: [],

      featured: false,
      published: false,
      displayOrder: 0,

      seoTitle: "",
      seoDescription: "",
      canonicalUrl: "",

      ogTitle: "",
      ogDescription: "",
    },
  });

  const name = watch("name");
  const slug = watch("slug");
  const image = watch("image");
  const ogImage = watch("ogImage");

  useEffect(() => {
    if (slugManuallyEdited) return;

    setValue("slug", slugify(name), {
      shouldDirty: true,
      shouldValidate: true,
    });
  }, [
    name,
    slugManuallyEdited,
    setValue,
  ]);

  useEffect(() => {
    if (!slug) {
      setValue("canonicalUrl", "");
      return;
    }

    setValue(
      "canonicalUrl",
      `${SITE_URL}/locations/${slug}`,
      {
        shouldValidate: true,
      }
    );
  }, [slug, setValue]);

 const submit = async (
  values: z.output<typeof locationSchema>
) => {
    setSaving(true);
    setServerError("");

    const result = await createLocation(values);

    if (!result.success) {
      setServerError(result.error);
      setSaving(false);
      return;
    }

    router.push("/admin/locations");
    router.refresh();
  };

  return (
    <form
      onSubmit={handleSubmit(submit)}
      className="space-y-5 pb-10"
    >
      {serverError && (
        <div className="rounded-xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-300">
          {serverError}
        </div>
      )}

      {/* BASIC INFORMATION */}
      <Section
        number="01"
        title="Location information"
        description="Define the location page and the content visitors will see."
      >
        <div className="grid gap-5">
          <div>
            <label className={labelClass}>
              Location name *
            </label>

            <input
              {...register("name")}
              placeholder="e.g. Shimla"
              className={inputClass}
            />

            <FieldError
              message={errors.name?.message}
            />
          </div>

          <div>
            <label className={labelClass}>
              URL slug *
            </label>

            <input
              {...register("slug", {
                onChange: () => {
                  setSlugManuallyEdited(true);
                },
              })}
              placeholder="shimla"
              className={inputClass}
            />

            <div className="mt-2 flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
              <p className="text-xs text-white/30">
                Automatically generated from the location name.
              </p>

              {slug && (
                <p className="text-xs text-[#FFC400]/70">
                  /locations/{slug}
                </p>
              )}
            </div>

            <FieldError
              message={errors.slug?.message}
            />
          </div>

          <div>
            <label className={labelClass}>
              Short description *
            </label>

            <textarea
              {...register("shortDescription")}
              rows={3}
              placeholder="Web design and digital solutions for businesses in this area..."
              className={textareaClass}
            />

            <FieldError
              message={
                errors.shortDescription?.message
              }
            />
          </div>

          <div>
            <label className={labelClass}>
              Full description *
            </label>

            <textarea
              {...register("description")}
              rows={7}
              placeholder="Describe Aman Digital Solutions' services and presence in this location..."
              className={textareaClass}
            />

            <FieldError
              message={errors.description?.message}
            />
          </div>
        </div>
      </Section>

      {/* IMAGE */}
      <Section
        number="02"
        title="Location image"
        description="Use one strong, relevant image for the location page."
      >
        <CloudinaryImageUploader
          label="Main location image"
          description="JPG, PNG, WebP or AVIF · Maximum 5MB"
          value={image}
          onChange={(value) => {
            setValue("image", value, {
              shouldDirty: true,
              shouldValidate: true,
            });
          }}
        />

        <div className="mt-5">
          <label className={labelClass}>
            Image alt text
          </label>

          <input
            {...register("image.alt")}
            placeholder="Aman Digital Solutions serving businesses in Shimla"
            className={inputClass}
          />

          <p className="mt-1.5 text-xs text-white/30">
            Write a natural description of what the image represents.
          </p>
        </div>
      </Section>

      {/* ADDRESS */}
      <Section
        number="03"
        title="Address & area"
        description="Store accurate location information. Leave optional fields empty rather than entering guessed data."
      >
        <div className="grid gap-5">
          <div>
            <label className={labelClass}>
              Address
            </label>

            <input
              {...register("address")}
              placeholder="Business address or service area"
              className={inputClass}
            />
          </div>

          <div className="grid gap-5 md:grid-cols-2">
            <div>
              <label className={labelClass}>
                City *
              </label>

              <input
                {...register("city")}
                placeholder="Shimla"
                className={inputClass}
              />

              <FieldError
                message={errors.city?.message}
              />
            </div>

            <div>
              <label className={labelClass}>
                State
              </label>

              <input
                {...register("state")}
                placeholder="Himachal Pradesh"
                className={inputClass}
              />
            </div>
          </div>

          <div className="grid gap-5 md:grid-cols-2">
            <div>
              <label className={labelClass}>
                Country *
              </label>

              <input
                {...register("country")}
                placeholder="India"
                className={inputClass}
              />

              <FieldError
                message={errors.country?.message}
              />
            </div>

            <div>
              <label className={labelClass}>
                Postal code
              </label>

              <input
                {...register("postalCode")}
                placeholder="171001"
                className={inputClass}
              />
            </div>
          </div>
        </div>
      </Section>

      {/* MAP */}
      <Section
        number="04"
        title="Map & coordinates"
        description="Optional geographic data for maps, local SEO and structured location information."
      >
        <div className="grid gap-5 md:grid-cols-2">
          <div>
            <label className={labelClass}>
              Latitude
            </label>

            <input
              type="number"
              step="any"
              {...register("latitude", {
                setValueAs: (value) =>
                  value === ""
                    ? undefined
                    : Number(value),
              })}
              placeholder="31.1048"
              className={inputClass}
            />

            <FieldError
              message={errors.latitude?.message}
            />
          </div>

          <div>
            <label className={labelClass}>
              Longitude
            </label>

            <input
              type="number"
              step="any"
              {...register("longitude", {
                setValueAs: (value) =>
                  value === ""
                    ? undefined
                    : Number(value),
              })}
              placeholder="77.1734"
              className={inputClass}
            />

            <FieldError
              message={errors.longitude?.message}
            />
          </div>

          <div className="md:col-span-2">
            <label className={labelClass}>
              Google Maps URL
            </label>

            <div className="relative">
              <input
                {...register("mapUrl")}
                placeholder="https://maps.google.com/..."
                className={`${inputClass} pr-11`}
              />

              <ExternalLink
                size={16}
                className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-white/25"
              />
            </div>

            <FieldError
              message={errors.mapUrl?.message}
            />
          </div>
        </div>

        <div className="mt-5 rounded-xl border border-[#252525] bg-[#080808] p-4">
          <div className="flex gap-3">
            <MapPin
              size={17}
              className="mt-0.5 shrink-0 text-[#FFC400]"
            />

            <p className="text-xs leading-5 text-white/40">
              Coordinates are optional. Only enter verified coordinates
              for the actual location. Do not invent geographic data.
            </p>
          </div>
        </div>
      </Section>

      {/* CONTACT */}
      <Section
        number="05"
        title="Contact details"
        description="Optional contact information displayed on this location page."
      >
        <div className="grid gap-5 md:grid-cols-2">
          <div>
            <label className={labelClass}>
              Phone
            </label>

            <input
              type="tel"
              {...register("phone")}
              placeholder="+91 98765 43210"
              className={inputClass}
            />
          </div>

          <div>
            <label className={labelClass}>
              Email
            </label>

            <input
              type="email"
              {...register("email")}
              placeholder="hello@amandigitalsolutions.com"
              className={inputClass}
            />

            <FieldError
              message={errors.email?.message}
            />
          </div>
        </div>
      </Section>

      {/* SERVICES */}
      <Section
        number="06"
        title="Related services"
        description="Connect this location with the services Aman Digital Solutions provides there."
      >
    <ServiceSelector
  value={watch("services") ?? []}
  onChange={(items) =>
    setValue("services", items, {
      shouldDirty: true,
      shouldValidate: true,
    })
  }
/>
      </Section>

      {/* PUBLISHING */}
      <Section
        number="07"
        title="Publishing & display"
        description="Control visibility and ordering of the location."
      >
        <div className="grid gap-4 md:grid-cols-3">
          <label className="flex cursor-pointer items-center gap-3 rounded-xl border border-[#252525] bg-[#080808] p-4">
            <input
              type="checkbox"
              {...register("published")}
              className="h-4 w-4 accent-[#FFC400]"
            />

            <div>
              <p className="text-sm font-medium">
                Published
              </p>

              <p className="mt-1 text-xs text-white/30">
                Visible on the website
              </p>
            </div>
          </label>

          <label className="flex cursor-pointer items-center gap-3 rounded-xl border border-[#252525] bg-[#080808] p-4">
            <input
              type="checkbox"
              {...register("featured")}
              className="h-4 w-4 accent-[#FFC400]"
            />

            <div>
              <p className="text-sm font-medium">
                Featured
              </p>

              <p className="mt-1 text-xs text-white/30">
                Highlight this location
              </p>
            </div>
          </label>

          <div>
            <label className={labelClass}>
              Display order
            </label>

            <input
              type="number"
              min={0}
              {...register("displayOrder", {
                valueAsNumber: true,
              })}
              className={inputClass}
            />
          </div>
        </div>
      </Section>

      {/* SEO */}
      <Section
        number="08"
        title="SEO & social sharing"
        description="Control local search metadata and social previews."
      >
        <div className="grid gap-5">
          <div>
            <label className={labelClass}>
              SEO title
            </label>

            <input
              {...register("seoTitle")}
              placeholder="Website Development Services in Shimla | Aman Digital Solutions"
              className={inputClass}
            />

            <p className="mt-1.5 text-xs text-white/30">
              Keep the title specific to the location and service intent.
            </p>
          </div>

          <div>
            <label className={labelClass}>
              SEO description
            </label>

            <textarea
              {...register("seoDescription")}
              rows={3}
              placeholder="Professional website development and digital solutions for businesses in Shimla..."
              className={textareaClass}
            />

            <p className="mt-1.5 text-xs text-white/30">
              Write a natural description. Do not keyword-stuff.
            </p>
          </div>

          <div>
            <label className={labelClass}>
              Canonical URL
            </label>

            <input
              {...register("canonicalUrl")}
              readOnly
              className={`${inputClass} cursor-default text-white/50`}
            />

            <p className="mt-1.5 text-xs text-white/30">
              Automatically generated from the location slug.
            </p>
          </div>

          <div className="grid gap-5 md:grid-cols-2">
            <div>
              <label className={labelClass}>
                OG title
              </label>

              <input
                {...register("ogTitle")}
                placeholder="Aman Digital Solutions in Shimla"
                className={inputClass}
              />
            </div>

            <div>
              <label className={labelClass}>
                OG description
              </label>

              <input
                {...register("ogDescription")}
                placeholder="Digital solutions for businesses in Shimla."
                className={inputClass}
              />
            </div>
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
        </div>
      </Section>

      {/* ACTION BAR */}
      <div className="sticky bottom-4 z-20 flex flex-col gap-4 rounded-2xl border border-[#252525] bg-[#0B0B0B]/95 p-4 shadow-2xl backdrop-blur-md sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-sm font-medium">
            Ready to create this location?
          </p>

          <p className="mt-1 text-xs text-white/30">
            The location will be stored in the Locations CMS.
          </p>
        </div>

        <div className="flex gap-3">
          <button
            type="button"
            onClick={() => router.back()}
            disabled={saving}
            className="rounded-xl border border-[#303030] px-5 py-3 text-sm font-medium text-white/70 transition hover:border-[#555] hover:text-white disabled:opacity-50"
          >
            Cancel
          </button>

          <button
            type="submit"
            disabled={saving}
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#FFC400] px-6 py-3 text-sm font-semibold text-black transition hover:bg-[#FFD43B] disabled:cursor-not-allowed disabled:opacity-60"
          >
            {saving ? (
              <>
                <span className="h-4 w-4 animate-spin rounded-full border-2 border-black/30 border-t-black" />
                Creating...
              </>
            ) : (
              <>
                <Check size={17} />
                Create Location
              </>
            )}
          </button>
        </div>
      </div>
    </form>
  );
}

/* -------------------------------------------------------------------------- */
/* SERVICE SELECTOR                                                           */
/* -------------------------------------------------------------------------- */

function ServiceSelector({
  value,
  onChange,
}: {
  value: string[];
  onChange: (value: string[]) => void;
}) {
  const [services, setServices] = useState<
    { _id: string; title: string }[]
  >([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let active = true;

    const loadServices = async () => {
      try {
        const response = await fetch(
          "/api/admin/services/options"
        );

        if (!response.ok) {
          throw new Error(
            "Unable to load services."
          );
        }

        const data = await response.json();

        if (active) {
          setServices(data.services ?? []);
        }
      } catch {
        if (active) {
          setError(
            "Unable to load services. You can still create the location without a service relationship."
          );
        }
      } finally {
        if (active) {
          setLoading(false);
        }
      }
    };

    void loadServices();

    return () => {
      active = false;
    };
  }, []);

  const toggle = (id: string) => {
    if (value.includes(id)) {
      onChange(
        value.filter((item) => item !== id)
      );
      return;
    }

    onChange([...value, id]);
  };

  if (loading) {
    return (
      <div className="rounded-xl border border-[#252525] bg-[#080808] p-5 text-sm text-white/40">
        Loading services...
      </div>
    );
  }

  if (error) {
    return (
      <div className="rounded-xl border border-yellow-500/20 bg-yellow-500/5 p-4 text-xs leading-5 text-yellow-300/70">
        {error}
      </div>
    );
  }

  if (services.length === 0) {
    return (
      <div className="rounded-xl border border-[#252525] bg-[#080808] p-5 text-sm leading-6 text-white/40">
        No services available yet. Create services first to
        connect them with this location.
      </div>
    );
  }

  return (
    <div className="grid gap-3 md:grid-cols-2">
      {services.map((service) => {
        const selected = value.includes(
          service._id
        );

        return (
          <button
            key={service._id}
            type="button"
            onClick={() =>
              toggle(service._id)
            }
            className={`flex items-center justify-between rounded-xl border p-4 text-left transition ${
              selected
                ? "border-[#FFC400]/50 bg-[#FFC400]/5"
                : "border-[#252525] bg-[#080808] hover:border-[#404040]"
            }`}
          >
            <span
              className={`text-sm ${
                selected
                  ? "text-[#FFC400]"
                  : "text-white/70"
              }`}
            >
              {service.title}
            </span>

            <span
              className={`flex h-5 w-5 items-center justify-center rounded-md border ${
                selected
                  ? "border-[#FFC400] bg-[#FFC400] text-black"
                  : "border-[#404040]"
              }`}
            >
              {selected && <Check size={13} />}
            </span>
          </button>
        );
      })}
    </div>
  );
}