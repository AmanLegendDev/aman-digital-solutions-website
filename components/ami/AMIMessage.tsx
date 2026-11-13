"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import type { ReactNode } from "react";
import { isSafeAMIHref } from "@/lib/ami/security";

type Props = {
  role: "user" | "assistant";
  content: string;
  animate?: boolean;
  onDone?: () => void;
  onTick?: () => void;
};

const LINK_PATTERN = /\[([^\]]{1,120})\]\(([^)\s]{1,2048})\)/g;
const URL_PATTERN = /https:\/\/[^\s<>{}\[\]"']+/gi;
const TOKEN_PATTERN =
  /\[[^\]]{1,120}\]\([^)\s]{1,2048}\)\s*|\*\*[^*]+\*\*\s*|\S+\s*|\s+/g;

const LINK_CLASS =
  "mx-0.5 inline-flex max-w-full items-center rounded-full border border-[#FFD400]/30 bg-[#FFD400]/10 px-3 py-0.5 text-[13px] font-semibold text-[#FFD400] transition hover:border-[#FFD400]/70 hover:bg-[#FFD400]/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FFD400]/60";

function trimUrlPunctuation(value: string) {
  let url = value;
  let trailing = "";

  while (/[.,!?;:]$/.test(url)) {
    trailing = url.slice(-1) + trailing;
    url = url.slice(0, -1);
  }

  return { url, trailing };
}

function renderBold(text: string, keyBase: number): ReactNode[] {
  return text.split(/(\*\*[^*]+\*\*)/g).map((part, i) =>
    /^\*\*[^*]+\*\*$/.test(part) ? (
      <strong key={`b-${keyBase}-${i}`} className="font-semibold text-white">
        {part.slice(2, -2)}
      </strong>
    ) : (
      part
    ),
  );
}

function renderPlainText(content: string, initialKey = 0): ReactNode[] {
  const parts: ReactNode[] = [];
  let lastIndex = 0;
  let key = initialKey;
  let match: RegExpExecArray | null;

  URL_PATTERN.lastIndex = 0;

  while ((match = URL_PATTERN.exec(content)) !== null) {
    const { url, trailing } = trimUrlPunctuation(match[0]);

    if (!url) continue;

    if (match.index > lastIndex) {
      parts.push(...renderBold(content.slice(lastIndex, match.index), key++));
    }

    if (isSafeAMIHref(url)) {
      parts.push(
        <a key={`u-${key++}`} href={url} target="_blank" rel="noopener noreferrer" className={LINK_CLASS}>
          <span className="break-all">{url}</span>
          <span aria-hidden="true" className="ml-1">↗</span>
        </a>,
      );
    } else {
      parts.push(url);
    }

    if (trailing) parts.push(trailing);

    lastIndex = match.index + match[0].length;
  }

  if (lastIndex < content.length) {
    parts.push(...renderBold(content.slice(lastIndex), key++));
  }

  return parts;
}

function renderLinkedText(content: string): ReactNode[] {
  const parts: ReactNode[] = [];
  let lastIndex = 0;
  let key = 0;
  let match: RegExpExecArray | null;

  LINK_PATTERN.lastIndex = 0;

  while ((match = LINK_PATTERN.exec(content)) !== null) {
    const [full, label, rawHref] = match;

    if (match.index > lastIndex) {
      parts.push(...renderPlainText(content.slice(lastIndex, match.index), key));
      key += 1000;
    }

    const href = rawHref.trim();

    if (isSafeAMIHref(href)) {
      const external = /^https:\/\//i.test(href);

      parts.push(
        external ? (
          <a key={`l-${key++}`} href={href} target="_blank" rel="noopener noreferrer" className={LINK_CLASS}>
            {label}
            <span aria-hidden="true" className="ml-1">↗</span>
          </a>
        ) : (
          <Link key={`l-${key++}`} href={href} className={LINK_CLASS}>
            {label}
            <span aria-hidden="true" className="ml-1">→</span>
          </Link>
        ),
      );
    } else {
      parts.push(label);
    }

    lastIndex = match.index + full.length;
  }

  if (lastIndex < content.length) {
    parts.push(...renderPlainText(content.slice(lastIndex), key));
  }

  return parts;
}

export default function AMIMessage({
  role,
  content,
  animate = false,
  onDone,
  onTick,
}: Props) {
  const isUser = role === "user";

  const tokens = useMemo(() => content.match(TOKEN_PATTERN) ?? [content], [content]);

  const [count, setCount] = useState(animate ? 0 : tokens.length);

  const doneRef = useRef(onDone);
  const tickRef = useRef(onTick);
  doneRef.current = onDone;
  tickRef.current = onTick;

  useEffect(() => {
    if (!animate) {
      setCount(tokens.length);
      return;
    }

    const reduced =
      typeof window !== "undefined" &&
      window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;

    if (reduced) {
      setCount(tokens.length);
      doneRef.current?.();
      return;
    }

    // Longer replies reveal a little faster so they never feel slow.
    const step = tokens.length > 90 ? 3 : tokens.length > 45 ? 2 : 1;

    let current = 0;

    const timer = window.setInterval(() => {
      current = Math.min(tokens.length, current + step);
      setCount(current);
      tickRef.current?.();

      if (current >= tokens.length) {
        window.clearInterval(timer);
        doneRef.current?.();
      }
    }, 34);

    return () => window.clearInterval(timer);
  }, [animate, tokens]);

  const visible = isUser ? content : tokens.slice(0, count).join("");

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25 }}
      className={`flex w-full ${isUser ? "justify-end" : "justify-start"}`}
    >
      <div
        className={`
          max-w-[88%] whitespace-pre-wrap break-words rounded-2xl px-4 py-3
          text-[14px] leading-7 sm:max-w-[720px]
          ${
            isUser
              ? "rounded-br-md bg-[#FFD400] text-black"
              : "rounded-bl-md border border-white/[0.08] bg-white/[0.045] text-white/85"
          }
        `}
      >
        {isUser ? content : renderLinkedText(visible)}
      </div>
    </motion.div>
  );
}