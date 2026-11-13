import type {
  AMIAction,
  AMIActionType,
  AMIConversationContext,
  AMIGalleryImage,
  AMIIntent,
  AMIResponse,
  AMIResponseBlock,
} from "./types";

import { sanitizeAMIContext } from "./context";
import { isSafeImageUrl, isSafeLiveUrl } from "./urls";

/* =========================================================
   AMI RESPONSE VALIDATION
========================================================= */

const VALID_INTENTS = new Set<AMIIntent>([
  "GREETING",
  "SERVICE_DISCOVERY",
  "SERVICE_DETAILS",
  "PRICING",
  "PROJECT_DISCOVERY",
  "PROJECT_DETAILS",
  "FAQ",
  "OFFER",
  "START_PROJECT",
  "CONTACT",
  "ABOUT",
  "REVIEWS",
  "GALLERY",
  "POLICY",
  "BLOG",
  "GENERAL",
  "UNKNOWN",
]);

const VALID_ACTIONS = new Set<AMIActionType>([
  "VIEW_SERVICE",
  "VIEW_PROJECT",
  "VIEW_PRICING",
  "VIEW_FAQ",
  "VIEW_OFFER",
  "START_PROJECT",
  "CONTACT",
  "WHATSAPP",
  "CALL",
  "EMAIL",
  "NONE",
]);

const VALID_BLOCKS = new Set([
  "text",
  "service",
  "project",
  "pricing",
  "offer",
  "review",
  "gallery",
  "blog",
  "faq",
  "quick_actions",
]);

const MAX_BLOCKS = 12;
const MAX_ACTIONS = 8;
const MAX_TEXT_LENGTH = 1800;

function cleanText(value: unknown, max = 1200): string {
  if (typeof value !== "string") return "";

  return value.trim().slice(0, max);
}

function cleanPrice(value: unknown): number | null | undefined {
  if (value === null) return null;

  if (typeof value !== "number" || !Number.isFinite(value) || value < 0) {
    return undefined;
  }

  return value;
}

function cleanSlug(value: unknown): string | undefined {
  if (typeof value !== "string") return undefined;

  const slug = value.trim();

  if (!slug || !/^[a-z0-9]+(?:-[a-z0-9]+)*$/i.test(slug)) {
    return undefined;
  }

  return slug.slice(0, 150);
}

function cleanIdentifier(value: unknown): string | undefined {
  return cleanText(value, 200) || undefined;
}

function cleanList(value: unknown, maxItems: number, maxLen: number): string[] | undefined {
  if (!Array.isArray(value)) return undefined;

  const list = value
    .filter((item): item is string => typeof item === "string")
    .map((item) => item.trim().slice(0, maxLen))
    .filter(Boolean)
    .slice(0, maxItems);

  return list.length > 0 ? list : undefined;
}

function sanitizeContextPatch(value: unknown): AMIConversationContext {
  return sanitizeAMIContext(value);
}

/* =========================================================
   ACTION VALIDATION
========================================================= */

function sanitizeAction(value: unknown): AMIAction | null {
  if (!value || typeof value !== "object" || Array.isArray(value)) {
    return null;
  }

  const raw = value as Record<string, unknown>;

  if (
    typeof raw.type !== "string" ||
    !VALID_ACTIONS.has(raw.type as AMIActionType)
  ) {
    return null;
  }

  const label = cleanText(raw.label, 80);

  if (!label) return null;

  const action: AMIAction = {
    type: raw.type as AMIActionType,
    label,
  };

  if (typeof raw.href === "string") {
    const href = cleanText(raw.href, 2048);

    if (href) action.href = href;
  }

  const serviceId = cleanIdentifier(raw.serviceId);
  const serviceSlug = cleanSlug(raw.serviceSlug);
  const projectId = cleanIdentifier(raw.projectId);
  const projectSlug = cleanSlug(raw.projectSlug);
  const offerId = cleanIdentifier(raw.offerId);
  const offerSlug = cleanSlug(raw.offerSlug);

  if (serviceId) action.serviceId = serviceId;
  if (serviceSlug) action.serviceSlug = serviceSlug;
  if (projectId) action.projectId = projectId;
  if (projectSlug) action.projectSlug = projectSlug;
  if (offerId) action.offerId = offerId;
  if (offerSlug) action.offerSlug = offerSlug;

  return action;
}

/* =========================================================
   BLOCK VALIDATION
========================================================= */

