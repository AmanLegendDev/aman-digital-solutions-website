import { NextResponse } from "next/server";
import connectDB from "../../lib/connectDB";
import Inquiry from "@/models/Inquiry";

export async function POST(req) {
  try {
    await connectDB();

    const body = await req.json();

    const {
      name,
      businessName,
      phone,
      email,
      businessType,
      budget,
      requirement,
      message,
    } = body;

    await Inquiry.create({
      name,
      businessName,
      phone,
      email,
      businessType,
      budget,
      requirement,
      message,
    });

    return NextResponse.json({
      success: true,
    });

  } catch (error) {
    console.log(error);

    return NextResponse.json(
      {
        success: false,
        message: error.message,
      },
      {
        status: 500,
      }
    );
  }
}