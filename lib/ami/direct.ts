import type {
  AMIAction,
  AMIIntent,
  AMIResponse,
  AMIResponseBlock,
} from "./types";
import type { AMIRetrievedData } from "./retrieve";
import { AMI_FACTS } from "./siteFacts";

type Rec = Record<string, any>;

const inr = (n: number) => `₹${n.toLocaleString("en-IN")}`;
const str = (v: unknown) => (typeof v === "string" ? v.trim() : "");
const arr = (v: unknown): Rec[] => (Array.isArray(v) ? v : []);

const HINGLISH =
  /\b(hai|hain|kya|kaise|kitna|kitne|mujhe|mere|mera|chahiye|aap|apka|apki|banao|batao|dikhao|karna|karte|nahi|bhai|kaun|kahan|wala|wali)\b/i;

const START: AMIAction = {
  type: "START_PROJECT",
  label: "Start a Project",
  href: "/start-a-project",
};

const BILLING: Record<string, string> = {
  ONE_TIME: "one-time",
  MONTHLY: "per month",
  YEARLY: "per year",
  CUSTOM: "custom billing",
  NONE: "",
};

type Opts = {
  blocks?: AMIResponseBlock[];
  actions?: AMIAction[];
  patch?: Record<string, unknown>;
  ask?: string;
};

function reply(intent: AMIIntent, message: string, o: Opts = {}): AMIResponse {
  return {
    message: o.ask ? `${message}\n\n${o.ask}` : message,
    intent,
    blocks: o.blocks ?? [],
    actions: o.actions ?? [START],
    contextPatch: { lastIntent: intent, ...(o.patch ?? {}) } as AMIResponse["contextPatch"],
    needsInput: Boolean(o.ask),
    nextQuestion: o.ask ?? null,
  };
}

function fmtDate(iso: unknown): string {
  if (typeof iso !== "string") return "";
  const d = new Date(iso);
  return Number.isNaN(d.getTime())
    ? ""
    : d.toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" });
}

const GENERIC = new Set([
  "website", "development", "service", "services", "web", "and", "design",
  "support", "management", "solutions", "growth", "search",
]);

/** Finds the item (service or plan) the visitor named in this message. */
function mentioned<T extends { title: string }>(message: string, items: T[]): T | null {
  const m = message.toLowerCase().replace(/-/g, "");

  const exact = items.find((s) => m.includes(String(s.title ?? "").toLowerCase().replace(/-/g, "")));
  if (exact) return exact;

  let best: T | null = null;
  let bestScore = 0;
  let tie = false;

  for (const s of items) {
    const tokens = String(s.title ?? "")
      .toLowerCase()
      .replace(/-/g, "")
      .split(/[^a-z0-9]+/)
      .filter((w) => w.length > 2 && !GENERIC.has(w));

    const hit = tokens.filter((w) => m.includes(w)).length;

    if (hit > bestScore) { best = s; bestScore = hit; tie = false; }
    else if (hit === bestScore && hit > 0) tie = true;
  }

  return bestScore > 0 && !tie ? best : null;
}

function serviceStartPrice(s: Rec, hi: boolean): string {
  if (typeof s.startingPrice === "number") {
    return hi ? `${inr(s.startingPrice)} se shuru` : `from ${inr(s.startingPrice)}`;
  }
  return str(s.priceLabel) || "custom quote";
}

function planPrice(p: Rec): string {
  if (typeof p.price === "number" && p.pricingType !== "CUSTOM") {
    return `${p.pricingType === "STARTING_FROM" ? "from " : ""}${inr(p.price)}`;
  }
  return "custom quote";
}

function planLabel(p: Rec): string {
  const billing = BILLING[p.billingPeriod] ?? "";
  return `${planPrice(p)}${billing ? ` · ${billing}` : ""}`;
}

