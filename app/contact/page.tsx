import type { Metadata } from "next";

import Navbar from "@/components/agency/navbar/Navbar";
import Footer from "@/components/agency/footer/Footer";

import ContactHero from "@/components/contact/ContactHero";
import ContactMethods from "@/components/contact/ContactMethods";
import ContactForm from "@/components/contact/ContactForm";
import ContactExpectations from "@/components/contact/ContactExpectations";
import ContactCTA from "@/components/contact/ContactCTA";

export const metadata: Metadata = {
  title: "Contact Aman Digital Solutions | Start a Project",

  description:
    "Have a website, e-commerce store, web application or digital project in mind? Contact Aman Digital Solutions to discuss your requirements and start a project.",

  alternates: {
    canonical: "/contact",
  },

  openGraph: {
    title: "Contact Aman Digital Solutions | Start a Project",
    description:
      "Tell us what you are building, improving or growing and let's discuss the right digital solution.",
    url: "/contact",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "Contact Aman Digital Solutions",
    description:
      "Start a conversation about your next digital project.",
  },
};

export default function ContactPage() {
  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-[#080808] text-white">
        {/* 01 — INTRO */}
        <ContactHero />

        {/* 02 — DIRECT CONTACT OPTIONS */}
        <ContactMethods />

        {/* 03 — PROJECT ENQUIRY */}
        <ContactForm />

        {/* 04 — WHAT HAPPENS NEXT */}
        <ContactExpectations />

        {/* 05 — DIRECT CONVERSATION */}
        <ContactCTA />
      </main>

      <Footer />
    </>
  );
}