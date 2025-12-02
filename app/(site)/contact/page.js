export const metadata = {
  title: "Contact | Aman Digital Solutions",
  description: "Contact us for demos, pricing, and business queries.",
};

export default function ContactPage() {
  return (
    <section className="max-w-3xl mx-auto px-6 py-20 fade-in">
      <h1 className="text-4xl font-bold text-black mb-6">Contact Us</h1>

      <form className="grid grid-cols-1 gap-6">

        <input type="text" placeholder="Full Name" className="contactInput" />
        <input type="text" placeholder="Business Name" className="contactInput" />
        <input type="text" placeholder="Phone Number" className="contactInput" />
        <input type="text" placeholder="Location" className="contactInput" />

        <textarea placeholder="Message" className="contactInput h-32"></textarea>

        <button className="bg-green-500 text-white px-6 py-3 rounded-lg hover:bg-green-600 transition">
          Submit
        </button>
        <p className="text-red-500">Temporarily Unavailable</p>
      </form>

      <div className="mt-12">
        <h2 className="text-xl font-semibold mb-3">Contact Directly</h2>
        <p className="text-neutral-700">Email: amanansaricodes@gmail.com</p>

        <a
          href="https://wa.me/8219174058"
          className="inline-block mt-4 bg-green-500 text-white px-5 py-3 rounded-lg hover:bg-green-600 transition"
        >
          WhatsApp Us
        </a>
      </div>
    </section>
  );
}

