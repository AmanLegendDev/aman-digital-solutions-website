import { connectDB } from "@/lib/db/connect";
import SiteSettings from "@/models/SiteSettings";

export async function getSiteSettings() {
  await connectDB();

  const settings = await SiteSettings.findOne()
    .select("-__v")
    .lean();

  if (!settings) {
    return null;
  }

  return JSON.parse(JSON.stringify(settings));
}