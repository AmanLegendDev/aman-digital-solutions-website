import Link from "next/link";
import {
  ArrowUpRight,
  Mail,
  MessageCircle,
} from "lucide-react";

export default function PrivacyContact() {
  return (
    <section className="bg-[#080808]">
      <div className="mx-auto max-w-7xl px-5 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24">
        <div
          className="
            relative overflow-hidden rounded-3xl
            border border-white/[0.08]
            bg-white/[0.025]
            p-6 sm:p-8 lg:p-12
          "
        >
          {/* Ambient glow */}
          <div
            aria-hidden="true"
            className="
              pointer-events-none absolute
              -right-24 -top-24
              h-64 w-64 rounded-full
              bg-[#FFC400]/[0.06]
              blur-3xl
            "
          />

          <div className="relative grid gap-10 lg:grid-cols-[1fr_auto] lg:items-end">
            {/* CONTENT */}
            <div className="max-w-2xl">
              <span className="text-xs font-semibold uppercase tracking-[0.16em] text-[#FFC400]">
                Privacy contact
              </span>

              <h2 className="mt-4 text-3xl font-semibold tracking-[-0.04em] text-white sm:text-4xl">
                Have a question about your privacy?
              </h2>

              <p className="mt-5 text-[15px] leading-7 text-neutral-400 sm:text-base">
                If you have a question about this Privacy Policy, want to
                request access to your information, or want to raise a privacy
                concern, you can contact Aman Digital Solutions directly.
              </p>
            </div>

            {/* ACTIONS */}
            <div className="flex flex-col gap-3 sm:flex-row lg:flex-col">
              <a
                href="mailto:contact@amandigitalsolutions.com"
                aria-label="Email Aman Digital Solutions about privacy"
                className="
                  group inline-flex items-center justify-center gap-2
                  rounded-full
                  border border-white/[0.1]
                  bg-white/[0.04]
                  px-5 py-3
                  text-sm font-medium text-white
                  transition-all duration-200
                  hover:border-[#FFC400]/30
                  hover:bg-white/[0.06]
                  focus-visible:outline-none
                  focus-visible:ring-2
                  focus-visible:ring-[#FFC400]
                "
              >
                <Mail size={16} />

                Email us

                <ArrowUpRight
                  size={15}
                  className="
                    transition-transform duration-200
                    group-hover:-translate-y-0.5
                    group-hover:translate-x-0.5
                  "
                />
              </a>

              <Link
                href="/contact"
                className="
                  group inline-flex items-center justify-center gap-2
                  rounded-full
                  bg-[#FFC400]
                  px-5 py-3
                  text-sm font-semibold text-black
                  transition-all duration-200
                  hover:bg-[#FFD43B]
                  hover:shadow-[0_0_28px_rgba(255,196,0,0.16)]
                  focus-visible:outline-none
                  focus-visible:ring-2
                  focus-visible:ring-[#FFC400]
                  focus-visible:ring-offset-2
                  focus-visible:ring-offset-[#080808]
                "
              >
                <MessageCircle size={16} />

                Contact us

                <ArrowUpRight
                  size={15}
                  className="
                    transition-transform duration-200
                    group-hover:-translate-y-0.5
                    group-hover:translate-x-0.5
                  "
                />
              </Link>
            </div>
          </div>

          {/* FOOTNOTE */}
          <div className="relative mt-8 border-t border-white/[0.07] pt-5">
            <p className="text-xs leading-5 text-neutral-600">
              We aim to respond to privacy-related enquiries within a
              reasonable period. Requests may be subject to verification and
              applicable legal requirements.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}