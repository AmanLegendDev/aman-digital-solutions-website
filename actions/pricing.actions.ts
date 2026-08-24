"use server";

import { getServerSession } from "next-auth";
import { revalidatePath } from "next/cache";

import { authOptions } from "@/lib/auth/auth";
import { connectDB } from "@/lib/db/connect";
import PricingPlan from "@/models/PricingPlan";
import Service from "@/models/Service";
import {
  pricingSchema,
  type PricingInput,
} from "@/schemas/pricing.schema";

export async function createPricingPlan(
  values: PricingInput
) {
  try {
    const session = await getServerSession(authOptions);

    if (
      !session?.user ||
      session.user.role !== "admin"
    ) {
      return {
        success: false as const,
        error: "Unauthorized.",
      };
    }

    const parsed = pricingSchema.safeParse(values);

    if (!parsed.success) {
      return {
        success: false as const,
        error: "Please check the pricing form.",
      };
    }

    const data = parsed.data;

    await connectDB();

    const existingPlan = await PricingPlan.findOne({
      slug: data.slug,
    })
      .select("_id")
      .lean();

    if (existingPlan) {
      return {
        success: false as const,
        error: "A pricing plan with this slug already exists.",
      };
    }

    let serviceId:
      | string
      | undefined;

    if (data.serviceId) {
      const service = await Service.findById(
        data.serviceId
      )
        .select("_id")
        .lean();

      if (!service) {
        return {
          success: false as const,
          error: "Selected service was not found.",
        };
      }

      serviceId = data.serviceId;
    }

    if (
      (data.pricingType === "FIXED" ||
        data.pricingType === "STARTING_FROM") &&
      data.price === undefined
    ) {
      return {
        success: false as const,
        error: "Price is required for this pricing type.",
      };
    }

    const pricingPlan = await PricingPlan.create({
      name: data.name,
      slug: data.slug,
      shortDescription: data.shortDescription,

      price: data.price,

      currency: data.currency,
      pricePrefix: data.pricePrefix ?? "",
      priceSuffix:
        data.billingPeriod === "NONE"
          ? ""
          : data.priceSuffix ?? "",

      pricingType: data.pricingType,
      billingPeriod: data.billingPeriod,

      features: data.features,

      serviceId,

      ctaText: data.ctaText,
      ctaLink: data.ctaLink,

      isFeatured: data.isFeatured,
      featuredLabel: data.isFeatured
        ? data.featuredLabel ?? ""
        : "",

      isPublished: data.isPublished,
      displayOrder: data.displayOrder,
    });

    revalidatePath("/pricing");
    revalidatePath("/");

    return {
      success: true as const,
     
        pricingPlanId: String(pricingPlan._id),
    };
  } catch (error) {
    console.error(
      "CREATE_PRICING_PLAN_ERROR:",
      error
    );

    return {
      success: false as const,
      error:
        "Unable to create pricing plan. Please try again.",
    };
  }
}