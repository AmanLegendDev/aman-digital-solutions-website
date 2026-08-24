import Link from "next/link";
import { ArrowUpRight, Code2, Sparkles } from "lucide-react";

export default function HomePage() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-[#070707] text-white">
      {/* Ambient background */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-[-20%] h-[600px] w-[600px] -translate-x-1/2 rounded-full bg-white/[0.04] blur-[120px]" />
        <div className="absolute bottom-[-15%] left-[-10%] h-[450px] w-[450px] rounded-full bg-white/[0.025] blur-[100px]" />
      </div>

      {/* Grid */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.035]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.8) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.8) 1px, transparent 1px)",
          backgroundSize: "64px 64px",
        }}
      />

      <div className="relative z-10 flex min-h-screen flex-col">
        {/* Header */}
        <header className="mx-auto flex w-full max-w-7xl items-center justify-between px-6 py-7 lg:px-8">
          <Link
            href="/"
            className="group flex items-center gap-3"
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/[0.06]">
              <Code2 size={19} />
            </div>

            <div>
              <p className="text-sm font-semibold tracking-wide">
                Aman Digital Solutions
              </p>
              <p className="text-[11px] text-white/40">
                Digital solutions that mean business.
              </p>
            </div>
          </Link>

          <div className="hidden items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-4 py-2 text-xs text-white/50 sm:flex">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
            Website in development
          </div>
        </header>

        {/* Main */}
        <section className="flex flex-1 items-center justify-center px-6 py-20">
          <div className="mx-auto w-full max-w-4xl text-center">
            <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-xs font-medium text-white/60">
              <Sparkles size={14} />
              Something great is being built
            </div>

            <h1 className="mx-auto max-w-4xl text-5xl font-semibold leading-[1.05] tracking-[-0.04em] sm:text-6xl md:text-7xl">
              We&apos;re building something
              <span className="block text-white/35">
                worth coming back to.
              </span>
            </h1>

            <p className="mx-auto mt-7 max-w-2xl text-base leading-7 text-white/45 sm:text-lg">
              Aman Digital Solutions is currently under development.
              We&apos;re building a modern digital experience focused on
              premium websites, powerful systems, and real business growth.
            </p>

            <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Link
                href="/login"
                className="group inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold text-black transition hover:bg-white/90"
              >
                Admin Login
                <ArrowUpRight
                  size={16}
                  className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                />
              </Link>

              <span className="rounded-full border border-white/10 px-6 py-3 text-sm text-white/40">
                Launching soon
              </span>
            </div>

            {/* Bottom cards */}
            <div className="mx-auto mt-20 grid max-w-2xl grid-cols-1 gap-3 sm:grid-cols-3">
              {[
                {
                  title: "Premium",
                  text: "Built with purpose",
                },
                {
                  title: "Modern",
                  text: "Technology first",
                },
                {
                  title: "Business",
                  text: "Focused on results",
                },
              ].map((item) => (
                <div
                  key={item.title}
                  className="rounded-2xl border border-white/[0.08] bg-white/[0.025] px-5 py-5 text-left backdrop-blur-sm"
                >
                  <p className="text-sm font-medium text-white/80">
                    {item.title}
                  </p>
                  <p className="mt-1 text-xs text-white/35">
                    {item.text}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="mx-auto flex w-full max-w-7xl items-center justify-between border-t border-white/[0.07] px-6 py-6 text-xs text-white/30 lg:px-8">
          <p>© {new Date().getFullYear()} Aman Digital Solutions</p>

          <p>Building the future, one system at a time.</p>
        </footer>
      </div>
    </main>
  );
}