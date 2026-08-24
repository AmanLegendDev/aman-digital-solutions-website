import mongoose, {
  Document,
  Model,
  Schema,
  Types,
} from "mongoose";

/* =====================================================
   PROJECT IMAGE
===================================================== */

export interface IProjectImage {
  url: string;
  publicId?: string;
  alt?: string;
}

/* =====================================================
   PROJECT GALLERY MEDIA
===================================================== */

export type ProjectGalleryMediaType =
  | "image"
  | "video";

export interface IProjectGalleryMedia {
  type: ProjectGalleryMediaType;
  url: string;
  publicId?: string;
  title: string;
}

/* =====================================================
   PROJECT FEATURE
===================================================== */

export interface IProjectFeature {
  title: string;
  description: string;
  icon?: string;
}

/* =====================================================
   PROJECT RESULT
===================================================== */

export interface IProjectResult {
  label: string;
  value: string;
  description?: string;
}

/* =====================================================
   PROJECT DOCUMENT
===================================================== */

export interface IProject extends Document {
  title: string;
  slug: string;

  client?: string;
  industry?: string;

  shortDescription: string;
  overview: string;

  challenge?: string;
  solution?: string;

  features: IProjectFeature[];

  technologies: string[];

  coverImage?: IProjectImage;

  gallery: IProjectGalleryMedia[];

  liveUrl?: string;
  githubUrl?: string;

  services: Types.ObjectId[];

  results: IProjectResult[];

  featured: boolean;
  published: boolean;
  displayOrder: number;

  seoTitle?: string;
  seoDescription?: string;
  canonicalUrl?: string;

  ogTitle?: string;
  ogDescription?: string;
  ogImage?: IProjectImage;

  createdAt: Date;
  updatedAt: Date;
}

/* =====================================================
   IMAGE SCHEMA
===================================================== */

const ImageSchema = new Schema<IProjectImage>(
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

/* =====================================================
   GALLERY MEDIA SCHEMA
===================================================== */

const GalleryMediaSchema =
  new Schema<IProjectGalleryMedia>(
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

      title: {
        type: String,
        required: true,
        trim: true,
        maxlength: 160,
      },
    },
    {
      _id: false,
    }
  );

/* =====================================================
   FEATURE SCHEMA
===================================================== */

const FeatureSchema =
  new Schema<IProjectFeature>(
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

/* =====================================================
   RESULT SCHEMA
===================================================== */

const ResultSchema =
  new Schema<IProjectResult>(
    {
      label: {
        type: String,
        required: true,
        trim: true,
        maxlength: 100,
      },

      value: {
        type: String,
        required: true,
        trim: true,
        maxlength: 120,
      },

      description: {
        type: String,
        trim: true,
        maxlength: 300,
      },
    },
    {
      _id: false,
    }
  );

/* =====================================================
   PROJECT SCHEMA
===================================================== */

const ProjectSchema =
  new Schema<IProject>(
    {
      /* ---------------------------------------------
         BASIC INFORMATION
      --------------------------------------------- */

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
        match: [
          /^[a-z0-9]+(?:-[a-z0-9]+)*$/,
          "Slug must contain lowercase letters, numbers and hyphens only.",
        ],
      },

      client: {
        type: String,
        trim: true,
        maxlength: 150,
      },

      industry: {
        type: String,
        trim: true,
        maxlength: 100,
      },

      shortDescription: {
        type: String,
        required: true,
        trim: true,
        maxlength: 300,
      },

      overview: {
        type: String,
        required: true,
        trim: true,
      },

      challenge: {
        type: String,
        trim: true,
      },

      solution: {
        type: String,
        trim: true,
      },

      /* ---------------------------------------------
         FEATURES
      --------------------------------------------- */

      features: {
        type: [FeatureSchema],
        default: [],
      },

      /* ---------------------------------------------
         TECHNOLOGIES
         Example:
         Next.js
         React
         TypeScript
         MongoDB
         Cloudinary
      --------------------------------------------- */

      technologies: {
        type: [String],
        default: [],
        validate: {
          validator: (items: string[]) =>
            items.every(
              (item) =>
                typeof item === "string" &&
                item.trim().length > 0
            ),
          message:
            "Technologies must contain valid names.",
        },
      },

      /* ---------------------------------------------
         COVER IMAGE
      --------------------------------------------- */

      coverImage: {
        type: ImageSchema,
      },

      /* ---------------------------------------------
         GALLERY
         Supports images + videos
      --------------------------------------------- */

      gallery: {
        type: [GalleryMediaSchema],
        default: [],
      },

      /* ---------------------------------------------
         LINKS
      --------------------------------------------- */

      liveUrl: {
        type: String,
        trim: true,
        maxlength: 500,
      },

      githubUrl: {
        type: String,
        trim: true,
        maxlength: 500,
      },

      /* ---------------------------------------------
         RELATED SERVICES
      --------------------------------------------- */

      services: {
        type: [Schema.Types.ObjectId],
        ref: "Service",
        default: [],
      },

      /* ---------------------------------------------
         RESULTS
      --------------------------------------------- */

      results: {
        type: [ResultSchema],
        default: [],
      },

      /* ---------------------------------------------
         PUBLISHING
      --------------------------------------------- */

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

      /* ---------------------------------------------
         SEO
      --------------------------------------------- */

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

      /* ---------------------------------------------
         SOCIAL / OG
      --------------------------------------------- */

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

/* =====================================================
   INDEXES
===================================================== */

ProjectSchema.index({
  published: 1,
  displayOrder: 1,
});

ProjectSchema.index({
  published: 1,
  featured: 1,
  displayOrder: 1,
});

/* =====================================================
   MODEL
===================================================== */

const Project: Model<IProject> =
  mongoose.models.Project ||
  mongoose.model<IProject>(
    "Project",
    ProjectSchema
  );

export default Project;