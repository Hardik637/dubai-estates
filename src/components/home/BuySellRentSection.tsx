import React from 'react';
import { useApp } from '../../context/AppContext';
import { ArrowUpRight } from 'lucide-react';

export const BuySellRentSection: React.FC = () => {
  const { setCurrentPage, setFilters } = useApp();

  const tracks = [
    {
      action: 'BUY',
      sub: 'Acquire Trophy Residences',
      image: '/assets/hero/hero-architectural-residence.jpg',
      desc: 'Prime waterfront villas, sky penthouses, and private golf estates. Sovereign verification on every title deed.',
      onClick: () => {
        setFilters(prev => ({ ...prev, listingType: 'For Sale' }));
        setCurrentPage('properties');
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    },
    {
      action: 'SELL',
      sub: 'Owner Mandates & Consignment',
      image: '/assets/editorial/seller-monolith-mansion.jpg',
      desc: 'Discreet placement before verified family offices, private capital, and international principals without public footprint.',
      onClick: () => {
        setCurrentPage('sell');
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    },
    {
      action: 'RENT',
      sub: 'Long-Term Prime Tenancies',
      image: '/assets/interiors/luxury-living-gallery.jpg',
      desc: 'Fully serviced and turnkey architectural residences in Dubai’s most guarded residential addresses.',
      onClick: () => {
        setFilters(prev => ({ ...prev, listingType: 'For Rent' }));
        setCurrentPage('properties');
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    }
  ];

  return (
    <section className="bg-[#111111] text-[#FFFFFF] py-28 sm:py-44 border-b border-[#2B2A27] overflow-hidden select-none">
      <div className="editorial-container">
        
        {/* Section Index Marker */}
        <div className="flex items-center justify-between pb-6 mb-16 sm:mb-24 border-b border-[#2B2A27]">
          <span className="text-[10px] font-mono tracking-[0.35em] uppercase text-[#8A877F]">
            PLATE V // MANDATE DIRECTIVES
          </span>
          <span className="text-[10px] font-mono tracking-[0.35em] uppercase text-[#8A877F]">
            MARKETPLACE TRANSITION
          </span>
        </div>

        {/* Vertical Stacking: Giant White Typography Intersecting with Architectural Images */}
        <div className="space-y-16 sm:space-y-28">
          {tracks.map((t, idx) => {
            const isAlternate = idx % 2 === 1;

            return (
              <div
                key={t.action}
                onClick={t.onClick}
                className="group cursor-pointer grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-center border-b border-[#2B2A27] pb-16 sm:pb-24 transition-colors"
              >
                {/* Text and Massive Title */}
                <div className={`space-y-4 ${isAlternate ? 'lg:col-span-7 lg:order-2' : 'lg:col-span-7 lg:order-1'}`}>
                  <div className="flex items-center gap-3 text-xs font-mono text-[#8A877F]">
                    <span>0{idx + 1}</span>
                    <span className="w-8 h-[1px] bg-[#8A877F]" />
                    <span className="uppercase tracking-[0.2em]">{t.sub}</span>
                  </div>

                  <h3 className="font-editorial text-6xl sm:text-8xl md:text-9xl lg:text-[10rem] font-light leading-[0.9] tracking-[-0.03em] text-[#FFFFFF] group-hover:text-[#8A877F] transition-colors">
                    {t.action}
                  </h3>

                  <p className="text-sm text-[#E7E3DA] font-light max-w-md leading-relaxed pt-2">
                    {t.desc}
                  </p>

                  <div className="pt-4 flex items-center gap-2 text-xs font-mono uppercase tracking-[0.25em] text-[#FFFFFF]">
                    <span>ENTER DIRECTIVE</span>
                    <ArrowUpRight className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                  </div>
                </div>

                {/* Intersecting Architectural Image */}
                <div className={`relative ${isAlternate ? 'lg:col-span-5 lg:order-1' : 'lg:col-span-5 lg:order-2'}`}>
                  <div className="relative aspect-[4/3] bg-[#1B1B1B] border border-[#2B2A27] overflow-hidden group-hover:border-white transition-colors">
                    <img
                      src={t.image}
                      alt={t.action}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 opacity-80 group-hover:opacity-100"
                      loading="lazy"
                    />
                    <div className="absolute bottom-3 left-3 bg-[#111111]/90 px-3 py-1 text-[9px] font-mono uppercase tracking-wider text-white border border-[#2B2A27]">
                      MANDATE // 0{idx + 1}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
