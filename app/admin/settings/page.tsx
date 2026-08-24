import Link from "next/link";
import { ArrowLeft, Settings } from "lucide-react";

import SiteSettingsForm from "@/components/admin/settings/SiteSettingsForm";

export default function AdminSettingsPage() {
  return (
    <main className="min-h-screen bg-[#050505] px-4 py-8 text-white sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <Link
          href="/admin/dashboard"
          className="mb-8 inline-flex items-center gap-2 text-sm text-white/50 transition hover:text-white"
        >
          <ArrowLeft size={16} />
          Back to Dashboard
        </Link>

        <div className="mb-10">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#252525] bg-[#0D0D0D] px-3 py-1.5 text-xs text-[#FFC400]">
            <Settings size={13} />
            Global Settings
          </div>

          <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
            Site settings
          </h1>

          <p className="mt-3 max-w-3xl text-sm leading-6 text-white/50">
            Manage your website identity, contact details, social links,
            business hours, SEO, analytics and global website behavior.
          </p>
        </div>

        <SiteSettingsForm />
      </div>
    </main>
  );
}