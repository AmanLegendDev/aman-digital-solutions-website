const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ||
  "https://www.amandigitalsolutions.com";

const SITE_NAME = "Aman Digital Solutions";

const LOGO_URL = `${SITE_URL}/icon.png`;

const ORGANIZATION_ID = `${SITE_URL}/#organization`;
const WEBSITE_ID = `${SITE_URL}/#website`;
const PROFESSIONAL_SERVICE_ID =
  `${SITE_URL}/#professional-service`;

/* =========================================================
   ORGANIZATION
========================================================= */

export function getOrganizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",

    "@id": ORGANIZATION_ID,

    name: SITE_NAME,

    url: SITE_URL,

    description:
      "Aman Digital Solutions builds modern websites, web applications, e-commerce platforms, SEO strategies and business systems for businesses in India and worldwide.",

    logo: {
      "@type": "ImageObject",

      "@id": `${SITE_URL}/#logo`,

      url: LOGO_URL,

      contentUrl: LOGO_URL,
    },

    sameAs: [
      "https://www.instagram.com/amandigital.solutions/",
      "https://www.linkedin.com/in/amancodes60/",
    ],

    areaServed: {
      "@type": "Place",
      name: "Worldwide",
    },
  };
}

/* =========================================================
   PROFESSIONAL SERVICE
========================================================= */

export function getProfessionalServiceSchema({
  telephone,
  email,
  address,
  city,
  state,
  country,
}: {
  telephone?: string;
  email?: string;
  address?: string;
  city?: string;
  state?: string;
  country?: string;
}) {
  const schema: Record<string, unknown> = {
    "@context": "https://schema.org",

    "@type": "ProfessionalService",

    "@id": PROFESSIONAL_SERVICE_ID,

    name: SITE_NAME,

    url: SITE_URL,

    description:
      "Aman Digital Solutions provides website development, web applications, e-commerce solutions, SEO, digital marketing and business systems for businesses in India and worldwide.",

    image: LOGO_URL,

    provider: {
      "@id": ORGANIZATION_ID,
    },

    areaServed: {
      "@type": "Place",
      name: "Worldwide",
    },
  };

  if (telephone) {
    schema.telephone = telephone;
  }

  if (email) {
    schema.email = email;
  }

  if (address && city && country) {
    schema.address = {
      "@type": "PostalAddress",

      streetAddress: address,

      addressLocality: city,

      ...(state
        ? {
            addressRegion: state,
          }
        : {}),

      addressCountry: country,
    };
  }

  return schema;
}

/* =========================================================
   WEBSITE
========================================================= */

export function getWebsiteSchema() {
  return {
    "@context": "https://schema.org",

    "@type": "WebSite",

    "@id": WEBSITE_ID,

    name: SITE_NAME,

    url: SITE_URL,

    description:
      "Aman Digital Solutions builds modern websites, web applications, e-commerce platforms, SEO strategies and business systems for businesses worldwide.",

    publisher: {
      "@id": ORGANIZATION_ID,
    },

    inLanguage: "en-IN",
  };
}

/* =========================================================
   WEBPAGE
========================================================= */

export function getWebPageSchema({
  url,
  name,
  description,
  image,
}: {
  url: string;
  name: string;
  description: string;
  image?: string;
}) {
  const schema: Record<string, unknown> = {
    "@context": "https://schema.org",

    "@type": "WebPage",

    "@id": `${url}#webpage`,

    url,

    name,

    description,

    isPartOf: {
      "@id": WEBSITE_ID,
    },

    about: {
      "@id": ORGANIZATION_ID,
    },

    publisher: {
      "@id": ORGANIZATION_ID,
    },

    inLanguage: "en-IN",
  };

  if (image) {
    schema.primaryImageOfPage = {
      "@type": "ImageObject",

      url: image,
    };
  }

  return schema;
}

/* =========================================================
   BREADCRUMB
========================================================= */

export function getBreadcrumbSchema(
  items: {
    name: string;
    url: string;
  }[]
) {
  return {
    "@context": "https://schema.org",

    "@type": "BreadcrumbList",

    itemListElement: items.map(
      (item, index) => ({
        "@type": "ListItem",

        position: index + 1,

        name: item.name,

        item: item.url,
      })
    ),
  };
}