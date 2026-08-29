"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  Check,
  ChevronDown,
  ExternalLink,
  HelpCircle,
  Search,
} from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { faqSchema } from "@/schemas/faq.schema";
import type { z } from "zod";

import { createFAQ } from "@/actions/faq.actions";

type FormValues = z.input<typeof faqSchema>;

type Option = {
  _id: string;
  title?: string;
  name?: string;
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

export default function FAQCreateForm() {
  const router = useRouter();

  const [saving, setSaving] = useState(false);
  const [serverError, setServerError] = useState("");
  const [slugManuallyEdited, setSlugManuallyEdited] =
    useState(false);

const {
  register,
  handleSubmit,
  watch,
  setValue,
  formState: { errors },
} = useForm<
  z.input<typeof faqSchema>,
  unknown,
  z.output<typeof faqSchema>
>({
  resolver: zodResolver(faqSchema),

  defaultValues: {
    question: "",
    slug: "",
    answer: "",

    category: "",
    relatedService: "",
    relatedProject: "",

    featured: false,
    published: false,
    displayOrder: 0,

    seoTitle: "",
    seoDescription: "",
    canonicalUrl: "",
  },
});

  

  const question = watch("question");
  const slug = watch("slug");

  useEffect(() => {
    if (slugManuallyEdited) return;

    setValue(
      "slug",
      slugify(question),
      {
        shouldDirty: true,
        shouldValidate: true,
      }
    );
  }, [
    question,
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
      `${SITE_URL}/faq/${slug}`,
      {
        shouldValidate: true,
      }
    );
  }, [slug, setValue]);

 const submit = async (
  values: z.output<typeof faqSchema>
) => {
    setSaving(true);
    setServerError("");

    const result = await createFAQ(
      values
    );

    if (!result.success) {
      setServerError(result.error);
      setSaving(false);
      return;
    }

    router.push("/admin/faq");
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

      {/* QUESTION */}
      <Section
        number="01"
        title="Question"
        description="Write the exact question a customer is likely to ask."
      >
        <div className="grid gap-5">
          <div>
            <label className={labelClass}>
              Question *
            </label>

            <input
              {...register("question")}
              placeholder="How much does a professional website cost?"
              className={inputClass}
            />

            <FieldError
              message={errors.question?.message}
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
              placeholder="how-much-does-a-professional-website-cost"
              className={inputClass}
            />

            <div className="mt-2 flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
              <p className="text-xs text-white/30">
                Automatically generated from the question.
              </p>

              {slug && (
                <p className="text-xs text-[#FFC400]/70">
                  /faq/{slug}
                </p>
              )}
            </div>

            <FieldError
              message={errors.slug?.message}
            />
          </div>
        </div>
      </Section>

      {/* ANSWER */}
      <Section
        number="02"
        title="Answer"
        description="Give a direct and genuinely useful answer. Avoid vague marketing language."
      >
        <div>
          <label className={labelClass}>
            Answer *
          </label>

          <textarea
            {...register("answer")}
            rows={10}
            placeholder="Write a clear answer that solves the customer's question..."
            className={`${textareaClass} min-h-[260px]`}
          />

          <FieldError
            message={errors.answer?.message}
          />

          <p className="mt-2 text-xs text-white/30">
            Keep the answer concise but complete. The same answer can
            later be used in FAQ sections and structured FAQ content.
          </p>
        </div>
      </Section>

      {/* ORGANIZATION */}
      <Section
        number="03"
        title="Organization"
        description="Categorize the FAQ and optionally connect it directly to a service or project."
      >
        <div className="grid gap-5 md:grid-cols-2">
          <div>
            <label className={labelClass}>
              Category
            </label>

            <input
              {...register("category")}
              placeholder="Website Development"
              className={inputClass}
            />

            <p className="mt-1.5 text-xs text-white/30">
              Examples: Pricing, Websites, SEO, Maintenance, Process.
            </p>
          </div>

          <RelatedServiceSelector
            value={
              watch("relatedService") ?? ""
            }
            onChange={(value) =>
              setValue(
                "relatedService",
                value,
                {
                  shouldDirty: true,
                  shouldValidate: true,
                }
              )
            }
          />

          <RelatedProjectSelector
            value={
              watch("relatedProject") ?? ""
            }
            onChange={(value) =>
              setValue(
                "relatedProject",
                value,
                {
                  shouldDirty: true,
                  shouldValidate: true,
                }
              )
            }
          />
        </div>
      </Section>

      {/* PUBLISH */}
      <Section
        number="04"
        title="Publishing"
        description="Control visibility and the position of this FAQ wherever the CMS displays it."
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
                Visible publicly
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
                Highlight this FAQ
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
        number="05"
        title="SEO"
        description="Set search metadata while keeping it directly relevant to the question and answer."
      >
        <div className="grid gap-5">
          <div>
            <label className={labelClass}>
              SEO title
            </label>

            <input
              {...register("seoTitle")}
              placeholder="Website Development Pricing | Aman Digital Solutions"
              className={inputClass}
            />

            <p className="mt-1.5 text-xs text-white/30">
              Keep it concise and relevant to the FAQ.
            </p>
          </div>

          <div>
            <label className={labelClass}>
              SEO description
            </label>

            <textarea
              {...register("seoDescription")}
              rows={4}
              placeholder="Find out what affects professional website development pricing and what is included."
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
              Automatically generated from the FAQ slug.
            </p>
          </div>
        </div>
      </Section>

      {/* PREVIEW */}
      <section className="rounded-2xl border border-[#252525] bg-[#0B0B0B] p-5 sm:p-7">
        <div className="mb-5 flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#FFC400]/10 text-[#FFC400]">
            <Search size={17} />
          </div>

          <div>
            <h3 className="text-sm font-semibold">
              FAQ preview
            </h3>

            <p className="mt-1 text-xs text-white/30">
              This is roughly how the content will appear in the FAQ UI.
            </p>
          </div>
        </div>

        <div className="rounded-xl border border-[#252525] bg-[#080808] p-5">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-xs uppercase tracking-wider text-[#FFC400]">
                {watch("category") ||
                  "General"}
              </p>

              <h4 className="mt-2 text-base font-medium leading-6">
                {question ||
                  "Your FAQ question will appear here"}
              </h4>
            </div>

            <ChevronDown
              size={18}
              className="mt-1 shrink-0 text-white/30"
            />
          </div>

          <p className="mt-4 text-sm leading-6 text-white/45">
            {watch("answer") ||
              "Your FAQ answer will appear here."}
          </p>
        </div>
      </section>

      {/* ACTION */}
      <div className="sticky bottom-4 z-20 flex flex-col gap-4 rounded-2xl border border-[#252525] bg-[#0B0B0B]/95 p-4 shadow-2xl backdrop-blur-md sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-sm font-medium">
            Ready to create this FAQ?
          </p>

          <p className="mt-1 text-xs text-white/30">
            You can keep it unpublished until it is ready.
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
                Create FAQ
              </>
            )}
          </button>
        </div>
      </div>
    </form>
  );
}

