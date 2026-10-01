import React from 'react';
import { useApp } from '../context/AppContext';
import { Building2, ShieldCheck, Award, Users, Globe, ArrowRight, Sparkles } from 'lucide-react';

export const AboutPage: React.FC = () => {
  const { setCurrentPage, setIsGoldenVisaModalOpen } = useApp();

  return (
    <div className="min-h-screen bg-transparent pt-24 sm:pt-28 pb-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">


        
        {/* Hero Section matching Figma 10 */}
        <div className="relative rounded-3xl overflow-hidden bg-slate-900 border border-white/10 shadow-2xl mb-16 p-8 sm:p-16 text-center">
          <img 
            src="https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=1600&q=85" 
            alt="Dubai Skyline" 
            className="absolute inset-0 w-full h-full object-cover opacity-30"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0b111e] via-[#0b111e]/80 to-[#0b111e]/60" />

          <div className="relative z-10 max-w-3xl mx-auto">
            <span className="text-xs uppercase tracking-widest text-amber-400 font-semibold mb-2 inline-block">
              Our Heritage & Vision
            </span>
            <h1 className="font-serif-luxury text-3xl sm:text-5xl font-bold text-white mb-4 leading-tight">
              About Dubai Estates
            </h1>
            <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-light">
              Headquartered in the Dubai International Financial Centre (DIFC), Dubai Estates is an ultra-prime advisory representing sovereign wealth entities, family offices, and distinguished private investors across the globe.
            </p>
          </div>
        </div>

        {/* 4 Pillars of Excellence */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-16">
          <div className="bg-[#111a2e] border border-white/10 rounded-2xl p-6 text-center">
            <div className="font-serif-luxury text-3xl sm:text-4xl font-bold text-amber-400 mb-1">
              AED 4.5B+
            </div>
            <div className="text-xs text-white font-semibold">Total Career Volume</div>
            <p className="text-[11px] text-slate-400 mt-1">Closed luxury sales & off-plan investments</p>
          </div>

          <div className="bg-[#111a2e] border border-white/10 rounded-2xl p-6 text-center">
            <div className="font-serif-luxury text-3xl sm:text-4xl font-bold text-white mb-1">
              1,200+
            </div>
            <div className="text-xs text-white font-semibold">HNW Clients Served</div>
            <p className="text-[11px] text-slate-400 mt-1">Across 42 international nationalities</p>
          </div>

          <div className="bg-[#111a2e] border border-white/10 rounded-2xl p-6 text-center">
            <div className="font-serif-luxury text-3xl sm:text-4xl font-bold text-amber-400 mb-1">
              100%
            </div>
            <div className="text-xs text-white font-semibold">RERA Certified</div>
            <p className="text-[11px] text-slate-400 mt-1">Every listing vetted with official title deeds</p>
          </div>

          <div className="bg-[#111a2e] border border-white/10 rounded-2xl p-6 text-center">
            <div className="font-serif-luxury text-3xl sm:text-4xl font-bold text-white mb-1">
              10-Year
            </div>
            <div className="text-xs text-white font-semibold">Golden Visa Experts</div>
            <p className="text-[11px] text-slate-400 mt-1">Complete legal & residency conveyance</p>
          </div>
        </div>

        {/* Narrative & Values */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-20">
          <div>
            <span className="text-xs text-amber-400 font-bold uppercase tracking-wider block mb-2">
              Unrivaled Market Access
            </span>
            <h2 className="font-serif-luxury text-2xl sm:text-3xl font-bold text-white mb-4 leading-tight">
              Shaping Dubai's Most Prestigious Real Estate Transactions
            </h2>
            <div className="space-y-4 text-xs sm:text-sm text-slate-300 leading-relaxed">
              <p>
                Dubai's real estate ecosystem has evolved into one of the world's most dynamic capital sanctuaries. With 0% property taxes, full foreign freehold ownership, and unparalleled global connectivity, Dubai attracts the world's visionary leaders.
              </p>
              <p>
                At Dubai Estates, our brokers are not mere salespersons—they are fiduciary advisors with deep macroeconomic literacy, architectural connoisseurship, and exclusive pre-launch allocations with developers like Emaar, Nakheel, and DAMAC.
              </p>
              <p>
                Whether you seek a beachfront mansion on Palm Jumeirah’s Billionaires Row or a high-yielding portfolio of canal-side residences, we manage every facet of your acquisition with consummate discretion.
              </p>
            </div>

            <div className="mt-6 flex gap-4">
              <button
                onClick={() => setCurrentPage('properties')}
                className="gold-btn py-2.5 px-6 rounded-xl text-xs font-bold cursor-pointer"
              >
                Browse Prime Portfolio
              </button>
              <button
                onClick={() => setIsGoldenVisaModalOpen(true)}
                className="py-2.5 px-6 rounded-xl bg-white/10 hover:bg-white/15 text-white text-xs font-semibold cursor-pointer"
              >
                Golden Visa Guidance
              </button>
            </div>
          </div>

          <div className="relative rounded-3xl overflow-hidden border border-white/10 shadow-2xl aspect-[4/3]">
            <img 
              src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=85" 
              alt="Dubai Architecture" 
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0b111e] via-transparent to-transparent" />
            <div className="absolute bottom-6 left-6 right-6 p-4 rounded-2xl bg-[#111a2e]/90 backdrop-blur-md border border-white/10">
              <p className="text-xs text-amber-300 font-semibold">"Integrity, Discretion, and Enduring Value."</p>
              <p className="text-[11px] text-slate-400 mt-0.5">The Dubai Estates Founding Motto</p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};
