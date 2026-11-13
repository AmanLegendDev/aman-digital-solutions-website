export const AMI_FACTS = {
  founder: {
    name: "Aman Ansari",
    location: "Shimla, Himachal Pradesh",
    role: "web developer and founder of Aman Digital Solutions",
    skills: ["web development", "SEO", "digital marketing", "app development"],
    hobbies: ["music", "travel", "coding"],
  },

  company: {
    started: "2025",
    projects: "20+ projects completed for businesses in India and Australia",
    summary:
      "Aman Digital Solutions is a web development and digital solutions studio based in Shimla, Himachal Pradesh. It builds professional websites, e-commerce stores, custom web applications, SEO and digital growth solutions, and business automation.",
  },

  ami: "I'm AMI, the AI assistant on the Aman Digital Solutions website. I can explain services, pricing, projects, offers and policies. Final quotes and commitments always come from Aman personally.",

  terms: {
    payment:
      "Our standard payment structure is **50% in advance and 50% before final delivery**. The advance starts the project, and the remaining 50% is due before launch or handover. A different schedule can be agreed in writing, and work may be paused if a payment becomes overdue.",
    paymentHi:
      "Hamara standard payment structure **50% advance aur 50% final delivery se pehle** hai. Advance se project shuru hota hai, aur baaki 50% launch ya handover se pehle dena hota hai. Alag schedule likhit mein tay ho sakta hai, aur payment overdue ho to kaam pause ho sakta hai.",
    booking:
      "A project is booked once the scope is agreed and the advance payment is received. Enquiries and discussions alone create no obligation.",
    revisions:
      "Reasonable revisions within the agreed scope are included. A completely new feature, page or design direction counts as additional work and is quoted separately.",
    refund:
      "If a project is cancelled after work has started, the advance may be retained to cover reserved time and work already done. Any refund is considered case by case, based on the written agreement.",
    ownership:
      "Once the project is fully paid, you receive the rights to the custom deliverables created for it. Third-party libraries, fonts, plugins and templates stay under their own licences. Completed work may be shown in our portfolio unless agreed otherwise.",
    timelines:
      "Timelines are estimates based on the agreed scope and on getting content, feedback and approvals on time. Delays in those can extend delivery.",
  },

  privacy:
    "We collect only what is needed: contact details, project information, messages and limited technical data. We do not sell or rent personal information, we take reasonable steps to protect it, and you can ask to access, correct or delete your data.",
};

export function factsForPrompt(): string {
  const f = AMI_FACTS;

  return [
    `FOUNDER: ${f.founder.name}, ${f.founder.role}, based in ${f.founder.location}. Skills: ${f.founder.skills.join(", ")}. Mention hobbies (${f.founder.hobbies.join(", ")}) only if asked personally.`,
    `COMPANY: ${f.company.summary} Started in ${f.company.started}; ${f.company.projects}.`,
    `ABOUT AMI: ${f.ami} Never claim ADS has no AI chatbot; AMI itself is one. ADS can also integrate AI features into client projects.`,
    `APP DEVELOPMENT: Aman also takes app projects, but it is not a listed service. Scope is discussed directly with Aman.`,
    `PAYMENT: ${f.terms.payment}`,
    `REVISIONS: ${f.terms.revisions}`,
    `REFUND/CANCELLATION: ${f.terms.refund}`,
    `OWNERSHIP: ${f.terms.ownership}`,
    `PRIVACY: ${f.privacy}`,
    `LINKS: Terms /terms, Privacy /privacy, About /about, Reviews /reviews, Gallery /gallery, Blog /blog, FAQ /faq, Contact /contact, Pricing /pricing.`,
  ].join("\n");
}