function sanitizeBlock(value: unknown): AMIResponseBlock | null {
  if (!value || typeof value !== "object" || Array.isArray(value)) {
    return null;
  }

  const raw = value as Record<string, unknown>;
  const type = raw.type;

  if (typeof type !== "string" || !VALID_BLOCKS.has(type)) {
    return null;
  }

  const href =
    typeof raw.href === "string"
      ? cleanText(raw.href, 2048) || undefined
      : undefined;

  if (type === "text") {
    const text = cleanText(raw.text, MAX_TEXT_LENGTH);

    return text ? { type: "text", text } : null;
  }

  if (type === "quick_actions") {
    if (!Array.isArray(raw.actions)) return null;

    const actions = raw.actions
      .map(sanitizeAction)
      .filter((action): action is AMIAction => action !== null)
      .slice(0, 6);

    return actions.length > 0 ? { type: "quick_actions", actions } : null;
  }

  if (type === "review") {
    const name = cleanText(raw.name, 100);
    const quote = cleanText(raw.quote, 600);

    if (!name || !quote) return null;

    const rating =
      typeof raw.rating === "number" && raw.rating >= 1 && raw.rating <= 5
        ? raw.rating
        : null;

    return {
      type: "review",
      name,
      quote,
      rating,
      role: cleanText(raw.role, 100) || undefined,
      company: cleanText(raw.company, 100) || undefined,
      location: cleanText(raw.location, 100) || undefined,
    };
  }

  if (type === "faq") {
    const question = cleanText(raw.question, 300);
    const answer = cleanText(raw.answer, 800);

    return question && answer
      ? { type: "faq", question, answer, href }
      : null;
  }

  const title = cleanText(raw.title, 200);

  if (!title) return null;

  const description =
    typeof raw.description === "string"
      ? cleanText(raw.description, 1000) || undefined
      : undefined;

  if (type === "gallery") {
    const images: AMIGalleryImage[] = (Array.isArray(raw.images) ? raw.images : [])
      .map((item) => {
        const rec = item as Record<string, unknown>;

        return {
          url: typeof rec?.url === "string" ? rec.url : "",
          title: cleanText(rec?.title, 120) || undefined,
        };
      })
      .filter((item) => isSafeImageUrl(item.url))
      .slice(0, 8);

    if (images.length === 0) return null;

    return {
      type: "gallery",
      title,
      projectSlug: cleanSlug(raw.projectSlug),
      images,
      href,
    };
  }

  if (type === "blog") {
    const readingTime =
      typeof raw.readingTime === "number" && raw.readingTime > 0
        ? Math.round(raw.readingTime)
        : undefined;

    return {
      type: "blog",
      title,
      excerpt: cleanText(raw.excerpt, 400) || undefined,
      category: cleanText(raw.category, 80) || undefined,
      readingTime,
      imageUrl: isSafeImageUrl(raw.imageUrl) ? raw.imageUrl : undefined,
      href,
    };
  }

  if (type === "service") {
    const startingPrice = cleanPrice(raw.startingPrice);

    return {
      type: "service",
      serviceId: cleanIdentifier(raw.serviceId),
      slug: cleanSlug(raw.slug),
      title,
      description,
      ...(startingPrice !== undefined ? { startingPrice } : {}),
      priceLabel: cleanText(raw.priceLabel, 150) || undefined,
      href,
    };
  }

  if (type === "project") {
    return {
      type: "project",
      projectId: cleanIdentifier(raw.projectId),
      slug: cleanSlug(raw.slug),
      title,
      description,
      industry: cleanText(raw.industry, 100) || undefined,
      imageUrl: isSafeImageUrl(raw.imageUrl) ? raw.imageUrl : undefined,
      results: cleanList(raw.results, 4, 120),
      technologies: cleanList(raw.technologies, 6, 40),
      liveUrl: isSafeLiveUrl(raw.liveUrl) ? raw.liveUrl : undefined,
      href,
    };
  }

  if (type === "pricing") {
    const price = cleanPrice(raw.price);

    return {
      type: "pricing",
      title,
      ...(price !== undefined ? { price } : {}),
      priceLabel: cleanText(raw.priceLabel, 150) || undefined,
      description,
      features: cleanList(raw.features, 6, 120),
      href,
    };
  }

  if (type === "offer") {
    const originalPrice = cleanPrice(raw.originalPrice);
    const offerPrice = cleanPrice(raw.offerPrice);

    return {
      type: "offer",
      offerId: cleanIdentifier(raw.offerId),
      slug: cleanSlug(raw.slug),
      title,
      badge: cleanText(raw.badge, 100) || undefined,
      shortDescription: cleanText(raw.shortDescription, 1000) || undefined,
      ...(originalPrice !== undefined ? { originalPrice } : {}),
      ...(offerPrice !== undefined ? { offerPrice } : {}),
      discountLabel: cleanText(raw.discountLabel, 100) || undefined,
      couponCode: cleanText(raw.couponCode, 100) || undefined,
      href,
    };
  }

  return null;
}

/* =========================================================
   RESPONSE NORMALIZATION
========================================================= */

export function normalizeAMIResponse(input: unknown): AMIResponse {
  if (!input || typeof input !== "object" || Array.isArray(input)) {
    return getFallbackResponse();
  }

  const raw = input as Record<string, unknown>;

  const message =
    cleanText(raw.message, MAX_TEXT_LENGTH) ||
    "Tell me what you're looking to build and I'll help you find the right solution.";

  const intent =
    typeof raw.intent === "string" &&
    VALID_INTENTS.has(raw.intent as AMIIntent)
      ? (raw.intent as AMIIntent)
      : "UNKNOWN";

  const blocks = Array.isArray(raw.blocks)
    ? raw.blocks
        .map(sanitizeBlock)
        .filter((block): block is AMIResponseBlock => block !== null)
        .slice(0, MAX_BLOCKS)
    : [];

  const actions = Array.isArray(raw.actions)
    ? raw.actions
        .map(sanitizeAction)
        .filter((action): action is AMIAction => action !== null)
        .slice(0, MAX_ACTIONS)
    : [];

  const nextQuestion =
    typeof raw.nextQuestion === "string"
      ? cleanText(raw.nextQuestion, 500) || null
      : null;

  return {
    message,
    intent,
    blocks,
    actions,
    contextPatch: sanitizeContextPatch(raw.contextPatch),
    needsInput: raw.needsInput === true,
    nextQuestion,
  };
}

/* =========================================================
   SAFE FALLBACK
========================================================= */

export function getFallbackResponse(): AMIResponse {
  return {
    message:
      "I can help you explore Aman Digital Solutions services, pricing and projects. What are you looking to build?",
    intent: "GENERAL",
    blocks: [],
    actions: [
      { type: "VIEW_SERVICE", label: "View Services", href: "/services" },
      { type: "VIEW_PRICING", label: "View Pricing", href: "/pricing" },
      { type: "START_PROJECT", label: "Start a Project", href: "/start-a-project" },
    ],
    contextPatch: {},
    needsInput: false,
    nextQuestion: null,
  };
}