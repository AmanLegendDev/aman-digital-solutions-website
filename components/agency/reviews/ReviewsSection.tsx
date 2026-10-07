import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

import { connectDB } from "@/lib/db/connect";
import Testimonial from "@/models/Testimonial";

import ReviewsIntro from "./ReviewsIntro";
import ReviewCard from "./ReviewCard";

/* =========================================================
   REVIEW DATA
========================================================= */

async function getReviews() {
  await connectDB();

  const reviews = await Testimonial.find({
    published: true,
    featured: true,
  })
    .sort({
      displayOrder: 1,
      createdAt: -1,
    })
    .limit(6)
    .select(
      [
        "name",
        "slug",
        "role",
        "company",
        "location",
        "quote",
        "image",
        "rating",
        "project",
        "featured",
        "published",
        "displayOrder",
      ].join(" ")
    )
    .lean();

  return reviews.map((review) => ({
    id: review._id.toString(),

    name: review.name,
    slug: review.slug,

    role: review.role ?? null,
    company: review.company ?? null,
    location: review.location ?? null,

    quote: review.quote,

    image: review.image
      ? {
          url: review.image.url,
          publicId:
            review.image.publicId ?? null,
          alt:
            review.image.alt ??
            review.name,
        }
      : null,

    rating: review.rating ?? 5,

    project: review.project ?? null,

    featured: review.featured,
    published: review.published,

    displayOrder:
      review.displayOrder ?? 0,
  }));
}

/* =========================================================
   SECTION
========================================================= */

export default async function ReviewsSection() {
  const reviews = await getReviews();

  if (reviews.length === 0) {
    return null;
  }

  return (
    <section
      id="reviews"
      aria-labelledby="reviews-heading"
      className="relative w-full max-w-full scroll-mt-28 overflow-x-clip border-t border-[#1A1A1A] bg-[#080808] py-24 sm:py-28 lg:py-32"
    >
      {/* =====================================================
          AMBIENT VISUAL
      ===================================================== */}

      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-40 top-1/3 h-[420px] w-[420px] rounded-full bg-[#FFC400]/[0.025] blur-[140px]"
      />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-40 bottom-0 h-[360px] w-[360px] rounded-full bg-[#FFC400]/[0.018] blur-[130px]"
      />

      {/* =====================================================
          CONTAINER
      ===================================================== */}

      <div className="relative mx-auto w-full max-w-7xl min-w-0 px-5 sm:px-8 lg:px-10">
        <div className="grid min-w-0 gap-14 lg:grid-cols-[0.72fr_1.28fr] lg:items-start lg:gap-20">
          {/* =================================================
              LEFT — INTRO
          ================================================= */}

          <aside className="min-w-0 lg:sticky lg:top-32 lg:h-fit lg:self-start">
            <ReviewsIntro />
          </aside>

          {/* =================================================
              RIGHT — REVIEWS
          ================================================= */}

          <div className="min-w-0">
            <div
              className="min-w-0"
              aria-label="Google reviews"
            >
              <div className="space-y-5 sm:space-y-6">
                {reviews.map((review, index) => (
                  <ReviewCard
                    key={review.id}
                    review={review}
                    index={index}
                  />
                ))}
              </div>
            </div>

            {/* =================================================
                VIEW ALL
            ================================================= */}

            <div className="flex justify-start pt-8 sm:justify-end">
              <Link
                href="/reviews"
                className="group inline-flex min-h-11 items-center gap-2 rounded-full border border-[#2A2A2A] bg-[#0A0A0A] px-5 py-3 text-xs font-medium tracking-wide text-[#CFCFCF] transition-all duration-300 hover:border-[#FFC400]/40 hover:bg-[#FFC400]/[0.06] hover:text-[#FFC400] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FFC400]/70"
              >
                View all reviews

                <ArrowUpRight
                  aria-hidden="true"
                  size={14}
                  className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}