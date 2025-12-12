"use client";
import { useState } from "react";
import AnimatedButton from "./AnimatedButton";

export default function ContactForm() {
  const [form, setForm] = useState({ name: "", business: "", phone: "", location: "", message: "" });
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState(null);

  async function submit(e) {
    e.preventDefault();
    setLoading(true);
    setStatus(null);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, source: "website-contact" }),
      });
      const data = await res.json();
      if (res.ok) {
        setStatus({ ok: true, text: "Thanks! We got your message. We'll reach out on WhatsApp." });
        setForm({ name: "", business: "", phone: "", location: "", message: "" });
      } else {
        setStatus({ ok: false, text: data.error || "Error submitting form." });
      }
    } catch (e) {
      setStatus({ ok: false, text: "Network error." });
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={submit} className="grid gap-4">
      <input value={form.name} required onChange={(e)=>setForm({...form,name:e.target.value})} placeholder="Full Name" className="contactInput" />
      <input value={form.business} onChange={(e)=>setForm({...form,business:e.target.value})} placeholder="Business Name" className="contactInput" />
      <input value={form.phone} required onChange={(e)=>setForm({...form,phone:e.target.value})} placeholder="Phone (+91...)" className="contactInput" />
      <input value={form.location} onChange={(e)=>setForm({...form,location:e.target.value})} placeholder="Location (Shimla / Dhalli...)" className="contactInput" />
      <textarea value={form.message} onChange={(e)=>setForm({...form,message:e.target.value})} placeholder="Message / Requirements" className="contactInput h-32"></textarea>

      <AnimatedButton className={`py-3 rounded-lg ${loading ? "bg-neutral-700" : "bg-yellow-400 text-black"}`} type="submit" disabled={loading}>
        {loading ? "Sending..." : "Send via WhatsApp"}
      </AnimatedButton>

      {status && <p className={`${status.ok ? "text-green-400" : "text-red-400"} mt-2`}>{status.text}</p>}
    </form>
  );
}
