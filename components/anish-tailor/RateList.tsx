
export type TailoringRate = {
  name: string;
  price: number;
  description?: string;
};

const tailoringRates: TailoringRate[] = [
  {
    name: "Simple Suit",
    price: 600,
    description: "Elegant everyday stitching",
  },
  {
    name: "Half Lining",
    price: 850,
    description: "Comfortable half-lined finish",
  },
  {
    name: "Full Lining",
    price: 1300,
    description: "Complete lining finish",
  },
  {
    name: "Full Saree Stitching",
    price: 1700,
    description: "Beautifully finished saree stitching",
  },
  {
    name: "Petticoat",
    price: 1300,
    description: "Custom-fitted stitching",
  },
  {
    name: "Resta",
    price: 1500,
    description: "Custom tailoring service",
  },
  {
    name: "Lehenga",
    price: 1600,
    description: "Traditional occasion wear",
  },
  {
    name: "Simple Blouse",
    price: 700,
    description: "Classic blouse stitching",
  },
  {
    name: "Padded Blouse",
    price: 900,
    description: "Padded blouse stitching",
  },
  {
    name: "Farshi Salwar Suit",
    price: 900,
    description: "Traditional Farshi salwar stitching",
  },
];

function formatPrice(price: number) {
  return new Intl.NumberFormat("en-IN").format(price);
}

function RateCard({ rate, index }: { rate: TailoringRate; index: number }) {
  return (
    <article className="group relative flex min-h-[112px] items-center justify-between gap-4 overflow-hidden rounded-2xl border border-[#E9DCC4] bg-white p-4 shadow-sm transition duration-300 hover:-translate-y-1 hover:border-[#C6A35B] hover:shadow-lg hover:shadow-[#741B2B]/5 sm:p-5">
      <div className="flex min-w-0 items-center gap-4">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-[#E6D3A9] bg-[#FAF4E8] font-serif text-sm font-semibold text-[#741B2B]">
          {String(index + 1).padStart(2, "0")}
        </div>

        <div className="min-w-0">
          <h3 className="font-serif text-base font-semibold text-[#741B2B] sm:text-lg">
            {rate.name}
          </h3>
          {rate.description && (
            <p className="mt-1 text-xs leading-5 text-[#8A786D] sm:text-sm">
              {rate.description}
            </p>
          )}
        </div>
      </div>

      <div className="shrink-0 text-right">
        <span className="block text-[10px] font-semibold uppercase tracking-wider text-[#A17A35]">
          Price
        </span>
        <p className="mt-1 font-serif text-xl font-bold tabular-nums text-[#741B2B] sm:text-2xl">
          ₹{formatPrice(rate.price)}
        </p>
      </div>

      <div className="pointer-events-none absolute bottom-0 left-0 h-[2px] w-0 bg-[#C6A35B] transition-all duration-300 group-hover:w-full" />
    </article>
  );
}

export default function RateList() {
  return (
    <section
      id="stitching-rates"
      className="relative overflow-hidden bg-[#FBF8F1] px-5 py-16 sm:px-8 sm:py-20"
    >
      <div className="pointer-events-none absolute -right-28 top-20 h-72 w-72 rounded-full bg-[#EAD8AE]/25 blur-3xl" />

      <div className="relative mx-auto max-w-5xl">
        {/* Section heading */}
        <div className="mb-10 text-center sm:mb-14">
          <p className="text-xs font-bold uppercase tracking-[0.25em] text-[#A17A35]">
            Quality Craftsmanship
          </p>

          <h2 className="mt-3 font-serif text-3xl font-semibold text-[#741B2B] sm:text-5xl">
            Our Stitching Rates
          </h2>

          <div className="mx-auto mt-5 flex max-w-xs items-center justify-center gap-3">
            <span className="h-px flex-1 bg-[#D8BC7B]" />
            <span className="text-lg text-[#B88B3B]">✦</span>
            <span className="h-px flex-1 bg-[#D8BC7B]" />
          </div>

          <p className="mx-auto mt-4 max-w-xl text-sm leading-7 text-[#79685D] sm:text-base">
            Explore our tailoring services and stitching prices.
            Crafted with experience, care and attention to every detail.
          </p>
        </div>

        {/* Rates grid */}
        <div className="grid gap-3 sm:grid-cols-2 sm:gap-4">
          {tailoringRates.map((rate, index) => (
            <RateCard key={rate.name} rate={rate} index={index} />
          ))}
        </div>

        {/* Closing note */}
        <div className="mt-10 rounded-2xl border border-[#E7D6B2] bg-[#FFFDF9] px-5 py-6 text-center">
          <p className="font-serif text-lg font-semibold text-[#741B2B]">
            Every Stitch Tells a Story
          </p>
          <p className="mt-2 text-sm leading-6 text-[#79685D]">
            Thank you for choosing Anish Tailor. We look forward to stitching
            something beautiful for you.
          </p>
        </div>
      </div>
    </section>
  );
}
