import React from 'react';
import { Reveal } from '../motion/Reveal';
import { ParallaxImage } from '../motion/ParallaxImage';

export const BrandStatement: React.FC = () => {
  return (
    <section id="brand-statement" className="relative py-28 sm:py-40 bg-[#0a0b0d] border-b border-white/5 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        
        {/* Section Header Eyebrow */}
        <Reveal delayMs={100}>
          <div className="flex items-center gap-3 mb-12 sm:mb-16">
            <span className="text-[10px] tracking-[0.3em] uppercase text-[#c4ad8e] font-semibold">
              01 / The Brand Philosophy
            </span>
            <span className="w-12 h-[1px] bg-white/10" />
          </div>
        </Reveal>

        {/* Huge Editorial Statement */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          <div className="lg:col-span-8">
            <Reveal delayMs={200} durationMs={1000}>
              <h2 className="font-editorial text-3xl sm:text-5xl md:text-6xl lg:text-[4.2rem] font-light leading-[1.12] text-[#f7f5f0] tracking-[-0.01em]">
                Dubai is not simply a market.{' '}
                <span className="italic text-[#c4ad8e]">
                  It is a collection of addresses, ambitions and ways of living.
                </span>
              </h2>
            </Reveal>

            <Reveal delayMs={350} durationMs={1000}>
              <div className="mt-10 sm:mt-14 max-w-2xl space-y-6 text-[#b8b5ad] text-sm sm:text-base leading-relaxed font-light">
                <p>
                  We operate at the convergence of private wealth, iconic architecture, and considered advisory. Dubai Estates was established to provide an elevated alternative to mass-market portals — an exclusive digital salon representing prime waterfront villas, sky penthouses, and sovereign estates with uncompromised discretion.
                </p>
                <p>
                  For owners, we offer bespoke placement before vetted international capital. For buyers, we curate only residences that withstand scrutiny of location, design integrity, and long-term capital preservation.
                </p>
              </div>
            </Reveal>

            {/* Architectural Key Indicators */}
            <Reveal delayMs={500} durationMs={900}>
              <div className="mt-14 pt-10 border-t border-white/10 grid grid-cols-2 sm:grid-cols-3 gap-8">
                <div>
                  <div className="font-editorial text-2xl sm:text-3xl text-[#f7f5f0] font-light mb-1">
                    AED 5M+
                  </div>
                  <div className="text-[11px] tracking-[0.2em] uppercase text-[#96938a]">
                    Prime Portfolio Threshold
                  </div>
                </div>

                <div>
                  <div className="font-editorial text-2xl sm:text-3xl text-[#f7f5f0] font-light mb-1">
                    100%
                  </div>
                  <div className="text-[11px] tracking-[0.2em] uppercase text-[#96938a]">
                    Verified Title Deeds
                  </div>
                </div>

                <div className="col-span-2 sm:col-span-1">
                  <div className="font-editorial text-2xl sm:text-3xl text-[#c4ad8e] font-light mb-1">
                    Direct
                  </div>
                  <div className="text-[11px] tracking-[0.2em] uppercase text-[#96938a]">
                    Owner-to-Capital Network
                  </div>
                </div>
              </div>
            </Reveal>
          </div>

          {/* Architectural Image Accent */}
          <div className="lg:col-span-4 mt-8 lg:mt-0">
            <Reveal delayMs={300} durationMs={1100} direction="left">
              <div className="relative aspect-[3/4] w-full overflow-hidden border border-white/10 bg-[#121316]">
                <ParallaxImage
                  src="/images/brand_statement_editorial.jpg"
                  alt="Architectural Composition Dubai"
                  className="w-full h-full"
                  speed={0.06}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0a0b0d]/70 via-transparent to-transparent pointer-events-none" />
                <div className="absolute bottom-6 left-6 right-6">
                  <span className="text-[9px] tracking-[0.25em] uppercase text-[#c4ad8e] block mb-1">
                    Architectural Connoisseurship
                  </span>
                  <p className="text-xs text-[#eae6df] font-light">
                    Every residence represented is selected for timeless design and structural excellence.
                  </p>
                </div>
              </div>
            </Reveal>
          </div>
        </div>

      </div>
    </section>
  );
};
