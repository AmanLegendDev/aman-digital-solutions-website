import {
  CalendarCheck,
  CreditCard,
  FileCheck2,
} from "lucide-react";

const sections = [
  {
    number: "01",
    title: "General terms",
    icon: FileCheck2,
    content: (
      <>
        <p>
          These Terms & Conditions apply to digital services
          provided by Aman Digital Solutions, including website
          design and development, UI/UX design, e-commerce
          development, SEO, digital marketing and other custom
          digital solutions.
        </p>

        <p className="mt-5">
          By approving a proposal, making a booking payment, or
          instructing us to begin work, you acknowledge that you
          have read and accepted these terms.
        </p>
      </>
    ),
  },
  {
    number: "02",
    title: "Project booking",
    icon: CalendarCheck,
    content: (
      <>
        <p>
          Initial project discussions and enquiries do not create
          a financial obligation by themselves. A project becomes
          formally booked once the scope is agreed and the required
          advance payment has been received.
        </p>

        <p className="mt-5">
          A booking reserves development time and project capacity
          for the client. Work may not begin until the required
          booking payment and essential project information have
          been received.
        </p>
      </>
    ),
  },
  {
    number: "03",
    title: "Payment terms",
    icon: CreditCard,
    content: (
      <>
        <div className="rounded-2xl border border-[#FFC400]/15 bg-[#FFC400]/[0.04] p-5">
          <p className="font-medium text-[#E5E5E5]">
            Standard payment structure:
            <span className="text-[#FFC400]">
              {" "}
              50% advance + 50% before final delivery.
            </span>
          </p>
        </div>

        <p className="mt-5">
          Unless a different payment schedule has been agreed in
          writing, 50% of the project fee is payable in advance to
          begin the project.
        </p>

        <p className="mt-5">
          The remaining 50% is payable before final delivery,
          launch, transfer of production credentials, or handover
          of the completed project.
        </p>

        <p className="mt-5">
          Work may be paused if an outstanding payment becomes
          overdue.
        </p>
      </>
    ),
  },
];

export default function TermsBasics() {
  return (
    <section className="space-y-5">
      {sections.map((section) => {
        const Icon = section.icon;

        return (
          <article
            key={section.number}
            id={
              section.number === "01"
                ? "overview"
                : section.number === "02"
                  ? "booking"
                  : "payment"
            }
            className="scroll-mt-28 overflow-hidden rounded-[24px] border border-[#202020] bg-[#090909]"
          >
            {/* HEADER */}
            <div className="border-b border-[#1D1D1D] px-5 py-5 sm:px-7 sm:py-6">
              <div className="flex items-center gap-4">
                <span className="text-[9px] font-semibold tabular-nums tracking-[0.16em] text-[#FFC400]">
                  {section.number}
                </span>

                <span className="flex h-8 w-8 items-center justify-center rounded-full border border-[#292929] bg-[#0D0D0D] text-[#FFC400]">
                  <Icon size={14} />
                </span>

                <h2 className="text-xl font-semibold tracking-[-0.025em] text-[#EAEAEA] sm:text-2xl">
                  {section.title}
                </h2>
              </div>
            </div>

            {/* CONTENT */}
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