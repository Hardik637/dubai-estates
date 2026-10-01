import React from 'react';
import { useApp } from '../../context/AppContext';
import { ArrowUpRight, Heart } from 'lucide-react';

export const FeaturedProperties: React.FC = () => {
  const { properties, formatPrice, navigateToProperty, isFavorite, toggleFavorite, setCurrentPage } = useApp();

  // Exactly 3 curated featured residences for the editorial homepage story
  const curatedProps = properties.slice(0, 3);
  const heroProperty = curatedProps[0];
  const sideProps = curatedProps.slice(1, 3);

  return (
    <section className="section-cream py-24 sm:py-36 border-b border-[#E7E3DA]">
      <div className="editorial-container">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 sm:mb-24 gap-6">
          <div>
            <span className="text-[10px] sm:text-xs font-mono tracking-[0.3em] uppercase text-[#8A877F] block mb-3">
              03 / The Curated Collection
            </span>
            <h2 className="font-editorial text-3xl sm:text-5xl md:text-6xl font-light text-[#111111] leading-[1.08] tracking-[-0.01em]">
              Selected residences,<br />
              <span className="italic text-[#8A877F]">curated by hand.</span>
            </h2>
          </div>

          <button
            onClick={() => {
              setCurrentPage('properties');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="btn-editorial-secondary self-start md:self-end"
          >
            <span>View All ({properties.length})</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Editorial Asymmetric Grid: 1 Large Lead Property + 2 Secondary Architectural Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
          
          {/* Main Large Lead Property (7 columns) */}
          {heroProperty && (
            <div
              onClick={() => navigateToProperty(heroProperty.id)}
              className="lg:col-span-7 group cursor-pointer bg-white border border-[#E7E3DA] p-6 sm:p-8 flex flex-col justify-between transition-all duration-300 hover:border-[#111111]"
            >
              <div>
                <div className="relative aspect-[16/10] overflow-hidden mb-6 bg-[#F7F4EC] border border-[#E7E3DA]">
                  <img
                    src={heroProperty.images[0]}
                    alt={heroProperty.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-103"
                    loading="lazy"
                  />
                  <div className="absolute top-3 left-3 bg-[#111111] text-white text-[9px] font-mono tracking-[0.2em] uppercase px-2.5 py-1">
                    Featured Commission
                  </div>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleFavorite(heroProperty.id);
                    }}
                    className="absolute top-3 right-3 p-2 bg-white/90 text-[#111111] hover:bg-white transition cursor-pointer"
                    aria-label="Save residence"
                  >
                    <Heart className={`w-3.5 h-3.5 ${isFavorite(heroProperty.id) ? 'fill-[#111111]' : ''}`} />
                  </button>
                </div>

                <div className="space-y-2 mb-6">
                  <div className="flex items-center justify-between text-[11px] font-mono uppercase tracking-[0.2em] text-[#8A877F]">
                    <span>{heroProperty.community}</span>
                    <span>{heroProperty.propertyType}</span>
                  </div>
                  <h3 className="font-editorial text-2xl sm:text-3xl text-[#111111] font-light leading-snug">
                    {heroProperty.title}
                  </h3>
                </div>
              </div>

              <div className="pt-6 border-t border-[#E7E3DA] flex items-center justify-between">
                <div>
                  <span className="text-[10px] font-mono uppercase tracking-wider text-[#8A877F] block">
                    {heroProperty.bedrooms} Beds • {heroProperty.areaSqFt.toLocaleString()} Sq Ft
                  </span>
                  <span className="font-editorial text-2xl text-[#111111] font-medium">
                    {formatPrice(heroProperty.priceAED)}
                  </span>
                </div>
                <div className="flex items-center gap-2 text-xs font-medium uppercase tracking-[0.16em] text-[#111111]">
                  <span>View Dossier</span>
                  <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </div>
              </div>
            </div>
          )}

          {/* Secondary Stack (5 columns) */}
          <div className="lg:col-span-5 flex flex-col gap-8">
            {sideProps.map((prop) => (
              <div
                key={prop.id}
                onClick={() => navigateToProperty(prop.id)}
                className="group cursor-pointer bg-white border border-[#E7E3DA] p-6 flex flex-col justify-between transition-all duration-300 hover:border-[#111111]"
              >
                <div>
                  <div className="relative aspect-[16/9] overflow-hidden mb-5 bg-[#F7F4EC] border border-[#E7E3DA]">
                    <img
                      src={prop.images[0]}
                      alt={prop.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-103"
                      loading="lazy"
                    />
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleFavorite(prop.id);
                      }}
                      className="absolute top-3 right-3 p-2 bg-white/90 text-[#111111] hover:bg-white transition cursor-pointer"
                      aria-label="Save residence"
                    >
                      <Heart className={`w-3.5 h-3.5 ${isFavorite(prop.id) ? 'fill-[#111111]' : ''}`} />
                    </button>
                  </div>

                  <div className="space-y-1 mb-4">
                    <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-[#8A877F] block">
                      {prop.community} • {prop.propertyType}
                    </span>
                    <h4 className="font-editorial text-xl text-[#111111] font-light leading-snug">
                      {prop.title}
                    </h4>
                  </div>
                </div>

                <div className="pt-4 border-t border-[#E7E3DA] flex items-center justify-between">
                  <span className="font-editorial text-xl text-[#111111]">
                    {formatPrice(prop.priceAED)}
                  </span>
                  <ArrowUpRight className="w-4 h-4 text-[#111111] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </div>
              </div>
            ))}
          </div>

        </div>

      </div>
    </section>
  );
};
