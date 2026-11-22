
import Image from "next/image";

const contactNumbers = ["8219800388", "9816941390"];

export default function BrandHeader() {
  return (
    <header className="relative overflow-hidden bg-[#FFFDF9]">
      {/* Decorative background */}
      <div className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-[#F3E4C1]/40 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-20 -left-20 h-64 w-64 rounded-full bg-[#741B2B]/5 blur-3xl" />

      <div className="relative mx-auto max-w-6xl px-5 pb-12 pt-8 sm:px-8 sm:pb-16 sm:pt-12">
        {/* Brand logo */}
        <div className="flex justify-center">
          <Image
            src="/anishlogo.png"
            alt="Anish Tailor logo"
            width={560}
            height={360}
            priority
            className="h-auto max-h-56 w-auto max-w-full object-contain sm:max-h-64"
          />
        </div>

        {/* Brand introduction */}
        <div className="mx-auto mt-8 grid max-w-4xl items-center gap-8 md:grid-cols-[1fr_220px] md:gap-12">
          <div className="text-center md:text-left">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#D8B66A]/50 bg-[#F8F0DE] px-4 py-2">
              <span className="h-2 w-2 rounded-full bg-[#741B2B]" />
              <span className="text-xs font-semibold uppercase tracking-[0.18em] text-[#741B2B]">
                Trusted Tailoring Since 15 Years
              </span>
            </div>

            <h1 className="font-serif text-4xl font-semibold tracking-tight text-[#741B2B] sm:text-5xl">
              Anish Tailor
            </h1>

            <p className="mt-3 text-sm leading-7 text-[#6E5A50] sm:text-base">
              Experience the perfect blend of craftsmanship, comfort and
              personal style. Every stitch is made with care and attention
              to detail.
            </p>

            <div className="mt-6 flex flex-wrap justify-center gap-3 md:justify-start">
              <a
                href="#stitching-rates"
                className="rounded-full bg-[#741B2B] px-6 py-3 text-sm font-semibold text-white shadow-md shadow-[#741B2B]/15 transition hover:bg-[#5D1422]"
              >
                Explore Stitching Rates
              </a>

              <a
                href={`tel:${contactNumbers[0]}`}
                className="rounded-full border border-[#B88B3B] px-6 py-3 text-sm font-semibold text-[#741B2B] transition hover:bg-[#F8F0DE]"
              >
                Call Now
              </a>
            </div>
          </div>

          {/* Tailor portrait */}
          <div className="mx-auto w-full max-w-[210px]">
            <div className="relative rounded-t-[110px] rounded-b-2xl border border-[#D8B66A] bg-[#F5E9D0] p-2 shadow-xl shadow-[#741B2B]/10">
              <div className="relative aspect-[3/4] overflow-hidden rounded-t-[100px] rounded-b-xl bg-[#F1E4D0]">
                <Image
                  src="/anish.png"
                  alt="Anish Tailor"
                  fill
                  priority
                  sizes="(max-width: 768px) 210px, 220px"
                  className="object-cover object-center"
                />
              </div>
              <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full border border-[#D8B66A] bg-[#741B2B] px-5 py-2 text-xs font-semibold tracking-wide text-[#FFF8E9] shadow-lg">
                15 YEARS OF EXPERIENCE
              </div>
            </div>
          </div>
        </div>

        {/* Contact information */}
        <div className="mx-auto mt-14 max-w-4xl border-t border-[#E8D9BD] pt-7">
          <div className="grid gap-5 text-center sm:grid-cols-3">
            <div>
              <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#A17A35]">
                Call / WhatsApp
              </p>
              <div className="mt-2 flex flex-col gap-1">
                {contactNumbers.map((number) => (
                  <a
                    key={number}
                    href={`tel:${number}`}
                    className="text-sm font-semibold text-[#741B2B] hover:underline"
                  >
                    {number}
                  </a>
                ))}
              </div>
            </div>

            <div>
              <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#A17A35]">
                Visit Our Shop
              </p>
              <p className="mt-2 text-sm font-medium leading-6 text-[#5E4A43]">
                Satguru Building,
                <br />
                Dhalli, Shimla
              </p>
            </div>

            <div>
              <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#A17A35]">
                Email Us
              </p>
              <a
                href="mailto:aneeshansari4469@gmail.com"
                className="mt-2 inline-block break-all text-sm font-medium text-[#741B2B] hover:underline"
              >
                aneeshansari4469@gmail.com
              </a>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
