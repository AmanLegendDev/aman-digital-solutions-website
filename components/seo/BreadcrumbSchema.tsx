type BreadcrumbItem = {
  name: string;
  url: string;
};

type BreadcrumbSchemaProps = {
  items: BreadcrumbItem[];
};

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ||
  "https://www.amandigitalsolutions.com";

export default function BreadcrumbSchema({
  items,
}: BreadcrumbSchemaProps) {
  const itemListElement = items.map(
    (item, index) => ({
      "@type": "ListItem",

      position: index + 1,

      name: item.name,

      item: item.url.startsWith("http")
        ? item.url
        : `${SITE_URL}${item.url}`,
    })
  );

  const jsonLd = {
    "@context": "https://schema.org",

    "@type": "BreadcrumbList",

    itemListElement,
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(jsonLd),
      }}
    />
  );
}