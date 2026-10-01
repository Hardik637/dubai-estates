import React, { useEffect, useRef } from 'react';
import { useApp } from '../../context/AppContext';
import { ArrowUpRight } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const EditorialPropertyFeatures: React.FC = () => {
  const { properties, formatPrice, navigateToProperty, setCurrentPage } = useApp();
  const sectionRef = useRef<HTMLDivElement>(null);

  // Exactly 3 curated featured residences for editorial spreads
  const featured = properties.slice(0, 3);

  return (
    <section 
      ref={sectionRef}
      className="section-cream py-28 sm:py-40 border-b border-[#E7E3DA]"
    >
      <div className="editorial-container">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-6 pb-6 border-b border-[#E7E3DA]">
          <div>
            <span className="text-[10px] font-mono tracking-[0.35em] uppercase text-[#8A877F] block mb-3">
              PLATE IV / CURATED COMMISSIONS
            </span>
            <h2 className="font-editorial text-4xl sm:text-6xl md:text-7xl font-light text-[#111111] leading-[0.98] tracking-[-0.02em]">
              THE<br />
              COLLECTION.
            </h2>
          </div>

          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <span className="text-xs font-mono text-[#8A877F]">
              Showing 03 Hand-Selected Trophy Residences
            </span>
            <button
              onClick={() => {
                setCurrentPage('properties');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="btn-editorial-secondary"
            >
              <span>View Full Archive</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* 3 Sequential Editorial Spreads with alternating left/right asymmetry */}
        <div className="space-y-28 sm:space-y-40">
          {featured.map((prop, idx) => {
            const isReversed = idx % 2 === 1;

            return (
              <div 
                key={prop.id}
                onClick={() => navigateToProperty(prop.id)}
                className="group cursor-pointer grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center"
              >
                {/* Column 1: Typography Block */}
                <div className={`space-y-6 ${isReversed ? 'lg:col-span-5 lg:order-2' : 'lg:col-span-5 lg:order-1'}`}>
                  <div className="flex items-center gap-3">
                    <span className="text-[11px] font-mono font-semibold text-[#111111]">
                      0{idx + 1}
                    </span>
                    <span className="w-8 h-[1px] bg-[#111111]" />
                    <span className="text-[10px] font-mono uppercase tracking-[0.25em] text-[#8A877F]">
                      {prop.community}
                    </span>
                  </div>

                  <h3 className="font-editorial text-3xl sm:text-5xl text-[#111111] font-light leading-snug group-hover:text-[#8A877F] transition-colors">
                    {prop.title}
                  </h3>

                  <div className="py-4 border-t border-b border-[#E7E3DA] grid grid-cols-3 gap-4 text-xs font-mono text-[#8A877F]">
                    <div>
                      <span className="block text-[9px] uppercase text-[#111111]">Scale</span>
                      <span>{prop.areaSqFt.toLocaleString()} SQ FT</span>
                    </div>
                    <div>
                      <span className="block text-[9px] uppercase text-[#111111]">Suites</span>
                      <span>{prop.bedrooms} BEDS</span>
                    </div>
                    <div>
                      <span className="block text-[9px] uppercase text-[#111111]">Status</span>
                      <span>{prop.completionStatus}</span>
                    </div>
                  </div>

                  <div className="flex items-baseline justify-between pt-2">
                    <div>
                      <span className="text-[10px] font-mono uppercase text-[#8A877F] block">
                        Valuation
                      </span>
                      <span className="font-editorial text-3xl sm:text-4xl text-[#111111] font-medium">
                        {formatPrice(prop.priceAED)}
                      </span>
                    </div>

                    <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-[0.2em] text-[#111111]">
                      <span>Inspect Dossier</span>
                      <ArrowUpRight className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                    </div>
                  </div>
                </div>

                {/* Column 2: Large Visual Spread */}
                <div className={`relative ${isReversed ? 'lg:col-span-7 lg:order-1' : 'lg:col-span-7 lg:order-2'}`}>
                  <div className="relative aspect-[16/10] bg-white border border-[#E7E3DA] overflow-hidden">
                    <img
                      src={prop.images[0]}
                      alt={prop.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-104"
                      loading="lazy"
                    />
                    <div className="absolute top-4 left-4 bg-white/95 px-3 py-1 text-[9px] font-mono uppercase tracking-wider text-[#111111] border border-[#E7E3DA]">
                      {prop.propertyType}
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
