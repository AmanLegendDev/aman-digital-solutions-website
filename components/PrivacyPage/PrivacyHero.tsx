import { ShieldCheck, LockKeyhole } from "lucide-react";

export default function PrivacyHero() {
  return (
    <section className="relative overflow-hidden border-b border-white/[0.06] bg-[#080808]">
      <div className="pointer-events-none absolute left-1/2 top-0 h-[420px] w-[700px] -translate-x-1/2 rounded-full bg-[#FFC400]/[0.045] blur-[120px]" />

      <div className="relative mx-auto max-w-7xl px-5 pb-20 pt-32 sm:px-6 sm:pb-24 sm:pt-36 lg:px-8 lg:pb-28">
        <div className="max-w-3xl">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-[#FFC400]/15 bg-[#FFC400]/[0.06] px-3.5 py-2 text-xs font-medium text-[#FFC400]">
            <ShieldCheck size={15} />
            Privacy & Data Protection
          </div>

          <h1 className="text-4xl font-semibold tracking-[-0.045em] text-white sm:text-5xl lg:text-6xl">
            Your privacy matters.
            <span className="block text-neutral-500">
              We keep your information handled responsibly.
            </span>
          </h1>

          <p className="mt-6 max-w-2xl text-base leading-7 text-neutral-400 sm:text-lg">
            This Privacy Policy explains what information Aman Digital
            Solutions may collect, how we use it, when it may be shared and
            the choices you have regarding your information.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-3 text-xs text-neutral-500">
            <span className="inline-flex items-center gap-2">
              <LockKeyhole size={14} className="text-[#FFC400]" />
              Responsible data handling
            </span>

            <span className="hidden h-1 w-1 rounded-full bg-neutral-700 sm:block" />

            <span>Last updated: August 2026</span>
          </div>
        </div>
      </div>
    </section>
  );
}