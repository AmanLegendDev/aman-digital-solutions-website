import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

import { connectDB } from "@/lib/db/connect";
import Gallery from "@/models/Gallery";

import GalleryIntro from "./GalleryIntro";
import GalleryGrid from "./GalleryGrid";

async function getGalleryItems() {
  await connectDB();

  const galleries = await Gallery.find({
    published: true,
  })
    .sort({
      featured: -1,
      displayOrder: 1,
      createdAt: -1,
    })
    .limit(3)
    .select(
      [
        "title",
        "slug",
        "shortDescription",
        "coverImage",
        "media",
        "category",
        "featured",
      ].join(" ")
    )
    .lean();

  return galleries.map((gallery) => ({
    id: gallery._id.toString(),
    title: gallery.title,
    slug: gallery.slug,

    shortDescription:
      gallery.shortDescription ?? null,

    coverImage: gallery.coverImage
      ? {
          url: gallery.coverImage.url,
          publicId: gallery.coverImage.publicId ?? null,
          alt:
            gallery.coverImage.alt ??
            gallery.title,
        }
      : null,

    category: gallery.category ?? null,
    featured: gallery.featured,

    media: Array.isArray(gallery.media)
      ? [...gallery.media]
          .sort(
            (a, b) =>
              a.displayOrder -
              b.displayOrder
          )
          .map((item) => ({
            id: item._id.toString(),

            type: item.type as
              | "image"
              | "video",

            url: item.url,

            publicId:
              item.publicId ?? null,

            thumbnailUrl:
              item.thumbnailUrl ?? null,

            thumbnailPublicId:
              item.thumbnailPublicId ?? null,

            alt:
              item.alt ??
              gallery.title,

            caption:
              item.caption ?? null,

            displayOrder:
              item.displayOrder,
          }))
      : [],
  }));

}

export default async function GallerySection() {
  const galleries = await getGalleryItems();

  if (galleries.length === 0) {
    return null;
  }

  return (
    <section
      id="gallery"
      aria-labelledby="gallery-heading"
      className="relative w-full max-w-full scroll-mt-28 overflow-x-clip border-t border-[#1A1A1A] bg-[#050505] py-24 sm:py-28 lg:py-32"
    >
      {/* AMBIENT VISUAL EFFECT */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute right-[-180px] top-1/3 h-[460px] w-[460px] rounded-full bg-[#FFC400]/[0.025] blur-[150px]"
      />

      <div className="relative mx-auto w-full max-w-7xl min-w-0 px-5 sm:px-8 lg:px-10">
        <div className="grid min-w-0 gap-14 lg:grid-cols-[0.7fr_1.3fr] lg:gap-20">
          {/* LEFT — STICKY INTRO */}
          <aside className="min-w-0 lg:sticky lg:top-32 lg:h-fit lg:self-start">
            <GalleryIntro />
          </aside>

          {/* RIGHT — GALLERY */}
          <div className="min-w-0">
            <div className="border-t border-[#202020]">
              <GalleryGrid galleries={galleries} />
            </div>

            {/* VIEW ALL */}
            <div className="flex justify-start pt-8 sm:justify-end">
              <Link
                href="/gallery"
                className="group inline-flex min-h-11 items-center gap-2 rounded-full border border-[#2A2A2A] bg-[#0A0A0A] px-5 text-xs font-medium tracking-wide text-[#CFCFCF] transition-all duration-300 hover:border-[#FFC400]/40 hover:bg-[#FFC400]/[0.06] hover:text-[#FFC400] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FFC400]/70"
              >
                View all gallery

                <ArrowUpRight
                  aria-hidden="true"
                  size={14}
                  className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}