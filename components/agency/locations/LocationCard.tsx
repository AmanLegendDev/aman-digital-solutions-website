"use client";

import Image from "next/image";
import Link from "next/link";
import {
  ArrowUpRight,
  MapPin,
} from "lucide-react";
import { motion } from "framer-motion";

type LocationData = {
  id: string;
  name: string;
  slug: string;
  shortDescription: string;
  image: {
    url: string;
    publicId: string | null;
    alt: string;
  } | null;
  city: string;
  state: string | null;
  country: string;
  services: string[];
  featured: boolean;
};

type LocationCardProps = {
  location: LocationData;
  index: number;
};

export default function LocationCard({
  location,
  index,
}: LocationCardProps) {
  const locationHref = `/locations/${location.slug}`;

  return (
    <motion.article
      initial={{
        opacity: 0,
        y: 22,
      }}
      whileInView={{
        opacity: 1,
        y: 0,
      }}
      viewport={{
        once: true,
        amount: 0.15,
      }}
      transition={{
        duration: 0.5,
        delay: Math.min(index * 0.07, 0.2),
        ease: [0.22, 1, 0.36, 1],
      }}
      className="group relative min-w-0 w-full overflow-hidden rounded-[24px] border border-[#202020] bg-[#0A0A0A] transition-colors duration-300 hover:border-[#303030]"
    >
      {/* IMAGE */}
      <Link
        href={locationHref}
        aria-label={`View ${location.name} location`}
        className="block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[#FFC400]"
      >
        <div className="relative aspect-[16/10] overflow-hidden bg-[#0E0E0E]">
          {location.image ? (
            <Image
              src={location.image.url}
              alt={location.image.alt || location.name}
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 40vw"
              loading="lazy"
              className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.035]"
            />
          ) : (
            <div
              aria-hidden="true"
              className="flex h-full w-full items-center justify-center"
            >
              <MapPin
                aria-hidden="true"
                size={30}
                strokeWidth={1.2}
                className="text-[#303030]"
              />
            </div>
          )}

          {/* IMAGE OVERLAY */}
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent"
          />

          {/* FEATURED */}
          {location.featured && (
            <span className="absolute left-4 top-4 inline-flex items-center gap-1.5 rounded-full border border-[#FFC400]/25 bg-black/55 px-3 py-1.5 text-[9px] font-medium uppercase tracking-[0.16em] text-[#FFC400] backdrop-blur-md">
              <span
                aria-hidden="true"
                className="h-1.5 w-1.5 rounded-full bg-[#FFC400]"
              />
              Featured
            </span>
          )}

          {/* LOCATION OVER IMAGE */}
          <div className="absolute bottom-4 left-4 flex min-w-0 items-center gap-2">
            <span
              aria-hidden="true"
              className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-white/15 bg-black/45 text-[#FFC400] backdrop-blur-md"
            >
              <MapPin
                aria-hidden="true"
                size={14}
              />
            </span>

            <div className="min-w-0">
              <p className="truncate text-sm font-semibold text-white">
                {location.city}
              </p>

              <p className="truncate text-[10px] text-white/55">
                {location.state
                  ? `${location.state}, ${location.country}`
                  : location.country}
              </p>
            </div>
          </div>

          {/* ARROW */}
          <span
            aria-hidden="true"
            className="absolute bottom-4 right-4 flex h-9 w-9 items-center justify-center rounded-full border border-white/15 bg-black/45 text-white opacity-0 backdrop-blur-md transition-all duration-300 group-hover:opacity-100"
          >
            <ArrowUpRight
              aria-hidden="true"
              size={15}
            />
          </span>
        </div>
      </Link>

      {/* CONTENT */}
      <div className="min-w-0 p-5 sm:p-6">
        {/* NAME */}
        <div className="flex min-w-0 items-start justify-between gap-4">
          <div className="min-w-0">
            <p className="text-[9px] font-medium uppercase tracking-[0.16em] text-[#4F4F4F]">
              Service location
            </p>

            <Link
              href={locationHref}
              className="group/title mt-2 block rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FFC400]"
            >
              <h3 className="truncate text-xl font-semibold tracking-[-0.025em] text-[#E8E8E8] transition-colors duration-200 group-hover/title:text-[#FFC400]">
                {location.name}
              </h3>
            </Link>
          </div>

          <span
            aria-hidden="true"
            className="shrink-0 text-[10px] uppercase tracking-[0.12em] text-[#444]"
          >
            {location.country}
          </span>
        </div>

        {/* DESCRIPTION */}
        <p className="mt-3 min-w-0 break-words text-sm leading-6 text-[#777]">
          {location.shortDescription}
        </p>

        {/* SERVICES */}
        {location.services.length > 0 && (
          <div className="mt-5 flex min-w-0 flex-wrap gap-2">
            {location.services.slice(0, 3).map((service) => (
              <span
                key={service}
                className="max-w-full truncate rounded-full border border-[#222] bg-[#0D0D0D] px-2.5 py-1 text-[9px] text-[#666]"
              >
                {service}
              </span>
            ))}
          </div>
        )}

        {/* FOOTER */}
        <div className="mt-6 flex items-center justify-between border-t border-[#1D1D1D] pt-4">
          <span
            aria-hidden="true"
            className="text-[9px] font-medium uppercase tracking-[0.16em] text-[#444]"
          >
            Explore location
          </span>

          <Link
            href={locationHref}
            className="group/cta inline-flex items-center gap-2 rounded-sm text-xs font-medium text-[#A8A8A8] transition-colors duration-200 hover:text-[#FFC400] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FFC400]"
          >
            View details

            <ArrowUpRight
              aria-hidden="true"
              size={14}
              className="transition-transform duration-200 group-hover/cta:-translate-y-0.5 group-hover/cta:translate-x-0.5"
            />
          </Link>
        </div>
      </div>
    </motion.article>
  );
}