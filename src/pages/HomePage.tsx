import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { PropertyCard } from '../components/PropertyCard';
import { 
  Search, 
  MapPin, 
  Home, 
  ChevronRight, 
  CheckCircle, 
  ShieldCheck, 
  TrendingUp, 
  Award, 
  Sparkles, 
  ArrowUpRight,
  SlidersHorizontal,
  DollarSign
} from 'lucide-react';

export const HomePage: React.FC = () => {
  const { 
    properties, 
    communities, 
    setCurrentPage, 
    setFilters, 
    navigateToCommunity, 
    navigateToProperty, 
    setIsGoldenVisaModalOpen 
  } = useApp();

  const [searchTab, setSearchTab] = useState<'Buy' | 'Rent' | 'Projects'>('Buy');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedType, setSelectedType] = useState('All');
  const [heroSceneIdx, setHeroSceneIdx] = useState(0);

  const heroScenes = [
    {
      title: 'Downtown Dubai',
      subtitle: 'Burj Khalifa & The Dubai Fountain at Golden Sunset',
      image: '/backgrounds/burj_sunset.jpg'
    },
    {
      title: 'Dubai Marina & JBR',
      subtitle: 'Illuminated Skyscraper Canyon & Luxury Yachts',
      image: '/backgrounds/marina_twilight.jpg'
    },
    {
      title: 'Palm Jumeirah',
      subtitle: 'Iconic Palm Island, Atlantis & Turquoise Gulf Waters',
      image: '/backgrounds/palm_aerial.jpg'
    },
    {
      title: 'Dubai Hills Estate',
      subtitle: 'Championship Golf Course Fairways & Modern Mansions',
      image: '/backgrounds/hills_villas.jpg'
    }
  ];

  // Auto-advance scenes smoothly every 6.5s
  React.useEffect(() => {
    const timer = setInterval(() => {
      setHeroSceneIdx(prev => (prev + 1) % heroScenes.length);
    }, 6500);
    return () => clearInterval(timer);
  }, [heroScenes.length]);

  const handleHeroSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setFilters(prev => ({
      ...prev,
      keyword: searchQuery,
      listingType: searchTab === 'Rent' ? 'For Rent' : 'For Sale',
      propertyType: selectedType === 'All' ? 'All' : selectedType
    }));
    setCurrentPage('properties');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Top featured properties matching Figma
  const featuredProperties = properties.filter(p => p.featured).slice(0, 3);

  return (
    <div className="min-h-screen bg-[#0b111e]">
      {/* 01. HERO SECTION WITH CLEAR, VIBRANT DUBAI SCENERY SLIDER */}
      <section className="relative min-h-[800px] lg:min-h-[880px] flex items-center justify-center pt-32 sm:pt-36 pb-24 px-4 sm:px-6 lg:px-8 overflow-hidden">
        
        {/* Crisp, Clear Generated Dubai Scenery (NO Heavy Shadows, 100% Clarity) */}
        <div className="absolute inset-0 z-0 select-none">
          {heroScenes.map((scene, idx) => {
            const isActive = idx === heroSceneIdx;
            return (
              <div
                key={scene.image}
                className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
                  isActive ? 'opacity-100 z-10' : 'opacity-0 z-0'
                }`}
              >
                <img
                  src={scene.image}
                  alt={scene.title}
                  className={`w-full h-full object-cover object-center transition-transform duration-[10000ms] ease-out ${
                    isActive ? 'scale-105' : 'scale-100'
                  }`}
                />
              </div>
            );
          })}

          {/* Very light, natural atmospheric gradient for readability without darkening the skyscrapers */}
          <div className="absolute inset-0 z-10 bg-gradient-to-t from-[#0b111e] via-transparent to-black/30 pointer-events-none" />
        </div>

        {/* Content Container */}
        <div className="relative z-20 max-w-5xl mx-auto text-center flex flex-col items-center">
          {/* VIP Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#0b111e]/80 border border-amber-500/40 text-amber-300 text-xs font-semibold mb-6 backdrop-blur-md shadow-lg">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>Dubai's Premier High-Net-Worth Real Estate Portal</span>
          </div>

          {/* Bold Headline with Crisp Text Shadows for 100% Readability over vibrant sky */}
          <h1 className="font-serif-luxury text-4xl sm:text-6xl lg:text-7xl font-bold text-white tracking-tight leading-[1.1] max-w-4xl drop-shadow-[0_4px_24px_rgba(0,0,0,0.9)]">
            Find Extraordinary <br />
            <span className="gold-gradient-text drop-shadow-[0_4px_24px_rgba(0,0,0,0.9)]">Properties in Dubai</span>
          </h1>

          {/* Subtitle with Shadow */}
          <p className="mt-4 text-base sm:text-lg text-slate-100 max-w-2xl font-medium drop-shadow-[0_2px_12px_rgba(0,0,0,0.95)]">
            12k+ Investment Opportunities • Beachfront Mansions • Burj Khalifa Penthouses • High-Yield Off-Plan
          </p>

          {/* Search Box Card matching Figma 01 */}
          <div className="w-full max-w-3xl mt-10 bg-[#0b111e]/85 backdrop-blur-2xl border border-white/20 rounded-3xl p-3 sm:p-4 shadow-2xl shadow-black/80">
            {/* Search Tabs: Buy, Rent, Find Projects */}
            <div className="flex items-center gap-2 border-b border-white/10 pb-3 mb-3">
              {(['Buy', 'Rent', 'Projects'] as const).map((tab) => (
                <button
                  key={tab}
                  type="button"
                  onClick={() => setSearchTab(tab)}
                  className={`px-5 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-200 cursor-pointer ${
                    searchTab === tab
                      ? 'bg-amber-500 text-slate-950 shadow-md font-bold'
                      : 'text-slate-300 hover:text-white hover:bg-white/5'
                  }`}
                >
                  {tab === 'Projects' ? 'Find Projects' : tab}
                </button>
              ))}
            </div>

            {/* Form Fields matching Figma */}
            <form onSubmit={handleHeroSearch} className="flex flex-col sm:flex-row items-center gap-2.5">
              {/* Location input */}
              <div className="relative flex-1 w-full">
                <MapPin className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-amber-400" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search by location, community or project..."
                  className="w-full bg-[#111a2e]/90 border border-white/10 rounded-2xl pl-10 pr-4 py-3 text-xs sm:text-sm text-white placeholder-slate-400 focus:outline-none focus:border-amber-500 transition"
                />
              </div>

              {/* Property Type Dropdown */}
              <div className="relative w-full sm:w-48">
                <Home className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-amber-400 pointer-events-none" />
                <select
                  value={selectedType}
                  onChange={(e) => setSelectedType(e.target.value)}
                  className="w-full bg-[#111a2e]/90 border border-white/10 rounded-2xl pl-10 pr-8 py-3 text-xs sm:text-sm text-white focus:outline-none focus:border-amber-500 appearance-none transition cursor-pointer"
                >
                  <option value="All">Property Type (All)</option>
                  <option value="Villa">Villa</option>
                  <option value="Apartment">Apartment</option>
                  <option value="Penthouse">Penthouse</option>
                  <option value="Townhouse">Townhouse</option>
                  <option value="Mansion">Mansion</option>
                </select>
                <div className="absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400 text-xs">
                  ▼
                </div>
              </div>

              {/* Search Submit Button */}
              <button
                type="submit"
                className="w-full sm:w-auto gold-btn px-8 py-3 rounded-2xl text-xs sm:text-sm font-bold flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-amber-500/20 whitespace-nowrap"
              >
                <Search className="w-4 h-4" />
                <span>Search</span>
              </button>
            </form>
          </div>

          {/* 4 Stats Badges matching Figma screen 01 */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 mt-12 w-full max-w-4xl">
            <div className="bg-[#0b111e]/85 border border-white/15 rounded-2xl p-4 backdrop-blur-xl shadow-xl">
              <div className="font-serif-luxury text-2xl sm:text-3xl font-bold text-white">12,000+</div>
              <div className="text-xs text-slate-300 mt-0.5">Properties Listed</div>
            </div>
            <div className="bg-[#0b111e]/85 border border-white/15 rounded-2xl p-4 backdrop-blur-xl shadow-xl">
              <div className="font-serif-luxury text-2xl sm:text-3xl font-bold text-amber-400">150+</div>
              <div className="text-xs text-slate-300 mt-0.5">Trusted RERA Agents</div>
            </div>
            <div className="bg-[#0b111e]/85 border border-white/15 rounded-2xl p-4 backdrop-blur-xl shadow-xl">
              <div className="font-serif-luxury text-2xl sm:text-3xl font-bold text-white">50+</div>
              <div className="text-xs text-slate-300 mt-0.5">Communities Covered</div>
            </div>
            <div className="bg-[#0b111e]/85 border border-white/15 rounded-2xl p-4 backdrop-blur-xl shadow-xl">
              <div className="font-serif-luxury text-2xl sm:text-3xl font-bold text-amber-400">98%</div>
              <div className="text-xs text-slate-300 mt-0.5">Client Satisfaction</div>
            </div>
          </div>

          {/* Interactive Scene Switcher Pills at the bottom of hero */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-2">
            {heroScenes.map((scene, idx) => {
              const isSelected = idx === heroSceneIdx;
              return (
                <button
                  key={scene.title}
                  onClick={() => setHeroSceneIdx(idx)}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-semibold backdrop-blur-xl border transition-all duration-300 cursor-pointer flex items-center gap-1.5 ${
                    isSelected 
                      ? 'bg-amber-500 text-slate-950 border-amber-400 font-bold shadow-lg scale-105' 
                      : 'bg-[#0b111e]/70 text-slate-200 border-white/15 hover:border-white/30 hover:bg-[#0b111e]/90'
                  }`}
                >
                  <span className={`w-1.5 h-1.5 rounded-full ${isSelected ? 'bg-slate-950' : 'bg-amber-400'}`}></span>
                  <span>{scene.title}</span>
                </button>
              );
            })}
          </div>

        </div>
      </section>


      {/* 02. FEATURED PROPERTIES SECTION matching Figma screen 01 */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs text-amber-400 font-semibold tracking-wider uppercase mb-1">
              <Sparkles className="w-3.5 h-3.5" /> Curated Prime Portfolio
            </div>
            <h2 className="font-serif-luxury text-3xl sm:text-4xl font-bold text-white">
              Featured Properties
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 mt-1">
              Handpicked luxury residences offering breathtaking vistas and superior investment returns
            </p>
          </div>
          <button
            onClick={() => {
              setCurrentPage('properties');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-amber-400 hover:text-amber-300 transition group cursor-pointer"
          >
            <span>View All Listings</span>
            <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        {/* 3 Featured Cards matching the exact items in Figma screen 01 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredProperties.map((property) => (
            <PropertyCard key={property.id} property={property} featured={true} />
          ))}
        </div>
      </section>

      {/* 03. "LIVE IN DUBAI'S MOST SOUGHT-AFTER COMMUNITIES" matching Figma 01 */}
      <section className="py-20 bg-[#070b14]/75 backdrop-blur-md border-y border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 gap-4">
            <div>
              <div className="inline-flex items-center gap-1.5 text-xs text-amber-400 font-semibold tracking-wider uppercase mb-1">
                <MapPin className="w-3.5 h-3.5" /> Prime Neighborhoods
              </div>
              <h2 className="font-serif-luxury text-3xl sm:text-4xl font-bold text-white">
                Live in Dubai's Most Sought-After Communities
              </h2>
              <p className="text-xs sm:text-sm text-slate-400 mt-1">
                Explore Dubai's iconic destinations from private island living to bustling urban centers
              </p>
            </div>
            <button
              onClick={() => {
                setCurrentPage('communities');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-amber-400 hover:text-amber-300 transition group cursor-pointer"
            >
              <span>Explore All Communities</span>
              <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

          {/* Communities Grid matching Figma 01 (Palm Jumeirah, Downtown Dubai, Dubai Marina, Emirates Hills) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {communities.slice(0, 4).map((comm) => (
              <div
                key={comm.id}
                onClick={() => navigateToCommunity(comm.id)}
                className="group relative h-96 rounded-2xl overflow-hidden cursor-pointer border border-white/10 hover:border-amber-500/50 transition-all duration-300 shadow-xl"
              >
                <img
                  src={comm.heroImage}
                  alt={comm.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0b111e] via-black/40 to-transparent" />

                {/* Badge */}
                <div className="absolute top-4 left-4">
                  <span className="px-2.5 py-1 text-[10px] font-bold uppercase rounded-md bg-amber-500/80 backdrop-blur-md text-slate-950">
                    {comm.category}
                  </span>
                </div>

                {/* Content */}
                <div className="absolute bottom-4 left-4 right-4">
                  <div className="text-xs text-amber-300 font-semibold mb-1">
                    {comm.stats.propertiesCount}+ Properties Available
                  </div>
                  <h3 className="font-serif-luxury text-xl font-bold text-white group-hover:text-amber-300 transition-colors">
                    {comm.name}
                  </h3>
                  <div className="mt-2 pt-2 border-t border-white/15 flex items-center justify-between text-xs text-slate-300">
                    <span>Avg: {comm.stats.averagePriceAED.split('-')[0]}</span>
                    <span className="text-emerald-400 font-semibold">{comm.stats.rentalYield} Yield</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 04. "WHY CHOOSE US" matching Figma screen 01 */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className="inline-flex items-center gap-1.5 text-xs text-amber-400 font-semibold tracking-wider uppercase mb-1">
            <Award className="w-3.5 h-3.5" /> Unmatched Standards
          </div>
          <h2 className="font-serif-luxury text-3xl sm:text-4xl font-bold text-white">
            Why Choose Dubai Estates
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 mt-2">
            The trusted bridge connecting international capital with the United Arab Emirates' most rewarding real estate
          </p>
        </div>

        {/* 4 Pillars matching Figma */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-[#111a2e] border border-white/10 hover:border-amber-500/40 rounded-2xl p-6 transition-all duration-300">
            <div className="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400 mb-4">
              <CheckCircle className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-white mb-1.5">Curated Listings</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Verified properties only. Every title deed, floorplan, and pricing record is cross-checked with the Dubai Land Department (DLD).
            </p>
          </div>

          <div className="bg-[#111a2e] border border-white/10 hover:border-amber-500/40 rounded-2xl p-6 transition-all duration-300">
            <div className="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400 mb-4">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-white mb-1.5">Expert Guidance</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              RERA certified agents with 8+ years average experience guiding acquisitions with discretion, legal clarity, and fiduciary rigor.
            </p>
          </div>

          <div className="bg-[#111a2e] border border-white/10 hover:border-amber-500/40 rounded-2xl p-6 transition-all duration-300">
            <div className="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400 mb-4">
              <TrendingUp className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-white mb-1.5">Market Insights</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Data-driven advice backed by real transaction histories, rental yield metrics (6-10%), and capital appreciation forecasts.
            </p>
          </div>

          <div className="bg-[#111a2e] border border-white/10 hover:border-amber-500/40 rounded-2xl p-6 transition-all duration-300">
            <div className="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400 mb-4">
              <Award className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-white mb-1.5">End-to-End Support</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              From private viewing to ownership deed, bank mortgage approval, currency transfer, and 10-Year Golden Visa residency processing.
            </p>
          </div>
        </div>
      </section>

      {/* 05. CALL TO ACTION BANNER FOR SELLERS */}
      <section className="py-16 bg-gradient-to-r from-[#111a2e]/90 via-[#1a2744]/85 to-[#111a2e]/90 backdrop-blur-md border-y border-amber-500/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-8">

          <div>
            <span className="text-xs font-bold text-amber-400 uppercase tracking-widest">
              Exclusive Seller & Landlord Service
            </span>
            <h2 className="font-serif-luxury text-2xl sm:text-3xl font-bold text-white mt-1">
              Thinking of Selling or Renting Your Dubai Property?
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 mt-2 max-w-xl">
              List with Dubai Estates to gain direct exposure to our vetted international network of cash investors and family offices.
            </p>
          </div>
          <div className="flex gap-4">
            <button
              onClick={() => {
                setCurrentPage('sell');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="gold-btn px-6 py-3 rounded-xl text-xs font-bold shadow-xl cursor-pointer"
            >
              List Your Property Now
            </button>
            <button
              onClick={() => setIsGoldenVisaModalOpen(true)}
              className="px-5 py-3 rounded-xl text-xs font-semibold text-white bg-white/10 hover:bg-white/20 transition cursor-pointer"
            >
              Golden Visa Guide
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
