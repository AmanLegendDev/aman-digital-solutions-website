import mongoose from "mongoose";

const InquirySchema = new mongoose.Schema(
  {
    name: String,
    businessName: String,
    phone: String,
    email: String,
    businessType: String,
    budget: String,
    requirement: String,
    message: String,
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.Inquiry ||
  mongoose.model("Inquiry", InquirySchema);