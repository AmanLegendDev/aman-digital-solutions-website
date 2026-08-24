"use client";

import ReviewRow from "../ui/ReviewRow";
import ReviewSection from "../ui/ReviewSection";

import {
  BUDGETS,
  PROJECT_TYPES,
  TIMELINES,
} from "../constants";

import type {
  FormData,
  ServiceOption,
} from "../types";

type Props = {
  data: FormData;
  services: ServiceOption[];
  onEdit: (step: 1 | 2) => void;
};

export default function ReviewStep({
  data,
  services,
  onEdit,
}: Props) {
  const selectedServices =
    services.filter((service) =>
      data.serviceIds.includes(
        service._id,
      ),
    );

  function getLabel(
    value: string,
    options: readonly (readonly [
      string,
      string,
    ])[],
  ) {
    return (
      options.find(
        ([key]) => key === value,
      )?.[1] ?? value
    );
  }

  return (
    <section className="p-5 sm:p-8">
      <div className="mb-8">
        <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#FFC400]">
          Step 03
        </p>

        <h2 className="mt-2 text-2xl font-semibold text-white">
          Review your request
        </h2>

        <p className="mt-2 text-sm leading-6 text-neutral-500">
          Everything look right? You can edit
          any section before submitting.
        </p>
      </div>

      <div className="space-y-4">
        {/* PERSONAL */}

        <ReviewSection
          number="01"
          title="Your details"
          onEdit={() => onEdit(1)}
        >
          <ReviewRow
            label="Name"
            value={data.fullName}
          />

          {data.companyName && (
            <ReviewRow
              label="Business"
              value={data.companyName}
            />
          )}

          <ReviewRow
            label="Email"
            value={data.email}
          />

          <ReviewRow
            label="Phone / WhatsApp"
            value={data.phone}
          />

          <ReviewRow
            label="Location"
            value={data.location}
          />

          {data.currentWebsite && (
            <ReviewRow
              label="Website"
              value={data.currentWebsite}
            />
          )}

          <ReviewRow
            label="Contact preference"
            value={getLabel(
              data.preferredContactMethod,
              [
                ["WHATSAPP", "WhatsApp"],
                ["PHONE", "Phone"],
                ["EMAIL", "Email"],
              ],
            )}
          />
        </ReviewSection>

        {/* PROJECT */}

        <ReviewSection
          number="02"
          title="Project requirements"
          onEdit={() => onEdit(2)}
        >
          <ReviewRow
            label="Services"
            value={
              selectedServices.length
                ? selectedServices
                    .map(
                      (service) =>
                        service.title,
                    )
                    .join(", ")
                : "—"
            }
          />

          <ReviewRow
            label="Project type"
            value={getLabel(
              data.projectType,
              PROJECT_TYPES,
            )}
          />

          <ReviewRow
            label="Timeline"
            value={getLabel(
              data.timeline,
              TIMELINES,
            )}
          />

          <ReviewRow
            label="Budget"
            value={getLabel(
              data.budgetRange,
              BUDGETS,
            )}
          />

          <div className="border-t border-white/[0.06] pt-4">
            <p className="text-[10px] uppercase tracking-[0.16em] text-neutral-600">
              Project description
            </p>

            <p className="mt-2 text-sm leading-6 text-neutral-300">
              {data.projectDescription}
            </p>
          </div>

          {data.requiredPages.length > 0 && (
            <ReviewRow
              label="Pages"
              value={data.requiredPages.join(
                ", ",
              )}
            />
          )}

          {data.requiredFeatures.length > 0 && (
            <ReviewRow
              label="Features"
              value={data.requiredFeatures.join(
                ", ",
              )}
            />
          )}
        </ReviewSection>
      </div>
    </section>
  );
}