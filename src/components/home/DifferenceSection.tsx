import React, { useState } from 'react';
import { Reveal } from '../motion/Reveal';
import { ArrowRight, Check } from 'lucide-react';

interface Principle {
  number: string;
  title: string;
  tagline: string;
  description: string;
  metrics: string;
  metricLabel: string;
  image: string;
}

export const DifferenceSection: React.FC = () => {
  const [activeIdx, setActiveIdx] = useState(0);

  const principles: Principle[] = [
    {
      number: '01',
      title: 'Curated',
      tagline: 'Not every property belongs on the platform.',
      description: 'We reject commoditization. Every villa, penthouse, and estate represented by Dubai Estates is individually vetted for architectural distinction, developer integrity, and verified sovereign title deeds. Quality precedes volume.',
      metrics: 'Top 3%',
      metricLabel: 'Of evaluated listings accepted',
      image: '/images/hero_cinematic_residence.jpg'
    },
    {
      number: '02',
      title: 'Connected',
      tagline: 'Connecting serious owners with qualified capital.',
      description: 'Our proprietary network bridges Dubai property owners directly with family offices, private wealth managers, and accredited global investors across London, Zurich, Singapore, Riyadh, and Dubai.',
      metrics: '42+',
      metricLabel: 'International investor origins',
      image: '/images/private_client_advisory.jpg'
    },
    {
      number: '03',
      title: 'Intelligence',
      tagline: 'Micro-enclave data over marketing rhetoric.',
      description: 'We provide institutional-grade macroeconomic intelligence, real-time transaction telemetry, and granular yield analysis across Dubai’s prime corridors — enabling clients to acquire and divest with precision.',
      metrics: '100%',
      metricLabel: 'RERA & DLD transaction audit',
      image: '/images/brand_statement_editorial.jpg'
    },
    {
      number: '04',
      title: 'Private',
      tagline: 'A more considered experience for ultra-high-value assets.',
      description: 'Many of Dubai’s most extraordinary estates trade privately. We offer confidential off-market representation, private chauffeured walkthroughs, and NDAs to protect our clients’ discretion.',
      metrics: 'Discreet',
      metricLabel: 'Private treaty acquisitions',
      image: '/images/seller_estate.jpg'
    }
  ];

  const current = principles[activeIdx];

  return (
    <section className="relative py-28 sm:py-36 bg-[#0c0d10] border-b border-white/5 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        
        {/* Section Header */}
        <Reveal delayMs={100}>
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
            <div>
              <span className="text-[10px] tracking-[0.3em] uppercase text-[#c4ad8e] font-semibold block mb-3">
                02 / The Dubai Estates Difference
              </span>
              <h2 className="font-editorial text-3xl sm:text-5xl font-light text-[#f7f5f0] tracking-[-0.01em]">
                Built On Principles,<br />
                <span className="italic text-[#eae6df]">Not Mass Transactions.</span>
              </h2>
            </div>
            <p className="text-xs sm:text-sm text-[#96938a] max-w-md font-light leading-relaxed">
              We engineered a private property house around exclusivity, institutional diligence, and meaningful relationships between owners and purchasers.
            </p>
          </div>
        </Reveal>

        {/* Editorial Horizontal Principle Tabs */}
        <div className="grid grid-cols-2 md:grid-cols-4 border-b border-white/10 mb-12 sm:mb-16">
          {principles.map((principle, idx) => {
            const isActive = activeIdx === idx;
            return (
              <button
                key={principle.number}
                onClick={() => setActiveIdx(idx)}
                className={`py-5 px-3 sm:px-5 text-left border-b-2 transition-all duration-300 cursor-pointer ${
                  isActive
                    ? 'border-[#c4ad8e] bg-white/[0.03]'
                    : 'border-transparent hover:border-white/20 hover:bg-white/[0.01]'
                }`}
              >
                <span className={`text-[10px] tracking-[0.2em] font-mono block mb-1 transition-colors ${
                  isActive ? 'text-[#c4ad8e]' : 'text-[#63615b]'
                }`}>
                  {principle.number}
                </span>
                <span className={`text-base sm:text-lg font-editorial transition-colors block ${
                  isActive ? 'text-[#f7f5f0] font-normal' : 'text-[#96938a] font-light'
                }`}>
                  {principle.title}
                </span>
              </button>
            );
          })}
        </div>

        {/* Active Principle Editorial Showcase */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          
          {/* Left Text Narrative */}
          <div className="lg:col-span-6 space-y-6">
            <div className="inline-block px-3 py-1 bg-white/5 border border-white/10 text-[10px] tracking-[0.25em] uppercase text-[#c4ad8e]">
              Principle {current.number}
            </div>

            <h3 className="font-editorial text-2xl sm:text-4xl text-[#f7f5f0] leading-snug">
              {current.tagline}
            </h3>

            <p className="text-sm sm:text-base text-[#b8b5ad] font-light leading-relaxed">
              {current.description}
            </p>

            {/* Key Metric Pill */}
            <div className="pt-6 border-t border-white/10 flex items-center gap-6">
              <div>
                <div className="font-editorial text-3xl sm:text-4xl text-[#c4ad8e] font-light">
                  {current.metrics}
                </div>
                <div className="text-[11px] tracking-[0.18em] uppercase text-[#96938a] mt-0.5">
                  {current.metricLabel}
                </div>
              </div>
            </div>
          </div>

          {/* Right Architectural Visual */}
          <div className="lg:col-span-6">
            <div className="relative aspect-[16/11] w-full overflow-hidden border border-white/10 bg-[#121316]">
              <img
                key={current.image}
                src={current.image}
                alt={current.title}
                className="w-full h-full object-cover transition-opacity duration-700 animate-fadeIn"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0a0b0d]/70 via-transparent to-transparent pointer-events-none" />
              <div className="absolute top-4 right-4 bg-[#0a0b0d]/80 backdrop-blur-md px-3 py-1.5 border border-white/10 text-[10px] tracking-[0.2em] uppercase text-[#f7f5f0]">
                Dubai Estates Standard
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
