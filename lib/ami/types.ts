/* =========================================================
   AMI — CORE TYPES
========================================================= */

/* =========================================================
   INTENTS
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

/* =========================================================
   ACTIONS
========================================================= */

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

/* =========================================================
   RESPONSE BLOCK TYPES
========================================================= */

export type AMIResponseBlockType =
  | "text"
  | "service"
  | "project"
  | "pricing"
  | "offer"
  | "quick_actions";

/* =========================================================
   MESSAGE
========================================================= */

export type AMIMessageRole =
  | "user"
  | "assistant";

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

  serviceSlug?: string;

  projectType?: string;

  projectDescription?: string;

  timeline?: string;

  budget?: string;

  currentWebsite?: string;

  requiredPages?: string[];

  requiredFeatures?: string[];

  preferredContactMethod?: string;

  qualificationScore?: number;
}

/* =========================================================
   USER CONTEXT
========================================================= */

export interface AMIUserContext {
  fullName?: string;

  companyName?: string;

  email?: string;

  phone?: string;

  location?: string;

  serviceId?: string;

  serviceTitle?: string;

  serviceSlug?: string;

  projectType?: string;

  projectDescription?: string;

  timeline?: string;

  budgetRange?: string;

  preferredContactMethod?:
    | "WHATSAPP"
    | "PHONE"
    | "EMAIL";

  currentWebsite?: string;

  requiredPages?: string[];

  requiredFeatures?: string[];

  industry?: string;
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
   TEXT BLOCK
========================================================= */

export interface AMITextBlock {
  type: "text";

  text: string;
}

/* =========================================================
   SERVICE BLOCK
========================================================= */

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

/* =========================================================
   PROJECT BLOCK
========================================================= */

export interface AMIProjectBlock {
  type: "project";

  projectId?: string;

  slug?: string;

  title: string;

  description?: string;

  href?: string;
}

/* =========================================================
   PRICING BLOCK
========================================================= */

export interface AMIPricingBlock {
  type: "pricing";

  title: string;

  price?: number | null;

  priceLabel?: string;

  description?: string;

  href?: string;
}

/* =========================================================
   OFFER BLOCK
========================================================= */

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

/* =========================================================
   QUICK ACTIONS BLOCK
========================================================= */

export interface AMIQuickActionsBlock {
  type: "quick_actions";

  actions: AMIAction[];
}

/* =========================================================
   RESPONSE BLOCK
========================================================= */

export type AMIResponseBlock =
  | AMITextBlock
  | AMIServiceBlock
  | AMIProjectBlock
  | AMIPricingBlock
  | AMIOfferBlock
  | AMIQuickActionsBlock;

/* =========================================================
   AMI RESPONSE
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
   CHAT REQUEST
========================================================= */

export interface AMIChatRequest {
  message: string;

  conversation?: AMIMessage[];

  context?: AMIConversationContext;
}

/* =========================================================
   CHAT RESPONSE
========================================================= */

export interface AMIChatResponse {
  success: true;

  response: AMIResponse;
}

/* =========================================================
   ERROR RESPONSE
========================================================= */

export interface AMIErrorResponse {
  success: false;

  error: string;

  code?: string;
}