import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";

import { authOptions } from "@/lib/auth/auth";
import { connectDB } from "@/lib/db/connect";

import Service from "@/models/Service";

import PricingCreateForm from "@/components/admin/pricing/PricingCreateForm";

export default async function NewPricingPage() {
  const session =
    await getServerSession(authOptions);

  /* =========================================================
     AUTH
  ========================================================= */

  if (
    !session?.user ||
    session.user.role !== "admin"
  ) {
    redirect("/login");
  }

  /* =========================================================
     DATABASE
  ========================================================= */

  await connectDB();

  /* =========================================================
     SERVICES
     
     Admin should be able to connect a pricing plan
     to any existing service, including unpublished ones.
  ========================================================= */

  const services = await Service.find({})
    .select("_id title")
    .sort({
      displayOrder: 1,
      title: 1,
    })
    .lean();

  /* =========================================================
     SERIALIZE
  ========================================================= */

  const serviceOptions = services.map(
    (service) => ({
      _id: String(service._id),
      title: service.title,
    }),
  );

  /* =========================================================
     UI
  ========================================================= */

  return (
    <main className="min-h-screen bg-[#050505] px-4 py-8 text-[#F5F5F5] sm:px-6 lg:px-8">
      <div className="mx-auto max-w-5xl">

        {/* =================================================
            HEADER
        ================================================= */}

        <div className="mb-8">
          <p className="text-xs font-medium uppercase tracking-[0.2em] text-[#FFC400]">
            Pricing CMS
          </p>

          <h1 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">
            Create pricing plan
          </h1>

          <p className="mt-3 max-w-2xl text-sm leading-6 text-[#A1A1A1]">
            Create a pricing plan that can be displayed
            across the Aman Digital Solutions website.
          </p>
        </div>

        {/* =================================================
            FORM
        ================================================= */}

        <PricingCreateForm
          services={serviceOptions}
        />
      </div>
    </main>
  );
}