import {
  ShieldCheck,
  Database,
  Clock3,
  AlertTriangle,
} from "lucide-react";

const points = [
  {
    icon: ShieldCheck,
    title: "Reasonable security measures",
    description:
      "We take reasonable technical and organisational measures to protect personal information against unauthorised access, misuse, alteration, disclosure or loss.",
  },
  {
    icon: Database,
    title: "Limited access",
    description:
      "Access to information is limited to people and service providers who reasonably need it for legitimate business or service-related purposes.",
  },
  {
    icon: Clock3,
    title: "Retention",
    description:
      "We retain personal information only for as long as reasonably necessary for the purpose for which it was collected, to provide services, maintain business records or meet legal obligations.",
  },
  {
    icon: AlertTriangle,
    title: "No system is completely secure",
    description:
      "Although we take reasonable precautions, no website, online transmission or storage system can be guaranteed to be completely secure.",
  },
];

export default function SecurityAndRetention() {
  return (
    <section className="bg-[#080808]">
      <div className="mx-auto max-w-7xl px-5 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24">
        <div className="grid gap-10 lg:grid-cols-[0.7fr_1.3fr] lg:gap-20">
          <div>
            <span className="text-xs font-semibold uppercase tracking-[0.16em] text-[#FFC400]">
              Security & retention
            </span>

            <h2 className="mt-4 text-3xl font-semibold tracking-[-0.04em] text-white sm:text-4xl">
              We treat your information with care.
            </h2>

            <p className="mt-5 max-w-md text-[15px] leading-7 text-neutral-400 sm:text-base">
              We take reasonable steps to protect the information entrusted
              to us while keeping retention proportionate to legitimate
              business and legal requirements.
            </p>
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            {points.map((item) => {
              const Icon = item.icon;

              return (
                <article
                  key={item.title}
                  className="rounded-2xl border border-white/[0.07] bg-white/[0.02] p-5 sm:p-6"
                >
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-[#FFC400]/15 bg-[#FFC400]/[0.05] text-[#FFC400]">
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
      </div>
    </section>
  );
}