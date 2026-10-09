import { connectDB } from "@/lib/db/connect";
import Service from "@/models/Service";
import Project from "@/models/Project";
import FAQ from "@/models/FAQ";
import Testimonial from "@/models/Testimonial";
import Offer from "@/models/Offer";
import PricingPlan from "@/models/PricingPlan";
import SiteSettings from "@/models/SiteSettings";

export type AMIRetrievedData = {
  services: Array<Record<string, unknown>>;
  projects: Array<Record<string, unknown>>;
  pricing: Array<Record<string, unknown>>;
  faqs: Array<Record<string, unknown>>;
  reviews: Array<Record<string, unknown>>;
  offers: Array<Record<string, unknown>>;
  site: Record<string, unknown> | null;
  retrievalError?: boolean;
};

type RetrievalIntent =
  | "GREETING" | "SERVICE_DISCOVERY" | "SERVICE_DETAILS" | "PRICING"
  | "PROJECT_DISCOVERY" | "PROJECT_DETAILS" | "FAQ" | "OFFER"
  | "START_PROJECT" | "CONTACT" | "ABOUT" | "GENERAL" | "UNKNOWN";
type DbRecord = Record<string, any>;

const EMPTY_DATA: AMIRetrievedData = {
  services: [], projects: [], pricing: [], faqs: [], reviews: [], offers: [],
  site: null, retrievalError: false,
};

function text(value: unknown, max = 400): string {
  return typeof value === "string" ? value.replace(/\s+/g, " ").trim().slice(0, max) : "";
}
function price(value: unknown): number | null {
  if (typeof value === "number") {
    return Number.isFinite(value) && value >= 0
      ? value
      : null;
  }

  if (typeof value === "string" && value.trim() !== "") {
    const parsed = Number(value.trim());

    return Number.isFinite(parsed) && parsed >= 0
      ? parsed
      : null;
  }

  return null;
}
function id(value: unknown): string | null {
  if (value == null) return null;
  const result = String(value);
  return result && result !== "[object Object]" ? result.slice(0, 100) : null;
}
function slug(value: unknown): string {
  const result = text(value, 180).toLowerCase();

return /^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(result)
  ? result
  : "";
}
function date(value: unknown): string | null {
  if (typeof value !== "string" && typeof value !== "number" && !(value instanceof Date)) return null;
  const parsed = new Date(value);
  return Number.isNaN(parsed.getTime()) ? null : parsed.toISOString();
}
function strings(value: unknown, maxItems = 8, maxLength = 120): string[] {
  return Array.isArray(value)
    ? value.filter((item): item is string => typeof item === "string").map((item) => text(item, maxLength)).filter(Boolean).slice(0, maxItems)
    : [];
}
function objects(value: unknown, maxItems = 6): Array<Record<string, unknown>> {
  if (!Array.isArray(value)) return [];

  return value
    .filter(
      (item): item is DbRecord =>
        Boolean(item) &&
        typeof item === "object" &&
        !Array.isArray(item),
    )
    .slice(0, maxItems)
    .map((item) => ({
      title: text(item.title, 120),
      description: text(item.description, 500),
      ...(typeof item.icon === "string" && text(item.icon, 80)
        ? { icon: text(item.icon, 80) }
        : {}),
      ...(typeof item.order === "number" && Number.isFinite(item.order)
        ? { order: item.order }
        : {}),
    }));
}
function href(prefix: "/services/" | "/projects/" | "/offers/", value: unknown): string {
  const valueSlug = slug(value);
  return valueSlug ? `${prefix}${valueSlug}` : "";
}
function normalize(value: string): string {
  return value.toLowerCase().replace(/[^\p{L}\p{N}\s-]/gu, " ").replace(/\s+/g, " ").trim();
}
const STOP_WORDS = new Set(["the", "and", "for", "with", "this", "that", "what", "how", "can", "you", "are", "need", "want", "looking", "please", "give", "show", "tell", "about", "hai", "hain", "mujhe", "chahiye", "kya", "ka", "ki", "ke", "ho", "aur", "is", "me", "my", "your", "our", "services", "service", "projects", "project", "price", "pricing"]);
function keywords(message: string): string[] {
  return normalize(message).split(" ").filter((word) => word.length > 1 && !STOP_WORDS.has(word)).slice(0, 10);
}
function score(value: string, words: string[]): number {
  const normalized = ` ${normalize(value)} `;
  return words.reduce((sum, word) => sum + (normalized.includes(` ${word} `) ? 2 : 0), 0);
}
function listRequest(message: string): boolean {
  return /\b(all|every|list|each|complete|entire|sabhi|saare|saari|puri|poori)\b/i.test(message);
}

