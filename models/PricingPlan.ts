import mongoose, {
  Schema,
  type Document,
  type Model,
} from "mongoose";

export type PricingType =
  | "FIXED"
  | "STARTING_FROM"
  | "CUSTOM";

export type BillingPeriod =
  | "ONE_TIME"
  | "MONTHLY"
  | "YEARLY"
  | "CUSTOM"
  | "NONE";

export interface IPricingPlan extends Document {
  name: string;
  slug: string;
  shortDescription: string;

  price?: number;
  currency: string;
  pricePrefix?: string;
  priceSuffix?: string;

  pricingType: PricingType;
  billingPeriod: BillingPeriod;

  features: string[];

  serviceId?: mongoose.Types.ObjectId;

  ctaText: string;
  ctaLink: string;

  isFeatured: boolean;
  featuredLabel?: string;

  isPublished: boolean;
  displayOrder: number;

  createdAt: Date;
  updatedAt: Date;
}

/* ---------------------------------------------
   PRICING PLAN SCHEMA
--------------------------------------------- */

const PricingPlanSchema = new Schema<IPricingPlan>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      maxlength: 120,
    },

    slug: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      index: true,
      match: [
        /^[a-z0-9]+(?:-[a-z0-9]+)*$/,
        "Slug must contain lowercase letters, numbers and hyphens only.",
      ],
    },

    shortDescription: {
      type: String,
      required: true,
      trim: true,
      maxlength: 300,
    },

    price: {
      type: Number,
      min: 0,
      validate: {
        validator: (value?: number) =>
          value === undefined ||
          (Number.isFinite(value) && value >= 0),
        message: "Price must be a valid non-negative number.",
      },
    },

    currency: {
      type: String,
      required: true,
      trim: true,
      maxlength: 10,
      default: "₹",
    },

    pricePrefix: {
      type: String,
      trim: true,
      maxlength: 50,
      default: "",
    },

    priceSuffix: {
      type: String,
      trim: true,
      maxlength: 50,
      default: "",
    },

    pricingType: {
      type: String,
      enum: [
        "FIXED",
        "STARTING_FROM",
        "CUSTOM",
      ],
      required: true,
      default: "FIXED",
    },

    billingPeriod: {
      type: String,
      enum: [
        "ONE_TIME",
        "MONTHLY",
        "YEARLY",
        "CUSTOM",
        "NONE",
      ],
      required: true,
      default: "ONE_TIME",
    },

    features: {
      type: [
        {
          type: String,
          trim: true,
          maxlength: 200,
        },
      ],
      default: [],
      validate: {
        validator: (items: string[]) =>
          Array.isArray(items) &&
          items.every(
            (item) =>
              typeof item === "string" &&
              item.trim().length > 0
          ),
        message: "Features must contain valid non-empty values.",
      },
    },

    serviceId: {
      type: Schema.Types.ObjectId,
      ref: "Service",
      index: true,
    },

    ctaText: {
      type: String,
      required: true,
      trim: true,
      maxlength: 80,
      default: "Get Started",
    },

    ctaLink: {
      type: String,
      required: true,
      trim: true,
      maxlength: 500,
      default: "/contact",
    },

    isFeatured: {
      type: Boolean,
      default: false,
      index: true,
    },

    featuredLabel: {
      type: String,
      trim: true,
      maxlength: 50,
      default: "",
    },

    isPublished: {
      type: Boolean,
      default: false,
      index: true,
    },

    displayOrder: {
      type: Number,
      default: 0,
      min: 0,
      index: true,
    },
  },
  {
    timestamps: true,
  }
);

/* ---------------------------------------------
   INDEXES
--------------------------------------------- */

PricingPlanSchema.index({
  isPublished: 1,
  displayOrder: 1,
});

PricingPlanSchema.index({
  isPublished: 1,
  isFeatured: 1,
  displayOrder: 1,
});

/* ---------------------------------------------
   MODEL
--------------------------------------------- */

const PricingPlan: Model<IPricingPlan> =
  mongoose.models.PricingPlan ||
  mongoose.model<IPricingPlan>(
    "PricingPlan",
    PricingPlanSchema
  );

export default PricingPlan;