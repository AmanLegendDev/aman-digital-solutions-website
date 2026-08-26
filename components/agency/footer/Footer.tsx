import Link from "next/link";
import {
  ArrowUpRight,
  Instagram,
  Linkedin,
  Mail,
  MapPin,
  MessageCircle,
} from "lucide-react";

/* =========================================================
   BUSINESS LINKS
   ========================================================= */

const BUSINESS = {
  email: "hello@amandigitalsolutions.com",

  /*
   IMPORTANT:
   Add your WhatsApp number here with country code.
   Example for India:
   "919876543210"
  */
  whatsapp: "YOUR_WHATSAPP_NUMBER",

  instagram: "https://instagram.com/YOUR_INSTAGRAM",
  linkedin: "https://linkedin.com/in/YOUR_LINKEDIN",
};

/* =========================================================
   NAVIGATION
   ========================================================= */

const NAVIGATION = [
  { label: "Home", href: "#top" },
  { label: "Services", href: "#services" },
  { label: "Work", href: "#work" },
  { label: "Pricing", href: "#pricing" },
  { label: "Gallery", href: "#gallery" },
  { label: "Blog", href: "#blog" },
  { label: "FAQ", href: "#faq" },
];

/* =========================================================
   SERVICES
   ========================================================= */

const SERVICES = [
  "Web Development",
  "UI / UX Design",
  "SEO & Performance",
  "Business Solutions",
];

/* =========================================================
   FOOTER
   ========================================================= */

