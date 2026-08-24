import {
  ArrowUpRight,
  CheckCircle2,
  Code2,
  Layers3,
  Sparkles,
} from "lucide-react";

type ServiceFeature = {
  title: string;
  description: string;
  icon?: string;
};

type ServiceFeaturesSectionProps = {
  features: ServiceFeature[];
};

export default function ServiceFeaturesSection({
  features,
}: ServiceFeaturesSectionProps) {
  if (!features.length) {
    return null;
  }

  return (
    <section
      id="service-features"
      aria-labelledby="service-features-heading"
      className="relative overflow-hidden border-t border-white/[0.06] bg-[#060606] py-20 sm:py-24 lg:py-28"
    >
      {/* BACKGROUND GRID */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.035]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.08) 1px, transparent 1px)",
          backgroundSize: "64px 64px",
        }}
      />

      <div className="relative mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
        {/* HEADER */}
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl">
            <div className="flex items-center gap-3">
              <span
                aria-hidden="true"
                className="flex h-8 w-8 items-center justify-center rounded-xl border border-[#FFC400]/20 bg-[#FFC400]/[0.05] text-[#FFC400]"
              >
                <Code2 size={14} />
              </span>

              <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#FFC400]">
                What's included
              </span>
            </div>

            <h2
              id="service-features-heading"
              className="mt-5 text-3xl font-semibold leading-[1.08] tracking-[-0.04em] text-white sm:text-4xl lg:text-[3.2rem]"
            >
              Everything needed to
              <br />
              <span className="text-neutral-500">
                make it work.
              </span>
            </h2>
          </div>

          <p className="max-w-md text-sm leading-7 text-neutral-500 lg:pb-1">
            Every capability is selected to create a
            stronger, more useful and more reliable
            digital experience for your business.
          </p>
        </div>

        {/* FEATURE LIST */}
        <div className="mt-12 overflow-hidden rounded-[28px] border border-white/[0.07] bg-[#090909]">
          {features.map((feature, index) => (
            <article
              key={`${feature.title}-${index}`}
              className={[
                "group relative grid gap-5 px-5 py-7 sm:px-7 lg:grid-cols-[90px_1fr_1.1fr_auto] lg:items-center lg:gap-8 lg:px-8",
                index !== features.length - 1
                  ? "border-b border-white/[0.06]"
                  : "",
              ].join(" ")}
            >
              {/* NUMBER / ICON */}
              <div className="flex items-center justify-between lg:block">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-white/[0.08] bg-white/[0.025] text-neutral-500 transition-all duration-300 group-hover:border-[#FFC400]/20 group-hover:bg-[#FFC400]/[0.05] group-hover:text-[#FFC400]">
                  <Layers3 size={17} />
                </div>

                <span className="text-[9px] font-medium tabular-nums tracking-[0.2em] text-neutral-700 lg:mt-4 lg:block">
                  {String(index + 1).padStart(2, "0")}
                </span>
              </div>

              {/* TITLE */}
              <div>
                <h3 className="text-base font-semibold tracking-[-0.015em] text-white transition-colors duration-300 group-hover:text-[#FFC400]">
                  {feature.title}
                </h3>
              </div>

              {/* DESCRIPTION */}
              <p className="max-w-xl text-sm leading-6 text-neutral-500">
                {feature.description}
              </p>

              {/* STATUS */}
              <div className="flex items-center justify-between gap-4 lg:justify-end">
                <span className="inline-flex items-center gap-1.5 rounded-full border border-white/[0.07] bg-white/[0.02] px-3 py-1.5 text-[9px] font-medium uppercase tracking-[0.14em] text-neutral-600">
                  <CheckCircle2 size={11} />
                  Included
                </span>

                <ArrowUpRight
                  size={16}
                  className="text-neutral-700 transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-[#FFC400]"
                />
              </div>

              {/* HOVER LINE */}
              <span
                aria-hidden="true"
                className="absolute bottom-0 left-0 h-px w-0 bg-gradient-to-r from-[#FFC400] to-transparent transition-all duration-500 group-hover:w-full"
              />
            </article>
          ))}
        </div>

        {/* BOTTOM DETAIL */}
        <div className="mt-5 grid gap-3 sm:grid-cols-2">
          <div className="rounded-2xl border border-white/[0.06] bg-[#090909] p-5">
            <div className="flex items-center gap-3">
              <Sparkles
                size={15}
                className="text-[#FFC400]"
              />

              <span className="text-[10px] font-semibold uppercase tracking-[0.16em] text-neutral-500">
                Quality by design
              </span>
            </div>

            <p className="mt-3 text-xs leading-5 text-neutral-600">
              Each deliverable works as part of the larger
              system instead of being treated as an isolated
              feature.
            </p>
          </div>

          <div className="rounded-2xl border border-white/[0.06] bg-[#090909] p-5">
            <div className="flex items-center gap-3">
              <CheckCircle2
                size={15}
                className="text-[#FFC400]"
              />

              <span className="text-[10px] font-semibold uppercase tracking-[0.16em] text-neutral-500">
                Built to perform
              </span>
            </div>

            <p className="mt-3 text-xs leading-5 text-neutral-600">
              From responsive behavior to performance and
              usability, the details are considered from the
              beginning.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}