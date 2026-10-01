import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { PropertyCard } from '../components/PropertyCard';
import { 
  Heart, 
  Search, 
  MessageSquare, 
  Building, 
  User, 
  Bell, 
  LogOut, 
  ExternalLink, 
  Trash2, 
  PlusCircle, 
  CheckCircle2, 
  Clock, 
  ShieldCheck,
  TrendingUp,
  MapPin
} from 'lucide-react';

export const UserDashboardPage: React.FC = () => {
  const { 
    user, 
    setUser, 
    properties, 
    favorites, 
    inquiries, 
    setCurrentPage, 
    setIsAuthModalOpen, 
    navigateToProperty, 
    formatPrice,
    showToast 
  } = useApp();

  const [activeTab, setActiveTab] = useState<'overview' | 'saved' | 'searches' | 'enquiries' | 'listings' | 'profile'>('overview');

  // Properties in user's saved wishlist
  const savedProperties = properties.filter(p => favorites.includes(p.id));

  // User's custom created listings (or demo user listings)
  const myListings = properties.filter(p => p.id.startsWith('custom-') || p.id === 'prop-1');

  const savedSearches = [
    { id: '1', title: 'Palm Jumeirah Waterfront Villas', filter: 'Villas • > AED 20M', date: 'Sept 2026' },
    { id: '2', title: 'Downtown Dubai High-Floor Penthouses', filter: 'Penthouse • 3+ Beds', date: 'Aug 2026' },
    { id: '3', title: 'Dubai Hills Golf Course Ready Residences', filter: 'Ready • 4 Beds', date: 'Aug 2026' },
  ];

  const handleLogout = () => {
    setUser({
      name: 'Guest',
      email: '',
      phone: '',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
      isLoggedIn: false
    });
    showToast('Logged out successfully');
    setCurrentPage('home');
  };

  return (
    <div className="min-h-screen bg-transparent pt-24 sm:pt-28 pb-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">


        
        {/* Welcome Banner matching Figma 08 */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-8 mb-8 border-b border-[#3d2f27] gap-4">
          <div>
            <span className="text-xs uppercase tracking-widest text-[#c87a50] font-semibold">
              VIP Investor Portal
            </span>
            <h1 className="font-serif-luxury text-3xl sm:text-4xl font-bold text-white mt-1">
              Welcome Back, {user.name}
            </h1>
            <p className="text-xs sm:text-sm text-[#baa99c] mt-1">
              Here's what's happening with your luxury properties & private viewing appointments.
            </p>
          </div>

          <div className="flex gap-3">
            <button
              onClick={() => {
                setCurrentPage('sell');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="cognac-btn py-2.5 px-4 rounded-xl text-xs font-bold flex items-center gap-2 cursor-pointer shadow-lg"
            >
              <PlusCircle className="w-4 h-4" />
              <span>List New Property</span>
            </button>
            <button
              onClick={() => {
                setCurrentPage('properties');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="py-2.5 px-4 rounded-xl bg-[#2b201a] hover:bg-[#3d2f27] text-white text-xs font-semibold cursor-pointer"
            >
              Browse Properties
            </button>
          </div>
        </div>

        {/* 4 KPI Metrics Cards matching Figma 08: 12 Saved Properties, 4 Enquiries, 3 Saved Searches, 2 My Listings */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
          <div 
            onClick={() => setActiveTab('saved')}
            className="bg-[#221915] border border-[#3d2f27] hover:border-[#c87a50]/40 rounded-2xl p-5 cursor-pointer transition"
          >
            <div className="flex justify-between items-start mb-2">
              <span className="text-xs text-[#baa99c] font-medium">Saved Properties</span>
              <Heart className="w-4 h-4 text-red-400" />
            </div>
            <div className="font-serif-luxury text-3xl font-bold text-white">{savedProperties.length}</div>
            <span className="text-[11px] text-[#c87a50] mt-1 inline-block">View saved collection →</span>
          </div>

          <div 
            onClick={() => setActiveTab('enquiries')}
            className="bg-[#221915] border border-[#3d2f27] hover:border-[#c87a50]/40 rounded-2xl p-5 cursor-pointer transition"
          >
            <div className="flex justify-between items-start mb-2">
              <span className="text-xs text-[#baa99c] font-medium">My Enquiries</span>
              <MessageSquare className="w-4 h-4 text-[#c87a50]" />
            </div>
            <div className="font-serif-luxury text-3xl font-bold text-[#c87a50]">{inquiries.length}</div>
            <span className="text-[11px] text-[#c87a50] mt-1 inline-block">Active VIP viewings →</span>
          </div>

          <div 
            onClick={() => setActiveTab('searches')}
            className="bg-[#221915] border border-[#3d2f27] hover:border-[#c87a50]/40 rounded-2xl p-5 cursor-pointer transition"
          >
            <div className="flex justify-between items-start mb-2">
              <span className="text-xs text-[#baa99c] font-medium">Saved Searches</span>
              <Search className="w-4 h-4 text-sky-400" />
            </div>
            <div className="font-serif-luxury text-3xl font-bold text-white">{savedSearches.length}</div>
            <span className="text-[11px] text-[#c87a50] mt-1 inline-block">Instant alerts enabled →</span>
          </div>

          <div 
            onClick={() => setActiveTab('listings')}
            className="bg-[#221915] border border-[#3d2f27] hover:border-[#c87a50]/40 rounded-2xl p-5 cursor-pointer transition"
          >
            <div className="flex justify-between items-start mb-2">
              <span className="text-xs text-[#baa99c] font-medium">My Listings</span>
              <Building className="w-4 h-4 text-emerald-400" />
            </div>
            <div className="font-serif-luxury text-3xl font-bold text-white">{myListings.length}</div>
            <span className="text-[11px] text-[#c87a50] mt-1 inline-block">Manage published listings →</span>
          </div>
        </div>

        {/* Dashboard 2-Column Layout matching Figma 08 */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* LEFT 3-COLS: Navigation Sidebar matching Figma 08 */}
          <aside className="lg:col-span-3 bg-[#221915] border border-[#3d2f27] rounded-2xl p-3 space-y-1">
            {[
              { id: 'overview', label: 'Overview', icon: Building },
              { id: 'saved', label: `Saved Properties (${savedProperties.length})`, icon: Heart },
              { id: 'enquiries', label: `My Enquiries (${inquiries.length})`, icon: MessageSquare },
              { id: 'searches', label: 'Saved Searches', icon: Search },
              { id: 'listings', label: `My Listings (${myListings.length})`, icon: Building },
              { id: 'profile', label: 'Profile & Preferences', icon: User },
            ].map(item => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id as any)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-semibold transition cursor-pointer ${
                    isActive
                      ? 'bg-[#c87a50] text-[#120d0b] font-bold shadow'
                      : 'text-[#baa99c] hover:text-white hover:bg-[#18110e]'
                  }`}
                >
                  <Icon className="w-4 h-4 shrink-0" />
                  <span className="truncate">{item.label}</span>
                </button>
              );
            })}

            <div className="pt-2 border-t border-[#3d2f27] my-1"></div>

            <button
              onClick={handleLogout}
              className="w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-xs font-semibold text-red-400 hover:bg-red-500/10 transition cursor-pointer"
            >
              <LogOut className="w-4 h-4 shrink-0" />
              <span>Log Out</span>
            </button>
          </aside>

          {/* RIGHT 9-COLS: Tab Content matching Figma 08 */}
          <main className="lg:col-span-9 space-y-8">
            
            {/* OVERVIEW TAB matching Figma 08: Recently Viewed */}
            {activeTab === 'overview' && (
              <div className="space-y-8 animate-fade-in">
                <div>
                  <div className="flex justify-between items-center mb-4">
                    <h2 className="text-lg font-bold font-serif-luxury text-white">Recently Viewed Properties</h2>
                    <button
                      onClick={() => setActiveTab('saved')}
                      className="text-xs text-[#c87a50] hover:underline cursor-pointer"
                    >
                      View All Saved
                    </button>
                  </div>

                  {/* 3 cards matching Figma 08 */}
                  <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                    {properties.slice(0, 3).map(prop => (
                      <PropertyCard key={prop.id} property={prop} />
                    ))}
                  </div>
                </div>

                {/* Quick Enquiries Preview */}
                <div className="bg-[#221915] border border-[#3d2f27] rounded-2xl p-6">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-sm font-bold text-white font-serif-luxury">Upcoming VIP Viewings</h3>
                    <button
                      onClick={() => setActiveTab('enquiries')}
                      className="text-xs text-[#c87a50] hover:underline cursor-pointer"
                    >
                      View Full Schedule
                    </button>
                  </div>
                  <div className="space-y-3">
                    {inquiries.slice(0, 2).map(inq => (
                      <div key={inq.id} className="flex flex-col sm:flex-row sm:items-center justify-between p-3.5 rounded-xl bg-[#18110e] border border-[#3d2f27] text-xs gap-3">
                        <div className="flex items-center gap-3">
                          <img src={inq.propertyImage} alt="" className="w-12 h-12 rounded-lg object-cover" />
                          <div>
                            <span className="font-semibold text-white block">{inq.propertyTitle}</span>
                            <span className="text-[#baa99c] text-[11px]">With {inq.agentName} • {inq.date} at {inq.preferredTourTime}</span>
                          </div>
                        </div>
                        <span className={`px-2.5 py-1 rounded-md text-[10px] font-bold self-start sm:self-auto ${
                          inq.status === 'Confirmed' ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' : 'bg-[#c87a50]/20 text-[#c87a50] border border-[#c87a50]/30'
                        }`}>
                          {inq.status}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* SAVED PROPERTIES TAB */}
            {activeTab === 'saved' && (
              <div className="space-y-6 animate-fade-in">
                <h2 className="text-lg font-bold font-serif-luxury text-white">Your Saved Luxury Portfolio</h2>
                {savedProperties.length === 0 ? (
                  <div className="bg-[#221915] border border-[#3d2f27] rounded-2xl p-12 text-center">
                    <Heart className="w-10 h-10 text-slate-600 mx-auto mb-3" />
                    <p className="text-sm text-[#baa99c]">You haven't saved any properties yet.</p>
                    <button
                      onClick={() => setCurrentPage('properties')}
                      className="cognac-btn mt-4 px-5 py-2 rounded-xl text-xs font-bold cursor-pointer"
                    >
                      Explore Properties
                    </button>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                    {savedProperties.map(prop => (
                      <PropertyCard key={prop.id} property={prop} />
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* MY ENQUIRIES TAB */}
            {activeTab === 'enquiries' && (
              <div className="space-y-6 animate-fade-in">
                <h2 className="text-lg font-bold font-serif-luxury text-white">Viewing Requests & Advisory Sessions</h2>
                <div className="space-y-4">
                  {inquiries.map(inq => (
                    <div key={inq.id} className="bg-[#221915] border border-[#3d2f27] rounded-2xl p-5 flex flex-col sm:flex-row gap-5">
                      <img src={inq.propertyImage} alt="" className="w-full sm:w-36 h-28 rounded-xl object-cover" />
                      <div className="flex-1 flex flex-col justify-between">
                        <div>
                          <div className="flex justify-between items-start">
                            <div>
                              <h4 className="text-sm font-bold text-white">{inq.propertyTitle}</h4>
                              <p className="text-xs text-[#c87a50] font-bold mt-0.5">{formatPrice(inq.propertyPriceAED)}</p>
                            </div>
                            <span className={`px-2.5 py-1 rounded-md text-[10px] font-bold ${
                              inq.status === 'Confirmed' ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' : 'bg-[#c87a50]/20 text-[#c87a50] border border-[#c87a50]/30'
                            }`}>
                              {inq.status}
                            </span>
                          </div>

                          <div className="mt-3 p-2.5 rounded-lg bg-[#18110e] text-xs text-[#baa99c] border border-[#3d2f27]">
                            <span className="text-[#baa99c] text-[11px] block">Your Message:</span>
                            "{inq.message}"
                          </div>
                        </div>

                        <div className="mt-4 pt-3 border-t border-[#3d2f27] flex flex-wrap justify-between items-center text-xs text-[#baa99c] gap-2">
                          <span className="flex items-center gap-1.5">
                            <Clock className="w-3.5 h-3.5 text-[#c87a50]" />
                            <span>Requested for {inq.date} at {inq.preferredTourTime}</span>
                          </span>
                          <span className="font-semibold text-[#baa99c]">
                            Consultant: {inq.agentName}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* MY LISTINGS TAB */}
            {activeTab === 'listings' && (
              <div className="space-y-6 animate-fade-in">
                <div className="flex justify-between items-center">
                  <h2 className="text-lg font-bold font-serif-luxury text-white">Properties You Have Listed</h2>
                  <button
                    onClick={() => setCurrentPage('sell')}
                    className="cognac-btn py-2 px-4 rounded-xl text-xs font-bold flex items-center gap-1.5 cursor-pointer"
                  >
                    <PlusCircle className="w-3.5 h-3.5" />
                    <span>List Another Property</span>
                  </button>
                </div>

                <div className="space-y-4">
                  {myListings.map(prop => (
                    <div key={prop.id} className="bg-[#221915] border border-[#3d2f27] rounded-2xl p-5 flex flex-col sm:flex-row gap-5 items-center justify-between">
                      <div className="flex items-center gap-4">
                        <img src={prop.images[0]} alt="" className="w-24 h-20 rounded-xl object-cover" />
                        <div>
                          <span className="px-2 py-0.5 text-[10px] font-bold rounded bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 uppercase inline-block mb-1">
                            Live on Dubai Estates
                          </span>
                          <h4 className="text-sm font-bold text-white">{prop.title}</h4>
                          <p className="text-xs text-[#c87a50] font-bold">{formatPrice(prop.priceAED)}</p>
                          <p className="text-[11px] text-[#baa99c] mt-0.5">Ref: {prop.referenceNumber} • {prop.community}</p>
                        </div>
                      </div>

                      <div className="flex gap-2 w-full sm:w-auto">
                        <button
                          onClick={() => navigateToProperty(prop.id)}
                          className="flex-1 sm:flex-none px-4 py-2 bg-[#2b201a] hover:bg-white/20 text-white rounded-xl text-xs font-semibold transition cursor-pointer"
                        >
                          View Listing
                        </button>
                        <button
                          onClick={() => showToast('Editing property listing modal opened')}
                          className="flex-1 sm:flex-none px-4 py-2 bg-[#c87a50]/10 hover:bg-[#c87a50]/20 text-[#df8a5e] rounded-xl text-xs font-semibold border border-[#c87a50]/30 transition cursor-pointer"
                        >
                          Edit
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* SAVED SEARCHES TAB */}
            {activeTab === 'searches' && (
              <div className="space-y-6 animate-fade-in">
                <h2 className="text-lg font-bold font-serif-luxury text-white">Your Saved Search Criteria</h2>
                <div className="space-y-3">
                  {savedSearches.map(s => (
                    <div key={s.id} className="bg-[#221915] border border-[#3d2f27] rounded-2xl p-5 flex justify-between items-center">
                      <div>
                        <h4 className="text-sm font-bold text-white">{s.title}</h4>
                        <p className="text-xs text-[#c87a50] mt-0.5">{s.filter}</p>
                        <span className="text-[11px] text-slate-500">Saved in {s.date}</span>
                      </div>
                      <div className="flex gap-2">
                        <button
                          onClick={() => {
                            setCurrentPage('properties');
                            window.scrollTo({ top: 0, behavior: 'smooth' });
                          }}
                          className="cognac-btn py-1.5 px-4 rounded-xl text-xs font-bold cursor-pointer"
                        >
                          Run Search
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* PROFILE & PREFERENCES TAB */}
            {activeTab === 'profile' && (
              <div className="bg-[#221915] border border-[#3d2f27] rounded-2xl p-6 sm:p-8 space-y-6 animate-fade-in">
                <h2 className="text-lg font-bold font-serif-luxury text-white">Investor Profile & Preferences</h2>
                <div className="flex items-center gap-4 pb-6 border-b border-[#3d2f27]">
                  <img src={user.avatar} alt="" className="w-16 h-16 rounded-full object-cover border-2 border-[#c87a50]" />
                  <div>
                    <h3 className="text-base font-bold text-white">{user.name}</h3>
                    <p className="text-xs text-[#baa99c]">{user.email}</p>
                    <span className="text-[10px] text-[#c87a50] font-bold bg-[#c87a50]/10 px-2 py-0.5 rounded mt-1 inline-block">
                      Tier 1 Accredited Investor
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                  <div>
                    <label className="text-[#baa99c] block mb-1 font-semibold">Primary Phone (WhatsApp Verified)</label>
                    <input
                      type="text"
                      defaultValue={user.phone}
                      className="w-full bg-[#18110e] border border-[#3d2f27] rounded-xl p-2.5 text-white"
                    />
                  </div>
                  <div>
                    <label className="text-[#baa99c] block mb-1 font-semibold">Preferred Currency</label>
                    <input
                      type="text"
                      defaultValue="AED (United Arab Emirates Dirham)"
                      className="w-full bg-[#18110e] border border-[#3d2f27] rounded-xl p-2.5 text-white"
                      disabled
                    />
                  </div>
                </div>

                <div className="pt-4 border-t border-[#3d2f27] flex justify-end">
                  <button
                    onClick={() => showToast('Profile preferences updated!')}
                    className="cognac-btn py-2.5 px-6 rounded-xl text-xs font-bold cursor-pointer"
                  >
                    Save Preferences
                  </button>
                </div>
              </div>
            )}

          </main>

        </div>

      </div>
    </div>
  );
};

