import { NextResponse } from "next/server";

import { connectDB } from "@/lib/db/connect";

import ProjectRequest from "@/models/ProjectRequest";
import Counter from "@/models/Counter";
import Service from "@/models/Service";

import {
  resend,
  EMAIL_FROM,
  ADMIN_EMAIL,
} from "@/lib/email/resend";

import {
  projectRequestSchema,
} from "@/schemas/projectRequest.schema";

/* =========================================================
   HELPERS
========================================================= */

function escapeHtml(value: unknown): string {
  return String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function detailRow(
  label: string,
  value: unknown,
) {
  if (
    value === undefined ||
    value === null ||
    value === ""
  ) {
    return "";
  }

  return `
    <tr>
      <td style="
        padding:13px 0;
        width:160px;
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

function tagList(
  items: string[],
) {
  if (!items.length) {
    return `
      <span style="
        color:#999999;
        font-size:13px;
      ">
        None specified
      </span>
    `;
  }

  return items
    .map(
      (item) => `
        <span style="
          display:inline-block;
          margin:0 6px 6px 0;
          padding:7px 10px;
          border-radius:999px;
          background:#f5f5f5;
          border:1px solid #e8e8e8;
          color:#333333;
          font-size:11px;
        ">
          ${escapeHtml(item)}
        </span>
      `,
    )
    .join("");
}

function projectRequestEmail({
  requestId,
  fullName,
  companyName,
  email,
  phone,
  location,
  currentWebsite,
  preferredContactMethod,
  projectType,
  projectDescription,
  serviceNames,
  requiredPages,
  requiredFeatures,
  timeline,
  budgetRange,
  createdAt,
}: {
  requestId: string;

  fullName: string;
  companyName?: string;
  email: string;
  phone: string;
  location: string;
  currentWebsite?: string;

  preferredContactMethod: string;

  projectType: string;
  projectDescription: string;

  serviceNames: string[];

  requiredPages: string[];
  requiredFeatures: string[];

  timeline: string;
  budgetRange: string;

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
  <title>New Project Request</title>
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
    max-width:700px;
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
    New Project Request
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
    NEW PROJECT
  </div>

  <h1 style="
    margin:18px 0 8px;
    color:#111111;
    font-size:26px;
    line-height:1.25;
  ">
    ${escapeHtml(fullName)}
    submitted a project request.
  </h1>

  <p style="
    margin:0 0 26px;
    color:#737373;
    font-size:13px;
    line-height:1.6;
  ">
    Request ID:
    <strong style="color:#111111;">
      ${escapeHtml(requestId)}
    </strong>
  </p>

  <!-- CLIENT DETAILS -->

  <div style="
    margin-bottom:24px;
    padding:20px;
    border-radius:16px;
    background:#fafafa;
    border:1px solid #eeeeee;
  ">

    <div style="
      margin-bottom:12px;
      color:#999999;
      font-size:10px;
      font-weight:700;
      letter-spacing:1.5px;
      text-transform:uppercase;
    ">
      Client details
    </div>

    <table
      width="100%"
      cellpadding="0"
      cellspacing="0"
      border="0"
    >
      ${detailRow("Name", fullName)}
      ${detailRow("Company", companyName)}
      ${detailRow("Email", email)}
      ${detailRow("Phone / WhatsApp", phone)}
      ${detailRow("Location", location)}
      ${detailRow("Website", currentWebsite)}
      ${detailRow(
        "Preferred contact",
        preferredContactMethod,
      )}
      ${detailRow("Received", receivedAt)}
    </table>

  </div>

  <!-- PROJECT DETAILS -->

  <div style="
    margin-bottom:24px;
    padding:20px;
    border-radius:16px;
    background:#fafafa;
    border:1px solid #eeeeee;
  ">

    <div style="
      margin-bottom:12px;
      color:#999999;
      font-size:10px;
      font-weight:700;
      letter-spacing:1.5px;
      text-transform:uppercase;
    ">
      Project requirements
    </div>

    <table
      width="100%"
      cellpadding="0"
      cellspacing="0"
      border="0"
    >
      ${detailRow(
        "Project type",
        projectType,
      )}

      ${detailRow(
        "Timeline",
        timeline,
      )}

      ${detailRow(
        "Budget",
        budgetRange,
      )}
    </table>

  </div>

  <!-- SERVICES -->

  <div style="
    margin-bottom:24px;
    padding:20px;
    border-radius:16px;
    border:1px solid #eeeeee;
  ">

    <div style="
      margin-bottom:12px;
      color:#999999;
      font-size:10px;
      font-weight:700;
      letter-spacing:1.5px;
      text-transform:uppercase;
    ">
      Selected services
    </div>

    ${tagList(serviceNames)}

  </div>

  <!-- PAGES -->

  <div style="
    margin-bottom:24px;
    padding:20px;
    border-radius:16px;
    border:1px solid #eeeeee;
  ">

    <div style="
      margin-bottom:12px;
      color:#999999;
      font-size:10px;
      font-weight:700;
      letter-spacing:1.5px;
      text-transform:uppercase;
    ">
      Required pages
    </div>

    ${tagList(requiredPages)}

  </div>

  <!-- FEATURES -->

  <div style="
    margin-bottom:24px;
    padding:20px;
    border-radius:16px;
    border:1px solid #eeeeee;
  ">

    <div style="
      margin-bottom:12px;
      color:#999999;
      font-size:10px;
      font-weight:700;
      letter-spacing:1.5px;
      text-transform:uppercase;
    ">
      Required features
    </div>

    ${tagList(requiredFeatures)}

  </div>

  <!-- DESCRIPTION -->

  <div style="
    padding:22px;
    border-radius:16px;
    background:#080808;
  ">

    <div style="
      color:#FFC400;
      font-size:10px;
      font-weight:700;
      letter-spacing:1.5px;
      text-transform:uppercase;
    ">
      Project description
    </div>

    <div style="
      margin-top:12px;
      color:#dddddd;
      font-size:14px;
      line-height:1.8;
      white-space:pre-wrap;
    ">
      ${escapeHtml(projectDescription)}
    </div>

  </div>

  <!-- ACTION -->

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
    Contact ${escapeHtml(fullName)}
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
  New project request notification
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
   POST
========================================================= */

export async function POST(
  request: Request,
) {
  try {
    const body =
      await request.json();

    /* =====================================================
       VALIDATION
    ===================================================== */

    const parsed =
      projectRequestSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        {
          success: false,

          error:
            "Please check the submitted information.",

          fields:
            parsed.error.flatten()
              .fieldErrors,
        },
        {
          status: 400,
        },
      );
    }

    /* =====================================================
       DATABASE
    ===================================================== */

    await connectDB();

    /* =====================================================
       ATOMIC REQUEST COUNTER
    ===================================================== */

    const counter =
      await Counter.findOneAndUpdate(
        {
          _id: "project-request",
        },
        {
          $inc: {
            sequence: 1,
          },
        },
        {
          new: true,
          upsert: true,
          setDefaultsOnInsert: true,
        },
      );

    if (!counter) {
      throw new Error(
        "Unable to generate request number.",
      );
    }

    /* =====================================================
       REQUEST ID
    ===================================================== */

    const requestId =
      `ADS-${counter.sequence}`;

    /* =====================================================
       SAVE REQUEST
    ===================================================== */

    const projectRequest =
      await ProjectRequest.create({
        requestId,

        /* =================================================
           CLIENT
        ================================================= */

        fullName:
          parsed.data.fullName,

        companyName:
          parsed.data.companyName ||
          undefined,

        email:
          parsed.data.email,

        phone:
          parsed.data.phone,

        location:
          parsed.data.location,

        currentWebsite:
          parsed.data.currentWebsite ||
          undefined,

        preferredContactMethod:
          parsed.data.preferredContactMethod,

        /* =================================================
           PROJECT
        ================================================= */

        serviceIds:
          parsed.data.serviceIds,

        projectType:
          parsed.data.projectType,

        projectDescription:
          parsed.data.projectDescription,

        requiredPages:
          parsed.data.requiredPages,

        requiredFeatures:
          parsed.data.requiredFeatures,

        timeline:
          parsed.data.timeline,

        budgetRange:
          parsed.data.budgetRange,

        /* =================================================
           CONSENT
        ================================================= */

        privacyConsent:
          parsed.data.privacyConsent,

        /* =================================================
           ADMIN
        ================================================= */

        status: "NEW",
      });

    /* =====================================================
       GET SERVICE NAMES FOR EMAIL
    ===================================================== */

    const services =
      await Service.find({
        _id: {
          $in: projectRequest.serviceIds,
        },
      })
        .select("title")
        .lean();

    const serviceNames =
      services.map(
        (service) => service.title,
      );

    /* =====================================================
       ADMIN EMAIL NOTIFICATION
    ===================================================== */

  /* =====================================================
   ADMIN EMAIL NOTIFICATION
===================================================== */

console.log(
  "PROJECT_REQUEST_EMAIL_ATTEMPT:",
  {
    requestId: projectRequest.requestId,
    from: EMAIL_FROM,
    to: ADMIN_EMAIL,
  },
);

const { data: emailData, error: emailError } =
  await resend.emails.send(
    {
      from: EMAIL_FROM,

      to: [ADMIN_EMAIL],

      subject:
        `🚀 New Project Request — ${projectRequest.requestId}`,

      html: projectRequestEmail({
        requestId:
          projectRequest.requestId,

        fullName:
          projectRequest.fullName,

        companyName:
          projectRequest.companyName,

        email:
          projectRequest.email,

        phone:
          projectRequest.phone,

        location:
          projectRequest.location,

        currentWebsite:
          projectRequest.currentWebsite,

        preferredContactMethod:
          projectRequest.preferredContactMethod,

        projectType:
          projectRequest.projectType,

        projectDescription:
          projectRequest.projectDescription,

        serviceNames,

        requiredPages:
          projectRequest.requiredPages,

        requiredFeatures:
          projectRequest.requiredFeatures,

        timeline:
          projectRequest.timeline,

        budgetRange:
          projectRequest.budgetRange,

        createdAt:
          projectRequest.createdAt,
      }),

      replyTo:
        projectRequest.email,

      tags: [
        {
          name: "event",
          value:
            "project-request-created",
        },

        {
          name: "request_id",
          value:
            projectRequest.requestId,
        },
      ],
    },
    {
      idempotencyKey:
        `project-request-admin/${projectRequest._id}`,
    },
  );

if (emailError) {
  console.error(
    "PROJECT_REQUEST_EMAIL_NOTIFICATION_FAILED:",
    {
      requestId:
        projectRequest.requestId,

      error:
        emailError,
    },
  );
} else {
  console.log(
    "PROJECT_REQUEST_EMAIL_SENT_SUCCESSFULLY:",
    {
      requestId:
        projectRequest.requestId,

      emailId:
        emailData?.id,
    },
  );
}

    /* =====================================================
       RESPONSE
    ===================================================== */

    return NextResponse.json(
      {
        success: true,

        requestId:
          projectRequest.requestId,
      },
      {
        status: 201,
      },
    );
  } catch (error) {
    console.error(
      "PROJECT REQUEST ERROR:",
      error,
    );

    return NextResponse.json(
      {
        success: false,

        error:
          "Something went wrong while submitting your request.",
      },
      {
        status: 500,
      },
    );
  }
}