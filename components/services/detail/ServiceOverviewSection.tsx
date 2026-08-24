import {
  ArrowUpRight,
  CheckCircle2,
  Sparkles,
} from "lucide-react";

type ServiceOverviewSectionProps = {
  description: string;
  title?: string;
};

export default function ServiceOverviewSection({
  description,
  title = "Built around your business.",
}: ServiceOverviewSectionProps) {
  const paragraphs = description
    .split(/\n+/)
    .map((paragraph) => paragraph.trim())
    .filter(Boolean);

  return (
    <section
      id="service-overview"
      aria-labelledby="service-overview-heading"
      className="relative border-t border-white/[0.06] bg-[#060606] py-20 sm:py-24 lg:py-28"
    >
      {/* BACKGROUND DETAIL */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute right-[-120px] top-1/2 h-[300px] w-[300px] -translate-y-1/2 rounded-full bg-[#FFC400]/[0.025] blur-[100px]"
      />

      <div className="relative mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
        <div className="grid gap-12 lg:grid-cols-[0.72fr_1.28fr] lg:gap-20">
          {/* LEFT */}
          <div className="lg:sticky lg:top-28 lg:self-start">
            <div className="flex items-center gap-3">
              <span
                aria-hidden="true"
                className="flex h-8 w-8 items-center justify-center rounded-xl border border-[#FFC400]/20 bg-[#FFC400]/[0.05] text-[#FFC400]"
              >
                <Sparkles size={14} />
              </span>

              <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#FFC400]">
                The approach
              </span>
            </div>

            <h2
              id="service-overview-heading"
              className="mt-5 max-w-sm text-3xl font-semibold leading-[1.08] tracking-[-0.04em] text-white sm:text-4xl"
            >
              {title}
            </h2>

            <p className="mt-5 max-w-sm text-sm leading-6 text-neutral-600">
              We don't build digital products just to
              fill a screen. Every decision should have
              a reason behind it.
            </p>

            {/* SMALL TRUST LIST */}
            <div className="mt-8 space-y-3 border-t border-white/[0.06] pt-7">
              {[
                "Business-first thinking",
                "Purposeful user experiences",
                "Built for long-term growth",
              ].map((item) => (
                <div
                  key={item}
                  className="flex items-center gap-2.5"
                >
                  <CheckCircle2
                    size={14}
                    className="shrink-0 text-[#FFC400]"
                  />

                  <span className="text-xs text-neutral-500">
                    {item}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT — DESCRIPTION */}
          <div className="relative">
            {/* ACCENT LINE */}
            <div
              aria-hidden="true"
              className="absolute -left-5 top-1 h-20 w-px bg-gradient-to-b from-[#FFC400] to-transparent lg:-left-8"
            />

            <div className="space-y-6">
              {paragraphs.map((paragraph, index) => (
                <p
                  key={`${index}-${paragraph.slice(0, 20)}`}
                  className={[
                    "max-w-3xl leading-8",
                    index === 0
                      ? "text-xl font-medium tracking-[-0.02em] text-neutral-200 sm:text-2xl sm:leading-9"
                      : "text-sm text-neutral-500 sm:text-base sm:leading-8",
                  ].join(" ")}
                >
                  {paragraph}
                </p>
              ))}
            </div>

            {/* BOTTOM CALLOUT */}
            <div className="mt-10 flex flex-col gap-4 rounded-2xl border border-white/[0.07] bg-[#0A0A0A] p-5 sm:flex-row sm:items-center sm:justify-between sm:p-6">
              <div className="flex items-start gap-3">
                <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-[#FFC400]/15 bg-[#FFC400]/[0.05] text-[#FFC400]">
                  <CheckCircle2 size={15} />
                </div>

                <div>
                  <p className="text-sm font-medium text-white">
                    Ready to build something that matters?
                  </p>

                  <p className="mt-1 text-xs leading-5 text-neutral-600">
                    Let's turn your business goals into a
                    digital experience built with purpose.
                  </p>
                </div>
              </div>

              <a
                href="/booking"
                className="group inline-flex shrink-0 items-center gap-2 text-xs font-semibold text-[#FFC400] transition-colors hover:text-[#FFD43B]"
              >
                Start a conversation

                <ArrowUpRight
                  size={14}
                  className="transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}