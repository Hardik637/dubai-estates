import React from 'react';
import { useApp } from '../context/AppContext';
import { Mail, Phone, MapPin, ShieldCheck, ArrowUpRight, Star } from 'lucide-react';

export const Footer: React.FC = () => {
  const { setCurrentPage, setIsGoldenVisaModalOpen, setIsEnquiryDrawerOpen, setSelectedDrawerProject } = useApp();

  const handleEnquiryClick = (mandateName: string) => {
    setSelectedDrawerProject(mandateName);
    setIsEnquiryDrawerOpen(true);
  };

  return (
    <footer className="bg-[#0a0b0d] border-t border-white/10 text-[#96938a] text-xs">
      
      {/* Footer Top Header: Wordmark & Regulatory Badges */}
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 pt-16 pb-12 border-b border-white/10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div 
          onClick={() => { setCurrentPage('home'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
          className="cursor-pointer select-none group"
        >
          <div className="flex flex-col text-left">
            <span className="font-editorial text-2xl font-light tracking-[0.24em] uppercase text-[#f7f5f0] group-hover:text-[#c4ad8e] transition-colors">
              Dubai Estates
            </span>
            <span className="text-[8px] tracking-[0.35em] uppercase font-mono text-[#c4ad8e] mt-0.5">
              The Private Office • Prime Real Estate Marketplace
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2 text-[#b8b5ad] text-[11px] tracking-wider uppercase font-medium">
          <ShieldCheck className="w-4 h-4 text-[#c4ad8e]" />
          <span>Regulated by Dubai Real Estate Regulatory Agency • ORN #88921</span>
        </div>
      </div>

      {/* Main 4 Columns */}
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
        
        {/* Column 1: FEATURED RESIDENCES */}
        <div className="space-y-4">
          <h4 className="text-[#f7f5f0] text-xs font-semibold uppercase tracking-[0.2em] font-mono pb-2 border-b border-white/10">
            Featured Residences
          </h4>
          <ul className="space-y-2.5 text-[#b8b5ad] text-xs font-light">
            <li>
              <button 
                onClick={() => handleEnquiryClick('Palm Jumeirah Signature Beachfront Villa')}
                className="hover:text-[#f7f5f0] transition cursor-pointer text-left"
              >
                Palm Jumeirah Signature Villa
              </button>
            </li>
            <li>
              <button 
                onClick={() => handleEnquiryClick('Downtown Dubai Sky Penthouse')}
                className="hover:text-[#f7f5f0] transition cursor-pointer text-left"
              >
                Downtown Dubai Sky Penthouse
              </button>
            </li>
            <li>
              <button 
                onClick={() => handleEnquiryClick('Dubai Hills Estate Fairway Vista')}
                className="hover:text-[#f7f5f0] transition cursor-pointer text-left"
              >
                Dubai Hills Fairway Vista
              </button>
            </li>
            <li>
              <button 
                onClick={() => handleEnquiryClick('Dubai Marina Duplex Sky Penthouse')}
                className="hover:text-[#f7f5f0] transition cursor-pointer text-left"
              >
                Dubai Marina Sky Duplex
              </button>
            </li>
            <li>
              <button 
                onClick={() => handleEnquiryClick('Emirates Hills Montgomerie Estate')}
                className="hover:text-[#f7f5f0] transition cursor-pointer text-left"
              >
                Emirates Hills Golf Estate
              </button>
            </li>
            <li>
              <button 
                onClick={() => handleEnquiryClick('Jumeirah Bay Island Waterfront Residence')}
                className="hover:text-[#f7f5f0] transition cursor-pointer text-left"
              >
                Jumeirah Bay Island Residence
              </button>
            </li>
          </ul>
        </div>

        {/* Column 2: COMMUNITIES */}
        <div className="space-y-4">
          <h4 className="text-[#f7f5f0] text-xs font-semibold uppercase tracking-[0.2em] font-mono pb-2 border-b border-white/10">
            Sovereign Enclaves
          </h4>
          <ul className="space-y-2.5 text-[#b8b5ad] text-xs font-light">
            {['Palm Jumeirah', 'Downtown Dubai', 'Emirates Hills', 'Dubai Hills Estate', 'Dubai Marina', 'Business Bay'].map((comm) => (
              <li key={comm}>
                <button 
                  onClick={() => { setCurrentPage('communities'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                  className="hover:text-[#f7f5f0] transition cursor-pointer text-left"
                >
                  {comm}
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* Column 3: ADVISORY & SERVICES */}
        <div className="space-y-4">
          <h4 className="text-[#f7f5f0] text-xs font-semibold uppercase tracking-[0.2em] font-mono pb-2 border-b border-white/10">
            Advisory & Privileges
          </h4>
          <ul className="space-y-2.5 text-[#b8b5ad] text-xs font-light">
            <li>
              <button 
                onClick={() => setIsGoldenVisaModalOpen(true)}
                className="text-[#c4ad8e] hover:underline transition cursor-pointer font-medium text-left"
              >
                UAE 10-Year Golden Visa Office
              </button>
            </li>
            <li>
              <button 
                onClick={() => { setCurrentPage('sell'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                className="hover:text-[#f7f5f0] transition cursor-pointer text-left"
              >
                List Or Consign Your Trophy Estate
              </button>
            </li>
            <li>
              <button 
                onClick={() => { setCurrentPage('agent'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                className="hover:text-[#f7f5f0] transition cursor-pointer text-left"
              >
                Senior RERA Certified Advisory Directors
              </button>
            </li>
            <li>
              <button 
                onClick={() => { setCurrentPage('about'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                className="hover:text-[#f7f5f0] transition cursor-pointer text-left"
              >
                Our Heritage & Fiduciary Standards
              </button>
            </li>
            <li>
              <button 
                onClick={() => { setCurrentPage('contact'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                className="hover:text-[#f7f5f0] transition cursor-pointer text-left"
              >
                DIFC Private Office Concierge
              </button>
            </li>
          </ul>
        </div>

        {/* Column 4: CLIENT FEEDBACK & CONTACT */}
        <div className="space-y-5">
          {/* Rating Badge */}
          <div className="p-4 bg-[#121316] border border-white/10 space-y-2">
            <div className="flex items-center justify-between">
              <span className="font-editorial text-sm text-[#f7f5f0]">
                Client Experience
              </span>
              <span className="text-[11px] font-mono text-[#c4ad8e] bg-white/5 px-2 py-0.5 border border-white/10">
                4.9 / 5.0
              </span>
            </div>
            <div className="flex items-center gap-1 text-[#c4ad8e]">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-3.5 h-3.5 fill-[#c4ad8e] text-transparent" />
              ))}
            </div>
            <p className="text-[10px] text-[#96938a] leading-tight font-light">
              Representing verified sovereign wealth and ultra-high-net-worth investors across 42 countries.
            </p>
          </div>

          {/* DIFC Contact */}
          <div className="text-[#b8b5ad] text-[11px] space-y-1.5 font-light">
            <p className="flex items-center gap-2">
              <MapPin className="w-3.5 h-3.5 text-[#c4ad8e] shrink-0" />
              <span>Burj Daman Tower, DIFC, Dubai, UAE</span>
            </p>
            <p className="flex items-center gap-2">
              <Phone className="w-3.5 h-3.5 text-[#c4ad8e] shrink-0" />
              <span>+971 4 800 3782 (Private Desk)</span>
            </p>
            <p className="flex items-center gap-2">
              <Mail className="w-3.5 h-3.5 text-[#c4ad8e] shrink-0" />
              <span>private@dubaiestates.ae</span>
            </p>
          </div>
        </div>

      </div>

      {/* Footer Bottom Bar */}
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-6 border-t border-white/10 flex flex-col sm:flex-row justify-between items-center gap-4 text-[11px] text-[#63615b]">
        <p>© 2026 DUBAI ESTATES. All rights reserved. Licensed under Dubai Land Department (DLD).</p>
        <div className="flex items-center gap-5">
          <span className="hover:text-[#f7f5f0] transition cursor-pointer">Privacy Charter</span>
          <span>•</span>
          <span className="hover:text-[#f7f5f0] transition cursor-pointer">Regulatory Disclosures</span>
          <span>•</span>
          <span className="hover:text-[#f7f5f0] transition cursor-pointer">Terms of Representation</span>
        </div>
      </div>

    </footer>
  );
};
