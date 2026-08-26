import {
  ClipboardCheck,
  MessageSquare,
  Rocket,
} from "lucide-react";

const STEPS = [
  {
    number: "01",
    icon: MessageSquare,
    title: "We understand the project",
    description:
      "We look at your requirements, business context and the problem you are trying to solve.",
  },
  {
    number: "02",
    icon: ClipboardCheck,
    title: "We define the right scope",
    description:
      "The important features, structure and technical direction are discussed before development begins.",
  },
  {
    number: "03",
    icon: Rocket,
    title: "We move toward execution",
    description:
      "Once the scope is clear, we can discuss timelines, pricing and the next practical step.",
  },
];

export default function ContactExpectations() {
  return (
    <section className="relative overflow-hidden bg-[#080808] py-20 sm:py-24 lg:py-28">
      <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
        <div className="max-w-xl">
          <span className="text-xs font-semibold uppercase tracking-[0.17em] text-[#FFC400]">
            What happens next
          </span>

          <h2 className="mt-4 text-3xl font-semibold tracking-[-0.045em] text-white sm:text-4xl">
            No unnecessary
            <span className="text-neutral-500"> back and forth.</span>
          </h2>
        </div>

        <div className="mt-10 grid gap-3 md:grid-cols-3">
          {STEPS.map((step) => {
            const Icon = step.icon;

            return (
              <article
                key={step.number}
                className="rounded-3xl border border-white/[0.08] bg-white/[0.02] p-6 sm:p-7"
              >
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold tracking-[0.18em] text-[#FFC400]">
                    {step.number}
                  </span>

                  <Icon
                    size={18}
                    className="text-neutral-600"
                  />
                </div>

                <h3 className="mt-8 text-lg font-semibold tracking-[-0.025em] text-white">
                  {step.title}
                </h3>

                <p className="mt-3 text-sm leading-6 text-neutral-500">
                  {step.description}
                </p>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}