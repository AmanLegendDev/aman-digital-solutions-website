import type { AMIIntent } from "./types";

/* =========================================================
   AMI INTENT ENGINE
   ---------------------------------------------------------
   Deterministic first-pass intent detection.

   AI will still make the final response, but this gives
   retrieval a fast, predictable signal before the model runs.
========================================================= */

const INTENT_KEYWORDS: Record<
  Exclude<AMIIntent, "UNKNOWN">,
  string[]
> = {
  GREETING: [
    "hi",
    "hello",
    "hey",
    "hii",
    "namaste",
    "good morning",
    "good afternoon",
    "good evening",
  ],

  SERVICE_DISCOVERY: [
    "service",
    "services",
    "what do you offer",
    "what do you provide",
    "what can you build",
    "what do you do",
    "which service",
    "which solution",
    "website",
    "web development",
    "ecommerce",
    "e-commerce",
    "seo",
    "digital marketing",
    "automation",
    "hosting",
    "maintenance",
    "ui ux",
    "ui/ux",
  ],

  SERVICE_DETAILS: [
    "tell me about",
    "explain",
    "details",
    "more about",
    "what is included",
    "what's included",
    "features",
    "benefits",
    "process",
    "how does it work",
  ],

  PRICING: [
    "price",
    "pricing",
    "cost",
    "how much",
    "budget",
    "rate",
    "starting price",
    "starting from",
    "₹",
    "inr",
    "expensive",
    "cheap",
  ],

  PROJECT_DISCOVERY: [
    "project",
    "projects",
    "portfolio",
    "work",
    "previous work",
    "past work",
    "examples",
    "show me your work",
    "clients",
    "case study",
  ],

  PROJECT_DETAILS: [
    "how did you build",
    "built with",
    "technology",
    "tech stack",
    "case study",
    "live website",
    "live project",
  ],

  FAQ: [
    "faq",
    "question",
    "how long",
    "timeline",
    "turnaround",
    "domain",
    "hosting",
    "support",
    "maintenance",
    "payment",
    "revision",
    "revisions",
  ],

  OFFER: [
    "offer",
    "offers",
    "discount",
    "discounts",
    "coupon",
    "promo",
    "promotion",
    "deal",
    "diwali",
    "sale",
    "special price",
  ],

  START_PROJECT: [
    "start project",
    "start a project",
    "start my project",
    "build my website",
    "hire you",
    "work with you",
    "get started",
    "let's start",
    "lets start",
    "book a project",
    "place an enquiry",
  ],

  CONTACT: [
    "contact",
    "contact you",
    "phone",
    "call",
    "email",
    "whatsapp",
    "reach you",
    "talk to you",
    "speak with you",
  ],

  ABOUT: [
    "about you",
    "about aman digital",
    "who are you",
    "who is aman digital",
    "company",
    "agency",
    "where are you based",
    "where are you located",
    "shimla",
  ],

  GENERAL: [
    "help",
    "information",
    "information about",
    "tell me",
    "can you help",
  ],
};

function normalize(value: string): string {
  return value
    .toLowerCase()
    .replace(/[^\w\s₹/-]/gi, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function countMatches(
  message: string,
  keywords: string[],
): number {
  return keywords.reduce(
    (score, keyword) =>
      message.includes(keyword.toLowerCase())
        ? score + 1
        : score,
    0,
  );
}

/**
 * Detects the strongest likely intent.
 *
 * Important:
 * This is only a routing signal.
 * It must never be treated as the user's final intent
 * with absolute certainty.
 */
export function detectAMIIntent(
  message: string,
): AMIIntent {
  const normalized = normalize(message);

  if (!normalized) {
    return "UNKNOWN";
  }

  const scores = Object.entries(
    INTENT_KEYWORDS,
  ).map(([intent, keywords]) => ({
    intent: intent as AMIIntent,
    score: countMatches(
      normalized,
      keywords,
    ),
  }));

  scores.sort(
    (a, b) => b.score - a.score,
  );

  const best = scores[0];

  if (!best || best.score === 0) {
    return "UNKNOWN";
  }

  /*
   * High-priority commercial intents.
   * Example:
   * "I want to start a website, how much?"
   *
   * We want START_PROJECT rather than just PRICING.
   */
  if (
    normalized.includes("start my project") ||
    normalized.includes("start a project") ||
    normalized.includes("hire you") ||
    normalized.includes("build my website")
  ) {
    return "START_PROJECT";
  }

  if (
    normalized.includes("how much") ||
    normalized.includes("price") ||
    normalized.includes("pricing") ||
    normalized.includes("cost")
  ) {
    return "PRICING";
  }

  return best.intent;
}

/**
 * Useful for debugging and future analytics.
 */
export function getAMIIntentScores(
  message: string,
): Array<{
  intent: AMIIntent;
  score: number;
}> {
  const normalized = normalize(message);

  return Object.entries(
    INTENT_KEYWORDS,
  )
    .map(([intent, keywords]) => ({
      intent: intent as AMIIntent,
      score: countMatches(
        normalized,
        keywords,
      ),
    }))
    .filter(
      (item) => item.score > 0,
    )
    .sort(
      (a, b) => b.score - a.score,
    );
}