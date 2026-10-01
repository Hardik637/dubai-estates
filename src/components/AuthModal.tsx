import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { X, Mail, Phone, Lock, Building2, Check, ArrowRight } from 'lucide-react';

export const AuthModal: React.FC = () => {
  const { isAuthModalOpen, setIsAuthModalOpen, user, setUser, showToast } = useApp();
  const [tab, setTab] = useState<'signin' | 'register'>('signin');
  const [method, setMethod] = useState<'email' | 'phone'>('email');
  
  const [email, setEmail] = useState('hardik@luxuryinvest.ae');
  const [phone, setPhone] = useState('+971 50 892 4110');
  const [password, setPassword] = useState('••••••••••••');
  const [name, setName] = useState('Hardik');

  if (!isAuthModalOpen) return null;

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setUser({
      name: name || 'Hardik',
      email: method === 'email' ? email : 'investor@dubaiestates.ae',
      phone: method === 'phone' ? phone : '+971 50 892 4110',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
      isLoggedIn: true
    });
    setIsAuthModalOpen(false);
    showToast(`Welcome back, ${name || 'Hardik'}!`);
  };

  const handleDemoLogin = (role: 'investor' | 'seller') => {
    if (role === 'investor') {
      setUser({
        name: 'Hardik',
        email: 'hardik@luxuryinvest.ae',
        phone: '+971 50 892 4110',
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
        isLoggedIn: true
      });
      showToast('Logged in as Hardik (High-Net-Worth Investor)');
    } else {
      setUser({
        name: 'Sarah Jenkins',
        email: 'sarah.j@palmresidences.com',
        phone: '+971 55 491 8820',
        avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80',
        isLoggedIn: true
      });
      showToast('Logged in as Sarah Jenkins (Luxury Property Seller)');
    }
    setIsAuthModalOpen(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
      <div 
        className="bg-[#221915] border border-[#3d2f27] rounded-3xl max-w-4xl w-full overflow-hidden shadow-2xl relative flex flex-col md:flex-row min-h-[560px] text-[#f5ede6]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button 
          onClick={() => setIsAuthModalOpen(false)}
          className="absolute top-4 right-4 z-20 text-[#baa99c] hover:text-white p-2 rounded-full hover:bg-white/10 transition cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Left Side: Luxury Dubai Skyline */}
        <div className="md:w-1/2 relative bg-[#18110e] hidden md:flex flex-col justify-between p-8 text-white overflow-hidden">
          <img 
            src="https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=1200&q=85" 
            alt="Dubai Skyline" 
            className="absolute inset-0 w-full h-full object-cover opacity-50"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#221915] via-black/40 to-black/60" />

          <div className="relative z-10">
            <div className="flex items-center gap-2 mb-2">
              <Building2 className="w-6 h-6 text-[#df8a5e]" />
              <span className="font-serif-luxury text-lg tracking-widest font-bold">DUBAI ESTATES</span>
            </div>
            <span className="text-[10px] uppercase tracking-widest text-[#df8a5e] font-semibold">
              VIP Member Portal
            </span>
          </div>

          <div className="relative z-10 space-y-4">
            <div className="space-y-1">
              <h3 className="font-serif-luxury text-2xl font-bold leading-tight">
                Welcome to <br />Dubai Estates
              </h3>
              <p className="text-xs text-[#baa99c]">
                Discover. Invest. Live Better.
              </p>
            </div>

            <div className="space-y-2 pt-2 border-t border-[#3d2f27] text-xs text-[#baa99c]">
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-[#df8a5e]" />
                <span>Save luxury residences to your wishlist</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-[#df8a5e]" />
                <span>Direct line to RERA certified Senior Brokers</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-[#df8a5e]" />
                <span>List your property directly to global investors</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side: Form */}
        <div className="md:w-1/2 p-6 sm:p-8 flex flex-col justify-between">
          <div>
            <div className="text-center sm:text-left mb-6">
              <h2 className="text-2xl font-bold font-serif-luxury text-[#f5ede6]">
                {tab === 'signin' ? 'Sign In' : 'Create Account'}
              </h2>
              <p className="text-xs text-[#baa99c] mt-1">
                Enter your details to access your luxury portfolio
              </p>
            </div>

            {/* Email / Phone toggle */}
            <div className="flex bg-[#18110e] p-1 rounded-xl border border-[#3d2f27] mb-4">
              <button
                type="button"
                onClick={() => setMethod('email')}
                className={`flex-1 py-1.5 text-xs font-semibold rounded-lg transition cursor-pointer flex items-center justify-center gap-1.5 ${
                  method === 'email' ? 'bg-[#c87a50] text-white shadow' : 'text-[#baa99c] hover:text-white'
                }`}
              >
                <Mail className="w-3.5 h-3.5" />
                <span>Email</span>
              </button>
              <button
                type="button"
                onClick={() => setMethod('phone')}
                className={`flex-1 py-1.5 text-xs font-semibold rounded-lg transition cursor-pointer flex items-center justify-center gap-1.5 ${
                  method === 'phone' ? 'bg-[#c87a50] text-white shadow' : 'text-[#baa99c] hover:text-white'
                }`}
              >
                <Phone className="w-3.5 h-3.5" />
                <span>Phone</span>
              </button>
            </div>

            <form onSubmit={handleLoginSubmit} className="space-y-3.5">
              {tab === 'register' && (
                <div>
                  <label className="text-xs font-semibold text-[#baa99c] block mb-1">Full Name</label>
                  <input 
                    type="text" 
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Hardik" 
                    className="w-full bg-[#18110e] border border-[#3d2f27] rounded-xl px-3.5 py-2.5 text-xs text-[#f5ede6] placeholder-[#857467] focus:outline-none focus:border-[#c87a50]"
                    required
                  />
                </div>
              )}

              {method === 'email' ? (
                <div>
                  <label className="text-xs font-semibold text-[#baa99c] block mb-1">Email address</label>
                  <input 
                    type="email" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="enter your email" 
                    className="w-full bg-[#18110e] border border-[#3d2f27] rounded-xl px-3.5 py-2.5 text-xs text-[#f5ede6] placeholder-[#857467] focus:outline-none focus:border-[#c87a50]"
                    required
                  />
                </div>
              ) : (
                <div>
                  <label className="text-xs font-semibold text-[#baa99c] block mb-1">Phone number (with UAE code)</label>
                  <input 
                    type="tel" 
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+971 50 123 4567" 
                    className="w-full bg-[#18110e] border border-[#3d2f27] rounded-xl px-3.5 py-2.5 text-xs text-[#f5ede6] placeholder-[#857467] focus:outline-none focus:border-[#c87a50]"
                    required
                  />
                </div>
              )}

              <div>
                <div className="flex justify-between items-center mb-1">
                  <label className="text-xs font-semibold text-[#baa99c]">Password</label>
                  {tab === 'signin' && (
                    <button type="button" className="text-[11px] text-[#df8a5e] hover:underline">
                      Forgot password?
                    </button>
                  )}
                </div>
                <input 
                  type="password" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="enter your password" 
                  className="w-full bg-[#18110e] border border-[#3d2f27] rounded-xl px-3.5 py-2.5 text-xs text-[#f5ede6] placeholder-[#857467] focus:outline-none focus:border-[#c87a50]"
                  required
                />
              </div>

              <button
                type="submit"
                className="w-full py-2.5 rounded-xl bg-[#c87a50] hover:bg-[#b8683b] text-white text-xs font-bold text-center mt-2 cursor-pointer transition shadow-md shadow-[#c87a50]/20"
              >
                {tab === 'signin' ? 'Sign In' : 'Create VIP Account'}
              </button>
            </form>

            {/* Quick Demo 1-Click login badges */}
            <div className="mt-4 pt-3 border-t border-[#3d2f27]">
              <span className="text-[10px] text-[#baa99c] uppercase tracking-wider block mb-2 font-semibold">
                Quick 1-Click Demo Login:
              </span>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => handleDemoLogin('investor')}
                  className="py-1.5 px-2 bg-[#c87a50]/15 hover:bg-[#c87a50]/25 border border-[#c87a50]/30 rounded-lg text-[11px] font-semibold text-[#df8a5e] transition text-center cursor-pointer"
                >
                  Hardik (Buyer)
                </button>
                <button
                  type="button"
                  onClick={() => handleDemoLogin('seller')}
                  className="py-1.5 px-2 bg-[#2b201a] hover:bg-[#332720] border border-[#3d2f27] rounded-lg text-[11px] font-semibold text-[#baa99c] transition text-center cursor-pointer"
                >
                  Sarah (Seller)
                </button>
              </div>
            </div>
          </div>

          <div className="mt-4 text-center">
            <p className="text-xs text-[#baa99c]">
              {tab === 'signin' ? "Don't have an account?" : "Already have an account?"}{' '}
              <button
                type="button"
                onClick={() => setTab(tab === 'signin' ? 'register' : 'signin')}
                className="text-[#df8a5e] font-semibold hover:underline cursor-pointer ml-1"
              >
                {tab === 'signin' ? 'Create one' : 'Sign in'}
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
