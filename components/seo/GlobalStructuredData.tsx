import {
  getOrganizationSchema,
  getWebsiteSchema,
  getProfessionalServiceSchema,
} from "@/lib/seo/schema";

export default function GlobalStructuredData() {
  const graph = [
    getOrganizationSchema(),
    getWebsiteSchema(),
    getProfessionalServiceSchema({
      email: "hello@amandigitalsolutions.com",
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