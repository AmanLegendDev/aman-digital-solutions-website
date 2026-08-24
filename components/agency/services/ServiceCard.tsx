"use client";

import Link from "next/link";
import {
  ArrowUpRight,
  Check,
  Sparkles,
} from "lucide-react";
import { motion } from "framer-motion";

type ServiceCardData = {
  id: string;
  title: string;
  slug: string;
  shortDescription: string;
  description: string;
  icon: string | null;
  image: {
    url: string;
    publicId: string | null;
    alt: string;
  } | null;
  startingPrice: number | null;
  priceLabel: string | null;
  ctaLabel: string;
  ctaLink: string;
  featured: boolean;
};

type ServiceCardProps = {
  service: ServiceCardData;
  index: number;
};

export default function ServiceCard({
  service,
  index,
}: ServiceCardProps) {
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
        delay: Math.min(index * 0.06, 0.24),
        ease: [0.22, 1, 0.36, 1],
      }}
      className={[
        "group relative overflow-hidden border-b border-[#202020]",
        service.featured ? "bg-[#0A0A0A]" : "",
      ].join(" ")}
    >
      {/* FEATURED ACCENT */}
      {service.featured && (
        <div
          aria-hidden="true"
          className="absolute left-0 top-0 h-full w-px bg-gradient-to-b from-[#FFC400] via-[#FFC400]/30 to-transparent"
        />
      )}

      <div className="relative py-7 pl-1 sm:py-8 sm:pl-2 lg:py-9">
        <div className="grid gap-6 sm:grid-cols-[auto_1fr_auto] sm:items-start sm:gap-7">
          {/* NUMBER */}
          <div className="flex items-center gap-3 sm:block">
            <span className="text-[10px] font-medium tabular-nums tracking-[0.14em] text-[#555] transition-colors duration-200 group-hover:text-[#FFC400]">
              {String(index + 1).padStart(2, "0")}
            </span>

            {service.featured && (
              <span className="inline-flex items-center gap-1.5 rounded-full border border-[#FFC400]/20 bg-[#FFC400]/[0.06] px-2.5 py-1 text-[9px] font-medium uppercase tracking-[0.14em] text-[#FFC400] sm:mt-4 sm:flex">
                <Sparkles size={10} />
                Featured
              </span>
            )}
          </div>

          {/* CONTENT */}
          <div className="min-w-0">
            <div className="flex items-start gap-3">
              {/* OPTIONAL ICON */}
              {service.icon && (
                <div className="mt-0.5 hidden h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-[#252525] bg-[#101010] text-[#FFC400] sm:flex">
                  <span className="text-xs font-semibold">
                    {service.icon.slice(0, 1).toUpperCase()}
                  </span>
                </div>
              )}

              <div>
                <Link
                  href={`/services/${service.slug}`}
                  className="group/title inline-flex items-center gap-2 text-xl font-semibold tracking-tight text-[#EAEAEA] transition-colors duration-200 hover:text-white sm:text-2xl"
                >
                  {service.title}

                  <ArrowUpRight
                    size={17}
                    className="translate-y-0.5 text-[#444] opacity-0 transition-all duration-200 group-hover/title:-translate-y-0.5 group-hover/title:translate-x-0.5 group-hover/title:text-[#FFC400] group-hover/title:opacity-100"
                  />
                </Link>

                <p className="mt-2 max-w-xl text-sm leading-6 text-[#777]">
                  {service.shortDescription}
                </p>
              </div>
            </div>

            {/* IMAGE */}
            {service.image && (
              <div className="mt-5 overflow-hidden rounded-2xl border border-[#202020] bg-[#0D0D0D]">
                <div className="relative aspect-[16/7] overflow-hidden">
                  <img
                    src={service.image.url}
                    alt={service.image.alt}
                    loading="lazy"
                    className="h-full w-full object-cover transition duration-700 ease-out group-hover:scale-[1.025]"
                  />

                  <div
                    aria-hidden="true"
                    className="absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-transparent opacity-70"
                  />
                </div>
              </div>
            )}

            {/* BENEFIT / POSITIONING LINE */}
            <div className="mt-5 flex flex-wrap gap-x-4 gap-y-2">
              <span className="inline-flex items-center gap-1.5 text-[10px] uppercase tracking-[0.12em] text-[#555]">
                <Check
                  size={12}
                  className="text-[#FFC400]"
                />
                Business focused
              </span>

              <span className="inline-flex items-center gap-1.5 text-[10px] uppercase tracking-[0.12em] text-[#555]">
                <Check
                  size={12}
                  className="text-[#FFC400]"
                />
                Performance first
              </span>
            </div>
          </div>

          {/* PRICE + CTA */}
          <div className="flex items-center justify-between gap-4 sm:min-w-[145px] sm:flex-col sm:items-end sm:justify-between sm:self-stretch">
            {service.startingPrice !== null && (
              <div className="text-right">
                <p className="text-[9px] uppercase tracking-[0.14em] text-[#555]">
                  {service.priceLabel || "Starting from"}
                </p>

                <p className="mt-1 text-sm font-semibold text-[#D8D8D8]">
                  ₹{service.startingPrice.toLocaleString("en-IN")}
                </p>
              </div>
            )}

            <Link
              href={service.ctaLink}
              className="group/cta inline-flex items-center gap-2 rounded-full border border-[#292929] bg-[#0D0D0D] px-3.5 py-2 text-[11px] font-medium text-[#BDBDBD] transition-all duration-200 hover:border-[#FFC400]/35 hover:bg-[#FFC400]/[0.06] hover:text-[#FFC400] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FFC400]"
            >
              {service.ctaLabel}

              <ArrowUpRight
                size={13}
                className="transition-transform duration-200 group-hover/cta:-translate-y-0.5 group-hover/cta:translate-x-0.5"
              />
            </Link>
          </div>
        </div>
      </div>
    </motion.article>
  );
}