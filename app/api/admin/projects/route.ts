import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { Types } from "mongoose";
import { revalidatePath } from "next/cache";

import { authOptions } from "@/lib/auth/auth";
import { connectDB } from "@/lib/db/connect";

import Project from "@/models/Project";
import Service from "@/models/Service";

import { projectSchema } from "@/schemas/project.schema";

/* =========================================================
   ADMIN AUTH
========================================================= */

async function requireAdmin() {
  const session = await getServerSession(authOptions);

if (!session?.user || session.user.role !== "admin") {
  return null;
}

  return session;
}

/* =========================================================
   GET PROJECTS
   /api/admin/projects
========================================================= */

export async function GET(request: NextRequest) {
  try {
    const session = await requireAdmin();

    if (!session) {
      return NextResponse.json(
        {
          success: false,
          error: "Unauthorized.",
        },
        { status: 401 },
      );
    }

    await connectDB();

    const { searchParams } = new URL(request.url);

    const search = searchParams.get("search")?.trim() || "";
    const published = searchParams.get("published");
    const featured = searchParams.get("featured");

    const page = Math.max(
      Number(searchParams.get("page")) || 1,
      1,
    );

    const limit = Math.min(
      Math.max(
        Number(searchParams.get("limit")) || 20,
        1,
      ),
      100,
    );

    const skip = (page - 1) * limit;

    /* -----------------------------------------------------
       FILTER
    ----------------------------------------------------- */

    const filter: Record<string, unknown> = {};

    if (search) {
      filter.$or = [
        {
          title: {
            $regex: search,
            $options: "i",
          },
        },
        {
          slug: {
            $regex: search,
            $options: "i",
          },
        },
        {
          client: {
            $regex: search,
            $options: "i",
          },
        },
        {
          industry: {
            $regex: search,
            $options: "i",
          },
        },
      ];
    }

    if (published === "true") {
      filter.published = true;
    }

    if (published === "false") {
      filter.published = false;
    }

    if (featured === "true") {
      filter.featured = true;
    }

    if (featured === "false") {
      filter.featured = false;
    }

    /* -----------------------------------------------------
       QUERY
    ----------------------------------------------------- */

    const [projects, total] = await Promise.all([
      Project.find(filter)
        .populate({
          path: "services",
          select: "_id title slug",
        })
        .sort({
          displayOrder: 1,
          createdAt: -1,
        })
        .skip(skip)
        .limit(limit)
        .lean(),

      Project.countDocuments(filter),
    ]);

    return NextResponse.json({
      success: true,
      projects,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.error("GET_PROJECTS_ERROR:", error);

    return NextResponse.json(
      {
        success: false,
        error: "Unable to load projects.",
      },
      { status: 500 },
    );
  }
}

/* =========================================================
   CREATE PROJECT
   POST /api/admin/projects
========================================================= */

export async function POST(request: NextRequest) {
  try {
    /* -----------------------------------------------------
       AUTHENTICATION
    ----------------------------------------------------- */

    const session = await requireAdmin();

    if (!session) {
      return NextResponse.json(
        {
          success: false,
          error: "Unauthorized.",
        },
        { status: 401 },
      );
    }

    /* -----------------------------------------------------
       JSON BODY
    ----------------------------------------------------- */

    let body: unknown;

    try {
      body = await request.json();
    } catch {
      return NextResponse.json(
        {
          success: false,
          error: "Invalid JSON request body.",
        },
        { status: 400 },
      );
    }

    /* -----------------------------------------------------
       VALIDATION
    ----------------------------------------------------- */

    const parsed = projectSchema.safeParse(body);

    if (!parsed.success) {
      const fieldErrors: Record<string, string[]> = {};

      parsed.error.issues.forEach((issue) => {
        const field = issue.path.join(".") || "form";

        if (!fieldErrors[field]) {
          fieldErrors[field] = [];
        }

        fieldErrors[field].push(issue.message);
      });

      return NextResponse.json(
        {
          success: false,
          error: "Please fix the highlighted fields.",
          fieldErrors,
        },
        { status: 422 },
      );
    }

    const values = parsed.data;

    /* -----------------------------------------------------
       DATABASE
    ----------------------------------------------------- */

    await connectDB();

    /* -----------------------------------------------------
       SLUG DUPLICATE CHECK
    ----------------------------------------------------- */

    const existingProject = await Project.findOne({
      slug: values.slug,
    })
      .select("_id")
      .lean();

    if (existingProject) {
      return NextResponse.json(
        {
          success: false,
          error: "A project with this slug already exists.",
          fieldErrors: {
            slug: ["This slug is already in use."],
          },
        },
        { status: 409 },
      );
    }

    /* -----------------------------------------------------
       SERVICE VALIDATION
    ----------------------------------------------------- */

    const serviceIds = values.services ?? [];

    if (serviceIds.length > 0) {
      const validObjectIds = serviceIds.every((id) =>
        Types.ObjectId.isValid(id),
      );

      if (!validObjectIds) {
        return NextResponse.json(
          {
            success: false,
            error: "One or more selected services are invalid.",
          },
          { status: 400 },
        );
      }

      const existingServices =
        await Service.countDocuments({
          _id: {
            $in: serviceIds,
          },
        });

      if (existingServices !== serviceIds.length) {
        return NextResponse.json(
          {
            success: false,
            error:
              "One or more selected services no longer exist.",
          },
          { status: 400 },
        );
      }
    }

    /* -----------------------------------------------------
       CREATE
    ----------------------------------------------------- */

    const project = await Project.create({
      ...values,

      services: serviceIds.map(
        (id) => new Types.ObjectId(id),
      ),
    });

    /* -----------------------------------------------------
       REVALIDATION
    ----------------------------------------------------- */

    revalidatePath("/admin/projects");
    revalidatePath("/projects");

    if (project.slug) {
      revalidatePath(`/projects/${project.slug}`);
    }

    /* -----------------------------------------------------
       RESPONSE
    ----------------------------------------------------- */

    return NextResponse.json(
      {
        success: true,
        message: "Project created successfully.",
        project: {
          _id: String(project._id),
          title: project.title,
          slug: project.slug,
        },
      },
      { status: 201 },
    );
  } catch (error: unknown) {
    console.error("CREATE_PROJECT_ERROR:", error);

    /* -----------------------------------------------------
       MONGOOSE DUPLICATE KEY
    ----------------------------------------------------- */

    if (
      typeof error === "object" &&
      error !== null &&
      "code" in error &&
      (error as { code?: number }).code === 11000
    ) {
      return NextResponse.json(
        {
          success: false,
          error: "A project with this slug already exists.",
          fieldErrors: {
            slug: ["This slug is already in use."],
          },
        },
        { status: 409 },
      );
    }

    return NextResponse.json(
      {
        success: false,
        error:
          "Unable to create project. Please try again.",
      },
      { status: 500 },
    );
  }
}