
export type TailoringRate = {
  name: string;
  price: number;
  description: string;
};

type RateCardProps = {
  rate: TailoringRate;
  index: number;
};

export default function RateCard({ rate, index }: RateCardProps) {
  return (
    <article className="group relative flex min-h-[112px] items-center justify-between gap-3 overflow-hidden rounded-2xl border border-[#E9DCC4] bg-white p-4 shadow-sm transition duration-300 hover:-translate-y-1 hover:border-[#C6A35B] hover:shadow-lg hover:shadow-[#741B2B]/10 sm:p-5">
      <div className="flex min-w-0 items-center gap-3 sm:gap-4">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-[#E6D3A9] bg-[#FAF4E8] font-serif text-sm font-semibold text-[#741B2B]">
          {String(index + 1).padStart(2, "0")}
        </div>

        <div className="min-w-0">
          <h3 className="font-serif text-base font-semibold leading-snug text-[#741B2B] sm:text-lg">
            {rate.name}
          </h3>
          <p className="mt-1 text-xs leading-5 text-[#8A786D] sm:text-sm">
            {rate.description}
          </p>
        </div>
      </div>

      <div className="shrink-0 text-right">
        <span className="block text-[9px] font-semibold uppercase tracking-[0.18em] text-[#A17A35]">
          Price
        </span>
        <p className="mt-1 font-serif text-xl font-bold tabular-nums text-[#741B2B] sm:text-2xl">
          ₹{rate.price.toLocaleString("en-IN")}
        </p>
      </div>

      <div className="pointer-events-none absolute bottom-0 left-0 h-[2px] w-0 bg-[#C6A35B] transition-all duration-300 group-hover:w-full" />
    </article>
  );
}
