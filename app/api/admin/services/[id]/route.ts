import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import mongoose from "mongoose";

import { authOptions } from "@/lib/auth/auth";
import { connectDB } from "@/lib/db/connect";
import Service from "@/models/Service";

import {
  serviceSchema,
} from "@/schemas/service.schema";

/* =========================================================
   TYPES
========================================================= */

type RouteContext = {
  params: Promise<{
    id: string;
  }>;
};

/* =========================================================
   PATCH SERVICE
========================================================= */

export async function PATCH(
  request: NextRequest,
  { params }: RouteContext,
) {
  try {
    /* =====================================================
       AUTHENTICATION
    ===================================================== */

    const session =
      await getServerSession(authOptions);

     

    if (
  !session?.user ||
  session.user.role !== "admin"
) {
      return NextResponse.json(
        {
          success: false,
          error: "Unauthorized.",
        },
        {
          status: 401,
        },
      );
    }

    /* =====================================================
       PARAMS
    ===================================================== */

    const { id } = await params;

    if (
      !mongoose.Types.ObjectId.isValid(id)
    ) {
      return NextResponse.json(
        {
          success: false,
          error: "Invalid service ID.",
        },
        {
          status: 400,
        },
      );
    }

    /* =====================================================
       BODY
    ===================================================== */

    let body: unknown;

    try {
      body = await request.json();
    } catch {
      return NextResponse.json(
        {
          success: false,
          error: "Invalid JSON request body.",
        },
        {
          status: 400,
        },
      );
    }

    /* =====================================================
       VALIDATE
    ===================================================== */

    const parsed =
      serviceSchema.safeParse(body);

    if (!parsed.success) {
      const fieldErrors: Record<
        string,
        string[]
      > = {};

      parsed.error.issues.forEach(
        (issue) => {
          const field =
            issue.path.join(".") ||
            "form";

          if (!fieldErrors[field]) {
            fieldErrors[field] = [];
          }

          fieldErrors[field].push(
            issue.message,
          );
        },
      );

      return NextResponse.json(
        {
          success: false,
          error:
            "Please fix the highlighted fields.",
          fieldErrors,
        },
        {
          status: 422,
        },
      );
    }

    const values = parsed.data;

    /* =====================================================
       DATABASE
    ===================================================== */

    await connectDB();

    /* =====================================================
       FIND SERVICE
    ===================================================== */

    const existingService =
      await Service.findById(id);

    if (!existingService) {
      return NextResponse.json(
        {
          success: false,
          error: "Service not found.",
        },
        {
          status: 404,
        },
      );
    }

    /* =====================================================
       SLUG DUPLICATE CHECK
    ===================================================== */

    const duplicate =
      await Service.findOne({
        slug: values.slug,
        _id: {
          $ne: id,
        },
      }).select("_id");

    if (duplicate) {
      return NextResponse.json(
        {
          success: false,
          error:
            "A service with this slug already exists.",
          fieldErrors: {
            slug: [
              "This slug is already in use.",
            ],
          },
        },
        {
          status: 409,
        },
      );
    }

    /* =====================================================
       UPDATE
    ===================================================== */

    existingService.title =
      values.title;

    existingService.slug =
      values.slug;

    existingService.heroEyebrow =
      values.heroEyebrow || undefined;

    existingService.shortDescription =
      values.shortDescription;

    existingService.description =
      values.description;

    existingService.category =
      values.category;

    existingService.icon =
      values.icon || undefined;

    existingService.image =
      values.image
        ? {
            url: values.image.url,
            publicId:
              values.image.publicId ||
              undefined,
            alt:
              values.image.alt ||
              undefined,
          }
        : undefined;

    /* =====================================================
       CONTENT
    ===================================================== */

    existingService.benefits =
      values.benefits.map(
        (benefit) => ({
          title: benefit.title,
          description:
            benefit.description,
          icon:
            benefit.icon || undefined,
        }),
      );

    existingService.features =
      values.features.map(
        (feature) => ({
          title: feature.title,
          description:
            feature.description,
          icon:
            feature.icon || undefined,
        }),
      );

    existingService.process =
      values.process
        .map((step) => ({
          order: step.order,
          title: step.title,
          description:
            step.description,
        }))
        .sort(
          (a, b) =>
            a.order - b.order,
        );

    /* =====================================================
       RELATIONS
    ===================================================== */

    existingService.faqIds =
      values.faqIds.map(
        (id) =>
          new mongoose.Types.ObjectId(id),
      );

    existingService.projectIds =
      values.projectIds.map(
        (id) =>
          new mongoose.Types.ObjectId(id),
      );

    /* =====================================================
       POSITIONING
    ===================================================== */

    existingService.keywords =
      values.keywords;

    /* =====================================================
       PRICING
    ===================================================== */

    existingService.startingPrice =
      values.startingPrice;

    existingService.priceLabel =
      values.priceLabel ||
      undefined;

    /* =====================================================
       CTA
    ===================================================== */

    existingService.ctaLabel =
      values.ctaLabel ||
      undefined;

    existingService.ctaLink =
      values.ctaLink ||
      undefined;

    /* =====================================================
       PUBLISHING
    ===================================================== */

    existingService.featured =
      values.featured;

    existingService.published =
      values.published;

    existingService.displayOrder =
      values.displayOrder;

    /* =====================================================
       SEO
    ===================================================== */

    existingService.seoTitle =
      values.seoTitle ||
      undefined;

    existingService.seoDescription =
      values.seoDescription ||
      undefined;

    existingService.canonicalUrl =
      values.canonicalUrl ||
      undefined;

    existingService.ogTitle =
      values.ogTitle ||
      undefined;

    existingService.ogDescription =
      values.ogDescription ||
      undefined;

    existingService.ogImage =
      values.ogImage
        ? {
            url: values.ogImage.url,
            publicId:
              values.ogImage.publicId ||
              undefined,
            alt:
              values.ogImage.alt ||
              undefined,
          }
        : undefined;

    /* =====================================================
       SAVE
    ===================================================== */

    await existingService.save();

    /* =====================================================
       RESPONSE
    ===================================================== */

    return NextResponse.json(
      {
        success: true,

        message:
          "Service updated successfully.",

        service: {
          _id: String(
            existingService._id,
          ),

          title:
            existingService.title,

          slug:
            existingService.slug,
        },
      },
      {
        status: 200,
      },
    );
  } catch (error) {
    console.error(
      "ADMIN_SERVICE_UPDATE_ERROR",
      error,
    );

    /* =====================================================
       MONGOOSE DUPLICATE KEY
    ===================================================== */

    if (
      error &&
      typeof error === "object" &&
      "code" in error &&
      error.code === 11000
    ) {
      return NextResponse.json(
        {
          success: false,
          error:
            "A service with this slug already exists.",
          fieldErrors: {
            slug: [
              "This slug is already in use.",
            ],
          },
        },
        {
          status: 409,
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
          "Something went wrong while updating the service.",
      },
      {
        status: 500,
      },
    );
  }
}