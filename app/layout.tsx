import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Aman Digital Solutions",
  description:
    "Professional digital solutions for businesses.",
  icons: {
    icon: "/icon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}