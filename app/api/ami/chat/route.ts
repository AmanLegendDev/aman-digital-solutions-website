import { NextResponse } from "next/server";

import { AMI_SYSTEM_PROMPT } from "@/lib/ami/prompts";
import { buildKnowledgeInstruction } from "@/lib/ami/knowledge";
import { normalizeAMIResponse } from "@/lib/ami/response";
import { retrieveAMIData } from "@/lib/ami/retrieve";
import { detectAMIIntent } from "@/lib/ami/intent";
import { secureAMIResponse } from "@/lib/ami/security";

import type {
  AMIChatRequest,
  AMIConversationContext,
  AMIMessage,
} from "@/lib/ami/types";

export const runtime = "nodejs";

const MAX_MESSAGE_LENGTH = 2000;
const MAX_HISTORY = 12;
const REQUEST_TIMEOUT = 15000;

function isValidMessage(value: unknown): value is string {
  return (
    typeof value === "string" &&
    value.trim().length > 0
  );
}

function trimHistory(
  conversation: AMIMessage[]
): AMIMessage[] {
  return conversation
    .filter(
      (message) =>
        message &&
        (message.role === "user" ||
          message.role === "assistant") &&
        typeof message.content === "string"
    )
    .slice(-MAX_HISTORY)
    .map((message) => ({
      id: message.id,
      role: message.role,
      content: message.content
        .slice(0, MAX_MESSAGE_LENGTH),
    }));
}

function extractJson(text: string): unknown {
  try {
    return JSON.parse(text);
  } catch {
    // Continue with extracted JSON attempt.
  }

  const start = text.indexOf("{");
  const end = text.lastIndexOf("}");

  if (
    start === -1 ||
    end === -1 ||
    end <= start
  ) {
    return null;
  }

  try {
    return JSON.parse(
      text.slice(start, end + 1)
    );
  } catch {
    return null;
  }
}

function buildConversationContext(
  request: AMIChatRequest
): AMIConversationContext {
  return {
    ...(request.context || {}),
  };
}

function buildFallbackResponse() {
  return secureAMIResponse(
    normalizeAMIResponse({
      message:
        "I’m having trouble checking the latest ADS information right now. You can explore our services, pricing or start a project directly.",
      intent: "UNKNOWN",
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
    })
  );
}

export async function POST(request: Request) {
  try {
    const body =
      (await request.json()) as AMIChatRequest;

    if (!isValidMessage(body.message)) {
      return NextResponse.json(
        {
          success: false,
          error: "Message is required.",
        },
        { status: 400 }
      );
    }

    const message = body.message
      .trim()
      .slice(0, MAX_MESSAGE_LENGTH);

    const conversation = trimHistory(
      body.conversation || []
    );

    const context =
      buildConversationContext(body);

    /*
     * Deterministic intent detection happens
     * before database retrieval.
     *
     * This keeps retrieval targeted and avoids
     * sending unnecessary ADS data to the AI.
     */
    const intent = detectAMIIntent(message);

    const knowledge = await retrieveAMIData({
      message,
      intent,
    });

    const knowledgeInstruction =
      buildKnowledgeInstruction(
        knowledge
      );

    const apiKey =
      process.env.AMI_AI_API_KEY;

    const baseUrl =
      process.env.AMI_AI_BASE_URL;

    const model =
      process.env.AMI_AI_MODEL;

    /*
     * Graceful fallback when AI provider
     * environment variables are not configured.
     */
    if (
      !apiKey ||
      !baseUrl ||
      !model
    ) {
      console.error(
        "[AMI] AI environment variables are missing."
      );

      return NextResponse.json({
        success: true,
        response: secureAMIResponse(
          normalizeAMIResponse({
            message:
              "AMI is ready, but the AI service is not configured yet. You can explore our services or start a project directly.",
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
          })
        ),
      });
    }

    const controller =
      new AbortController();

    const timeout = setTimeout(() => {
      controller.abort();
    }, REQUEST_TIMEOUT);

    try {
      const messages = [
        {
          role: "system",
          content: AMI_SYSTEM_PROMPT,
        },
        {
          role: "system",
          content: knowledgeInstruction,
        },
        {
          role: "system",
          content: `
CURRENT REQUEST CONTEXT:

${JSON.stringify(
  {
    intent,
    conversationContext: context,
  },
  null,
  2
)}
`,
        },
        ...conversation.map((item) => ({
          role: item.role,
          content: item.content,
        })),
        {
          role: "user",
          content: message,
        },
      ];

      const response = await fetch(
        `${baseUrl.replace(
          /\/$/,
          ""
        )}/chat/completions`,
        {
          method: "POST",
          headers: {
            "Content-Type":
              "application/json",
            Authorization: `Bearer ${apiKey}`,
          },
          body: JSON.stringify({
            model,
            messages,
            temperature: 0.2,
            max_tokens: 900,
          }),
          signal: controller.signal,
        }
      );

      if (!response.ok) {
        const errorText =
          await response.text();

        console.error(
          "[AMI] AI provider error:",
          response.status,
          errorText.slice(0, 1000)
        );

        throw new Error(
          "AI provider request failed."
        );
      }

      const result =
        await response.json();

      const rawContent =
        result?.choices?.[0]?.message
          ?.content;

      if (
        typeof rawContent !== "string" ||
        !rawContent.trim()
      ) {
        throw new Error(
          "AI provider returned no content."
        );
      }

      const parsed =
        extractJson(rawContent);

      if (!parsed) {
        throw new Error(
          "AMI returned invalid JSON."
        );
      }

      /*
       * First normalize the AI response,
       * then apply security hardening.
       */
      const normalized =
        normalizeAMIResponse(parsed);

      const secured =
        secureAMIResponse(normalized);

      return NextResponse.json({
        success: true,
        response: secured,
      });
    } finally {
      clearTimeout(timeout);
    }
  } catch (error) {
    console.error(
      "[AMI] Chat route error:",
      error
    );

    return NextResponse.json({
      success: true,
      response: buildFallbackResponse(),
    });
  }
}