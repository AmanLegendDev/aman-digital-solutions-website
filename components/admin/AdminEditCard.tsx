import Link from "next/link";
import type { LucideIcon } from "lucide-react";
import { ArrowRight, Pencil } from "lucide-react";

type AdminEditCardProps = {
  title: string;
  description: string;
  icon: LucideIcon;
  href: string;
};

export default function AdminEditCard({
  title,
  description,
  icon: Icon,
  href,
}: AdminEditCardProps) {
  return (
    <Link
      href={href}
      className="group relative flex min-h-[190px] flex-col overflow-hidden rounded-2xl border border-[#252525] bg-[#0A0A0A] p-5 transition-all duration-300 hover:-translate-y-0.5 hover:border-[#FFC400]/25 hover:bg-[#0D0D0D]"
    >
      {/* Accent glow */}

      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-10 -top-10 h-28 w-28 rounded-full bg-[#FFC400]/[0.025] blur-3xl transition-opacity duration-300 group-hover:bg-[#FFC400]/[0.05]"
      />

      {/* Icon */}

      <div className="relative flex items-center justify-between">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-[#252525] bg-[#111111] text-[#FFC400] transition-colors duration-300 group-hover:border-[#FFC400]/20">
          <Icon size={17} strokeWidth={1.7} />
        </div>

        <span className="flex h-8 w-8 items-center justify-center rounded-full border border-[#252525] text-[#666666] transition-all duration-300 group-hover:border-[#FFC400]/20 group-hover:text-[#FFC400]">
          <Pencil size={12} />
        </span>
      </div>

      {/* Content */}

      <div className="relative mt-6 flex-1">
        <h3 className="text-sm font-semibold text-[#F5F5F5] transition-colors duration-300 group-hover:text-[#FFC400]">
          Edit {title}
        </h3>

        <p className="mt-2 max-w-xs text-xs leading-5 text-[#737373]">
          {description}
        </p>
      </div>

      {/* Footer */}

      <div className="relative mt-5 flex items-center justify-between border-t border-[#1C1C1C] pt-4">
        <span className="text-[9px] font-medium uppercase tracking-[0.16em] text-[#525252] transition-colors duration-300 group-hover:text-[#737373]">
          Manage
        </span>

        <ArrowRight
          size={14}
          className="text-[#525252] transition-all duration-300 group-hover:translate-x-1 group-hover:text-[#FFC400]"
        />
      </div>
    </Link>
  );
}