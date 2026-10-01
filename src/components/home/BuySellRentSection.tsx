import React from 'react';
import { useApp } from '../../context/AppContext';
import { ArrowUpRight } from 'lucide-react';

export const BuySellRentSection: React.FC = () => {
  const { setCurrentPage, setFilters } = useApp();

  const tracks = [
    {
      action: 'BUY',
      sub: 'Acquire Trophy Residences',
      desc: 'Prime waterfront villas, sky duplexes, and private golf estates. Sovereign verification on every title deed.',
      onClick: () => {
        setFilters(prev => ({ ...prev, listingType: 'For Sale' }));
        setCurrentPage('properties');
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    },
    {
      action: 'SELL',
      sub: 'Owner Mandates & Consignment',
      desc: 'Discreet placement before verified family offices, private capital, and international principals without public footprint.',
      onClick: () => {
        setCurrentPage('sell');
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    },
    {
      action: 'RENT',
      sub: 'Long-Term Prime Tenancies',
      desc: 'Fully serviced and turnkey architectural residences in Dubai’s most guarded residential addresses.',
      onClick: () => {
        setFilters(prev => ({ ...prev, listingType: 'For Rent' }));
        setCurrentPage('properties');
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    }
  ];

  return (
    <section className="bg-[#111111] text-[#FFFFFF] py-28 sm:py-36 border-b border-[#2B2A27]">
      <div className="editorial-container">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-6 border-b border-[#2B2A27] pb-12">
          <div>
            <span className="text-[10px] sm:text-xs font-mono tracking-[0.35em] uppercase text-[#8A877F] block mb-3">
              Marketplace Directives
            </span>
            <h2 className="font-editorial text-4xl sm:text-6xl md:text-7xl font-light text-[#FFFFFF] leading-[1.04] tracking-[-0.02em]">
              Buy. Sell. Rent.<br />
              <span className="italic text-[#8A877F]">Direct advisory without friction.</span>
            </h2>
          </div>

          <p className="text-sm text-[#E7E3DA] max-w-sm font-light leading-relaxed">
            Choose your mandate. Every transaction is governed through our DIFC office desk under strict RERA escrow regulations.
          </p>
        </div>

        {/* 3 Interactive Monolith Areas */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {tracks.map((t, idx) => (
            <div
              key={t.action}
              onClick={t.onClick}
              className="group cursor-pointer bg-[#1B1B1B] border border-[#2B2A27] p-8 sm:p-10 flex flex-col justify-between transition-all duration-400 hover:border-white hover:bg-[#202020]"
            >
              <div>
                <div className="flex items-center justify-between text-xs font-mono text-[#8A877F] mb-12">
                  <span>0{idx + 1}</span>
                  <ArrowUpRight className="w-4 h-4 text-white group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                </div>

                <h3 className="font-editorial text-4xl sm:text-5xl font-light text-white mb-3">
                  {t.action}.
                </h3>

                <span className="text-xs font-mono uppercase tracking-[0.2em] text-[#8A877F] block mb-4">
                  {t.sub}
                </span>

                <p className="text-xs sm:text-sm text-[#E7E3DA] font-light leading-relaxed">
                  {t.desc}
                </p>
              </div>

              <div className="pt-8 mt-8 border-t border-[#2B2A27] flex items-center justify-between text-xs font-mono uppercase tracking-[0.2em] text-white">
                <span>Enter Mandate</span>
                <span className="text-[#8A877F] group-hover:text-white transition-colors">→</span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
