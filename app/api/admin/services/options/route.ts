import { NextResponse } from "next/server";

import { connectDB } from "@/lib/db/connect";
import Service from "@/models/Service";

export async function GET() {
  try {
    await connectDB();

    const services = await Service.find({
      published: true,
    })
      .select("_id title")
      .sort({
        displayOrder: 1,
        title: 1,
      })
      .lean();

    return NextResponse.json(
      {
        success: true,
        services: services.map((service) => ({
          _id: service._id.toString(),
          title: service.title,
        })),
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    console.error(
      "[GET /api/admin/services/options]",
      error
    );

    return NextResponse.json(
      {
        success: false,
        error: "Unable to load services.",
      },
      {
        status: 500,
      }
    );
  }
}