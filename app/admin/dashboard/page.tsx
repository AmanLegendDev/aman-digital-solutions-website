import {
  BadgeIndianRupee,
  BookOpen,
  BriefcaseBusiness,
  CircleHelp,
  Images,
  MapPin,
  MessageSquareQuote,
  Settings2,
  Wrench,
} from "lucide-react";
import { getServerSession } from "next-auth";
import AdminEditCard from "@/components/admin/AdminEditCard";

import { authOptions } from "@/lib/auth/auth";
import AdminCreateCard from "@/components/admin/AdminCreateCard";

const CREATE_ITEMS = [
  {
    title: "Service",
    description:
      "Create a new service offering for the public website.",
    icon: Wrench,
    href: "/admin/services/new",
  },
  {
    title: "Project",
    description:
      "Add a completed project to the agency portfolio.",
    icon: BriefcaseBusiness,
    href: "/admin/projects/new",
  },
  {
    title: "Location",
    description:
      "Create a new service location or target market.",
    icon: MapPin,
    href: "/admin/locations/new",
  },
  {
    title: "Testimonial",
    description:
      "Add a client testimonial and supporting details.",
    icon: MessageSquareQuote,
    href: "/admin/testimonials/new",
  },
  {
    title: "Gallery Item",
    description:
      "Upload and add a new image or visual to the gallery.",
    icon: Images,
    href: "/admin/gallery/new",
  },
  {
    title: "Blog Post",
    description:
      "Create a new SEO-focused article or blog post.",
    icon: BookOpen,
    href: "/admin/blog/new",
  },
  {
    title: "FAQ",
    description:
      "Create a new frequently asked question and answer.",
    icon: CircleHelp,
    href: "/admin/faq/new",
  },

  {
  title: "Pricing",
  description:
    "Create and manage pricing plans offered by Aman Digital Solutions.",
  icon: BadgeIndianRupee,
  href: "/admin/pricing/new",
},
  {
    title: "Site Settings",
    description:
      "Manage central website branding and business settings.",
    icon: Settings2,
    href: "/admin/settings",
  },
] as const;

export default async function AdminDashboardPage() {
  const session = await getServerSession(authOptions);

  return (
    <main className="min-h-screen bg-[#050505] px-6 py-10 text-[#F5F5F5]">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="border-b border-[#252525] pb-8">
          <p className="text-xs font-medium uppercase tracking-[0.2em] text-[#FFC400]">
            Control Center
          </p>

          <div className="mt-3 flex flex-col justify-between gap-4 md:flex-row md:items-end">
            <div>
              <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
                Welcome back,{" "}
                {session?.user?.name ?? "Admin"}.
              </h1>

              <p className="mt-3 max-w-2xl text-sm leading-6 text-[#A1A1A1]">
                Manage the content and business data that powers
                Aman Digital Solutions.
              </p>
            </div>

            <div className="rounded-full border border-[#252525] bg-[#0D0D0D] px-4 py-2 text-xs text-[#A1A1A1]">
              Admin
            </div>
          </div>
        </div>

        {/* Create section */}
        <section className="pt-10">
          <div className="mb-6">
            <h2 className="text-xl font-semibold">
              Create Content
            </h2>

            <p className="mt-1 text-sm text-[#A1A1A1]">
              Add new content to your website CMS.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {CREATE_ITEMS.map((item) => (
              <AdminCreateCard
                key={item.title}
                title={item.title}
                description={item.description}
                icon={item.icon}
                href={item.href}
              />
            ))}
          </div>
        </section>
      </div>
      {/* =========================================================
    EDIT CONTENT
========================================================= */}

<section className="pt-14">
  <div className="mb-6">
    <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#FFC400]">
      Content Management
    </p>

    <h2 className="mt-2 text-xl font-semibold">
      Edit Content
    </h2>

    <p className="mt-1 text-sm text-[#A1A1A1]">
      Update existing website content and keep your
      public pages current.
    </p>
  </div>

  <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
    {/* Services */}

    <AdminEditCard
      title="Services"
      description="Edit existing services, descriptions, pricing details and SEO content."
      icon={Wrench}
      href="/admin/services"
    />

    {/* Projects */}

    <AdminEditCard
      title="Projects"
      description="Update portfolio projects, features, technologies, media and SEO details."
      icon={BriefcaseBusiness}
      href="/admin/projects"
    />

    {/* Locations */}

    <AdminEditCard
      title="Locations"
      description="Manage service locations, contact information, descriptions and SEO."
      icon={MapPin}
      href="/admin/locations"
    />

    {/* Testimonials */}

    <AdminEditCard
      title="Testimonials"
      description="Update client testimonials and their public visibility."
      icon={MessageSquareQuote}
      href="/admin/testimonials"
    />

    {/* Gallery */}

    <AdminEditCard
      title="Gallery"
      description="Manage gallery collections, media, captions and visibility."
      icon={Images}
      href="/admin/gallery"
    />

    {/* Blog */}

    <AdminEditCard
      title="Blog"
      description="Edit articles, categories, tags, publishing and SEO content."
      icon={BookOpen}
      href="/admin/blog"
    />

    {/* FAQ */}

    <AdminEditCard
      title="FAQ"
      description="Update frequently asked questions, answers and related content."
      icon={CircleHelp}
      href="/admin/faq"
    />

    {/* Pricing */}

    <AdminEditCard
      title="Pricing"
      description="Manage pricing plans, features, billing periods and visibility."
      icon={BadgeIndianRupee}
      href="/admin/pricing"
    />
  </div>
</section>
    </main>
  );
}