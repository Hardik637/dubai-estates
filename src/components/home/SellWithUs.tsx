import React from 'react';
import { useApp } from '../../context/AppContext';
import { Reveal } from '../motion/Reveal';
import { ParallaxImage } from '../motion/ParallaxImage';
import { ArrowUpRight, ShieldCheck, Globe, EyeOff, Award } from 'lucide-react';

export const SellWithUs: React.FC = () => {
  const { setCurrentPage, setIsEnquiryDrawerOpen, setSelectedDrawerProject } = useApp();

  const handleSpeakWithTeam = () => {
    setSelectedDrawerProject('Private Advisory - Property Representation');
    setIsEnquiryDrawerOpen(true);
  };

  return (
    <section className="relative py-28 sm:py-36 bg-[#0c0d10] border-b border-white/5 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        
        {/* Container with architectural frame */}
        <div className="relative bg-[#121316] border border-white/10 overflow-hidden grid grid-cols-1 lg:grid-cols-12 items-stretch">
          
          {/* Left Text / Narrative (7 cols) */}
          <div className="lg:col-span-7 p-8 sm:p-12 lg:p-16 flex flex-col justify-between z-10">
            <div>
              <Reveal delayMs={100}>
                <div className="inline-flex items-center gap-2 mb-6 text-[10px] tracking-[0.3em] uppercase text-[#c4ad8e] font-semibold">
                  <span>05 / Private Representation</span>
                </div>
              </Reveal>

              <Reveal delayMs={200} durationMs={1000}>
                <h2 className="font-editorial text-3xl sm:text-5xl lg:text-6xl font-light text-[#f7f5f0] leading-[1.08] tracking-[-0.01em] mb-6">
                  Your Property Deserves<br />
                  <span className="italic text-[#c4ad8e]">The Right Audience.</span>
                </h2>
              </Reveal>

              <Reveal delayMs={350} durationMs={1000}>
                <p className="text-sm sm:text-base text-[#b8b5ad] font-light leading-relaxed max-w-xl mb-10">
                  Exceptional residences should not compete in crowded public portals. We place your asset directly before vetted sovereign wealth funds, family offices, and verified international purchasers seeking prime Dubai real estate.
                </p>
              </Reveal>

              {/* 3 Pillars of Seller Representation */}
              <Reveal delayMs={450}>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-12 pt-8 border-t border-white/10 text-xs">
                  <div>
                    <div className="flex items-center gap-2 text-[#f7f5f0] font-editorial text-base sm:text-lg mb-1">
                      <Globe className="w-4 h-4 text-[#c4ad8e] shrink-0" />
                      <span>Global Capital</span>
                    </div>
                    <p className="text-[11px] text-[#96938a] font-light leading-normal">
                      Direct marketing across top capital capitals in Europe, GCC & Asia.
                    </p>
                  </div>

                  <div>
                    <div className="flex items-center gap-2 text-[#f7f5f0] font-editorial text-base sm:text-lg mb-1">
                      <EyeOff className="w-4 h-4 text-[#c4ad8e] shrink-0" />
                      <span>Confidentiality</span>
                    </div>
                    <p className="text-[11px] text-[#96938a] font-light leading-normal">
                      Discreet off-market option with signed NDAs before disclosure.
                    </p>
                  </div>

                  <div>
                    <div className="flex items-center gap-2 text-[#f7f5f0] font-editorial text-base sm:text-lg mb-1">
                      <ShieldCheck className="w-4 h-4 text-[#c4ad8e] shrink-0" />
                      <span>Vetted Buyers</span>
                    </div>
                    <p className="text-[11px] text-[#96938a] font-light leading-normal">
                      Pre-qualified liquidity checks before viewings are scheduled.
                    </p>
                  </div>
                </div>
              </Reveal>
            </div>

            {/* CTAs */}
            <Reveal delayMs={550}>
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
                <button
                  onClick={() => {
                    setCurrentPage('sell');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="editorial-btn-primary cursor-pointer group"
                >
                  <span>List Your Property</span>
                  <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </button>

                <button
                  onClick={handleSpeakWithTeam}
                  className="editorial-btn-secondary cursor-pointer"
                >
                  <span>Speak With Our Team</span>
                </button>
              </div>
            </Reveal>
          </div>

          {/* Right Image (5 cols) */}
          <div className="lg:col-span-5 relative min-h-[360px] lg:min-h-full overflow-hidden bg-[#18191d]">
            <ParallaxImage
              src="/images/seller_estate.jpg"
              alt="Exclusive Dubai Private Estate"
              className="w-full h-full"
              speed={0.05}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#121316] via-transparent to-transparent lg:hidden" />
          </div>

        </div>

      </div>
    </section>
  );
};
