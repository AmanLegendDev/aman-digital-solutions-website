import mongoose, {
  Document,
  Model,
  Schema,
  Types,
} from "mongoose";

export type ServiceCategory =
  | "websites"
  | "business-systems"
  | "growth"
  | "support";

export interface IServiceBenefit {
  title: string;
  description: string;
  icon?: string;
}

export interface IServiceFeature {
  title: string;
  description: string;
  icon?: string;
}

export interface IServiceProcessStep {
  order: number;
  title: string;
  description: string;
}

export interface IServiceImage {
  url: string;
  publicId?: string;
  alt?: string;
}

export interface IService extends Document {
  title: string;
  slug: string;

  heroEyebrow?: string;

  shortDescription: string;
  description: string;

  icon?: string;
  image?: IServiceImage;

  benefits: IServiceBenefit[];
  features: IServiceFeature[];
  process: IServiceProcessStep[];

  startingPrice?: number;
  priceLabel?: string;

  ctaLabel?: string;
  ctaLink?: string;

  category: ServiceCategory;

  faqIds?: Types.ObjectId[];
  projectIds?: Types.ObjectId[];

  keywords?: string[];

  featured: boolean;
  published: boolean;
  displayOrder: number;

  seoTitle?: string;
  seoDescription?: string;
  canonicalUrl?: string;

  ogTitle?: string;
  ogDescription?: string;
  ogImage?: IServiceImage;

  createdAt: Date;
  updatedAt: Date;
}

const ImageSchema = new Schema<IServiceImage>(
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
      maxlength: 160,
    },
  },
  {
    _id: false,
  }
);

const BenefitSchema = new Schema<IServiceBenefit>(
  {
    title: {
      type: String,
      required: true,
      trim: true,
      maxlength: 120,
    },

    description: {
      type: String,
      required: true,
      trim: true,
      maxlength: 500,
    },

    icon: {
      type: String,
      trim: true,
      maxlength: 100,
    },
  },
  {
    _id: false,
  }
);

const FeatureSchema = new Schema<IServiceFeature>(
  {
    title: {
      type: String,
      required: true,
      trim: true,
      maxlength: 120,
    },

    description: {
      type: String,
      required: true,
      trim: true,
      maxlength: 500,
    },

    icon: {
      type: String,
      trim: true,
      maxlength: 100,
    },
  },
  {
    _id: false,
  }
);

const ProcessStepSchema =
  new Schema<IServiceProcessStep>(
    {
      order: {
        type: Number,
        required: true,
        min: 1,
      },

      title: {
        type: String,
        required: true,
        trim: true,
        maxlength: 120,
      },

      description: {
        type: String,
        required: true,
        trim: true,
        maxlength: 500,
      },
    },
    {
      _id: false,
    }
  );

const ServiceSchema = new Schema<IService>(
  {
    title: {
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

    heroEyebrow: {
      type: String,
      trim: true,
      maxlength: 80,
    },

    shortDescription: {
      type: String,
      required: true,
      trim: true,
      maxlength: 300,
    },

    description: {
      type: String,
      required: true,
      trim: true,
    },

    icon: {
      type: String,
      trim: true,
      maxlength: 100,
    },

    image: {
      type: ImageSchema,
    },

    benefits: {
      type: [BenefitSchema],
      default: [],
    },

    features: {
      type: [FeatureSchema],
      default: [],
    },

    process: {
      type: [ProcessStepSchema],
      default: [],
    },

    startingPrice: {
      type: Number,
      min: 0,
    },

    priceLabel: {
      type: String,
      trim: true,
      maxlength: 80,
    },

    ctaLabel: {
      type: String,
      trim: true,
      maxlength: 80,
    },

    ctaLink: {
      type: String,
      trim: true,
      maxlength: 500,
    },

    category: {
      type: String,
      enum: [
        "websites",
        "business-systems",
        "growth",
        "support",
      ],
      required: true,
      index: true,
    },

   faqIds: {
  type: [Schema.Types.ObjectId],
  ref: "FAQ",
  default: [],
},

projectIds: {
  type: [Schema.Types.ObjectId],
  ref: "Project",
  default: [],
},

    keywords: {
      type: [String],
      default: [],
      validate: {
        validator: (items: string[]) =>
          items.every(
            (item) =>
              typeof item === "string" &&
              item.trim().length > 0
          ),
        message: "Keywords must contain valid values.",
      },
    },

    featured: {
      type: Boolean,
      default: false,
      index: true,
    },

    published: {
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

    seoTitle: {
      type: String,
      trim: true,
      maxlength: 70,
    },

    seoDescription: {
      type: String,
      trim: true,
      maxlength: 160,
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
      type: ImageSchema,
    },
  },
  {
    timestamps: true,
  }
);

/* ---------------------------------------------
   INDEXES
--------------------------------------------- */

ServiceSchema.index({
  published: 1,
  category: 1,
  displayOrder: 1,
});

ServiceSchema.index({
  published: 1,
  featured: 1,
  displayOrder: 1,
});

/* ---------------------------------------------
   MODEL
--------------------------------------------- */

const Service: Model<IService> =
  mongoose.models.Service ||
  mongoose.model<IService>(
    "Service",
    ServiceSchema
  );

export default Service;