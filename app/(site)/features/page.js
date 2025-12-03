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
    title: "Instant Menu Updates",
    desc: "Update prices, items, availability, and categories in real-time without page refresh.",
  },
  {
    title: "Smart Admin Dashboard",
    desc: "Full control of menu, images, pricing, categories, orders, and customer activity.",
  },
  {
    title: "QR-Based Ordering",
    desc: "Guests can scan, view items, add quantity, place orders, and add special notes.",
  },
  {
    title: "Cloud Image Storage",
    desc: "All images are optimized and stored securely on Cloudinary for fast loading.",
  },
  {
    title: "Unlimited Categories",
    desc: "Support for any number of categories — Breakfast, Drinks, Starters, Room Service & more.",
  },
  {
    title: "Lightning Fast Performance",
    desc: "Next.js 14 ensures instant loading with edge caching & optimized builds.",
  },
  {
    title: "Role-Based Access",
    desc: "Create staff accounts with limited permissions for safer hotel/restaurant operations.",
  },
  {
    title: "Table & Room Tracking",
    desc: "Track every order with table/room number for smooth operations.",
  },
  {
    title: "Secure Admin Access",
    desc: "Encrypted login, hashed passwords, and secure sessions using NextAuth.",
  },
  {
    title: "Multi-Menu Support (Hotels)",
    desc: "Separate menus for Breakfast, Lunch, Dinner, and Room Service with independent control.",
  },
  {
    title: "Responsive UI",
    desc: "Perfect experience on phones, tablets, desktops, and POS screens.",
  },
];
