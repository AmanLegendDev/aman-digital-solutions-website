import { ArrowUpRight, Globe2, Lightbulb } from "lucide-react";
import Link from "next/link";

export default function FutureVision() {
  return (
    <section className="relative overflow-hidden bg-[#080808] py-20 sm:py-24 lg:py-32">
      {/* Ambient glow */}
      <div
        aria-hidden="true"
        className="
          pointer-events-none absolute
          left-1/2 top-1/2
          h-[420px] w-[420px]
          -translate-x-1/2 -translate-y-1/2
          rounded-full
          bg-[#FFC400]/[0.035]
          blur-[120px]
        "
      />

      <div className="relative mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
        <div
          className="
            overflow-hidden rounded-[2rem]
            border border-white/[0.08]
            bg-white/[0.025]
          "
        >
          <div className="grid lg:grid-cols-[1.2fr_0.8fr]">
            {/* MAIN */}
            <div className="p-7 sm:p-10 lg:p-14">
              <span className="text-xs font-semibold uppercase tracking-[0.17em] text-[#FFC400]">
                Looking ahead
              </span>

              <h2 className="mt-5 max-w-3xl text-3xl font-semibold leading-[1.08] tracking-[-0.05em] text-white sm:text-4xl lg:text-6xl">
                Building for what&apos;s next.
                <span className="block text-neutral-500">
                  One better solution at a time.
                </span>
              </h2>

              <p className="mt-7 max-w-2xl text-sm leading-7 text-neutral-500 sm:text-base">
                The long-term vision for Aman Digital Solutions is to
                grow into a trusted digital solutions studio that helps
                businesses use technology to communicate, operate and
                grow more effectively.
              </p>

              <p className="mt-4 max-w-2xl text-sm leading-7 text-neutral-500 sm:text-base">
                The direction is simple: keep improving the craft,
                understand business requirements more deeply and build
                digital products that deliver lasting value across
                different markets.
              </p>

              <Link
                href="/start-a-project"
                className="
                  group mt-8 inline-flex items-center gap-2
                  rounded-full
                  bg-[#FFC400]
                  px-5 py-3
                  text-xs font-semibold
                  text-black
                  transition-all duration-200
                  hover:bg-[#FFD43B]
                  hover:shadow-[0_0_28px_rgba(255,196,0,0.18)]
                "
              >
                Start a Project

                <ArrowUpRight
                  size={14}
                  aria-hidden="true"
                  className="
                    transition-transform duration-200
                    group-hover:-translate-y-0.5
                    group-hover:translate-x-0.5
                  "
                />
              </Link>
            </div>

            {/* SIDE */}
            <div
              className="
                border-t border-white/[0.08]
                p-7
                sm:p-10
                lg:border-l lg:border-t-0
                lg:p-14
              "
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-[#FFC400]/15 bg-[#FFC400]/[0.05] text-[#FFC400]">
                <Globe2
                  size={20}
                  aria-hidden="true"
                />
              </div>

              <h3 className="mt-8 text-xl font-semibold tracking-[-0.03em] text-white sm:text-2xl">
                Built in Shimla,
                <span className="block text-neutral-500">
                  designed to work beyond borders.
                </span>
              </h3>

              <p className="mt-5 text-sm leading-6 text-neutral-500">
                With experience across businesses in India and Australia,
                the focus is to keep building a stronger digital
                practice that can serve businesses across industries,
                locations and markets.
              </p>

              <div className="mt-8 flex items-start gap-3 border-t border-white/[0.08] pt-6">
                <Lightbulb
                  size={16}
                  className="mt-0.5 shrink-0 text-[#FFC400]"
                  aria-hidden="true"
                />

                <p className="text-xs leading-5 text-neutral-600">
                  Growth should come from better work, stronger
                  relationships and measurable value — not from chasing
                  scale for the sake of scale.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}