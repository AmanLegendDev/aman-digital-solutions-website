import { NextResponse } from "next/server";

import { AMI_SYSTEM_PROMPT } from "@/lib/ami/prompts";
import { buildKnowledgeInstruction } from "@/lib/ami/knowledge";
import { normalizeAMIResponse } from "@/lib/ami/response";
import {
  allServicesRequest,
  emptyAMIData,
  retrieveAMIData,
} from "@/lib/ami/retrieve";
import { detectAMIIntent } from "@/lib/ami/intent";
import { secureAMIResponse } from "@/lib/ami/security";
import { buildDirectResponse } from "@/lib/ami/direct";
import {
  findNamedProject,
  getAMICatalog,
  getCatalogData,
} from "@/lib/ami/catalog";
import { extractLeadSignals } from "@/lib/ami/lead";

import {
  buildAMIContextInstruction,
  sanitizeAMIContext,
} from "@/lib/ami/context";

import type {
  AMIChatRequest,
  AMIConversationContext,
  AMIIntent,
  AMIMessage,
  AMIProjectBlock,
  AMIResponse,
  AMIServiceBlock,
} from "@/lib/ami/types";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const MAX_MESSAGE_LENGTH = 2000;
const MAX_HISTORY = 6;
const MAX_HISTORY_MESSAGE_LENGTH = 400;
const MAX_REQUEST_BYTES = 64 * 1024;
const REQUEST_TIMEOUT = 20_000;
const MAX_OUTPUT_TOKENS = 1200;

const MAX_KNOWLEDGE_CHARS = 12_000;
const MAX_CONTEXT_CHARS = 1_500;

const RATE_LIMIT_PER_MINUTE = 20;

/* Intents where a named project should win over generic detection. */
const PROJECT_OVERRIDABLE = new Set<AMIIntent>([
  "SERVICE_DETAILS",
  "SERVICE_DISCOVERY",
  "PROJECT_DISCOVERY",
  "PROJECT_DETAILS",
  "GENERAL",
  "UNKNOWN",
  "ABOUT",
]);

type ProviderMessage = {
  role: "system" | "user" | "assistant";
  content: string;
};

type ProviderConfig = {
  apiKey: string;
  baseUrl: string;
  model: string;
};

/* ---------- tiny in-memory rate limit (per server instance) ---------- */

const hits = new Map<string, number[]>();

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < 60_000);

  recent.push(now);
  hits.set(ip, recent);

  if (hits.size > 5000) hits.clear();

  return recent.length > RATE_LIMIT_PER_MINUTE;
}

/* ---------- helpers ---------- */

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function jsonResponse(body: Record<string, unknown>, status = 200) {
  return NextResponse.json(body, {
    status,
    headers: {
      "Cache-Control": "no-store",
      "X-Content-Type-Options": "nosniff",
    },
  });
}

function errorResponse(error: string, status: number) {
  return jsonResponse({ success: false, error }, status);
}

function trimHistory(value: unknown): AMIMessage[] {
  if (!Array.isArray(value)) return [];

  return value
    .filter(
      (item): item is Record<string, unknown> =>
        isRecord(item) &&
        (item.role === "user" || item.role === "assistant") &&
        typeof item.content === "string" &&
        item.content.trim().length > 0,
    )
    .slice(-MAX_HISTORY)
    .map((item, index) => ({
      id:
        typeof item.id === "string" && item.id.trim()
          ? item.id.trim().slice(0, 100)
          : `ami-history-${index}`,
      role: item.role as "user" | "assistant",
      content: (item.content as string)
        .trim()
        .slice(0, MAX_HISTORY_MESSAGE_LENGTH),
    }));
}

function buildConversationContext(value: unknown): AMIConversationContext {
  try {
    return sanitizeAMIContext(isRecord(value) ? value : {});
  } catch {
    return {};
  }
}

function extractJson(text: string): unknown {
  try {
    return JSON.parse(text);
  } catch {
    // Some compatible providers wrap JSON in text.
  }

  const start = text.indexOf("{");
  const end = text.lastIndexOf("}");

  if (start < 0 || end <= start) return null;

  try {
    return JSON.parse(text.slice(start, end + 1));
  } catch {
    return null;
  }
}

function getProviderConfig(): ProviderConfig | null {
  const apiKey = process.env.AMI_AI_API_KEY?.trim();
  const rawBaseUrl = process.env.AMI_AI_BASE_URL?.trim();
  const model = process.env.AMI_AI_MODEL?.trim();

  if (!apiKey || !rawBaseUrl || !model) return null;

  try {
    const url = new URL(rawBaseUrl);

    const isLocalHttp =
      url.protocol === "http:" &&
      (url.hostname === "localhost" || url.hostname === "127.0.0.1");

    if (url.protocol !== "https:" && !isLocalHttp) return null;

    if (url.username || url.password || url.search || url.hash) return null;

    return {
      apiKey,
      baseUrl: url.toString().replace(/\/+$/, ""),
      model,
    };
  } catch {
    return null;
  }
}

