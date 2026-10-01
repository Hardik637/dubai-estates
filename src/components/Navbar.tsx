import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  Building2, 
  Heart, 
  User, 
  Menu, 
  X, 
  ChevronDown, 
  PlusCircle
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
    setFilters
  } = useApp();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [currencyDropdownOpen, setCurrencyDropdownOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  React.useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const leftNavLinks = [
    { 
      label: 'Buy', 
      page: 'properties' as const, 
      action: () => setFilters(prev => ({ ...prev, listingType: 'For Sale' })) 
    },
    { 
      label: 'Rent', 
      page: 'properties' as const, 
      action: () => setFilters(prev => ({ ...prev, listingType: 'For Rent' })) 
    },
    { label: 'Communities', page: 'communities' as const },
    { 
      label: 'Projects', 
      page: 'properties' as const,
      action: () => setFilters(prev => ({ ...prev, propertyType: 'Penthouse' })) 
    },
  ];

  const rightNavLinks = [
    { label: 'Agents', page: 'agent' as const },
    { label: 'Sell', page: 'sell' as const },
    { label: 'About', page: 'about' as const },
    { label: 'Contact', page: 'contact' as const },
  ];

  const allNavLinks = [...leftNavLinks, ...rightNavLinks];

  const handleNavClick = (link: { label: string; page: any; action?: () => void }) => {
    if (link.action) link.action();
    setCurrentPage(link.page);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const currencies = ['AED', 'USD', 'EUR', 'GBP', 'SAR'] as const;

  return (
    <header className="fixed top-3 sm:top-5 left-0 right-0 z-50 px-3 sm:px-6 lg:px-8 pointer-events-none transition-all duration-300">
      {/* Floating Pill Container matching Homeland.ae luxury aesthetic */}
      <div className={`max-w-7xl mx-auto rounded-2xl sm:rounded-full px-4 sm:px-6 py-2.5 sm:py-3 flex items-center justify-between pointer-events-auto transition-all duration-300 ${
        scrolled 
          ? 'bg-[#0b111e]/95 backdrop-blur-2xl border border-white/20 shadow-2xl shadow-black/80' 
          : 'bg-[#0b111e]/70 backdrop-blur-xl border border-white/15 shadow-xl shadow-black/40 hover:border-white/25'
      }`}>

        
        {/* ================= LEFT NAVIGATION OPTIONS ================= */}
        <nav className="hidden lg:flex items-center space-x-1 flex-1 justify-start">
          {leftNavLinks.map((link) => {
            const isActive = currentPage === link.page && (
              link.label === 'Buy' ? true : 
              link.label === 'Rent' ? true : 
              true
            );
            return (
              <button
                key={link.label}
                onClick={() => handleNavClick(link)}
                className={`px-3.5 py-1.5 text-xs font-semibold rounded-full transition-all duration-200 cursor-pointer ${
                  currentPage === link.page
                    ? 'text-amber-400 bg-amber-500/10' 
                    : 'text-slate-200 hover:text-white hover:bg-white/5'
                }`}
              >
                {link.label}
              </button>
            );
          })}
        </nav>

        {/* Mobile menu button (Left on mobile) */}
        <div className="flex lg:hidden items-center">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-slate-200 hover:text-white rounded-lg focus:outline-none cursor-pointer"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

        {/* ================= CENTER LOGO & BRAND NAME ================= */}
        <div 
          onClick={() => { setCurrentPage('home'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
          className="flex items-center gap-2.5 sm:gap-3 cursor-pointer group select-none px-2 sm:px-4"
        >
          <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-gradient-to-br from-amber-400 via-amber-500 to-amber-700 flex items-center justify-center shadow-lg shadow-amber-500/25 group-hover:scale-105 transition-transform duration-300">
            <Building2 className="w-4 h-4 sm:w-5 sm:h-5 text-slate-950 font-bold" />
          </div>
          <div className="flex flex-col items-center sm:items-start text-center">
            <span className="font-serif-luxury text-base sm:text-xl font-bold tracking-[0.18em] text-white leading-tight group-hover:text-amber-300 transition-colors">
              DUBAI ESTATES
            </span>
            <span className="text-[8px] uppercase tracking-[0.25em] text-amber-400 font-semibold hidden sm:block">
              Luxury Real Estate
            </span>
          </div>
        </div>

        {/* ================= RIGHT NAVIGATION OPTIONS & ACTIONS ================= */}
        <div className="flex items-center space-x-1 sm:space-x-2 flex-1 justify-end">
          {/* Desktop Right Links */}
          <nav className="hidden lg:flex items-center space-x-1 mr-2">
            {rightNavLinks.map((link) => (
              <button
                key={link.label}
                onClick={() => handleNavClick(link)}
                className={`px-3 py-1.5 text-xs font-semibold rounded-full transition-all duration-200 cursor-pointer ${
                  currentPage === link.page
                    ? 'text-amber-400 bg-amber-500/10' 
                    : 'text-slate-200 hover:text-white hover:bg-white/5'
                }`}
              >
                {link.label}
              </button>
            ))}
          </nav>

          {/* Currency Switcher */}
          <div className="relative">
            <button
              onClick={() => setCurrencyDropdownOpen(!currencyDropdownOpen)}
              className="px-2.5 py-1 text-[11px] sm:text-xs font-bold text-slate-200 bg-white/5 hover:bg-white/10 rounded-full border border-white/10 flex items-center gap-1 transition cursor-pointer"
            >
              <span>{currency}</span>
              <ChevronDown className="w-3 h-3 text-slate-400" />
            </button>
            {currencyDropdownOpen && (
              <div 
                className="absolute right-0 mt-2 w-28 bg-[#111a2e] border border-white/15 rounded-xl shadow-2xl py-1.5 z-50 backdrop-blur-xl"
                onMouseLeave={() => setCurrencyDropdownOpen(false)}
              >
                {currencies.map(c => (
                  <button
                    key={c}
                    onClick={() => { setCurrency(c); setCurrencyDropdownOpen(false); }}
                    className={`w-full text-left px-3 py-1.5 text-xs font-medium transition cursor-pointer flex justify-between ${
                      currency === c ? 'text-amber-400 bg-amber-500/10 font-bold' : 'text-slate-300 hover:bg-white/5'
                    }`}
                  >
                    <span>{c}</span>
                    <span className="text-slate-500">{c === 'AED' ? 'د.إ' : c === 'USD' ? '$' : c === 'EUR' ? '€' : c === 'GBP' ? '£' : '﷼'}</span>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Saved wishlist */}
          <button
            onClick={() => { setCurrentPage('dashboard'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
            className="relative p-1.5 sm:p-2 text-slate-200 hover:text-white hover:bg-white/5 rounded-full transition cursor-pointer"
            title="Saved Properties"
          >
            <Heart className="w-4 h-4 sm:w-4.5 sm:h-4.5" />
            {favorites.length > 0 && (
              <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-amber-500 text-slate-950 text-[9px] font-bold rounded-full flex items-center justify-center shadow">
                {favorites.length}
              </span>
            )}
          </button>

          {/* User Profile or Sign In */}
          {user.isLoggedIn ? (
            <div className="relative">
              <button
                onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                className="flex items-center gap-1.5 sm:gap-2 pl-1.5 pr-2.5 py-1 bg-white/5 hover:bg-white/10 rounded-full border border-white/10 transition cursor-pointer"
              >
                <img 
                  src={user.avatar} 
                  alt={user.name} 
                  className="w-6 h-6 rounded-full object-cover border border-amber-500/50"
                />
                <span className="text-xs font-semibold text-slate-200 hidden sm:inline">{user.name}</span>
                <ChevronDown className="w-3 h-3 text-slate-400" />
              </button>

              {userDropdownOpen && (
                <div 
                  className="absolute right-0 mt-2 w-48 bg-[#111a2e] border border-white/15 rounded-2xl shadow-2xl py-2 z-50 text-xs backdrop-blur-xl"
                  onMouseLeave={() => setUserDropdownOpen(false)}
                >
                  <div className="px-3.5 py-2 border-b border-white/10">
                    <p className="font-semibold text-white">{user.name}</p>
                    <p className="text-slate-400 text-[11px] truncate">{user.email}</p>
                  </div>
                  <button
                    onClick={() => { setCurrentPage('dashboard'); setUserDropdownOpen(false); }}
                    className="w-full text-left px-3.5 py-2 hover:bg-white/5 text-slate-200 transition cursor-pointer flex items-center gap-2"
                  >
                    <User className="w-3.5 h-3.5 text-amber-400" />
                    Investor Dashboard
                  </button>
                  <button
                    onClick={() => { setCurrentPage('sell'); setUserDropdownOpen(false); }}
                    className="w-full text-left px-3.5 py-2 hover:bg-white/5 text-slate-200 transition cursor-pointer flex items-center gap-2"
                  >
                    <PlusCircle className="w-3.5 h-3.5 text-amber-400" />
                    List My Property
                  </button>
                  <div className="border-t border-white/10 my-1"></div>
                  <button
                    onClick={() => {
                      setIsAuthModalOpen(true);
                      setUserDropdownOpen(false);
                    }}
                    className="w-full text-left px-3.5 py-1.5 hover:bg-red-500/10 text-red-400 transition cursor-pointer"
                  >
                    Switch Account / Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <button
              onClick={() => setIsAuthModalOpen(true)}
              className="gold-btn px-3 sm:px-4 py-1.5 text-xs font-bold rounded-full flex items-center gap-1.5 cursor-pointer shadow-md"
            >
              <User className="w-3 h-3" />
              <span>Sign In</span>
            </button>
          )}
        </div>
      </div>

      {/* Floating Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden max-w-7xl mx-auto mt-2 rounded-2xl bg-[#0c1322]/95 border border-white/12 backdrop-blur-2xl px-5 pt-3 pb-6 shadow-2xl pointer-events-auto space-y-4 animate-fade-in">
          <div className="grid grid-cols-2 gap-2 pb-3 border-b border-white/10">
            {allNavLinks.map((link) => (
              <button
                key={link.label}
                onClick={() => handleNavClick(link)}
                className="text-left px-3 py-2 text-xs font-medium text-slate-200 hover:text-amber-400 hover:bg-white/5 rounded-xl transition cursor-pointer"
              >
                {link.label}
              </button>
            ))}
          </div>

          <div className="flex items-center justify-between pt-1">
            <span className="text-xs text-slate-400 font-medium">Currency:</span>
            <div className="flex gap-1">
              {currencies.map(c => (
                <button
                  key={c}
                  onClick={() => setCurrency(c)}
                  className={`px-2 py-1 text-[11px] rounded-lg border cursor-pointer ${
                    currency === c 
                      ? 'bg-amber-500 text-slate-950 font-bold border-amber-500' 
                      : 'border-white/10 text-slate-300'
                  }`}
                >
                  {c}
                </button>
              ))}
            </div>
          </div>

          <div className="flex gap-2 pt-1">
            <button
              onClick={() => { setCurrentPage('dashboard'); setMobileMenuOpen(false); }}
              className="flex-1 py-2 text-xs font-semibold text-center rounded-xl bg-white/10 text-white cursor-pointer"
            >
              Dashboard
            </button>
            <button
              onClick={() => { setCurrentPage('sell'); setMobileMenuOpen(false); }}
              className="flex-1 gold-btn py-2 text-xs font-bold text-center rounded-xl cursor-pointer"
            >
              List Property
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
