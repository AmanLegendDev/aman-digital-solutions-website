import Link from "next/link";
import {
  ArrowUpRight,
  Mail,
  MapPin,
  MessageCircle,
} from "lucide-react";

export default function TermsContact() {
  return (
    <section
      id="contact"
      className="scroll-mt-28 overflow-hidden rounded-[26px] border border-[#242424] bg-[#0A0A0A]"
    >
      {/* HEADER */}
      <div className="border-b border-[#1D1D1D] px-5 py-6 sm:px-7 sm:py-7">
        <div className="flex items-start gap-4">
          <span className="mt-1 shrink-0 text-[9px] font-semibold tabular-nums tracking-[0.16em] text-[#FFC400]">
            14
          </span>

          <div>
            <p className="text-[9px] font-medium uppercase tracking-[0.18em] text-[#FFC400]">
              Need clarification?
            </p>

            <h2 className="mt-2 text-xl font-semibold tracking-[-0.025em] text-[#EAEAEA] sm:text-2xl">
              Let&apos;s talk before we start.
            </h2>
          </div>
        </div>
      </div>

      {/* CONTENT */}
      <div className="px-5 py-7 sm:px-7 sm:py-8">
        <p className="max-w-2xl text-sm leading-7 text-[#777]">
          If you have questions about these terms, your project
          scope, payment structure, or anything else before getting
          started, feel free to contact Aman Digital Solutions.
        </p>

        {/* CONTACT CARDS */}
        <div className="mt-7 grid gap-3 sm:grid-cols-2">
          <a
            href="mailto:hello@amandigitalsolutions.com"
            className="group rounded-2xl border border-[#222] bg-[#0D0D0D] p-5 transition-all duration-200 hover:border-[#FFC400]/25 hover:bg-[#101010]"
          >
            <div className="flex items-center justify-between">
              <span className="flex h-9 w-9 items-center justify-center rounded-full border border-[#292929] bg-[#111111] text-[#FFC400]">
                <Mail size={15} />
              </span>

              <ArrowUpRight
                size={15}
                className="text-[#444] transition-all duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-[#FFC400]"
              />
            </div>

            <p className="mt-5 text-[9px] font-medium uppercase tracking-[0.17em] text-[#444]">
              Email
            </p>

            <p className="mt-1 break-all text-sm text-[#999] transition-colors group-hover:text-[#FFC400]">
              hello@amandigitalsolutions.com
            </p>
          </a>

          <div className="rounded-2xl border border-[#222] bg-[#0D0D0D] p-5">
            <span className="flex h-9 w-9 items-center justify-center rounded-full border border-[#292929] bg-[#111111] text-[#FFC400]">
              <MapPin size={15} />
            </span>

            <p className="mt-5 text-[9px] font-medium uppercase tracking-[0.17em] text-[#444]">
              Based in
            </p>

            <p className="mt-1 text-sm leading-6 text-[#999]">
              Shimla, Himachal Pradesh
              <br />
              India
            </p>
          </div>
        </div>

        {/* CTA */}
        <div className="mt-5 flex flex-col gap-4 rounded-2xl border border-[#1F1F1F] bg-[#0D0D0D] p-5 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-start gap-3">
            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#FFC400]/10 text-[#FFC400]">
              <MessageCircle size={14} />
            </span>

            <div>
              <p className="text-xs font-medium text-[#D5D5D5]">
                Ready to discuss your project?
              </p>

              <p className="mt-1 text-[10px] leading-5 text-[#555]">
                Tell us what you&apos;re building and we&apos;ll take it
                from there.
              </p>
            </div>
          </div>

          <Link
            href="/start-a-project"
            className="group inline-flex min-h-10 shrink-0 items-center justify-center gap-2 rounded-full bg-[#FFC400] px-5 text-xs font-semibold text-black transition-all duration-200 hover:bg-[#FFD43B] hover:shadow-[0_0_28px_rgba(255,196,0,0.14)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FFC400] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0D0D0D]"
          >
            Start a project

            <ArrowUpRight
              size={14}
              className="transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
            />
          </Link>
        </div>
      </div>
    </section>
  );
}