function buildSafeResponse(
  message: string,
  intent: "GENERAL" | "UNKNOWN" = "GENERAL",
): AMIResponse {
  const normalized = normalizeAMIResponse({
    message,
    intent,
    blocks: [],
    actions: [
      { type: "VIEW_SERVICE", label: "View Services", href: "/services" },
      { type: "VIEW_PRICING", label: "View Pricing", href: "/pricing" },
      { type: "START_PROJECT", label: "Start a Project", href: "/start-a-project" },
    ],
    contextPatch: {},
    needsInput: false,
    nextQuestion: null,
  });

  return secureAMIResponse(normalized);
}

const buildConfigurationResponse = () =>
  buildSafeResponse(
    "AMI is temporarily unavailable. You can still explore our services, check pricing, or start a project directly.",
  );

const buildRetrievalFailureResponse = () =>
  buildSafeResponse(
    "I'm temporarily unable to verify the latest business information. Please try again shortly, or explore our services directly.",
    "UNKNOWN",
  );

const buildProviderFailureResponse = () =>
  buildSafeResponse(
    "I'm having trouble generating a response right now. Please try again shortly, or use one of the options below.",
    "UNKNOWN",
  );

const buildRateLimitResponse = () =>
  buildSafeResponse(
    "You're sending messages quite fast. Please give me a few seconds and ask again.",
    "GENERAL",
  );

/* Saves the selected service/project and any phone/email the visitor typed,
   so "this service" and "this project" work on the next turn. */
function withServerContext(
  res: AMIResponse,
  intent: AMIIntent,
  message: string,
): AMIResponse {
  const patch: Record<string, unknown> = {
    ...(res.contextPatch ?? {}),
    lastIntent: intent,
  };

  const svc = res.blocks.find(
    (b): b is AMIServiceBlock => b.type === "service" && Boolean(b.slug),
  );

  if (svc?.slug) {
    patch.selectedServiceSlug = svc.slug;
    patch.serviceSlug = svc.slug;
    patch.service = svc.title;
  }

  const project = res.blocks.find(
    (b): b is AMIProjectBlock => b.type === "project" && Boolean(b.slug),
  );

  if (project?.slug && res.blocks.filter((b) => b.type === "project").length === 1) {
    patch.selectedProjectSlug = project.slug;
    patch.projectSlug = project.slug;
  }

  const signals = extractLeadSignals(message);

  if (Object.keys(signals).length > 0) {
    patch.leadProfile = {
      ...((patch.leadProfile as Record<string, unknown>) ?? {}),
      ...signals,
    };
  }

  return { ...res, contextPatch: patch as AMIResponse["contextPatch"] };
}

function sendDirect(direct: AMIResponse, intent: AMIIntent, message: string) {
  return jsonResponse({
    success: true,
    response: secureAMIResponse(
      normalizeAMIResponse(withServerContext(direct, intent, message)),
    ),
  });
}

