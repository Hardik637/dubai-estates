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
  Building,
  Star,
  Quote,
  Calendar,
  Layers,
  ChevronDown,
  Building2,
  Compass,
  FileCheck,
  Briefcase,
  ArrowRight
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

  const handleSearchSubmit = (e: React.FormEvent) => {
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

  const scrollToExplore = () => {
    const el = document.getElementById('firm-overview');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // 3 Curated trophy highlights for editorial showcase on Home
  const trophyHighlights = properties.filter(p => p.featured).slice(0, 3);

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
    <div className="bg-[#fcfbfa] text-[#16191f] overflow-hidden">
      
      {/* ========================================================================= */}
      {/* 01. HERO BANNER: CINEMATIC, PURE LUXURY, NO SEARCH BAR                     */}
      {/* ========================================================================= */}
      <section className="relative h-[92vh] min-h-[700px] max-h-[1050px] flex flex-col justify-between items-center pt-28 sm:pt-32 pb-20 px-4 sm:px-6 lg:px-8 overflow-hidden select-none">
        
        {/* Dynamic Dubai Scenery Slider (Clear, Radiant, No Heavy Scrims) */}
        <div className="absolute inset-0 z-0">
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

          {/* Light cinematic gradient so typography is crystalline while scenery remains vivid */}
          <div className="absolute inset-0 z-10 bg-gradient-to-t from-black/60 via-black/20 to-black/40 pointer-events-none" />
        </div>

        {/* Center Content: Brand Narrative & Grand Typography */}
        <div className="relative z-20 max-w-4xl mx-auto text-center flex flex-col items-center mt-auto mb-auto">
          {/* Subtle Private Office Tag */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-black/40 backdrop-blur-md border border-white/20 text-amber-300 text-[11px] font-semibold tracking-[0.22em] uppercase mb-6 shadow-xl">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>The Private Office • Dubai, UAE</span>
          </div>

          {/* Majestic Headline */}
          <h1 className="font-serif-luxury text-3xl sm:text-5xl lg:text-6xl font-bold text-white tracking-wide leading-[1.15] drop-shadow-[0_4px_18px_rgba(0,0,0,0.8)]">
            Curating Dubai's Most Prestigious Living Spaces
          </h1>

          {/* Refined Tagline */}
          <p className="mt-5 text-sm sm:text-lg text-white/90 font-light max-w-2xl leading-relaxed drop-shadow-[0_2px_10px_rgba(0,0,0,0.8)]">
            Representing sovereign capital, family offices, and discerning individuals in acquiring extraordinary residential architecture across the Emirates.
          </p>

          {/* Minimal Action Triggers */}
          <div className="mt-8 flex flex-col sm:flex-row items-center gap-4">
            <button
              onClick={scrollToExplore}
              className="gold-btn px-8 py-3.5 rounded-full text-xs font-bold tracking-wider uppercase cursor-pointer shadow-xl flex items-center gap-2"
            >
              <span>Explore The Firm</span>
              <ArrowDownIcon className="w-3.5 h-3.5 animate-bounce" />
            </button>
            <button
              onClick={() => {
                setCurrentPage('properties');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="px-7 py-3.5 rounded-full text-xs font-semibold tracking-wider uppercase text-white bg-black/35 hover:bg-black/55 backdrop-blur-md border border-white/30 hover:border-white/60 transition cursor-pointer flex items-center gap-2"
            >
              <span>View Prime Portfolio</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Bottom Bar: Scene Switcher Pills & Scroll Indicator */}
        <div className="relative z-20 w-full max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-white/15">
          {/* Scene Switcher */}
          <div className="flex flex-wrap items-center justify-center gap-2">
            {heroScenes.map((scene, idx) => {
              const isSelected = idx === heroSceneIdx;
              return (
                <button
                  key={scene.title}
                  onClick={() => setHeroSceneIdx(idx)}
                  className={`px-3 py-1 rounded-full text-[11px] font-medium backdrop-blur-md border transition-all duration-300 cursor-pointer flex items-center gap-1.5 ${
                    isSelected 
                      ? 'bg-[#b88d3d] text-white border-[#b88d3d] font-bold shadow-md' 
                      : 'bg-black/30 text-white/80 border-white/15 hover:border-white/40 hover:bg-black/50'
                  }`}
                >
                  <span className={`w-1 h-1 rounded-full ${isSelected ? 'bg-white' : 'bg-amber-400'}`}></span>
                  <span>{scene.title}</span>
                </button>
              );
            })}
          </div>

          {/* Smooth Scroll Cue */}
          <button 
            onClick={scrollToExplore}
            className="flex items-center gap-2 text-white/80 hover:text-white text-xs font-medium tracking-wider uppercase transition cursor-pointer"
          >
            <span>Scroll to Discover</span>
            <ChevronDown className="w-4 h-4 animate-bounce text-amber-300" />
          </button>
        </div>
      </section>


      {/* ========================================================================= */}
      {/* 02. CURTAIN REVEAL: PAGE APPEARS OUT OF THE BOTTOM OF THE HERO BANNER       */}
      {/* ========================================================================= */}
      <div 
        id="firm-overview" 
        className="relative z-20 -mt-16 sm:-mt-24 rounded-t-[36px] sm:rounded-t-[56px] bg-[#f8f6f2] shadow-[0_-30px_70px_rgba(0,0,0,0.35)] border-t border-white/80 pt-8 sm:pt-12 transition-all duration-700"
      >
        {/* Subtle Top Accent Grip Handle */}
        <div className="w-14 h-1.5 rounded-full bg-[#b88d3d]/30 mx-auto mb-10"></div>


        {/* ======================================================================= */}
        {/* 03. PRIVATE PORTFOLIO SEARCH (RELOCATED DOWN FROM HERO BANNER)          */}
        {/* ======================================================================= */}
        <div className="max-w-5xl mx-auto px-4 sm:px-6 mb-20">
          <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-xl border border-[#e8e2d8]">
            {/* Header with Switcher Tabs */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 mb-6 border-b border-[#f0eae1]">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#b88d3d] block mb-1">
                  Private Discovery
                </span>
                <h3 className="font-serif-luxury text-xl font-bold text-[#16191f]">
                  Find Your Dubai Residence
                </h3>
              </div>

              {/* Tabs */}
              <div className="flex items-center gap-1 p-1 bg-[#f4efe9] rounded-xl self-start sm:self-auto">
                {(['Buy', 'Rent', 'Projects'] as const).map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setSearchTab(tab)}
                    className={`px-4 py-1.5 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
                      searchTab === tab
                        ? 'bg-white text-[#16191f] shadow-sm font-bold'
                        : 'text-[#606979] hover:text-[#16191f]'
                    }`}
                  >
                    {tab === 'Buy' ? 'Buy Property' : tab === 'Rent' ? 'Rent Luxury' : 'Off-Plan'}
                  </button>
                ))}
              </div>
            </div>

            {/* Input Row */}
            <form onSubmit={handleSearchSubmit} className="flex flex-col md:flex-row items-center gap-3">
              <div className="relative flex-1 w-full">
                <MapPin className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#b88d3d]" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Location, enclave or development (e.g. Palm Jumeirah, Downtown, Golf Villa)..."
                  className="w-full bg-[#f8f6f2] border border-[#e8e2d8] rounded-xl pl-10 pr-4 py-3 text-xs sm:text-sm text-[#16191f] placeholder-[#8b94a2] focus:outline-none focus:border-[#b88d3d] focus:bg-white transition"
                />
              </div>

              <div className="relative w-full md:w-52">
                <Home className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#b88d3d] pointer-events-none" />
                <select
                  value={selectedType}
                  onChange={(e) => setSelectedType(e.target.value)}
                  className="w-full bg-[#f8f6f2] border border-[#e8e2d8] rounded-xl pl-10 pr-8 py-3 text-xs sm:text-sm text-[#16191f] focus:outline-none focus:border-[#b88d3d] focus:bg-white appearance-none transition cursor-pointer"
                >
                  <option value="All">All Typologies</option>
                  <option value="Villa">Private Villa</option>
                  <option value="Penthouse">Sky Penthouse</option>
                  <option value="Mansion">Golf & Sea Mansion</option>
                  <option value="Apartment">Luxury Residence</option>
                </select>
                <div className="absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none text-[#8b94a2] text-xs">
                  ▼
                </div>
              </div>

              <button
                type="submit"
                className="w-full md:w-auto gold-btn px-8 py-3 rounded-xl text-xs sm:text-sm font-bold flex items-center justify-center gap-2 cursor-pointer shadow-md whitespace-nowrap"
              >
                <Search className="w-4 h-4" />
                <span>Search Portfolio</span>
              </button>
            </form>

            <div className="mt-4 pt-3 flex flex-col sm:flex-row items-center justify-between text-xs text-[#6e7787] gap-2">
              <span className="flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-[#b88d3d]" />
                All listings verified with Dubai Land Department (DLD) title deeds
              </span>
              <button
                onClick={() => {
                  setCurrentPage('properties');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="text-[#b88d3d] hover:underline font-semibold flex items-center gap-1 cursor-pointer"
              >
                <span>Browse with interactive map view</span>
                <ChevronRight className="w-3 h-3" />
              </button>
            </div>
          </div>
        </div>


        {/* ======================================================================= */}
        {/* 04. ABOUT THE FIRM & HERITAGE (THE PRIMARY FOCUS OF HOME)              */}
        {/* ======================================================================= */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 mb-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Narrative */}
            <div className="lg:col-span-6 space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#b88d3d]/10 text-[#9e7529] border border-[#b88d3d]/20 text-[11px] font-bold tracking-widest uppercase">
                <Building2 className="w-3.5 h-3.5" />
                <span>The Private Office & Heritage</span>
              </div>
              
              <h2 className="font-serif-luxury text-3xl sm:text-4xl lg:text-5xl font-bold text-[#16191f] leading-tight">
                A Legacy of Trust, Discretion & Fiduciary Access
              </h2>

              <p className="text-sm sm:text-base text-[#545c6b] leading-relaxed">
                Headquartered in the Dubai International Financial Centre (DIFC), Dubai Estates operates as a bespoke private real estate office representing sovereign families, multinational executives, and global entrepreneurs.
              </p>

              <p className="text-sm sm:text-base text-[#545c6b] leading-relaxed">
                Unlike mass-market agencies, 70% of our portfolio comprises off-market private treaty residences: unlisted waterfront plots on Palm Jumeirah, private island estates, and crown-floor penthouses traded with absolute confidentiality.
              </p>

              <div className="pt-2 flex flex-wrap gap-4">
                <button
                  onClick={() => {
                    setCurrentPage('about');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="px-6 py-3 rounded-full text-xs font-bold bg-[#16191f] text-white hover:bg-[#b88d3d] transition cursor-pointer flex items-center gap-2 shadow-md"
                >
                  <span>Learn About Our Heritage</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => setIsGoldenVisaModalOpen(true)}
                  className="px-6 py-3 rounded-full text-xs font-semibold bg-white text-[#16191f] border border-[#e8e2d8] hover:bg-[#f2eee8] transition cursor-pointer flex items-center gap-2"
                >
                  <Award className="w-3.5 h-3.5 text-[#b88d3d]" />
                  <span>UAE Golden Visa Advisory</span>
                </button>
              </div>
            </div>

            {/* Right: 4 Prestigious Stat Badges */}
            <div className="lg:col-span-6 grid grid-cols-2 gap-5">
              <div className="bg-white rounded-3xl p-6 sm:p-7 border border-[#e8e2d8] shadow-sm hover:shadow-lg transition-all">
                <div className="font-serif-luxury text-3xl sm:text-4xl font-bold text-[#b88d3d] mb-1">
                  AED 14.8B+
                </div>
                <div className="text-xs font-bold uppercase tracking-wider text-[#16191f] mb-1">
                  Transaction Volume
                </div>
                <p className="text-[11px] text-[#6d7685] leading-relaxed">
                  Cumulative private treaty residential acquisitions transacted since 2018.
                </p>
              </div>

              <div className="bg-white rounded-3xl p-6 sm:p-7 border border-[#e8e2d8] shadow-sm hover:shadow-lg transition-all">
                <div className="font-serif-luxury text-3xl sm:text-4xl font-bold text-[#16191f] mb-1">
                  98%
                </div>
                <div className="text-xs font-bold uppercase tracking-wider text-[#16191f] mb-1">
                  Off-Market Discretion
                </div>
                <p className="text-[11px] text-[#6d7685] leading-relaxed">
                  Confidential transfers executed under strict non-disclosure covenants.
                </p>
              </div>

              <div className="bg-white rounded-3xl p-6 sm:p-7 border border-[#e8e2d8] shadow-sm hover:shadow-lg transition-all">
                <div className="font-serif-luxury text-3xl sm:text-4xl font-bold text-[#16191f] mb-1">
                  150+
                </div>
                <div className="text-xs font-bold uppercase tracking-wider text-[#16191f] mb-1">
                  Certified Advisors
                </div>
                <p className="text-[11px] text-[#6d7685] leading-relaxed">
                  RERA and DLD accredited consultants with average 9+ years Dubai expertise.
                </p>
              </div>

              <div className="bg-white rounded-3xl p-6 sm:p-7 border border-[#e8e2d8] shadow-sm hover:shadow-lg transition-all">
                <div className="font-serif-luxury text-3xl sm:text-4xl font-bold text-[#b88d3d] mb-1">
                  10-Day
                </div>
                <div className="text-xs font-bold uppercase tracking-wider text-[#16191f] mb-1">
                  Golden Visa Service
                </div>
                <p className="text-[11px] text-[#6d7685] leading-relaxed">
                  Fast-track family residency processing backed by property title deeds.
                </p>
              </div>
            </div>
          </div>
        </section>


        {/* ======================================================================= */}
        {/* 05. THE 4 PILLARS OF OUR ADVISORY PRACTICE                             */}
        {/* ======================================================================= */}
        <section className="py-16 bg-[#f2eee8] border-y border-[#e8e2d8]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-2xl mx-auto mb-12">
              <div className="inline-flex items-center gap-1.5 text-xs text-[#b88d3d] font-bold tracking-widest uppercase mb-1">
                <Compass className="w-3.5 h-3.5" /> Fiduciary Advisory
              </div>
              <h2 className="font-serif-luxury text-3xl sm:text-4xl font-bold text-[#16191f]">
                What We Do For Discerning Clients
              </h2>
              <p className="text-xs sm:text-sm text-[#606979] mt-2">
                A full-suite institutional advisory engineered to protect capital and maximize lifestyle comfort
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {/* Pillar 1 */}
              <div className="bg-white rounded-2xl p-6 border border-[#e8e2d8] shadow-sm hover:shadow-md transition">
                <div className="w-12 h-12 rounded-xl bg-[#b88d3d]/10 text-[#b88d3d] flex items-center justify-center mb-4">
                  <ShieldCheck className="w-6 h-6" />
                </div>
                <h3 className="font-serif-luxury text-lg font-bold text-[#16191f] mb-2">
                  Off-Market Private Treaty
                </h3>
                <p className="text-xs text-[#545c6b] leading-relaxed">
                  Accessing unlisted penthouses and private beachfront compounds unavailable on portals, negotiated privately between principals.
                </p>
              </div>

              {/* Pillar 2 */}
              <div className="bg-white rounded-2xl p-6 border border-[#e8e2d8] shadow-sm hover:shadow-md transition">
                <div className="w-12 h-12 rounded-xl bg-[#b88d3d]/10 text-[#b88d3d] flex items-center justify-center mb-4">
                  <Award className="w-6 h-6" />
                </div>
                <h3 className="font-serif-luxury text-lg font-bold text-[#16191f] mb-2">
                  10-Year Golden Visa
                </h3>
                <p className="text-xs text-[#545c6b] leading-relaxed">
                  End-to-end liaison with the Dubai Land Department and immigration authorities to secure renewable 10-year residency for your entire family.
                </p>
              </div>

              {/* Pillar 3 */}
              <div className="bg-white rounded-2xl p-6 border border-[#e8e2d8] shadow-sm hover:shadow-md transition">
                <div className="w-12 h-12 rounded-xl bg-[#b88d3d]/10 text-[#b88d3d] flex items-center justify-center mb-4">
                  <Briefcase className="w-6 h-6" />
                </div>
                <h3 className="font-serif-luxury text-lg font-bold text-[#16191f] mb-2">
                  Family Office Concierge
                </h3>
                <p className="text-xs text-[#545c6b] leading-relaxed">
                  SPV corporate establishment, cross-border currency transfers, multi-jurisdiction tax planning, and escrow execution.
                </p>
              </div>

              {/* Pillar 4 */}
              <div className="bg-white rounded-2xl p-6 border border-[#e8e2d8] shadow-sm hover:shadow-md transition">
                <div className="w-12 h-12 rounded-xl bg-[#b88d3d]/10 text-[#b88d3d] flex items-center justify-center mb-4">
                  <TrendingUp className="w-6 h-6" />
                </div>
                <h3 className="font-serif-luxury text-lg font-bold text-[#16191f] mb-2">
                  Turnkey Yield Management
                </h3>
                <p className="text-xs text-[#545c6b] leading-relaxed">
                  Bespoke interior design, DTCM licensed holiday home management, and high-occupancy guest curation delivering 7–10% net yields.
                </p>
              </div>
            </div>
          </div>
        </section>


        {/* ======================================================================= */}
        {/* 06. ARCHITECTURAL TROPHY TEASER (FEATURING ONLY 3 HIGHLIGHTS)          */}
        {/* ======================================================================= */}
        <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 gap-4">
            <div>
              <div className="inline-flex items-center gap-1.5 text-xs text-[#b88d3d] font-bold tracking-widest uppercase mb-1">
                <Sparkles className="w-3.5 h-3.5" /> Curated Architectural Teaser
              </div>
              <h2 className="font-serif-luxury text-3xl sm:text-4xl font-bold text-[#16191f]">
                Trophy Residences of the Season
              </h2>
              <p className="text-xs sm:text-sm text-[#606979] mt-1">
                A private glimpse into our curated collection. Explore all 120+ listings on the dedicated Properties page.
              </p>
            </div>
            
            <button
              onClick={() => {
                setCurrentPage('properties');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-bold bg-[#16191f] text-white hover:bg-[#b88d3d] transition cursor-pointer shadow-sm"
            >
              <span>Explore All Listings</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          {/* 3 Trophy Highlight Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {trophyHighlights.map((property) => (
              <PropertyCard key={property.id} property={property} featured={true} />
            ))}
          </div>

          {/* Big Editorial Banner Directing to Properties Page */}
          <div className="mt-12 p-8 rounded-3xl bg-white border border-[#e8e2d8] shadow-sm flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <span className="text-[10px] uppercase tracking-widest font-bold text-[#b88d3d]">Complete Inventory</span>
              <h3 className="font-serif-luxury text-xl sm:text-2xl font-bold text-[#16191f] mt-0.5">
                Seeking a specific penthouse, beachfront plot, or golf villa?
              </h3>
              <p className="text-xs text-[#606979] mt-1 max-w-xl">
                Our complete inventory includes interactive maps, comprehensive floorplans, high-res photo galleries, and payment plans.
              </p>
            </div>
            <button
              onClick={() => {
                setCurrentPage('properties');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="gold-btn px-8 py-3.5 rounded-full text-xs font-bold uppercase tracking-wider whitespace-nowrap cursor-pointer shadow-md"
            >
              View Full Properties Catalog →
            </button>
          </div>
        </section>


        {/* ======================================================================= */}
        {/* 07. SOVEREIGN DESTINATIONS (COMMUNITIES CAROUSEL)                      */}
        {/* ======================================================================= */}
        <section className="py-20 bg-[#f2eee8] border-y border-[#e8e2d8]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 gap-4">
              <div>
                <div className="inline-flex items-center gap-1.5 text-xs text-[#b88d3d] font-bold tracking-widest uppercase mb-1">
                  <MapPin className="w-3.5 h-3.5" /> Sovereign Enclaves
                </div>
                <h2 className="font-serif-luxury text-3xl sm:text-4xl font-bold text-[#16191f]">
                  Dubai's Most Sought-After Neighborhoods
                </h2>
                <p className="text-xs sm:text-sm text-[#606979] mt-1">
                  Explore iconic master communities from private island living to bustling urban business centers
                </p>
              </div>
              <button
                onClick={() => {
                  setCurrentPage('communities');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="inline-flex items-center gap-1.5 text-xs font-bold text-[#b88d3d] hover:text-[#9e7529] transition group cursor-pointer"
              >
                <span>Explore All Communities</span>
                <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>

            {/* Auto-moving Carousel for Communities */}
            <AutoCarousel 
              intervalMs={4200}
              itemClassName="shrink-0 w-[78vw] sm:w-[290px] lg:w-[320px] snap-start"
            >
              {communities.map((comm) => (
                <div
                  key={comm.id}
                  onClick={() => navigateToCommunity(comm.id)}
                  className="group relative h-96 rounded-2xl overflow-hidden cursor-pointer border border-[#e8e2d8] hover:border-[#b88d3d] transition-all duration-300 shadow-sm hover:shadow-xl"
                >
                  <img
                    src={comm.heroImage}
                    alt={comm.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />

                  {/* Badge */}
                  <div className="absolute top-4 left-4">
                    <span className="px-2.5 py-1 text-[10px] font-bold uppercase rounded-md bg-[#b88d3d] text-white shadow-md">
                      {comm.category}
                    </span>
                  </div>

                  {/* Content */}
                  <div className="absolute bottom-4 left-4 right-4">
                    <div className="text-xs text-amber-300 font-semibold mb-1">
                      {comm.stats.propertiesCount}+ Properties Available
                    </div>
                    <h3 className="font-serif-luxury text-xl font-bold text-white group-hover:text-amber-200 transition-colors">
                      {comm.name}
                    </h3>
                    <div className="mt-2 pt-2 border-t border-white/20 flex items-center justify-between text-xs text-slate-200">
                      <span>Avg: {comm.stats.averagePriceAED.split('-')[0]}</span>
                      <span className="text-emerald-400 font-semibold">{comm.stats.rentalYield} Yield</span>
                    </div>
                  </div>
                </div>
              ))}
            </AutoCarousel>
          </div>
        </section>


        {/* ======================================================================= */}
        {/* 08. EXCLUSIVE OFF-PLAN & BRANDED RESIDENCES (CAROUSEL)                 */}
        {/* ======================================================================= */}
        <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 gap-4">
            <div>
              <div className="inline-flex items-center gap-1.5 text-xs text-[#b88d3d] font-bold tracking-widest uppercase mb-1">
                <Building className="w-3.5 h-3.5" /> Iconic Off-Plan Launches
              </div>
              <h2 className="font-serif-luxury text-3xl sm:text-4xl font-bold text-[#16191f]">
                Branded Residences & Master Developments
              </h2>
              <p className="text-xs sm:text-sm text-[#606979] mt-1">
                VIP investor allocations with flexible payment plans and high capital appreciation potential
              </p>
            </div>
            <button
              onClick={() => {
                setFilters(prev => ({ ...prev, propertyType: 'Penthouse' }));
                setCurrentPage('properties');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="inline-flex items-center gap-1.5 text-xs font-bold text-[#b88d3d] hover:text-[#9e7529] transition group cursor-pointer"
            >
              <span>Explore All Projects</span>
              <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

          <AutoCarousel
            intervalMs={4500}
            itemClassName="shrink-0 w-[82vw] sm:w-[350px] lg:w-[380px] snap-start"
          >
            {offPlanProjects.map((project) => (
              <div
                key={project.id}
                onClick={() => {
                  setFilters(prev => ({ ...prev, keyword: project.title }));
                  setCurrentPage('properties');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="group bg-white rounded-2xl overflow-hidden border border-[#e8e2d8] hover:border-[#b88d3d]/60 transition-all duration-300 shadow-sm hover:shadow-xl cursor-pointer flex flex-col h-full"
              >
                {/* Image banner */}
                <div className="relative h-56 overflow-hidden">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-black/20" />
                  
                  <div className="absolute top-3 left-3 flex gap-2">
                    <span className="px-2.5 py-1 text-[10px] font-bold uppercase rounded-md bg-[#b88d3d] text-white shadow-md">
                      {project.badge}
                    </span>
                    <span className="px-2.5 py-1 text-[10px] font-semibold rounded-md bg-black/60 text-white backdrop-blur-md">
                      {project.developer}
                    </span>
                  </div>

                  <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-xs text-white font-medium">
                    <span className="flex items-center gap-1 text-slate-200">
                      <MapPin className="w-3 h-3 text-[#b88d3d]" />
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
                    <span className="text-[11px] text-[#b88d3d] font-semibold uppercase tracking-wider">
                      {project.type}
                    </span>
                    <h3 className="font-serif-luxury text-lg font-bold text-[#16191f] group-hover:text-[#b88d3d] transition-colors mt-1">
                      {project.title}
                    </h3>
                  </div>

                  <div className="mt-4 pt-3 border-t border-[#f0eae1] flex items-center justify-between">
                    <div>
                      <span className="text-[10px] text-[#8b94a2] block uppercase">Starting From</span>
                      <span className="text-base font-bold text-[#b88d3d]">{project.startingPrice}</span>
                    </div>
                    <div className="text-right">
                      <span className="text-[10px] text-[#8b94a2] block uppercase">Payment Plan</span>
                      <span className="text-xs font-semibold text-[#16191f] px-2 py-0.5 rounded bg-[#f4efe9] border border-[#e8e2d8]">
                        {project.paymentPlan}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </AutoCarousel>
        </section>


        {/* ======================================================================= */}
        {/* 09. DIRECT DEVELOPER PARTNERSHIPS (TIER-1 ALLIANCES)                    */}
        {/* ======================================================================= */}
        <section className="py-12 bg-white border-y border-[#e8e2d8]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <span className="text-[10px] uppercase tracking-[0.25em] font-bold text-[#8b94a2] block mb-6">
              Official Direct Master Developer Partnerships
            </span>
            <div className="flex flex-wrap items-center justify-center gap-8 sm:gap-14 opacity-75">
              {['EMAAR', 'NAKHEEL', 'MERAAS', 'OMNIYAT', 'DAMAC', 'SOBHA REALTY', 'ALDAR', 'ELLINGTON'].map(dev => (
                <span key={dev} className="font-serif-luxury text-base sm:text-lg font-semibold tracking-wider text-[#16191f] hover:text-[#b88d3d] transition-colors">
                  {dev}
                </span>
              ))}
            </div>
          </div>
        </section>


        {/* ======================================================================= */}
        {/* 10. VERIFIED INVESTOR TESTIMONIALS (CAROUSEL)                          */}
        {/* ======================================================================= */}
        <section className="py-20 bg-[#f8f6f2]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-2xl mx-auto mb-12">
              <div className="inline-flex items-center gap-1.5 text-xs text-[#b88d3d] font-bold tracking-widest uppercase mb-1">
                <Quote className="w-3.5 h-3.5" /> Client Endorsements
              </div>
              <h2 className="font-serif-luxury text-3xl sm:text-4xl font-bold text-[#16191f]">
                Trusted by Discerning Global Families
              </h2>
              <p className="text-xs sm:text-sm text-[#606979] mt-2">
                Discover how sovereign wealth, private funds, and luxury homeowners experience our advisory
              </p>
            </div>

            <AutoCarousel
              intervalMs={5200}
              itemClassName="shrink-0 w-[84vw] sm:w-[350px] lg:w-[380px] snap-start"
            >
              {investorTestimonials.map((t) => (
                <div
                  key={t.id}
                  className="bg-white rounded-2xl p-6 border border-[#e8e2d8] shadow-sm flex flex-col justify-between h-full"
                >
                  <div>
                    {/* Rating Stars and Yield Badge */}
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex gap-1 text-[#b88d3d]">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className="w-4 h-4 fill-[#b88d3d]" />
                        ))}
                      </div>
                      <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                        {t.yield}
                      </span>
                    </div>

                    <p className="text-xs sm:text-sm text-[#4a5260] italic leading-relaxed mb-6">
                      "{t.comment}"
                    </p>
                  </div>

                  <div className="pt-4 border-t border-[#f0eae1] flex items-center gap-3">
                    <img
                      src={t.avatar}
                      alt={t.name}
                      className="w-11 h-11 rounded-full object-cover border border-[#b88d3d]"
                    />
                    <div>
                      <h4 className="text-xs font-bold text-[#16191f]">{t.name}</h4>
                      <p className="text-[11px] text-[#b88d3d] font-medium">{t.origin}</p>
                      <p className="text-[10px] text-[#8b94a2] truncate mt-0.5">{t.portfolio}</p>
                    </div>
                  </div>
                </div>
              ))}
            </AutoCarousel>
          </div>
        </section>


        {/* ======================================================================= */}
        {/* 11. PRIVATE INQUIRY & SELLER CONSULTATION BANNER                        */}
        {/* ======================================================================= */}
        <section className="py-20 bg-gradient-to-br from-[#16191f] via-[#1f242e] to-[#16191f] text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col lg:flex-row items-center justify-between gap-10">
            <div>
              <span className="text-[10px] font-bold text-amber-300 uppercase tracking-widest block mb-2">
                Confidential Client Representation
              </span>
              <h2 className="font-serif-luxury text-3xl sm:text-4xl font-bold leading-tight">
                Contemplating Acquiring or Divesting Luxury Assets in Dubai?
              </h2>
              <p className="text-xs sm:text-sm text-slate-300 mt-3 max-w-2xl leading-relaxed">
                Schedule a confidential consultation with a Senior Advisory Partner at our DIFC office, or request an off-market valuation of your prime residence.
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 shrink-0">
              <button
                onClick={() => {
                  setCurrentPage('contact');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="gold-btn px-8 py-3.5 rounded-full text-xs font-bold uppercase tracking-wider shadow-xl cursor-pointer"
              >
                Schedule Private Consultation
              </button>
              <button
                onClick={() => {
                  setCurrentPage('sell');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="px-6 py-3.5 rounded-full text-xs font-semibold text-white bg-white/10 hover:bg-white/20 transition cursor-pointer border border-white/20"
              >
                List Your Property
              </button>
            </div>
          </div>
        </section>

      </div>
    </div>
  );
};

function ArrowDownIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg 
      fill="none" 
      viewBox="0 0 24 24" 
      strokeWidth={2.5} 
      stroke="currentColor" 
      {...props}
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 13.5 12 21m0 0-7.5-7.5M12 21V3" />
    </svg>
  );
}
