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
        "Hosting",
        "Database management",
        "Unlimited menu edits",
        "Technical support",
        "Updates & monitoring",
      ],
      buttonColor: "bg-green-600 hover:bg-green-700",
    },
    {
      title: "Hotels",
      setup: "₹8000",
      monthly: "₹1499 / Month",
      tag: "Maintenance",
      features: [
        "Hosting + Database",
        "Unlimited menu edits",
        "Priority technical support",
        "Multi-menu support (Breakfast, Lunch, Dinner)",
        "Advanced order monitoring",
        "Staff training (free 1-day session)",
        "Dedicated WhatsApp support",
      ],
      buttonColor: "bg-blue-600 hover:bg-blue-700",
    },
    {
      title: "Full Ownership",
      setup: "₹24,999",
      monthly: "One-time Payment",
      tag: "Lifetime Access",
      features: [
        "Lifetime hosting",
        "Full source code ownership",
        "Admin dashboard",
        "Unlimited edits forever",
        "Priority updates for 1 year",
        "White-label branding with your logo",
        "24/7 support for first 3 months",
      ],
      buttonColor: "bg-yellow-500 hover:bg-yellow-600 text-black",
    },
  ];

  return (
    <div className="min-h-screen bg-black px-4 py-10 md:px-10">
      <h1 className="text-3xl md:text-4xl font-bold text-white text-center">
        Pricing Plans
      </h1>

      <p className="text-gray-300 text-center mt-2 text-sm md:text-base">
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
