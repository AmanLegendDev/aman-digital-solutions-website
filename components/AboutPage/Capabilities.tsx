import {
  BrainCircuit,
  CodeXml,
  Database,
  Gauge,
  LayoutDashboard,
  SearchCheck,
  ServerCog,
  Workflow,
} from "lucide-react";

const CAPABILITIES = [
  {
    icon: CodeXml,
    title: "Modern Full-Stack Development",
    description:
      "We build complete digital products across the frontend and backend, combining polished interfaces, application logic, APIs and reliable data systems.",
    tags: ["Next.js", "React", "Node.js"],
  },
  {
    icon: LayoutDashboard,
    title: "Custom CMS & Admin Systems",
    description:
      "Purpose-built admin systems make it easier to manage products, services, content, orders and other important business information from one place.",
    tags: ["CMS", "CRUD", "Dashboards"],
  },
  {
    icon: BrainCircuit,
    title: "AI-Powered Experiences",
    description:
      "AI can be integrated where it creates practical value, from intelligent assistance and content workflows to smarter product experiences and business automation.",
    tags: ["AI", "Automation", "Smart UX"],
  },
  {
    icon: SearchCheck,
    title: "SEO-Ready Architecture",
    description:
      "Search visibility is considered from the foundation through structured content, metadata, technical SEO, performance and crawl-friendly architecture.",
    tags: ["SEO", "Metadata", "Performance"],
  },
  {
    icon: Database,
    title: "Data & Application Architecture",
    description:
      "We structure databases, application logic and APIs around the actual requirements of each digital product, with room for future growth.",
    tags: ["MongoDB", "Mongoose", "APIs"],
  },
  {
    icon: Workflow,
    title: "Business Workflows & Automation",
    description:
      "Digital workflows can connect forms, orders, notifications, content and internal processes to reduce repetitive work and improve how a business operates.",
    tags: ["Workflows", "Integrations", "Automation"],
  },
  {
    icon: Gauge,
    title: "Performance & Responsive UX",
    description:
      "Interfaces are designed to be fast, accessible and consistent across phones, tablets and desktop devices, with performance treated as part of the product.",
    tags: ["Responsive", "UX", "Performance"],
  },
  {
    icon: ServerCog,
    title: "Deployment & Infrastructure",
    description:
      "We handle the practical technical foundation behind getting digital products online, including deployment, assets, hosting configuration and ongoing improvements.",
    tags: ["Cloudinary", "Vercel", "Deployment"],
  },
];

export default function Capabilities() {
  return (
    <section
      className="relative overflow-hidden bg-[#080808] py-20 sm:py-24 lg:py-32"
      aria-labelledby="capabilities-heading"
    >
      <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="max-w-3xl">
          <span className="text-xs font-semibold uppercase tracking-[0.17em] text-[#FFC400]">
            Capabilities
          </span>

          <h2
            id="capabilities-heading"
            className="mt-4 text-3xl font-semibold leading-tight tracking-[-0.045em] text-white sm:text-4xl lg:text-5xl"
          >
            The technology is important.
            <span className="block text-neutral-500">
              Knowing where to use it matters more.
            </span>
          </h2>

          <p className="mt-6 max-w-2xl text-sm leading-7 text-neutral-500 sm:text-base">
            Our capabilities cover the development, design and digital
            infrastructure needed to turn real business requirements into
            useful, scalable digital products.
          </p>
        </div>

        {/* Capabilities */}
        <div className="mt-12 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {CAPABILITIES.map((item) => {
            const Icon = item.icon;

            return (
              <article
                key={item.title}
                className="
                  group rounded-3xl
                  border border-white/[0.08]
                  bg-white/[0.025]
                  p-6
                  transition-all duration-300
                  hover:-translate-y-1
                  hover:border-[#FFC400]/20
                "
              >
                <div
                  className="
                    flex h-11 w-11 items-center justify-center
                    rounded-2xl
                    border border-white/[0.08]
                    bg-black/20
                    text-neutral-400
                    transition-colors duration-300
                    group-hover:border-[#FFC400]/20
                    group-hover:text-[#FFC400]
                  "
                >
                  <Icon
                    size={18}
                    strokeWidth={1.7}
                    aria-hidden="true"
                  />
                </div>

                <h3 className="mt-7 text-base font-semibold tracking-[-0.02em] text-white">
                  {item.title}
                </h3>

                <p className="mt-3 text-sm leading-6 text-neutral-500">
                  {item.description}
                </p>

                <div className="mt-5 flex flex-wrap gap-1.5">
                  {item.tags.map((tag) => (
                    <span
                      key={tag}
                      className="
                        rounded-full
                        border border-white/[0.07]
                        bg-white/[0.02]
                        px-2.5 py-1
                        text-[10px]
                        font-medium
                        text-neutral-500
                      "
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}