"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import type { ReactNode } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { RotateCcw } from "lucide-react";

import AMIInput from "./AMIInput";
import AMIMessage from "./AMIMessage";
import AMIThinking from "./AMIThinking";
import AMIQuickActions from "./AMIQuickActions";
import AMIServiceCard from "./AMIServiceCard";
import AMIProjectCard from "./AMIProjectCard";
import AMIPricingCard from "./AMIPricingCard";
import AMIOfferCard from "./AMIOfferCard";
import AMIReviewCard from "./AMIReviewCard";
import AMIGalleryCard from "./AMIGalleryCard";
import AMIBlogCard from "./AMIBlogCard";
import AMIFaqCard from "./AMIFaqCard";

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
  animate?: boolean;
};

const STORAGE_KEY = "ami-chat-v2";

const INITIAL_MESSAGE: ChatMessage = {
  id: "ami-welcome",
  role: "assistant",
  content:
    "Hi, I’m AMI. Tell me what you’re looking to build, and I’ll help you find the right solution.",
};

const MAX_HISTORY = 12;
const MAX_SAVED = 30;
const MIN_THINKING_MS = 650;

const STARTERS = [
  "How much does a website cost?",
  "Show me your projects",
  "Any offers running?",
  "What are your payment terms?",
  "Contact details",
];

