import TrustIntro from "./TrustIntro";
import TrustPoints from "./TrustPoints";

export default function TrustSection() {
  return (
    <section
      id="trust"
      aria-labelledby="trust-heading"
      className="relative overflow-hidden border-t border-[#1A1A1A] bg-[#050505] py-24 sm:py-28 lg:py-32"
    >
      {/* Ambient glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-40 top-1/2 h-80 w-80 -translate-y-1/2 rounded-full bg-[#FFC400]/[0.025] blur-[120px]"
      />

      <div className="relative mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
        <div className="grid gap-14 lg:grid-cols-[0.85fr_1.15fr] lg:items-start lg:gap-20">
          {/* Trust introduction */}
          <TrustIntro />

          {/* Reasons to choose Aman Digital Solutions */}
          <TrustPoints />
        </div>
      </div>
    </section>
  );
}