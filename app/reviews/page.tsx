import type { Metadata } from "next";

import { connectDB } from "@/lib/db/connect";
import Testimonial from "@/models/Testimonial";

import Navbar from "@/components/agency/navbar/Navbar";
import Footer from "@/components/agency/footer/Footer";

import ReviewsHero from "@/components/reviews/ReviewsHero";
import FeaturedReview from "@/components/reviews/FeaturedReview";
import ReviewsList from "@/components/reviews/ReviewsList";
import ReviewsProof from "@/components/reviews/ReviewsProof";
import ReviewsCTA from "@/components/reviews/ReviewsCTA";

export const revalidate = 3600;

const SITE_URL = "https://www.amandigitalsolutions.com";

export const metadata: Metadata = {
  title: "Client Reviews | Aman Digital Solutions",
  description:
    "Read genuine client reviews about website development, digital solutions, website performance and ongoing support from Aman Digital Solutions.",
  alternates: {
    canonical: `${SITE_URL}/reviews`,
  },
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: "Client Reviews | Aman Digital Solutions",
    description:
      "Read genuine client reviews about working with Aman Digital Solutions across website development, digital solutions and ongoing website support.",
    url: `${SITE_URL}/reviews`,
    siteName: "Aman Digital Solutions",
    type: "website",
    locale: "en_IN",
    images: [
      {
        url: `${SITE_URL}/og-image.png`,
        width: 1200,
        height: 630,
        alt: "Client reviews — Aman Digital Solutions",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Client Reviews | Aman Digital Solutions",
    description:
      "Genuine feedback from businesses that have worked with Aman Digital Solutions.",
    images: [`${SITE_URL}/og-image.png`],
  },
};

async function getReviews() {
  await connectDB();

  const reviews = await Testimonial.find({
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
          publicId: review.image.publicId ?? null,
          alt: review.image.alt ?? review.name,
        }
      : null,

    rating: review.rating ?? 5,
    project: review.project ?? null,
    featured: Boolean(review.featured),
    published: Boolean(review.published),
    displayOrder: review.displayOrder ?? 0,
  }));
}

export default async function ReviewsPage() {
  const reviews = await getReviews();

  const featuredReview =
    reviews.find((review) => review.featured) ?? reviews[0] ?? null;

  const remainingReviews = featuredReview
    ? reviews.filter((review) => review.id !== featuredReview.id)
    : reviews;

  const faqs = [
    {
      question: "Are these genuine client reviews?",
      answer:
        "Yes. The reviews shown on this page are genuine feedback from clients and business owners who have worked with Aman Digital Solutions.",
    },
    {
      question: "What kind of projects do your clients hire you for?",
      answer:
        "Projects include business websites, e-commerce websites, custom web applications, digital solutions and ongoing website support.",
    },
    {
      question: "Do you work with businesses outside Shimla?",
      answer:
        "Yes. Aman Digital Solutions is based in Shimla, Himachal Pradesh, and works with businesses across India as well as remote international clients.",
    },
    {
      question: "Can you maintain a website after it launches?",
      answer:
        "Yes. Website maintenance and ongoing technical support are available for businesses that need continued updates, improvements and technical assistance after launch.",
    },
    {
      question: "How can I start a project with Aman Digital Solutions?",
      answer:
        "You can start by submitting the project enquiry form. Share what you are trying to build, improve or grow, and we can discuss the right approach for your business.",
    },
    {
      question: "Can I see more of your previous work?",
      answer:
        "Yes. Visit the projects and gallery sections to explore selected websites, digital products, e-commerce experiences and other web work.",
    },
  ];

  const pageSchema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": `${SITE_URL}/reviews#webpage`,
        url: `${SITE_URL}/reviews`,
        name: "Client Reviews | Aman Digital Solutions",
        description:
          "Genuine client feedback about website development, digital solutions and ongoing support from Aman Digital Solutions.",
        isPartOf: {
          "@id": `${SITE_URL}/#website`,
        },
      },

      {
        "@type": "BreadcrumbList",
        "@id": `${SITE_URL}/reviews#breadcrumb`,
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "Home",
            item: SITE_URL,
          },
          {
            "@type": "ListItem",
            position: 2,
            name: "Reviews",
            item: `${SITE_URL}/reviews`,
          },
        ],
      },

      {
        "@type": "FAQPage",
        "@id": `${SITE_URL}/reviews#faq`,
        mainEntity: faqs.map((faq) => ({
          "@type": "Question",
          name: faq.question,
          acceptedAnswer: {
            "@type": "Answer",
            text: faq.answer,
          },
        })),
      },
    ],
  };

  return (
    <>
      <Navbar />

      <main className="min-h-screen overflow-x-clip bg-[#050505] text-white">
        <ReviewsHero />

        {featuredReview ? (
          <FeaturedReview review={featuredReview} />
        ) : null}

        <ReviewsList reviews={remainingReviews} />

        <ReviewsProof />

        <ReviewsCTA />
      </main>

      <Footer />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(pageSchema),
        }}
      />
    </>
  );
}