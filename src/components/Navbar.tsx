import React, { useState, useEffect } from 'react';
import { useApp, PageRoute } from '../context/AppContext';
import { Heart, Search, Menu, X, ArrowUpRight } from 'lucide-react';

export const Navbar: React.FC = () => {
  const { 
    currentPage, 
    setCurrentPage, 
    currency, 
    setCurrency, 
    favorites, 
    setIsEnquiryDrawerOpen,
    setSelectedDrawerProject,
    setFilters
  } = useApp();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchModalOpen, setSearchModalOpen] = useState(false);
  const [searchVal, setSearchVal] = useState('');
  const [scrolled, setScrolled] = useState(false);

  // Detect scroll position to switch between hero overlay & solid light state
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Whether current page has dark hero background at the top
  const isDarkHeroPage = currentPage === 'home';
  const showDarkStyles = isDarkHeroPage && !scrolled;

  const navLinks: { label: string; page: PageRoute; action?: () => void }[] = [
    { 
      label: 'Properties', 
      page: 'properties',
      action: () => setFilters(prev => ({ ...prev, listingType: 'All' }))
    },
    { label: 'Communities', page: 'communities' },
    { label: 'Sell With Us', page: 'sell' },
    { label: 'About', page: 'about' },
    { 
      label: 'Journal', 
      page: 'home',
      action: () => {
        if (currentPage !== 'home') {
          setCurrentPage('home');
          setTimeout(() => {
            const el = document.getElementById('journal-section');
            if (el) el.scrollIntoView({ behavior: 'smooth' });
          }, 200);
        } else {
          const el = document.getElementById('journal-section');
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        }
      }
    }
  ];

  const handleNavClick = (link: typeof navLinks[0]) => {
    if (link.action) {
      link.action();
    } else {
      setCurrentPage(link.page);
    }
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchVal.trim()) return;
    setFilters(prev => ({ ...prev, keyword: searchVal.trim() }));
    setCurrentPage('properties');
    setSearchModalOpen(false);
    setSearchVal('');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleEnquireClick = () => {
    setSelectedDrawerProject('Private Acquisition Advisory');
    setIsEnquiryDrawerOpen(true);
  };

  return (
    <>
      <header 
        className={`fixed top-0 left-0 right-0 z-50 w-full transition-all duration-500 ${
          showDarkStyles 
            ? 'bg-gradient-to-b from-black/80 via-black/30 to-transparent py-5 sm:py-6 text-white border-b border-transparent'
            : 'bg-white/95 backdrop-blur-md py-4 sm:py-4.5 text-[#111111] border-b border-[#E7E3DA] shadow-[0_2px_12px_rgba(0,0,0,0.03)]'
        }`}
      >
        <div className="editorial-container flex items-center justify-between">
          
          {/* ================= LEFT: BRAND WORDMARK ================= */}
          <div 
            onClick={() => { setCurrentPage('home'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
            className="cursor-pointer group flex items-center gap-3 select-none"
          >
            {/* Architectural Square Accent */}
            <span className={`w-2.5 h-2.5 transition-transform duration-300 group-hover:scale-125 ${
              showDarkStyles ? 'bg-white' : 'bg-[#111111]'
            }`} />
            
            <div className="flex flex-col">
              <span className={`font-serif-luxury text-base sm:text-lg md:text-xl font-medium tracking-[0.26em] uppercase leading-none transition-colors ${
                showDarkStyles ? 'text-white' : 'text-[#111111]'
              }`}>
                Dubai Estates
              </span>
              <span className={`text-[7px] sm:text-[8px] tracking-[0.38em] uppercase font-mono mt-1 ${
                showDarkStyles ? 'text-white/60' : 'text-[#8A877F]'
              }`}>
                Private Property House
              </span>
            </div>
          </div>

          {/* ================= CENTER: EDITORIAL NAVIGATION ================= */}
          <nav className="hidden lg:flex items-center space-x-8 xl:space-x-11">
            {navLinks.map((link) => {
              const isActive = currentPage === link.page && link.label !== 'Journal';
              return (
                <button
                  key={link.label}
                  onClick={() => handleNavClick(link)}
                  className={`text-[11px] xl:text-xs tracking-[0.2em] uppercase transition-colors duration-200 cursor-pointer relative py-1.5 font-medium ${
                    showDarkStyles
                      ? isActive ? 'text-white' : 'text-white/75 hover:text-white'
                      : isActive ? 'text-[#111111]' : 'text-[#6A6760] hover:text-[#111111]'
                  }`}
                >
                  {link.label}
                  {isActive && (
                    <span className={`absolute bottom-0 left-0 right-0 h-[1.5px] ${
                      showDarkStyles ? 'bg-white' : 'bg-[#111111]'
                    }`} />
                  )}
                </button>
              );
            })}
          </nav>

          {/* ================= RIGHT: UTILITY CONTROLS ================= */}
          <div className="flex items-center space-x-4 sm:space-x-6">
            
            {/* Search Trigger */}
            <button
              onClick={() => setSearchModalOpen(true)}
              className={`flex items-center gap-2 text-[11px] tracking-[0.16em] uppercase font-medium cursor-pointer transition ${
                showDarkStyles ? 'text-white/80 hover:text-white' : 'text-[#6A6760] hover:text-[#111111]'
              }`}
              title="Search Portfolio"
            >
              <Search className="w-3.5 h-3.5" />
              <span className="hidden xl:inline">Search</span>
            </button>

            {/* Saved Properties */}
            <button
              onClick={() => {
                setCurrentPage('dashboard');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className={`flex items-center gap-1.5 text-[11px] tracking-[0.16em] uppercase font-medium cursor-pointer transition relative ${
                showDarkStyles ? 'text-white/80 hover:text-white' : 'text-[#6A6760] hover:text-[#111111]'
              }`}
              title="Saved Collection"
            >
              <Heart className={`w-3.5 h-3.5 ${favorites.length > 0 ? 'fill-current' : ''}`} />
              <span className="hidden xl:inline">Saved</span>
              {favorites.length > 0 && (
                <span className={`text-[9px] font-mono px-1.5 py-0.2 rounded-full ${
                  showDarkStyles ? 'bg-white text-[#111111]' : 'bg-[#111111] text-white'
                }`}>
                  {favorites.length}
                </span>
              )}
            </button>

            {/* Currency Selector */}
            <div className="relative hidden sm:block">
              <select
                value={currency}
                onChange={(e) => setCurrency(e.target.value as any)}
                className={`bg-transparent text-[11px] font-mono uppercase tracking-wider py-1 px-1.5 cursor-pointer focus:outline-none ${
                  showDarkStyles ? 'text-white border-b border-white/30' : 'text-[#111111] border-b border-[#E7E3DA]'
                }`}
              >
                <option value="AED" className="bg-[#111111] text-white">AED</option>
                <option value="USD" className="bg-[#111111] text-white">USD</option>
                <option value="EUR" className="bg-[#111111] text-white">EUR</option>
                <option value="GBP" className="bg-[#111111] text-white">GBP</option>
                <option value="SAR" className="bg-[#111111] text-white">SAR</option>
              </select>
            </div>

            {/* Enquire CTA Button */}
            <button
              onClick={handleEnquireClick}
              className={`hidden md:inline-flex items-center gap-2 text-[10px] xl:text-[11px] font-medium tracking-[0.2em] uppercase py-2 px-4 transition border cursor-pointer ${
                showDarkStyles
                  ? 'border-white/50 text-white hover:bg-white hover:text-[#111111]'
                  : 'border-[#111111] text-[#111111] hover:bg-[#111111] hover:text-white'
              }`}
            >
              <span>Enquire</span>
              <ArrowUpRight className="w-3 h-3" />
            </button>

            {/* Mobile Hamburger Button */}
            <button
              onClick={() => setMobileMenuOpen(true)}
              className={`lg:hidden p-1.5 transition cursor-pointer ${
                showDarkStyles ? 'text-white' : 'text-[#111111]'
              }`}
              aria-label="Open Menu"
            >
              <Menu className="w-5 h-5" />
            </button>

          </div>

        </div>
      </header>

      {/* ================= FULLSCREEN MOBILE MENU ================= */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 bg-[#FFFFFF] text-[#111111] flex flex-col justify-between p-6 sm:p-10 animate-fadeIn">
          {/* Top Bar with Brand & Close */}
          <div className="flex items-center justify-between pb-6 border-b border-[#E7E3DA]">
            <div className="flex items-center gap-2.5">
              <span className="w-2.5 h-2.5 bg-[#111111]" />
              <span className="font-serif-luxury text-base tracking-[0.24em] uppercase font-semibold">
                Dubai Estates
              </span>
            </div>
            <button
              onClick={() => setMobileMenuOpen(false)}
              className="p-2 border border-[#E7E3DA] text-[#111111] hover:bg-[#F7F4EC] transition cursor-pointer"
              aria-label="Close Menu"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Links List */}
          <div className="space-y-4 py-8">
            <span className="text-[10px] tracking-[0.3em] uppercase text-[#8A877F] font-semibold block">
              Menu Index
            </span>
            {navLinks.map((link, idx) => (
              <button
                key={link.label}
                onClick={() => handleNavClick(link)}
                className="w-full text-left font-editorial text-3xl sm:text-4xl text-[#111111] hover:text-[#8A877F] transition py-2 flex items-center justify-between border-b border-[#F7F4EC] cursor-pointer"
              >
                <span>{link.label}</span>
                <span className="font-mono text-xs text-[#8A877F]">0{idx + 1}</span>
              </button>
            ))}
          </div>

          {/* Bottom Actions */}
          <div className="pt-6 border-t border-[#E7E3DA] space-y-4">
            <div className="flex items-center justify-between text-xs text-[#8A877F]">
              <span>Currency Preference</span>
              <div className="flex gap-2">
                {(['AED', 'USD', 'EUR', 'GBP'] as const).map(c => (
                  <button
                    key={c}
                    onClick={() => setCurrency(c)}
                    className={`px-2 py-0.5 font-mono text-xs cursor-pointer ${
                      currency === c ? 'text-[#111111] font-bold border-b border-[#111111]' : 'text-[#8A877F]'
                    }`}
                  >
                    {c}
                  </button>
                ))}
              </div>
            </div>

            <button
              onClick={() => {
                setMobileMenuOpen(false);
                handleEnquireClick();
              }}
              className="btn-editorial-primary w-full justify-center"
            >
              <span>Consult With Private Desk</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      )}

      {/* ================= GLOBAL SEARCH MODAL ================= */}
      {searchModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-start justify-center pt-24 sm:pt-32 px-4 animate-fadeIn">
          <div className="bg-[#FFFFFF] text-[#111111] w-full max-w-2xl p-6 sm:p-10 border border-[#E7E3DA] shadow-2xl relative">
            <button
              onClick={() => setSearchModalOpen(false)}
              className="absolute top-5 right-5 p-2 text-[#8A877F] hover:text-[#111111] cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <span className="text-[10px] tracking-[0.3em] uppercase text-[#8A877F] font-semibold block mb-2">
              Portfolio Search
            </span>
            <h3 className="font-editorial text-2xl sm:text-3xl text-[#111111] mb-6">
              Where in Dubai are you looking?
            </h3>

            <form onSubmit={handleSearchSubmit} className="space-y-4">
              <div className="relative border-b-2 border-[#111111] pb-2">
                <input
                  type="text"
                  autoFocus
                  placeholder="Palm Jumeirah, Downtown, Penthouse, Beachfront..."
                  value={searchVal}
                  onChange={(e) => setSearchVal(e.target.value)}
                  className="w-full text-base sm:text-lg text-[#111111] placeholder-[#8A877F] bg-transparent focus:outline-none pr-10 font-light"
                />
                <button type="submit" className="absolute right-0 top-1 text-[#111111] cursor-pointer">
                  <Search className="w-5 h-5" />
                </button>
              </div>

              {/* Quick suggestions */}
              <div className="flex flex-wrap gap-2 pt-4">
                <span className="text-xs text-[#8A877F] mr-2 py-1">Quick addresses:</span>
                {['Palm Jumeirah', 'Downtown Dubai', 'Dubai Hills Estate', 'Emirates Hills'].map((term) => (
                  <button
                    key={term}
                    type="button"
                    onClick={() => {
                      setSearchVal(term);
                      setFilters(prev => ({ ...prev, keyword: term }));
                      setCurrentPage('properties');
                      setSearchModalOpen(false);
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className="text-xs px-3 py-1 bg-[#F7F4EC] hover:bg-[#111111] hover:text-white transition cursor-pointer text-[#111111]"
                  >
                    {term}
                  </button>
                ))}
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};
