import mongoose from "mongoose";

import {connectDB} from "@/lib/db/connect";

import Service from "@/models/Service";
import Project from "@/models/Project";
import FAQ from "@/models/FAQ";
import Testimonial from "@/models/Testimonial";
import Offer from "@/models/Offer";
import SiteSettings from "@/models/SiteSettings";

export type AMIRetrievedData = {
  services: Array<Record<string, unknown>>;
  projects: Array<Record<string, unknown>>;
  pricing: Array<Record<string, unknown>>;
  faqs: Array<Record<string, unknown>>;
  reviews: Array<Record<string, unknown>>;
  offers: Array<Record<string, unknown>>;
  site: Record<string, unknown> | null;
};

const EMPTY_DATA: AMIRetrievedData = {
  services: [],
  projects: [],
  pricing: [],
  faqs: [],
  reviews: [],
  offers: [],
  site: null,
};

type RetrievalIntent =
  | "GREETING"
  | "SERVICE_DISCOVERY"
  | "SERVICE_DETAILS"
  | "PRICING"
  | "PROJECT_DISCOVERY"
  | "PROJECT_DETAILS"
  | "FAQ"
  | "OFFER"
  | "START_PROJECT"
  | "CONTACT"
  | "ABOUT"
  | "GENERAL"
  | "UNKNOWN";

function cleanText(value: unknown, max = 1200): string {
  if (typeof value !== "string") return "";

  return value
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, max);
}

function cleanArray(
  value: unknown,
  maxItems = 8,
  maxLength = 300
): string[] {
  if (!Array.isArray(value)) return [];

  return value
    .filter((item): item is string => typeof item === "string")
    .map((item) => cleanText(item, maxLength))
    .filter(Boolean)
    .slice(0, maxItems);
}

function serializeService(service: any) {
  return {
    id: service._id?.toString(),
    title: cleanText(service.title, 150),
    slug: cleanText(service.slug, 150),
    shortDescription: cleanText(service.shortDescription, 400),
    description: cleanText(service.description, 1000),
    category: cleanText(service.category, 100),
    startingPrice:
      typeof service.startingPrice === "number"
        ? service.startingPrice
        : null,
    priceLabel: cleanText(service.priceLabel, 100),
    benefits: cleanArray(service.benefits),
    features: cleanArray(service.features),
    process: cleanArray(service.process),
    ctaLabel: cleanText(service.ctaLabel, 100),
    ctaLink: cleanText(service.ctaLink, 250),
    published: Boolean(service.published),
  };
}

function serializeProject(project: any) {
  return {
    id: project._id?.toString(),
    title: cleanText(project.title, 150),
    slug: cleanText(project.slug, 150),
    client: cleanText(project.client, 150),
    category: cleanText(
      project.category || project.industry,
      120
    ),
    shortDescription: cleanText(
      project.shortDescription,
      400
    ),
    description: cleanText(
      project.description || project.overview,
      800
    ),
    liveUrl: cleanText(
      project.liveUrl || project.websiteUrl,
      300
    ),
    location: cleanText(project.location, 150),
    published: Boolean(project.published),
  };
}

function serializeFAQ(faq: any) {
  return {
    id: faq._id?.toString(),
    question: cleanText(faq.question, 300),
    answer: cleanText(faq.answer, 1000),
    category: cleanText(faq.category, 100),
    published: Boolean(faq.published),
  };
}

function serializeReview(review: any) {
  return {
    id: review._id?.toString(),
    name: cleanText(
      review.name || review.authorName || review.clientName,
      120
    ),
    role: cleanText(
      review.role || review.position,
      120
    ),
    company: cleanText(
      review.company || review.companyName,
      150
    ),
    content: cleanText(
      review.content ||
        review.quote ||
        review.review ||
        review.text,
      1200
    ),
    rating:
      typeof review.rating === "number"
        ? review.rating
        : null,
    location: cleanText(review.location, 150),
    published: Boolean(review.published),
  };
}

function serializeOffer(offer: any) {
  return {
    id: offer._id?.toString(),
    title: cleanText(offer.title, 180),
    slug: cleanText(offer.slug, 180),
    badge: cleanText(offer.badge, 100),
    shortDescription: cleanText(
      offer.shortDescription,
      500
    ),
    offerType: cleanText(offer.offerType, 80),
    discountLabel: cleanText(
      offer.discountLabel,
      80
    ),
    originalPrice:
      typeof offer.originalPrice === "number"
        ? offer.originalPrice
        : null,
    offerPrice:
      typeof offer.offerPrice === "number"
        ? offer.offerPrice
        : null,
    couponCode: cleanText(
      offer.couponCode,
      80
    ),
    serviceId: offer.serviceId?.toString() || null,
    startDate: offer.startDate
      ? new Date(offer.startDate).toISOString()
      : null,
    endDate: offer.endDate
      ? new Date(offer.endDate).toISOString()
      : null,
    published: Boolean(offer.published),
    featured: Boolean(offer.featured),
  };
}

