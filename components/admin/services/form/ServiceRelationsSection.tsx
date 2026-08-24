"use client";

import {
  Link2,
  Plus,
  X,
} from "lucide-react";

import type {
  FieldErrors,
  UseFormReturn,
} from "react-hook-form";

import type { CreateServiceInput } from "@/schemas/service.schema";

import ServiceFormSection from "./ServiceFormSection";

type RelationOption = {
  id: string;
  title: string;
};

type Props = {
  form: UseFormReturn<CreateServiceInput>;
  errors: FieldErrors<CreateServiceInput>;
  faqs: RelationOption[];
  projects: RelationOption[];
};

const selectClass =
  "w-full rounded-xl border border-[#262626] bg-[#090909] px-4 py-3 text-sm text-white outline-none transition-all focus:border-[#FFC400]/50 focus:ring-1 focus:ring-[#FFC400]/20";

export default function ServiceRelationsSection({
  form,
  errors,
  faqs,
  projects,
}: Props) {
  const {
    watch,
    setValue,
  } = form;

  const faqIds = watch("faqIds") ?? [];
  const projectIds = watch("projectIds") ?? [];

  const addFaq = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const id = event.target.value;

    if (!id) {
      return;
    }

    if (!faqIds.includes(id)) {
      setValue(
        "faqIds",
        [...faqIds, id],
        {
          shouldDirty: true,
          shouldValidate: true,
        }
      );
    }

    event.target.value = "";
  };

  const removeFaq = (id: string) => {
    setValue(
      "faqIds",
      faqIds.filter(
        (faqId) => faqId !== id
      ),
      {
        shouldDirty: true,
        shouldValidate: true,
      }
    );
  };

  const addProject = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const id = event.target.value;

    if (!id) {
      return;
    }

    if (!projectIds.includes(id)) {
      setValue(
        "projectIds",
        [...projectIds, id],
        {
          shouldDirty: true,
          shouldValidate: true,
        }
      );
    }

    event.target.value = "";
  };

  const removeProject = (id: string) => {
    setValue(
      "projectIds",
      projectIds.filter(
        (projectId) =>
          projectId !== id
      ),
      {
        shouldDirty: true,
        shouldValidate: true,
      }
    );
  };

  const selectedFaqs = faqs.filter(
    (faq) => faqIds.includes(faq.id)
  );

  const selectedProjects = projects.filter(
    (project) =>
      projectIds.includes(project.id)
  );

  return (
    <ServiceFormSection
      number="08"
      title="Related content"
      description="Connect this service with relevant FAQs and portfolio projects."
    >
      <div className="space-y-8">
        {/* FAQS */}

        <div>
          <div className="mb-4 flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl border border-[#242424] bg-[#0D0D0D] text-neutral-500">
              <Link2 size={15} />
            </div>

            <div>
              <h3 className="text-sm font-medium text-white">
                Related FAQs
              </h3>

              <p className="mt-0.5 text-[11px] text-neutral-600">
                Select FAQs that are relevant to this service.
              </p>
            </div>
          </div>

          <select
            defaultValue=""
            onChange={addFaq}
            className={selectClass}
          >
            <option value="">
              Select an FAQ to add
            </option>

            {faqs.map((faq) => (
              <option
                key={faq.id}
                value={faq.id}
                disabled={faqIds.includes(faq.id)}
              >
                {faq.title}
              </option>
            ))}
          </select>

          {selectedFaqs.length > 0 && (
            <div className="mt-4 space-y-2">
              {selectedFaqs.map((faq) => (
                <div
                  key={faq.id}
                  className="flex items-center justify-between gap-3 rounded-xl border border-[#242424] bg-[#0A0A0A] px-4 py-3"
                >
                  <p className="min-w-0 text-xs text-neutral-300">
                    {faq.title}
                  </p>

                  <button
                    type="button"
                    onClick={() =>
                      removeFaq(faq.id)
                    }
                    className="shrink-0 rounded-lg p-1.5 text-neutral-600 transition hover:bg-red-500/10 hover:text-red-400"
                    aria-label={`Remove ${faq.title}`}
                  >
                    <X size={14} />
                  </button>
                </div>
              ))}
            </div>
          )}

          {errors.faqIds?.message && (
            <p className="mt-2 text-xs text-red-400">
              {errors.faqIds.message}
            </p>
          )}
        </div>

        {/* PROJECTS */}

        <div>
          <div className="mb-4 flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl border border-[#242424] bg-[#0D0D0D] text-neutral-500">
              <Plus size={15} />
            </div>

            <div>
              <h3 className="text-sm font-medium text-white">
                Related projects
              </h3>

              <p className="mt-0.5 text-[11px] text-neutral-600">
                Connect portfolio projects that demonstrate this service.
              </p>
            </div>
          </div>

          <select
            defaultValue=""
            onChange={addProject}
            className={selectClass}
          >
            <option value="">
              Select a project to add
            </option>

            {projects.map((project) => (
              <option
                key={project.id}
                value={project.id}
                disabled={projectIds.includes(
                  project.id
                )}
              >
                {project.title}
              </option>
            ))}
          </select>

          {selectedProjects.length > 0 && (
            <div className="mt-4 space-y-2">
              {selectedProjects.map(
                (project) => (
                  <div
                    key={project.id}
                    className="flex items-center justify-between gap-3 rounded-xl border border-[#242424] bg-[#0A0A0A] px-4 py-3"
                  >
                    <p className="min-w-0 text-xs text-neutral-300">
                      {project.title}
                    </p>

                    <button
                      type="button"
                      onClick={() =>
                        removeProject(
                          project.id
                        )
                      }
                      className="shrink-0 rounded-lg p-1.5 text-neutral-600 transition hover:bg-red-500/10 hover:text-red-400"
                      aria-label={`Remove ${project.title}`}
                    >
                      <X size={14} />
                    </button>
                  </div>
                )
              )}
            </div>
          )}

          {errors.projectIds?.message && (
            <p className="mt-2 text-xs text-red-400">
              {errors.projectIds.message}
            </p>
          )}
        </div>
      </div>
    </ServiceFormSection>
  );
}