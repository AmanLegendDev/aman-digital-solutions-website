"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  Check,
  GripVertical,
  ImagePlus,
  Plus,
  Trash2,
  Video,
} from "lucide-react";
import { useFieldArray, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { projectSchema } from "@/schemas/project.schema";
import type { z } from "zod";

import { createProject } from "@/actions/project.actions";

import CloudinaryImageUploader from "@/components/admin/media/CloudinaryImageUploader";

type FormValues = z.input<typeof projectSchema>;

const SITE_URL = "https://amandigitalsolutions.com";

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
          <h2 className="text-lg font-semibold">{title}</h2>
          <p className="mt-1 max-w-2xl text-sm leading-5 text-white/40">
            {description}
          </p>
        </div>
      </div>

      {children}
    </section>
  );
}

function FieldError({ message }: { message?: string }) {
  if (!message) return null;

  return (
    <p className="mt-1.5 text-xs text-red-400">
      {message}
    </p>
  );
}

type ProjectFormProps = {
  mode?: "create" | "edit";
  projectId?: string;
  initialData?: Partial<FormValues>;
};

export default function ProjectForm({
  mode = "create",
  projectId,
  initialData,
}: ProjectFormProps) {
  const router = useRouter();

  const [serverError, setServerError] = useState("");
  const [saving, setSaving] = useState(false);
  const [slugManuallyEdited, setSlugManuallyEdited] =
    useState(false);

  const {
    register,
    control,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
 } = useForm<
  z.input<typeof projectSchema>,
  unknown,
  z.output<typeof projectSchema>
>({
  resolver: zodResolver(projectSchema),

defaultValues: {
  title: initialData?.title ?? "",
  slug: initialData?.slug ?? "",
  client: initialData?.client ?? "",
  industry: initialData?.industry ?? "",
  shortDescription:
    initialData?.shortDescription ?? "",
  overview:
    initialData?.overview ?? "",
  challenge:
    initialData?.challenge ?? "",
  solution:
    initialData?.solution ?? "",

  features:
    initialData?.features ?? [],

  technologies:
    initialData?.technologies ?? [],

  coverImage:
    initialData?.coverImage,

  gallery:
    initialData?.gallery ?? [],

  liveUrl:
    initialData?.liveUrl ?? "",

  githubUrl:
    initialData?.githubUrl ?? "",

  services:
    initialData?.services ?? [],

  results:
    initialData?.results ?? [],

  featured:
    initialData?.featured ?? false,

  published:
    initialData?.published ?? false,

  displayOrder:
    initialData?.displayOrder ?? 0,

  seoTitle:
    initialData?.seoTitle ?? "",

  seoDescription:
    initialData?.seoDescription ?? "",

  canonicalUrl:
    initialData?.canonicalUrl ?? "",

  ogTitle:
    initialData?.ogTitle ?? "",

  ogDescription:
    initialData?.ogDescription ?? "",

  ogImage:
    initialData?.ogImage,
},
  });

  const features = useFieldArray({
    control,
    name: "features",
  });

  const results = useFieldArray({
    control,
    name: "results",
  });

  const title = watch("title");
  const slug = watch("slug");
  const coverImage = watch("coverImage");
  const ogImage = watch("ogImage");

  useEffect(() => {
    if (slugManuallyEdited) return;

    setValue("slug", slugify(title), {
      shouldDirty: true,
      shouldValidate: true,
    });
  }, [title, slugManuallyEdited, setValue]);

  useEffect(() => {
    if (!slug) {
      setValue("canonicalUrl", "");
      return;
    }

    setValue(
      "canonicalUrl",
      `${SITE_URL}/projects/${slug}`,
      {
        shouldValidate: true,
      }
    );
  }, [slug, setValue]);

 const submit = async (
  values: z.output<typeof projectSchema>,
) => {
  setSaving(true);
  setServerError("");

  try {
    const response = await fetch(
      mode === "edit"
        ? `/api/admin/projects/${projectId}`
        : "/api/admin/projects",
      {
        method:
          mode === "edit"
            ? "PATCH"
            : "POST",

        headers: {
          "Content-Type":
            "application/json",
        },

        body: JSON.stringify(values),
      },
    );

    const result =
      await response.json();

    if (
      !response.ok ||
      !result.success
    ) {
      setServerError(
        result.error ||
          `Unable to ${
            mode === "edit"
              ? "update"
              : "create"
          } project.`,
      );

      return;
    }

    router.push("/admin/projects");
    router.refresh();
  } catch (error) {
    console.error(error);

    setServerError(
      "Something went wrong. Please try again.",
    );
  } finally {
    setSaving(false);
  }
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

      {/* 01 BASIC */}
      <Section
        number="01"
        title="Project information"
        description="The core identity of the project and the information used throughout the portfolio."
      >
        <div className="grid gap-5">
          <div>
            <label className={labelClass}>
              Project title *
            </label>

            <input
              {...register("title")}
              placeholder="e.g. Altitude Escapes"
              className={inputClass}
            />

            <FieldError message={errors.title?.message} />
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
              placeholder="altitude-escapes"
              className={inputClass}
            />

            <div className="mt-2 flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
              <p className="text-xs text-white/30">
                Automatically generated from the project title.
              </p>

              {slug && (
                <p className="text-xs text-[#FFC400]/70">
                  /projects/{slug}
                </p>
              )}
            </div>

            <FieldError message={errors.slug?.message} />
          </div>

          <div className="grid gap-5 md:grid-cols-2">
            <div>
              <label className={labelClass}>
                Client
              </label>

              <input
                {...register("client")}
                placeholder="Client / business name"
                className={inputClass}
              />
            </div>

            <div>
              <label className={labelClass}>
                Industry
              </label>

              <input
                {...register("industry")}
                placeholder="Travel, Restaurant, Automotive..."
                className={inputClass}
              />
            </div>
          </div>

          <div>
            <label className={labelClass}>
              Short description *
            </label>

            <textarea
              {...register("shortDescription")}
              rows={3}
              placeholder="A concise summary of what was built..."
              className={textareaClass}
            />

            <FieldError
              message={errors.shortDescription?.message}
            />
          </div>

          <div>
            <label className={labelClass}>
              Project overview *
            </label>

            <textarea
              {...register("overview")}
              rows={7}
              placeholder="Explain the project, its purpose, audience and business context..."
              className={textareaClass}
            />

            <FieldError
              message={errors.overview?.message}
            />
          </div>
        </div>
      </Section>

      {/* 02 CASE STUDY */}
      <Section
        number="02"
        title="Case study"
        description="Document the real problem and the solution delivered."
      >
        <div className="grid gap-5">
          <div>
            <label className={labelClass}>
              Challenge
            </label>

            <textarea
              {...register("challenge")}
              rows={6}
              placeholder="What problem or limitation existed before the project?"
              className={textareaClass}
            />
          </div>

          <div>
            <label className={labelClass}>
              Solution
            </label>

            <textarea
              {...register("solution")}
              rows={7}
              placeholder="What did we build and how did it solve the problem?"
              className={textareaClass}
            />
          </div>
        </div>
      </Section>

      {/* 03 COVER */}
      <Section
        number="03"
        title="Cover image"
        description="The primary project image used for portfolio cards and the project hero."
      >
        <CloudinaryImageUploader
          label="Project cover image"
          description="JPG, PNG, WebP or AVIF · Maximum 5MB"
          value={coverImage}
          onChange={(value) => {
            setValue("coverImage", value, {
              shouldDirty: true,
              shouldValidate: true,
            });
          }}
        />

        <div className="mt-5">
          <label className={labelClass}>
            Cover image alt text
          </label>

          <input
            {...register("coverImage.alt")}
            placeholder="Homepage of the completed project"
            className={inputClass}
          />

          <p className="mt-1.5 text-xs text-white/30">
            Use a meaningful description. Avoid filenames like IMG_8372.
          </p>
        </div>
      </Section>

      {/* 04 FEATURES */}
      <Section
        number="04"
        title="Project features"
        description="Highlight the important functionality actually delivered."
      >
        <div className="space-y-4">
          {features.fields.map((field, index) => (
            <div
              key={field.id}
              className="rounded-xl border border-[#252525] bg-[#080808] p-4"
            >
              <div className="mb-4 flex items-center justify-between">
                <div className="flex items-center gap-2 text-xs font-medium uppercase tracking-wider text-[#FFC400]">
                  <GripVertical size={14} />
                  Feature {index + 1}
                </div>

                <button
                  type="button"
                  onClick={() => features.remove(index)}
                  className="rounded-lg p-2 text-white/30 transition hover:bg-red-500/10 hover:text-red-400"
                >
                  <Trash2 size={16} />
                </button>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <input
                  {...register(`features.${index}.title`)}
                  placeholder="Feature title"
                  className={inputClass}
                />

                <input
                  {...register(`features.${index}.icon`)}
                  placeholder="Optional Lucide icon"
                  className={inputClass}
                />

                <textarea
                  {...register(
                    `features.${index}.description`
                  )}
                  rows={3}
                  placeholder="Describe the feature..."
                  className={`${textareaClass} md:col-span-2`}
                />
              </div>
            </div>
          ))}

          <button
            type="button"
            onClick={() =>
              features.append({
                title: "",
                description: "",
                icon: "",
              })
            }
            className="inline-flex items-center gap-2 rounded-xl border border-[#303030] px-4 py-2.5 text-sm text-white/70 transition hover:border-[#FFC400]/40 hover:text-[#FFC400]"
          >
            <Plus size={16} />
            Add feature
          </button>
        </div>
      </Section>

     {/* 05 TECHNOLOGIES */}
<Section
  number="05"
  title="Technologies"
  description="Add the technologies, frameworks, databases and tools actually used to build this project."
>
  <TechnologyInput
    value={watch("technologies") ?? []}
    onChange={(items) =>
      setValue("technologies", items, {
        shouldDirty: true,
        shouldValidate: true,
      })
    }
  />

  <FieldError
    message={errors.technologies?.message}
  />
</Section>

     
   
      {/* 06 GALLERY */}
<Section
  number="06"
  title="Project gallery"
  description="Add project images and videos. Every gallery item can have its own title for the portfolio presentation."
>
  <GalleryCollectionInput
    value={watch("gallery") ?? []}
    onChange={(items) =>
      setValue("gallery", items, {
        shouldDirty: true,
        shouldValidate: true,
      })
    }
  />

  <FieldError
    message={errors.gallery?.message}
  />
</Section>

      {/* 08 LINKS */}
      <Section
        number="08"
        title="Project links"
        description="Add the live project and source repository when appropriate."
      >
        <div className="grid gap-5 md:grid-cols-2">
          <div>
            <label className={labelClass}>
              Live website
            </label>

            <input
              {...register("liveUrl")}
              placeholder="https://example.com"
              className={inputClass}
            />

            <FieldError
              message={errors.liveUrl?.message}
            />
          </div>

          <div>
            <label className={labelClass}>
              GitHub repository
            </label>

            <input
              {...register("githubUrl")}
              placeholder="https://github.com/..."
              className={inputClass}
            />

            <FieldError
              message={errors.githubUrl?.message}
            />
          </div>
        </div>
      </Section>

      {/* 09 SERVICES */}
      <Section
        number="09"
        title="Related services"
        description="Connect this project with the services delivered. The actual service relationship will be selected from the Services CMS."
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

      {/* 10 RESULTS */}
      <Section
        number="10"
        title="Results"
        description="Add measurable outcomes only when they are genuinely available."
      >
        <div className="mb-5 rounded-xl border border-[#FFC400]/10 bg-[#FFC400]/5 px-4 py-3 text-xs leading-5 text-white/50">
          Do not invent metrics. If there are no verified results,
          simply leave this section empty.
        </div>

        <div className="space-y-4">
          {results.fields.map((field, index) => (
            <div
              key={field.id}
              className="rounded-xl border border-[#252525] bg-[#080808] p-4"
            >
              <div className="mb-4 flex items-center justify-between">
                <span className="text-xs font-medium uppercase tracking-wider text-[#FFC400]">
                  Result {index + 1}
                </span>

                <button
                  type="button"
                  onClick={() => results.remove(index)}
                  className="rounded-lg p-2 text-white/30 transition hover:bg-red-500/10 hover:text-red-400"
                >
                  <Trash2 size={16} />
                </button>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <input
                  {...register(`results.${index}.label`)}
                  placeholder="Metric label"
                  className={inputClass}
                />

                <input
                  {...register(`results.${index}.value`)}
                  placeholder="96/100"
                  className={inputClass}
                />

                <textarea
                  {...register(
                    `results.${index}.description`
                  )}
                  rows={2}
                  placeholder="Optional explanation..."
                  className={`${textareaClass} md:col-span-2`}
                />
              </div>
            </div>
          ))}

          <button
            type="button"
            onClick={() =>
              results.append({
                label: "",
                value: "",
                description: "",
              })
            }
            className="inline-flex items-center gap-2 rounded-xl border border-[#303030] px-4 py-2.5 text-sm text-white/70 transition hover:border-[#FFC400]/40 hover:text-[#FFC400]"
          >
            <Plus size={16} />
            Add verified result
          </button>
        </div>
      </Section>

      {/* 11 PUBLISH */}
      <Section
        number="11"
        title="Publishing"
        description="Control whether the project appears publicly and where it is prioritized."
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
                Highlight this project
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

      {/* 12 SEO */}
      <Section
        number="12"
        title="SEO & social sharing"
        description="Define how the project appears in search engines and social previews."
      >
        <div className="grid gap-5">
          <div>
            <label className={labelClass}>
              SEO title
            </label>

            <input
              {...register("seoTitle")}
              placeholder="Altitude Escapes Website Case Study | Aman Digital Solutions"
              className={inputClass}
            />

            <p className="mt-1.5 text-xs text-white/30">
              Keep it concise, descriptive and specific to the project.
            </p>
          </div>

          <div>
            <label className={labelClass}>
              SEO description
            </label>

            <textarea
              {...register("seoDescription")}
              rows={3}
              placeholder="Explore how Aman Digital Solutions built..."
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
              Automatically generated from the project slug.
            </p>
          </div>

          <div className="grid gap-5 md:grid-cols-2">
            <div>
              <label className={labelClass}>
                OG title
              </label>

              <input
                {...register("ogTitle")}
                placeholder="A premium website built for..."
                className={inputClass}
              />
            </div>

            <div>
              <label className={labelClass}>
                OG description
              </label>

              <input
                {...register("ogDescription")}
                placeholder="See the project, technology and results..."
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

      {/* ACTION */}
      <div className="sticky bottom-4 z-20 flex flex-col gap-4 rounded-2xl border border-[#252525] bg-[#0B0B0B]/95 p-4 shadow-2xl backdrop-blur-md sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-sm font-medium">
            {mode === "edit"
  ? "Ready to update this project?"
  : "Ready to create this project?"}
          </p>

          <p className="mt-1 text-xs text-white/30">
            {mode === "edit"
  ? "Your changes will be saved to the Portfolio CMS."
  : "The project will be stored in the Portfolio CMS."}
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

    {mode === "edit"
      ? "Saving..."
      : "Creating..."}
  </>
) : (
  <>
    <Check size={17} />

    {mode === "edit"
      ? "Save Changes"
      : "Create Project"}
  </>
)}
          </button>
        </div>
      </div>
    </form>
  );
}

