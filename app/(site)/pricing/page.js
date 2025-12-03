"use client";

import Link from "next/link";


  export default function Pricing() {
  const plans = [
    {
      title: "Restaurants",
      setup: "₹5000",
      monthly: "₹999 / Month",
      tag: "Maintenance",
      features: [
        "Fast & secure hosting",
        "Managed database",
        "Unlimited menu updates",
        "Smart analytics dashboard",
        "Standard technical support",
        "Daily health monitoring",
      ],
      note: "Perfect for cafés & restaurants with a single menu.",
      buttonColor: "bg-green-600 hover:bg-green-700",
    },

    {
      title: "Hotels",
      setup: "₹8000",
      monthly: "₹1499 / Month",
      tag: "Maintenance",
      features: [
        "Hosting + Dedicated database",
        "Unlimited menu edits across all departments",
        "High-priority technical support",
        "Multi-menu system (Breakfast • Lunch • Dinner • Room Service)",
        "Advanced order & load monitoring",
        "1-day staff onboarding & training",
        "Dedicated WhatsApp support (10AM–10PM)",
      ],
      note: "Built for hotels with multiple menus, higher staff usage & critical uptime needs.",
      buttonColor: "bg-blue-600 hover:bg-blue-700",
    },

    {
      title: "Full Ownership",
      setup: "₹24,999",
      monthly: "One-time Payment",
      tag: "Lifetime Access",
      features: [
        "Lifetime hosting (no renewal)",
        "Full source code (you own everything)",
        "Advanced admin dashboard",
        "3 months priority updates",
        "White-label branding with your logo + name",
        "24/7 premium support for first 90 days",
      ],
      note: "Best for brands who want complete control with zero monthly fees.",
      buttonColor: "bg-yellow-500 hover:bg-yellow-600 text-black",
    },
  ];




  return (
    <div className="min-h-screen px-4 py-10 md:px-10">
      <h1 className="text-3xl md:text-4xl font-bold text-black text-center">
        Pricing Plans
      </h1>

      <p className="text-gray-500 text-center mt-2 text-sm md:text-base">
        Choose the plan that fits your business
      </p>

      <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {plans.map((plan, index) => (
          <div
            key={index}
            className="bg-white rounded-3xl shadow-lg py-10 px-8 flex flex-col justify-between"
          >
            <div>
              <h2 className="text-xl font-semibold text-center">{plan.title}</h2>

              <p className="text-green-600 text-4xl font-bold text-center mt-4">
                {plan.setup}
              </p>

              <p className="text-gray-500 text-center mt-1">
                One-time Setup Fee
              </p>

              <p className="text-gray-800 text-center mt-6 text-xl font-semibold opacity-80">
                {plan.monthly}
              </p>

              <p className="text-gray-500 text-center mb-4">{plan.tag}</p>

              <ul className="space-y-3 mt-4">
                {plan.features.map((feature, idx) => (
                  <li key={idx} className="flex items-center gap-2 text-gray-700">
                    <span className="text-green-600 font-bold">✔</span>
                    {feature}
                  </li>
                ))}
              </ul>
            </div>

            <Link href="/contact">
            <button
              className={`${plan.buttonColor} text-white font-semibold w-full py-3 rounded-xl mt-8`}
            >
              Get Started
            </button></Link>
          </div>
        ))}
      </div>
    </div>
  );
}
