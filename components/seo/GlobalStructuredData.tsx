import {
  getOrganizationSchema,
  getWebsiteSchema,
  getProfessionalServiceSchema,
} from "@/lib/seo/schema";

import { getSiteSettings } from "@/lib/site-settings/getSiteSettings";

export default async function GlobalStructuredData() {
  const settings = await getSiteSettings();

  const siteName =
    settings?.siteName ||
    "Aman Digital Solutions";

  const siteDescription =
    settings?.description ||
    "Aman Digital Solutions is a Shimla-based web development and digital solutions studio.";

  const email =
    settings?.contact?.email ||
    settings?.primaryEmail;

  const phone =
    settings?.contact?.phone ||
    settings?.primaryPhone;

  const address =
    settings?.contact?.address;

  const city =
    settings?.contact?.city;

  const state =
    settings?.contact?.state;

  const country =
    settings?.contact?.country;

  const logo =
    settings?.logo?.url ||
    settings?.defaultOgImage?.url;

  const socialLinks =
    settings?.socialLinks || {};

  const sameAs = Object.values(
    socialLinks
  ).filter(
    (value): value is string =>
      typeof value === "string" &&
      value.trim().length > 0
  );

  const graph = [
    getOrganizationSchema({
      siteName,
      description: siteDescription,
      logo,
      sameAs,
    }),

    getWebsiteSchema({
      siteName,
      description: siteDescription,
    }),

    getProfessionalServiceSchema({
      siteName,
      description: siteDescription,
      telephone: phone,
      email,
      address,
      city,
      state,
      country,
    }),
  ];

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          "@context": "https://schema.org",
          "@graph": graph,
        }),
      }}
    />
  );
}