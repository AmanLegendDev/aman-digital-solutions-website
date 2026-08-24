import { loadEnvConfig } from "@next/env";

loadEnvConfig(process.cwd());

import bcrypt from "bcryptjs";
import User from "../models/User";
import { connectDB } from "../lib/db/connect";

const ADMIN_NAME = process.env.ADMIN_NAME;
const ADMIN_EMAIL = process.env.ADMIN_EMAIL;
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD;

async function seedAdmin() {
  if (!ADMIN_NAME || !ADMIN_EMAIL || !ADMIN_PASSWORD) {
    throw new Error(
      "Missing ADMIN_NAME, ADMIN_EMAIL or ADMIN_PASSWORD in .env.local"
    );
  }

  if (ADMIN_PASSWORD.length < 8) {
    throw new Error("ADMIN_PASSWORD must be at least 8 characters long.");
  }

  await connectDB();

  const email = ADMIN_EMAIL.trim().toLowerCase();

  const existingAdmin = await User.findOne({ email });

  if (existingAdmin) {
    console.log(`Admin already exists: ${email}`);
    process.exit(0);
  }

  const hashedPassword = await bcrypt.hash(ADMIN_PASSWORD, 12);

  await User.create({
    name: ADMIN_NAME.trim(),
    email,
    password: hashedPassword,
    role: "admin",
  });

  console.log(`Admin created successfully: ${email}`);

  process.exit(0);
}

seedAdmin().catch((error) => {
  console.error("Admin seed failed:", error);
  process.exit(1);
});