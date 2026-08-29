const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ||
  "https://www.amandigitalsolutions.com";

const ORGANIZATION_ID = `${SITE_URL}/#organization`;
const WEBSITE_ID = `${SITE_URL}/#website`;

export default function GlobalStructuredData() {
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",

    "@id": ORGANIZATION_ID,

    name: "Aman Digital Solutions",

    url: SITE_URL,

    description:
      "Aman Digital Solutions builds modern websites, web applications, e-commerce platforms, SEO solutions and business systems for businesses in India and worldwide.",

    logo: {
      "@type": "ImageObject",
      url: `${SITE_URL}/icon.png`,
    },

    sameAs: [
      "https://www.instagram.com/amandigital.solutions/",
      "https://www.linkedin.com/in/amancodes60/",
    ],
  };

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",

    "@id": WEBSITE_ID,

    name: "Aman Digital Solutions",

    url: SITE_URL,

    description:
      "Modern websites, web applications, e-commerce platforms, SEO and business systems for businesses in India and worldwide.",

    publisher: {
      "@id": ORGANIZATION_ID,
    },

    inLanguage: "en-IN",
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            organizationSchema
          ),
        }}
      />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            websiteSchema
          ),
        }}
      />
    </>
  );
}