import WhyUsIntro from "./WhyUsIntro";
import WhyUsPoints from "./WhyUsPoints";

export default function WhyUsSection() {
  return (
    <section
      id="about"
      aria-labelledby="why-us-heading"
      className="relative scroll-mt-28 overflow-hidden border-t border-[#1A1A1A] bg-[#080808] py-24 sm:py-28 lg:py-32"
    >
      {/* Ambient light */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-48 top-1/2 h-[500px] w-[500px] -translate-y-1/2 rounded-full bg-[#FFC400]/[0.025] blur-[150px]"
      />

      <div className="relative mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
        <div className="grid gap-14 lg:grid-cols-[0.8fr_1.2fr] lg:items-start lg:gap-20">
          {/* INTRO */}
          <div className="lg:sticky lg:top-32 lg:self-start">
            <WhyUsIntro />
          </div>

          {/* REASONS TO CHOOSE US */}
          <WhyUsPoints />
        </div>
      </div>
    </section>
  );
}