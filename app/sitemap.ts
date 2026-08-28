import type { MetadataRoute } from "next";

import { connectDB } from "@/lib/db/connect";

import Service from "@/models/Service";
import Project from "@/models/Project";
import Gallery from "@/models/Gallery";
import Blog from "@/models/Blog";

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ||
  "https://www.amandigitalsolutions.com";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  await connectDB();

  const [services, projects, galleries, blogs] =
    await Promise.all([
      Service.find({
        published: true,
      })
        .select("slug updatedAt")
        .lean(),

      Project.find({
        published: true,
      })
        .select("slug updatedAt")
        .lean(),

      Gallery.find({
        published: true,
      })
        .select("slug updatedAt")
        .lean(),

      Blog.find({
        published: true,
      })
        .select("slug updatedAt")
        .lean(),
    ]);

  /* =======================================================
     STATIC PAGES
  ======================================================= */

  const staticPages: MetadataRoute.Sitemap = [
    {
      url: SITE_URL,
      changeFrequency: "weekly",
      priority: 1,
    },

    {
      url: `${SITE_URL}/services`,
      changeFrequency: "weekly",
      priority: 0.9,
    },

    {
      url: `${SITE_URL}/projects`,
      changeFrequency: "weekly",
      priority: 0.9,
    },

    {
      url: `${SITE_URL}/gallery`,
      changeFrequency: "weekly",
      priority: 0.8,
    },

    {
      url: `${SITE_URL}/pricing`,
      changeFrequency: "weekly",
      priority: 0.9,
    },

    {
      url: `${SITE_URL}/blog`,
      changeFrequency: "weekly",
      priority: 0.8,
    },

    {
      url: `${SITE_URL}/faq`,
      changeFrequency: "monthly",
      priority: 0.7,
    },

    {
      url: `${SITE_URL}/about`,
      changeFrequency: "monthly",
      priority: 0.7,
    },

    {
      url: `${SITE_URL}/contact`,
      changeFrequency: "monthly",
      priority: 0.9,
    },

    {
      url: `${SITE_URL}/start-a-project`,
      changeFrequency: "monthly",
      priority: 1,
    },

    {
      url: `${SITE_URL}/privacy`,
      changeFrequency: "yearly",
      priority: 0.3,
    },

    {
      url: `${SITE_URL}/terms`,
      changeFrequency: "yearly",
      priority: 0.3,
    },
  ];

  /* =======================================================
     SERVICE PAGES
  ======================================================= */

  const servicePages: MetadataRoute.Sitemap =
    services.map((service) => ({
      url: `${SITE_URL}/services/${service.slug}`,

      lastModified: service.updatedAt
        ? new Date(service.updatedAt)
        : undefined,

      changeFrequency: "monthly",

      priority: 0.8,
    }));

  /* =======================================================
     PROJECT PAGES
  ======================================================= */

  const projectPages: MetadataRoute.Sitemap =
    projects.map((project) => ({
      url: `${SITE_URL}/projects/${project.slug}`,

      lastModified: project.updatedAt
        ? new Date(project.updatedAt)
        : undefined,

      changeFrequency: "monthly",

      priority: 0.8,
    }));

  /* =======================================================
     GALLERY PAGES
  ======================================================= */

  const galleryPages: MetadataRoute.Sitemap =
    galleries.map((gallery) => ({
      url: `${SITE_URL}/gallery/${gallery.slug}`,

      lastModified: gallery.updatedAt
        ? new Date(gallery.updatedAt)
        : undefined,

      changeFrequency: "monthly",

      priority: 0.6,
    }));

  /* =======================================================
     BLOG PAGES
  ======================================================= */

  const blogPages: MetadataRoute.Sitemap =
    blogs.map((blog) => ({
      url: `${SITE_URL}/blog/${blog.slug}`,

      lastModified: blog.updatedAt
        ? new Date(blog.updatedAt)
        : undefined,

      changeFrequency: "monthly",

      priority: 0.7,
    }));

  /* =======================================================
     FINAL SITEMAP
  ======================================================= */

  return [
    ...staticPages,
    ...servicePages,
    ...projectPages,
    ...galleryPages,
    ...blogPages,
  ];
}