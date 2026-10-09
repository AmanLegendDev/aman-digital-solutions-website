
import type {
  AMIConversationContext,
  AMIMessage,
} from "./types";

/* =========================================================
   AMI — LEAD PROFILE & QUALIFICATION
========================================================= */

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

const PROFILE_STRING_FIELDS = [
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
] as const satisfies readonly (keyof AMILeadProfile)[];

const QUALIFICATION_FIELDS = [
  "name",
  "companyName",
  "service",
  "projectDescription",
  "timeline",
  "budget",
  "phone",
  "email",
] as const satisfies readonly (keyof AMILeadProfile)[];

/* =========================================================
   SANITIZATION
========================================================= */

function cleanString(
  value: unknown,
  maxLength = 300,
): string | undefined {
  if (typeof value !== "string") return undefined;

  const cleaned = value.trim().slice(0, maxLength);

  return cleaned || undefined;
}

function cleanStringArray(
  value: unknown,
  maxItems = 15,
): string[] | undefined {
  if (!Array.isArray(value)) return undefined;

  const items = value
    .filter((item): item is string => typeof item === "string")
    .map((item) => item.trim().slice(0, 150))
    .filter(Boolean)
    .slice(0, maxItems);

  return items.length > 0 ? items : undefined;
}

function cleanProfile(
  profile: Partial<AMILeadProfile>,
): AMILeadProfile {
  const result: AMILeadProfile = {};

  for (const field of PROFILE_STRING_FIELDS) {
    const value = cleanString(profile[field]);

    if (value) {
      Object.assign(result, { [field]: value });
    }
  }

  const requiredPages = cleanStringArray(profile.requiredPages);
  const requiredFeatures = cleanStringArray(profile.requiredFeatures);

  if (requiredPages) result.requiredPages = requiredPages;
  if (requiredFeatures) result.requiredFeatures = requiredFeatures;

  if (
    typeof profile.qualificationScore === "number" &&
    Number.isFinite(profile.qualificationScore)
  ) {
    result.qualificationScore = Math.max(
      0,
      Math.min(100, Math.round(profile.qualificationScore)),
    );
  }

  return result;
}

function mergeProfiles(
  current: Partial<AMILeadProfile>,
  patch: Partial<AMILeadProfile>,
): AMILeadProfile {
  return cleanProfile({
    ...current,
    ...patch,
  });
}

/**
 * Fill only missing values.
 * Existing known information is not overwritten by older messages.
 */
function fillMissingProfile(
  current: AMILeadProfile,
  patch: Partial<AMILeadProfile>,
): AMILeadProfile {
  const cleanedPatch = cleanProfile(patch);
  const result: AMILeadProfile = { ...current };

  for (const field of PROFILE_STRING_FIELDS) {
    if (!result[field] && cleanedPatch[field]) {
      Object.assign(result, {
        [field]: cleanedPatch[field],
      });
    }
  }

  if (!result.requiredPages && cleanedPatch.requiredPages) {
    result.requiredPages = cleanedPatch.requiredPages;
  }

  if (!result.requiredFeatures && cleanedPatch.requiredFeatures) {
    result.requiredFeatures = cleanedPatch.requiredFeatures;
  }

  return cleanProfile(result);
}

/* =========================================================
   CONTACT SIGNAL EXTRACTION
========================================================= */

function extractEmail(text: string): string | undefined {
  const match = text.match(
    /\b[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}\b/i,
  );

  return match?.[0];
}

function extractPhone(text: string): string | undefined {
  const match = text.match(
    /(?:\+91[\s-]?)?[6-9]\d{9}\b/,
  );

  return match?.[0];
}

function extractWebsite(text: string): string | undefined {
  // Remove email addresses before searching for a website.
  // This prevents "aman@gmail.com" from being treated as "gmail.com".
  const textWithoutEmails = text.replace(
    /\b[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}\b/gi,
    " ",
  );

  const match = textWithoutEmails.match(
    /\b(?:https?:\/\/|www\.)[a-z0-9-]+(?:\.[a-z0-9-]+)+(?:\/[^\s]*)?|\b[a-z0-9-]+(?:\.[a-z0-9-]+)+(?:\/[^\s]*)?/i,
  );

  const website = match?.[0]?.replace(/[.,!?;]+$/, "");

  if (!website) return undefined;

  // Avoid accepting common file-like or incomplete values.
  if (website.includes("@")) return undefined;

  return website;
}

export function extractLeadSignals(
  text: string,
): Partial<AMILeadProfile> {
  const patch: Partial<AMILeadProfile> = {};

  const email = extractEmail(text);
  const phone = extractPhone(text);
  const website = extractWebsite(text);

  if (email) patch.email = email;
  if (phone) patch.phone = phone;
  if (website) patch.currentWebsite = website;

  return patch;
}

/* =========================================================
   CONTEXT MERGING
========================================================= */

export function mergeLeadContext(
  context: AMIConversationContext | undefined,
  patch: Partial<AMILeadProfile>,
): AMIConversationContext {
  const currentProfile = cleanProfile(
    context?.leadProfile as Partial<AMILeadProfile> | undefined ?? {},
  );

  const mergedProfile = mergeProfiles(currentProfile, patch);

  return {
    ...context,
    leadProfile: mergedProfile,
  };
}

export function buildLeadProfileFromConversation(
  messages: AMIMessage[],
  context?: AMIConversationContext,
): AMILeadProfile {
  let profile = cleanProfile(
    context?.leadProfile as Partial<AMILeadProfile> | undefined ?? {},
  );

  // Scan newest user messages first so older contact details
  // do not overwrite information supplied more recently.
  for (const message of [...messages].reverse()) {
    if (message.role !== "user") continue;

    profile = fillMissingProfile(
      profile,
      extractLeadSignals(message.content),
    );
  }

  return profile;
}

/* =========================================================
   LEAD QUALIFICATION
========================================================= */

export function calculateQualificationScore(
  profile: AMILeadProfile,
): number {
  const completed = QUALIFICATION_FIELDS.filter((field) => {
    const value = profile[field];

    return typeof value === "string" && value.trim().length > 0;
  }).length;

  return Math.round(
    (completed / QUALIFICATION_FIELDS.length) * 100,
  );
}

export function getMissingLeadFields(
  profile: AMILeadProfile,
): Array<keyof AMILeadProfile> {
  return QUALIFICATION_FIELDS.filter((field) => {
    const value = profile[field];

    return !(typeof value === "string" && value.trim().length > 0);
  });
}

export function prepareLeadContext(
  context: AMIConversationContext | undefined,
  messages: AMIMessage[],
): AMIConversationContext {
  const profile = buildLeadProfileFromConversation(
    messages,
    context,
  );

  const qualificationScore = calculateQualificationScore(profile);

  return {
    ...context,
    leadProfile: {
      ...profile,
      qualificationScore,
    },
  };
}
