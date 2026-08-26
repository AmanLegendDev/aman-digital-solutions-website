import {
  MessageSquareText,
  BriefcaseBusiness,
  Wrench,
  ShieldCheck,
  BarChart3,
  Scale,
} from "lucide-react";

const purposes = [
  {
    icon: MessageSquareText,
    title: "Respond to enquiries",
    description:
      "To respond to questions, quote requests, project enquiries and other messages you send to us.",
  },
  {
    icon: BriefcaseBusiness,
    title: "Understand project requirements",
    description:
      "To understand your business, requirements, goals, timelines and other information needed to discuss or deliver a project.",
  },
  {
    icon: Wrench,
    title: "Provide and support our services",
    description:
      "To deliver requested services, communicate about ongoing work and provide relevant support after a project begins.",
  },
  {
    icon: ShieldCheck,
    title: "Protect our website and systems",
    description:
      "To maintain website security, identify suspicious activity, prevent abuse and protect our systems and users.",
  },
  {
    icon: BarChart3,
    title: "Improve our website",
    description:
      "Where appropriate, to understand website usage and improve our content, user experience, performance and services.",
  },
  {
    icon: Scale,
    title: "Meet legal obligations",
    description:
      "To comply with applicable laws, respond to lawful requests and protect our legitimate business rights when necessary.",
  },
];

export default function HowWeUseInformation() {
  return (
    <section className="bg-[#080808]">
      <div className="mx-auto max-w-7xl px-5 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24">
        <div className="grid gap-10 lg:grid-cols-[0.72fr_1.28fr] lg:gap-20">
          {/* INTRO */}
          <div className="lg:sticky lg:top-28 lg:self-start">
            <span className="text-xs font-semibold uppercase tracking-[0.16em] text-[#FFC400]">
              How we use information
            </span>

            <h2 className="mt-4 text-3xl font-semibold tracking-[-0.04em] text-white sm:text-4xl">
              Information should have a purpose.
            </h2>

            <p className="mt-5 max-w-md text-[15px] leading-7 text-neutral-400 sm:text-base">
              We use the information we receive for legitimate business,
              service, security and communication purposes. We do not collect
              personal information simply because it is available.
            </p>
          </div>

          {/* PURPOSES */}
          <div className="divide-y divide-white/[0.07] rounded-2xl border border-white/[0.07] bg-white/[0.02]">
            {purposes.map((item) => {
              const Icon = item.icon;

              return (
                <article
                  key={item.title}
                  className="group flex gap-4 p-5 sm:gap-5 sm:p-6"
                >
                  <div className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-[#FFC400]/15 bg-[#FFC400]/[0.05] text-[#FFC400] transition-colors duration-200 group-hover:border-[#FFC400]/25 group-hover:bg-[#FFC400]/[0.08]">
                    <Icon size={18} />
                  </div>

                  <div>
                    <h3 className="text-base font-semibold text-white">
                      {item.title}
                    </h3>

                    <p className="mt-2 text-sm leading-6 text-neutral-500">
                      {item.description}
                    </p>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}