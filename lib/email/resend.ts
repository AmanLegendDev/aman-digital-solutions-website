import { Resend } from "resend";

const apiKey = process.env.RESEND_API_KEY;

if (!apiKey) {
  throw new Error("RESEND_API_KEY is not configured.");
}

export const resend = new Resend(apiKey);

export const EMAIL_FROM =
  process.env.EMAIL_FROM ||
  "Aman Digital Solutions <onboarding@resend.dev>";

export const ADMIN_EMAIL =
  process.env.ADMIN_EMAIL ||
  "hello@amandigitalsolutions.com";