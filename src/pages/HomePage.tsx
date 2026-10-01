import React from 'react';
import { CinematicHero } from '../components/home/CinematicHero';
import { FloatingSearch } from '../components/home/FloatingSearch';
import { BrandStatement } from '../components/home/BrandStatement';
import { DifferenceSection } from '../components/home/DifferenceSection';
import { DubaiLens } from '../components/home/DubaiLens';
import { FeaturedProperties } from '../components/home/FeaturedProperties';
import { SellWithUs } from '../components/home/SellWithUs';
import { ClientExperience } from '../components/home/ClientExperience';
import { PropertyJournal } from '../components/home/PropertyJournal';
import { FinalCTA } from '../components/home/FinalCTA';

export const HomePage: React.FC = () => {
  return (
    <div className="relative w-full bg-[#0a0b0d] text-[#f7f5f0] overflow-x-clip">
      {/* 01. Cinematic Scroll-Controlled Hero Journey */}
      <CinematicHero />

      {/* Floating Minimal Search Bar */}
      <FloatingSearch />

      {/* 02. The Brand Statement */}
      <BrandStatement />

      {/* 03. The Dubai Estates Difference */}
      <DifferenceSection />

      {/* 04. Dubai, Through Our Lens */}
      <DubaiLens />

      {/* 05. Curated Properties (The Collection) */}
      <FeaturedProperties />

      {/* 06. For Property Owners (Sell With Us) */}
      <SellWithUs />

      {/* 07. Private Client Experience */}
      <ClientExperience />

      {/* 08. Market Intelligence (The Property Journal) */}
      <PropertyJournal />

      {/* 09. Final Brand Statement & Conclusion */}
      <FinalCTA />
    </div>
  );
};
