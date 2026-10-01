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
  Search
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
        ? 'bg-[#1a1310]/95 backdrop-blur-xl border-b border-[#3d2f27] shadow-xl py-3.5' 
        : 'bg-gradient-to-b from-black/80 via-black/40 to-transparent border-b border-transparent shadow-none py-4 sm:py-5'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">

        {/* ================= BRAND LOGO & NAME ================= */}
        <div 
          onClick={() => { setCurrentPage('home'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
          className="flex-shrink-0 flex items-center gap-2.5 sm:gap-3 cursor-pointer group select-none"
        >
          <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-md bg-gradient-to-br from-[#df8a5e] via-[#c87a50] to-[#8c4826] flex items-center justify-center shadow-md shadow-[#c87a50]/25 group-hover:scale-105 transition-transform duration-300">
            <Building2 className="w-4 h-4 sm:w-4.5 sm:h-4.5 text-white font-bold" />
          </div>
          <div className="flex flex-col text-left">
            <span className="font-serif-luxury text-sm sm:text-base lg:text-lg font-bold tracking-[0.2em] leading-tight text-[#f5ede6] group-hover:text-[#df8a5e] transition-colors whitespace-nowrap">
              DUBAI ESTATES
            </span>
            <span className="text-[7px] sm:text-[8px] tracking-[0.28em] uppercase font-semibold text-[#c87a50] transition-colors">
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
                    ? 'text-[#df8a5e]'
                    : 'text-[#f5ede6]/85 hover:text-[#df8a5e]'
                }`}
              >
                {link.label}
                <span className={`absolute bottom-0 left-3 right-3 h-[1.5px] bg-[#c87a50] transition-transform duration-300 origin-left ${
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
              className="p-2 rounded-full text-[#f5ede6]/90 hover:text-[#df8a5e] hover:bg-[#251c17] transition cursor-pointer"
              title="Search Developments"
              aria-label="Search"
            >
              <Search className="w-4 h-4" />
            </button>

            {/* Quick Search Overlay Dropdown */}
            {searchBarOpen && (
              <form 
                onSubmit={handleSearchSubmit}
                className="absolute right-0 top-12 w-72 sm:w-80 bg-[#251c17] border border-[#3d2f27] rounded-xl shadow-2xl p-2 z-50 flex items-center gap-2 animate-fadeIn"
              >
                <Search className="w-4 h-4 text-[#baa99c] ml-2" />
                <input
                  type="text"
                  autoFocus
                  placeholder="Search Sobha, Palm, Downtown..."
                  value={searchVal}
                  onChange={(e) => setSearchVal(e.target.value)}
                  className="w-full text-xs text-[#f5ede6] placeholder-[#857467] bg-transparent focus:outline-none py-1.5 pr-2"
                />
                <button
                  type="submit"
                  className="px-3 py-1 bg-[#c87a50] hover:bg-[#b8683b] text-white text-[10px] font-bold rounded-lg uppercase tracking-wider transition cursor-pointer"
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
              className="px-2.5 py-1 text-[11px] font-bold rounded-full border border-[#3d2f27] bg-[#251c17] hover:bg-[#2f231d] text-[#f5ede6] flex items-center gap-1 transition cursor-pointer"
            >
              <span>{currency}</span>
              <ChevronDown className="w-2.5 h-2.5 opacity-70" />
            </button>
            {currencyDropdownOpen && (
              <div 
                className="absolute right-0 mt-2 w-28 bg-[#251c17] border border-[#3d2f27] rounded-xl shadow-2xl py-1.5 z-50 text-[#f5ede6]"
                onMouseLeave={() => setCurrencyDropdownOpen(false)}
              >
                {currencies.map(c => (
                  <button
                    key={c}
                    onClick={() => { setCurrency(c); setCurrencyDropdownOpen(false); }}
                    className={`w-full text-left px-3 py-1.5 text-xs font-medium transition cursor-pointer flex justify-between ${
                      currency === c ? 'text-[#df8a5e] bg-[#c87a50]/15 font-bold' : 'text-[#baa99c] hover:bg-[#2f231d]'
                    }`}
                  >
                    <span>{c}</span>
                    <span className="text-[#857467]">{c === 'AED' ? 'د.إ' : c === 'USD' ? '$' : c === 'EUR' ? '€' : c === 'GBP' ? '£' : '﷼'}</span>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Saved wishlist */}
          <button
            onClick={() => { setCurrentPage('dashboard'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
            className="relative p-2 rounded-full text-[#f5ede6]/90 hover:text-[#df8a5e] hover:bg-[#251c17] transition cursor-pointer"
            title="Saved Properties"
            aria-label="Wishlist"
          >
            <Heart className="w-4 h-4" />
            {favorites.length > 0 && (
              <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-[#c87a50] text-[#fbf7f4] text-[8px] sm:text-[9px] font-bold rounded-full flex items-center justify-center shadow">
                {favorites.length}
              </span>
            )}
          </button>

          {/* VIP Action Button: ENQUIRE NOW */}
          <button
            onClick={() => {
              setSelectedDrawerProject('The Woods Abode - Sobha Sanctuary');
              setIsEnquiryDrawerOpen(true);
            }}
            className="hidden sm:flex items-center gap-1.5 px-4 py-2 rounded-full text-[11px] font-bold tracking-[0.18em] uppercase transition-all duration-300 shadow-md cursor-pointer bg-[#c87a50] hover:bg-[#b8683b] text-white hover:shadow-[#c87a50]/30 hover:scale-[1.02]"
          >
            <span>ENQUIRE NOW</span>
          </button>

          {/* User Profile or Sign In */}
          {user.isLoggedIn ? (
            <div className="relative">
              <button
                onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                className="flex items-center gap-1.5 p-1 sm:pl-1.5 sm:pr-2.5 sm:py-1 rounded-full border border-[#3d2f27] bg-[#251c17] hover:bg-[#2f231d] text-[#f5ede6] transition cursor-pointer"
              >
                <img 
                  src={user.avatar} 
                  alt={user.name} 
                  className="w-5 h-5 sm:w-6 sm:h-6 rounded-full object-cover border border-[#c87a50]"
                />
                <span className="text-xs font-semibold hidden md:inline">{user.name}</span>
                <ChevronDown className="w-2.5 h-2.5 opacity-70" />
              </button>

              {userDropdownOpen && (
                <div 
                  className="absolute right-0 mt-2 w-48 bg-[#251c17] border border-[#3d2f27] rounded-2xl shadow-2xl py-2 z-50 text-xs text-[#f5ede6]"
                  onMouseLeave={() => setUserDropdownOpen(false)}
                >
                  <div className="px-3.5 py-2 border-b border-[#3d2f27]">
                    <p className="font-semibold text-[#f5ede6]">{user.name}</p>
                    <p className="text-[#baa99c] text-[11px] truncate">{user.email}</p>
                  </div>
                  <button
                    onClick={() => { setCurrentPage('dashboard'); setUserDropdownOpen(false); }}
                    className="w-full text-left px-3.5 py-2 hover:bg-[#2f231d] text-[#f5ede6] transition cursor-pointer flex items-center gap-2"
                  >
                    <User className="w-3.5 h-3.5 text-[#df8a5e]" />
                    Investor Portfolio
                  </button>
                  <button
                    onClick={() => { setCurrentPage('sell'); setUserDropdownOpen(false); }}
                    className="w-full text-left px-3.5 py-2 hover:bg-[#2f231d] text-[#f5ede6] transition cursor-pointer flex items-center gap-2"
                  >
                    <PlusCircle className="w-3.5 h-3.5 text-[#df8a5e]" />
                    List My Property
                  </button>
                  <div className="border-t border-[#3d2f27] my-1"></div>
                  <button
                    onClick={() => {
                      setIsAuthModalOpen(true);
                      setUserDropdownOpen(false);
                    }}
                    className="w-full text-left px-3.5 py-1.5 hover:bg-red-950/30 text-red-400 transition cursor-pointer"
                  >
                    Switch Account / Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <button
              onClick={() => setIsAuthModalOpen(true)}
              className="px-3 py-1.5 rounded-full border border-white/20 text-[#f5ede6] hover:bg-white/10 text-xs font-semibold cursor-pointer"
            >
              Sign In
            </button>
          )}

          {/* Mobile Menu Hamburger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="xl:hidden p-2 rounded-full transition focus:outline-none cursor-pointer text-[#f5ede6] bg-[#251c17] hover:bg-[#2f231d] border border-[#3d2f27]"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5 text-[#df8a5e]" /> : <Menu className="w-5 h-5" />}
          </button>

        </div>
      </div>

      {/* Floating Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="xl:hidden w-full bg-[#1e1613]/98 border-b border-[#3d2f27] shadow-2xl px-6 pt-4 pb-8 space-y-5 animate-fadeIn mt-3 text-[#f5ede6]">
          <div className="flex flex-col space-y-2 pb-4 border-b border-[#3d2f27]">
            {navLinks.map((link) => (
              <button
                key={link.label}
                onClick={() => handleNavClick(link)}
                className="text-left px-3 py-2 text-xs font-bold tracking-[0.15em] uppercase text-[#f5ede6]/90 hover:text-[#df8a5e] hover:bg-[#251c17] rounded-xl transition cursor-pointer"
              >
                {link.label}
              </button>
            ))}
          </div>

          <div className="flex items-center justify-between pt-1">
            <span className="text-xs text-[#baa99c] font-medium">Selected Currency:</span>
            <div className="flex gap-1">
              {currencies.map(c => (
                <button
                  key={c}
                  onClick={() => setCurrency(c)}
                  className={`px-2.5 py-1 text-[11px] rounded-lg border cursor-pointer ${
                    currency === c 
                      ? 'bg-[#c87a50] text-white font-bold border-[#c87a50]' 
                      : 'border-[#3d2f27] text-[#baa99c] bg-[#251c17]'
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
              className="w-full py-3.5 rounded-xl bg-[#c87a50] hover:bg-[#b8683b] text-white font-bold text-xs uppercase tracking-[0.2em] shadow-lg shadow-[#c87a50]/25 text-center cursor-pointer"
            >
              REGISTER YOUR INTEREST
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
