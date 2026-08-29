export default function Loading() {
  return (
    <main
      aria-busy="true"
      aria-label="Loading Aman Digital Solutions"
      className="flex min-h-screen items-center justify-center overflow-hidden bg-[#050505] px-6 text-white"
    >
      <section className="flex flex-col items-center text-center">
        {/* Brand mark */}
        <div
          aria-hidden="true"
          className="relative flex h-14 w-14 items-center justify-center rounded-2xl border border-white/[0.08] bg-white/[0.025]"
        >
          <div className="h-5 w-5 animate-pulse rounded-md bg-[#FFC400]" />

          <div
            aria-hidden="true"
            className="absolute inset-0 rounded-2xl border border-[#FFC400]/10"
          />
        </div>

        {/* Brand */}
        <p className="mt-6 text-sm font-semibold tracking-wide text-white">
          Aman Digital Solutions
        </p>

        {/* Loading indicator */}
        <div
          aria-hidden="true"
          className="mt-5 h-1 w-32 overflow-hidden rounded-full bg-white/[0.06]"
        >
          <div className="h-full w-1/2 animate-[loading_1.2s_ease-in-out_infinite] rounded-full bg-[#FFC400]" />
        </div>

        <p className="mt-4 text-xs text-neutral-600">
          Loading...
        </p>
      </section>

      <style>{`
        @keyframes loading {
          0% {
            transform: translateX(-100%);
          }
          50% {
            transform: translateX(100%);
          }
          100% {
            transform: translateX(200%);
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