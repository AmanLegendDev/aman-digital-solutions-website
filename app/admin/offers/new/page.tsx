import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";

import { authOptions } from "@/lib/auth/auth";

import OfferCreateForm from "./OfferCreateForm";

export const metadata = {
  title: "Add Offer | Admin",
};

export default async function AddOfferPage() {
  const session =
    await getServerSession(authOptions);

  if (
    !session?.user ||
    session.user.role !== "admin"
  ) {
    redirect("/admin/login");
  }

  return (
    <main className="min-h-screen bg-[#050505] text-white">
      <div className="mx-auto w-full max-w-6xl px-5 py-10 sm:px-8 lg:px-10">
        <div className="mb-8">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#FFC400]">
            Offer Management
          </p>

          <h1 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">
            Add Offer
          </h1>

          <p className="mt-3 max-w-2xl text-sm leading-6 text-white/45">
            Create a reusable promotional offer with
            pricing, visuals, scheduling, publishing
            and SEO controls.
          </p>
        </div>

        <OfferCreateForm />
      </div>
    </main>
  );
}