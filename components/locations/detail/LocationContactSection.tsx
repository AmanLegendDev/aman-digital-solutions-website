import Link from "next/link";

import {
  ArrowUpRight,
  Clock3,
  ExternalLink,
  Mail,
  MapPin,
  Navigation,
  Phone,
} from "lucide-react";

type LocationContactSectionProps = {
  name: string;

  address?: string;
  city: string;
  state?: string;
  country: string;
  postalCode?: string;

  phone?: string;
  email?: string;

  mapUrl?: string;

  latitude?: number;
  longitude?: number;
};

export default function LocationContactSection({
  name,
  address,
  city,
  state,
  country,
  postalCode,
  phone,
  email,
  mapUrl,
  latitude,
  longitude,
}: LocationContactSectionProps) {
  const hasContact =
    Boolean(phone) ||
    Boolean(email) ||
    Boolean(address) ||
    Boolean(mapUrl);

  if (!hasContact) {
    return null;
  }

  const fullLocation = [
    address,
    city,
    state,
    postalCode,
    country,
  ]
    .filter(Boolean)
    .join(", ");

  return (
    <section
      id="location-contact"
      aria-labelledby="location-contact-heading"
      className="relative border-b border-white/[0.06] bg-[#050505] py-20 sm:py-24 lg:py-28"
    >
      <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
        {/* =====================================================
            HEADER
        ===================================================== */}

        <div className="grid gap-6 lg:grid-cols-[0.75fr_1.25fr] lg:items-end">
          <div>
            <div className="flex items-center gap-3">
              <span
                aria-hidden="true"
                className="flex h-9 w-9 items-center justify-center rounded-xl border border-[#FFC400]/20 bg-[#FFC400]/[0.05] text-[#FFC400]"
              >
                <MapPin size={15} />
              </span>

              <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#FFC400]">
                Find us
              </span>
            </div>

            <h2
              id="location-contact-heading"
              className="mt-6 text-3xl font-semibold leading-[1.05] tracking-[-0.04em] text-white sm:text-4xl lg:text-[3.1rem]"
            >
              Let&apos;s connect
              <br />
              <span className="text-neutral-500">
                from {city}.
              </span>
            </h2>
          </div>

          <p className="max-w-xl text-sm leading-7 text-neutral-500 lg:justify-self-end">
            Have a project in mind or want to discuss
            how we can help your business? Reach out
            using the details below or start a project
            directly.
          </p>
        </div>

        {/* =====================================================
            CONTENT GRID
        ===================================================== */}

        <div className="mt-14 grid gap-4 lg:grid-cols-[0.85fr_1.15fr]">
          {/* =================================================
              CONTACT DETAILS
          ================================================= */}

          <div className="rounded-[2rem] border border-white/[0.07] bg-[#090909] p-6 sm:p-8">
            <div className="flex items-center gap-3">
              <div
                aria-hidden="true"
                className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/[0.07] bg-white/[0.02] text-neutral-500"
              >
                <Navigation size={15} />
              </div>

              <div>
                <p className="text-[8px] font-semibold uppercase tracking-[0.18em] text-neutral-700">
                  Location
                </p>

                <p className="mt-1 text-sm font-semibold text-white">
                  {name}
                </p>
              </div>
            </div>

            {/* ADDRESS */}

            {fullLocation && (
              <div className="mt-8 border-t border-white/[0.06] pt-6">
                <div className="flex items-start gap-3">
                  <MapPin
                    aria-hidden="true"
                    size={15}
                    className="mt-0.5 shrink-0 text-[#FFC400]"
                  />

                  <div>
                    <p className="text-[8px] font-semibold uppercase tracking-[0.17em] text-neutral-700">
                      Address
                    </p>

                    <p className="mt-2 text-sm leading-6 text-neutral-500">
                      {fullLocation}
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* PHONE */}

            {phone && (
              <div className="mt-6 border-t border-white/[0.06] pt-6">
                <a
                  href={`tel:${phone}`}
                  aria-label={`Call Aman Digital Solutions at ${phone}`}
                  className="group flex items-center gap-3 rounded-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FFC400] focus-visible:ring-offset-2 focus-visible:ring-offset-[#090909]"
                >
                  <span
                    aria-hidden="true"
                    className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-white/[0.07] bg-white/[0.02] text-neutral-600 transition-colors group-hover:border-[#FFC400]/20 group-hover:text-[#FFC400]"
                  >
                    <Phone size={14} />
                  </span>

                  <div className="min-w-0">
                    <p className="text-[8px] font-semibold uppercase tracking-[0.17em] text-neutral-700">
                      Phone
                    </p>

                    <p className="mt-1 truncate text-sm text-white/70 transition-colors group-hover:text-white">
                      {phone}
                    </p>
                  </div>
                </a>
              </div>
            )}

            {/* EMAIL */}

            {email && (
              <div className="mt-6 border-t border-white/[0.06] pt-6">
                <a
                  href={`mailto:${email}`}
                  aria-label={`Email Aman Digital Solutions at ${email}`}
                  className="group flex items-center gap-3 rounded-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FFC400] focus-visible:ring-offset-2 focus-visible:ring-offset-[#090909]"
                >
                  <span
                    aria-hidden="true"
                    className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-white/[0.07] bg-white/[0.02] text-neutral-600 transition-colors group-hover:border-[#FFC400]/20 group-hover:text-[#FFC400]"
                  >
                    <Mail size={14} />
                  </span>

                  <div className="min-w-0">
                    <p className="text-[8px] font-semibold uppercase tracking-[0.17em] text-neutral-700">
                      Email
                    </p>

                    <p className="mt-1 truncate text-sm text-white/70 transition-colors group-hover:text-white">
                      {email}
                    </p>
                  </div>
                </a>
              </div>
            )}

            {/* MAP BUTTON */}

            {mapUrl && (
              <a
                href={mapUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Get directions to ${name}`}
                className="group mt-8 flex w-full items-center justify-between rounded-xl border border-white/[0.08] bg-white/[0.02] px-4 py-3.5 transition-all duration-300 hover:border-[#FFC400]/25 hover:bg-[#FFC400]/[0.04] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FFC400] focus-visible:ring-offset-2 focus-visible:ring-offset-[#090909]"
              >
                <span className="flex items-center gap-2">
                  <Navigation
                    aria-hidden="true"
                    size={14}
                    className="text-[#FFC400]"
                  />

                  <span className="text-[9px] font-semibold uppercase tracking-[0.17em] text-white/60">
                    Get directions
                  </span>
                </span>

                <ExternalLink
                  aria-hidden="true"
                  size={14}
                  className="text-neutral-700 transition-colors group-hover:text-[#FFC400]"
                />
              </a>
            )}
          </div>

          {/* =================================================
              LOCATION VISUAL
          ================================================= */}

          <div className="relative min-h-[380px] overflow-hidden rounded-[2rem] border border-white/[0.07] bg-[#090909]">
            {/* GRID */}

            <div
              aria-hidden="true"
              className="absolute inset-0 opacity-50"
              style={{
                backgroundImage:
                  "linear-gradient(rgba(255,255,255,0.035) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.035) 1px, transparent 1px)",
                backgroundSize:
                  "42px 42px",
              }}
            />

            {/* RADIAL GLOW */}

            <div
              aria-hidden="true"
              className="absolute left-1/2 top-1/2 h-56 w-56 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#FFC400]/[0.035] blur-3xl"
            />

            {/* COORDINATE LABEL */}

            {(latitude !== undefined ||
              longitude !== undefined) && (
              <div className="absolute right-5 top-5 rounded-xl border border-white/[0.07] bg-black/40 px-3 py-2 backdrop-blur-md">
                <p className="text-[8px] font-medium uppercase tracking-[0.14em] text-neutral-700">
                  Coordinates
                </p>

                <p className="mt-1 text-[9px] tabular-nums text-neutral-500">
                  {latitude !== undefined
                    ? latitude.toFixed(4)
                    : "—"}
                  {" · "}
                  {longitude !== undefined
                    ? longitude.toFixed(4)
                    : "—"}
                </p>
              </div>
            )}

            {/* MAP MARKER */}

            <div className="absolute inset-0 flex items-center justify-center">
              <div className="relative">
                <span
                  aria-hidden="true"
                  className="absolute left-1/2 top-1/2 h-28 w-28 -translate-x-1/2 -translate-y-1/2 animate-pulse rounded-full border border-[#FFC400]/10"
                />

                <span
                  aria-hidden="true"
                  className="absolute left-1/2 top-1/2 h-20 w-20 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#FFC400]/[0.05] blur-xl"
                />

                <div
                  aria-hidden="true"
                  className="relative flex h-16 w-16 items-center justify-center rounded-2xl border border-[#FFC400]/25 bg-[#0D0D0D] text-[#FFC400] shadow-[0_0_45px_rgba(255,196,0,0.08)]"
                >
                  <MapPin size={24} />
                </div>
              </div>
            </div>

            {/* MAP LABEL */}

            <div className="absolute bottom-5 left-5 right-5 flex flex-col gap-4 rounded-2xl border border-white/[0.07] bg-black/45 p-4 backdrop-blur-md sm:flex-row sm:items-center sm:justify-between">
              <div className="min-w-0">
                <p className="text-[8px] font-semibold uppercase tracking-[0.18em] text-[#FFC400]">
                  Our location
                </p>

                <p className="mt-1 truncate text-xs font-medium text-white/70">
                  {city}
                  {state ? `, ${state}` : ""}
                  {country
                    ? ` · ${country}`
                    : ""}
                </p>
              </div>

              {mapUrl && (
                <a
                  href={mapUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Open map for ${name}`}
                  className="inline-flex shrink-0 items-center justify-center gap-2 rounded-lg border border-white/[0.08] bg-white/[0.03] px-3 py-2 text-[9px] font-semibold uppercase tracking-[0.14em] text-white/60 transition-colors hover:border-[#FFC400]/25 hover:text-[#FFC400] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FFC400] focus-visible:ring-offset-2 focus-visible:ring-offset-black"
                >
                  Open map

                  <ArrowUpRight
                    aria-hidden="true"
                    size={12}
                  />
                </a>
              )}
            </div>
          </div>
        </div>

        {/* =====================================================
            RESPONSE NOTE
        ===================================================== */}

        <div className="mt-5 flex flex-col gap-4 rounded-2xl border border-white/[0.06] bg-[#080808] p-5 sm:flex-row sm:items-center sm:justify-between sm:p-6">
          <div className="flex items-center gap-3">
            <div
              aria-hidden="true"
              className="flex h-9 w-9 items-center justify-center rounded-xl border border-white/[0.07] bg-white/[0.02] text-neutral-600"
            >
              <Clock3 size={14} />
            </div>

            <div>
              <p className="text-xs font-medium text-white/70">
                Ready to discuss your project?
              </p>

              <p className="mt-1 text-[10px] leading-5 text-neutral-700">
                Tell us what you&apos;re building and
                we&apos;ll take it from there.
              </p>
            </div>
          </div>

          <Link
            href="/start-a-project"
            aria-label={`Start a project with Aman Digital Solutions for ${name}`}
            className="group inline-flex items-center gap-2 rounded-lg text-[9px] font-semibold uppercase tracking-[0.17em] text-neutral-600 transition-colors hover:text-[#FFC400] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FFC400] focus-visible:ring-offset-2 focus-visible:ring-offset-[#080808]"
          >
            Start a project

            <ArrowUpRight
              aria-hidden="true"
              size={13}
              className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            />
          </Link>
        </div>
      </div>
    </section>
  );
}