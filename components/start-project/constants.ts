export const INITIAL_DATA = {
  fullName: "",
  companyName: "",
  email: "",
  phone: "",
  location: "",
  currentWebsite: "",
  preferredContactMethod: "WHATSAPP",

  serviceIds: [],

  projectType: "NEW_WEBSITE",

  projectDescription: "",

  requiredPages: [],
  requiredFeatures: [],

  timeline: "FLEXIBLE",

  budgetRange: "NOT_SURE",

  privacyConsent: false,
} as const;

export const PROJECT_TYPES = [
  ["NEW_WEBSITE", "New Website"],
  ["REDESIGN", "Website Redesign"],
  ["WEB_APPLICATION", "Web Application"],
  ["ECOMMERCE", "E-commerce"],
  ["BUSINESS_SYSTEM", "Business System"],
  ["OTHER", "Something Else"],
] as const;

export const PAGES = [
  "Home",
  "About",
  "Services",
  "Portfolio",
  "Pricing",
  "Blog",
  "Contact",
] as const;

export const FEATURES = [
  "WhatsApp Integration",
  "Contact Forms",
  "Admin Dashboard",
  "Online Payments",
  "Booking System",
  "CMS",
  "Analytics",
  "SEO",
] as const;

export const TIMELINES = [
  ["ASAP", "As soon as possible"],
  ["1_2_MONTHS", "1–2 months"],
  ["2_3_MONTHS", "2–3 months"],
  ["3_PLUS_MONTHS", "3+ months"],
  ["FLEXIBLE", "I'm flexible"],
] as const;

export const BUDGETS = [
  ["UNDER_15000", "Under ₹15,000"],
  ["15000_30000", "₹15,000 – ₹30,000"],
  ["30000_60000", "₹30,000 – ₹60,000"],
  ["60000_100000", "₹60,000 – ₹1,00,000"],
  ["100000_PLUS", "₹1,00,000+"],
  ["NOT_SURE", "Not sure yet"],
] as const;