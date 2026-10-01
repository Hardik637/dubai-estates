import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Building2, Mail, Phone, MapPin, ShieldCheck, ArrowRight, CheckCircle2 } from 'lucide-react';

export const Footer: React.FC = () => {
  const { setCurrentPage, setIsGoldenVisaModalOpen, showToast } = useApp();
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setSubscribed(true);
    showToast('Subscribed to Dubai Estates Private Market Intelligence!');
    setEmail('');
  };

  const developers = ['EMAAR', 'NAKHEEL', 'DAMAC', 'SOBHA REALTY', 'MERAAS', 'OMNIYAT', 'ALDAR', 'ELLINGTON'];

  return (
    <footer className="bg-[#070b14] border-t border-white/10 pt-16 pb-12 text-slate-400 text-xs">
      {/* Developer marquee */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12 border-b border-white/5">
        <p className="text-center text-[10px] uppercase tracking-[0.25em] text-slate-300 font-semibold mb-6">
          Official Direct Tier-1 Developer Partnerships
        </p>
        <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-12 opacity-60">
          {developers.map(dev => (
            <span key={dev} className="font-serif-luxury text-sm sm:text-base font-semibold tracking-wider text-slate-300 hover:text-amber-400 hover:opacity-100 transition-colors">
              {dev}
            </span>
          ))}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
        {/* Brand Col */}
        <div className="lg:col-span-2 space-y-4">
          <div 
            onClick={() => { setCurrentPage('home'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
            className="flex items-center gap-3 cursor-pointer select-none"
          >
            <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center text-slate-950 font-bold">
              <Building2 className="w-5 h-5" />
            </div>
            <div>
              <span className="font-serif-luxury text-xl font-bold tracking-widest text-white">
                DUBAI ESTATES
              </span>
              <p className="text-[9px] uppercase tracking-[0.2em] text-amber-400">
                Luxury Real Estate & Investments
              </p>
            </div>
          </div>

          <p className="text-slate-300 leading-relaxed max-w-sm text-xs">
            Dubai Estates is an elite, RERA-certified boutique real estate consultancy headquartered in DIFC Dubai. We represent high-net-worth investors, family offices, and sovereign clients seeking prime and ultra-prime assets across the United Arab Emirates.
          </p>

          <div className="flex items-center gap-2 text-slate-300 pt-2">
            <ShieldCheck className="w-4 h-4 text-amber-400" />
            <span>RERA Registered Brokerage #10346 • DLD ORN #88921</span>
          </div>
        </div>

        {/* Quick Links */}
        <div className="space-y-3">
          <h4 className="text-white text-xs font-bold uppercase tracking-wider font-serif-luxury">Explore Properties</h4>
          <ul className="space-y-2">
            <li>
              <button 
                onClick={() => { setCurrentPage('properties'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                className="hover:text-amber-400 transition cursor-pointer"
              >
                Villas for Sale in Dubai
              </button>
            </li>
            <li>
              <button 
                onClick={() => { setCurrentPage('properties'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                className="hover:text-amber-400 transition cursor-pointer"
              >
                Downtown Penthouses
              </button>
            </li>
            <li>
              <button 
                onClick={() => { setCurrentPage('properties'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                className="hover:text-amber-400 transition cursor-pointer"
              >
                Palm Jumeirah Waterfront
              </button>
            </li>
            <li>
              <button 
                onClick={() => { setCurrentPage('properties'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                className="hover:text-amber-400 transition cursor-pointer"
              >
                Dubai Hills Estate Fairways
              </button>
            </li>
            <li>
              <button 
                onClick={() => { setCurrentPage('properties'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                className="hover:text-amber-400 transition cursor-pointer"
              >
                Dubai Marina Apartments
              </button>
            </li>
          </ul>
        </div>

        {/* Communities & Advisory */}
        <div className="space-y-3">
          <h4 className="text-white text-xs font-bold uppercase tracking-wider font-serif-luxury">Advisory & Services</h4>
          <ul className="space-y-2">
            <li>
              <button 
                onClick={() => { setCurrentPage('sell'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                className="hover:text-amber-400 transition cursor-pointer"
              >
                Sell Your Property
              </button>
            </li>
            <li>
              <button 
                onClick={() => setIsGoldenVisaModalOpen(true)}
                className="text-amber-400 hover:text-amber-300 transition cursor-pointer font-medium"
              >
                UAE 10-Year Golden Visa
              </button>
            </li>
            <li>
              <button 
                onClick={() => { setCurrentPage('communities'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                className="hover:text-amber-400 transition cursor-pointer"
              >
                Community Market Reports
              </button>
            </li>
            <li>
              <button 
                onClick={() => { setCurrentPage('agent'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                className="hover:text-amber-400 transition cursor-pointer"
              >
                RERA Certified Consultants
              </button>
            </li>
            <li>
              <button 
                onClick={() => { setCurrentPage('contact'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                className="hover:text-amber-400 transition cursor-pointer"
              >
                Schedule Private Viewing
              </button>
            </li>
          </ul>
        </div>

        {/* Office & Newsletter */}
        <div className="space-y-3">
          <h4 className="text-white text-xs font-bold uppercase tracking-wider font-serif-luxury">DIFC Headquarters</h4>
          <div className="space-y-2 text-slate-300">
            <p className="flex items-start gap-2">
              <MapPin className="w-3.5 h-3.5 text-amber-400 mt-0.5 shrink-0" />
              <span>Level 42, Burj Daman Tower, DIFC, Dubai, UAE</span>
            </p>
            <p className="flex items-center gap-2">
              <Phone className="w-3.5 h-3.5 text-amber-400 shrink-0" />
              <span>+971 4 812 5590</span>
            </p>
            <p className="flex items-center gap-2">
              <Mail className="w-3.5 h-3.5 text-amber-400 shrink-0" />
              <span>vip@dubaiestates.ae</span>
            </p>
          </div>

          <div className="pt-2">
            <p className="text-[11px] font-semibold text-white mb-2">Dubai Market Intelligence</p>
            <form onSubmit={handleSubscribe} className="flex gap-1.5">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter private email"
                className="bg-[#111a2e] border border-white/10 rounded-lg px-3 py-1.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-500 flex-1"
                required
              />
              <button 
                type="submit" 
                className="gold-btn px-3 py-1.5 rounded-lg text-xs font-bold cursor-pointer"
              >
                Join
              </button>
            </form>
            {subscribed && (
              <span className="text-[10px] text-emerald-400 flex items-center gap-1 mt-1">
                <CheckCircle2 className="w-3 h-3" /> Subscribed successfully
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 pt-8 border-t border-white/5 flex flex-col sm:flex-row justify-between items-center gap-4 text-[11px] text-slate-300">
        <p>© 2026 DUBAI ESTATES. All rights reserved. Regulated by Dubai Real Estate Regulatory Agency (RERA).</p>
        <div className="flex gap-6">
          <span className="hover:text-white cursor-pointer">Privacy Policy</span>
          <span className="hover:text-white cursor-pointer">Terms of Service</span>
          <span className="hover:text-white cursor-pointer">RERA Compliance</span>
          <button onClick={() => setCurrentPage('not-found')} className="hover:text-white cursor-pointer">
            404 Page
          </button>
        </div>
      </div>
    </footer>
  );
};
