import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Building2, Mail, Phone, MapPin, ShieldCheck, ArrowRight, CheckCircle2, Star } from 'lucide-react';

export const Footer: React.FC = () => {
  const { setCurrentPage, setIsGoldenVisaModalOpen, setIsEnquiryDrawerOpen, setSelectedDrawerProject, showToast } = useApp();
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setSubscribed(true);
    showToast('Subscribed to Dubai Estates Private Market Intelligence!');
    setEmail('');
  };

  const handleApartmentClick = (projectName: string) => {
    setSelectedDrawerProject(projectName);
    setIsEnquiryDrawerOpen(true);
  };

  return (
    <footer className="bg-[#12161f] border-t border-[#232936] text-slate-300 text-xs">
      
      {/* Footer Top Header: Logo & Architectural Tagline */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-12 border-b border-white/10 flex flex-col md:flex-row items-center justify-between gap-6">
        <div 
          onClick={() => { setCurrentPage('home'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
          className="flex items-center gap-3 cursor-pointer select-none group"
        >
          <div className="w-9 h-9 rounded-md bg-gradient-to-br from-[#d4af37] via-[#b88d3d] to-[#8c641c] flex items-center justify-center text-white shadow-md">
            <Building2 className="w-5 h-5" />
          </div>
          <div>
            <span className="font-serif-luxury text-xl font-bold tracking-[0.2em] text-white group-hover:text-[#d4af37] transition-colors">
              DUBAI ESTATES
            </span>
            <p className="text-[8px] tracking-[0.28em] uppercase text-[#b88d3d] font-semibold">
              The Private Office • Premier Luxury Real Estate
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 text-slate-300 text-[11px] tracking-wider uppercase font-medium">
          <ShieldCheck className="w-4 h-4 text-[#b88d3d]" />
          <span>Regulated by Dubai Real Estate Regulatory Agency • ORN #88921</span>
        </div>
      </div>

      {/* Main 4 Columns (Sobha Directory) */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
        
        {/* Column 1: APARTMENTS & RESIDENCES */}
        <div className="space-y-4">
          <h4 className="text-white text-xs font-bold uppercase tracking-[0.18em] font-serif-luxury pb-1 border-b border-white/10">
            Featured Residences
          </h4>
          <ul className="space-y-2.5 text-slate-300 text-xs font-light">
            <li>
              <button 
                onClick={() => handleApartmentClick('The Woods Abode - Sobha Sanctuary')}
                className="hover:text-[#d4af37] transition cursor-pointer text-left"
              >
                The Woods Abode
              </button>
            </li>
            <li>
              <button 
                onClick={() => handleApartmentClick('The Woods Serenity - Sobha Sanctuary')}
                className="hover:text-[#d4af37] transition cursor-pointer text-left"
              >
                The Woods Serenity
              </button>
            </li>
            <li>
              <button 
                onClick={() => handleApartmentClick('Capeside Marina Residences - Siniya Island')}
                className="hover:text-[#d4af37] transition cursor-pointer text-left"
              >
                Capeside Marina Residences
              </button>
            </li>
            <li>
              <button 
                onClick={() => handleApartmentClick('Skyvue Altier - Sobha Hartland II')}
                className="hover:text-[#d4af37] transition cursor-pointer text-left"
              >
                Skyvue Altier
              </button>
            </li>
            <li>
              <button 
                onClick={() => handleApartmentClick('The Mirage - Sobha Central')}
                className="hover:text-[#d4af37] transition cursor-pointer text-left"
              >
                The Mirage at Sobha Central
              </button>
            </li>
            <li>
              <button 
                onClick={() => handleApartmentClick('Sobha SeaHaven - Dubai Harbour')}
                className="hover:text-[#d4af37] transition cursor-pointer text-left"
              >
                Sobha SeaHaven Sky Villas
              </button>
            </li>
          </ul>
        </div>

        {/* Column 2: COMMUNITIES */}
        <div className="space-y-4">
          <h4 className="text-white text-xs font-bold uppercase tracking-[0.18em] font-serif-luxury pb-1 border-b border-white/10">
            Sovereign Enclaves
          </h4>
          <ul className="space-y-2.5 text-slate-300 text-xs font-light">
            <li>
              <button 
                onClick={() => { setCurrentPage('communities'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                className="hover:text-[#d4af37] transition cursor-pointer text-left"
              >
                Sobha Hartland & Hartland II
              </button>
            </li>
            <li>
              <button 
                onClick={() => { setCurrentPage('communities'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                className="hover:text-[#d4af37] transition cursor-pointer text-left"
              >
                Sobha Sanctuary • Meydan
              </button>
            </li>
            <li>
              <button 
                onClick={() => { setCurrentPage('communities'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                className="hover:text-[#d4af37] transition cursor-pointer text-left"
              >
                Sobha Siniya Island
              </button>
            </li>
            <li>
              <button 
                onClick={() => { setCurrentPage('communities'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                className="hover:text-[#d4af37] transition cursor-pointer text-left"
              >
                Palm Jumeirah & Crown Mansions
              </button>
            </li>
            <li>
              <button 
                onClick={() => { setCurrentPage('communities'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                className="hover:text-[#d4af37] transition cursor-pointer text-left"
              >
                Downtown Dubai & Opera District
              </button>
            </li>
            <li>
              <button 
                onClick={() => { setCurrentPage('communities'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                className="hover:text-[#d4af37] transition cursor-pointer text-left"
              >
                Dubai Hills Estate & Sanctuary
              </button>
            </li>
          </ul>
        </div>

        {/* Column 3: ADVISORY & SERVICES */}
        <div className="space-y-4">
          <h4 className="text-white text-xs font-bold uppercase tracking-[0.18em] font-serif-luxury pb-1 border-b border-white/10">
            Advisory & Privileges
          </h4>
          <ul className="space-y-2.5 text-slate-300 text-xs font-light">
            <li>
              <button 
                onClick={() => setIsGoldenVisaModalOpen(true)}
                className="text-[#d4af37] hover:underline transition cursor-pointer font-medium text-left"
              >
                UAE 10-Year Golden Visa Office
              </button>
            </li>
            <li>
              <button 
                onClick={() => { setCurrentPage('sell'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                className="hover:text-[#d4af37] transition cursor-pointer text-left"
              >
                Sell or Consign Your Trophy Asset
              </button>
            </li>
            <li>
              <button 
                onClick={() => { setCurrentPage('agent'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                className="hover:text-[#d4af37] transition cursor-pointer text-left"
              >
                Senior RERA Certified Directors
              </button>
            </li>
            <li>
              <button 
                onClick={() => { setCurrentPage('about'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                className="hover:text-[#d4af37] transition cursor-pointer text-left"
              >
                The Art of the Detail • Heritage
              </button>
            </li>
            <li>
              <button 
                onClick={() => { setCurrentPage('contact'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                className="hover:text-[#d4af37] transition cursor-pointer text-left"
              >
                DIFC Private Office Concierge
              </button>
            </li>
          </ul>
        </div>

        {/* Column 4: GOOGLE REVIEWS & NEWSLETTER */}
        <div className="space-y-5">
          {/* Google Review Badge (Sobha Style) */}
          <div className="p-4 rounded-xl bg-white/5 border border-white/10 space-y-2">
            <div className="flex items-center justify-between">
              <span className="font-bold text-white text-xs font-serif-luxury tracking-wide">
                Dubai Estates Rating
              </span>
              <span className="text-[11px] font-bold text-[#d4af37] bg-[#d4af37]/10 px-2 py-0.5 rounded-md">
                4.8 / 5.0
              </span>
            </div>
            <div className="flex items-center gap-1 text-[#d4af37]">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-3.5 h-3.5 fill-[#d4af37] text-transparent" />
              ))}
            </div>
            <p className="text-[10px] text-slate-400 leading-tight">
              Based on 1,420+ verified sovereign and ultra-high-net-worth investor reviews across the UAE.
            </p>
          </div>

          {/* DIFC Contact */}
          <div className="text-slate-300 text-[11px] space-y-1.5 font-light">
            <p className="flex items-center gap-2">
              <MapPin className="w-3.5 h-3.5 text-[#b88d3d] shrink-0" />
              <span>Burj Daman Tower, DIFC, Dubai, UAE</span>
            </p>
            <p className="flex items-center gap-2">
              <Phone className="w-3.5 h-3.5 text-[#b88d3d] shrink-0" />
              <span>+971 800 76242 (24/7 VIP Desk)</span>
            </p>
            <p className="flex items-center gap-2">
              <Mail className="w-3.5 h-3.5 text-[#b88d3d] shrink-0" />
              <span>vip@dubaiestates.ae</span>
            </p>
          </div>
        </div>

      </div>

      {/* Footer Bottom Bar (Sobha Style) */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 border-t border-white/10 flex flex-col sm:flex-row justify-between items-center gap-4 text-[11px] text-slate-400">
        <p>© 2026 DUBAI ESTATES. All rights reserved. Registered under Dubai Land Department (DLD).</p>
        <div className="flex items-center gap-5">
          <span className="hover:text-white transition cursor-pointer">Privacy Policy</span>
          <span>•</span>
          <span className="hover:text-white transition cursor-pointer">Sitemap</span>
          <span>•</span>
          <span className="hover:text-white transition cursor-pointer">Terms of Service</span>
          <span>•</span>
          <button 
            onClick={() => { setCurrentPage('not-found'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
            className="hover:text-white transition cursor-pointer"
          >
            404 Page
          </button>
        </div>
      </div>

    </footer>
  );
};
