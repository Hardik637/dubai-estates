import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Search, ChevronDown } from 'lucide-react';

export const FloatingSearch: React.FC = () => {
  const { setFilters, setCurrentPage } = useApp();

  const [listingType, setListingType] = useState<'All' | 'For Sale' | 'For Rent'>('All');
  const [community, setCommunity] = useState('All');
  const [propertyType, setPropertyType] = useState('All');
  const [budgetMax, setBudgetMax] = useState(100000000);

  const communities = [
    { label: 'All Prime Areas', value: 'All' },
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
    { label: 'Any Budget Tier', value: 100000000 },
    { label: 'Under AED 15M', value: 15000000 },
    { label: 'Under AED 35M', value: 35000000 },
    { label: 'Under AED 75M', value: 75000000 },
    { label: 'AED 75M+', value: 100000000 }
  ];

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setFilters(prev => ({
      ...prev,
      listingType: listingType,
      community: community,
      propertyType: propertyType,
      maxPrice: budgetMax
    }));
    setCurrentPage('properties');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <section className="section-cream py-16 sm:py-20 border-b border-[#E7E3DA]">
      <div className="editorial-container">
        <div className="bg-white border border-[#E7E3DA] p-6 sm:p-10 shadow-[0_20px_50px_rgba(0,0,0,0.03)]">
          
          {/* Header Row */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 mb-8 border-b border-[#E7E3DA] gap-4">
            <div>
              <span className="text-[10px] font-mono tracking-[0.35em] uppercase text-[#8A877F] block mb-1">
                INDEX / CURATED DISCOVERY
              </span>
              <h3 className="font-editorial text-2xl sm:text-3xl text-[#111111] font-light">
                Find Your Residence
              </h3>
            </div>

            {/* Buy / Rent / All switchers */}
            <div className="flex items-center gap-1 bg-[#F7F4EC] p-1 border border-[#E7E3DA]">
              {(['All', 'For Sale', 'For Rent'] as const).map(type => (
                <button
                  key={type}
                  type="button"
                  onClick={() => setListingType(type)}
                  className={`text-[10px] font-mono tracking-[0.2em] uppercase px-4 py-1.5 transition-colors cursor-pointer ${
                    listingType === type
                      ? 'bg-[#111111] text-white'
                      : 'text-[#8A877F] hover:text-[#111111]'
                  }`}
                >
                  {type === 'For Sale' ? 'Buy' : type === 'For Rent' ? 'Rent' : 'All'}
                </button>
              ))}
            </div>
          </div>

          {/* Form Filter Row */}
          <form onSubmit={handleSearch} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 items-center">
            
            {/* Area */}
            <div className="relative bg-[#FAF8F3] border border-[#E7E3DA] px-4 py-3">
              <label className="text-[9px] font-mono tracking-[0.2em] uppercase text-[#8A877F] block mb-1">
                Area / Enclave
              </label>
              <select
                value={community}
                onChange={(e) => setCommunity(e.target.value)}
                className="w-full bg-transparent text-xs text-[#111111] font-medium focus:outline-none cursor-pointer pr-4 appearance-none"
              >
                {communities.map(c => (
                  <option key={c.value} value={c.value} className="bg-white text-[#111111]">
                    {c.label}
                  </option>
                ))}
              </select>
              <ChevronDown className="absolute right-3 bottom-3.5 w-3.5 h-3.5 text-[#8A877F] pointer-events-none" />
            </div>

            {/* Typology */}
            <div className="relative bg-[#FAF8F3] border border-[#E7E3DA] px-4 py-3">
              <label className="text-[9px] font-mono tracking-[0.2em] uppercase text-[#8A877F] block mb-1">
                Typology
              </label>
              <select
                value={propertyType}
                onChange={(e) => setPropertyType(e.target.value)}
                className="w-full bg-transparent text-xs text-[#111111] font-medium focus:outline-none cursor-pointer pr-4 appearance-none"
              >
                {propertyTypes.map(t => (
                  <option key={t.value} value={t.value} className="bg-white text-[#111111]">
                    {t.label}
                  </option>
                ))}
              </select>
              <ChevronDown className="absolute right-3 bottom-3.5 w-3.5 h-3.5 text-[#8A877F] pointer-events-none" />
            </div>

            {/* Budget */}
            <div className="relative bg-[#FAF8F3] border border-[#E7E3DA] px-4 py-3">
              <label className="text-[9px] font-mono tracking-[0.2em] uppercase text-[#8A877F] block mb-1">
                Budget Tier
              </label>
              <select
                value={budgetMax}
                onChange={(e) => setBudgetMax(Number(e.target.value))}
                className="w-full bg-transparent text-xs text-[#111111] font-medium focus:outline-none cursor-pointer pr-4 appearance-none"
              >
                {budgetTiers.map(b => (
                  <option key={b.value} value={b.value} className="bg-white text-[#111111]">
                    {b.label}
                  </option>
                ))}
              </select>
              <ChevronDown className="absolute right-3 bottom-3.5 w-3.5 h-3.5 text-[#8A877F] pointer-events-none" />
            </div>

            {/* Search CTA */}
            <button
              type="submit"
              className="btn-editorial-primary w-full justify-center h-full py-4 text-xs font-mono tracking-[0.2em] uppercase cursor-pointer"
            >
              <Search className="w-3.5 h-3.5" />
              <span>Explore Portfolio</span>
            </button>

          </form>

        </div>
      </div>
    </section>
  );
};
