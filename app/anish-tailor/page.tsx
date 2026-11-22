
import type { Metadata } from "next";

import BrandHeader from "@/components/anish-tailor/BrandHeader";
import RateList from "@/components/anish-tailor/RateList";
import TailorFooter from "@/components/anish-tailor/TailorFooter";

export const metadata: Metadata = {
  title: "Anish Tailor | Premium Tailoring Services in Dhalli, Shimla",
  description:
    "Explore stitching services and rates at Anish Tailor, Satguru Building, Dhalli, Shimla. 15 years of tailoring experience. Call or WhatsApp to enquire.",
  keywords: [
    "Anish Tailor",
    "Tailor in Dhalli Shimla",
    "Tailoring services Shimla",
    "Suit stitching Shimla",
    "Blouse stitching Shimla",
    "Lehenga stitching Shimla",
  ],
  openGraph: {
    title: "Anish Tailor | Dhalli, Shimla",
    description:
      "Explore our stitching services and rates. Trusted tailoring experience for 15 years.",
    type: "website",
    images: ["/anishlogo.png"],
  },
};

export default function AnishTailorPage() {
  return (
    <main className="min-h-screen bg-[#FFFDF9]">
      <BrandHeader />
      <RateList />
      <TailorFooter />
    </main>
  );
}
