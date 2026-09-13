

import KyTripsNavbar from "@/components/ky-trips/KyTripsNavbar";
import KyTripsHero from "@/components/ky-trips/KyTripsHero";

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ||
  "https://www.amandigitalsolutions.com";

const PAGE_URL = `${SITE_URL}/ky-trips`;

const metadataa = {
  title: "KY-TRIPS | Premium Real Estate in Dubai, Delhi NCR & Tri-City",

  description:
    "Explore premium property opportunities with KY-TRIPS across Dubai, Delhi NCR and the Tri-City — Chandigarh, Panchkula and Mohali.",

  alternates: {
    canonical: PAGE_URL,
  },

  robots: {
    index: false,
    follow: false,
    googleBot: {
      index: false,
      follow: false,
    },
  },

  openGraph: {
    title: "KY-TRIPS | Premium Real Estate",
    description:
      "A premium real estate experience for property buying, selling and investment across Dubai, Delhi NCR and the Tri-City.",
    url: PAGE_URL,
    siteName: "KY-TRIPS",
    type: "website",
    images: [
      {
        url: `${SITE_URL}/images/ky-trips/hero.webp`,
        width: 1920,
        height: 1080,
        alt: "KY-TRIPS premium real estate",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "KY-TRIPS | Premium Real Estate",
    description:
      "Premium property buying, selling and investment opportunities across Dubai, Delhi NCR and the Tri-City.",
    images: [`${SITE_URL}/images/ky-trips/hero.webp`],
  },

  icons: {
    icon: "/ky.png",
  },
};

export default function KyTripsDemoPage() {
  return (
    <main
      id="main-content"
      className="min-h-screen bg-[#061426] text-white"
    >
      <KyTripsNavbar />
      <KyTripsHero />
    </main>
  );
}