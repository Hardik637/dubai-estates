import React, { useState } from 'react';
import { MessageCircle, X, Sparkles, Send, FileText, Compass, ChevronLeft } from 'lucide-react';
import { useApp } from '../context/AppContext';

export const WhatsAppFloat: React.FC = () => {
  const [whatsAppOpen, setWhatsAppOpen] = useState(false);
  const [message, setMessage] = useState('');
  const { toastMessage, setIsEnquiryDrawerOpen, setSelectedDrawerProject, showToast } = useApp();

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    const query = message || 'Hello Dubai Estates VIP Desk, I am looking for luxury property investment advisory in Dubai.';
    window.open(`https://wa.me/971508924110?text=${encodeURIComponent(query)}`, '_blank');
    setWhatsAppOpen(false);
    setMessage('');
  };

  const handleOpenEnquiry = () => {
    setSelectedDrawerProject('The Woods Abode - Sobha Sanctuary');
    setIsEnquiryDrawerOpen(true);
  };

  const handleOpenWalkthrough = () => {
    showToast('Loading 360° Virtual Walkthrough & Digital Masterplan...');
    window.scrollTo({ top: 600, behavior: 'smooth' });
  };

  return (
    <>
      {/* Toast Notification Banner */}
      {toastMessage && (
        <div className="fixed bottom-24 left-1/2 -translate-x-1/2 z-50 bg-[#221915]/95 border border-[#c87a50]/50 text-[#f5ede6] px-5 py-3 rounded-2xl shadow-2xl flex items-center gap-3 backdrop-blur-xl animate-fadeIn">
          <span className="w-2.5 h-2.5 rounded-full bg-[#c87a50] animate-ping" />
          <span className="text-xs font-semibold tracking-wide">{toastMessage}</span>
        </div>
      )}

      {/* Right Floating Action Bar */}
      <div className="fixed right-0 top-1/2 -translate-y-1/2 z-40 flex flex-col items-end gap-2 pr-1 select-none pointer-events-none">
        
        {/* 1. Walkthrough Button */}
        <button
          onClick={handleOpenWalkthrough}
          className="pointer-events-auto group hidden md:flex items-center gap-2 bg-[#221915]/90 hover:bg-[#c87a50] text-[#f5ede6] border-l border-y border-[#3d2f27] rounded-l-xl px-3 py-2.5 shadow-xl backdrop-blur-md transition-all duration-300 hover:translate-x-[-4px] cursor-pointer"
          title="Digital 360 Walkthrough"
        >
          <Compass className="w-4 h-4 text-[#df8a5e] group-hover:text-white transition-colors" />
          <span className="text-[11px] font-bold tracking-widest uppercase overflow-hidden max-w-0 group-hover:max-w-xs transition-all duration-300 whitespace-nowrap">
            360° Walkthrough
          </span>
        </button>

        {/* 2. Floating 'Enquire Now' Tab */}
        <button
          onClick={handleOpenEnquiry}
          className="pointer-events-auto group flex items-center gap-2.5 bg-[#c87a50] hover:bg-[#b8683b] text-white rounded-l-2xl pl-3.5 pr-2.5 py-3.5 shadow-2xl shadow-[#c87a50]/35 transition-all duration-300 hover:translate-x-[-6px] cursor-pointer"
          title="Register Interest & Request Pricing"
        >
          <FileText className="w-4 h-4" />
          <span className="text-xs font-bold tracking-[0.18em] uppercase [writing-mode:vertical-lr] rotate-180 py-1 font-serif-luxury">
            Enquire Now
          </span>
          <ChevronLeft className="w-3.5 h-3.5 opacity-70 group-hover:opacity-100 group-hover:-translate-x-0.5 transition-all" />
        </button>
      </div>

      {/* Floating WhatsApp Concierge on Bottom Right */}
      <div className="fixed bottom-6 right-6 z-40">
        {whatsAppOpen && (
          <div className="bg-[#221915] border border-[#3d2f27] rounded-2xl p-4 shadow-2xl w-80 mb-3 animate-fadeIn text-[#f5ede6]">
            <div className="flex items-center justify-between pb-3 border-b border-[#3d2f27]">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-full bg-[#25D366] flex items-center justify-center text-white shadow-md shadow-[#25D366]/30">
                  <MessageCircle className="w-5 h-5 fill-white text-transparent" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-[#f5ede6] flex items-center gap-1.5">
                    Dubai Estates Private Desk
                    <span className="w-2 h-2 rounded-full bg-[#25D366] animate-pulse" />
                  </h4>
                  <p className="text-[10px] text-[#baa99c]">Live RERA Advisors • Avg &lt; 2m</p>
                </div>
              </div>
              <button 
                onClick={() => setWhatsAppOpen(false)}
                className="text-[#baa99c] hover:text-white p-1 rounded-md cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="py-3 text-xs text-[#baa99c]">
              <div className="bg-[#18110e] p-3 rounded-xl border border-[#3d2f27] text-[11px] leading-relaxed mb-3 text-[#baa99c]">
                <p>Marhaban! 🇦🇪 Connect with our Senior Client Director directly for private viewings, developer allocations, and off-market penthouses.</p>
              </div>

              <form onSubmit={handleSend} className="space-y-2">
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="e.g. Inquiring about The Woods Abode or Sobha Hartland II sky villas..."
                  className="w-full bg-[#18110e] border border-[#3d2f27] rounded-xl p-2.5 text-xs text-[#f5ede6] placeholder-[#857467] focus:outline-none focus:border-[#c87a50] resize-none h-18"
                />
                <button
                  type="submit"
                  className="w-full py-2.5 bg-[#25D366] hover:bg-[#20ba59] text-white rounded-xl text-xs font-bold uppercase tracking-wider transition flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-[#25D366]/20"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Start WhatsApp Chat</span>
                </button>
              </form>
            </div>
          </div>
        )}

        <button
          onClick={() => setWhatsAppOpen(!whatsAppOpen)}
          className="w-13 h-13 sm:w-14 sm:h-14 rounded-full bg-[#25D366] hover:bg-[#20ba59] text-white shadow-2xl shadow-[#25D366]/40 flex items-center justify-center transition-all duration-300 hover:scale-110 cursor-pointer relative group"
          title="WhatsApp Luxury Concierge"
          aria-label="WhatsApp Luxury Concierge"
        >
          <MessageCircle className="w-6 h-6 sm:w-7 sm:h-7 fill-white text-transparent" />
          <span className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-[#c87a50] rounded-full border-2 border-[#1a1310]" />
          <span className="absolute right-16 top-1/2 -translate-y-1/2 bg-[#221915] text-[#f5ede6] text-[11px] font-semibold py-1.5 px-3 rounded-lg border border-[#3d2f27] shadow-lg whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none hidden sm:block">
            Chat on WhatsApp
          </span>
        </button>
      </div>
    </>
  );
};
