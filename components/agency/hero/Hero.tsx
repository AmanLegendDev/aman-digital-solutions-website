import HeroContent from "./HeroContent";
import HeroStats from "./HeroStats";
import HeroVisual from "./HeroVisual";

export default function Hero() {
  return (
    <section
      id="home"
      aria-labelledby="hero-heading"
      className="relative isolate min-h-[calc(100svh-1rem)] overflow-hidden bg-[#050505] pt-28 sm:pt-32"
    >
      {/* Ambient background */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10"
      >
        <div className="absolute left-1/2 top-0 h-[500px] w-[700px] -translate-x-1/2 rounded-full bg-[#FFC400]/[0.035] blur-[140px]" />

        <div className="absolute bottom-0 left-0 h-[320px] w-[320px] rounded-full bg-[#FFC400]/[0.02] blur-[120px]" />
      </div>

      {/* Subtle grid */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 opacity-[0.025]"
        style={{
          backgroundImage:
            "linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)",
          backgroundSize: "72px 72px",
          maskImage:
            "linear-gradient(to bottom, black, transparent 75%)",
          WebkitMaskImage:
            "linear-gradient(to bottom, black, transparent 75%)",
        }}
      />

      <div className="mx-auto flex min-h-[calc(100svh-7rem)] max-w-7xl flex-col justify-center px-5 pb-12 sm:px-8 lg:px-10 lg:pb-16">
        <div className="grid items-center gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-10">
          {/* CONTENT */}
          <div className="relative z-20">
            <HeroContent />
          </div>

          {/* VISUAL */}
          <div className="relative z-10 lg:min-h-[560px]">
            <HeroVisual />
          </div>
        </div>

        {/* STATS / TRUST */}
        <div className="relative z-20 mt-10 lg:mt-4">
          <HeroStats />
        </div>
      </div>

      {/* Bottom fade */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#050505] to-transparent"
      />
    </section>
  );
}