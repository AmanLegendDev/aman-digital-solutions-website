import { Check, Sparkles } from "lucide-react";

type OfferDetailHighlightsProps = {
  highlights: string[];
  description: string;
};

export default function OfferDetailHighlights({
  highlights,
  description,
}: OfferDetailHighlightsProps) {
  const visibleHighlights = highlights.filter(
    (item) => item.trim().length > 0,
  );

  return (
    <section
      aria-labelledby="offer-highlights-heading"
      className="border-b border-[#1A1A1A] bg-[#050505] px-5 py-20 sm:px-8 sm:py-24 lg:px-10 lg:py-28"
    >
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-12 lg:grid-cols-[0.7fr_1.3fr] lg:gap-20">
          {/* Intro */}
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-semibold tracking-[0.18em] text-[#FFD400] uppercase">
              <Sparkles
                aria-hidden="true"
                className="h-3.5 w-3.5"
              />

              The offer
            </div>

            <h2
              id="offer-highlights-heading"
              className="mt-4 text-3xl font-semibold tracking-[-0.04em] text-[#F8FAFC] sm:text-4xl"
            >
              Built around what your business actually needs.
            </h2>

            <p className="mt-5 max-w-xl text-sm leading-7 text-[#71717A] sm:text-base sm:leading-8">
              {description}
            </p>
          </div>

          {/* Highlights */}
          <div className="min-w-0">
            {visibleHighlights.length > 0 ? (
              <div className="grid gap-3 sm:grid-cols-2">
                {visibleHighlights.map(
                  (highlight, index) => (
                    <div
                      key={`${highlight}-${index}`}
                      className="group rounded-2xl border border-[#1A1A1A] bg-[#0A0A0A] p-5 transition duration-300 hover:border-[#FFD400]/20 hover:bg-[#0D0D0D]"
                    >
                      <span className="flex h-9 w-9 items-center justify-center rounded-xl border border-[#FFD400]/15 bg-[#FFD400]/[0.06] text-[#FFD400] transition group-hover:border-[#FFD400]/25 group-hover:bg-[#FFD400]/10">
                        <Check
                          aria-hidden="true"
                          className="h-4 w-4"
                          strokeWidth={2.5}
                        />
                      </span>

                      <p className="mt-5 text-sm font-medium leading-6 text-[#D4D4D8]">
                        {highlight}
                      </p>
                    </div>
                  ),
                )}
              </div>
            ) : (
              <div className="rounded-2xl border border-[#1A1A1A] bg-[#0A0A0A] p-6 text-sm text-[#71717A]">
                The offer scope will be confirmed during the project
                discussion.
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}