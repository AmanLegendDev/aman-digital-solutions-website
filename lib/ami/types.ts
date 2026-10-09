
/* =========================================================
   AMI — CORE TYPES
========================================================= */

export type AMIIntent =
  | "GREETING"
  | "SERVICE_DISCOVERY"
  | "SERVICE_DETAILS"
  | "PRICING"
  | "PROJECT_DISCOVERY"
  | "PROJECT_DETAILS"
  | "FAQ"
  | "OFFER"
  | "START_PROJECT"
  | "CONTACT"
  | "ABOUT"
  | "GENERAL"
  | "UNKNOWN";

export type AMIActionType =
  | "VIEW_SERVICE"
  | "VIEW_PROJECT"
  | "VIEW_PRICING"
  | "VIEW_FAQ"
  | "VIEW_OFFER"
  | "START_PROJECT"
  | "CONTACT"
  | "WHATSAPP"
  | "CALL"
  | "EMAIL"
  | "NONE";

export type AMIResponseBlockType =
  | "text"
  | "service"
  | "project"
  | "pricing"
  | "offer"
  | "quick_actions";

export type AMIMessageRole = "user" | "assistant";

export interface AMIMessage {
  id: string;
  role: AMIMessageRole;
  content: string;
  createdAt?: string;
}

/* =========================================================
   LEAD PROFILE
========================================================= */

export interface AMILeadProfile {
  name?: string;
  companyName?: string;
  email?: string;
  phone?: string;
  location?: string;

  service?: string;
  serviceId?: string;
  serviceSlug?: string;

  projectType?: string;
  industry?: string;
  projectDescription?: string;

  timeline?: string;
  budget?: string;
  budgetRange?: string;

  currentWebsite?: string;
  requiredPages?: string[];
  requiredFeatures?: string[];

  preferredContactMethod?: string;
  privacyConsent?: boolean;

  qualificationScore?: number;
}

/* =========================================================
   USER CONTEXT
========================================================= */

export interface AMIUserContext {
  fullName?: string;
  name?: string;

  companyName?: string;
  email?: string;
  phone?: string;
  location?: string;

  serviceId?: string;
  service?: string;
  serviceTitle?: string;
  serviceSlug?: string;

  projectType?: string;
  projectDescription?: string;
  industry?: string;

  timeline?: string;
  budget?: string;
  budgetRange?: string;

  preferredContactMethod?:
    | "WHATSAPP"
    | "PHONE"
    | "EMAIL";

  currentWebsite?: string;
  requiredPages?: string[];
  requiredFeatures?: string[];

  privacyConsent?: boolean;
}

/* =========================================================
   CONVERSATION CONTEXT
========================================================= */

export type AMIConversationStage =
  | "DISCOVERY"
  | "QUALIFICATION"
  | "READY_TO_START";

export interface AMIConversationContext {
  leadProfile?: AMILeadProfile;

  selectedServiceSlug?: string;
  selectedProjectSlug?: string;
  selectedOfferSlug?: string;

  lastIntent?: AMIIntent;
  conversationStage?: AMIConversationStage;

  // Backward-compatible flat fields used by existing code.
  intent?: AMIIntent | string;
  serviceSlug?: string;
  projectSlug?: string;

  name?: string;
  fullName?: string;
  companyName?: string;
  email?: string;
  phone?: string;
  location?: string;

  service?: string;
  serviceId?: string;
  serviceTitle?: string;

  projectType?: string;
  projectDescription?: string;
  industry?: string;

  timeline?: string;
  budget?: string;
  budgetRange?: string;

  currentWebsite?: string;
  requiredPages?: string[];
  requiredFeatures?: string[];

  preferredContactMethod?: string;
  privacyConsent?: boolean;

  qualificationScore?: number;

  // Keep compatibility with older context consumers.
  [key: string]: unknown;
}

/* =========================================================
   ACTION
========================================================= */

export interface AMIAction {
  type: AMIActionType;
  label: string;
  href?: string;

  serviceId?: string;
  serviceSlug?: string;

  projectId?: string;
  projectSlug?: string;

  offerId?: string;
  offerSlug?: string;
}

/* =========================================================
   RESPONSE BLOCKS
========================================================= */

export interface AMITextBlock {
  type: "text";
  text: string;
}

export interface AMIServiceBlock {
  type: "service";
  serviceId?: string;
  slug?: string;
  title: string;
  description?: string;
  startingPrice?: number | null;
  priceLabel?: string;
  href?: string;
}

export interface AMIProjectBlock {
  type: "project";
  projectId?: string;
  slug?: string;
  title: string;
  description?: string;
  href?: string;
}

export interface AMIPricingBlock {
  type: "pricing";
  title: string;
  price?: number | null;
  priceLabel?: string;
  description?: string;
  href?: string;
}

export interface AMIOfferBlock {
  type: "offer";
  offerId?: string;
  slug?: string;
  title: string;
  badge?: string;
  shortDescription?: string;
  originalPrice?: number | null;
  offerPrice?: number | null;
  discountLabel?: string;
  couponCode?: string;
  href?: string;
}

export interface AMIQuickActionsBlock {
  type: "quick_actions";
  actions: AMIAction[];
}

export type AMIResponseBlock =
  | AMITextBlock
  | AMIServiceBlock
  | AMIProjectBlock
  | AMIPricingBlock
  | AMIOfferBlock
  | AMIQuickActionsBlock;

/* =========================================================
   RESPONSE
========================================================= */

export interface AMIResponse {
  message: string;
  intent: AMIIntent;
  blocks: AMIResponseBlock[];
  actions: AMIAction[];

  contextPatch?: Partial<AMIConversationContext>;

  needsInput?: boolean;
  nextQuestion?: string | null;
}

/* =========================================================
   CHAT REQUEST / RESPONSE
========================================================= */

export interface AMIChatRequest {
  message: string;
  conversation?: AMIMessage[];
  context?: AMIConversationContext;
}

export interface AMIChatResponse {
  success: true;
  response: AMIResponse;
}

export interface AMIErrorResponse {
  success: false;
  error: string;
  code?: string;
}
