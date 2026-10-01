import React from 'react';
import { CinematicHero } from '../components/home/CinematicHero';
import { AsymmetricEditorialSpread } from '../components/home/AsymmetricEditorialSpread';
import { DubaiEditorialSection } from '../components/home/DubaiEditorialSection';
import { EditorialPropertyFeatures } from '../components/home/EditorialPropertyFeatures';
import { FinalCTA } from '../components/home/FinalCTA';

export const HomePage: React.FC = () => {
  return (
    <div className="relative w-full bg-[#FFFFFF] text-[#111111] overflow-x-clip">
      {/* 01. Floating Editorial Frame Hero */}
      <CinematicHero />

      {/* SCENE 02 & 04 — EDITORIAL IMAGE COMPOSITION & BRAND STATEMENT: Asymmetric Spread in Warm Cream */}
      <AsymmetricEditorialSpread />

      {/* SCENE 05 — DUBAI: Interactive Editorial Storytelling (Location on left, big image on right) */}
      <DubaiEditorialSection />

      {/* SCENE 06 & 07 — PROPERTY DISCOVERY & EDITORIAL SPLIT: 3 Hand-Selected Alternating Spreads */}
      <EditorialPropertyFeatures />

      {/* SCENE 08 — FINAL CTA: Minimalist White "FIND YOUR PLACE IN DUBAI" */}
      <FinalCTA />
    </div>
  );
};
