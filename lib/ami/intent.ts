import type { AMIIntent } from "./types";

type DetectableIntent = Exclude<AMIIntent, "UNKNOWN">;

const INTENT_KEYWORDS: Record<DetectableIntent, string[]> = {
  GREETING: [
    "hi", "hello", "hey", "hii", "hiii", "namaste", "hyy",
    "good morning", "good afternoon", "good evening",
    "kaise ho", "kya haal hai",
  ],

  SERVICE_DISCOVERY: [
    "services", "what do you offer", "what services do you provide",
    "what services do you offer", "what can you build",
    "what do you provide", "what do you do", "which services",
    "which solution", "website development", "web development",
    "ecommerce", "e commerce", "seo", "digital marketing",
    "lead generation", "business automation", "workflow systems",
    "website maintenance", "ui ux", "web hosting",
    "deployment management", "custom web application",
    "custom website", "online store", "online booking website",
    "kaunsi services", "kya services", "kya kya karte ho",
    "website banate ho", "app banate ho", "services batao",
    "website development services",
  ],

  SERVICE_DETAILS: [
    "tell me about", "explain", "details about", "more about",
    "what is included", "what's included", "what include", "what includes",
    "what does it include", "what is include", "what are included",
    "what's include in", "what include in", "what included in",
    "what is included in", "what does it include in", "what do you include",
    "what comes with", "what will be included", "what is part of",
    "what do i get", "what will i get", "features", "benefits",
    "your process", "how does it work", "how do you build", "how does seo work",
    "detail mein batao", "details batao", "kaise kaam karta hai",
    "kya kya milega", "isme kya milega", "isme kya included hai",
    "isme kya include hai", "kya kya included hai", "kya kya include hai",
    "kaise banate ho", "process kya hai", "kya features hain",
    "whats include", "whats included", "what s include", "what s included",
    "include in this", "included in this", "whats in this service",
    "isme kya hai", "kya include hai",
  ],

  PRICING: [
    "price", "pricing", "cost", "how much", "budget", "rate",
    "starting price", "starting from", "₹", "inr", "expensive",
    "cheap", "affordable", "under budget", "within my budget",
    "payment", "installment", "instalment", "payment methods",
    "how much does it cost", "kitna paisa", "kitne paise",
    "kitna kharcha", "kitne ka hai", "kya price hai",
    "price kya hai", "kitna charge", "charges kya hain",
    "kitni cost", "budget kitna", "sasta", "mehenga",
    "emi available", "kitne mein banegi",
    "kitne mein banega", "website ka rate", "website ki cost",
  ],

  PROJECT_DISCOVERY: [
    "projects", "portfolio", "your work",
    "previous work", "past work", "examples", "show me your work",
    "show projects", "client projects", "case studies", "case study",
    "websites you built", "websites you have built",
    "show me projects", "your completed work",
    "apna kaam dikhao", "kaam dikhao", "projects dikhao",
    "website examples", "demo dikhao", "portfolio dikhao",
    "banaye hue websites", "kya kya banaya hai",
  ],

  PROJECT_DETAILS: [
    "how did you build", "built with", "technology used",
    "tech stack", "project details", "project case study",
    "live website", "live project", "project url", "live link",
    "who was the client", "was it a real client",
    "is it a concept", "is this your own project",
    "project features", "which technology",
    "kis technology se", "kaise banaya", "client kaun tha",
    "live link bhejo", "source code",
  ],

  FAQ: [
    "faq", "faqs", "frequently asked", "how long",
    "turnaround", "domain", "hosting", "support",
    "maintenance", "is it safe",
    "how does whatsapp", "whatsapp api", "do i need an api",
    "do i need to pay", "how do i contact support",
    "kitna time lagega", "kitne din lagenge",
    "kitna samay", "support milega", "revision milegi",
  ],

  OFFER: ["offers", "any offer", "discount", "coupon", "promo code", "koi offer", "koi discount"],

  START_PROJECT: [
    "start project", "start a project", "start my project",
    "build my website", "build me a website",
    "i want a website", "i need a website", "i want to hire you",
    "hire you", "work with you", "get started", "let's start",
    "lets start", "book a project", "place an enquiry",
    "place an inquiry", "create my website", "make my website",
    "i want to get started", "i want to start", "let's build",
    "lets build", "i am ready to start", "i'm ready to start",
    "start my website", "mujhe website banwani hai",
    "website banwaani hai", "website banwani hai",
    "mujhe website banani hai", "website banani hai",
    "mujhe website chahiye", "mere liye website chahiye",
    "website banwa do", "website banake do",
    "website banani hai mere business ke liye",
    "project shuru karna", "kaam shuru karna",
    "project start karna", "mujhe hire karna hai",
    "mere liye website banao", "enquiry karni hai",
    "project dena hai", "website banane ka kaam dena hai",
    "website banane ke liye contact", "mujhe kaam start karna hai",
  ],

  CONTACT: [
    "contact", "contact you", "phone number", "call you",
    "email address", "whatsapp number", "reach you",
    "talk to you", "speak with you", "business hours",
    "your address", "your location", "contact details",
    "contact information", "your phone", "your email",
    "whatsapp link", "contact number", "number bhejo",
    "phone number bhejo", "baat kaise karein",
    "contact kaise karein", "whatsapp karo",
  ],

  ABOUT: [
    "about you", "about aman digital", "who are you",
    "who is aman digital", "about the company",
    "about your company", "about your agency",
    "your company", "your agency", "where are you based",
    "where are you located", "who founded", "who is the founder",
    "about aman", "tell me about your business",
    "aap kaun ho", "company ke baare mein",
    "agency ke baare mein", "founder kaun hai",
    "kahan located ho",
  ],

  REVIEWS: ["reviews", "review", "testimonials", "client feedback", "ratings"],
  GALLERY: ["gallery", "visuals", "design samples"],
  POLICY: ["terms and conditions", "privacy policy", "refund policy", "payment terms", "payment structure"],
  BLOG: ["blog", "blogs", "articles", "article", "guides"],

  GENERAL: [
    "help", "information", "information about",
    "tell me", "can you help", "madad karo",
    "help chahiye", "batao", "samjhao",
  ],
};

