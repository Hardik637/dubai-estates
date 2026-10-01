import React from 'react';
import { CinematicHero } from '../components/home/CinematicHero';
import { BrandStatement } from '../components/home/BrandStatement';
import { DubaiLens } from '../components/home/DubaiLens';
import { FeaturedProperties } from '../components/home/FeaturedProperties';
import { SellWithUs } from '../components/home/SellWithUs';
import { PropertyJournal } from '../components/home/PropertyJournal';
import { FinalCTA } from '../components/home/FinalCTA';

export const HomePage: React.FC = () => {
  return (
    <div className="relative w-full bg-[#FFFFFF] text-[#111111] overflow-x-clip">
      {/* 01. Cinematic Scroll-Controlled Video Hero */}
      <CinematicHero />

      {/* 02. The Brand Philosophy (Cream) */}
      <BrandStatement />

      {/* 03. Dubai, Through Our Lens (White) */}
      <DubaiLens />

      {/* 04. Curated Collection - Max 3 Properties (Cream) */}
      <FeaturedProperties />

      {/* 05. For Property Owners - Sell With Us (White) */}
      <SellWithUs />

      {/* 06. Dubai Property Journal (Cream) */}
      <PropertyJournal />

      {/* 07. Final Destination CTA (White) */}
      <FinalCTA />
    </div>
  );
};
