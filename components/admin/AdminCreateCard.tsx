import Link from "next/link";
import type { LucideIcon } from "lucide-react";
import { ArrowUpRight } from "lucide-react";
import { BadgeIndianRupee } from "lucide-react";

type AdminCreateCardProps = {
  title: string;
  description: string;
  icon: LucideIcon;
  href: string;
};

export default function AdminCreateCard({
  title,
  description,
  icon: Icon,
  href,
}: AdminCreateCardProps) {
  return (
    <div className="group relative overflow-hidden rounded-2xl border border-[#252525] bg-[#0D0D0D] p-6 transition duration-300 hover:border-[#FFC400]/40 hover:bg-[#151515]">
      <div className="absolute -right-12 -top-12 h-32 w-32 rounded-full bg-[#FFC400]/[0.04] blur-3xl transition duration-500 group-hover:bg-[#FFC400]/[0.08]" />

      <div className="relative">
        <div className="flex items-start justify-between">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-[#252525] bg-[#151515] text-[#FFC400]">
            <Icon size={20} strokeWidth={1.8} />
          </div>

          <span className="rounded-full border border-[#252525] px-2.5 py-1 text-[10px] font-medium uppercase tracking-wider text-[#A1A1A1]">
            Create
          </span>
        </div>

        <h2 className="mt-6 text-lg font-semibold text-[#F5F5F5]">
          {title}
        </h2>

        <p className="mt-2 min-h-10 text-sm leading-5 text-[#A1A1A1]">
          {description}
        </p>

        <Link
          href={href}
          className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-[#F5F5F5] transition hover:text-[#FFC400]"
        >
          Add {title}
          <ArrowUpRight
            size={16}
            className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
          />
        </Link>
      </div>
    </div>
  );
}