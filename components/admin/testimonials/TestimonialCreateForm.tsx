"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Check, Star } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { testimonialSchema } from "@/schemas/testimonial.schema";
import type { z } from "zod";

import { createTestimonial } from "@/actions/testimonial.actions";

import CloudinaryImageUploader from "@/components/admin/media/CloudinaryImageUploader";

type FormValues = z.input<typeof testimonialSchema>;

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

export default function TestimonialCreateForm() {
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
  z.input<typeof testimonialSchema>,
  unknown,
  z.output<typeof testimonialSchema>
>({
  resolver: zodResolver(testimonialSchema),

  defaultValues: {
      name: "",
      slug: "",

      role: "",
      company: "",
      location: "",

      quote: "",

      rating: undefined,

      project: "",

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
  const rating = watch("rating");
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
      `${SITE_URL}/testimonials/${slug}`,
      {
        shouldValidate: true,
      }
    );
  }, [slug, setValue]);

 const submit = async (
  values: z.output<typeof testimonialSchema>
) => {
    setSaving(true);
    setServerError("");

    const result = await createTestimonial(values);

    if (!result.success) {
      setServerError(result.error);
      setSaving(false);
      return;
    }

    router.push("/admin/testimonials");
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

      {/* CLIENT */}
      <Section
        number="01"
        title="Client information"
        description="Add the real person behind the testimonial and the context that should appear with their feedback."
      >
        <div className="grid gap-5">
          <div>
            <label className={labelClass}>
              Client name *
            </label>

            <input
              {...register("name")}
              placeholder="e.g. Ankit Sharma"
              className={inputClass}
            />

            <FieldError
              message={errors.name?.message}
            />
          </div>

          <div>
            <label className={labelClass}>
              Testimonial slug *
            </label>

            <input
              {...register("slug", {
                onChange: () => {
                  setSlugManuallyEdited(true);
                },
              })}
              placeholder="ankit-sharma"
              className={inputClass}
            />

            <div className="mt-2 flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
              <p className="text-xs text-white/30">
                Automatically generated from the client name.
              </p>

              {slug && (
                <p className="text-xs text-[#FFC400]/70">
                  /testimonials/{slug}
                </p>
              )}
            </div>

            <FieldError
              message={errors.slug?.message}
            />
          </div>

          <div className="grid gap-5 md:grid-cols-2">
            <div>
              <label className={labelClass}>
                Role / designation
              </label>

              <input
                {...register("role")}
                placeholder="e.g. Founder"
                className={inputClass}
              />
            </div>

            <div>
              <label className={labelClass}>
                Company / business
              </label>

              <input
                {...register("company")}
                placeholder="e.g. Sharma Bakery"
                className={inputClass}
              />
            </div>
          </div>

          <div>
            <label className={labelClass}>
              Location
            </label>

            <input
              {...register("location")}
              placeholder="e.g. Shimla, Himachal Pradesh"
              className={inputClass}
            />
          </div>
        </div>
      </Section>

      {/* QUOTE */}
      <Section
        number="02"
        title="Client feedback"
        description="Add the genuine testimonial exactly as provided by the client. Do not manufacture reviews."
      >
        <div>
          <label className={labelClass}>
            Testimonial *
          </label>

          <textarea
            {...register("quote")}
            rows={8}
            placeholder="Enter the client's genuine feedback about working with Aman Digital Solutions..."
            className={textareaClass}
          />

          <div className="mt-2 flex items-center justify-between">
            <FieldError
              message={errors.quote?.message}
            />

            <span className="ml-auto text-xs text-white/25">
              Maximum 1000 characters
            </span>
          </div>
        </div>
      </Section>

      {/* IMAGE */}
      <Section
        number="03"
        title="Client image"
        description="Upload the client's approved profile or testimonial image."
      >
        <CloudinaryImageUploader
          label="Client image"
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
            placeholder="Portrait of Ankit Sharma"
            className={inputClass}
          />

          <p className="mt-1.5 text-xs text-white/30">
            Use descriptive alt text. Leave the image empty if no approved
            client image is available.
          </p>
        </div>
      </Section>

      {/* RATING */}
      <Section
        number="04"
        title="Rating & project"
        description="Store rating and the project associated with the testimonial when applicable."
      >
        <div className="grid gap-5 md:grid-cols-2">
          <div>
            <label className={labelClass}>
              Rating
            </label>

            <div className="rounded-xl border border-[#292929] bg-[#0D0D0D] p-4">
              <div className="flex items-center gap-2">
                {[1, 2, 3, 4, 5].map(
                  (star) => (
                    <button
                      key={star}
                      type="button"
                      aria-label={`Set rating to ${star}`}
                      onClick={() =>
                        setValue(
                          "rating",
                          star,
                          {
                            shouldDirty: true,
                            shouldValidate: true,
                          }
                        )
                      }
                      className="transition hover:scale-110"
                    >
                      <Star
                        size={24}
                        fill={
                          rating &&
                          star <= rating
                            ? "currentColor"
                            : "none"
                        }
                        className={
                          rating &&
                          star <= rating
                            ? "text-[#FFC400]"
                            : "text-white/20"
                        }
                      />
                    </button>
                  )
                )}

                {rating && (
                  <button
                    type="button"
                    onClick={() =>
                      setValue(
                        "rating",
                        undefined,
                        {
                          shouldDirty: true,
                          shouldValidate: true,
                        }
                      )
                    }
                    className="ml-2 text-xs text-white/30 transition hover:text-white"
                  >
                    Clear
                  </button>
                )}
              </div>

              <p className="mt-3 text-xs text-white/30">
                Rating is optional. Only use a genuine rating provided by the client.
              </p>
            </div>

            <FieldError
              message={errors.rating?.message}
            />
          </div>

          <div>
            <label className={labelClass}>
              Project
            </label>

            <input
              {...register("project")}
              placeholder="e.g. Digital Menu & Restaurant Ordering System"
              className={inputClass}
            />

            <p className="mt-2 text-xs text-white/30">
              Optional project name associated with this feedback.
            </p>
          </div>
        </div>
      </Section>

      {/* PUBLISH */}
      <Section
        number="05"
        title="Publishing"
        description="Control whether this testimonial appears publicly and where it is prioritized."
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
                Highlight this testimonial
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
        number="06"
        title="SEO & social sharing"
        description="Control how the testimonial page appears in search engines and social previews."
      >
        <div className="grid gap-5">
          <div>
            <label className={labelClass}>
              SEO title
            </label>

            <input
              {...register("seoTitle")}
              placeholder="Client Testimonial | Aman Digital Solutions"
              className={inputClass}
            />
          </div>

          <div>
            <label className={labelClass}>
              SEO description
            </label>

            <textarea
              {...register("seoDescription")}
              rows={3}
              placeholder="Read what our clients say about working with Aman Digital Solutions..."
              className={textareaClass}
            />
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
              Automatically generated from the testimonial slug.
            </p>
          </div>

          <div className="grid gap-5 md:grid-cols-2">
            <div>
              <label className={labelClass}>
                OG title
              </label>

              <input
                {...register("ogTitle")}
                placeholder="What our clients say about Aman Digital Solutions"
                className={inputClass}
              />
            </div>

            <div>
              <label className={labelClass}>
                OG description
              </label>

              <input
                {...register("ogDescription")}
                placeholder="Real feedback from clients we've worked with."
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
            Ready to publish this testimonial?
          </p>

          <p className="mt-1 text-xs text-white/30">
            The testimonial will be stored in the CMS.
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
                Create Testimonial
              </>
            )}
          </button>
        </div>
      </div>
    </form>
  );
}