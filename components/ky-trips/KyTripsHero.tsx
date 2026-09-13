"use client";

import Image from "next/image";
import Link from "next/link";
import {
  ArrowDown,
  ArrowRight,
  Building2,
  Home,
  MapPin,
  MessageCircle,
  ShieldCheck,
  TrendingUp,
} from "lucide-react";

const LOCATIONS = [
  {
    title: "Dubai",
    subtitle: "Global Opportunities",
    icon: TrendingUp,
  },
  {
    title: "Delhi NCR",
    subtitle: "Prime Locations",
    icon: Building2,
  },
  {
    title: "Chandigarh",
    subtitle: "Tri-City",
    icon: Home,
  },
  {
    title: "Panchkula",
    subtitle: "Modern Living",
    icon: MapPin,
  },
  {
    title: "Mohali",
    subtitle: "Growing Possibilities",
    icon: TrendingUp,
  },
];

export default function KyTripsHero() {
  return (
    <section
      id="home"
      aria-labelledby="ky-trips-hero-title"
      className="
        relative isolate min-h-[780px] overflow-hidden
        bg-[#061426] text-white
        sm:min-h-[820px]
        lg:min-h-[900px]
      "
    >
      {/* =========================================================
          BACKGROUND IMAGE
      ========================================================== */}

      <div className="absolute inset-0 -z-20">
        <Image
          src="/images/ky-trips/hero.webp"
          alt="Luxury property overlooking Dubai skyline at sunset"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />
      </div>

      {/* =========================================================
          CINEMATIC OVERLAYS
      ========================================================== */}

      <div
        className="
          absolute inset-0 -z-10
          bg-[linear-gradient(90deg,rgba(4,18,34,0.98)_0%,rgba(4,18,34,0.90)_28%,rgba(4,18,34,0.48)_58%,rgba(4,18,34,0.18)_100%)]
        "
      />

      <div
        className="
          absolute inset-0 -z-10
          bg-[linear-gradient(180deg,rgba(3,15,29,0.60)_0%,rgba(3,15,29,0.05)_35%,rgba(3,15,29,0.78)_100%)]
        "
      />

      <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_70%_45%,rgba(214,179,106,0.16),transparent_32%)]" />

      {/* =========================================================
          CONTENT
      ========================================================== */}

      <div className="mx-auto flex min-h-[780px] w-full max-w-7xl flex-col justify-center px-5 pb-24 pt-32 sm:px-8 sm:pb-28 sm:pt-36 lg:min-h-[900px] lg:px-10">
        <div className="max-w-3xl">
          {/* Eyebrow */}

          <div className="mb-6 flex items-center gap-3 sm:mb-7">
            <span className="h-px w-8 bg-[#D6B36A] sm:w-10" />

            <p className="text-[9px] font-medium uppercase tracking-[0.32em] text-[#E6D2A5] sm:text-[10px] sm:tracking-[0.38em]">
              Real Estate · Dubai · Delhi NCR · Tri-City
            </p>
          </div>

          {/* Main heading */}

          <h1
            id="ky-trips-hero-title"
            className="
              max-w-[900px]
              font-serif
              text-[48px]
              font-medium
              leading-[0.96]
              tracking-[-0.045em]
              text-white
              sm:text-[64px]
              md:text-[76px]
              lg:text-[88px]
              xl:text-[96px]
            "
          >
            Find a place
            <br />

            <span className="text-[#D6B36A]">
              worth calling yours.
            </span>
          </h1>

          {/* Supporting copy */}

          <p
            className="
              mt-7 max-w-[650px]
              text-[15px]
              leading-7
              text-white/72
              sm:mt-8
              sm:text-[17px]
              sm:leading-8
            "
          >
            Whether you are looking to buy your next property, sell with
            confidence, or explore the right investment opportunity, KY-TRIPS
            helps you make a more informed move.
          </p>

          {/* =====================================================
              CTA ROW
          ====================================================== */}

          <div className="mt-9 flex flex-col gap-3 sm:mt-10 sm:flex-row sm:items-center">
            <Link
              href="#properties"
              className="
                group inline-flex min-h-13 items-center justify-center gap-3
                rounded-full
                bg-[#D6B36A]
                px-6 py-3.5
                text-sm font-semibold
                text-[#061426]
                shadow-[0_12px_40px_rgba(214,179,106,0.20)]
                transition-all duration-300
                hover:-translate-y-0.5
                hover:bg-[#E4C47F]
                hover:shadow-[0_16px_50px_rgba(214,179,106,0.30)]
                focus-visible:outline-none
                focus-visible:ring-2
                focus-visible:ring-[#D6B36A]
                focus-visible:ring-offset-2
                focus-visible:ring-offset-[#061426]
              "
            >
              Explore Properties

              <ArrowRight
                size={17}
                strokeWidth={2}
                className="
                  transition-transform duration-300
                  group-hover:translate-x-1
                "
              />
            </Link>

            <Link
              href="#contact"
              className="
                group inline-flex min-h-13 items-center justify-center gap-3
                rounded-full
                border border-white/25
                bg-white/[0.06]
                px-6 py-3.5
                text-sm font-medium
                text-white
                backdrop-blur-md
                transition-all duration-300
                hover:border-[#D6B36A]/70
                hover:bg-white/[0.10]
                focus-visible:outline-none
                focus-visible:ring-2
                focus-visible:ring-[#D6B36A]
                focus-visible:ring-offset-2
                focus-visible:ring-offset-[#061426]
              "
            >
              <MessageCircle
                size={17}
                strokeWidth={1.8}
                className="text-[#D6B36A]"
              />

              Talk to Our Experts
            </Link>
          </div>
        </div>

        {/* =========================================================
            LOCATION STRIP
        ========================================================== */}

        <div className="mt-14 sm:mt-16 lg:mt-20">
          <div
            className="
              overflow-x-auto
              rounded-[28px]
              border border-white/12
              bg-[#061426]/55
              px-2 py-2
              shadow-[0_20px_80px_rgba(0,0,0,0.24)]
              backdrop-blur-xl
              scrollbar-none
              sm:rounded-full
            "
          >
            <div className="flex min-w-max items-stretch">
              {LOCATIONS.map((location, index) => {
                const Icon = location.icon;

                return (
                  <div
                    key={location.title}
                    className={`
                      flex min-w-[150px] items-center gap-3
                      px-4 py-3
                      sm:min-w-0 sm:flex-1
                      sm:justify-center
                      sm:px-5
                      ${
                        index !== LOCATIONS.length - 1
                          ? "border-r border-white/10"
                          : ""
                      }
                    `}
                  >
                    <div
                      className="
                        flex h-9 w-9 shrink-0 items-center justify-center
                        rounded-full
                        border border-[#D6B36A]/35
                        bg-[#D6B36A]/10
                      "
                    >
                      <Icon
                        size={16}
                        strokeWidth={1.6}
                        className="text-[#D6B36A]"
                      />
                    </div>

                    <div>
                      <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-white">
                        {location.title}
                      </p>

                      <p className="mt-0.5 whitespace-nowrap text-[9px] text-white/45">
                        {location.subtitle}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* =========================================================
            TRUST / POSITIONING STRIP
        ========================================================== */}

        <div className="mt-5 flex items-center justify-between gap-5">
          <div className="flex items-center gap-2 text-[9px] uppercase tracking-[0.28em] text-white/38">
            <ShieldCheck
              size={13}
              strokeWidth={1.5}
              className="text-[#D6B36A]"
            />

            <span>Property · Investment · Guidance</span>
          </div>

          <div className="hidden items-center gap-2 text-[9px] uppercase tracking-[0.28em] text-white/38 sm:flex">
            <span>Dubai</span>
            <span className="text-[#D6B36A]">•</span>
            <span>Delhi NCR</span>
            <span className="text-[#D6B36A]">•</span>
            <span>Tri-City</span>
          </div>
        </div>
      </div>

      {/* =========================================================
          BOTTOM SCROLL INDICATOR
      ========================================================== */}

      <div
        className="
          absolute bottom-6 left-5
          hidden items-center gap-3
          sm:flex
          lg:left-10
        "
      >
        <div
          className="
            flex h-9 w-9 items-center justify-center
            rounded-full
            border border-white/20
            bg-white/[0.04]
            backdrop-blur-md
          "
        >
          <ArrowDown
            size={15}
            strokeWidth={1.5}
            className="text-[#D6B36A]"
          />
        </div>

        <span className="text-[9px] uppercase tracking-[0.28em] text-white/45">
          Scroll to explore
        </span>
      </div>

      {/* =========================================================
          BOTTOM LOCATION MARKER
      ========================================================== */}

      <div className="absolute bottom-7 right-5 hidden items-center gap-2 lg:right-10 lg:flex">
        <MapPin
          size={13}
          strokeWidth={1.5}
          className="text-[#D6B36A]"
        />

        <span className="text-[9px] uppercase tracking-[0.25em] text-white/45">
          Dubai · Delhi NCR · Chandigarh · Panchkula · Mohali
        </span>
      </div>
    </section>
  );
}