import Image from "next/image";

export const metadata = {
  title: "Demo | Aman Digital Solutions",
  description: "Try live demos for customer and admin view.",
};

export default function DemoPage() {
  return (
    <section className="max-w-6xl mx-auto px-6 py-20 fade-in">
      <h1 className="text-4xl font-bold text-black text-center">Live Demo</h1>
      <p className="text-neutral-600 text-center mt-3">
        Experience how customers and admins interact with the QR menu.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mt-16">
        {/* Customer Demo */}
        <div className="bg-white shadow-md p-6 rounded-xl">
          <h2 className="text-2xl font-semibold text-green-600">Customer Demo</h2>
          <p className="text-neutral-600 mt-2">
            Scan the QR or click the link to see the customer view.
          </p>

          <div className="flex justify-center mt-6">
            <Image
              src="/qrcode.jpeg"
              width={150}
              height={150}
              alt="Customer QR"
              className="rounded-lg shadow"
            />
          </div>

          <a
            href="https://digital-menu-system-dun.vercel.app/menu/"
            className="block mt-6 bg-green-500 text-white px-5 py-3 rounded-lg text-center hover:bg-green-600 transition"
          >
            Open Customer Demo
          </a>
        </div>

        {/* Admin Demo */}
        <div className="bg-white shadow-md p-6 rounded-xl">
          <h2 className="text-2xl font-semibold text-green-600">Admin Demo</h2>
          <p className="text-neutral-600 mt-2">
            Access the admin dashboard using the demo login.
          </p>

          <ul className="mt-4 text-neutral-700">
            <li>📌 Email: admin@gmail.com</li>
            <li>📌 Password: 123456</li>
          </ul>

          <a
            href="https://digital-menu-system-dun.vercel.app/"
            className="block mt-6 bg-black text-white px-5 py-3 rounded-lg text-center hover:bg-neutral-800 transition"
          >
            Open Admin Dashboard
          </a>
        </div>
      </div>
    </section>
  );
}

