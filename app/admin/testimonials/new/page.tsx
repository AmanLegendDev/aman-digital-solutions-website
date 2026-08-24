import Link from "next/link";
import { ArrowLeft, MessageSquareQuote } from "lucide-react";

import TestimonialCreateForm from "@/components/admin/testimonials/TestimonialCreateForm";

export default function NewTestimonialPage() {
  return (
    <main className="min-h-screen bg-[#050505] px-4 py-8 text-white sm:px-6 lg:px-8">
      <div className="mx-auto max-w-5xl">
        <Link
          href="/admin/testimonials"
          className="mb-8 inline-flex items-center gap-2 text-sm text-white/50 transition hover:text-white"
        >
          <ArrowLeft size={16} />
          Back to Testimonials
        </Link>

        <div className="mb-10">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#252525] bg-[#0D0D0D] px-3 py-1.5 text-xs text-[#FFC400]">
            <MessageSquareQuote size={13} />
            Testimonials CMS
          </div>

          <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
            Add a testimonial
          </h1>

          <p className="mt-3 max-w-2xl text-sm leading-6 text-white/50">
            Add genuine client feedback with client details, rating,
            project context, media and SEO metadata.
          </p>
        </div>

        <TestimonialCreateForm />
      </div>
    </main>
  );
}