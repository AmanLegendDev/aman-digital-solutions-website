import {
  ArrowUpRight,
  Check,
  Sparkles,
} from "lucide-react";

type ServicePricingSectionProps = {
  title: string;
  priceLabel?: string;
  startingPrice?: number;
  ctaLabel?: string;
  ctaLink?: string;
};

function formatPrice(price?: number) {
  if (typeof price !== "number") {
    return null;
  }

  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(price);
}

export default function ServicePricingSection({
  title,
  priceLabel,
  startingPrice,
  ctaLabel,
  ctaLink,
}: ServicePricingSectionProps) {
  const formattedPrice = formatPrice(
    startingPrice
  );

  const displayLabel =
    priceLabel || "Let's discuss";

  const buttonLabel =
    ctaLabel || "Get Started";

  const buttonHref =
    ctaLink || "/booking";

  return (
    <section
      id="service-pricing"
      aria-labelledby="service-pricing-heading"
      className="relative overflow-hidden border-t border-white/[0.06] bg-[#050505] py-20 sm:py-24 lg:py-28"
    >
      {/* BACKGROUND GLOW */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-1/2 h-[420px] w-[420px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#FFC400]/[0.035] blur-[110px]"
      />

      <div className="relative mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
        <div className="overflow-hidden rounded-[32px] border border-[#FFC400]/15 bg-[#090909]">
          <div className="grid lg:grid-cols-[1fr_0.85fr]">
            {/* LEFT */}
            <div className="relative p-7 sm:p-10 lg:p-14">
              <div className="flex items-center gap-3">
                <span className="flex h-9 w-9 items-center justify-center rounded-xl border border-[#FFC400]/20 bg-[#FFC400]/[0.05] text-[#FFC400]">
                  <Sparkles size={15} />
                </span>

                <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#FFC400]">
                  Investment
                </span>
              </div>

              <h2
                id="service-pricing-heading"
                className="mt-6 max-w-xl text-3xl font-semibold leading-[1.08] tracking-[-0.04em] text-white sm:text-4xl lg:text-[3.1rem]"
              >
                Build something that
                <br />
                <span className="text-neutral-500">
                  works for your business.
                </span>
              </h2>

              <p className="mt-5 max-w-lg text-sm leading-7 text-neutral-500">
                Every project is scoped around your goals,
                requirements and the level of functionality
                your business actually needs.
              </p>

              {/* WHAT'S INCLUDED */}
              <div className="mt-9 space-y-3">
                {[
                  "Strategy-led project planning",
                  "Responsive and conversion-focused experience",
                  "Performance and SEO-ready foundations",
                  "Testing, launch and final handover",
                ].map((item) => (
                  <div
                    key={item}
                    className="flex items-center gap-3"
                  >
                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-[#FFC400]/15 bg-[#FFC400]/[0.04] text-[#FFC400]">
                      <Check size={12} />
                    </span>

                    <span className="text-xs text-neutral-400">
                      {item}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* RIGHT PRICING CARD */}
            <div className="relative border-t border-white/[0.06] bg-[#0C0C0C] p-7 sm:p-10 lg:border-l lg:border-t-0 lg:p-14">
              <div className="flex items-center justify-between">
                <span className="text-[9px] font-semibold uppercase tracking-[0.18em] text-neutral-600">
                  {displayLabel}
                </span>

                <span className="rounded-full border border-white/[0.07] px-2.5 py-1 text-[8px] font-medium uppercase tracking-[0.12em] text-neutral-600">
                  {title}
                </span>
              </div>

              <div className="mt-6">
                {formattedPrice ? (
                  <>
                    <div className="flex items-end gap-2">
                      <span className="text-4xl font-semibold tracking-[-0.04em] text-white sm:text-5xl">
                        {formattedPrice}
                      </span>
                    </div>

                    <p className="mt-2 text-xs text-neutral-600">
                      Final pricing depends on project scope
                      and requirements.
                    </p>
                  </>
                ) : (
                  <>
                    <span className="text-4xl font-semibold tracking-[-0.04em] text-white sm:text-5xl">
                      Custom
                    </span>

                    <p className="mt-2 text-xs text-neutral-600">
                      Let's discuss your requirements and
                      create the right scope for your business.
                    </p>
                  </>
                )}
              </div>

              {/* CTA */}
              <a
                href={buttonHref}
                className="group mt-9 flex w-full items-center justify-between rounded-2xl bg-[#FFC400] px-5 py-4 text-sm font-semibold text-black transition-all duration-300 hover:bg-[#FFD43B] hover:shadow-[0_12px_35px_rgba(255,196,0,0.12)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FFC400] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0C0C0C]"
              >
                <span>{buttonLabel}</span>

                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-black/10 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
                  <ArrowUpRight size={17} />
                </span>
              </a>

              <p className="mt-4 text-center text-[9px] leading-4 text-neutral-700">
                No pressure. Tell us what you're building and
                we'll help you understand the right next step.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}