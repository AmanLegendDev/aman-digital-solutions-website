export default function Loading() {
  return (
    <main
      aria-busy="true"
      aria-label="Loading Aman Digital Solutions"
      className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#050505] px-6 text-white"
    >
      {/* ===================================================
          AMBIENT BACKGROUND
      ==================================================== */}

      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
      >
        <div className="absolute left-1/2 top-1/2 h-72 w-72 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#FFC400]/[0.045] blur-[110px]" />

        <div className="absolute left-0 top-0 h-56 w-56 rounded-full bg-white/[0.018] blur-[100px]" />

        <div className="absolute bottom-0 right-0 h-64 w-64 rounded-full bg-[#FFC400]/[0.025] blur-[110px]" />
      </div>

      {/* ===================================================
          SUBTLE GRID
      ==================================================== */}

      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.018]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.8) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.8) 1px, transparent 1px)",
          backgroundSize: "56px 56px",
        }}
      />

      {/* ===================================================
          LOADER
      ==================================================== */}

      <section className="relative z-10 flex w-full max-w-sm flex-col items-center text-center">
        {/* =================================================
            BRAND MARK
        ================================================== */}

        <div
          aria-hidden="true"
          className="relative flex h-20 w-20 items-center justify-center"
        >
          {/* Outer ring */}
          <div className="absolute inset-0 rounded-[24px] border border-white/[0.08]" />

          {/* Animated ring */}
          <div className="absolute inset-0 animate-[spin_2.8s_linear_infinite] rounded-[24px] border border-transparent border-t-[#FFC400]/60 border-r-[#FFC400]/10" />

          {/* Inner glass */}
          <div className="relative flex h-14 w-14 items-center justify-center rounded-2xl border border-white/[0.08] bg-white/[0.025] shadow-[0_0_40px_rgba(255,196,0,0.06)] backdrop-blur-sm">
            <span className="text-sm font-black tracking-[-0.04em] text-[#FFC400]">
              ADS
            </span>
          </div>
        </div>

        {/* =================================================
            BRAND
        ================================================== */}

        <div className="mt-7">
          <p className="text-sm font-semibold tracking-[0.01em] text-white">
            Aman Digital Solutions
          </p>

          <p className="mt-2 text-[11px] font-medium uppercase tracking-[0.24em] text-neutral-600">
            Digital experiences that grow
          </p>
        </div>

        {/* =================================================
            PROGRESS
        ================================================== */}

        <div className="mt-8 w-40">
          <div
            aria-hidden="true"
            className="h-[2px] w-full overflow-hidden rounded-full bg-white/[0.07]"
          >
            <div className="h-full w-1/2 animate-[loading_1.4s_ease-in-out_infinite] rounded-full bg-[#FFC400]" />
          </div>

          <p className="mt-4 text-xs text-neutral-600">
            Preparing your experience
          </p>
        </div>
      </section>

      {/* ===================================================
          ANIMATION
      ==================================================== */}

      <style>{`
        @keyframes loading {
          0% {
            transform: translateX(-120%);
          }

          50% {
            transform: translateX(100%);
          }

          100% {
            transform: translateX(220%);
          }
        }

        @keyframes spin {
          from {
            transform: rotate(0deg);
          }

          to {
            transform: rotate(360deg);
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .animate-pulse,
          [class*="animate-"] {
            animation: none !important;
          }
        }
      `}</style>
    </main>
  );
}