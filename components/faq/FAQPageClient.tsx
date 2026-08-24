"use client";

import { useMemo, useState } from "react";

import FAQHeroSection from "./FAQHeroSection";
import FAQListSection from "./FAQListSection";
import FAQFinalCtaSection from "./FAQFinalCtaSection";

/* =========================================================
   TYPES
========================================================= */

export type FAQData = {
  _id: string;

  question: string;
  slug: string;

  answer: string;

  category?: string;

  relatedService?: string;
  relatedProject?: string;

  featured: boolean;
  displayOrder: number;
};

/* =========================================================
   PROPS
========================================================= */

type FAQPageClientProps = {
  faqs: FAQData[];
  category?: string;
};

/* =========================================================
   PAGE
========================================================= */

export default function FAQPageClient({
  faqs,
  category,
}: FAQPageClientProps) {
  const [activeCategory, setActiveCategory] =
    useState(category || "All");

  /* =======================================================
     CATEGORIES
  ======================================================= */

  const categories = useMemo(() => {
    const uniqueCategories = Array.from(
      new Set(
        faqs
          .map((faq) => faq.category?.trim())
          .filter(
            (
              value
            ): value is string =>
              Boolean(value)
          )
      )
    );

    return ["All", ...uniqueCategories];
  }, [faqs]);

  /* =======================================================
     FILTERED FAQS
  ======================================================= */

  const filteredFaqs = useMemo(() => {
    if (activeCategory === "All") {
      return faqs;
    }

    return faqs.filter(
      (faq) =>
        faq.category?.trim() ===
        activeCategory
    );
  }, [faqs, activeCategory]);

  return (
    <main className="min-h-screen bg-[#050505] text-white">
      {/* ===================================================
          HERO
      =================================================== */}

      <FAQHeroSection
        totalCount={faqs.length}
      />

      {/* ===================================================
          FAQ LIST
      =================================================== */}

      <FAQListSection
        faqs={filteredFaqs}
        categories={categories}
        activeCategory={activeCategory}
        onCategoryChange={setActiveCategory}
      />

      {/* ===================================================
          FINAL CTA
      =================================================== */}

      <FAQFinalCtaSection />
    </main>
  );
}