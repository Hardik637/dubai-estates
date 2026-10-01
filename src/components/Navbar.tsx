import React, { useState, useEffect } from 'react';
import { useApp, PageRoute } from '../context/AppContext';
import { Heart, Search, Menu, X, ArrowUpRight } from 'lucide-react';

export const Navbar: React.FC = () => {
  const { 
    currentPage, 
    setCurrentPage, 
    favorites, 
    setIsEnquiryDrawerOpen,
    setSelectedDrawerProject,
    setFilters
  } = useApp();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchModalOpen, setSearchModalOpen] = useState(false);
  const [searchVal, setSearchVal] = useState('');
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks: { label: string; page: PageRoute; action?: () => void }[] = [
    { 
      label: 'BUY', 
      page: 'properties',
      action: () => setFilters(prev => ({ ...prev, listingType: 'For Sale' }))
    },
    { 
      label: 'RENT', 
      page: 'properties',
      action: () => setFilters(prev => ({ ...prev, listingType: 'For Rent' }))
    },
    { label: 'SELL', page: 'sell' },
    { label: 'COMMUNITIES', page: 'communities' },
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

  return (
    <>
      <header 
        className={`fixed top-0 left-0 right-0 z-50 w-full transition-all duration-500 ${
          currentPage === 'home' && !scrolled
            ? 'opacity-0 pointer-events-none -translate-y-4'
            : 'opacity-100 pointer-events-auto translate-y-0 bg-white/95 backdrop-blur-md py-4 border-b border-[#E7E3DA] shadow-[0_1px_8px_rgba(0,0,0,0.03)]'
        }`}
      >
        <div className="editorial-container flex items-center justify-between">
          
          {/* ================= LEFT: MINIMAL DUBAI ESTATES LOGO ================= */}
          <div 
            onClick={() => { setCurrentPage('home'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
            className="cursor-pointer group flex items-center gap-2.5 select-none"
          >
            <span className="w-2 h-2 bg-[#111111] transition-transform group-hover:scale-125" />
            <span className="font-editorial text-xl sm:text-2xl font-light tracking-[0.2em] uppercase text-[#111111]">
              DUBAI ESTATES
            </span>
          </div>

          {/* ================= CENTER: EXACT SPEC LINKS ================= */}
          <nav className="hidden lg:flex items-center space-x-10 xl:space-x-14">
            {navLinks.map((link) => {
              const isActive = currentPage === link.page;
              return (
                <button
                  key={link.label}
                  onClick={() => handleNavClick(link)}
                  className={`text-xs tracking-[0.25em] uppercase transition-colors cursor-pointer relative py-1 font-mono font-medium ${
                    isActive ? 'text-[#111111]' : 'text-[#8A877F] hover:text-[#111111]'
                  }`}
                >
                  {link.label}
                  {isActive && (
                    <span className="absolute bottom-0 left-0 right-0 h-[1.5px] bg-[#111111]" />
                  )}
                </button>
              );
            })}
          </nav>

          {/* ================= RIGHT: SEARCH • SAVED • ACCOUNT ================= */}
          <div className="flex items-center space-x-6 sm:space-x-8">
            
            {/* Search */}
            <button
              onClick={() => setSearchModalOpen(true)}
              className="text-xs font-mono tracking-[0.2em] uppercase text-[#8A877F] hover:text-[#111111] transition flex items-center gap-1.5 cursor-pointer"
            >
              <Search className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">SEARCH</span>
            </button>

            {/* Saved */}
            <button
              onClick={() => {
                setCurrentPage('dashboard');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="text-xs font-mono tracking-[0.2em] uppercase text-[#8A877F] hover:text-[#111111] transition flex items-center gap-1.5 cursor-pointer relative"
            >
              <Heart className={`w-3.5 h-3.5 ${favorites.length > 0 ? 'fill-[#111111] text-[#111111]' : ''}`} />
              <span className="hidden sm:inline">SAVED</span>
              {favorites.length > 0 && (
                <span className="text-[9px] font-mono bg-[#111111] text-white px-1.5 py-0.2 rounded-full">
                  {favorites.length}
                </span>
              )}
            </button>

            {/* Account */}
            <button
              onClick={() => {
                setCurrentPage('dashboard');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="text-xs font-mono tracking-[0.2em] uppercase text-[#8A877F] hover:text-[#111111] transition hidden sm:inline cursor-pointer"
            >
              ACCOUNT
            </button>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setMobileMenuOpen(true)}
              className="lg:hidden p-1 text-[#111111] cursor-pointer"
              aria-label="Open Navigation"
            >
              <Menu className="w-5 h-5" />
            </button>

          </div>

        </div>
      </header>

      {/* ================= FULLSCREEN MOBILE MENU ================= */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 bg-[#FFFFFF] text-[#111111] flex flex-col justify-between p-8 sm:p-12 animate-fadeIn">
          <div className="flex items-center justify-between pb-6 border-b border-[#E7E3DA]">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 bg-[#111111]" />
              <span className="font-editorial text-xl tracking-[0.2em] uppercase font-light">
                DUBAI ESTATES
              </span>
            </div>
            <button
              onClick={() => setMobileMenuOpen(false)}
              className="p-2 border border-[#E7E3DA] text-[#111111] hover:bg-[#F7F4EC] transition cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="space-y-6 py-12">
            {navLinks.map((link, idx) => (
              <button
                key={link.label}
                onClick={() => handleNavClick(link)}
                className="w-full text-left font-editorial text-4xl sm:text-5xl text-[#111111] hover:text-[#8A877F] transition py-2 flex items-center justify-between border-b border-[#F7F4EC] cursor-pointer"
              >
                <span>{link.label}</span>
                <span className="font-mono text-xs text-[#8A877F]">0{idx + 1}</span>
              </button>
            ))}
          </div>

          <div className="pt-6 border-t border-[#E7E3DA] space-y-4">
            <button
              onClick={() => {
                setCurrentPage('dashboard');
                setMobileMenuOpen(false);
              }}
              className="btn-editorial-primary w-full justify-center"
            >
              <span>Access Private Account</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      )}

      {/* ================= SEARCH MODAL ================= */}
      {searchModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-start justify-center pt-28 px-4 animate-fadeIn">
          <div className="bg-[#FFFFFF] text-[#111111] w-full max-w-2xl p-8 sm:p-12 border border-[#E7E3DA] shadow-2xl relative">
            <button
              onClick={() => setSearchModalOpen(false)}
              className="absolute top-6 right-6 p-2 text-[#8A877F] hover:text-[#111111] cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <span className="text-[10px] font-mono tracking-[0.3em] uppercase text-[#8A877F] block mb-2">
              Portfolio Index
            </span>
            <h3 className="font-editorial text-3xl text-[#111111] mb-6 font-light">
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
                  className="w-full text-lg text-[#111111] placeholder-[#8A877F] bg-transparent focus:outline-none pr-10 font-light"
                />
                <button type="submit" className="absolute right-0 top-1 text-[#111111] cursor-pointer">
                  <Search className="w-5 h-5" />
                </button>
              </div>

              <div className="flex flex-wrap gap-2 pt-4">
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
