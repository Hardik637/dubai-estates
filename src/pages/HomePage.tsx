import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { 
  ChevronRight, 
  ChevronLeft, 
  ArrowRight, 
  CheckCircle2, 
  Sparkles, 
  Building2, 
  Waves, 
  Trees, 
  Compass, 
  ShieldCheck, 
  Award, 
  ArrowUpRight
} from 'lucide-react';

export const HomePage: React.FC = () => {
  const { 
    setCurrentPage, 
    setFilters, 
    setIsEnquiryDrawerOpen,
    setSelectedDrawerProject,
    showToast
  } = useApp();

  // ================= 1. HERO BANNER SLIDER STATE =================
  const [heroIdx, setHeroIdx] = useState(0);

  const heroBanners = [
    {
      id: 'banner-1',
      title: 'THE WOODS',
      subheading: 'Where Wellness Shapes Everyday Living',
      tag: 'Sobha Sanctuary • Meydan',
      image: '/backgrounds/hills_villas.jpg',
      ctaProject: 'The Woods Abode - Sobha Sanctuary',
      linkTarget: 'properties'
    },
    {
      id: 'banner-2',
      title: 'SOBHA HARTLAND II',
      subheading: 'Spaces Where Life Unfolds',
      tag: 'Waterfront Lagoon Living • MBR City',
      image: '/backgrounds/burj_sunset.jpg',
      ctaProject: 'Skyvue Altier - Sobha Hartland II',
      linkTarget: 'communities'
    },
    {
      id: 'banner-3',
      title: 'CAPESIDE MARINA',
      subheading: 'A Maritime Island Sanctuary On The Arabian Gulf',
      tag: 'Siniya Island • Private Yacht Moorings',
      image: '/backgrounds/marina_twilight.jpg',
      ctaProject: 'Capeside Marina Residences - Siniya Island',
      linkTarget: 'properties'
    },
    {
      id: 'banner-4',
      title: 'PALM CROWN MANSIONS',
      subheading: 'A City Planned With Precision & Timeless Luxury',
      tag: 'Palm Jumeirah • Private Beachfront',
      image: '/backgrounds/palm_aerial.jpg',
      ctaProject: 'Palm Jumeirah Crown Mansions',
      linkTarget: 'properties'
    }
  ];

  // Auto-play hero slider every 7s
  useEffect(() => {
    const timer = setInterval(() => {
      setHeroIdx(prev => (prev + 1) % heroBanners.length);
    }, 7000);
    return () => clearInterval(timer);
  }, [heroBanners.length]);

  const handleHeroPrev = () => {
    setHeroIdx(prev => (prev === 0 ? heroBanners.length - 1 : prev - 1));
  };

  const handleHeroNext = () => {
    setHeroIdx(prev => (prev + 1) % heroBanners.length);
  };

  const handleHeroDiscover = (banner: typeof heroBanners[0]) => {
    setSelectedDrawerProject(banner.ctaProject);
    const el = document.getElementById('latest-launches');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // ================= 2. LATEST LAUNCHES SHOWCASE (SOBHA SLIDER) =================
  const [activeLaunchIdx, setActiveLaunchIdx] = useState(0);

  const latestLaunches = [
    {
      id: 'launch-woods-abode',
      title: 'The Woods Abode',
      subtitle: 'Sobha Sanctuary • Meydan',
      badge: 'New Launch 2026',
      price: 'Starting from AED 4,950,000',
      handover: 'Q4 2027',
      paymentPlan: '60/40 Payment Plan',
      image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1400&q=85',
      logoText: 'THE WOODS',
      logoSub: 'ABODE',
      amenities: [
        { label: 'Pool Deck & Lagoon', icon: 'pool' },
        { label: 'Yoga & Meditation Deck', icon: 'yoga' },
        { label: 'Serenity Garden', icon: 'garden' },
        { label: 'Outdoor Fitness Zones', icon: 'gym' }
      ]
    },
    {
      id: 'launch-skyvue',
      title: 'Skyvue Altier',
      subtitle: 'Sobha Hartland II • Ras Al Khor',
      badge: 'Waterfront Tower',
      price: 'Starting from AED 2,400,000',
      handover: 'Q2 2028',
      paymentPlan: '70/30 Payment Plan',
      image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1400&q=85',
      logoText: 'SKYVUE',
      logoSub: 'ALTIER',
      amenities: [
        { label: 'Infinity Leisure Pool', icon: 'pool' },
        { label: 'Open Cinema Area', icon: 'cinema' },
        { label: 'Kids Adventure Park', icon: 'garden' },
        { label: 'Calisthenics Sky Gym', icon: 'gym' }
      ]
    },
    {
      id: 'launch-capeside',
      title: 'Capeside Marina Residences',
      subtitle: 'Sobha Siniya Island • Natural Lagoon',
      badge: 'Island Sanctuary',
      price: 'Starting from AED 3,200,000',
      handover: 'Q1 2028',
      paymentPlan: '60/40 Payment Plan',
      image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1400&q=85',
      logoText: 'CAPESIDE',
      logoSub: 'MARINA RESIDENCES',
      amenities: [
        { label: 'Yacht Club & Mooring', icon: 'yacht' },
        { label: 'Pristine Lagoon Beach', icon: 'pool' },
        { label: '18-Hole Golf Course', icon: 'golf' },
        { label: 'Mangrove Walking Trails', icon: 'garden' }
      ]
    },
    {
      id: 'launch-mirage',
      title: 'The Mirage',
      subtitle: 'Sobha Central • Prime Urban Oasis',
      badge: 'Modern Architecture',
      price: 'Starting from AED 1,850,000',
      handover: 'Q3 2027',
      paymentPlan: '70/30 Payment Plan',
      image: 'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&w=1400&q=85',
      logoText: 'THE MIRAGE',
      logoSub: 'SOBHA CENTRAL',
      amenities: [
        { label: 'Leisure Pool & Cabanas', icon: 'pool' },
        { label: 'Family BBQ & Dining Deck', icon: 'bbq' },
        { label: 'Outdoor Calisthenics', icon: 'gym' },
        { label: 'Picnic Lawn & Courtyard', icon: 'garden' }
      ]
    },
    {
      id: 'launch-seahaven',
      title: 'Sobha SeaHaven',
      subtitle: 'Dubai Harbour • Superyacht Marina',
      badge: 'Ultra Luxury Waterfront',
      price: 'Starting from AED 21,500,000',
      handover: 'Q4 2026',
      paymentPlan: '80/20 Payment Plan',
      image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1400&q=85',
      logoText: 'SOBHA SEAHAVEN',
      logoSub: 'SKY RESIDENCES',
      amenities: [
        { label: 'Private Yacht Berths', icon: 'yacht' },
        { label: 'Infinity Sky Pool 50F', icon: 'pool' },
        { label: 'Panoramic Sea & Ain Dubai', icon: 'cinema' },
        { label: 'Private Helipad Access', icon: 'garden' }
      ]
    }
  ];

  const currentLaunch = latestLaunches[activeLaunchIdx];

  const handleLaunchRegister = (launch: typeof latestLaunches[0]) => {
    setSelectedDrawerProject(`${launch.title} - ${launch.subtitle}`);
    setIsEnquiryDrawerOpen(true);
  };

  // ================= 3. SOVEREIGN COMMUNITIES DATA =================
  const sobhaCommunities = [
    {
      id: 'sobha-hartland',
      name: 'Sobha Hartland & Hartland II',
      tagline: '8 Million Sq. Ft. Waterfront Sanctuary in MBR City',
      startingPrice: 'AED 1.8M',
      propertyCount: '24 Available Residences',
      image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=800&q=80',
      filterVal: 'Sobha Hartland'
    },
    {
      id: 'palm-jumeirah',
      name: 'Palm Jumeirah & Crown Mansions',
      tagline: 'World-Renowned Island of Private Beachfront Palaces',
      startingPrice: 'AED 9.5M',
      propertyCount: '18 Ultra-Luxury Units',
      image: '/backgrounds/palm_aerial.jpg',
      filterVal: 'Palm Jumeirah'
    },
    {
      id: 'siniya-island',
      name: 'Sobha Siniya Island',
      tagline: 'Untouched Natural Mangrove & Marina Island Haven',
      startingPrice: 'AED 3.2M',
      propertyCount: '15 Maritime Suites',
      image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=800&q=80',
      filterVal: 'Siniya Island'
    },
    {
      id: 'downtown-dubai',
      name: 'Downtown Dubai & Opera District',
      tagline: 'The Center of Now with Unrivalled Burj Khalifa Vistas',
      startingPrice: 'AED 3.5M',
      propertyCount: '32 Skyline Penthouses',
      image: '/backgrounds/burj_sunset.jpg',
      filterVal: 'Downtown Dubai'
    },
    {
      id: 'dubai-hills',
      name: 'Dubai Hills Estate & Sanctuary',
      tagline: 'Championship 18-Hole Golf Fairways & Forest Enclaves',
      startingPrice: 'AED 4.2M',
      propertyCount: '20 Modern Mansions',
      image: '/backgrounds/hills_villas.jpg',
      filterVal: 'Dubai Hills Estate'
    },
    {
      id: 'dubai-harbour',
      name: 'Dubai Harbour & SeaHaven',
      tagline: 'The Region’s Most Prestigious Superyacht Marina',
      startingPrice: 'AED 5.1M',
      propertyCount: '12 Waterfront Penthouses',
      image: '/backgrounds/marina_twilight.jpg',
      filterVal: 'Dubai Harbour'
    }
  ];

  // ================= 4. PRESS RELEASES / STORIES DATA =================
  const pressReleases = [
    {
      id: 'pr-1',
      title: 'Project Management Institute and Dubai Estates Partner to Strengthen Project Management Excellence',
      date: '11 Aug 2026',
      badge: 'Corporate Partnership',
      image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=700&q=80'
    },
    {
      id: 'pr-2',
      title: 'Dubai Estates Marks All-Time Delivery Record with 6,819 Units Set for Handover in 2026',
      date: '22 Jul 2026',
      badge: 'Record Deliveries',
      image: 'https://images.unsplash.com/photo-1577495508048-b635879837f1?auto=format&fit=crop&w=700&q=80'
    },
    {
      id: 'pr-3',
      title: 'Dubai Estates and Leading UAE Banks Team Up to Offer Integrated Direct VIP Financing',
      date: '02 Jul 2026',
      badge: 'Financial Services',
      image: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&w=700&q=80'
    },
    {
      id: 'pr-4',
      title: 'Dubai Estates and Keeta Drone Sign Strategic MoU, Launching Autonomous Air Delivery in Communities',
      date: '18 May 2026',
      badge: 'Innovation',
      image: 'https://images.unsplash.com/photo-1508614589041-895b88991e3e?auto=format&fit=crop&w=700&q=80'
    }
  ];

  // ================= 5. NEWSLETTER SIGNUP STATE =================
  const [subscriberEmail, setSubscriberEmail] = useState('');
  const [subscriberName, setSubscriberName] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!subscriberEmail) return;
    setSubscribed(true);
    showToast('Subscribed to Dubai Estates Private Market Intelligence!');
    setSubscriberEmail('');
    setSubscriberName('');
  };

  return (
    <div className="bg-[#1a1310] text-[#f5ede6] overflow-hidden selection:bg-[#c87a50] selection:text-white">
      
      {/* ========================================================================= */}
      {/* SECTION 1: HOMEPAGE HERO BANNER (Sobha .home-banner)                      */}
      {/* ========================================================================= */}
      <section className="relative w-full h-screen min-h-[680px] max-h-[1050px] bg-[#120d0b] overflow-hidden flex items-end sm:items-center">
        
        {/* Background Images with Crossfade */}
        {heroBanners.map((banner, index) => {
          const isActive = index === heroIdx;
          return (
            <div
              key={banner.id}
              className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
                isActive ? 'opacity-100 z-10 scale-100' : 'opacity-0 z-0 scale-105'
              } transform transition-transform duration-[7000ms]`}
            >
              <img
                src={banner.image}
                alt={banner.title}
                className="w-full h-full object-cover object-center filter brightness-[0.80] contrast-[1.05]"
              />
              {/* Deep chocolate tint overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#1a1310] via-black/40 to-black/50" />
            </div>
          );
        })}

        {/* Hero Content Overlay */}
        <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full pb-20 sm:pb-0 pt-28">
          <div className="max-w-3xl space-y-4 sm:space-y-6">
            
            {/* Tag / Community Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#251c17]/80 backdrop-blur-md border border-[#3d2f27] text-[#df8a5e] text-[10px] sm:text-xs font-semibold tracking-[0.2em] uppercase">
              <span className="w-1.5 h-1.5 rounded-full bg-[#c87a50] animate-ping" />
              <span>{heroBanners[heroIdx].tag}</span>
            </div>

            {/* Banner Heading */}
            <h1 className="font-serif-luxury text-4xl sm:text-6xl lg:text-7xl font-bold tracking-[0.12em] text-[#f5ede6] uppercase leading-[1.08] drop-shadow-2xl">
              {heroBanners[heroIdx].title}
            </h1>

            {/* Banner Subheading */}
            <p className="text-base sm:text-xl lg:text-2xl text-[#baa99c] font-light tracking-wide max-w-2xl drop-shadow-md">
              {heroBanners[heroIdx].subheading}
            </p>

            {/* CTA Button: DISCOVER */}
            <div className="pt-2 sm:pt-4 flex items-center gap-4">
              <button
                onClick={() => handleHeroDiscover(heroBanners[heroIdx])}
                className="group inline-flex items-center gap-3 px-8 py-3.5 rounded-full bg-[#251c17]/80 hover:bg-[#c87a50] text-[#f5ede6] border border-[#3d2f27] hover:border-[#c87a50] backdrop-blur-md font-bold text-xs uppercase tracking-[0.25em] transition-all duration-300 shadow-xl cursor-pointer"
              >
                <span>DISCOVER</span>
                <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1.5 transition-transform" />
              </button>

              <button
                onClick={() => {
                  setSelectedDrawerProject(heroBanners[heroIdx].ctaProject);
                  setIsEnquiryDrawerOpen(true);
                }}
                className="hidden sm:inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-[#c87a50] hover:bg-[#b8683b] text-white font-bold text-xs uppercase tracking-[0.2em] transition-all shadow-xl cursor-pointer"
              >
                <span>REGISTER INTEREST</span>
              </button>
            </div>

          </div>
        </div>

        {/* Hero Slider Progress & Navigation Controls */}
        <div className="absolute bottom-6 sm:bottom-10 left-0 right-0 z-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
            
            {/* Slide Indicators */}
            <div className="flex items-center gap-2 sm:gap-3">
              {heroBanners.map((b, idx) => (
                <button
                  key={b.id}
                  onClick={() => setHeroIdx(idx)}
                  className={`h-1.5 rounded-full transition-all duration-500 cursor-pointer ${
                    heroIdx === idx ? 'w-10 sm:w-14 bg-[#c87a50]' : 'w-3 bg-white/30 hover:bg-white/60'
                  }`}
                  aria-label={`Slide ${idx + 1}`}
                />
              ))}
            </div>

            {/* Arrows */}
            <div className="flex items-center gap-2">
              <button
                onClick={handleHeroPrev}
                className="w-10 h-10 rounded-full bg-[#251c17]/80 hover:bg-[#332720] text-[#f5ede6] border border-[#3d2f27] backdrop-blur-md flex items-center justify-center transition cursor-pointer"
                aria-label="Previous Slide"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={handleHeroNext}
                className="w-10 h-10 rounded-full bg-[#251c17]/80 hover:bg-[#332720] text-[#f5ede6] border border-[#3d2f27] backdrop-blur-md flex items-center justify-center transition cursor-pointer"
                aria-label="Next Slide"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>

          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* SECTION 2: THE ART OF THE DETAIL (Sobha .art-of-detail-sec)               */}
      {/* ========================================================================= */}
      <section className="relative py-20 lg:py-32 bg-[#221915] border-b border-[#3d2f27]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            
            {/* Left Column: Brand Signature Copy */}
            <div className="lg:col-span-6 space-y-6 sm:space-y-8">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#df8a5e] via-[#c87a50] to-[#8c4826] flex items-center justify-center text-white shadow-md">
                  <Building2 className="w-5 h-5" />
                </div>
                <span className="text-xs font-bold tracking-[0.3em] uppercase text-[#c87a50]">
                  DUBAI ESTATES SIGNATURE
                </span>
              </div>

              <h2 className="font-serif-luxury text-3xl sm:text-5xl lg:text-6xl font-bold tracking-[0.1em] text-[#f5ede6] uppercase leading-[1.12]">
                The Art of the Detail
              </h2>

              <div className="w-20 h-[2px] bg-[#c87a50]" />

              <p className="text-sm sm:text-base text-[#baa99c] leading-relaxed font-light">
                At Dubai Estates, we understand that true excellence lies in the meticulous attention to detail and the artistry of craftsmanship. Guided by an uncompromising commitment to perfection, we believe in crafting not just residences, but immersive living environments where every architectural line, natural light aperture, and bespoke texture is thoughtfully considered.
              </p>

              <div className="pt-2">
                <button
                  onClick={() => {
                    setCurrentPage('about');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="group inline-flex items-center gap-3 px-8 py-3.5 rounded-full bg-[#18110e] hover:bg-[#c87a50] text-[#f5ede6] border border-[#3d2f27] hover:border-[#c87a50] text-xs font-bold tracking-[0.2em] uppercase transition-all duration-300 shadow-md cursor-pointer"
                >
                  <span>Discover More</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform" />
                </button>
              </div>
            </div>

            {/* Right Column: High-Res Luxury Architectural Photography */}
            <div className="lg:col-span-6 relative">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl border-4 border-[#2b201a]">
                <img
                  src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=85"
                  alt="The Art of the Detail - Dubai Luxury Architecture"
                  className="w-full h-[420px] sm:h-[500px] object-cover hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent" />
                <div className="absolute bottom-6 left-6 right-6 p-4 rounded-xl bg-[#1a1310]/90 backdrop-blur-md border border-[#3d2f27] text-[#f5ede6] flex items-center justify-between">
                  <div>
                    <p className="text-[10px] tracking-[0.2em] uppercase text-[#df8a5e] font-semibold">Master Quality Benchmark</p>
                    <p className="text-sm font-bold font-serif-luxury">Italian Calacatta & Hand-Laid Hardwood</p>
                  </div>
                  <Award className="w-6 h-6 text-[#c87a50]" />
                </div>
              </div>

              {/* Decorative Accent Framing */}
              <div className="absolute -bottom-6 -left-6 w-32 h-32 border-b-2 border-l-2 border-[#c87a50] -z-10 rounded-bl-3xl hidden sm:block opacity-60" />
            </div>

          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* SECTION 3: DEFINING OUR PILLARS (Sobha .new-launch-section)               */}
      {/* ========================================================================= */}
      <section className="py-20 lg:py-28 bg-[#1a1310] border-b border-[#3d2f27]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Section Header with Sobha Lines on Sides */}
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
            <div className="flex items-center justify-center gap-4">
              <div className="h-[1px] w-12 sm:w-20 bg-[#c87a50]/40" />
              <span className="text-[10px] sm:text-xs font-bold tracking-[0.25em] text-[#c87a50] uppercase">
                FROM CONCEPT TO COMPLETION
              </span>
              <div className="h-[1px] w-12 sm:w-20 bg-[#c87a50]/40" />
            </div>
            
            <h2 className="font-serif-luxury text-2xl sm:text-4xl lg:text-5xl font-bold tracking-[0.08em] text-[#f5ede6] uppercase leading-tight">
              Defining Our Pillars
            </h2>
            <p className="text-xs sm:text-sm text-[#baa99c] max-w-xl mx-auto font-light leading-relaxed">
              Every master planned enclave is governed by our three unyielding standards of architectural excellence.
            </p>
          </div>

          {/* 3 Pillars Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            
            {/* Pillar 1: Craftsmanship */}
            <div className="group bg-[#251c17] rounded-2xl overflow-hidden border border-[#3d2f27] hover:border-[#523f35] shadow-lg transition-all duration-300 flex flex-col">
              <div className="h-64 overflow-hidden relative">
                <img
                  src="https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=800&q=80"
                  alt="Craftsmanship"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 brightness-95"
                />
                <div className="absolute top-4 left-4 px-3 py-1 rounded-full bg-black/60 backdrop-blur-md text-[#df8a5e] text-[10px] font-bold tracking-widest uppercase">
                  Pillar 01
                </div>
              </div>
              <div className="p-6 sm:p-8 flex-1 flex flex-col justify-between space-y-4">
                <div>
                  <h3 className="font-serif-luxury text-xl sm:text-2xl font-bold text-[#f5ede6] tracking-wide mb-2">
                    Craftsmanship
                  </h3>
                  <p className="text-xs sm:text-sm text-[#baa99c] leading-relaxed font-light">
                    When building a home, attention to detail is essential. Dubai Estates recognizes this, and we inspect every nuance—whether it's the quality of the materials, bespoke joinery, bookmatched Italian marble, solid core acoustic doors, or precision sanitary fittings. A true craftsman for a harmonious life.
                  </p>
                </div>
                <div className="pt-2 flex items-center text-xs font-bold text-[#df8a5e] uppercase tracking-wider gap-1.5 group-hover:translate-x-1 transition-transform">
                  <span>Explore Standard</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </div>
              </div>
            </div>

            {/* Pillar 2: Thoughtful Design */}
            <div className="group bg-[#251c17] rounded-2xl overflow-hidden border border-[#3d2f27] hover:border-[#523f35] shadow-lg transition-all duration-300 flex flex-col">
              <div className="h-64 overflow-hidden relative">
                <img
                  src="https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=800&q=80"
                  alt="Thoughtful Design"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 brightness-95"
                />
                <div className="absolute top-4 left-4 px-3 py-1 rounded-full bg-black/60 backdrop-blur-md text-[#df8a5e] text-[10px] font-bold tracking-widest uppercase">
                  Pillar 02
                </div>
              </div>
              <div className="p-6 sm:p-8 flex-1 flex flex-col justify-between space-y-4">
                <div>
                  <h3 className="font-serif-luxury text-xl sm:text-2xl font-bold text-[#f5ede6] tracking-wide mb-2">
                    Thoughtful Design
                  </h3>
                  <p className="text-xs sm:text-sm text-[#baa99c] leading-relaxed font-light">
                    At Dubai Estates, home design is not just a structure; it's a beautiful piece of art. Residences that are spacious with well-utilized floorplates, biophilic inner light-wells, private sky pools, and curated panoramic sightlines. We consider every stage of planning to ensure thoughtful, enduring design.
                  </p>
                </div>
                <div className="pt-2 flex items-center text-xs font-bold text-[#df8a5e] uppercase tracking-wider gap-1.5 group-hover:translate-x-1 transition-transform">
                  <span>Explore Standard</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </div>
              </div>
            </div>

            {/* Pillar 3: Signature Quality */}
            <div className="group bg-[#251c17] rounded-2xl overflow-hidden border border-[#3d2f27] hover:border-[#523f35] shadow-lg transition-all duration-300 flex flex-col">
              <div className="h-64 overflow-hidden relative">
                <img
                  src="https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=800&q=80"
                  alt="Signature Quality"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 brightness-95"
                />
                <div className="absolute top-4 left-4 px-3 py-1 rounded-full bg-black/60 backdrop-blur-md text-[#df8a5e] text-[10px] font-bold tracking-widest uppercase">
                  Pillar 03
                </div>
              </div>
              <div className="p-6 sm:p-8 flex-1 flex flex-col justify-between space-y-4">
                <div>
                  <h3 className="font-serif-luxury text-xl sm:text-2xl font-bold text-[#f5ede6] tracking-wide mb-2">
                    Signature Quality
                  </h3>
                  <p className="text-xs sm:text-sm text-[#baa99c] leading-relaxed font-light">
                    We are involved in every stage of the lifecycle, from developer compliance and materials vetting to turnkey handover. Every residence we represent is subjected to rigorous quality inspections, giving complete control, transparency, and assurance over your generational investment.
                  </p>
                </div>
                <div className="pt-2 flex items-center text-xs font-bold text-[#df8a5e] uppercase tracking-wider gap-1.5 group-hover:translate-x-1 transition-transform">
                  <span>Explore Standard</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </div>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* SECTION 4: EXPLORE OUR LUXURY PROPERTIES (Sobha .latest-launch-section)   */}
      {/* ========================================================================= */}
      <section id="latest-launches" className="py-20 lg:py-28 bg-[#221915] border-b border-[#3d2f27]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Section Header */}
          <div className="text-center max-w-3xl mx-auto mb-10 space-y-3">
            <div className="flex items-center justify-center gap-4">
              <div className="h-[1px] w-12 sm:w-20 bg-[#c87a50]/40" />
              <span className="text-[10px] sm:text-xs font-bold tracking-[0.25em] text-[#c87a50] uppercase">
                FEATURED RESIDENCES & NEW LAUNCHES
              </span>
              <div className="h-[1px] w-12 sm:w-20 bg-[#c87a50]/40" />
            </div>

            <h2 className="font-serif-luxury text-2xl sm:text-4xl lg:text-5xl font-bold tracking-[0.08em] text-[#f5ede6] uppercase leading-tight">
              Explore Our Luxury Properties in the UAE
            </h2>
          </div>

          {/* Project Tabs / Switcher */}
          <div className="flex items-center justify-start sm:justify-center gap-2 overflow-x-auto pb-4 mb-8 no-scrollbar">
            {latestLaunches.map((item, idx) => {
              const isSelected = idx === activeLaunchIdx;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveLaunchIdx(idx)}
                  className={`px-4 sm:px-5 py-2 rounded-full text-xs font-bold tracking-wider uppercase transition-all duration-300 whitespace-nowrap cursor-pointer ${
                    isSelected
                      ? 'bg-[#c87a50] text-white shadow-md'
                      : 'bg-[#2b201a] text-[#baa99c] hover:bg-[#332720]'
                  }`}
                >
                  {item.title}
                </button>
              );
            })}
          </div>

          {/* Active Launch Card (Sobha .latest-launch-slide-box) */}
          <div className="bg-[#261d18] rounded-3xl overflow-hidden border border-[#3d2f27] shadow-2xl">
            
            {/* Launch Banner Render */}
            <div className="relative h-[340px] sm:h-[460px] lg:h-[520px] overflow-hidden group">
              <img
                src={currentLaunch.image}
                alt={currentLaunch.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#1a1310] via-black/40 to-transparent" />
              
              {/* Top Launch Badge */}
              <div className="absolute top-6 left-6 flex items-center gap-2">
                <span className="px-3.5 py-1.5 rounded-full bg-[#c87a50] text-white text-[11px] font-bold tracking-widest uppercase shadow-md">
                  {currentLaunch.badge}
                </span>
                <span className="px-3.5 py-1.5 rounded-full bg-[#1a1310]/70 backdrop-blur-md text-[#f5ede6] text-[11px] font-medium tracking-wide border border-[#3d2f27]">
                  {currentLaunch.handover}
                </span>
              </div>

              {/* Price Tag Overlay */}
              <div className="absolute top-6 right-6 px-4 py-2 rounded-full bg-[#1a1310]/85 backdrop-blur-md text-[#f5ede6] border border-[#3d2f27] text-xs font-bold shadow-lg">
                {currentLaunch.price}
              </div>

              {/* Bottom Project Title and Subtitle */}
              <div className="absolute bottom-6 left-6 right-6 sm:bottom-10 sm:left-10 sm:right-10 flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4">
                <div>
                  <p className="text-xs uppercase tracking-[0.25em] text-[#df8a5e] font-semibold mb-1">
                    {currentLaunch.subtitle}
                  </p>
                  <h3 className="font-serif-luxury text-3xl sm:text-5xl font-bold text-[#f5ede6] uppercase tracking-wider">
                    {currentLaunch.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-[#baa99c] font-light mt-1">
                    {currentLaunch.paymentPlan}
                  </p>
                </div>

                <div className="flex items-center gap-3">
                  <button
                    onClick={() => handleLaunchRegister(currentLaunch)}
                    className="px-6 py-3 rounded-full bg-[#c87a50] hover:bg-[#b8683b] text-white text-xs font-bold tracking-[0.2em] uppercase transition shadow-lg cursor-pointer"
                  >
                    Register Interest
                  </button>
                  <button
                    onClick={() => {
                      setFilters(prev => ({ ...prev, keyword: currentLaunch.title }));
                      setCurrentPage('properties');
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className="p-3 rounded-full bg-[#3d2f27]/80 hover:bg-[#c87a50] text-[#f5ede6] hover:text-white backdrop-blur-md transition cursor-pointer border border-[#523f35]"
                    title="View Property Details"
                  >
                    <ArrowUpRight className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>

            {/* Launch Amenities Row (Sobha .launch-amenitites-container) */}
            <div className="p-6 sm:p-8 bg-[#1e1613] border-t border-[#3d2f27]">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
                
                {/* Project Logo/Monogram Box */}
                <div className="lg:col-span-3 border-b lg:border-b-0 lg:border-r border-[#3d2f27] pb-4 lg:pb-0 lg:pr-6 text-center lg:text-left">
                  <div className="font-serif-luxury text-xl sm:text-2xl font-bold tracking-[0.18em] text-[#f5ede6] uppercase leading-tight">
                    {currentLaunch.logoText}
                  </div>
                  <span className="text-[10px] tracking-[0.25em] uppercase text-[#c87a50] font-bold">
                    {currentLaunch.logoSub}
                  </span>
                </div>

                {/* 4 Amenity Badges */}
                <div className="lg:col-span-9 grid grid-cols-2 sm:grid-cols-4 gap-4">
                  {currentLaunch.amenities.map((amenity, i) => (
                    <div 
                      key={i}
                      className="p-3.5 rounded-xl bg-[#261d18] border border-[#3d2f27] flex items-center gap-3 shadow-xs hover:border-[#c87a50] transition-colors"
                    >
                      <div className="w-8 h-8 rounded-lg bg-[#c87a50]/15 text-[#df8a5e] flex items-center justify-center flex-shrink-0">
                        {amenity.icon === 'pool' && <Waves className="w-4 h-4" />}
                        {amenity.icon === 'yoga' && <Sparkles className="w-4 h-4" />}
                        {amenity.icon === 'garden' && <Trees className="w-4 h-4" />}
                        {amenity.icon === 'gym' && <Award className="w-4 h-4" />}
                        {amenity.icon === 'yacht' && <Compass className="w-4 h-4" />}
                        {amenity.icon === 'cinema' && <Building2 className="w-4 h-4" />}
                        {amenity.icon === 'golf' && <Trees className="w-4 h-4" />}
                        {amenity.icon === 'bbq' && <Building2 className="w-4 h-4" />}
                      </div>
                      <span className="text-xs font-semibold text-[#f5ede6] leading-snug">
                        {amenity.label}
                      </span>
                    </div>
                  ))}
                </div>

              </div>
            </div>

          </div>

          {/* Explore All CTA Button (Sobha .view-all button) */}
          <div className="text-center pt-10">
            <button
              onClick={() => {
                setCurrentPage('properties');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full border border-[#c87a50] hover:bg-[#c87a50] text-[#f5ede6] text-xs font-bold tracking-[0.2em] uppercase transition duration-300 cursor-pointer"
            >
              <span>Explore All UAE Developments</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* SECTION 5: MASTER COMMUNITIES (Sobha Communities Showcase)                */}
      {/* ========================================================================= */}
      <section className="py-20 lg:py-28 bg-[#1a1310] border-b border-[#3d2f27]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Section Header */}
          <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 mb-12">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="w-2 h-2 rounded-full bg-[#c87a50]" />
                <span className="text-[11px] font-bold tracking-[0.25em] text-[#c87a50] uppercase">
                  MASTER DEVELOPMENTS
                </span>
              </div>
              <h2 className="font-serif-luxury text-2xl sm:text-4xl lg:text-5xl font-bold tracking-[0.08em] text-[#f5ede6] uppercase leading-tight">
                Our Sovereign Communities
              </h2>
            </div>

            <button
              onClick={() => {
                setCurrentPage('communities');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="inline-flex items-center gap-2 text-xs font-bold tracking-[0.18em] uppercase text-[#f5ede6] hover:text-[#df8a5e] transition cursor-pointer"
            >
              <span>View All Enclaves</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          {/* Communities Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {sobhaCommunities.map((comm) => (
              <div
                key={comm.id}
                onClick={() => {
                  setFilters(prev => ({ ...prev, community: comm.filterVal }));
                  setCurrentPage('properties');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="group relative h-80 sm:h-96 rounded-2xl overflow-hidden shadow-lg cursor-pointer border border-[#3d2f27] hover:border-[#c87a50] transition-colors"
              >
                <img
                  src={comm.image}
                  alt={comm.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 brightness-90"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#140e0c] via-black/40 to-transparent group-hover:from-black/90 transition-colors" />

                {/* Top Badge */}
                <div className="absolute top-4 left-4 px-3 py-1 rounded-full bg-[#1a1310]/70 backdrop-blur-md border border-[#3d2f27] text-[#df8a5e] text-[10px] font-bold tracking-wider uppercase">
                  {comm.propertyCount}
                </div>

                {/* Bottom Content */}
                <div className="absolute bottom-6 left-6 right-6 space-y-2">
                  <p className="text-[10px] tracking-[0.2em] uppercase text-[#df8a5e] font-semibold">
                    Starting from {comm.startingPrice}
                  </p>
                  <h3 className="font-serif-luxury text-xl sm:text-2xl font-bold text-[#f5ede6] tracking-wide leading-snug">
                    {comm.name}
                  </h3>
                  <p className="text-xs text-[#baa99c] font-light line-clamp-2">
                    {comm.tagline}
                  </p>
                  <div className="pt-2 flex items-center gap-1.5 text-xs font-bold text-[#df8a5e] uppercase tracking-wider group-hover:translate-x-1.5 transition-transform">
                    <span>Explore Community</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* SECTION 6: PRESS RELEASES / SOBHA STORIES (Sobha .sobha-stories-sec)      */}
      {/* ========================================================================= */}
      <section className="py-20 lg:py-28 bg-[#221915] border-b border-[#3d2f27]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Section Header */}
          <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
            <div className="flex items-center justify-center gap-4">
              <div className="h-[1px] w-12 sm:w-20 bg-[#c87a50]/40" />
              <span className="text-[10px] sm:text-xs font-bold tracking-[0.25em] text-[#c87a50] uppercase">
                MEDIA & MARKET INTELLIGENCE
              </span>
              <div className="h-[1px] w-12 sm:w-20 bg-[#c87a50]/40" />
            </div>

            <h2 className="font-serif-luxury text-2xl sm:text-4xl lg:text-5xl font-bold tracking-[0.08em] text-[#f5ede6] uppercase leading-tight">
              Press Releases
            </h2>
          </div>

          {/* Stories Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {pressReleases.map((pr) => (
              <div 
                key={pr.id}
                className="group bg-[#261d18] rounded-2xl overflow-hidden border border-[#3d2f27] hover:border-[#523f35] shadow-lg transition-all duration-300 flex flex-col cursor-pointer"
                onClick={() => showToast(`Opening: ${pr.title}`)}
              >
                <div className="h-44 overflow-hidden relative">
                  <img
                    src={pr.image}
                    alt={pr.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 brightness-90"
                  />
                  <div className="absolute top-3 left-3 px-2.5 py-0.5 rounded-full bg-[#1a1310]/70 backdrop-blur-md text-[#df8a5e] text-[9px] font-bold tracking-wider uppercase border border-[#3d2f27]">
                    {pr.badge}
                  </div>
                </div>

                <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
                  <h4 className="text-xs font-bold text-[#f5ede6] leading-snug line-clamp-3 group-hover:text-[#df8a5e] transition-colors">
                    {pr.title}
                  </h4>

                  <div className="pt-2 border-t border-[#3d2f27] flex items-center justify-between text-[11px] text-[#baa99c]">
                    <span>Published on</span>
                    <span className="font-semibold text-[#f5ede6]">{pr.date}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* View All Stories Button */}
          <div className="text-center pt-10">
            <button
              onClick={() => showToast('Opening Dubai Estates Media & Press Center')}
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full border border-[#c87a50] hover:bg-[#c87a50] text-[#f5ede6] text-xs font-bold tracking-[0.2em] uppercase transition duration-300 cursor-pointer"
            >
              <span>View All Releases</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* SECTION 7: VIP INSIDER UPDATES & NEWSLETTER (Sobha Subscription Form)     */}
      {/* ========================================================================= */}
      <section className="py-20 bg-[#160f0c] text-[#f5ede6] relative overflow-hidden border-t border-[#3d2f27]">
        
        {/* Subtle background glow in warm copper */}
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-[#c87a50]/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-[#c87a50]/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#251c17] border border-[#3d2f27] text-[#df8a5e] text-[10px] font-bold tracking-[0.25em] uppercase">
            <Sparkles className="w-3.5 h-3.5 text-[#c87a50]" />
            <span>CONFIDENTIAL ADVISORY</span>
          </div>

          <h2 className="font-serif-luxury text-2xl sm:text-4xl lg:text-5xl font-bold tracking-[0.08em] uppercase text-[#f5ede6]">
            Be the First to Know All Insider Updates
          </h2>

          <p className="text-xs sm:text-sm text-[#baa99c] max-w-xl mx-auto font-light leading-relaxed">
            Join our private investor registry to receive pre-launch allocations, confidential floor plans, and sovereign real estate market intelligence before public release.
          </p>

          {subscribed ? (
            <div className="p-6 bg-[#251c17] border border-[#c87a50] rounded-2xl max-w-md mx-auto space-y-2">
              <CheckCircle2 className="w-8 h-8 text-[#df8a5e] mx-auto" />
              <p className="font-serif-luxury text-base font-bold text-[#f5ede6]">
                You are registered for Private Updates
              </p>
              <p className="text-xs text-[#baa99c]">
                Exclusive previews will be dispatched directly to your inbox.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubscribe} className="max-w-xl mx-auto grid grid-cols-1 sm:grid-cols-12 gap-3 pt-2">
              <div className="sm:col-span-5">
                <input
                  type="text"
                  required
                  placeholder="Your Full Name *"
                  value={subscriberName}
                  onChange={(e) => setSubscriberName(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-[#251c17] border border-[#3d2f27] text-[#f5ede6] placeholder-[#857467] text-xs focus:outline-none focus:border-[#c87a50] transition"
                />
              </div>
              <div className="sm:col-span-4">
                <input
                  type="email"
                  required
                  placeholder="Email Address *"
                  value={subscriberEmail}
                  onChange={(e) => setSubscriberEmail(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-[#251c17] border border-[#3d2f27] text-[#f5ede6] placeholder-[#857467] text-xs focus:outline-none focus:border-[#c87a50] transition"
                />
              </div>
              <div className="sm:col-span-3">
                <button
                  type="submit"
                  className="w-full py-3 px-4 rounded-xl bg-[#c87a50] hover:bg-[#b8683b] text-white font-bold text-xs uppercase tracking-[0.18em] transition shadow-lg cursor-pointer"
                >
                  Subscribe
                </button>
              </div>
            </form>
          )}

          <div className="flex items-center justify-center gap-2 text-[11px] text-[#baa99c] pt-2">
            <ShieldCheck className="w-4 h-4 text-[#c87a50]" />
            <span>Strictly Confidential • No spam • Direct Private Desk</span>
          </div>
        </div>
      </section>

    </div>
  );
};
