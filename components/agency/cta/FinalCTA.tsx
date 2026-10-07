import { getSiteSettings } from "@/lib/site-settings/getSiteSettings";

import FinalCTAContent from "./FinalCTAContent";

export default async function FinalCTA() {
  const settings = await getSiteSettings();

  const email =
    settings?.primaryEmail?.trim() ||
    settings?.contact?.email?.trim() ||
    "";

  return <FinalCTAContent email={email} />;
}