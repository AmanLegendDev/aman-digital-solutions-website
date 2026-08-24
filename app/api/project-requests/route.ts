import { NextResponse } from "next/server";

import { connectDB } from "@/lib/db/connect";
import ProjectRequest from "@/models/ProjectRequest";

import {
  projectRequestSchema,
} from "@/schemas/projectRequest.schema";

/* =========================================================
   REQUEST ID
========================================================= */

function generateRequestId() {
  const timestamp =
    Date.now().toString(36).toUpperCase();

  const random =
    Math.random()
      .toString(36)
      .substring(2, 7)
      .toUpperCase();

  return `ADS-${timestamp}-${random}`;
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

    let requestId =
      generateRequestId();

    /* Avoid theoretical collision */
    while (
      await ProjectRequest.exists({
        requestId,
      })
    ) {
      requestId =
        generateRequestId();
    }

    /* =====================================================
       SAVE
    ===================================================== */

    const projectRequest =
      await ProjectRequest.create({
        requestId,

        /* Client */
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
          parsed.data
            .preferredContactMethod,

        /* Project */
        serviceIds:
          parsed.data.serviceIds,

        projectType:
          parsed.data.projectType,

        projectDescription:
          parsed.data
            .projectDescription,

        requiredPages:
          parsed.data.requiredPages,

        requiredFeatures:
          parsed.data
            .requiredFeatures,

        timeline:
          parsed.data.timeline,

        budgetRange:
          parsed.data.budgetRange,

        /* Consent */
        privacyConsent:
          parsed.data.privacyConsent,

        /* Admin */
        status: "NEW",
      });

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