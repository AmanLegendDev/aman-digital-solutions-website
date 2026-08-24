"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  Check,
  Clock3,
  Eye,
  Plus,
  Tag,
  Trash2,
} from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { blogSchema } from "@/schemas/blog.schema";
import type { z } from "zod";

import { createBlog } from "@/actions/blog.actions";

import CloudinaryImageUploader from "@/components/admin/media/CloudinaryImageUploader";

type FormValues = z.input<typeof blogSchema>;

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

function calculateReadingTime(content: string) {
  const words = content
    .trim()
    .split(/\s+/)
    .filter(Boolean).length;

  if (!words) return undefined;

  return Math.max(1, Math.ceil(words / 200));
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

export default function BlogCreateForm() {
  const router = useRouter();

  const [serverError, setServerError] = useState("");
  const [saving, setSaving] = useState(false);
  const [slugManuallyEdited, setSlugManuallyEdited] =
    useState(false);

  const [tags, setTags] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState("");

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
 } = useForm<
  z.input<typeof blogSchema>,
  unknown,
  z.output<typeof blogSchema>
>({
  resolver: zodResolver(blogSchema),

  defaultValues: {
    title: "",
    slug: "",
    excerpt: "",
    content: "",
    author: "Aman Digital Solutions",
    category: "",
    tags: [],
    readingTime: undefined,
    featured: false,
    published: false,
    publishedAt: undefined,
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
  const content = watch("content");
  const published = watch("published");
  const coverImage = watch("coverImage");
  const ogImage = watch("ogImage");

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
      `${SITE_URL}/blog/${slug}`,
      {
        shouldValidate: true,
      }
    );
  }, [slug, setValue]);

  useEffect(() => {
    const readingTime =
      calculateReadingTime(content);

    setValue("readingTime", readingTime, {
      shouldDirty: false,
      shouldValidate: true,
    });
  }, [content, setValue]);

  useEffect(() => {
    setValue("tags", tags, {
      shouldDirty: true,
      shouldValidate: true,
    });
  }, [tags, setValue]);

  useEffect(() => {
    if (!published) {
      setValue("publishedAt", undefined, {
        shouldDirty: true,
      });
    }
  }, [published, setValue]);

  const addTag = () => {
    const tag = tagInput
      .trim()
      .replace(/\s+/g, " ");

    if (!tag) return;

    const exists = tags.some(
      (item) =>
        item.toLowerCase() ===
        tag.toLowerCase()
    );

    if (exists) {
      setTagInput("");
      return;
    }

    setTags([...tags, tag]);
    setTagInput("");
  };

  const removeTag = (tag: string) => {
    setTags(
      tags.filter((item) => item !== tag)
    );
  };

  const handleTagKeyDown = (
    event: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (
      event.key === "Enter" ||
      event.key === ","
    ) {
      event.preventDefault();
      addTag();
    }
  };

  const submit = async (
  values: z.output<typeof blogSchema>
) => {
    setSaving(true);
    setServerError("");

   const finalValues: z.output<typeof blogSchema> = {
  ...values,
  tags,
  readingTime: calculateReadingTime(values.content),
  publishedAt: values.published
    ? values.publishedAt ?? new Date()
    : undefined,
};

const result = await createBlog(finalValues);

    if (!result.success) {
      setServerError(result.error);
      setSaving(false);
      return;
    }

    router.push("/admin/blog");
    router.refresh();
  };

  const readingTime =
    calculateReadingTime(content);

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
        title="Blog information"
        description="Define the article title, URL and the short summary shown on blog listings."
      >
        <div className="grid gap-5">
          <div>
            <label className={labelClass}>
              Blog title *
            </label>

            <input
              {...register("title")}
              placeholder="e.g. How a Professional Website Helps a Local Business Grow"
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
              placeholder="professional-website-local-business-growth"
              className={inputClass}
            />

            <div className="mt-2 flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
              <p className="text-xs text-white/30">
                Automatically generated from the title.
              </p>

              {slug && (
                <p className="text-xs text-[#FFC400]/70">
                  /blog/{slug}
                </p>
              )}
            </div>

            <FieldError
              message={errors.slug?.message}
            />
          </div>

          <div>
            <label className={labelClass}>
              Excerpt *
            </label>

            <textarea
              {...register("excerpt")}
              rows={4}
              placeholder="A short, useful summary of what readers will learn from this article..."
              className={textareaClass}
            />

            <p className="mt-1.5 text-xs text-white/30">
              This can appear on blog cards, listings and metadata.
            </p>

            <FieldError
              message={errors.excerpt?.message}
            />
          </div>
        </div>
      </Section>

      {/* CONTENT */}
      <Section
        number="02"
        title="Article content"
        description="Write the complete article. Keep the content useful, readable and genuinely valuable to the target audience."
      >
        <div>
          <label className={labelClass}>
            Content *
          </label>

          <textarea
            {...register("content")}
            rows={22}
            placeholder={`Write your article here...

Example:

Introduction

Explain the problem your reader is facing.

Main section

Provide useful information, examples and practical advice.

Conclusion

Summarize the key points and give the reader a clear next step.`}
            className={`${textareaClass} min-h-[500px]`}
          />

          <div className="mt-3 flex flex-col gap-2 text-xs text-white/30 sm:flex-row sm:items-center sm:justify-between">
            <FieldError
              message={errors.content?.message}
            />

            <div className="ml-auto flex items-center gap-2">
              <Clock3 size={13} />

              <span>
                Estimated reading time:{" "}
                {readingTime
                  ? `${readingTime} min`
                  : "—"}
              </span>
            </div>
          </div>
        </div>
      </Section>

      {/* COVER */}
      <Section
        number="03"
        title="Cover image"
        description="Use one strong image representing the article. This image can appear on cards, article headers and social previews."
      >
        <CloudinaryImageUploader
          label="Blog cover image"
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
            Image alt text
          </label>

          <input
            {...register("coverImage.alt")}
            placeholder="Professional website displayed on a laptop"
            className={inputClass}
          />

          <p className="mt-1.5 text-xs text-white/30">
            Describe what the image actually shows.
          </p>
        </div>
      </Section>

      {/* AUTHOR + CATEGORY */}
      <Section
        number="04"
        title="Author & classification"
        description="Organize the article so it can be filtered and displayed correctly across the website."
      >
        <div className="grid gap-5 md:grid-cols-2">
          <div>
            <label className={labelClass}>
              Author *
            </label>

            <input
              {...register("author")}
              placeholder="Aman Digital Solutions"
              className={inputClass}
            />

            <FieldError
              message={errors.author?.message}
            />
          </div>

          <div>
            <label className={labelClass}>
              Category *
            </label>

            <input
              {...register("category")}
              placeholder="Web Development"
              className={inputClass}
            />

            <FieldError
              message={errors.category?.message}
            />
          </div>

          <div className="md:col-span-2">
            <label className={labelClass}>
              Tags
            </label>

            <div className="flex gap-2">
              <div className="relative flex-1">
                <Tag
                  size={16}
                  className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-white/25"
                />

                <input
                  value={tagInput}
                  onChange={(event) =>
                    setTagInput(
                      event.target.value
                    )
                  }
                  onKeyDown={
                    handleTagKeyDown
                  }
                  placeholder="Type a tag and press Enter"
                  className={`${inputClass} pl-11`}
                />
              </div>

              <button
                type="button"
                onClick={addTag}
                className="inline-flex items-center gap-2 rounded-xl border border-[#303030] px-4 text-sm text-white/70 transition hover:border-[#FFC400]/50 hover:text-[#FFC400]"
              >
                <Plus size={16} />
                Add
              </button>
            </div>

            {tags.length > 0 && (
              <div className="mt-3 flex flex-wrap gap-2">
                {tags.map((tag) => (
                  <span
                    key={tag}
                    className="inline-flex items-center gap-2 rounded-full border border-[#303030] bg-[#111111] px-3 py-1.5 text-xs text-white/60"
                  >
                    {tag}

                    <button
                      type="button"
                      onClick={() =>
                        removeTag(tag)
                      }
                      className="text-white/30 transition hover:text-red-400"
                      aria-label={`Remove ${tag}`}
                    >
                      ×
                    </button>
                  </span>
                ))}
              </div>
            )}

            <p className="mt-2 text-xs text-white/30">
              Tags help organize content. Avoid stuffing irrelevant keywords.
            </p>
          </div>
        </div>
      </Section>

      {/* PUBLISH */}
      <Section
        number="05"
        title="Publishing"
        description="Choose whether this article is a draft or publicly available."
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
                Make article publicly visible
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
                Highlight this article
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

        {published && (
          <div className="mt-5 rounded-xl border border-[#252525] bg-[#080808] p-5">
            <label className={labelClass}>
              Published date
            </label>

            <input
              type="datetime-local"
              {...register("publishedAt", {
                setValueAs: (value) =>
                  value
                    ? new Date(value)
                    : undefined,
              })}
              className={inputClass}
            />

            <p className="mt-2 text-xs text-white/30">
              Leave empty to automatically use the current date when published.
            </p>
          </div>
        )}
      </Section>

      {/* SEO */}
      <Section
        number="06"
        title="SEO"
        description="Control the metadata used by search engines. Keep it natural, specific and aligned with the actual article."
      >
        <div className="grid gap-5">
          <div>
            <label className={labelClass}>
              SEO title
            </label>

            <input
              {...register("seoTitle")}
              placeholder="Professional Websites for Local Businesses | Aman Digital Solutions"
              className={inputClass}
            />

            <p className="mt-1.5 text-xs text-white/30">
              Recommended: concise and directly relevant to the article.
            </p>
          </div>

          <div>
            <label className={labelClass}>
              SEO description
            </label>

            <textarea
              {...register("seoDescription")}
              rows={4}
              placeholder="Learn how a professional website can help local businesses attract customers, build trust and grow online."
              className={textareaClass}
            />

            <p className="mt-1.5 text-xs text-white/30">
              Describe the actual value of the article. Do not keyword-stuff.
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
              Automatically generated from the blog slug.
            </p>
          </div>
        </div>
      </Section>

      {/* SOCIAL */}
      <Section
        number="07"
        title="Social sharing"
        description="Define how the article should look when shared on social platforms."
      >
        <div className="grid gap-5">
          <div className="grid gap-5 md:grid-cols-2">
            <div>
              <label className={labelClass}>
                OG title
              </label>

              <input
                {...register("ogTitle")}
                placeholder="How Websites Help Local Businesses Grow"
                className={inputClass}
              />
            </div>

            <div>
              <label className={labelClass}>
                OG description
              </label>

              <input
                {...register("ogDescription")}
                placeholder="Practical insights from Aman Digital Solutions."
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

      {/* PREVIEW INFO */}
      <div className="rounded-2xl border border-[#252525] bg-[#0B0B0B] p-5 sm:p-7">
        <div className="flex gap-4">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#FFC400]/10 text-[#FFC400]">
            <Eye size={17} />
          </div>

          <div>
            <h3 className="text-sm font-semibold">
              Publishing checklist
            </h3>

            <ul className="mt-3 space-y-2 text-xs leading-5 text-white/40">
              <li>
                • Use a clear, useful title.
              </li>

              <li>
                • Make the excerpt accurately represent the article.
              </li>

              <li>
                • Use a relevant cover image with descriptive alt text.
              </li>

              <li>
                • Keep SEO metadata aligned with the actual content.
              </li>

              <li>
                • Publish only content that is ready for public viewing.
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* ACTION BAR */}
      <div className="sticky bottom-4 z-20 flex flex-col gap-4 rounded-2xl border border-[#252525] bg-[#0B0B0B]/95 p-4 shadow-2xl backdrop-blur-md sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-sm font-medium">
            Ready to create this article?
          </p>

          <p className="mt-1 text-xs text-white/30">
            You can keep it unpublished as a draft.
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
                Create Blog
              </>
            )}
          </button>
        </div>
      </div>
    </form>
  );
}