import React from 'react';
import { useApp } from '../../context/AppContext';
import { Reveal } from '../motion/Reveal';
import { ArrowUpRight } from 'lucide-react';

export const FinalCTA: React.FC = () => {
  const { setCurrentPage } = useApp();

  return (
    <section className="relative min-h-[750px] sm:min-h-[850px] w-full flex items-center justify-center overflow-hidden bg-[#0a0b0d] py-32">
      {/* Background Architectural Canvas */}
      <div className="absolute inset-0 z-0">
        <img
          src="/images/hero_cinematic_residence.jpg"
          alt="Dubai Sovereign Waterfront Estate"
          className="w-full h-full object-cover object-center scale-100"
        />
        {/* Deep Vignette & Shading */}
        <div className="absolute inset-0 bg-[#0a0b0d]/75 backdrop-blur-[2px]" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0b0d] via-transparent to-[#0a0b0d]" />
      </div>

      {/* Content Container */}
      <div className="relative z-10 max-w-4xl mx-auto px-6 sm:px-8 text-center">
        <Reveal delayMs={100}>
          <div className="inline-flex items-center gap-3 mb-6 sm:mb-8">
            <span className="w-6 h-[1px] bg-[#c4ad8e]" />
            <span className="text-[10px] tracking-[0.3em] uppercase text-[#c4ad8e] font-semibold">
              Dubai Estates / The Conclusion
            </span>
            <span className="w-6 h-[1px] bg-[#c4ad8e]" />
          </div>
        </Reveal>

        <Reveal delayMs={250} durationMs={1000}>
          <h2 className="font-editorial text-4xl sm:text-6xl md:text-7xl lg:text-[5.5rem] font-light text-[#f7f5f0] leading-[1.06] tracking-[-0.02em] mb-8">
            Your Next Address<br />
            <span className="italic text-[#eae6df]">Starts Here.</span>
          </h2>
        </Reveal>

        <Reveal delayMs={400} durationMs={900}>
          <p className="text-sm sm:text-base text-[#b8b5ad] font-light max-w-lg mx-auto leading-relaxed mb-12">
            Whether seeking an off-market sovereign acquisition or commissioning discreet representation for an exceptional asset.
          </p>
        </Reveal>

        <Reveal delayMs={550}>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={() => {
                setCurrentPage('properties');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="editorial-btn-primary cursor-pointer group w-full sm:w-auto"
            >
              <span>Explore The Portfolio</span>
              <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </button>

            <button
              onClick={() => {
                setCurrentPage('sell');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="editorial-btn-secondary cursor-pointer group w-full sm:w-auto"
            >
              <span>List An Estate</span>
              <span className="w-1.5 h-1.5 rounded-full bg-[#c4ad8e] opacity-75 group-hover:opacity-100 transition-opacity" />
            </button>
          </div>
        </Reveal>
      </div>
    </section>
  );
};
