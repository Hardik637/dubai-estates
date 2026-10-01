import React from 'react';
import { useApp } from '../../context/AppContext';
import { ArrowDown, ArrowUpRight } from 'lucide-react';
import { Reveal } from '../motion/Reveal';

export const Hero: React.FC = () => {
  const { setCurrentPage } = useApp();

  const handleScrollDown = () => {
    const nextSection = document.getElementById('brand-statement');
    if (nextSection) {
      nextSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative w-full h-[100svh] min-h-[700px] flex items-end pb-16 sm:pb-24 overflow-hidden bg-[#0a0b0d]">
      {/* Cinematic Architectural Background Visual */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <img
          src="/images/hero_cinematic_residence.jpg"
          alt="Dubai Waterfront Architectural Villa"
          className="w-full h-full object-cover object-center scale-100 animate-fadeIn"
          style={{ animationDuration: '2.4s', animationTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)' }}
        />
        {/* Editorial Vignette & Contrast Layers */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0b0d] via-[#0a0b0d]/40 to-black/35" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0a0b0d]/70 via-transparent to-transparent hidden md:block" />
      </div>

      {/* Hero Content Container */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 w-full">
        <div className="max-w-4xl">
          {/* Eyebrow */}
          <Reveal delayMs={100} durationMs={900}>
            <div className="inline-flex items-center gap-3 mb-6 sm:mb-8">
              <span className="w-8 h-[1px] bg-[#c4ad8e]" />
              <span className="text-[11px] sm:text-xs font-semibold tracking-[0.3em] uppercase text-[#c4ad8e]">
                Dubai / Private Property House
              </span>
            </div>
          </Reveal>

          {/* Large Architectural Editorial Headline */}
          <Reveal delayMs={250} durationMs={1100}>
            <h1 className="font-editorial text-4xl sm:text-6xl md:text-7xl lg:text-[5.5rem] font-light leading-[1.05] tracking-[-0.02em] text-[#f7f5f0] mb-6 sm:mb-8">
              Property,<br />
              <span className="italic font-normal text-[#eae6df]">Curated.</span>
            </h1>
          </Reveal>

          {/* Short Supporting Statement */}
          <Reveal delayMs={400} durationMs={1000}>
            <p className="text-sm sm:text-base md:text-lg text-[#b8b5ad] font-light leading-relaxed max-w-xl mb-10 sm:mb-12">
              A private property house representing Dubai’s most distinguished residential acquisitions. Connecting verified asset owners with qualified international capital.
            </p>
          </Reveal>

          {/* Call to Actions */}
          <Reveal delayMs={550} durationMs={900}>
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
              <button
                onClick={() => {
                  setCurrentPage('properties');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="editorial-btn-primary cursor-pointer group"
              >
                <span>Explore Properties</span>
                <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </button>

              <button
                onClick={() => {
                  setCurrentPage('sell');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="editorial-btn-secondary cursor-pointer group"
              >
                <span>List Your Property</span>
                <span className="w-1.5 h-1.5 rounded-full bg-[#c4ad8e] opacity-75 group-hover:opacity-100 transition-opacity" />
              </button>
            </div>
          </Reveal>
        </div>
      </div>

      {/* Subtle Scroll Indicator */}
      <button
        onClick={handleScrollDown}
        aria-label="Scroll to brand statement"
        className="absolute bottom-8 right-6 sm:right-12 z-10 hidden sm:flex items-center gap-3 text-[10px] tracking-[0.25em] uppercase text-[#96938a] hover:text-[#f7f5f0] transition-colors cursor-pointer group"
      >
        <span>Scroll</span>
        <span className="w-5 h-8 rounded-full border border-white/20 flex items-start justify-center p-1 group-hover:border-white/40 transition-colors">
          <span className="w-1 h-2 rounded-full bg-[#c4ad8e] animate-bounce" />
        </span>
      </button>
    </section>
  );
};
