import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { ArrowUpRight } from 'lucide-react';

export const CommunitiesPage: React.FC = () => {
  const { communities, navigateToCommunity } = useApp();
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const categories = ['All', 'Waterfront', 'Luxury', 'Family Living', 'Investment'];

  const filteredCommunities = selectedCategory === 'All'
    ? communities
    : communities.filter(c => c.category === selectedCategory);

  return (
    <div className="min-h-screen bg-[#FFFFFF] text-[#111111] pt-28 sm:pt-36 pb-24">
      <div className="editorial-container">
        
        {/* Header */}
        <div className="border-b border-[#E7E3DA] pb-12 mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <span className="text-[10px] font-mono tracking-[0.3em] uppercase text-[#8A877F] block mb-2">
              The Geographical Atlas
            </span>
            <h1 className="font-editorial text-4xl sm:text-6xl text-[#111111] font-light">
              Iconic Enclaves
            </h1>
          </div>

          <p className="text-xs sm:text-sm text-[#2B2A27] font-light max-w-sm leading-relaxed">
            From the shores of Palm Jumeirah to the green fairways of Dubai Hills, discover the districts defining prime Dubai.
          </p>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap items-center gap-2 mb-12">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`text-xs px-4 py-1.5 transition cursor-pointer ${
                selectedCategory === cat
                  ? 'bg-[#111111] text-white'
                  : 'bg-[#F7F4EC] text-[#111111] border border-[#E7E3DA] hover:border-[#111111]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Communities Editorial Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredCommunities.map((comm) => (
            <div
              key={comm.id}
              onClick={() => navigateToCommunity(comm.id)}
              className="group cursor-pointer bg-white border border-[#E7E3DA] p-6 flex flex-col justify-between transition-all duration-300 hover:border-[#111111]"
            >
              <div>
                <div className="relative aspect-[16/10] overflow-hidden mb-5 bg-[#F7F4EC] border border-[#E7E3DA]">
                  <img
                    src={comm.heroImage}
                    alt={comm.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-104"
                    loading="lazy"
                  />
                  <div className="absolute top-3 left-3 bg-[#111111] text-white text-[9px] font-mono tracking-[0.2em] uppercase px-2.5 py-1">
                    {comm.category}
                  </div>
                </div>

                <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-[#8A877F] block mb-1">
                  Average Price: {comm.stats.averagePriceAED}
                </span>

                <h3 className="font-editorial text-2xl text-[#111111] font-light mb-2">
                  {comm.name}
                </h3>

                <p className="text-xs text-[#2B2A27] font-light leading-relaxed line-clamp-2">
                  {comm.description}
                </p>
              </div>

              <div className="pt-4 mt-6 border-t border-[#E7E3DA] flex items-center justify-between text-xs font-medium uppercase tracking-[0.16em] text-[#111111]">
                <span>Explore Enclave</span>
                <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
};
