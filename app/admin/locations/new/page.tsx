import Link from "next/link";
import { ArrowLeft, MapPin } from "lucide-react";

import LocationCreateForm from "@/components/admin/locations/LocationCreateForm";

export default function NewLocationPage() {
  return (
    <main className="min-h-screen bg-[#050505] px-4 py-8 text-white sm:px-6 lg:px-8">
      <div className="mx-auto max-w-5xl">
        <Link
          href="/admin/locations"
          className="mb-8 inline-flex items-center gap-2 text-sm text-white/50 transition hover:text-white"
        >
          <ArrowLeft size={16} />
          Back to Locations
        </Link>

        <div className="mb-10">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#252525] bg-[#0D0D0D] px-3 py-1.5 text-xs text-[#FFC400]">
            <MapPin size={13} />
            Locations CMS
          </div>

          <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
            Add a new location
          </h1>

          <p className="mt-3 max-w-2xl text-sm leading-6 text-white/50">
            Create a service-area page with location details, contact
            information, map data, related services and local SEO.
          </p>
        </div>

        <LocationCreateForm />
      </div>
    </main>
  );
}