import mongoose, { Document, Model, Schema, Types } from "mongoose";

export interface ILocationImage {
  url: string;
  publicId?: string;
  alt?: string;
}

export interface ILocation extends Document {
  name: string;
  slug: string;

  shortDescription: string;
  description: string;

  image?: ILocationImage;

  address?: string;
  city: string;
  state?: string;
  country: string;
  postalCode?: string;

  latitude?: number;
  longitude?: number;

  phone?: string;
  email?: string;
  mapUrl?: string;

  services: Types.ObjectId[];

  featured: boolean;
  published: boolean;
  displayOrder: number;

  seoTitle?: string;
  seoDescription?: string;
  canonicalUrl?: string;

  ogTitle?: string;
  ogDescription?: string;
  ogImage?: ILocationImage;

  createdAt: Date;
  updatedAt: Date;
}

const ImageSchema = new Schema<ILocationImage>(
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

const LocationSchema = new Schema<ILocation>(
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

    image: {
      type: ImageSchema,
    },

    address: {
      type: String,
      trim: true,
      maxlength: 300,
    },

    city: {
      type: String,
      required: true,
      trim: true,
      maxlength: 100,
      index: true,
    },

    state: {
      type: String,
      trim: true,
      maxlength: 100,
    },

    country: {
      type: String,
      required: true,
      trim: true,
      maxlength: 100,
      default: "India",
    },

    postalCode: {
      type: String,
      trim: true,
      maxlength: 20,
    },

    latitude: {
      type: Number,
      min: -90,
      max: 90,
    },

    longitude: {
      type: Number,
      min: -180,
      max: 180,
    },

    phone: {
      type: String,
      trim: true,
      maxlength: 30,
    },

    email: {
      type: String,
      trim: true,
      lowercase: true,
      maxlength: 150,
    },

    mapUrl: {
      type: String,
      trim: true,
      maxlength: 500,
    },

   services: {
  type: [Schema.Types.ObjectId],
  ref: "Service",
  default: [],
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

const Location: Model<ILocation> =
  mongoose.models.Location ||
  mongoose.model<ILocation>("Location", LocationSchema);

export default Location;