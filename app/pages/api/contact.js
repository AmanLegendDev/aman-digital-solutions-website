// pages/api/contact.js
import { saveContactToDB, notifyWhatsAppContact } from "../../lib/sendNotification";

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).end("Method Not Allowed");

  try {
    const { name, business, phone, location, message, source } = req.body ?? {};

    if (!name || !phone) {
      return res.status(400).json({ error: "Name and Phone are required." });
    }

    const payload = { name, business, phone, location, message, source };

    // Save to MongoDB
    await saveContactToDB(payload);

    // Try notify via Twilio if configured (optional)
    let notifyRes = { ok: false };
    try {
      notifyRes = await notifyWhatsAppContact(payload);
    } catch (e) {
      // ignore notification errors, still return success
      console.error("Notify error:", e.message);
    }

    return res.status(200).json({ ok: true, notify: notifyRes });
  } catch (e) {
    console.error(e);
    return res.status(500).json({ error: "Internal server error" });
  }
}
