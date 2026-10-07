import type { Metadata } from "next";
import Image from "next/image";
import { Mail, Phone, ArrowUpRight, Sparkles } from "lucide-react";
import { getSiteSettings } from "@/lib/site-settings/getSiteSettings";

export const metadata: Metadata = {
  title: "We'll Be Back Soon",
  description:
    "Our website is temporarily unavailable while we make improvements.",
  robots: {
    index: false,
    follow: false,
  },
};

export default async function MaintenancePage() {
  const settings = await getSiteSettings();

  const siteName =
    settings?.siteName?.trim() ||
    "Aman Digital Solutions";

  const tagline =
    settings?.tagline?.trim() ||
    "Web Development & Digital Solutions";

  const title =
    settings?.maintenanceTitle?.trim() ||
    "We'll Be Back Soon";

  const message =
    settings?.maintenanceMessage?.trim() ||
    "We're currently making some improvements to our website. Please check back shortly.";

  const logoUrl =
    settings?.logo?.url?.trim() ||
    "/logo.png";

  const logoAlt =
    settings?.logo?.alt?.trim() ||
    siteName;

  const email =
    settings?.primaryEmail?.trim() ||
    settings?.contact?.email?.trim() ||
    "";

  const phone =
    settings?.primaryPhone?.trim() ||
    settings?.contact?.phone?.trim() ||
    "";

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#050505] text-white selection:bg-[#FFD400] selection:text-black">
      {/* =========================================================
          BACKGROUND
      ========================================================== */}

      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
      >
        {/* Main ambient glow */}
        <div className="absolute left-1/2 top-[42%] h-[520px] w-[520px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#FFD400]/[0.045] blur-[140px]" />

        {/* Secondary glows */}
        <div className="absolute -left-40 top-20 h-80 w-80 rounded-full bg-[#FFD400]/[0.025] blur-[120px]" />

        <div className="absolute -right-40 bottom-10 h-96 w-96 rounded-full bg-white/[0.018] blur-[140px]" />

        {/* Subtle grid */}
        <div
          className="absolute inset-0 opacity-[0.025]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.7) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.7) 1px, transparent 1px)",
            backgroundSize: "64px 64px",
          }}
        />

        {/* Vignette */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_20%,#050505_85%)]" />
      </div>

      {/* =========================================================
          TOP BRAND BAR
      ========================================================== */}

      <header className="relative z-10 flex items-center justify-between px-6 py-6 sm:px-10 lg:px-14">
        <div className="flex items-center gap-3">
          <div className="relative h-10 w-10 overflow-hidden rounded-xl border border-white/10 bg-white/[0.045] p-2 shadow-[0_0_30px_rgba(255,212,0,0.05)]">
            <Image
              src={logoUrl}
              alt={logoAlt}
              fill
              sizes="40px"
              className="object-contain"
              priority
            />
          </div>

          <div className="hidden sm:block">
            <p className="text-sm font-semibold tracking-tight text-white">
              {siteName}
            </p>

            <p className="mt-0.5 text-[11px] text-white/35">
              {tagline}
            </p>
          </div>
        </div>

        {/* Status */}
        <div className="flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.035] px-3.5 py-2 backdrop-blur-md">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#FFD400] opacity-50" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-[#FFD400]" />
          </span>

          <span className="text-[11px] font-medium uppercase tracking-[0.16em] text-white/50">
            Maintenance
          </span>
        </div>
      </header>

      {/* =========================================================
          MAIN
      ========================================================== */}

      <section className="relative z-10 flex min-h-[calc(100vh-105px)] items-center justify-center px-6 pb-16 pt-10 sm:px-10 lg:px-14">
        <div className="w-full max-w-4xl text-center">

          {/* Premium icon */}
          <div className="mb-9 flex justify-center">
            <div className="relative">
              {/* Outer ring */}
              <div className="absolute -inset-3 rounded-[26px] border border-[#FFD400]/10" />

              {/* Glow */}
              <div className="absolute -inset-6 rounded-full bg-[#FFD400]/[0.035] blur-2xl" />

              <div className="relative flex h-20 w-20 items-center justify-center rounded-[22px] border border-[#FFD400]/20 bg-[#FFD400]/[0.055] shadow-[0_0_60px_rgba(255,212,0,0.08)]">
                <Sparkles
                  size={30}
                  strokeWidth={1.5}
                  className="text-[#FFD400]"
                />
              </div>
            </div>
          </div>

          {/* Eyebrow */}
          <div className="mb-6 flex items-center justify-center gap-3">
            <span className="h-px w-8 bg-[#FFD400]/30" />

            <p className="text-[11px] font-semibold uppercase tracking-[0.3em] text-[#FFD400]/80">
              Something great is coming
            </p>

            <span className="h-px w-8 bg-[#FFD400]/30" />
          </div>

          {/* Heading */}
          <h1 className="mx-auto max-w-4xl text-5xl font-semibold leading-[0.98] tracking-[-0.045em] text-white sm:text-6xl md:text-7xl lg:text-[84px]">
            {title}
          </h1>

          {/* Message */}
          <p className="mx-auto mt-7 max-w-2xl text-base leading-7 text-white/45 sm:text-lg sm:leading-8">
            {message}
          </p>

          {/* Divider */}
          <div className="mx-auto mt-10 flex items-center justify-center gap-3">
            <span className="h-px w-12 bg-white/10" />
            <span className="h-1 w-1 rounded-full bg-[#FFD400]" />
            <span className="h-px w-12 bg-white/10" />
          </div>

          {/* =====================================================
              CONTACT
          ====================================================== */}

          {(email || phone) && (
            <div className="mt-10">
              <p className="mb-4 text-xs font-medium uppercase tracking-[0.2em] text-white/25">
                Need to reach us?
              </p>

              <div className="flex flex-col items-center justify-center gap-3 sm:flex-row">
                {email && (
                  <a
                    href={`mailto:${email}`}
                    className="group flex w-full items-center justify-center gap-3 rounded-full border border-white/10 bg-white/[0.035] px-5 py-3 text-sm text-white/65 backdrop-blur-md transition-all duration-300 hover:border-[#FFD400]/30 hover:bg-[#FFD400]/[0.06] hover:text-white sm:w-auto"
                  >
                    <Mail
                      size={16}
                      strokeWidth={1.7}
                      className="text-[#FFD400]"
                    />

                    <span>{email}</span>

                    <ArrowUpRight
                      size={14}
                      className="text-white/25 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-[#FFD400]"
                    />
                  </a>
                )}

                {phone && (
                  <a
                    href={`tel:${phone}`}
                    className="group flex w-full items-center justify-center gap-3 rounded-full border border-white/10 bg-white/[0.035] px-5 py-3 text-sm text-white/65 backdrop-blur-md transition-all duration-300 hover:border-[#FFD400]/30 hover:bg-[#FFD400]/[0.06] hover:text-white sm:w-auto"
                  >
                    <Phone
                      size={16}
                      strokeWidth={1.7}
                      className="text-[#FFD400]"
                    />

                    <span>{phone}</span>

                    <ArrowUpRight
                      size={14}
                      className="text-white/25 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-[#FFD400]"
                    />
                  </a>
                )}
              </div>
            </div>
          )}

          {/* Bottom reassurance */}
          <div className="mt-14">
            <p className="text-xs text-white/20">
              Thank you for your patience.
            </p>

            <p className="mt-2 text-[10px] uppercase tracking-[0.22em] text-white/10">
              {siteName}
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}