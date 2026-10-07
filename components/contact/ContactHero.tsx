import {
  ArrowDown,
  MessageCircle,
} from "lucide-react";

import { getSiteSettings } from "@/lib/site-settings/getSiteSettings";

export default async function ContactHero() {
  const settings = await getSiteSettings();

  const siteName =
    settings?.siteName?.trim() ||
    "Aman Digital Solutions";

  const tagline =
    settings?.tagline?.trim() ||
    "Web Development & Digital Solutions";

  const city =
    settings?.contact?.city?.trim() ||
    "Shimla";

  const state =
    settings?.contact?.state?.trim() ||
    "Himachal Pradesh";

  return (
    <section
      id="contact"
      aria-labelledby="contact-heading"
      className="relative overflow-hidden bg-[#080808] pt-36 pb-20 sm:pt-40 sm:pb-24 lg:pt-48 lg:pb-32"
    >
      {/* Ambient glow */}
      <div
        aria-hidden="true"
        className="
          pointer-events-none absolute
          left-1/2 top-20
          h-[420px] w-[420px]
          -translate-x-1/2
          rounded-full
          bg-[#FFC400]/[0.035]
          blur-[130px]
        "
      />

      {/* Subtle grid */}
      <div
        aria-hidden="true"
        className="
          pointer-events-none absolute inset-0 opacity-[0.025]
          [background-image:linear-gradient(rgba(255,255,255,1)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,1)_1px,transparent_1px)]
          [background-size:56px_56px]
        "
      />

      <div className="relative mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
        <div className="max-w-4xl">
          {/* EYEBROW */}
          <div className="inline-flex items-center gap-2 rounded-full border border-white/[0.08] bg-white/[0.025] px-3.5 py-2">
            <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#FFC400]/10 text-[#FFC400]">
              <MessageCircle
                size={13}
                aria-hidden="true"
              />
            </span>

            <span className="text-[10px] font-semibold uppercase tracking-[0.16em] text-neutral-400 sm:text-xs">
              {tagline}
            </span>
          </div>

          {/* H1 */}
          <h1
            id="contact-heading"
            className="
              mt-7
              max-w-4xl
              text-5xl font-semibold
              leading-[0.98]
              tracking-[-0.06em]
              text-white
              sm:text-6xl
              lg:text-8xl
            "
          >
            Have an idea?
            <span className="block text-[#FFC400]">
              Let&apos;s build it.
            </span>
          </h1>

          {/* DESCRIPTION */}
          <p className="mt-7 max-w-2xl text-sm leading-7 text-neutral-500 sm:text-base lg:text-lg">
            Tell {siteName} what you are trying to build,
            improve or grow. Share as much context as you have —
            we&apos;ll understand the requirements and help shape
            the right digital approach for your business.
          </p>

          {/* SUPPORTING INFO */}
          <div className="mt-9 flex flex-wrap items-center gap-3 text-xs text-neutral-600">
            <ArrowDown
              size={15}
              aria-hidden="true"
              className="text-[#FFC400]"
            />

            <span>
              Start with the project details below
            </span>

            <span
              aria-hidden="true"
              className="hidden h-1 w-1 rounded-full bg-neutral-700 sm:block"
            />

            <span>
              {city}, {state}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}