type OfferDetailPriceProps = {
  offerPrice: number | null;
  originalPrice: number | null;

  discountType:
    | "percentage"
    | "fixed"
    | "none";

  discountValue: number | null;
  discountLabel: string | null;

  expired?: boolean;
};

function formatPrice(value: number) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(value);
}

export default function OfferDetailPrice({
  offerPrice,
  originalPrice,
  discountType,
  discountValue,
  discountLabel,
  expired = false,
}: OfferDetailPriceProps) {
  const hasOfferPrice =
    offerPrice !== null &&
    Number.isFinite(offerPrice);

  const hasOriginalPrice =
    originalPrice !== null &&
    Number.isFinite(originalPrice);

  const hasDiscount =
    discountValue !== null &&
    Number.isFinite(discountValue) &&
    discountValue > 0;

  const hasRealReduction =
    hasOfferPrice &&
    hasOriginalPrice &&
    offerPrice !== null &&
    originalPrice !== null &&
    offerPrice < originalPrice;

  /*
   * Custom quote / no price.
   */
  if (!hasOfferPrice && !hasOriginalPrice) {
    return (
      <div className="rounded-2xl border border-[#1A1A1A] bg-[#0A0A0A] px-5 py-4">
        <p className="text-[10px] font-semibold tracking-[0.18em] text-[#52525B] uppercase">
          Project pricing
        </p>

        <p className="mt-1 text-xl font-semibold text-[#F8FAFC]">
          Custom quote
        </p>

        <p className="mt-1 text-xs text-[#71717A]">
          Final pricing depends on project scope.
        </p>
      </div>
    );
  }

  return (
    <div>
      {/* Price label */}
      <p className="text-[10px] font-semibold tracking-[0.18em] text-[#52525B] uppercase">
        {expired
          ? "Previous offer price"
          : "Special offer price"}
      </p>

      <div className="mt-2 flex flex-wrap items-end gap-x-4 gap-y-2">
        {/* Current offer price */}
        {hasOfferPrice &&
          offerPrice !== null && (
            <span
              className={[
                "text-4xl font-semibold tracking-[-0.05em] sm:text-5xl",
                expired
                  ? "text-[#71717A]"
                  : "text-[#F8FAFC]",
              ].join(" ")}
            >
              {formatPrice(offerPrice)}
            </span>
          )}

        {/* Original */}
        {hasOriginalPrice &&
          originalPrice !== null &&
          hasRealReduction && (
            <span className="pb-1 text-lg text-[#52525B] line-through">
              {formatPrice(originalPrice)}
            </span>
          )}

        {/* Discount */}
        {!expired &&
          hasDiscount &&
          discountType !== "none" &&
          discountValue !== null && (
            <span className="mb-1 rounded-full border border-[#FFD400]/25 bg-[#FFD400]/[0.06] px-3 py-1.5 text-xs font-bold text-[#FFD400]">
              {discountLabel ||
                (discountType === "percentage"
                  ? `${discountValue}% OFF`
                  : `${formatPrice(discountValue)} OFF`)}
            </span>
          )}
      </div>

      {/* Saving message */}
      {hasRealReduction &&
        offerPrice !== null &&
        originalPrice !== null && (
          <p
            className={[
              "mt-2 text-xs",
              expired
                ? "text-[#52525B]"
                : "text-[#71717A]",
            ].join(" ")}
          >
            {expired
              ? `The promotional price was ${formatPrice(offerPrice)}.`
              : `Save ${formatPrice(
                  originalPrice - offerPrice,
                )} on this offer.`}
          </p>
        )}
    </div>
  );
}