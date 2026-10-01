import React from 'react';
import { useApp } from '../../context/AppContext';
import { ArrowUpRight, ShieldCheck, Globe, Users } from 'lucide-react';

export const SellWithUs: React.FC = () => {
  const { setCurrentPage } = useApp();

  const steps = [
    { num: '01', title: 'Consultation & Valuation', desc: 'A discreet appraisal based on recent comparable registry transactions and architectural pedigree.' },
    { num: '02', title: 'Architectural Media Production', desc: 'Editorial photography and cinema-grade film production tailored for high-net-worth distribution.' },
    { num: '03', title: 'Private & Global Placement', desc: 'Direct presentation to verified family offices, sovereign principals, and private wealth networks.' },
    { num: '04', title: 'Fiduciary Conveyance', desc: 'Full RERA title-deed compliance and bespoke escrow advisory from agreement to deed handover.' }
  ];

  return (
    <section className="section-white py-24 sm:py-36 border-b border-[#E7E3DA]">
      <div className="editorial-container">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 sm:mb-24 gap-6">
          <div>
            <span className="text-[10px] sm:text-xs font-mono tracking-[0.3em] uppercase text-[#8A877F] block mb-3">
              04 / For Property Owners
            </span>
            <h2 className="font-editorial text-3xl sm:text-5xl md:text-6xl font-light text-[#111111] leading-[1.08] tracking-[-0.01em]">
              Your property.<br />
              <span className="italic text-[#8A877F]">The right audience.</span>
            </h2>
          </div>

          <p className="text-sm sm:text-base text-[#2B2A27] max-w-md font-light leading-relaxed">
            Consigning an exceptional residence requires discretion, architectural storytelling, and access to qualified international capital.
          </p>
        </div>

        {/* 2-Column Split: Editorial Imagery + Process Steps */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column: Image with Framing */}
          <div className="lg:col-span-5 relative group overflow-hidden bg-[#F7F4EC] border border-[#E7E3DA]">
            <img
              src="/images/seller_estate.jpg"
              alt="Consign Your Dubai Residence"
              className="w-full aspect-[3/4] object-cover transition-transform duration-700 group-hover:scale-102"
              loading="lazy"
            />
            <div className="p-6 bg-white border-t border-[#E7E3DA] flex items-center justify-between">
              <div>
                <span className="text-[10px] font-mono uppercase text-[#8A877F] block">
                  Listing Mandate
                </span>
                <span className="text-xs font-medium text-[#111111]">
                  Direct Title Deed Representation
                </span>
              </div>
              <span className="text-xs font-mono text-[#8A877F]">
                ORN #88921
              </span>
            </div>
          </div>

          {/* Right Column: 4-Step Process */}
          <div className="lg:col-span-7 space-y-8">
            <div className="space-y-6">
              {steps.map((st) => (
                <div key={st.num} className="p-6 bg-[#F7F4EC] border border-[#E7E3DA] transition hover:border-[#111111]">
                  <div className="flex items-start gap-4">
                    <span className="font-mono text-xs font-semibold text-[#8A877F] pt-1">
                      {st.num}
                    </span>
                    <div>
                      <h3 className="font-editorial text-xl sm:text-2xl text-[#111111] font-light mb-1">
                        {st.title}
                      </h3>
                      <p className="text-xs sm:text-sm text-[#2B2A27] font-light leading-relaxed">
                        {st.desc}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="pt-4 flex flex-col sm:flex-row gap-4">
              <button
                onClick={() => {
                  setCurrentPage('sell');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="btn-editorial-primary"
              >
                <span>List Your Property</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </button>

              <button
                onClick={() => {
                  setCurrentPage('contact');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="btn-editorial-secondary"
              >
                <span>Request Private Valuation</span>
              </button>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
