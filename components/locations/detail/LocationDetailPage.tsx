import LocationHeroSection from "./LocationHeroSection";
import LocationOverviewSection from "./LocationOverviewSection";
import LocationServicesSection from "./LocationServicesSection";
import LocationContactSection from "./LocationContactSection";
import LocationFinalCtaSection from "./LocationFinalCtaSection";

/* =========================================================
   TYPES
========================================================= */

export type LocationDetailService = {
  _id: string;
  title: string;
  slug: string;
  shortDescription?: string;
  category?: string;
};

export type LocationDetailImage = {
  url: string;
  publicId?: string;
  alt?: string;
};

export type LocationDetailData = {
  name: string;
  slug: string;

  shortDescription: string;
  description: string;

  image?: LocationDetailImage;

  address?: string;
  city: string;
  state?: string;
  country: string;
  postalCode?: string;

  latitude?: number;
  longitude?: number;

  phone?: string;
  email?: string;
  mapUrl?: string;

  services: LocationDetailService[];
};

/* =========================================================
   PROPS
========================================================= */

type LocationDetailPageProps = {
  location: LocationDetailData;
};

/* =========================================================
   PAGE
========================================================= */

export default function LocationDetailPage({
  location,
}: LocationDetailPageProps) {
  return (
    <div className="min-h-screen bg-[#050505] text-white">
      {/* =====================================================
          HERO
      ===================================================== */}

      <LocationHeroSection
        location={{
          name: location.name,
          slug: location.slug,
          shortDescription:
            location.shortDescription,
          image: location.image,
          city: location.city,
          state: location.state,
          country: location.country,
          address: location.address,
        }}
      />

      {/* =====================================================
          OVERVIEW
      ===================================================== */}

      <LocationOverviewSection
        name={location.name}
        city={location.city}
        description={location.description}
        address={location.address}
        state={location.state}
        country={location.country}
      />

      {/* =====================================================
          SERVICES
      ===================================================== */}

      <LocationServicesSection
        services={location.services}
      />

      {/* =====================================================
          CONTACT
      ===================================================== */}

      <LocationContactSection
        name={location.name}
        address={location.address}
        city={location.city}
        state={location.state}
        country={location.country}
        postalCode={location.postalCode}
        phone={location.phone}
        email={location.email}
        mapUrl={location.mapUrl}
        latitude={location.latitude}
        longitude={location.longitude}
      />

      {/* =====================================================
          FINAL CTA
      ===================================================== */}

      <LocationFinalCtaSection
        name={location.name}
        city={location.city}
      />
    </div>
  );
}