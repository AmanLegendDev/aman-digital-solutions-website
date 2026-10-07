import { Check } from "lucide-react";

type OfferHighlightsProps = {
  highlights: string[];
};

export default function OfferHighlights({
  highlights,
}: OfferHighlightsProps) {
  const visibleHighlights = highlights
    .filter(
      (highlight) => highlight.trim().length > 0,
    )
    .slice(0, 5);

  if (visibleHighlights.length === 0) {
    return null;
  }

  return (
    <ul
      aria-label="Offer highlights"
      className="grid gap-3 sm:grid-cols-2"
    >
      {visibleHighlights.map(
        (highlight, index) => (
          <li
            key={`${highlight}-${index}`}
            className="flex items-start gap-3 text-sm leading-6 text-[#8A8A91]"
          >
            <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border border-[#FFD400]/15 bg-[#FFD400]/[0.06] text-[#FFD400]">
              <Check
                aria-hidden="true"
                className="h-3 w-3"
                strokeWidth={2.5}
              />
            </span>

            <span>{highlight}</span>
          </li>
        ),
      )}
    </ul>
  );
}