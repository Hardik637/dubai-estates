import React from 'react';
import { useApp } from '../../context/AppContext';
import { ArrowUpRight } from 'lucide-react';

export const DubaiLens: React.FC = () => {
  const { navigateToCommunity } = useApp();

  const locations = [
    {
      id: 'palm-jumeirah',
      name: 'Palm Jumeirah',
      type: 'Waterfront Enclave',
      descriptor: 'Bespoke shoreline villas and private beachfront estates engineered into the Arabian Gulf.',
      image: '/backgrounds/palm_aerial.jpg'
    },
    {
      id: 'downtown-dubai',
      name: 'Downtown Dubai',
      type: 'Civic & Sky Penthouses',
      descriptor: 'High-altitude duplexes framing the Burj Khalifa, the Dubai Opera, and contemporary urban culture.',
      image: '/backgrounds/burj_sunset.jpg'
    },
    {
      id: 'dubai-hills-estate',
      name: 'Dubai Hills Estate',
      type: 'Golf Sanctuary',
      descriptor: 'Parkland fairway villas combining modern Scandinavian architecture with manicured championship fairways.',
      image: '/backgrounds/hills_villas.jpg'
    },
    {
      id: 'dubai-marina',
      name: 'Dubai Marina',
      type: 'Superyacht Harbour',
      descriptor: 'Architectural penthouses overlooking one of the world’s most renowned deep-water coastal marinas.',
      image: '/backgrounds/marina_twilight.jpg'
    }
  ];

  return (
    <section className="section-white py-24 sm:py-36 border-b border-[#E7E3DA]">
      <div className="editorial-container">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 sm:mb-20 gap-6">
          <div>
            <span className="text-[10px] sm:text-xs font-mono tracking-[0.3em] uppercase text-[#8A877F] block mb-3">
              02 / Geographic Intelligence
            </span>
            <h2 className="font-editorial text-3xl sm:text-5xl md:text-6xl font-light text-[#111111] leading-[1.08] tracking-[-0.01em]">
              Dubai, through<br />
              <span className="italic text-[#8A877F]">an architectural lens.</span>
            </h2>
          </div>

          <p className="text-sm sm:text-base text-[#2B2A27] max-w-md font-light leading-relaxed">
            From the water’s edge at Palm Jumeirah to the green fairways of Dubai Hills, explore the distinct spatial character of each primary enclave.
          </p>
        </div>

        {/* 2x2 Asymmetric Editorial Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
          {locations.map((loc, idx) => (
            <div
              key={loc.id}
              onClick={() => navigateToCommunity(loc.id)}
              className="group cursor-pointer bg-[#F7F4EC] border border-[#E7E3DA] p-6 sm:p-8 flex flex-col justify-between transition-all duration-300 hover:border-[#111111]"
            >
              {/* Image Frame */}
              <div className="relative aspect-[16/10] overflow-hidden mb-6 bg-white border border-[#E7E3DA]">
                <img
                  src={loc.image}
                  alt={loc.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  loading="lazy"
                />
                <span className="absolute top-3 left-3 bg-[#111111] text-white text-[9px] font-mono tracking-[0.2em] uppercase px-2.5 py-1">
                  0{idx + 1}
                </span>
              </div>

              {/* Information */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] font-mono tracking-[0.2em] uppercase text-[#8A877F]">
                    {loc.type}
                  </span>
                  <ArrowUpRight className="w-4 h-4 text-[#111111] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </div>

                <h3 className="font-editorial text-2xl sm:text-3xl text-[#111111] font-light mb-3">
                  {loc.name}
                </h3>

                <p className="text-xs sm:text-sm text-[#2B2A27] font-light leading-relaxed">
                  {loc.descriptor}
                </p>
              </div>

              {/* View CTA */}
              <div className="pt-6 mt-6 border-t border-[#E7E3DA] flex items-center justify-between text-xs font-medium tracking-[0.15em] uppercase text-[#111111]">
                <span>Explore Enclave</span>
                <span className="font-mono text-[10px] text-[#8A877F]">Portfolio →</span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
