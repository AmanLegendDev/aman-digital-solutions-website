export default function Home() {
  return (
    <div className="fade-in">

      {/* -------------------------------------- 
          HERO SECTION 
      --------------------------------------- */}
      <section className="max-w-7xl mx-auto px-6 py-20 grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
        
        {/* Left Side Text */}
        <div>
          <h1 className="text-4xl md:text-5xl font-bold leading-tight text-black">
            Modern QR Digital Menu for
            <span className="text-green-500"> Hotels & Restaurants</span>
          </h1>

          <p className="text-neutral-600 mt-4 text-lg">
            Fast, clean and easy-to-use QR menu system built for local businesses
            in Himachal Pradesh. Update items, manage orders, and deliver a premium
            customer experience.
          </p>  

          {/* UDYAM Registration Badge */}
          <div className="mt-4 flex items-center gap-2 bg-green-50 border border-green-200 px-4 py-2 rounded-lg w-fit">
            <span className="text-green-600 text-sm font-semibold">
              ✔ Govt Registered (UDYAM-HP-09-0033862)
            </span>
          </div>

          {/* CTA Buttons */}
          <div className="mt-6 flex gap-4">
            <a
              href="/demo"
              className="bg-green-500 text-white px-5 py-3 rounded-lg font-medium hover:bg-green-600 transition"
            >
              View Live Demo
            </a>
            <a
              href="/pricing"
              className="border border-green-500 text-green-600 px-5 py-3 rounded-lg font-medium hover:bg-green-50 transition"
            >
              Get Pricing
            </a>
          </div>
        </div>

        {/* Right Side Mockup */}
        <div className="flex justify-center">
          <img
            src="/menu.png"
            alt="Digital Menu Mockup"
            className="w-[260px] md:w-[320px] drop-shadow-2xl rounded-2xl"
          />
        </div>
      </section>

      {/* -------------------------------------- 
          WHY CHOOSE US 
      --------------------------------------- */}
      <section className="max-w-7xl mx-auto px-6 mt-20 text-center">
        <h2 className="text-3xl font-bold text-black">Why Choose Us?</h2>
        <p className="text-neutral-600 mt-2 max-w-2xl mx-auto">
          We provide a complete digital solution designed specifically for Himachal
          restaurants, hotels, and cafes.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
          <div className="bg-white shadow-md p-6 rounded-xl">
            <h3 className="text-xl font-semibold text-green-600 mb-2">Fast Updates</h3>
            <p className="text-neutral-600">Edit menu items instantly with zero downtime.</p>
          </div>

          <div className="bg-white shadow-md p-6 rounded-xl">
            <h3 className="text-xl font-semibold text-green-600 mb-2">Clean UI</h3>
            <p className="text-neutral-600">Premium user experience for every customer.</p>
          </div>

          <div className="bg-white shadow-md p-6 rounded-xl">
            <h3 className="text-xl font-semibold text-green-600 mb-2">Local Support</h3>
            <p className="text-neutral-600">Get instant help anywhere in Shimla & nearby cities.</p>
          </div>
        </div>
      </section>

      {/* -------------------------------------- 
          FEATURES PREVIEW 
      --------------------------------------- */}
      <section className="max-w-7xl mx-auto px-6 mt-24">
        <h2 className="text-3xl font-bold text-black text-center">
          Powerful Features
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
          <FeatureCard title="Real-Time Updates" desc="Update menu anytime, instantly." />
          <FeatureCard title="Admin Dashboard" desc="Full control over items & orders." />
          <FeatureCard title="Cloud Image Upload" desc="Fast & secure Cloudinary system." />
        </div>
      </section>

      {/* -------------------------------------- 
          QR SAMPLE 
      --------------------------------------- */}
      <section className="max-w-7xl mx-auto px-6 mt-24 text-center">
        <h2 className="text-3xl font-bold text-black">Try It Yourself</h2>
        <p className="text-neutral-600 mt-2">Scan the QR code to explore the menu.</p>

        <div className="flex justify-center mt-8">
          <img
            src="/qrcode.jpeg"
            alt="QR Code"
            className="w-40 h-40 shadow-lg rounded-xl"
          />
        </div>
      </section>

      {/* -------------------------------------- 
          TRUST BADGES 
      --------------------------------------- */}
      {/* <section className="max-w-7xl mx-auto px-6 mt-24 text-center pb-20">
        <h3 className="text-xl text-neutral-600">Trusted by Restaurants in Shimla</h3>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-6 opacity-80">
          <div>🍽️ Apple View</div>
          <div>🏨 Hotel Hilltop</div>
          <div>☕ Café Central</div>
          <div>🌲 Mall Road Kitchens</div>
        </div>
      </section> */}
    </div>
  );
}

/* -------------------------------------- 
  FeatureCard Component (inline)
--------------------------------------- */
function FeatureCard({ title, desc }) {
  return (
    <div className="bg-white shadow-md p-6 rounded-xl">
      <h3 className="text-xl font-semibold text-green-600 mb-2">{title}</h3>
      <p className="text-neutral-600">{desc}</p>
    </div>
  );
}
