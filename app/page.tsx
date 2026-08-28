import Navbar from "@/components/agency/navbar/Navbar";
import Hero from "@/components/agency/hero/Hero";
import TrustSection from "@/components/agency/trust/TrustSection";
import ServicesSection from "@/components/agency/services/ServicesSection";
import ProjectsSection from "@/components/agency/projects/ProjectsSection";
import WhyUsSection from "@/components/agency/why-us/WhyUsSection";
import TestimonialsSection from "@/components/agency/testimonials/TestimonialsSection";
import PricingSection from "@/components/agency/pricing/PricingSection";
import LocationsSection from "@/components/agency/locations/LocationsSection";
import GallerySection from "@/components/agency/gallery/GallerySection";
import BlogSection from "@/components/agency/blog/BlogSection";
import FAQSection from "@/components/agency/faq/FAQSection";
import FinalCTA from "@/components/agency/cta/FinalCTA";
import Footer from "@/components/agency/footer/Footer";

export default function HomePage() {
  return (
    <>
      <Navbar />

      <main>
      <Hero />
<TrustSection />
<ServicesSection />
<ProjectsSection />
<WhyUsSection />

<PricingSection />
<LocationsSection />
<GallerySection />
<BlogSection />
<FAQSection />
<FinalCTA />
      </main>
      <Footer />
    </>
  );
}