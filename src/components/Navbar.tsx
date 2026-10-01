import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  Building2, 
  Heart, 
  User, 
  Menu, 
  X, 
  ChevronDown, 
  PlusCircle,
  Search,
  Award
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
    setIsGoldenVisaModalOpen,
    setIsEnquiryDrawerOpen,
    setSelectedDrawerProject,
    setFilters
  } = useApp();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [currencyDropdownOpen, setCurrencyDropdownOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const [searchBarOpen, setSearchBarOpen] = useState(false);
  const [searchVal, setSearchVal] = useState('');
  const [scrolled, setScrolled] = useState(false);

  React.useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'ABOUT', page: 'about' as const },
    { label: 'COMMUNITIES', page: 'communities' as const },
    { 
      label: 'PROPERTIES', 
      page: 'properties' as const,
      action: () => setFilters(prev => ({ ...prev, listingType: 'For Sale' }))
    },
    { 
      label: 'GOLDEN VISA', 
      page: 'home' as const,
      action: () => setIsGoldenVisaModalOpen(true)
    },
    { label: 'AGENTS', page: 'agent' as const },
    { label: 'CONTACT US', page: 'contact' as const },
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

  const currencies = ['AED', 'USD', 'EUR', 'GBP', 'SAR'] as const;

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 w-full transition-all duration-500 ${
      scrolled 
        ? 'bg-[#fcfbfa]/95 backdrop-blur-xl border-b border-[#e8e2d8] shadow-sm py-3.5' 
        : 'bg-gradient-to-b from-black/70 via-black/30 to-transparent border-b border-transparent shadow-none py-4 sm:py-5'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">

        {/* ================= BRAND LOGO & NAME ================= */}
        <div 
          onClick={() => { setCurrentPage('home'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
          className="flex-shrink-0 flex items-center gap-2.5 sm:gap-3 cursor-pointer group select-none"
        >
          <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-md bg-gradient-to-br from-[#d4af37] via-[#b88d3d] to-[#8c641c] flex items-center justify-center shadow-md shadow-[#b88d3d]/30 group-hover:scale-105 transition-transform duration-300">
            <Building2 className="w-4 h-4 sm:w-4.5 sm:h-4.5 text-white font-bold" />
          </div>
          <div className="flex flex-col text-left">
            <span className={`font-serif-luxury text-sm sm:text-base lg:text-lg font-bold tracking-[0.2em] leading-tight transition-colors whitespace-nowrap ${
              scrolled 
                ? 'text-[#16191f] group-hover:text-[#b88d3d]' 
                : 'text-white drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)] group-hover:text-amber-200'
            }`}>
              DUBAI ESTATES
            </span>
            <span className={`text-[7px] sm:text-[8px] tracking-[0.28em] uppercase font-semibold transition-colors ${
              scrolled ? 'text-[#b88d3d]' : 'text-amber-300 drop-shadow-[0_1px_4px_rgba(0,0,0,0.8)]'
            }`}>
              The Private Office
            </span>
          </div>
        </div>

        {/* ================= CENTER DESKTOP NAVIGATION ================= */}
        <nav className="hidden xl:flex items-center space-x-1 lg:space-x-1.5">
          {navLinks.map((link) => {
            const isActive = currentPage === link.page && link.label !== 'GOLDEN VISA';
            return (
              <button
                key={link.label}
                onClick={() => handleNavClick(link)}
                className={`px-3 py-1.5 text-[11px] font-bold tracking-[0.15em] uppercase transition-all duration-300 cursor-pointer relative group ${
                  isActive
                    ? scrolled
                      ? 'text-[#b88d3d]'
                      : 'text-amber-300 drop-shadow-sm'
                    : scrolled
                      ? 'text-[#2e3542] hover:text-[#b88d3d]'
                      : 'text-white/90 hover:text-white drop-shadow-[0_1px_3px_rgba(0,0,0,0.7)]'
                }`}
              >
                {link.label}
                <span className={`absolute bottom-0 left-3 right-3 h-[1.5px] bg-[#b88d3d] transition-transform duration-300 origin-left ${
                  isActive ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
                }`} />
              </button>
            );
          })}
        </nav>

        {/* ================= RIGHT UTILITY ACTIONS ================= */}
        <div className="flex items-center gap-1.5 sm:gap-2.5">
          
          {/* Search Toggle */}
          <div className="relative">
            <button
              onClick={() => setSearchBarOpen(!searchBarOpen)}
              className={`p-2 rounded-full transition cursor-pointer ${
                scrolled
                  ? 'text-[#16191f] hover:text-[#b88d3d] hover:bg-[#f0eae1]'
                  : 'text-white hover:text-amber-300 hover:bg-white/10 drop-shadow-[0_1px_3px_rgba(0,0,0,0.7)]'
              }`}
              title="Search Developments"
              aria-label="Search"
            >
              <Search className="w-4 h-4" />
            </button>

            {/* Quick Search Overlay Dropdown */}
            {searchBarOpen && (
              <form 
                onSubmit={handleSearchSubmit}
                className="absolute right-0 top-12 w-72 sm:w-80 bg-white border border-[#e8e2d8] rounded-xl shadow-2xl p-2 z-50 flex items-center gap-2 animate-fadeIn"
              >
                <Search className="w-4 h-4 text-[#8b94a2] ml-2" />
                <input
                  type="text"
                  autoFocus
                  placeholder="Search Sobha, Palm, Downtown..."
                  value={searchVal}
                  onChange={(e) => setSearchVal(e.target.value)}
                  className="w-full text-xs text-[#16191f] placeholder-[#8b94a2] focus:outline-none py-1.5 pr-2"
                />
                <button
                  type="submit"
                  className="px-3 py-1 bg-[#16191f] hover:bg-[#b88d3d] text-white text-[10px] font-bold rounded-lg uppercase tracking-wider transition"
                >
                  Go
                </button>
              </form>
            )}
          </div>

          {/* Currency Switcher */}
          <div className="relative">
            <button
              onClick={() => setCurrencyDropdownOpen(!currencyDropdownOpen)}
              className={`px-2.5 py-1 text-[11px] font-bold rounded-full border flex items-center gap-1 transition cursor-pointer ${
                scrolled
                  ? 'text-[#16191f] bg-[#f0eae1] hover:bg-[#e8e0d4] border-[#e2dbd0]'
                  : 'text-white bg-black/30 hover:bg-black/50 border-white/20 backdrop-blur-md'
              }`}
            >
              <span>{currency}</span>
              <ChevronDown className="w-2.5 h-2.5 opacity-70" />
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

          {/* Flagship Sobha CTA Button: ENQUIRE NOW */}
          <button
            onClick={() => {
              setSelectedDrawerProject('The Woods Abode - Sobha Sanctuary');
              setIsEnquiryDrawerOpen(true);
            }}
            className="hidden sm:flex items-center gap-1.5 px-4 py-2 rounded-full text-[11px] font-bold tracking-[0.18em] uppercase transition-all duration-300 shadow-md cursor-pointer bg-[#b88d3d] hover:bg-[#a67c2e] text-white hover:shadow-[#b88d3d]/30 hover:scale-[1.02]"
          >
            <span>ENQUIRE NOW</span>
          </button>

          {/* User Profile or Sign In */}
          {user.isLoggedIn ? (
            <div className="relative">
              <button
                onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                className={`flex items-center gap-1.5 p-1 sm:pl-1.5 sm:pr-2.5 sm:py-1 rounded-full border transition cursor-pointer ${
                  scrolled
                    ? 'bg-[#f0eae1] hover:bg-[#e8e0d4] border-[#e2dbd0] text-[#16191f]'
                    : 'bg-black/30 hover:bg-black/50 border-white/20 text-white backdrop-blur-md'
                }`}
              >
                <img 
                  src={user.avatar} 
                  alt={user.name} 
                  className="w-5 h-5 sm:w-6 sm:h-6 rounded-full object-cover border border-[#b88d3d]"
                />
                <span className="text-xs font-semibold hidden md:inline">{user.name}</span>
                <ChevronDown className="w-2.5 h-2.5 opacity-70" />
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
                    Investor Portfolio
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
            <button
              onClick={() => setIsAuthModalOpen(true)}
              className="px-3 py-1.5 rounded-full border border-white/30 text-white hover:bg-white/10 text-xs font-semibold cursor-pointer"
            >
              Sign In
            </button>
          )}

          {/* Mobile Menu Hamburger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className={`xl:hidden p-2 rounded-full transition focus:outline-none cursor-pointer ${
              scrolled
                ? 'text-[#16191f] bg-[#f0eae1] hover:bg-[#e8e0d4]'
                : 'text-white bg-black/30 hover:bg-black/50 backdrop-blur-md border border-white/20'
            }`}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5 text-[#b88d3d]" /> : <Menu className="w-5 h-5" />}
          </button>

        </div>
      </div>

      {/* Floating Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="xl:hidden w-full bg-[#fcfbfa]/98 border-b border-[#e8e2d8] shadow-2xl px-6 pt-4 pb-8 space-y-5 animate-fadeIn mt-3 text-[#16191f]">
          <div className="flex flex-col space-y-2 pb-4 border-b border-[#e8e2d8]">
            {navLinks.map((link) => (
              <button
                key={link.label}
                onClick={() => handleNavClick(link)}
                className="text-left px-3 py-2 text-xs font-bold tracking-[0.15em] uppercase text-[#2e3542] hover:text-[#b88d3d] hover:bg-[#f0eae1] rounded-xl transition cursor-pointer"
              >
                {link.label}
              </button>
            ))}
          </div>

          <div className="flex items-center justify-between pt-1">
            <span className="text-xs text-[#6d7685] font-medium">Selected Currency:</span>
            <div className="flex gap-1">
              {currencies.map(c => (
                <button
                  key={c}
                  onClick={() => setCurrency(c)}
                  className={`px-2.5 py-1 text-[11px] rounded-lg border cursor-pointer ${
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

          <div className="pt-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                setSelectedDrawerProject('The Woods Abode - Sobha Sanctuary');
                setIsEnquiryDrawerOpen(true);
              }}
              className="w-full py-3.5 rounded-xl bg-[#b88d3d] text-white font-bold text-xs uppercase tracking-[0.2em] shadow-lg shadow-[#b88d3d]/30 text-center cursor-pointer"
            >
              REGISTER YOUR INTEREST
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
