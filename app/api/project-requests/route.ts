import { NextResponse } from "next/server";

import mongoose from "mongoose";

import { connectDB } from "@/lib/db/connect";

import ProjectRequest, {
  IProjectRequest,
} from "@/models/ProjectRequest";
import Counter from "@/models/Counter";
import Service from "@/models/Service";
import Offer from "@/models/Offer";

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

function tagList(items: string[]) {
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

/* =========================================================
   EMAIL
========================================================= */

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
  leadSource,
  offerTitle,
  offerCouponCode,
  offerDiscountLabel,
  offerOriginalPrice,
  offerPrice,
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

  leadSource: string;

  offerTitle?: string;
  offerCouponCode?: string;
  offerDiscountLabel?: string;
  offerOriginalPrice?: number;
  offerPrice?: number;
}) {
  const receivedAt = createdAt
    ? new Intl.DateTimeFormat("en-IN", {
        dateStyle: "medium",
        timeStyle: "short",
        timeZone: "Asia/Kolkata",
      }).format(createdAt)
    : "Just now";

  const offerSection =
    offerTitle
      ? `
        <div style="
          margin-bottom:24px;
          padding:22px;
          border-radius:16px;
          background:#fff9df;
          border:1px solid #f0d56a;
        ">
          <div style="
            margin-bottom:12px;
            color:#806100;
            font-size:10px;
            font-weight:700;
            letter-spacing:1.5px;
            text-transform:uppercase;
          ">
            Offer claim
          </div>

          ${detailRow(
            "Offer",
            offerTitle,
          )}

          ${detailRow(
            "Coupon",
            offerCouponCode,
          )}

          ${detailRow(
            "Discount",
            offerDiscountLabel,
          )}

          ${detailRow(
            "Original price",
            typeof offerOriginalPrice === "number"
              ? `₹${offerOriginalPrice.toLocaleString("en-IN")}`
              : undefined,
          )}

          ${detailRow(
            "Offer price",
            typeof offerPrice === "number"
              ? `₹${offerPrice.toLocaleString("en-IN")}`
              : undefined,
          )}
        </div>
      `
      : "";

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
    text-transform:uppercase;
  ">
    ${escapeHtml(
      leadSource === "OFFER"
        ? "OFFER CLAIM"
        : "NEW PROJECT",
    )}
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

  ${offerSection}

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
      ${detailRow("Lead source", leadSource)}
      ${detailRow("Received", receivedAt)}
    </table>

  </div>

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
  let session: mongoose.ClientSession | null =
    null;

  try {
    const body = await request.json();

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

    await connectDB();

    session =
      await mongoose.startSession();

 
    let serviceNames: string[] = [];

    /* =====================================================
       TRANSACTION
    ===================================================== */

   const transactionResult =
  await session.withTransaction(
    async () => {
        const now = new Date();

        const {
          offerSlug,
          serviceIds,
        } = parsed.data;

        let offer: any = null;

        /* =================================================
           OFFER RESOLUTION
        ================================================= */

        if (
          offerSlug &&
          offerSlug.trim()
        ) {
          offer =
            await Offer.findOne({
              slug: offerSlug
                .trim()
                .toLowerCase(),
              published: true,
            })
              .session(session)
              .lean();

          if (!offer) {
            throw new Error(
              "OFFER_NOT_FOUND",
            );
          }

          /* ===============================================
             OFFER DATE VALIDATION
          =============================================== */

          if (
            now < offer.startDate
          ) {
            throw new Error(
              "OFFER_NOT_STARTED",
            );
          }

          if (
            now > offer.endDate
          ) {
            throw new Error(
              "OFFER_EXPIRED",
            );
          }

          /* ===============================================
             DUPLICATE OFFER CLAIM CHECK
          =============================================== */

          const existingClaim =
            await ProjectRequest.exists({
              offerId: offer._id,
              email:
                parsed.data.email
                  .trim()
                  .toLowerCase(),
            }).session(session);

          if (existingClaim) {
            throw new Error(
              "OFFER_ALREADY_CLAIMED",
            );
          }

          /* ===============================================
             ATOMIC OFFER CLAIM
          =============================================== */
const claimedOffer = await Offer.findOneAndUpdate(
  {
    _id: offer._id,
    ...(offer.isClaimLimitEnabled
      ? {
          $expr: {
            $lt: [
              { $ifNull: ["$claimedCount", 0] },
              { $ifNull: ["$claimLimit", 0] },
            ],
          },
        }
      : {}),
  },
  {
    $inc: {
      claimedCount: 1,
    },
  },
  {
    new: true,
    session,
  },
);

if (!claimedOffer) {
  throw new Error("OFFER_FULLY_CLAIMED");
}
          /* ===============================================
             SERVICE LOCK
          =============================================== */

          if (offer.serviceId) {
            parsed.data.serviceIds = [
              offer.serviceId.toString(),
            ];
          }
        }

        /* =================================================
           VERIFY SERVICES
        ================================================= */

        const validServices =
          await Service.find({
            _id: {
              $in: parsed.data.serviceIds,
            },
            published: true,
          })
            .select("_id title")
            .session(session)
            .lean();

        if (
          validServices.length !==
          parsed.data.serviceIds.length
        ) {
          throw new Error(
            "INVALID_SERVICE_SELECTION",
          );
        }

        serviceNames =
          validServices.map(
            (service) =>
              service.title,
          );

        /* =================================================
           ATOMIC REQUEST COUNTER
        ================================================= */

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
              setDefaultsOnInsert:
                true,
              session,
            },
          );

        if (!counter) {
          throw new Error(
            "REQUEST_COUNTER_FAILED",
          );
        }
        

        const requestId =
          `ADS-${counter.sequence}`;

        /* =================================================
           CREATE REQUEST
        ================================================= */

        const offerData =
          offer
            ? {
                offerId: offer._id,
                offerSlug:
                  offer.slug,
                offerTitle:
                  offer.title,
                offerCouponCode:
                  offer.couponCode,
                offerDiscountLabel:
                  offer.discountLabel,
                offerOriginalPrice:
                  offer.originalPrice,
                offerPrice:
                  offer.offerPrice,
                offerClaimedAt:
                  now,
              }
            : {};

        const requestDocs =
          await ProjectRequest.create(
            [
              {
                requestId,

                /* CLIENT */

                fullName:
                  parsed.data.fullName,

                companyName:
                  parsed.data
                    .companyName ||
                  undefined,

                email:
                  parsed.data.email
                    .trim()
                    .toLowerCase(),

                phone:
                  parsed.data.phone,

                location:
                  parsed.data.location,

                currentWebsite:
                  parsed.data
                    .currentWebsite ||
                  undefined,

                preferredContactMethod:
                  parsed.data
                    .preferredContactMethod,

                /* PROJECT */

                serviceIds:
                  parsed.data
                    .serviceIds,

                projectType:
                  parsed.data
                    .projectType,

                projectDescription:
                  parsed.data
                    .projectDescription,

                requiredPages:
                  parsed.data
                    .requiredPages,

                requiredFeatures:
                  parsed.data
                    .requiredFeatures,

                timeline:
                  parsed.data.timeline,

                budgetRange:
                  parsed.data
                    .budgetRange,

                /* OFFER */

                ...offerData,

                /* SOURCE */

                leadSource:
                  offer
                    ? "OFFER"
                    : "WEBSITE",

                /* CONSENT */

                privacyConsent:
                  parsed.data
                    .privacyConsent,

                /* CRM */

                status: "NEW",
              },
            ],
            {
              session,
            },
          );
          

       const createdRequest =
  requestDocs[0] as unknown as IProjectRequest;

if (!createdRequest) {
  throw new Error(
    "PROJECT_REQUEST_CREATE_FAILED",
  );
}

return {
  createdRequest,
  serviceNames,
};
      },
    );

    const createdRequest =
  transactionResult.createdRequest;

