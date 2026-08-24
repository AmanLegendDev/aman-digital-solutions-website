import PricingPlanCard, {
  type PricingPlanCardData,
} from "./PricingPlanCard";

type PricingPlansSectionProps = {
  plans: PricingPlanCardData[];
};

export default function PricingPlansSection({
  plans,
}: PricingPlansSectionProps) {
  /* =========================================================
     ONLY NON-FEATURED PLANS
  ========================================================= */

  const regularPlans = plans
    .filter((plan) => !plan.isFeatured)
    .sort(
      (a, b) =>
        a.displayOrder - b.displayOrder
    );

  /* =========================================================
     EMPTY STATE
  ========================================================= */

  if (!regularPlans.length) {
    return null;
  }

  return (
    <section
      id="pricing-plans"
      className="relative border-b border-white/[0.06] bg-[#050505] py-20 sm:py-24 lg:py-28"
    >
      <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
        {/* =====================================================
            HEADER
        ===================================================== */}

        <div className="mb-12 grid gap-6 lg:grid-cols-[0.8fr_1.2fr] lg:items-end">
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#FFC400]">
              More ways to work together
            </p>

            <h2 className="mt-5 text-3xl font-semibold leading-[1.05] tracking-[-0.045em] text-white sm:text-4xl lg:text-[3.2rem]">
              Find your
              <br />
              <span className="text-neutral-500">
                right fit.
              </span>
            </h2>
          </div>

          <p className="max-w-xl text-sm leading-7 text-neutral-600 lg:justify-self-end">
            Every business is at a different stage.
            Choose the option that matches where you are
            today and upgrade when your needs grow.
          </p>
        </div>

        {/* =====================================================
            PLANS GRID
        ===================================================== */}

        <div
          className={[
            "grid gap-5",
            regularPlans.length === 1
              ? "mx-auto max-w-xl"
              : regularPlans.length === 2
                ? "mx-auto max-w-5xl md:grid-cols-2"
                : "md:grid-cols-2 xl:grid-cols-3",
          ].join(" ")}
        >
          {regularPlans.map((plan) => (
            <PricingPlanCard
              key={plan._id}
              plan={plan}
            />
          ))}
        </div>

        {/* =====================================================
            FOOTER NOTE
        ===================================================== */}

        <div className="mt-8 flex flex-col gap-3 border-t border-white/[0.06] pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-[9px] font-medium uppercase tracking-[0.16em] text-neutral-800">
            {regularPlans.length}{" "}
            {regularPlans.length === 1
              ? "plan"
              : "plans"}{" "}
            available
          </p>

          <p className="text-xs text-neutral-700">
            Not sure which one is right for you?
            We&apos;ll help you choose.
          </p>
        </div>
      </div>
    </section>
  );
}