export default function Footer() {
  const whatsappHref =
    BUSINESS.whatsapp !== "YOUR_WHATSAPP_NUMBER"
      ? `https://wa.me/${BUSINESS.whatsapp}`
      : "/start-a-project";

  return (
    <footer className="relative w-full max-w-full overflow-hidden border-t border-[#1A1A1A] bg-[#030303]">
      {/* =====================================================
          TOP CTA BAND
      ===================================================== */}

      <div className="border-b border-[#1A1A1A]">
        <div className="mx-auto w-full max-w-7xl px-5 py-14 sm:px-8 sm:py-16 lg:px-10 lg:py-20">
          <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
            {/* HEADING */}

            <div className="max-w-3xl">
              <p className="text-[10px] font-medium uppercase tracking-[0.2em] text-[#FFC400]">
                Aman Digital Solutions
              </p>

              <h2 className="mt-4 text-[clamp(2.3rem,5vw,4.8rem)] font-semibold leading-[0.94] tracking-[-0.055em] text-[#F5F5F5]">
                Build something{" "}
                <span className="text-[#FFC400]">
                  worth remembering.
                </span>
              </h2>
            </div>

            {/* CTA */}

            <Link
              href="/start-a-project"
              className="group inline-flex min-h-12 shrink-0 items-center justify-center gap-2 self-start rounded-full bg-[#FFC400] px-6 text-sm font-semibold text-black transition-all duration-200 hover:bg-[#FFD43B] hover:shadow-[0_0_35px_rgba(255,196,0,0.14)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FFC400] lg:self-auto"
            >
              Start a project

              <ArrowUpRight
                size={16}
                className="transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
              />
            </Link>
          </div>
        </div>
      </div>

      {/* =====================================================
          MAIN FOOTER
      ===================================================== */}

      <div className="mx-auto w-full max-w-7xl px-5 py-12 sm:px-8 sm:py-14 lg:px-10 lg:py-16">
        <div className="grid gap-12 lg:grid-cols-[1.35fr_0.8fr_0.9fr_1fr] lg:gap-10">
          {/* =================================================
              BRAND
          ================================================= */}

          <div className="max-w-sm">
            <Link
              href="#top"
              className="inline-flex items-center gap-3"
              aria-label="Aman Digital Solutions home"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-[#292929] bg-[#0D0D0D]">
                <span className="text-sm font-bold text-[#FFC400]">
                  A
                </span>
              </div>

              <div>
                <p className="text-sm font-semibold tracking-tight text-[#EAEAEA]">
                  Aman Digital Solutions
                </p>

                <p className="mt-0.5 text-[9px] uppercase tracking-[0.16em] text-[#4F4F4F]">
                  Digital experiences
                </p>
              </div>
            </Link>

            <p className="mt-6 text-sm leading-7 text-[#666]">
              We create fast, modern and business-focused
              digital experiences that help ambitious brands
              grow online.
            </p>

            {/* SOCIALS */}

            <div className="mt-7 flex items-center gap-2">
              {/* INSTAGRAM */}

              <a
                href={BUSINESS.instagram}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-[#252525] bg-[#0A0A0A] text-[#666] transition-all duration-200 hover:border-[#FFC400]/30 hover:bg-[#FFC400]/[0.06] hover:text-[#FFC400]"
              >
                <Instagram size={15} />
              </a>

              {/* LINKEDIN */}

              <a
                href={BUSINESS.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-[#252525] bg-[#0A0A0A] text-[#666] transition-all duration-200 hover:border-[#FFC400]/30 hover:bg-[#FFC400]/[0.06] hover:text-[#FFC400]"
              >
                <Linkedin size={15} />
              </a>

              {/* WHATSAPP */}

              <a
                href={whatsappHref}
                target={
                  BUSINESS.whatsapp !== "YOUR_WHATSAPP_NUMBER"
                    ? "_blank"
                    : undefined
                }
                rel={
                  BUSINESS.whatsapp !== "YOUR_WHATSAPP_NUMBER"
                    ? "noopener noreferrer"
                    : undefined
                }
                aria-label="WhatsApp"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-[#252525] bg-[#0A0A0A] text-[#666] transition-all duration-200 hover:border-[#FFC400]/30 hover:bg-[#FFC400]/[0.06] hover:text-[#FFC400]"
              >
                <MessageCircle size={15} />
              </a>

              {/* EMAIL */}

              <a
                href={`mailto:${BUSINESS.email}`}
                aria-label="Email"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-[#252525] bg-[#0A0A0A] text-[#666] transition-all duration-200 hover:border-[#FFC400]/30 hover:bg-[#FFC400]/[0.06] hover:text-[#FFC400]"
              >
                <Mail size={15} />
              </a>
            </div>
          </div>

          {/* =================================================
              NAVIGATION
          ================================================= */}

          <div>
            <p className="text-[10px] font-medium uppercase tracking-[0.18em] text-[#444]">
              Explore
            </p>

            <nav className="mt-5 flex flex-col items-start gap-3">
              {NAVIGATION.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="text-sm text-[#777] transition-colors duration-200 hover:text-[#FFC400]"
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* =================================================
              SERVICES
          ================================================= */}

          <div>
            <p className="text-[10px] font-medium uppercase tracking-[0.18em] text-[#444]">
              What we do
            </p>

            <div className="mt-5 flex flex-col gap-3">
              {SERVICES.map((service) => (
                <Link
                  key={service}
                  href="/services"
                  className="text-sm text-[#777] transition-colors duration-200 hover:text-[#FFC400]"
                >
                  {service}
                </Link>
              ))}

              <Link
                href="/services"
                className="group mt-1 inline-flex items-center gap-1.5 text-xs font-medium text-[#555] transition-colors duration-200 hover:text-[#FFC400]"
              >
                View all services

                <ArrowUpRight
                  size={12}
                  className="transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                />
              </Link>
            </div>
          </div>

          {/* =================================================
              CONTACT
          ================================================= */}

          <div>
            <p className="text-[10px] font-medium uppercase tracking-[0.18em] text-[#444]">
              Get in touch
            </p>

            <div className="mt-5 space-y-4">
              {/* EMAIL */}

              <a
                href={`mailto:${BUSINESS.email}`}
                className="group flex items-start gap-3 text-sm text-[#777] transition-colors duration-200 hover:text-[#FFC400]"
              >
                <Mail
                  size={15}
                  className="mt-0.5 shrink-0 text-[#555] transition-colors group-hover:text-[#FFC400]"
                />

                <span className="break-all">
                  {BUSINESS.email}
                </span>
              </a>

              {/* WHATSAPP */}

              <a
                href={whatsappHref}
                target={
                  BUSINESS.whatsapp !== "YOUR_WHATSAPP_NUMBER"
                    ? "_blank"
                    : undefined
                }
                rel={
                  BUSINESS.whatsapp !== "YOUR_WHATSAPP_NUMBER"
                    ? "noopener noreferrer"
                    : undefined
                }
                className="group flex items-start gap-3 text-sm text-[#777] transition-colors duration-200 hover:text-[#FFC400]"
              >
                <MessageCircle
                  size={15}
                  className="mt-0.5 shrink-0 text-[#555] transition-colors group-hover:text-[#FFC400]"
                />

                <span>WhatsApp us</span>
              </a>

              {/* LOCATION */}

              <div className="flex items-start gap-3 text-sm text-[#777]">
                <MapPin
                  size={15}
                  className="mt-0.5 shrink-0 text-[#555]"
                />

                <span>
                  Shimla, Himachal Pradesh
                  <br />
                  India
                </span>
              </div>

              {/* PROJECT CTA */}

              <Link
                href="/start-a-project"
                className="group inline-flex items-center gap-2 pt-1 text-xs font-medium text-[#8A8A8A] transition-colors duration-200 hover:text-[#FFC400]"
              >
                Start a conversation

                <ArrowUpRight
                  size={13}
                  className="transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                />
              </Link>
            </div>
          </div>
        </div>

        {/* =================================================
            BOTTOM BAR
        ================================================= */}

        <div className="mt-12 flex flex-col gap-5 border-t border-[#1A1A1A] pt-6 sm:mt-14 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-[10px] text-[#444]">
            © {new Date().getFullYear()} Aman Digital Solutions.
            All rights reserved.
          </p>

          <div className="flex flex-wrap items-center gap-5 text-[10px] text-[#444]">
            <Link
              href="/privacy"
              className="transition-colors hover:text-[#777]"
            >
              Privacy
            </Link>

            <Link
              href="/terms"
              className="transition-colors hover:text-[#777]"
            >
              Terms
            </Link>

            <span
              aria-hidden="true"
              className="hidden h-1 w-1 rounded-full bg-[#333] sm:block"
            />

            <span className="text-[#333]">
              Built with purpose.
            </span>
          </div>
        </div>
      </div>

      {/* =====================================================
          BOTTOM ACCENT
      ===================================================== */}

      <div
        aria-hidden="true"
        className="h-px w-full bg-gradient-to-r from-transparent via-[#FFC400]/25 to-transparent"
      />
    </footer>
  );
}