function projectBlock(p: Rec, withResults = true): AMIResponseBlock {
  return {
    type: "project",
    projectId: p.id || undefined,
    slug: p.slug || undefined,
    title: p.title,
    description: str(p.shortDescription) || undefined,
    industry: str(p.category) || undefined,
    imageUrl: str(p.imageUrl) || undefined,
    results: withResults && arr(p.results).length ? (p.results as string[]) : undefined,
    technologies: arr(p.technologies).length ? (p.technologies as string[]).slice(0, 5) : undefined,
    liveUrl: str(p.liveUrl) || undefined,
    href: p.href || undefined,
  };
}

function policyAnswer(msg: string, hi: boolean) {
  const T = AMI_FACTS.terms;

  if (/\bpay\b|payment|advance|installment|emi|50/.test(msg)) {
    return { text: hi ? T.paymentHi : T.payment, link: "/terms" };
  }
  if (/revision/.test(msg)) return { text: T.revisions, link: "/terms" };
  if (/refund|cancel/.test(msg)) return { text: T.refund, link: "/terms" };
  if (/\bown|rights|copyright|intellectual|source code/.test(msg)) return { text: T.ownership, link: "/terms" };
  if (/privacy|cookie|personal data|my data/.test(msg)) return { text: AMI_FACTS.privacy, link: "/privacy" };
  if (/timeline|delivery|deadline/.test(msg)) return { text: T.timelines, link: "/terms" };

  return {
    text: `Here are the key points of our terms:\n• **Payment:** 50% advance + 50% before final delivery\n• **Revisions:** reasonable revisions within the agreed scope\n• **Ownership:** you own the custom deliverables once fully paid\n• **Cancellation:** the advance may be retained for work done and time reserved`,
    link: "/terms",
  };
}

