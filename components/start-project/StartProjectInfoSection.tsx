import {
  ArrowRight,
  CheckCircle2,
  MessageSquareText,
  Search,
  Send,
} from "lucide-react";
import Link from "next/link";

const projectSteps = [
  {
    number: "01",
    icon: Send,
    title: "Tell us about your project",
    description:
      "Share your business details, project requirements, preferred features and the problem you want your digital solution to solve. You do not need to have every detail finalized before submitting the enquiry.",
  },
  {
    number: "02",
    icon: Search,
    title: "We review your requirements",
    description:
      "Your enquiry is reviewed to understand the project's scope, business goals, functionality and technical requirements. Important questions can be clarified before development planning begins.",
  },
  {
    number: "03",
    icon: MessageSquareText,
    title: "Discuss the right approach",
    description:
      "We discuss the proposed website or digital solution, required features, project priorities and the next steps. This helps establish a clear understanding of what needs to be built.",
  },
  {
    number: "04",
    icon: CheckCircle2,
    title: "Define the project scope",
    description:
      "Once the requirements are clear, the project scope, deliverables, development approach and other relevant details can be defined before work begins.",
  },
];

export default function StartProjectInfoSection() {
  return (
    <section className="relative overflow-hidden border-t border-white/[0.06] bg-[#050505] px-5 py-20 sm:px-8 sm:py-24 lg:px-10 lg:py-28">
      {/* Ambient glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute right-[-160px] top-[80px] h-[360px] w-[360px] rounded-full bg-[#FFC400]/[0.018] blur-[120px]"
      />

      <div className="relative mx-auto max-w-6xl">
        {/* Header */}
        <div className="max-w-2xl">
          <p className="text-[9px] font-semibold uppercase tracking-[0.22em] text-[#FFC400]">
            What happens next
          </p>

          <h2 className="mt-4 text-3xl font-semibold leading-[1.08] tracking-[-0.045em] text-white sm:text-4xl lg:text-5xl">
            From first enquiry
            <br />
            <span className="text-neutral-500">
              to a clear project plan.
            </span>
          </h2>

          <p className="mt-5 max-w-xl text-sm leading-7 text-neutral-500 sm:text-base sm:leading-8">
            Starting a digital project does not require having every
            decision figured out in advance. The initial enquiry helps
            us understand what you are building, what your business
            needs and how we can approach the project.
          </p>
        </div>

        {/* Steps */}
        <div className="mt-14 grid gap-px overflow-hidden rounded-[28px] border border-white/[0.07] bg-white/[0.06] md:grid-cols-2">
          {projectSteps.map((item) => {
            const Icon = item.icon;

            return (
              <div
                key={item.number}
                className="group bg-[#080808] p-7 transition-colors duration-300 hover:bg-[#0a0a0a] sm:p-8 lg:p-10"
              >
                <div className="flex items-start justify-between gap-6">
                  <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-[#FFC400]/15 bg-[#FFC400]/[0.04] text-[#FFC400]">
                    <Icon
                      size={18}
                      strokeWidth={1.5}
                      aria-hidden="true"
                    />
                  </div>

                  <span className="text-[10px] font-medium tracking-[0.2em] text-neutral-700">
                    {item.number}
                  </span>
                </div>

                <h3 className="mt-7 text-lg font-medium tracking-[-0.02em] text-white">
                  {item.title}
                </h3>

                <p className="mt-3 text-sm leading-7 text-neutral-500">
                  {item.description}
                </p>
              </div>
            );
          })}
        </div>

        {/* Bottom note */}
        <div className="mt-10 flex flex-col gap-5 rounded-[24px] border border-white/[0.06] bg-[#080808] px-6 py-6 sm:flex-row sm:items-center sm:justify-between sm:px-8">
          <div>
            <p className="text-sm font-medium text-neutral-300">
              Not sure what you need yet?
            </p>

            <p className="mt-1 text-xs leading-6 text-neutral-600">
              That is okay. Start with what you know and we can
              clarify the rest during the project discussion.
            </p>
          </div>

          <Link
            href="/contact"
            className="group inline-flex shrink-0 items-center justify-center gap-2.5 rounded-full border border-white/[0.08] bg-white/[0.025] px-5 py-3 text-[9px] font-semibold uppercase tracking-[0.16em] text-neutral-400 transition-all duration-300 hover:border-[#FFC400]/25 hover:bg-[#FFC400]/[0.05] hover:text-[#FFC400]"
          >
            Contact us

            <ArrowRight
              size={13}
              strokeWidth={1.7}
              aria-hidden="true"
              className="transition-transform duration-300 group-hover:translate-x-0.5"
            />
          </Link>
        </div>
      </div>
    </section>
  );
}