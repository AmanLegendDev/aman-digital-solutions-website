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

import {
  applyAMIResponseContext,
} from "@/lib/ami/context";

import {
  isSafeAMIHref,
} from "@/lib/ami/security";

import type {
  AMIAction,
  AMIConversationContext,
  AMIMessage as AMIMessageType,
  AMIResponse,
} from "@/lib/ami/types";

const INITIAL_MESSAGE: AMIMessageType = {
  id: "ami-welcome",
  role: "assistant",
  content:
    "Hi, I’m AMI. Tell me what you’re looking to build, and I’ll help you find the right solution.",
};

const MAX_HISTORY = 12;

export default function AMIChat() {
  const [messages, setMessages] =
    useState<AMIMessageType[]>([
      INITIAL_MESSAGE,
    ]);

  const [input, setInput] =
    useState("");

  const [isLoading, setIsLoading] =
    useState(false);

  const [thinkingStage, setThinkingStage] =
    useState(
      "Understanding your requirement",
    );

  const [
    conversationContext,
    setConversationContext,
  ] = useState<AMIConversationContext>(
    {},
  );

  const [lastResponse, setLastResponse] =
    useState<AMIResponse | null>(null);

  const abortControllerRef =
    useRef<AbortController | null>(null);

  const messagesEndRef =
    useRef<HTMLDivElement>(null);

  /* -------------------------------------------------------
     AUTO SCROLL
  ------------------------------------------------------- */

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "end",
    });
  }, [messages, isLoading, lastResponse]);

  /* -------------------------------------------------------
     CLEANUP
  ------------------------------------------------------- */

  useEffect(() => {
    return () => {
      abortControllerRef.current?.abort();
    };
  }, []);

  /* -------------------------------------------------------
     ACTION HANDLER
  ------------------------------------------------------- */

  const handleAction = useCallback(
    (action: AMIAction) => {
      if (!action) return;

      /*
       * Never trust an href coming from the AI
       * directly in the browser.
       */
      if (action.href) {
        if (!isSafeAMIHref(action.href)) {
          console.warn(
            "[AMI] Blocked unsafe action URL:",
            action.href,
          );

          return;
        }

        window.location.href =
          action.href;

        return;
      }

      /*
       * Fallback routing for actions that
       * do not contain an href.
       */
      const routes: Record<
        string,
        string
      > = {
        START_PROJECT:
          "/start-a-project",

        VIEW_SERVICE:
          "/services",

        VIEW_PROJECT:
          "/projects",

        VIEW_PRICING:
          "/pricing",

        VIEW_FAQ:
          "/faq",

        VIEW_OFFER:
          "/offers",

        CONTACT:
          "/contact",

        WHATSAPP:
          "https://wa.me/918219174058",

        CALL:
          "tel:+918219174058",

        EMAIL:
          "mailto:amanansaricodes@gmail.com",
      };

      const fallbackHref =
        routes[action.type];

      if (!fallbackHref) {
        return;
      }

      /*
       * Validate fallback route too.
       */
      if (
        !isSafeAMIHref(
          fallbackHref,
        )
      ) {
        return;
      }

      window.location.href =
        fallbackHref;
    },
    [],
  );

  /* -------------------------------------------------------
     SEND MESSAGE
  ------------------------------------------------------- */

  const sendMessage = useCallback(
    async () => {
      const message =
        input.trim();

      if (
        !message ||
        isLoading
      ) {
        return;
      }

      /*
       * Cancel any previous request.
       */
      abortControllerRef.current?.abort();

      const controller =
        new AbortController();

      abortControllerRef.current =
        controller;

      const userMessage: AMIMessageType =
        {
          id: crypto.randomUUID(),
          role: "user",
          content: message,
        };

      const nextMessages = [
        ...messages,
        userMessage,
      ];

      setMessages(nextMessages);
      setInput("");
      setLastResponse(null);
      setIsLoading(true);

      setThinkingStage(
        "Understanding your requirement",
      );

      const stageTimer =
        window.setTimeout(() => {
          setThinkingStage(
            "Checking relevant services",
          );
        }, 700);

      const secondStageTimer =
        window.setTimeout(() => {
          setThinkingStage(
            "Finding the most useful options",
          );
        }, 1500);

      try {
        const response =
          await fetch(
            "/api/ami/chat",
            {
              method: "POST",

              headers: {
                "Content-Type":
                  "application/json",
              },

              body: JSON.stringify({
                message,

                conversation:
                  nextMessages
                    .slice(-MAX_HISTORY)
                    .map((item) => ({
                      id: item.id,
                      role: item.role,
                      content:
                        item.content,
                    })),

                context:
                  conversationContext,
              }),

              signal:
                controller.signal,
            },
          );

        if (!response.ok) {
          throw new Error(
            "AMI request failed.",
          );
        }

        setThinkingStage(
          "Preparing the best answer",
        );

        const result =
          await response.json();

        const amiResponse =
          result?.response as
            | AMIResponse
            | undefined;

        if (!amiResponse) {
          throw new Error(
            "Invalid AMI response.",
          );
        }

        /*
         * Store complete structured response.
         *
         * This enables:
         * - service cards
         * - project cards
         * - pricing cards
         * - offer cards
         * - quick actions
         */
        setLastResponse(
          amiResponse,
        );

        /*
         * Safely merge the AI-generated
         * context patch into local AMI context.
         */
        setConversationContext(
          (current) =>
            applyAMIResponseContext(
              current,
              amiResponse,
            ),
        );

        /*
         * Keep the conversational text
         * inside normal message history.
         */
        const assistantMessage:
          AMIMessageType = {
            id: crypto.randomUUID(),
            role: "assistant",
            content:
              amiResponse.message ||
              "How can I help you?",
          };

        setMessages(
          (current) => [
            ...current,
            assistantMessage,
          ],
        );
      } catch (error) {
        if (
          error instanceof
            DOMException &&
          error.name ===
            "AbortError"
        ) {
          return;
        }

        console.error(
          "[AMI] UI error:",
          error,
        );

        const fallbackMessage =
          "I’m having a small connection issue right now. You can still explore our services or start a project directly.";

        setMessages(
          (current) => [
            ...current,
            {
              id:
                crypto.randomUUID(),
              role: "assistant",
              content:
                fallbackMessage,
            },
          ],
        );

        setLastResponse({
          message:
            fallbackMessage,
          intent: "UNKNOWN",
          blocks: [],
          actions: [
            {
              type:
                "VIEW_SERVICE",
              label:
                "View Services",
              href:
                "/services",
            },
            {
              type:
                "VIEW_PRICING",
              label:
                "View Pricing",
              href:
                "/pricing",
            },
            {
              type:
                "START_PROJECT",
              label:
                "Start a Project",
              href:
                "/start-a-project",
            },
          ],
          contextPatch: {},
          needsInput: false,
          nextQuestion: null,
        });
      } finally {
        window.clearTimeout(
          stageTimer,
        );

        window.clearTimeout(
          secondStageTimer,
        );

        if (
          abortControllerRef.current ===
          controller
        ) {
          abortControllerRef.current =
            null;

          setIsLoading(false);
        }
      }
    },
    [
      input,
      isLoading,
      messages,
      conversationContext,
    ],
  );

  /* -------------------------------------------------------
     RENDER
  ------------------------------------------------------- */

  return (
    <div
      className="
        flex
        h-full
        min-h-0
        flex-col
      "
    >
      {/* ---------------------------------------------------
          CONVERSATION
      --------------------------------------------------- */}

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
          {/* INTRO */}

          <div
            className="
              mb-3
              max-w-xl
            "
          >
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
              Tell me what you need. I’ll
              help you find the most relevant
              service, project or next step.
            </p>
          </div>

          {/* MESSAGES */}

          {messages.map(
            (message) => (
              <AMIMessage
                key={message.id}
                role={message.role}
                content={
                  message.content
                }
              />
            ),
          )}

          {/* -------------------------------------------------
              STRUCTURED RESPONSE BLOCKS
          ------------------------------------------------- */}

          {lastResponse?.blocks?.map(
            (block, index) => {
              switch (
                block.type
              ) {
                case "service":
                  return (
                    <AMIServiceCard
                      key={`service-${index}`}
                      block={block}
                    />
                  );

                case "project":
                  return (
                    <AMIProjectCard
                      key={`project-${index}`}
                      block={block}
                    />
                  );

                case "pricing":
                  return (
                    <AMIPricingCard
                      key={`pricing-${index}`}
                      block={block}
                    />
                  );

                case "offer":
                  return (
                    <AMIOfferCard
                      key={`offer-${index}`}
                      block={block}
                    />
                  );

                case "text":
                  return null;

                case "quick_actions":
                  return null;

                default:
                  return null;
              }
            },
          )}

          {/* -------------------------------------------------
              RESPONSE ACTIONS
          ------------------------------------------------- */}

          {lastResponse
            ?.actions
            ?.length ? (
            <AMIQuickActions
              actions={
                lastResponse.actions
              }
              onAction={
                handleAction
              }
            />
          ) : null}

          {/* -------------------------------------------------
              THINKING
          ------------------------------------------------- */}

          {isLoading && (
            <AMIThinking
              stage={
                thinkingStage
              }
            />
          )}

          <div
            ref={messagesEndRef}
            aria-hidden="true"
          />
        </div>
      </div>

      {/* ---------------------------------------------------
          INPUT
      --------------------------------------------------- */}

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
          AMI uses verified Aman Digital
          Solutions information.
        </p>
      </div>
    </div>
  );
}