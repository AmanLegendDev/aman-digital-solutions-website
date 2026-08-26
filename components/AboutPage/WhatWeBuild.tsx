import Link from "next/link";
import {
  ArrowUpRight,
  Bot,
  Code2,
  LineChart,
  Palette,
  Settings2,
  ShoppingBag,
} from "lucide-react";

const CAPABILITIES = [
  {
    number: "01",
    icon: Code2,
    title: "Websites & Digital Experiences",
    description:
      "Modern websites built around clarity, performance, responsive design and the real goals of the business behind them.",
  },
  {
    number: "02",
    icon: ShoppingBag,
    title: "E-commerce & Business Platforms",
    description:
      "Product-focused digital experiences and custom platforms designed to make complex business operations easier to manage.",
  },
  {
    number: "03",
    icon: Settings2,
    title: "CMS & Business Systems",
    description:
      "Custom admin panels, content management systems and workflows that give businesses practical control over their digital presence.",
  },
  {
    number: "04",
    icon: Palette,
    title: "UI/UX & Conversion",
    description:
      "Interfaces designed not just to look good, but to make information easier to understand and important actions easier to take.",
  },
  {
    number: "05",
    icon: LineChart,
    title: "SEO & Digital Growth",
    description:
      "Search-ready foundations and digital growth solutions that help businesses become easier to discover and connect with customers.",
  },
  {
    number: "06",
    icon: Bot,
    title: "AI & Intelligent Experiences",
    description:
      "Practical AI features integrated into digital products where automation, assistance or smarter user experiences can create real value.",
  },
];

export default function WhatWeBuild() {
  return (
    <section
      id="capabilities"
      className="relative overflow-hidden bg-[#080808] py-20 sm:py-24 lg:py-32"
    >
      <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
        {/* HEADER */}
        <div className="max-w-3xl">
          <span className="text-xs font-semibold uppercase tracking-[0.17em] text-[#FFC400]">
            What we build
          </span>

          <h2 className="mt-4 text-3xl font-semibold leading-tight tracking-[-0.045em] text-white sm:text-4xl lg:text-5xl">
            Technology that solves
            <span className="text-neutral-500"> business problems.</span>
          </h2>

          <p className="mt-6 max-w-2xl text-sm leading-7 text-neutral-500 sm:text-base">
            Aman Digital Solutions combines development, design, business
            understanding and modern technology to create digital
            experiences that are useful beyond the launch day.
          </p>
        </div>

        {/* CAPABILITY GRID */}
        <div className="mt-12 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {CAPABILITIES.map((item) => {
            const Icon = item.icon;

            return (
              <article
                key={item.number}
                className="
                  group relative
                  min-h-[270px]
                  overflow-hidden
                  rounded-3xl
                  border border-white/[0.08]
                  bg-white/[0.025]
                  p-6
                  transition-all duration-300
                  hover:-translate-y-1
                  hover:border-[#FFC400]/20
                  hover:bg-white/[0.035]
                  sm:p-7
                "
              >
                {/* Number */}
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold tracking-[0.16em] text-neutral-600">
                    {item.number}
                  </span>

                  <div
                    className="
                      flex h-10 w-10 items-center justify-center
                      rounded-full
                      border border-white/[0.08]
                      bg-black/20
                      text-neutral-400
                      transition-all duration-300
                      group-hover:border-[#FFC400]/25
                      group-hover:text-[#FFC400]
                    "
                  >
                    <Icon size={17} />
                  </div>
                </div>

                <h3 className="mt-12 max-w-xs text-xl font-semibold tracking-[-0.03em] text-white">
                  {item.title}
                </h3>

                <p className="mt-4 text-sm leading-6 text-neutral-500">
                  {item.description}
                </p>

                {/* Hover accent */}
                <div
                  aria-hidden="true"
                  className="
                    absolute bottom-0 left-6 right-6
                    h-px origin-left scale-x-0
                    bg-[#FFC400]/50
                    transition-transform duration-300
                    group-hover:scale-x-100
                  "
                />
              </article>
            );
          })}
        </div>

        {/* CTA */}
        <div className="mt-8 flex justify-end">
          <Link
            href="/services"
            className="
              group inline-flex items-center gap-2
              text-sm font-medium text-neutral-300
              transition-colors hover:text-white
            "
          >
            Explore all services

            <ArrowUpRight
              size={15}
              className="
                text-[#FFC400]
                transition-transform duration-200
                group-hover:-translate-y-0.5
                group-hover:translate-x-0.5
              "
            />
          </Link>
        </div>
      </div>
    </section>
  );
}