export const metadata = {
  title: "About | Aman Digital Solutions",
  description: "Learn about the mission behind Aman Digital Solutions.",
};

export default function AboutPage() {
  return (
    <section className="max-w-4xl mx-auto px-6 py-20 fade-in">
      <h1 className="text-4xl font-bold text-black mb-4">About Us</h1>

      <p className="text-neutral-700 leading-relaxed text-lg">
        Aman Digital Solutions is a modern tech company from Shimla, focused on
        building fast and reliable digital tools for local businesses.
        <br /><br />
        As a young developer, I focus on clean UI, speed, and real-world
        performance. Our QR Digital Menu System helps restaurants deliver a
        premium customer experience while simplifying their operations.
      </p>

      <div className="mt-6 bg-green-50 border border-green-200 p-4 rounded-lg">
        <p className="text-green-700 font-semibold">
          Govt Registered UDYAM No: UDYAM-HP-09-0033862
        </p>
      </div>
    </section>
  );
}

