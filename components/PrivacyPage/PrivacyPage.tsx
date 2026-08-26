import PrivacyHero from "./PrivacyHero";
import PrivacyOverview from "./PrivacyOverview";
import InformationWeCollect from "./InformationWeCollect";
import HowWeUseInformation from "./HowWeUseInformation";
import DataSharing from "./DataSharing";
import SecurityAndRetention from "./SecurityAndRetention";
import RightsAndCookies from "./RightsAndCookies";
import PrivacyContact from "./PrivacyContact";

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