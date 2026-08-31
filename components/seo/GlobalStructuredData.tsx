import {
  getOrganizationSchema,
  getWebsiteSchema,
  getProfessionalServiceSchema,
} from "@/lib/seo/schema";

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ||
  "https://www.amandigitalsolutions.com";

export default function GlobalStructuredData() {
  const organizationSchema = getOrganizationSchema();

  const websiteSchema = getWebsiteSchema();

  const professionalServiceSchema =
    getProfessionalServiceSchema({
      email: "hello@amandigitalsolutions.com",
    });

  return (
    <>
      {/* ORGANIZATION */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            organizationSchema
          ),
        }}
      />

      {/* WEBSITE */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            websiteSchema
          ),
        }}
      />

      {/* PROFESSIONAL SERVICE */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            professionalServiceSchema
          ),
        }}
      />
    </>
  );
}