function serializeSiteSettings(settings: any) {
  if (!settings) return null;

  return {
    siteName: cleanText(settings.siteName, 150),
    tagline: cleanText(settings.tagline, 250),
    email: cleanText(settings.email, 150),
    phone: cleanText(settings.phone, 50),
    whatsapp: cleanText(settings.whatsapp, 200),
    address: cleanText(settings.address, 300),
    businessHours: settings.businessHours || null,
  };
}

function normaliseSearchText(text: string) {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function getKeywords(message: string): string[] {
  const stopWords = new Set([
    "the",
    "and",
    "for",
    "with",
    "this",
    "that",
    "what",
    "how",
    "can",
    "you",
    "are",
    "need",
    "want",
    "looking",
    "please",
    "give",
    "show",
    "tell",
    "about",
    "price",
    "cost",
    "website",
    "site",
    "business",
  ]);

  return normaliseSearchText(message)
    .split(" ")
    .filter(
      (word) =>
        word.length >= 3 &&
        !stopWords.has(word)
    )
    .slice(0, 8);
}

function scoreText(
  text: string,
  keywords: string[]
): number {
  const normalized = normaliseSearchText(text);

  return keywords.reduce(
    (score, keyword) =>
      normalized.includes(keyword)
        ? score + 1
        : score,
    0
  );
}

function scoreService(
  service: any,
  keywords: string[]
) {
  return scoreText(
    [
      service.title,
      service.slug,
      service.shortDescription,
      service.description,
      service.category,
      ...(Array.isArray(service.benefits)
        ? service.benefits
        : []),
      ...(Array.isArray(service.features)
        ? service.features
        : []),
    ]
      .filter(Boolean)
      .join(" "),
    keywords
  );
}

function scoreProject(
  project: any,
  keywords: string[]
) {
  return scoreText(
    [
      project.title,
      project.slug,
      project.client,
      project.category,
      project.industry,
      project.shortDescription,
      project.description,
      project.overview,
      project.location,
    ]
      .filter(Boolean)
      .join(" "),
    keywords
  );
}

function scoreFAQ(
  faq: any,
  keywords: string[]
) {
  return scoreText(
    [
      faq.question,
      faq.answer,
      faq.category,
    ]
      .filter(Boolean)
      .join(" "),
    keywords
  );
}

function isActiveOffer(offer: any) {
  if (!offer?.published) return false;

  const now = Date.now();

  const start = offer.startDate
    ? new Date(offer.startDate).getTime()
    : null;

  const end = offer.endDate
    ? new Date(offer.endDate).getTime()
    : null;

  if (start && now < start) return false;

  if (end && now > end) return false;

  if (
    offer.isClaimLimitEnabled &&
    typeof offer.claimLimit === "number" &&
    typeof offer.claimedCount === "number" &&
    offer.claimedCount >= offer.claimLimit
  ) {
    return false;
  }

  return true;
}

export async function retrieveAMIData({
  message,
  intent,
}: {
  message: string;
  intent?: RetrievalIntent;
}): Promise<AMIRetrievedData> {
  try {
    await connectDB();

    const keywords = getKeywords(message);

    const data: AMIRetrievedData = {
      ...EMPTY_DATA,
      services: [],
      projects: [],
      pricing: [],
      faqs: [],
      reviews: [],
      offers: [],
      site: null,
    };

    const shouldLoadServices =
      !intent ||
      [
        "SERVICE_DISCOVERY",
        "SERVICE_DETAILS",
        "PRICING",
        "PROJECT_DISCOVERY",
        "PROJECT_DETAILS",
        "START_PROJECT",
        "GENERAL",
        "UNKNOWN",
      ].includes(intent);

    const shouldLoadProjects =
      !intent ||
      [
        "PROJECT_DISCOVERY",
        "PROJECT_DETAILS",
        "SERVICE_DISCOVERY",
        "SERVICE_DETAILS",
        "GENERAL",
        "UNKNOWN",
      ].includes(intent);

    const shouldLoadPricing =
      !intent ||
      [
        "PRICING",
        "SERVICE_DISCOVERY",
        "SERVICE_DETAILS",
        "START_PROJECT",
        "GENERAL",
        "UNKNOWN",
      ].includes(intent);

    const shouldLoadFAQs =
      !intent ||
      [
        "FAQ",
        "GENERAL",
        "UNKNOWN",
      ].includes(intent);

    const shouldLoadReviews =
      !intent ||
      [
        "SERVICE_DISCOVERY",
        "SERVICE_DETAILS",
        "PROJECT_DISCOVERY",
        "PROJECT_DETAILS",
        "GENERAL",
        "UNKNOWN",
      ].includes(intent);

    const shouldLoadOffers =
      !intent ||
      [
        "OFFER",
        "PRICING",
        "SERVICE_DISCOVERY",
        "START_PROJECT",
        "GENERAL",
        "UNKNOWN",
      ].includes(intent);

    const shouldLoadSite =
      !intent ||
      [
        "CONTACT",
        "ABOUT",
        "GENERAL",
        "UNKNOWN",
        "START_PROJECT",
      ].includes(intent);

    const [
      services,
      projects,
      faqs,
      reviews,
      offers,
      siteSettings,
    ] = await Promise.all([
      shouldLoadServices
        ? Service.find({ published: true })
            .select(
              [
                "title",
                "slug",
                "heroEyebrow",
                "shortDescription",
                "description",
                "benefits",
                "features",
                "process",
                "startingPrice",
                "priceLabel",
                "category",
                "ctaLabel",
                "ctaLink",
                "published",
                "displayOrder",
              ].join(" ")
            )
            .sort({ displayOrder: 1 })
            .lean()
        : [],

      shouldLoadProjects
        ? Project.find({ published: true })
            .select(
              [
                "title",
                "slug",
                "client",
                "category",
                "industry",
                "shortDescription",
                "description",
                "overview",
                "liveUrl",
                "websiteUrl",
                "location",
                "published",
                "displayOrder",
              ].join(" ")
            )
            .sort({ displayOrder: 1 })
            .lean()
        : [],

      shouldLoadFAQs
        ? FAQ.find({ published: true })
            .select(
              "question answer category published displayOrder"
            )
            .sort({ displayOrder: 1 })
            .lean()
        : [],

      shouldLoadReviews
        ? Testimonial.find({ published: true })
            .select(
              "name authorName clientName role position company companyName content quote review text rating location published"
            )
            .sort({ createdAt: -1 })
            .lean()
        : [],

      shouldLoadOffers
        ? Offer.find({ published: true })
            .select(
              [
                "title",
                "slug",
                "badge",
                "shortDescription",
                "offerType",
                "discountLabel",
                "originalPrice",
                "offerPrice",
                "couponCode",
                "serviceId",
                "startDate",
                "endDate",
                "published",
                "featured",
                "isClaimLimitEnabled",
                "claimLimit",
                "claimedCount",
                "displayOrder",
              ].join(" ")
            )
            .sort({ featured: -1, displayOrder: 1 })
            .lean()
        : [],

      shouldLoadSite
        ? SiteSettings.findOne({})
            .select(
              "siteName tagline email phone whatsapp address businessHours"
            )
            .lean()
        : null,
    ]);

    const rankedServices = (services as any[])
      .map((service) => ({
        service,
        score: scoreService(service, keywords),
      }))
      .sort((a, b) => b.score - a.score)
      .slice(
        0,
        intent === "SERVICE_DETAILS" ? 3 : 5
      )
      .map(({ service }) =>
        serializeService(service)
      );

    const rankedProjects = (projects as any[])
      .map((project) => ({
        project,
        score: scoreProject(project, keywords),
      }))
      .sort((a, b) => b.score - a.score)
      .slice(
        0,
        intent === "PROJECT_DETAILS" ? 3 : 5
      )
      .map(({ project }) =>
        serializeProject(project)
      );

    const rankedFAQs = (faqs as any[])
      .map((faq) => ({
        faq,
        score: scoreFAQ(faq, keywords),
      }))
      .sort((a, b) => b.score - a.score)
      .slice(0, 5)
      .map(({ faq }) =>
        serializeFAQ(faq)
      );

    const activeOffers = (offers as any[])
      .filter(isActiveOffer)
      .slice(0, 3)
      .map(serializeOffer);

    data.services = rankedServices;
    data.projects = rankedProjects;
    data.faqs = rankedFAQs;
    data.reviews = (reviews as any[])
      .slice(0, 5)
      .map(serializeReview);
    data.offers = activeOffers;
    data.site = serializeSiteSettings(
      siteSettings
    );

    data.pricing = rankedServices
      .filter(
        (service) =>
          service.startingPrice !== null ||
          service.priceLabel
      )
      .map((service) => ({
        id: service.id,
        title: service.title,
        slug: service.slug,
        startingPrice: service.startingPrice,
        priceLabel: service.priceLabel,
      }));

    return data;
  } catch (error) {
    console.error(
      "[AMI] Data retrieval failed:",
      error
    );

    return EMPTY_DATA;
  }
}