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
      "From polished frontends to secure backend systems, we build complete digital products rather than isolated interfaces.",
    tags: ["Next.js", "React", "Node.js"],
  },
  {
    icon: LayoutDashboard,
    title: "Custom CMS & Admin Systems",
    description:
      "Business owners can manage products, services, content, orders and other important information through purpose-built admin experiences.",
    tags: ["CMS", "CRUD", "Dashboards"],
  },
  {
    icon: BrainCircuit,
    title: "AI-Powered Experiences",
    description:
      "AI can be integrated where it provides practical value, from intelligent assistance to content-driven experiences and business workflows.",
    tags: ["AI", "Automation", "Smart UX"],
  },
  {
    icon: SearchCheck,
    title: "SEO-Ready Architecture",
    description:
      "Search visibility is considered from the foundation through structured content, metadata, performance and crawl-friendly architecture.",
    tags: ["SEO", "Metadata", "Performance"],
  },
  {
    icon: Database,
    title: "Data & Application Architecture",
    description:
      "Scalable data structures and application architecture designed around the actual requirements of each digital product.",
    tags: ["MongoDB", "Mongoose", "APIs"],
  },
  {
    icon: Workflow,
    title: "Business Workflows",
    description:
      "Digital workflows can connect forms, orders, notifications, content and internal processes into a system that saves manual effort.",
    tags: ["Workflows", "Integrations", "Automation"],
  },
  {
    icon: Gauge,
    title: "Performance & Responsive UX",
    description:
      "Interfaces are designed to remain fast, usable and visually consistent across phones, tablets and desktop devices.",
    tags: ["Responsive", "UX", "Performance"],
  },
  {
    icon: ServerCog,
    title: "Deployment & Infrastructure",
    description:
      "We handle the practical side of getting a digital product online and keeping its technical foundation ready for ongoing development.",
    tags: ["Cloudinary", "Vercel", "Deployment"],
  },
];

export default function Capabilities() {
  return (
    <section className="relative overflow-hidden bg-[#080808] py-20 sm:py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
        <div className="max-w-3xl">
          <span className="text-xs font-semibold uppercase tracking-[0.17em] text-[#FFC400]">
            Capabilities
          </span>

          <h2 className="mt-4 text-3xl font-semibold leading-tight tracking-[-0.045em] text-white sm:text-4xl lg:text-5xl">
            The technology is important.
            <span className="block text-neutral-500">
              Knowing where to use it matters more.
            </span>
          </h2>

          <p className="mt-6 max-w-2xl text-sm leading-7 text-neutral-500 sm:text-base">
            Our capabilities cover the development, design and digital
            infrastructure needed to turn a business requirement into a
            usable product.
          </p>
        </div>

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
                  <Icon size={18} />
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