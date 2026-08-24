import mongoose, { Document, Model, Schema } from "mongoose";

export interface ITestimonialImage {
  url: string;
  publicId?: string;
  alt?: string;
}

export interface ITestimonial extends Document {
  name: string;
  slug: string;

  role?: string;
  company?: string;
  location?: string;

  quote: string;

  image?: ITestimonialImage;

  rating?: number;

  project?: string;

  featured: boolean;
  published: boolean;
  displayOrder: number;

  seoTitle?: string;
  seoDescription?: string;
  canonicalUrl?: string;

  ogTitle?: string;
  ogDescription?: string;
  ogImage?: ITestimonialImage;

  createdAt: Date;
  updatedAt: Date;
}

const ImageSchema = new Schema<ITestimonialImage>(
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

const TestimonialSchema = new Schema<ITestimonial>(
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
    },

    role: {
      type: String,
      trim: true,
      maxlength: 120,
    },

    company: {
      type: String,
      trim: true,
      maxlength: 150,
    },

    location: {
      type: String,
      trim: true,
      maxlength: 120,
    },

    quote: {
      type: String,
      required: true,
      trim: true,
      maxlength: 1000,
    },

    image: {
      type: ImageSchema,
    },

    rating: {
      type: Number,
      min: 1,
      max: 5,
    },

    project: {
      type: String,
      trim: true,
      maxlength: 150,
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

const Testimonial: Model<ITestimonial> =
  mongoose.models.Testimonial ||
  mongoose.model<ITestimonial>(
    "Testimonial",
    TestimonialSchema
  );

export default Testimonial;