/* -------------------------------------------------------------------------- */
/* TECHNOLOGIES                                                               */
/* -------------------------------------------------------------------------- */

function TechnologyInput({
  value,
  onChange,
}: {
  value: string[];
  onChange: (value: string[]) => void;
}) {
  const [input, setInput] = useState("");

  const add = () => {
    const clean = input.trim();

    if (!clean) return;

    const exists = value.some(
      (item) => item.toLowerCase() === clean.toLowerCase()
    );

    if (exists) {
      setInput("");
      return;
    }

    onChange([...value, clean]);
    setInput("");
  };

  const remove = (index: number) => {
    onChange(value.filter((_, i) => i !== index));
  };

  return (
    <div>
      <div className="flex gap-2">
        <input
          value={input}
          onChange={(event) => setInput(event.target.value)}
          onKeyDown={(event) => {
            if (event.key === "Enter") {
              event.preventDefault();
              add();
            }
          }}
          placeholder="Next.js"
          className={inputClass}
        />

        <button
          type="button"
          onClick={add}
          className="shrink-0 rounded-xl bg-[#FFC400] px-4 text-black transition hover:bg-[#FFD43B]"
        >
          <Plus size={18} />
        </button>
      </div>

      {value.length > 0 && (
        <div className="mt-4 flex flex-wrap gap-2">
          {value.map((technology, index) => (
            <span
              key={`${technology}-${index}`}
              className="inline-flex items-center gap-2 rounded-full border border-[#303030] bg-[#111] px-3 py-1.5 text-xs text-white/70"
            >
              {technology}

              <button
                type="button"
                onClick={() => remove(index)}
                className="text-white/30 transition hover:text-red-400"
              >
                ×
              </button>
            </span>
          ))}
        </div>
      )}

      <p className="mt-2 text-xs text-white/30">
        Press Enter or + to add each technology.
      </p>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* IMAGE COLLECTION                                                           */
/* -------------------------------------------------------------------------- */

type ImageValue = {
  url: string;
  publicId?: string;
  alt?: string;
};


/* -------------------------------------------------------------------------- */
/* GALLERY COLLECTION                                                         */
/* -------------------------------------------------------------------------- */

type GalleryValue = {
  type: "image" | "video";
  url: string;
  publicId?: string;
  title: string;
};

function GalleryCollectionInput({
  value,
  onChange,
}: {
  value: GalleryValue[];
  onChange: (value: GalleryValue[]) => void;
}) {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");

  const upload = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const files = Array.from(
      event.target.files ?? []
    );

    if (!files.length) return;

    setError("");
    setUploading(true);

    try {
      const uploaded: GalleryValue[] = [];

      for (const file of files) {
        const isImage =
          file.type.startsWith("image/");

        const isVideo =
          file.type.startsWith("video/");

        if (!isImage && !isVideo) {
          throw new Error(
            "Only image and video files are allowed."
          );
        }

        const maxSize = isVideo
          ? 50 * 1024 * 1024
          : 5 * 1024 * 1024;

        if (file.size > maxSize) {
          throw new Error(
            `${file.name} is larger than the ${
              isVideo ? "50MB" : "5MB"
            } limit.`
          );
        }

     const formData = new FormData();

formData.append("file", file);

formData.append(
  "type",
  isVideo ? "video" : "image"
);

const response = await fetch(
  "/api/upload/media",
  {
    method: "POST",
    body: formData,
  }
);

        const result =
          await response.json();

        if (
          !response.ok ||
          !result.success
        ) {
          throw new Error(
            result.error ??
              "Gallery upload failed."
          );
        }

        uploaded.push({
          type: isVideo
            ? "video"
            : "image",
          url: result.url,
          publicId: result.publicId,
          title: "",
        });
      }

      onChange([
        ...value,
        ...uploaded,
      ]);
    } catch (uploadError) {
      setError(
        uploadError instanceof Error
          ? uploadError.message
          : "Gallery upload failed."
      );
    } finally {
      setUploading(false);
      event.target.value = "";
    }
  };

  const remove = (index: number) => {
    onChange(
      value.filter(
        (_, currentIndex) =>
          currentIndex !== index
      )
    );
  };

  const updateTitle = (
    index: number,
    title: string
  ) => {
    const next = [...value];

    next[index] = {
      ...next[index],
      title,
    };

    onChange(next);
  };

  return (
    <div>
      <label className={labelClass}>
        Project gallery
      </label>

      {/* UPLOAD */}
      <label
        className={[
          "flex min-h-[170px] cursor-pointer",
          "flex-col items-center justify-center",
          "rounded-2xl border border-dashed",
          "border-[#303030] bg-[#080808]",
          "px-6 text-center transition",
          "hover:border-[#FFC400]/50",
          "hover:bg-[#0D0D0D]",
        ].join(" ")}
      >
        <input
          type="file"
          accept={[
            "image/jpeg",
            "image/png",
            "image/webp",
            "image/avif",
            "video/mp4",
            "video/webm",
            "video/quicktime",
          ].join(",")}
          multiple
          onChange={upload}
          disabled={uploading}
          className="hidden"
        />

        {uploading ? (
          <>
            <div className="mb-3 h-6 w-6 animate-spin rounded-full border-2 border-white/20 border-t-[#FFC400]" />

            <p className="text-sm text-white/70">
              Uploading gallery media...
            </p>
          </>
        ) : (
          <>
            <div className="mb-4 flex items-center gap-2">
              <span className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/[0.08] bg-white/[0.03] text-white/40">
                <ImagePlus size={18} />
              </span>

              <span className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/[0.08] bg-white/[0.03] text-white/40">
                <Video size={18} />
              </span>
            </div>

            <p className="text-sm font-medium text-white/70">
              Click to add images or videos
            </p>

            <p className="mt-1 text-xs text-white/30">
              Images up to 5MB · Videos up to 50MB
            </p>
          </>
        )}
      </label>

      {/* ERROR */}
      {error && (
        <div className="mt-3 rounded-xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-xs text-red-300">
          {error}
        </div>
      )}

      {/* EMPTY */}
      {value.length === 0 ? (
        <p className="mt-3 text-xs text-white/30">
          No gallery media added yet.
        </p>
      ) : (
        <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {value.map((item, index) => (
            <div
              key={`${item.publicId ?? item.url}-${index}`}
              className="overflow-hidden rounded-2xl border border-[#252525] bg-[#080808]"
            >
              {/* PREVIEW */}
              <div className="relative aspect-video bg-black">
                {item.type === "video" ? (
                  <video
                    src={item.url}
                    controls
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <img
                    src={item.url}
                    alt={
                      item.title ||
                      `Gallery item ${index + 1}`
                    }
                    className="h-full w-full object-cover"
                  />
                )}

                {/* TYPE BADGE */}
                <span className="absolute left-2 top-2 rounded-full border border-white/10 bg-black/70 px-2.5 py-1 text-[9px] font-semibold uppercase tracking-[0.12em] text-white/70 backdrop-blur">
                  {item.type}
                </span>

                {/* REMOVE */}
                <button
                  type="button"
                  onClick={() =>
                    remove(index)
                  }
                  className="absolute right-2 top-2 rounded-lg border border-white/10 bg-black/70 p-2 text-white/60 backdrop-blur transition hover:bg-red-500/80 hover:text-white"
                  aria-label={`Remove gallery item ${
                    index + 1
                  }`}
                >
                  <Trash2 size={14} />
                </button>
              </div>

              {/* TITLE */}
              <div className="p-3">
                <label className="mb-2 block text-[10px] font-semibold uppercase tracking-[0.14em] text-white/40">
                  Gallery title
                </label>

                <input
                  value={item.title}
                  onChange={(event) =>
                    updateTitle(
                      index,
                      event.target.value
                    )
                  }
                  placeholder={
                    item.type === "video"
                      ? "e.g. Dashboard walkthrough"
                      : "e.g. Homepage desktop view"
                  }
                  className="w-full rounded-lg border border-[#252525] bg-[#0D0D0D] px-3 py-2.5 text-xs text-white outline-none placeholder:text-white/20 focus:border-[#FFC400]/50"
                />

                {!item.title.trim() && (
                  <p className="mt-1.5 text-[10px] text-white/25">
                    Add a title for this gallery item.
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
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
          throw new Error("Unable to load services.");
        }

        const data = await response.json();

        if (active) {
          setServices(data.services ?? []);
        }
      } catch {
        if (active) {
          setError(
            "Unable to load services. You can still create the project without a service relationship."
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
      onChange(value.filter((item) => item !== id));
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
      <div className="rounded-xl border border-[#252525] bg-[#080808] p-5 text-sm text-white/40">
        No services available yet. Create services first to connect them with projects.
      </div>
    );
  }

  return (
    <div className="grid gap-3 md:grid-cols-2">
      {services.map((service) => {
        const selected = value.includes(service._id);

        return (
          <button
            key={service._id}
            type="button"
            onClick={() => toggle(service._id)}
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