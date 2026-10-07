import {
  CheckCircle2,
  Layers3,
} from "lucide-react";

type OfferDetailFeaturesProps = {
  features: string[];
};

export default function OfferDetailFeatures({
  features,
}: OfferDetailFeaturesProps) {
  const visibleFeatures = features.filter(
    (item) => item.trim().length > 0,
  );

  if (visibleFeatures.length === 0) {
    return null;
  }

  return (
    <section
      aria-labelledby="offer-features-heading"
      className="border-b border-[#1A1A1A] bg-[#080808] px-5 py-20 sm:px-8 sm:py-24 lg:px-10 lg:py-28"
    >
      <div className="mx-auto max-w-7xl">
        {/* Section intro */}
        <div className="max-w-2xl">
          <div className="inline-flex items-center gap-2 text-xs font-semibold tracking-[0.18em] text-[#FFD400] uppercase">
            <Layers3
              aria-hidden="true"
              className="h-3.5 w-3.5"
            />

            What&apos;s included
          </div>

          <h2
            id="offer-features-heading"
            className="mt-4 text-3xl font-semibold tracking-[-0.04em] text-[#F8FAFC] sm:text-4xl"
          >
            Everything included in this offer.
          </h2>

          <p className="mt-5 text-sm leading-7 text-[#71717A] sm:text-base sm:leading-8">
            The scope below describes what is included in the promotional
            package. Any additional requirements can be discussed before
            development begins.
          </p>
        </div>

        {/* Feature list */}
        <div className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {visibleFeatures.map((feature, index) => (
            <div
              key={`${feature}-${index}`}
              className="flex min-h-[92px] items-start gap-4 rounded-2xl border border-[#1A1A1A] bg-[#0A0A0A] p-5 transition duration-300 hover:border-[#FFD400]/15 hover:bg-[#0D0D0D]"
            >
              <span className="mt-0.5 shrink-0 text-[#FFD400]">
                <CheckCircle2
                  aria-hidden="true"
                  className="h-5 w-5"
                  strokeWidth={1.8}
                />
              </span>

              <p className="text-sm leading-6 text-[#A1A1AA]">
                {feature}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}