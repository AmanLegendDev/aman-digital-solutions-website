import Link from "next/link";
import {
  ArrowUpRight,
  MessageCircle,
} from "lucide-react";

import { getSiteSettings } from "@/lib/site-settings/getSiteSettings";

export default async function ContactCTA() {
  const settings = await getSiteSettings();

  const siteName =
    settings?.siteName?.trim() ||
    "Aman Digital Solutions";

  const email =
    settings?.primaryEmail?.trim() ||
    settings?.contact?.email?.trim() ||
    "";

  const whatsappNumber =
    settings?.whatsappNumber?.trim() ||
    settings?.contact?.whatsapp?.trim() ||
    "";

  const whatsappDigits =
    whatsappNumber.replace(/\D/g, "");

  const whatsappHref = whatsappDigits
    ? `https://wa.me/${whatsappDigits}`
    : "";

  return (
    <section
      aria-labelledby="contact-cta-heading"
      className="relative overflow-hidden bg-[#080808] py-16 sm:py-20 lg:py-24"
    >
      <div className="mx-auto max-w-5xl px-5 sm:px-6 lg:px-8">
        <div
          className="
            relative overflow-hidden
            rounded-[2rem]
            border border-white/[0.08]
            bg-white/[0.025]
            p-7 text-center
            sm:p-10
            lg:p-14
          "
        >
          {/* Ambient glow */}
          <div
            aria-hidden="true"
            className="
              pointer-events-none absolute
              left-1/2 top-0
              h-48 w-80
              -translate-x-1/2
              rounded-full
              bg-[#FFC400]/[0.035]
              blur-[100px]
            "
          />

          <div className="relative">
            <div
              className="
                mx-auto flex h-11 w-11
                items-center justify-center
                rounded-2xl
                border border-[#FFC400]/15
                bg-[#FFC400]/[0.05]
                text-[#FFC400]
              "
            >
              <MessageCircle
                size={18}
                strokeWidth={1.7}
                aria-hidden="true"
              />
            </div>

            <h2
              id="contact-cta-heading"
              className="mt-6 text-3xl font-semibold tracking-[-0.045em] text-white sm:text-4xl"
            >
              Prefer a quick conversation?
            </h2>

            <p className="mx-auto mt-4 max-w-xl text-sm leading-6 text-neutral-500 sm:text-base sm:leading-7">
              If filling out a form is not your thing, message{" "}
              {siteName} directly and tell us what you are
              looking to build, improve or grow.
            </p>

            {(whatsappHref || email) && (
              <div className="mt-7 flex flex-col justify-center gap-3 sm:flex-row">
                {whatsappHref && (
                  <a
                    href={whatsappHref}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Chat with ${siteName} on WhatsApp`}
                    className="
                      group inline-flex items-center
                      justify-center gap-2
                      rounded-full
                      bg-[#FFC400]
                      px-6 py-3.5
                      text-sm font-semibold
                      text-black
                      transition
                      hover:bg-[#FFD43B]
                      focus-visible:outline-none
                      focus-visible:ring-2
                      focus-visible:ring-[#FFC400]
                      focus-visible:ring-offset-2
                      focus-visible:ring-offset-[#080808]
                    "
                  >
                    Chat on WhatsApp

                    <ArrowUpRight
                      size={15}
                      aria-hidden="true"
                      className="
                        transition-transform
                        group-hover:-translate-y-0.5
                        group-hover:translate-x-0.5
                      "
                    />
                  </a>
                )}

                {email && (
                  <a
                    href={`mailto:${email}`}
                    aria-label={`Email ${siteName}`}
                    className="
                      inline-flex items-center
                      justify-center
                      rounded-full
                      border border-white/[0.1]
                      px-6 py-3.5
                      text-sm font-medium
                      text-neutral-300
                      transition
                      hover:border-white/[0.2]
                      hover:text-white
                      focus-visible:outline-none
                      focus-visible:ring-2
                      focus-visible:ring-[#FFC400]
                      focus-visible:ring-offset-2
                      focus-visible:ring-offset-[#080808]
                    "
                  >
                    Email us
                  </a>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}