export const metadata = {
  title: "Features | Aman Digital Solutions",
  description: "Explore all features of our QR Digital Menu System.",
};

export default function FeaturesPage() {
  return (
    <section className="max-w-7xl mx-auto px-6 py-20 fade-in">
      <h1 className="text-4xl font-bold text-black text-center">
        All Powerful Features
      </h1>

      <p className="text-neutral-600 text-center mt-3 max-w-2xl mx-auto">
        Everything your restaurant needs to manage menu, orders, and customer experience — with zero hassle.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
        {features.map((f, i) => (
          <div
            key={i}
            className="bg-white shadow-md p-6 rounded-xl hover:shadow-lg transition"
          >
            <h3 className="text-xl font-semibold text-green-600">{f.title}</h3>
            <p className="text-neutral-700 mt-2">{f.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

const features = [
  {
    title: "Real-Time Menu Updates",
    desc: "Update menu items instantly from your dashboard.",
  },
  {
    title: "Admin Dashboard",
    desc: "Full control over items, prices, categories, and orders.",
  },
  {
    title: "Order Placement System",
    desc: "Customers can order directly from the table through QR.",
  },
  {
    title: "Cloud Image Upload",
    desc: "All food images stored securely using Cloudinary.",
  },
  {
    title: "Unlimited Categories",
    desc: "Add as many categories as you need — no limits.",
  },
  {
    title: "Blazing Fast Next.js",
    desc: "Super-fast loading times with Next.js 14.",
  },
];

