import type {
  AMIAction,
  AMIResponse,
} from "./types";

/* =========================================================
   AMI SECURITY
========================================================= */

const INTERNAL_ROUTES = new Set([
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

const ALLOWED_EXTERNAL_HOSTS =
  new Set([
    "amandigitalsolutions.com",
    "www.amandigitalsolutions.com",
    "wa.me",
  ]);

function isSafeInternalPath(
  href: string,
): boolean {
  if (!href.startsWith("/")) {
    return false;
  }

  if (
    href.startsWith("//") ||
    href.includes("\n") ||
    href.includes("\r")
  ) {
    return false;
  }

  const pathname =
    href.split("?")[0];

  if (
    INTERNAL_ROUTES.has(
      pathname,
    )
  ) {
    return true;
  }

  /*
   * Dynamic public routes.
   */
  const dynamicPrefixes = [
    "/services/",
    "/projects/",
    "/offers/",
    "/faq/",
    "/gallery/",
  ];

  return dynamicPrefixes.some(
    (prefix) =>
      pathname.startsWith(
        prefix,
      ),
  );
}

function isSafeExternalUrl(
  href: string,
): boolean {
  try {
    const url =
      new URL(href);

    if (
      url.protocol !==
      "https:"
    ) {
      return false;
    }

    return ALLOWED_EXTERNAL_HOSTS.has(
      url.hostname.toLowerCase(),
    );
  } catch {
    return false;
  }
}

export function isSafeAMIHref(
  href: unknown,
): href is string {
  if (
    typeof href !== "string"
  ) {
    return false;
  }

  const value =
    href.trim();

  if (!value) {
    return false;
  }

  if (
    isSafeInternalPath(
      value,
    )
  ) {
    return true;
  }

  return isSafeExternalUrl(
    value,
  );
}

/**
 * Sanitizes one AI-generated action.
 */
export function sanitizeAMIAction(
  action: AMIAction,
): AMIAction | null {
  if (!action) {
    return null;
  }

  const href =
    typeof action.href ===
    "string"
      ? action.href.trim()
      : undefined;

  if (
    href &&
    !isSafeAMIHref(href)
  ) {
    return {
      ...action,
      href: undefined,
    };
  }

  return {
    ...action,
    label:
      typeof action.label ===
      "string"
        ? action.label
            .trim()
            .slice(0, 80)
        : action.label,
  };
}

/**
 * Final response hardening.
 *
 * This runs AFTER AI response normalization.
 */
export function secureAMIResponse(
  response: AMIResponse,
): AMIResponse {
  const safeActions =
    Array.isArray(
      response.actions,
    )
      ? response.actions
          .map(
            sanitizeAMIAction,
          )
          .filter(
            (
              action,
            ): action is AMIAction =>
              Boolean(action),
          )
          .slice(0, 6)
      : [];

const safeBlocks =
  Array.isArray(response.blocks)
    ? response.blocks
        .slice(0, 8)
        .map((block) => {
          if (
            !block ||
            typeof block !== "object"
          ) {
            return null;
          }

          if (
            "href" in block &&
            typeof block.href === "string" &&
            !isSafeAMIHref(block.href)
          ) {
            const {
              href: _unsafeHref,
              ...safeBlock
            } = block;

            return safeBlock;
          }

          return block;
        })
        .filter(
          (
            block,
          ): block is NonNullable<
            typeof block
          > => block !== null,
        )
    : [];

  return {
    ...response,

    message:
      typeof response.message ===
      "string"
        ? response.message
            .trim()
            .slice(0, 1800)
        : "How can I help you?",

    actions:
      safeActions,

    blocks:
      safeBlocks,

    nextQuestion:
      typeof response.nextQuestion ===
      "string"
        ? response.nextQuestion
            .trim()
            .slice(0, 500)
        : null,
  };
}