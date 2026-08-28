import Navbar from "@/components/agency/navbar/Navbar";
import Footer from "@/components/agency/footer/Footer";

import TermsHero from "@/components/terms/TermsHero";
import TermsBasics from "@/components/terms/TermsBasics";
import TermsProject from "@/components/terms/TermsProject";
import TermsLegal from "@/components/terms/TermsLegal";
import TermsContact from "@/components/terms/TermsContact";

export default function TermsPage() {
  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-[#050505] text-white">
        <TermsHero />
        <TermsBasics />
        <TermsProject />
        <TermsLegal />
        <TermsContact />
      </main>

      <Footer />
    </>
  );
}