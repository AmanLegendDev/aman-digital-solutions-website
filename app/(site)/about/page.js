export const metadata = {
  title: "About | Aman Digital Solutions",
  description:
    "Aman Digital Solutions helps restaurants and hotels modernize their operations with fast, secure and clean digital solutions.",
};

export default function AboutPage() {
  return (
    <section className="max-w-4xl mx-auto px-6 py-20 fade-in">
      <h1 className="text-4xl font-bold text-black mb-4">About Us</h1>

      <p className="text-neutral-700 leading-relaxed text-lg">
        Aman Digital Solutions is a modern tech company based in Shimla,
        dedicated to building fast, secure and clean digital tools for
        restaurants, cafés and hotels.
        <br />
        <br />
        We focus on solving real-world business problems — slow service,
        outdated menus, printing costs, staff miscommunication and overall
        customer experience. Our QR Digital Menu System is designed to remove
        these problems and help businesses operate more smoothly.
        <br />
        <br />
        As a young developer, I strongly believe in clarity, simplicity and
        performance. Every product we build is created with long-term quality in
        mind — clean UI, smart code, and extremely fast loading.
      </p>

      {/* Vision Box */}
      <div className="mt-10 bg-green-50 border border-green-200 p-6 rounded-xl">
        <h2 className="text-green-700 font-bold mb-2 text-xl">
          Our Mission
        </h2>
        <p className="text-green-800">
          To bring modern, affordable and high-quality digital tools to every
          local business in Himachal.  
          Helping small and medium businesses grow with technology — without
          complexity or high costs.
        </p>
      </div>

      {/* Values */}
      <div className="mt-10">
        <h2 className="text-2xl font-bold text-black mb-3">Our Values</h2>
        <ul className="list-disc pl-6 text-neutral-700 space-y-2 text-lg">
          <li>Clean, simple and user-friendly designs</li>
          <li>Reliable performance and smart engineering</li>
          <li>Transparent pricing — no hidden charges</li>
          <li>Fast customer support and real help on time</li>
          <li>Long-term relationships with businesses</li>
        </ul>
      </div>

      {/* Registration */}
      <div className="mt-10 bg-green-50 border border-green-200 p-4 rounded-lg">
        <p className="text-green-700 font-semibold">
          Govt Registered UDYAM No: UDYAM-HP-09-0033862
        </p>
      </div>
    </section>
  );
}
