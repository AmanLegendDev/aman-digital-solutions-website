import type { MetadataRoute } from "next";

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ||
  "https://www.amandigitalsolutions.com";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Aman Digital Solutions",
    short_name: "Aman Digital",
    description:
      "Aman Digital Solutions builds fast, modern websites, web applications, SEO solutions and business systems for businesses worldwide.",
    start_url: "/",
    display: "standalone",
    background_color: "#050505",
    theme_color: "#050505",
    orientation: "portrait-primary",

    icons: [
      {
        src: `${SITE_URL}/icon.png`,
        sizes: "512x512",
        type: "image/png",
      },
    ],
  };
}