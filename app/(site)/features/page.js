// app/features/page.js
import SectionReveal from "@/components/SectionReveal";
import TiltCard from "@/components/TiltCard";

const featuresList = [
  { title: "Instant Menu Updates", desc: "Update all items & prices in real-time—no reload." },
  { title: "Smart Admin Dashboard", desc: "Full CRUD for categories, items, staff and coupons." },
  { title: "Table-wise QR System", desc: "Generate QR for each table & track orders separately." },
  { title: "Cloudinary Images", desc: "Fast image delivery and optimization." },
  { title: "Order Analytics", desc: "See which items sell best, daily revenue & load time." },
  { title: "Roles & Permissions", desc: "Create staff accounts with limited access." },
];

export default function FeaturesPage() {
  return (
    <main className="max-w-7xl mx-auto px-6 py-20">
      <h1 className="text-4xl font-bold text-center">All Powerful Features</h1>
      <p className="text-neutral-400 text-center mt-3 max-w-2xl mx-auto">Everything your restaurant needs to manage menus and customer experience.</p>

      <div className="grid md:grid-cols-3 gap-6 mt-12">
        {featuresList.map((f, i) => (
          <SectionReveal key={i} delay={i * 0.06}>
            <TiltCard title={f.title} desc={f.desc} emoji={["⚡","🧭","📋","🖼️","📈","🔒"][i]} />
          </SectionReveal>
        ))}
      </div>
    </main>
  );
}
