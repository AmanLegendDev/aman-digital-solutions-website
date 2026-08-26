import {
  Mail,
  MapPin,
  MessageCircle,
  Phone,
} from "lucide-react";

const CONTACT_METHODS = [
  {
    icon: MessageCircle,
    label: "WhatsApp",
    value: "+91 82191 74058",
    description:
      "Best for quick questions, project discussions and sharing references.",
    href: "https://wa.me/918219174058",
    action: "Chat on WhatsApp",
  },
  {
    icon: Mail,
    label: "Email",
    value: "amanansaricodes@gmail.com",
    description:
      "Send your requirements, references, documents or a detailed project brief.",
    href: "mailto:amanansaricodes@gmail.com",
    action: "Send an email",
  },
  {
    icon: Phone,
    label: "Phone",
    value: "+91 82191 74058",
    description:
      "Prefer speaking directly? We can discuss the project over a call.",
    href: "tel:+918219174058",
    action: "Call now",
  },
  {
    icon: MapPin,
    label: "Based in",
    value: "Himachal Pradesh, India",
    description:
      "Aman Digital Solutions is founder-led and based in Himachal Pradesh.",
    href: "#contact-form",
    action: "Start a project",
  },
];

export default function ContactMethods() {
  return (
    <section className="relative overflow-hidden bg-[#080808] pb-20 sm:pb-24 lg:pb-28">
      <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {CONTACT_METHODS.map((item) => {
            const Icon = item.icon;

            return (
              <a
                key={item.label}
                href={item.href}
                className="
                  group rounded-3xl
                  border border-white/[0.08]
                  bg-white/[0.02]
                  p-6
                  transition-all duration-300
                  hover:-translate-y-1
                  hover:border-[#FFC400]/20
                  hover:bg-white/[0.035]
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
                    transition-colors duration-300
                    group-hover:border-[#FFC400]/20
                    group-hover:text-[#FFC400]
                  "
                >
                  <Icon size={18} />
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