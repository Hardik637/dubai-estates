import React, { useState } from 'react';
import { MessageCircle, X, Sparkles, Send } from 'lucide-react';
import { useApp } from '../context/AppContext';

export const WhatsAppFloat: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState('');
  const { toastMessage } = useApp();

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    const query = message || 'Hello Dubai Estates VIP Desk, I am looking for luxury property investment advisory in Dubai.';
    window.open(`https://wa.me/971501234567?text=${encodeURIComponent(query)}`, '_blank');
    setOpen(false);
    setMessage('');
  };

  return (
    <>
      {/* Toast Notification Banner */}
      {toastMessage && (
        <div className="fixed bottom-24 left-1/2 -translate-x-1/2 z-50 bg-[#111a2e] border border-amber-500/50 text-white px-5 py-3 rounded-2xl shadow-2xl flex items-center gap-3 backdrop-blur-xl animate-bounce-subtle">
          <span className="w-2.5 h-2.5 rounded-full bg-amber-400"></span>
          <span className="text-xs font-semibold">{toastMessage}</span>
        </div>
      )}

      {/* Floating WhatsApp Concierge */}
      <div className="fixed bottom-6 right-6 z-40">
        {open ? (
          <div className="bg-[#111a2e] border border-amber-500/30 rounded-2xl p-4 shadow-2xl w-80 mb-3 animate-fade-in">
            <div className="flex items-center justify-between pb-3 border-b border-white/10">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-full bg-emerald-500 flex items-center justify-center text-white">
                  <MessageCircle className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-white flex items-center gap-1">
                    Dubai Estates Concierge
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                  </h4>
                  <p className="text-[10px] text-slate-400">Average response: &lt; 2 minutes</p>
                </div>
              </div>
              <button 
                onClick={() => setOpen(false)}
                className="text-slate-400 hover:text-white p-1 rounded-md"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="py-3 text-xs text-slate-300">
              <div className="bg-white/5 p-2.5 rounded-xl border border-white/5 text-[11px] leading-relaxed mb-3">
                <p>Marhaban! 🇦🇪 Connect directly with our Senior RERA Consultants for private viewings, off-plan launches, and Golden Visa advice.</p>
              </div>

              <form onSubmit={handleSend} className="space-y-2">
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="e.g. Inquiring about Palm Jumeirah villas or high ROI Downtown apartments..."
                  className="w-full bg-[#0b111e] border border-white/10 rounded-xl p-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500 resize-none h-18"
                />
                <button
                  type="submit"
                  className="w-full py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-bold transition flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-emerald-900/30"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Start WhatsApp Chat</span>
                </button>
              </form>
            </div>
          </div>
        ) : null}

        <button
          onClick={() => setOpen(!open)}
          className="w-14 h-14 rounded-full bg-emerald-500 hover:bg-emerald-400 text-white shadow-2xl shadow-emerald-500/30 flex items-center justify-center transition-all duration-300 hover:scale-110 cursor-pointer relative group"
          title="WhatsApp Luxury Concierge"
        >
          <MessageCircle className="w-7 h-7" />
          <span className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-amber-400 rounded-full border-2 border-[#0b111e]"></span>
          <span className="absolute right-16 top-1/2 -translate-y-1/2 bg-[#111a2e] text-white text-[11px] font-semibold py-1.5 px-3 rounded-lg border border-white/10 shadow-lg whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none hidden sm:block">
            Chat on WhatsApp
          </span>
        </button>
      </div>
    </>
  );
};
