import React from 'react';
import { CinematicMovieExperience } from '../components/home/CinematicMovieExperience';
import { BrandStatement } from '../components/home/BrandStatement';
import { DubaiLens } from '../components/home/DubaiLens';
import { FeaturedProperties } from '../components/home/FeaturedProperties';
import { BuySellRentSection } from '../components/home/BuySellRentSection';
import { SellWithUs } from '../components/home/SellWithUs';
import { PropertyJournal } from '../components/home/PropertyJournal';
import { FinalCTA } from '../components/home/FinalCTA';

export const HomePage: React.FC = () => {
  return (
    <div className="relative w-full bg-[#FFFFFF] text-[#111111] overflow-x-clip">
      {/* SCENE 01: The Cinematic Movie Scroll Experience (Skyline -> Descent -> District -> Villa -> Sanctuary) */}
      <CinematicMovieExperience />

      {/* SCENE 02: Editorial Brand Statement (Cream) */}
      <BrandStatement />

      {/* SCENE 03 & 04: Dubai & Communities Through Our Lens (White) */}
      <DubaiLens />

      {/* SCENE 05: Curated Editorial Properties Collection (Cream) */}
      <FeaturedProperties />

      {/* SCENE 06: The Marketplace - Buy / Sell / Rent Interactive Monolith (Dark Contrast #111111) */}
      <BuySellRentSection />

      {/* SCENE 07: For Property Owners - Consignment & Valuation (White) */}
      <SellWithUs />

      {/* SCENE 08: Dubai Property Journal - Market Intelligence & Editorial Notes (Cream) */}
      <PropertyJournal />

      {/* SCENE 09: Final Destination & Private Client Desk CTA (White) */}
      <FinalCTA />
    </div>
  );
};
