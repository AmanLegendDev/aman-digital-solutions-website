import Link from "next/link";
import { ArrowLeft, Images } from "lucide-react";

import GalleryCreateForm from "@/components/admin/gallery/GalleryCreateForm";

export default function NewGalleryPage() {
  return (
    <main className="min-h-screen bg-[#050505] px-4 py-8 text-white sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <Link
          href="/admin/gallery"
          className="mb-8 inline-flex items-center gap-2 text-sm text-white/50 transition hover:text-white"
        >
          <ArrowLeft size={16} />
          Back to Gallery
        </Link>

        <div className="mb-10">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#252525] bg-[#0D0D0D] px-3 py-1.5 text-xs text-[#FFC400]">
            <Images size={13} />
            Gallery CMS
          </div>

          <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
            Create gallery
          </h1>

          <p className="mt-3 max-w-3xl text-sm leading-6 text-white/50">
            Build a project media gallery with Cloudinary images,
            videos, captions, thumbnails, project relationships and SEO.
          </p>
        </div>

        <GalleryCreateForm />
      </div>
    </main>
  );
}