async function callProvider(
  provider: ProviderConfig,
  payload: Record<string, unknown>,
  signal: AbortSignal,
): Promise<Response | null> {
  const models = [
    provider.model,
    process.env.AMI_AI_FALLBACK_MODEL?.trim(),
  ].filter((m): m is string => Boolean(m));

  for (const model of models) {
    for (let attempt = 0; attempt < 2; attempt++) {
      let res: Response;

      try {
        res = await fetch(`${provider.baseUrl}/chat/completions`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${provider.apiKey}`,
          },
          body: JSON.stringify({
            ...payload,
            model,
            ...(model.includes("gpt-oss") ? { reasoning_effort: "low" } : {}),
          }),
          signal,
          cache: "no-store",
        });
      } catch (error) {
        console.error(
          "[AMI] Provider connection failed:",
          error instanceof Error ? error.message : "Unknown error",
        );
        return null;
      }

      if (res.ok) return res;

      const errText = await res.text().catch(() => "");
      console.error("[AMI] Provider error:", {
        status: res.status,
        model,
        body: errText.slice(0, 500),
      });

      if (res.status !== 429) break;

      const match = errText.match(/try again in ([\d.]+)s/i);
      const waitMs = match ? Math.ceil(parseFloat(match[1]) * 1000) + 200 : 2000;

      if (waitMs > 5000 || attempt === 1) break;
      await new Promise((r) => setTimeout(r, waitMs));
    }
  }

  return null;
}

function buildRequestMessages(
  message: string,
  intent: string,
  knowledgeInstruction: string,
  contextInstruction: string,
  conversation: AMIMessage[],
): ProviderMessage[] {
  return [
    { role: "system", content: AMI_SYSTEM_PROMPT },
    { role: "system", content: knowledgeInstruction },
    {
      role: "system",
      content: [
        "VISITOR CONTEXT AND CONVERSATION MEMORY:",
        contextInstruction,
        "",
        "DETECTED INTENT:",
        intent,
        "",
        "Follow the required JSON response schema.",
        "Do not claim a lead was submitted or saved unless it actually was.",
      ].join("\n"),
    },
    ...conversation.map((item) => ({
      role: item.role,
      content: item.content.slice(0, MAX_HISTORY_MESSAGE_LENGTH),
    })),
    { role: "user", content: message },
  ];
}

/* =========================================================
   POST
========================================================= */

export async function POST(request: Request) {
  let timeout: ReturnType<typeof setTimeout> | undefined;
  let abortFromClient: (() => void) | undefined;

  try {
    // 1. Request size.
    const contentLengthHeader = request.headers.get("content-length");

    if (contentLengthHeader !== null) {
      const contentLength = Number(contentLengthHeader);

      if (Number.isFinite(contentLength) && contentLength > MAX_REQUEST_BYTES) {
        return errorResponse("Request is too large.", 413);
      }
    }

    const rawBody = await request.text();

    if (new TextEncoder().encode(rawBody).byteLength > MAX_REQUEST_BYTES) {
      return errorResponse("Request is too large.", 413);
    }

    // 2. Parse and validate.
    let body: unknown;

    try {
      body = JSON.parse(rawBody);
    } catch {
      return errorResponse("Invalid JSON request.", 400);
    }

    if (!isRecord(body)) {
      return errorResponse("Invalid request body.", 400);
    }

    const requestData = body as unknown as AMIChatRequest;

    if (typeof requestData.message !== "string" || !requestData.message.trim()) {
      return errorResponse("Message is required.", 400);
    }

    const ip =
      request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";

    if (isRateLimited(ip)) {
      return jsonResponse({ success: true, response: buildRateLimitResponse() });
    }

    const message = requestData.message.trim().slice(0, MAX_MESSAGE_LENGTH);
    const conversation = trimHistory(requestData.conversation);
    const context = buildConversationContext(requestData.context);

    // 3. Intent (+ named project override).
    let intent = detectAMIIntent(message);

    const preferredSlug =
      context.selectedServiceSlug ||
      context.serviceSlug ||
      context.leadProfile?.serviceSlug ||
      undefined;

    // Greetings and policy answers need no database at all.
    if (intent === "GREETING" || intent === "POLICY") {
      const quick = buildDirectResponse(intent, emptyAMIData(), preferredSlug, message);

      if (quick) return sendDirect(quick, intent, message);
    }

    const catalog = await getCatalogData();
    const named = findNamedProject(message, catalog.projects);

    let focusProjectSlug: string | undefined;

    if (named && PROJECT_OVERRIDABLE.has(intent)) {
      intent = "PROJECT_DETAILS";
      focusProjectSlug = named.slug;
    } else if (
      intent === "PROJECT_DETAILS" &&
      /\b(this|it|that)\b/i.test(message) &&
      (context.selectedProjectSlug || context.projectSlug)
    ) {
      focusProjectSlug = context.selectedProjectSlug || context.projectSlug;
    }

    // 4. Retrieve trusted business information.
    let knowledge: Awaited<ReturnType<typeof retrieveAMIData>>;

    try {
      knowledge = await retrieveAMIData({
        message,
        intent,
        preferredServiceSlug: preferredSlug,
        focusProjectSlug,
      });
    } catch (error) {
      console.error(
        "[AMI] Retrieval failed:",
        error instanceof Error ? error.message : "Unknown retrieval error",
      );

      return jsonResponse({ success: true, response: buildRetrievalFailureResponse() });
    }

    if (knowledge.retrievalError) {
      console.error("[AMI] Retrieval reported an error.");

      return jsonResponse({ success: true, response: buildRetrievalFailureResponse() });
    }

    console.info("[AMI] Retrieved:", {
      intent,
      services: knowledge.services.length,
      projects: knowledge.projects.length,
      pricing: knowledge.pricing.length,
      offers: knowledge.offers.length,
      expiredOffers: knowledge.expiredOffers.length,
      faqs: knowledge.faqs.length,
      reviews: knowledge.reviews.length,
      blogs: knowledge.blogs.length,
      gallery: knowledge.gallery.length,
    });

    // 5. Full service list straight from the database.
    if (allServicesRequest(message)) {
      const serviceBlocks = knowledge.services
        .filter((s) => typeof s.title === "string" && s.title.trim().length > 0)
        .map((s) => ({
          type: "service" as const,
          serviceId: typeof s.id === "string" ? s.id : undefined,
          slug: typeof s.slug === "string" ? s.slug : undefined,
          title: s.title as string,
          description:
            typeof s.shortDescription === "string" && s.shortDescription.trim()
              ? s.shortDescription
              : typeof s.description === "string"
                ? s.description
                : undefined,
          startingPrice:
            typeof s.startingPrice === "number" && Number.isFinite(s.startingPrice) && s.startingPrice >= 0
              ? s.startingPrice
              : undefined,
          priceLabel:
            typeof s.priceLabel === "string" && s.priceLabel.trim() ? s.priceLabel : undefined,
          href:
            typeof s.href === "string" && s.href.startsWith("/services/") ? s.href : "/services",
        }));

      const response = normalizeAMIResponse({
        message:
          serviceBlocks.length > 0
            ? `Here are all ${serviceBlocks.length} services offered by Aman Digital Solutions.\n\nTell me what you're building and I'll point you to the best fit.`
            : "I couldn't find any published services right now. Please visit our services page for more information.",
        intent: "SERVICE_DISCOVERY",
        blocks: serviceBlocks,
        actions: [
          { type: "VIEW_SERVICE", label: "View All Services", href: "/services" },
          { type: "START_PROJECT", label: "Start a Project", href: "/start-a-project" },
        ],
        contextPatch: {},
        needsInput: true,
        nextQuestion: "Tell me what you're building and I'll point you to the best fit.",
      });

      return jsonResponse({ success: true, response: secureAMIResponse(response) });
    }

    // 6. Direct answers from the database (no AI needed).
    const direct = buildDirectResponse(intent, knowledge, preferredSlug, message);

    if (direct) {
      return sendDirect(direct, intent, message);
    }

    // 7. AI only for the rest.
    const provider = getProviderConfig();

    if (!provider) {
      console.error("[AMI] AI provider configuration is missing or invalid.");

      return jsonResponse({ success: true, response: buildConfigurationResponse() });
    }

    const catalogText = await getAMICatalog();

    const knowledgeInstruction =
      `${buildKnowledgeInstruction(knowledge)}\n\n${catalogText}`.slice(0, MAX_KNOWLEDGE_CHARS);

    const contextInstruction = buildAMIContextInstruction(context).slice(0, MAX_CONTEXT_CHARS);

    const messages = buildRequestMessages(
      message,
      intent,
      knowledgeInstruction,
      contextInstruction,
      conversation,
    );

    const payload = {
      model: provider.model,
      messages,
      temperature: 0.3,
      max_tokens: MAX_OUTPUT_TOKENS,
      response_format: { type: "json_object" },
    };

    console.info("[AMI] Provider request size:", {
      bytes: new TextEncoder().encode(JSON.stringify(payload)).byteLength,
      messageCount: messages.length,
      intent,
    });

    const controller = new AbortController();

    if (request.signal.aborted) {
      return errorResponse("Request was cancelled.", 499);
    }

    abortFromClient = () => controller.abort();
    request.signal.addEventListener("abort", abortFromClient, { once: true });

    timeout = setTimeout(() => controller.abort(), REQUEST_TIMEOUT);

    const providerResponse = await callProvider(provider, payload, controller.signal);

    if (abortFromClient) {
      request.signal.removeEventListener("abort", abortFromClient);
    }

    if (!providerResponse) {
      return jsonResponse({ success: true, response: buildProviderFailureResponse() });
    }

    // 8. Parse the provider response.
    let providerResult: unknown;

    try {
      providerResult = await providerResponse.json();
    } catch {
      console.error("[AMI] Provider returned invalid JSON.");

      return jsonResponse({ success: true, response: buildProviderFailureResponse() });
    }

    const rawContent =
      isRecord(providerResult) &&
      Array.isArray(providerResult.choices) &&
      isRecord(providerResult.choices[0]) &&
      isRecord(providerResult.choices[0].message)
        ? providerResult.choices[0].message.content
        : null;

    if (typeof rawContent !== "string" || !rawContent.trim()) {
      console.error("[AMI] Provider returned no usable message content.");

      return jsonResponse({ success: true, response: buildProviderFailureResponse() });
    }

    const parsed = extractJson(rawContent);

    if (!isRecord(parsed)) {
      console.error("[AMI] Provider output was not a valid JSON object.");

      return jsonResponse({ success: true, response: buildProviderFailureResponse() });
    }

    // 9. Normalize, add server-side context, secure.
    const normalized = normalizeAMIResponse(parsed);
    const enriched = withServerContext(normalized, intent, message);

    return jsonResponse({
      success: true,
      response: secureAMIResponse(enriched),
    });
  } catch (error) {
    console.error(
      "[AMI] Chat route failed:",
      error instanceof Error ? error.message : "Unknown server error",
    );

    return jsonResponse({ success: true, response: buildProviderFailureResponse() });
  } finally {
    if (timeout) clearTimeout(timeout);
  }
}