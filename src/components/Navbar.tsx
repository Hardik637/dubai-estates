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
    <header className={`fixed top-0 left-0 right-0 z-50 w-full transition-all duration-500 ${
      scrolled 
        ? 'bg-[#fcfbfa]/95 backdrop-blur-2xl border-b border-[#e8e2d8] shadow-sm py-3' 
        : 'bg-transparent border-b border-transparent shadow-none py-4 sm:py-6'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">

        {/* ================= LEFT NAVIGATION / MOBILE MENU ================= */}
        <div className="flex-1 flex items-center justify-start">
          {/* Desktop Left Nav Links */}
          <nav className="hidden lg:flex items-center space-x-1">
            {leftNavLinks.map((link) => {
              const isActive = currentPage === link.page;
              return (
                <button
                  key={link.label}
                  onClick={() => handleNavClick(link)}
                  className={`px-3.5 py-1.5 text-xs font-semibold rounded-full transition-all duration-300 cursor-pointer ${
                    isActive
                      ? scrolled
                        ? 'text-[#b88d3d] bg-[#b88d3d]/10 font-bold'
                        : 'text-amber-300 bg-white/20 font-bold drop-shadow-sm'
                      : scrolled
                        ? 'text-[#3b4352] hover:text-[#16191f] hover:bg-black/5'
                        : 'text-white/90 hover:text-white hover:bg-white/10 drop-shadow-[0_1px_3px_rgba(0,0,0,0.7)]'
                  }`}
                >
                  {link.label}
                </button>
              );
            })}
          </nav>

          {/* Mobile menu button (Left on mobile) */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className={`lg:hidden p-2 rounded-full transition focus:outline-none cursor-pointer ${
              scrolled
                ? 'text-[#16191f] bg-[#f0eae1] hover:bg-[#e8e0d4]'
                : 'text-white bg-black/25 hover:bg-black/40 backdrop-blur-md border border-white/20'
            }`}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-4 h-4 text-[#b88d3d]" /> : <Menu className="w-4 h-4" />}
          </button>
        </div>

        {/* ================= CENTER LOGO & BRAND NAME ================= */}
        <div 
          onClick={() => { setCurrentPage('home'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
          className="flex-shrink-0 flex items-center gap-2 sm:gap-2.5 cursor-pointer group select-none px-2 sm:px-4"
        >
          <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-gradient-to-br from-[#b88d3d] via-[#c59b27] to-[#8c641c] flex items-center justify-center shadow-md shadow-[#b88d3d]/30 group-hover:scale-105 transition-transform duration-300">
            <Building2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-white font-bold" />
          </div>
          <div className="flex flex-col items-center text-center">
            <span className={`font-serif-luxury text-sm sm:text-base lg:text-lg font-bold tracking-[0.18em] leading-tight transition-colors whitespace-nowrap ${
              scrolled 
                ? 'text-[#16191f] group-hover:text-[#b88d3d]' 
                : 'text-white drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)] group-hover:text-amber-200'
            }`}>
              DUBAI ESTATES
            </span>
            <span className={`text-[7px] tracking-[0.25em] uppercase font-semibold hidden md:block transition-colors ${
              scrolled ? 'text-[#b88d3d]' : 'text-amber-300 drop-shadow-[0_1px_4px_rgba(0,0,0,0.8)]'
            }`}>
              The Private Office
            </span>
          </div>
        </div>

        {/* ================= RIGHT NAVIGATION OPTIONS & ACTIONS ================= */}
        <div className="flex-1 flex items-center justify-end gap-1.5 sm:gap-2">
          {/* Desktop Right Links */}
          <nav className="hidden lg:flex items-center space-x-1 mr-2">
            {rightNavLinks.map((link) => {
              const isActive = currentPage === link.page;
              return (
                <button
                  key={link.label}
                  onClick={() => handleNavClick(link)}
                  className={`px-3 py-1.5 text-xs font-semibold rounded-full transition-all duration-300 cursor-pointer ${
                    isActive
                      ? scrolled
                        ? 'text-[#b88d3d] bg-[#b88d3d]/10 font-bold'
                        : 'text-amber-300 bg-white/20 font-bold drop-shadow-sm'
                      : scrolled
                        ? 'text-[#3b4352] hover:text-[#16191f] hover:bg-black/5'
                        : 'text-white/90 hover:text-white hover:bg-white/10 drop-shadow-[0_1px_3px_rgba(0,0,0,0.7)]'
                  }`}
                >
                  {link.label}
                </button>
              );
            })}
          </nav>

          {/* Currency Switcher */}
          <div className="relative">
            <button
              onClick={() => setCurrencyDropdownOpen(!currencyDropdownOpen)}
              className={`px-2.5 py-1 text-[11px] sm:text-xs font-bold rounded-full border flex items-center gap-1 transition cursor-pointer ${
                scrolled
                  ? 'text-[#16191f] bg-[#f0eae1] hover:bg-[#e8e0d4] border-[#e2dbd0]'
                  : 'text-white bg-black/25 hover:bg-black/40 border-white/20 backdrop-blur-md'
              }`}
            >
              <span>{currency}</span>
              <ChevronDown className="w-2.5 h-2.5 sm:w-3 sm:h-3 opacity-70" />
            </button>
            {currencyDropdownOpen && (
              <div 
                className="absolute right-0 mt-2 w-28 bg-[#fcfbfa] border border-[#e8e2d8] rounded-xl shadow-2xl py-1.5 z-50 text-[#16191f]"
                onMouseLeave={() => setCurrencyDropdownOpen(false)}
              >
                {currencies.map(c => (
                  <button
                    key={c}
                    onClick={() => { setCurrency(c); setCurrencyDropdownOpen(false); }}
                    className={`w-full text-left px-3 py-1.5 text-xs font-medium transition cursor-pointer flex justify-between ${
                      currency === c ? 'text-[#b88d3d] bg-[#b88d3d]/10 font-bold' : 'text-[#3b4352] hover:bg-[#f0eae1]'
                    }`}
                  >
                    <span>{c}</span>
                    <span className="text-[#8b94a2]">{c === 'AED' ? 'د.إ' : c === 'USD' ? '$' : c === 'EUR' ? '€' : c === 'GBP' ? '£' : '﷼'}</span>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Saved wishlist */}
          <button
            onClick={() => { setCurrentPage('dashboard'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
            className={`relative p-2 rounded-full transition cursor-pointer ${
              scrolled
                ? 'text-[#16191f] hover:text-[#b88d3d] hover:bg-[#f0eae1]'
                : 'text-white hover:text-amber-300 hover:bg-white/10 drop-shadow-[0_1px_3px_rgba(0,0,0,0.7)]'
            }`}
            title="Saved Properties"
            aria-label="Wishlist"
          >
            <Heart className="w-4 h-4" />
            {favorites.length > 0 && (
              <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-[#b88d3d] text-white text-[8px] sm:text-[9px] font-bold rounded-full flex items-center justify-center shadow">
                {favorites.length}
              </span>
            )}
          </button>

          {/* User Profile or Sign In */}
          {user.isLoggedIn ? (
            <div className="relative">
              <button
                onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                className={`flex items-center gap-1.5 p-1 sm:pl-1.5 sm:pr-2.5 sm:py-1 rounded-full border transition cursor-pointer ${
                  scrolled
                    ? 'bg-[#f0eae1] hover:bg-[#e8e0d4] border-[#e2dbd0] text-[#16191f]'
                    : 'bg-black/25 hover:bg-black/40 border-white/20 text-white backdrop-blur-md'
                }`}
              >
                <img 
                  src={user.avatar} 
                  alt={user.name} 
                  className="w-5 h-5 sm:w-6 sm:h-6 rounded-full object-cover border border-[#b88d3d]"
                />
                <span className="text-xs font-semibold hidden sm:inline">{user.name}</span>
                <ChevronDown className="w-2.5 h-2.5 sm:w-3 sm:h-3 opacity-70" />
              </button>

              {userDropdownOpen && (
                <div 
                  className="absolute right-0 mt-2 w-48 bg-[#fcfbfa] border border-[#e8e2d8] rounded-2xl shadow-2xl py-2 z-50 text-xs text-[#16191f]"
                  onMouseLeave={() => setUserDropdownOpen(false)}
                >
                  <div className="px-3.5 py-2 border-b border-[#e8e2d8]">
                    <p className="font-semibold text-[#16191f]">{user.name}</p>
                    <p className="text-[#6d7685] text-[11px] truncate">{user.email}</p>
                  </div>
                  <button
                    onClick={() => { setCurrentPage('dashboard'); setUserDropdownOpen(false); }}
                    className="w-full text-left px-3.5 py-2 hover:bg-[#f0eae1] text-[#16191f] transition cursor-pointer flex items-center gap-2"
                  >
                    <User className="w-3.5 h-3.5 text-[#b88d3d]" />
                    Investor Dashboard
                  </button>
                  <button
                    onClick={() => { setCurrentPage('sell'); setUserDropdownOpen(false); }}
                    className="w-full text-left px-3.5 py-2 hover:bg-[#f0eae1] text-[#16191f] transition cursor-pointer flex items-center gap-2"
                  >
                    <PlusCircle className="w-3.5 h-3.5 text-[#b88d3d]" />
                    List My Property
                  </button>
                  <div className="border-t border-[#e8e2d8] my-1"></div>
                  <button
                    onClick={() => {
                      setIsAuthModalOpen(true);
                      setUserDropdownOpen(false);
                    }}
                    className="w-full text-left px-3.5 py-1.5 hover:bg-red-50 text-red-600 transition cursor-pointer"
                  >
                    Switch Account / Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <>
              {/* Mobile icon-only Sign In button */}
              <button
                onClick={() => setIsAuthModalOpen(true)}
                className="sm:hidden p-2 rounded-full gold-btn cursor-pointer shadow-md"
                aria-label="Sign In"
                title="Sign In"
              >
                <User className="w-3.5 h-3.5" />
              </button>

              {/* Desktop Sign In button */}
              <button
                onClick={() => setIsAuthModalOpen(true)}
                className="hidden sm:flex gold-btn px-4 py-1.5 text-xs font-bold rounded-full items-center gap-1.5 cursor-pointer shadow-md"
              >
                <User className="w-3 h-3" />
                <span>Client Sign In</span>
              </button>
            </>
          )}
        </div>
      </div>

      {/* Floating Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden w-full bg-[#fcfbfa]/98 border-b border-[#e8e2d8] shadow-2xl px-5 pt-3 pb-6 space-y-4 animate-fade-in mt-2 text-[#16191f]">
          <div className="grid grid-cols-2 gap-2 pb-3 border-b border-[#e8e2d8]">
            {allNavLinks.map((link) => (
              <button
                key={link.label}
                onClick={() => handleNavClick(link)}
                className="text-left px-3 py-2 text-xs font-medium text-[#3b4352] hover:text-[#b88d3d] hover:bg-[#f0eae1] rounded-xl transition cursor-pointer"
              >
                {link.label}
              </button>
            ))}
          </div>

          <div className="flex items-center justify-between pt-1">
            <span className="text-xs text-[#6d7685] font-medium">Currency:</span>
            <div className="flex gap-1">
              {currencies.map(c => (
                <button
                  key={c}
                  onClick={() => setCurrency(c)}
                  className={`px-2 py-1 text-[11px] rounded-lg border cursor-pointer ${
                    currency === c 
                      ? 'bg-[#b88d3d] text-white font-bold border-[#b88d3d]' 
                      : 'border-[#e2dbd0] text-[#3b4352] bg-[#f0eae1]'
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
              className="flex-1 py-2 text-xs font-semibold text-center rounded-xl bg-[#f0eae1] hover:bg-[#e8e0d4] text-[#16191f] cursor-pointer"
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
