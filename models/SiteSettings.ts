import mongoose, {
  Document,
  Model,
  Schema,
} from "mongoose";

interface ISocialLinks {
  instagram?: string;
  facebook?: string;
  linkedin?: string;
  youtube?: string;
  twitter?: string;
  github?: string;
}

interface IContactInfo {
  email?: string;
  phone?: string;
  whatsapp?: string;
  address?: string;
  city?: string;
  state?: string;
  country?: string;
  postalCode?: string;
}

interface IBusinessHours {
  day: string;
  isOpen: boolean;
  openTime?: string;
  closeTime?: string;
}

interface IImage {
  url: string;
  publicId?: string;
  alt?: string;
}

export interface ISiteSettings
  extends Document {
  siteName: string;
  tagline?: string;
  description?: string;

  logo?: IImage;
  favicon?: IImage;

  contact: IContactInfo;

  socialLinks: ISocialLinks;

  businessHours: IBusinessHours[];

  primaryEmail?: string;
  primaryPhone?: string;

  whatsappNumber?: string;

  defaultOgImage?: IImage;

  footerText?: string;
  copyrightText?: string;

  googleMapsUrl?: string;

  googleAnalyticsId?: string;
  googleTagManagerId?: string;

  facebookPixelId?: string;

  maintenanceMode: boolean;

  maintenanceTitle?: string;
  maintenanceMessage?: string;

  showCookieBanner: boolean;
  cookieMessage?: string;

  seoTitle?: string;
  seoDescription?: string;

  defaultCanonicalBaseUrl: string;

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

const ContactSchema = new Schema(
  {
    email: {
      type: String,
      trim: true,
      lowercase: true,
    },

    phone: {
      type: String,
      trim: true,
    },

    whatsapp: {
      type: String,
      trim: true,
    },

    address: {
      type: String,
      trim: true,
    },

    city: {
      type: String,
      trim: true,
    },

    state: {
      type: String,
      trim: true,
    },

    country: {
      type: String,
      trim: true,
    },

    postalCode: {
      type: String,
      trim: true,
    },
  },
  {
    _id: false,
  }
);

const SocialLinksSchema = new Schema(
  {
    instagram: String,
    facebook: String,
    linkedin: String,
    youtube: String,
    twitter: String,
    github: String,
  },
  {
    _id: false,
  }
);

const BusinessHoursSchema =
  new Schema(
    {
      day: {
        type: String,
        required: true,
      },

      isOpen: {
        type: Boolean,
        default: true,
      },

      openTime: String,
      closeTime: String,
    },
    {
      _id: false,
    }
  );

const SiteSettingsSchema =
  new Schema<ISiteSettings>(
    {
      siteName: {
        type: String,
        required: true,
        trim: true,
        maxlength: 150,
      },

      tagline: {
        type: String,
        trim: true,
        maxlength: 250,
      },

      description: {
        type: String,
        trim: true,
        maxlength: 1000,
      },

      logo: {
        type: ImageSchema,
      },

      favicon: {
        type: ImageSchema,
      },

      contact: {
        type: ContactSchema,
        default: {},
      },

      socialLinks: {
        type: SocialLinksSchema,
        default: {},
      },

      businessHours: {
        type: [BusinessHoursSchema],
        default: [],
      },

      primaryEmail: {
        type: String,
        trim: true,
        lowercase: true,
      },

      primaryPhone: {
        type: String,
        trim: true,
      },

      whatsappNumber: {
        type: String,
        trim: true,
      },

      defaultOgImage: {
        type: ImageSchema,
      },

      footerText: {
        type: String,
        trim: true,
        maxlength: 500,
      },

      copyrightText: {
        type: String,
        trim: true,
        maxlength: 250,
      },

      googleMapsUrl: {
        type: String,
        trim: true,
      },

      googleAnalyticsId: {
        type: String,
        trim: true,
      },

      googleTagManagerId: {
        type: String,
        trim: true,
      },

      facebookPixelId: {
        type: String,
        trim: true,
      },

      maintenanceMode: {
        type: Boolean,
        default: false,
      },

      maintenanceTitle: {
        type: String,
        trim: true,
        maxlength: 150,
      },

      maintenanceMessage: {
        type: String,
        trim: true,
        maxlength: 500,
      },

      showCookieBanner: {
        type: Boolean,
        default: false,
      },

      cookieMessage: {
        type: String,
        trim: true,
        maxlength: 500,
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

      defaultCanonicalBaseUrl: {
        type: String,
        required: true,
        trim: true,
      },
    },
    {
      timestamps: true,
    }
  );

const SiteSettings: Model<ISiteSettings> =
  mongoose.models.SiteSettings ||
  mongoose.model<ISiteSettings>(
    "SiteSettings",
    SiteSettingsSchema
  );

export default SiteSettings;