export function buildDirectResponse(
  intent: AMIIntent,
  data: AMIRetrievedData,
  preferredServiceSlug?: string,
  message = "",
): AMIResponse | null {
  const hi = HINGLISH.test(message);
  const t = (en: string, hn: string) => (hi ? hn : en);
  const msg = message.toLowerCase();

  /* ---------- GREETING ---------- */
  if (intent === "GREETING") {
    return reply(
      "GREETING",
      t(
        "Hi! I'm AMI, the assistant of Aman Digital Solutions. Tell me what you want to build, whether it's a website, an online store or SEO, and I'll point you to the right option.",
        "Hi! Main AMI hu, Aman Digital Solutions ka assistant. Batao kya banwana hai, website, online store ya SEO? Main sahi option bata dunga.",
      ),
      {
        actions: [
          { type: "VIEW_PRICING", label: "View Pricing", href: "/pricing" },
          { type: "VIEW_PROJECT", label: "See Projects", href: "/projects" },
          START,
        ],
      },
    );
  }

  /* ---------- POLICY (terms, payment, privacy) ---------- */
  if (intent === "POLICY") {
    const { text, link } = policyAnswer(msg, hi);

    return reply(
      "POLICY",
      `${text}\n\n${t("Full details:", "Poori details:")} [Terms & Conditions](/terms) · [Privacy Policy](/privacy)`,
      {
        actions: [
          { type: "CONTACT", label: "Ask Aman", href: "/contact" },
          { type: "VIEW_PRICING", label: "View Pricing", href: "/pricing" },
        ],
        ask: link === "/terms"
          ? t("Which service are you planning to start with?", "Aap kis service se shuru karna chahte ho?")
          : t("Anything else you'd like to know?", "Aur kuch poochna hai?"),
      },
    );
  }

  /* ---------- ABOUT (AMI / company / founder) ---------- */
  if (intent === "ABOUT") {
    const f = AMI_FACTS.founder;
    const c = AMI_FACTS.company;

    if (/who are you|what are you|aap kaun|tum kaun/.test(msg)) {
      return reply("ABOUT", AMI_FACTS.ami, {
        ask: t("What are you looking to build?", "Aap kya banwana chahte ho?"),
      });
    }

    const founderAsked =
      /\bwho is aman\b(?! digital)|\babout aman\b(?! digital)|aman ansari|aman kaun|founder|owner|hobb|personal|music|travel/.test(msg);

    if (founderAsked) {
      const personal = /hobb|music|travel|personal|free time|shauk/.test(msg);

      return reply(
        "ABOUT",
        t(
          `${f.name} is the founder of Aman Digital Solutions, a web developer based in ${f.location}. He builds websites and web apps, and also works on SEO, digital marketing and app projects.${personal ? " Outside work he enjoys music, travel and coding." : ""}`,
          `${f.name} Aman Digital Solutions ke founder hain, ${f.location} se web developer. Wo websites aur web apps banate hain, aur SEO, digital marketing aur app projects par bhi kaam karte hain.${personal ? " Kaam ke alawa unhe music, travel aur coding pasand hai." : ""}`,
        ) + "\n\n[About page](/about)",
        {
          actions: [{ type: "CONTACT", label: "Talk to Aman", href: "/contact" }, START],
          ask: t("What are you planning to build?", "Aap kya banane ka soch rahe ho?"),
        },
      );
    }

    return reply(
      "ABOUT",
      t(
        `${c.summary} It began in ${c.started}, with ${c.projects}.`,
        `${c.summary} Iski shuruat ${c.started} mein hui, aur ${c.projects} ho chuke hain.`,
      ) + "\n\n[About page](/about)",
      {
        actions: [{ type: "VIEW_PROJECT", label: "See Our Work", href: "/projects" }, START],
        ask: t("What kind of business do you run?", "Aapka kis type ka business hai?"),
      },
    );
  }

  if (data.retrievalError) return null;

  /* ---------- GALLERY ---------- */
  if (intent === "GALLERY") {
    const items = arr(data.gallery).slice(0, 3);

    return reply(
      "GALLERY",
      t(
        "Yes! Here are visuals from some of our projects. The full [gallery](/gallery) has more.",
        "Haan! Ye hamare kuch projects ke visuals hain. Poori [gallery](/gallery) mein aur bhi hain.",
      ),
      {
        blocks: items.map((g): AMIResponseBlock => ({
          type: "gallery",
          title: g.title,
          projectSlug: g.slug || undefined,
          images: arr(g.images).map((i) => ({ url: i.url, title: str(i.title) || undefined })),
          href: g.slug ? `/projects/${g.slug}` : undefined,
        })),
        actions: [{ type: "VIEW_PROJECT", label: "See Projects", href: "/projects" }, START],
        ask: t("Want me to suggest a project similar to what you need?", "Chaho to aapki zarurat jaisa koi project suggest karu?"),
      },
    );
  }

  /* ---------- BLOG ---------- */
  if (intent === "BLOG") {
    const blogs = arr(data.blogs);

    if (blogs.length === 0) {
      return reply(
        "BLOG",
        t("You can read our latest guides on the [blog](/blog).", "Hamare latest guides [blog](/blog) par padh sakte ho."),
        { actions: [{ type: "CONTACT", label: "Contact Us", href: "/contact" }, START] },
      );
    }

    return reply(
      "BLOG",
      t("Here are a few guides from our [blog](/blog) that may help:", "Hamare [blog](/blog) ke ye guides aapke kaam aa sakte hain:"),
      {
        blocks: blogs.map((b): AMIResponseBlock => ({
          type: "blog",
          title: b.title,
          excerpt: str(b.excerpt) || undefined,
          category: str(b.category) || undefined,
          readingTime: typeof b.readingTime === "number" ? b.readingTime : undefined,
          imageUrl: str(b.imageUrl) || undefined,
          href: b.href || undefined,
        })),
        actions: [START],
        ask: t("Want a guide on a specific topic, like SEO or e-commerce?", "Kisi khaas topic par guide chahiye, jaise SEO ya e-commerce?"),
      },
    );
  }

  /* ---------- PRICING (pricing plans + service prices) ---------- */
  if (intent === "PRICING") {
    const plans = arr(data.pricing).filter((p) => p.source === "pricing-plan");
    const svcs = arr(data.pricing).filter((p) => p.source === "service");

    if (plans.length === 0 && svcs.length === 0) return null;

    const covered = new Set(plans.map((p) => p.serviceId).filter(Boolean));
    const extra = svcs.filter((s) => !covered.has(s.id));

    const entries = [
      ...plans.map((p) => ({ kind: "plan" as const, title: str(p.name), rec: p })),
      ...extra.map((s) => ({ kind: "service" as const, title: str(s.title), rec: s })),
    ];

    const m = mentioned(message, entries);

    if (m && m.kind === "plan") {
      const p = m.rec;
      const features = arr(p.features).slice(0, 8).map((f) => `• ${f}`).join("\n");

      return reply(
        "PRICING",
        `${p.name}: ${planLabel(p)}.${features ? `\n\n${t("Included:", "Isme milta hai:")}\n${features}` : ""}\n\n${t("The final cost depends on pages, features and integrations.", "Final cost pages, features aur integrations par depend karti hai.")}`,
        {
          blocks: [{
            type: "pricing",
            title: p.name,
            ...(typeof p.price === "number" && p.pricingType !== "CUSTOM" ? { price: p.price } : {}),
            priceLabel: planLabel(p),
            description: str(p.shortDescription) || undefined,
            features: arr(p.features).slice(0, 6).map((f) => str(f)),
            href: "/pricing",
          }],
          ask: t("What kind of business is this for?", "Ye kis type ke business ke liye chahiye?"),
        },
      );
    }

    if (m && m.kind === "service") {
      const s = m.rec;

      return reply(
        "PRICING",
        `${s.title}: ${serviceStartPrice(s, hi)}. ${t("The final cost depends on pages, features and integrations.", "Final cost pages, features aur integrations par depend karti hai.")}`,
        {
          blocks: [{
            type: "pricing",
            title: s.title,
            ...(typeof s.startingPrice === "number" ? { price: s.startingPrice } : {}),
            priceLabel: str(s.priceLabel) || undefined,
            href: s.href || undefined,
          }],
          patch: { selectedServiceSlug: s.slug, serviceSlug: s.slug, service: s.title },
          ask: t("What kind of business is this for?", "Ye kis type ke business ke liye chahiye?"),
        },
      );
    }

    const lines = [
      ...plans.map((p) => `• ${p.name}: ${planLabel(p)}`),
      ...extra.map((s) => `• ${s.title}: ${serviceStartPrice(s, hi)}`),
    ].join("\n");

    const cards: AMIResponseBlock[] = [
      ...plans.slice(0, 4).map((p): AMIResponseBlock => ({
        type: "pricing",
        title: p.name,
        ...(typeof p.price === "number" && p.pricingType !== "CUSTOM" ? { price: p.price } : {}),
        priceLabel: planLabel(p),
        description: str(p.shortDescription) || undefined,
        features: arr(p.features)
          .slice(0, 4)
          .map((f) => typeof f === "string" ? f : str(f.title) || str(f.name) || str(f.label) || str(f.description))
          .filter(Boolean),
        href: "/pricing",
      })),
    ];

    return reply(
      "PRICING",
      `${t("Here's our pricing. These are starting points, and the final cost depends on your scope:", "Ye hamari pricing hai. Ye starting points hain, final cost aapke scope par depend karti hai:")}\n${lines}`,
      {
        blocks: cards,
        actions: [{ type: "VIEW_PRICING", label: "Full Pricing Page", href: "/pricing" }, START],
        ask: t("Which of these fits what you need?", "Inme se kaunsa aapki zarurat ke hisaab se hai?"),
      },
    );
  }

  /* ---------- OFFERS (active + expired) ---------- */
  if (intent === "OFFER") {
    const offers = arr(data.offers);
    const expired = arr(data.expiredOffers);
    const asksExpired = /expire|expired|past|old|previous|purane|khatam|ended/.test(msg);

    const expiredText = expired.length
      ? `${t("Recently ended offers:", "Haal hi mein khatam hue offers:")}\n${expired
          .map((o) => {
            const label = o.href ? `[${o.title}](${o.href})` : o.title;
            return `• ${label}${o.endDate ? ` (${t("ended", "khatam")} ${fmtDate(o.endDate)})` : ""}`;
          })
          .join("\n")}`
      : "";

    if (offers.length === 0) {
      return reply(
        "OFFER",
        `${t("There are no active offers right now.", "Abhi koi active offer nahi chal raha.")}${expiredText ? `\n\n${expiredText}` : ""}`,
        {
          actions: [
            { type: "VIEW_OFFER", label: "All Offers", href: "/offers" },
            { type: "VIEW_PRICING", label: "View Pricing", href: "/pricing" },
            START,
          ],
          ask: t("Tell me what you need and I'll suggest the best-value option.", "Batao kya chahiye, main best value option suggest karunga."),
        },
      );
    }

    const n = offers.length;

    return reply(
      "OFFER",
      `${t(`We have ${n} active offer${n > 1 ? "s" : ""} right now:`, `Abhi ${n} active offer${n > 1 ? "s" : ""} chal ${n > 1 ? "rahe" : "raha"} hai:`)}${asksExpired && expiredText ? `\n\n${expiredText}` : ""}`,
      {
        blocks: offers.slice(0, 3).map((o): AMIResponseBlock => ({
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
        actions: [{ type: "VIEW_OFFER", label: "All Offers", href: "/offers" }, START],
      },
    );
  }

   /* ---------- PROJECT DETAILS (named project) ---------- */
  if (intent === "PROJECT_DETAILS") {
    const p = arr(data.projects)[0];

    if (p && p.detail === true) {
      const features = arr(p.features)
        .slice(0, 4)
        .map((f) => `• ${f.title}`)
        .join("\n");

      const results = arr(p.results).length
        ? `\n\n**Results:** ${(p.results as string[]).join(" · ")}`
        : "";

      const tech = arr(p.technologies).length
        ? `\n**Built with:** ${(p.technologies as string[]).slice(0, 6).join(", ")}`
        : "";

      const live = str(p.liveUrl) ? `\n\n[Visit live site](${str(p.liveUrl)})` : "";

      return reply(
        "PROJECT_DETAILS",
        `**${p.title}**${p.client ? ` (${p.client})` : ""}\n${str(p.shortDescription)}${features ? `\n\nKey features:\n${features}` : ""}${results}${tech}${live}`,
        {
          blocks: [projectBlock(p)],
          patch: { selectedProjectSlug: p.slug, projectSlug: p.slug },
          actions: [{ type: "VIEW_PROJECT", label: "All Projects", href: "/projects" }, START],
          ask: t("Want something similar for your business?", "Aapko apne business ke liye aisa kuch chahiye?"),
        },
      );
    }

    return null;
  }

  /* ---------- PROJECT DISCOVERY ---------- */
  if (intent === "PROJECT_DISCOVERY") {
    const projects = arr(data.projects).slice(0, 3);
    if (projects.length === 0) return null;

    return reply(
      "PROJECT_DISCOVERY",
      t("Here are a few projects we've built:", "Ye hamare kuch banaye hue projects hain:"),
      {
        blocks: projects.map((p) => projectBlock(p)),
        actions: [{ type: "VIEW_PROJECT", label: "All Projects", href: "/projects" }, START],
        ask: t("What kind of project do you have in mind? I'll show the closest match.", "Aapka kis type ka project hai? Sabse milta-julta dikhata hu."),
      },
    );
  }

  /* ---------- SERVICE DETAILS (+ price) ---------- */
  if (intent === "SERVICE_DETAILS") {
    const services = arr(data.services);
    const s = services.find((x) => x.slug === preferredServiceSlug) ?? services[0];
    if (!s || !Array.isArray(s.features) || s.features.length === 0) return null;

    const features = (s.features as Rec[]).slice(0, 8).map((f) => `• ${f.title}`).join("\n");
    const process =
      Array.isArray(s.process) && s.process.length
        ? `\n\n${t("Process", "Process")}: ${(s.process as Rec[]).map((p) => p.title).join(" → ")}.`
        : "";

    return reply(
      "SERVICE_DETAILS",
      `${s.title} (${serviceStartPrice(s, hi)}) ${t("includes:", "mein ye milta hai:")}\n${features}${process}`,
      {
        blocks: [{
          type: "service",
          slug: s.slug,
          title: s.title,
          description: str(s.shortDescription) || undefined,
          ...(typeof s.startingPrice === "number" ? { startingPrice: s.startingPrice } : {}),
          priceLabel: str(s.priceLabel) || undefined,
          href: s.href || undefined,
        }],
        patch: { selectedServiceSlug: s.slug, serviceSlug: s.slug, service: s.title },
        ask: t("Would you like me to suggest what your project would need?", "Chaho to bataun aapke project ko isme se kya chahiye hoga?"),
      },
    );
  }

  /* ---------- CONTACT ---------- */
  if (intent === "CONTACT" && data.site) {
    const site = data.site as Rec;
    const location = [site.address, site.city, site.state].filter(Boolean).join(", ");

    const parts = [
      site.phone && `Phone: ${site.phone}`,
      site.email && `Email: ${site.email}`,
      site.whatsapp && `WhatsApp: ${site.whatsapp}`,
      location && `Location: ${location}`,
    ].filter(Boolean);

    if (parts.length === 0) return null;

    const actions: AMIAction[] = [];
    const digits = String(site.whatsapp ?? "").replace(/\D/g, "");
    const wa = digits.length === 10 ? `91${digits}` : digits;

    if (wa.length >= 11) actions.push({ type: "WHATSAPP", label: "Chat on WhatsApp", href: `https://wa.me/${wa}` });
    if (site.phone) actions.push({ type: "CALL", label: "Call Aman" });
    if (site.email) actions.push({ type: "EMAIL", label: "Send Email" });
    actions.push({ type: "CONTACT", label: "Contact Page", href: "/contact" });

    return reply(
      "CONTACT",
      `${t("You can reach us here:", "Aap yahan humse contact kar sakte ho:")}\n${parts.join("\n")}\n\n[Contact page](/contact)`,
      {
        actions,
        ask: t("Want to tell me about your project so Aman can reply with the right details?", "Apne project ke baare mein batao, taaki Aman sahi details ke saath reply kare?"),
      },
    );
  }

  /* ---------- REVIEWS ---------- */
  if (intent === "REVIEWS") {
    const reviews = arr(data.reviews).slice(0, 3);
    if (reviews.length === 0) return null;

    return reply(
      "REVIEWS",
      `${t("Here's what clients say about working with Aman:", "Clients Aman ke saath kaam ke baare mein ye kehte hain:")}\n[Read all reviews](/reviews)`,
      {
        blocks: reviews.map((r): AMIResponseBlock => ({
          type: "review",
          name: r.name,
          role: str(r.role) || undefined,
          company: str(r.company) || undefined,
          quote: r.content,
          rating: typeof r.rating === "number" ? r.rating : null,
          location: str(r.location) || undefined,
        })),
        actions: [{ type: "VIEW_PROJECT", label: "See Their Projects", href: "/projects" }, START],
        ask: t("Want to see the projects behind these reviews?", "In reviews ke peeche ke projects dekhna chahoge?"),
      },
    );
  }

  /* ---------- FAQ ---------- */
  if (intent === "FAQ" && arr(data.faqs).length) {
    const tokens = msg.split(/[^a-z0-9]+/).filter((w) => w.length > 3);

    const ranked = arr(data.faqs)
      .map((f) => {
        const hay = `${f.question} ${f.answer}`.toLowerCase();
        return { f, sc: tokens.filter((w) => hay.includes(w)).length };
      })
      .sort((a, b) => b.sc - a.sc);

    const top = ranked.filter((r) => r.sc > 0).slice(0, 2);
    if (top.length === 0) return null;

    return reply(
      "FAQ",
      t("Here's what our FAQs say:", "Hamare FAQs mein ye likha hai:"),
      {
        blocks: top.map((r): AMIResponseBlock => ({
          type: "faq",
          question: r.f.question,
          answer: r.f.answer,
          href: "/faq",
        })),
        actions: [{ type: "VIEW_FAQ", label: "All FAQs", href: "/faq" }, START],
        ask: t("Anything else you'd like to know?", "Aur kuch poochna hai?"),
      },
    );
  }

  return null; // everything else goes to the AI
}