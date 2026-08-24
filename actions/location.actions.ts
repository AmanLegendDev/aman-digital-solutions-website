"use server";

import { getServerSession } from "next-auth";
import { revalidatePath } from "next/cache";
import { Types } from "mongoose";

import { authOptions } from "@/lib/auth/auth";
import { connectDB } from "@/lib/db/connect";

import Location from "@/models/Location";
import Service from "@/models/Service";

import {
  locationSchema,
  type CreateLocationInput,
} from "@/schemas/location.schema";

type CreateLocationResult =
  | {
      success: true;
      locationId: string;
    }
  | {
      success: false;
      error: string;
      fieldErrors?: Record<string, string[]>;
    };

export async function createLocation(
  input: CreateLocationInput
): Promise<CreateLocationResult> {
  const session = await getServerSession(authOptions);

  if (
    !session?.user ||
    session.user.role !== "admin"
  ) {
    return {
      success: false,
      error: "Unauthorized",
    };
  }

  const parsed = locationSchema.safeParse(input);

  if (!parsed.success) {
    return {
      success: false,
      error: "Please fix the validation errors.",
      fieldErrors:
        parsed.error.flatten().fieldErrors,
    };
  }

  try {
    await connectDB();

    const existingLocation =
      await Location.findOne({
        slug: parsed.data.slug,
      })
        .select("_id")
        .lean();

    if (existingLocation) {
      return {
        success: false,
        error:
          "A location with this slug already exists.",
        fieldErrors: {
          slug: ["This slug is already in use."],
        },
      };
    }

    const serviceIds = parsed.data.services;

    if (serviceIds.length > 0) {
      const validIds = serviceIds.every(
        (id) => Types.ObjectId.isValid(id)
      );

      if (!validIds) {
        return {
          success: false,
          error:
            "One or more selected services are invalid.",
        };
      }

      const existingServices =
        await Service.countDocuments({
          _id: {
            $in: serviceIds,
          },
        });

      if (
        existingServices !== serviceIds.length
      ) {
        return {
          success: false,
          error:
            "One or more selected services no longer exist.",
        };
      }
    }

    const location = await Location.create({
      ...parsed.data,

      services: serviceIds.map(
        (id) => new Types.ObjectId(id)
      ),
    });

    revalidatePath("/admin/locations");

   return {
  success: true,
  locationId: String(location._id),
};
  } catch (error) {
    console.error(
      "CREATE_LOCATION_ERROR:",
      error
    );

    return {
      success: false,
      error:
        "Unable to create location. Please try again.",
    };
  }
}