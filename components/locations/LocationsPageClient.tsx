"use client";

import FeaturedLocationsSection, {
  type FeaturedLocationData,
} from "./FeaturedLocationsSection";

import AllLocationsSection, {
  type LocationCardData,
} from "./AllLocationsSection";

import LocationsBottomCta from "./LocationsBottomCta";

type LocationsPageClientProps = {
  featuredLocations: FeaturedLocationData[];
  locations: LocationCardData[];
};

export default function LocationsPageClient({
  featuredLocations,
  locations,
}: LocationsPageClientProps) {
  return (
    <main className="min-h-screen bg-[#050505] text-white">
      {/* =====================================================
          FEATURED LOCATIONS
      ===================================================== */}

      <FeaturedLocationsSection
        locations={featuredLocations}
      />

      {/* =====================================================
          ALL LOCATIONS
      ===================================================== */}

      <AllLocationsSection locations={locations} />

      {/* =====================================================
          FINAL CTA
      ===================================================== */}

      <LocationsBottomCta />
    </main>
  );
}