import {
  Ban,
  ExternalLink,
  LockKeyhole,
  Scale,
  ShieldCheck,
  Copyright,
} from "lucide-react";

const sections = [
  {
    id: "intellectual-property",
    number: "08",
    title: "Intellectual property",
    icon: Copyright,
    content: (
      <>
        <p>
          Once the project has been fully paid for, the client
          receives the rights to the final custom deliverables that
          were specifically created for the project, subject to any
          applicable third-party licences.
        </p>

        <p className="mt-5">
          Third-party libraries, frameworks, fonts, stock assets,
          plugins, templates, APIs and other licensed materials
          remain subject to their respective licences.
        </p>

        <p className="mt-5">
          Unless otherwise agreed, Aman Digital Solutions may
          display completed work in its portfolio or marketing
          materials.
        </p>
      </>
    ),
  },
  {
    id: "cancellation",
    number: "09",
    title: "Cancellation & refunds",
    icon: Ban,
    content: (
      <>
        <p>
          If a client cancels a project after work has started, the
          advance payment may be retained to cover reserved project
          time, work already completed and associated costs.
        </p>

        <p className="mt-5">
          Where substantial additional work has been completed
          beyond the amount covered by the advance, the outstanding
          amount for completed work may become payable.
        </p>

        <p className="mt-5">
          Any cancellation or refund arrangement will be considered
          according to the specific project circumstances and
          written agreement.
        </p>
      </>
    ),
  },
  {
    id: "third-party",
    number: "10",
    title: "Third-party services",
    icon: ExternalLink,
    content: (
      <>
        <p>
          Projects may depend on third-party platforms and services
          such as hosting providers, domain registrars, payment
          gateways, Cloudinary, analytics platforms, APIs, plugins
          or other external systems.
        </p>

        <p className="mt-5">
          Third-party outages, pricing changes, policy changes, API
          changes, account restrictions or service interruptions
          are outside our direct control.
        </p>

        <p className="mt-5">
          Third-party subscription or service charges are normally
          the responsibility of the client unless explicitly included
          in the project agreement.
        </p>
      </>
    ),
  },
  {
    id: "liability",
    number: "11",
    title: "Limitation of liability",
    icon: Scale,
    content: (
      <>
        <p>
          We take reasonable care to deliver reliable and
          professional digital work. However, no website, software
          system or online service can be guaranteed to remain
          completely free from errors, downtime or third-party
          interruptions.
        </p>

        <p className="mt-5">
          We are not responsible for losses caused by third-party
          platforms, hosting failures, domain issues, client-provided
          content, security credentials exposed by the client, or
          circumstances outside our reasonable control.
        </p>

        <p className="mt-5">
          Nothing in these terms is intended to exclude liability
          that cannot legally be excluded under applicable law.
        </p>
      </>
    ),
  },
  {
    id: "privacy",
    number: "12",
    title: "Privacy & information",
    icon: LockKeyhole,
    content: (
      <>
        <p>
          Information shared with Aman Digital Solutions for the
          purpose of delivering a project will be handled for
          legitimate business and project-related purposes.
        </p>

        <p className="mt-5">
          We take reasonable measures to protect project information
          and credentials. Clients should also avoid sharing
          unnecessary passwords or sensitive information and should
          use secure access methods wherever possible.
        </p>

        <p className="mt-5">
          For more information about how personal information is
          handled, please review our Privacy Policy.
        </p>
      </>
    ),
  },
  {
    id: "acceptance",
    number: "13",
    title: "Acceptance of terms",
    icon: ShieldCheck,
    content: (
      <>
        <p>
          By booking a project, paying the required advance,
          approving a proposal, or instructing Aman Digital
          Solutions to begin work, the client confirms that they
          have read and accepted these Terms & Conditions.
        </p>

        <p className="mt-5">
          Where a written project proposal or agreement contains
          terms specific to that project, those project-specific
          terms will apply alongside these general terms.
        </p>
      </>
    ),
  },
];

export default function TermsLegal() {
  return (
    <section className="space-y-5">
      {sections.map((section) => {
        const Icon = section.icon;

        return (
          <article
            key={section.id}
            id={section.id}
            className="scroll-mt-28 overflow-hidden rounded-[24px] border border-[#202020] bg-[#090909]"
          >
            <div className="border-b border-[#1D1D1D] px-5 py-5 sm:px-7 sm:py-6">
              <div className="flex items-center gap-4">
                <span className="text-[9px] font-semibold tabular-nums tracking-[0.16em] text-[#FFC400]">
                  {section.number}
                </span>

                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-[#292929] bg-[#0D0D0D] text-[#FFC400]">
                  <Icon size={14} />
                </span>

                <h2 className="text-xl font-semibold tracking-[-0.025em] text-[#EAEAEA] sm:text-2xl">
                  {section.title}
                </h2>
              </div>
            </div>

            <div className="px-5 py-6 sm:px-7 sm:py-7">
              <div className="max-w-3xl text-sm leading-7 text-[#777]">
                {section.content}
              </div>
            </div>
          </article>
        );
      })}
    </section>
  );
}