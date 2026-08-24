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
          publicId:
            gallery.coverImage.publicId ?? null,
          alt:
            gallery.coverImage.alt ??
            gallery.title,
        }
      : null,
    category: gallery.category ?? null,
    featured: gallery.featured,

    media: [...(gallery.media ?? [])]
      .sort(
        (a, b) =>
          a.displayOrder - b.displayOrder
      )
      .map((item) => ({
        id: item._id.toString(),
        type: item.type as "image" | "video",
        url: item.url,
        publicId: item.publicId ?? null,
        thumbnailUrl:
          item.thumbnailUrl ?? null,
        thumbnailPublicId:
          item.thumbnailPublicId ?? null,
        alt:
          item.alt ??
          gallery.title,
        caption:
          item.caption ?? null,
        displayOrder: item.displayOrder,
      })),
  }));
}

export default async function GallerySection() {
  const galleries = await getGalleryItems();

  if (galleries.length === 0) {
    return null;
  }

  const featuredGallery =
    galleries.find(
      (gallery) => gallery.featured
    ) ?? galleries[0];

  const supportingGalleries = galleries.filter(
    (gallery) =>
      gallery.id !== featuredGallery.id
  );

  return (
    <section
      id="gallery"
      aria-labelledby="gallery-heading"
      className="relative w-full max-w-full scroll-mt-28 overflow-x-clip border-t border-[#1A1A1A] bg-[#050505] py-24 sm:py-28 lg:py-32"
    >
      {/* AMBIENT GLOW */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute right-[-180px] top-1/4 h-[460px] w-[460px] rounded-full bg-[#FFC400]/[0.025] blur-[150px]"
      />

      <div className="relative mx-auto w-full max-w-7xl min-w-0 px-5 sm:px-8 lg:px-10">
        {/* INTRO */}
        <div className="mx-auto max-w-3xl text-center">
          <GalleryIntro />
        </div>

        {/* VISUAL SHOWCASE */}
        <div className="mx-auto mt-14 w-full min-w-0 max-w-6xl">
          <GalleryGrid
            featuredGallery={featuredGallery}
            galleries={supportingGalleries}
          />
        </div>
      </div>
    </section>
  );
}