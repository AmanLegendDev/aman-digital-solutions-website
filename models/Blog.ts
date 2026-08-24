import mongoose, { Document, Model, Schema } from "mongoose";

export interface IBlogImage {
  url: string;
  publicId?: string;
  alt?: string;
}

export interface IBlog extends Document {
  title: string;
  slug: string;

  excerpt: string;
  content: string;

  coverImage?: IBlogImage;

  author: string;
  category: string;
  tags: string[];

  readingTime?: number;

  featured: boolean;
  published: boolean;
  publishedAt?: Date;

  displayOrder: number;

  seoTitle?: string;
  seoDescription?: string;
  canonicalUrl?: string;

  ogTitle?: string;
  ogDescription?: string;
  ogImage?: IBlogImage;

  createdAt: Date;
  updatedAt: Date;
}

const ImageSchema = new Schema<IBlogImage>(
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

const BlogSchema = new Schema<IBlog>(
  {
    title: {
      type: String,
      required: true,
      trim: true,
      maxlength: 180,
    },

    slug: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      index: true,
    },

    excerpt: {
      type: String,
      required: true,
      trim: true,
      maxlength: 320,
    },

    content: {
      type: String,
      required: true,
      trim: true,
    },

    coverImage: {
      type: ImageSchema,
    },

    author: {
      type: String,
      required: true,
      trim: true,
      maxlength: 120,
    },

    category: {
      type: String,
      required: true,
      trim: true,
      maxlength: 100,
      index: true,
    },

   tags: {
  type: [
    {
      type: String,
      trim: true,
      maxlength: 50,
    },
  ],
  default: [],
},

    readingTime: {
      type: Number,
      min: 1,
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

    publishedAt: {
      type: Date,
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

const Blog: Model<IBlog> =
  mongoose.models.Blog ||
  mongoose.model<IBlog>("Blog", BlogSchema);

export default Blog;