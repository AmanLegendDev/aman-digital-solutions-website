import { connectDB } from "@/lib/db/connect";
import Location from "@/models/Location";

import LocationsIntro from "./LocationsIntro";
import LocationCard from "./LocationCard";

async function getLocations() {
  await connectDB();

  const locations = await Location.find({
    published: true,
  })
    .populate({
      path: "services",
      select: "title slug",
      match: {
        published: true,
      },
    })
    .sort({
      featured: -1,
      displayOrder: 1,
      createdAt: -1,
    })
    .limit(3)
    .select(
      [
        "name",
        "slug",
        "shortDescription",
        "image",
        "city",
        "state",
        "country",
        "services",
        "featured",
      ].join(" ")
    )
    .lean();

  return locations.map((location) => {
    const populatedServices = Array.isArray(location.services)
      ? (location.services as Array<{
          title?: unknown;
        }>)
      : [];

    return {
      id: location._id.toString(),

      name: location.name,
      slug: location.slug,
      shortDescription: location.shortDescription,

      image: location.image
        ? {
            url: location.image.url,
            publicId: location.image.publicId ?? null,
            alt: location.image.alt ?? location.name,
          }
        : null,

      city: location.city,
      state: location.state ?? null,
      country: location.country,

      services: populatedServices
        .map((service) =>
          typeof service.title === "string"
            ? service.title
            : null
        )
        .filter(
          (title): title is string =>
            title !== null
        ),

      featured: location.featured,
    };
  });
}

export default async function LocationsSection() {
  const locations = await getLocations();

  if (locations.length === 0) {
    return null;
  }

  return (
    <section
      id="locations"
      aria-labelledby="locations-heading"
      className="relative w-full max-w-full scroll-mt-28 overflow-x-clip border-t border-[#1A1A1A] bg-[#050505] py-24 sm:py-28 lg:py-32"
    >
      {/* Ambient visual effect */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-40 top-1/3 h-[420px] w-[420px] rounded-full bg-[#FFC400]/[0.02] blur-[140px]"
      />

      <div className="relative mx-auto w-full max-w-7xl min-w-0 px-5 sm:px-8 lg:px-10">
        <div className="grid min-w-0 gap-14 lg:grid-cols-[0.72fr_1.28fr] lg:gap-20">
          {/* LEFT — STICKY INTRO */}
          <aside className="min-w-0 lg:sticky lg:top-32 lg:self-start">
            <LocationsIntro />
          </aside>

          {/* RIGHT — LOCATION CARDS */}
          <div
            className={
              locations.length === 1
                ? "min-w-0 max-w-2xl"
                : "grid min-w-0 gap-4 sm:grid-cols-2"
            }
          >
            {locations.map((location, index) => (
              <LocationCard
                key={location.id}
                location={location}
                index={index}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}