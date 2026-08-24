import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import mongoose from "mongoose";

import { authOptions } from "@/lib/auth/auth";
import { connectDB } from "@/lib/db/connect";

import Project from "@/models/Project";
import { projectSchema } from "@/schemas/project.schema";

type RouteContext = {
  params: Promise<{
    id: string;
  }>;
};

/* =========================================================
   PATCH — UPDATE PROJECT
========================================================= */

export async function PATCH(
  request: Request,
  { params }: RouteContext,
) {
  try {
    /* =====================================================
       AUTHENTICATION
    ===================================================== */

    const session =
      await getServerSession(authOptions);

    console.log(
      "===== ADMIN PROJECT PATCH =====",
    );

    console.log(
      "USER:",
      session?.user,
    );

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
          error: "Invalid project ID.",
        },
        {
          status: 400,
        },
      );
    }

    /* =====================================================
       REQUEST BODY
    ===================================================== */

    const body =
      await request.json();

    /* =====================================================
       VALIDATION
    ===================================================== */

    const parsed =
      projectSchema.safeParse(body);

    if (!parsed.success) {
      console.error(
        "PROJECT VALIDATION ERROR:",
        parsed.error.flatten(),
      );

      return NextResponse.json(
        {
          success: false,
          error:
            "Please check the project fields.",
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
       EXISTING PROJECT
    ===================================================== */

    const project =
      await Project.findById(id);

    if (!project) {
      return NextResponse.json(
        {
          success: false,
          error: "Project not found.",
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
      await Project.findOne({
        slug: parsed.data.slug,
        _id: {
          $ne: id,
        },
      });

    if (duplicate) {
      return NextResponse.json(
        {
          success: false,
          error:
            "Another project already uses this slug.",
        },
        {
          status: 409,
        },
      );
    }

    /* =====================================================
       UPDATE
    ===================================================== */

    Object.assign(
      project,
      parsed.data,
    );

    await project.save();

    console.log(
      "PROJECT UPDATED:",
      String(project._id),
    );

    /* =====================================================
       RESPONSE
    ===================================================== */

    return NextResponse.json(
      {
        success: true,
        message:
          "Project updated successfully.",
        project: {
          _id: String(
            project._id,
          ),
        },
      },
      {
        status: 200,
      },
    );
  } catch (error) {
    console.error(
      "ADMIN_PROJECT_PATCH_ERROR:",
      error,
    );

    return NextResponse.json(
      {
        success: false,
        error:
          "Unable to update project.",
      },
      {
        status: 500,
      },
    );
  }
}

/* =========================================================
   DELETE — DELETE PROJECT
========================================================= */

export async function DELETE(
  _request: Request,
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
          error: "Invalid project ID.",
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

    const project =
      await Project.findById(id);

    if (!project) {
      return NextResponse.json(
        {
          success: false,
          error: "Project not found.",
        },
        {
          status: 404,
        },
      );
    }

    /* =====================================================
       DELETE
    ===================================================== */

    await project.deleteOne();

    return NextResponse.json(
      {
        success: true,
        message:
          "Project deleted successfully.",
      },
      {
        status: 200,
      },
    );
  } catch (error) {
    console.error(
      "ADMIN_PROJECT_DELETE_ERROR:",
      error,
    );

    return NextResponse.json(
      {
        success: false,
        error:
          "Unable to delete project.",
      },
      {
        status: 500,
      },
    );
  }
}