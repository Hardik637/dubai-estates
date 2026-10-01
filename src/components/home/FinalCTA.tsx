import React from 'react';
import { useApp } from '../../context/AppContext';
import { ArrowUpRight } from 'lucide-react';

export const FinalCTA: React.FC = () => {
  const { setCurrentPage } = useApp();

  return (
    <section className="section-white py-32 sm:py-48 border-b border-[#E7E3DA]">
      <div className="editorial-container text-left max-w-4xl space-y-8">
        
        <span className="text-[10px] font-mono tracking-[0.4em] uppercase text-[#8A877F] block">
          FINALE // NEXT DIRECTIVE
        </span>

        <h2 className="font-editorial text-5xl sm:text-7xl md:text-8xl lg:text-[7.5rem] font-light text-[#111111] leading-[0.95] tracking-[-0.03em]">
          FIND<br />
          YOUR PLACE<br />
          <span className="italic font-light">IN DUBAI.</span>
        </h2>

        <div className="pt-8 flex flex-col sm:flex-row items-start sm:items-center gap-6">
          <button
            onClick={() => {
              setCurrentPage('properties');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="btn-editorial-primary group"
          >
            <span>Explore Properties</span>
            <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </button>

          <button
            onClick={() => {
              setCurrentPage('sell');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="btn-editorial-secondary"
          >
            <span>List Your Property</span>
          </button>
        </div>

      </div>
    </section>
  );
};
