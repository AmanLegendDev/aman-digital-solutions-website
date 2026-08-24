import mongoose, {
  Document,
  Model,
  Schema,
} from "mongoose";

export interface IFAQ extends Document {
  question: string;
  slug: string;

  answer: string;

  category?: string;

  relatedService?: mongoose.Types.ObjectId;
  relatedProject?: mongoose.Types.ObjectId;

  featured: boolean;
  published: boolean;
  displayOrder: number;

  seoTitle?: string;
  seoDescription?: string;
  canonicalUrl?: string;

  createdAt: Date;
  updatedAt: Date;
}

const FAQSchema = new Schema<IFAQ>(
  {
    question: {
      type: String,
      required: true,
      trim: true,
      maxlength: 300,
    },

    slug: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      index: true,
    },

    answer: {
      type: String,
      required: true,
      trim: true,
    },

    category: {
      type: String,
      trim: true,
      maxlength: 100,
      index: true,
    },

    relatedService: {
      type: Schema.Types.ObjectId,
      ref: "Service",
    },

    relatedProject: {
      type: Schema.Types.ObjectId,
      ref: "Project",
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
  },
  {
    timestamps: true,
  }
);

const FAQ: Model<IFAQ> =
  mongoose.models.FAQ ||
  mongoose.model<IFAQ>("FAQ", FAQSchema);

export default FAQ;