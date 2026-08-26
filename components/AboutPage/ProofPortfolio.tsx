import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, ExternalLink } from "lucide-react";

const PROJECTS = [
  {
    title: "Mechanic Near You",
    client: "Mechanic Near You Auto Services",
    location: "Australia",
    type: "Real client project",
    description:
      "A modern automotive service platform designed to help vehicle owners discover relevant mechanics and automotive services.",
    image:
      "https://res.cloudinary.com/du8kmbwz1/image/upload/v1787304177/aman-digital-solutions/hohpmqyl843n95gla81p.jpg",
    href: "/projects/mechanic-near-you",
    liveUrl: "https://www.mechanicnearyou.com.au/",
  },
  {
    title: "GR Pest Control",
    client: "GR Pest Control",
    location: "Sydney, Australia",
    type: "Real client project",
    description:
      "A professional service website created to present pest control services, locations and customer-focused information through a clear digital experience.",
    image: "",
    href: "/projects/gr-pest-control",
    liveUrl: "https://www.grpestscontrol.com.au/",
  },
  {
    title: "Aarav Gift Gallery",
    client: "Aarav Gift Gallery",
    location: "Panthaghati, Shimla",
    type: "Real client project",
    description:
      "A complete e-commerce experience for a local gift store with product discovery, categories, cart, ordering and a CMS-powered product catalogue.",
    image: "",
    href: "/projects/aarav-gift-gallery",
    liveUrl: "https://www.aaravgiftgallery.com/",
  },
];

export default function ProofPortfolio() {
  return (
    <section className="relative overflow-hidden bg-[#080808] py-20 sm:py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
        {/* HEADER */}
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <div className="max-w-3xl">
            <span className="text-xs font-semibold uppercase tracking-[0.17em] text-[#FFC400]">
              Work in the real world
            </span>

            <h2 className="mt-4 text-3xl font-semibold leading-tight tracking-[-0.045em] text-white sm:text-4xl lg:text-5xl">
              Built for businesses.
              <span className="block text-neutral-500">
                Not just for a portfolio.
              </span>
            </h2>

            <p className="mt-6 max-w-2xl text-sm leading-7 text-neutral-500 sm:text-base">
              A few examples of work delivered for real businesses. Each
              project has different requirements, which is exactly why we
              approach every build around the business behind it.
            </p>
          </div>

          <Link
            href="/projects"
            className="
              group inline-flex shrink-0 items-center gap-2
              text-sm font-medium text-neutral-300
              transition-colors hover:text-white
            "
          >
            View all work

            <ArrowUpRight
              size={15}
              className="
                text-[#FFC400]
                transition-transform duration-200
                group-hover:-translate-y-0.5
                group-hover:translate-x-0.5
              "
            />
          </Link>
        </div>

        {/* PROJECTS */}
        <div className="mt-12 grid gap-4 lg:grid-cols-3">
          {PROJECTS.map((project) => (
            <article
              key={project.title}
              className="
                group overflow-hidden
                rounded-3xl
                border border-white/[0.08]
                bg-white/[0.025]
                transition-all duration-300
                hover:-translate-y-1
                hover:border-white/[0.14]
              "
            >
              {/* IMAGE */}
              <div className="relative aspect-[16/10] overflow-hidden bg-[#111111]">
                {project.image ? (
                  <Image
                    src={project.image}
                    alt={`${project.title} project preview`}
                    fill
                    sizes="(max-width: 1024px) 100vw, 33vw"
                    className="
                      object-cover
                      transition-transform duration-700
                      group-hover:scale-[1.035]
                    "
                  />
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-xs text-neutral-700">
                      Project preview
                    </span>
                  </div>
                )}

                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

                <span
                  className="
                    absolute left-4 top-4
                    rounded-full
                    border border-white/[0.1]
                    bg-black/50
                    px-3 py-1.5
                    text-[10px]
                    font-semibold
                    text-white
                    backdrop-blur-md
                  "
                >
                  {project.type}
                </span>
              </div>

              {/* CONTENT */}
              <div className="p-6">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-[#FFC400]">
                      {project.location}
                    </p>

                    <h3 className="mt-2 text-xl font-semibold tracking-[-0.03em] text-white">
                      {project.title}
                    </h3>
                  </div>

                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Visit ${project.title} website`}
                    className="
                      flex h-9 w-9 shrink-0 items-center justify-center
                      rounded-full
                      border border-white/[0.08]
                      text-neutral-500
                      transition-all duration-200
                      hover:border-[#FFC400]/25
                      hover:text-[#FFC400]
                    "
                  >
                    <ExternalLink size={14} />
                  </a>
                </div>

                <p className="mt-4 text-sm leading-6 text-neutral-500">
                  {project.description}
                </p>

                <Link
                  href={project.href}
                  className="
                    group/link mt-6 inline-flex items-center gap-2
                    text-sm font-medium text-neutral-300
                    hover:text-white
                  "
                >
                  View case study

                  <ArrowUpRight
                    size={14}
                    className="
                      text-[#FFC400]
                      transition-transform duration-200
                      group-hover/link:-translate-y-0.5
                      group-hover/link:translate-x-0.5
                    "
                  />
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}