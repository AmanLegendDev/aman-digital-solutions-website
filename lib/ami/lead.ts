
import type {
  AMIConversationContext,
  AMIMessage,
} from "./types";

export type AMILeadProfile = {
  name?: string;
  companyName?: string;
  email?: string;
  phone?: string;
  location?: string;

  service?: string;
  serviceSlug?: string;

  projectType?: string;
  projectDescription?: string;

  timeline?: string;
  budget?: string;

  currentWebsite?: string;

  requiredPages?: string[];
  requiredFeatures?: string[];

  preferredContactMethod?: string;

  qualificationScore?: number;
};

const EMPTY_PROFILE: AMILeadProfile = {};

function cleanString(
  value: unknown,
  maxLength = 300
): string | undefined {
  if (typeof value !== "string") return undefined;

  const valueTrimmed = value.trim();

  if (!valueTrimmed) return undefined;

  return valueTrimmed.slice(0, maxLength);
}

function cleanStringArray(
  value: unknown,
  maxItems = 15
): string[] | undefined {
  if (!Array.isArray(value)) return undefined;

  const items = value
    .filter(
      (item): item is string =>
        typeof item === "string"
    )
    .map((item) => item.trim())
    .filter(Boolean)
    .slice(0, maxItems);

  return items.length ? items : undefined;
}

function cleanProfile(
  profile: AMILeadProfile
): AMILeadProfile {
  const result: AMILeadProfile = {};

  const fields: Array<
    keyof AMILeadProfile
  > = [
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

  for (const field of fields) {
    const value = cleanString(
      profile[field]
    );

    if (value) {
      result[field] = value as never;
    }
  }

  const requiredPages =
    cleanStringArray(
      profile.requiredPages
    );

  const requiredFeatures =
    cleanStringArray(
      profile.requiredFeatures
    );

  if (requiredPages) {
    result.requiredPages =
      requiredPages;
  }

  if (requiredFeatures) {
    result.requiredFeatures =
      requiredFeatures;
  }

  return result;
}

function mergeProfiles(
  current: AMILeadProfile,
  patch: Partial<AMILeadProfile>
): AMILeadProfile {
  return cleanProfile({
    ...current,
    ...patch,
  });
}

function extractEmail(
  text: string
): string | undefined {
  const match = text.match(
    /\b[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}\b/i
  );

  return match?.[0];
}

function extractPhone(
  text: string
): string | undefined {
  const match = text.match(
    /(?:\+91[\s-]?)?[6-9]\d{9}\b/
  );

  return match?.[0];
}

function extractWebsite(
  text: string
): string | undefined {
  const match = text.match(
    /\b(?:https?:\/\/)?(?:www\.)?[a-z0-9-]+\.[a-z]{2,}(?:\/[^\s]*)?\b/i
  );

  return match?.[0];
}

function looksLikeName(
  text: string
): boolean {
  const cleaned = text
    .trim()
    .replace(/[.,!?]/g, "");

  if (!cleaned) return false;

  const words = cleaned.split(/\s+/);

  if (words.length > 4) return false;

  return words.every((word) =>
    /^[a-zA-Z\u0900-\u097F'-]+$/.test(
      word
    )
  );
}

export function extractLeadSignals(
  text: string
): Partial<AMILeadProfile> {
  const patch: Partial<AMILeadProfile> = {};

  const email = extractEmail(text);

  if (email) {
    patch.email = email;
  }

  const phone = extractPhone(text);

  if (phone) {
    patch.phone = phone;
  }

  const website =
    extractWebsite(text);

  if (website) {
    patch.currentWebsite = website;
  }

  return patch;
}

export function mergeLeadContext(
  context: AMIConversationContext | undefined,
  patch: Partial<AMILeadProfile>
): AMIConversationContext {
  const currentProfile =
    (context?.leadProfile ||
      {}) as AMILeadProfile;

  const mergedProfile =
    mergeProfiles(
      currentProfile,
      patch
    );

  return {
    ...context,
    leadProfile: mergedProfile,
  };
}

export function buildLeadProfileFromConversation(
  messages: AMIMessage[],
  context?: AMIConversationContext
): AMILeadProfile {
  let profile =
    (context?.leadProfile ||
      {}) as AMILeadProfile;

  for (const message of messages) {
    if (message.role !== "user") {
      continue;
    }

    profile = mergeProfiles(
      profile,
      extractLeadSignals(
        message.content
      )
    );
  }

  return profile;
}

export function calculateQualificationScore(
  profile: AMILeadProfile
): number {
  const checks: Array<
    keyof AMILeadProfile
  > = [
    "name",
    "companyName",
    "service",
    "projectDescription",
    "timeline",
    "budget",
    "phone",
    "email",
  ];

  const completed = checks.filter(
    (field) => {
      const value =
        profile[field];

      return (
        typeof value === "string" &&
        value.trim().length > 0
      );
    }
  ).length;

  return Math.round(
    (completed / checks.length) *
      100
  );
}

export function getMissingLeadFields(
  profile: AMILeadProfile
): Array<keyof AMILeadProfile> {
  const priority: Array<
    keyof AMILeadProfile
  > = [
    "name",
    "companyName",
    "service",
    "projectDescription",
    "timeline",
    "budget",
    "phone",
    "email",
  ];

  return priority.filter(
    (field) => {
      const value =
        profile[field];

      return !(
        typeof value === "string" &&
        value.trim()
      );
    }
  );
}

export function prepareLeadContext(
  context: AMIConversationContext | undefined,
  messages: AMIMessage[]
): AMIConversationContext {
  const profile =
    buildLeadProfileFromConversation(
      messages,
      context
    );

  const qualificationScore =
    calculateQualificationScore(
      profile
    );

  return {
    ...context,
    leadProfile: {
      ...profile,
      qualificationScore,
    },
  };
}