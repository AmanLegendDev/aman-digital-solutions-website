import { Link } from "lucide-react";

const contactNumbers = ["8219800388", "9816941390"];

export default function TailorFooter() {
  return (
    <footer className="relative overflow-hidden bg-[#741B2B] text-[#FFF8E9]">

      {/* Decorative background */}
      <div className="pointer-events-none absolute -right-32 -top-32 h-80 w-80 rounded-full border border-[#D8B66A]/10" />
      <div className="pointer-events-none absolute -right-24 -top-24 h-64 w-64 rounded-full border border-[#D8B66A]/10" />
      <div className="pointer-events-none absolute -bottom-32 -left-32 h-80 w-80 rounded-full bg-[#FFF8E9]/[0.03] blur-3xl" />

      <div className="relative mx-auto max-w-6xl px-5 pt-14 sm:px-8 sm:pt-20">

        {/* Brand section */}
        <div className="text-center">
          <div className="mb-5 flex items-center justify-center gap-4">
            <span className="h-px w-12 bg-[#D8B66A]/70" />
            <span className="text-xl text-[#D8B66A]">✦</span>
            <span className="h-px w-12 bg-[#D8B66A]/70" />
          </div>

          <h2 className="font-serif text-3xl font-semibold tracking-[0.12em] text-[#FFF8E9] sm:text-4xl">
            ANISH TAILOR
          </h2>

          <p className="mt-3 text-xs font-medium uppercase tracking-[0.25em] text-[#D8B66A]">
            Craftsmanship in Every Stitch
          </p>

          <p className="mx-auto mt-5 max-w-lg text-sm leading-7 text-[#F3E4D0]/80">
            Bringing your style to life with precision, passion and
            attention to every detail. Every garment is crafted with care.
          </p>

          <div className="mt-7">
            <a
              href={`https://wa.me/91${contactNumbers[0]}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-[#D8B66A] bg-[#D8B66A] px-7 py-3 text-sm font-semibold text-[#741B2B] shadow-lg shadow-black/10 transition duration-300 hover:-translate-y-1 hover:bg-[#F3E4C1]"
            >
              <svg
                viewBox="0 0 24 24"
                fill="currentColor"
                className="h-5 w-5"
                aria-hidden="true"
              >
                <path d="M20.52 3.48A11.86 11.86 0 0 0 12.08 0C5.5 0 .14 5.36.14 11.94c0 2.1.55 4.16 1.6 5.98L.05 24l6.23-1.63a11.9 11.9 0 0 0 5.8 1.48h.01c6.58 0 11.94-5.36 11.94-11.94 0-3.19-1.24-6.18-3.51-8.43ZM12.09 21.82a9.9 9.9 0 0 1-5.05-1.38l-.36-.21-3.7.97.99-3.6-.24-.37a9.86 9.86 0 0 1-1.52-5.29c0-5.47 4.46-9.93 9.94-9.93 2.65 0 5.14 1.03 7.01 2.91a9.86 9.86 0 0 1 2.91 7.02c0 5.48-4.46 9.94-9.93 9.94Zm5.45-7.44c-.3-.15-1.77-.87-2.05-.97-.28-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.17-.17.2-.35.22-.65.07-.3-.15-1.27-.47-2.42-1.5-.9-.8-1.51-1.77-1.69-2.07-.17-.3-.02-.46.13-.61.13-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.03-.52-.07-.15-.67-1.62-.92-2.22-.24-.58-.48-.5-.67-.51h-.57c-.2 0-.52.08-.8.37-.27.3-1.04 1.02-1.04 2.49s1.07 2.89 1.22 3.09c.15.2 2.1 3.2 5.08 4.49.71.3 1.26.49 1.69.63.71.23 1.36.2 1.87.12.57-.09 1.77-.72 2.02-1.42.25-.7.25-1.3.17-1.42-.07-.13-.27-.2-.57-.35Z" />
              </svg>
              Contact Us on WhatsApp
            </a>
          </div>
        </div>

        {/* Gold divider */}
        <div className="my-12 flex items-center gap-4 sm:my-16">
          <span className="h-px flex-1 bg-[#D8B66A]/30" />
          <span className="text-sm text-[#D8B66A]">✦</span>
          <span className="h-px flex-1 bg-[#D8B66A]/30" />
        </div>

        {/* Information grid */}
        <div className="grid gap-10 pb-12 text-center sm:grid-cols-3 sm:gap-6 sm:text-left">

          {/* Location */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-[#D8B66A]">
              Visit Our Studio
            </h3>

            <div className="mt-4 flex items-center justify-center gap-2 sm:justify-start">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.6"
                className="h-5 w-5 shrink-0 text-[#D8B66A]"
                aria-hidden="true"
              >
                <path d="M20 10c0 5-8 12-8 12S4 15 4 10a8 8 0 1 1 16 0Z" />
                <circle cx="12" cy="10" r="2.5" />
              </svg>

              <p className="text-sm leading-6 text-[#FFF8E9]/85">
                Satguru Building,
                <br />
                Dhalli, Shimla
              </p>
            </div>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-[#D8B66A]">
              Call / WhatsApp
            </h3>

            <div className="mt-4 flex flex-col gap-3">
              {contactNumbers.map((number) => (
                <a
                  key={number}
                  href={`tel:${number}`}
                  className="text-sm text-[#FFF8E9]/85 transition hover:text-[#D8B66A]"
                >
                  +91 {number}
                </a>
              ))}
            </div>
          </div>

          {/* Experience */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-[#D8B66A]">
              Our Promise
            </h3>

            <div className="mt-4">
              <p className="font-serif text-xl text-[#FFF8E9]">
                15+ Years of Experience
              </p>

              <p className="mt-2 text-sm leading-6 text-[#FFF8E9]/70">
                Quality stitching, personal attention and
                a perfect fit for every occasion.
              </p>
            </div>
          </div>

        </div>

        {/* Copyright */}
        <div className="border-t border-[#D8B66A]/25 py-6 text-center">
          <p className="text-xs leading-6 text-[#FFF8E9]/60">
            © {new Date().getFullYear()} Anish Tailor. All rights reserved.
          </p>

        <a href="https://www.amandigitalsolutions.com/">
            <p className="mt-2 text-[10px] uppercase tracking-[0.18em] text-[#D8B66A]/80">
            A Little something, Made with endless Love for DAD
          </p>
        </a>
        </div>

      </div>
    </footer>
  );
}
