
import type {
  AMIAction,
  AMIActionType,
  AMIResponse,
  AMIResponseBlock,
} from "./types";

/* =========================================================
   AMI SECURITY — PUBLIC LINK VALIDATION
========================================================= */

const INTERNAL_ROUTES = new Set([
  "/",
  "/services",
  "/projects",
  "/pricing",
  "/faq",
  "/offers",
  "/contact",
  "/about",
  "/start-a-project",
  "/gallery",
  "/locations/shimla",
]);

const DYNAMIC_ROUTE_PREFIXES = [
  "/services/",
  "/projects/",
  "/offers/",
  "/faq/",
  "/gallery/",
];

const ALLOWED_EXTERNAL_HOSTS = new Set([
  "amandigitalsolutions.com",
  "www.amandigitalsolutions.com",
  "wa.me",
]);

const VALID_ACTION_TYPES = new Set<AMIActionType>([
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

const MAX_HREF_LENGTH = 2048;
const MAX_LABEL_LENGTH = 80;
const MAX_BLOCKS = 12;
const MAX_ACTIONS = 8;

function hasUnsafeCharacters(value: string): boolean {
  return (
    /[\u0000-\u001F\u007F]/.test(value) ||
    value.includes("\\")
  );
}

function cleanText(
  value: unknown,
  maxLength: number,
): string {
  if (typeof value !== "string") return "";
  return value.trim().slice(0, maxLength);
}

function cleanSlug(value: unknown): string | undefined {
  if (typeof value !== "string") return undefined;

  const slug = value.trim();

  if (
    slug.length === 0 ||
    slug.length > 150 ||
   
!/^[a-z0-9]+(?:-[a-z0-9]+)*$/i.test(slug)

  ) {
    return undefined;
  }

  return slug;
}

function cleanIdentifier(value: unknown): string | undefined {
  const cleaned = cleanText(value, 200);
  return cleaned || undefined;
}

function isSafeInternalPath(href: string): boolean {
  if (
    !href.startsWith("/") ||
    href.startsWith("//") ||
    hasUnsafeCharacters(href)
  ) {
    return false;
  }

  let parsed: URL;

  try {
    parsed = new URL(
      href,
      "https://amandigitalsolutions.com",
    );
  } catch {
    return false;
  }

  if (
    parsed.origin !== "https://amandigitalsolutions.com" ||
    parsed.username ||
    parsed.password
  ) {
    return false;
  }

  const pathname = parsed.pathname;

  if (/%2f|%5c/i.test(pathname)) {
    return false;
  }

  let decodedPathname: string;

  try {
    decodedPathname = decodeURIComponent(pathname);
  } catch {
    return false;
  }

  if (
    decodedPathname.includes("\\") ||
    decodedPathname.includes("//") ||
    decodedPathname.includes("%") ||
    decodedPathname.split("/").some(
      (segment) => segment === "." || segment === "..",
    )
  ) {
    return false;
  }

  if (INTERNAL_ROUTES.has(decodedPathname)) {
    return true;
  }

  return DYNAMIC_ROUTE_PREFIXES.some((prefix) => {
    if (!decodedPathname.startsWith(prefix)) {
      return false;
    }

    const slug = decodedPathname.slice(prefix.length);

    return (
      slug.length > 0 &&
      !slug.endsWith("/") &&
      !slug.includes("/")
    );
  });
}

function isSafeExternalUrl(href: string): boolean {
  if (hasUnsafeCharacters(href)) return false;

  try {
    const url = new URL(href);

    if (
      url.protocol !== "https:" ||
      url.username ||
      url.password ||
      !ALLOWED_EXTERNAL_HOSTS.has(
        url.hostname.toLowerCase(),
      )
    ) {
      return false;
    }

    if (url.port && url.port !== "443") {
      return false;
    }

    return true;
  } catch {
    return false;
  }
}

export function isSafeAMIHref(
  href: unknown,
): href is string {
  if (
    typeof href !== "string" ||
    href.length === 0 ||
    href.length > MAX_HREF_LENGTH
  ) {
    return false;
  }

  const value = href.trim();

  if (!value || hasUnsafeCharacters(value)) {
    return false;
  }

  return (
    isSafeInternalPath(value) ||
    isSafeExternalUrl(value)
  );
}

/* =========================================================
   ACTION SANITIZATION
========================================================= */

export function sanitizeAMIAction(
  input: AMIAction,
): AMIAction | null {
  if (
    !input ||
    typeof input !== "object" ||
    Array.isArray(input) ||
    !VALID_ACTION_TYPES.has(input.type)
  ) {
    return null;
  }

  const label = cleanText(input.label, MAX_LABEL_LENGTH);

  if (!label) return null;

  const safeAction: AMIAction = {
    type: input.type,
    label,
  };

  if (typeof input.href === "string") {
    if (!isSafeAMIHref(input.href)) {
      return null;
    }

    safeAction.href = input.href.trim();
  }

  const serviceId = cleanIdentifier(input.serviceId);
  const serviceSlug = cleanSlug(input.serviceSlug);
  const projectId = cleanIdentifier(input.projectId);
  const projectSlug = cleanSlug(input.projectSlug);
  const offerId = cleanIdentifier(input.offerId);
  const offerSlug = cleanSlug(input.offerSlug);

  if (serviceId) safeAction.serviceId = serviceId;
  if (serviceSlug) safeAction.serviceSlug = serviceSlug;
  if (projectId) safeAction.projectId = projectId;
  if (projectSlug) safeAction.projectSlug = projectSlug;
  if (offerId) safeAction.offerId = offerId;
  if (offerSlug) safeAction.offerSlug = offerSlug;

  return safeAction;
}

/* =========================================================
   RESPONSE BLOCK SANITIZATION
========================================================= */

function sanitizeBlockHref<T extends { href?: string }>(
  block: T,
): T | null {
  if (typeof block.href !== "string") {
    return block;
  }

  if (!isSafeAMIHref(block.href)) {
    return null;
  }

  return {
    ...block,
    href: block.href.trim(),
  };
}

function sanitizePrice(
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

function sanitizeAMIBlock(
  block: AMIResponseBlock,
): AMIResponseBlock | null {
  if (
    !block ||
    typeof block !== "object" ||
    Array.isArray(block)
  ) {
    return null;
  }

  if (block.type === "text") {
    const text = cleanText(block.text, 1800);

    return text ? { type: "text", text } : null;
  }

  if (block.type === "quick_actions") {
    if (!Array.isArray(block.actions)) {
      return null;
    }

    const actions = block.actions
      .map(sanitizeAMIAction)
      .filter(
        (action): action is AMIAction => action !== null,
      )
      .slice(0, 6);

    return actions.length > 0
      ? { type: "quick_actions", actions }
      : null;
  }

  if (
    block.type !== "service" &&
    block.type !== "project" &&
    block.type !== "pricing" &&
    block.type !== "offer"
  ) {
    return null;
  }

  const title = cleanText(block.title, 200);

  if (!title) return null;

 const description =
  "description" in block &&
  typeof block.description === "string"
    ? cleanText(block.description, 1000) || undefined
    : undefined;

  if (block.type === "service") {
    const startingPrice = sanitizePrice(block.startingPrice);
    const serviceId = cleanIdentifier(block.serviceId);
    const slug = cleanSlug(block.slug);

    const result = {
      type: "service" as const,
      title,
      ...(serviceId ? { serviceId } : {}),
      ...(slug ? { slug } : {}),
      ...(description ? { description } : {}),
      ...(startingPrice !== undefined
        ? { startingPrice }
        : {}),
      priceLabel:
        cleanText(block.priceLabel, 150) || undefined,
      href: block.href,
    };

    return sanitizeBlockHref(result);
  }

  if (block.type === "project") {
    const projectId = cleanIdentifier(block.projectId);
    const slug = cleanSlug(block.slug);

    const result = {
      type: "project" as const,
      title,
      ...(projectId ? { projectId } : {}),
      ...(slug ? { slug } : {}),
      ...(description ? { description } : {}),
      href: block.href,
    };

    return sanitizeBlockHref(result);
  }

  if (block.type === "pricing") {
    const price = sanitizePrice(block.price);

    const result = {
      type: "pricing" as const,
      title,
      ...(price !== undefined ? { price } : {}),
      priceLabel:
        cleanText(block.priceLabel, 150) || undefined,
      ...(description ? { description } : {}),
      href: block.href,
    };

    return sanitizeBlockHref(result);
  }

  const originalPrice = sanitizePrice(block.originalPrice);
  const offerPrice = sanitizePrice(block.offerPrice);
  const offerId = cleanIdentifier(block.offerId);
  const slug = cleanSlug(block.slug);

  const result = {
    type: "offer" as const,
    title,
    ...(offerId ? { offerId } : {}),
    ...(slug ? { slug } : {}),
    badge: cleanText(block.badge, 100) || undefined,
    shortDescription:
      cleanText(block.shortDescription, 1000) || undefined,
    ...(originalPrice !== undefined
      ? { originalPrice }
      : {}),
    ...(offerPrice !== undefined ? { offerPrice } : {}),
    discountLabel:
      cleanText(block.discountLabel, 100) || undefined,
    couponCode:
      cleanText(block.couponCode, 100) || undefined,
    href: block.href,
  };

  return sanitizeBlockHref(result);
}

/* =========================================================
   FINAL RESPONSE HARDENING
========================================================= */

export function secureAMIResponse(
  response: AMIResponse,
): AMIResponse {
  const actions = Array.isArray(response.actions)
    ? response.actions
        .map(sanitizeAMIAction)
        .filter(
          (action): action is AMIAction => action !== null,
        )
        .slice(0, MAX_ACTIONS)
    : [];

  const blocks = Array.isArray(response.blocks)
    ? response.blocks
        .map(sanitizeAMIBlock)
        .filter(
          (block): block is AMIResponseBlock => block !== null,
        )
        .slice(0, MAX_BLOCKS)
    : [];

  return {
    ...response,
    message:
      typeof response.message === "string"
        ? response.message.trim().slice(0, 1800)
        : "How can I help you?",
    actions,
    blocks,
    contextPatch: response.contextPatch,
    needsInput: response.needsInput === true,
    nextQuestion:
      typeof response.nextQuestion === "string"
        ? response.nextQuestion.trim().slice(0, 500) || null
        : null,
  };
}
