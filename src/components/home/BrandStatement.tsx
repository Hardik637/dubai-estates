import React from 'react';
import { useApp } from '../../context/AppContext';
import { ArrowUpRight } from 'lucide-react';

export const BrandStatement: React.FC = () => {
  const { setCurrentPage } = useApp();

  return (
    <section id="brand-story" className="section-cream py-24 sm:py-36 border-b border-[#E7E3DA]">
      <div className="editorial-container">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 sm:mb-24 gap-6">
          <div>
            <span className="text-[10px] sm:text-xs font-mono tracking-[0.3em] uppercase text-[#8A877F] block mb-3">
              01 / The Brand Philosophy
            </span>
            <h2 className="font-editorial text-3xl sm:text-5xl md:text-6xl font-light text-[#111111] leading-[1.08] tracking-[-0.01em]">
              The way property<br />
              <span className="italic text-[#8A877F]">should be discovered.</span>
            </h2>
          </div>

          <p className="text-sm sm:text-base text-[#2B2A27] max-w-md font-light leading-relaxed">
            Dubai Estates operates at the intersection of architectural intelligence and private capital, bridging discerning buyers with the emirate’s most significant residential commissions.
          </p>
        </div>

        {/* Editorial Asymmetric Composition */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column: Big Architectural Image */}
          <div className="lg:col-span-7 relative group overflow-hidden bg-white border border-[#E7E3DA]">
            <img
              src="/images/brand_statement_editorial.jpg"
              alt="Architectural Dubai Residence"
              className="w-full aspect-[4/3] object-cover transition-transform duration-700 group-hover:scale-102"
              loading="lazy"
            />
            <div className="p-6 bg-white border-t border-[#E7E3DA] flex items-center justify-between">
              <div>
                <span className="text-[10px] font-mono tracking-[0.2em] uppercase text-[#8A877F] block">
                  Palm Jumeirah
                </span>
                <span className="text-xs font-medium text-[#111111]">
                  Signature Waterfront Villa
                </span>
              </div>
              <span className="text-xs font-mono text-[#8A877F]">
                Private Representation
              </span>
            </div>
          </div>

          {/* Right Column: Editorial Manifesto */}
          <div className="lg:col-span-5 space-y-8">
            <div className="space-y-4">
              <span className="text-[11px] font-mono uppercase tracking-[0.2em] text-[#8A877F]">
                Quiet Sophistication
              </span>
              <h3 className="font-editorial text-2xl sm:text-3xl text-[#111111] font-light leading-snug">
                Moving past algorithmic volume into curated architectural significance.
              </h3>
              <p className="text-sm text-[#2B2A27] font-light leading-relaxed">
                Most platforms compete on quantity. Dubai Estates exists for individuals who measure value by privacy, pedigree, and spatial proportion. Every residence in our portfolio is vetted for architectural integrity and verified ownership status.
              </p>
            </div>

            <div className="pt-6 border-t border-[#E7E3DA] space-y-4">
              <div className="flex items-start gap-4">
                <span className="w-1.5 h-1.5 bg-[#111111] mt-2 shrink-0" />
                <p className="text-xs sm:text-sm text-[#2B2A27] font-light">
                  <strong className="font-medium text-[#111111]">Direct Owner Mandates:</strong> No duplicate listings or ghost inventory. We engage directly with genuine title-deed holders.
                </p>
              </div>

              <div className="flex items-start gap-4">
                <span className="w-1.5 h-1.5 bg-[#111111] mt-2 shrink-0" />
                <p className="text-xs sm:text-sm text-[#2B2A27] font-light">
                  <strong className="font-medium text-[#111111]">Discrete Representation:</strong> Access unlisted private treaty sales across the UAE through our DIFC advisory desk.
                </p>
              </div>
            </div>

            <div className="pt-4">
              <button
                onClick={() => {
                  setCurrentPage('about');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="btn-editorial-primary"
              >
                <span>Read Our Approach</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
