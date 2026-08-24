import Link from "next/link";
import { ArrowLeft, PenLine } from "lucide-react";

import BlogCreateForm from "@/components/admin/blog/BlogCreateForm";

export default function NewBlogPage() {
  return (
    <main className="min-h-screen bg-[#050505] px-4 py-8 text-white sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <Link
          href="/admin/blog"
          className="mb-8 inline-flex items-center gap-2 text-sm text-white/50 transition hover:text-white"
        >
          <ArrowLeft size={16} />
          Back to Blog
        </Link>

        <div className="mb-10">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#252525] bg-[#0D0D0D] px-3 py-1.5 text-xs text-[#FFC400]">
            <PenLine size={13} />
            Blog CMS
          </div>

          <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
            Create a blog post
          </h1>

          <p className="mt-3 max-w-3xl text-sm leading-6 text-white/50">
            Publish useful, search-friendly content with structured
            metadata, Cloudinary media and complete publishing controls.
          </p>
        </div>

        <BlogCreateForm />
      </div>
    </main>
  );
}