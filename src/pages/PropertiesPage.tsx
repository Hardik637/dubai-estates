import React, { useState, useMemo } from 'react';
import { useApp } from '../context/AppContext';
import { PropertyCard } from '../components/PropertyCard';
import { PropertyMap } from '../components/PropertyMap';
import { 
  Filter, 
  RotateCcw, 
  Search, 
  Map as MapIcon, 
  Grid, 
  SlidersHorizontal, 
  ChevronDown,
  Building,
  Check
} from 'lucide-react';

export const PropertiesPage: React.FC = () => {
  const { 
    properties, 
    filters, 
    setFilters, 
    resetFilters, 
    formatPrice 
  } = useApp();

  const [communitySearch, setCommunitySearch] = useState('');
  const [sortBy, setSortBy] = useState<'latest' | 'price-asc' | 'price-desc' | 'sqft'>('latest');
  const [highlightedPropId, setHighlightedPropId] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<'split' | 'grid-only' | 'map-only'>('split');
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  // Available communities in the system
  const allCommunities = [
    'Downtown Dubai',
    'Dubai Marina',
    'Palm Jumeirah',
    'Dubai Hills Estate',
    'Business Bay',
    'Emirates Hills'
  ];

  const filteredCommunities = allCommunities.filter(c => 
    c.toLowerCase().includes(communitySearch.toLowerCase())
  );

  const amenitiesList = [
    'Private Swimming Pool',
    'Gym',
    'Beach Access',
    'Burj Khalifa View',
    '24/7 Security',
    'Smart Home Automation',
    'Maid Room'
  ];

  // Filtering logic
  const filteredProperties = useMemo(() => {
    return properties.filter((prop) => {
      // Listing type
      if (filters.listingType !== 'All' && prop.listingType !== filters.listingType) {
        return false;
      }
      // Keyword
      if (filters.keyword) {
        const q = filters.keyword.toLowerCase();
        const matchesTitle = prop.title.toLowerCase().includes(q);
        const matchesComm = prop.community.toLowerCase().includes(q);
        const matchesDev = prop.developer?.toLowerCase().includes(q);
        if (!matchesTitle && !matchesComm && !matchesDev) return false;
      }
      // Property type
      if (filters.propertyType !== 'All' && prop.propertyType !== filters.propertyType) {
        return false;
      }
      // Community
      if (filters.community !== 'All' && prop.community !== filters.community) {
        return false;
      }
      // Price range
      if (prop.priceAED < filters.minPrice || prop.priceAED > filters.maxPrice) {
        return false;
      }
      // Bedrooms
      if (filters.bedrooms !== 'All') {
        const bedNum = parseInt(filters.bedrooms);
        if (filters.bedrooms === '4+' ? prop.bedrooms < 4 : prop.bedrooms !== bedNum) {
          return false;
        }
      }
      // Amenities
      if (filters.amenities.length > 0) {
        const hasAll = filters.amenities.every(amenity => 
          prop.amenities.some(a => a.toLowerCase().includes(amenity.toLowerCase()))
        );
        if (!hasAll) return false;
      }

      return true;
    }).sort((a, b) => {
      if (sortBy === 'price-asc') return a.priceAED - b.priceAED;
      if (sortBy === 'price-desc') return b.priceAED - a.priceAED;
      if (sortBy === 'sqft') return b.areaSqFt - a.areaSqFt;
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    });
  }, [properties, filters, sortBy]);

  const handleToggleAmenity = (amenity: string) => {
    setFilters(prev => ({
      ...prev,
      amenities: prev.amenities.includes(amenity)
        ? prev.amenities.filter(a => a !== amenity)
        : [...prev.amenities, amenity]
    }));
  };

  return (
    <div className="min-h-screen bg-transparent pt-24 sm:pt-28 pb-20">
      <div className="max-w-[1720px] mx-auto px-4 sm:px-6 lg:px-8">


        
        {/* Top Header matching Figma 02 */}
        <div className="flex flex-col md:flex-row md:items-center justify-between pb-6 mb-6 border-b border-[#e8e2d8] gap-4">
          <div>
            <h1 className="font-serif-luxury text-2xl sm:text-3xl font-bold text-[#16191f] flex items-center gap-3">
              <span>Properties {filters.listingType === 'All' ? 'in Dubai' : `${filters.listingType} in Dubai`}</span>
              <span className="text-xs px-2.5 py-1 rounded-full bg-[#b88d3d]/10 text-[#9e7529] border border-[#b88d3d]/25 font-sans font-semibold">
                {filteredProperties.length} Properties
              </span>
            </h1>
            <p className="text-xs text-[#606979] mt-1">
              Real-time verified inventory with live GPS map coordinates
            </p>
          </div>

          {/* Controls: View toggle (Split / Grid / Map) & Sort */}
          <div className="flex items-center gap-3">
            {/* View Mode Toggle */}
            <div className="hidden lg:flex bg-white p-1 rounded-xl border border-[#e8e2d8] text-xs shadow-sm">
              <button
                onClick={() => setViewMode('split')}
                className={`px-3 py-1.5 rounded-lg font-semibold transition cursor-pointer flex items-center gap-1.5 ${
                  viewMode === 'split' ? 'bg-[#16191f] text-white shadow' : 'text-[#606979] hover:text-[#16191f]'
                }`}
              >
                <SlidersHorizontal className="w-3.5 h-3.5" />
                <span>Split View</span>
              </button>
              <button
                onClick={() => setViewMode('grid-only')}
                className={`px-3 py-1.5 rounded-lg font-semibold transition cursor-pointer flex items-center gap-1.5 ${
                  viewMode === 'grid-only' ? 'bg-[#16191f] text-white shadow' : 'text-[#606979] hover:text-[#16191f]'
                }`}
              >
                <Grid className="w-3.5 h-3.5" />
                <span>Grid Only</span>
              </button>
              <button
                onClick={() => setViewMode('map-only')}
                className={`px-3 py-1.5 rounded-lg font-semibold transition cursor-pointer flex items-center gap-1.5 ${
                  viewMode === 'map-only' ? 'bg-[#16191f] text-white shadow' : 'text-[#606979] hover:text-[#16191f]'
                }`}
              >
                <MapIcon className="w-3.5 h-3.5" />
                <span>Map Only</span>
              </button>
            </div>

            {/* Mobile Filter Toggle */}
            <button
              onClick={() => setMobileFilterOpen(!mobileFilterOpen)}
              className="lg:hidden gold-btn px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-2 cursor-pointer shadow-sm"
            >
              <Filter className="w-4 h-4" />
              <span>Filters ({Object.values(filters).filter(v => v !== 'All' && v !== '' && v !== 0 && v !== 100000000 && (!Array.isArray(v) || v.length > 0)).length})</span>
            </button>

            {/* Sort Dropdown */}
            <div className="flex items-center gap-2">
              <span className="text-xs text-[#606979] hidden sm:inline">Sort by:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="bg-white border border-[#e8e2d8] rounded-xl px-3 py-2 text-xs text-[#16191f] focus:outline-none focus:border-[#b88d3d] cursor-pointer shadow-sm"
              >
                <option value="latest">Latest Added</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="sqft">Largest Size</option>
              </select>
            </div>
          </div>
        </div>

        {/* Main 3-Column Split Layout matching Figma 02 */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          
          {/* LEFT COLUMN: Filters Sidebar matching Figma 02 (Width ~ 3 cols) */}
          <aside className={`lg:col-span-3 bg-white border border-[#e8e2d8] rounded-2xl p-5 space-y-6 shadow-sm ${
            mobileFilterOpen ? 'block' : 'hidden lg:block'
          }`}>
            <div className="flex items-center justify-between pb-3 border-b border-[#f0eae1]">
              <div className="flex items-center gap-2 text-sm font-bold text-[#16191f] font-serif-luxury">
                <Filter className="w-4 h-4 text-[#b88d3d]" />
                <span>FILTER</span>
              </div>
              <button
                onClick={resetFilters}
                className="text-xs text-[#b88d3d] hover:underline flex items-center gap-1 font-semibold cursor-pointer"
              >
                <RotateCcw className="w-3 h-3" /> Reset
              </button>
            </div>

            {/* Listing Type tabs */}
            <div>
              <label className="text-xs font-semibold text-[#16191f] block mb-2">Listing Type</label>
              <div className="grid grid-cols-3 gap-1 bg-[#f4efe9] p-1 rounded-xl border border-[#e8e2d8]">
                {(['All', 'For Sale', 'For Rent'] as const).map(type => (
                  <button
                    key={type}
                    type="button"
                    onClick={() => setFilters(prev => ({ ...prev, listingType: type }))}
                    className={`py-1.5 text-xs font-semibold rounded-lg transition cursor-pointer ${
                      filters.listingType === type
                        ? 'bg-white text-[#16191f] font-bold shadow-sm'
                        : 'text-[#606979] hover:text-[#16191f]'
                    }`}
                  >
                    {type}
                  </button>
                ))}
              </div>
            </div>

            {/* Property Type Radio / Checkboxes matching Figma 02 */}
            <div>
              <label className="text-xs font-semibold text-slate-300 block mb-2">Property Type</label>
              <div className="space-y-1.5">
                {['All', 'Villa', 'Apartment', 'Townhouse', 'Penthouse', 'Mansion'].map(type => (
                  <label 
                    key={type}
                    className={`flex items-center justify-between p-2 rounded-lg cursor-pointer text-xs transition ${
                      filters.propertyType === type ? 'bg-[#b88d3d]/10 text-[#9e7529] font-bold' : 'hover:bg-[#f8f6f2] text-[#3b4352]'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <input 
                        type="radio"
                        name="propType"
                        checked={filters.propertyType === type}
                        onChange={() => setFilters(prev => ({ ...prev, propertyType: type }))}
                        className="accent-[#b88d3d] cursor-pointer"
                      />
                      <span>{type === 'All' ? 'All Property Types' : type}</span>
                    </div>
                  </label>
                ))}
              </div>
            </div>

            {/* Price Range Slider */}
            <div>
              <div className="flex justify-between items-center text-xs font-semibold text-[#16191f] mb-2">
                <span>Price Range</span>
                <span className="text-[#b88d3d] font-bold">
                  {filters.maxPrice >= 100000000 ? 'Any' : formatPrice(filters.maxPrice)}
                </span>
              </div>
              <input
                type="range"
                min={500000}
                max={100000000}
                step={1000000}
                value={filters.maxPrice}
                onChange={(e) => setFilters(prev => ({ ...prev, maxPrice: Number(e.target.value) }))}
                className="w-full h-2 bg-[#e8e2d8] rounded-lg appearance-none cursor-pointer accent-[#b88d3d]"
              />
              <div className="flex justify-between text-[10px] text-[#8b94a2] mt-1">
                <span>AED 0</span>
                <span>AED 50M</span>
                <span>AED 100M+</span>
              </div>
            </div>

            {/* Bedrooms selector pills matching Figma 02 */}
            <div>
              <label className="text-xs font-semibold text-[#16191f] block mb-2">Bedrooms</label>
              <div className="grid grid-cols-5 gap-1.5">
                {['All', '1', '2', '3', '4+'].map(bed => (
                  <button
                    key={bed}
                    type="button"
                    onClick={() => setFilters(prev => ({ ...prev, bedrooms: bed }))}
                    className={`py-1.5 text-xs font-bold rounded-lg border transition cursor-pointer text-center ${
                      filters.bedrooms === bed
                        ? 'bg-[#16191f] text-white border-[#16191f]'
                        : 'border-[#e8e2d8] text-[#3b4352] hover:bg-[#f8f6f2]'
                    }`}
                  >
                    {bed === 'All' ? 'Any' : bed}
                  </button>
                ))}
              </div>
            </div>

            {/* Communities Filter matching Figma 02 with search */}
            <div>
              <label className="text-xs font-semibold text-[#16191f] block mb-2">Communities</label>
              <div className="relative mb-2">
                <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-[#8b94a2]" />
                <input
                  type="text"
                  value={communitySearch}
                  onChange={(e) => setCommunitySearch(e.target.value)}
                  placeholder="Search community..."
                  className="w-full bg-[#f8f6f2] border border-[#e8e2d8] rounded-lg pl-8 pr-3 py-1.5 text-xs text-[#16191f] placeholder-[#8b94a2] focus:outline-none focus:border-[#b88d3d]"
                />
              </div>

              <div className="space-y-1 max-h-36 overflow-y-auto pr-1">
                <button
                  type="button"
                  onClick={() => setFilters(prev => ({ ...prev, community: 'All' }))}
                  className={`w-full text-left px-2 py-1.5 rounded-lg text-xs transition cursor-pointer flex justify-between ${
                    filters.community === 'All' ? 'text-[#b88d3d] font-bold bg-[#b88d3d]/10' : 'text-[#3b4352] hover:bg-[#f8f6f2]'
                  }`}
                >
                  <span>All Communities</span>
                  <span>({properties.length})</span>
                </button>
                {filteredCommunities.map(c => {
                  const count = properties.filter(p => p.community === c).length;
                  return (
                    <button
                      key={c}
                      type="button"
                      onClick={() => setFilters(prev => ({ ...prev, community: c }))}
                      className={`w-full text-left px-2 py-1.5 rounded-lg text-xs transition cursor-pointer flex justify-between ${
                        filters.community === c ? 'text-[#b88d3d] font-bold bg-[#b88d3d]/10' : 'text-[#3b4352] hover:bg-[#f8f6f2]'
                      }`}
                    >
                      <span className="truncate">{c}</span>
                      <span className="text-[#8b94a2]">({count})</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Amenities Checkboxes matching Figma 02 */}
            <div>
              <label className="text-xs font-semibold text-[#16191f] block mb-2">Amenities</label>
              <div className="space-y-1.5">
                {amenitiesList.map(amenity => {
                  const isChecked = filters.amenities.includes(amenity);
                  return (
                    <label 
                      key={amenity}
                      onClick={() => handleToggleAmenity(amenity)}
                      className="flex items-center gap-2 text-xs text-[#3b4352] hover:text-[#16191f] cursor-pointer select-none"
                    >
                      <div className={`w-4 h-4 rounded border flex items-center justify-center transition ${
                        isChecked ? 'bg-[#b88d3d] border-[#b88d3d] text-white' : 'border-[#d4cbbe] bg-white'
                      }`}>
                        {isChecked && <Check className="w-3 h-3 stroke-[3]" />}
                      </div>
                      <span>{amenity}</span>
                    </label>
                  );
                })}
              </div>
            </div>
          </aside>

          {/* CENTER: Property Listings Cards (Width ~ 5 cols in split, or 9 in grid-only) */}
          <main className={`${
            viewMode === 'map-only' 
              ? 'hidden' 
              : viewMode === 'grid-only' 
                ? 'lg:col-span-9' 
                : 'lg:col-span-5'
          } space-y-5`}>
            {filteredProperties.length === 0 ? (
              <div className="bg-white border border-[#e8e2d8] rounded-2xl p-12 text-center shadow-sm">
                <Building className="w-12 h-12 text-[#b88d3d] mx-auto mb-3 opacity-60" />
                <h3 className="text-lg font-bold text-[#16191f] mb-1">No matching properties found</h3>
                <p className="text-xs text-[#606979] mb-4 max-w-sm mx-auto">
                  Try adjusting your price range, property type, or community filters to see more results.
                </p>
                <button
                  onClick={resetFilters}
                  className="gold-btn px-5 py-2 rounded-xl text-xs font-bold cursor-pointer shadow-sm"
                >
                  Reset All Filters
                </button>
              </div>
            ) : (
              <div className={`grid gap-6 ${
                viewMode === 'grid-only' 
                  ? 'grid-cols-1 md:grid-cols-2 xl:grid-cols-3' 
                  : 'grid-cols-1'
              }`}>
                {filteredProperties.map((prop) => (
                  <div 
                    key={prop.id}
                    onMouseEnter={() => setHighlightedPropId(prop.id)}
                    className="transition-transform duration-200"
                  >
                    <PropertyCard property={prop} />
                  </div>
                ))}
              </div>
            )}
          </main>

          {/* RIGHT COLUMN: Interactive Leaflet Map matching Figma 02 (Width ~ 4 cols in split, or 9 in map-only) */}
          <div className={`${
            viewMode === 'grid-only' 
              ? 'hidden' 
              : viewMode === 'map-only' 
                ? 'lg:col-span-9' 
                : 'lg:col-span-4'
          } sticky top-28`}>
            <PropertyMap 
              properties={filteredProperties}
              highlightedPropertyId={highlightedPropId}
              className="h-[750px]"
            />
          </div>

        </div>
      </div>
    </div>
  );
};
