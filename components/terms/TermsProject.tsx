import {
  FilePenLine,
  Layers3,
  UserCheck,
  Rocket,
} from "lucide-react";

const sections = [
  {
    id: "revisions",
    number: "04",
    title: "Revisions",
    icon: FilePenLine,
    content: (
      <>
        <p>
          Revisions are handled according to the scope agreed for
          the project. Reasonable revisions relating to the agreed
          direction are included within that scope.
        </p>

        <p className="mt-5">
          A revision means an adjustment to existing agreed work.
          A completely new feature, new page, new design direction,
          additional functionality, or substantial change in
          requirements may be treated as additional work and quoted
          separately.
        </p>

        <p className="mt-5">
          The client is responsible for providing clear and
          consolidated feedback so that revisions can be handled
          efficiently.
        </p>
      </>
    ),
  },
  {
    id: "scope",
    number: "05",
    title: "Project scope & changes",
    icon: Layers3,
    content: (
      <>
        <p>
          Every project is based on an agreed scope. The scope may
          include specific pages, features, integrations, designs,
          content or other deliverables.
        </p>

        <p className="mt-5">
          Requests outside the agreed scope may require additional
          time and payment. Major changes in requirements should be
          discussed and approved before implementation.
        </p>

        <p className="mt-5">
          We reserve the right to revise project timelines where
          additional requirements materially change the original
          scope.
        </p>
      </>
    ),
  },
  {
    id: "responsibilities",
    number: "06",
    title: "Client responsibilities",
    icon: UserCheck,
    content: (
      <>
        <p>
          The client is responsible for providing accurate business
          information, content, images, branding assets, credentials
          and feedback required for the project.
        </p>

        <p className="mt-5">
          Delays in providing required information, approvals or
          feedback may affect the project timeline.
        </p>

        <p className="mt-5">
          The client confirms that materials supplied to us may
          legally be used for the intended project.
        </p>
      </>
    ),
  },
  {
    id: "delivery",
    number: "07",
    title: "Timelines & delivery",
    icon: Rocket,
    content: (
      <>
        <p>
          Project timelines are estimates based on the agreed scope
          and the availability of required information, feedback,
          approvals and third-party services.
        </p>

        <p className="mt-5">
          Delays caused by missing content, delayed feedback,
          changes in scope, third-party providers or circumstances
          outside our reasonable control may extend the delivery
          timeline.
        </p>

        <p className="mt-5">
          Final delivery or launch is subject to completion of the
          agreed payment obligations.
        </p>
      </>
    ),
  },
];

export default function TermsProject() {
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