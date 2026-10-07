import ReviewCard from "@/components/agency/reviews/ReviewCard";
import type { ReviewPageItem } from "./FeaturedReview";

type Props = {
  reviews: ReviewPageItem[];
};

export default function ReviewsList({ reviews }: Props) {
  const normalizedReviews = reviews.map((review) => ({
    ...review,
    image: review.image
      ? {
          ...review.image,
          alt: review.image.alt ?? "",
        }
      : null,
  }));

  return (
    <section
      id="all-reviews"
      aria-labelledby="all-reviews-heading"
      className="border-t border-white/[0.06] bg-[#050505] py-20 sm:py-24 lg:py-28"
    >
      <div className="mx-auto w-full max-w-7xl px-5 sm:px-8 lg:px-10">
        <div className="grid gap-12 lg:grid-cols-[0.35fr_0.65fr] lg:gap-20">
          <div className="lg:sticky lg:top-28 lg:h-fit">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#FFD400]">
              More feedback
            </p>

            <h2
              id="all-reviews-heading"
              className="mt-3 max-w-md text-3xl font-semibold tracking-[-0.035em] text-white sm:text-4xl"
            >
              Real experiences. No marketing script.
            </h2>

            <p className="mt-5 max-w-md text-sm leading-7 text-white/45 sm:text-base">
              Every review below comes from a real client experience and
              reflects the way we work — from communication and development to
              performance and ongoing support.
            </p>

            <div className="mt-8 flex flex-wrap gap-2">
              <span className="rounded-full border border-white/10 bg-white/[0.025] px-3 py-1.5 text-xs text-white/45">
                Website Development
              </span>

              <span className="rounded-full border border-white/10 bg-white/[0.025] px-3 py-1.5 text-xs text-white/45">
                Digital Solutions
              </span>

              <span className="rounded-full border border-white/10 bg-white/[0.025] px-3 py-1.5 text-xs text-white/45">
                Ongoing Support
              </span>
            </div>
          </div>

          <div className="min-w-0">
            {normalizedReviews.length > 0 ? (
              <div className="space-y-5 sm:space-y-6">
                {normalizedReviews.map((review, index) => (
                  <ReviewCard
                    key={review.id}
                    review={review}
                    index={index}
                  />
                ))}
              </div>
            ) : (
              <div className="rounded-3xl border border-white/10 bg-white/[0.02] p-8 text-center">
                <p className="text-sm text-white/40">
                  More client feedback will appear here as reviews are
                  published.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}