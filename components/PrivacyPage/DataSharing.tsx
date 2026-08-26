import {
  Cloud,
  UsersRound,
  Scale,
  Ban,
  LockKeyhole,
} from "lucide-react";

const sharingCases = [
  {
    icon: Cloud,
    title: "Service providers",
    description:
      "We may use trusted third-party providers that help us operate our website, store or process information, host content, deliver services or maintain technical infrastructure.",
  },
  {
    icon: UsersRound,
    title: "People working on your project",
    description:
      "Where necessary to deliver a project, relevant information may be shared with team members, contractors or service providers involved in that work.",
  },
  {
    icon: Scale,
    title: "Legal or regulatory requirements",
    description:
      "Information may be disclosed when required by applicable law, a valid legal process or when reasonably necessary to protect our rights, users or business.",
  },
];

export default function DataSharing() {
  return (
    <section className="border-y border-white/[0.06] bg-[#0A0A0A]">
      <div className="mx-auto max-w-7xl px-5 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24">
        <div className="max-w-3xl">
          <span className="text-xs font-semibold uppercase tracking-[0.16em] text-[#FFC400]">
            Data sharing
          </span>

          <h2 className="mt-4 text-3xl font-semibold tracking-[-0.04em] text-white sm:text-4xl">
            Who may receive your information?
          </h2>

          <p className="mt-5 text-[15px] leading-7 text-neutral-400 sm:text-base">
            We do not sell or rent your personal information. Information may
            only be shared where there is a legitimate reason connected to
            operating our business, delivering a requested service or meeting
            a legal obligation.
          </p>
        </div>

        <div className="mt-10 grid gap-3 lg:grid-cols-3">
          {sharingCases.map((item) => {
            const Icon = item.icon;

            return (
              <article
                key={item.title}
                className="
                  rounded-2xl border border-white/[0.07]
                  bg-white/[0.02] p-5
                  sm:p-6
                "
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-[#FFC400]/15 bg-[#FFC400]/[0.06] text-[#FFC400]">
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

        <div className="mt-6 flex gap-4 rounded-2xl border border-[#FFC400]/10 bg-[#FFC400]/[0.035] p-5 sm:p-6">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#FFC400]/[0.08] text-[#FFC400]">
            <Ban size={18} />
          </div>

          <div>
            <h3 className="text-sm font-semibold text-white">
              We do not sell your personal information
            </h3>

            <p className="mt-2 text-sm leading-6 text-neutral-500">
              Aman Digital Solutions does not sell or rent personal information
              to advertisers, data brokers or other third parties for their
              independent marketing purposes.
            </p>
          </div>
        </div>

        <div className="mt-4 flex items-start gap-3 text-xs leading-5 text-neutral-600">
          <LockKeyhole size={14} className="mt-0.5 shrink-0" />
          <p>
            Third-party providers may have their own privacy policies and
            security practices. Their handling of information is governed by
            their respective terms and policies where applicable.
          </p>
        </div>
      </div>
    </section>
  );
}