import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Reveal } from '../motion/Reveal';
import { ArrowUpRight, Compass } from 'lucide-react';

interface EnclaveLens {
  id: string;
  communityId: string;
  name: string;
  subtitle: string;
  character: string;
  editorialNote: string;
  avgYield: string;
  priceBand: string;
  image: string;
}

export const DubaiLens: React.FC = () => {
  const { navigateToCommunity } = useApp();
  const [selectedIdx, setSelectedIdx] = useState(0);

  const enclaves: EnclaveLens[] = [
    {
      id: 'palm',
      communityId: 'palm-jumeirah',
      name: 'Palm Jumeirah',
      subtitle: 'The Sovereign Archipelago',
      character: 'Ultra-Prime Waterfront Mansions & Private Fronds',
      editorialNote: 'A global engineering marvel and private capital sanctuary. Frond signature villas command direct shoreline access and sovereign discretion, bordered by world-renowned gastronomy at Atlantis The Royal.',
      avgYield: '8.5% ROI',
      priceBand: 'AED 18M – 180M+',
      image: '/backgrounds/palm_aerial.jpg'
    },
    {
      id: 'downtown',
      communityId: 'downtown-dubai',
      name: 'Downtown Dubai',
      subtitle: 'The Vertical Epicenter',
      character: 'Sky Penthouses & Branded Hospitality Residences',
      editorialNote: 'Anchored by the Burj Khalifa and the Dubai Opera, Downtown represents the apex of cosmopolitan grandeur, Michelin dining, and branded residences offering high liquidity and international investor demand.',
      avgYield: '7.8% ROI',
      priceBand: 'AED 3.5M – 75M',
      image: '/backgrounds/burj_sunset.jpg'
    },
    {
      id: 'emirates-hills',
      communityId: 'emirates-hills',
      name: 'Emirates Hills',
      subtitle: 'The Beverly Hills of Dubai',
      character: 'Gated Custom Palaces & Montgomerie Golf Fairways',
      editorialNote: 'The legacy benchmark of Dubai private estates. Generous plot sizes, custom neoclassical and minimalist palatial architecture, and multi-generational family compounds overlooking championship fairways.',
      avgYield: '6.4% ROI',
      priceBand: 'AED 35M – 220M+',
      image: '/images/hero_cinematic_residence.jpg'
    },
    {
      id: 'dubai-hills',
      communityId: 'dubai-hills-estate',
      name: 'Dubai Hills Estate',
      subtitle: 'The Green Heart of Modern Luxury',
      character: 'Contemporary Fairway Villas & Lush Urban Masterplanning',
      editorialNote: 'Designed around an 18-hole championship course and extensive royal parklands, Dubai Hills Estate harmonizes modern clean-line architectural villas with leading private academies and DIFC proximity.',
      avgYield: '8.1% ROI',
      priceBand: 'AED 8M – 65M',
      image: '/backgrounds/hills_villas.jpg'
    },
    {
      id: 'marina',
      communityId: 'dubai-marina',
      name: 'Dubai Marina & JBR',
      subtitle: 'Waterfront Riviera Living',
      character: 'Superyacht Berths, Penthouses & High-Floor Vistas',
      editorialNote: 'A vibrant marine promenade hosting deep-water yacht moorings and high-floor penthouses with panoramic vistas spanning the Arabian Gulf and Bluewaters Island.',
      avgYield: '9.2% ROI',
      priceBand: 'AED 3.8M – 45M',
      image: '/backgrounds/marina_twilight.jpg'
    }
  ];

  const activeEnclave = enclaves[selectedIdx];

  return (
    <section className="relative py-28 sm:py-36 bg-[#0a0b0d] border-b border-white/5 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        
        {/* Section Eyebrow & Intro */}
        <Reveal delayMs={100}>
          <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-16 gap-6">
            <div>
              <span className="text-[10px] tracking-[0.3em] uppercase text-[#c4ad8e] font-semibold block mb-3">
                03 / Dubai, Through Our Lens
              </span>
              <h2 className="font-editorial text-3xl sm:text-5xl font-light text-[#f7f5f0] tracking-[-0.01em]">
                Micro-Enclaves of<br />
                <span className="italic text-[#eae6df]">Sovereign Distinction.</span>
              </h2>
            </div>
            <p className="text-xs sm:text-sm text-[#96938a] max-w-md font-light leading-relaxed">
              Dubai is not homogeneous. Each enclave commands unique architectural covenants, yield dynamics, and demographic profiles. Explore the city through our curated perspective.
            </p>
          </div>
        </Reveal>

        {/* Enclave Selector Navigation */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 scrollbar-none">
          {enclaves.map((enclave, idx) => {
            const isSelected = selectedIdx === idx;
            return (
              <button
                key={enclave.id}
                onClick={() => setSelectedIdx(idx)}
                className={`shrink-0 px-4 sm:px-6 py-2.5 text-xs tracking-[0.15em] uppercase font-semibold transition-all duration-300 cursor-pointer border ${
                  isSelected
                    ? 'border-[#c4ad8e] bg-[#c4ad8e] text-[#0a0b0d]'
                    : 'border-white/10 text-[#b8b5ad] hover:text-[#f7f5f0] hover:border-white/25 bg-white/[0.02]'
                }`}
              >
                {enclave.name}
              </button>
            );
          })}
        </div>

        {/* Large Cinematic Frame */}
        <div className="relative aspect-[16/9] min-h-[460px] sm:min-h-[540px] w-full overflow-hidden border border-white/10 bg-[#121316]">
          {/* Background Image with smooth transition */}
          <img
            key={activeEnclave.image}
            src={activeEnclave.image}
            alt={activeEnclave.name}
            className="w-full h-full object-cover animate-fadeIn scale-100 transition-transform duration-[4000ms] hover:scale-105"
            style={{ animationDuration: '1.2s' }}
          />

          {/* Gradients for readability */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#0a0b0d] via-[#0a0b0d]/50 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0a0b0d]/80 via-[#0a0b0d]/30 to-transparent hidden md:block" />

          {/* Content Overlay */}
          <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-10 lg:p-14 z-10 flex flex-col md:flex-row md:items-end justify-between gap-8">
            <div className="max-w-xl">
              <span className="text-[10px] tracking-[0.25em] uppercase text-[#c4ad8e] font-semibold block mb-2">
                {activeEnclave.subtitle}
              </span>
              <h3 className="font-editorial text-2xl sm:text-4xl lg:text-5xl text-[#f7f5f0] font-light mb-3">
                {activeEnclave.name}
              </h3>
              <p className="text-xs sm:text-sm text-[#d8d4cc] font-light leading-relaxed mb-6">
                {activeEnclave.editorialNote}
              </p>

              <div className="flex flex-wrap items-center gap-6 pt-4 border-t border-white/15 text-xs text-[#eae6df]">
                <div>
                  <span className="text-[10px] tracking-[0.18em] uppercase text-[#96938a] block">Capital Yield</span>
                  <span className="font-mono text-[#c4ad8e] font-semibold">{activeEnclave.avgYield}</span>
                </div>
                <div>
                  <span className="text-[10px] tracking-[0.18em] uppercase text-[#96938a] block">Indicative Range</span>
                  <span className="font-mono text-[#f7f5f0] font-semibold">{activeEnclave.priceBand}</span>
                </div>
              </div>
            </div>

            {/* Action to Explore Community */}
            <button
              onClick={() => {
                navigateToCommunity(activeEnclave.communityId);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="editorial-btn-primary self-start md:self-end shrink-0 cursor-pointer group"
            >
              <span>Explore {activeEnclave.name}</span>
              <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </button>
          </div>
        </div>

      </div>
    </section>
  );
};
