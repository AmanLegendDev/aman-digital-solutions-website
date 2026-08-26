import Link from "next/link";
import { ArrowUpRight, MessageCircle } from "lucide-react";

export default function AboutCTA() {
  return (
    <section className="relative overflow-hidden bg-[#080808] py-20 sm:py-24 lg:py-32">
      {/* Ambient background */}
      <div
        aria-hidden="true"
        className="
          pointer-events-none absolute
          left-1/2 top-1/2
          h-[500px] w-[500px]
          -translate-x-1/2 -translate-y-1/2
          rounded-full
          bg-[#FFC400]/[0.035]
          blur-[140px]
        "
      />

      <div className="relative mx-auto max-w-5xl px-5 sm:px-6 lg:px-8">
        <div
          className="
            relative overflow-hidden
            rounded-[2rem]
            border border-white/[0.09]
            bg-[#0D0D0D]
            px-6 py-12
            text-center
            sm:px-10 sm:py-16
            lg:px-16 lg:py-20
          "
        >
          {/* Subtle grid */}
          <div
            aria-hidden="true"
            className="
              pointer-events-none absolute inset-0 opacity-[0.035]
              [background-image:linear-gradient(rgba(255,255,255,1)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,1)_1px,transparent_1px)]
              [background-size:44px_44px]
            "
          />

          <div className="relative mx-auto max-w-3xl">
            <div
              className="
                mx-auto flex h-12 w-12
                items-center justify-center
                rounded-2xl
                border border-[#FFC400]/15
                bg-[#FFC400]/[0.06]
                text-[#FFC400]
              "
            >
              <MessageCircle size={20} />
            </div>

            <span className="mt-6 block text-xs font-semibold uppercase tracking-[0.18em] text-[#FFC400]">
              Have a project in mind?
            </span>

            <h2
              className="
                mt-4
                text-3xl font-semibold
                leading-[1.08]
                tracking-[-0.05em]
                text-white
                sm:text-4xl
                lg:text-5xl
              "
            >
              Let&apos;s build something
              <span className="block text-neutral-500">
                worth putting online.
              </span>
            </h2>

            <p className="mx-auto mt-6 max-w-2xl text-sm leading-7 text-neutral-500 sm:text-base">
              Whether you are starting from scratch, improving an
              existing website or building a custom digital system,
              tell us what you are trying to achieve.
            </p>

            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Link
                href="/start-a-project"
                className="
                  group inline-flex
                  items-center justify-center gap-2
                  rounded-full
                  bg-[#FFC400]
                  px-6 py-3.5
                  text-sm font-semibold
                  text-black
                  transition-all duration-200
                  hover:bg-[#FFD43B]
                  hover:shadow-[0_0_32px_rgba(255,196,0,0.18)]
                  focus-visible:outline-none
                  focus-visible:ring-2
                  focus-visible:ring-[#FFC400]
                  focus-visible:ring-offset-2
                  focus-visible:ring-offset-[#0D0D0D]
                "
              >
                Start a Project

                <ArrowUpRight
                  size={16}
                  className="
                    transition-transform duration-200
                    group-hover:-translate-y-0.5
                    group-hover:translate-x-0.5
                  "
                />
              </Link>

              <Link
                href="/projects"
                className="
                  inline-flex
                  items-center justify-center
                  rounded-full
                  border border-white/[0.1]
                  bg-white/[0.02]
                  px-6 py-3.5
                  text-sm font-medium
                  text-neutral-300
                  transition-all duration-200
                  hover:border-white/[0.18]
                  hover:bg-white/[0.05]
                  hover:text-white
                  focus-visible:outline-none
                  focus-visible:ring-2
                  focus-visible:ring-[#FFC400]
                "
              >
                Explore Our Work
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}