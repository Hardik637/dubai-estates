import React, { useState, useMemo } from 'react';
import { useApp } from '../context/AppContext';
import { PropertyCard } from '../components/PropertyCard';
import { PropertyMap } from '../components/PropertyMap';
import { 
  Search, 
  RotateCcw, 
  Map as MapIcon, 
  Grid, 
  SlidersHorizontal,
  X
} from 'lucide-react';

export const PropertiesPage: React.FC = () => {
  const { 
    properties, 
    filters, 
    setFilters, 
    resetFilters, 
    formatPrice 
  } = useApp();

  const [sortBy, setSortBy] = useState<'latest' | 'price-asc' | 'price-desc' | 'sqft'>('latest');
  const [viewMode, setViewMode] = useState<'grid' | 'map'>('grid');
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  const allCommunities = [
    'All',
    'Palm Jumeirah',
    'Downtown Dubai',
    'Dubai Hills Estate',
    'Emirates Hills',
    'Dubai Marina',
    'Business Bay'
  ];

  const propertyTypes = ['All', 'Villa', 'Apartment', 'Penthouse', 'Townhouse'];

  // Filtering logic
  const filteredProperties = useMemo(() => {
    return properties.filter((prop) => {
      if (filters.listingType !== 'All' && prop.listingType !== filters.listingType) return false;
      if (filters.propertyType !== 'All' && prop.propertyType !== filters.propertyType) return false;
      if (filters.community !== 'All' && prop.community !== filters.community) return false;
      if (filters.keyword && !prop.title.toLowerCase().includes(filters.keyword.toLowerCase()) && !prop.community.toLowerCase().includes(filters.keyword.toLowerCase())) return false;
      if (prop.priceAED < filters.minPrice || prop.priceAED > filters.maxPrice) return false;
      if (filters.bedrooms !== 'All' && prop.bedrooms < parseInt(filters.bedrooms)) return false;
      return true;
    }).sort((a, b) => {
      if (sortBy === 'price-asc') return a.priceAED - b.priceAED;
      if (sortBy === 'price-desc') return b.priceAED - a.priceAED;
      if (sortBy === 'sqft') return b.areaSqFt - a.areaSqFt;
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    });
  }, [properties, filters, sortBy]);

  return (
    <div className="min-h-screen bg-[#FFFFFF] text-[#111111] pt-28 sm:pt-36 pb-24">
      <div className="editorial-container">
        
        {/* Page Header */}
        <div className="border-b border-[#E7E3DA] pb-12 mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <span className="text-[10px] font-mono tracking-[0.3em] uppercase text-[#8A877F] block mb-2">
              The Marketplace Portfolio
            </span>
            <h1 className="font-editorial text-4xl sm:text-6xl text-[#111111] font-light">
              Available Residences
            </h1>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-xs font-mono text-[#8A877F]">
              Showing {filteredProperties.length} verified listings
            </span>
            <div className="flex border border-[#E7E3DA]">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 transition cursor-pointer ${
                  viewMode === 'grid' ? 'bg-[#111111] text-white' : 'text-[#8A877F] hover:text-[#111111]'
                }`}
                title="Grid View"
              >
                <Grid className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode('map')}
                className={`p-2 transition cursor-pointer ${
                  viewMode === 'map' ? 'bg-[#111111] text-white' : 'text-[#8A877F] hover:text-[#111111]'
                }`}
                title="Map View"
              >
                <MapIcon className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Minimal Editorial Filter Bar */}
        <div className="bg-[#F7F4EC] border border-[#E7E3DA] p-6 mb-12 space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            
            {/* Search Keyword */}
            <div className="relative">
              <label className="text-[10px] font-mono uppercase text-[#8A877F] block mb-1.5">
                Keyword / Address
              </label>
              <div className="flex items-center bg-white border border-[#E7E3DA] px-3 py-2">
                <Search className="w-3.5 h-3.5 text-[#8A877F] mr-2" />
                <input
                  type="text"
                  placeholder="Palm Jumeirah, Villa..."
                  value={filters.keyword}
                  onChange={(e) => setFilters(prev => ({ ...prev, keyword: e.target.value }))}
                  className="w-full text-xs text-[#111111] bg-transparent focus:outline-none"
                />
              </div>
            </div>

            {/* Community Dropdown */}
            <div>
              <label className="text-[10px] font-mono uppercase text-[#8A877F] block mb-1.5">
                Community Enclave
              </label>
              <select
                value={filters.community}
                onChange={(e) => setFilters(prev => ({ ...prev, community: e.target.value }))}
                className="w-full text-xs text-[#111111] bg-white border border-[#E7E3DA] px-3 py-2 focus:outline-none cursor-pointer"
              >
                {allCommunities.map(c => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>

            {/* Property Type */}
            <div>
              <label className="text-[10px] font-mono uppercase text-[#8A877F] block mb-1.5">
                Property Architecture
              </label>
              <select
                value={filters.propertyType}
                onChange={(e) => setFilters(prev => ({ ...prev, propertyType: e.target.value }))}
                className="w-full text-xs text-[#111111] bg-white border border-[#E7E3DA] px-3 py-2 focus:outline-none cursor-pointer"
              >
                {propertyTypes.map(t => (
                  <option key={t} value={t}>{t}</option>
                ))}
              </select>
            </div>

            {/* Sort Order */}
            <div>
              <label className="text-[10px] font-mono uppercase text-[#8A877F] block mb-1.5">
                Sort By
              </label>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="w-full text-xs text-[#111111] bg-white border border-[#E7E3DA] px-3 py-2 focus:outline-none cursor-pointer"
              >
                <option value="latest">Latest Acquired</option>
                <option value="price-desc">Price: Highest to Lowest</option>
                <option value="price-asc">Price: Lowest to Highest</option>
                <option value="sqft">Area (Sq Ft)</option>
              </select>
            </div>

          </div>

          {/* Secondary Filter Row: Listing Type & Reset */}
          <div className="flex flex-wrap items-center justify-between pt-4 border-t border-[#E7E3DA] gap-4">
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-mono uppercase text-[#8A877F] mr-2">Status:</span>
              {(['All', 'For Sale', 'For Rent'] as const).map(type => (
                <button
                  key={type}
                  onClick={() => setFilters(prev => ({ ...prev, listingType: type }))}
                  className={`text-xs px-3 py-1 transition cursor-pointer ${
                    filters.listingType === type
                      ? 'bg-[#111111] text-white'
                      : 'bg-white text-[#111111] border border-[#E7E3DA] hover:border-[#111111]'
                  }`}
                >
                  {type}
                </button>
              ))}
            </div>

            <button
              onClick={resetFilters}
              className="text-xs text-[#8A877F] hover:text-[#111111] flex items-center gap-1.5 transition cursor-pointer"
            >
              <RotateCcw className="w-3 h-3" />
              <span>Reset Filters</span>
            </button>
          </div>
        </div>

        {/* Content View: Grid vs Map */}
        {viewMode === 'grid' ? (
          filteredProperties.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredProperties.map(prop => (
                <PropertyCard key={prop.id} property={prop} />
              ))}
            </div>
          ) : (
            <div className="bg-[#F7F4EC] border border-[#E7E3DA] p-16 text-center space-y-4">
              <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-[#8A877F] block">
                Zero Matches
              </span>
              <h3 className="font-editorial text-2xl text-[#111111]">
                No properties match your current criteria.
              </h3>
              <p className="text-xs text-[#8A877F] max-w-sm mx-auto">
                Try widening your price threshold or clearing your active community filters.
              </p>
              <button
                onClick={resetFilters}
                className="btn-editorial-primary mt-4"
              >
                Reset Search Filters
              </button>
            </div>
          )
        ) : (
          <div className="h-[650px] border border-[#E7E3DA] bg-white overflow-hidden">
            <PropertyMap
              properties={filteredProperties}
              highlightedPropertyId={null}
            />
          </div>
        )}

      </div>
    </div>
  );
};
