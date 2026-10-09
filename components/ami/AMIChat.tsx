
"use client";

import {
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";

import AMIInput from "./AMIInput";
import AMIMessage from "./AMIMessage";
import AMIThinking from "./AMIThinking";
import AMIQuickActions from "./AMIQuickActions";
import AMIServiceCard from "./AMIServiceCard";
import AMIProjectCard from "./AMIProjectCard";
import AMIPricingCard from "./AMIPricingCard";
import AMIOfferCard from "./AMIOfferCard";

import { applyAMIResponseContext } from "@/lib/ami/context";
import { isSafeAMIHref } from "@/lib/ami/security";

import type {
  AMIAction,
  AMIConversationContext,
  AMIMessage as AMIMessageType,
  AMIResponse,
} from "@/lib/ami/types";

type ChatMessage = AMIMessageType & {
  amiResponse?: AMIResponse;
};

const INITIAL_MESSAGE: ChatMessage = {
  id: "ami-welcome",
  role: "assistant",
  content:
    "Hi, I’m AMI. Tell me what you’re looking to build, and I’ll help you find the right solution.",
};

const MAX_HISTORY = 12;

const FALLBACK_ACTIONS: AMIAction[] = [
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
];

function getFallbackResponse(message: string): AMIResponse {
  return {
    message,
    intent: "UNKNOWN",
    blocks: [],
    actions: FALLBACK_ACTIONS,
    contextPatch: {},
    needsInput: false,
    nextQuestion: null,
  };
}

export default function AMIChat() {
  const [messages, setMessages] = useState<ChatMessage[]>([
    INITIAL_MESSAGE,
  ]);

  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const [thinkingStage, setThinkingStage] = useState(
    "Understanding your requirement",
  );

  const [
    conversationContext,
    setConversationContext,
  ] = useState<AMIConversationContext>({});

  const abortControllerRef = useRef<AbortController | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "end",
    });
  }, [messages, isLoading]);

  useEffect(() => {
    return () => {
      abortControllerRef.current?.abort();
    };
  }, []);

  const handleAction = useCallback((action: AMIAction) => {
    if (!action) return;

    const routes: Record<string, string> = {
      START_PROJECT: "/start-a-project",
      VIEW_SERVICE: "/services",
      VIEW_PROJECT: "/projects",
      VIEW_PRICING: "/pricing",
      VIEW_FAQ: "/faq",
      VIEW_OFFER: "/offers",
      CONTACT: "/contact",
      WHATSAPP: "https://wa.me/918219174058",
      CALL: "tel:+918219174058",
      EMAIL: "mailto:amanansaricodes@gmail.com",
    };

    const href = action.href || routes[action.type];

    if (!href) return;

    // Phone and email links use dedicated browser handlers.
    if (/^tel:/i.test(href)) {
      if (/^tel:\+?[0-9().\-\s]+$/i.test(href)) {
        window.location.href = href;
      }
      return;
    }

    if (/^mailto:/i.test(href)) {
      if (/^mailto:[^@\s]+@[^@\s]+\.[^@\s]+$/i.test(href)) {
        window.location.href = href;
      }
      return;
    }

    // All other URLs must pass the existing URL security policy.
    if (!isSafeAMIHref(href)) {
      console.warn("[AMI] Blocked unsafe action URL:", href);
      return;
    }

    if (/^https:\/\//i.test(href)) {
      window.open(href, "_blank", "noopener,noreferrer");
      return;
    }

    window.location.href = href;
  }, []);

  const sendMessage = useCallback(async () => {
    const message = input.trim();

    if (!message || isLoading) return;

    abortControllerRef.current?.abort();

    const controller = new AbortController();
    abortControllerRef.current = controller;

    const userMessage: ChatMessage = {
      id: crypto.randomUUID(),
      role: "user",
      content: message,
    };

    const nextMessages = [...messages, userMessage];

    setMessages(nextMessages);
    setInput("");
    setIsLoading(true);
    setThinkingStage("Understanding your requirement");

    const stageTimer = window.setTimeout(() => {
      setThinkingStage("Checking relevant services");
    }, 700);

    const secondStageTimer = window.setTimeout(() => {
      setThinkingStage("Finding the most useful options");
    }, 1500);

    try {
      const response = await fetch("/api/ami/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message,
          conversation: nextMessages
            .slice(-MAX_HISTORY)
            .map((item) => ({
              id: item.id,
              role: item.role,
              content: item.content,
            })),
          context: conversationContext,
        }),
        signal: controller.signal,
      });

      if (!response.ok) {
        throw new Error(`AMI request failed (${response.status}).`);
      }

      setThinkingStage("Preparing the best answer");

     
      const result: unknown = await response.json();

      const candidate = (
        result as { response?: unknown } | null
      )?.response;

      if (
        !candidate ||
        typeof candidate !== "object" ||
        Array.isArray(candidate)
      ) {
        throw new Error("Invalid AMI response.");
      }

      const data = candidate as Record<string, unknown>;

      if (
        typeof data.message !== "string" ||
        typeof data.intent !== "string" ||
        !Array.isArray(data.blocks) ||
        !Array.isArray(data.actions) ||
        !data.contextPatch ||
        typeof data.contextPatch !== "object" ||
        Array.isArray(data.contextPatch) ||
        typeof data.needsInput !== "boolean" ||
        !(
          data.nextQuestion === null ||
          typeof data.nextQuestion === "string"
        )
      ) {
        throw new Error("Invalid AMI response.");
      }

      const amiResponse = candidate as AMIResponse;


      setConversationContext((current) =>
        applyAMIResponseContext(current, amiResponse),
      );

      // Keep each structured response attached to its own message.
      const assistantMessage: ChatMessage = {
        id: crypto.randomUUID(),
        role: "assistant",
        content: amiResponse.message || "How can I help you?",
        amiResponse,
      };

      setMessages((current) => [...current, assistantMessage]);
    } catch (error) {
      if (
        error instanceof DOMException &&
        error.name === "AbortError"
      ) {
        return;
      }

      console.error("[AMI] UI error:", error);

      const fallbackMessage =
        "I’m having a small connection issue right now. You can still explore our services or start a project directly.";

      const fallbackResponse = getFallbackResponse(fallbackMessage);

      const fallbackAssistantMessage: ChatMessage = {
        id: crypto.randomUUID(),
        role: "assistant",
        content: fallbackMessage,
        amiResponse: fallbackResponse,
      };

      setMessages((current) => [
        ...current,
        fallbackAssistantMessage,
      ]);
    } finally {
      window.clearTimeout(stageTimer);
      window.clearTimeout(secondStageTimer);

      if (abortControllerRef.current === controller) {
        abortControllerRef.current = null;
        setIsLoading(false);
      }
    }
  }, [input, isLoading, messages, conversationContext]);

  return (
    <div
      className="
        flex
        h-full
        min-h-0
        flex-col
      "
    >
      {/* CONVERSATION */}
      <div
        className="
          min-h-0
          flex-1
          overflow-y-auto
          overscroll-contain
          px-4
          py-6
          sm:px-6
          sm:py-8
        "
      >
        <div
          className="
            mx-auto
            flex
            w-full
            max-w-3xl
            flex-col
            gap-5
          "
        >
          {/* INTRO — existing UI preserved */}
          <div className="mb-3 max-w-xl">
            <div
              className="
                mb-2
                text-[10px]
                font-semibold
                uppercase
                tracking-[0.18em]
                text-[#FFC400]
              "
            >
              Your digital project assistant
            </div>

            <h1
              className="
                text-2xl
                font-semibold
                tracking-tight
                text-white
                sm:text-3xl
              "
            >
              What are you looking to build?
            </h1>

            <p
              className="
                mt-2
                text-sm
                leading-6
                text-white/40
              "
            >
              Tell me what you need. I’ll help you find the most
              relevant service, project or next step.
            </p>
          </div>

          {/* MESSAGES + THEIR OWN STRUCTURED RESPONSES */}
          {messages.map((message) => {
            const response = message.amiResponse;

            return (
              <div
                key={message.id}
                className="flex w-full flex-col gap-4"
              >
                <AMIMessage
                  role={message.role}
                  content={message.content}
                />

                {message.role === "assistant" && response && (
                  <>
                    {response.blocks?.map((block, index) => {
                      const key = `${message.id}-${block.type}-${index}`;

                      switch (block.type) {
                        case "service":
                          return (
                            <AMIServiceCard
                              key={key}
                              block={block}
                            />
                          );

                        case "project":
                          return (
                            <AMIProjectCard
                              key={key}
                              block={block}
                            />
                          );

                        case "pricing":
                          return (
                            <AMIPricingCard
                              key={key}
                              block={block}
                            />
                          );

                        case "offer":
                          return (
                            <AMIOfferCard
                              key={key}
                              block={block}
                            />
                          );

                        case "text":
                        case "quick_actions":
                        default:
                          return null;
                      }
                    })}

                    {response.actions?.length ? (
                      <AMIQuickActions
                        actions={response.actions}
                        onAction={handleAction}
                      />
                    ) : null}
                  </>
                )}
              </div>
            );
          })}

          {/* THINKING */}
          {isLoading && (
            <AMIThinking stage={thinkingStage} />
          )}

          <div ref={messagesEndRef} aria-hidden="true" />
        </div>
      </div>

      {/* INPUT — existing UI preserved */}
      <div
        className="
          shrink-0
          border-t
          border-white/[0.07]
          bg-[#050505]/95
          px-4
          pb-4
          pt-3
          backdrop-blur-xl
          sm:px-6
          sm:pb-6
        "
      >
        <AMIInput
          value={input}
          onChange={setInput}
          onSubmit={sendMessage}
          disabled={isLoading}
        />

        <p
          className="
            mx-auto
            mt-2
            max-w-3xl
            text-center
            text-[10px]
            text-white/20
          "
        >
          AMI uses verified Aman Digital Solutions information.
        </p>
      </div>
    </div>
  );
}
