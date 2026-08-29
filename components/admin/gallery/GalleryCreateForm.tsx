"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  Check,
  Film,
  ImagePlus,
  Plus,
  Trash2,
  Upload,
} from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { gallerySchema } from "@/schemas/gallery.schema";
import type { z } from "zod";

import { createGallery } from "@/actions/gallery.actions";

import CloudinaryImageUploader from "@/components/admin/media/CloudinaryImageUploader";

type FormValues = z.input<typeof gallerySchema>;

type MediaItem = {
  type: "image" | "video";
  url: string;
  publicId?: string;
  thumbnailUrl?: string;
  thumbnailPublicId?: string;
  alt?: string;
  caption?: string;
  displayOrder: number;
};

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

          <p className="mt-1 max-w-3xl text-sm leading-5 text-white/40">
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

export default function GalleryCreateForm() {
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
  z.input<typeof gallerySchema>,
  unknown,
  z.output<typeof gallerySchema>
>({
  resolver: zodResolver(gallerySchema),

  defaultValues: {
      title: "",
      slug: "",

      shortDescription: "",
      description: "",

      media: [],

      project: "",
      category: "",

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

  const title = watch("title");
  const slug = watch("slug");
  const coverImage = watch("coverImage");
  const ogImage = watch("ogImage");
  const media = watch("media");

  useEffect(() => {
    if (slugManuallyEdited) return;

    setValue("slug", slugify(title), {
      shouldDirty: true,
      shouldValidate: true,
    });
  }, [
    title,
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
      `${SITE_URL}/gallery/${slug}`,
      {
        shouldValidate: true,
      }
    );
  }, [slug, setValue]);

 const submit = async (
  values: z.output<typeof gallerySchema>
) => {
    setSaving(true);
    setServerError("");

    const result = await createGallery(values);

    if (!result.success) {
      setServerError(result.error);
      setSaving(false);
      return;
    }

    router.push("/admin/gallery");
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

      {/* BASIC */}
      <Section
        number="01"
        title="Gallery information"
        description="Define the gallery identity and the content visitors will see."
      >
        <div className="grid gap-5">
          <div>
            <label className={labelClass}>
              Gallery title *
            </label>

            <input
              {...register("title")}
              placeholder="e.g. Digital Menu Project Showcase"
              className={inputClass}
            />

            <FieldError
              message={errors.title?.message}
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
              placeholder="digital-menu-project-showcase"
              className={inputClass}
            />

            <div className="mt-2 flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
              <p className="text-xs text-white/30">
                Automatically generated from the gallery title.
              </p>

              {slug && (
                <p className="text-xs text-[#FFC400]/70">
                  /gallery/{slug}
                </p>
              )}
            </div>

            <FieldError
              message={errors.slug?.message}
            />
          </div>

          <div>
            <label className={labelClass}>
              Short description
            </label>

            <textarea
              {...register("shortDescription")}
              rows={3}
              placeholder="A visual showcase of the project..."
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
              Description
            </label>

            <textarea
              {...register("description")}
              rows={6}
              placeholder="Describe what this gallery contains and what visitors are looking at..."
              className={textareaClass}
            />

            <FieldError
              message={
                errors.description?.message
              }
            />
          </div>
        </div>
      </Section>

      {/* COVER */}
      <Section
        number="02"
        title="Cover image"
        description="The primary image used to represent this gallery in cards, listings and previews."
      >
        <CloudinaryImageUploader
          label="Gallery cover"
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
            Cover alt text
          </label>

          <input
            {...register("coverImage.alt")}
            placeholder="Digital menu website project preview"
            className={inputClass}
          />
        </div>
      </Section>

      {/* MEDIA */}
      <Section
        number="03"
        title="Gallery media"
        description="Upload images and videos together. Every item stays in one ordered media collection."
      >
      <MediaUploader
  value={media ?? []}
  onChange={(items) =>
    setValue("media", items, {
      shouldDirty: true,
      shouldValidate: true,
    })
  }
/>
      </Section>

      {/* RELATIONSHIP */}
      <Section
        number="04"
        title="Project & category"
        description="Optionally connect this gallery with an existing project and organize it by category."
      >
        <div className="grid gap-5 md:grid-cols-2">
          <ProjectSelector
            value={watch("project") ?? ""}
            onChange={(value) =>
              setValue("project", value, {
                shouldDirty: true,
                shouldValidate: true,
              })
            }
          />

          <div>
            <label className={labelClass}>
              Category
            </label>

            <input
              {...register("category")}
              placeholder="Web Design"
              className={inputClass}
            />

            <p className="mt-1.5 text-xs text-white/30">
              Examples: Web Design, Branding, UI/UX, Mobile,
              Dashboard.
            </p>
          </div>
        </div>
      </Section>

      {/* PUBLISH */}
      <Section
        number="05"
        title="Publishing"
        description="Control whether the gallery is publicly visible and where it appears in the gallery order."
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
                Highlight this gallery
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
        description="Control search engine metadata and the social preview for this gallery."
      >
        <div className="grid gap-5">
          <div>
            <label className={labelClass}>
              SEO title
            </label>

            <input
              {...register("seoTitle")}
              placeholder="Digital Menu Project Gallery | Aman Digital Solutions"
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
              placeholder="Explore project screenshots, interfaces and visual work by Aman Digital Solutions..."
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
              Automatically generated from the gallery slug.
            </p>
          </div>

          <div className="grid gap-5 md:grid-cols-2">
            <div>
              <label className={labelClass}>
                OG title
              </label>

              <input
                {...register("ogTitle")}
                placeholder="Aman Digital Solutions — Project Gallery"
                className={inputClass}
              />
            </div>

            <div>
              <label className={labelClass}>
                OG description
              </label>

              <input
                {...register("ogDescription")}
                placeholder="Explore our latest project work."
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
            Ready to create this gallery?
          </p>

          <p className="mt-1 text-xs text-white/30">
            All uploaded media will be stored in the gallery record.
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
                Create Gallery
              </>
            )}
          </button>
        </div>
      </div>
    </form>
  );
}

