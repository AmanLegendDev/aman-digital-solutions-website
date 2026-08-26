import type { Metadata } from "next";

import AboutHero from "@/components/AboutPage/AboutHero";
import FounderStory from "@/components/AboutPage/FounderStory";
import WhatWeBuild from "@/components/AboutPage/WhatWeBuild";
import OurApproach from "@/components/AboutPage/OurApproach";
import Capabilities from "@/components/AboutPage/Capabilities";
import ProofPortfolio from "@/components/AboutPage/ProofPortfolio";
import Values from "@/components/AboutPage/Values";
import WhyWorkWithUs from "@/components/AboutPage/WhyWorkWithUs";
import FutureVision from "@/components/AboutPage/FutureVision";
import AboutCTA from "@/components/AboutPage/AboutCTA";

export const metadata: Metadata = {
  title: "About Aman Digital Solutions | Founder-Led Digital Agency",
  description:
    "Learn about Aman Digital Solutions, a founder-led digital agency building modern websites, business systems and digital experiences for ambitious businesses.",
  alternates: {
    canonical: "/about",
  },
  openGraph: {
    title: "About Aman Digital Solutions | Founder-Led Digital Agency",
    description:
      "Discover the story, approach and vision behind Aman Digital Solutions.",
    url: "/about",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "About Aman Digital Solutions",
    description:
      "The story, approach and vision behind Aman Digital Solutions.",
  },
};

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-[#080808] text-white">
      {/* =====================================================
          01 — INTRODUCTION
      ===================================================== */}
      <AboutHero />

      {/* =====================================================
          02 — FOUNDER STORY
      ===================================================== */}
      <FounderStory />

      {/* =====================================================
          03 — WHAT WE BUILD
      ===================================================== */}
      <WhatWeBuild />

      {/* =====================================================
          04 — OUR APPROACH
      ===================================================== */}
      <OurApproach />

      {/* =====================================================
          05 — CAPABILITIES
      ===================================================== */}
      <Capabilities />

      {/* =====================================================
          06 — REAL WORK / PROOF
      ===================================================== */}
      <ProofPortfolio />

      {/* =====================================================
          07 — VALUES
      ===================================================== */}
      <Values />

      {/* =====================================================
          08 — WHY WORK WITH US
      ===================================================== */}
      <WhyWorkWithUs />

      {/* =====================================================
          09 — LONG-TERM VISION
      ===================================================== */}
      <FutureVision />

      {/* =====================================================
          10 — FINAL CTA
      ===================================================== */}
      <AboutCTA />
    </main>
  );
}