function normalize(value: string): string {
  return value
    .toLowerCase()
    .normalize("NFKC")
    .replace(/[’‘]/g, "'")
    .replace(/[^\p{L}\p{N}\s₹/-]/gu, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function includesPhrase(message: string, phrase: string): boolean {
  const normalizedMessage = normalize(message);
  const normalizedPhrase = normalize(phrase);

  if (!normalizedMessage || !normalizedPhrase) return false;

  return ` ${normalizedMessage} `.includes(` ${normalizedPhrase} `);
}

function countMatches(message: string, keywords: string[]): number {
  return keywords.reduce(
    (score, keyword) => score + (includesPhrase(message, keyword) ? 1 : 0),
    0,
  );
}

function hasAnyPhrase(message: string, phrases: string[]): boolean {
  return phrases.some((phrase) => includesPhrase(message, phrase));
}

/* "what do you offer" is a services question, not an offers question. */
function isOfferQuery(n: string): boolean {
  if (/\b(you|we|ads|ami) offer\b/.test(n) && !/\boffers\b/.test(n)) {
    return /\b(discount|coupon|promo|deal|deals)\b/.test(n);
  }

  return /\b(offers?|discounts?|coupons?|promo|deals|koi offer|koi discount)\b/.test(n);
}

const FAQ_PRIORITY_PHRASES = ["whatsapp api", "do i need an api"];

const POLICY_PRIORITY_PHRASES = [
  "terms and conditions", "term and conditions", "terms conditions",
  "terms of service", "terms of use", "your terms", "your term",
  "privacy policy", "refund policy", "cookie policy",
  "payment structure", "payment terms", "advance payment", "full payment",
  "pay full", "pay in advance", "payment kaise", "advance kitna",
  "revision policy", "how many revisions", "who owns the website",
  "cancellation policy", "cancel project",
];

const BLOG_PRIORITY_PHRASES = [
  "blog", "blogs", "article", "articles", "any guide", "guides", "insights",
];

const CONTACT_PRIORITY_PHRASES = [
  "contact details", "contact information", "phone number", "call you",
  "email address", "whatsapp number", "reach you", "business hours",
  "your address", "contact you", "your phone", "your email",
  "number bhejo", "contact kaise karein", "contact number", "contact",
];

const ABOUT_PRIORITY_PHRASES = [
  "about you", "about aman digital", "who are you", "who is aman digital",
  "about your company", "about your agency", "who founded", "who is the founder",
  "where are you based", "where are you located", "tell me about your business",
  "aap kaun ho", "who is aman", "who is aman ansari", "about aman ansari",
  "aman kaun", "founder", "owner", "hobbies", "hobby", "since when",
  "kitna purana", "how old is", "what are you", "tum kaun", "about the company",
  "what is aman digital solutions", "what is ads",
];

const REVIEWS_PRIORITY_PHRASES = [
  "reviews", "review", "testimonials", "testimonial", "client feedback",
  "client reviews", "what clients say", "can i trust", "how can i trust",
  "is it genuine", "genuine", "legit",
];

const GALLERY_PRIORITY_PHRASES = ["gallery", "visuals", "design samples", "screenshots"];

const PRICING_PRIORITY_PHRASES = [
  "how much", "price", "pricing", "cost", "starting price", "starting from",
  "₹", "inr", "under budget", "within my budget", "affordable", "expensive",
  "cheap", "payment", "installment", "instalment", "payment methods",
  "kitna paisa", "kitne paise", "kitna kharcha", "kitne ka hai",
  "price kya hai", "kitna charge", "charges kya hain", "kitni cost",
  "budget kitna", "sasta", "mehenga", "emi available", "website ka rate",
  "website ki cost",
];

const PROJECT_DETAIL_PHRASES = [
  "project details", "project case study", "tech stack", "technology used",
  "built with", "live project", "live website", "project url", "live link",
  "who was the client", "was it a real client", "is it a concept",
  "is this your own project", "project features", "which technology",
  "kis technology se", "kaise banaya", "client kaun tha", "live link bhejo",
  "source code",
];

const PROJECT_DISCOVERY_PHRASES = [
  "portfolio", "show projects", "show me your work", "previous work",
  "past work", "case studies", "client projects", "websites you built",
  "websites you have built", "show me projects", "your completed work",
  "apna kaam dikhao", "kaam dikhao", "projects dikhao", "demo dikhao",
  "portfolio dikhao", "give me your projects", "your projects", "any project",
  "best project", "recent project", "sample project", "project sample",
];

const START_PROJECT_PHRASES = [
  "start my project", "start a project", "i want to hire you", "hire you",
  "work with you", "book a project", "place an enquiry", "place an inquiry",
  "i want to get started", "i am ready to start", "i'm ready to start",
  "get started", "let's start", "lets start", "project shuru karna",
  "kaam shuru karna", "project start karna", "enquiry karni hai",
  "project dena hai", "mujhe website banwani hai", "website banwaani hai",
  "website banwani hai", "mujhe website banani hai", "website banani hai",
  "mujhe website chahiye", "mere liye website chahiye", "website banwa do",
  "website banake do", "mere liye website banao", "mujhe hire karna hai",
  "how can i start", "how to start my project",
];

export function getAMIIntentScores(
  message: string,
): Array<{ intent: AMIIntent; score: number }> {
  const normalized = normalize(message);

  if (!normalized) return [];

  return (Object.entries(INTENT_KEYWORDS) as [DetectableIntent, string[]][])
    .map(([intent, keywords]) => ({
      intent,
      score: countMatches(normalized, keywords),
    }))
    .filter((item) => item.score > 0)
    .sort((a, b) => b.score - a.score);
}

export function detectAMIIntent(message: string): AMIIntent {
  const normalized = normalize(message);

  if (!normalized) return "UNKNOWN";

  if (hasAnyPhrase(normalized, FAQ_PRIORITY_PHRASES)) return "FAQ";
  if (hasAnyPhrase(normalized, POLICY_PRIORITY_PHRASES)) return "POLICY";
  if (hasAnyPhrase(normalized, BLOG_PRIORITY_PHRASES)) return "BLOG";
  if (isOfferQuery(normalized)) return "OFFER";
  if (hasAnyPhrase(normalized, CONTACT_PRIORITY_PHRASES)) return "CONTACT";
  if (hasAnyPhrase(normalized, ABOUT_PRIORITY_PHRASES)) return "ABOUT";
  if (hasAnyPhrase(normalized, REVIEWS_PRIORITY_PHRASES)) return "REVIEWS";

  // Short "gallery" questions only; long project requests that mention
  // a gallery stay project requests.
  if (
    normalized.split(" ").length <= 8 &&
    hasAnyPhrase(normalized, GALLERY_PRIORITY_PHRASES)
  ) {
    return "GALLERY";
  }

  const detailsScore = countMatches(normalized, INTENT_KEYWORDS.SERVICE_DETAILS);
  const serviceScore = countMatches(normalized, INTENT_KEYWORDS.SERVICE_DISCOVERY);

  // "what's included and what's the price" -> details (price is shown there too)
  if (detailsScore > 0 && hasAnyPhrase(normalized, PRICING_PRIORITY_PHRASES)) {
    return "SERVICE_DETAILS";
  }

  if (hasAnyPhrase(normalized, PRICING_PRIORITY_PHRASES)) return "PRICING";
  if (hasAnyPhrase(normalized, PROJECT_DETAIL_PHRASES)) return "PROJECT_DETAILS";
  if (hasAnyPhrase(normalized, PROJECT_DISCOVERY_PHRASES)) return "PROJECT_DISCOVERY";
  if (hasAnyPhrase(normalized, START_PROJECT_PHRASES)) return "START_PROJECT";

  if (detailsScore > 0 && detailsScore >= serviceScore) return "SERVICE_DETAILS";
  if (serviceScore > 0) return "SERVICE_DISCOVERY";

  if (
    normalized.split(" ").length <= 4 &&
    hasAnyPhrase(normalized, INTENT_KEYWORDS.GREETING)
  ) {
    return "GREETING";
  }

  const scores = getAMIIntentScores(normalized);

  return scores.length === 0 ? "UNKNOWN" : scores[0].intent;
}