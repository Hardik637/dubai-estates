import React from 'react';
import { Reveal } from '../motion/Reveal';

interface Step {
  step: string;
  title: string;
  subtitle: string;
  description: string;
}

export const ClientExperience: React.FC = () => {
  const steps: Step[] = [
    {
      step: '01',
      title: 'Discover',
      subtitle: 'Open & Off-Market Portfolio',
      description: 'Access both premier public residences and confidential off-market mandates not found on public real estate portals.'
    },
    {
      step: '02',
      title: 'Advise',
      subtitle: 'Institutional-Grade Due Diligence',
      description: 'Independent evaluation of historical micro-enclave price telemetry, title deed provenance, service charges, and projected net yields.'
    },
    {
      step: '03',
      title: 'View',
      subtitle: 'Bespoke Private Walkthroughs',
      description: 'Chauffeured viewings scheduled entirely around your agenda, with private marine and aerial vantage points for coastal estates.'
    },
    {
      step: '04',
      title: 'Acquire',
      subtitle: 'Fiduciary Conveyance & Residency',
      description: 'Seamless RERA escrow management, trusted conveyancing legal partners, and expedited 10-Year UAE Golden Visa facilitation.'
    }
  ];

  return (
    <section className="relative py-28 sm:py-36 bg-[#0a0b0d] border-b border-white/5 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        
        {/* Section Header */}
        <Reveal delayMs={100}>
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-6">
            <div>
              <span className="text-[10px] tracking-[0.3em] uppercase text-[#c4ad8e] font-semibold block mb-3">
                06 / Private Client Experience
              </span>
              <h2 className="font-editorial text-3xl sm:text-5xl font-light text-[#f7f5f0] tracking-[-0.01em]">
                The Acquisition Journey,<br />
                <span className="italic text-[#eae6df]">Articulated With Care.</span>
              </h2>
            </div>
            <p className="text-xs sm:text-sm text-[#96938a] max-w-md font-light leading-relaxed">
              Every mandate is handled with fiduciary discretion. We advise sovereigns, family principals, and international investors on structuring legacy acquisitions.
            </p>
          </div>
        </Reveal>

        {/* Minimalist Numbered Editorial Process Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-10">
          {steps.map((item, idx) => (
            <Reveal key={item.step} delayMs={150 * (idx + 1)} durationMs={800}>
              <div className="relative pt-6 border-t border-white/10 group hover:border-[#c4ad8e] transition-colors duration-400">
                
                {/* Number */}
                <div className="font-mono text-xs text-[#c4ad8e] tracking-widest mb-4">
                  {item.step}
                </div>

                {/* Title */}
                <h3 className="font-editorial text-2xl sm:text-3xl text-[#f7f5f0] font-light mb-2 group-hover:text-[#c4ad8e] transition-colors">
                  {item.title}
                </h3>

                {/* Subtitle */}
                <div className="text-[11px] tracking-[0.16em] uppercase text-[#96938a] mb-4">
                  {item.subtitle}
                </div>

                {/* Description */}
                <p className="text-xs sm:text-sm text-[#b8b5ad] font-light leading-relaxed">
                  {item.description}
                </p>
              </div>
            </Reveal>
          ))}
        </div>

      </div>
    </section>
  );
};
