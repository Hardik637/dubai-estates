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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
      <div 
        className="bg-[#221915] border border-[#3d2f27] rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl relative overflow-hidden text-[#f5ede6]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Warm copper glow effect */}
        <div className="absolute -top-24 -right-24 w-60 h-60 bg-[#c87a50]/15 rounded-full blur-3xl pointer-events-none" />
        
        {/* Close Button */}
        <button 
          onClick={() => setIsGoldenVisaModalOpen(false)}
          className="absolute top-5 right-5 text-[#baa99c] hover:text-white p-2 rounded-full hover:bg-white/10 transition cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="flex items-center gap-3 mb-6">
          <div className="w-12 h-12 rounded-2xl bg-[#c87a50]/20 border border-[#c87a50]/30 flex items-center justify-center text-[#df8a5e]">
            <Sparkles className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-xl sm:text-2xl font-bold font-serif-luxury text-[#f5ede6]">UAE 10-Year Golden Visa</h2>
              <span className="text-[10px] px-2 py-0.5 rounded bg-[#c87a50]/20 text-[#df8a5e] font-bold border border-[#c87a50]/30">
                OFFICIAL
              </span>
            </div>
            <p className="text-xs text-[#baa99c]">Eligibility & Investment Checker for Property Buyers</p>
          </div>
        </div>

        {/* Investment Slider */}
        <div className="bg-[#1a1310] border border-[#3d2f27] rounded-2xl p-5 mb-6">
          <label className="text-xs font-semibold text-[#baa99c] flex justify-between mb-2">
            <span>Your Property Investment Amount:</span>
            <span className="text-[#df8a5e] font-bold text-base">{formatPrice(propertyValueAED)}</span>
          </label>
          <input 
            type="range"
            min={500000}
            max={15000000}
            step={250000}
            value={propertyValueAED}
            onChange={(e) => setPropertyValueAED(Number(e.target.value))}
            className="w-full h-2.5 bg-[#2b201a] rounded-lg appearance-none cursor-pointer accent-[#c87a50]"
          />

          <div className="mt-4 pt-3 border-t border-[#3d2f27] flex items-center justify-between">
            <span className="text-xs text-[#baa99c]">Statutory Requirement: <strong className="text-[#f5ede6]">AED 2,000,000</strong></span>
            {isEligible ? (
              <span className="flex items-center gap-1.5 text-xs text-emerald-400 font-bold bg-emerald-950/60 px-3 py-1 rounded-full border border-emerald-500/30">
                <CheckCircle2 className="w-4 h-4" /> 100% Eligible for 10-Yr Visa
              </span>
            ) : (
              <span className="text-xs text-[#df8a5e] font-medium">
                Add {formatPrice(shortfall)} more to qualify
              </span>
            )}
          </div>
        </div>

        {/* Key Benefits Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
          <div className="p-3 bg-[#2b201a] rounded-xl border border-[#3d2f27] flex items-start gap-2.5">
            <Users className="w-4 h-4 text-[#df8a5e] mt-0.5 shrink-0" />
            <div>
              <h4 className="text-xs font-semibold text-[#f5ede6]">Full Family Sponsorship</h4>
              <p className="text-[11px] text-[#baa99c]">Sponsor spouse, children of any age, and domestic staff with zero restrictions.</p>
            </div>
          </div>

          <div className="p-3 bg-[#2b201a] rounded-xl border border-[#3d2f27] flex items-start gap-2.5">
            <Globe className="w-4 h-4 text-[#df8a5e] mt-0.5 shrink-0" />
            <div>
              <h4 className="text-xs font-semibold text-[#f5ede6]">No Minimum Stay Required</h4>
              <p className="text-[11px] text-[#baa99c]">Maintain residency even if you spend months abroad without entering the UAE.</p>
            </div>
          </div>

          <div className="p-3 bg-[#2b201a] rounded-xl border border-[#3d2f27] flex items-start gap-2.5">
            <Building className="w-4 h-4 text-[#df8a5e] mt-0.5 shrink-0" />
            <div>
              <h4 className="text-xs font-semibold text-[#f5ede6]">Off-Plan & Mortgages Allowed</h4>
              <p className="text-[11px] text-[#baa99c]">Approved prime projects by Emaar, Nakheel, and Dubai developers qualify with minimum paid capital.</p>
            </div>
          </div>

          <div className="p-3 bg-[#2b201a] rounded-xl border border-[#3d2f27] flex items-start gap-2.5">
            <Shield className="w-4 h-4 text-[#df8a5e] mt-0.5 shrink-0" />
            <div>
              <h4 className="text-xs font-semibold text-[#f5ede6]">0% Income & Capital Gains Tax</h4>
              <p className="text-[11px] text-[#baa99c]">100% tax-free personal income and rental returns under UAE tax residency.</p>
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
              window.open(`https://wa.me/971508924110?text=${text}`, '_blank');
            }}
            className="flex-1 py-3 rounded-xl bg-[#c87a50] hover:bg-[#b8683b] text-white text-xs font-bold text-center cursor-pointer shadow-lg transition"
          >
            Apply for Golden Visa Consultation
          </button>
          <button
            onClick={() => setIsGoldenVisaModalOpen(false)}
            className="px-5 py-3 rounded-xl text-xs font-semibold text-[#baa99c] hover:text-white bg-[#2b201a] hover:bg-[#332720] border border-[#3d2f27] cursor-pointer"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