export function allServicesRequest(message: string): boolean {
  const value = normalize(message);

  const explicitAllPhrases = [
    "all services",
    "all the services",
    "list all services",
    "show all services",
    "show me all services",
    "display all services",
    "every service",
    "every single service",
    "complete list of services",
    "full list of services",
    "list of all services",
    "all offerings",
    "all our services",
    "all your services",
    "saari services",
    "saare services",
    "sabhi services",
    "sabhi seva",
    "poori service list",
    "saari service list",
  ];

  if (
    explicitAllPhrases.some((phrase) =>
      value.includes(phrase),
    )
  ) {
    return true;
  }

  return (
    /\b(list|show|display|give me)\b/i.test(value) &&
    /\b(all|every|complete|entire|full|saari|saare|sabhi|poori|puri)\b/i.test(
      value,
    ) &&
    /\b(services|service|offerings|offering|seva)\b/i.test(
      value,
    )
  );
}

function allProjectsRequest(message: string): boolean {
  const value = normalize(message);
  return ["portfolio", "gallery", "all projects", "show projects", "your projects", "your work", "all work", "completed projects", "projects dikhao", "saare projects", "sabhi projects"].some((phrase) => value.includes(phrase)) || (listRequest(message) && /\b(project|projects|portfolio|work|gallery)\b/i.test(value));
}
function reviewRequest(message: string): boolean { return /\b(review|reviews|testimonial|testimonials|rating|ratings|feedback)\b/i.test(message); }
function offerRequest(message: string, intent?: RetrievalIntent): boolean { return intent === "OFFER" || /\b(offer|offers|discount|discounts|coupon|coupons|deal|deals|sale)\b/i.test(message); }
function faqRequest(message: string, intent?: RetrievalIntent): boolean { return intent === "FAQ" || /\b(faq|faqs|frequently asked|question|questions)\b/i.test(message); }

