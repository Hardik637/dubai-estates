import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { X, ArrowUpRight } from 'lucide-react';

export const AuthModal: React.FC = () => {
  const { isAuthModalOpen, setIsAuthModalOpen, user, setUser, showToast } = useApp();
  const [tab, setTab] = useState<'signin' | 'register'>('signin');
  
  const [email, setEmail] = useState('hardik@luxuryinvest.ae');
  const [name, setName] = useState('Hardik');

  if (!isAuthModalOpen) return null;

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setUser({
      name: name || 'Hardik',
      email: email || 'investor@dubaiestates.ae',
      phone: '+971 50 892 4110',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
      isLoggedIn: true
    });
    setIsAuthModalOpen(false);
    showToast(`Authenticated as ${name || 'Hardik'}. Accessing private portfolio.`);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
      <div 
        className="bg-[#FFFFFF] border border-[#E7E3DA] text-[#111111] max-w-lg w-full p-8 sm:p-12 shadow-2xl relative"
        onClick={(e) => e.stopPropagation()}
      >
        <button 
          onClick={() => setIsAuthModalOpen(false)}
          className="absolute top-6 right-6 p-2 text-[#8A877F] hover:text-[#111111] cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="space-y-2 mb-8">
          <span className="text-[10px] font-mono tracking-[0.3em] uppercase text-[#8A877F] block">
            The Private Office
          </span>
          <h2 className="font-editorial text-3xl sm:text-4xl text-[#111111] font-light">
            Principal Authentication
          </h2>
          <p className="text-xs text-[#8A877F] font-light">
            Access discrete off-market portfolio documents, saved collections, and transaction history.
          </p>
        </div>

        <form onSubmit={handleLoginSubmit} className="space-y-5">
          <div>
            <label className="text-[10px] font-mono uppercase text-[#8A877F] block mb-1">Full Name</label>
            <input 
              type="text" 
              required
              value={name} 
              onChange={(e) => setName(e.target.value)}
              className="w-full text-xs text-[#111111] bg-[#F7F4EC] border border-[#E7E3DA] p-3 focus:outline-none"
            />
          </div>

          <div>
            <label className="text-[10px] font-mono uppercase text-[#8A877F] block mb-1">Corporate or Private Email</label>
            <input 
              type="email" 
              required
              value={email} 
              onChange={(e) => setEmail(e.target.value)}
              className="w-full text-xs text-[#111111] bg-[#F7F4EC] border border-[#E7E3DA] p-3 focus:outline-none"
            />
          </div>

          <button 
            type="submit" 
            className="btn-editorial-primary w-full justify-center mt-2"
          >
            <span>Authenticate Principal</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </button>
        </form>

        <div className="pt-6 mt-8 border-t border-[#E7E3DA] text-[10px] font-mono text-[#8A877F] text-center">
          RERA Regulated Client Access • DIFC Office Desk
        </div>
      </div>
    </div>
  );
};
