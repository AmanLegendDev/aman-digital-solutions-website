import mongoose, {
  Document,
  Model,
  Schema,
  Types,
} from "mongoose";

/* =========================================================
   ENUM TYPES
========================================================= */

export type ProjectType =
  | "NEW_WEBSITE"
  | "REDESIGN"
  | "WEB_APPLICATION"
  | "ECOMMERCE"
  | "BUSINESS_SYSTEM"
  | "OTHER";

export type Timeline =
  | "ASAP"
  | "1_2_MONTHS"
  | "2_3_MONTHS"
  | "3_PLUS_MONTHS"
  | "FLEXIBLE";

export type BudgetRange =
  | "UNDER_15000"
  | "15000_30000"
  | "30000_60000"
  | "60000_100000"
  | "100000_PLUS"
  | "NOT_SURE";

export type PreferredContactMethod =
  | "WHATSAPP"
  | "PHONE"
  | "EMAIL";

export type ProjectRequestStatus =
  | "NEW"
  | "REVIEWING"
  | "CONTACTED"
  | "IN_PROGRESS"
  | "CONVERTED"
  | "CLOSED"
  | "REJECTED";

/* =========================================================
   PROJECT REQUEST DOCUMENT
========================================================= */

export interface IProjectRequest
  extends Document {
  requestId: string;

  /* -------------------------------------------------------
     PROJECT REQUIREMENTS
  ------------------------------------------------------- */

  serviceIds: Types.ObjectId[];

  projectType: ProjectType;

  projectDescription: string;

  requiredPages: string[];

  requiredFeatures: string[];

  timeline: Timeline;

  budgetRange: BudgetRange;

  /* -------------------------------------------------------
     CLIENT DETAILS
  ------------------------------------------------------- */

  fullName: string;

  companyName?: string;

  email: string;

  phone: string;

  location: string;

  currentWebsite?: string;

  preferredContactMethod: PreferredContactMethod;

  /* -------------------------------------------------------
     CONSENT
  ------------------------------------------------------- */

  privacyConsent: boolean;

  /* -------------------------------------------------------
     ADMIN / CRM
  ------------------------------------------------------- */

  status: ProjectRequestStatus;

  adminNotes?: string;

  assignedTo?: Types.ObjectId;

  /* -------------------------------------------------------
     TIMESTAMPS
  ------------------------------------------------------- */

  createdAt: Date;

  updatedAt: Date;
}

/* =========================================================
   SCHEMA
========================================================= */

const ProjectRequestSchema =
  new Schema<IProjectRequest>(
    {
      /* ===================================================
         REQUEST ID
      =================================================== */

      requestId: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        uppercase: true,
        index: true,
      },

      /* ===================================================
         PROJECT REQUIREMENTS
      =================================================== */

      serviceIds: {
        type: [Schema.Types.ObjectId],
        ref: "Service",
        default: [],
        index: true,
      },

      projectType: {
        type: String,
        enum: [
          "NEW_WEBSITE",
          "REDESIGN",
          "WEB_APPLICATION",
          "ECOMMERCE",
          "BUSINESS_SYSTEM",
          "OTHER",
        ],
        required: true,
      },

      projectDescription: {
        type: String,
        required: true,
        trim: true,
        maxlength: 3000,
      },

      requiredPages: {
        type: [
          {
            type: String,
            trim: true,
            maxlength: 120,
          },
        ],
        default: [],
      },

      requiredFeatures: {
        type: [
          {
            type: String,
            trim: true,
            maxlength: 150,
          },
        ],
        default: [],
      },

      timeline: {
        type: String,
        enum: [
          "ASAP",
          "1_2_MONTHS",
          "2_3_MONTHS",
          "3_PLUS_MONTHS",
          "FLEXIBLE",
        ],
        required: true,
      },

      budgetRange: {
        type: String,
        enum: [
          "UNDER_15000",
          "15000_30000",
          "30000_60000",
          "60000_100000",
          "100000_PLUS",
          "NOT_SURE",
        ],
        required: true,
      },

      /* ===================================================
         CLIENT DETAILS
      =================================================== */

      fullName: {
        type: String,
        required: true,
        trim: true,
        maxlength: 120,
      },

      companyName: {
        type: String,
        trim: true,
        maxlength: 150,
      },

      email: {
        type: String,
        required: true,
        trim: true,
        lowercase: true,
        maxlength: 180,
        index: true,
        match: [
          /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
          "Please provide a valid email address.",
        ],
      },

      phone: {
        type: String,
        required: true,
        trim: true,
        maxlength: 30,
      },

      location: {
        type: String,
        required: true,
        trim: true,
        maxlength: 150,
      },

      currentWebsite: {
        type: String,
        trim: true,
        maxlength: 500,
      },

      preferredContactMethod: {
        type: String,
        enum: [
          "WHATSAPP",
          "PHONE",
          "EMAIL",
        ],
        required: true,
        default: "WHATSAPP",
      },

      /* ===================================================
         CONSENT
      =================================================== */

      privacyConsent: {
        type: Boolean,
        required: true,
        default: false,
        validate: {
          validator: (
            value: boolean,
          ) => value === true,
          message:
            "Privacy consent is required.",
        },
      },

      /* ===================================================
         ADMIN / CRM
      =================================================== */

      status: {
        type: String,
        enum: [
          "NEW",
          "REVIEWING",
          "CONTACTED",
          "IN_PROGRESS",
          "CONVERTED",
          "CLOSED",
          "REJECTED",
        ],
        default: "NEW",
        required: true,
        index: true,
      },

      adminNotes: {
        type: String,
        trim: true,
        maxlength: 5000,
      },

      assignedTo: {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    },
    {
      timestamps: true,
    },
  );

/* =========================================================
   INDEXES
========================================================= */

ProjectRequestSchema.index({
  status: 1,
  createdAt: -1,
});

ProjectRequestSchema.index({
  email: 1,
  createdAt: -1,
});

ProjectRequestSchema.index({
  serviceIds: 1,
  status: 1,
});

/* =========================================================
   MODEL
========================================================= */

const ProjectRequest: Model<IProjectRequest> =
  mongoose.models.ProjectRequest ||
  mongoose.model<IProjectRequest>(
    "ProjectRequest",
    ProjectRequestSchema,
  );

export default ProjectRequest;