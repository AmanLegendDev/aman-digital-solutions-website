"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Phone, Mail, MapPin } from "lucide-react";

export default function ContactSection() {
const router = useRouter();

const [loading, setLoading] = useState(false);

const [formData, setFormData] = useState({
name: "",
businessName: "",
phone: "",
email: "",
businessType: "",
budget: "",
requirement: "",
message: "",
});

const handleChange = (e) => {
setFormData((prev) => ({
...prev,
[e.target.name]: e.target.value,
}));
};

const handleSubmit = async (e) => {
e.preventDefault();

try {
  setLoading(true);

  const res = await fetch("/api/contact", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
  });

  const data = await res.json();

  if (data.success) {
    router.push("/success");
  } else {
    alert(data.message);
  }
} catch (error) {
  console.log(error);
  alert("Something went wrong");
} finally {
  setLoading(false);
}


};

return ( <section
   id="contact"
   className="py-12 md:py-16 bg-[#0A0A0A]"
 > <div className="max-w-7xl mx-auto px-6">


    <div className="grid lg:grid-cols-2 gap-10">

      {/* LEFT */}

      <div>

        <div className="inline-flex px-4 py-2 rounded-full border border-yellow-500/20 bg-yellow-500/5 text-yellow-400 text-sm mb-6">
          Contact Us
        </div>

        <h2 className="text-4xl md:text-5xl font-bold text-white">
          Let's Discuss Your
          <span className="block text-yellow-400">
            Next Project
          </span>
        </h2>

        <p className="text-neutral-400 mt-6 leading-relaxed">
          Whether you need a business website,
          QR ordering system or a custom solution,
          let's build something valuable together.
        </p>

        <div className="space-y-5 mt-10">

          <div className="flex items-center gap-4">
            <Phone className="text-yellow-400" />
            <span className="text-neutral-300">
              +91 8219174058
            </span>
          </div>

          <div className="flex items-center gap-4">
            <Mail className="text-yellow-400" />
            <span className="text-neutral-300">
              contact@amanansaricodes@gmail.com
            </span>
          </div>

          <div className="flex items-center gap-4">
            <MapPin className="text-yellow-400" />
            <span className="text-neutral-300">
              Dhalli, Shimla, Himachal Pradesh
            </span>
          </div>

        </div>

      </div>

      {/* FORM */}

      <form
        onSubmit={handleSubmit}
        className="rounded-[32px] border border-white/10 bg-[#111111] p-8"
      >

        <div className="grid md:grid-cols-2 gap-4">

          <input
            name="name"
            placeholder="Full Name *"
            required
            value={formData.name}
            onChange={handleChange}
            className="contactInput"
          />

          <input
            name="businessName"
            placeholder="Business Name *"
            required
            value={formData.businessName}
            onChange={handleChange}
            className="contactInput"
          />

          <input
            name="phone"
            placeholder="Phone Number *"
            required
            value={formData.phone}
            onChange={handleChange}
            className="contactInput"
          />

          <input
            name="email"
            placeholder="Email Address"
            value={formData.email}
            onChange={handleChange}
            className="contactInput"
          />

          <select
            name="businessType"
            value={formData.businessType}
            onChange={handleChange}
            className="contactInput"
          >
    <option value="">
  Select Service
</option>

<option>Business Website</option>
<option>Bakery Website</option>
<option>Jewellery Website</option>
<option>Hotel / Homestay Website</option>
<option>Restaurant QR Ordering System</option>
<option>Digital Visiting Card</option>
<option>Admin Dashboard</option>
<option>CRM & Lead Management</option>
<option>Google Business Profile Setup</option>
<option>Website Maintenance</option>
<option>Custom Solution</option>
<option>Not Sure Yet - Need Guidance</option>

          </select>

          <select
            name="budget"
            value={formData.budget}
            onChange={handleChange}
            className="contactInput"
          >
            <option value="">
  Budget Range
</option>

<option>Under ₹5,000</option>
<option>₹5,000 - ₹10,000</option>
<option>₹10,000 - ₹25,000</option>
<option>₹25,000 - ₹50,000</option>
<option>₹50,000+</option>
<option>Let's Discuss</option>

          </select>

        </div>

        <input
          name="requirement"
          placeholder="Requirement *"
          required
          value={formData.requirement}
          onChange={handleChange}
          className="contactInput mt-4"
        />

        <textarea
          rows={5}
          name="message"
          placeholder="Tell us about your project..."
          value={formData.message}
          onChange={handleChange}
          className="contactInput mt-4 resize-none"
        />

        <button
          type="submit"
          disabled={loading}
          className="mt-6 w-full bg-yellow-400 text-black font-semibold py-4 rounded-xl hover:opacity-90 transition"
        >
          {loading
            ? "Submitting..."
            : "Send Inquiry"}
        </button>

      </form>

    </div>

  </div>
</section>


);
}
