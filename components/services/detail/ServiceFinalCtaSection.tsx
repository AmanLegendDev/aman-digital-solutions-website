import Link from "next/link";
import {
  ArrowRight,
  ArrowUpRight,
  CheckCircle2,
  MessageSquareText,
  Sparkles,
} from "lucide-react";

type ServiceFinalCtaSectionProps = {
  title: string;
  ctaLabel?: string;
  ctaLink?: string;
};

export default function ServiceFinalCtaSection({
  title,
  ctaLabel,
  ctaLink,
}: ServiceFinalCtaSectionProps) {
  const buttonLabel =
    ctaLabel || "Get Started";

  const buttonHref =
    ctaLink || "/booking";

  return (
    <section
      id="service-final-cta"
      aria-labelledby="service-final-cta-heading"
      className="relative overflow-hidden border-t border-white/[0.06] bg-[#050505] py-24 sm:py-28 lg:py-36"
    >
      {/* BACKGROUND */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-1/2 h-[520px] w-[520px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#FFC400]/[0.045] blur-[130px]"
      />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.025]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
        }}
      />

      <div className="relative mx-auto max-w-5xl px-5 text-center sm:px-8">
        {/* EYEBROW */}
        <div className="inline-flex items-center gap-2 rounded-full border border-[#FFC400]/15 bg-[#FFC400]/[0.04] px-3.5 py-2">
          <Sparkles
            size={13}
            className="text-[#FFC400]"
          />

          <span className="text-[9px] font-semibold uppercase tracking-[0.2em] text-[#FFC400]">
            Ready when you are
          </span>
        </div>

        {/* HEADING */}
        <h2
          id="service-final-cta-heading"
          className="mx-auto mt-7 max-w-4xl text-4xl font-semibold leading-[1.02] tracking-[-0.045em] text-white sm:text-5xl lg:text-6xl"
        >
          Let's turn your
          <span className="text-[#FFC400]">
            {" "}
            next idea
          </span>
          <br />
          into something real.
        </h2>

        {/* DESCRIPTION */}
        <p className="mx-auto mt-6 max-w-2xl text-sm leading-7 text-neutral-500 sm:text-base">
          Whether you're starting from scratch, replacing
          an outdated website or looking to build something
          more ambitious, let's talk about what your business
          actually needs.
        </p>

        {/* CTA */}
        <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Link
            href={buttonHref}
            className="group inline-flex min-w-[190px] items-center justify-center gap-3 rounded-full bg-[#FFC400] px-6 py-3.5 text-sm font-semibold text-black transition-all duration-300 hover:bg-[#FFD43B] hover:shadow-[0_15px_45px_rgba(255,196,0,0.16)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FFC400] focus-visible:ring-offset-2 focus-visible:ring-offset-[#050505]"
          >
            <span>{buttonLabel}</span>

            <span className="flex h-7 w-7 items-center justify-center rounded-full bg-black/10 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
              <ArrowUpRight size={15} />
            </span>
          </Link>

          <Link
            href="/contact"
            className="group inline-flex min-w-[190px] items-center justify-center gap-2 rounded-full border border-white/[0.09] bg-[#090909] px-6 py-3.5 text-sm font-medium text-neutral-300 transition-all duration-300 hover:border-white/[0.16] hover:bg-[#0C0C0C] hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FFC400]"
          >
            <MessageSquareText
              size={15}
              className="text-neutral-600 transition-colors group-hover:text-[#FFC400]"
            />

            Talk to us
          </Link>
        </div>

        {/* TRUST POINTS */}
        <div className="mt-10 flex flex-wrap items-center justify-center gap-x-6 gap-y-3">
          {[
            "Clear project scope",
            "No-pressure conversation",
            "Business-first approach",
          ].map((item) => (
            <div
              key={item}
              className="flex items-center gap-2"
            >
              <CheckCircle2
                size={13}
                className="text-[#FFC400]"
              />

              <span className="text-[10px] text-neutral-600">
                {item}
              </span>
            </div>
          ))}
        </div>

        {/* SERVICE CONTEXT */}
        <div className="mx-auto mt-14 flex max-w-xl items-center justify-center gap-3 border-t border-white/[0.06] pt-7">
          <span className="text-[9px] uppercase tracking-[0.16em] text-neutral-700">
            Interested in
          </span>

          <ArrowRight
            size={12}
            className="text-neutral-700"
          />

          <span className="max-w-[220px] truncate text-[10px] font-medium text-neutral-500">
            {title}
          </span>
        </div>
      </div>
    </section>
  );
}