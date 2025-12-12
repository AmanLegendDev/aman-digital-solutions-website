import Image from "next/image";
import ScannerLaser from "@/components/ScannerLaser";

export const metadata = {
  title: "Demo | Aman Digital Solutions",
  description: "Try live demos for customer and admin view.",
};

export default function DemoPage() {
  return (
    <section className="max-w-6xl mx-auto px-6 py-20 fade-in">
      <h1 className="text-4xl font-bold text-center">Live Demo</h1>
      <p className="text-neutral-400 text-center mt-3">
        Experience how customers and admins interact with the digital QR menu.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mt-16">

        {/* CUSTOMER DEMO */}
        <div className="bg-[#0d0d0d] border border-neutral-800 rounded-2xl p-8 shadow-xl">
          <h2 className="text-2xl font-semibold text-yellow-300 text-center">Customer View</h2>
          <p className="text-neutral-400 text-center mt-2">
            Scan using your phone camera or open demo directly.
          </p>

          {/* QR WITH LASER */}
          <div className="relative w-64 h-64 mx-auto mt-8 bg-black rounded-xl p-3 shadow-lg">
            <Image
              src="/qr.png"
              alt="Customer QR"
              width={300}
              height={300}
              className="w-full h-full object-cover rounded-lg"
            />
            <ScannerLaser />
          </div>

          <a
            href="https://onebite-menu.vercel.app/menu/"
            target="_blank"
            className="block mt-8 bg-yellow-400 text-black px-5 py-3 rounded-xl text-center font-semibold hover:bg-yellow-300 transition"
          >
            Open Customer Demo
          </a>
        </div>

        {/* ADMIN DEMO */}
        <div className="bg-[#0d0d0d] border border-neutral-800 rounded-2xl p-8 shadow-xl">
          <h2 className="text-2xl font-semibold text-yellow-300 text-center">Admin View</h2>
          <p className="text-neutral-400 text-center mt-2">
            Explore how admins manage menu, orders, and categories.
          </p>

          <div className="mt-6 text-neutral-300 text-center">
            <p>📧 <span className="font-semibold">Email:</span> onebite@admin.com</p>
            <p>🔑 <span className="font-semibold">Password:</span> onebiteadmin123</p>
          </div>

          <a
            href="https://digital-menu-system-dun.vercel.app/"
            target="_blank"
            className="block mt-8 bg-white text-black px-5 py-3 rounded-xl text-center font-semibold hover:bg-neutral-200 transition"
          >
            Open Admin Dashboard
          </a>
        </div>

      </div>
    </section>
  );
}
