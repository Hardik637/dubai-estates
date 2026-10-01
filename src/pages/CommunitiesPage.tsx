import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { MapPin, TrendingUp, Sparkles, ChevronRight, Building } from 'lucide-react';

export const CommunitiesPage: React.FC = () => {
  const { communities, navigateToCommunity } = useApp();
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const categories = ['All', 'Waterfront', 'Family Living', 'Luxury', 'Investment'];

  const filteredCommunities = selectedCategory === 'All'
    ? communities
    : communities.filter(c => c.category === selectedCategory);

  return (
    <div className="min-h-screen bg-transparent pt-24 sm:pt-28 pb-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">


        
        {/* Header matching Figma 05 */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-1.5 text-xs text-amber-400 font-semibold tracking-wider uppercase mb-2">
            <Sparkles className="w-3.5 h-3.5" /> Curated Dubai Enclaves
          </div>
          <h1 className="font-serif-luxury text-3xl sm:text-5xl font-bold text-white leading-tight">
            Explore Dubai's <br />
            <span className="gold-gradient-text">Iconic Communities</span>
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 mt-3">
            From beachfront living to urban sophistication, find the community that fits your lifestyle and investment criteria.
          </p>
        </div>

        {/* Category Filter Pills matching Figma 05: All, Waterfront, Family Living, Luxury, Investment */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-5 py-2 rounded-xl text-xs font-semibold transition-all duration-200 cursor-pointer ${
                selectedCategory === cat
                  ? 'bg-amber-500 text-slate-950 font-bold shadow-lg'
                  : 'bg-[#111a2e] text-slate-300 hover:text-white border border-white/10 hover:border-white/20'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Communities Grid matching Figma 05 (Palm Jumeirah, Downtown Dubai, Dubai Marina, Dubai Hills Estate, Business Bay, Emirates Hills) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredCommunities.map((comm) => (
            <div
              key={comm.id}
              onClick={() => navigateToCommunity(comm.id)}
              className="group relative bg-[#111a2e] border border-white/10 hover:border-amber-500/50 rounded-3xl overflow-hidden cursor-pointer shadow-xl transition-all duration-300 hover:shadow-2xl hover:shadow-amber-500/10 flex flex-col"
            >
              {/* Image */}
              <div className="relative aspect-[16/10] w-full overflow-hidden bg-slate-900">
                <img
                  src={comm.heroImage}
                  alt={comm.name}
                  className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#111a2e] via-transparent to-black/30" />

                <div className="absolute top-4 left-4">
                  <span className="px-2.5 py-1 text-[10px] font-bold uppercase rounded-md bg-amber-500 text-slate-950 shadow">
                    {comm.category}
                  </span>
                </div>

                <div className="absolute bottom-3 right-3 bg-black/60 backdrop-blur-md px-2.5 py-1 rounded-lg text-xs font-bold text-amber-300">
                  {comm.stats.propertiesCount}+ Properties
                </div>
              </div>

              {/* Info */}
              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="font-serif-luxury text-xl font-bold text-white group-hover:text-amber-300 transition-colors mb-2">
                    {comm.name}
                  </h3>
                  <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed mb-4">
                    {comm.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-white/10">
                  <div className="grid grid-cols-2 gap-2 text-xs mb-4">
                    <div>
                      <span className="text-[11px] text-slate-500 block">Avg Price</span>
                      <span className="font-semibold text-white">{comm.stats.averagePriceAED.split('-')[0]}</span>
                    </div>
                    <div>
                      <span className="text-[11px] text-slate-500 block">Rental Yield</span>
                      <span className="font-bold text-emerald-400">{comm.stats.rentalYield} ROI</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between text-xs font-bold text-amber-400 group-hover:translate-x-1 transition-transform">
                    <span>Explore Community Guide</span>
                    <ChevronRight className="w-4 h-4" />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
};
