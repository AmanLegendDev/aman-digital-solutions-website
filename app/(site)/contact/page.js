// app/contact/page.js
import ContactForm from "@/components/ContactForm";

export default function ContactPage() {
  return (
    <main className="max-w-3xl mx-auto px-6 py-20">
      <h1 className="text-4xl font-bold mb-6">Contact Us</h1>
      <p className="text-neutral-400 mb-6">Share your requirements — I’ll reply on WhatsApp or email</p>

      <ContactForm />

      <div className="mt-12">
        <h2 className="text-xl font-semibold">Direct Contact</h2>
        <p className="text-neutral-300 mt-2">Email: amanansaricodes@gmail.com</p>
        <a href="https://wa.me/918219174058" className="inline-block mt-4 bg-yellow-400 text-black px-5 py-3 rounded-lg">WhatsApp: +91 82191 74058</a>
      </div>
    </main>
  );
}
