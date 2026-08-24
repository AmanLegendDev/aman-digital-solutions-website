"use client";

import {
  ArrowRight,
  BriefcaseBusiness,
  Globe2,
  LineChart,
  LifeBuoy,
} from "lucide-react";

export type ServiceCategory =
  | "all"
  | "websites"
  | "business-systems"
  | "growth"
  | "support";

type ServiceCategoryFilterProps = {
  activeCategory: ServiceCategory;
  onCategoryChange: (
    category: ServiceCategory
  ) => void;
};

const categories = [
  {
    id: "all" as const,
    label: "All Services",
    shortLabel: "All",
    description: "Everything we build",
    icon: ArrowRight,
  },
  {
    id: "websites" as const,
    label: "Websites",
    shortLabel: "Websites",
    description: "Digital presence & experiences",
    icon: Globe2,
  },
  {
    id: "business-systems" as const,
    label: "Business Systems",
    shortLabel: "Systems",
    description: "Tools that run your business",
    icon: BriefcaseBusiness,
  },
  {
    id: "growth" as const,
    label: "Growth",
    shortLabel: "Growth",
    description: "Visibility & customer growth",
    icon: LineChart,
  },
  {
    id: "support" as const,
    label: "Support",
    shortLabel: "Support",
    description: "Ongoing digital support",
    icon: LifeBuoy,
  },
];

export default function ServiceCategoryFilter({
  activeCategory,
  onCategoryChange,
}: ServiceCategoryFilterProps) {
  return (
    <section
      aria-labelledby="service-categories-heading"
      className="relative border-y border-white/[0.06] bg-[#050505] py-10 sm:py-12"
    >
      <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
        {/* HEADER */}
        <div className="mb-7 flex flex-col gap-3 sm:mb-8 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#FFC400]">
              Explore by need
            </p>

            <h2
              id="service-categories-heading"
              className="mt-2 text-xl font-semibold tracking-[-0.025em] text-white sm:text-2xl"
            >
              Find the right solution.
            </h2>
          </div>

          <p className="max-w-sm text-xs leading-5 text-neutral-600">
            Choose an area and explore the solutions designed
            around that part of your business.
          </p>
        </div>

        {/* =====================================================
            MOBILE FILTER
        ====================================================== */}
        <div className="relative sm:hidden">
          {/* LEFT FADE */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute left-0 top-0 z-10 h-full w-8 bg-gradient-to-r from-[#050505] to-transparent"
          />

          {/* RIGHT FADE */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute right-0 top-0 z-10 h-full w-10 bg-gradient-to-l from-[#050505] to-transparent"
          />

          <div
            role="tablist"
            aria-label="Service categories"
            className="flex gap-2 overflow-x-auto px-1 pb-1 scrollbar-none"
          >
            {categories.map((category) => {
              const Icon = category.icon;
              const active =
                activeCategory === category.id;

              return (
                <button
                  key={category.id}
                  type="button"
                  role="tab"
                  aria-selected={active}
                  aria-label={category.label}
                  onClick={() =>
                    onCategoryChange(category.id)
                  }
                  className={[
                    "group relative flex shrink-0 items-center gap-2.5",
                    "rounded-full border px-3.5 py-2.5",
                    "text-left transition-all duration-300",
                    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FFC400]",
                    active
                      ? "border-[#FFC400]/35 bg-[#FFC400]/[0.09] text-white shadow-[0_0_24px_rgba(255,196,0,0.05)]"
                      : "border-white/[0.08] bg-[#090909] text-neutral-400 hover:border-white/[0.16] hover:text-white",
                  ].join(" ")}
                >
                  <span
                    className={[
                      "flex h-7 w-7 shrink-0 items-center justify-center rounded-full border transition-all duration-300",
                      active
                        ? "border-[#FFC400]/25 bg-[#FFC400]/10 text-[#FFC400]"
                        : "border-white/[0.08] bg-white/[0.02] text-neutral-600 group-hover:text-neutral-300",
                    ].join(" ")}
                  >
                    <Icon size={13} />
                  </span>

                  <span className="whitespace-nowrap text-[11px] font-medium">
                    {category.shortLabel}
                  </span>

                  {active && (
                    <span
                      aria-hidden="true"
                      className="h-1.5 w-1.5 shrink-0 rounded-full bg-[#FFC400] shadow-[0_0_8px_rgba(255,196,0,0.7)]"
                    />
                  )}
                </button>
              );
            })}
          </div>

          {/* SWIPE HINT */}
          <p className="mt-3 text-center text-[9px] font-medium uppercase tracking-[0.18em] text-neutral-700">
            Swipe to explore
          </p>
        </div>

        {/* =====================================================
            DESKTOP FILTER
        ====================================================== */}
        <div
          role="tablist"
          aria-label="Service categories"
          className="hidden gap-2 sm:grid sm:grid-cols-2 lg:grid-cols-5"
        >
          {categories.map((category) => {
            const Icon = category.icon;
            const active =
              activeCategory === category.id;

            return (
              <button
                key={category.id}
                type="button"
                role="tab"
                aria-selected={active}
                onClick={() =>
                  onCategoryChange(category.id)
                }
                className={[
                  "group relative overflow-hidden rounded-2xl border p-4 text-left",
                  "transition-all duration-300",
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FFC400]",
                  active
                    ? "border-[#FFC400]/30 bg-[#FFC400]/[0.06]"
                    : "border-white/[0.07] bg-[#090909] hover:border-white/[0.14] hover:bg-[#0C0C0C]",
                ].join(" ")}
              >
                {/* ACTIVE GLOW */}
                {active && (
                  <span
                    aria-hidden="true"
                    className="absolute -right-8 -top-8 h-20 w-20 rounded-full bg-[#FFC400]/10 blur-2xl"
                  />
                )}

                <div className="relative">
                  <div className="flex items-center justify-between">
                    <span
                      className={[
                        "flex h-9 w-9 items-center justify-center rounded-xl border transition-all duration-300",
                        active
                          ? "border-[#FFC400]/20 bg-[#FFC400]/10 text-[#FFC400]"
                          : "border-white/[0.07] bg-white/[0.02] text-neutral-500 group-hover:text-neutral-300",
                      ].join(" ")}
                    >
                      <Icon size={16} />
                    </span>

                    <span
                      className={[
                        "text-[9px] font-medium tabular-nums tracking-[0.15em] transition-colors",
                        active
                          ? "text-[#FFC400]"
                          : "text-neutral-700",
                      ].join(" ")}
                    >
                      {String(
                        categories.indexOf(category) + 1
                      ).padStart(2, "0")}
                    </span>
                  </div>

                  <div className="mt-5">
                    <p
                      className={[
                        "text-sm font-semibold transition-colors",
                        active
                          ? "text-white"
                          : "text-neutral-300 group-hover:text-white",
                      ].join(" ")}
                    >
                      {category.label}
                    </p>

                    <p className="mt-1 text-[10px] leading-4 text-neutral-600">
                      {category.description}
                    </p>
                  </div>
                </div>

                {/* ACTIVE INDICATOR */}
                <span
                  aria-hidden="true"
                  className={[
                    "absolute bottom-0 left-1/2 h-[2px] -translate-x-1/2 rounded-full bg-[#FFC400] transition-all duration-300",
                    active
                      ? "w-10"
                      : "w-0 group-hover:w-5",
                  ].join(" ")}
                />
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}