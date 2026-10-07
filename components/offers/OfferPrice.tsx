type OfferPriceProps = {
  offerPrice: number | null;
  originalPrice: number | null;
  discountType: "percentage" | "fixed" | "none";
  discountValue: number | null;
};

function formatPrice(value: number) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(value);
}

export default function OfferPrice({
  offerPrice,
  originalPrice,
  discountType,
  discountValue,
}: OfferPriceProps) {
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

  /*
   * No price supplied:
   * keep the card useful for custom-quote offers.
   */
  if (!hasOfferPrice && !hasOriginalPrice) {
    return (
      <div>
        <p className="text-xs font-semibold tracking-[0.16em] text-[#52525B] uppercase">
          Pricing
        </p>

        <p className="mt-1 text-lg font-semibold text-[#F8FAFC]">
          Custom quote
        </p>
      </div>
    );
  }

  const currentPrice = hasOfferPrice
    ? offerPrice
    : originalPrice;

  return (
    <div>
      <div className="flex flex-wrap items-end gap-x-3 gap-y-2">
        {currentPrice !== null && (
          <span className="text-3xl font-semibold tracking-[-0.045em] text-[#F8FAFC] sm:text-4xl">
            {formatPrice(currentPrice)}
          </span>
        )}

        {hasOfferPrice &&
          hasOriginalPrice &&
          originalPrice !== null &&
          offerPrice !== null &&
          originalPrice > offerPrice && (
            <span className="pb-1 text-sm text-[#52525B] line-through">
              {formatPrice(originalPrice)}
            </span>
          )}

        {hasDiscount &&
          discountType !== "none" &&
          discountValue !== null && (
            <span className="pb-1 text-sm font-semibold text-[#FFD400]">
              {discountType === "percentage"
                ? `${discountValue}% OFF`
                : `${formatPrice(discountValue)} OFF`}
            </span>
          )}
      </div>

      {hasOfferPrice &&
        hasOriginalPrice &&
        originalPrice !== null &&
        offerPrice !== null &&
        originalPrice > offerPrice && (
          <p className="mt-2 text-xs text-[#71717A]">
            Special offer pricing
          </p>
        )}
    </div>
  );
}