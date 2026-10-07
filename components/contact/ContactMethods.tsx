import {
  Mail,
  MapPin,
  MessageCircle,
  Phone,
} from "lucide-react";

import { getSiteSettings } from "@/lib/site-settings/getSiteSettings";

export default async function ContactMethods() {
  const settings = await getSiteSettings();

  const siteName =
    settings?.siteName?.trim() ||
    "Aman Digital Solutions";

  const email =
    settings?.primaryEmail?.trim() ||
    settings?.contact?.email?.trim() ||
    "";

  const phone =
    settings?.primaryPhone?.trim() ||
    settings?.contact?.phone?.trim() ||
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

  const phoneDigits =
    phone.replace(/[^\d+]/g, "");

  const phoneHref = phoneDigits
    ? `tel:${phoneDigits}`
    : "";

  const city =
    settings?.contact?.city?.trim() ||
    "Shimla";

  const state =
    settings?.contact?.state?.trim() ||
    "Himachal Pradesh";

  const country =
    settings?.contact?.country?.trim() ||
    "India";

  const googleMapsUrl =
    settings?.googleMapsUrl?.trim() ||
    "";

  const locationLabel = [
    city,
    state,
    country,
  ]
    .filter(Boolean)
    .join(", ");

  const methods = [
    whatsappHref
      ? {
          icon: MessageCircle,
          label: "WhatsApp",
          value: phone || whatsappNumber,
          description:
            "Best for quick questions, project discussions and sharing references.",
          href: whatsappHref,
          action: "Chat on WhatsApp",
          external: true,
        }
      : null,

    email
      ? {
          icon: Mail,
          label: "Email",
          value: email,
          description:
            "Send your requirements, references, documents or a detailed project brief.",
          href: `mailto:${email}`,
          action: "Send an email",
          external: false,
        }
      : null,

    phoneHref
      ? {
          icon: Phone,
          label: "Phone",
          value: phone,
          description:
            "Prefer speaking directly? We can discuss the project over a call.",
          href: phoneHref,
          action: "Call now",
          external: false,
        }
      : null,

    locationLabel
      ? {
          icon: MapPin,
          label: "Based in",
          value: locationLabel,
          description:
            `${siteName} is based in ${city}, ${state} and works with businesses locally, across India and remotely.`,
          href:
            googleMapsUrl ||
            "/start-a-project",
          action:
            googleMapsUrl
              ? "View on Google"
              : "Start a project",
          external: Boolean(googleMapsUrl),
        }
      : null,
  ].filter(Boolean) as Array<{
    icon: typeof MessageCircle;
    label: string;
    value: string;
    description: string;
    href: string;
    action: string;
    external: boolean;
  }>;

  return (
    <section
      aria-label="Contact methods"
      className="relative overflow-hidden bg-[#080808] pb-20 sm:pb-24 lg:pb-28"
    >
      <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {methods.map((item) => {
            const Icon = item.icon;

            return (
              <a
                key={item.label}
                href={item.href}
                {...(item.external
                  ? {
                      target: "_blank",
                      rel: "noopener noreferrer",
                    }
                  : {})}
                className="
                  group
                  rounded-3xl
                  border border-white/[0.08]
                  bg-white/[0.02]
                  p-6
                  transition-all
                  duration-300
                  hover:-translate-y-1
                  hover:border-[#FFC400]/20
                  hover:bg-white/[0.035]
                  focus-visible:outline-none
                  focus-visible:ring-2
                  focus-visible:ring-[#FFC400]
                "
              >
                <div
                  className="
                    flex h-11 w-11
                    items-center justify-center
                    rounded-2xl
                    border border-white/[0.08]
                    bg-black/20
                    text-neutral-400
                    transition-colors
                    duration-300
                    group-hover:border-[#FFC400]/20
                    group-hover:text-[#FFC400]
                  "
                >
                  <Icon
                    size={18}
                    strokeWidth={1.8}
                    aria-hidden="true"
                  />
                </div>

                <p className="mt-6 text-[10px] font-semibold uppercase tracking-[0.16em] text-neutral-600">
                  {item.label}
                </p>

                <h2 className="mt-2 break-words text-sm font-semibold text-white">
                  {item.value}
                </h2>

                <p className="mt-3 text-xs leading-5 text-neutral-500">
                  {item.description}
                </p>

                <span className="mt-5 inline-block text-xs font-medium text-[#FFC400]">
                  {item.action} →
                </span>
              </a>
            );
          })}
        </div>
      </div>
    </section>
  );
}