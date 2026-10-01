import React from 'react';
import { EditorialHero } from '../components/home/EditorialHero';
import { AsymmetricEditorialSpread } from '../components/home/AsymmetricEditorialSpread';
import { ChevronTransition } from '../components/home/ChevronTransition';
import { DubaiEditorialSection } from '../components/home/DubaiEditorialSection';
import { EditorialPropertyFeatures } from '../components/home/EditorialPropertyFeatures';
import { BuySellRentSection } from '../components/home/BuySellRentSection';
import { FinalCTA } from '../components/home/FinalCTA';

export const HomePage: React.FC = () => {
  return (
    <div className="relative w-full bg-[#FFFFFF] text-[#111111] overflow-x-clip">
      {/* SCENE 01 — INTRODUCTION: White, Minimal, Oversized Headline "DUBAI HAS MORE TO OFFER", Small Image Block */}
      <EditorialHero />

      {/* SCENE 02 & 04 — EDITORIAL IMAGE COMPOSITION & BRAND STATEMENT: Asymmetric Spread in Warm Cream */}
      <AsymmetricEditorialSpread />

      {/* SCENE 03 — CHEVRON TRANSITION: Architectural Horizontal Chevron Slider (> > > > >) */}
      <ChevronTransition />

      {/* SCENE 05 — DUBAI: Interactive Editorial Storytelling (Location on left, big image on right) */}
      <DubaiEditorialSection />

      {/* SCENE 06 & 07 — PROPERTY DISCOVERY & EDITORIAL SPLIT: 3 Hand-Selected Alternating Spreads */}
      <EditorialPropertyFeatures />

      {/* SCENE 08 — BUY / SELL / RENT: Massive Black (#111111) Transition with Giant White Typography */}
      <BuySellRentSection />

      {/* SCENE 09 — FINAL CTA: Minimalist White "FIND YOUR PLACE IN DUBAI" */}
      <FinalCTA />
    </div>
  );
};
