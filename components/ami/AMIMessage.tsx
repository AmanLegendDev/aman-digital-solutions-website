
"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import type { ReactNode } from "react";
import { isSafeAMIHref } from "@/lib/ami/security";

type Props = {
  role: "user" | "assistant";
  content: string;
};

const LINK_PATTERN = /\[([^\]]{1,120})\]\(([^)\s]{1,2048})\)/g;
const URL_PATTERN = /https:\/\/[^\s<>{}\[\]"']+/gi;

function trimUrlPunctuation(value: string) {
  let url = value;
  let trailing = "";

  while (/[.,!?;:]$/.test(url)) {
    trailing = url.slice(-1) + trailing;
    url = url.slice(0, -1);
  }

  while (url.endsWith(")") && (url.match(/\(/g)?.length ?? 0) < (url.match(/\)/g)?.length ?? 0)) {
    trailing = ")" + trailing;
    url = url.slice(0, -1);
  }

  return { url, trailing };
}

function renderLinkedText(content: string): ReactNode[] {
  const parts: ReactNode[] = [];
  let lastIndex = 0;
  let key = 0;
  let match: RegExpExecArray | null;

  LINK_PATTERN.lastIndex = 0;

  while ((match = LINK_PATTERN.exec(content)) !== null) {
    const [fullMatch, label, rawHref] = match;

    if (match.index > lastIndex) {
      parts.push(
        ...renderPlainText(content.slice(lastIndex, match.index), key),
      );
      key += 1000;
    }

    const href = rawHref.trim();

    if (isSafeAMIHref(href)) {
      const external = /^https:\/\//i.test(href);

      const className =
        "mx-0.5 inline-flex max-w-full items-center rounded-full border border-[#FFD400]/30 bg-[#FFD400]/10 px-3 py-1 text-[13px] font-semibold text-[#FFD400] underline-offset-4 transition hover:border-[#FFD400]/70 hover:bg-[#FFD400]/20 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FFD400]/60";

      parts.push(
        external ? (
          <a
            key={`md-link-${key++}`}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className={className}
          >
            {label}
            <span aria-hidden="true" className="ml-1">↗</span>
          </a>
        ) : (
          <Link
            key={`md-link-${key++}`}
            href={href}
            className={className}
          >
            {label}
            <span aria-hidden="true" className="ml-1">→</span>
          </Link>
        ),
      );
    } else {
      parts.push(label);
    }

    lastIndex = match.index + fullMatch.length;
  }

  if (lastIndex < content.length) {
    parts.push(...renderPlainText(content.slice(lastIndex), key));
  }

  return parts;
}

function renderPlainText(content: string, initialKey = 0): ReactNode[] {
  const parts: ReactNode[] = [];
  let lastIndex = 0;
  let key = initialKey;
  let match: RegExpExecArray | null;

  URL_PATTERN.lastIndex = 0;

  while ((match = URL_PATTERN.exec(content)) !== null) {
    const [rawUrl] = match;
    const { url, trailing } = trimUrlPunctuation(rawUrl);

    if (!url) continue;

    if (match.index > lastIndex) {
      parts.push(content.slice(lastIndex, match.index));
    }

    if (isSafeAMIHref(url)) {
      parts.push(
        <a
          key={`plain-link-${key++}`}
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="mx-0.5 inline-flex max-w-full items-center break-all rounded-full border border-[#FFD400]/30 bg-[#FFD400]/10 px-3 py-1 text-[13px] font-semibold text-[#FFD400] transition hover:border-[#FFD400]/70 hover:bg-[#FFD400]/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FFD400]/60"
        >
          <span className="break-all">{url}</span>
          <span aria-hidden="true" className="ml-1 shrink-0">↗</span>
        </a>,
      );
    } else {
      parts.push(url);
    }

    if (trailing) parts.push(trailing);

    lastIndex = match.index + rawUrl.length;
  }

  if (lastIndex < content.length) {
    parts.push(content.slice(lastIndex));
  }

  return parts;
}

export default function AMIMessage({ role, content }: Props) {
  const isUser = role === "user";

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2 }}
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
        {isUser ? content : renderLinkedText(content)}
      </div>
    </motion.div>
  );
}
