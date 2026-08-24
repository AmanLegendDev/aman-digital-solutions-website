"use server";

import { getServerSession } from "next-auth";
import { revalidatePath } from "next/cache";

import { authOptions } from "@/lib/auth/auth";
import { connectDB } from "@/lib/db/connect";

import SiteSettings from "@/models/SiteSettings";

import {
  siteSettingsSchema,
  type SiteSettingsInput,
} from "@/schemas/site-settings.schema";

export async function saveSiteSettings(
  input: SiteSettingsInput
) {
  const session =
    await getServerSession(authOptions);

  if (
    !session?.user ||
    session.user.role !== "admin"
  ) {
    return {
      success: false,
      error: "Unauthorized",
    };
  }

  const parsed =
    siteSettingsSchema.safeParse(input);

  if (!parsed.success) {
    return {
      success: false,
      error:
        "Please fix the validation errors.",
      fieldErrors:
        parsed.error.flatten().fieldErrors,
    };
  }

  try {
    await connectDB();

    const settings =
      await SiteSettings.findOneAndUpdate(
        {},
        parsed.data,
        {
          new: true,
          upsert: true,
          setDefaultsOnInsert: true,
        }
      );

    revalidatePath("/");
    revalidatePath("/admin");

   return {
  success: true,
  settingsId: String(settings._id),
};
  } catch (error) {
    console.error(
      "SAVE_SITE_SETTINGS_ERROR:",
      error
    );

    return {
      success: false,
      error:
        "Unable to save site settings.",
    };
  }
}