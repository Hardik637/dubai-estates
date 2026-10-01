import React, { useState, useEffect } from 'react';
import { useApp } from '../../src/context/AppContext';
import { 
  Heart, 
  User, 
  Menu, 
  X, 
  ChevronDown, 
  Search,
  ArrowUpRight
} from 'lucide-react';

export const Navbar: React.FC = () => {
  const { 
    currentPage, 
    setCurrentPage, 
    currency, 
    setCurrency, 
    favorites, 
    user, 
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
      setScrolled(window.scrollY > 25);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Properties', page: 'properties' as const },
    { label: 'Communities', page: 'communities' as const },
    { label: 'Sell With Us', page: 'sell' as const },
    { label: 'About', page: 'about' as const },
    { 
      label: 'Journal', 
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
    }
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

  const handleEnquire = () => {
    setSelectedDrawerProject('General Private Portfolio Inquiry');
    setIsEnquiryDrawerOpen(true);
    setMobileMenuOpen(false);
  };

  const currencies = ['AED', 'USD', 'EUR', 'GBP', 'SAR'] as const;

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 w-full transition-all duration-500 ${
      scrolled 
        ? 'nav-frosted-dark py-4 shadow-xl' 
        : 'bg-transparent py-5 sm:py-6 border-b border-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 flex items-center justify-between">

        {/* ================= MINIMAL TYPOGRAPHIC WORDMARK ================= */}
        <div 
          onClick={() => { setCurrentPage('home'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
          className="flex-shrink-0 flex items-center gap-3 cursor-pointer group select-none"
        >
          <div className="flex flex-col text-left">
            <span className="font-editorial text-lg sm:text-xl font-normal tracking-[0.24em] uppercase text-[#f7f5f0] group-hover:text-[#c4ad8e] transition-colors leading-tight">
              Dubai Estates
            </span>
            <span className="text-[7.5px] tracking-[0.38em] uppercase font-mono text-[#96938a] mt-0.5">
              The Private Office
            </span>
          </div>
        </div>

        {/* ================= MINIMAL EDITORIAL DESKTOP NAVIGATION ================= */}
        <nav className="hidden lg:flex items-center space-x-7 xl:space-x-9">
          {navLinks.map((link) => {
            const isActive = currentPage === link.page && link.label !== 'Journal';
            return (
              <button
                key={link.label}
                onClick={() => handleNavClick(link)}
                className={`text-xs tracking-[0.18em] uppercase font-medium transition-colors duration-300 cursor-pointer relative py-1 ${
                  isActive
                    ? 'text-[#f7f5f0]'
                    : 'text-[#b8b5ad] hover:text-[#f7f5f0]'
                }`}
              >
                {link.label}
                {isActive && (
                  <span className="absolute bottom-0 left-0 right-0 h-[1px] bg-[#c4ad8e]" />
                )}
              </button>
            );
          })}
        </nav>

        {/* ================= RIGHT UTILITY ACTIONS ================= */}
        <div className="flex items-center gap-3 sm:gap-4">
          
          {/* Search Trigger */}
          <div className="relative">
            <button
              onClick={() => setSearchBarOpen(!searchBarOpen)}
              className="p-2 text-[#b8b5ad] hover:text-[#f7f5f0] transition cursor-pointer"
              title="Search Portfolio"
              aria-label="Search"
            >
              <Search className="w-4 h-4" />
            </button>

            {/* Quick Search Dropdown */}
            {searchBarOpen && (
              <form 
                onSubmit={handleSearchSubmit}
                className="absolute right-0 top-12 w-72 sm:w-80 bg-[#121316] border border-white/10 p-2.5 z-50 flex items-center gap-2 shadow-2xl animate-fadeIn"
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
                  Search
                </button>
              </form>
            )}
          </div>

          {/* Currency Switcher */}
          <div className="relative hidden sm:block">
            <button
              onClick={() => setCurrencyDropdownOpen(!currencyDropdownOpen)}
              className="px-2.5 py-1 text-[10px] tracking-wider uppercase font-mono border border-white/10 text-[#d8d4cc] hover:text-[#f7f5f0] hover:border-white/25 flex items-center gap-1 transition cursor-pointer"
            >
              <span>{currency}</span>
              <ChevronDown className="w-2.5 h-2.5 opacity-60" />
            </button>
            {currencyDropdownOpen && (
              <div 
                className="absolute right-0 mt-2 w-28 bg-[#121316] border border-white/10 py-1 z-50 shadow-2xl text-[#f7f5f0]"
                onMouseLeave={() => setCurrencyDropdownOpen(false)}
              >
                {currencies.map(c => (
                  <button
                    key={c}
                    onClick={() => { setCurrency(c); setCurrencyDropdownOpen(false); }}
                    className={`w-full text-left px-3 py-1.5 text-xs font-mono transition cursor-pointer flex justify-between ${
                      currency === c ? 'text-[#c4ad8e] bg-white/5 font-semibold' : 'text-[#b8b5ad] hover:bg-white/5'
                    }`}
                  >
                    <span>{c}</span>
                    <span className="text-[#63615b]">{c === 'AED' ? 'د.إ' : c === 'USD' ? '$' : c === 'EUR' ? '€' : c === 'GBP' ? '£' : '﷼'}</span>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Saved / Favorites */}
          <button
            onClick={() => {
              setCurrentPage('dashboard');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="p-2 text-[#b8b5ad] hover:text-[#f7f5f0] transition relative cursor-pointer"
            title="Saved Residences"
            aria-label="Saved Residences"
          >
            <Heart className="w-4 h-4" />
            {favorites.length > 0 && (
              <span className="absolute top-1 right-1 w-1.5 h-1.5 rounded-full bg-[#c4ad8e]" />
            )}
          </button>

          {/* User Account */}
          <button
            onClick={() => setIsAuthModalOpen(true)}
            className="p-2 text-[#b8b5ad] hover:text-[#f7f5f0] transition cursor-pointer hidden sm:block"
            title={user.isLoggedIn ? user.name : "Client Sign In"}
            aria-label="User Account"
          >
            <User className="w-4 h-4" />
          </button>

          {/* Primary CTA: Enquire */}
          <button
            onClick={handleEnquire}
            className="editorial-btn-secondary py-2 px-4 sm:px-5 text-[11px] tracking-[0.16em] uppercase cursor-pointer"
          >
            <span>Enquire</span>
          </button>

          {/* Mobile Menu Toggle Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 text-[#f7f5f0] hover:text-[#c4ad8e] transition cursor-pointer"
            aria-label="Toggle navigation"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>

        </div>

      </div>

      {/* ================= FULLSCREEN MOBILE EDITORIAL DRAWER ================= */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 top-[65px] bg-[#0a0b0d] z-40 p-8 flex flex-col justify-between overflow-y-auto animate-fadeIn border-t border-white/10">
          <div className="space-y-6 pt-4">
            <span className="text-[10px] tracking-[0.3em] uppercase text-[#c4ad8e] font-semibold block mb-4">
              Navigation
            </span>

            {navLinks.map((link, idx) => (
              <button
                key={link.label}
                onClick={() => handleNavClick(link)}
                className="w-full text-left font-editorial text-3xl text-[#f7f5f0] hover:text-[#c4ad8e] transition-colors py-2 flex items-center justify-between border-b border-white/5 cursor-pointer"
              >
                <span>{link.label}</span>
                <span className="font-mono text-xs text-[#63615b]">0{idx + 1}</span>
              </button>
            ))}
          </div>

          <div className="pt-8 border-t border-white/10 space-y-4">
            <div className="flex items-center justify-between text-xs text-[#96938a]">
              <span>Currency</span>
              <div className="flex gap-2">
                {currencies.map(c => (
                  <button
                    key={c}
                    onClick={() => setCurrency(c)}
                    className={`px-2 py-0.5 text-xs font-mono uppercase ${
                      currency === c ? 'text-[#c4ad8e] font-bold border-b border-[#c4ad8e]' : 'text-[#63615b]'
                    }`}
                  >
                    {c}
                  </button>
                ))}
              </div>
            </div>

            <button
              onClick={handleEnquire}
              className="editorial-btn-primary w-full justify-center py-3.5 text-xs tracking-[0.2em] cursor-pointer mt-4"
            >
              <span>Speak With An Advisor</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
