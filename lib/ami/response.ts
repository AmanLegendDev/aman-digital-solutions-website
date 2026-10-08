import type {
  AMIAction,
  AMIConversationContext,
  AMIIntent,
  AMIResponse,
  AMIResponseBlock,
} from "./types";

const VALID_INTENTS: AMIIntent[] = [
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
];

const VALID_ACTIONS = new Set([
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

function cleanText(
  value: unknown,
  max = 1200,
): string {
  if (typeof value !== "string") {
    return "";
  }

  return value
    .trim()
    .slice(0, max);
}

function cleanArray(
  value: unknown,
  maxItems = 8,
): string[] {
  if (!Array.isArray(value)) {
    return [];
  }

  return value
    .filter(
      (item): item is string =>
        typeof item === "string",
    )
    .map((item) =>
      cleanText(item, 300),
    )
    .filter(Boolean)
    .slice(0, maxItems);
}

function sanitizeContextPatch(
  value: unknown,
): AMIConversationContext {
  if (
    !value ||
    typeof value !== "object" ||
    Array.isArray(value)
  ) {
    return {};
  }

  const raw =
    value as Record<
      string,
      unknown
    >;

  const leadRaw =
    raw.leadProfile;

  const leadProfile =
    leadRaw &&
    typeof leadRaw === "object" &&
    !Array.isArray(leadRaw)
      ? (leadRaw as Record<
          string,
          unknown
        >)
      : {};

  const result: AMIConversationContext =
    {};

  const stringFields = [
    "selectedServiceSlug",
    "selectedProjectSlug",
    "selectedOfferSlug",
    "lastIntent",
    "conversationStage",
  ];

  for (const field of stringFields) {
    const item = cleanText(
      raw[field],
      200,
    );

    if (item) {
      (
        result as Record<
          string,
          unknown
        >
      )[field] = item;
    }
  }

  const allowedLeadFields = [
    "name",
    "companyName",
    "email",
    "phone",
    "location",
    "service",
    "serviceSlug",
    "projectType",
    "projectDescription",
    "timeline",
    "budget",
    "currentWebsite",
    "preferredContactMethod",
  ];

  const safeLead: Record<
    string,
    unknown
  > = {};

  for (const field of allowedLeadFields) {
    const item = cleanText(
      leadProfile[field],
      field ===
        "projectDescription"
        ? 1000
        : 300,
    );

    if (item) {
      safeLead[field] = item;
    }
  }

  if (
    Array.isArray(
      leadProfile.requiredPages,
    )
  ) {
    safeLead.requiredPages =
      cleanArray(
        leadProfile.requiredPages,
        15,
      );
  }

  if (
    Array.isArray(
      leadProfile.requiredFeatures,
    )
  ) {
    safeLead.requiredFeatures =
      cleanArray(
        leadProfile.requiredFeatures,
        15,
      );
  }

  if (
    typeof leadProfile.qualificationScore ===
    "number"
  ) {
    safeLead.qualificationScore =
      Math.max(
        0,
        Math.min(
          100,
          Math.round(
            leadProfile.qualificationScore,
          ),
        ),
      );
  }

  if (
    Object.keys(safeLead).length > 0
  ) {
    result.leadProfile =
      safeLead as AMIConversationContext["leadProfile"];
  }

  return result;
}

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

  const action =
    value as Record<
      string,
      unknown
    >;

  const type =
    typeof action.type === "string"
      ? action.type
      : "NONE";

  if (!VALID_ACTIONS.has(type)) {
    return null;
  }

  const label = cleanText(
    action.label,
    100,
  );

  if (!label) {
    return null;
  }

  const href =
    typeof action.href === "string"
      ? action.href
      : undefined;

  return {
    type: type as AMIAction["type"],
    label,
    href,
  };
}

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

  const block =
    value as Record<
      string,
      unknown
    >;

  const type =
    typeof block.type === "string"
      ? block.type
      : "";

  if (!VALID_BLOCKS.has(type)) {
    return null;
  }

  return block as unknown as AMIResponseBlock;
}

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

  const raw =
    input as Record<
      string,
      unknown
    >;

  const message =
    cleanText(
      raw.message,
      1600,
    ) ||
    "Tell me what you're looking to build and I’ll help you find the right solution.";

  const intent =
    typeof raw.intent === "string" &&
    VALID_INTENTS.includes(
      raw.intent as AMIIntent,
    )
      ? (raw.intent as AMIIntent)
      : "UNKNOWN";

  const blocks = Array.isArray(
    raw.blocks,
  )
    ? raw.blocks
        .map(sanitizeBlock)
        .filter(
          (
            block,
          ): block is AMIResponseBlock =>
            Boolean(block),
        )
        .slice(0, 8)
    : [];

  const actions = Array.isArray(
    raw.actions,
  )
    ? raw.actions
        .map(sanitizeAction)
        .filter(
          (
            action,
          ): action is AMIAction =>
            Boolean(action),
        )
        .slice(0, 8)
    : [];

  const nextQuestion =
    cleanText(
      raw.nextQuestion,
      500,
    ) || null;

  const needsInput =
    raw.needsInput === true;

  const contextPatch =
    sanitizeContextPatch(
      raw.contextPatch,
    );

  return {
    message,
    intent,
    blocks,
    actions,
    contextPatch,
    needsInput,
    nextQuestion,
  };
}

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