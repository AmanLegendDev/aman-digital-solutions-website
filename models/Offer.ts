import mongoose, {
  Document,
  Model,
  Schema,
} from "mongoose";

/* =========================================================
   TYPES
========================================================= */

export type OfferType =
  | "discount"
  | "seasonal"
  | "limited-time"
  | "bundle"
  | "custom";

export type DiscountType =
  | "percentage"
  | "fixed"
  | "none";

/* =========================================================
   IMAGE
========================================================= */

export interface IOfferImage {
  url: string;
  publicId?: string;
  alt?: string;
}

/* =========================================================
   OFFER
========================================================= */

export interface IOffer extends Document {
  title: string;
  slug: string;

  badge?: string;
  shortDescription: string;
  description: string;

  offerType: OfferType;

  discountType: DiscountType;
  discountValue?: number;

  originalPrice?: number;
  offerPrice?: number;

  discountLabel?: string;
  couponCode?: string;

  heroImage?: IOfferImage;
  cardImage?: IOfferImage;

  highlights: string[];
  includedFeatures: string[];

  ctaLabel: string;
  ctaLink: string;

  secondaryCtaLabel?: string;
  secondaryCtaLink?: string;

  termsAndConditions?: string;

  startDate: Date;
  endDate: Date;

  published: boolean;
  featured: boolean;
  displayOrder: number;

  seoTitle?: string;
  seoDescription?: string;
  canonicalUrl?: string;

  ogTitle?: string;
  ogDescription?: string;
  ogImage?: IOfferImage;

  createdAt: Date;
  updatedAt: Date;
}

/* =========================================================
   IMAGE SCHEMA
========================================================= */

const OfferImageSchema = new Schema<IOfferImage>(
  {
    url: {
      type: String,
      required: true,
      trim: true,
    },

    publicId: {
      type: String,
      trim: true,
    },

    alt: {
      type: String,
      trim: true,
      maxlength: 180,
    },
  },
  {
    _id: false,
  },
);

/* =========================================================
   OFFER SCHEMA
========================================================= */

const OfferSchema = new Schema<IOffer>(
  {
    /* -------------------------------------------------------
       IDENTITY
    ------------------------------------------------------- */

    title: {
      type: String,
      required: true,
      trim: true,
      maxlength: 160,
    },

    slug: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      maxlength: 180,
      index: true,
    },

    badge: {
      type: String,
      trim: true,
      maxlength: 80,
    },

    shortDescription: {
      type: String,
      required: true,
      trim: true,
      maxlength: 320,
    },

    description: {
      type: String,
      required: true,
      trim: true,
      maxlength: 20000,
    },

    /* -------------------------------------------------------
       OFFER TYPE / VALUE
    ------------------------------------------------------- */

    offerType: {
      type: String,
      enum: [
        "discount",
        "seasonal",
        "limited-time",
        "bundle",
        "custom",
      ],
      required: true,
      default: "limited-time",
    },

    discountType: {
      type: String,
      enum: [
        "percentage",
        "fixed",
        "none",
      ],
      required: true,
      default: "none",
    },

    discountValue: {
      type: Number,
      min: 0,
    },

    originalPrice: {
      type: Number,
      min: 0,
    },

    offerPrice: {
      type: Number,
      min: 0,
    },

    discountLabel: {
      type: String,
      trim: true,
      maxlength: 100,
    },

    couponCode: {
      type: String,
      trim: true,
      uppercase: true,
      maxlength: 60,
    },

    /* -------------------------------------------------------
       VISUALS
    ------------------------------------------------------- */

    heroImage: {
      type: OfferImageSchema,
    },

    cardImage: {
      type: OfferImageSchema,
    },

    /* -------------------------------------------------------
       CONTENT
    ------------------------------------------------------- */

    highlights: {
      type: [String],
      default: [],
      validate: {
        validator: (items: string[]) =>
          items.length <= 12,
        message:
          "An offer can have a maximum of 12 highlights.",
      },
    },

    includedFeatures: {
      type: [String],
      default: [],
      validate: {
        validator: (items: string[]) =>
          items.length <= 20,
        message:
          "An offer can have a maximum of 20 included features.",
      },
    },

    /* -------------------------------------------------------
       CTA
    ------------------------------------------------------- */

    ctaLabel: {
      type: String,
      required: true,
      trim: true,
      maxlength: 80,
    },

    ctaLink: {
      type: String,
      required: true,
      trim: true,
      maxlength: 500,
    },

    secondaryCtaLabel: {
      type: String,
      trim: true,
      maxlength: 80,
    },

    secondaryCtaLink: {
      type: String,
      trim: true,
      maxlength: 500,
    },

    /* -------------------------------------------------------
       TERMS
    ------------------------------------------------------- */

    termsAndConditions: {
      type: String,
      trim: true,
      maxlength: 10000,
    },

    /* -------------------------------------------------------
       SCHEDULING
    ------------------------------------------------------- */

    startDate: {
      type: Date,
      required: true,
      index: true,
    },

    endDate: {
      type: Date,
      required: true,
      index: true,
    },

    /* -------------------------------------------------------
       PUBLISHING / DISPLAY
    ------------------------------------------------------- */

    published: {
      type: Boolean,
      default: false,
      index: true,
    },

    featured: {
      type: Boolean,
      default: false,
      index: true,
    },

    displayOrder: {
      type: Number,
      default: 0,
      min: 0,
    },

    /* -------------------------------------------------------
       SEO
    ------------------------------------------------------- */

    seoTitle: {
      type: String,
      trim: true,
      maxlength: 70,
    },

    seoDescription: {
      type: String,
      trim: true,
      maxlength: 170,
    },

    canonicalUrl: {
      type: String,
      trim: true,
      maxlength: 500,
    },

    ogTitle: {
      type: String,
      trim: true,
      maxlength: 120,
    },

    ogDescription: {
      type: String,
      trim: true,
      maxlength: 200,
    },

    ogImage: {
      type: OfferImageSchema,
    },
  },

  {
    timestamps: true,
  },
);

/* =========================================================
   INDEXES
========================================================= */

OfferSchema.index({
  published: 1,
  startDate: 1,
  endDate: 1,
});

OfferSchema.index({
  published: 1,
  featured: -1,
  displayOrder: 1,
});

OfferSchema.index({
  endDate: 1,
});

/* =========================================================
   MODEL
========================================================= */

const Offer: Model<IOffer> =
  mongoose.models.Offer ||
  mongoose.model<IOffer>("Offer", OfferSchema);

export default Offer;