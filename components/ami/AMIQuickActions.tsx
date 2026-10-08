"use client";

import { ArrowRight } from "lucide-react";
import type { AMIAction } from "@/lib/ami/types";

type AMIQuickActionsProps = {
  actions: AMIAction[];
  onAction?: (action: AMIAction) => void;
};

export default function AMIQuickActions({
  actions,
  onAction,
}: AMIQuickActionsProps) {
  if (!actions?.length) return null;

  return (
    <div className="mt-4 flex flex-wrap gap-2">
      {actions.map((action, index) => (
        <button
          key={`${action.type}-${action.label}-${index}`}
          type="button"
          onClick={() => onAction?.(action)}
          className="group inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-4 py-2.5 text-sm font-medium text-white transition hover:border-[#FFD400]/40 hover:bg-[#FFD400]/10 hover:text-[#FFD400] focus:outline-none focus:ring-2 focus:ring-[#FFD400]/40"
        >
          <span>{action.label}</span>

          <ArrowRight
            size={14}
            className="transition-transform group-hover:translate-x-0.5"
          />
        </button>
      ))}
    </div>
  );
}