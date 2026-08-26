import {
  ClipboardList,
  Mail,
  Phone,
  UserRound,
  BriefcaseBusiness,
  MonitorSmartphone,
} from "lucide-react";

const informationTypes = [
  {
    icon: UserRound,
    title: "Contact information",
    description:
      "Information such as your name, email address and phone number when you contact us or submit an enquiry.",
  },
  {
    icon: BriefcaseBusiness,
    title: "Project information",
    description:
      "Business details, project requirements, goals, budgets, timelines and other information you choose to provide when discussing a project.",
  },
  {
    icon: Mail,
    title: "Messages & enquiries",
    description:
      "The content of messages, quote requests, form submissions and other communications you send to Aman Digital Solutions.",
  },
  {
    icon: Phone,
    title: "Communication details",
    description:
      "Information necessary to communicate with you through the contact method you provide, including phone or WhatsApp where applicable.",
  },
  {
    icon: MonitorSmartphone,
    title: "Technical information",
    description:
      "Limited technical information such as browser, device, approximate usage and website interaction data may be collected when relevant to operating and improving the website.",
  },
  {
    icon: ClipboardList,
    title: "Information you choose to provide",
    description:
      "Any additional information you voluntarily share with us while requesting services, discussing a project or communicating with our team.",
  },
];

export default function InformationWeCollect() {
  return (
    <section className="border-y border-white/[0.06] bg-[#0A0A0A]">
      <div className="mx-auto max-w-7xl px-5 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24">
        <div className="max-w-2xl">
          <span className="text-xs font-semibold uppercase tracking-[0.16em] text-[#FFC400]">
            Information we collect
          </span>

          <h2 className="mt-4 text-3xl font-semibold tracking-[-0.04em] text-white sm:text-4xl">
            What information may you provide?
          </h2>

          <p className="mt-5 text-[15px] leading-7 text-neutral-400 sm:text-base">
            The information we collect depends on how you interact with our
            website and services. We aim to collect only information that has
            a legitimate purpose.
          </p>
        </div>

        <div className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {informationTypes.map((item) => {
            const Icon = item.icon;

            return (
              <article
                key={item.title}
                className="
                  group rounded-2xl border border-white/[0.07]
                  bg-white/[0.02] p-5
                  transition-all duration-300
                  hover:border-[#FFC400]/20
                  hover:bg-white/[0.035]
                  sm:p-6
                "
              >
                <div
                  className="
                    flex h-10 w-10 items-center justify-center
                    rounded-xl border border-[#FFC400]/15
                    bg-[#FFC400]/[0.06]
                    text-[#FFC400]
                    transition-transform duration-300
                    group-hover:-translate-y-0.5
                  "
                >
                  <Icon size={18} />
                </div>

                <h3 className="mt-5 text-base font-semibold text-white">
                  {item.title}
                </h3>

                <p className="mt-2 text-sm leading-6 text-neutral-500">
                  {item.description}
                </p>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}