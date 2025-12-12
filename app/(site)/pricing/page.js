// app/pricing/page.js
import PricingCard from "@/components/PricingCard";

const plans = [
  {
    title: "Starter — Restaurants",
    tag: "Most Popular",
    price: "₹999 / month",
    setup: "Setup ₹4,999",
    features: [
      "Unlimited menu updates",
      "Table-wise QR",
      "Cloud image hosting",
      "Basic analytics",
      "Email support (9–6)",
      "1 outlet included",
    ],
    note: "Best for cafés and restaurants.",
    ctaClass: "bg-yellow-400 text-black",
  },
  {
    title: "Pro — Hotels",
    tag: "Recommended",
    price: "₹1,499 / month",
    setup: "Setup ₹7,999",
    features: [
      "Multi-menu support (Breakfast • Lunch • Dinner • Room Service)",
      "Priority WhatsApp support (10–10)",
      "Staff roles & access control",
      "Advanced analytics",
      "Unlimited categories",
      "On-site setup (Shimla region)",
    ],
    note: "Ideal for hotels and multi-department menus.",
    ctaClass: "bg-blue-600 text-white",
  },
  {
    title: "Business+ — Chains",
    tag: "Premium",
    price: "₹2,499 / month",
    setup: "Setup ₹14,999",
    features: [
      "Everything in PRO",
      "Multiple outlets",
      "Custom branding + white-label",
      "Dedicated account manager",
      "Daily performance reports",
      "Priority infrastructure",
    ],
    note: "For restaurant chains & premium hotels.",
    ctaClass: "bg-black text-white",
  },
];


export default function PricingPage() {
  return (
    <main className="max-w-6xl mx-auto px-6 py-20">
      <h1 className="text-4xl font-bold text-center">Pricing Plans</h1>
      <p className="text-neutral-400 text-center mt-2">Simple, transparent pricing for every size of business.</p>

      <div className="grid md:grid-cols-3 gap-6 mt-10">
        {plans.map((p, i) => (
          <PricingCard key={i} plan={p} highlight={p.tag === "Recommended"} />
        ))}
      </div>
    </main>
  );
}
