"use client";

import {
  ArrowRight,
  CheckCircle2,
  CircleX,
  Eye,
  Pencil,
  Trash2,
  X,
  ExternalLink,
} from "lucide-react";
import { useEffect, useState } from "react";
import Link from "next/link";

import type { AdminServiceData } from "@/app/admin/services/page";

type ServiceAdminCardProps = {
  service: AdminServiceData;
};

export default function ServiceAdminCard({
  service,
}: ServiceAdminCardProps) {
  const [detailsOpen, setDetailsOpen] = useState(false);

  /* =========================================================
     BODY LOCK WHEN MODAL IS OPEN
  ========================================================= */

  useEffect(() => {
    if (!detailsOpen) return;

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, [detailsOpen]);

  /* =========================================================
     CLOSE ON ESC
  ========================================================= */

  useEffect(() => {
    if (!detailsOpen) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setDetailsOpen(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [detailsOpen]);

  return (
    <>
      {/* =====================================================
          SERVICE CARD
      ===================================================== */}

      <article className="group relative overflow-hidden rounded-2xl border border-[#252525] bg-[#090909] transition-all duration-300 hover:border-[#FFC400]/20">
        {/* Accent */}
        <div
          aria-hidden="true"
          className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#FFC400]/0 to-transparent transition-all duration-500 group-hover:via-[#FFC400]/40"
        />

        {/* IMAGE */}
        {service.image?.url && (
          <div className="relative aspect-[16/8] overflow-hidden border-b border-[#1C1C1C] bg-[#0D0D0D]">
            <img
              src={service.image.url}
              alt={
                service.image.alt ||
                `${service.title} service`
              }
              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.02]"
            />

            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

            <div className="absolute bottom-3 left-3">
              <span className="rounded-full border border-white/10 bg-black/60 px-2.5 py-1 text-[8px] font-semibold uppercase tracking-[0.12em] text-white/70 backdrop-blur-md">
                {service.category}
              </span>
            </div>
          </div>
        )}

        <div className="p-5 sm:p-6">
          {/* =================================================
              TOP
          ================================================= */}

          <div className="flex items-start justify-between gap-4">
            <div className="min-w-0">
              <div className="flex flex-wrap items-center gap-2">
                {!service.image?.url && service.category && (
                  <span className="rounded-full border border-white/[0.07] bg-white/[0.02] px-2.5 py-1 text-[8px] font-medium uppercase tracking-[0.12em] text-[#737373]">
                    {service.category}
                  </span>
                )}

                {service.featured && (
                  <span className="rounded-full border border-[#FFC400]/15 bg-[#FFC400]/[0.04] px-2.5 py-1 text-[8px] font-semibold uppercase tracking-[0.12em] text-[#FFC400]">
                    Featured
                  </span>
                )}
              </div>

              <h2 className="mt-4 truncate text-base font-semibold tracking-tight text-[#F5F5F5] sm:text-lg">
                {service.title}
              </h2>

              <p className="mt-1 truncate text-[10px] text-[#4F4F4F]">
                /{service.slug}
              </p>
            </div>

            {/* STATUS */}

            <div
              className={[
                "flex shrink-0 items-center gap-1.5 rounded-full border px-2.5 py-1.5 text-[8px] font-semibold uppercase tracking-[0.12em]",
                service.published
                  ? "border-emerald-500/15 bg-emerald-500/[0.04] text-emerald-500"
                  : "border-red-500/15 bg-red-500/[0.04] text-red-500",
              ].join(" ")}
            >
              {service.published ? (
                <CheckCircle2 size={10} />
              ) : (
                <CircleX size={10} />
              )}

              {service.published
                ? "Published"
                : "Draft"}
            </div>
          </div>

          {/* SHORT DESCRIPTION */}

          <p className="mt-5 line-clamp-2 text-xs leading-6 text-[#737373]">
            {service.shortDescription}
          </p>

          {/* META */}

          <div className="mt-5 grid grid-cols-3 gap-2 border-t border-[#1C1C1C] pt-4">
            <div>
              <p className="text-[8px] uppercase tracking-[0.14em] text-[#444]">
                Order
              </p>

              <p className="mt-1 text-xs font-medium text-[#A1A1A1]">
                #{service.displayOrder}
              </p>
            </div>

            <div>
              <p className="text-[8px] uppercase tracking-[0.14em] text-[#444]">
                Features
              </p>

              <p className="mt-1 text-xs font-medium text-[#A1A1A1]">
                {service.features?.length ?? 0}
              </p>
            </div>

            <div>
              <p className="text-[8px] uppercase tracking-[0.14em] text-[#444]">
                Benefits
              </p>

              <p className="mt-1 text-xs font-medium text-[#A1A1A1]">
                {service.benefits?.length ?? 0}
              </p>
            </div>
          </div>

          {/* VIEW DETAILS */}

          <button
            type="button"
            onClick={() => setDetailsOpen(true)}
            className="group/button mt-5 flex w-full items-center justify-between rounded-xl border border-[#252525] bg-[#0D0D0D] px-4 py-3 text-xs font-medium text-[#A1A1A1] transition-all duration-300 hover:border-[#FFC400]/20 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FFC400]"
          >
            <span className="flex items-center gap-2">
              <Eye size={13} />
              View full details
            </span>

            <ArrowRight
              size={14}
              className="transition-transform duration-300 group-hover/button:translate-x-1 group-hover/button:text-[#FFC400]"
            />
          </button>
        </div>
      </article>

      {/* =====================================================
          FULL DETAILS MODAL
      ===================================================== */}

      {detailsOpen && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/85 p-3 backdrop-blur-md sm:p-5"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) {
              setDetailsOpen(false);
            }
          }}
        >
          {/* =================================================
              MODAL
          ================================================= */}

          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby={`service-${service._id}`}
            className="flex max-h-[calc(100vh-1.5rem)] w-full max-w-5xl flex-col overflow-hidden rounded-2xl border border-[#2A2A2A] bg-[#080808] shadow-2xl sm:max-h-[calc(100vh-2.5rem)]"
          >
            {/* =================================================
                FIXED HEADER
            ================================================= */}

            <header className="flex shrink-0 items-start justify-between gap-5 border-b border-[#202020] bg-[#080808] p-5 sm:p-6">
              <div className="min-w-0">
                <p className="text-[9px] font-semibold uppercase tracking-[0.18em] text-[#FFC400]">
                  Service details
                </p>

                <h2
                  id={`service-${service._id}`}
                  className="mt-2 truncate text-xl font-semibold tracking-tight text-white sm:text-2xl"
                >
                  {service.title}
                </h2>

                <p className="mt-1 truncate text-[10px] text-[#4F4F4F]">
                  /{service.slug}
                </p>
              </div>

              <button
                type="button"
                onClick={() => setDetailsOpen(false)}
                aria-label="Close details"
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-[#252525] text-[#666] transition-all hover:border-[#444] hover:bg-white/[0.03] hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FFC400]"
              >
                <X size={16} />
              </button>
            </header>

            {/* =================================================
                SCROLLABLE CONTENT
            ================================================= */}

            <div className="min-h-0 flex-1 overflow-y-auto">
              <div className="p-5 sm:p-7">
                {/* =================================================
                    HERO IMAGE + BASIC INFO
                ================================================= */}

                <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
                  {/* IMAGE */}

                  <div className="overflow-hidden rounded-2xl border border-[#202020] bg-[#0D0D0D]">
                    {service.image?.url ? (
                      <div className="relative aspect-[16/10] overflow-hidden">
                        <img
                          src={service.image.url}
                          alt={
                            service.image.alt ||
                            `${service.title} service`
                          }
                          className="h-full w-full object-cover"
                        />

                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

                        <div className="absolute bottom-4 left-4">
                          <span className="rounded-full border border-white/10 bg-black/60 px-3 py-1.5 text-[8px] font-semibold uppercase tracking-[0.14em] text-white/80 backdrop-blur-md">
                            {service.category}
                          </span>
                        </div>
                      </div>
                    ) : (
                      <div className="flex aspect-[16/10] items-center justify-center text-xs text-[#444]">
                        No service image
                      </div>
                    )}
                  </div>

                  {/* BASIC INFO */}

                  <div className="flex flex-col">
                    <div className="flex flex-wrap gap-2">
                      <span
                        className={[
                          "rounded-full border px-3 py-1.5 text-[8px] font-semibold uppercase tracking-[0.12em]",
                          service.published
                            ? "border-emerald-500/15 bg-emerald-500/[0.04] text-emerald-500"
                            : "border-red-500/15 bg-red-500/[0.04] text-red-500",
                        ].join(" ")}
                      >
                        {service.published
                          ? "Published"
                          : "Draft"}
                      </span>

                      {service.featured && (
                        <span className="rounded-full border border-[#FFC400]/15 bg-[#FFC400]/[0.04] px-3 py-1.5 text-[8px] font-semibold uppercase tracking-[0.12em] text-[#FFC400]">
                          Featured
                        </span>
                      )}
                    </div>

                    {service.heroEyebrow && (
                      <div className="mt-6">
                        <p className="text-[8px] font-semibold uppercase tracking-[0.16em] text-[#FFC400]">
                          Hero eyebrow
                        </p>

                        <p className="mt-2 text-sm text-[#A1A1A1]">
                          {service.heroEyebrow}
                        </p>
                      </div>
                    )}

                    <div className="mt-6">
                      <p className="text-[8px] font-semibold uppercase tracking-[0.16em] text-[#444]">
                        Short description
                      </p>

                      <p className="mt-2 text-sm leading-7 text-[#A1A1A1]">
                        {service.shortDescription}
                      </p>
                    </div>

                    {/* PRICE */}

                    {(service.startingPrice !== undefined ||
                      service.priceLabel) && (
                      <div className="mt-auto pt-6">
                        <div className="rounded-2xl border border-[#FFC400]/15 bg-[#FFC400]/[0.025] p-5">
                          <p className="text-[8px] font-semibold uppercase tracking-[0.16em] text-[#8A7300]">
                            Pricing
                          </p>

                          <div className="mt-2 flex flex-wrap items-baseline gap-2">
                            {service.startingPrice !==
                              undefined && (
                              <span className="text-2xl font-semibold text-[#FFC400]">
                                ₹
                                {service.startingPrice.toLocaleString(
                                  "en-IN"
                                )}
                              </span>
                            )}

                            {service.priceLabel && (
                              <span className="text-xs text-[#777]">
                                {service.priceLabel}
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* =================================================
                    FULL DESCRIPTION
                ================================================= */}

                <section className="mt-8 border-t border-[#1C1C1C] pt-7">
                  <p className="text-[9px] font-semibold uppercase tracking-[0.16em] text-[#444]">
                    Description
                  </p>

                  <p className="mt-3 whitespace-pre-wrap text-sm leading-8 text-[#A1A1A1]">
                    {service.description}
                  </p>
                </section>

                {/* =================================================
                    BENEFITS
                ================================================= */}

                {service.benefits?.length > 0 && (
                  <section className="mt-8 border-t border-[#1C1C1C] pt-7">
                    <div>
                      <p className="text-[9px] font-semibold uppercase tracking-[0.16em] text-[#444]">
                        Benefits
                      </p>

                      <p className="mt-1 text-xs text-[#555]">
                        Why this service is valuable for the client.
                      </p>
                    </div>

                    <div className="mt-4 grid gap-3 md:grid-cols-2">
                      {service.benefits.map(
                        (benefit, index) => (
                          <div
                            key={`${service._id}-benefit-${index}`}
                            className="rounded-2xl border border-[#1C1C1C] bg-[#0C0C0C] p-5"
                          >
                            <div className="flex items-start gap-3">
                              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-[#FFC400]/10 bg-[#FFC400]/[0.04] text-[10px] font-semibold text-[#FFC400]">
                                {String(
                                  index + 1
                                ).padStart(2, "0")}
                              </div>

                              <div className="min-w-0">
                                <h3 className="text-sm font-medium text-[#F5F5F5]">
                                  {benefit.title}
                                </h3>

                                <p className="mt-2 text-xs leading-6 text-[#666]">
                                  {benefit.description}
                                </p>

                                {benefit.icon && (
                                  <p className="mt-3 text-[8px] uppercase tracking-[0.12em] text-[#3F3F3F]">
                                    Icon:{" "}
                                    {benefit.icon}
                                  </p>
                                )}
                              </div>
                            </div>
                          </div>
                        )
                      )}
                    </div>
                  </section>
                )}

                {/* =================================================
                    FEATURES
                ================================================= */}

                {service.features?.length > 0 && (
                  <section className="mt-8 border-t border-[#1C1C1C] pt-7">
                    <div>
                      <p className="text-[9px] font-semibold uppercase tracking-[0.16em] text-[#444]">
                        Features
                      </p>

                      <p className="mt-1 text-xs text-[#555]">
                        What's included in this service.
                      </p>
                    </div>

                    <div className="mt-4 grid gap-3 md:grid-cols-2">
                      {service.features.map(
                        (feature, index) => (
                          <div
                            key={`${service._id}-feature-${index}`}
                            className="rounded-2xl border border-[#1C1C1C] bg-[#0C0C0C] p-5"
                          >
                            <div className="flex items-start gap-3">
                              <CheckCircle2
                                size={16}
                                className="mt-0.5 shrink-0 text-[#FFC400]"
                              />

                              <div className="min-w-0">
                                <h3 className="text-sm font-medium text-[#F5F5F5]">
                                  {feature.title}
                                </h3>

                                <p className="mt-2 text-xs leading-6 text-[#666]">
                                  {feature.description}
                                </p>

                                {feature.icon && (
                                  <p className="mt-3 text-[8px] uppercase tracking-[0.12em] text-[#3F3F3F]">
                                    Icon:{" "}
                                    {feature.icon}
                                  </p>
                                )}
                              </div>
                            </div>
                          </div>
                        )
                      )}
                    </div>
                  </section>
                )}

                {/* =================================================
                    PROCESS
                ================================================= */}

                {service.process?.length > 0 && (
                  <section className="mt-8 border-t border-[#1C1C1C] pt-7">
                    <div>
                      <p className="text-[9px] font-semibold uppercase tracking-[0.16em] text-[#444]">
                        Process
                      </p>

                      <p className="mt-1 text-xs text-[#555]">
                        How this service is delivered.
                      </p>
                    </div>

                    <div className="mt-4 space-y-3">
                      {service.process.map(
                        (step, index) => (
                          <div
                            key={`${service._id}-process-${index}`}
                            className="flex gap-4 rounded-2xl border border-[#1C1C1C] bg-[#0C0C0C] p-5"
                          >
                            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-[#FFC400]/15 bg-[#FFC400]/[0.04] text-[10px] font-semibold text-[#FFC400]">
                              {String(
                                step.order
                              ).padStart(2, "0")}
                            </div>

                            <div>
                              <h3 className="text-sm font-medium text-[#F5F5F5]">
                                {step.title}
                              </h3>

                              <p className="mt-2 text-xs leading-6 text-[#666]">
                                {step.description}
                              </p>
                            </div>
                          </div>
                        )
                      )}
                    </div>
                  </section>
                )}

                {/* =================================================
                    CTA
                ================================================= */}

                {(service.ctaLabel ||
                  service.ctaLink) && (
                  <section className="mt-8 border-t border-[#1C1C1C] pt-7">
                    <div className="rounded-2xl border border-[#FFC400]/10 bg-[#FFC400]/[0.02] p-5">
                      <p className="text-[9px] font-semibold uppercase tracking-[0.16em] text-[#8A7300]">
                        Call to action
                      </p>

                      <div className="mt-3 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                        <p className="text-sm text-[#A1A1A1]">
                          {service.ctaLabel ||
                            "Get Started"}
                        </p>

                        {service.ctaLink && (
                          <span className="inline-flex items-center gap-2 text-xs text-[#666]">
                            <ExternalLink
                              size={12}
                            />
                            {service.ctaLink}
                          </span>
                        )}
                      </div>
                    </div>
                  </section>
                )}

                {/* =================================================
                    KEYWORDS
                ================================================= */}

                {service.keywords?.length > 0 && (
                  <section className="mt-8 border-t border-[#1C1C1C] pt-7">
                    <p className="text-[9px] font-semibold uppercase tracking-[0.16em] text-[#444]">
                      Keywords
                    </p>

                    <div className="mt-3 flex flex-wrap gap-2">
                      {service.keywords.map(
                        (keyword, index) => (
                          <span
                            key={`${service._id}-keyword-${index}`}
                            className="rounded-full border border-[#202020] bg-[#0D0D0D] px-3 py-1.5 text-[9px] text-[#666]"
                          >
                            {keyword}
                          </span>
                        )
                      )}
                    </div>
                  </section>
                )}

                {/* =================================================
                    SYSTEM META
                ================================================= */}

                <section className="mt-8 border-t border-[#1C1C1C] pt-7">
                  <p className="text-[9px] font-semibold uppercase tracking-[0.16em] text-[#444]">
                    System information
                  </p>

                  <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                    <MetaItem
                      label="Category"
                      value={
                        service.category || "—"
                      }
                    />

                    <MetaItem
                      label="Display order"
                      value={String(
                        service.displayOrder
                      )}
                    />

                    <MetaItem
                      label="Slug"
                      value={service.slug}
                    />

                    <MetaItem
                      label="Features"
                      value={String(
                        service.features
                          ?.length ?? 0
                      )}
                    />
                  </div>
                </section>
              </div>
            </div>

            {/* =================================================
                FIXED FOOTER
            ================================================= */}

            <footer className="flex shrink-0 flex-col gap-3 border-t border-[#202020] bg-[#080808] p-4 sm:flex-row sm:items-center sm:justify-between sm:p-5">
              <button
                type="button"
                onClick={() => setDetailsOpen(false)}
                className="inline-flex items-center justify-center rounded-xl border border-[#252525] bg-[#0D0D0D] px-5 py-3 text-xs font-medium text-[#A1A1A1] transition-colors hover:border-[#444] hover:text-white"
              >
                Close
              </button>

              <div className="flex flex-col gap-2 sm:flex-row">
                <button
                  type="button"
                  className="inline-flex items-center justify-center gap-2 rounded-xl border border-red-500/15 bg-red-500/[0.04] px-5 py-3 text-xs font-semibold text-red-500 transition-colors hover:border-red-500/30 hover:bg-red-500/[0.08]"
                >
                  <Trash2 size={13} />
                  Delete
                </button>

                <Link
                  href={`/admin/services/${service._id}/edit`}
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#FFC400] px-5 py-3 text-xs font-semibold text-black transition-colors hover:bg-[#FFD23D]"
                >
                  <Pencil size={13} />
                  Edit service
                </Link>
              </div>
            </footer>
          </div>
        </div>
      )}
    </>
  );
}

/* =========================================================
   META ITEM
========================================================= */

function MetaItem({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="min-w-0 rounded-xl border border-[#1C1C1C] bg-[#0C0C0C] p-4">
      <p className="text-[8px] uppercase tracking-[0.14em] text-[#444]">
        {label}
      </p>

      <p className="mt-2 truncate text-xs text-[#A1A1A1]">
        {value}
      </p>
    </div>
  );
}