import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";

import { authOptions } from "@/lib/auth/auth";
import { connectDB } from "@/lib/db/connect";
import Project from "@/models/Project";

export async function GET() {
  try {
    const session =
      await getServerSession(authOptions);

    if (
      !session?.user ||
      session.user.role !== "admin"
    ) {
      return NextResponse.json(
        {
          success: false,
          error: "Unauthorized",
        },
        { status: 401 }
      );
    }

    await connectDB();

    const projects = await Project.find({
      published: true,
    })
      .select("_id title")
      .sort({
        displayOrder: 1,
        createdAt: -1,
      })
      .lean();

    return NextResponse.json({
      success: true,
      projects,
    });
  } catch (error) {
    console.error(
      "PROJECT_OPTIONS_ERROR:",
      error
    );

    return NextResponse.json(
      {
        success: false,
        error:
          "Unable to load projects.",
      },
      { status: 500 }
    );
  }
}