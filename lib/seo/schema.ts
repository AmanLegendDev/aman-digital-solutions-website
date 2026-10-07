const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL ||
  "https://www.amandigitalsolutions.com"
).replace(/\/$/, "");

const ORGANIZATION_ID =
  `${SITE_URL}/#organization`;

const WEBSITE_ID =
  `${SITE_URL}/#website`;

const PROFESSIONAL_SERVICE_ID =
  `${SITE_URL}/#professional-service`;

const DEFAULT_SITE_NAME =
  "Aman Digital Solutions";

const DEFAULT_DESCRIPTION =
  "Aman Digital Solutions builds modern websites, web applications, e-commerce platforms, SEO strategies and business systems for businesses worldwide.";

const DEFAULT_LOGO_URL =
  `${SITE_URL}/icon.png`;

/* =========================================================
   ORGANIZATION
========================================================= */

export function getOrganizationSchema({
  siteName = DEFAULT_SITE_NAME,
  description = DEFAULT_DESCRIPTION,
  logo,
  sameAs = [],
}: {
  siteName?: string;
  description?: string;
  logo?: string;
  sameAs?: string[];
} = {}) {
  const schema: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "Organization",

    "@id": ORGANIZATION_ID,

    name: siteName,

    url: SITE_URL,

    description,

    areaServed: {
      "@type": "Place",
      name: "Worldwide",
    },
  };

  const logoUrl =
    logo || DEFAULT_LOGO_URL;

  if (logoUrl) {
    schema.logo = {
      "@type": "ImageObject",

      "@id":
        `${SITE_URL}/#logo`,

      url: logoUrl,

      contentUrl: logoUrl,
    };
  }

  if (sameAs.length > 0) {
    schema.sameAs = sameAs;
  }

  return schema;
}

/* =========================================================
   PROFESSIONAL SERVICE
========================================================= */

export function getProfessionalServiceSchema({
  siteName = DEFAULT_SITE_NAME,
  description = DEFAULT_DESCRIPTION,
  telephone,
  email,
  address,
  city,
  state,
  country,
}: {
  siteName?: string;
  description?: string;
  telephone?: string;
  email?: string;
  address?: string;
  city?: string;
  state?: string;
  country?: string;
} = {}) {
  const schema: Record<string, unknown> = {
    "@context": "https://schema.org",

    "@type": "ProfessionalService",

    "@id":
      PROFESSIONAL_SERVICE_ID,

    name: siteName,

    url: SITE_URL,

    description,

    image: DEFAULT_LOGO_URL,

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

  if (
    address &&
    city &&
    country
  ) {
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

export function getWebsiteSchema({
  siteName = DEFAULT_SITE_NAME,
  description = DEFAULT_DESCRIPTION,
}: {
  siteName?: string;
  description?: string;
} = {}) {
  return {
    "@context": "https://schema.org",

    "@type": "WebSite",

    "@id": WEBSITE_ID,

    name: siteName,

    url: SITE_URL,

    description,

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

/* =========================================================
   COLLECTION PAGE
========================================================= */

export function getCollectionPageSchema({
  url,
  name,
  description,
  itemListId,
}: {
  url: string;
  name: string;
  description: string;
  itemListId: string;
}) {
  return {
    "@type": "CollectionPage",

    "@id": `${url}#collection`,

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

    mainEntity: {
      "@id": itemListId,
    },

    inLanguage: "en-IN",
  };
}

/* =========================================================
   ITEM LIST
========================================================= */

export function getItemListSchema({
  id,
  name,
  url,
  items,
}: {
  id: string;
  name: string;
  url: string;
  items: {
    name: string;
    url: string;
    image?: string;
    description?: string;
  }[];
}) {
  return {
    "@type": "ItemList",

    "@id": id,

    name,

    url,

    numberOfItems: items.length,

    itemListElement: items.map(
      (item, index) => ({
        "@type": "ListItem",

        position: index + 1,

        name: item.name,

        url: item.url,

        ...(item.image
          ? {
              image: item.image,
            }
          : {}),

        ...(item.description
          ? {
              description:
                item.description,
            }
          : {}),
      })
    ),
  };
}

/* =========================================================
   BLOG
========================================================= */

export function getBlogSchema({
  url,
  name,
  description,
  itemListId,
}: {
  url: string;
  name: string;
  description: string;
  itemListId: string;
}) {
  return {
    "@type": "Blog",

    "@id": `${url}#blog`,

    name,

    description,

    url,

    publisher: {
      "@id": ORGANIZATION_ID,
    },

    mainEntity: {
      "@id": itemListId,
    },

    isPartOf: {
      "@id": WEBSITE_ID,
    },

    inLanguage: "en-IN",
  };
}