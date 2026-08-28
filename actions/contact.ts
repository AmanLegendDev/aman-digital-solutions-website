"use server";

import { connectDB } from "@/lib/db/connect";
import Contact from "@/models/Contact";

type ContactActionResult =
  | {
      success: true;
      message: string;
    }
  | {
      success: false;
      message: string;
    };

/* =========================================================
   CREATE CONTACT ENQUIRY
========================================================= */

export async function createContactEnquiry(
  formData: FormData
): Promise<ContactActionResult> {
  try {
    /* =====================================================
       READ FORM DATA
    ===================================================== */

    const name = String(
      formData.get("name") || ""
    ).trim();

    const email = String(
      formData.get("email") || ""
    )
      .trim()
      .toLowerCase();

    const phone = String(
      formData.get("phone") || ""
    ).trim();

    const company = String(
      formData.get("company") || ""
    ).trim();

    const service = String(
      formData.get("service") || ""
    ).trim();

    const budget = String(
      formData.get("budget") || ""
    ).trim();

    const message = String(
      formData.get("message") || ""
    ).trim();

    /* =====================================================
       VALIDATION
    ===================================================== */

    if (!name) {
      return {
        success: false,
        message: "Please enter your name.",
      };
    }

    if (!email) {
      return {
        success: false,
        message: "Please enter your email address.",
      };
    }

    const emailRegex =
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
      return {
        success: false,
        message:
          "Please enter a valid email address.",
      };
    }

    if (!message) {
      return {
        success: false,
        message:
          "Please tell us about your project.",
      };
    }

    if (name.length > 120) {
      return {
        success: false,
        message: "Name is too long.",
      };
    }

    if (message.length > 5000) {
      return {
        success: false,
        message: "Message is too long.",
      };
    }

    /* =====================================================
       DATABASE
    ===================================================== */

    await connectDB();

    await Contact.create({
      name,
      email,
      phone: phone || undefined,
      company: company || undefined,
      service: service || undefined,
      budget: budget || undefined,
      message,
      status: "new",
    });

    /* =====================================================
       SUCCESS
    ===================================================== */

    return {
      success: true,
      message:
        "Your project enquiry has been sent successfully.",
    };
  } catch (error) {
    console.error(
      "CREATE_CONTACT_ENQUIRY_ERROR:",
      error
    );

    return {
      success: false,
      message:
        "Something went wrong. Please try again.",
    };
  }
}