
import type {
  AMIAction,
  AMIActionType,
  AMIConversationContext,
  AMIIntent,
  AMIResponse,
  AMIResponseBlock,
} from "./types";

import { sanitizeAMIContext } from "./context";

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
  "quick_actions",
]);

const MAX_BLOCKS = 12;
const MAX_ACTIONS = 8;
const MAX_TEXT_LENGTH = 1800;

function cleanText(
  value: unknown,
  max = 1200,
): string {
  if (typeof value !== "string") return "";

  return value.trim().slice(0, max);
}

function cleanPrice(
  value: unknown,
): number | null | undefined {
  if (value === null) return null;

  if (
    typeof value !== "number" ||
    !Number.isFinite(value) ||
    value < 0
  ) {
    return undefined;
  }

  return value;
}

function cleanSlug(
  value: unknown,
): string | undefined {
  if (typeof value !== "string") return undefined;

  const slug = value.trim();

  if (
    !slug ||
    !/^[a-z0-9]+(?:-[a-z0-9]+)*$/i.test(slug)
  ) {
    return undefined;
  }

  return slug.slice(0, 150);
}

function cleanIdentifier(
  value: unknown,
): string | undefined {
  return cleanText(value, 200) || undefined;
}

/* =========================================================
   CONTEXT PATCH
========================================================= */

function sanitizeContextPatch(
  value: unknown,
): AMIConversationContext {
  return sanitizeAMIContext(value);
}

/* =========================================================
   ACTION VALIDATION
========================================================= */

function sanitizeAction(
  value: unknown,
): AMIAction | null {
  if (
    !value ||
    typeof value !== "object" ||
    Array.isArray(value)
  ) {
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

  // URLs are validated again by the API security layer.
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

function sanitizeBlock(
  value: unknown,
): AMIResponseBlock | null {
  if (
    !value ||
    typeof value !== "object" ||
    Array.isArray(value)
  ) {
    return null;
  }

  const raw = value as Record<string, unknown>;
  const type = raw.type;

  if (
    typeof type !== "string" ||
    !VALID_BLOCKS.has(type)
  ) {
    return null;
  }

  if (type === "text") {
    const text = cleanText(raw.text, MAX_TEXT_LENGTH);

    return text ? { type: "text", text } : null;
  }

  if (type === "quick_actions") {
    if (!Array.isArray(raw.actions)) return null;

    const actions = raw.actions
      .map(sanitizeAction)
      .filter(
        (action): action is AMIAction => action !== null,
      )
      .slice(0, 6);

    // Do not render an empty quick-actions block.
    if (actions.length === 0) return null;

    return {
      type: "quick_actions",
      actions,
    };
  }

  const title = cleanText(raw.title, 200);

  if (!title) return null;

  const href =
    typeof raw.href === "string"
      ? cleanText(raw.href, 2048) || undefined
      : undefined;

  const description =
    typeof raw.description === "string"
      ? cleanText(raw.description, 1000) || undefined
      : undefined;

  if (type === "service") {
    const startingPrice = cleanPrice(raw.startingPrice);

    return {
      type: "service",
      serviceId: cleanIdentifier(raw.serviceId),
      slug: cleanSlug(raw.slug),
      title,
      description,
      ...(startingPrice !== undefined
        ? { startingPrice }
        : {}),
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
      shortDescription:
        cleanText(raw.shortDescription, 1000) || undefined,
      ...(originalPrice !== undefined
        ? { originalPrice }
        : {}),
      ...(offerPrice !== undefined
        ? { offerPrice }
        : {}),
      discountLabel:
        cleanText(raw.discountLabel, 100) || undefined,
      couponCode:
        cleanText(raw.couponCode, 100) || undefined,
      href,
    };
  }

  return null;
}

/* =========================================================
   RESPONSE NORMALIZATION
========================================================= */

export function normalizeAMIResponse(
  input: unknown,
): AMIResponse {
  if (
    !input ||
    typeof input !== "object" ||
    Array.isArray(input)
  ) {
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
        .filter(
          (block): block is AMIResponseBlock => block !== null,
        )
        .slice(0, MAX_BLOCKS)
    : [];

  const actions = Array.isArray(raw.actions)
    ? raw.actions
        .map(sanitizeAction)
        .filter(
          (action): action is AMIAction => action !== null,
        )
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
      {
        type: "VIEW_SERVICE",
        label: "View Services",
        href: "/services",
      },
      {
        type: "VIEW_PRICING",
        label: "View Pricing",
        href: "/pricing",
      },
      {
        type: "START_PROJECT",
        label: "Start a Project",
        href: "/start-a-project",
      },
    ],

    contextPatch: {},

    needsInput: false,

    nextQuestion: null,
  };
}
