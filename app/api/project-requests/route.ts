import { NextResponse } from "next/server";

import { connectDB } from "@/lib/db/connect";
import ProjectRequest from "@/models/ProjectRequest";
import Counter from "@/models/Counter";

import {
  projectRequestSchema,
} from "@/schemas/projectRequest.schema";

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
          parsed.data
            .preferredContactMethod,

        /* =================================================
           PROJECT
        ================================================= */

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