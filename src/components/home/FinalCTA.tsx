import React from 'react';
import { useApp } from '../../context/AppContext';
import { ArrowUpRight } from 'lucide-react';

export const FinalCTA: React.FC = () => {
  const { setCurrentPage, setIsEnquiryDrawerOpen, setSelectedDrawerProject } = useApp();

  const handleEnquireAdvisory = () => {
    setSelectedDrawerProject('Private Advisory - Architectural Acquisitions');
    setIsEnquiryDrawerOpen(true);
  };

  return (
    <section className="section-white py-28 sm:py-44 border-b border-[#E7E3DA]">
      <div className="editorial-container text-center max-w-4xl mx-auto space-y-8">
        
        <span className="text-[10px] sm:text-xs font-mono tracking-[0.35em] uppercase text-[#8A877F] block">
          06 / Your Destination
        </span>

        <h2 className="font-editorial text-4xl sm:text-6xl md:text-7xl lg:text-[5rem] font-light text-[#111111] leading-[1.04] tracking-[-0.02em]">
          Your next address<br />
          <span className="italic text-[#8A877F]">starts with a conversation.</span>
        </h2>

        <p className="text-sm sm:text-base md:text-lg text-[#2B2A27] font-light max-w-2xl mx-auto leading-relaxed">
          Whether you are acquiring a singular Dubai residence or entrusting us with the private sale of your estate, our private office is at your service.
        </p>

        <div className="pt-6 flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            onClick={() => {
              setCurrentPage('properties');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="btn-editorial-primary w-full sm:w-auto"
          >
            <span>Explore Properties</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </button>

          <button
            onClick={handleEnquireAdvisory}
            className="btn-editorial-secondary w-full sm:w-auto"
          >
            <span>Consult With Advisor</span>
          </button>
        </div>

      </div>
    </section>
  );
};
