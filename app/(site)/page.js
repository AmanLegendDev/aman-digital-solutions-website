export default function Home() {
  return (
    <div className="fade-in">

      {/* ---------------------------------------------------
          HERO SECTION  (Premium SaaS Quality)
      ----------------------------------------------------- */}
      <section className="max-w-7xl mx-auto px-6 py-20 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">

        {/* LEFT CONTENT */}
        <div>
          <h1 className="text-4xl md:text-5xl font-bold leading-tight text-black">
            Transform Your Business with a
            <span className="text-green-500"> Modern QR Digital Menu</span>
          </h1>

          <p className="text-neutral-700 mt-4 text-lg">
            A powerful and clean QR menu system built for restaurants, cafés and hotels. 
            Fast, reliable, and built with real Himachal businesses in mind.
          </p>

          {/* TRUST BADGE */}
          <div className="mt-4 flex items-center gap-2 bg-green-50 border border-green-200 px-4 py-2 rounded-lg w-fit">
            <span className="text-green-600 text-sm font-semibold">
              ✔ Govt Registered: UDYAM-HP-09-0033862
            </span>
          </div>

          {/* CTA BUTTONS */}
          <div className="mt-6 flex gap-4">
            <a
              href="/demo"
              className="bg-green-500 text-white px-6 py-3 rounded-lg font-medium hover:bg-green-600 transition shadow-md"
            >
              View Live Demo
            </a>
            <a
              href="/pricing"
              className="border border-green-500 text-green-600 px-6 py-3 rounded-lg font-medium hover:bg-green-50 transition"
            >
              View Pricing
            </a>
          </div>
        </div>

        {/* RIGHT MOCKUP */}
        <div className="flex justify-center">
          <img
            src="/menu-3.png"
            alt="Digital Menu Mockup"
            className="w-[270px] md:w-[330px] rounded-3xl"
          />
        </div>
      </section>

      {/* ---------------------------------------------------
          WHY CHOOSE US (Upgraded Cards)
      ----------------------------------------------------- */}
      <section className="max-w-7xl mx-auto px-6 mt-2 text-center">
        <h2 className="text-3xl font-bold text-black">Why Choose Us?</h2>
        <p className="text-neutral-700 mt-2 max-w-2xl mx-auto">
          Designed for local restaurants & hotels — focused on speed, simplicity, and 
          premium customer experience.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
          <WhyCard 
            title="Instant Updates" 
            desc="Edit prices, items and availability in seconds — no waiting." 
          />
          <WhyCard 
            title="Beautiful Interface" 
            desc="Clean, premium UI that gives customers a smooth experience." 
          />
          <WhyCard 
            title="Local Support" 
            desc="On-ground help available in Shimla, Dhalli & nearby areas." 
          />
        </div>
      </section>

      {/* ---------------------------------------------------
          FEATURE PREVIEW (Upgraded)
      ----------------------------------------------------- */}
      <section className="max-w-7xl mx-auto px-6 mt-24">
        <h2 className="text-3xl font-bold text-black text-center">
          Powerful Features Built for Real Work
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
          <FeatureCard title="Real-Time Menu Editing" desc="Update items, categories & photos instantly." />
          <FeatureCard title="Advanced Admin Panel" desc="Control everything from one dashboard." />
          <FeatureCard title="Secure Cloud Storage" desc="High-quality images stored on Cloudinary." />
        </div>
      </section>

      {/* ---------------------------------------------------
          QR SAMPLE
      ----------------------------------------------------- */}
      <section className="max-w-7xl mx-auto px-6 mt-24 text-center">
        <h2 className="text-3xl font-bold text-black">Try the Experience</h2>
        <p className="text-neutral-700 mt-2">Scan this QR code to try the menu yourself.</p>

        <div className="flex justify-center mt-8">
          <img
            src="/qrcode.jpeg"
            alt="QR Code"
            className="w-40 h-40 shadow-xl rounded-xl"
          />
        </div>
      </section>

      {/* ---------------------------------------------------
          TRUST SECTION (Optional: uncomment later)
      ----------------------------------------------------- */}
      {/* 
      <section className="max-w-7xl mx-auto px-6 mt-24 text-center pb-20">
        <h3 className="text-xl text-neutral-600">Trusted by businesses in Shimla</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-6 opacity-80">
          <div>🍽️ Apple View</div>
          <div>🏨 Hotel Hilltop</div>
          <div>☕ Café Central</div>
          <div>🌲 Mall Road Kitchens</div>
        </div>
      </section>
      */}
    </div>
  );
}

/* ----------------------------------------
   Reusable Components
----------------------------------------- */

function WhyCard({ title, desc }) {
  return (
    <div className="bg-white shadow-md p-6 rounded-xl border border-neutral-100 hover:shadow-lg transition">
      <h3 className="text-xl font-semibold text-green-600 mb-2">{title}</h3>
      <p className="text-neutral-700">{desc}</p>
    </div>
  );
}

function FeatureCard({ title, desc }) {
  return (
    <div className="bg-white p-6 shadow-md rounded-xl border border-neutral-100 hover:shadow-lg transition">
      <h3 className="text-xl font-semibold text-green-600 mb-2">{title}</h3>
      <p className="text-neutral-700">{desc}</p>
    </div>
  );
}
