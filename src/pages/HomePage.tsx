import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { PropertyCard } from '../components/PropertyCard';
import { AutoCarousel } from '../components/AutoCarousel';
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
  DollarSign,
  Building,
  Star,
  Quote,
  Calendar,
  Layers
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

  // Luxury featured properties for AutoCarousel
  const featuredProperties = properties.length > 0 ? properties : [];

  // Exclusive Off-Plan Branded Residences
  const offPlanProjects = [
    {
      id: 'off-1',
      title: 'Bulgari Lighthouse Jumeirah Bay',
      developer: 'Meraas',
      community: 'Jumeirah Bay Island',
      startingPrice: 'AED 45,000,000',
      handover: 'Q3 2027',
      paymentPlan: '60/40',
      type: 'Sky Villa & Penthouse',
      image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=85',
      badge: 'Ultra Luxury'
    },
    {
      id: 'off-2',
      title: 'Armani Beach Residences',
      developer: 'Arada',
      community: 'Palm Jumeirah',
      startingPrice: 'AED 21,500,000',
      handover: 'Q4 2026',
      paymentPlan: '70/30',
      type: 'Branded Seafront Suites',
      image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1200&q=85',
      badge: 'Private Beach'
    },
    {
      id: 'off-3',
      title: 'Bugatti Residences by Binghatti',
      developer: 'Binghatti',
      community: 'Business Bay',
      startingPrice: 'AED 19,000,000',
      handover: 'Q4 2026',
      paymentPlan: '70/30',
      type: 'French Riviera Inspired Penthouses',
      image: 'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&w=1200&q=85',
      badge: 'Private Car Lift'
    },
    {
      id: 'off-4',
      title: 'Mercedes-Benz Places',
      developer: 'Binghatti',
      community: 'Downtown Dubai',
      startingPrice: 'AED 8,800,000',
      handover: 'Q2 2027',
      paymentPlan: '70/30',
      type: 'Skyline Luxury Residences',
      image: 'https://images.unsplash.com/photo-1574362848149-11496d93a7c7?auto=format&fit=crop&w=1200&q=85',
      badge: 'Burj Khalifa View'
    },
    {
      id: 'off-5',
      title: 'Palm Flower by Foster + Partners',
      developer: 'Alpago Properties',
      community: 'Palm Jumeirah',
      startingPrice: 'AED 65,000,000',
      handover: 'Q1 2027',
      paymentPlan: '50/50',
      type: 'Full Floor Sky Mansions',
      image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=85',
      badge: 'Exclusive 11 Units'
    },
    {
      id: 'off-6',
      title: 'Sobha Seahaven Sky Edition',
      developer: 'Sobha Realty',
      community: 'Dubai Harbour',
      startingPrice: 'AED 15,200,000',
      handover: 'Q4 2026',
      paymentPlan: '80/20',
      type: 'Ultra-Luxury Seafront Suites',
      image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=85',
      badge: 'Yacht Club Access'
    }
  ];

  // International High-Net-Worth Investor Testimonials
  const investorTestimonials = [
    {
      id: 't-1',
      name: 'Lord Alistair Sterling',
      origin: 'London, United Kingdom',
      portfolio: 'Palm Jumeirah Signature Villa & 3 Downtown Units',
      yield: '8.4% Net ROI',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
      comment: 'Dubai Estates handled our family office acquisition flawlessly. From international currency escrow to Title Deed issuance and 10-Year Golden Visa delivery in under two weeks.'
    },
    {
      id: 't-2',
      name: 'Elena Rostova',
      origin: 'Zurich, Switzerland',
      portfolio: 'Dubai Hills Fairway Villa',
      yield: '9.2% Capital Growth',
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80',
      comment: 'The level of discretion, legal rigor, and fiduciary transparency provided by their RERA advisory team exceeded London and Geneva private banking standards.'
    },
    {
      id: 't-3',
      name: 'Marcus & Chloe Vance',
      origin: 'Singapore',
      portfolio: '2 Waterfront Penthouses at Dubai Marina',
      yield: '7.9% Short-Stay Yield',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80',
      comment: 'Complete turnkey concierge. They oversaw bespoke furnishing, DTCM holiday-home licensing, premium guest placement, and monthly net remittances directly to our account.'
    },
    {
      id: 't-4',
      name: 'Sheikh Tariq Al-Ghamdi',
      origin: 'Riyadh, Saudi Arabia',
      portfolio: 'Commercial & Trophy Penthouse Portfolio',
      yield: '11.4% Total Return',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=200&q=80',
      comment: 'First-class agency for high-capital off-market acquisitions. They secured exclusive developer VIP allocations during private pre-launch phases with zero delay.'
    }
  ];

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
      <section className="py-16 sm:py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 sm:mb-10 gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs text-amber-400 font-semibold tracking-wider uppercase mb-1">
              <Sparkles className="w-3.5 h-3.5" /> Curated Prime Portfolio
            </div>
            <h2 className="font-serif-luxury text-2xl sm:text-4xl font-bold text-white">
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

        {/* Auto-moving Carousel for Featured Properties */}
        <AutoCarousel intervalMs={3600}>
          {featuredProperties.map((property) => (
            <PropertyCard key={property.id} property={property} featured={true} />
          ))}
        </AutoCarousel>
      </section>

      {/* 03. "LIVE IN DUBAI'S MOST SOUGHT-AFTER COMMUNITIES" matching Figma 01 */}
      <section className="py-16 sm:py-20 bg-[#070b14]/75 backdrop-blur-md border-y border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 sm:mb-10 gap-4">
            <div>
              <div className="inline-flex items-center gap-1.5 text-xs text-amber-400 font-semibold tracking-wider uppercase mb-1">
                <MapPin className="w-3.5 h-3.5" /> Prime Neighborhoods
              </div>
              <h2 className="font-serif-luxury text-2xl sm:text-4xl font-bold text-white">
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

          {/* Auto-moving Carousel for Communities */}
          <AutoCarousel 
            intervalMs={4200}
            itemClassName="shrink-0 w-[78vw] sm:w-[280px] lg:w-[310px] snap-start"
          >
            {communities.map((comm) => (
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
          </AutoCarousel>
        </div>
      </section>

      {/* 03B. EXCLUSIVE OFF-PLAN & BRANDED RESIDENCES */}
      <section className="py-16 sm:py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 sm:mb-10 gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs text-amber-400 font-semibold tracking-wider uppercase mb-1">
              <Building className="w-3.5 h-3.5" /> Iconic Off-Plan Launches
            </div>
            <h2 className="font-serif-luxury text-2xl sm:text-4xl font-bold text-white">
              Branded Residences & Master Developments
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 mt-1">
              VIP investor allocations with flexible payment plans and high capital appreciation potential
            </p>
          </div>
          <button
            onClick={() => {
              setFilters(prev => ({ ...prev, propertyType: 'Penthouse' }));
              setCurrentPage('properties');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-amber-400 hover:text-amber-300 transition group cursor-pointer"
          >
            <span>Explore All Projects</span>
            <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        {/* Auto-moving Carousel for Off-Plan Projects */}
        <AutoCarousel
          intervalMs={4500}
          itemClassName="shrink-0 w-[82vw] sm:w-[340px] lg:w-[370px] snap-start"
        >
          {offPlanProjects.map((project) => (
            <div
              key={project.id}
              onClick={() => {
                setFilters(prev => ({ ...prev, keyword: project.title }));
                setCurrentPage('properties');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="group bg-[#111a2e] rounded-2xl overflow-hidden border border-white/10 hover:border-amber-500/50 transition-all duration-300 shadow-xl cursor-pointer flex flex-col h-full"
            >
              {/* Image banner */}
              <div className="relative h-56 overflow-hidden">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#111a2e] via-transparent to-black/30" />
                
                <div className="absolute top-3 left-3 flex gap-2">
                  <span className="px-2.5 py-1 text-[10px] font-bold uppercase rounded-md bg-amber-500 text-slate-950 shadow-md">
                    {project.badge}
                  </span>
                  <span className="px-2.5 py-1 text-[10px] font-semibold rounded-md bg-black/60 text-white backdrop-blur-md border border-white/10">
                    {project.developer}
                  </span>
                </div>

                <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-xs text-white font-medium">
                  <span className="flex items-center gap-1 text-slate-300">
                    <MapPin className="w-3 h-3 text-amber-400" />
                    {project.community}
                  </span>
                  <span className="flex items-center gap-1 text-amber-300 font-semibold">
                    <Calendar className="w-3 h-3" />
                    {project.handover}
                  </span>
                </div>
              </div>

              {/* Body */}
              <div className="p-5 flex-1 flex flex-col justify-between">
                <div>
                  <span className="text-[11px] text-amber-400 font-semibold uppercase tracking-wider">
                    {project.type}
                  </span>
                  <h3 className="font-serif-luxury text-lg font-bold text-white group-hover:text-amber-300 transition-colors mt-1">
                    {project.title}
                  </h3>
                </div>

                <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between">
                  <div>
                    <span className="text-[10px] text-slate-400 block uppercase">Starting From</span>
                    <span className="text-base font-bold text-amber-400">{project.startingPrice}</span>
                  </div>
                  <div className="text-right">
                    <span className="text-[10px] text-slate-400 block uppercase">Payment Plan</span>
                    <span className="text-xs font-semibold text-white px-2 py-0.5 rounded bg-white/5 border border-white/10">
                      {project.paymentPlan}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </AutoCarousel>
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

      {/* 04B. VERIFIED INVESTOR EXPERIENCES CAROUSEL */}
      <section className="py-16 sm:py-20 bg-[#070b14]/75 backdrop-blur-md border-t border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-12">
            <div className="inline-flex items-center gap-1.5 text-xs text-amber-400 font-semibold tracking-wider uppercase mb-1">
              <Quote className="w-3.5 h-3.5" /> High-Net-Worth Advisory
            </div>
            <h2 className="font-serif-luxury text-2xl sm:text-4xl font-bold text-white">
              Trusted by Discerning Global Investors
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 mt-2">
              Discover how international family offices, entrepreneurs, and luxury buyers secure premier assets in Dubai
            </p>
          </div>

          <AutoCarousel
            intervalMs={5200}
            itemClassName="shrink-0 w-[84vw] sm:w-[350px] lg:w-[380px] snap-start"
          >
            {investorTestimonials.map((t) => (
              <div
                key={t.id}
                className="bg-[#111a2e] rounded-2xl p-6 border border-white/10 shadow-xl flex flex-col justify-between h-full"
              >
                <div>
                  {/* Rating Stars and Yield Badge */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex gap-1 text-amber-400">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-amber-400" />
                      ))}
                    </div>
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                      {t.yield}
                    </span>
                  </div>

                  <p className="text-xs sm:text-sm text-slate-300 italic leading-relaxed mb-6">
                    "{t.comment}"
                  </p>
                </div>

                <div className="pt-4 border-t border-white/10 flex items-center gap-3">
                  <img
                    src={t.avatar}
                    alt={t.name}
                    className="w-11 h-11 rounded-full object-cover border border-amber-500/40"
                  />
                  <div>
                    <h4 className="text-xs font-bold text-white">{t.name}</h4>
                    <p className="text-[11px] text-amber-400">{t.origin}</p>
                    <p className="text-[10px] text-slate-400 truncate mt-0.5">{t.portfolio}</p>
                  </div>
                </div>
              </div>
            ))}
          </AutoCarousel>
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
