import { getSiteSettings } from "@/lib/site-settings/getSiteSettings";

import NavbarClient from "./NavbarClient";

export default async function Navbar() {
  const settings = await getSiteSettings();

  const siteName =
    settings?.siteName?.trim() ||
    "Aman Digital Solutions";

  const tagline =
    settings?.tagline?.trim() ||
    "Web Development & Digital Solutions";

  const logoUrl =
    settings?.logo?.url?.trim() ||
    "/logo.png";

  const logoAlt =
    settings?.logo?.alt?.trim() ||
    siteName;

  const whatsappNumber =
    settings?.whatsappNumber?.trim() ||
    settings?.contact?.whatsapp?.trim();

  const whatsappUrl = whatsappNumber
    ? `https://wa.me/${whatsappNumber.replace(/\D/g, "")}`
    : undefined;

  return (
    <NavbarClient
      siteName={siteName}
      tagline={tagline}
      logoUrl={logoUrl}
      logoAlt={logoAlt}
      whatsappUrl={whatsappUrl}
    />
  );
}