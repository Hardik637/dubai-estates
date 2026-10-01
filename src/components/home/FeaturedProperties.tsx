import React from 'react';
import { useApp } from '../../context/AppContext';
import { Reveal } from '../motion/Reveal';
import { ArrowUpRight, Bed, Bath, Maximize2, MapPin } from 'lucide-react';

export const FeaturedProperties: React.FC = () => {
  const { properties, formatPrice, navigateToProperty, setCurrentPage } = useApp();

  // Select 3 top curated residences from actual application data
  const curated = properties.filter(p => p.featured).slice(0, 3).length === 3
    ? properties.filter(p => p.featured).slice(0, 3)
    : properties.slice(0, 3);

  const heroProperty = curated[0];
  const sideProperties = curated.slice(1, 3);

  if (!heroProperty) return null;

  return (
    <section className="relative py-28 sm:py-36 bg-[#0a0b0d] border-b border-white/5 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        
        {/* Section Header */}
        <Reveal delayMs={100}>
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
            <div>
              <span className="text-[10px] tracking-[0.3em] uppercase text-[#c4ad8e] font-semibold block mb-3">
                04 / The Collection
              </span>
              <h2 className="font-editorial text-3xl sm:text-5xl font-light text-[#f7f5f0] tracking-[-0.01em]">
                Current Private Portfolio,<br />
                <span className="italic text-[#eae6df]">Curated Without Compromise.</span>
              </h2>
            </div>
            <p className="text-xs sm:text-sm text-[#96938a] max-w-md font-light leading-relaxed">
              A considered selection of exceptional residences currently represented by Dubai Estates. Each property is vetted for architectural distinction, title integrity, and lifestyle prestige.
            </p>
          </div>
        </Reveal>

        {/* Asymmetrical Editorial Composition (1 Main Feature + 2 Side Spotlight) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch mb-16">
          
          {/* Main Huge Feature Residence (7 Cols) */}
          <div 
            onClick={() => {
              navigateToProperty(heroProperty.id);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="lg:col-span-7 group relative bg-[#121316] border border-white/10 overflow-hidden cursor-pointer flex flex-col justify-between transition-all duration-500 hover:border-[#c4ad8e]/50"
          >
            {/* Image Container with smooth zoom */}
            <div className="relative aspect-[16/11] sm:aspect-[16/10] w-full overflow-hidden bg-[#18191d]">
              <img
                src={heroProperty.images[0]}
                alt={heroProperty.title}
                className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0c0d10] via-transparent to-black/20" />
              
              {/* Badges */}
              <div className="absolute top-5 left-5 flex items-center gap-2">
                <span className="px-3 py-1 bg-[#0a0b0d]/85 backdrop-blur-md text-[10px] tracking-[0.2em] uppercase font-semibold text-[#c4ad8e] border border-white/10">
                  {heroProperty.community}
                </span>
                <span className="px-2.5 py-1 bg-[#14241d]/90 backdrop-blur-md text-[10px] tracking-[0.15em] uppercase font-semibold text-[#82c4a3] border border-[#2b4c3c]">
                  {heroProperty.completionStatus}
                </span>
              </div>

              {/* Price floating */}
              <div className="absolute bottom-5 right-5 bg-[#0a0b0d]/90 backdrop-blur-md px-4 py-2 border border-white/10 text-right">
                <span className="text-[9px] tracking-[0.2em] uppercase text-[#96938a] block">Acquisition</span>
                <span className="font-editorial text-lg sm:text-2xl text-[#f7f5f0] font-light">
                  {formatPrice(heroProperty.priceAED)}
                </span>
              </div>
            </div>

            {/* Details Footer */}
            <div className="p-6 sm:p-8 flex flex-col justify-between flex-1">
              <div>
                <div className="text-xs text-[#96938a] tracking-wider uppercase mb-1 font-mono">
                  {heroProperty.propertyType} • {heroProperty.referenceNumber}
                </div>
                <h3 className="font-editorial text-2xl sm:text-3xl text-[#f7f5f0] font-light group-hover:text-[#c4ad8e] transition-colors leading-snug mb-3">
                  {heroProperty.title}
                </h3>
                <p className="text-xs sm:text-sm text-[#b8b5ad] font-light line-clamp-2 leading-relaxed mb-6">
                  {heroProperty.description}
                </p>
              </div>

              {/* Specs Bar & CTA */}
              <div className="pt-4 border-t border-white/10 flex items-center justify-between text-xs text-[#eae6df]">
                <div className="flex items-center gap-5">
                  <span className="flex items-center gap-1.5 text-[#b8b5ad]">
                    <Bed className="w-4 h-4 text-[#c4ad8e]" />
                    <span className="font-mono">{heroProperty.bedrooms}</span> Beds
                  </span>
                  <span className="flex items-center gap-1.5 text-[#b8b5ad]">
                    <Bath className="w-4 h-4 text-[#c4ad8e]" />
                    <span className="font-mono">{heroProperty.bathrooms}</span> Baths
                  </span>
                  <span className="flex items-center gap-1.5 text-[#b8b5ad]">
                    <Maximize2 className="w-3.5 h-3.5 text-[#c4ad8e]" />
                    <span className="font-mono">{heroProperty.areaSqFt.toLocaleString()}</span> sqft
                  </span>
                </div>

                <div className="inline-flex items-center gap-1 text-[11px] font-semibold tracking-[0.15em] uppercase text-[#c4ad8e] group-hover:translate-x-1 transition-transform">
                  <span>View Residence</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </div>
              </div>
            </div>
          </div>

          {/* Secondary Spotlight Residences (5 Cols Stacked) */}
          <div className="lg:col-span-5 flex flex-col gap-8 justify-between">
            {sideProperties.map((prop) => (
              <div
                key={prop.id}
                onClick={() => {
                  navigateToProperty(prop.id);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="group relative bg-[#121316] border border-white/10 overflow-hidden cursor-pointer flex-1 flex flex-col sm:flex-row lg:flex-col justify-between transition-all duration-500 hover:border-[#c4ad8e]/50"
              >
                {/* Image */}
                <div className="relative aspect-[16/10] sm:aspect-square sm:w-48 lg:w-full lg:aspect-[16/9] overflow-hidden bg-[#18191d] shrink-0">
                  <img
                    src={prop.images[0]}
                    alt={prop.title}
                    className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0c0d10] via-transparent to-transparent pointer-events-none" />
                  
                  <div className="absolute top-3 left-3">
                    <span className="px-2.5 py-0.5 bg-[#0a0b0d]/85 backdrop-blur-md text-[9px] tracking-[0.2em] uppercase font-semibold text-[#c4ad8e] border border-white/10">
                      {prop.community}
                    </span>
                  </div>
                </div>

                {/* Info */}
                <div className="p-5 sm:p-6 flex flex-col justify-between flex-1">
                  <div>
                    <div className="flex justify-between items-baseline mb-1">
                      <span className="text-[10px] text-[#96938a] tracking-wider uppercase font-mono">
                        {prop.propertyType}
                      </span>
                      <span className="font-editorial text-lg text-[#f7f5f0] font-light">
                        {formatPrice(prop.priceAED)}
                      </span>
                    </div>
                    <h4 className="font-editorial text-lg sm:text-xl text-[#f7f5f0] font-light group-hover:text-[#c4ad8e] transition-colors line-clamp-1 mb-2">
                      {prop.title}
                    </h4>
                  </div>

                  <div className="pt-3 border-t border-white/10 flex items-center justify-between text-xs text-[#b8b5ad]">
                    <span className="font-mono text-[11px]">
                      {prop.bedrooms} Bed • {prop.bathrooms} Bath • {prop.areaSqFt.toLocaleString()} sqft
                    </span>
                    <span className="text-[10px] tracking-[0.15em] uppercase font-semibold text-[#c4ad8e] group-hover:translate-x-1 transition-transform flex items-center gap-1">
                      View <ArrowUpRight className="w-3 h-3" />
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>

        {/* Bottom CTA to explore all properties */}
        <Reveal delayMs={200}>
          <div className="text-center pt-6">
            <button
              onClick={() => {
                setCurrentPage('properties');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="editorial-btn-secondary cursor-pointer group inline-flex items-center gap-3"
            >
              <span>Explore The Complete Portfolio</span>
              <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </button>
          </div>
        </Reveal>

      </div>
    </section>
  );
};
