import type { Metadata } from "next";

import PrivacyHero from "@/components/PrivacyPage/PrivacyHero";
import PrivacyOverview from "@/components/PrivacyPage/PrivacyOverview";
import InformationWeCollect from "@/components/PrivacyPage/InformationWeCollect";
import HowWeUseInformation from "@/components/PrivacyPage/HowWeUseInformation";
import DataSharing from "@/components/PrivacyPage/DataSharing";
import SecurityAndRetention from "@/components/PrivacyPage/SecurityAndRetention";
import RightsAndCookies from "@/components/PrivacyPage/RightsAndCookies";
import PrivacyContact from "@/components/PrivacyPage/PrivacyContact";

export const metadata: Metadata = {
  title: "Privacy Policy | Aman Digital Solutions",
  description:
    "Read the Privacy Policy for Aman Digital Solutions and learn how we collect, use, protect and handle personal information.",
  alternates: {
    canonical: "https://amandigitalsolutions.com/privacy",
  },
  openGraph: {
    title: "Privacy Policy | Aman Digital Solutions",
    description:
      "Learn how Aman Digital Solutions collects, uses and protects personal information.",
    url: "https://amandigitalsolutions.com/privacy",
    type: "website",
  },
};

export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-[#080808] text-white">
      <PrivacyHero />

      <PrivacyOverview />

      <InformationWeCollect />

      <HowWeUseInformation />

      <DataSharing />

      <SecurityAndRetention />

      <RightsAndCookies />

      <PrivacyContact />
    </main>
  );
}