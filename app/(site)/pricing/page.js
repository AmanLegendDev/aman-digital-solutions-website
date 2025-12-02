export const metadata = {
  title: "Pricing | Aman Digital Solutions",
  description: "Affordable QR menu system for restaurants & cafés.",
};

export default function PricingPage() {
  return (
    <section className="max-w-4xl mx-auto px-6 py-20 fade-in text-center">
      <h1 className="text-4xl font-bold text-black">Pricing</h1>
      <p className="text-neutral-600 mt-2">
        One-time setup fee + monthly maintenance for smooth operations.
      </p>

      <div className="bg-white shadow-lg p-10 rounded-2xl mt-16 border border-neutral-200">
        <h2 className="text-3xl font-semibold text-green-600">₹5000</h2>
        <p className="text-neutral-700 mt-1">One-time Setup Fee</p>

        <h2 className="text-2xl font-semibold mt-6">₹999 / Month</h2>
        <p className="text-neutral-700 mt-1">Maintenance</p>
<p>Restaurants</p>
        <ul className="mt-6 space-y-2 text-neutral-700 text-left max-w-sm mx-auto">
          <li>✔ Hosting</li>
          <li>✔ Database management</li>
          <li>✔ Unlimited menu edits</li>
          <li>✔ Technical support</li>
          <li>✔ Updates & monitoring</li>
        </ul>

        <a
          href="/contact"
          className="inline-block mt-8 bg-green-500 text-white px-6 py-3 rounded-lg hover:bg-green-600 transition"
        >
          Get Started
        </a>
      </div>
    </section>
  );
}

