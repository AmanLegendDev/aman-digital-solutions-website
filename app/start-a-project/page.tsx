import type { Metadata } from "next";

import { connectDB } from "@/lib/db/connect";
import Service from "@/models/Service";

import StartProjectClient from "@/components/start-project/StartProjectClient";

export const metadata: Metadata = {
  title:
    "Start a Project | Aman Digital Solutions",

  description:
    "Tell Aman Digital Solutions about your project and get a clear next step for your website, business system or digital solution.",

  alternates: {
    canonical:
      "https://www.amandigitalsolutions.in/start-a-project",
  },
};

export default async function StartProjectPage() {
  await connectDB();

  const services =
    await Service.find({})
      .select("_id title shortDescription")
      .sort({
        displayOrder: 1,
        title: 1,
      })
      .lean();

  const serviceOptions =
    services.map((service) => ({
      _id: String(service._id),
      title: service.title,
      shortDescription:
        service.shortDescription,
    }));

  return (
    <StartProjectClient
      services={serviceOptions}
    />
  );
}