const FALLBACK_ACTIONS: AMIAction[] = [
  { type: "VIEW_SERVICE", label: "View Services", href: "/services" },
  { type: "VIEW_PRICING", label: "View Pricing", href: "/pricing" },
  { type: "START_PROJECT", label: "Start a Project", href: "/start-a-project" },
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

type Saved = { messages: ChatMessage[]; context: AMIConversationContext } | null;

function loadSaved(): Saved {
  if (typeof window === "undefined") return null;

  try {
    const raw = window.sessionStorage.getItem(STORAGE_KEY);
    if (!raw) return null;

    const parsed = JSON.parse(raw);

    if (!parsed || !Array.isArray(parsed.messages) || parsed.messages.length === 0) {
      return null;
    }

    return {
      messages: parsed.messages.map((m: ChatMessage) => ({ ...m, animate: false })),
      context: parsed.context && typeof parsed.context === "object" ? parsed.context : {},
    };
  } catch {
    return null;
  }
}

export default function AMIChat() {
  const router = useRouter();

  const [saved] = useState<Saved>(loadSaved);

  const [messages, setMessages] = useState<ChatMessage[]>(
    saved?.messages ?? [INITIAL_MESSAGE],
  );
  const [conversationContext, setConversationContext] =
    useState<AMIConversationContext>(saved?.context ?? {});

  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [thinkingStage, setThinkingStage] = useState("Understanding your requirement");
  const [revealDone, setRevealDone] = useState<Record<string, boolean>>({});

  const abortControllerRef = useRef<AbortController | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToEnd = useCallback((smooth = true) => {
    messagesEndRef.current?.scrollIntoView({
      behavior: smooth ? "smooth" : "auto",
      block: "end",
    });
  }, []);

  useEffect(() => {
    scrollToEnd();
  }, [messages, isLoading, revealDone, scrollToEnd]);

  useEffect(() => {
    try {
      const toSave = messages.slice(-MAX_SAVED).map((m) => ({ ...m, animate: false }));

      window.sessionStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({ messages: toSave, context: conversationContext }),
      );
    } catch {
      // Storage can be unavailable (private mode); the chat still works.
    }
  }, [messages, conversationContext]);

  useEffect(() => {
    return () => {
      abortControllerRef.current?.abort();
    };
  }, []);

  const resetChat = useCallback(() => {
    abortControllerRef.current?.abort();
    setMessages([INITIAL_MESSAGE]);
    setConversationContext({});
    setRevealDone({});
    setInput("");
    setIsLoading(false);

    try {
      window.sessionStorage.removeItem(STORAGE_KEY);
    } catch {
      // ignore
    }
  }, []);

  const handleAction = useCallback(
    (action: AMIAction) => {
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
        EMAIL: "mailto:hello@amandigitalsolutions.com",
      };

      const href = action.href || routes[action.type];

      if (!href) return;

      if (/^tel:/i.test(href)) {
        if (/^tel:\+?[0-9().\-\s]+$/i.test(href)) window.location.href = href;
        return;
      }

      if (/^mailto:/i.test(href)) {
        if (/^mailto:[^@\s]+@[^@\s]+\.[^@\s]+$/i.test(href)) window.location.href = href;
        return;
      }

      if (!isSafeAMIHref(href)) {
        console.warn("[AMI] Blocked unsafe action URL:", href);
        return;
      }

      if (/^https:\/\//i.test(href)) {
        window.open(href, "_blank", "noopener,noreferrer");
        return;
      }

      router.push(href);
    },
    [router],
  );

  const send = useCallback(
    async (rawText: string) => {
      const message = rawText.trim();

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

      const startedAt = Date.now();

      const stageTimer = window.setTimeout(
        () => setThinkingStage("Checking relevant information"),
        700,
      );
      const secondStageTimer = window.setTimeout(
        () => setThinkingStage("Finding the most useful options"),
        1500,
      );

      try {
        const response = await fetch("/api/ami/chat", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            message,
            conversation: nextMessages.slice(-MAX_HISTORY).map((item) => ({
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

        const result: unknown = await response.json();
        const candidate = (result as { response?: unknown } | null)?.response;

        if (!candidate || typeof candidate !== "object" || Array.isArray(candidate)) {
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
          !(data.nextQuestion === null || typeof data.nextQuestion === "string")
        ) {
          throw new Error("Invalid AMI response.");
        }

        const amiResponse = candidate as AMIResponse;

        // Instant replies feel abrupt, so keep "thinking" visible for a natural beat.
        const elapsed = Date.now() - startedAt;
        if (elapsed < MIN_THINKING_MS) {
          await new Promise((r) => setTimeout(r, MIN_THINKING_MS - elapsed));
        }

        setConversationContext((current) => applyAMIResponseContext(current, amiResponse));

        setMessages((current) => [
          ...current,
          {
            id: crypto.randomUUID(),
            role: "assistant",
            content: amiResponse.message || "How can I help you?",
            amiResponse,
            animate: true,
          },
        ]);
      } catch (error) {
        if (error instanceof DOMException && error.name === "AbortError") {
          return;
        }

        console.error("[AMI] UI error:", error);

        const fallbackMessage =
          "I’m having a small connection issue right now. You can still explore our services or start a project directly.";

        setMessages((current) => [
          ...current,
          {
            id: crypto.randomUUID(),
            role: "assistant",
            content: fallbackMessage,
            amiResponse: getFallbackResponse(fallbackMessage),
            animate: true,
          },
        ]);
      } finally {
        window.clearTimeout(stageTimer);
        window.clearTimeout(secondStageTimer);

        if (abortControllerRef.current === controller) {
          abortControllerRef.current = null;
          setIsLoading(false);
        }
      }
    },
    [isLoading, messages, conversationContext],
  );

  const renderBlock = (block: AMIResponse["blocks"][number]): ReactNode => {
    switch (block.type) {
      case "service":
        return <AMIServiceCard block={block} />;
      case "project":
        return <AMIProjectCard block={block} />;
      case "pricing":
        return <AMIPricingCard block={block} />;
      case "offer":
        return <AMIOfferCard block={block} />;
      case "review":
        return <AMIReviewCard block={block} />;
      case "gallery":
        return <AMIGalleryCard block={block} />;
      case "blog":
        return <AMIBlogCard block={block} />;
      case "faq":
        return <AMIFaqCard block={block} />;
      default:
        return null;
    }
  };

  const showStarters = messages.length === 1 && !isLoading;

  return (
    <div className="flex h-full min-h-0 flex-col">
      {/* CONVERSATION */}
      <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain px-4 py-6 sm:px-6 sm:py-8">
        <div className="mx-auto flex w-full max-w-3xl flex-col gap-5">
          {/* INTRO */}
          <div className="mb-3 max-w-xl">
            <div className="mb-2 text-[10px] font-semibold uppercase tracking-[0.18em] text-[#FFC400]">
              Your digital project assistant
            </div>

            <div
              role="note"
              className="mt-4 flex items-start gap-3 rounded-xl border border-[#FFC400]/15 bg-[#FFC400]/[0.04] px-4 py-3 text-sm leading-6 text-white/60"
            >
              <span
                className="mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border border-[#FFC400]/30 text-[11px] font-semibold text-[#FFC400]"
                aria-hidden="true"
              >
                i
              </span>

              <p>
                If you experience any issues while using AMI, feel free to{" "}
                <a
                  href="/contact"
                  className="font-medium text-[#FFC400] underline decoration-[#FFC400]/40 underline-offset-4 transition-colors duration-200 hover:text-white hover:decoration-white"
                >
                  contact Aman Digital Solutions
                </a>{" "}
                directly. We’ll be happy to help.
              </p>
            </div>

            <h1 className="mt-5 text-2xl font-semibold tracking-tight text-white sm:text-3xl">
              What are you looking to build?
            </h1>

            <p className="mt-2 text-sm leading-6 text-white/40">
              Tell me what you need. I’ll help you find the most relevant service,
              project or next step.
            </p>
          </div>

          {/* MESSAGES */}
          {messages.map((message) => {
            const response = message.amiResponse;
            const ready = !message.animate || revealDone[message.id];

            return (
              <div key={message.id} className="flex w-full flex-col gap-4">
                <AMIMessage
                  role={message.role}
                  content={message.content}
                  animate={Boolean(message.animate) && message.role === "assistant"}
                  onTick={() => scrollToEnd(false)}
                  onDone={() =>
                    setRevealDone((prev) =>
                      prev[message.id] ? prev : { ...prev, [message.id]: true },
                    )
                  }
                />

                {message.role === "assistant" && response && ready && (
                  <>
                    {response.blocks?.map((block, index) => {
                      const card = renderBlock(block);

                      return card ? (
                        <motion.div
                          key={`${message.id}-${block.type}-${index}`}
                          initial={{ opacity: 0, y: 14 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.4, delay: index * 0.15 }}
                        >
                          {card}
                        </motion.div>
                      ) : null;
                    })}

                    {response.actions?.length ? (
                      <motion.div
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{
                          duration: 0.3,
                          delay: (response.blocks?.length ?? 0) * 0.15 + 0.1,
                        }}
                      >
                        <AMIQuickActions actions={response.actions} onAction={handleAction} />
                      </motion.div>
                    ) : null}
                  </>
                )}
              </div>
            );
          })}

          {/* STARTER CHIPS */}
          {showStarters && (
            <div className="flex flex-wrap gap-2" aria-label="Suggested questions">
              {STARTERS.map((starter) => (
                <button
                  key={starter}
                  type="button"
                  onClick={() => send(starter)}
                  className="rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-[13px] text-white/70 transition hover:border-[#FFC400]/40 hover:bg-[#FFC400]/[0.08] hover:text-[#FFC400]"
                >
                  {starter}
                </button>
              ))}
            </div>
          )}

          {/* THINKING */}
          {isLoading && <AMIThinking stage={thinkingStage} />}

          <div ref={messagesEndRef} aria-hidden="true" />
        </div>
      </div>

      {/* INPUT */}
      <div className="shrink-0 border-t border-white/[0.07] bg-[#050505]/95 px-4 pb-4 pt-3 backdrop-blur-xl sm:px-6 sm:pb-6">
        <AMIInput
          value={input}
          onChange={setInput}
          onSubmit={() => send(input)}
          disabled={isLoading}
        />

        <div className="mx-auto mt-2 flex max-w-3xl items-center justify-between text-[10px] text-white/25">
          <p>AMI uses verified Aman Digital Solutions information.</p>

          {messages.length > 1 && (
            <button
              type="button"
              onClick={resetChat}
              className="inline-flex items-center gap-1 text-white/35 transition hover:text-[#FFC400]"
            >
              <RotateCcw size={10} />
              New chat
            </button>
          )}
        </div>
      </div>
    </div>
  );
}