function serializeService(s: DbRecord) {
  const serviceSlug = slug(s.slug);

  const image =
    s.image && typeof s.image === "object" && !Array.isArray(s.image)
      ? {
          url: text(s.image.url, 500),
          alt: text(s.image.alt, 180),
        }
      : null;

  return {
    title: text(s.title, 120),
    slug: serviceSlug,
    href: href("/services/", serviceSlug),
    heroEyebrow: text(s.heroEyebrow, 120),
    shortDescription: text(s.shortDescription, 500),
    description: text(s.description, 1800),
    icon: text(s.icon, 80),
    image: image?.url ? image : null,
    category: text(s.category, 80),
    startingPrice: price(s.startingPrice),
    priceLabel: text(s.priceLabel, 100),
    benefits: objects(s.benefits, 10),
    features: objects(s.features, 12),
    process: objects(s.process, 8),
    keywords: strings(s.keywords, 12, 70),
    ctaLabel: text(s.ctaLabel, 60),
    ctaLink: text(s.ctaLink, 250),
  };
}
function serializeServiceSummary(s: DbRecord) {
  const serviceSlug = slug(s.slug);

  return {
    title: text(s.title, 120),
    slug: serviceSlug,
    href: href("/services/", serviceSlug),
    shortDescription: text(s.shortDescription, 300),
    category: text(s.category, 80),
    startingPrice: price(s.startingPrice),
    priceLabel: text(s.priceLabel, 100),
  };
}
function serializeProject(p: DbRecord) {
  const projectSlug = slug(p.slug);
  return {
    id: id(p._id), title: text(p.title, 120), slug: projectSlug,
    href: href("/projects/", projectSlug), client: text(p.client, 100), category: text(p.industry, 80),
    shortDescription: text(p.shortDescription, 300), description: text(p.overview, 500),
    technologies: strings(p.technologies, 10, 70), features: objects(p.features, 6),
    liveUrl: text(p.liveUrl, 300), githubUrl: text(p.githubUrl, 300), published: p.published === true,
  };
}
function serializeFAQ(f: DbRecord) {
  return { id: id(f._id), question: text(f.question, 180), answer: text(f.answer, 500), category: text(f.category, 60), published: f.published === true };
}
function serializeReview(r: DbRecord) {
  const rating = typeof r.rating === "number" && r.rating >= 1 && r.rating <= 5 ? r.rating : null;
  return { id: id(r._id), name: text(r.name, 80), role: text(r.role, 80), company: text(r.company, 100), content: text(r.quote, 400), rating, location: text(r.location, 80), createdAt: date(r.createdAt), published: r.published === true };
}
function serializeOffer(o: DbRecord) {
  const offerSlug = slug(o.slug);
  const limitEnabled = o.isClaimLimitEnabled === true;
  const claimLimit = typeof o.claimLimit === "number" ? o.claimLimit : null;
  const claimedCount = typeof o.claimedCount === "number" ? o.claimedCount : 0;
  return {
    id: id(o._id), title: text(o.title, 130), slug: offerSlug, href: href("/offers/", offerSlug),
    badge: text(o.badge, 60), shortDescription: text(o.shortDescription, 300), description: text(o.description, 500),
    offerType: text(o.offerType, 60), discountType: text(o.discountType, 40), discountValue: price(o.discountValue),
    discountLabel: text(o.discountLabel, 80), originalPrice: price(o.originalPrice), offerPrice: price(o.offerPrice),
    couponCode: text(o.couponCode, 60), serviceId: id(o.serviceId), highlights: strings(o.highlights, 6, 120),
    includedFeatures: strings(o.includedFeatures, 8, 120), startDate: date(o.startDate), endDate: date(o.endDate),
    claimLimitEnabled: limitEnabled, claimLimit, claimedCount,
    remainingClaims: limitEnabled && claimLimit !== null ? Math.max(0, claimLimit - claimedCount) : null,
    ctaLabel: text(o.ctaLabel, 60), ctaLink: text(o.ctaLink, 250), published: o.published === true, featured: o.featured === true,
  };
}
function serializePlan(p: DbRecord) {
  return {
    id: id(p._id), name: text(p.name, 120), slug: slug(p.slug), shortDescription: text(p.shortDescription, 250),
    price: price(p.price), currency: text(p.currency, 8) || "₹", pricePrefix: text(p.pricePrefix, 30),
    priceSuffix: text(p.priceSuffix, 30), pricingType: text(p.pricingType, 40), billingPeriod: text(p.billingPeriod, 40),
    features: strings(p.features, 10, 120), serviceId: id(p.serviceId), ctaText: text(p.ctaText, 60),
    ctaLink: text(p.ctaLink, 250), isFeatured: p.isFeatured === true, featuredLabel: text(p.featuredLabel, 60),
  };
}
function serializeSite(s: DbRecord | null) {
  if (!s) return null;
  const contact = s.contact && typeof s.contact === "object" ? s.contact : {};
  return {
    siteName: text(s.siteName, 100), tagline: text(s.tagline, 160), description: text(s.description, 400),
    email: text(s.primaryEmail || contact.email, 150), phone: text(s.primaryPhone || contact.phone, 40),
    whatsapp: text(s.whatsappNumber || contact.whatsapp, 80), address: text(contact.address, 180),
    city: text(contact.city, 80), state: text(contact.state, 80), country: text(contact.country, 80),
  };
}
function activeOffer(o: DbRecord, now = Date.now()): boolean {
  if (o.published !== true) return false;
  const start = o.startDate ? new Date(o.startDate).getTime() : NaN;
  const end = o.endDate ? new Date(o.endDate).getTime() : NaN;
  if (!Number.isFinite(start) || !Number.isFinite(end) || now < start || now > end) return false;
  return !(o.isClaimLimitEnabled === true && typeof o.claimLimit === "number" && typeof o.claimedCount === "number" && o.claimedCount >= o.claimLimit);
}

