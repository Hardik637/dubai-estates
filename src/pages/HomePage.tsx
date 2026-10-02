import React from 'react';
import { CinematicHero } from '../components/home/CinematicHero';
import { FloatingSearch } from '../components/home/FloatingSearch';
import { AsymmetricEditorialSpread } from '../components/home/AsymmetricEditorialSpread';
import { EditorialPropertyFeatures } from '../components/home/EditorialPropertyFeatures';
import { DubaiEditorialSection } from '../components/home/DubaiEditorialSection';
import { SellWithUs } from '../components/home/SellWithUs';
import { BrandStatement } from '../components/home/BrandStatement';
import { FinalCTA } from '../components/home/FinalCTA';

export const HomePage: React.FC = () => {
  return (
    <div className="relative w-full bg-[#FFFFFF] text-[#111111] overflow-x-clip">
      {/* 01. Pure Cinematic Frame-by-Frame Scroll Hero (0 UI on load, 150 frames in /hero-frame) */}
      <CinematicHero />

      {/* 02. Search & Filter Bar directly emerging from Hero exit */}
      <FloatingSearch />

      {/* 03. Plate II — Spatial Proportion & Architectural Form */}
      <AsymmetricEditorialSpread />

      {/* 04. Plate III — Curated Trophy Residences Collection */}
      <EditorialPropertyFeatures />

      {/* 05. Plate IV — Dubai Geographic Atlas (Palm, Downtown, Dubai Hills, Marina) */}
      <DubaiEditorialSection />

      {/* 06. Plate V — Consign / Sell With Us (Advisory & Private Representation) */}
      <SellWithUs />

      {/* 07. Plate VI — Private Office Brand Philosophy */}
      <BrandStatement />

      {/* 08. Finale — Find Your Place in Dubai Directives */}
      <FinalCTA />
    </div>
  );
};
