import { connectDB } from "@/lib/db/connect";
import Service from "@/models/Service";
import Project from "@/models/Project";

type CatalogData = {
  services: Array<{ title: string; slug: string; startingPrice: number | null }>;
  projects: Array<{ title: string; slug: string; industry: string }>;
};

let cache: { at: number; data: CatalogData } | null = null;

export async function getCatalogData(): Promise<CatalogData> {
  if (cache && Date.now() - cache.at < 60_000) return cache.data;

  try {
    await connectDB();

    const [services, projects] = await Promise.all([
      Service.find({ published: true })
        .select("title slug startingPrice")
        .sort({ displayOrder: 1 })
        .limit(20)
        .lean(),
      Project.find({ published: true })
        .select("title slug industry")
        .sort({ displayOrder: 1 })
        .limit(30)
        .lean(),
    ]);

    const data: CatalogData = {
      services: (services as any[]).map((s) => ({
        title: String(s.title ?? ""),
        slug: String(s.slug ?? ""),
        startingPrice: typeof s.startingPrice === "number" ? s.startingPrice : null,
      })),
      projects: (projects as any[]).map((p) => ({
        title: String(p.title ?? ""),
        slug: String(p.slug ?? ""),
        industry: String(p.industry ?? ""),
      })),
    };

    cache = { at: Date.now(), data };

    return data;
  } catch {
    return cache?.data ?? { services: [], projects: [] };
  }
}

export async function getAMICatalog(): Promise<string> {
  const { services, projects } = await getCatalogData();

  if (services.length === 0 && projects.length === 0) return "";

  const s = services
    .map((x) => `${x.title} | from ₹${x.startingPrice ?? "custom"} | /services/${x.slug}`)
    .join("\n");

  const p = projects
    .map((x) => `${x.title} | ${x.industry} | /projects/${x.slug}`)
    .join("\n");

  return `CATALOG (complete list of ALL published items; if something is not here, ADS does not list it, but Aman may still discuss custom work):\nSERVICES:\n${s}\nPROJECTS:\n${p}`;
}

const compact = (value: string) => value.toLowerCase().replace(/[^a-z0-9]/g, "");

/** Finds a published project that the visitor named in their message. */
export function findNamedProject(
  message: string,
  projects: CatalogData["projects"],
): { title: string; slug: string } | null {
  const text = compact(message);
  let best: { title: string; slug: string; len: number } | null = null;

  for (const project of projects) {
    const first = project.title.split(/\s[–—-]\s|:/)[0];
    const names = [project.title, first, first.replace(/^the\s+/i, "")]
      .map(compact)
      .filter((n) => n.length >= 6);

    for (const name of names) {
      if (text.includes(name) && (!best || name.length > best.len)) {
        best = { title: project.title, slug: project.slug, len: name.length };
      }
    }
  }

  return best ? { title: best.title, slug: best.slug } : null;
}