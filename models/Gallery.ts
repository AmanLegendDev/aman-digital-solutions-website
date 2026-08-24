import mongoose, {
  Document,
  Model,
  Schema,
  Types,
} from "mongoose";

export type GalleryMediaType = "image" | "video";

export interface IGalleryMedia {
  _id: Types.ObjectId;

  type: GalleryMediaType;

  url: string;
  publicId?: string;

  thumbnailUrl?: string;
  thumbnailPublicId?: string;

  alt?: string;
  caption?: string;

  displayOrder: number;
}

export interface IGallery extends Document {
  title: string;
  slug: string;

  shortDescription?: string;
  description?: string;

  coverImage?: {
    url: string;
    publicId?: string;
    alt?: string;
  };

  media: IGalleryMedia[];

  project?: Types.ObjectId;

  category?: string;

  featured: boolean;
  published: boolean;
  displayOrder: number;

  seoTitle?: string;
  seoDescription?: string;
  canonicalUrl?: string;

  ogTitle?: string;
  ogDescription?: string;

  ogImage?: {
    url: string;
    publicId?: string;
    alt?: string;
  };

  createdAt: Date;
  updatedAt: Date;
}

const ImageSchema = new Schema(
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

const MediaSchema = new Schema<IGalleryMedia>(
  {
    type: {
      type: String,
      enum: ["image", "video"],
      required: true,
    },

    url: {
      type: String,
      required: true,
      trim: true,
    },

    publicId: {
      type: String,
      trim: true,
    },

    thumbnailUrl: {
      type: String,
      trim: true,
    },

    thumbnailPublicId: {
      type: String,
      trim: true,
    },

    alt: {
      type: String,
      trim: true,
      maxlength: 160,
    },

    caption: {
      type: String,
      trim: true,
      maxlength: 300,
    },

    displayOrder: {
      type: Number,
      default: 0,
      min: 0,
    },
  },
  {
    _id: true,
  }
);

const GallerySchema = new Schema<IGallery>(
  {
    title: {
      type: String,
      required: true,
      trim: true,
      maxlength: 150,
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
      trim: true,
      maxlength: 300,
    },

    description: {
      type: String,
      trim: true,
    },

    coverImage: {
      type: ImageSchema,
    },

    media: {
      type: [MediaSchema],
      default: [],
    },

    project: {
      type: Schema.Types.ObjectId,
      ref: "Project",
    },

    category: {
      type: String,
      trim: true,
      maxlength: 100,
      index: true,
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

const Gallery: Model<IGallery> =
  mongoose.models.Gallery ||
  mongoose.model<IGallery>(
    "Gallery",
    GallerySchema
  );

export default Gallery;