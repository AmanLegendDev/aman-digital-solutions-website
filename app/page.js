"use client";

import Hero from "@/components/agency/Hero";
import FeaturedClient from "@/components/agency/FeaturedClient";
import Stats from "@/components/agency/Stats";
import Services from "@/components/agency/Services";
import Portfolio from "@/components/agency/Portfolio";
import WhyChooseUs from "@/components/agency/WhyChooseUs";
import Process from "@/components/agency/Process";
import About from "@/components/agency/About";
import ContactCTA from "@/components/agency/ContactCTA";
import ContactSection from "@/components/agency/ContactSection";
import Navbar from "@/components/agency/Navbar";
import Footer from "@/components/agency/Footer";
export default function Home() {
  return (
    <main className="bg-[#0A0A0A] text-white overflow-hidden">
      <Navbar/>
      <Hero />
      <FeaturedClient />
      <Stats />
      <Services />
      <Portfolio />
      <WhyChooseUs />
      <Process />
       <About />
      <ContactCTA />
      <ContactSection/>
      <Footer/>
    </main>
  );
}