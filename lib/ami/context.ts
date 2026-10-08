import type {
  AMIConversationContext,
  AMIResponse,
} from "./types";

/* =========================================================
   AMI CONTEXT
========================================================= */

export const EMPTY_AMI_CONTEXT: AMIConversationContext =
  {};

function cleanString(
  value: unknown,
  max = 500,
): string | undefined {
  if (
    typeof value !== "string"
  ) {
    return undefined;
  }

  const cleaned =
    value.trim();

  if (!cleaned) {
    return undefined;
  }

  return cleaned.slice(
    0,
    max,
  );
}

function cleanNumber(
  value: unknown,
): number | undefined {
  if (
    typeof value !== "number" ||
    !Number.isFinite(value)
  ) {
    return undefined;
  }

  return value;
}

/**
 * Keeps only safe, useful conversation context.
 *
 * Never store arbitrary AI-generated objects.
 */
export function sanitizeAMIContext(
  value: unknown,
): AMIConversationContext {
  if (
    !value ||
    typeof value !== "object"
  ) {
    return {};
  }

  const input =
    value as Record<
      string,
      unknown
    >;

  return {
    ...(cleanString(
      input.intent,
      80,
    )
      ? {
          intent:
            cleanString(
              input.intent,
              80,
            ),
        }
      : {}),

    ...(cleanString(
      input.serviceSlug,
      150,
    )
      ? {
          serviceSlug:
            cleanString(
              input.serviceSlug,
              150,
            ),
        }
      : {}),

    ...(cleanString(
      input.projectSlug,
      150,
    )
      ? {
          projectSlug:
            cleanString(
              input.projectSlug,
              150,
            ),
        }
      : {}),

    ...(cleanString(
      input.companyName,
      200,
    )
      ? {
          companyName:
            cleanString(
              input.companyName,
              200,
            ),
        }
      : {}),

    ...(cleanString(
      input.name,
      120,
    )
      ? {
          name:
            cleanString(
              input.name,
              120,
            ),
        }
      : {}),

    ...(cleanString(
      input.email,
      200,
    )
      ? {
          email:
            cleanString(
              input.email,
              200,
            ),
        }
      : {}),

    ...(cleanString(
      input.phone,
      50,
    )
      ? {
          phone:
            cleanString(
              input.phone,
              50,
            ),
        }
      : {}),

    ...(cleanString(
      input.location,
      150,
    )
      ? {
          location:
            cleanString(
              input.location,
              150,
            ),
        }
      : {}),

    ...(cleanString(
      input.projectType,
      100,
    )
      ? {
          projectType:
            cleanString(
              input.projectType,
              100,
            ),
        }
      : {}),

    ...(cleanString(
      input.projectDescription,
      1000,
    )
      ? {
          projectDescription:
            cleanString(
              input.projectDescription,
              1000,
            ),
        }
      : {}),

    ...(cleanString(
      input.timeline,
      100,
    )
      ? {
          timeline:
            cleanString(
              input.timeline,
              100,
            ),
        }
      : {}),

    ...(cleanString(
      input.budgetRange,
      100,
    )
      ? {
          budgetRange:
            cleanString(
              input.budgetRange,
              100,
            ),
        }
      : {}),

    ...(cleanString(
      input.currentWebsite,
      300,
    )
      ? {
          currentWebsite:
            cleanString(
              input.currentWebsite,
              300,
            ),
        }
      : {}),

    ...(cleanNumber(
      input.qualificationScore,
    ) !== undefined
      ? {
          qualificationScore:
            cleanNumber(
              input.qualificationScore,
            ),
        }
      : {}),
  };
}

/**
 * Merge existing context with AI's contextPatch.
 *
 * AI can add information, but cannot erase useful
 * existing information accidentally.
 */
export function mergeAMIContext(
  current:
    | AMIConversationContext
    | null
    | undefined,
  patch: unknown,
): AMIConversationContext {
  const currentSafe =
    sanitizeAMIContext(
      current,
    );

  const patchSafe =
    sanitizeAMIContext(
      patch,
    );

  return {
    ...currentSafe,
    ...patchSafe,
  };
}

/**
 * Extract contextPatch from a normalized AMI response.
 */
export function applyAMIResponseContext(
  current:
    | AMIConversationContext
    | null
    | undefined,
  response:
    | AMIResponse
    | null
    | undefined,
): AMIConversationContext {
  if (!response) {
    return sanitizeAMIContext(
      current,
    );
  }

  return mergeAMIContext(
    current,
    response.contextPatch,
  );
}

/**
 * Convert context into a compact instruction for the AI.
 */
export function buildAMIContextInstruction(
  context:
    | AMIConversationContext
    | null
    | undefined,
): string {
  const safe =
    sanitizeAMIContext(
      context,
    );

  if (
    Object.keys(safe).length === 0
  ) {
    return "No visitor profile has been collected yet.";
  }

  return JSON.stringify(
    safe,
    null,
    2,
  );
}