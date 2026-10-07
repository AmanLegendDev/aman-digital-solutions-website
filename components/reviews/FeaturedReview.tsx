import Image from "next/image";
import { MapPin, Quote, Star } from "lucide-react";

export type ReviewPageItem = {
  id: string;
  name: string;
  slug: string;
  role: string | null;
  company: string | null;
  location: string | null;
  quote: string;
  image: {
  url: string;
  publicId: string | null;
  alt: string | null;
} | null;
  rating: number;
  project: string | null;
  featured: boolean;
  published: boolean;
  displayOrder: number;
};

type Props = {
  review: ReviewPageItem;
};

function getInitials(name: string) {
  return name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join("");
}

export default function FeaturedReview({ review }: Props) {
  const rating = Math.min(Math.max(review.rating || 5, 1), 5);

  return (
    <section
      aria-labelledby="featured-review-heading"
      className="relative overflow-hidden border-t border-white/[0.06] bg-[#050505] py-20 sm:py-24 lg:py-28"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute right-[-200px] top-1/2 h-[500px] w-[500px] -translate-y-1/2 rounded-full bg-[#FFD400]/[0.025] blur-[140px]"
      />

      <div className="relative mx-auto w-full max-w-7xl px-5 sm:px-8 lg:px-10">
        <div className="mb-10">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#FFD400]">
            Featured review
          </p>

          <h2
            id="featured-review-heading"
            className="mt-3 text-2xl font-semibold tracking-[-0.035em] text-white sm:text-3xl"
          >
            A closer look at the experience.
          </h2>
        </div>

        <article className="relative overflow-hidden rounded-[28px] border border-white/10 bg-[#0A0A0A]">
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#FFD400]/70 to-transparent" />

          <div className="grid lg:grid-cols-[0.34fr_0.66fr]">
            {/* Client */}
            <div className="relative border-b border-white/[0.07] p-7 sm:p-9 lg:border-b-0 lg:border-r lg:p-12">
              <div
                aria-hidden="true"
                className="absolute right-8 top-8 text-white/[0.035]"
              >
                <Quote size={90} strokeWidth={1} />
              </div>

              <div className="relative">
                <div className="mb-8 flex items-center gap-1.5">
                  {Array.from({ length: 5 }).map((_, index) => (
                    <Star
                      key={index}
                      size={15}
                      className={
                        index < rating
                          ? "fill-[#FFD400] text-[#FFD400]"
                          : "text-white/10"
                      }
                    />
                  ))}
                </div>

                <div className="mb-8 inline-flex items-center rounded-full border border-[#FFD400]/20 bg-[#FFD400]/[0.04] px-3 py-1.5 text-[11px] font-medium text-[#FFD400]">
                  Google Review
                </div>

                <div className="flex items-center gap-4">
                  {review.image?.url ? (
                    <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-full border border-white/10 bg-white/[0.04]">
                      <Image
                        src={review.image.url}
                        alt={review.image.alt || review.name}
                        fill
                        sizes="56px"
                        className="object-cover"
                      />
                    </div>
                  ) : (
                    <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full border border-white/10 bg-white/[0.05] text-sm font-semibold text-white">
                      {getInitials(review.name)}
                    </div>
                  )}

                  <div className="min-w-0">
                    <p className="truncate text-base font-semibold text-white">
                      {review.name}
                    </p>

                    {(review.role || review.company) && (
                      <p className="mt-1 text-sm text-white/45">
                        {[review.role, review.company]
                          .filter(Boolean)
                          .join(" · ")}
                      </p>
                    )}

                    {review.location && (
                      <div className="mt-1.5 flex items-center gap-1.5 text-xs text-white/30">
                        <MapPin size={12} />
                        <span>{review.location}</span>
                      </div>
                    )}
                  </div>
                </div>

                {review.project && (
                  <div className="mt-10 border-t border-white/[0.07] pt-6">
                    <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-white/25">
                      Related project
                    </p>

                    <p className="mt-2 text-sm font-medium text-white/75">
                      {review.project}
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* Quote */}
            <div className="flex items-center p-7 sm:p-10 lg:p-14">
              <div>
                <p className="mb-6 text-xs font-semibold uppercase tracking-[0.18em] text-[#FFD400]">
                  In their words
                </p>

                <blockquote className="text-2xl font-medium leading-[1.5] tracking-[-0.025em] text-white sm:text-3xl lg:text-[2.1rem]">
                  “{review.quote}”
                </blockquote>

                <div className="mt-10 h-px w-16 bg-[#FFD400]" />
              </div>
            </div>
          </div>
        </article>
      </div>
    </section>
  );
}