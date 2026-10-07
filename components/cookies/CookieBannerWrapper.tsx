import { getSiteSettings } from "@/lib/site-settings/getSiteSettings";
import CookieBanner from "./CookieBanner";

export default async function CookieBannerWrapper() {
  const settings = await getSiteSettings();

  if (settings?.showCookieBanner !== true) {
    return null;
  }

  const message =
    settings?.cookieMessage?.trim() ||
    "We use cookies to improve your experience and analyze website performance.";

  return <CookieBanner message={message} />;
}