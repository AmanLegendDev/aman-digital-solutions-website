import { connectDB } from "@/lib/db/connect";
import Testimonial from "@/models/Testimonial";

import TestimonialsIntro from "./TestimonialsIntro";
import TestimonialCard from "./TestimonialCard";

async function getTestimonials() {
  await connectDB();

  const testimonials = await Testimonial.find({
    published: true,
  })
    .sort({
      featured: -1,
      displayOrder: 1,
      createdAt: -1,
    })
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
      ].join(" ")
    )
    .lean();

  return testimonials.map((testimonial) => ({
    id: testimonial._id.toString(),
    name: testimonial.name,
    slug: testimonial.slug,
    role: testimonial.role ?? null,
    company: testimonial.company ?? null,
    location: testimonial.location ?? null,
    quote: testimonial.quote,
    image: testimonial.image
      ? {
          url: testimonial.image.url,
          publicId: testimonial.image.publicId ?? null,
          alt: testimonial.image.alt ?? testimonial.name,
        }
      : null,
    rating: testimonial.rating ?? null,
    project: testimonial.project ?? null,
    featured: testimonial.featured,
  }));
}

export default async function TestimonialsSection() {
  const testimonials = await getTestimonials();

  if (testimonials.length === 0) {
    return null;
  }

  const featuredTestimonial =
    testimonials.find((testimonial) => testimonial.featured) ??
    testimonials[0];

  const supportingTestimonials = testimonials.filter(
    (testimonial) => testimonial.id !== featuredTestimonial.id
  );

  return (
    <section
      id="testimonials"
      aria-labelledby="testimonials-heading"
      className="relative w-full max-w-full overflow-x-clip scroll-mt-28 border-t border-[#1A1A1A] bg-[#050505] py-24 sm:py-28 lg:py-32"
    >
      {/* Ambient glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-48 top-1/3 h-[480px] w-[480px] rounded-full bg-[#FFC400]/[0.025] blur-[150px]"
      />

      <div className="relative mx-auto w-full max-w-7xl min-w-0 px-5 sm:px-8 lg:px-10">
        <div className="grid w-full min-w-0 grid-cols-1 gap-14 lg:grid-cols-[0.7fr_1.3fr] lg:gap-20">
          {/* INTRO */}
          <div className="min-w-0 lg:sticky lg:top-32 lg:self-start">
            <TestimonialsIntro />
          </div>

          {/* TESTIMONIALS */}
          <div className="w-full min-w-0 max-w-full space-y-5">
            <TestimonialCard
              testimonial={featuredTestimonial}
              featured
            />

            {supportingTestimonials.slice(0, 3).map(
              (testimonial) => (
                <TestimonialCard
                  key={testimonial.id}
                  testimonial={testimonial}
                />
              )
            )}
          </div>
        </div>
      </div>
    </section>
  );
}