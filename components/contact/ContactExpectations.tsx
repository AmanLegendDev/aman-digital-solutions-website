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
      "We review your requirements, business context and the problem you are trying to solve so we understand what the project actually needs.",
  },
  {
    number: "02",
    icon: ClipboardCheck,
    title: "We define the right scope",
    description:
      "The important features, structure and technical direction are discussed before development begins, keeping the project focused and practical.",
  },
  {
    number: "03",
    icon: Rocket,
    title: "We move toward execution",
    description:
      "Once the scope is clear, we can discuss the appropriate timeline, pricing and next practical step for the project.",
  },
];

export default function ContactExpectations() {
  return (
    <section
      className="relative overflow-hidden bg-[#080808] py-20 sm:py-24 lg:py-28"
      aria-labelledby="contact-expectations-heading"
    >
      <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
        {/* HEADER */}
        <div className="max-w-xl">
          <span className="text-xs font-semibold uppercase tracking-[0.17em] text-[#FFC400]">
            What happens next
          </span>

          <h2
            id="contact-expectations-heading"
            className="mt-4 text-3xl font-semibold tracking-[-0.045em] text-white sm:text-4xl"
          >
            No unnecessary
            <span className="text-neutral-500">
              {" "}
              back and forth.
            </span>
          </h2>

          <p className="mt-5 max-w-lg text-sm leading-7 text-neutral-500 sm:text-base">
            A clear project discussion helps both sides understand
            what needs to be built before moving into execution.
          </p>
        </div>

        {/* STEPS */}
        <div className="mt-10 grid gap-3 md:grid-cols-3">
          {STEPS.map((step) => {
            const Icon = step.icon;

            return (
              <article
                key={step.number}
                className="
                  group rounded-3xl
                  border border-white/[0.08]
                  bg-white/[0.02]
                  p-6 sm:p-7
                  transition-all duration-300
                  hover:-translate-y-1
                  hover:border-[#FFC400]/20
                  hover:bg-white/[0.035]
                "
              >
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold tracking-[0.18em] text-[#FFC400]">
                    {step.number}
                  </span>

                  <Icon
                    size={18}
                    strokeWidth={1.8}
                    aria-hidden="true"
                    className="
                      text-neutral-600
                      transition-colors duration-300
                      group-hover:text-[#FFC400]
                    "
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