export async function retrieveAMIData({ message, intent }: { message: string; intent?: RetrievalIntent }): Promise<AMIRetrievedData> {
  try {
    await connectDB();
    const retrievalNow = new Date();
    const words = keywords(message);
  const wantsProjects =
  allProjectsRequest(message) ||
  ["PROJECT_DISCOVERY", "PROJECT_DETAILS"].includes(intent ?? "") ||
  /\b(project|projects|portfolio|gallery|case study|case studies|work samples|client work|demo|live website)\b/i.test(
    message,
  );

const wantsReviews = reviewRequest(message);
const wantsOffers = offerRequest(message, intent);
const wantsFAQs = faqRequest(message, intent);

const explicitNonServiceRequest =
  wantsProjects ||
  wantsReviews ||
  wantsOffers ||
  wantsFAQs;

const wantsServices =
  allServicesRequest(message) ||
  (!explicitNonServiceRequest &&
    (["SERVICE_DISCOVERY", "SERVICE_DETAILS", "PRICING", "START_PROJECT"].includes(
      intent ?? "",
    ) ||
      /\b(service|website|ecommerce|e-commerce|seo|marketing|automation|development|pricing|price|cost|rate|budget)\b/i.test(
        message,
      )));

const wantsPricing =
  intent === "PRICING" ||
  /\b(price|pricing|cost|rate|budget|how much|kitna|charges)\b/i.test(
    message,
  );

const wantsSite =
  ["CONTACT", "ABOUT", "GENERAL", "UNKNOWN", "START_PROJECT"].includes(
    intent ?? "",
  ) ||
  /\b(contact|email|phone|whatsapp|address|location|about|company|business|who are you)\b/i.test(
    message,
  );

    const [serviceRecords, projectRecords, faqRecords, reviewRecords, offerRecords, pricingRecords, siteRecord] = await Promise.all([
      wantsServices ? Service.find({ published: true }).select(
  "title slug heroEyebrow shortDescription description icon image category benefits features process keywords startingPrice priceLabel ctaLabel ctaLink published displayOrder",
).sort({ displayOrder: 1 }).limit(allServicesRequest(message) ? 40 : 30).lean() : Promise.resolve([]),
      wantsProjects ? Project.find({ published: true }).select("title slug client industry shortDescription overview features technologies liveUrl githubUrl published displayOrder").sort({ displayOrder: 1 }).limit(allProjectsRequest(message) ? 40 : 5).lean() : Promise.resolve([]),
      wantsFAQs ? FAQ.find({ published: true }).select("question answer category published displayOrder").sort({ displayOrder: 1 }).limit(listRequest(message) ? 40 : 8).lean() : Promise.resolve([]),
      wantsReviews ? Testimonial.find({ published: true }).select("name role company quote rating location published createdAt").sort({ createdAt: -1 }).limit(listRequest(message) ? 40 : 5).lean() : Promise.resolve([]),
      wantsOffers ? 
Offer.find({
  published: true,
  startDate: { $lte: retrievalNow },
  endDate: { $gte: retrievalNow },
})
.select("title slug badge shortDescription description offerType discountType discountValue originalPrice offerPrice discountLabel couponCode serviceId highlights includedFeatures ctaLabel ctaLink startDate endDate published featured isClaimLimitEnabled claimLimit claimedCount displayOrder").sort({ featured: -1, displayOrder: 1 }).limit(listRequest(message) ? 40 : 10).lean() : Promise.resolve([]),
      wantsPricing ? PricingPlan.find({ isPublished: true }).select("name slug shortDescription price currency pricePrefix priceSuffix pricingType billingPeriod features serviceId ctaText ctaLink isFeatured featuredLabel isPublished displayOrder").sort({ isFeatured: -1, displayOrder: 1 }).limit(12).lean() : Promise.resolve([]),
      wantsSite ? SiteSettings.findOne({}).select("siteName tagline description contact primaryEmail primaryPhone whatsappNumber").lean() : Promise.resolve(null),
    ]);

    const services = (serviceRecords as DbRecord[]).map((s) => ({ raw: s, data: serializeService(s), score: score(`${s.title ?? ""} ${s.slug ?? ""} ${s.shortDescription ?? ""} ${s.description ?? ""} ${s.category ?? ""} ${(s.keywords ?? []).join(" ")}`, words) }));
    services.sort((a, b) => b.score - a.score || Number(a.raw.displayOrder ?? 9999) - Number(b.raw.displayOrder ?? 9999));
const selectedServices = allServicesRequest(message)
  ? services.map((item) => ({
      ...item,
      data: serializeServiceSummary(item.raw),
    }))
  : intent === "SERVICE_DETAILS"
    ? services.slice(0, 1)
    : services.slice(0, wantsPricing ? 5 : 4).map((item) => ({
        ...item,
        data: serializeServiceSummary(item.raw),
      }));
    const projects = (projectRecords as DbRecord[]).map((p) => ({ raw: p, data: serializeProject(p), score: score(`${p.title ?? ""} ${p.slug ?? ""} ${p.client ?? ""} ${p.industry ?? ""} ${p.shortDescription ?? ""} ${p.overview ?? ""} ${(p.technologies ?? []).join(" ")}`, words) }));
    projects.sort((a, b) => b.score - a.score || Number(a.raw.displayOrder ?? 9999) - Number(b.raw.displayOrder ?? 9999));

    const plans = (pricingRecords as DbRecord[]).map(serializePlan);
    const servicePricing = wantsPricing ? (serviceRecords as DbRecord[]).filter((s) => price(s.startingPrice) !== null || Boolean(text(s.priceLabel, 100))).map((s) => ({ id: id(s._id), title: text(s.title, 120), slug: slug(s.slug), href: href("/services/", s.slug), startingPrice: price(s.startingPrice), priceLabel: text(s.priceLabel, 100), source: "service" })) : [];
    const pricing = [...plans.map((p) => ({ ...p, source: "pricing-plan" })), ...servicePricing];
    const selectedOffers = (offerRecords as DbRecord[]).filter((o) => activeOffer(o)).slice(0, 6).map(serializeOffer);
    const selectedFAQs = (faqRecords as DbRecord[]).map(serializeFAQ);
    const selectedReviews = (reviewRecords as DbRecord[]).map(serializeReview).filter((r) => Boolean(r.content));

    return {
      services: selectedServices.map((item) => item.data),
      projects: projects.slice(0, allProjectsRequest(message) ? 40 : 4).map((item) => item.data),
      pricing: pricing.slice(0, 18), faqs: selectedFAQs, reviews: selectedReviews,
      offers: selectedOffers, site: serializeSite(siteRecord as DbRecord | null), retrievalError: false,
    };
  } catch (error) {
    console.error("[AMI] Database retrieval failed:", error instanceof Error ? error.message : "Unknown retrieval error");
    return { ...EMPTY_DATA, retrievalError: true };
  }
}