/* -------------------------------------------------------------------------- */
/* RELATED SERVICE                                                            */
/* -------------------------------------------------------------------------- */

function RelatedServiceSelector({
  value,
  onChange,
}: {
  value: string;
  onChange: (value: string) => void;
}) {
  const [services, setServices] = useState<
    Option[]
  >([]);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState("");

  useEffect(() => {
    let active = true;

    async function load() {
      try {
        const response = await fetch(
          "/api/admin/services/options"
        );

        if (!response.ok) {
          throw new Error();
        }

        const data =
          await response.json();

        if (active) {
          setServices(
            data.services ?? []
          );
        }
      } catch {
        if (active) {
          setError(
            "Unable to load services."
          );
        }
      } finally {
        if (active) {
          setLoading(false);
        }
      }
    }

    void load();

    return () => {
      active = false;
    };
  }, []);

  return (
    <div>
      <label className={labelClass}>
        Related service
      </label>

      {loading ? (
        <div className="rounded-xl border border-[#292929] bg-[#0D0D0D] px-4 py-3 text-sm text-white/30">
          Loading services...
        </div>
      ) : error ? (
        <div className="rounded-xl border border-yellow-500/20 bg-yellow-500/5 px-4 py-3 text-xs text-yellow-300/70">
          {error}
        </div>
      ) : (
        <select
          value={value}
          onChange={(event) =>
            onChange(
              event.target.value
            )
          }
          className={inputClass}
        >
          <option value="">
            No related service
          </option>

          {services.map((service) => (
            <option
              key={service._id}
              value={service._id}
            >
              {service.title ??
                service.name}
            </option>
          ))}
        </select>
      )}

      <p className="mt-1.5 text-xs text-white/30">
        Optional. This FAQ can appear on the selected service page.
      </p>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* RELATED PROJECT                                                            */
/* -------------------------------------------------------------------------- */

function RelatedProjectSelector({
  value,
  onChange,
}: {
  value: string;
  onChange: (value: string) => void;
}) {
  const [projects, setProjects] = useState<
    Option[]
  >([]);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState("");

  useEffect(() => {
    let active = true;

    async function load() {
      try {
        const response = await fetch(
          "/api/admin/projects/options"
        );

        if (!response.ok) {
          throw new Error();
        }

        const data =
          await response.json();

        if (active) {
          setProjects(
            data.projects ?? []
          );
        }
      } catch {
        if (active) {
          setError(
            "Unable to load projects."
          );
        }
      } finally {
        if (active) {
          setLoading(false);
        }
      }
    }

    void load();

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
        <div className="rounded-xl border border-yellow-500/20 bg-yellow-500/5 px-4 py-3 text-xs text-yellow-300/70">
          {error}
        </div>
      ) : (
        <select
          value={value}
          onChange={(event) =>
            onChange(
              event.target.value
            )
          }
          className={inputClass}
        >
          <option value="">
            No related project
          </option>

          {projects.map((project) => (
            <option
              key={project._id}
              value={project._id}
            >
              {project.title ??
                project.name}
            </option>
          ))}
        </select>
      )}

      <p className="mt-1.5 text-xs text-white/30">
        Optional. Connect the FAQ with a specific project.
      </p>
    </div>
  );
}