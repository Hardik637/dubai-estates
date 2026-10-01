import React from 'react';
import { useApp } from '../context/AppContext';
import { Home, Search, Building2 } from 'lucide-react';

export const NotFoundPage: React.FC = () => {
  const { setCurrentPage } = useApp();

  return (
    <div className="min-h-[75vh] flex items-center justify-center px-4 py-20 bg-[#0b111e] relative overflow-hidden">
      {/* Background Dubai Skyline silhouette matching Figma 12 */}
      <div className="absolute inset-0 opacity-20 pointer-events-none">
        <img 
          src="https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=1600&q=80" 
          alt="" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0b111e] via-[#0b111e]/90 to-[#0b111e]" />
      </div>

      <div className="relative z-10 max-w-md w-full text-center bg-[#111a2e]/90 backdrop-blur-xl border border-white/10 rounded-3xl p-8 sm:p-12 shadow-2xl">
        <div className="w-16 h-16 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center mx-auto mb-6 text-amber-400">
          <Building2 className="w-8 h-8" />
        </div>

        <div className="font-serif-luxury text-6xl font-bold text-white mb-2">404</div>
        <h1 className="font-serif-luxury text-2xl font-bold text-amber-400 mb-2">Page Not Found</h1>
        <p className="text-xs text-slate-300 mb-8 leading-relaxed">
          The property, community, or page you are looking for is unavailable or has been relocated to our private off-market registry.
        </p>

        <div className="space-y-3">
          <button
            onClick={() => {
              setCurrentPage('home');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="w-full gold-btn py-3 rounded-xl text-xs font-bold flex items-center justify-center gap-2 cursor-pointer shadow-lg"
          >
            <Home className="w-4 h-4" />
            <span>Return to Home</span>
          </button>

          <button
            onClick={() => {
              setCurrentPage('properties');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="w-full py-3 rounded-xl bg-white/10 hover:bg-white/15 text-white text-xs font-semibold flex items-center justify-center gap-2 transition cursor-pointer"
          >
            <Search className="w-4 h-4 text-amber-400" />
            <span>Browse Available Properties</span>
          </button>
        </div>
      </div>
    </div>
  );
};
