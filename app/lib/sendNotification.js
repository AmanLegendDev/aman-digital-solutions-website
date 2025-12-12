// lib/sendNotification.js
import clientPromise from "./mongodb";
import { createTwilioClient } from "./twilioClient";

export async function saveContactToDB(payload) {
  const client = await clientPromise;
  const db = client.db();
  const col = db.collection("contacts");
  payload.createdAt = new Date();
  const res = await col.insertOne(payload);
  return res;
}

export async function notifyWhatsAppContact(payload) {
  const tw = createTwilioClient();
  if (!tw) return { ok: false, reason: "No Twilio configured" };

  const from = process.env.TWILIO_WHATSAPP_FROM;
  const to = process.env.ADMIN_WHATSAPP_TO; // ensure 'whatsapp:+91...' format
  const body = `New Contact Form:
Name: ${payload.name}
Business: ${payload.business || "-"}
Phone: ${payload.phone || "-"}
Message: ${payload.message || "-"}
Link: ${payload.link || "-"}`;

  const msg = await tw.messages.create({ from, to, body });
  return { ok: true, sid: msg.sid };
}