/* -------------------------------------------------------------------------- */
/* MEDIA UPLOADER                                                             */
/* -------------------------------------------------------------------------- */

function MediaUploader({
  value,
  onChange,
}: {
  value: MediaItem[];
  onChange: (value: MediaItem[]) => void;
}) {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");

  const uploadFiles = async (
    event: React.ChangeEvent<HTMLInputElement>,
    type: "image" | "video"
  ) => {
    const files = Array.from(event.target.files ?? []);

    if (!files.length) return;

    setError("");
    setUploading(true);

    try {
      const uploaded: MediaItem[] = [];

      for (const file of files) {
        const allowed =
          type === "image"
            ? [
                "image/jpeg",
                "image/png",
                "image/webp",
                "image/avif",
              ]
            : [
                "video/mp4",
                "video/webm",
                "video/quicktime",
              ];

        if (!allowed.includes(file.type)) {
          throw new Error(
            type === "image"
              ? "Only JPG, PNG, WebP and AVIF images are allowed."
              : "Only MP4, WebM and MOV videos are allowed."
          );
        }

        const maxSize =
          type === "image"
            ? 5 * 1024 * 1024
            : 50 * 1024 * 1024;

        if (file.size > maxSize) {
          throw new Error(
            `${file.name} is too large.`
          );
        }

        const formData = new FormData();

        formData.append("file", file);
        formData.append("type", type);

        const response = await fetch(
          "/api/upload/media",
          {
            method: "POST",
            body: formData,
          }
        );

        const result = await response.json();

        if (!response.ok || !result.success) {
          throw new Error(
            result.error ??
              "Media upload failed."
          );
        }

        uploaded.push({
          type,
          url: result.url,
          publicId: result.publicId,
          thumbnailUrl:
            result.thumbnailUrl,
          thumbnailPublicId:
            result.thumbnailPublicId,
          displayOrder:
            value.length +
            uploaded.length +
            1,
        });
      }

      onChange([...value, ...uploaded]);
    } catch (uploadError) {
      setError(
        uploadError instanceof Error
          ? uploadError.message
          : "Media upload failed."
      );
    } finally {
      setUploading(false);
      event.target.value = "";
    }
  };

  const remove = (index: number) => {
    const next = value
      .filter((_, i) => i !== index)
      .map((item, index) => ({
        ...item,
        displayOrder: index + 1,
      }));

    onChange(next);
  };

  const move = (
    from: number,
    to: number
  ) => {
    if (
      to < 0 ||
      to >= value.length
    ) {
      return;
    }

    const next = [...value];

    const [item] = next.splice(from, 1);

    next.splice(to, 0, item);

    onChange(
      next.map((media, index) => ({
        ...media,
        displayOrder: index + 1,
      }))
    );
  };

  return (
    <div>
      <div className="grid gap-3 sm:grid-cols-2">
        <label className="flex cursor-pointer items-center justify-center gap-3 rounded-xl border border-dashed border-[#303030] bg-[#080808] px-5 py-4 transition hover:border-[#FFC400]/50 hover:bg-[#0D0D0D]">
          <input
            type="file"
            accept="image/jpeg,image/png,image/webp,image/avif"
            multiple
            onChange={(event) =>
              uploadFiles(event, "image")
            }
            disabled={uploading}
            className="hidden"
          />

          <ImagePlus
            size={18}
            className="text-[#FFC400]"
          />

          <div>
            <p className="text-sm font-medium">
              Add images
            </p>

            <p className="mt-1 text-xs text-white/30">
              Multiple images · Max 5MB each
            </p>
          </div>
        </label>

        <label className="flex cursor-pointer items-center justify-center gap-3 rounded-xl border border-dashed border-[#303030] bg-[#080808] px-5 py-4 transition hover:border-[#FFC400]/50 hover:bg-[#0D0D0D]">
          <input
            type="file"
            accept="video/mp4,video/webm,video/quicktime"
            multiple
            onChange={(event) =>
              uploadFiles(event, "video")
            }
            disabled={uploading}
            className="hidden"
          />

          <Film
            size={18}
            className="text-[#FFC400]"
          />

          <div>
            <p className="text-sm font-medium">
              Add videos
            </p>

            <p className="mt-1 text-xs text-white/30">
              MP4, WebM, MOV · Max 50MB each
            </p>
          </div>
        </label>
      </div>

      {uploading && (
        <div className="mt-4 flex items-center gap-3 rounded-xl border border-[#FFC400]/10 bg-[#FFC400]/5 p-4">
          <span className="h-5 w-5 animate-spin rounded-full border-2 border-white/20 border-t-[#FFC400]" />

          <p className="text-sm text-white/60">
            Uploading media to Cloudinary...
          </p>
        </div>
      )}

      {error && (
        <div className="mt-4 rounded-xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-xs text-red-300">
          {error}
        </div>
      )}

      {value.length === 0 ? (
        <div className="mt-5 rounded-xl border border-[#252525] bg-[#080808] p-8 text-center">
          <Upload
            size={24}
            className="mx-auto mb-3 text-white/20"
          />

          <p className="text-sm text-white/50">
            No media added yet.
          </p>

          <p className="mt-1 text-xs text-white/25">
            Add images or videos above.
          </p>
        </div>
      ) : (
        <div className="mt-5 space-y-4">
          {value.map((item, index) => (
            <MediaCard
              key={`${item.publicId ?? item.url}-${index}`}
              item={item}
              index={index}
              total={value.length}
              onChange={(updated) => {
                const next = [...value];

                next[index] = updated;

                onChange(next);
              }}
              onRemove={() =>
                remove(index)
              }
              onMoveUp={() =>
                move(index, index - 1)
              }
              onMoveDown={() =>
                move(index, index + 1)
              }
            />
          ))}
        </div>
      )}

      {value.length > 0 && (
        <p className="mt-4 text-xs text-white/30">
          {value.length} media item
          {value.length === 1 ? "" : "s"} added.
          Use the arrows to control display order.
        </p>
      )}
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* MEDIA CARD                                                                 */
/* -------------------------------------------------------------------------- */

function MediaCard({
  item,
  index,
  total,
  onChange,
  onRemove,
  onMoveUp,
  onMoveDown,
}: {
  item: MediaItem;
  index: number;
  total: number;
  onChange: (
    value: MediaItem
  ) => void;
  onRemove: () => void;
  onMoveUp: () => void;
  onMoveDown: () => void;
}) {
  return (
    <div className="overflow-hidden rounded-2xl border border-[#252525] bg-[#080808]">
      <div className="grid lg:grid-cols-[280px_1fr]">
        <div className="relative aspect-video overflow-hidden bg-black lg:aspect-auto">
          {item.type === "image" ? (
            <img
              src={item.url}
              alt={
                item.alt ||
                `Gallery image ${index + 1}`
              }
              className="h-full min-h-[200px] w-full object-cover"
            />
          ) : (
            <video
              src={item.url}
              poster={item.thumbnailUrl}
              controls
              preload="metadata"
              className="h-full min-h-[200px] w-full object-cover"
            />
          )}

          <div className="absolute left-3 top-3 flex items-center gap-2 rounded-full border border-white/10 bg-black/70 px-3 py-1.5 text-[10px] font-medium uppercase tracking-wider text-white/70 backdrop-blur">
            {item.type === "image" ? (
              <ImagePlus size={12} />
            ) : (
              <Film size={12} />
            )}

            {item.type}
          </div>
        </div>

        <div className="p-4 sm:p-5">
          <div className="mb-5 flex items-center justify-between">
            <div>
              <p className="text-xs uppercase tracking-wider text-[#FFC400]">
                Media {index + 1}
              </p>

              <p className="mt-1 text-xs text-white/30">
                Display order: {item.displayOrder}
              </p>
            </div>

            <button
              type="button"
              onClick={onRemove}
              className="rounded-lg p-2 text-white/30 transition hover:bg-red-500/10 hover:text-red-400"
              aria-label="Remove media"
            >
              <Trash2 size={16} />
            </button>
          </div>

          <div className="grid gap-4">
            {item.type === "image" && (
              <div>
                <label className={labelClass}>
                  Alt text
                </label>

                <input
                  value={item.alt ?? ""}
                  onChange={(event) =>
                    onChange({
                      ...item,
                      alt: event.target.value,
                    })
                  }
                  placeholder="Describe this image"
                  className={inputClass}
                />
              </div>
            )}

            {item.type === "video" && (
              <div>
                <label className={labelClass}>
                  Video thumbnail
                </label>

                <input
                  value={
                    item.thumbnailUrl ?? ""
                  }
                  onChange={(event) =>
                    onChange({
                      ...item,
                      thumbnailUrl:
                        event.target.value,
                    })
                  }
                  placeholder="Cloudinary thumbnail URL"
                  className={inputClass}
                />

                <p className="mt-1.5 text-xs text-white/25">
                  Optional poster image shown before the video starts.
                </p>
              </div>
            )}

            <div>
              <label className={labelClass}>
                Caption
              </label>

              <input
                value={item.caption ?? ""}
                onChange={(event) =>
                  onChange({
                    ...item,
                    caption:
                      event.target.value,
                  })
                }
                placeholder="Optional media caption"
                className={inputClass}
              />
            </div>
          </div>

          <div className="mt-5 flex items-center gap-2 border-t border-[#202020] pt-4">
            <button
              type="button"
              disabled={index === 0}
              onClick={onMoveUp}
              className="rounded-lg border border-[#292929] px-3 py-2 text-xs text-white/50 transition hover:text-white disabled:cursor-not-allowed disabled:opacity-20"
            >
              ↑ Move up
            </button>

            <button
              type="button"
              disabled={
                index === total - 1
              }
              onClick={onMoveDown}
              className="rounded-lg border border-[#292929] px-3 py-2 text-xs text-white/50 transition hover:text-white disabled:cursor-not-allowed disabled:opacity-20"
            >
              ↓ Move down
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* PROJECT SELECTOR                                                           */
/* -------------------------------------------------------------------------- */

function ProjectSelector({
  value,
  onChange,
}: {
  value: string;
  onChange: (value: string) => void;
}) {
  const [projects, setProjects] = useState<
    { _id: string; title: string }[]
  >([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let active = true;

    const loadProjects = async () => {
      try {
        const response = await fetch(
          "/api/admin/projects/options"
        );

        if (!response.ok) {
          throw new Error(
            "Unable to load projects."
          );
        }

        const data = await response.json();

        if (active) {
          setProjects(
            data.projects ?? []
          );
        }
      } catch {
        if (active) {
          setError(
            "Unable to load projects. You can create the gallery without linking a project."
          );
        }
      } finally {
        if (active) {
          setLoading(false);
        }
      }
    };

    void loadProjects();

    return () => {
      active = false;
    };
  }, []);

  return (
    <div>
      <label className={labelClass}>
        Related project
      </label>

      {loading ? (
        <div className="rounded-xl border border-[#292929] bg-[#0D0D0D] px-4 py-3 text-sm text-white/30">
          Loading projects...
        </div>
      ) : error ? (
        <div className="rounded-xl border border-yellow-500/20 bg-yellow-500/5 px-4 py-3 text-xs leading-5 text-yellow-300/70">
          {error}
        </div>
      ) : (
        <select
          value={value}
          onChange={(event) =>
            onChange(event.target.value)
          }
          className={inputClass}
        >
          <option value="">
            No project relationship
          </option>

          {projects.map((project) => (
            <option
              key={project._id}
              value={project._id}
            >
              {project.title}
            </option>
          ))}
        </select>
      )}

      <p className="mt-1.5 text-xs text-white/30">
        Optional. Connect this gallery to an existing project.
      </p>
    </div>
  );
}