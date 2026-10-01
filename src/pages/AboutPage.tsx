import React from 'react';
import { useApp } from '../context/AppContext';
import { Building2, ShieldCheck, Award, Users, Globe, ArrowRight, Sparkles } from 'lucide-react';

export const AboutPage: React.FC = () => {
  const { setCurrentPage, setIsGoldenVisaModalOpen } = useApp();

  return (
    <div className="min-h-screen bg-transparent pt-24 sm:pt-28 pb-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">


        
        {/* Hero Section matching Figma 10 */}
        <div className="relative rounded-3xl overflow-hidden bg-[#18110e] border border-[#3d2f27] shadow-2xl mb-16 p-8 sm:p-16 text-center">
          <img 
            src="https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=1600&q=85" 
            alt="Dubai Skyline" 
            className="absolute inset-0 w-full h-full object-cover opacity-25"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#1a1310] via-[#1a1310]/80 to-[#1a1310]/60" />

          <div className="relative z-10 max-w-3xl mx-auto">
            <span className="text-xs uppercase tracking-widest text-[#c87a50] font-semibold mb-2 inline-block">
              Our Heritage & Vision
            </span>
            <h1 className="font-serif-luxury text-3xl sm:text-5xl font-bold text-[#f5ede6] mb-4 leading-tight">
              About Dubai Estates
            </h1>
            <p className="text-sm sm:text-base text-[#baa99c] leading-relaxed font-light">
              Headquartered in the Dubai International Financial Centre (DIFC), Dubai Estates is an ultra-prime advisory representing sovereign wealth entities, family offices, and distinguished private investors across the globe.
            </p>
          </div>
        </div>

        {/* 4 Pillars of Excellence */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-16">
          <div className="bg-[#221915] border border-[#3d2f27] rounded-2xl p-6 text-center shadow-sm">
            <div className="font-serif-luxury text-3xl sm:text-4xl font-bold text-[#c87a50] mb-1">
              AED 14.8B+
            </div>
            <div className="text-xs text-[#f5ede6] font-semibold">Total Career Volume</div>
            <p className="text-[11px] text-[#baa99c] mt-1">Closed luxury sales & private treaty investments</p>
          </div>

          <div className="bg-[#221915] border border-[#3d2f27] rounded-2xl p-6 text-center shadow-sm">
            <div className="font-serif-luxury text-3xl sm:text-4xl font-bold text-[#f5ede6] mb-1">
              1,200+
            </div>
            <div className="text-xs text-[#f5ede6] font-semibold">HNW Clients Served</div>
            <p className="text-[11px] text-[#baa99c] mt-1">Across 42 international nationalities</p>
          </div>

          <div className="bg-[#221915] border border-[#3d2f27] rounded-2xl p-6 text-center shadow-sm">
            <div className="font-serif-luxury text-3xl sm:text-4xl font-bold text-[#c87a50] mb-1">
              100%
            </div>
            <div className="text-xs text-[#f5ede6] font-semibold">RERA Certified</div>
            <p className="text-[11px] text-[#baa99c] mt-1">Every listing vetted with official title deeds</p>
          </div>

          <div className="bg-[#221915] border border-[#3d2f27] rounded-2xl p-6 text-center shadow-sm">
            <div className="font-serif-luxury text-3xl sm:text-4xl font-bold text-[#f5ede6] mb-1">
              10-Day
            </div>
            <div className="text-xs text-[#f5ede6] font-semibold">Golden Visa Experts</div>
            <p className="text-[11px] text-[#baa99c] mt-1">Complete legal & residency conveyance</p>
          </div>
        </div>

        {/* Narrative & Values */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-20">
          <div>
            <span className="text-xs text-[#c87a50] font-bold uppercase tracking-wider block mb-2">
              Unrivaled Market Access
            </span>
            <h2 className="font-serif-luxury text-2xl sm:text-3xl font-bold text-[#f5ede6] mb-4 leading-tight">
              Shaping Dubai's Most Prestigious Real Estate Transactions
            </h2>
            <div className="space-y-4 text-xs sm:text-sm text-[#baa99c] leading-relaxed">
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
                className="cognac-btn py-2.5 px-6 rounded-xl text-xs font-bold cursor-pointer shadow-md"
              >
                Browse Prime Portfolio
              </button>
              <button
                onClick={() => setIsGoldenVisaModalOpen(true)}
                className="py-2.5 px-6 rounded-xl bg-[#221915] border border-[#3d2f27] hover:bg-[#2b201a] text-[#f5ede6] text-xs font-semibold cursor-pointer transition"
              >
                Golden Visa Guidance
              </button>
            </div>
          </div>

          <div className="relative rounded-3xl overflow-hidden border border-[#3d2f27] shadow-xl aspect-[4/3]">
            <img 
              src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=85" 
              alt="Dubai Architecture" 
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
            <div className="absolute bottom-6 left-6 right-6 p-4 rounded-2xl bg-[#221915]/95 backdrop-blur-md border border-[#3d2f27] shadow-lg">
              <p className="text-xs text-[#c87a50] font-bold">"Integrity, Discretion, and Enduring Value."</p>
              <p className="text-[11px] text-[#baa99c] mt-0.5">The Dubai Estates Founding Motto</p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};
