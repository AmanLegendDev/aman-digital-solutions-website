"use server";

import { connectDB } from "@/lib/db/connect";
import Contact from "@/models/Contact";

import {
  resend,
  EMAIL_FROM,
  ADMIN_EMAIL,
} from "@/lib/email/resend";

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
   HTML HELPERS
========================================================= */

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function detailRow(
  label: string,
  value?: string,
) {
  if (!value) return "";

  return `
    <tr>
      <td style="
        padding:13px 0;
        width:145px;
        color:#737373;
        font-size:12px;
        vertical-align:top;
        border-bottom:1px solid #eeeeee;
      ">
        ${escapeHtml(label)}
      </td>

      <td style="
        padding:13px 0;
        color:#171717;
        font-size:14px;
        font-weight:600;
        vertical-align:top;
        border-bottom:1px solid #eeeeee;
      ">
        ${escapeHtml(value)}
      </td>
    </tr>
  `;
}

/* =========================================================
   CONTACT EMAIL
========================================================= */

function createContactEmail({
  name,
  email,
  phone,
  company,
  service,
  budget,
  message,
  createdAt,
}: {
  name: string;
  email: string;
  phone?: string;
  company?: string;
  service?: string;
  budget?: string;
  message: string;
  createdAt?: Date;
}) {
  const receivedAt = createdAt
    ? new Intl.DateTimeFormat("en-IN", {
        dateStyle: "medium",
        timeStyle: "short",
        timeZone: "Asia/Kolkata",
      }).format(createdAt)
    : "Just now";

  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta
    name="viewport"
    content="width=device-width, initial-scale=1.0"
  />
  <title>New Contact Enquiry</title>
</head>

<body style="
  margin:0;
  padding:0;
  background:#f4f4f4;
  font-family:Arial,Helvetica,sans-serif;
">

<table
  width="100%"
  cellpadding="0"
  cellspacing="0"
  border="0"
  style="padding:40px 16px;"
>
<tr>
<td align="center">

<table
  width="100%"
  cellpadding="0"
  cellspacing="0"
  border="0"
  style="
    max-width:640px;
    background:#ffffff;
    border:1px solid #e7e7e7;
    border-radius:22px;
    overflow:hidden;
  "
>

<!-- HEADER -->

<tr>
<td style="
  padding:30px 32px;
  background:#080808;
">

  <div style="
    color:#ffffff;
    font-size:21px;
    font-weight:700;
  ">
    Aman Digital Solutions
  </div>

  <div style="
    margin-top:7px;
    color:#FFC400;
    font-size:11px;
    font-weight:700;
    letter-spacing:1.5px;
    text-transform:uppercase;
  ">
    New Contact Enquiry
  </div>

</td>
</tr>

<!-- CONTENT -->

<tr>
<td style="padding:32px;">

  <div style="
    display:inline-block;
    padding:7px 11px;
    border-radius:999px;
    background:#fff8d9;
    color:#806100;
    font-size:10px;
    font-weight:700;
    letter-spacing:.5px;
  ">
    NEW LEAD
  </div>

  <h1 style="
    margin:18px 0 8px;
    color:#111111;
    font-size:25px;
    line-height:1.25;
  ">
    ${escapeHtml(name)} contacted you.
  </h1>

  <p style="
    margin:0 0 26px;
    color:#737373;
    font-size:14px;
    line-height:1.6;
  ">
    A new enquiry has been submitted through
    your website contact form.
  </p>

  <!-- DETAILS -->

  <table
    width="100%"
    cellpadding="0"
    cellspacing="0"
    border="0"
  >
    ${detailRow("Name", name)}
    ${detailRow("Email", email)}
    ${detailRow("Phone / WhatsApp", phone)}
    ${detailRow("Company", company)}
    ${detailRow("Service", service)}
    ${detailRow("Budget", budget)}
    ${detailRow("Received", receivedAt)}
  </table>

  <!-- MESSAGE -->

  <div style="
    margin-top:28px;
    padding:20px;
    border-radius:16px;
    background:#fafafa;
    border:1px solid #eeeeee;
  ">

    <div style="
      color:#999999;
      font-size:10px;
      font-weight:700;
      letter-spacing:1.5px;
      text-transform:uppercase;
    ">
      Message
    </div>

    <div style="
      margin-top:10px;
      color:#333333;
      font-size:14px;
      line-height:1.8;
      white-space:pre-wrap;
    ">
      ${escapeHtml(message)}
    </div>

  </div>

  <!-- REPLY -->

  <a
    href="mailto:${escapeHtml(email)}"
    style="
      display:inline-block;
      margin-top:28px;
      padding:13px 20px;
      border-radius:999px;
      background:#FFC400;
      color:#000000;
      text-decoration:none;
      font-size:13px;
      font-weight:700;
    "
  >
    Reply to ${escapeHtml(name)}
  </a>

</td>
</tr>

<!-- FOOTER -->

<tr>
<td style="
  padding:22px 32px;
  background:#fafafa;
  border-top:1px solid #eeeeee;
  color:#999999;
  font-size:11px;
  line-height:1.6;
">
  Aman Digital Solutions<br />
  New website contact notification
</td>
</tr>

</table>

</td>
</tr>
</table>

</body>
</html>
`;
}

/* =========================================================
   CREATE CONTACT ENQUIRY
========================================================= */

export async function createContactEnquiry(
  formData: FormData,
): Promise<ContactActionResult> {
  try {
    /* =====================================================
       READ FORM DATA
    ===================================================== */

    const name = String(
      formData.get("name") || "",
    ).trim();

    const email = String(
      formData.get("email") || "",
    )
      .trim()
      .toLowerCase();

    const phone = String(
      formData.get("phone") || "",
    ).trim();

    const company = String(
      formData.get("company") || "",
    ).trim();

    const service = String(
      formData.get("service") || "",
    ).trim();

    const budget = String(
      formData.get("budget") || "",
    ).trim();

    const message = String(
      formData.get("message") || "",
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
        message:
          "Please enter your email address.",
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

    const contact = await Contact.create({
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
       ADMIN EMAIL NOTIFICATION
    ===================================================== */

    try {
      await resend.emails.send(
        {
          from: EMAIL_FROM,
          to: [ADMIN_EMAIL],

          subject:
            `🔔 New Contact Enquiry — ${name}`,

          html: createContactEmail({
            name: contact.name,
            email: contact.email,
            phone: contact.phone,
            company: contact.company,
            service: contact.service,
            budget: contact.budget,
            message: contact.message,
            createdAt: contact.createdAt,
          }),

          replyTo: contact.email,

          tags: [
            {
              name: "event",
              value: "contact-enquiry-created",
            },
          ],
        },
        {
          idempotencyKey:
            `contact-enquiry-admin/${contact._id}`,
        },
      );
    } catch (emailError) {
      console.error(
        "CONTACT_EMAIL_NOTIFICATION_FAILED:",
        emailError,
      );
    }

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
      error,
    );

    return {
      success: false,
      message:
        "Something went wrong. Please try again.",
    };
  }
}