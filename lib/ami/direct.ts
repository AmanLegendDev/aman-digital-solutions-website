import type { AMIResponse, AMIResponseBlock, AMIAction, AMIIntent } from "./types";
import type { AMIRetrievedData } from "./retrieve";

type Rec = Record<string, any>;

const inr = (n: number) => `₹${n.toLocaleString("en-IN")}`;
const str = (v: unknown) => (typeof v === "string" ? v.trim() : "");

const START: AMIAction = { type: "START_PROJECT", label: "Start a Project", href: "/start-a-project" };

function reply(
  intent: AMIIntent,
  message: string,
  blocks: AMIResponseBlock[] = [],
  actions: AMIAction[] = [START],
): AMIResponse {
  return { message, intent, blocks, actions, contextPatch: {}, needsInput: false, nextQuestion: null };
}

function priceText(s: Rec): string {
  if (typeof s.startingPrice === "number") return `${str(s.priceLabel) || "Starting from"} ${inr(s.startingPrice)}`.trim();
  return str(s.priceLabel) || "Custom quote";
}

export function buildDirectResponse(
  intent: AMIIntent,
  data: AMIRetrievedData,
  preferredServiceSlug?: string,
): AMIResponse | null {
  if (data.retrievalError) return null;

  /* ---------- PRICING ---------- */
  if (intent === "PRICING") {
    const items = (data.pricing as Rec[]).filter((p) => p.source === "service");
    if (items.length === 0) return null;

    const lines = items.map((p) => `• ${p.title}: ${priceText(p)}`).join("\n");
    return reply(
      "PRICING",
      `Here are our verified starting prices:\n${lines}\n\nFinal cost depends on your scope. Tell me which service you need and I'll guide you.`,
      items.slice(0, 6).map((p): AMIResponseBlock => ({
        type: "pricing",
        title: p.title,
        ...(typeof p.startingPrice === "number" ? { price: p.startingPrice } : {}),
        priceLabel: str(p.priceLabel) || undefined,
        href: p.href || undefined,
      })),
    );
  }

  /* ---------- OFFERS ---------- */
  if (intent === "OFFER") {
    const offers = data.offers as Rec[];
    if (offers.length === 0) {
      return reply("OFFER", "There are no active offers right now. You can check our pricing or start a project for a custom quote.", [], [
        { type: "VIEW_PRICING", label: "View Pricing", href: "/pricing" },
        START,
      ]);
    }
    return reply(
      "OFFER",
      `We have ${offers.length} active offer${offers.length > 1 ? "s" : ""} right now:`,
      offers.slice(0, 4).map((o): AMIResponseBlock => ({
        type: "offer",
        offerId: o.id || undefined,
        slug: o.slug || undefined,
        title: o.title,
        badge: str(o.badge) || undefined,
        shortDescription: str(o.shortDescription) || undefined,
        ...(typeof o.originalPrice === "number" ? { originalPrice: o.originalPrice } : {}),
        ...(typeof o.offerPrice === "number" ? { offerPrice: o.offerPrice } : {}),
        discountLabel: str(o.discountLabel) || undefined,
        couponCode: str(o.couponCode) || undefined,
        href: o.href || undefined,
      })),
    );
  }

  /* ---------- PROJECTS ---------- */
  if (intent === "PROJECT_DISCOVERY") {
    const projects = data.projects as Rec[];
    if (projects.length === 0) return null;
    return reply(
      "PROJECT_DISCOVERY",
      "Here are some of our published projects:",
      projects.slice(0, 4).map((p): AMIResponseBlock => ({
        type: "project",
        projectId: p.id || undefined,
        slug: p.slug || undefined,
        title: p.title,
        description: str(p.shortDescription) || undefined,
        href: p.href || undefined,
      })),
      [{ type: "VIEW_PROJECT", label: "View All Projects", href: "/projects" }, START],
    );
  }

  /* ---------- SERVICE DETAILS ---------- */
  if (intent === "SERVICE_DETAILS") {
    const services = data.services as Rec[];
    const s = services.find((x) => x.slug === preferredServiceSlug) ?? services[0];
    if (!s || !Array.isArray(s.features) || s.features.length === 0) return null;

    const features = (s.features as Rec[]).slice(0, 8).map((f) => `• ${f.title}`).join("\n");
    const process = Array.isArray(s.process) && s.process.length
      ? `\n\nOur process: ${(s.process as Rec[]).map((p) => p.title).join(" → ")}.`
      : "";

    return reply(
      "SERVICE_DETAILS",
      `${s.title} includes:\n${features}${process}`,
      [{
        type: "service",
        slug: s.slug,
        title: s.title,
        description: str(s.shortDescription) || undefined,
        ...(typeof s.startingPrice === "number" ? { startingPrice: s.startingPrice } : {}),
        priceLabel: str(s.priceLabel) || undefined,
        href: s.href || undefined,
      }],
    );
  }

  /* ---------- CONTACT ---------- */
  if (intent === "CONTACT" && data.site) {
    const site = data.site as Rec;
    const parts = [
      site.phone && `Phone: ${site.phone}`,
      site.email && `Email: ${site.email}`,
      site.whatsapp && `WhatsApp: ${site.whatsapp}`,
      [site.city, site.state].filter(Boolean).join(", ") && `Location: ${[site.city, site.state].filter(Boolean).join(", ")}`,
    ].filter(Boolean);
    if (parts.length === 0) return null;

    const actions: AMIAction[] = [{ type: "CONTACT", label: "Contact Page", href: "/contact" }];
    const digits = String(site.whatsapp ?? "").replace(/\D/g, "");
    if (digits.length >= 10) actions.unshift({ type: "WHATSAPP", label: "Chat on WhatsApp", href: `https://wa.me/${digits}` });

    return reply("CONTACT", `You can reach us here:\n${parts.join("\n")}`, [], actions);
  }

  /* ---------- ABOUT ---------- */
  if (intent === "ABOUT" && data.site) {
    const site = data.site as Rec;
    const text = str(site.description) || str(site.tagline);
    if (!text) return null;
    return reply("ABOUT", `${str(site.siteName) || "Aman Digital Solutions"}: ${text}`, [], [
      { type: "CONTACT", label: "Contact Us", href: "/contact" },
      START,
    ]);
  }

  return null; // baaki sab AI ko jayega
}