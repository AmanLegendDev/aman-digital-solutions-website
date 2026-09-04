import Link from "next/link";
import {
  ArrowUpRight,
  MessageCircle,
} from "lucide-react";

export default function ContactCTA() {
  return (
    <section className="relative overflow-hidden bg-[#080808] py-16 sm:py-20 lg:py-24">
      <div className="mx-auto max-w-5xl px-5 sm:px-6 lg:px-8">
        <div
          className="
            rounded-[2rem]
            border border-white/[0.08]
            bg-white/[0.025]
            p-7 text-center
            sm:p-10
            lg:p-14
          "
        >
          <div className="mx-auto flex h-11 w-11 items-center justify-center rounded-2xl border border-[#FFC400]/15 bg-[#FFC400]/[0.05] text-[#FFC400]">
            <MessageCircle size={18} />
          </div>

          <h2 className="mt-6 text-3xl font-semibold tracking-[-0.045em] text-white sm:text-4xl">
            Prefer a quick conversation?
          </h2>

          <p className="mx-auto mt-4 max-w-xl text-sm leading-6 text-neutral-500">
            If filling out a form is not your thing, just message us
            directly and tell us what you need.
          </p>

          <div className="mt-7 flex flex-col justify-center gap-3 sm:flex-row">
            <a
              href="https://wa.me/918219174058"
              target="_blank"
              rel="noopener noreferrer"
              className="
                group inline-flex items-center justify-center gap-2
                rounded-full
                bg-[#FFC400]
                px-6 py-3.5
                text-sm font-semibold
                text-black
                transition
                hover:bg-[#FFD43B]
              "
            >
              Chat on WhatsApp

              <ArrowUpRight
                size={15}
                className="
                  transition-transform
                  group-hover:-translate-y-0.5
                  group-hover:translate-x-0.5
                "
              />
            </a>

            <a
              href="mailto:hello@amandigitalsolutions.com"
              className="
                inline-flex items-center justify-center
                rounded-full
                border border-white/[0.1]
                px-6 py-3.5
                text-sm font-medium
                text-neutral-300
                transition
                hover:border-white/[0.2]
                hover:text-white
              "
            >
              Email us
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}