import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Search, SlidersHorizontal, ChevronDown } from 'lucide-react';

export const FloatingSearch: React.FC = () => {
  const { setFilters, setCurrentPage } = useApp();

  const [community, setCommunity] = useState('All');
  const [propertyType, setPropertyType] = useState('All');
  const [budgetMax, setBudgetMax] = useState(100000000);

  const communities = [
    { label: 'All Prime Enclaves', value: 'All' },
    { label: 'Palm Jumeirah', value: 'Palm Jumeirah' },
    { label: 'Downtown Dubai', value: 'Downtown Dubai' },
    { label: 'Dubai Hills Estate', value: 'Dubai Hills Estate' },
    { label: 'Dubai Marina', value: 'Dubai Marina' },
    { label: 'Emirates Hills', value: 'Emirates Hills' },
    { label: 'Business Bay', value: 'Business Bay' }
  ];

  const propertyTypes = [
    { label: 'All Typologies', value: 'All' },
    { label: 'Signature Villa', value: 'Villa' },
    { label: 'Sky Penthouse', value: 'Penthouse' },
    { label: 'Luxury Apartment', value: 'Apartment' },
    { label: 'Private Mansion', value: 'Mansion' }
  ];

  const budgetTiers = [
    { label: 'Any Capital Tier', value: 100000000 },
    { label: 'Under AED 15M', value: 15000000 },
    { label: 'Under AED 35M', value: 35000000 },
    { label: 'Under AED 75M', value: 75000000 },
    { label: 'AED 75M+', value: 100000000 }
  ];

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setFilters(prev => ({
      ...prev,
      community: community,
      propertyType: propertyType,
      maxPrice: budgetMax
    }));
    setCurrentPage('properties');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="relative -mt-10 sm:-mt-14 z-20 max-w-6xl mx-auto px-6 sm:px-8">
      <div className="bg-[#121316]/95 backdrop-blur-xl border border-white/10 p-4 sm:p-6 shadow-2xl">
        
        {/* Subtle Eyebrow */}
        <div className="flex items-center justify-between pb-3 sm:pb-4 mb-4 border-b border-white/10 text-[10px] tracking-[0.25em] uppercase text-[#96938a]">
          <span className="flex items-center gap-2">
            <Search className="w-3 h-3 text-[#c4ad8e]" />
            Find An Address
          </span>
          <span className="font-mono text-[#c4ad8e]">RERA Verified Portfolio</span>
        </div>

        {/* Filter Controls Row */}
        <form onSubmit={handleSearch} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 items-center">
          
          {/* Location */}
          <div className="relative bg-[#18191d] border border-white/10 px-4 py-2.5">
            <label className="text-[9px] tracking-[0.2em] uppercase text-[#96938a] block font-semibold mb-0.5">
              Location
            </label>
            <select
              value={community}
              onChange={(e) => setCommunity(e.target.value)}
              className="w-full bg-transparent text-xs text-[#f7f5f0] focus:outline-none cursor-pointer pr-4 appearance-none"
            >
              {communities.map(c => (
                <option key={c.value} value={c.value} className="bg-[#18191d] text-[#f7f5f0]">
                  {c.label}
                </option>
              ))}
            </select>
            <ChevronDown className="absolute right-3 bottom-3 w-3 h-3 text-[#96938a] pointer-events-none" />
          </div>

          {/* Typology */}
          <div className="relative bg-[#18191d] border border-white/10 px-4 py-2.5">
            <label className="text-[9px] tracking-[0.2em] uppercase text-[#96938a] block font-semibold mb-0.5">
              Property Typology
            </label>
            <select
              value={propertyType}
              onChange={(e) => setPropertyType(e.target.value)}
              className="w-full bg-transparent text-xs text-[#f7f5f0] focus:outline-none cursor-pointer pr-4 appearance-none"
            >
              {propertyTypes.map(t => (
                <option key={t.value} value={t.value} className="bg-[#18191d] text-[#f7f5f0]">
                  {t.label}
                </option>
              ))}
            </select>
            <ChevronDown className="absolute right-3 bottom-3 w-3 h-3 text-[#96938a] pointer-events-none" />
          </div>

          {/* Budget Tier */}
          <div className="relative bg-[#18191d] border border-white/10 px-4 py-2.5">
            <label className="text-[9px] tracking-[0.2em] uppercase text-[#96938a] block font-semibold mb-0.5">
              Capital Budget
            </label>
            <select
              value={budgetMax}
              onChange={(e) => setBudgetMax(Number(e.target.value))}
              className="w-full bg-transparent text-xs text-[#f7f5f0] focus:outline-none cursor-pointer pr-4 appearance-none"
            >
              {budgetTiers.map(b => (
                <option key={b.value} value={b.value} className="bg-[#18191d] text-[#f7f5f0]">
                  {b.label}
                </option>
              ))}
            </select>
            <ChevronDown className="absolute right-3 bottom-3 w-3 h-3 text-[#96938a] pointer-events-none" />
          </div>

          {/* Submit Search Button */}
          <button
            type="submit"
            className="editorial-btn-champagne w-full cursor-pointer h-full py-3 sm:py-3.5 flex items-center justify-center gap-2"
          >
            <Search className="w-3.5 h-3.5 text-[#0a0b0d]" />
            <span>Search Portfolio</span>
          </button>

        </form>

      </div>
    </div>
  );
};
