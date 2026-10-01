import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { ArrowUpRight } from 'lucide-react';

export const DubaiEditorialSection: React.FC = () => {
  const { navigateToCommunity } = useApp();
  const [activeIdx, setActiveIdx] = useState(0);

  const locations = [
    {
      id: 'downtown-dubai',
      name: 'Downtown Dubai',
      category: 'Civic Skyline & Sky Residences',
      image: '/assets/dubai/downtown-skyline-dusk.jpg',
      desc: 'The architectural heart of modern Dubai. High-altitude sky penthouses framing the Burj Khalifa and the Dubai Opera.',
      fact: 'Average Elevation: 55 Floors • Sovereign Urban Infrastructure'
    },
    {
      id: 'palm-jumeirah',
      name: 'Palm Jumeirah',
      category: 'Finite Freehold Coastline',
      image: '/assets/dubai/palm-jumeirah-aerial.jpg',
      desc: 'The world’s most recognizable man-made archipelago. Bespoke beachfront pavilions and private frond estates.',
      fact: 'Waterfront Perimeter: 78km • Gated Sovereign Security'
    },
    {
      id: 'dubai-hills-estate',
      name: 'Dubai Hills',
      category: 'Master Parkland & Fairways',
      image: '/assets/communities/dubai-hills-fairway.jpg',
      desc: 'Championship 18-hole golf fairways framed by contemporary Scandinavian and modernist limestone villas.',
      fact: 'Green Parkland: 2.7M Sq M • 15 Mins to Downtown'
    },
    {
      id: 'dubai-marina',
      name: 'Dubai Marina',
      category: 'Superyacht Corridor',
      image: '/assets/dubai/marina-waterfront-twilight.jpg',
      desc: 'Deep-water berths and sleek glass-tower duplexes enjoying uninterrupted Mediterranean-style coastal promenades.',
      fact: 'Yacht Capacity: 500+ Berths • Direct Open Sea Access'
    }
  ];

  return (
    <section className="section-white py-28 sm:py-40 border-b border-[#E7E3DA]">
      <div className="editorial-container">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 sm:mb-24 gap-6 pb-6 border-b border-[#E7E3DA]">
          <div>
            <span className="text-[10px] font-mono tracking-[0.35em] uppercase text-[#8A877F] block mb-3">
              PLATE III / GEOGRAPHIC ATLAS
            </span>
            <h2 className="font-editorial text-4xl sm:text-6xl md:text-7xl font-light text-[#111111] leading-[0.98] tracking-[-0.02em]">
              DUBAI<br />
              THROUGH<br />
              <span className="italic font-light">A DIFFERENT LENS.</span>
            </h2>
          </div>

          <p className="text-sm text-[#2B2A27] max-w-sm font-light leading-relaxed">
            Select an enclave to inspect its architectural topography, spatial character, and active private portfolio.
          </p>
        </div>

        {/* Interactive Editorial Composition: Location List on Left, Big Changing Image on Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column: Interactive Location List (5 cols) */}
          <div className="lg:col-span-5 space-y-4">
            {locations.map((loc, idx) => {
              const isActive = activeIdx === idx;
              return (
                <div
                  key={loc.id}
                  onMouseEnter={() => setActiveIdx(idx)}
                  onClick={() => navigateToCommunity(loc.id)}
                  className={`p-6 border transition-all duration-300 cursor-pointer ${
                    isActive 
                      ? 'bg-[#F7F4EC] border-[#111111] translate-x-2' 
                      : 'bg-white border-[#E7E3DA] hover:border-[#8A877F]'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px] font-mono uppercase text-[#8A877F]">
                      0{idx + 1} // {loc.category}
                    </span>
                    <ArrowUpRight className={`w-3.5 h-3.5 transition-transform ${
                      isActive ? 'text-[#111111] translate-x-0.5 -translate-y-0.5' : 'text-[#8A877F]'
                    }`} />
                  </div>

                  <h3 className="font-editorial text-2xl sm:text-3xl text-[#111111] font-light">
                    {loc.name}
                  </h3>

                  {isActive && (
                    <div className="mt-3 pt-3 border-t border-[#E7E3DA] animate-fadeIn">
                      <p className="text-xs text-[#2B2A27] font-light leading-relaxed mb-2">
                        {loc.desc}
                      </p>
                      <span className="text-[10px] font-mono text-[#8A877F] block">
                        {loc.fact}
                      </span>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Right Column: Large Photographic Reveal (7 cols) */}
          <div className="lg:col-span-7">
            <div 
              onClick={() => navigateToCommunity(locations[activeIdx].id)}
              className="relative aspect-[16/10] bg-[#F7F4EC] border border-[#E7E3DA] overflow-hidden group cursor-pointer"
            >
              <img
                key={locations[activeIdx].image}
                src={locations[activeIdx].image}
                alt={locations[activeIdx].name}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-104 animate-fadeIn"
              />

              <div className="absolute bottom-0 left-0 right-0 p-6 bg-white/95 border-t border-[#E7E3DA] flex items-center justify-between">
                <div>
                  <span className="text-[10px] font-mono uppercase text-[#8A877F] block">
                    CURRENT SELECTION
                  </span>
                  <span className="font-editorial text-xl text-[#111111]">
                    {locations[activeIdx].name}
                  </span>
                </div>

                <div className="flex items-center gap-2 text-xs font-mono uppercase text-[#111111]">
                  <span>Explore Enclave</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </div>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
