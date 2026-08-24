import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";

import { authOptions } from "@/lib/auth/auth";
import { connectDB } from "@/lib/db/connect";
import SiteSettings from "@/models/SiteSettings";

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

    const settings =
      await SiteSettings.findOne()
        .lean();

    return NextResponse.json({
      success: true,
      settings,
    });
  } catch (error) {
    console.error(
      "GET_SITE_SETTINGS_ERROR:",
      error
    );

    return NextResponse.json(
      {
        success: false,
        error:
          "Unable to load site settings.",
      },
      { status: 500 }
    );
  }
}