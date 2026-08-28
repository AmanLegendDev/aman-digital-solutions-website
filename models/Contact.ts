import mongoose, {
  Document,
  Model,
  Schema,
} from "mongoose";

/* =========================================================
   CONTACT ENQUIRY
========================================================= */

export interface IContact extends Document {
  name: string;
  email: string;
  phone?: string;
  company?: string;

  service?: string;
  budget?: string;

  message: string;

  status:
    | "new"
    | "contacted"
    | "in-progress"
    | "completed"
    | "archived";

  createdAt: Date;
  updatedAt: Date;
}

/* =========================================================
   SCHEMA
========================================================= */

const ContactSchema = new Schema<IContact>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      maxlength: 120,
    },

    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
      maxlength: 160,
    },

    phone: {
      type: String,
      trim: true,
      maxlength: 30,
    },

    company: {
      type: String,
      trim: true,
      maxlength: 150,
    },

    service: {
      type: String,
      trim: true,
      maxlength: 150,
    },

    budget: {
      type: String,
      trim: true,
      maxlength: 100,
    },

    message: {
      type: String,
      required: true,
      trim: true,
      maxlength: 5000,
    },

    status: {
      type: String,
      enum: [
        "new",
        "contacted",
        "in-progress",
        "completed",
        "archived",
      ],
      default: "new",
      index: true,
    },
  },
  {
    timestamps: true,
  }
);

/* =========================================================
   INDEXES
========================================================= */

ContactSchema.index({
  createdAt: -1,
});

ContactSchema.index({
  status: 1,
  createdAt: -1,
});

/* =========================================================
   MODEL
========================================================= */

const Contact: Model<IContact> =
  mongoose.models.Contact ||
  mongoose.model<IContact>(
    "Contact",
    ContactSchema
  );

export default Contact;