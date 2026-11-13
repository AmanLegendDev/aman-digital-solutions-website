import type {
  AMIAction,
  AMIActionType,
  AMIResponse,
  AMIResponseBlock,
} from "./types";

import { isSafeImageUrl, isSafeLiveUrl } from "./urls";

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
  "/reviews",
  "/privacy",
  "/terms",
  "/blog",
  "/locations",
  "/locations/shimla",
]);

const DYNAMIC_ROUTE_PREFIXES = [
  "/services/",
  "/projects/",
  "/offers/",
  "/faq/",
  "/gallery/",
  "/blog/",
  "/locations/",
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
  return /[\u0000-\u001F\u007F]/.test(value) || value.includes("\\");
}

function cleanText(value: unknown, maxLength: number): string {
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
    parsed = new URL(href, "https://amandigitalsolutions.com");
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

  if (/%2f|%5c/i.test(pathname)) return false;

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
    decodedPathname.split("/").some((s) => s === "." || s === "..")
  ) {
    return false;
  }

  if (INTERNAL_ROUTES.has(decodedPathname)) return true;

  return DYNAMIC_ROUTE_PREFIXES.some((prefix) => {
    if (!decodedPathname.startsWith(prefix)) return false;

    const slug = decodedPathname.slice(prefix.length);

    return slug.length > 0 && !slug.endsWith("/") && !slug.includes("/");
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
      !ALLOWED_EXTERNAL_HOSTS.has(url.hostname.toLowerCase())
    ) {
      return false;
    }

    if (url.port && url.port !== "443") return false;

    return true;
  } catch {
    return false;
  }
}

export function isSafeAMIHref(href: unknown): href is string {
  if (
    typeof href !== "string" ||
    href.length === 0 ||
    href.length > MAX_HREF_LENGTH
  ) {
    return false;
  }

  const value = href.trim();

  if (!value || hasUnsafeCharacters(value)) return false;

  return isSafeInternalPath(value) || isSafeExternalUrl(value);
}

/* =========================================================
   ACTION SANITIZATION
========================================================= */

export function sanitizeAMIAction(input: AMIAction): AMIAction | null {
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

  const safeAction: AMIAction = { type: input.type, label };

  if (typeof input.href === "string") {
    if (!isSafeAMIHref(input.href)) return null;

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
   BLOCK SANITIZATION
   (field cleaning happens in response.ts; here we re-check
   every link and image before anything reaches the browser)
========================================================= */

function sanitizeAMIBlock(block: AMIResponseBlock): AMIResponseBlock | null {
  if (!block || typeof block !== "object" || Array.isArray(block)) {
    return null;
  }

  if (block.type === "text") {
    const text = cleanText(block.text, 1800);

    return text ? { type: "text", text } : null;
  }

  if (block.type === "quick_actions") {
    if (!Array.isArray(block.actions)) return null;

    const actions = block.actions
      .map(sanitizeAMIAction)
      .filter((action): action is AMIAction => action !== null)
      .slice(0, 6);

    return actions.length > 0 ? { type: "quick_actions", actions } : null;
  }

  const safe: Record<string, any> = { ...block };

  if (typeof safe.href === "string") {
    if (!isSafeAMIHref(safe.href)) return null;

    safe.href = safe.href.trim();
  }

  if (safe.liveUrl !== undefined && !isSafeLiveUrl(safe.liveUrl)) {
    delete safe.liveUrl;
  }

  if (safe.imageUrl !== undefined && !isSafeImageUrl(safe.imageUrl)) {
    delete safe.imageUrl;
  }

  if (Array.isArray(safe.images)) {
    safe.images = safe.images.filter(
      (image: { url?: unknown }) => image && isSafeImageUrl(image.url),
    );

    if (safe.type === "gallery" && safe.images.length === 0) return null;
  }

  return safe as AMIResponseBlock;
}

/* =========================================================
   FINAL RESPONSE HARDENING
========================================================= */

export function secureAMIResponse(response: AMIResponse): AMIResponse {
  const actions = Array.isArray(response.actions)
    ? response.actions
        .map(sanitizeAMIAction)
        .filter((action): action is AMIAction => action !== null)
        .slice(0, MAX_ACTIONS)
    : [];

  const blocks = Array.isArray(response.blocks)
    ? response.blocks
        .map(sanitizeAMIBlock)
        .filter((block): block is AMIResponseBlock => block !== null)
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