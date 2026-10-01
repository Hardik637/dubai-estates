import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { X, Sparkles, CheckCircle2, Shield, Users, Globe, Building } from 'lucide-react';

export const GoldenVisaModal: React.FC = () => {
  const { isGoldenVisaModalOpen, setIsGoldenVisaModalOpen, formatPrice } = useApp();
  const [propertyValueAED, setPropertyValueAED] = useState<number>(2500000);

  if (!isGoldenVisaModalOpen) return null;

  const minRequiredAED = 2000000;
  const isEligible = propertyValueAED >= minRequiredAED;
  const shortfall = minRequiredAED - propertyValueAED;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in">
      <div 
        className="bg-[#0f172a] border border-amber-500/40 rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl relative overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Gold Glow effect */}
        <div className="absolute -top-24 -right-24 w-60 h-60 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
        
        {/* Close Button */}
        <button 
          onClick={() => setIsGoldenVisaModalOpen(false)}
          className="absolute top-5 right-5 text-slate-400 hover:text-white p-2 rounded-full hover:bg-white/10 transition cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="flex items-center gap-3 mb-6">
          <div className="w-12 h-12 rounded-2xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400">
            <Sparkles className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-xl sm:text-2xl font-bold font-serif-luxury text-white">UAE 10-Year Golden Visa</h2>
              <span className="text-[10px] px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 font-bold border border-amber-500/30">
                OFFICIAL
              </span>
            </div>
            <p className="text-xs text-slate-400">Eligibility & Investment Checker for Property Buyers</p>
          </div>
        </div>

        {/* Investment Slider */}
        <div className="bg-[#1e293b]/60 border border-white/10 rounded-2xl p-5 mb-6">
          <label className="text-xs font-semibold text-slate-300 flex justify-between mb-2">
            <span>Your Property Investment Amount:</span>
            <span className="text-amber-400 font-bold text-base">{formatPrice(propertyValueAED)}</span>
          </label>
          <input 
            type="range"
            min={500000}
            max={15000000}
            step={250000}
            value={propertyValueAED}
            onChange={(e) => setPropertyValueAED(Number(e.target.value))}
            className="w-full h-2.5 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-amber-500"
          />

          <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between">
            <span className="text-xs text-slate-400">Statutory Requirement: <strong>AED 2,000,000</strong></span>
            {isEligible ? (
              <span className="flex items-center gap-1.5 text-xs text-emerald-400 font-bold bg-emerald-950/60 px-3 py-1 rounded-full border border-emerald-500/30">
                <CheckCircle2 className="w-4 h-4" /> 100% Eligible for 10-Yr Visa
              </span>
            ) : (
              <span className="text-xs text-amber-300 font-medium">
                Add {formatPrice(shortfall)} more to qualify
              </span>
            )}
          </div>
        </div>

        {/* Key Benefits Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
          <div className="p-3 bg-white/5 rounded-xl border border-white/5 flex items-start gap-2.5">
            <Users className="w-4 h-4 text-amber-400 mt-0.5 shrink-0" />
            <div>
              <h4 className="text-xs font-semibold text-white">Full Family Sponsorship</h4>
              <p className="text-[11px] text-slate-400">Sponsor spouse, children of any age, and domestic staff with zero restrictions.</p>
            </div>
          </div>

          <div className="p-3 bg-white/5 rounded-xl border border-white/5 flex items-start gap-2.5">
            <Globe className="w-4 h-4 text-amber-400 mt-0.5 shrink-0" />
            <div>
              <h4 className="text-xs font-semibold text-white">No Minimum Stay Required</h4>
              <p className="text-[11px] text-slate-400">Maintain residency even if you spend months abroad without entering the UAE.</p>
            </div>
          </div>

          <div className="p-3 bg-white/5 rounded-xl border border-white/5 flex items-start gap-2.5">
            <Building className="w-4 h-4 text-amber-400 mt-0.5 shrink-0" />
            <div>
              <h4 className="text-xs font-semibold text-white">Off-Plan & Mortgages Allowed</h4>
              <p className="text-[11px] text-slate-400">Approved projects by Emaar, Nakheel, and DAMAC qualify with minimum paid capital.</p>
            </div>
          </div>

          <div className="p-3 bg-white/5 rounded-xl border border-white/5 flex items-start gap-2.5">
            <Shield className="w-4 h-4 text-amber-400 mt-0.5 shrink-0" />
            <div>
              <h4 className="text-xs font-semibold text-white">0% Income & Capital Gains Tax</h4>
              <p className="text-[11px] text-slate-400">100% tax-free personal income and rental returns under UAE tax residency.</p>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="flex gap-3">
          <button
            onClick={() => {
              setIsGoldenVisaModalOpen(false);
              const text = encodeURIComponent(
                `Hello Dubai Estates, I want to apply for the UAE 10-Year Golden Visa with a budget of ${formatPrice(propertyValueAED)}. Please connect me with your legal conveyance team.`
              );
              window.open(`https://wa.me/971501234567?text=${text}`, '_blank');
            }}
            className="flex-1 gold-btn py-3 rounded-xl text-xs font-bold text-center cursor-pointer shadow-lg"
          >
            Apply for Golden Visa Consultation
          </button>
          <button
            onClick={() => setIsGoldenVisaModalOpen(false)}
            className="px-5 py-3 rounded-xl text-xs font-semibold text-slate-300 hover:text-white bg-white/10 hover:bg-white/15 cursor-pointer"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