serviceNames =
  transactionResult.serviceNames;

    /* =====================================================
       SESSION END
    ===================================================== */

    if (session) {
      await session.endSession();
      session = null;
    }

  

    /* =====================================================
       ADMIN EMAIL
    ===================================================== */

    console.log(
      "PROJECT_REQUEST_EMAIL_ATTEMPT:",
      {
        requestId:
          createdRequest.requestId,
        from: EMAIL_FROM,
        to: ADMIN_EMAIL,
      },
    );

    const {
      data: emailData,
      error: emailError,
    } =
      await resend.emails.send({
        from: EMAIL_FROM,
        to: [ADMIN_EMAIL],

        subject:
          createdRequest.leadSource ===
          "OFFER"
            ? `🎟️ Offer Claim — ${createdRequest.requestId}`
            : `🚀 New Project Request — ${createdRequest.requestId}`,

        html:
          projectRequestEmail({
            requestId:
              createdRequest.requestId,

            fullName:
              createdRequest.fullName,

            companyName:
              createdRequest.companyName,

            email:
              createdRequest.email,

            phone:
              createdRequest.phone,

            location:
              createdRequest.location,

            currentWebsite:
              createdRequest.currentWebsite,

            preferredContactMethod:
              createdRequest.preferredContactMethod,

            projectType:
              createdRequest.projectType,

            projectDescription:
              createdRequest.projectDescription,

            serviceNames,

            requiredPages:
              createdRequest.requiredPages,

            requiredFeatures:
              createdRequest.requiredFeatures,

            timeline:
              createdRequest.timeline,

            budgetRange:
              createdRequest.budgetRange,

            createdAt:
              createdRequest.createdAt,

            leadSource:
              createdRequest.leadSource,

            offerTitle:
              createdRequest.offerTitle,

            offerCouponCode:
              createdRequest.offerCouponCode,

            offerDiscountLabel:
              createdRequest.offerDiscountLabel,

            offerOriginalPrice:
              createdRequest
                .offerOriginalPrice,

            offerPrice:
              createdRequest.offerPrice,
          }),

        replyTo:
          createdRequest.email,

        tags: [
          {
            name: "event",
            value:
              createdRequest.leadSource ===
              "OFFER"
                ? "offer-claim-created"
                : "project-request-created",
          },
          {
            name: "request_id",
            value:
              createdRequest.requestId,
          },
          ...(createdRequest
            .offerSlug
            ? [
                {
                  name: "offer_slug",
                  value:
                    createdRequest
                      .offerSlug,
                },
              ]
            : []),
        ],
      });

    if (emailError) {
      console.error(
        "PROJECT_REQUEST_EMAIL_NOTIFICATION_FAILED:",
        {
          requestId:
            createdRequest.requestId,
          error: emailError,
        },
      );
    } else {
      console.log(
        "PROJECT_REQUEST_EMAIL_SENT_SUCCESSFULLY:",
        {
          requestId:
            createdRequest.requestId,
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
          createdRequest.requestId,

        offerClaimed:
          createdRequest.leadSource ===
          "OFFER",

        offerTitle:
          createdRequest.offerTitle ||
          null,

        offerPrice:
          createdRequest.offerPrice ??
          null,
      },
      {
        status: 201,
      },
    );
  } catch (error) {
    if (session) {
      await session.endSession();
    }

    console.error(
      "PROJECT REQUEST ERROR:",
      error,
    );

    const errorCode =
      error instanceof Error
        ? error.message
        : "";

    /* =====================================================
       OFFER-SPECIFIC ERRORS
    ===================================================== */

    if (
      errorCode ===
      "OFFER_NOT_FOUND"
    ) {
      return NextResponse.json(
        {
          success: false,
          code: "OFFER_NOT_FOUND",
          error:
            "This offer is no longer available.",
        },
        {
          status: 404,
        },
      );
    }

    if (
      errorCode ===
      "OFFER_NOT_STARTED"
    ) {
      return NextResponse.json(
        {
          success: false,
          code: "OFFER_NOT_STARTED",
          error:
            "This offer is not available yet.",
        },
        {
          status: 409,
        },
      );
    }

    if (
      errorCode ===
      "OFFER_EXPIRED"
    ) {
      return NextResponse.json(
        {
          success: false,
          code: "OFFER_EXPIRED",
          error:
            "This offer has expired.",
        },
        {
          status: 410,
        },
      );
    }

    if (
      errorCode ===
      "OFFER_FULLY_CLAIMED"
    ) {
      return NextResponse.json(
        {
          success: false,
          code: "OFFER_FULLY_CLAIMED",
          error:
            "All available offer slots have already been claimed.",
        },
        {
          status: 409,
        },
      );
    }

    if (
      errorCode ===
      "OFFER_ALREADY_CLAIMED"
    ) {
      return NextResponse.json(
        {
          success: false,
          code:
            "OFFER_ALREADY_CLAIMED",
          error:
            "This offer has already been claimed using this email address.",
        },
        {
          status: 409,
        },
      );
    }

    if (
      errorCode ===
      "INVALID_SERVICE_SELECTION"
    ) {
      return NextResponse.json(
        {
          success: false,
          code:
            "INVALID_SERVICE_SELECTION",
          error:
            "Please select a valid service.",
        },
        {
          status: 400,
        },
      );
    }

    /* =====================================================
       GENERIC ERROR
    ===================================================== */

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