import {
  FileText,
  ShieldCheck,
} from "lucide-react";

type OfferDetailTermsProps = {
  terms: string;
};

export default function OfferDetailTerms({
  terms,
}: OfferDetailTermsProps) {
  if (!terms.trim()) {
    return null;
  }

  const paragraphs = terms
    .split(/\n+/)
    .map((paragraph) => paragraph.trim())
    .filter(Boolean);

  return (
    <section
      aria-labelledby="offer-terms-heading"
      className="border-b border-[#1A1A1A] bg-[#050505] px-5 py-20 sm:px-8 sm:py-24 lg:px-10 lg:py-28"
    >
      <div className="mx-auto max-w-4xl">
        <div className="rounded-[2rem] border border-[#1A1A1A] bg-[#0A0A0A] p-6 sm:p-8 lg:p-10">
          {/* Header */}
          <div className="flex items-start gap-4">
            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-[#FFD400]/15 bg-[#FFD400]/[0.06] text-[#FFD400]">
              <FileText
                aria-hidden="true"
                className="h-5 w-5"
              />
            </span>

            <div>
              <p className="text-xs font-semibold tracking-[0.18em] text-[#FFD400] uppercase">
                Important information
              </p>

              <h2
                id="offer-terms-heading"
                className="mt-2 text-2xl font-semibold tracking-[-0.035em] text-[#F8FAFC] sm:text-3xl"
              >
                Terms &amp; conditions
              </h2>
            </div>
          </div>

          {/* Terms */}
          <div className="mt-8 space-y-5 border-t border-[#1A1A1A] pt-7">
            {paragraphs.map((paragraph, index) => (
              <p
                key={`${index}-${paragraph.slice(0, 30)}`}
                className="text-sm leading-7 text-[#71717A]"
              >
                {paragraph}
              </p>
            ))}
          </div>

          {/* Trust note */}
          <div className="mt-8 flex gap-3 rounded-2xl border border-[#1A1A1A] bg-[#050505] p-4">
            <ShieldCheck
              aria-hidden="true"
              className="mt-0.5 h-4 w-4 shrink-0 text-[#FFD400]"
            />

            <p className="text-xs leading-6 text-[#52525B]">
              Final project scope, requirements and any external costs will
              be confirmed before development begins.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}