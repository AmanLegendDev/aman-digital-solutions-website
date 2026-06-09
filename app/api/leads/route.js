import { NextResponse } from "next/server";
import connectDB from "../../lib/connectDB";
import Inquiry from "@/models/Inquiry";

export async function GET() {
  try {
    await connectDB();

    const leads = await Inquiry.find()
      .sort({ createdAt: -1 });

    return NextResponse.json({
      success: true,
      leads,
    });

  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch leads",
      },
      { status: 500 }
    );
  }
}