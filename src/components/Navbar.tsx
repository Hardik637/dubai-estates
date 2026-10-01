import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { 
  Heart, 
  Search, 
  Menu, 
  X, 
  ChevronDown,
  ArrowUpRight
} from 'lucide-react';

export const Navbar: React.FC = () => {
  const { 
    currentPage, 
    setCurrentPage, 
    currency, 
    setCurrency, 
    favorites, 
    setIsAuthModalOpen,
    setIsEnquiryDrawerOpen,
    setSelectedDrawerProject,
    setFilters
  } = useApp();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [currencyDropdownOpen, setCurrencyDropdownOpen] = useState(false);
  const [searchBarOpen, setSearchBarOpen] = useState(false);
  const [searchVal, setSearchVal] = useState('');
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const leftNavLinks = [
    { label: 'ABOUT', page: 'about' as const },
    { label: 'COMMUNITIES', page: 'communities' as const },
    { 
      label: 'PROPERTIES', 
      page: 'properties' as const,
      action: () => setFilters(prev => ({ ...prev, listingType: 'All' }))
    }
  ];

  const rightNavLinks = [
    { 
      label: 'JOURNAL', 
      page: 'home' as const,
      action: () => {
        if (currentPage !== 'home') {
          setCurrentPage('home');
          setTimeout(() => {
            const el = document.querySelector('section:nth-of-type(8)');
            if (el) el.scrollIntoView({ behavior: 'smooth' });
          }, 150);
        } else {
          const el = document.querySelector('section:nth-of-type(8)');
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        }
      }
    },
    { label: 'SELL WITH US', page: 'sell' as const },
    { label: 'CONTACT US', page: 'contact' as const }
  ];

  const handleNavClick = (link: { label: string; page: any; action?: () => void }) => {
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
    setSearchBarOpen(false);
    setSearchVal('');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const currencies = [
    { code: 'AED', flag: '🇦🇪', label: 'AED' },
    { code: 'USD', flag: '🇺🇸', label: 'USD' },
    { code: 'EUR', flag: '🇪🇺', label: 'EUR' },
    { code: 'GBP', flag: '🇬🇧', label: 'GBP' },
    { code: 'SAR', flag: '🇸🇦', label: 'SAR' }
  ] as const;

  const currentFlag = currencies.find(c => c.code === currency)?.flag || '🇦🇪';

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 w-full transition-all duration-500 ${
      scrolled 
        ? 'nav-frosted-dark py-3.5 sm:py-4 shadow-2xl' 
        : 'bg-gradient-to-b from-black/85 via-black/40 to-transparent py-4 sm:py-5 border-b border-transparent'
    }`}>
      <div className="max-w-[1720px] mx-auto px-4 sm:px-6 lg:px-10 flex items-center justify-between">

        {/* ================= LEFT NAVIGATION LINKS ================= */}
        <nav className="hidden lg:flex flex-1 items-center justify-start space-x-7 xl:space-x-10">
          {leftNavLinks.map((link) => {
            const isActive = currentPage === link.page;
            return (
              <button
                key={link.label}
                onClick={() => handleNavClick(link)}
                className={`text-[11px] xl:text-xs font-semibold tracking-[0.2em] uppercase transition-colors duration-300 cursor-pointer relative py-1 ${
                  isActive
                    ? 'text-[#f7f5f0]'
                    : 'text-[#d8d4cc] hover:text-[#f7f5f0]'
                }`}
              >
                {link.label}
                {isActive && (
                  <span className="absolute bottom-0 left-0 right-0 h-[1.5px] bg-[#c4ad8e]" />
                )}
              </button>
            );
          })}
        </nav>

        {/* ================= CENTER BRAND LOGO / WORDMARK ================= */}
        <div 
          onClick={() => { setCurrentPage('home'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
          className="shrink-0 flex flex-col items-center justify-center cursor-pointer group select-none px-3 sm:px-6 text-center"
        >
          <div className="flex items-center gap-2">
            {/* Subtle stylized architectural emblem */}
            <span className="w-1.5 h-1.5 rounded-full bg-[#c4ad8e] opacity-80 group-hover:scale-125 transition-transform" />
            <span className="font-editorial text-lg sm:text-xl md:text-2xl font-normal tracking-[0.24em] uppercase text-[#f7f5f0] group-hover:text-[#c4ad8e] transition-colors leading-none">
              Dubai Estates
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-[#c4ad8e] opacity-80 group-hover:scale-125 transition-transform" />
          </div>
          <span className="text-[7.5px] sm:text-[8px] tracking-[0.38em] uppercase font-mono text-[#c4ad8e] mt-1 font-medium">
            The Private Office
          </span>
        </div>

        {/* ================= RIGHT NAVIGATION & UTILITY CLUSTER ================= */}
        <div className="flex-1 flex items-center justify-end space-x-5 xl:space-x-7">
          
          {/* Desktop Right Nav Links */}
          <nav className="hidden lg:flex items-center space-x-7 xl:space-x-9">
            {rightNavLinks.map((link) => {
              const isActive = currentPage === link.page && link.label !== 'JOURNAL';
              return (
                <button
                  key={link.label}
                  onClick={() => handleNavClick(link)}
                  className={`text-[11px] xl:text-xs font-semibold tracking-[0.2em] uppercase transition-colors duration-300 cursor-pointer relative py-1 ${
                    isActive
                      ? 'text-[#f7f5f0]'
                      : 'text-[#d8d4cc] hover:text-[#f7f5f0]'
                  }`}
                >
                  {link.label}
                  {isActive && (
                    <span className="absolute bottom-0 left-0 right-0 h-[1.5px] bg-[#c4ad8e]" />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Divider on desktop */}
          <span className="hidden lg:block w-[1px] h-4 bg-white/15" />

          {/* Utilities: Saved Heart, Search, and Language/Currency Pill */}
          <div className="flex items-center gap-2.5 sm:gap-3.5">
            
            {/* Favorites / Saved Heart */}
            <button
              onClick={() => {
                setCurrentPage('dashboard');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="p-1.5 text-[#d8d4cc] hover:text-[#f7f5f0] transition relative cursor-pointer"
              title="Saved Residences"
              aria-label="Saved Residences"
            >
              <Heart className="w-4 h-4 stroke-[1.75]" />
              {favorites.length > 0 && (
                <span className="absolute top-0 right-0 w-2 h-2 rounded-full bg-[#c4ad8e]" />
              )}
            </button>

            {/* Search Trigger Icon */}
            <div className="relative">
              <button
                onClick={() => setSearchBarOpen(!searchBarOpen)}
                className="p-1.5 text-[#d8d4cc] hover:text-[#f7f5f0] transition cursor-pointer"
                title="Search Portfolio"
                aria-label="Search"
              >
                <Search className="w-4 h-4 stroke-[1.75]" />
              </button>

              {/* Expandable Dropdown Search Form */}
              {searchBarOpen && (
                <form 
                  onSubmit={handleSearchSubmit}
                  className="absolute right-0 top-12 w-72 sm:w-80 bg-[#121316] border border-white/15 p-2.5 z-50 flex items-center gap-2 shadow-2xl animate-fadeIn"
                >
                  <Search className="w-3.5 h-3.5 text-[#96938a] ml-1.5" />
                  <input
                    type="text"
                    autoFocus
                    placeholder="Palm Jumeirah, Villa, Penthouse..."
                    value={searchVal}
                    onChange={(e) => setSearchVal(e.target.value)}
                    className="w-full text-xs text-[#f7f5f0] placeholder-[#63615b] bg-transparent focus:outline-none py-1 px-1 font-light"
                  />
                  <button
                    type="submit"
                    className="px-2.5 py-1 bg-[#f7f5f0] text-[#0a0b0d] text-[10px] font-semibold uppercase tracking-wider transition hover:bg-[#c4ad8e] cursor-pointer"
                  >
                    Go
                  </button>
                </form>
              )}
            </div>

            {/* Language / Currency Rounded Pill (matching reference screenshot) */}
            <div className="relative">
              <button
                onClick={() => setCurrencyDropdownOpen(!currencyDropdownOpen)}
                className="px-3 py-1 text-[11px] tracking-wider uppercase font-semibold rounded-full border border-white/20 hover:border-white/40 bg-white/[0.04] hover:bg-white/[0.08] text-[#f7f5f0] flex items-center gap-1.5 transition cursor-pointer"
              >
                <span>{currentFlag}</span>
                <span className="font-mono text-[10px]">{currency}</span>
                <ChevronDown className="w-2.5 h-2.5 opacity-60" />
              </button>

              {currencyDropdownOpen && (
                <div 
                  className="absolute right-0 mt-2 w-32 bg-[#121316] border border-white/15 py-1.5 z-50 shadow-2xl rounded-xl text-[#f7f5f0]"
                  onMouseLeave={() => setCurrencyDropdownOpen(false)}
                >
                  {currencies.map(c => (
                    <button
                      key={c.code}
                      onClick={() => { setCurrency(c.code); setCurrencyDropdownOpen(false); }}
                      className={`w-full text-left px-3 py-1.5 text-xs font-mono transition cursor-pointer flex items-center justify-between ${
                        currency === c.code ? 'text-[#c4ad8e] bg-white/5 font-semibold' : 'text-[#b8b5ad] hover:bg-white/5'
                      }`}
                    >
                      <span className="flex items-center gap-2">
                        <span>{c.flag}</span>
                        <span>{c.code}</span>
                      </span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Mobile Hamburger Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-1.5 text-[#f7f5f0] hover:text-[#c4ad8e] transition cursor-pointer ml-1"
              aria-label="Toggle navigation"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>

          </div>

        </div>

      </div>

      {/* ================= FULLSCREEN MOBILE EDITORIAL DRAWER ================= */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 top-[65px] bg-[#0a0b0d] z-40 p-8 flex flex-col justify-between overflow-y-auto animate-fadeIn border-t border-white/10">
          <div className="space-y-5 pt-4">
            <span className="text-[10px] tracking-[0.3em] uppercase text-[#c4ad8e] font-semibold block mb-4">
              Navigation
            </span>

            {[...leftNavLinks, ...rightNavLinks].map((link, idx) => (
              <button
                key={link.label}
                onClick={() => handleNavClick(link)}
                className="w-full text-left font-editorial text-2xl sm:text-3xl text-[#f7f5f0] hover:text-[#c4ad8e] transition-colors py-2 flex items-center justify-between border-b border-white/5 cursor-pointer"
              >
                <span>{link.label}</span>
                <span className="font-mono text-xs text-[#63615b]">0{idx + 1}</span>
              </button>
            ))}
          </div>

          <div className="pt-8 border-t border-white/10 space-y-4">
            <div className="flex items-center justify-between text-xs text-[#96938a]">
              <span>Currency & Region</span>
              <div className="flex gap-2">
                {currencies.map(c => (
                  <button
                    key={c.code}
                    onClick={() => setCurrency(c.code)}
                    className={`px-2 py-0.5 text-xs font-mono uppercase ${
                      currency === c.code ? 'text-[#c4ad8e] font-bold border-b border-[#c4ad8e]' : 'text-[#63615b]'
                    }`}
                  >
                    {c.code}
                  </button>
                ))}
              </div>
            </div>

            <button
              onClick={() => {
                setSelectedDrawerProject('General Private Portfolio Inquiry');
                setIsEnquiryDrawerOpen(true);
                setMobileMenuOpen(false);
              }}
              className="editorial-btn-primary w-full justify-center py-3.5 text-xs tracking-[0.2em] cursor-pointer mt-4"
            >
              <span>Enquire With Advisor</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
