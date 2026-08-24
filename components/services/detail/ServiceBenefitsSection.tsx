import {
  ArrowUpRight,
  Check,
  Sparkles,
} from "lucide-react";

type ServiceBenefit = {
  title: string;
  description: string;
  icon?: string;
};

type ServiceBenefitsSectionProps = {
  benefits: ServiceBenefit[];
};

export default function ServiceBenefitsSection({
  benefits,
}: ServiceBenefitsSectionProps) {
  if (!benefits.length) {
    return null;
  }

  return (
    <section
      id="service-benefits"
      aria-labelledby="service-benefits-heading"
      className="relative border-t border-white/[0.06] bg-[#050505] py-20 sm:py-24 lg:py-28"
    >
      <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
        {/* HEADER */}
        <div className="max-w-2xl">
          <div className="flex items-center gap-3">
            <span
              aria-hidden="true"
              className="flex h-8 w-8 items-center justify-center rounded-xl border border-[#FFC400]/20 bg-[#FFC400]/[0.05] text-[#FFC400]"
            >
              <Sparkles size={14} />
            </span>

            <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#FFC400]">
              Why it matters
            </span>
          </div>

          <h2
            id="service-benefits-heading"
            className="mt-5 text-3xl font-semibold leading-[1.08] tracking-[-0.04em] text-white sm:text-4xl lg:text-[3.2rem]"
          >
            More than a service.
            <br />
            <span className="text-neutral-500">
              A business advantage.
            </span>
          </h2>

          <p className="mt-5 max-w-xl text-sm leading-7 text-neutral-500 sm:text-base">
            Every part of this service is designed around
            outcomes that can make a real difference to your
            business.
          </p>
        </div>

        {/* BENEFITS */}
        <div className="mt-12 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {benefits.map((benefit, index) => (
            <article
              key={`${benefit.title}-${index}`}
              className={[
                "group relative overflow-hidden rounded-3xl border",
                "border-white/[0.07] bg-[#090909]",
                "p-6 transition-all duration-300",
                "hover:-translate-y-1 hover:border-[#FFC400]/20",
                "hover:bg-[#0B0B0B]",
              ].join(" ")}
            >
              {/* NUMBER */}
              <div className="flex items-center justify-between">
                <span
                  className={[
                    "flex h-10 w-10 items-center justify-center rounded-xl",
                    "border border-[#FFC400]/15 bg-[#FFC400]/[0.045]",
                    "text-[#FFC400]",
                  ].join(" ")}
                >
                  <Check size={17} />
                </span>

                <span className="text-[9px] font-medium tabular-nums tracking-[0.2em] text-neutral-700">
                  {String(index + 1).padStart(2, "0")}
                </span>
              </div>

              {/* CONTENT */}
              <div className="relative mt-10">
                <h3 className="text-base font-semibold tracking-[-0.015em] text-white">
                  {benefit.title}
                </h3>

                <p className="mt-3 text-sm leading-6 text-neutral-500">
                  {benefit.description}
                </p>
              </div>

              {/* BOTTOM */}
              <div className="mt-8 flex items-center justify-between border-t border-white/[0.06] pt-4">
                <span className="text-[9px] font-medium uppercase tracking-[0.16em] text-neutral-700">
                  Client outcome
                </span>

                <ArrowUpRight
                  size={15}
                  className="text-neutral-700 transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-[#FFC400]"
                />
              </div>

              {/* HOVER GLOW */}
              <span
                aria-hidden="true"
                className="pointer-events-none absolute -bottom-16 -right-16 h-32 w-32 rounded-full bg-[#FFC400]/[0.045] opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-100"
              />
            </article>
          ))}
        </div>

        {/* BOTTOM STATEMENT */}
        <div className="mt-5 rounded-3xl border border-white/[0.06] bg-[#080808] px-5 py-6 sm:px-7">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-start gap-3">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-white/[0.07] bg-white/[0.02] text-neutral-500">
                <Check size={14} />
              </div>

              <p className="max-w-2xl text-xs leading-5 text-neutral-500 sm:text-sm">
                The goal isn't simply to deliver what was
                requested. It's to create something that
                continues to provide value after launch.
              </p>
            </div>

            <span className="shrink-0 text-[9px] font-semibold uppercase tracking-[0.18em] text-[#FFC400]">
              Built for business
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}