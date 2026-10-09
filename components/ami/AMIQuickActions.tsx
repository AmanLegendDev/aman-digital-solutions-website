
"use client";

import { ArrowUpRight, Check, MessageCircle } from "lucide-react";
import type { AMIAction } from "@/lib/ami/types";

type AMIQuickActionsProps = {
  actions: AMIAction[];
  onAction?: (action: AMIAction) => void;
};

function getActionIcon(type: AMIAction["type"]) {
  switch (type) {
    case "WHATSAPP":
    case "CONTACT":
      return MessageCircle;

    case "NONE":
      return Check;

    default:
      return ArrowUpRight;
  }
}

export default function AMIQuickActions({
  actions,
  onAction,
}: AMIQuickActionsProps) {
  if (!Array.isArray(actions) || actions.length === 0) {
    return null;
  }

  return (
    <div
      className="mt-4 flex flex-wrap gap-2"
      aria-label="Suggested actions"
    >
      {actions.map((action, index) => {
        const Icon = getActionIcon(action.type);

        return (
          <button
            key={`${action.type}-${action.label}-${index}`}
            type="button"
            onClick={() => onAction?.(action)}
            className={[
              "group inline-flex min-h-10 items-center justify-center gap-2",
              "rounded-xl border px-4 py-2.5 text-sm font-semibold",
              "transition duration-200 ease-out",
              "focus-visible:outline-none focus-visible:ring-2",
              "focus-visible:ring-[#FFD400] focus-visible:ring-offset-2",
              "focus-visible:ring-offset-[#080808]",
              "active:scale-[0.98]",
              action.type === "START_PROJECT"
                ? "border-[#FFD400] bg-[#FFD400] text-black hover:bg-[#ffe14d]"
                : "border-[#FFD400]/20 bg-[#FFD400]/[0.06] text-[#FFD400] hover:border-[#FFD400]/50 hover:bg-[#FFD400]/[0.12]",
            ].join(" ")}
          >
            <span>{action.label}</span>

            <Icon
              size={15}
              aria-hidden="true"
              className="shrink-0 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            />
          </button>
        );
      })}
    </div>
  );
}
